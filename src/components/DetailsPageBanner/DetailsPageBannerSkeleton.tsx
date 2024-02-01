import { Box, Skeleton } from "@mui/material";

export const DetailsPageBannerSkeleton = () => {
  return (
    <Box className="flex items-center w-full">
      <Box
        sx={{
          width: "20rem",
          height: "25rem",
          padding: "1rem 2rem",
        }}
      >
        <Skeleton
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          flexGrow: 2,
          width: "13rem",
        }}
      >
        <Box>
          <Skeleton
            sx={{
              width: "25rem",
              height: "4rem",
            }}
          />
          <Skeleton
            sx={{
              width: "40rem",
            }}
          />
        </Box>
        <Box className="flex gap-5 flex-wrap">
          <Skeleton
            sx={{
              width: "5rem",
            }}
          />
          <Skeleton
            sx={{
              width: "5rem",
              padding: "1rem 2rem",
            }}
          />
        </Box>
        <Box className="ml-12 mt-4">
          <Skeleton width={90} height={60} />
        </Box>
      </Box>
    </Box>
  );
};
