import React from 'react'
import { TBook } from 'store/books/types';
import { axiosInstance } from 'store/auth/authOperations';

export default async function AddToFavorites(book: Partial<TBook>, token: string) {
    try {
        const { data } = await axiosInstance.post(`/api/user/favorites`, book, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("AddToFavorites: ", data);
        if(data.status !== 201) throw data;
        return data;
      } catch (error) {
        return error;
      }
}

