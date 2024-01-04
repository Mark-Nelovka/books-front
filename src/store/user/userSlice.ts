import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "./userOperations";
import { IUserState } from "./types";
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
    // builder.addCase(registrationUser.pending, (state: IAuthState, _) => {
    // });
    // builder.addCase(
    //     registrationUser.fulfilled,
    //   (
    //     state: IAuthState,
    //     { payload }: PayloadAction<IPayloadActionAuthSuccess>
    //   ) => {
    //   }
    // );
    // builder.addCase(
    //     registrationUser.rejected,
    //   (state: IAuthState, { payload }: any) => {
    //     console.log(payload.response.data);
    //   }
    // );
  },
});

export default UserSlice.reducer;
