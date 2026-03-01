import { createLoanRequest } from '@/app/actions/loan-requests';
import Button from '@/components/ui/Button';

type RequestLoanButtonProps = {
  itemId: number;
  ownerId: string;
  className?: string;
};

export default function RequestLoanButton({
  itemId,
  ownerId,
  className,
}: RequestLoanButtonProps) {
  return (
    <form action={createLoanRequest} className={className}>
      <input type="hidden" name="itemId" value={itemId} />
      <input type="hidden" name="ownerId" value={ownerId} />
      <Button type="submit">Ask to borrow</Button>
    </form>
  );
}
