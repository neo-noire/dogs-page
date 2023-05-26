import { RootState } from './../utils/store/store';
import { useEffect, useState } from 'react'
import { IDog, IDogsIdsList } from '../types/types';
import axios from 'axios';
import { useNavigate } from 'react-router';
import fetchRequest from '../utils/axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { updatePages, updateQuery, updateState } from '../utils/store/dogsListSlice/dogsListSlice';
import { queryHandler } from '../utils/handlers/queryHandler';


export const useFetch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dogsStore = useSelector((store: RootState) => store.mainDogsCache)
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchDogsList = async () => {
            const queryParameter = queryHandler(dogsStore.address.zipCodes, dogsStore.currentPage, dogsStore.dogsPerPage.chosenItem, dogsStore.breed.chosenBreeds, dogsStore.sortBy.chosenItem)
            if (queryParameter !== dogsStore.queryParam) {
                setLoading(true)
                try {
                    const { data: dogsIdsResult } = await fetchRequest<IDogsIdsList>(
                        `/dogs/search?${queryParameter}`
                    );
                    const dogsIds = dogsIdsResult.resultIds;

                    const { data: dogs } = await fetchRequest.post<IDog[]>(
                        "/dogs",
                        dogsIds
                    );
                    dispatch(updateState(dogs))
                    dispatch(updateQuery(queryParameter))
                    dispatch(updatePages(dogsIdsResult.total / dogsStore.dogsPerPage.chosenItem))
                    setLoading(false);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error?.response?.status === 401) {
                            navigate("/login");
                        }
                    } else {
                        console.error(error);
                    }
                    setLoading(false)
                }
            }
        };

        fetchDogsList();


    }, [dogsStore.dogsPerPage.chosenItem,
    dogsStore.address.zipCodes,
    dogsStore.currentPage,
    dogsStore.breed.chosenBreeds,
    dogsStore.sortBy.chosenItem]);

    return { loading }
}
