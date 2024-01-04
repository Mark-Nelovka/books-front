import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IRegistrationInfoUser, ISignInInfoUser } from "./types";

axios.defaults.baseURL = "https://p01--books--qqfgrnqblfk9.code.run/api/auth";

const registrationUser = createAsyncThunk(
  "auth/registration",
  async (payload: IRegistrationInfoUser, thunkApi) => {
    console.log("payloadRegistration: ", payload);
    try {
      const { data } = await axios.post(`/registration`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      if(!data) throw data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const signInUser = createAsyncThunk(
  "auth/signIn",
  async (payload: ISignInInfoUser, thunkApi) => {
    console.log("payloadRegistration: ", payload);
    try {
      const { data } = await axios.post(`/login`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      if(!data) throw data;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// const getCompletedTodos = createAsyncThunk(
//   "todos/fetchCompletedTodos",
//   async ({ offset, limit, page }: TParametrsGetAll, thunkApi) => {
//     try {
//       const { data } = await axios.get(
//         `/completed?page=${page}&offset=${offset}&limit=${limit}`,
//         {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

// const getPassedTodos = createAsyncThunk(
//   "todos/fetchPassedTodos",
//   async ({ offset, limit, page }: TParametrsGetAll, thunkApi) => {
//     try {
//       const { data } = await axios.get(
//         `/passed?page=${page}&offset=${offset}&limit=${limit}`,
//         {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

// const createTodo = createAsyncThunk(
//   "todos/createTodo",
//   async ({ newTodo, offset, limit, page }: ICreateTodoPayload, thunkApi) => {
//     try {
//       const { data } = await axios.post(
//         `?page=${page}&offset=${offset}&limit=${limit}`,
//         newTodo,
//         {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

// const removeTodo = createAsyncThunk(
//   "todos/removeTodo",
//   async ({ id, offset, limit, page }: IRemovePayload, thunkApi) => {
//     try {
//       const { data } = await axios.delete(
//         `/${id}?page=${page}&offset=${offset}&limit=${limit}`,
//         {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

// const updateTodo = createAsyncThunk(
//   "todos/updateTodo",
//   async ({ newTodo, offset, limit, page }: IUpdatePayload, thunkApi) => {
//     try {
//       const { data } = await axios.patch(
//         `${newTodo!.id}?page=${page}&offset=${offset}&limit=${limit}`,
//         newTodo,
//         {
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

const resetError = createAction("auth/resetError");

export { registrationUser, resetError, signInUser };
