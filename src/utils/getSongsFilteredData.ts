import { getReleaseYearValue } from "@hooks/getReleaseYearValue";

//@ts-expect-error mujhe nhi pta
export const getSongsFilteredData = (valueArray) => {
    //@ts-expect-error mujhe nhi pta
    const valueFilter = valueArray.map((details) => {
        const imageUrl = details.images ? details?.images[0]?.url : details?.album.images[0]?.url;
        //@ts-expect-error mujhe nhi pta
        const artists = details.artists ? details.artists.map((item) => item.name) : [details?.type];
        const release_year = details.album
            ? getReleaseYearValue(details.album.release_date)
            : details.release_date
                ? getReleaseYearValue(details.release_date)
                : "";
        const albumName = details.album ? details.album.name : "";
        const previewUrl = "";

        const filterdDeatils = {
            title: details?.name,
            id: details.id,
            artists,
            release_year,
            albumName,
            image: imageUrl ? imageUrl : "",
            ...(previewUrl ? { previewUrl } : {}),
        };

        return filterdDeatils;
    });

    return valueFilter;
};