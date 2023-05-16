export interface IDog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}
export interface IDogsIdsList {
    next?: string;
    prev?: string;
    resultIds: string[];
    total: number;
}