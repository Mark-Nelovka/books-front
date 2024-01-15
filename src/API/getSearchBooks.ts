import axios from 'axios';
import React from 'react'

export default async function GetSearchBooksApi(searchParams: string, token: string) {
    try {
        const { data } = await axios.get(`/api/books/search/user-selection${searchParams}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("GetSearchBooksApi: ", data);
        if(!data.data) throw data;
        return data;
      } catch (error) {
        return error;
      }
}
