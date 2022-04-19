const { appUrl } = require("../config");

const getFileUrl = (fileName, type) => {
  let fileUrl = null;
  if (fileName && fileName?.search("http") === -1) {
    fileUrl = `${appUrl}/images/${type}/${fileName}`;
  }
  return fileUrl;
};

module.exports = {
  getFileUrl,
};
