import { diskStorage } from 'multer';
import { extname } from 'path';

export const UploadImage = {
  storage: diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
      const uniquewSuffix = Date.now() + '_' + Math.round(Math.random() * 139);
      const ext = extname(file.originalname);
      const filename = `${file.originalname}-${uniquewSuffix}${ext}`;
      cb(null, filename);
    },
  }),
};
