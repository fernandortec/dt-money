import { Header } from "@/components/header";
import { Summary } from "@/components/summary";

import { SearchForm } from "@/pages/transactions/components/SearchForm";
import { useEffect } from "react";
import { useState } from "react";
import * as S from "./styles";

interface Transaction {
	id: number;
	description: string;
	type: "income" | "outcome";
	category: string;
	price: number;
	createdAt: Date;
}

export function Transactions() {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	async function loadTransactions() {
		const response = await fetch("http://localhost:3333/transactions");
		const data = await response.json();

		setTransactions(data);
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	return (
		<main>
			<Header />
			<Summary />

			<S.TransactionsContainer>
				<SearchForm />
				<S.TransactionsTable>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td width="50%">{transaction.description}</td>
								<td>
									<S.PriceHighlight variant={transaction.type}>
										{transaction.price}
									</S.PriceHighlight>
								</td>
								<td>{transaction.category}</td>
								<td>{transaction.createdAt}</td>
							</tr>
						))}
					</tbody>
				</S.TransactionsTable>
			</S.TransactionsContainer>
		</main>
	);
}
