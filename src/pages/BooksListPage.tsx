import React, { useEffect, useState } from 'react'
import Header from 'components/Header/Header'
import BackIcon from 'assets/icons/arrow-left.svg';
import Button from 'ui/Button/Button';
import Title from 'components/Title/Title';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hook';
import Footer from 'components/Footer/Footer';
import BookList, { EPages } from 'components/BookList/BookList';
import { Loader } from 'ui/Loader/Loader';
import Filter from 'components/Filter/Filter';
import { TBook } from 'store/books/types';
import BasketButton from 'components/BasketButton/BasketButton';
import Notiflix from 'notiflix';
import { updateBasket } from 'store/user/userSlice';
import { counterOperations } from 'store/user/types';
import { BooksEndpoints, UserEndpoints } from 'API/endpoints';
import { api } from './Home/HomePage';
import useSWRMutation from 'swr/mutation';

export function getCurrentPage(path: string) {
  return path.split('?')[0].split('/').reverse()[0];
}

export function getCategoryName(searchPath: string) {
  return searchPath.split('=')[1].split('&')[0];
}

export default function BooksListPage() {
    const [books, setBooks] = useState<TBook[]>([]);
    const [addedId, setAddedId] = useState('');
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { trigger, isMutating, error, data } = useSWRMutation(BooksEndpoints.baseBookRoute.trim(), api.getMutation);
    const { trigger: triggerBasket, isMutating: isMutatingBasket } = useSWRMutation(UserEndpoints.userBasket, api.post);

    useEffect(() => {
      data && setBooks(data.data.books);
      data && console.log(data.data.books)
    }, [data])

    useEffect(() => {
      trigger('/' + getCurrentPage(location.pathname) + location.search);
    }, [])

    useEffect(() => {
      let query = '';
      if(location.state) {
        if(getCurrentPage(location.pathname) === EPages.category) {
          query = `/${getCurrentPage(location.pathname)}${location.search}`;
          trigger(query)
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
      trigger(query)
    }, []);     
    
    const handleAddToCard = async (event: React.MouseEvent, book: TBook) => {
      event.stopPropagation();
      setAddedId(String(book.id));
      try {
        await triggerBasket(book!)
        setBooks((prevState) => {
          return prevState.map((el) => el.id === book.id 
          ? {...el, isAddedToCart: true} : el
          )
        })
        dispatch(updateBasket(counterOperations.increment));
        Notiflix.Notify.success('Book was added')
      } catch (error) {
        Notiflix.Notify.failure(`${error}`);
      }
      setAddedId('');
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
      <Filter fetchData={trigger} />
      <section>
        {!isMutating && error && books.length === 0 && <p>Error: {error.message}</p> }
        {!isMutating && !error && books.length === 0 && <p>Any book didn't found</p>}
        {books.length > 0 && !isMutating && <BookList 
        handleAddToCard={handleAddToCard} 
        items={books} 
        decoration={location.state ? location.state.decoration : location.pathname.slice(1).toLowerCase()} 
        page={location.state ? location.state.page : location.pathname.slice(1).toLowerCase()}
        isMutatingBasket={isMutatingBasket}
        addedId={addedId} 
        />
        }
        {isMutating && <Loader size='100px' />}
      </section>
      <BasketButton />
    </div>
    <Footer />
    </>
  )
}
