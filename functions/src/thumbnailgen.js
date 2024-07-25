// const { app, fsdb, imgStorage, imgStorageRef, thumbStorage, thumbStorageRef, pfpStorage, pfpStorageRef, logger, path, onObjectFinalized, sharp } = require("./firebase-admin");
// const { getStream } = require('firebase-admin/storage')
// const { onCall, HttpsError } = require("firebase-functions/v2/https");

// exports.thumbnailgen = onCall(async(request) => {

//     const mainImageRef = request.data.imageRef;
//     const fullThumbName = request.data.fullthumbName;
    
//     imageStream = getStream(mainImageRef);

//     //use sharp to resize and make thumbnail
//     const createdThumb = await sharp(imageStream).resize(200,200, {fit: 'outside'}).toBuffer();

//     //takes that same image and its ref to make a thumbnail in the thumb bucket
//     const uploadedThumbRef = ref(thumbStorage, fullThumbName);

//     //upload thumbnail
//     await uploadBytes(uploadedThumbRef, createdThumb);
//     console.log(`thumb uploaded! file#: ${fullThumbName}`);

//     return uploadedThumbRef;

// });
