import { auth } from '@/auth';
import { createItem } from '@/app/actions/items';

import Button from '@/components/ui/Button';

import styles from './add-item-form.module.scss';

async function AddItemForm() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  return (
    <form action={createItem} className={styles.addItemForm}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        required
        placeholder="Item title"
      />
      <input type="hidden" name="ownerId" value={userId} />
      <Button type="submit">Add item</Button>
    </form>
  );
}

export default AddItemForm;
