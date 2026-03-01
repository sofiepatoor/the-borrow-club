import { rejectLoanRequest } from '@/app/actions/loan-requests';
import Button from '@/components/ui/Button';

type RejectLoanRequestButtonProps = {
  loanRequestId: string;
  className?: string;
};

export default function RejectLoanRequestButton({
  loanRequestId,
  className,
}: RejectLoanRequestButtonProps) {
  return (
    <form action={rejectLoanRequest} className={className}>
      <input type="hidden" name="loanRequestId" value={loanRequestId} />
      <Button type="submit" variant="danger">
        Reject
      </Button>
    </form>
  );
}
