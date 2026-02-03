import geminiApi from "../gemini.api";

export interface FileType {
    uri: string;
    fileName?: string;
    type?: string;
}

interface JSONBody {
    // prompt: string;
    [key: string]: any;
}

export const promptWithFiles = async (
    endpoint: string,
    body: JSONBody,
    files: FileType[],
): Promise<string> => {

    try {
        const formData = new FormData();

        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        })

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