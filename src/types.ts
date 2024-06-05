export interface IOffer {
  id: string;
  title: string;
  price: number;
  rating: number;
  type: string;
  isFavorite: boolean;
  previewImage: string;
  isPremium: boolean;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
}

export interface IRentalState {
  city: string;
  offers: IOffer[];
  cities: string[];
  sortType: string;
  highlightedOffer: number | null;
  loading: boolean;
  error: string | null;
}
