import axios from 'axios';

const geminiApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_GEMINI_URL,
});

export default geminiApi;