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

export interface IUserInfo {
  email: string;
  avatarUrl: string;
  token: string;
}

export interface IFullOffer extends IOffer {
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
}

export interface IRentalState {
  city: string;
  offers: IOffer[];
  cities: string[];
  sortType: string;
  highlightedOffer: number | null;
  loading: boolean;
  error: string | null;
  authorizationStatus: 'NO_AUTH' | 'AUTH';
  userInfo: IUserInfo | null;
  currentOffer: IFullOffer | null;
  nearbyOffers: IOffer[];
  comments: IComment[];
  favorites: IOffer[];
  authChecking: boolean;
}

export interface IComment {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
}
