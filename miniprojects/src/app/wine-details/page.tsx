
export default function WineDetails({ searchParams }: {
    searchParams: {
        "wineName": string,
    }
}) {
    
    let wineNameUrl = "http://localhost:3000/api/get-wine" + searchParams.wineName;

}