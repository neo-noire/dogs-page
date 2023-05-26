import { ISortParams } from "../../types/types";

type QueryHandlerFn = (zipCode: string[] | null, currentPage: number, sizePerPage: number, chosenBreeds: string[], sortBy: ISortParams) => string

export const queryHandler: QueryHandlerFn = (zipCodes, currentPage, sizePerPage, chosenBreeds, sortBy) => {
    const zip_code =
        zipCodes && zipCodes?.length > 0
            ? `&zipCodes=${zipCodes.join("&zipCodes=")}`
            : "";
    const from = currentPage > 0 ? `&from=${currentPage * sizePerPage}` : "";
    const breedQuery = chosenBreeds.map((el) => `&breeds=${el}`).join("");
    const size = `&size=${sizePerPage}`;
    const order = sortBy.value.includes("-") ? "desc" : "asc";
    const sort = `&sort=${sortBy.value.split("-").join("")}:`;
    const string = breedQuery + zip_code + sort + order + size + from;

    return string;
}