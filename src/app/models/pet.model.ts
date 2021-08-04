import { Description } from "./description.model";

export default class Pet {
    key?: string | null;
    petName?: string;
    dateOfBirth?: Date;
    petPhoto?: string;
    petStatus?: string;
    description?: Description = new Description();
}
