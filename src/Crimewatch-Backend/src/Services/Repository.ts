import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";
import IRepository from "./IRepository";

class Repository<T> implements IRepository<T> {
    constructor(private readonly _model: Model<T>) {}

    public async Create(doc: Omit<T, keyof Document>): Promise<T> {
        const newDoc = await this._model.create(doc);
        await newDoc.save();
        return newDoc;
    }
    public async GetAll(): Promise<T[]> {
        const docs = await this._model.find();
        return docs;
    }
    public async GetAllByFilter(filter: FilterQuery<T>): Promise<T[]> {
        const docs = await this._model.find(filter);
        return docs;
    }
    public async GetById(id: string): Promise<T> {
        const doc = await this._model.findById(id);
        return doc!;
    }
    public async GetByFilter(filter: FilterQuery<T>): Promise<T> {
        const doc = await this._model.findOne(filter);
        return doc!;
    }
    public async UpdateById(id: string, update: UpdateQuery<T>): Promise<T> {
        const updatedDoc = await this._model.findByIdAndUpdate(id, update);
        await updatedDoc?.save();
        return updatedDoc!;
    }
    public async UpdateByFilter(
        filter: FilterQuery<T>,
        update: UpdateQuery<T>
    ): Promise<T> {
        const updatedDoc = await this._model.findOneAndUpdate(filter, update);
        await updatedDoc?.save();
        return updatedDoc!;
    }
    public async DeleteById(id: string): Promise<boolean> {
        const docDeleted = await this._model
            .findByIdAndDelete(id)
            .then(() => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
        return docDeleted;
    }
    public async DeleteByFilter(filter: FilterQuery<T>): Promise<boolean> {
        const docDeleted = await this._model
            .findOneAndDelete(filter)
            .then(() => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
        return docDeleted;
    }
}
