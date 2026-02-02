import { createItem } from '@/app/actions/items';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

import { SignInButton } from '@/components/sign-in-button';
import { SignOutButton } from '@/components/sign-out-button';

import styles from './homepage.module.scss';

export default async function Home() {
  const session = await auth();
  const [items, users] = await Promise.all([
    prisma.item.findMany({
      orderBy: { id: 'desc' },
      include: { owner: true },
    }),
    prisma.user.findMany({ orderBy: { id: 'asc' } }),
  ]);

  return (
    <div className={styles.page}>
      <h1>The Borrow Club</h1>

      <h2>Sign in</h2>
      <SignInButton />

      {session?.user ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <SignOutButton />
        </>
      ) : (
        <p>Not signed in</p>
      )}

      <h2>My library</h2>

      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Owned by {item.owner.name ?? item.owner.email}</p>
        </div>
      ))}

      <h3>Add item</h3>
      <form action={createItem} className={styles.form}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Item title"
        />
        <label htmlFor="ownerId">Owner</label>
        <select id="ownerId" name="ownerId" required>
          <option value="">Select owner</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name ?? user.email}
            </option>
          ))}
        </select>
        <button type="submit">Add item</button>
      </form>
    </div>
  );
}
