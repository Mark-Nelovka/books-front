import React, { useEffect, useState } from 'react'
import Header from 'components/Header/Header'
import BackIcon from 'assets/icons/arrow-left.svg';
import Button from 'ui/Button/Button';
import Title from 'components/Title/Title';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { fetchAllBooks, fetchBookByCategory, 
  fetchPopularBooks, fetchRecentlyBooks 
} from 'store/books/booksOperations';
import Footer from 'components/Footer/Footer';
import BookList, { EPages } from 'components/BookList/BookList';
import { Loader } from 'ui/Loader/Loader';
import Filter from 'components/Filter/Filter';
import { TBook } from 'store/books/types';
import BasketButton from 'components/BasketButton/BasketButton';

export function getCurrentPage(path: string) {
  return path.split('?')[0].split('/').reverse()[0];
}


export default function BooksListPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState<TBook[]>([]);
    const state = useAppSelector(state => state.books);
    const token = useAppSelector(state => state.auth.token);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const fetchData = async (path: string) => {
      setIsLoading(true);
      switch (getCurrentPage(path)) {
        case EPages.all:
          await dispatch(fetchAllBooks(path))
          break;
        case EPages.recently:
          await dispatch(fetchRecentlyBooks(path))
          break;
        case EPages.popular:
          await dispatch(fetchPopularBooks(path))
          break;
        default:
          await dispatch(fetchBookByCategory(path))
          break;
      }
      setIsLoading(false);
    };

    useEffect(() => {
      switch (getCurrentPage(location.pathname)) {
        case EPages.all:
          state.allBooks.books.length === 0 
          ? fetchData(`/${EPages.all}`) 
          : setBooks(state.allBooks.books)
          break;
        case EPages.recently:
          state.recentlyAdded.books.length === 0 
          ? fetchData(`/${EPages.recently}`) 
          : setBooks(state.recentlyAdded.books)
          break;
        case EPages.popular:
          state.mostViewed.books.length === 0 
          ? fetchData(`/${EPages.popular}`) 
          : setBooks(state.mostViewed.books)
          break;
        default:
          state.categoryBook.books.length === 0 
          ? fetchData(`/${getCurrentPage(location.pathname)}${location.search}`) 
          : setBooks(state.categoryBook.books)
          break;
      }
    }, [state])

    useEffect(() => {
      let query = '';
      if(location.state) {
        if(getCurrentPage(location.pathname) === EPages.category) {
          query = `/${getCurrentPage(location.pathname)}${location.search}`;
          fetchData(query)
          return;
        } else {
          setBooks(location.state.items.books)
          return;
        }
      } 
      query = getCurrentPage(location.pathname) === EPages.category 
      ? `/${getCurrentPage(location.pathname)}?${EPages.category}=business`
      : `/${getCurrentPage(location.pathname)}` 
      navigate(`/books/${query}`)
      fetchData(query)
    }, []);     
    
    const handleAddToCard = (event: React.MouseEvent, book: TBook) => {
      event.stopPropagation();
      if(token && book) {
        // dispatch(addToBasket({book,token}))
      }
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
          {location.state ? location.state.title.at(0).toUpperCase() + location.state.title.slice(1) : getCurrentPage(location.pathname).toUpperCase()}
        </Title>
      </Header>
      <Filter fetchData={fetchData} />
      <section>
        {books.length > 0 && !isLoading && <BookList handleAddToCard={handleAddToCard} items={books} decoration={location.state ? location.state.decoration : location.pathname.slice(1).toLowerCase()} page={location.state ? location.state.page : location.pathname.slice(1).toLowerCase()} />}
        {isLoading && <Loader size='100px' />}
      </section>
      <BasketButton />
    </div>
    <Footer />
    </>
  )
}
