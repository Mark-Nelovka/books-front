import Header from 'components/Header/Header'
import Title from 'components/Title/Title'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TBook } from 'store/books/types'
import { useAppDispatch } from 'store/hook'
import Button from 'ui/Button/Button'
import { Loader, LoaderFade } from 'ui/Loader/Loader'
import DeleteIcon from "assets/icons/remove-icon.svg"
import BackIcon from "assets/icons/arrow-left.svg";
import useSWR from 'swr'
import { updateBasket } from 'store/user/userSlice'
import { api } from './Home/HomePage'
import { counterOperations } from 'store/user/types'
import { UserEndpoints } from 'API/endpoints'
import useSWRMutation from 'swr/mutation'
import Notiflix from 'notiflix'

export default function BasketPage() {
    const [basketItems, setBasketItems] = useState<TBook[]>([]);
    const [removeId, setRemoveId] = useState('');
    const dispatch = useAppDispatch()
    
    const { data, error, isLoading, mutate } = useSWR(UserEndpoints.userBasket, api.get, {
        revalidateOnFocus: false,
    });

    const { trigger: triggerRemoveFromBasket, isMutating: isMutatingBasket } = useSWRMutation(UserEndpoints.userBasket, api.delete);

    useEffect(() => {
        data && setBasketItems(data.data.books);
        data && dispatch(updateBasket(data.data.books.length))
    }, [data])
    

    const remove = async (id: string) => {
        setRemoveId(id);
        try {
            const updateBookList = await triggerRemoveFromBasket(id)
            mutate(updateBookList, false);
            dispatch(updateBasket(counterOperations.decrement));
            Notiflix.Notify.success('Book was deleted')
        } catch (error) {
            Notiflix.Notify.failure(`${error}`)
        } finally {
            setRemoveId('');
        }
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
            {isLoading && <Loader size='100px' />}
            {error && <p>{error}</p>}
            {!error 
            && basketItems.length > 0 
            && basketItems.map((book) => {
                return <li className='basket__list-item ' key={book.id}>
                    {removeId === book.id && <div className='loader__remove-item'><LoaderFade /></div>}
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
