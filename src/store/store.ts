import { create } from 'zustand';


interface IStore {
    audioLevel: number
    isAudioMuted: boolean
    setAudioLevel: (audioLevel: number) => void
    setIsAudioMuted: (isAudioMuted: boolean) => void
}

export const useAppStore = create<IStore>()((set) => ({
    audioLevel: 40,
    isAudioMuted: false,
    setAudioLevel: (audioLevel: number) => set({ audioLevel }),
    setIsAudioMuted: (isAudioMuted: boolean) => set({ isAudioMuted }),
}));