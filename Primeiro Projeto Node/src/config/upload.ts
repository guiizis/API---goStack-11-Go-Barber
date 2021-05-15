import multer from 'multer'
import path from 'path'
import cryptos from 'crypto'

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "tmp"),
    filename(request, file, callback) {
      const fileHash = cryptos.randomBytes(10).toString('hex')
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    }
  })

}
