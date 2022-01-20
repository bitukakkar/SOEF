export default function validateIsSvgFile(imageFile) {
  if (
    imageFile &&
    imageFile?.$$typeof &&
    imageFile?.render?.name === "SvgData"
  ) {
    return true;
  }

  return false;
}
