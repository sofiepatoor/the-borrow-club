import { deleteFriendship } from '@/app/actions/friendships';
import Button from '@/components/ui/Button';

type CancelFriendRequestButtonProps = {
  friendshipId: number;
  className?: string;
};

export default function CancelFriendRequestButton({
  friendshipId,
  className,
}: CancelFriendRequestButtonProps) {
  return (
    <form action={deleteFriendship} className={className}>
      <input type="hidden" name="friendshipId" value={friendshipId} />
      <Button type="submit" variant="danger">
        Cancel request
      </Button>
    </form>
  );
}
