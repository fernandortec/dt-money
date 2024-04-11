import { Header } from "@/components/header";
import { Summary } from "@/components/summary";

import { TransactionContext } from "@/contexts/transactions-context";
import { priceFormatter } from "@/helpers/formatter";
import { SearchForm } from "@/pages/transactions/components/search-form";
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
										{transaction.type === "outcome" && "-"}{" "}
										{priceFormatter.format(transaction.price)}
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
