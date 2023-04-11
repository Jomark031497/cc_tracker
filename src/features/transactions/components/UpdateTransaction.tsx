import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputField, Modal } from '@/components/Elements';
import { toast } from 'react-toastify';
import { queryClient } from '@/lib/queryClient';
import { Transaction } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  IUpdateTransactionInputs,
  UpdateTransactionSchema,
  updateTransactionApi,
  deleteTransactionApi,
} from '@/features/transactions';

interface Props {
  isOpen: boolean;
  close: () => void;
  transaction: Transaction;
}

export const UpdateTransaction = ({ isOpen, close, transaction }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IUpdateTransactionInputs>({
    resolver: zodResolver(UpdateTransactionSchema),
    defaultValues: { ...transaction },
  });

  const onSubmit: SubmitHandler<IUpdateTransactionInputs> = async (values) => {
    setIsLoading(true);
    try {
      await updateTransactionApi(transaction.id, values);
      queryClient.invalidateQueries(['transactions']);
      toast.success('Transaction updated successfully.');
      close();
    } catch (error) {
      toast.error('Transaction update failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTransactionApi(transaction.id);
      queryClient.invalidateQueries(['transactions']);
      toast.success('Transaction deleted successfully.');
      router.push('/');
      close();
    } catch (error) {
      toast.error('Transaction delete failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Update Transaction" size="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 grid grid-cols-3">
          <InputField
            label="Transaction Name"
            {...register('name')}
            formError={errors.name}
            className="col-span-3"
          />
          <InputField
            label="Amount"
            {...register('amount', {
              valueAsNumber: true,
            })}
            formError={errors.amount}
            className="col-span-3"
          />

          <div className="col-span-3 grid grid-cols-2 gap-1">
            <Button
              type="button"
              onClick={() => handleDelete()}
              disabled={isSubmitting}
              className="col-span-1 p-2 rounded shadow-xl border border-red-500 font-semibold text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              Delete
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="col-span-1 p-2 rounded transition-all shadow-xl bg-primary-main text-white font-semibold hover:bg-primary-dark"
            >
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
