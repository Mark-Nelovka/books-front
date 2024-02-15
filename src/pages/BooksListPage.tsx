import React, { useEffect, useState } from 'react'
import Header from 'components/Header/Header'
import BackIcon from 'assets/icons/arrow-left.svg';
import Button from 'ui/Button/Button';
import Title from 'components/Title/Title';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hook';
import Footer from 'components/Footer/Footer';
import BookList, { EPages } from 'components/BookList/BookList';
import { Loader, LoaderPropagate } from 'ui/Loader/Loader';
import Filter from 'components/Filter/Filter';
import { TBook, booksForPages } from 'store/books/types';
import BasketButton from 'components/BasketButton/BasketButton';
import Notiflix from 'notiflix';
import { updateBasket } from 'store/user/userSlice';
import { counterOperations } from 'store/user/types';
import { BooksEndpoints, UserEndpoints } from 'API/endpoints';
import { api } from './Home/HomePage';
import useSWRMutation from 'swr/mutation';
import useSWRInfinite from 'swr/infinite'

export function getCurrentPage(path: string) {
  return path.split('?')[0].split('/').reverse()[0];
}

export function getCurrentSearchParams(path: string) {
  return path.split('?')[1].trim()
}

export function getCategoryName(searchPath: string) {
  return searchPath.split('=')[1].split('&')[0];
}

export default function BooksListPage() {
    const [books, setBooks] = useState<booksForPages>({
      books: [],
      info: {
        currentPage: '',
        nextPage: ''
      }
    });
    const location = useLocation();
    const [paginationInfo, setPaginationInfo] = useState('');
    const [addedId, setAddedId] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getKey = (_: number): string => paginationInfo;

    const { data, error, isLoading, isValidating, mutate } = useSWRInfinite(getKey, api.get, {
      onSuccess(data, key, config) {
      console.log('🚀 -------------------------------------------------------🚀');
      console.log('🚀 ~ file: BooksListPage.tsx:52 ~ onSuccess ~ key:', key);
      console.log('🚀 -------------------------------------------------------🚀');

      // console.log('🚀 -------------------------------------------------------🚀');
      // console.log('🚀 ~ file: BooksListPage.tsx:53 ~ onSuccess ~ key:', data);
      // console.log('🚀 -------------------------------------------------------🚀');
      const regex = /\bpage=1\b/g;
      // console.log(books.info.currentPage.match(regex))
      setBooks((prevState) => {
        if(books.books.length === 0 || key.match(regex)) {
          return {
            books: data.flatMap((el) => el.data.books),
            info: {
              currentPage: data.reverse()[0].data.info.currentPage,
              nextPage: data.reverse()[0].data.info.nextPage
            }
          }
        }
        return {
          books: [...prevState.books, ...data.flatMap((el) => el.data.books)],
          info: {
            currentPage: data.reverse()[0].data.info.currentPage,
            nextPage: data.reverse()[0].data.info.nextPage
          }
        }
      });
      },

      onError(err, key, config) {
        console.log('🚀 -----------------------------------------------------🚀');
        console.log('🚀 ~ file: BooksListPage.tsx:45 ~ onError ~ err:', err);
        console.log('🚀 -----------------------------------------------------🚀');
      },
      revalidateOnFocus: false,
    })
    // const { trigger, isMutating, error, data } = useSWRMutation(BooksEndpoints.baseBookRoute.trim(), api.getMutation);
    const { trigger: triggerBasket, isMutating: isMutatingBasket } = useSWRMutation(UserEndpoints.userBasket, api.post);
    useEffect(() => {
      let requestQuery = '';
      let navQuery = '';
      if(location.state) {
        if(getCurrentPage(location.pathname) === EPages.category) {
          requestQuery = `${BooksEndpoints.baseBookRoute.trim()}/${getCurrentPage(location.pathname).trim()}${location.search.trim()}`;
          setPaginationInfo(requestQuery)
          return;
        } else {
          setBooks(location.state.items)
          return;
        }
      } 
      requestQuery = getCurrentPage(location.pathname) === EPages.category 
      ? `${BooksEndpoints.baseBookRoute.trim()}/${getCurrentPage(location.pathname)}?${EPages.category}=business`
      : `${BooksEndpoints.baseBookRoute.trim()}/${getCurrentPage(location.pathname)}`
      navQuery = getCurrentPage(location.pathname) === EPages.category 
      ? `/${getCurrentPage(location.pathname)}?${EPages.category}=business`
      : `/${getCurrentPage(location.pathname)}`
      navigate(`/books/${navQuery}`)
      setPaginationInfo(requestQuery)
    }, []);
    
    const handleAddToCard = async (event: React.MouseEvent, book: TBook) => {
      event.stopPropagation();
      setAddedId(String(book.id));
      try {
        await triggerBasket(book!)
        setBooks((prevState) => {
          return {...prevState, books: prevState.books.map((el) => el.id === book.id 
          ? {...el, isAddedToCart: true} : el
          )}
        })
        dispatch(updateBasket(counterOperations.increment));
        Notiflix.Notify.success('Book was added')
      } catch (error) {
        Notiflix.Notify.failure(`${error}`);
      }
      setAddedId('');
    }

    const loadMore = () => {
      books.info.nextPage ? setPaginationInfo(`${BooksEndpoints.baseBookRoute}/${getCurrentPage(location.pathname)}?${getCurrentSearchParams(books.info.nextPage)}`) : null
    }

    const loadMoreFilter = (query?: string) => {
      // console.log(`${BooksEndpoints.baseBookRoute}${query}`)
      query && setPaginationInfo(`${BooksEndpoints.baseBookRoute}${query}`)
      // books.info.nextPage ? setPaginationInfo(`${BooksEndpoints.baseBookRoute}/${getCurrentPage(location.pathname)}?${getCurrentSearchParams(books.info.nextPage)}`) : null
    }

  return (
    <>
    <div className='container'>
    <Header style="home__header">
        <Button style="button-back-page" type='button' id='button-categories-page-back'>
          <Link to={'/home'} style={{padding: '7px'}}>
          <img src={BackIcon} alt="Back icon" />
          </Link>
        </Button>
        <Title style="home__title" h={1}>
          {
          location.state 
          ? location.state.title.at(0).toUpperCase() + location.state.title.slice(1) 
          : getCurrentPage(location.pathname).toUpperCase()
          }
        </Title>
      </Header>
      <Filter fetchData={loadMoreFilter} />
      <section style={{paddingBottom: '120px'}}>
        {!isLoading && error && books.books.length === 0 && <p>Error: {error.message}</p> }
        {!isLoading && !error && books.books.length === 0 && <p>Any book didn't found</p>}
        {books.books.length > 0 && <BookList 
        handleAddToCard={handleAddToCard} 
        items={books.books} 
        decoration={location.state ? location.state.decoration : location.pathname.slice(1).toLowerCase()} 
        page={location.state ? location.state.page : location.pathname.slice(1).toLowerCase()}
        isMutatingBasket={isMutatingBasket}
        addedId={addedId} 
        />
        }
        {books.books.length > 0 && 
        <Button 
        disabled={isLoading} 
        func={loadMore}
        style='button__load-more-books'
        id='button-more-books'
        type='button'
        >
          {isLoading && <LoaderPropagate />}
          {!isLoading && books.info.nextPage && 'Load more'}
          {!isLoading && !books.info.nextPage && 'No more'}
        </Button>
        }
        {isLoading && <Loader size='100px' />}
      </section>
      <BasketButton />
    </div>
    <Footer />
    </>
  )
}
