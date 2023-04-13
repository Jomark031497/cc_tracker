import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IUpdateCardInputs,
  PAYMENT_NETWORKS,
  UpdateCardSchema,
  deleteCardApi,
  updateCardApi,
} from '@/features/cards';
import { Button, InputField, Modal, SelectField } from '@/components/Elements';
import { toast } from 'react-toastify';
import { queryClient } from '@/lib/queryClient';
import { Card } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  isOpen: boolean;
  close: () => void;
  card: Card;
}

export const UpdateCard = ({ isOpen, close, card }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IUpdateCardInputs>({
    resolver: zodResolver(UpdateCardSchema),
    defaultValues: { ...card },
  });

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
      router.push('/');
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 p-4">
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
            <Button
              type="button"
              onClick={() => handleDelete()}
              disabled={isSubmitting}
              className="col-span-1 rounded border border-red-500 p-2 font-semibold text-red-500 shadow-xl transition-all hover:bg-red-500 hover:text-white"
            >
              Delete
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="col-span-1 rounded bg-primary-main p-2 font-semibold text-white shadow-xl transition-all hover:bg-primary-dark"
            >
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
