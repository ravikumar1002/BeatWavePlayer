import { useNavigate } from "react-router";
import {
  useScrollTrigger,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { cloneElement } from "react";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const Header = () => {
  const navigate = useNavigate();
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
          <Toolbar disableGutters className="p-6">
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
              onClick={() => {
                navigate("/");
              }}
              data-testid="pageTitle"
            >
              Yfitops
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};
