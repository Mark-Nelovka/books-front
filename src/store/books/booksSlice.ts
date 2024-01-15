import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHomeBooks, fetchBookByCategory,
fetchAllBooks, fetchPopularBooks, fetchRecentlyBooks
} from "./booksOperations";
import { booksForPages, IBooksState, SuccessPayloadFetchHomeBooks, SuccessPayloadGetBookByCategory } from "./types";

export const initialState: IBooksState = {
  categories: [{ name: "", count: 0, image: "" }],
  allBooks: {
    books: [],
    info: {
      currentPage: ""
    },
  },
  categoryBook: {
    books: [],
    info: {
      currentPage: ""
    },
  },
  recentlyAdded: {
    books: [],
    info: {
      currentPage: ""
    },
  },
  mostViewed: {
    books: [],
    info: {
      currentPage: ""
    },
  },
  error: {},
};

const BooksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeBooks.pending, (state: IBooksState, _) => {
      state.error = {};
    });
    builder.addCase(
      fetchHomeBooks.fulfilled,
      (
        state: IBooksState,
        { payload }: PayloadAction<SuccessPayloadFetchHomeBooks>,
      ) => {
        state.categories = payload.data.categories;
        state.allBooks = payload.data.allBooks;
        state.recentlyAdded = payload.data.recentlyAdded;
        state.mostViewed = payload.data.mostViewed;
      },
    );
    builder.addCase(
      fetchHomeBooks.rejected,
      (state: IBooksState, { payload }: any) => {
        state.error.status = payload.response.data.status;
        state.error.message = payload.response.data.message;
      },
    );
    builder.addCase(
      fetchBookByCategory.fulfilled,
      (
        state: IBooksState,
        { payload }: PayloadAction<SuccessPayloadGetBookByCategory>,
      ) => {
        const checkPage = payload.data.info.currentPage.split("?")[1].split("&").map((el) => {
          const [key, value] = el.split('=');
          if(key === 'page') {
            return value;
          }
        }).filter(el => el);
        state.categoryBook.books = checkPage ? payload.data.books : [...state.categoryBook.books, ...payload.data.books]
        state.categoryBook.info = payload.data.info;
      },
    );
    builder.addCase(
      fetchBookByCategory.rejected,
      (state: IBooksState, { payload }: any) => {
        state.error.status = payload.response.data.status;
        state.error.message = payload.response.data.message;
      },
    );
    builder.addCase(
      fetchAllBooks.fulfilled,
      (
        state: IBooksState,
        { payload }: PayloadAction<SuccessPayloadGetBookByCategory>,
      ) => {
        const checkPage = payload.data.info.currentPage.split("?")[1].split("&").map((el) => {
          const [key, value] = el.split('=');
          if(key === 'page') {
            return value;
          }
        }).filter(el => el);
        state.allBooks.books = checkPage ? payload.data.books : [...state.allBooks.books, ...payload.data.books]
        state.allBooks.info = payload.data.info;      },
    );
    builder.addCase(
      fetchAllBooks.rejected,
      (state: IBooksState, { payload }: any) => {
        state.error.status = payload.response.data.status;
        state.error.message = payload.response.data.message;
      },
    );
    builder.addCase(
      fetchRecentlyBooks.fulfilled,
      (
        state: IBooksState,
        { payload }: PayloadAction<SuccessPayloadGetBookByCategory>,
      ) => {
        const checkPage = payload.data.info.currentPage.split("?")[1].split("&").map((el) => {
          const [key, value] = el.split('=');
          if(key === 'page') {
            return value;
          }
        }).filter(el => el);
        state.recentlyAdded.books = checkPage ? payload.data.books : [...state.recentlyAdded.books, ...payload.data.books]
        state.recentlyAdded.info = payload.data.info;      },
    );
    builder.addCase(
      fetchRecentlyBooks.rejected,
      (state: IBooksState, { payload }: any) => {
        state.error.status = payload.response.data.status;
        state.error.message = payload.response.data.message;
      },
    );
    builder.addCase(
      fetchPopularBooks.fulfilled,
      (
        state: IBooksState,
        { payload }: PayloadAction<SuccessPayloadGetBookByCategory>,
      ) => {
        const checkPage = payload.data.info.currentPage.split("?")[1].split("&").map((el) => {
          const [key, value] = el.split('=');
          if(key === 'page') {
            return value;
          }
        }).filter(el => el);
        state.mostViewed.books = checkPage ? payload.data.books : [...state.mostViewed.books, ...payload.data.books]
        state.mostViewed.info = payload.data.info;      },
    );
    builder.addCase(
      fetchPopularBooks.rejected,
      (state: IBooksState, { payload }: any) => {
        state.error.status = payload.response.data.status;
        state.error.message = payload.response.data.message;
      },
    );
  },
});

export default BooksSlice.reducer;
