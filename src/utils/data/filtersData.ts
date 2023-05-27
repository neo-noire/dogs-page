import { ISortParams } from "../../types/types";

export const sizes: number[] = [10, 25, 50, 75, 100];

export const sortParams: ISortParams[] = [
    {
        name: "Breed asc",
        value: "breed",
    },
    {
        name: "Breed desc",
        value: "-breed",
    },
    {
        name: "Age asc",
        value: "age",
    },
    {
        name: "Age desc",
        value: "-age",
    },
    {
        name: "Name asc",
        value: "name",
    },
    {
        name: "Name desc",
        value: "-name",
    },
];