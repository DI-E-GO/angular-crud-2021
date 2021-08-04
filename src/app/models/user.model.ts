import Pet from "./pet.model";

export class User {
    key?: string | null;
    firstName?: string;
    lastName?: string;
    location?: string;
    typeOfUser?: string;
    pets?: Array<Pet> = new Array<Pet>();
}
