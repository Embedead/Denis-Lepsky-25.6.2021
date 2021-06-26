import axios from "axios"
import {BASE_URL,api_key} from "./apiWorker"

export const getSearchResults = (data: string) => {
    return axios.get(BASE_URL + 'autocomplete?' + api_key + 'q=' + data + '&language=en-us')
}