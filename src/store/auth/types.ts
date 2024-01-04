export interface IAuthState {
  token: string | null;
  error: {
    status: null | number;
    message: string;
  };
}

export interface IPayloadActionAuthSuccess {
  accessToken: string;
}

export interface IRegistrationInfoUser {
  email: string;
  password: string;
  name: string;
  lastName: string;
}
