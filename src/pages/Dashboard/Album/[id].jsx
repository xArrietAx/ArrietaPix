import Head from "next/head";
import { useContext, useEffect } from "react";
import { DataContext } from "@/Context/DataContext";
import { Authentication } from "@/Database/Auth";
import { Album } from "@/Database/Model/AlbumSchema";
import { verifyToken } from "@/utils/VerifyToken";
import { GetAlbums } from "@/utils/GetAlbums";
import { GetPhotos } from "@/utils/GetPhotos";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { Aside } from "@/components/App/Aside/Aside";
import { Main } from "@/components/App/Main/Main";

let Auth = new Authentication();

export default function TheAlbum({ User }) {
  let { isOpen, onOpen, onClose } = useDisclosure();

  let {
    PhotosList,
    setPhotosList,
    setTotalFiles,
    setAlbumsList,
    setAvatar,
    setUsername,
  } = useContext(DataContext);

  useEffect(() => {
    setUsername(User.username);
    setAvatar(User.avatar);
    setAlbumsList(User.albums);
    setPhotosList(User.Photos);
    setTotalFiles(User.totalFiles);
  }, [User]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Flex w={"100vw"} h={"100vh"}>
        <Aside isOpen={isOpen} onClose={onClose} />
        <Main PhotosList={PhotosList} onOpen={onOpen} />
      </Flex>
    </>
  );
}

export async function getServerSideProps(context) {
  let User;
  try {
    const { SECRET } = context.req.cookies;
    let { id } = context.query;
    const userId = await verifyToken(SECRET);
    const user = await Auth.getUser(userId);

    if (!user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    let albums = await GetAlbums(user.albums, user._id);

    let album = await Album.findById(id);

    let photos = await GetPhotos(album?.photos, user._id);

    User = {
      username: user.username,
      totalFiles: user.photos.length,
      avatar: user.avatar.name || "default-avatar.jpg?updatedAt=1683946210543",
      albums: JSON.parse(JSON.stringify(albums)),
      Photos: JSON.parse(JSON.stringify(photos)),
    };
  } catch (err) {
    console.log(err);
    User = {
      name: "unknown",
      totalFiles: "unknown",
      avatar: "default-avatar.jpg?updatedAt=1683946210543",
      albums: [],
      Photos: [],
    };
  }

  return {
    props: {
      User,
    },
  };
}
