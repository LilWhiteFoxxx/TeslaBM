'use strict';

const { bucket } = require('../configs/firebase.config');

class FirebaseService {
  static uploadFile = async (file, folder = 'ImageApp') => {
    return new Promise((resolve, reject) => {
      const filePath = folder ? `${folder}/${file.originalname}` : file.originalname;
      const blob = bucket.file(filePath);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', async () => {
        try {
          // Make the file public (optional, depends on your needs)
          await blob.makePublic();

          // Get the download URL
          const [url] = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2491', // Adjust the expiration date as needed
          });

          resolve(url);
        } catch (error) {
          reject(error);
        }
      });

      blobStream.end(file.buffer);
    });
  }

  // Method to get download URL of an existing file
  static getFileDownloadUrl = async (filePath) => {
    try {
      const file = bucket.file(filePath);
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491', // Adjust the expiration date as needed
      });
      return url;
    } catch (error) {
      throw new Error('Error getting download URL: ' + error.message);
    }
  }

  static uploadFiles = async (files, folder = 'ImageApp') => {
    if (!files) {
      throw new Error('Files parameter must not be null or undefined.');
    }
    if (!Array.isArray(files)) {
      files = [files];
    }
    const uploadPromises = files.map(file => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }
}

module.exports = FirebaseService;
