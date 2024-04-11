import { TransactionContext } from "@/contexts/transactions-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as S from "./styles";

const searchFormSchema = z.object({ query: z.string() });

type SearchFormSchema = z.infer<typeof searchFormSchema>;

export function SearchForm() {
	const { fetchTransactions } = useContext(TransactionContext);
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SearchFormSchema>({
		resolver: zodResolver(searchFormSchema),
	});

	async function handleSearchTransactions(
		data: SearchFormSchema,
	): Promise<void> {
		await fetchTransactions(data.query);
	}

	return (
		<S.Container onSubmit={handleSubmit(handleSearchTransactions)}>
			<input
				type="text"
				placeholder="Busque por transações"
				{...register("query")}
			/>

			<button type="submit" disabled={isSubmitting}>
				<MagnifyingGlass size={20} />
				Buscar
			</button>
		</S.Container>
	);
}
