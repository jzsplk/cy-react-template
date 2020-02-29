import * as fs from "fs";
import * as path from "path";

export function getFiles(dir: string, ext: string, fileList: string[]) {
  if (!fs.existsSync(dir) && path.basename(dir) === "mochareports") {
    return fileList;
  } else if (!fs.existsSync(dir)) {
    return fileList;
  } else {
    const files = fs.readdirSync(dir);
    files.forEach((file: string) => {
      const filePath = `${dir}/${file}`;
      if (fs.statSync(filePath).isDirectory()) {
        getFiles(filePath, ext, fileList);
      } else if (path.extname(file) === ext) {
        fileList.push(filePath);
      }
    });
    return fileList;
  }
}
