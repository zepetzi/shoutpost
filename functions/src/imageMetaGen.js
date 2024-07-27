const { onObjectFinalized } = require("firebase-functions/v2/storage");
const { app, fsdb, imgStorage } = require("./firebase-admin");
const { v4: uuid } = require('uuid'); 
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const { doc, setDoc } = require("firebase/firestore"); 

exports.imagemetagen = onCall((request) => {

    try {
    
        const { uploadedBy, imageName, thumbName, imageWidth, imageHeight } = request.data;
        if (!uploadedBy || !imageName || !thumbName || !imageWidth || !imageHeight) {
            throw new HttpsError('invalid metadata', 'one or more fields are invalid')
        }

        setDoc(doc(fsdb, "images", imageName), {
            user_id: uploadedBy,
            image_name: imageName,
            thumb_name: thumbName,
            width: imageWidth,
            height: imageHeight,
        })

        return {
            status: 'success',
            message: 'img metadata created and uploaded successfully'
            };

    } catch(error) {

        console.error('Error in metadata upload:', error);
        if (error instanceof HttpsError) {
            throw error;
        } else {
            throw new HttpsError('internal', 'image metadata generation failed', { originalError: error.message });
        }
    }

});

module.exports = { imagemetagen };
