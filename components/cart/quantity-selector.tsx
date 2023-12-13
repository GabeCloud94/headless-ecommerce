/* eslint-disable no-unused-vars */
import { Button } from "app/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  quantityAvailable: number | undefined;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange, quantityAvailable }) => {
  const decreaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (quantity > 1) {

      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {

    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center my-4 text-lg border border-muted-foreground p-2 rounded-lg max-w-min gap-2">
      <Button className="text-lg" type="button" variant="ghost" onClick={decreaseQuantity} disabled={quantity <= 1}>
        -
      </Button>
      {quantityAvailable ?
    quantity > quantityAvailable ? <span className="mx-4 border px-2 border-muted-foreground rounded">{quantityAvailable}</span> : <span className="mx-4 border px-2 border-muted-foreground rounded">{quantity}</span> : null  
    }
      
      
      <Button className="text-lg" type="button" variant="ghost" onClick={increaseQuantity} disabled={quantityAvailable ? quantity >= quantityAvailable : false}>
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
