import React from "react";
import { TBook } from "store/books/types";
import { Loader, LoaderPropagate } from "ui/Loader/Loader";
import EyeIcon from "assets/icons/eye.svg";
import { useNavigate } from "react-router-dom";
import Button from "ui/Button/Button";

interface IPropsCategoryList {
  items: TBook[];
  page: string;
  decoration?: string;
  handleAddToCard?: (event: React.MouseEvent, book: TBook) => void;
  isMutatingBasket?: boolean;
  addedId?: string;
}

export enum EPages {
  all = "all",
  home = "home",
  category = "category",
  recently = "recently",
  popular = "popular",
}

export default function BookList({ items, page, decoration, handleAddToCard, isMutatingBasket, addedId }: IPropsCategoryList) {
  const navigate = useNavigate();

  const goToDetailsPage = (event: React.MouseEvent) => {
    const liElement = (event.target as HTMLLIElement).closest('li');
    if (liElement) {
      const bookId = liElement.id;
      const chosenBook = items.find(book => book.id === +bookId);
      chosenBook && navigate(`/book/${bookId}`)
    }
  }

  return (
    <ul className="home__books-list" data-page-type={page} onClick={goToDetailsPage}>
      {items.length > 0 &&
        items.map((book, inx) => {
          return (
            <li className="home__books-list_item" id={String(book.id)} data-page-type={page} key={inx}>
              <div
                className={`home__book-list_image-container`}
                data-price={`${book.price} P`}
              >
                {decoration === EPages.recently && (
                  <p className="timestemp-decoration" data-page-type={page}>
                    {book.createdAt}
                  </p>
                )}
                {decoration === EPages.popular && (
                  <p className="eye-decoration" data-page-type={page}>
                    <img src={EyeIcon} alt="Eye icon" />
                    {book.view}
                  </p>
                )}
                <img
                  src={book.images.length > 0 ? book.images[0] : "No image"}
                  alt={`Image ${book.title} book`}
                />
              </div>
              <p className="home__book-list_item-title">
                {book.title.at(0)?.toUpperCase() + book.title.slice(1)}
              </p>
              <p className="home__book-list_item-category">{book.category}</p>
              {handleAddToCard && <Button id='button-add-to-card' style='details__button-add ' func={(event) => handleAddToCard(event,book)} disabled={book.isAddedToCart} type='button'>
              {isMutatingBasket && addedId === String(book.id) && <LoaderPropagate />}
              {isMutatingBasket && addedId !== String(book.id) && !book.isAddedToCart && 'Add to cart'}
              {isMutatingBasket && addedId !== String(book.id) &&  book.isAddedToCart && 'In cart'}
              {!isMutatingBasket && book.isAddedToCart && 'In cart'}
              {!isMutatingBasket && !book.isAddedToCart && 'Add to cart'}
        </Button>}
            </li>
          );
        })}
      {items.length === 0 && <Loader size="50px" />}
    </ul>
  );
}
