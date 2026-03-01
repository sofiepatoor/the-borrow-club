'use client';

import { useActionState, useState, useMemo, useEffect, useRef } from 'react';
import Form from 'next/form';
import {
  FIELDS_BY_ITEM_TYPE,
  ITEM_TYPE_LABELS,
  type ItemTypeField,
} from '@/lib/item-types';
import { updateItem, type UpdateItemResult } from '@/app/actions/items';
import type { ItemWithOwnerAndDetails } from '@/types/items';
import Button from '@/components/ui/Button';
import { Input, Select, TextArea, Fieldset } from '@/components/ui/Input';

import styles from './edit-item-form.module.scss';

type FormValues = Record<string, string | string[]>;

function getInitialFormValues(item: ItemWithOwnerAndDetails): FormValues {
  const values: FormValues = {
    title: item.title,
    description: item.description ?? '',
  };

  switch (item.itemType) {
    case 'BOOK':
      if (item.bookDetails) {
        values.author = item.bookDetails.author;
        values.releaseYear = item.bookDetails.releaseYear?.toString() ?? '';
        values.language = item.bookDetails.language ?? '';
        values.fiction = item.bookDetails.fiction ? 'on' : '';
        values.genre = item.bookDetails.genre ?? [];
      }
      break;
    case 'MOVIE':
      if (item.movieDetails) {
        values.director = item.movieDetails.director ?? '';
        values.releaseYear = item.movieDetails.releaseYear?.toString() ?? '';
        values.genre = item.movieDetails.genre ?? [];
      }
      break;
    case 'VIDEO_GAME':
      if (item.videoGameDetails) {
        values.platform = item.videoGameDetails.platform ?? '';
        values.genre = item.videoGameDetails.genre ?? [];
      }
      break;
    case 'BOARD_GAME':
      if (item.boardGameDetails) {
        values.minPlayers = item.boardGameDetails.minPlayers?.toString() ?? '';
        values.maxPlayers = item.boardGameDetails.maxPlayers?.toString() ?? '';
        values.cooperative = item.boardGameDetails.cooperative ? 'on' : '';
        values.genre = item.boardGameDetails.genre ?? [];
      }
      break;
    case 'OTHER':
      break;
  }

  return values;
}

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
          value={(value as string) ?? ''}
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

type EditItemFormProps = {
  userId: string;
  item: ItemWithOwnerAndDetails;
  onSuccess?: () => void;
};

export default function EditItemForm({
  userId,
  item,
  onSuccess,
}: EditItemFormProps) {
  const initialValues = useMemo(() => getInitialFormValues(item), [item]);
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [state, formAction] = useActionState<UpdateItemResult | null, FormData>(
    async (_prev, formData) => updateItem(formData),
    null,
  );
  const prevStateRef = useRef<UpdateItemResult | null>(null);

  useEffect(() => {
    const prev = prevStateRef.current;
    prevStateRef.current = state;
    if (
      state != null &&
      !state.error &&
      (prev === null || prev?.error !== undefined)
    ) {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  if (!userId) {
    return null;
  }

  const typeFields = FIELDS_BY_ITEM_TYPE[item.itemType];

  return (
    <Form action={formAction} className={styles.editItemForm}>
      {state?.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}

      <input type="hidden" name="itemId" value={item.id} />
      <input type="hidden" name="ownerId" value={userId} />

      <Input
        id="edit-title"
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
        id="edit-description"
        name="description"
        label="Description"
        rows={2}
        placeholder="Optional description"
        value={(formValues.description as string) ?? ''}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      <p>
        <strong>Type:</strong> {ITEM_TYPE_LABELS[item.itemType]}
      </p>

      {typeFields.length > 0 && (
        <Fieldset legend="Details" className={styles.fieldRow}>
          {typeFields.map((field) => (
            <div key={field.key} className={styles.fieldRow}>
              {typeSpecificField(field, 'edit-item', formValues, setFormValues)}
            </div>
          ))}
        </Fieldset>
      )}

      <Button type="submit">Save changes</Button>
    </Form>
  );
}
