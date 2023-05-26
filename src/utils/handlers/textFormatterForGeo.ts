


export function textFormater(text: string): string[] {
    let formatedText: string = "";
    let resultStringArray: string[] = [''];
    if (text.includes(",")) {
        formatedText = text
            .split(",")
            .map((el, idx) =>
                idx === 0
                    ? (el.charAt(0).toLocaleUpperCase() + el.slice(1)).trim()
                    : el.toLocaleUpperCase().trim()
            )
            .join(",");
    } else {
        formatedText = text.charAt(0).toLocaleUpperCase() + text.slice(1);
    }

    if (formatedText.includes(",")) {
        resultStringArray = formatedText.split(",");
    } else {
        resultStringArray = [formatedText];
    }
    return resultStringArray;
}
