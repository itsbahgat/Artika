/**
 * @file Manages file uploading using Multer.
 * @module FileUploader
 */

const multer = require('multer');

/**
 * Multer middleware configuration for file uploading.
 * @type {Object}
 * @property {Object} storage - The storage configuration for Multer.
 * @property {Object} limits - The limits configuration for Multer.
 */
module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 50000000 }
});
