import geminiApi from "../gemini.api";

export interface FileType {
    uri: string;
    fileName?: string;
    type?: string;
}

export const promptWithFiles = async (
    endpoint: string,
    prompt: string,
    files: FileType[],
): Promise<string> => {

    try {
        const formData = new FormData();
        formData.append('prompt', prompt);

        files.forEach(att => {
            formData.append('files', {
                uri: att.uri,
                name: att.fileName ?? 'image.jgp',
                type: att.type ?? 'image/jpeg'
            } as unknown as Blob);
        });

        const response = await geminiApi.post(endpoint, formData);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }

}