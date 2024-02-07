import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchBookByCategory,
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
  reducers: {
    fetchHomeBooks(state, {payload}) {
      const { categories, allBooks, mostViewed, recentlyAdded} = payload;
      state.allBooks = allBooks;
      state.categories = categories;
      state.mostViewed = mostViewed;
      state.recentlyAdded = recentlyAdded;
    }
  },
  extraReducers: (builder) => {
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

export const {fetchHomeBooks} = BooksSlice.actions;
export default BooksSlice.reducer;
