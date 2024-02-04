export interface SearchResultDTO {
    albums: SearchResultAlbums;
    artists: SearchResultArtists;
    playlists: SearchResultPlaylists;
    tracks: SearchResultTracks;
}

export interface SearchResultAlbums {
    href: string;
    items: SearchResultAlbumItems[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

export interface SearchResultAlbumItems {
    albumType: AlbumTypeEnum;
    artists: Owner[];
    availableMarkets: string[];
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate: Date;
    releaseDatePrecision: ReleaseDatePrecision;
    totalTracks: number;
    type: AlbumTypeEnum;
    uri: string;
}

export enum AlbumTypeEnum {
    Album = "album",
    Single = "single",
}

export interface Owner {
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    name?: string;
    type: OwnerType;
    uri: string;
    displayName?: string;
}

export interface ExternalUrls {
    spotify: string;
}

export enum OwnerType {
    Artist = "artist",
    User = "user",
}

export interface Image {
    height: number | null;
    url: string;
    width: number | null;
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export interface SearchResultArtists {
    href: string;
    items: SearchResultArtistsItem[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

export interface SearchResultArtistsItem {
    externalUrls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: OwnerType;
    uri: string;
}

export interface Followers {
    href: null | string;
    total: number;
}

export interface SearchResultPlaylists {
    href: string;
    items: SearchResultPlaylistsItem[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

export interface SearchResultPlaylistsItem {
    collaborative: boolean;
    description: string;
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    primaryColor: null;
    public: null;
    snapshotID: string;
    tracks: Followers;
    type: string;
    uri: string;
}

export interface SearchResultTracks {
    href: string;
    items: SearchResultTracksItem[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

export interface SearchResultTracksItem {
    album: SearchResultAlbumItems;
    artists: Owner[];
    availableMarkets: string[];
    discNumber: number;
    durationMS: number;
    explicit: boolean;
    externalIDS: ExternalIDS;
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    isLocal: boolean;
    name: string;
    popularity: number;
    previewURL: null | string;
    trackNumber: number;
    type: string;
    uri: string;
    images: Image[];
}

export interface ExternalIDS {
    isrc: string;
}
