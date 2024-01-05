import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "ui/Button/Button";
import { debounce, throttle } from "throttle-debounce";
import SearchIcon from "assets/icons/search-icon.svg";
import CancelIcon from "assets/icons/close-input-button.svg";
import { Loader } from "ui/Loader/Loader";
import { Link } from "react-router-dom";
import Title from "components/Title/Title";

const tempBookTitle = [
  "Book 1",
  "Book 2",
  "Book 3",
  "Book 4",
  "Book 5",
  "Book 6",
  "Book 7",
  "Book 8",
];
const tempHistory = [
  "Book 11",
  "Book 12",
  "Book 13",
  "Book 14",
  "Book 15",
  "Book 16",
  "Book 17",
  "Book 18",
];
const tempBookTitleEmpty = [];
const tempHistoryEmpty = [];

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("searchValue: ", searchValue);
  };

  useEffect(() => {
    console.log(tempBookTitle[0].split(/\s+/));
  }, []);

  const throttleFunc = useMemo(
    () =>
      throttle(1000, (value: string) => {
        console.log(value);
      }),
    [],
  );

  const handleSearchValue = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    setSearchValue(value);
    if (value) {
      checkSearch(true);
      throttleFunc(value);
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
              <Link to={"/categories"} state={[]}>
                See all
              </Link>
            </div>
          <ul className="search-from__list">
            {/* {tempBookTitle.length > 0 &&
              tempBookTitle.map((title, inx) => {
                return (
                  <>
                    <li className="search-from__list-item--light" key={inx}>
                      {light(title)}
                    </li>
                  </>
                );
              })} */}
            {tempBookTitleEmpty.length === 0 && <Loader size='25px' />}
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
            {/* {tempHistory.length > 0 &&
              tempHistory.map((title, inx) => {
                return (
                  <>
                    <li className="search-from__list-item" key={inx}>
                      {title}
                    </li>
                  </>
                );
              })} */}
            {tempHistoryEmpty.length === 0 && <Loader size='25px' />}
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
