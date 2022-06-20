export const isJSON = (str: string) => {
  console.log("String", str);
  try {
    const json = JSON.parse(str);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
