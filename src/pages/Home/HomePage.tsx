import React, { useEffect, useState } from "react";
import Header from "components/Header/Header";
import Title from "components/Title/Title";
import NotificationIcon from "assets/icons/ring-notif-icon.svg";
import SearchForm from "components/Forms/SearchForm";
import { Link } from "react-router-dom";
import CategoryList from "components/CategoryList/CategoryList";
import { useAppDispatch } from "store/hook";
import BookList, { EPages } from "components/BookList/BookList";
import Footer from "components/Footer/Footer";
import BasketButton from "components/BasketButton/BasketButton";
import useSWR from "swr";
import { ApiService } from "API/ApiService";
import { fetchHomeBooks } from "store/books/booksSlice";
import { TBook, booksForPages } from "store/books/types";
import { BooksEndpoints } from "API/endpoints";
import { getCurrentPage } from "pages/BooksListPage";

export const api = new ApiService();

interface IHomeBooks {
  categories: [{ name: string; count: number; image: string }];
  recentlyAdded: booksForPages;
  mostViewed: booksForPages;
  allBooks: booksForPages;
}

export default function HomePage(): JSX.Element {
  const [search, setSearch] = useState(false);
  const [books, setBooks] = useState<IHomeBooks>({
    categories: [{name: '', count: 0, image: ''}],
    allBooks: {
      books: [],
      info: {
        currentPage: '',
        nextPage: ''
      }
    },
    mostViewed: {
      books: [],
      info: {
        currentPage: '',
        nextPage: ''
      }
    },
    recentlyAdded: {
      books: [],
      info: {
        currentPage: '',
        nextPage: ''
      }
    },
  })
  const dispatch = useAppDispatch();

  const { error } = useSWR(BooksEndpoints.dynamicRoute(getCurrentPage(location.pathname)), api.get, {
    onSuccess(data) {
      const { categories, allBooks, mostViewed, recentlyAdded} = data.data;
      setBooks({
        categories,
        mostViewed,
        recentlyAdded,
        allBooks,
      })
    },
    onError(err) {
      console.log('🚀 ------------------------------------------------🚀');
      console.log('🚀 ~ file: HomePage.tsx:67 ~ onError ~ err:', err);
      console.log('🚀 ------------------------------------------------🚀');
    },
  });

  useEffect(() => {
    books && dispatch(fetchHomeBooks(books));
  }, [books]);

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
              <CategoryList items={books.categories} page={EPages.home} />
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
                items: books.allBooks
              }}>
                See all
              </Link>
            </div>
            <BookList items={books.allBooks.books} page={EPages.home} />
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
                items: books.recentlyAdded
              }}>
                See all
              </Link>
            </div>
            <BookList items={books.recentlyAdded.books} page={EPages.home} decoration={EPages.recently} />
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
                items: books.mostViewed
              }}>
                See all
              </Link>
            </div>
            <BookList items={books.mostViewed.books} page={EPages.home} decoration={EPages.popular} />
          </section>
        </>
      )}
      <BasketButton />
      </div>
      <Footer />
    </>
  );
}
