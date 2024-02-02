import { Box, Skeleton } from "@mui/material";

export const DetailsPageBannerSkeleton = () => {
  return (
    <Box className="flex items-center w-full">
      <Box className="w-80 h-96 px-8 py-4">
        <Skeleton
          className="w-full h-full"
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Box
        className="mt-4"
        sx={{
          flexGrow: 2,
          width: "13rem",
        }}
      >
        <Box>
          <Skeleton className="w-96 h-16" />
          <Skeleton
            sx={{
              width: "40rem",
            }}
          />
        </Box>
        <Box className="flex gap-5 flex-wrap">
          <Skeleton className="w-20" />
          <Skeleton className="w-20 px-8 py-4" />
        </Box>
        <Box className="ml-12 mt-4">
          <Skeleton width={90} height={60} />
        </Box>
      </Box>
    </Box>
  );
};
