export interface RentalDto {
    id?:number;
    carId: number;
    carName: string;
    customerId: number;
    fullName: string;
    rentDate: Date;
    returnDate: Date;
  }
  