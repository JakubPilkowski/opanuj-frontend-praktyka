type ErrorHandler = (error: unknown) => void;

/**
 * Decorator function responsible for catching error during function execution
 */
export default function useError<T extends (...args: any) => any>(
  callback: T,
  onError: ErrorHandler
) {
  const func =
    (callback: T, onError: ErrorHandler) =>
    (...args: Parameters<T>): ReturnType<T> | void => {
      try {
        return callback(...(args as Parameters<T>[]));
      } catch (error) {
        onError(error instanceof Error ? error.message : error);
      }
    };

  return func(callback, onError);
}
