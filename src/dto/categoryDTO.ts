import { PlaylistDataDTO } from "./playlistDataDTO"

export interface CategoryDTO {
    message: string
    playlists: CategoryPlaylists
}


export interface CategoryPlaylists {
    href: string
    items: CategoryItem[]
    limit: number
    next: number
    offset: number
    previous: number
    total: number
}


export type CategoryItem = Omit<PlaylistDataDTO, "tracks" | "followers"> & {
    tracks: CategoryTracks
};

export interface CategoryTracks {
    href: string
    total: number
}

