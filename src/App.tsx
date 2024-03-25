import { Transactions } from "@/pages/transactions";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyle />
			<Transactions />
		</ThemeProvider>
	);
}
