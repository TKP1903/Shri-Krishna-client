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
