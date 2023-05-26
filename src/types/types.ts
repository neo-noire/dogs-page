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


export interface ISortParams {
    name: string;
    value: string;
}
export interface ILocation {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

export interface IResponse {
    results: ILocation[];
    total: number;
}

