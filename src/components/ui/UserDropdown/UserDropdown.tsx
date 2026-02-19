import { getCurrentUser } from '@/auth';
import { signOutAction } from '@/app/actions/auth';
import Link from 'next/link';
import { DropdownMenu } from 'radix-ui';
import { ChevronDownIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { SignOutDropdownItem } from './SignOutDropdownItem';

import styles from './user-dropdown.module.scss';

async function UserDropdown() {
  const user = await getCurrentUser();
  const userName = user?.name ?? user?.email ?? 'User';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.trigger}>
          {userName}
          <ChevronDownIcon className={styles.triggerIcon} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} align="end">
          <DropdownMenu.Item className={styles.item} asChild>
            <Link href="/">
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
