import { getUserByUsername } from '@/app/actions/users';
import { notFound } from 'next/navigation';

import Container from '@/components/ui/Container';

// import styles from './profile-page.module.scss';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  if (!user) {
    return notFound();
  }
  return (
    <div>
      <Container>
        <h1>{user.username}&apos;s Profile</h1>
        <p>{user.email}</p>
      </Container>
    </div>
  );
}
