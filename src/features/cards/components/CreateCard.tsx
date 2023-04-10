import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateCardSchema,
  ICreateCardInputs,
  PAYMENT_NETWORKS,
  createCardApi,
} from '@/features/cards';
import { InputField, Modal, SelectField } from '@/components/Elements';
import { toast } from 'react-toastify';
import { queryClient } from '@/lib/queryClient';

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const CreateCard = ({ isOpen, close }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ICreateCardInputs>({
    resolver: zodResolver(CreateCardSchema),
  });

  const onSubmit: SubmitHandler<ICreateCardInputs> = async (values) => {
    try {
      await createCardApi(values);
      queryClient.invalidateQueries(['cards']);
      toast.success('Card created successfully.');
      close();
    } catch (error) {
      toast.error('Card creation failed.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={close} title="Create Card" size="max-w-sm">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="p-2 rounded-lg col-span-3 transition-all shadow-xl bg-primary-main text-white font-semibold hover:bg-primary-dark"
          >
            Create
          </button>
        </form>
      </Modal>
    </>
  );
};
