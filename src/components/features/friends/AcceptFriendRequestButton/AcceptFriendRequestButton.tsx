import { acceptFriendship } from '@/app/actions/friendships';
import Button from '@/components/ui/Button';

type AcceptFriendRequestButtonProps = {
  friendshipId: number;
  className?: string;
};

export default function AcceptFriendRequestButton({
  friendshipId,
  className,
}: AcceptFriendRequestButtonProps) {
  return (
    <form action={acceptFriendship} className={className}>
      <input type="hidden" name="friendshipId" value={friendshipId} />
      <Button type="submit">Accept</Button>
    </form>
  );
}
