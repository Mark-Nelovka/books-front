import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "ui/Button/Button";
import { debounce, throttle } from "throttle-debounce";
import SearchIcon from "assets/icons/search-icon.svg";
import CancelIcon from "assets/icons/close-input-button.svg";
import { Loader } from "ui/Loader/Loader";
import { Link } from "react-router-dom";
import Title from "components/Title/Title";
import { useAppDispatch, useAppSelector } from "store/hook";
import Notiflix from "notiflix";
import { resetError } from "store/auth/authOperations";
import SearchBooksApi from "API/searchBooks";
import { TBook } from "store/books/types";

const Hightlight = (props: any) => {
  const { filter, str } = props;
  if (!filter) return str;
  const regexp = new RegExp(filter, "ig");
  const matchValue = str.match(regexp);

  if (matchValue) {
    return str.split(regexp).map((s: string, index: number, array: any) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();
        return (
          <>
            {s}
            <span>{c}</span>
          </>
        );
      }
      return s;
    });
  }
  return str;
};

export default function SearchForm({
  checkSearch,
}: {
  checkSearch: (bol: boolean) => void;
}): JSX.Element {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Partial<TBook>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector(state => state.auth.token);
  const historyUser: string[] = useAppSelector(state => state.user.user.historySearches);

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("searchValue: ", searchValue);
  };

  const qwe = async (value: string) => {
    try {
      const data = await SearchBooksApi(value, token!);
      if(!data.data) throw data;
      setSearchResults(data.data.searchResult)
    } catch (error) {
      console.log("errorQWE");
    } finally {
      setIsLoading(false);
    }
  }

  const throttleFunc = useCallback(
    throttle(1000, async (value: string) => {
      qwe(value)
    }),
    [dispatch]
  );

  const handleSearchValue = async (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setSearchValue(value);
    if (value) {
      setIsLoading(true);
      checkSearch(true);
      // throttleFunc(value)
      return;
    }
    checkSearch(false);
  };

  const clearForm = () => {
    setSearchValue("");
    checkSearch(false);
  };

  const light = useCallback(
    (str: string) => {
      return <Hightlight filter={searchValue} str={str} />;
    },
    [searchValue],
  );

  return (
    <section className="search-form_section form-container">
      <form
        onSubmit={handleSubmit}
        className={`search-form_container ${searchValue && "active"}`}
      >
        <Button style="" id="search-button" type="submit">
          <img src={SearchIcon} alt="Search icon" />
        </Button>
        <input
          id="search"
          value={searchValue}
          onChange={handleSearchValue}
          className=""
          placeholder="Book name or writer name"
        />
        {searchValue && (
          <Button func={clearForm} style="" id="search-button" type="button">
            <img src={CancelIcon} alt="Cancel search icon" />
          </Button>
        )}
      </form>
      {searchValue && (
        <div className="search-from__list-container">
           <div className="search-form__list-title_container">
              <Title style="search-form__list-title" h={4}>
                Books
              </Title>
              <Button type="button" style="" id='search-result-button-all'>
              <Link to={`/search?${searchResults.map((el) => `id=${el.id}`).join('&')}`} state={[]}>
                See all
              </Link>
              </Button>
            </div>
          <ul className="search-from__list">
            {searchResults.length > 0 && !isLoading && 
              searchResults.map((title, inx) => {
                return (
                  <>
                    <li className="search-from__list-item--light" key={inx}>
                      <Link to={`/search?id=${title.id}`}>
                      <span>{light(title.title!)}</span>
                      <span>{light(title.author!)}</span>
                      </Link>
                    </li>
                  </>
                );
              })}
              {searchResults.length === 0 && !isLoading && <Title style="" h={2}>
                No matches
                </Title>}
            {isLoading && <Loader size='25px' />}
          </ul>
          <hr />
          <div className="search-form__list-title_container">
              <Title style="search-form__list-title" h={4}>
                Recent Searches
              </Title>
              <Button
                style="search-form__button-remove-histiry"
                type="button"
                id="button-remove-histiry"
              >
                Delete history
              </Button>
            </div>
          <ul className="search-from__list">
            {historyUser.length > 0 &&
              historyUser.map((title, inx) => {
                return (
                  <>
                    <li className="search-from__list-item" key={inx}>
                      {title}
                    </li>
                  </>
                );
              })}
            {historyUser.length === 0 && <Loader size='25px' />}
          </ul>
        </div>
      )}
      <Button
        type="button"
        style={`search__button-cancel ${searchValue && "active"}`}
        func={clearForm}
        id="button-cancel-search-form"
      >
        Cancel
      </Button>
    </section>
  );
}
