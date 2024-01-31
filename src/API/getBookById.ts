import { axiosInstance } from 'store/auth/authOperations';
import React from 'react'

export default async function GetBookById(id: string, token: string) {
    try {
        const { data } = await axiosInstance.get(`/api/books/${id}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("GetBookById: ", data);
        if(!data.data) throw data;
        return data;
      } catch (error) {
        return error;
      }
}

