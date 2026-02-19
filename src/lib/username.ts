import { prisma } from '@/lib/prisma';

export function normalizeUserNameFromEmail(input: string) {
  const normalized = input;
  return (
    normalized
      .toLowerCase()
      .replace(/\s+/g, '-') // spaces and similar → dash
      .replace(/[^a-z0-9_-]/g, '') // remove special characters (keep letters, numbers, dash, underscore)
      .replace(/-+/g, '-') // collapse multiple dashes
      .replace(/^[-_]+|[-_]+$/g, '') || 'user'
  ); // trim dashes/underscores; fallback if empty
}

export async function generateUsernameFromEmail(email: string) {
  const localPart = email.split('@')[0] ?? '';
  let base = normalizeUserNameFromEmail(localPart);
  if (base.length > 30) {
    base = base.slice(0, 30);
  }

  let username = base;
  let counter = 1;

  while (true) {
    const existing = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!existing) return username;

    username = `${base}-${counter}`;
    counter++;
  }
}
