'use client';

import { useActionState, useState } from 'react';
import Form from 'next/form';
import {
  ITEM_TYPE_OPTIONS,
  FIELDS_BY_ITEM_TYPE,
  type ItemType,
  type ItemTypeField,
} from '@/lib/item-types';
import { createItem, type CreateItemResult } from '@/app/actions/items';
import Button from '@/components/ui/Button';
import { Input, Select, TextArea } from '@/components/ui/Input';
import SearchMetadataButton from '@/components/features/library/SearchMetadataButton';

import styles from './add-item-form.module.scss';

function typeSpecificField(
  field: ItemTypeField,
  keyPrefix: string,
): React.ReactNode {
  const id = `${keyPrefix}-${field.key}`;
  const name = field.key;

  switch (field.type) {
    case 'text':
      return (
        <Input
          id={id}
          name={name}
          label={field.label}
          type="text"
          required={field.required}
          placeholder={field.label}
        />
      );
    case 'number':
      return (
        <Input
          id={id}
          name={name}
          label={field.label}
          type="number"
          required={field.required}
          placeholder={field.label}
        />
      );
    case 'checkbox':
      return (
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name={name} value="on" />
          {field.label}
        </label>
      );
    case 'select':
      return (
        <>
          <label htmlFor={id}>{field.label}</label>
          <select id={id} name={name}>
            <option value="">—</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </>
      );
    case 'multiselect':
      return (
        <>
          <label htmlFor={id}>{field.label}</label>
          <select id={id} name={name} multiple className={styles.multiselect}>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </>
      );
    default:
      return null;
  }
}

export default function AddItemForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [itemType, setItemType] = useState<ItemType>('OTHER');
  const [state, formAction] = useActionState<CreateItemResult | null, FormData>(
    async (_prev, formData) => createItem(formData),
    null,
  );

  if (!userId) {
    return null;
  }

  const typeFields = FIELDS_BY_ITEM_TYPE[itemType];

  return (
    <Form action={formAction} className={styles.addItemForm}>
      {state?.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}

      <input type="hidden" name="ownerId" value={userId} />

      <Input
        id="title"
        name="title"
        label="Title"
        type="text"
        placeholder="Item title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <TextArea
        id="description"
        name="description"
        label="Description"
        rows={2}
        placeholder="Optional description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Select
        id="itemType"
        name="itemType"
        label="Type"
        value={itemType}
        onChange={(e) => setItemType(e.target.value as ItemType)}
        required
      >
        {ITEM_TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>

      {typeFields.length > 0 && (
        <fieldset className={styles.typeFields}>
          <legend>Details</legend>
          {typeFields.map((field) => (
            <div key={field.key} className={styles.fieldRow}>
              {typeSpecificField(field, 'add-item')}
            </div>
          ))}
        </fieldset>
      )}

      {itemType === 'BOOK' && (
        <SearchMetadataButton itemType="BOOK">
          Search for book details
        </SearchMetadataButton>
      )}

      {itemType === 'MOVIE' && (
        <SearchMetadataButton itemType="MOVIE">
          Search for movie details
        </SearchMetadataButton>
      )}

      <Button type="submit">Add item</Button>
    </Form>
  );
}
