

import { Box, Skeleton } from "@mui/material"

const SkeletonVerticalSongCard = () => {

    return (
        <Box sx={{}}>
            <Box className="w-full flex p-6" sx={{
                marginTop: "0.5rem"
            }}
            >
                <Box className="flex gap-10 w-1/6" sx={{
                    alignItems: "center",
                    borderRadius: "5px"
                }}>
                    <Box className="relative">
                        <Skeleton variant="rectangular" height={96} width={96} sx={{
                            objectFit: "cover",
                            borderRadius: "5px",
                        }} />
                    </Box>
                    <Box>
                        <Skeleton height={30}  width={20}/>
                    </Box>
                </Box>
                <Box className="" sx={{
                    flexGrow: 2
                }}>
                    <Box>
                        <Skeleton width={230} />

                        <Box className="flex flex-wrap">
                            <Skeleton width={150} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SkeletonVerticalSongCard