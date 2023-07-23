import ImageKit from "imagekit";

export let imagekit = new ImageKit({
    publicKey: "public_v6o7kSg2pAS53Q22IVfi4Ualinw=",
    privateKey : process.env.IK_API_KEY,
    urlEndpoint: "https://ik.imagekit.io/adk19eqc"
})