import { Box } from "@mui/system"

export const MiddleDot = () => {
    return (
        <Box sx={{
            fontWeight: 900,
            color: "gray",
            padding: {
                xs:"0.1rem 0.25rem 0 0.25rem",
                sm:"0.1rem 0.5rem 0 0.5rem"
            }
        }}>
            &#183;
        </Box>
    )
}