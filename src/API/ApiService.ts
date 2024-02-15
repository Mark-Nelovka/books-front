import { axiosInstance } from "store/auth/authOperations";
import { TBook } from "store/books/types";

export class ApiService {
    async get(endpoint: string) {
      // console.log(endpoint)
        try {
            const { data } = await axiosInstance.get(endpoint);
            if(!data.data) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

      async getMutation(endpoint: string, { arg }: {arg?: string}) {
        try {
            const { data } = await axiosInstance.get(`${endpoint}${arg}`);
            if(!data.data) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

      async post(endpoint: string, { arg }: {arg: Partial<TBook>}) {
        try {
            const { data } = await axiosInstance.post(endpoint, arg);
            if(data.status !== 201) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

      async delete(endpoint: string, { arg }: {arg: number}) {
        try {
            const { data } = await axiosInstance.delete(`${endpoint}/${arg}`);
            if(data.status !== 200) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

}