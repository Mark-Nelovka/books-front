import GetSearchBooksApi from 'API/getSearchBooks'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { TBook } from 'store/books/types';
import { useAppSelector } from 'store/hook';
import { Loader } from 'ui/Loader/Loader';

export default function SearchPage() {
    const [searchedBooks, setSearchedBooks] = useState<TBook[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const token = useAppSelector(state => state.auth.token);
    const location = useLocation();

    useEffect(() => {
      async function SearchBooks() {
        setIsLoading(true);
        try {
            const searchResult = await GetSearchBooksApi(location.search, token!);
            if(!searchResult.data) throw searchResult;
            setSearchedBooks(searchResult.data.books);
        } catch (error) {
            console.log(error)
            console.log("errorSearchPage")
        } finally {
            setIsLoading(false);
        }
      }
      SearchBooks();
    }, [])
    

  return (
    <div>
        {searchedBooks.length > 0 && !isLoading && 
        <ul>
            {searchedBooks.map((el) => <li key={el.id}>{el.title}</li>)}
        </ul>
        }
        {isLoading && <Loader />
        }
    </div>
  )
}
