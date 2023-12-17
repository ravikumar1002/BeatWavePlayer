import { create } from 'zustand';


interface IStore {
    audioLevel: number
    isAudioMuted: boolean
    currentTrack: number
    playingsongId: string | null
    setAudioLevel: (audioLevel: number) => void
    setIsAudioMuted: (isAudioMuted: boolean) => void
    setCurrentTrack: (currentTrack: number) => void
    setPlayingSongId: (playingsongId: string | null) => void
}

export const useAppStore = create<IStore>()((set) => ({
    audioLevel: 40,
    isAudioMuted: false,
    currentTrack: 0,
    playingsongId: null,
    setAudioLevel: (audioLevel: number) => set({ audioLevel }),
    setIsAudioMuted: (isAudioMuted: boolean) => set({ isAudioMuted }),
    setCurrentTrack: (currentTrack: number) => set({ currentTrack }),
    setPlayingSongId: (playingsongId: string | null) => set({ playingsongId })
}));