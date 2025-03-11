import { DotCMSClient } from './lib/client';

const client = new DotCMSClient({
    baseURL: '<your-base-url>',
    token: '<your-token>',
    siteID: '<your-site-id>'
});

(async () => {
    const page = await client.getPage({
        path: '/',
        languageID: '1'
    });

    console.log(page);
})();
