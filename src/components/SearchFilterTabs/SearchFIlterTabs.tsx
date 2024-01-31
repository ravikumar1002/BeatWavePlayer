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
      <Box className="flex gap-7 w-full items-center justify-center">
        {activeCategory && (
          <ClearFilterChip
            variant="filled"
            styleString="order-first"
            onDelete={() => {
              deleteSelectedCategory();
            }}
          />
        )}
        {categories.map((category, i) => {
          if (category === activeCategory) {
            return (
              <FilterChip
                key={i}
                label={`${category}`}
                variant="filled"
                onClick={() => {
                  selectedCategory(category);
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
