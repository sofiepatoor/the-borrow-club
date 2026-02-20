import { deleteFriendship } from '@/app/actions/friendships';
import Button from '@/components/ui/Button';

type RejectFriendRequestButtonProps = {
  friendshipId: number;
  className?: string;
};

export default function RejectFriendRequestButton({
  friendshipId,
  className,
}: RejectFriendRequestButtonProps) {
  return (
    <form action={deleteFriendship} className={className}>
      <input type="hidden" name="friendshipId" value={friendshipId} />
      <Button type="submit">Reject</Button>
    </form>
  );
}
