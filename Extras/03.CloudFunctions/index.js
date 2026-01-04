const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

const storage = new Storage();

exports.generateThumbnail = async (event, context) => {
  // Compatibilidad: Cloud Storage moderno puede enviar event o event.data (Base64)
  let data = event;

  // Si viene desde Pub/Sub (Base64)
  if (event.data) {
    const jsonStr = Buffer.from(event.data, 'base64').toString();
    data = JSON.parse(jsonStr);
  }

  const sourceBucketName = data.bucket; // Bucket donde se subió la imagen original
  const fileName = data.name;

  if (!fileName) {
    console.log('No hay nombre de archivo, abortando función.');
    return;
  }

  // Evitar procesar miniaturas ya generadas
  if (fileName.startsWith('thumb_')) return;

  const sourceBucket = storage.bucket(sourceBucketName);
  const file = sourceBucket.file(fileName);
  const tempFilePath = `/tmp/${fileName}`;
  const thumbFileName = `thumb_${fileName}`;

  // Bucket destino para las miniaturas
  const thumbnailBucket = storage.bucket('imagen-miniaturas');

  // Descargar imagen temporalmente
  await file.download({ destination: tempFilePath });

  // Crear miniatura
  await sharp(tempFilePath)
    .resize(100, 100)
    .toFile(`/tmp/${thumbFileName}`);

  // Subir miniatura al bucket de miniaturas
  await thumbnailBucket.upload(`/tmp/${thumbFileName}`, {
    destination: thumbFileName,
  });

  console.log(`Miniatura creada en bucket 'imagen-miniaturas': ${thumbFileName}`);
};
