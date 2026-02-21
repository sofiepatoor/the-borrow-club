import { getCurrentUser } from '@/auth';
import { getUserByUsername } from '@/app/actions/users';
import { findFriendshipBetweenUsers } from '@/app/actions/friendships';
import { notFound } from 'next/navigation';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import FriendsList from '@/components/features/friends/FriendsList';
import AddFriendButton from '@/components/features/friends/AddFriendButton';
import RemoveFriendButton from '@/components/features/friends/RemoveFriendButton';
import Card from '@/components/ui/Card';

import styles from './profile.module.scss';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  const currentUser = await getCurrentUser();

  if (!user) {
    return notFound();
  }
  if (!currentUser) {
    return <p>You must be signed in to view this profile.</p>;
  }

  const isOwnProfile = user.id === currentUser.id;
  const isFriend = await findFriendshipBetweenUsers(user.id, currentUser.id);

  return (
    <div>
      <Container>
        <h1>{user.username}&apos;s Profile</h1>

        <div className={styles.contentWrapper}>
          <div className={styles.sidebar}>
            <Image
              src="/next.svg"
              width={500}
              height={500}
              alt={`Picture of ${user.username}`}
              className={styles.profileImg}
            />

            <p>{user.email}</p>
            <p>Member since: {user.createdAt.toLocaleDateString()}</p>

            <div className={styles.profileActions}>
              {isOwnProfile && <Button>Edit profile</Button>}
              {!isOwnProfile &&
                (isFriend ? (
                  <RemoveFriendButton friendshipId={isFriend.id} />
                ) : (
                  user.id && <AddFriendButton friendId={user.id} />
                ))}
            </div>
          </div>

          <div className={styles.main}>
            <Card className={styles.description}>
              <h2>About me</h2>
              {user.bio ? (
                <p>{user.bio}</p>
              ) : (
                <p>This user has not added a bio yet.</p>
              )}
            </Card>

            <Card className={styles.friends}>
              <h2>Friends</h2>
              <FriendsList userId={user.id} />
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
