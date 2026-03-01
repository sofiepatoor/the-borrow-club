import { acceptLoanRequest } from '@/app/actions/loan-requests';
import Button from '@/components/ui/Button';

type AcceptLoanRequestButtonProps = {
  loanRequestId: string;
  className?: string;
};

export default function AcceptLoanRequestButton({
  loanRequestId,
  className,
}: AcceptLoanRequestButtonProps) {
  return (
    <form action={acceptLoanRequest} className={className}>
      <input type="hidden" name="loanRequestId" value={loanRequestId} />
      <Button type="submit">Accept</Button>
    </form>
  );
}
