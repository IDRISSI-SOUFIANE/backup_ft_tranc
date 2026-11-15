export interface SearchableUser {
  first_name?: string | null;
  last_name?: string | null;
}

export function matchesSearch(user: SearchableUser | null | undefined, query: string): boolean {
  if (!query) return true;
  if (!user) return false;

  const q = query.toLowerCase().trim();
  const firstName = (user.first_name || "").toLowerCase();
  const lastName = (user.last_name || "").toLowerCase();
  const fullName = `${firstName} ${lastName}`.trim();

  return firstName.includes(q) || lastName.includes(q) || fullName.includes(q);
}