import { cn } from '../../../../@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse-fast rounded-md bg-slate-600', className)}
      {...props}
    />
  );
}
