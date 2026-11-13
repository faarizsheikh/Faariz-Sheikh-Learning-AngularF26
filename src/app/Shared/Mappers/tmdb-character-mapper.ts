// CHARACTER DATA INTERFACE (character-data.ts):

import type { Character } from '../Models/character-data';
import type { TMDBCastMember, TMDBCreditsResponse } from '../Models/tmdb-credits-data';

// Existing local character images:
const asset_prefix = '../../Assets/character-images/';

const charImages: Record<string, string> = {
  billdenbrough: asset_prefix + 'bill-den.png',
  georgiedenbrough: asset_prefix + 'george-den.png',
  pennywise: asset_prefix + 'pw-clown.png',
  richietozier: asset_prefix + 'rich-toz.png',
  stanleyuris: asset_prefix + 'stan-ur.png',
  eddiekaspbrak: asset_prefix + 'eds-k.png',
  beverlymarsh: asset_prefix + 'bev-marsh.png',
  mikehanlon: asset_prefix + 'mike-han.png',
  benhanscom: asset_prefix + 'ben-hc.png',
};

// Fix character names for looking up their image:
function fixCharName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Map a TMDB cast member into our Character model (Returns character):
export function mapTMDBCastMember(castMember: TMDBCastMember): Character {
  const charName = castMember.character.trim() || castMember.name.trim();

  // Split the character's name ("Billy Denbrough" -> ["Billy", "Denbrough]"):
  const [firstName = charName, ...lastNameParts] = charName.split(/\s+/);
  const lastName = lastNameParts.join(' '); // Taking rest of the array parts, joining them as the value of lastName.

  return {
    id: castMember.credit_id,
    firstName,
    nickName: undefined,
    lastName,
    quote: '',
    age: undefined,
    gender: 'Unknown',
    status: undefined,
    played_by: castMember.name,
    character_type: 'Unknown',
    description: '',
    imageLink: charImages[fixCharName(charName)] ?? 'Assets/no-img.png',
  };
}

// Map the complete API response into the Character array:
export function mapTMDBCreditsResponse(response: TMDBCreditsResponse): Character[] {
  return [...response.cast].sort((a, b) => a.order - b.order).map(mapTMDBCastMember);
}
