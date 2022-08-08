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

export const rowsToJson = (rows) => {
  return rows.reduce((json, row) => {
    const key = Object.keys(row)[0];
    return json + row[key];
  }, "");
};
