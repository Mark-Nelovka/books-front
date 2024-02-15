import React, { useEffect, useState } from 'react'
import Button from 'ui/Button/Button'
import SortIcon from "assets/icons/sort-arrow.svg";
import FilterIcon from "assets/icons/filter-icon.svg";
import CloseIcon from "assets/icons/close-button.svg";
import Arrow from "assets/icons/arrow-left.svg";
import { useAppSelector } from 'store/hook';
import { useLocation, useNavigate } from 'react-router-dom';
import { EPages } from 'components/BookList/BookList';
import Header from 'components/Header/Header';
import Title from 'components/Title/Title';
import { getCurrentPage } from 'pages/BooksListPage';

export enum ESortParametrs {
  direction = 'direction',
  field = 'field',
  fieldName = 'title',
  ASC = 'ASC',
  DESC = 'DESC',
  min = 'min',
  max = 'max',
  category = 'category',
  available = 'available'
}

export interface ISortParametrs {
    direction?: string;
    field?: string;
    available?: boolean;
    min?: string;
    max?: string;
    category?: string;
    page?: number;
    offset?: number;
    limit?: number;
  }

interface IPropsGetUrlForRequest {
  page: string,
  params: Partial<ISortParametrs>,
}

  export function getUrlForRequest({page, params}: IPropsGetUrlForRequest) {
    let query = `/${page}`
    let queryParams = Object.entries(params).filter((el) => el[1] && el).map((el) => `${el[0]}=${el[1]}`).join("&");
    if(page.toLowerCase().trim() === EPages.category.toLowerCase().trim()) {
      query = query + "?" + queryParams
    } else {
      if(params.category && page !== EPages.category) {
        query = '/' + EPages.category.toLowerCase() + "?" + queryParams
        return query
      }
      query = query + "?" + queryParams
    } 
    return query;
  }

