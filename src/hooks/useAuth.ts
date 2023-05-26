import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom'
import fetchRequest from '../utils/axios/axios';

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState<Boolean>(false)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        fetchRequest.get('/dogs/breeds').then(() => {
            setIsAuth(true)
            setError(null)
            redirect('/')
        }
        ).catch((err) => {
            if (err?.response?.status === 401) {
                setIsAuth(false)
                setError('You are not authorised please Log In')
                redirect('/login')
            } else {
                setError(err?.response?.data)
            }
        }
        )
    }, [])



    return { isAuth, error }
}
