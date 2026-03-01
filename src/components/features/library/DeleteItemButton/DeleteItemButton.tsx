import { deleteItem } from '@/app/actions/items';
import Button from '@/components/ui/Button';

type DeleteItemButtonProps = {
  itemId: number;
  className?: string;
};

export default function DeleteItemButton({
  itemId,
  className,
}: DeleteItemButtonProps) {
  return (
    <form action={deleteItem} className={className}>
      <input type="hidden" name="itemId" value={itemId} />
      <Button type="submit" variant="danger">
        Delete item
      </Button>
    </form>
  );
}
