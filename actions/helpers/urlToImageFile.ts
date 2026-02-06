import { FileType } from "./promptWithImages";

export const urlToImageFile = async (url: string): Promise<FileType> => {
    const response = await fetch(url);
    const blob = await response.blob();

    return {
        uri: url,
        type: blob.type ?? 'img/jpeg',
        fileName: url.split('/').pop() ?? 'image.jpg'
    }
}