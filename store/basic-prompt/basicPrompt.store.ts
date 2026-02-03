import { create } from 'zustand';

import uuid from 'react-native-uuid';

import * as GeminiActions from '@/actions/gemini';
import { Message } from '@/interfaces/chat.interfaces';


interface BasicPromptState {
    isGeminiWriting: boolean;
    messages: Message[];
    addMessage: (text: string, files: any[]) => void;
    setGeminiWriting: (isWriting: boolean) => void;
}

const createMessage = (text: string, sender: 'user' | 'gemini', files: any[] = []): Message => {

    if (files.length > 0) {
        return {
            id: uuid.v4(),
            text: text,
            createdAt: new Date(),
            sender: sender,
            type: 'image',
            images: files.map(file => file.uri),
        }
    }
    return {
        id: uuid.v4(),
        text: text,
        createdAt: new Date(),
        sender: sender,
        type: 'text',
    };
}

export const useBasicPromptStore = create<BasicPromptState>()((set) => ({
    // State
    isGeminiWriting: false,
    messages: [],

    // Actions
    addMessage: async (prompt: string, files: any[]) => {
        const userMessage = createMessage(prompt, 'user', files);
        const geminiMessage = createMessage('Generating answer...', 'gemini')

        set((state) => ({
            messages: [geminiMessage, userMessage, ...state.messages],
        }))

        // Gemini Request
        GeminiActions.getBasicPromptStream(prompt, files, (text) => {

            console.log('text', text);

            set(state => ({
                messages: state.messages.map((message) => message.id === geminiMessage.id ? { ...message, text: text } : message),
            }))

        });
        // const geminiMessage = createMessage(geminiResponseText, 'gemini');

        // set((state) => ({
        //     isGeminiWriting: false,
        //     messages: [geminiMessage, ...state.messages],
        // }))

        set({ isGeminiWriting: false });


    },
    setGeminiWriting: (isWriting: boolean) => {
        set({ isGeminiWriting: isWriting })
    }
}));