export async function generateBase64(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    if (!file?.name.match(/\.(jpe?g|png|webp|avif|bmp)$/i))
      reject(
        "Please, choose an image! With the next extensions: jpg, png, webp, avif"
      );
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(file);
  });
}
