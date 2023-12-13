import { Button } from 'app/components/ui/button';
import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex flex-col md:flex-row w-full px-1 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-center rounded-full border border-border bg-foreground/70 p-1 text-xs font-semibold text-background backdrop-blur-lg">
        <h3 className="mr-1 md:mr-4 line-clamp-1 flex-grow pl-2 text-sm md:text-base">{title}</h3>
        <Button variant="secondary" size="sm" className='rounded-lg' asChild>
          <Price
            className="flex-none rounded-full p-2 text-foreground"
            amount={amount}
            currencyCode={currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        </Button>
      </div>
    </div>
  );
};

export default Label;
