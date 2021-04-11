import { Login } from "./login";

export interface Register extends Login{
    firstName:string,
    lastName:string
}