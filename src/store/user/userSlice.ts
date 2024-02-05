import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "./userOperations";
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
  reducers: {
    updateBasket(state, action) {
      state.user.basket = action.payload;
    },
  },
  extraReducers: () => {}
});
export const { updateBasket } = UserSlice.actions;
export default UserSlice.reducer;
