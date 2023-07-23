export async function generateBase64(file) {
   return new Promise((resolve, reject) => {
        let reader = new FileReader();
        if (!file?.name.match(/\.(jpg|png|webp|avif)$/)) reject("Please, choose an image! With the next extensions: jpg, png, webp, avif")
          reader.addEventListener("load", () => {
            resolve(reader.result);
          });
        reader.readAsDataURL(file);
    })
}


