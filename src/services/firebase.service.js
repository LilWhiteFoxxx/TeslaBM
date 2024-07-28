'use strict';

const { bucket } = require('../configs/firebase.config');

class FirebaseService {
  // Upload a single file
  static async uploadFile(file, folder = 'ImageApp') {
    const filePath = `${folder}/${file.originalname}`;
    const blob = bucket.file(filePath);

    try {
      await new Promise((resolve, reject) => {
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        blobStream.on('error', reject);
        blobStream.on('finish', resolve);
        blobStream.end(file.buffer);
      });

      // Make the file public
      await blob.makePublic();

      // Construct the public URL
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`;

      return url;
    } catch (error) {
      throw new Error('Error uploading file: ' + error.message);
    }
  }

  // Get download URL of an existing file
  static async getFileDownloadUrl(filePath) {
    try {
      // Construct the public URL
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`;
      return url;
    } catch (error) {
      throw new Error('Error getting download URL: ' + error.message);
    }
  }

  // Upload multiple files
  static async uploadFiles(files, folder = 'ImageApp') {
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
