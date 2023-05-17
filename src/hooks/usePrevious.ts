import { useEffect, useRef } from 'react'

export const usePrevious = (value: string | null) => {
    const ref = useRef<string | null>()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}
