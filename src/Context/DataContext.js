import { createContext, useState } from "react";

export let DataContext = createContext()

export function DataContextProvider({children}) {
    
    const [Username, setUsername] = useState("Unknown") 
    const [Avatar, setAvatar] = useState("")
    const [AlbumsList, setAlbumsList] = useState([])
    const [PhotosList, setPhotosList] = useState([])
    const [TotalFiles, setTotalFiles] = useState(0)

    return (
        <DataContext.Provider value={{
            Username, 
            setUsername,
            Avatar, 
            setAvatar,
            AlbumsList, 
            setAlbumsList,
            PhotosList,
            setPhotosList,
            TotalFiles,
            setTotalFiles
        }}>
            {children}
        </DataContext.Provider>
    )
} 