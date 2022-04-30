const AUTH = require('../../Auth.js');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3 ({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  };

  return s3.upload(uploadParams).promise();
};

const downloadImage = (key) => {
  const downloadParams = {
    Key: key,
    Bucket: bucketName
  };

  return s3.getObject(downloadParams).createReadStream();
};

exports.uploadFile = uploadFile;
exports.downloadImage = downloadImage;