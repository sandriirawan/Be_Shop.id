const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
  })
  
  // const upload = multer({ storage: storage })

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PNG and JPEG files are allowed.'));
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    filefilter: fileFilter,
  });
  

  

  module.exports = upload