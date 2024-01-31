import { Box } from "@mui/material";
import { useAppStore } from "@store/store";
import { Header } from "./Header";
import { AudioPlayer } from "./AudioPlayer";


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
            {playlistSongs && <AudioPlayer playlist={playlistSongs}/>}
        </Box >
    )
}