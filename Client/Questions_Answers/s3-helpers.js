const AUTH = require('../../Auth.js');
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = AUTH.AWS_BUCKET_NAME;
const region = AUTH.AWS_BUCKET_REGION;
const accessKeyId = AUTH.AWS_ACCESS_KEY;
const secretAccessKey = AUTH.AWS_SECRET_KEY;

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

exports.uploadFile = uploadFile;