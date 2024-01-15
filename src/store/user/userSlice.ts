import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser, addToBasket } from "./userOperations";
import { IPayloadAddToBasketSuccess, IUserState } from "./types";
// import { IAuthState, IPayloadActionAuthSuccess } from "./types";
// import { IPayloadActionSuccess, ITodosState } from "./types";

export const initialState: IUserState = {
  user: {
    name: "",
    email: "",
    points: 0,
    avatar: null,
    location: "",
    language: "",
    address: "",
    isOnboarding: false,
    storage: [],
    basket: 0,
    historySearches: [],
  },
  error: {
    status: null,
    message: "",
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addToBasket.fulfilled,
      (
        state: IUserState,
        { payload }: PayloadAction<IPayloadAddToBasketSuccess>
      ) => {
        state.user.basket = state.user.basket += 1;
        state.error.status = null;
        state.error.message = "";
      }
    );
    builder.addCase(
      addToBasket.rejected,
      (state: IUserState, { payload }: any) => {
        state.error.status = payload.response.data.status;
        state.error.message = payload.response.data.message;
      }
    );
  },
});

export default UserSlice.reducer;
