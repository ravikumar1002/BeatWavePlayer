import { Box } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClearFilterChip, FilterChip } from "./FilterChips";

export const SearchFilterTabs = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();
  const categories = ["Artists", "Tracks", "Albums", "Playlists"];

  const deleteSelectedCategory = () => {
    setActiveCategory("");
    const param = searchParams.get("category");
    if (param) {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };

  const selectedCategory = (category: string) => {
    setActiveCategory(category);
    setSearchParams({ category: category });
  };

  return (
    <Box sx={{ paddingBottom: "1rem", width: "100%", paddingTop: "1rem" }}>
      <Box className="flex gap-3 w-full items-center justify-center">
        {categories.map((category, i) => {
          if (category === activeCategory) {
            return (
              <ClearFilterChip
                key={i}
                label={`${category}`}
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
                label={`${category}`}
                onClick={() => {
                  selectedCategory(category);
                }}
              />
            );
          }
        })}
      </Box>
    </Box>
  );
};
