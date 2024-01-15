import CategoryList from 'components/CategoryList/CategoryList'
import Header from 'components/Header/Header';
import Title from 'components/Title/Title';
import React from 'react'
import { useAppSelector } from 'store/hook'
import BackPageIcon from 'assets/icons/arrow-left.svg';
import Button from 'ui/Button/Button';
import { Link } from 'react-router-dom';
import { EPages } from 'components/BookList/BookList';

export default function FullCategoryPage() {
    const categories = useAppSelector(state => state.books.categories);
  return (
    <>
    <div className="container">
      <Header style="home__header">
        <Button style='' type='button' id='button-categories-page-back'>
          <Link to={'/home'}>
          <img src={BackPageIcon} alt="Back icon" />
          </Link>
        </Button>
        <Title style="home__title" h={1}>
          Categories
        </Title>
      </Header>
      <CategoryList items={categories} page={EPages.category} />
      </div>
    </>
  )
}
