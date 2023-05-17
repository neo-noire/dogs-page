import React, { useEffect, useState } from 'react'
import { IDog, IDogsIdsList } from '../types/types';
import fetchRequest from '../axios/axios';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ISortParams } from '../pages/MainPage/Main';

interface IUseFetch {
    zipCodes: string[] | null;
    sizePerPage: number;
    currentPage: number;
    chosenBreeds: string[];
    sortBy: ISortParams;
}

export const useFetch = ({
    sizePerPage,
    zipCodes,
    currentPage,
    chosenBreeds,
    sortBy, }: IUseFetch) => {
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState<number>(0);
    const [dogs, setDogs] = useState<IDog[]>([]);

    useEffect(() => {
        const fetchDogsList = async () => {

            const zip_code =
                zipCodes && zipCodes?.length > 0
                    ? `&zipCodes=${zipCodes.join("&zipCodes=")}`
                    : "";
            const from = currentPage > 0 ? `&from=${currentPage * sizePerPage}` : "";
            const breedQuery = chosenBreeds.map((el) => `&breeds=${el}`).join("");
            const size = `&size=${sizePerPage}`;
            const order = sortBy.value.includes("-") ? "desc" : "asc";
            const sort = `&sort=${sortBy.value.split("-").join("")}:`;
            try {
                const { data: dogsIdsResult } = await fetchRequest<IDogsIdsList>(
                    `/dogs/search?${breedQuery + zip_code + sort + order + size + from}`
                );
                setPageCount(dogsIdsResult.total / sizePerPage);
                const dogsIds = dogsIdsResult.resultIds;
                const { data: dogs } = await fetchRequest.post<IDog[]>(
                    "/dogs",
                    dogsIds
                );
                setDogs(dogs);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error?.response?.status === 401) {
                        navigate("/login");
                    }
                } else {
                    console.error(error);
                }
            }
        };

        fetchDogsList();
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth",
        });
    }, [sizePerPage,
        zipCodes,
        currentPage,
        chosenBreeds,
        sortBy,]);

    return { dogs, pageCount }
}
