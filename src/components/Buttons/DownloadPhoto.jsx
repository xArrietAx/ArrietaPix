import { MenuItem } from '@chakra-ui/react'
import axios from "axios";

export const DownloadPhoto = ({photoUrl}) => {

    let file = `https://ik.imagekit.io/adk19eqcy/${photoUrl}`
       
        const handleDownload = () => {
          axios({
            url: file,
            method: "GET",
            responseType: "blob",
          })
            .then((response) => {
             
              const url = window.URL.createObjectURL(new Blob([response.data]));
      
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", `${photoUrl}.jpg`);
      
              document.body.appendChild(link);
              link.click();
      
              window.URL.revokeObjectURL(url);
              document.body.removeChild(link);
            })
            .catch((error) => console.error("Error al descargar la imagen:", error));
        };

  return (
      <MenuItem fontSize={{base:"sm", sm:"md"}} onClick={handleDownload}>Download</MenuItem>
  )
}
