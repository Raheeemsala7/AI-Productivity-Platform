import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Static for now, we'll change this later
    const requestedResult = await requestLocale;
    const locale = hasLocale(routing.locales, requestedResult)
        ? requestedResult
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});