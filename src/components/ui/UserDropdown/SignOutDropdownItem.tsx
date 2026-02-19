'use client';

import { DropdownMenu } from 'radix-ui';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import styles from './user-dropdown.module.scss';

export function SignOutDropdownItem({
  signOutAction,
}: {
  signOutAction: () => Promise<void>;
}) {
  return (
    <DropdownMenu.Item
      className={styles.item}
      onSelect={() => signOutAction()}
    >
      Logout
      <ArrowRightIcon />
    </DropdownMenu.Item>
  );
}
