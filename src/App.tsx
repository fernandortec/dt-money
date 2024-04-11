import { TransactionsProvider } from "@/contexts/transactionsContext";
import { Transactions } from "@/pages/transactions";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App(): JSX.Element {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyle />

			<TransactionsProvider>
				<Transactions />
			</TransactionsProvider>
		</ThemeProvider>
	);
}
