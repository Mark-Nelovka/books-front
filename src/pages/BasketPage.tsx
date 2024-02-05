import Header from 'components/Header/Header'
import Title from 'components/Title/Title'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TBook } from 'store/books/types'
import { useAppDispatch } from 'store/hook'
import Button from 'ui/Button/Button'
import { Loader } from 'ui/Loader/Loader'
import DeleteIcon from "assets/icons/remove-icon.svg"
import BackIcon from "assets/icons/arrow-left.svg";
import { ApiService } from 'API/ApiService'
import useSWR from 'swr'
import { updateBasket } from 'store/user/userSlice'
const api = new ApiService();

export default function BasketPage() {
    const [basketItems, setBasketItems] = useState<TBook[]>([]);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useAppDispatch()
    
    const { data, error, isLoading, isValidating, mutate } = useSWR('api/user/basket', api.get);

    useEffect(() => {
        setLoaded(isLoading);
        data && setBasketItems(data.data.books);
        data && dispatch(updateBasket(data.data.books.length))
         setLoaded(isLoading);
    }, [data, isLoading])
    
    const remove = async (id: number) => {
        setLoaded(true);
        const updateBookList = await api.delete(`api/user/basket/${id}`)
        mutate && await mutate(updateBookList, false);
        setLoaded(false);
    }

    const calculatePrice = useMemo(() => {
        return basketItems.reduce((acc, el) => Number.isNaN(+el.price) 
        ? acc += +el.price.slice(1) 
        : acc += +el.price, 0)
    }, [basketItems])
    
  return (
    <>
     <Header style="home__header">
        <Button style="button-back-page" type='button' id='button-categories-page-back'>
          <Link to={'/home'} style={{padding: '7px'}}>
          <img src={BackIcon} alt="Back icon" />
          </Link>
        </Button>
        <Title style="home__title" h={2}>
            My cart
        </Title>
      </Header>
      <div className='container'>
        <ul className='basket__list'>
            {loaded && <Loader size='100px' />}
            {error && <p>{error.message}</p>}
            {!loaded && !error 
            && basketItems.length > 0 
            && basketItems.map((book) => {
                return <li className='basket__list-item' key={book.id}>
                    <div className='basket__list_image-container'>
                        <img src={book.images[0]} alt={book.title} />
                    </div>
                    <div className='basket__list_content-container'>
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                        <p>{book.price}</p>
                    </div>
                    <Button 
                    id='button-basket-delete' 
                    func={() => remove(book.id)} 
                    type='button' 
                    style='basket__delete-button'>
                        <img src={DeleteIcon} alt='Basket delete icon' />
                    </Button>
                </li>
            })}
        </ul>
        </div>
        {basketItems.length > 0 &&
         <div className='basket__footer'>
         <div className='basket__footer_content-container'>
             <div className='basket__footer-text'><span>Item Value</span><span>{calculatePrice}</span></div>
             <div className='basket__footer-text'><span>Shipment Fee</span><span>Collect on delivery</span></div>
         </div>
         <div className='basket__footer_total-container'>
            <span>Total</span>
            <span>{calculatePrice}</span>
         </div>
         <Button style='basket__footer_button' id='button-basket-footer' type='button'>
             Proceed to Checkout
         </Button>
     </div>
        }
      </>
  )
}
