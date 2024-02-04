import { useNavigate } from "react-router";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { ElevationScroll } from "@hooks/useElevationSroll";
import { SearchBar } from "@components/SearchBar";

export const Header = () => {
  const navigate = useNavigate();

  // const suggestionSearchhandler = useDebounce(() =>
  //   spotifySearchApi(searchString, searchResultLimit)
  // );
  // suggestionSearchhandler();



  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          background: "white",
          color: "purple",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            className="p-3"
            sx={{
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#"
                sx={{
                  color: "inherit",
                  fontWeight: 700,
                }}
                className="mr-2 no-underline"
                onClick={() => {
                  navigate("/");
                }}
                data-testid="pageTitle"
              >
                Yfitops
              </Typography>
            </Box>
            <Box className="flex flex-shrink flex-grow justify-center">
              <SearchBar/>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};
