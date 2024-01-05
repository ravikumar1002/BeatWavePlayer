import { Box } from "@mui/material";
import { useAppStore } from "../store/store";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import Header from "./Header/Header"

interface IPageWrapper {
    children: React.ReactNode;
}

export const PageWrapper = (props: IPageWrapper) => {
    const { children } = props;

    const { playlistSongs } = useAppStore()

    return (
        <Box className={"relative min-h-screen"}>
            <Header />
            {children}
            {playlistSongs && <AudioPlayer playlist={playlistSongs?.tracks?.items.map((item) => {
                return {
                    title: item.track.name,
                    url: item.track?.preview_url ? item.track?.preview_url : "",
                    image: item.track.album.images[0].url,
                    id: item.track.id
                }
            })}
            />
            }
        </Box >
    )
}