import { IDog, ILocation, ISortParams } from "./types";

interface IBreed {
    breedList: string[],
    chosenBreeds: string[]
}

interface ISortBy<T> {
    sortList: T[],
    chosenItem: T
}

interface IAddress {
    addressList: ILocation[],
    zipCodes: string | null,
    input: string,
}

export interface CounterState {
    dogsArray: IDog[],
    queryParam: string,
    totalPages: number,
    breed: IBreed,
    sortBy: ISortBy<ISortParams>,
    dogsPerPage: ISortBy<number>,
    currentPage: number,
    address: IAddress
}