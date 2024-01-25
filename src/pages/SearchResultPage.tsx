
import { useSearchParams } from "react-router-dom";

export const SearchResultPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get("q")
    console.log(searchString)

    return (
        <div>
            <h1>THis is a search page</h1>
        </div>
    )
}