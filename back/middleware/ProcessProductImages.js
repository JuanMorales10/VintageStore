const multer = require('multer');
const path = require('path');
const sharp = require('sharp')

const helperImage = (filePath, filename ,size = 300 ) =>{
    return sharp(filePath)
    .resize(size)
    .toFile(`../public/img/products/${filename}.avif`)
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/products'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'product-' + Date.now() + path.extname(file.originalname); // Cambié 'service' por 'product' para que tenga más sentido
        cb(null, newFileName);
    }
});

// Crear una instancia de multer
const upload = multer({ storage: storage });

// Exportar el middleware configurado para manejar múltiples archivos
const ProductImages = upload.array('imagen');  // Asegúrate de que 'imagen' sea el nombre del campo de entrada en el formulario

module.exports = ProductImages;
