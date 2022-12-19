import Province from "../Enums/Province";

export interface ILocation {
    No: string;
    Street1: string;
    Street2: string;
    Street3: string;
    City: string;
    Province: Province;
}
export default ILocation;
export interface LocationDocument extends ILocation, Document {}
