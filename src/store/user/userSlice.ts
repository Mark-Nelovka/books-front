import { createSlice } from "@reduxjs/toolkit";
import { IUserState, counterOperations } from "./types";

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
    updateBasket(state, {payload}) {
      switch (payload) {
        case counterOperations.increment:
          state.user.basket += 1;
          break;
        case counterOperations.decrement:
          state.user.basket -= 1;
          break;
      
        default:
          state.user.basket = payload || 0;
          break;
      }
    },
  },
  extraReducers: () => {}
});
export const { updateBasket } = UserSlice.actions;
export default UserSlice.reducer;
