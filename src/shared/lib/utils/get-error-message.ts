export const getErrorMessage = (
    error: unknown,
    fallback: string
): string => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    if (typeof error === "object" && error !== null) {
        const data = error as Record<string, unknown>;

        for (const value of Object.values(data)) {
            if (Array.isArray(value) && value.length > 0) {
                return String(value[0]);
            }

            if (typeof value === "string") {
                return value;
            }
        }
    }

    return fallback;
};