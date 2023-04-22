import { KnownFor } from '../types/person';

export function popularityFormula({
  rating,
  popularity,
  voteCount,
}: KnownFor): number {
  return voteCount * (rating || 0 / 10) * (popularity / 100);
}
