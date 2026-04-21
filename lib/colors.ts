export type StudyProgram = 'musikvidenskab' | 'dramaturgi' | 'ÆK' | 'litteraturhistorie' | 'unknown1' | 'unknown2';

export const bookingColors: Record<StudyProgram, string> = {
  musikvidenskab: 'bg-blue-100 border-blue-600 text-blue-900',
  dramaturgi: 'bg-purple-100 border-purple-600 text-purple-900',
  ÆK: 'bg-green-100 border-green-600 text-green-900',
  litteraturhistorie: 'bg-amber-100 border-amber-600 text-amber-900',
  unknown1: 'bg-red-100 border-red-600 text-red-900',
  unknown2: 'bg-pink-100 border-pink-600 text-pink-900',
};
