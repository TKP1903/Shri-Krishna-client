export type MongoId = string;
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
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
  tokens: {
    access: token;
    refresh: token;
  };
  [key: string]: any;
}
export interface CdnUploadRes {
  msg: string;
  server_time: string;
  status: number;
  result: [
    {
      download_url: string;
      single_img: string;
      status?: number;
      filecode: string;
      splash_img: string;
      canplay?: boolean;
      size: string;
      length: string;
      uploaded: string;
      protected_embed: string;
      protected_dl: string;
      title: string;
    }
  ];
}
export interface VideoEntry extends ArrayElement<CdnUploadRes["result"]> {
  description?: string;
  teacher?: MongoId;
}

export interface SavedVideo extends VideoEntry {
  id?: MongoId;
  createdAt?: string;
  updatedAt?: string;
}

interface Chapter {
  title: string;
  description: string;
  videos: VideoEntry[];
}

interface ChapterEntry {
  title: string;
  description: string;
  videos: MongoId[];
}

export interface CourseEntry {
  title: string;
  description: string;
  price: number;
  code: string;
  subjects: string[];
  units: {
    title: string;
    s_no: number;
    chapters: ChapterEntry[];
  }[];
  createdAt: string;
  updatedAt: string;
  teachers: MongoId[];
}

export interface CourseData {
  title: string;
  description: string;
  price: number;
  code: string;
  subjects: string[];
  units: {
    title: string;
    s_no: number;
    chapters: Chapter[];
  }[];
  createdAt: string;
  updatedAt: string;
  teachers: MongoId[];
  students: MongoId[];
}
