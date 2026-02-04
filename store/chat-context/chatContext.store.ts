import { create } from 'zustand';

import uuid from 'react-native-uuid';

import * as GeminiActions from '@/actions/gemini';
import { Message } from '@/interfaces/chat.interfaces';


interface ChatContextState {
    isGeminiWriting: boolean;
    chatId: string;
    messages: Message[];
    addMessage: (text: string, files: any[]) => void;
    clearChat: () => void;
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

export const useChatContextStore = create<ChatContextState>()((set, get) => ({
    // State
    isGeminiWriting: false,
    chatId: uuid.v4(),
    messages: [],

    // Actions
    addMessage: async (prompt: string, files: any[]) => {
        const userMessage = createMessage(prompt, 'user', files);
        const geminiMessage = createMessage('Generating answer...', 'gemini')
        const chatId = get().chatId;

        set((state) => ({
            messages: [geminiMessage, userMessage, ...state.messages],
        }))

        // Gemini Request
        GeminiActions.getChatStream(prompt, chatId, files, (text) => {
            set(state => ({
                messages: state.messages.map((message) => message.id === geminiMessage.id ? { ...message, text: text } : message),
            }));
        });

        set({ isGeminiWriting: false });


    },
    clearChat: () => {
        set({ messages: [], chatId: uuid.v4() });
    }
}));