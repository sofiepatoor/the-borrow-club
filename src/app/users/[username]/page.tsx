import { getCurrentUser } from '@/auth';
import { getUserByUsername } from '@/app/actions/users';
import { findFriendshipBetweenUsers } from '@/app/actions/friendships';
import { getLoansForUser } from '@/app/actions/loans';
import { notFound } from 'next/navigation';

import Container from '@/components/ui/Container';
import ProfileImage from '@/components/features/users/ProfileImage';
import EditProfileModal from '@/components/features/users/EditProfileModal';
import FriendsList from '@/components/features/friends/FriendsList';
import AddFriendButton from '@/components/features/friends/AddFriendButton';
import RemoveFriendButton from '@/components/features/friends/RemoveFriendButton';
import Card from '@/components/ui/Card';
import ProfileImageUpload from '@/components/features/users/ProfileImageUpload';
import LoansList, {
  type LoanWithRelations,
} from '@/components/features/loans/LoansList';
import Button from '@/components/ui/Button';
import FriendRequestsList from '@/components/features/friends/FriendRequestsList';
import Section, { SectionHeader } from '@/components/ui/Section';
import SearchUsersModal from '@/components/features/users/SearchUsersModal';

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
  const loans = await getLoansForUser(user.id);
  const completedLoans = loans.filter((loan) => loan.endedAt);

  return (
    <div>
      <Container>
        <h1>{user.name ? `${user.name}` : user.username}&apos;s Profile</h1>

        <div className={styles.contentWrapper}>
          <div className={styles.sidebar}>
            <ProfileImage user={user} className={styles.profileImg} />

            <p>
              <strong>{user.name ? `${user.name}` : user.username}</strong>
            </p>
            <p>{user.email}</p>
            <p>Member since: {user.createdAt.toLocaleDateString()}</p>

            <div className={styles.profileActions}>
              {isOwnProfile && (
                <>
                  <ProfileImageUpload user={user} />
                  <EditProfileModal user={user}>
                    <Button>Edit profile</Button>
                  </EditProfileModal>
                </>
              )}
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
              <div className="rte">
                {user.bio ? (
                  <p>{user.bio}</p>
                ) : (
                  <p>This user has not added a bio yet.</p>
                )}
              </div>
            </Card>

            <Card className={styles.friends}>
              <Section verticalPadding="0">
                <SectionHeader>
                  <h2>Friends</h2>
                  {isOwnProfile && (
                    <SearchUsersModal userId={user.id}>
                      <Button>Search users</Button>
                    </SearchUsersModal>
                  )}
                </SectionHeader>

                <FriendsList userId={user.id} isOwnProfile={isOwnProfile} />
              </Section>

              <FriendRequestsList userId={user.id} />
            </Card>

            {isOwnProfile && (
              <Card>
                <h2>Borrow history</h2>
                <LoansList
                  currentUserId={currentUser.id}
                  loans={completedLoans as LoanWithRelations[]}
                />
              </Card>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
