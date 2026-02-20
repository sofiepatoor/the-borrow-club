import { createFriendship } from '@/app/actions/friendships';
import Button from '@/components/ui/Button';

type AddFriendButtonProps = {
  friendId: string;
  className?: string;
};

export default function AddFriendButton({
  friendId,
  className,
}: AddFriendButtonProps) {
  return (
    <form action={createFriendship} className={className}>
      <input type="hidden" name="friendId" value={friendId} />
      <Button type="submit">Add friend</Button>
    </form>
  );
}
