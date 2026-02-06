import { ImagePickerAsset } from 'expo-image-picker';

import { promptWithFiles, type FileType } from '../helpers/promptWithImages';

const API_URL = process.env.EXPO_PUBLIC_GEMINI_URL;


export interface ImageGenerationResponse {
    imageUrl: string;
    text: string;
}

export const getImageGeneration = async (
    prompt: string,
    files: (FileType | ImagePickerAsset)[],
): Promise<ImageGenerationResponse> => {

    const response = await promptWithFiles<ImageGenerationResponse>('/image-generation', { prompt }, files);

    return response;

}