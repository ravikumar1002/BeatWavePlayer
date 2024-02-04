
import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";


export const useSearchBar = () => {
    const [searchString, setSearchString] = useState<string>("");
    const [showSearchSuggestion, setShowSearchSuggestion] = useState<boolean>(false);
    const searchSuggestionRef = useRef(null);
    // const searchResultLimit = 5;

    const showSuggestionFn = (searchLength: number) => {
        if (searchLength > 0) {
            setShowSearchSuggestion(true);
        } else {
            setShowSearchSuggestion(false);
        }
    };

    const handleClickOutside = (searchSuggestionRef: RefObject<HTMLElement>, setShowSearchSuggestion: (show: boolean) => void) => (event: MouseEvent<Document>) => {
        if (searchSuggestionRef.current && !searchSuggestionRef.current.contains(event.target as Node)) {
            setShowSearchSuggestion(false);
        }
    };


    useEffect(() => {
        document.addEventListener("click", () => handleClickOutside(searchSuggestionRef, setShowSearchSuggestion), true);
        return () => {
            document.removeEventListener("click", () => handleClickOutside(searchSuggestionRef, setShowSearchSuggestion), true);
        };
    }, []);

    return {
        searchSuggestionRef, showSuggestionFn, handleClickOutside, searchString, setSearchString, showSearchSuggestion, setShowSearchSuggestion
    }
}