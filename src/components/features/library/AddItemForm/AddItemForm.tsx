'use client';

import { useActionState, useState, useEffect } from 'react';
import Form from 'next/form';
import {
  ITEM_TYPE_OPTIONS,
  FIELDS_BY_ITEM_TYPE,
  type ItemType,
  type ItemTypeField,
} from '@/lib/item-types';
import { createItem, type CreateItemResult } from '@/app/actions/items';
import Button from '@/components/ui/Button';
import { Input, Select, TextArea, Fieldset } from '@/components/ui/Input';
import SearchMetadataModal from '@/components/features/library/SearchMetadataModal';

import styles from './add-item-form.module.scss';

export type FormValues = Record<string, string | string[]>;

function typeSpecificField(
  field: ItemTypeField,
  keyPrefix: string,
  formValues: FormValues,
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>,
): React.ReactNode {
  const id = `${keyPrefix}-${field.key}`;
  const name = field.key;
  const value = formValues[name];
  const setValue = (next: string | string[]) =>
    setFormValues((prev) => ({ ...prev, [name]: next }));

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
          value={(value as string) ?? ''}
          onChange={(e) => setValue(e.target.value)}
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
          value={(value as string) ?? ''}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    case 'checkbox':
      return (
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name={name}
            value="on"
            checked={value === 'on'}
            onChange={(e) => setValue(e.target.checked ? 'on' : '')}
          />
          {field.label}
        </label>
      );
    case 'select':
      return (
        <Select
          id={id}
          name={name}
          label={field.label}
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      );
    case 'multiselect': {
      const selected = Array.isArray(value) ? value : [];
      return (
        <Select
          id={id}
          name={name}
          label={field.label}
          multiple={true}
          value={selected}
          onChange={(e) => {
            const options = e.target.selectedOptions;
            setValue(Array.from(options).map((opt) => opt.value));
          }}
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      );
    }
    default:
      return null;
  }
}

export default function AddItemForm({ userId }: { userId: string }) {
  const [formValues, setFormValues] = useState<FormValues>({
    itemType: 'OTHER',
  });
  const [state, formAction] = useActionState<CreateItemResult | null, FormData>(
    async (_prev, formData) => createItem(formData),
    null,
  );

  useEffect(() => {
    if (state && !state.error) {
      const id = setTimeout(() => setFormValues({ itemType: 'OTHER' }), 0);
      return () => clearTimeout(id);
    }
  }, [state]);

  const itemType = (formValues.itemType as ItemType) ?? 'OTHER';

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
        value={(formValues.title as string) ?? ''}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, title: e.target.value }))
        }
        required
      />

      <TextArea
        id="description"
        name="description"
        label="Description"
        rows={2}
        placeholder="Optional description"
        value={(formValues.description as string) ?? ''}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      <Select
        id="itemType"
        name="itemType"
        label="Type"
        value={''}
        placeholder="Select type"
        onChange={(e) =>
          setFormValues((prev) => ({
            ...prev,
            itemType: e.target.value as ItemType,
          }))
        }
        required
      >
        {ITEM_TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>

      {typeFields.length > 0 && (
        <Fieldset legend="Details" className={styles.typeFields}>
          {typeFields.map((field) => (
            <div key={field.key} className={styles.fieldRow}>
              {typeSpecificField(field, 'add-item', formValues, setFormValues)}
            </div>
          ))}
        </Fieldset>
      )}

      {itemType === 'BOOK' && (
        <SearchMetadataModal
          itemType="BOOK"
          onSelectMetadata={(data) => {
            const rest = { ...data };
            delete (rest as Record<string, unknown>).id;
            setFormValues((prev) => ({
              itemType: (prev.itemType as ItemType) ?? 'OTHER',
              ...rest,
            }));
          }}
        >
          <Button>Search for book details</Button>
        </SearchMetadataModal>
      )}

      {itemType === 'MOVIE' && (
        <SearchMetadataModal
          itemType="MOVIE"
          onSelectMetadata={(data) => {
            const rest = { ...data };
            delete (rest as Record<string, unknown>).id;
            setFormValues((prev) => ({
              itemType: (prev.itemType as ItemType) ?? 'OTHER',
              ...rest,
            }));
          }}
        >
          <Button>Search for movie details</Button>
        </SearchMetadataModal>
      )}

      <Button type="submit">Add item</Button>
    </Form>
  );
}
