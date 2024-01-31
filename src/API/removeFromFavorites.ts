import { axiosInstance } from 'store/auth/authOperations';
import React from 'react'
import { TBook } from 'store/books/types';

export default async function removeFromFavorites(id: number, token: string) {
    try {
        const { data } = await axiosInstance.delete(`/api/user/favorites/${id}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("removeFromFavorites: ", data);
        if(data.status !== 200) throw data;
        return data;
      } catch (error) {
        return error;
      }
}

