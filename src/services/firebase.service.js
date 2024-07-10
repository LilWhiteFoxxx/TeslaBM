'use strict';

const { bucket } = require('../configs/firebase.config');

class FirebaseService {
  static uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  }

  static uploadFiles = async (files) => {
    if (!files) {
      throw new Error('Files parameter must not be null or undefined.');
    }
    if (!Array.isArray(files)) {
      files = [files];
    }
    const uploadPromises = files.map(file => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }
}

module.exports = FirebaseService;
