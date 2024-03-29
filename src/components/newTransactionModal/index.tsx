import * as Dialog from "@radix-ui/react-dialog";
import * as S from "./styles";
import { X } from "@phosphor-icons/react";

export function NewTransactionModal() {
	return (
		<Dialog.Portal>
			<S.Overlay />
			<S.Content>
				<Dialog.Title>Nova transação</Dialog.Title>
				<S.Close>
          <X size={24} />
        </S.Close>

				<form action="">
					<input type="text" placeholder="Descrição" required />
					<input type="text" placeholder="Preço" required />
					<input type="text" placeholder="Categoria" required />

					<button type="submit">CRIAR</button>
				</form>
			</S.Content>
		</Dialog.Portal>
	);
}
