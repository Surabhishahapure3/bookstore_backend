import { IUser } from "./user.interface";

export interface IUserResponse {
    code: number;
  data: {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    // password:string;
  } | null;
  message: string;
  }