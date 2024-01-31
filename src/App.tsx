import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import TrendingPage from '@pages/TrendingPage';
import HomePage from '@pages/HomePage';
import DetailsPage from '@pages/DetailsPage';
import { PageWrapper } from '@components/PageWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchResultPage } from '@pages/SearchResultPage';


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
          <DetailsPage />
        </PageWrapper>
      )
    },
    {
      path: "/playlist/:playlistid",
      element: (
        <PageWrapper>
          <TrendingPage />
        </PageWrapper>
      ),
    },
  ]);

  const queryClient = new QueryClient()

  const theme = createTheme(({
    typography: {
      fontFamily: 'Inter'
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>

  )
}

export default App
