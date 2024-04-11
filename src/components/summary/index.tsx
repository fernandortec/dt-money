import { TransactionContext } from "@/contexts/transactions-context";
import { priceFormatter } from "@/helpers/formatter";
import {
	ArrowCircleDown,
	ArrowCircleUp,
	CurrencyDollar,
} from "@phosphor-icons/react";
import { useContext } from "react";
import * as S from "./styles";

export function Summary() {
	const { transactions } = useContext(TransactionContext);

	const summary = transactions.reduce(
		(acc, transaction) => {
			if (transaction.type === "income") {
				acc.income += transaction.price;
				acc.total += transaction.price;
			} else {
				acc.outcome += transaction.price;
				acc.total -= transaction.price;
			}
			return acc;
		},
		{
			income: 0,
			outcome: 0,
			total: 0,
		},
	);
	return (
		<S.SummaryContainer>
			<S.SummaryCard>
				<header>
					<span>Entrada</span>
					<ArrowCircleUp size={32} color="#00b37e" />
				</header>

				<strong>{priceFormatter.format(summary.income)}</strong>
			</S.SummaryCard>

			<S.SummaryCard>
				<header>
					<span>Saídas</span>
					<ArrowCircleDown size={32} color="#f75a68" />
				</header>

				<strong>{priceFormatter.format(summary.outcome)}</strong>
			</S.SummaryCard>

			<S.SummaryCard variant="green">
				<header>
					<span>Total</span>
					<CurrencyDollar size={32} color="#FFF" />
				</header>

				<strong>{summary.total}</strong>
			</S.SummaryCard>
		</S.SummaryContainer>
	);
}
