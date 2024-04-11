import { Header } from "@/components/header";
import { Summary } from "@/components/summary";

import { TransactionContext } from "@/contexts/transactionsContext";
import { SearchForm } from "@/pages/transactions/components/SearchForm";
import { useContext } from "react";
import * as S from "./styles";

export function Transactions(): JSX.Element {
	const { transactions } = useContext(TransactionContext);

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
								<td>{String(transaction.createdAt)}</td>
							</tr>
						))}
					</tbody>
				</S.TransactionsTable>
			</S.TransactionsContainer>
		</main>
	);
}
