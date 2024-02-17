import { SearchResultDTO } from "@dto/searchResultDTO";
import { spotifySearchApi } from "@hooks/spotifySearchApi";
import useDebounce from "@hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, MouseEvent, RefObject, useEffect, useRef, useState } from "react";

export const useSearchBar = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [showSearchSuggestion, setShowSearchSuggestion] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState(false);
  const [suggestionSearchList, setSuggestionSearchList] = useState<SearchResultDTO | null>(null);

  // const searchResultLimit = 5;

  const debouncedSearchTerm = useDebounce(searchString, 200);

  const f = async () => {
    const data = await spotifySearchApi(debouncedSearchTerm, 5);
    if (data) {
      //@ts-expect-error mujhe nhi pta
      setSuggestionSearchList(data);
    }
    return data;
  };

  // const suggestionSearchListQuery = useQuery({
  //   queryKey: ["search-suggestion"],
  //   queryFn: async () => {
  //     const albumsData = await spotifySearchApi(debouncedSearchTerm, 20);
  //     return albumsData;
  //   },
  //   // refetchOnWindowFocus: false,
  // });

  useEffect(() => {
    if (isFocused) {
      f();
    }
  }, [debouncedSearchTerm]);

  const showSuggestionFn = (searchLength: number) => {
    if (searchLength > 0) {
      setShowSearchSuggestion(true);
    } else {
      setShowSearchSuggestion(false);
    }
  };

  const onSeacrchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(e.target.value);
  };

  const onSearchInputFocus = () => {
    setIsFocused(true);
  };

  const onSeacrchInputBlur = () => {
    setIsFocused(false);
  };

  return {
    showSuggestionFn,
    searchString,
    setSearchString,
    showSearchSuggestion,
    setShowSearchSuggestion,
    onSeacrchChange,
    onSearchInputFocus,
    onSeacrchInputBlur,
    isFocused,
    // suggestionSearchListQuery,
    setIsFocused,
    suggestionSearchList,
  };
};
