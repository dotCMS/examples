import { DotCMSConfig, PageAPIParams } from './types';

const PAGE_API_PATH = '/api/v1/page/json';

export class DotCMSClient {
    #token: string;
    #siteID: string;
    #baseURL: string;

    constructor({ baseURL, siteID, token }: DotCMSConfig) {
        this.#baseURL = baseURL;
        this.#siteID = siteID;
        this.#token = token;
    }

    async getPage({ path, languageID }: PageAPIParams) {
        const queryParams = new URLSearchParams();
        queryParams.set('host_id', this.#siteID);
        queryParams.set('languageId', languageID ?? '1');

        const url = new URL(`${PAGE_API_PATH}${path}?${queryParams.toString()}`, this.#baseURL);

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.#token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch page: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    }
}
