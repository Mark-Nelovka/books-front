import { axiosInstance } from "store/auth/authOperations";
import { TBook } from "store/books/types";

export class ApiService {
    async get(endpoint: string) {
        try {
            const { data } = await axiosInstance.get(endpoint);
            if(!data.data) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

      async post(key: string, { arg }: {arg: Partial<TBook>}) {
        try {
            const { data } = await axiosInstance.post(key, arg);
            if(data.status !== 201) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

      async delete(endpoint: string, { arg }: {arg: string}) {
        try {
            const { data } = await axiosInstance.delete(`${endpoint}/${arg}`);
            if(data.status !== 200) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

}