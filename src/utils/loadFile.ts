import fs from "fs-extra"
import { Parser } from "xml2js";
const parser = new Parser()

export function readXmlParse(filePath: string, encoding: BufferEncoding) {
  return new Promise((resolve, reject) => {
    console.log(`read file ${filePath}`)
    let file = fs.readFileSync(filePath, encoding)
    parser.parseString(file, (err: any, result: any) => {
      if(err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}