export const RoutesEndpoints = {
  base: '/',
  home: '/home',
  categories: '/categories',
  details: '/book/:bookId',
  basket: '/user/basket'
}

export const AuthEndpoints = {
    authRegistration: '/api/auth/registration',
    authLogin: '/api/auth/login',
    authLogout: '/api/auth/logout'
  }
  
  export const BooksEndpoints = {
    homeBooks: 'api/books/home',
    allBooks: 'api/books/all',
    popularBooks: 'api/books/popular',
    recentlyBooks: 'api/books/recently',
    dynamicBook: (bookId: number) => `api/books/${bookId}`,
    addBooks: '/api/books',
    updateBook: (bookId: number) => `/api/books/${bookId}`,
    booksByCategory: (categoryName: string) => `/api/books/category?category=${categoryName}`,
    searchBooks: (inputSearchValue: string) => `/api/books/search?search=${inputSearchValue}`,
    searchSelectionUser: (bookId: number | number[]) => `/api/books/search/user-selection?id=${bookId}` 
  }
  
  export const UserEndpoints = {
    userGetCurrent: 'api/user',
    userOnboarding: '/api/user/onboarding',
    userGetAvatar: (id: number) => `/api/user/${id}/avatar`,
    userStorage: '/api/user/storage',
    userFavorites: '/api/user/favorites',
    userBasket: '/api/user/basket',
    userUpdate: (id: number) => `/api/user/${id}`
  }