import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand'
interface ChatStore {
    users: any[];
    fetchUsers: () => Promise<void>;
    isLoading:boolean;
    error: string | null;
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get('/users');
            set({ users: response.data.allusers });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));