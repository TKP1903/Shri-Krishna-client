export interface User {
  name: string;
  email: string;
  password: string;
}

export interface RegisterDetails {
  name: string;
  email: string;
  password: string;
  phone: {
    dailCode: string;
    number: number;
  };
  qualification: string;
  country: string;
  ip?: string;
  browser?: string;
  state?: string;
  city?: string;
  address?: string;
}

// login details
export interface LoginDetails {
  email: string;
  password: string;
}

export interface token {
  token: string;
  expires: string; // date-time
}

// login response
export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
  };
  AuthTokens: {
    access: token;
    refresh: token;
  };
}
