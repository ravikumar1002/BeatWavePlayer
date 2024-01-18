import { useScrollTrigger } from "@mui/material";
import { cloneElement } from "react";

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

export function ElevationScroll(props: Props) {
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
