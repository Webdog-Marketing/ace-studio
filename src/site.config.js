// Things that rarely change. Edit here, commit, and Vercel redeploys.
export const site = {
  name: 'ACE Studio Barbershop',
  url: 'https://acestudiobarbershop.com',
  title: 'Barber Shop in Exeter | ACE Studio Barbers, Longbrook Street',
  description:
    'ACE Studio is a barber shop in Exeter city centre. Our Exeter barbers specialise in skin fades, tapers, classic cuts and beard trims. Book online today.',

  bookingUrl: 'https://barbr.me/acestudiobarbershop',
  instagram: 'acestudio_uk',
  googleMapsUrl: 'https://maps.app.goo.gl/WX7gs9wo6rXXrkDC8',
  googleReviewUrl: 'https://g.page/r/CYeT-qHvV4XaECE/review',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.6034414138608!2d-3.5270813999999997!3d50.7272958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486da5a33269b187%3A0xda8557efa1fa9387!2sAce%20Studios%20Barber%20Shop!5e0!3m2!1sen!2suk!4v1790793376479!5m2!1sen!2suk',

  address: {
    street: '35 Longbrook Street',
    city: 'Exeter',
    postcode: 'EX4 6AW',
    lat: 50.7272958,
    lng: -3.5270814,
  },

  // Optional extra line after the address in the hero, e.g. 'Now open Sundays'. Leave as '' for none.
  announcement: '',

  // Add opening hours when confirmed, e.g.
  // { days: 'Tuesday to Friday', hours: '9am to 6pm' }
  // The section stays hidden while this list is empty.
  hours: [],

  parking: [
    { name: 'King William Street Car Park', code: '29003' },
    { name: 'Howell Road Car Park', code: '29015' },
  ],
};
