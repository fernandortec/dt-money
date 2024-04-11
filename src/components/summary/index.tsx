import { priceFormatter } from "@/helpers/formatter";
import { useSummary } from "@/hooks/use-summary";
import {
	ArrowCircleDown,
	ArrowCircleUp,
	CurrencyDollar,
} from "@phosphor-icons/react";
import * as S from "./styles";

export function Summary() {
	const summary = useSummary();

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

				<strong>{priceFormatter.format(summary.total)}</strong>
			</S.SummaryCard>
		</S.SummaryContainer>
	);
}
