const fs = require("fs");
const { open } = require('node:fs/promises');
const path = require("path");
const LoggerService = require("../service/logger/logger.service");

function getAbsolutePath(relativePath) {
  return path.resolve(
    __dirname,
    "..",
    "..",
    "public",
    relativePath.replace("/", "")
  );
}

function loadFile(relativePath, loadedResourceResolver) {
  const absolutePath = getAbsolutePath(relativePath);
  LoggerService.debug("Reading file from filesystem: " + absolutePath);
  return fs.readFile(absolutePath, (error, data) => {
    if (error) {
      return setImmediate(() => loadedResourceResolver(relativePath, null));
    }

    return setImmediate(() => loadedResourceResolver(relativePath, data));
  });
}

function loadFileStream(relativePath, loadedResourceResolver) {
  const absolutePath = getAbsolutePath(relativePath);
  LoggerService.debug("Loading file stream: " + absolutePath);

  fs.open(absolutePath, (error, fd) => {
    console.log(fd)
    return error
      ? setImmediate(() => loadedResourceResolver(relativePath, null))
      : setImmediate(() =>
          loadedResourceResolver(relativePath, fd.createReadStream())
        );
  });
}

module.exports = { loadFile, loadFileStream };
