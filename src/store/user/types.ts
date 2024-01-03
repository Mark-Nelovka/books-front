export interface IUserState {
    user: {
        points: number,
        avatar: null | string,
        location: string,
        language: string,
        address: string,
        isOnboarding: boolean,
        storage: string[],
        basket: number,
        historySearches: string[]
    },
    error: {
        status: null | number,
        message: string,
      },
}