import { getModelForClass, prop } from "@typegoose/typegoose";
import Province from "crimewatch-shared/Enums/Province";
import ILocation from "crimewatch-shared/Models/ILocation";

class Location implements ILocation {
    @prop({ required: true })
    public No!: string;
    @prop({ required: true })
    public Street1!: string;
    @prop()
    public Street2?: string;
    @prop()
    public Street3?: string;
    @prop({ required: true })
    public City!: string;
    @prop({ required: true })
    public Province!: Province;
}
export default Location;
export const LocationModel = getModelForClass(Location);
