import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IUpdateCardInputs,
  PAYMENT_NETWORKS,
  UpdateCardSchema,
  deleteCardApi,
  updateCardApi,
} from '@/features/cards';
import { InputField, Modal, SelectField } from '@/components/Elements';
import { toast } from 'react-toastify';
import { queryClient } from '@/lib/queryClient';
import { Card } from '@prisma/client';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  close: () => void;
  card: Card;
}

export const UpdateCard = ({ isOpen, close, card }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IUpdateCardInputs>({
    resolver: zodResolver(UpdateCardSchema),
    defaultValues: { ...card },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<IUpdateCardInputs> = async (values) => {
    setIsLoading(true);
    try {
      await updateCardApi(card.id, values);
      queryClient.invalidateQueries(['cards']);
      toast.success('Card updated successfully.');
      close();
    } catch (error) {
      toast.error('Card update failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCardApi(card.id);
      queryClient.invalidateQueries(['cards']);
      toast.success('Card deleted successfully.');
      close();
    } catch (error) {
      toast.error('Card delete failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Update Card" size="max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 grid grid-cols-3">
          <InputField
            label="Card Name"
            {...register('name')}
            formError={errors.name}
            className="col-span-3"
          />

          <SelectField
            label="Payment Network"
            {...register('network')}
            formError={errors.network}
            className="col-span-2"
          >
            {PAYMENT_NETWORKS.map((network) => (
              <option key={network} value={network}>
                {network}
              </option>
            ))}
          </SelectField>

          <InputField
            label="Credit Limit"
            {...register('creditLimit', {
              valueAsNumber: true,
            })}
            formError={errors.creditLimit}
            className="col-span-2"
          />

          <div className="col-span-3 grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => handleDelete()}
              disabled={isSubmitting}
              className="col-span-1 p-2 rounded shadow-xl border border-red-500 font-semibold text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              Delete
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="col-span-1 p-2 rounded transition-all shadow-xl bg-primary-main text-white font-semibold hover:bg-primary-dark"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
