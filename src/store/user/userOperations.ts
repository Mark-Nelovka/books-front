import axios from "axios";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TBook } from "store/books/types";
import { IPayloadAddToBasket } from "./types";
import { axiosInstance } from "store/auth/authOperations";


const getCurrentUser = createAsyncThunk(
  "user/getUser",
  async (payload: string, thunkApi) => {
    try {
      const { data } = await axiosInstance.get(``, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Bearer: `${payload}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// const removeFromBasket = createAsyncThunk(
//   "user/removeFromBasket",
//   async (payload: {id: number, token: string}, thunkApi) => {
    
//     try {
//       const { data } = await axios.delete(`/api/user/basket/${payload.id}`, {
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           Authorization: `Bearer ${payload.token}`,
//         },
//       });
//       console.log(data);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   },
// );

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

export { getCurrentUser };
