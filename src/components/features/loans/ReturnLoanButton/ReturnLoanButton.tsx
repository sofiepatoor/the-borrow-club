import { returnLoan } from '@/app/actions/loans';
import Button from '@/components/ui/Button';

type ReturnLoanButtonProps = {
  loanId: string;
  className?: string;
};

export default function ReturnLoanButton({
  loanId,
  className,
}: ReturnLoanButtonProps) {
  return (
    <form action={returnLoan} className={className}>
      <input type="hidden" name="loanId" value={loanId} />
      <Button type="submit">Return item</Button>
    </form>
  );
}
