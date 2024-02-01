import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import TrendingPage from "@pages/TrendingPage";
import HomePage from "@pages/HomePage";
import { PageWrapper } from "@components/PageWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchResultPage } from "@pages/SearchResultPage";
import PlaylistsPage from "@pages/PlaylistsPage";
import { ArtistDetailsPage, ArtistsPage } from "@pages/Artists";
import { AlbumDetailsPage, AlbumsPage } from "@pages/Albums";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PageWrapper>
          <HomePage />
        </PageWrapper>
      ),
    },
    {
      path: "/search",
      element: (
        <PageWrapper>
          <SearchResultPage />
        </PageWrapper>
      ),
    },
    {
      path: "/playlist",
      element: (
        <PageWrapper>
          <PlaylistsPage />
        </PageWrapper>
      ),
    },
    {
      path: "/playlist/:playlistid",
      element: (
        <PageWrapper>
          <TrendingPage />
        </PageWrapper>
      ),
    },
    {
      path: "/artists",
      element: (
        <PageWrapper>
          <ArtistsPage />
        </PageWrapper>
      ),
    },
    {
      path: "/artists/:artistId",
      element: (
        <PageWrapper>
          <ArtistDetailsPage />
        </PageWrapper>
      ),
    },
    {
      path: "/albums",
      element: (
        <PageWrapper>
          <AlbumsPage />
        </PageWrapper>
      ),
    },
    {
      path: "/albums/:albumId",
      element: (
        <PageWrapper>
          <AlbumDetailsPage />
        </PageWrapper>
      ),
    },
  ]);

  const queryClient = new QueryClient();

  const theme = createTheme({
    typography: {
      fontFamily: "Inter",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
