import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createItem } from '@/app/actions/items';

import Button from '../Button';

import styles from './add-item-form.module.scss';

async function AddItemForm() {
  const session = await auth();
  const userEmail = session?.user?.email ?? '';
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return null;
  }

  return (
    <form action={createItem} className={styles.wrapper}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        required
        placeholder="Item title"
      />
      <input type="hidden" name="ownerId" value={user.id} />
      <Button type="submit">Add item</Button>
    </form>
  );
}

export default AddItemForm;
