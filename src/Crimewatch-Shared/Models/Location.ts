import Province from "../Enums/Province";

class Location {
    No?: string;
    Street1!: string;
    Street2?: string;
    Street3?: string;
    City!: string;
    Province!: Province;
}
export default Location;
export interface LocationDocument extends Location, Document {}
