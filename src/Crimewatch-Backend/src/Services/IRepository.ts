import { Document, FilterQuery, UpdateQuery } from "mongoose";

interface IRepository<T> {
    Create(doc: Omit<T, keyof Document>): Promise<T>;
    GetAll(): Promise<T[]>;
    GetAllByFilter(filter: FilterQuery<T>): Promise<T[]>;
    GetById(id: string): Promise<T>;
    GetByFilter(filter: FilterQuery<T>): Promise<T>;
    UpdateById(id: string, update: UpdateQuery<T>): Promise<T>;
    UpdateByFilter(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T>;
    DeleteById(id: string): Promise<boolean>;
    DeleteByFilter(filter: FilterQuery<T>): Promise<boolean>;
}
export default IRepository;
