import React from 'react'
import { useAppSelector } from 'store/hook'
import Button from 'ui/Button/Button'
import BasketIcon from 'assets/icons/bascet-icon.svg';
import { Link } from 'react-router-dom';


export default function BasketButton({handleBasket}: {handleBasket?: () => void}) {
    const count = useAppSelector(state => state.user.user.basket);
  return (
    <Button id='button-basket' style='basket-button' 
    basketCount={count}
    func={handleBasket}
    type='button'>
      <Link to='/user/basket'>
      <img src={BasketIcon} alt='Basket button' />
      </Link>
    </Button>
  )
}
