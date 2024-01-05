import React from "react";
import { TBook } from "store/books/types";
import { Loader } from "ui/Loader/Loader";
import EyeIcon from "assets/icons/eye.svg";

interface IPropsCategoryList {
  items: TBook[];
  page: string;
}

enum EPages {
  all = "all",
  category = "category",
  recently = "recently",
  popular = "popular",
}

function checkCurrentPage({ page }: { page: string }): string {
  switch (page) {
    case EPages.recently:
      return "home__book-list_image-container--recently";
    case EPages.popular:
      return "home__book-list_image-container--popular";
    default:
      return "";
  }
}

export default function BookList({ items, page }: IPropsCategoryList) {
  return (
    <ul className="home__books-list">
      {items.length > 0 &&
        items.map((book, inx) => {
          return (
            <li className="home__books-list_item" key={inx}>
              <div
                className={`home__book-list_image-container ${checkCurrentPage({
                  page,
                })}`}
                data-price={`${book.price} P`}
              >
                {page === EPages.recently && (
                  <p className="home__book-list-recently_image-decoration">
                    {book.createdAt}
                  </p>
                )}
                {page === EPages.popular && (
                  <p className="home__book-list-popular_image-decoration">
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
            </li>
          );
        })}
      {items.length === 0 && <Loader size="50px" />}
    </ul>
  );
}
