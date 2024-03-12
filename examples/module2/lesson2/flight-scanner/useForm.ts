import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useCallback, useMemo } from 'react';
import { DefaultValues, Path, useForm as useHookForm } from 'react-hook-form';

export type GenericChangeEvent = {
  target: {
    name: string;
    value: any;
  };
};

// TODO: implement controlled version with access to values
/**
 * Hook responsible for handling form state and validation.
 * Abstracts the usage of react-hook-form.
 *
 * ### Caution: For now, it does not support arrays or nested objects.
 */
export default function useForm<T extends Record<string, any>>(
  schema: z.Schema<any, any>,
  defaultValues: T
) {
  const { handleSubmit, register, reset, formState } = useHookForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    delayError: 400,
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const { isValid, isSubmitting } = formState;

  const registers = useMemo<
    Record<keyof T, ReturnType<typeof register>>
  >(() => {
    return Object.keys(defaultValues).reduce((acc, key) => {
      return {
        ...acc,
        [key]: register(key as Path<T>),
      };
    }, {} as Record<keyof T, ReturnType<typeof register>>);
  }, [defaultValues, register]);

  const validators = useMemo<Record<keyof T, Record<string, any>>>(() => {
    return Object.entries(registers).reduce<
      Record<keyof T, Record<string, any>>
    >((acc, [key, value]) => {
      const { name, onBlur, onChange, ref, disabled, ...rest } = value;
      return {
        ...acc,
        [key]: rest,
      };
    }, {} as Record<keyof T, Record<string, any>>);
  }, [registers]);

  const onChange = (e: GenericChangeEvent) => {
    const { name } = e.target;
    registers[name].onChange(e);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    registers[name].onBlur(e);
  };

  const onReset = (newValues?: T) => {
    reset(newValues);
  };

  const setRef = useCallback(
    (
      ref:
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLButtonElement
        | HTMLTextAreaElement
        | null
    ) => {
      if (!ref) {
        return;
      }
      registers[ref.name].ref(ref);
    },
    [registers]
  );

  const simplifiedErrors = useMemo(
    () =>
      Object.keys(formState.errors).reduce(
        (acc: Partial<Record<keyof T, string>>, key: keyof T) => {
          if (!formState.errors[key]?.message) {
            return acc;
          }

          return {
            ...acc,
            [key]: formState.errors[key]!.message,
          };
        },
        {} as Partial<Record<keyof T, string>>
      ),
    [formState]
  );

  return {
    validators,
    submit: handleSubmit,
    setRef,
    onChange,
    onBlur,
    reset: onReset,
    errors: simplifiedErrors,
    isValid,
    isSubmitting,
  };
}
