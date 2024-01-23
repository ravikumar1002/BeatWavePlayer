import { Artist2, PlaylistDataDTO } from '@dto/playlistDataDTO';
import { create } from 'zustand';

export interface playingSongDTO {
    title: string;
    url: string;
    image: string;
    id: string;
    artists: Artist2[];
    release_year: string;
    album: string;
}


interface IStore {
    audioLevel: number
    isAudioMuted: boolean
    currentTrack: number
    playlistSongs: playingSongDTO[] | null
    playingsongId: string | null
    openPlaylist: PlaylistDataDTO | null
    setAudioLevel: (audioLevel: number) => void
    setIsAudioMuted: (isAudioMuted: boolean) => void
    setCurrentTrack: (currentTrack: number) => void
    setPlaylistSongs: (playlistSongs: playingSongDTO[] | null) => void
    setPlayingSongId: (playingsongId: string | null) => void
    setOpenPlaylist: (openPlaylist: PlaylistDataDTO | null) => void
}

export const useAppStore = create<IStore>()((set) => ({
    audioLevel: 40,
    isAudioMuted: false,
    currentTrack: 0,
    playlistSongs: null,
    playingsongId: null,
    openPlaylist: null,
    setAudioLevel: (audioLevel: number) => set({ audioLevel }),
    setIsAudioMuted: (isAudioMuted: boolean) => set({ isAudioMuted }),
    setCurrentTrack: (currentTrack: number) => set({ currentTrack }),
    setPlaylistSongs: (playlistSongs: playingSongDTO[] | null) => set({ playlistSongs }),
    setPlayingSongId: (playingsongId: string | null) => set({ playingsongId }),
    setOpenPlaylist: (openPlaylist: PlaylistDataDTO | null) => set({ openPlaylist }),
}));