import { useEffect, useState } from 'react'


export const useValidate = (validateValue: string) => {
    const [inputHelper, setInputHelper] = useState<string>("");
    const [validationPass, setValidationPass] = useState<boolean>(false);

    useEffect(() => {
        const emailChecker = () => {
            const regex: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
            if (validateValue.length > 1) {
                if (validateValue.match(regex)) {
                    setInputHelper("Well Done!");
                    setValidationPass(true)
                } else {
                    setInputHelper("Incorrect format");
                    setValidationPass(false)
                }
            } else {
                setInputHelper("");
                setValidationPass(false)
            }
        };

        emailChecker();
    }, [validateValue]);

    return [inputHelper, validationPass] as const
}
