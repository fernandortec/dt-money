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
}

export const TransactionContext = createContext<TransactionContextType>({
	transactions: [],
});

export function TransactionsProvider({
	children,
}: { children: ReactNode }): JSX.Element {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	async function loadTransactions(): Promise<void> {
		const response = await fetch("http://localhost:3333/transactions");
		const data = await response.json();

		setTransactions(data);
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	return (
		<TransactionContext.Provider value={{ transactions }}>
			{children}
		</TransactionContext.Provider>
	);
}
