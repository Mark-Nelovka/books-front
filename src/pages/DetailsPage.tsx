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
import useSWRMutation from 'swr/mutation'
import SVGCustomIcon from 'general/SVG';
import { updateBasket } from 'store/user/userSlice';
import Notiflix from 'notiflix';
import { api } from './Home/HomePage';
import { BooksEndpoints, UserEndpoints } from 'API/endpoints';
import { counterOperations } from 'store/user/types';

export default function DetailsPage(): JSX.Element {
    const [book, setBook] = useState<Partial<TBook>>();
  const params = useParams();
  const dispatch = useAppDispatch();

  const { data, error, isLoading, mutate } = useSWR(BooksEndpoints.dynamicRoute(params.bookId!), api.get);
  const { trigger: triggerBasket, isMutating: isMutatingBasket } = useSWRMutation(UserEndpoints.userBasket, api.post);
    const { trigger: triggerFavorites } = useSWRMutation(UserEndpoints.userFavorites, api.post);
    const { trigger: triggerDeleteFromFavorites } = useSWRMutation(UserEndpoints.userFavorites, api.delete);

  useEffect(() => {
    data && setBook(data.data);
  }, [data])
  
  const handleAddToCart = async () => {
    try {
      await triggerBasket(book!)
      await mutate({data: {...book, isAddedToCart: true}}, false)
      dispatch(updateBasket(counterOperations.increment));
      Notiflix.Notify.success('Book was added to your basket')
    } catch (error) {
      Notiflix.Notify.failure(`${error}`)
    } 
  }

  const handleFavorites = async () => {
    let resultIsFavorite;
  if(book && !book.isFavorite) {
    try {
      resultIsFavorite = await triggerFavorites(book);
      mutate({data: {...book, isFavorite: true}}, false)
      Notiflix.Notify.success('Book was added to your favorites')
    } catch (error) {
      Notiflix.Notify.failure(`${error}`)
    }
    return;
  }
  if(book && book.isFavorite) {
    try {
      resultIsFavorite = await triggerDeleteFromFavorites(book.id!);
      mutate({data: {...book, isFavorite: false}}, false);
      Notiflix.Notify.success('Book was deleted from your favorites')
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
            {isMutatingBasket && <LoaderPropagate />}
            {!isMutatingBasket && book.isAddedToCart && 'In cart'}
            {!isMutatingBasket && !book.isAddedToCart && 'Add to Cart'}
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
