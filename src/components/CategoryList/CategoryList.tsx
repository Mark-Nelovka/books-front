import { EPages } from "components/BookList/BookList";
import React from "react";
import { Link } from "react-router-dom";
import { Loader } from "ui/Loader/Loader";

type TCategoryInfo = {
  name: string;
  count: number;
  image: string;
};

interface IPropsCategoryList {
  items: TCategoryInfo[];
  page: string;
}

export default function CategoryList({ items, page }: IPropsCategoryList) {
  return (
    <ul className={`${page}__categories-list`}>
      {items.length > 0 &&
        items.map((category, inx) => {
          return (
            <Link key={inx} className={`${page}__categories-list_item`} state={{
              title: `${category.name}`,
              page: EPages.category,
              decoration: '',
              items: {
                books: [],
                info: null
              }
            }} to={`/books/${EPages.category}?${EPages.category}=${category.name.at(0)?.toLowerCase() + category.name.slice(1)}`}>
              <img
              data-page={category.name}
                src={category.image}
                alt={`Image ${category.name} category`}
              />
              <p data-page={category.name}>{category.name}</p>
            </Link>
          );
        })}
      {items.length === 0 && <Loader size="50px" />}
    </ul>
  );
}
