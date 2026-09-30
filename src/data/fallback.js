// Used only if Airtable isn't connected or can't be reached during a build,
// so the site always builds. Airtable is the source of truth once connected.
export const fallbackServices = [
  { name: 'Skin Fade / Taper', price: 23, studentPrice: 20, from: true,
    description: 'A precision-blended cut starting from grade 0 or below, creating a smooth transition from skin to length.' },
  { name: 'Skin Fade / Taper & Beard', price: 30, studentPrice: 26,
    description: 'Skin or taper fade with beard trim, shaped with blade and foiled shaver under the neck, creating a smooth transition from skin to length.' },
  { name: 'Standard Cut', price: 18, studentPrice: 16,
    description: 'A barbershop classic. Neatly tapered at the back and sides with balanced length on top, offering a clean, timeless finish that suits any style.' },
  { name: 'Standard Cut with Beard', price: 28,
    description: 'A barbershop classic. Neatly tapered at the back and sides with beard shape tidied with blade and foil shaver.' },
  { name: 'Beard Trim', price: 14,
    description: 'Detailed beard trim and shape-up, designed to enhance your facial structure. Includes tidy lines and balanced length.' },
  { name: 'VIP Service', comingSoon: true, description: '' },
];

export const fallbackTeam = [
  { name: 'Jake Ranger', role: 'Owner', instagram: 'jr_aceoffades' },
  { name: 'Luke', role: 'Barber' },
  { name: 'Ollie', role: 'Barber' },
];
