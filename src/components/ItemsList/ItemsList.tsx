import { prisma } from '@/lib/prisma';

import styles from './items-list.module.scss';

async function ItemsList() {
  const items = await prisma.item.findMany({
    orderBy: { id: 'desc' },
    include: { owner: true },
  });

  return (
    <div className={styles.wrapper}>
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
