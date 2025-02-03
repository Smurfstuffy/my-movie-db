import {z} from 'zod';

export const filtersSchema = z.object({
  genres: z.array(z.string().nonempty('Genre is required')).optional(),
  minRating: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val => (typeof val === 'string' ? parseFloat(val) : undefined)),
  maxRating: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val => (typeof val === 'string' ? parseFloat(val) : undefined)),
  minReleaseYear: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val =>
      typeof val === 'string' ? parseInt(val, 10) : undefined,
    ),
  maxReleaseYear: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val =>
      typeof val === 'string' ? parseInt(val, 10) : undefined,
    ),
});

export type FiltersFormFields = z.infer<typeof filtersSchema>;

export interface FiltersProps {
  handleClose: () => void;
}
