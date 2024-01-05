import React from 'react'
import navBookIcon from 'assets/icons/nav-book-button.svg'
import navUserButtonIcon from 'assets/icons/user-icon.svg'
import navPlusBookIcon from 'assets/icons/nav-plus-icon.svg'


export default function Footer() {
  return (
    <footer>
        <div>
            <img src={navBookIcon} alt='' />
            <p>EXPLORE</p>
        </div>
        <div>
            <div className='footer__nav-plus-icon_container'>
            <img src={navPlusBookIcon} alt='' />
            </div>
            <p>EXCHANGE BOOK</p>
        </div>
        <div>
            <img src={navUserButtonIcon} alt='' />
            <p>MY PAGE</p>
        </div>
    </footer>
  )
}
