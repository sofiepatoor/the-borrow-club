import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

import styles from './items-list.module.scss';

async function ItemsList() {
  const session = await auth();
  const userId = session?.user?.id ?? '';

  const items = await prisma.item.findMany({
    where: { ownerId: userId },
    orderBy: { id: 'desc' },
    include: { owner: true },
  });

  return (
    <div className={styles.wrapper}>
      <p>User ID: {userId}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
