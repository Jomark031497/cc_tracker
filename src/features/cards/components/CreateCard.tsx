import { Button } from '@/components/Elements';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const CreateCardSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Please enter a valid Card Name',
      required_error: 'Please enter a Card Name',
    })
    .min(6, 'Card Name must be atleast 6 characters long')
    .max(255, 'Card Name must only be up to 255 characters'),
  imageUrl: z
    .string({
      invalid_type_error: 'Please enter a valid Image Url',
      required_error: 'Please enter a Image Url',
    })
    .url('Please enter a valid URL')
    .optional(),
});

type ICreateCardInputs = z.infer<typeof CreateCardSchema>;

export const CreateCard = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ICreateCardInputs>({
    resolver: zodResolver(CreateCardSchema),
  });

  const onSubmit: SubmitHandler<ICreateCardInputs> = async (values) => {
    console.log(values);
  };

  console.log(errors.name);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-gray-700 text-sm font-bold mb-2 flex flex-col gap-1">
          Name
          <input
            className="appearance-none border border-gray-300 rounded-xl w-full py-3 px-3 text-gray-700 leading-tight transition ease-in-out focus:border-primary-main focus:outline-none focus:shadow-outline"
            type="name" 
            {...register('name')}
          />
        </label>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </>
  );
};
