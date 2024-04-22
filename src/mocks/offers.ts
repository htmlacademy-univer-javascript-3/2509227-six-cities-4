import { IOffer } from '../types';

export const mockOffers: IOffer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    rating: 80,
    type: 'Apartment',
    isBookmarked: false,
    image: 'markup/img/apartment-01.jpg',
    isPremium: true,
  },
  {
    id: 2,
    title: 'Wood and stone place',
    price: 80,
    rating: 80,
    type: 'Room',
    isBookmarked: true,
    image: 'markup/img/room.jpg',
    isPremium: false,
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    price: 132,
    rating: 80,
    type: 'Apartment',
    isBookmarked: false,
    image: 'markup/img/apartment-02.jpg',
    isPremium: false,
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    price: 180,
    rating: 100,
    type: 'Apartment',
    isBookmarked: false,
    image: 'markup/img/apartment-03.jpg',
    isPremium: true,
  },
];
