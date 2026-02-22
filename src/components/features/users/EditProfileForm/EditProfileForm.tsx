import { type User } from '@/generated/prisma/client';
import { updateProfile } from '@/app/actions/users';

import Form from 'next/form';
import Button from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';

// import styles from './edit-profile-form.module.scss';

type EditProfileFormProps = {
  user: User;
};

export default function EditProfileForm({ user }: EditProfileFormProps) {
  return (
    <Form action={updateProfile}>
      <input type="hidden" name="userId" value={user.id} />

      <Input
        id="name"
        label="Name"
        name="name"
        type="text"
        defaultValue={user.name || ''}
      />
      <TextArea
        id="bio"
        label="Bio"
        name="bio"
        defaultValue={user.bio || ''}
        rows={3}
        placeholder="Tell us about yourself"
      />

      <Button type="submit">Update profile</Button>
    </Form>
  );
}
