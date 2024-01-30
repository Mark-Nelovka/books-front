import GetBookById from 'API/getBookById';
import Header from 'components/Header/Header';
import Title from 'components/Title/Title';
import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { TBook } from 'store/books/types';
import { useAppDispatch, useAppSelector } from 'store/hook';
import Button from 'ui/Button/Button';
import { Loader } from 'ui/Loader/Loader';
import Footer from 'components/Footer/Footer';
import ControlledCarousel from 'components/Slider/Slider';
import { addToBasket } from 'store/user/userOperations';
import BackIcon from 'assets/icons/arrow-left.svg';
import HeartIcon from "assets/icons/heart-icon.svg"
import BasketIcon from 'assets/icons/bascet-icon.svg';
import BasketButton from 'components/BasketButton/BasketButton';
import Modal from 'components/Modal/Modal';
import BasketPage from './BasketPage';
import AddToFavorites from 'API/addToFavorites';
import removeFromFavorites from 'API/removeFromFavorites';

export default function DetailsPage(): JSX.Element {
    const [book, setBook] = useState<Partial<TBook>>();
    const [openBasket, setOpenBasket] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  const token = useAppSelector(state => state.auth.token);
  const basketCount = useAppSelector(state => state.user.user.basket);
  const params = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const fetchBook = async () => {
    setIsLoading(true);
    if(!params.bookId || !token) {
        setIsLoading(false);
        setError("Error");
        return;
    }

    const dataBook = await GetBookById(params.bookId, token);


    // console.log("dataBook: ", dataBook)
    if(!dataBook.data) {
        setIsLoading(false);
        setError(dataBook.message);
        return;
    }

    setIsLoading(false);
    setBook(dataBook.data);
  }

  useEffect(() => {
    if(!book) {
        fetchBook()
    }
  }, [])
  
  const handleAddToCard = () => {
    if(token && book) {
      dispatch(addToBasket({book,token}))
    }
  }

  const toggleBackdrop = (event: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in event && event.key === "Escape") {
      setOpenBasket(false);
    }

    if ("target" in event) {
      const { dataset } = event.target as HTMLButtonElement;
      if (dataset.backdrop === "false") {
        setOpenBasket(false);
      }
    }
  };
  
  const handleBasket = () => {
    setOpenBasket(true);
    };

  const handleFavorites = async () => {
    if(book && token) {
      if(!book.isFavorite) {
          const data = await AddToFavorites(book,token);
          if(data.status !== 201) {
            setError("Failure fetch");
          } else {
            setBook((prevState) => {
              return {...prevState, isFavorite: true}
            })
          }
      } else {
        const data = await removeFromFavorites(book.id!, token);
        if(data.status !== 200) {
          setError("Failure fetch");
        } else {
          setBook((prevState) => {
            return {...prevState, isFavorite: false}
          })
        }
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill={book.isFavorite ? '#F66792' : '#fff'} xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_783_3002)">
<path d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z" stroke={book.isFavorite ? '#F66792' : "#3E494A"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_783_3002">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
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
        <Button id='button-add-to-card' style='details__button-add ' func={handleAddToCard} type='button'>
            Add to Cart
        </Button>
      </div>
      <BasketButton handleBasket={handleBasket} />
    </div>
      <Footer />
    </>
    }
    </>
  )
}
