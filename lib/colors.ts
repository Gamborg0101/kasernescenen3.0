export type BookingColor = 'musikvidenskab' | 'dramaturgi' | 'ÆK' | 'litteraturhistorie' | 'unknown1' | 'unknown2';

export const bookingColors = {
  musikvidenskab: { bg: '#E6F1FB', border: '#185FA5', text: '#0C447C' }, // blue
  dramaturgi: { bg: '#EEEDFE', border: '#534AB7', text: '#3C3489' }, //lavender
  ÆK: { bg: '#E1F5EE', border: '#0F6E56', text: '#085041' }, // mint
  litteraturhistorie: { bg: '#FAEEDA', border: '#854F0B', text: '#633806' }, // amber
  unknown1: { bg: '#FCEBEB', border: '#A32D2D', text: '#791F1F' }, // red
  unknown2: { bg: '#FBEAF0', border: '#993556', text: '#72243E' }, // pink
};
