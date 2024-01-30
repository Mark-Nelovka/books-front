import React, { useEffect, useState } from "react";
import Header from "components/Header/Header";
import Title from "components/Title/Title";
import NotificationIcon from "assets/icons/ring-notif-icon.svg";
import SearchForm from "components/Forms/SearchForm";
import { Link } from "react-router-dom";
import CategoryList from "components/CategoryList/CategoryList";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchHomeBooks } from "store/books/booksOperations";
import BookList, { EPages } from "components/BookList/BookList";
import Footer from "components/Footer/Footer";
import BasketButton from "components/BasketButton/BasketButton";
import axios from "axios";

export default function HomePage(): JSX.Element {
  const [search, setSearch] = useState(false);
  const token = useAppSelector(state => state.auth.token); 
  const { allBooks, error, categories, recentlyAdded, mostViewed } =
    useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allBooks.books.length > 0) return;
    dispatch(fetchHomeBooks());
   
    // console.log()
  }, []);

  return (
    <>
      <div className="container">
      <Header style="home__header">
        <Title style="home__title" h={1}>
          MaBOOK
        </Title>
      </Header>
      <SearchForm checkSearch={(bol: boolean) => setSearch(bol)} />
      {!search && (
        <>
          <section>
            <div className="home__categories">
              <Title style="" h={3}>
                Categories
              </Title>
              <Link to={"/categories"}>
                See all
              </Link>
            </div>
              <CategoryList items={categories} page={EPages.home} />
          </section>
          <section>
            <div className="home__categories">
              <Title style="" h={3}>
                All books
              </Title>
              <Link to={`/books/${EPages.all}`} state={{
                title: "All books",
                decoration: '',
                page: EPages.all,
                items: allBooks
              }}>
                See all
              </Link>
            </div>
            <BookList items={allBooks.books} page={EPages.home} />
          </section>
          <section>
            <div className="home__categories">
              <Title style="" h={3}>
                Recently Added
              </Title>
              <Link to={`/books/${EPages.recently}`} state={{
                title: "Recently Added",
                decoration: EPages.recently,
                page: EPages.recently,
                items: recentlyAdded
              }}>
                See all
              </Link>
            </div>
            <BookList items={recentlyAdded.books} page={EPages.home} decoration={EPages.recently} />
          </section>
          <section>
            <div className="home__categories">
              <Title style="" h={3}>
                Popular
              </Title>
              <Link to={`/books/${EPages.popular}`} state={{
                title: "Most popular",
                decoration: EPages.popular,
                page: EPages.popular,
                items: mostViewed
              }}>
                See all
              </Link>
            </div>
            <BookList items={mostViewed.books} page={EPages.home} decoration={EPages.popular} />
          </section>
        </>
      )}
      <BasketButton />
      </div>
      <Footer />
    </>
  );
}
