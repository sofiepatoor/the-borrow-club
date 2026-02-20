import { deleteFriendship } from '@/app/actions/friendships';
import Button from '@/components/ui/Button';

type RemoveFriendButtonProps = {
  friendshipId: number;
  className?: string;
};

export default function RemoveFriendButton({
  friendshipId,
  className,
}: RemoveFriendButtonProps) {
  return (
    <form action={deleteFriendship} className={className}>
      <input type="hidden" name="friendshipId" value={friendshipId} />
      <Button type="submit">Remove friend</Button>
    </form>
  );
}
