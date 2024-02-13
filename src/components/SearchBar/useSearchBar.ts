import { spotifySearchApi } from "@hooks/spotifySearchApi";
import useDebounce from "@hooks/useDebounce";
import { ChangeEvent, MouseEvent, RefObject, useEffect, useRef, useState } from "react";

export const useSearchBar = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [showSearchSuggestion, setShowSearchSuggestion] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // const searchResultLimit = 5;

  const debouncedSearchTerm = useDebounce(searchString, 2000);

  const f = async () => {
    const data = await spotifySearchApi(debouncedSearchTerm, 20);
    console.log("----", { data });
    return data;
  };

  useEffect(() => {
    console.log("abc", { debouncedSearchTerm });
    f();
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

  // const handleClickOutside = (searchSuggestionRef: RefObject<HTMLElement>, setShowSearchSuggestion: (show: boolean) => void) => (event: MouseEvent<Document>) => {
  //     if (searchSuggestionRef.current && !searchSuggestionRef.current.contains(event.target as Node)) {
  //         setShowSearchSuggestion(false);
  //     }
  // };

  // useEffect(() => {
  //     document.addEventListener("click", () => handleClickOutside(searchSuggestionRef, setShowSearchSuggestion), true);
  //     return () => {
  //         document.removeEventListener("click", () => handleClickOutside(searchSuggestionRef, setShowSearchSuggestion), true);
  //     };
  // }, []);

  return {
    searchInputRef,
    showSuggestionFn,
    searchString,
    setSearchString,
    showSearchSuggestion,
    setShowSearchSuggestion,
    onSeacrchChange,
    onSearchInputFocus,
    onSeacrchInputBlur,
    isFocused,
  };
};
