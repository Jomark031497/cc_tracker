import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField, Modal, SelectField } from '@/components/Elements';
import { toast } from 'react-toastify';
import { queryClient } from '@/lib/queryClient';
import {
  CreateTransactionSchema,
  ICreateTransactionInputs,
  createTransactionApi,
} from '@/features/transactions';
import { useCards } from '@/features/cards';

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const CreateTransaction = ({ isOpen, close }: Props) => {
  const { data: cards } = useCards();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ICreateTransactionInputs>({
    resolver: zodResolver(CreateTransactionSchema),
  });

  const onSubmit: SubmitHandler<ICreateTransactionInputs> = async (values) => {
    try {
      await createTransactionApi(values);
      queryClient.invalidateQueries(['cards']);
      queryClient.invalidateQueries(['cardTransactions']);

      toast.success('Transaction created successfully.');
      close();
    } catch (error) {
      toast.error('Transaction creation failed.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Create Transaction" size="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
          <InputField
            label="Transaction Name"
            {...register('name')}
            formError={errors.name}
            className="col-span-2"
          />

          <InputField
            label="Amount"
            defaultValue={0}
            {...register('amount', { valueAsNumber: true })}
            formError={errors.amount}
            className="col-span-2"
          />

          <SelectField label="Card" {...register('cardId')} className="col-span-3">
            {cards?.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name}
              </option>
            ))}
          </SelectField>

          <button
            type="submit"
            disabled={isSubmitting}
            className="col-span-3 rounded-lg bg-primary-main p-2 font-semibold text-white shadow-xl transition-all hover:bg-primary-dark"
          >
            Create
          </button>
        </form>
      </Modal>
    </>
  );
};
