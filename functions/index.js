
const { thumbnailgen } = require('./src/thumbnailgen');
const { imagemetagen } = require('./src/imagemetagen');
const { canvasgen } = require('./src/canvasgen');
const { postgen } = require('./src/postgen');

module.exports = {
    thumbnailgen,
    imagemetagen,
    canvasgen,
    postgen 
};



// const { onCall, HttpsError } = require('firebase-functions/v2/https');
// const  sharp  = require('sharp');

// const { imgStorage } = require('./src/firebase-admin');

// const serviceAccount = require('./admin/shoutpost-17849-firebase-adminsdk-kbykf-f670f20f82.json');
// // const app = admin.initializeApp({
// //     credential: cert(serviceAccount),
// //     storageBucket: 'shoutpost-17849.appspot.com'
// // });

// exports.thumbnailgen = onCall(async(request) => {

//     try {
        
//         //get data from incoming request parameter
//         const { thumbName, imageName } = request.data;

//         //get image reference to original image
//         const uploadedImgRef = imgStorage.bucket().file(imageName);
        
//         //download the file
//         //get the first index which is a buffered version of the file
//         const [bufferedImg] = await uploadedImgRef.download();

//         console.log("Downloaded image: ", imageName)

//         //use sharp to get metadata
//         const metadata = await sharp(bufferedImg).metadata();

//         console.log("Retrieved metadata: ", metadata)

//         //and then resize and make thumbnail
//         const createdThumb = await sharp(bufferedImg).resize(200,200, {fit: 'outside'}).toBuffer();
        
//         console.log("Thumbnail created.")

//         //get reference the thumb bucket
//         const thumbStorage = imgStorage.bucket('post_thumbs')    
        
//         //upload thumbnail
//         await thumbStorage.file(thumbName).save(createdThumb)

//         console.log("Thumbnail uploaded.")

//         return { message: 'Thumbnail created and uploaded successfully' };
    
//     } catch (error) {
//         console.error('Error in thumbnail generation:', error);
//         throw new HttpsError(error.message);
//     }
    

// });

