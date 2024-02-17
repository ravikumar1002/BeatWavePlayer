import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClearFilterChip, FilterChip } from "./FilterChips";

// const CATEGORIES_FILTER = {
//   ARTISTS: "Artists",
//   TRACKS: "Tracks",
//   ALBUMS: "Albums",
//   PLAYLISTS: "Playlists",
// };

export const SearchFilterTabs = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();
  const categories = ["artists", "tracks", "albums", "playlists"];

  const deleteSelectedCategory = () => {
    setActiveCategory("");
    const param = searchParams.get("category");
    if (param) {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };

  const selectCategory = (category: string) => {
    // setActiveCategory(category);
    // const qParam = searchParams.get("q");
    // if (qParam && category) {
    //   setSearchParams({ q: qParam, category: category });
    // }
    searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    deleteSelectedCategory();
  }, [searchParams.get("q")]);

  return (
    <Box sx={{ paddingBottom: "1rem", width: "100%", paddingTop: "1rem" }}>
      <Box className="flex gap-3 w-full items-center justify-center">
        {categories.map((category, i) => {
          if (category === selectedCategory) {
            return (
              <ClearFilterChip
                key={i}
                label={`${category
                  .split("")
                  .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
                  .join("")}`}
                variant="filled"
                onDelete={() => {
                  deleteSelectedCategory();
                }}
              />
            );
          } else {
            return (
              <FilterChip
                key={i}
                label={`${category
                  .split("")
                  .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
                  .join("")}`}
                onClick={() => {
                  selectCategory(category);
                }}
              />
            );
          }
        })}
      </Box>
    </Box>
  );
};
