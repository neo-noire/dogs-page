import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import fetchRequest from '../axios/axios';

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState<Boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        fetchRequest.get('/dogs/breeds').then((res) => {
            setIsAuth(true)
            setError(null)
            navigate('/')
        }
        ).catch((err) => {
            if (err.response.status === 401) {
                setIsAuth(false)
                setError('You are not authorised please Log In')
                navigate('/login')
            } else {
                setError(err.response.data)
            }
        }
        )
    }, [])

    return { isAuth, error }
}
