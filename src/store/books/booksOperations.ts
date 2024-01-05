import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "store/store";
import { SuccessPayloadFetchHomeBooks, TBook } from "./types";
// import {
//   IRegistrationInfoUser,
// } from "./types";

axios.defaults.baseURL = "https://p01--books--qqfgrnqblfk9.code.run";

const fetchHomeBooks = createAsyncThunk<
  SuccessPayloadFetchHomeBooks,
  void,
  { state: RootStore }
>("books/getBooksForHome", async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.token;

    if (!token)
      throw {
        status: 401,
        message: "Unauthorized",
      };

    const { data } = await axios.get(`/api/books/home`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

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

// const updatePage = createAction<number>("todos/updatePage");

export { fetchHomeBooks };
