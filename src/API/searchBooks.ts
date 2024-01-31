import { axiosInstance } from 'store/auth/authOperations';
import React from 'react'

export default async function SearchBooksApi(searchStr: string, token: string) {
    try {
        const { data } = await axiosInstance.get(`/api/books/search?search=${searchStr}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("SearchBooksApiL ", data);
        if(!data.data) throw data;
        return data;
      } catch (error) {
        return error;
      }
}
