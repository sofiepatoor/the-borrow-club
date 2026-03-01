import { cancelLoanRequest } from '@/app/actions/loan-requests';
import Button from '@/components/ui/Button';

type CancelLoanRequestButtonProps = {
  loanRequestId: string;
  className?: string;
};

export default function CancelLoanRequestButton({
  loanRequestId,
  className,
}: CancelLoanRequestButtonProps) {
  return (
    <form action={cancelLoanRequest} className={className}>
      <input type="hidden" name="loanRequestId" value={loanRequestId} />
      <Button type="submit">Cancel request</Button>
    </form>
  );
}
