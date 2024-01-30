import { TBook } from "store/books/types";

export interface IUserState {
  user: {
    name: string;
    email: string;
    points: number;
    avatar: null | string;
    location: string;
    language: string;
    address: string;
    isOnboarding: boolean;
    storage: string[];
    basket: number;
    historySearches: string[];
  };
  error: {
    status: null | number;
    message: string;
  };
}

export interface IPayloadAddToBasket {
  token: string,
  book: Partial<TBook>
}

export interface IPayloadAddToBasketSuccess {
  book: number
}