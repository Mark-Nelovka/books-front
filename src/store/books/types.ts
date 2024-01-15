export type TBook = {
  id: number;
  userId: number;
  title: string;
  description: string;
  author: string;
  price: string;
  images: string[];
  category: string;
  genre: string;
  condition: string;
  pages: number;
  status: "pending" | "completed" | "destroyed";
  isFavorite: boolean;
  view: number;
  basket: number;
  storage: [];
  dimensions: string;
  createdAt: string;
};

export interface IBooksState {
  categories: [{ name: string; count: number; image: string }];
  allBooks: booksForPages;
  categoryBook: booksForPages;
  recentlyAdded: booksForPages;
  mostViewed: booksForPages;
  error: {
    status?: null | number;
    message?: string;
  };
}

export interface booksForPages {
  books: TBook[];
  info: {
    currentPage: string;
    nextPage?: string;
  };
}

export interface SuccessPayloadFetchHomeBooks {
  data: {
    categories: [{ name: string; count: number; image: string }];
    allBooks: booksForPages;
    recentlyAdded: booksForPages;
    mostViewed: booksForPages;
  };
}

export interface SuccessPayloadSearchBook {
  data: {
    searchResult: Partial<TBook>[]
  };
}

export interface SuccessPayloadGetSearchedBook extends Omit<booksForPages, 'info'> {
  books: TBook[]
}

export interface SuccessPayloadGetBookByCategory {
  data: booksForPages
}
