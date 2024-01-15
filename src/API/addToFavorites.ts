import axios from 'axios';
import React from 'react'
import { TBook } from 'store/books/types';

export default async function AddToFavorites(book: TBook, token: string) {
    try {
        const { data } = await axios.post(`/api/user/favorites`, book, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("AddToFavorites: ", data);
        if(!data.data) throw data;
        return data;
      } catch (error) {
        return error;
      }
}

