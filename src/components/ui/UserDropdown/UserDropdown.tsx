import { getCurrentUser } from '@/auth';
import { signOutAction } from '@/app/actions/auth';
import Link from 'next/link';
import { DropdownMenu } from 'radix-ui';
import { ChevronDownIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { SignOutDropdownItem } from './SignOutDropdownItem';

import styles from './user-dropdown.module.scss';

async function UserDropdown() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.trigger}>
          {user.name ? user.name : user.username}
          <ChevronDownIcon className={styles.triggerIcon} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} align="end">
          <DropdownMenu.Item className={styles.item} asChild>
            <Link href={`/users/${user?.username}`}>
              View profile
              <ArrowRightIcon />
            </Link>
          </DropdownMenu.Item>
          <SignOutDropdownItem signOutAction={signOutAction} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default UserDropdown;
