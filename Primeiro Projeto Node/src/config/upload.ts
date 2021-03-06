import multer from 'multer'
import path from 'path'
import cryptos from 'crypto'

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp")

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "tmp"),
    filename(request, file, callback) {
      const fileHash = cryptos.randomBytes(10).toString('hex')
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    }
  })

}
