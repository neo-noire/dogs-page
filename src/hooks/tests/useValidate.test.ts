import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useValidate } from "../useValidate";


describe("Use Validate Email hook", () => {
    it('valid email axcepted', () => {
        const { result } = renderHook(() => useValidate('my@gmail.com'))
        const [validationStatusText, isValid] = result.current

        expect(validationStatusText).toMatch(/well done/i)
        expect(isValid).toBe(true)
    })
    it('invalid email unexepted', () => {
        const { result } = renderHook(() => useValidate('@gmail.com'))
        const [validationStatusText, isValid] = result.current

        expect(validationStatusText).toMatch(/incorrect format/i)
        expect(isValid).toBe(false)
    })
    it('email with no text after @, will be invalid ', () => {
        const { result } = renderHook(() => useValidate('m@.com'))
        const [validationStatusText, isValid] = result.current

        expect(validationStatusText).toMatch(/incorrect format/i)
        expect(isValid).toBe(false)
    })
    it('email no domain will be invalid ', () => {
        const { result } = renderHook(() => useValidate('m@gmail.'))
        const [validationStatusText, isValid] = result.current

        expect(validationStatusText).toMatch(/incorrect format/i)
        expect(isValid).toBe(false)
    })
    it('email short domain will be invalid ', () => {
        const { result } = renderHook(() => useValidate('m@gmail.c'))
        const [validationStatusText, isValid] = result.current

        expect(validationStatusText).toMatch(/incorrect format/i)
        expect(isValid).toBe(false)
    })
})


