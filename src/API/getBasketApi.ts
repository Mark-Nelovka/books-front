import React from 'react'
import { axiosInstance } from 'store/auth/authOperations';

export default async function getBasketApi(token: string) {
    try {
        const { data } = await axiosInstance.get(`/api/user/basket`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("getBasketApi: ", data);
        if(!data.data) throw data;
        return data;
      } catch (error) {
        return error;
      }
}


