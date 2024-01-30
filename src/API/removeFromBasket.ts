import axios from 'axios';
import React from 'react'

export default async function removeFromBasket(payload: {id: number, token: string}) {
    try {
        const { data } = await axios.delete(`/api/user/basket/${payload.id}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${payload.token}`,
          },
        });
        console.log(data);
        return data;
      } catch (error) {
        return error;
      }
}
