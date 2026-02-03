import geminiApi from "../gemini.api";

export const getBasicPrompt = async (prompt: string): Promise<string> => {
    const response = await geminiApi.post(
        '/basic-prompt',
        {
            prompt,
        },
        {
            responseType: 'text',
        }
    );

    return response.data.trim();
}