import { TransactionContext } from "@/contexts/transactions-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowCircleDown, ArrowCircleUp, X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import * as S from "./styles";

const newTransactionFormSchema = z.object({
	description: z.string(),
	price: z.coerce.number(),
	category: z.string(),
	type: z.enum(["income", "outcome"]),
});

type NewTransactionFormSchema = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
	const { createTransaction } = useContext(TransactionContext);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		control,
		reset,
	} = useForm<NewTransactionFormSchema>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: { type: "income" },
	});

	async function handleCreateNewTransaction(
		data: NewTransactionFormSchema,
	): Promise<void> {
		const { category, description, price, type } = data;

		await createTransaction({ type, price, category, description });

		reset();
	}

	return (
		<Dialog.Portal>
			<S.Overlay />
			<S.Content>
				<Dialog.Title>Nova transação</Dialog.Title>
				<S.Close>
					<X size={24} />
				</S.Close>

				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input
						type="text"
						placeholder="Descrição"
						required
						{...register("description")}
					/>
					<input
						type="text"
						placeholder="Preço"
						required
						{...register("price")}
					/>
					<input
						type="text"
						placeholder="Categoria"
						required
						{...register("category")}
					/>

					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<S.TransactionType
								onValueChange={field.onChange}
								value={field.value}
							>
								<S.TransactionTypeButton value="income" variant="income">
									<ArrowCircleUp size={24} />
									Entrada
								</S.TransactionTypeButton>

								<S.TransactionTypeButton value="outcome" variant="outcome">
									<ArrowCircleDown size={24} />
									Saída
								</S.TransactionTypeButton>
							</S.TransactionType>
						)}
					/>

					<button type="submit" disabled={isSubmitting}>
						CRIAR
					</button>
				</form>
			</S.Content>
		</Dialog.Portal>
	);
}
