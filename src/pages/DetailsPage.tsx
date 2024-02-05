import Header from 'components/Header/Header';
import Title from 'components/Title/Title';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TBook } from 'store/books/types';
import { useAppDispatch } from 'store/hook';
import Button from 'ui/Button/Button';
import { Loader, LoaderPropagate } from 'ui/Loader/Loader';
import Footer from 'components/Footer/Footer';
import ControlledCarousel from 'components/Slider/Slider';
import BackIcon from 'assets/icons/arrow-left.svg';
import BasketButton from 'components/BasketButton/BasketButton';
import useSWR from 'swr'
import SVGCustomIcon from 'general/SVG';
import { ApiService } from 'API/ApiService';
import { updateBasket } from 'store/user/userSlice';
import Notiflix from 'notiflix';
const api = new ApiService();

export default function DetailsPage(): JSX.Element {
    const [book, setBook] = useState<Partial<TBook>>();
    const [error, setError] = useState("");
    const [isAddToCartLoader, setIsAddToCartLoader] = useState(false);
  const params = useParams();
  const dispatch = useAppDispatch();

  const { data, isLoading, isValidating, mutate } = useSWR(`/api/books/${params.bookId}`, api.get, {
    onSuccess(data, key, config) {
      setBook(data.data);
      isAddToCartLoader && setIsAddToCartLoader(false);
    },
    onError(err, key, config) {
      setError(err.message || "Error")
      isAddToCartLoader && setIsAddToCartLoader(false);
    },
  });
  
  const handleAddToCart = async () => {
    setIsAddToCartLoader(true);
    try {
      const updateCart = await api.post(`/api/user/basket`, book!)
      mutate({data: {...book, isAddedToCart: true}})
      dispatch(updateBasket(updateCart.count));
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavorites = async () => {
  if(book && !book.isFavorite) {
    try {
      await api.post('api/user/favorites', book);
      mutate({data: {...book, isFavorite: true}})
    } catch (error) {
      Notiflix.Notify.failure(`${error}`)
    }
    return;
  }
  if(book && book.isFavorite) {
    try {
      await api.delete(`api/user/favorites/${book.id}`);
      mutate(mutate({data: {...book, isFavorite: false}}))
    } catch (error) {
      Notiflix.Notify.failure(`${error}`)
    }
  }
  }

  return (
    <>
    {isLoading && !error && <Loader />}
    {!isLoading && book && 
    <>
    <div className='container qwe'>
    <Header style="home__header">
        <Button style="button-back-page" type='button' id='button-categories-page-back'>
          <Link to={'/home'} style={{padding: '7px'}}>
          <img src={BackIcon} alt="Back icon" />
          </Link>
        </Button>
        <Title style="home__title" h={2}>
            {book && book.title}
        </Title>
        <Button style="button-details-heart" func={handleFavorites} type='button' id='button-categories-page-back'>
          <SVGCustomIcon 
          name='details-heart' 
          color={book.isFavorite ? '#F66792' : '#fff'} 
          stroke={book.isFavorite ? '#F66792' : "#3E494A"} 
          />
        </Button>
      </Header>
      <div>
        <ControlledCarousel images={book.images!} />
        <div className='details__header-content-info_container'>
        <p>
           <span>{book.genre}</span>
           <span>{book.price}</span>
        </p>
        <p>{book.title!.toUpperCase()}</p>
        <p>{book.author}</p>
        </div>
        <p className='details__description'>{book.description}</p>
        <div className='details__book-parametrs_container'>
        <p><span>Condition:</span><span>{book.condition}</span></p>
        <p><span>Pages:</span><span>{book.pages}</span></p>
        <p><span>Dimensions:</span><span>{book.dimensions}</span></p>
        </div>
        <Button id='button-add-to-card' disabled={book.isAddedToCart} style='details__button-add ' func={handleAddToCart} type='button'>
            {isAddToCartLoader && <LoaderPropagate />}
            {!isAddToCartLoader && book.isAddedToCart && 'In cart'}
            {!isAddToCartLoader && !book.isAddedToCart && 'Add to Cart'}
        </Button>
      </div>
      <BasketButton />
    </div>
      <Footer />
    </>
    }
    </>
  )
}
