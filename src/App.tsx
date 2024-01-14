import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import TrendingPage from '@pages/TrendingPage';
import HomePage from '@pages/HomePage';
import DetailsPage from '@pages/DetailsPage';
import { PageWrapper } from '@components/PageWrapper';

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

  const theme = createTheme(({
    typography: {
      fontFamily: 'Inter'
    }
  }))

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
