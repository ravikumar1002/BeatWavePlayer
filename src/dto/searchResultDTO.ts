export interface Welcome {
    albums: Albums;
    artists: Artists;
    playlists: Playlists;
    tracks: Tracks;
}

export interface Albums {
    href: string;
    items: AlbumElement[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

export interface AlbumElement {
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

export interface Artists {
    href: string;
    items: ArtistsItem[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

export interface ArtistsItem {
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

export interface Playlists {
    href: string;
    items: PlaylistsItem[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

export interface PlaylistsItem {
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

export interface Tracks {
    href: string;
    items: TracksItem[];
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
}

export interface TracksItem {
    album: AlbumElement;
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
    images?: Image[];
}

export interface ExternalIDS {
    isrc: string;
}
