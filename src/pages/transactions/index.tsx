import { Header } from "@/components/header";
import { Summary } from "@/components/summary";

import * as S from "./styles";
import { SearchForm } from "@/pages/transactions/components/SearchForm";

export function Transactions() {
	return (
		<main>
			<Header />
			<Summary />

			<S.TransactionsContainer>
				<SearchForm />
				<S.TransactionsTable>
					<tbody>
						<tr>
							<td width="50%">Desenvolvimento de site</td>
							<td>
								<S.PriceHighlight variant="income">
									R$ 12.000.00
								</S.PriceHighlight>
							</td>
							<td>Venda</td>
							<td>13/04/2024</td>
						</tr>
						<tr>
							<td width="50%">Hamburguer</td>
							<td>
								<S.PriceHighlight variant="outcome">
									- R$ 59,00
								</S.PriceHighlight>
							</td>
							<td>Alimentação</td>
							<td>10/04/2024</td>
						</tr>
					</tbody>
				</S.TransactionsTable>
			</S.TransactionsContainer>
		</main>
	);
}
