import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { DeletePhoto } from "./App/Main/DeletePhoto";
import { ChangeAlbum } from "./App/Main/ChangeToAlbum";
import { DownloadPhoto } from "./Buttons/DownloadPhoto";

export const MenuDots = ({ PhotoId, photoUrl }) => {

  return (
    <Menu>
      <MenuButton textColor={"white"}>
        <i className="bi bi-three-dots-vertical"></i>
      </MenuButton>
      <MenuList>
        <DeletePhoto PhotoId={PhotoId} />
        <ChangeAlbum PhotoId={PhotoId} />
       <DownloadPhoto photoUrl={photoUrl} />
      </MenuList>
    </Menu>
  );
};
