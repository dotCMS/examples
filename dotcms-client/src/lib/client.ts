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

    async getPage({ path, languageID }: PageAPIParams) {}
}
