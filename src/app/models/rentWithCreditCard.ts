import { RentalDto } from "./rentalDto";

export interface RentWithCreditCard{
    rental:RentalDto;
    cardHoldersName:string;
    cardNumber:string;
    cardExpirationMonth:number;
    cardExpirationYear:number;
    cardCvcNumber:number;
    totalPrice:number;
}