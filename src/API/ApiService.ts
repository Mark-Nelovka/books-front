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

      async post(endpoint: string, body: Partial<TBook>) {
        try {
            const { data } = await axiosInstance.post(endpoint, body);
            if(data.status !== 201) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

      async delete(endpoint: string) {
        try {
            const { data } = await axiosInstance.delete(endpoint);
            if(data.status !== 200) throw data;
            return data;
          } catch (error) {
            throw error;
          }
      }

}