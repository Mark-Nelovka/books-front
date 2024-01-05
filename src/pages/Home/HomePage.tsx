import React, { useEffect, useState } from "react";
import Header from "components/Header/Header";
import Title from "components/Title/Title";
import NotificationIcon from "assets/icons/ring-notif-icon.svg";
import SearchForm from "components/Forms/SearchForm";
import { Link } from "react-router-dom";
import CategoryList from "components/CategoryList/CategoryList";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchHomeBooks } from "store/books/booksOperations";
import BookList from "components/BookList/BookList";
import Footer from "components/Footer/Footer";

export default function HomePage(): JSX.Element {
  const [search, setSearch] = useState(false);
  const { allBooks, error, categories, recentlyAdded, mostViewed } =
    useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allBooks.books.length > 0) return;
    dispatch(fetchHomeBooks());
  }, []);

  return (
    <>
      <div className="container">
      <Header style="home__header">
        <Title style="home__title" h={1}>
          MaBOOK
        </Title>
        <img src={NotificationIcon} alt="Notification icon " />
      </Header>
      <SearchForm checkSearch={(bol: boolean) => setSearch(bol)} />
      {!search && (
        <>
          <section>
            <div className="home__categories">
              <Title style="" h={3}>
                Categories
              </Title>
              <Link to={"/categories"} state={[]}>
                See all
              </Link>
            </div>
              <CategoryList items={categories} page="home" />
          </section>
          <section>
            <div className="home__categories">
              <Title style="" h={3}>
                All books
              </Title>
              <Link to={"/categories"} state={[]}>
                See all
              </Link>
            </div>
            <BookList items={allBooks.books} page="all" />
          </section>
          <section>
            <div className="home__categories">
              <Title style="" h={3}>
                Recently Added
              </Title>
              <Link to={"/categories"} state={[]}>
                See all
              </Link>
            </div>
            <BookList items={recentlyAdded.books} page="recently" />
          </section>
          <section>
            <div className="home__categories">
              <Title style="" h={3}>
                Popular
              </Title>
              <Link to={"/categories"} state={[]}>
                See all
              </Link>
            </div>
            <BookList items={recentlyAdded.books} page="popular" />
          </section>
        </>
      )}
      </div>
      <Footer />
    </>
  );
}
