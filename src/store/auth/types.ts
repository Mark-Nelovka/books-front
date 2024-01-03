export interface IAuthState {
    userRegistrInfo: {
        name: string,
        lastName: string,
        email: string,
        token: string | null,
    },
    error: {
        status: null | number,
        message: string,
      },
}

// export interface IAuthState {
//     user: {
//         name: string,
//         email: string,
//         points: number,
//         avatar: null | string,
//         token: null | string,
//         location: string,
//         language: string,
//         address: string,
//         isOnboarding: boolean,
//         storage: string[],
//         basket: number,
//         historySearches: string[]
//     },
//     error: {
//         status: null | number,
//         message: string,
//       },
// }

export interface IPayloadActionAuthSuccess {
  accessToken: string
}

export interface IRegistrationInfoUser {
        email: string,
        password: string,
        name: string,
        lastName: string
}