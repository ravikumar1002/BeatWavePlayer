import { Box, Tab, Tabs, tabScrollButtonClasses, tabsClasses } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchFilterTabs = () => {
  const [value, setValue] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const categories = ["Artists", "Tracks", "Albums", "Playlists"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const filterSelected = searchParams.get("filterType");
  console.log(filterSelected, "filterSelected");

  return (
    <Box sx={{ paddingBottom: "1rem", width: "100%", color: "purple" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="categories"
        sx={{
          color: "purple",
          [`& .${tabsClasses.scroller}`]: {
            // marginLeft: {
            //   xs: "0",
            //   sm: "-40px",
            // },
            marginRight: {
              xs: "0",
              sm: "-40px",
            },
          },
          [`& .${tabsClasses.scrollButtons}`]: {
            backgroundColor: "purple",
            [`&:not(.${tabScrollButtonClasses.disabled})`]: {
              zIndex: 10,
              backgroundColor: "purple",
              opacity: "1",
            },
          },
        }}
      >
        <Tab
          label="All"
          sx={{
            color: "purple",
            padding: "0.5rem",
            fontWeight: "600",
          }}
          onClick={() => {
            setSearchParams({ filterType: "All" });
          }}
        />
        {categories.map((categroy, i) => {
          return (
            <Tab
              key={i}
              label={`${categroy}`}
              sx={{
                padding: "0.5rem",
                fontWeight: "600",
              }}
              onClick={(e) => {
                setSearchParams({ filterType: categroy });
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
