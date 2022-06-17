export function displayDate(dateVal: number): string {
    const date = new Date(dateVal);
    const options = {
        dateStyle: "short",
    } as Intl.DateTimeFormatOptions;

    return getDateString(date, options);
}

export function displayDateTime(dateVal: number): string {
    const date = new Date(dateVal);
    const options = {
        dateStyle: "short",
        timeStyle: "medium",
    } as Intl.DateTimeFormatOptions;

    return getDateString(date, options);
}

function getDateString(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return date.toLocaleString("de-DE", options);
}