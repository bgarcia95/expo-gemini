import { fetch } from 'expo/fetch';
import { promptWithFiles, type FileType } from '../helpers/promptWithImages';

const API_URL = process.env.EXPO_PUBLIC_GEMINI_URL;


export const getBasicPromptStream = async (
    prompt: string,
    files: FileType[],
    onChunk: (text: string) => void
) => {

    if (files.length > 0) {
        const response = await promptWithFiles<string>('/basic-prompt-stream', { prompt }, files);

        onChunk(response);
        return;
    }

    const formData = new FormData();
    formData.append('prompt', prompt);


    try {
        const response = await fetch(`${API_URL}/basic-prompt-stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'plain/text'
            },
            body: formData
        });

        if (!response.body) {
            console.error(response);
            throw new Error("There's no body in the response");
        }

        const reader = response.body.getReader(); // UINT
        const decoder = new TextDecoder('utf-8');

        let result = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;


            const chunk = decoder.decode(value);
            result += chunk;
            onChunk(result);

        }

    } catch (error) {
        console.error(error);
        throw 'Something unexpected happened.'
    }

}