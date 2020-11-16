export default getImage = async (imageName) => {
  const imageUrl = await storage().ref(imageName).getDownloadURL();
  return imageUrl;
};
