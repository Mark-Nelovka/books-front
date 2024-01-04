import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registrationUser } from "./authOperations";
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
    builder.addCase(registrationUser.pending, (state: IAuthState, _) => {});
    builder.addCase(
      registrationUser.fulfilled,
      (
        state: IAuthState,
        { payload }: PayloadAction<IPayloadActionAuthSuccess>,
      ) => {},
    );
    builder.addCase(
      registrationUser.rejected,
      (state: IAuthState, { payload }: any) => {
        console.log(payload.response.data);
      },
    );
  },
});

export default AuthSlice.reducer;
