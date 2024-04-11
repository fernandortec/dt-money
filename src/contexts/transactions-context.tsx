import { api } from "@/lib/axios";
import {
	type JSX,
	type ReactNode,
	createContext,
	useEffect,
	useState,
} from "react";

export interface Transaction {
	id: number;
	description: string;
	type: "income" | "outcome";
	category: string;
	price: number;
	createdAt: Date;
}

interface CreateTransactionInput {
	description: string;
	price: number;
	category: string;
	type: "income" | "outcome";
}
interface TransactionContextType {
	transactions: Transaction[];
	fetchTransactions: (q: string) => Promise<void>;
	createTransaction(data: CreateTransactionInput): Promise<void>;
}

export const TransactionContext = createContext<TransactionContextType>({
	transactions: [],
	fetchTransactions: async () => {},
	createTransaction: async () => {},
});

export function TransactionsProvider({
	children,
}: { children: ReactNode }): JSX.Element {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	async function fetchTransactions(query?: string): Promise<void> {
		const response = await api.get("/transactions", {
			params: { q: query, _sort: "createdAt", _order: "desc" },
		});

		setTransactions(response.data);
	}

	useEffect(() => {
		fetchTransactions();
	}, []);

	async function createTransaction({
		category,
		description,
		price,
		type,
	}: CreateTransactionInput): Promise<void> {
		const response = await api.post("/transactions", {
			type,
			price,
			category,
			description,
			createdAt: new Date(),
		});

		setTransactions((state) => [...state, response.data]);
	}

	return (
		<TransactionContext.Provider
			value={{ transactions, fetchTransactions, createTransaction }}
		>
			{children}
		</TransactionContext.Provider>
	);
}
