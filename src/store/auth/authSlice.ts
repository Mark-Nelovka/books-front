import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registrationUser, resetError, signInUser } from "./authOperations";
import { IAuthState, IPayloadActionAuthSuccess } from "./types";
// import { IPayloadActionSuccess, ITodosState } from "./types";

export const initialState: IAuthState = {
  token: null,
  error: {
    status: null,
    message: "",
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registrationUser.pending, (state: IAuthState, _) => {
      (state.error.message = ""), (state.error.status = null);
    });
    builder.addCase(
      registrationUser.fulfilled,
      (
        state: IAuthState,
        { payload }: PayloadAction<IPayloadActionAuthSuccess>,
      ) => {
        state.token = payload.accessToken;
      },
    );
    builder.addCase(
      registrationUser.rejected,
      (state: IAuthState, { payload }: any) => {
        console.log("registrationUserRejected: ", payload.response.data);
        state.error.status = payload.response.data.status;
        state.error.message = payload.response.data.message;
      },
    );

    builder.addCase(signInUser.pending, (state: IAuthState, _) => {
      (state.error.message = ""), (state.error.status = null);
    });
    builder.addCase(
      signInUser.fulfilled,
      (
        state: IAuthState,
        { payload }: PayloadAction<IPayloadActionAuthSuccess>,
      ) => {
        state.token = payload.accessToken;
      },
    );
    builder.addCase(
      signInUser.rejected,
      (state: IAuthState, { payload }: any) => {
        console.log("SignInUserRejected: ", payload.response.data);
        state.error.status = payload.response.data.statusCode;
        state.error.message = payload.response.data.message;
      },
    );
    builder.addCase(resetError, (state, _) => {
      state.error.status = null;
      state.error.message = "";
    });
  },
});

export default AuthSlice.reducer;
