import {z} from 'zod';

export interface FormProps {
  handleClose: () => void;
}

export const schema = z.object({
  title: z.string().nonempty('Title is required'),
  overview: z.string().optional(),
  posterUrl: z
    .string()
    .nonempty('Poster URL is required')
    .url({message: 'Invalid url'}),
  genre: z
    .array(z.string().nonempty('Genre is required'))
    .min(1, 'At least one genre is required'),
  actor: z
    .array(z.string().nonempty('Actor is required'))
    .min(1, 'At least one actor is required'),
  director: z.string().nonempty('Director is required'),
  releaseDate: z
    .string()
    .nonempty('Release date is required')
    .transform(val => new Date(val)),
  voteAverage: z
    .string()
    .nonempty('Average vote is required')
    .transform(val => parseFloat(val))
    .refine(val => val >= 0 && val <= 10, {
      message: 'Average vote must be between 0 and 10',
    }),
});

export type FormFields = z.infer<typeof schema>;
