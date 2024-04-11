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

interface TransactionContextType {
	transactions: Transaction[];
	fetchTransactions: (q: string) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextType>({
	transactions: [],
	fetchTransactions: async (_q: string) => {},
});

export function TransactionsProvider({
	children,
}: { children: ReactNode }): JSX.Element {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	async function fetchTransactions(query?: string): Promise<void> {
		const response = await api.get("/transactions", { params: { q: query } });

		setTransactions(response.data);
	}

	useEffect(() => {
		fetchTransactions();
	}, []);

	return (
		<TransactionContext.Provider value={{ transactions, fetchTransactions }}>
			{children}
		</TransactionContext.Provider>
	);
}
