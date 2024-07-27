const { onCall, HttpsError } = require('firebase-functions/v2/https');
const  sharp  = require('sharp');

const { imgStorage } = require('./firebase-admin');


const THUMBNAIL_SIZE = { width: 200, height: 200 };
const THUMB_BUCKET_NAME = 'post_thumbs';

const thumbnailgen = onCall(async(request) => {

    try {
        
        //get data from incoming request parameter
        const { thumbName, imageName } = request.data;

        if ( !thumbName || !imageName ) {
            throw new HttpsError('invalid argument(s)', 'cloud function: thumbnailgen, must be called with a thumbname and imagename argument')
        } else if ( typeof thumbName !== 'string' || typeof imageName !== 'string' ) {
            throw new HttpsError('invalid argument(s)', 'cloud function: thumbnailgen, must be called with string arguments in the requesta.data object')
        }

        //get image reference to original image
        const uploadedImgRef = imgStorage.bucket().file(imageName);
        
        //download the file
        //get the first index which is a buffered version of the file
        const [bufferedImg] = await uploadedImgRef.download();

        console.log("Downloaded image");

        //use sharp to get metadata
        const metadata = await sharp(bufferedImg).metadata();

        console.log("Retrieved metadata");

        //and then resize and make thumbnail
        const createdThumb = await sharp(bufferedImg)
            .resize(THUMBNAIL_SIZE.width, THUMBNAIL_SIZE.height, {fit: 'outside'})
            .toBuffer();
        console.log("Thumbnail created.");

        //get reference the thumb bucket
        const thumbStorage = imgStorage.bucket(THUMB_BUCKET_NAME);    
        
        //upload thumbnail
        await thumbStorage.file(thumbName).save(createdThumb);

        console.log("Thumbnail uploaded.")

        return {
            status: 'success',
            message: 'Thumbnail created and uploaded successfully',
            data: {
                width: metadata.width,
                height: metadata.height
            }
            }
    
    } catch (error) {

        console.error('Error in thumbnail generation:', error);
        if (error instanceof HttpsError) {
            throw error; // If it's already an HttpsError, nothing more needs to be done, so just re-throw it.
        } else {
            throw new HttpsError('internal', 'Thumbnail generation failed', error); // If it's not, wrap it in an HttpsError to standardize it.
        }
    }

});

module.exports = { thumbnailgen };
