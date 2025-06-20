import axios from 'axios';

export const sendMessage = (baseUrl, contactData) => {
    return axios.post(`${baseUrl}/api/contact`, contactData);
};