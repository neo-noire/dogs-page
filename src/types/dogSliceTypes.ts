import { IDog, ISortParams } from "./types";

interface IBreed {
    breedList: string[],
    chosenBreeds: string[]
}

interface ISortBy<T> {
    sortList: T[],
    chosenItem: T
}

export interface CounterState {
    dogsArray: IDog[],
    queryParam: string,
    totalPages: number,
    breed: IBreed,
    sortBy: ISortBy<ISortParams>,
    dogsPerPage: ISortBy<number>,
    currentPage: number,
}