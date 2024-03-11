import { z } from 'zod';

const form = document.querySelector('#flight-form') as HTMLFormElement;
const errors = document.querySelector('#errors') as HTMLUListElement;

const dateStringSchema = (name: string) =>
  z
    .string({})
    .min(1, { message: `${name} is required` })
    .refine(
      (value) => {
        if (!value) return true;
        const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
        return dateRegex.test(value);
      },
      {
        message: `${name} has invalid date format. Use DD-MM-YYYY format`,
      }
    );

const stringToDate = (value: string) => {
  const [day, month, year] = value.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

const futureOrCurrentDateSchema = (
  date: Date,
  args?: {
    excludeTime?: boolean;
    message?: string;
  }
) => {
  const { excludeTime, message } = args ?? {
    excludeTime: false,
    message: 'Date must be from the current day or future',
  };

  if (excludeTime) {
    date.setHours(0, 0, 0, 0);
  }

  return z.coerce.date().min(date, message);
};

const flightSchema = z
  .object({
    origin: z.string().min(1, { message: 'Origin is required' }),
    destination: z.string().min(1, { message: 'Destination is required' }),
    trip: z.enum(['one-way', 'round-trip'], {
      required_error: 'Choose trip type',
    }),
    startDate: z.string(),
    endDate: z.string(),
  })
  .superRefine((data, ctx) => {
    const startDateStringResult = dateStringSchema('Start at date')
      .transform(stringToDate)
      .pipe(
        futureOrCurrentDateSchema(new Date(), {
          message: 'Start at date must be from the current day or future',
          excludeTime: true,
        })
      )
      .safeParse(data.startDate);

    if (!startDateStringResult.success) {
      for (const issue of startDateStringResult.error.issues) {
        ctx.addIssue({ ...issue, path: ['startDate'] });
      }
    }

    if (data.trip === 'round-trip') {
      const endDateSchema =
        dateStringSchema('Return at date').transform(stringToDate);

      let endDateResult;

      if (startDateStringResult.success) {
        endDateResult = endDateSchema
          .pipe(
            futureOrCurrentDateSchema(startDateStringResult.data, {
              message: 'Return at date must be same as or after start at date',
              excludeTime: true,
            })
          )
          .safeParse(data.endDate);
      } else {
        endDateResult = endDateSchema.safeParse(data.endDate);
      }

      if (!endDateResult.success) {
        for (const issue of endDateResult.error.issues) {
          ctx.addIssue({ ...issue, path: ['endDate'] });
        }
      }
    }
  });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const formDataObject = Object.fromEntries(formData.entries());

  const result = flightSchema
    .transform((data) => {
      if (data.trip === 'one-way') {
        data.endDate = '';
      }

      return data;
    })
    .safeParse(formDataObject);

  errors.innerHTML = '';

  if (!result.success) {
    for (const issue of result.error.issues) {
      const errorItem = document.createElement('li');
      errorItem.textContent = issue.message;
      errors.appendChild(errorItem);
    }
  }
});