export default function Filter(props: {fetchData: (path: string) => void}) {
    const [sortParams, setSortParams] = useState<ISortParametrs>({
      min: '',
      max: '',
      page: 1,
      offset: 0,
      limit: 20
    })
    const [filterForm, setFilterForm] = useState(false);
    const [filterList, setFilterList] = useState("");
    const state = useAppSelector(state => state.books);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = () => {
      setFilterForm(false);
      let query = ''
      let params = {};
        if(sortParams.category && getCurrentPage(location.pathname) !== EPages.category) {
          if(sortParams.field) {
            params = {...sortParams, direction: sortParams.direction === ESortParametrs.ASC ? ESortParametrs.DESC : ESortParametrs.ASC};
            query = getUrlForRequest({page: getCurrentPage(location.pathname), params})
          } else {
            params = sortParams
            query = getUrlForRequest({page: getCurrentPage(location.pathname), params})
          }
          navigate(`/books/${query}`, {state: {
            title: sortParams.category,
            page: sortParams.category,
            decoration: '',
            items: {
              books: [],
              info: null
            }
          }})
          props.fetchData(query)
          return;
        }
        if(sortParams.field) {
          params = {...sortParams, direction: sortParams.direction === ESortParametrs.ASC ? ESortParametrs.DESC : ESortParametrs.ASC};
        } else {
          params = sortParams;
        }
        query = getUrlForRequest({page: getCurrentPage(location.pathname), params});
        if(location.state) {
          props.fetchData(query)
        navigate(`/books/${query}`, {state: {
          title: getCurrentPage(location.pathname),
          page: getCurrentPage(location.pathname),
          decoration: getCurrentPage(location.pathname),
          items: location.state.items
        }})
        } else {
          props.fetchData(query)
        navigate(`/books/${query}`, {state: location.state})
        }
        console.log("FILTER NOT CHANGE CATEGORY", query);
  }

  const handleSort = async () => {
    let params = {};
    let query: any;

      if(!sortParams.field) {
        params = {...sortParams, field: ESortParametrs.fieldName, direction: ESortParametrs.ASC};
        query = getUrlForRequest({page: getCurrentPage(location.pathname), params})
        setSortParams((prevState) =>{ return {...prevState, field: ESortParametrs.fieldName, direction: ESortParametrs.DESC}});
      } else {
        switch (sortParams.direction) {
          case ESortParametrs.ASC:
            params = {...sortParams, field: ESortParametrs.fieldName, direction: ESortParametrs.ASC};
            query = getUrlForRequest({page: getCurrentPage(location.pathname), params})
            setSortParams((prevState) =>{ return {...prevState, field: ESortParametrs.fieldName, direction: ESortParametrs.DESC}});
            break;
          case ESortParametrs.DESC:
            params = {...sortParams, field: ESortParametrs.fieldName, direction: ESortParametrs.DESC};
            query = getUrlForRequest({page: getCurrentPage(location.pathname), params})
            setSortParams((prevState) =>{ return {...prevState, field: ESortParametrs.fieldName, direction: ESortParametrs.ASC}});
            break;
          default:
            break;
        }
      }

      if(location.state) {
        if(sortParams.category && location.state.title.toLowerCase() !== sortParams.category.toLowerCase()) {
          navigate(`/books/${query}`, {state: {
            title: sortParams.category,
            page: getCurrentPage(location.pathname),
            decoration: '',
            items: location.state.items
          }});

          props.fetchData(query);
          return;
        }
        navigate(`/books/${query}`, {state: location.state});
        props.fetchData(query);
        return;
      } else {
        navigate(`/books/${query}`, {state: location.state});
        props.fetchData(query);
      }

  }
  
  useEffect(() => {
    if(location.state) {
      if(getCurrentPage(location.pathname) === EPages.category) {
        setSortParams((prevState) =>{ return {...prevState, category: location.state.title}});
      } 
    }
    const checkSearchParams = location.search.length > 0;
    if(checkSearchParams) {
      let newState: {[key: string]: string} = {};
      const pairs = location.search.slice(1).split('&');
      pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        newState[key] = value;
      });
      if(newState.direction) {
        newState.direction = newState.direction === ESortParametrs.ASC ? ESortParametrs.DESC : ESortParametrs.ASC
      }
      setSortParams(newState);
    }
  }, [])
  

  const handleFilterProperty = (event: React.MouseEvent | React.ChangeEvent) => {
    const { id } = event.currentTarget;
    const {textContent} = event.target as HTMLLIElement;
    const {value, name} = event.target as HTMLInputElement;
    switch (id) {
      case 'available':
        setSortParams((prevState) => { return {...prevState, available: !prevState.available}})
        break;
      case 'category':
        setSortParams((prevState) => { return {...prevState, category: textContent!}})
        setFilterList('');
        break;
      case 'range':
        setSortParams((prevState) => { return {...prevState, [name]: value!}})
        break;    
    }
  }

  const handleFilterList = (event: string) => {
    switch (event) {
      case 'category':
       filterList === event ? setFilterList('') : setFilterList(event);
        break;
      case 'range':
        filterList === event ? setFilterList('') : setFilterList(event);
        break;
    }
  }

  const resetFilter = () => {
    setSortParams({
      min: '',
      max: ''
    });
    setFilterForm(false);
    const checkSearchParams = location.search.length > 0;
    if(checkSearchParams) {
      let newState: {[key: string]: string} = {};
      const pairs = location.search.slice(1).split('&');
      pairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        if(key === ESortParametrs.category) newState[key] = value;
      });
      let query = '';
      if(newState.category) {
        query = getUrlForRequest({page: getCurrentPage(location.pathname), params: newState})
        navigate(`/books/${query}`, {state: {
          title: newState.category,
          page: newState.category.toLowerCase(),
          decoration: '',
          items: {
            books: [],
            info: null
          }
        }})
        props.fetchData(query);
        setSortParams(newState);
        return;
      }
      query = getUrlForRequest({page: getCurrentPage(location.pathname), params: newState})
      navigate(`/books/${query}`, {state: location.state})
      props.fetchData(query);
      setSortParams(newState);
    }
  }

  return (
    <section className='filter__section'>
        <Button type='button' func={handleSort} style='filter__button' id='button-sort'>
            <span>Sort</span>
            <img src={SortIcon} alt='Sort button' />
        </Button>
        <Button type='button' func={() => setFilterForm(true)} style='filter__button' id='button-filter'>
            <span>Filter</span>
            <img src={FilterIcon} alt='Filter button' />
        </Button>
        <div className={`backdrop-filter ${filterForm ? "active" : ''}`}>
        <div className={`filter-bar ${filterForm ? "active" : ""}`}>
        <Header style="home__header">
        <Button style={`filter__reset-button`} func={resetFilter} type='button' id='button-reset-filter'>
          Reset
        </Button>
        <Title style="home__title" h={1}>
          Choose Filter
        </Title>
        <Button style={`button-back-page`} func={() => setFilterForm(false)} type='button' id='button-close-filter'>
          <img src={CloseIcon} alt="Back icon" />
        </Button>
      </Header>
      <div className='filter__container'>
        <div onClick={handleFilterProperty} id="available">
          <p>Show only available books</p>
          <Button style={`filter__toggle-button ${sortParams.available ? 'active': ""}`} type='button' id='button-toggle-filter'>
          <div className='filter__toggle-element'></div>
        </Button>
        </div>
        <div data-list="category">
          <p>Categories</p>
          <Button  
          func={() => handleFilterList("category")} 
          style={`filter__list-toggle ${filterList === 'category' ? 'active': ""}`} 
          type='button' id='button-toggle-categories-list-filter'
          >
          <img src={Arrow} alt="Arrow icon" />
        </Button>
        <ul onClick={handleFilterProperty} id="category" className={`filter__category-list ${filterList === 'category' ? 'active': ""}`}>
          {state.categories.map(({name}, inx) => <li key={inx} className={`filter__category-list-item ${sortParams.category?.toLowerCase() === name.toLowerCase() ? 'active': ''}`}>{name}</li>)}
        </ul>
        </div>
        <div>
          <p>Point Range</p>
          <Button
          func={() => handleFilterList("range")} 
          style={`filter__list-toggle ${filterList === 'range' ? 'active': ""}`} 
          type='button' id='button-toggle-range-list-filter'
          >
          <img src={Arrow} alt="Arrow icon" />
        </Button>
        <div className={`filter__range-list ${filterList === 'range' ? 'active': ""}`}>
          <div>
            <input name='min' value={sortParams.min} id="range" onChange={handleFilterProperty} type='number' placeholder='Min' />
          </div>
          <div>
          <input name='max' value={sortParams.max} id="range" onChange={handleFilterProperty} type='number' placeholder='Max' />
          </div>
        </div>
        </div>
      </div>
      <Button style="filter__submit-button" func={handleSubmit} type='button' id='button-categories-page-back'>
          Done
        </Button>
        </div>
        </div>
    </section>
  )
}
