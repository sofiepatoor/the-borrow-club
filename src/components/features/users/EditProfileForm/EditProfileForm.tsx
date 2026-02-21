import { type User } from '@/generated/prisma/client';
import { updateProfile } from '@/app/actions/users';

import Form from 'next/form';
import Button from '@/components/ui/Button';

// import styles from './edit-profile-form.module.scss';

type EditProfileFormProps = {
  user: User;
};

export default function EditProfileForm({ user }: EditProfileFormProps) {
  return (
    <Form action={updateProfile}>
      <input type="hidden" name="userId" value={user.id} />

      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" defaultValue={user.name || ''} />
      <label htmlFor="bio">Bio</label>
      <textarea
        id="bio"
        name="bio"
        defaultValue={user.bio || ''}
        rows={3}
        placeholder="Tell us about yourself"
      />

      <Button type="submit">Update profile</Button>
    </Form>
  );
}
