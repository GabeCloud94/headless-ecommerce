import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  compareAtAmount,
  amount,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  compareAtAmount?: string;
  amount?: string;
} & React.ComponentProps<typeof Image>) {

  const percentOff = compareAtAmount && amount ? ((parseFloat(amount) / parseFloat(compareAtAmount)) * 100) : null;

  return (
    <div
      className={clsx(
        'group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background hover:border-primary transition-all duration-500 ease-in-out',
        {
          relative: label,
          'border-2 border-primary': active,
          'border-border': !active
        }
      )}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
      { amount && compareAtAmount ? (
        <span className='p-4 bg-red-600 text-white font-bold absolute top-6 right-6 rounded-lg'>{percentOff?.toFixed(0)}% OFF!</span>
      ) : null
      }
    </div>
  );
}
