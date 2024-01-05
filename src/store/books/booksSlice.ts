import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHomeBooks } from "./booksOperations";
import { IBooksState, SuccessPayloadFetchHomeBooks } from "./types";
// import { IUserState } from "./types";
// import { IAuthState, IPayloadActionAuthSuccess } from "./types";
// import { IPayloadActionSuccess, ITodosState } from "./types";

export const initialState: IBooksState = {
  categories: [{ name: "", count: 0, image: "" }],
  allBooks: {
    books: [],
    info: {},
  },
  recentlyAdded: {
    books: [],
    info: {},
  },
  mostViewed: {
    books: [],
    info: {},
  },
  error: {},
};

const UserSlice = createSlice({
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
  },
});

export default UserSlice.reducer;
