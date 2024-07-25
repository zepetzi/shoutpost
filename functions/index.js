const { initializeApp } = require("firebase-admin/app");
const admin = require('firebase-admin');
const app = admin.initializeApp();
const { getStorage, getDownloadURL } = require('firebase-admin/storage')
const { getStream, ref } = require('firebase/storage'); 
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const  sharp  = require('sharp');
const { readFile } = require('node:fs/promises');

// const {Storage} = require('@google-cloud/storage');

// const app = admin.initializeApp();
// const { imgStorageRef, imgStorage, thumbStorage } = require('./src/firebase-admin');

const serviceAccount = require('./admin/shoutpost-17849-firebase-adminsdk-kbykf-f670f20f82.json');
// const { imgStorage } = require('../src/firebase');

// const app = admin.initializeApp({
//     credential: cert(serviceAccount),
//     storageBucket: 'shoutpost-17849.appspot.com'
// });

const imgStorage = getStorage()
// const storage = new Storage();

exports.thumbnailgen = onCall(async(request) => {

    try {
    //get image ref and determined name for thumb
    // const mainImageRef = request.data.imageRef;
    // const fullThumbName = request.data.fullthumbName;
        
        console.log("test -1")
        
        const { thumbName, imagePath, bucketName, imageName } = request.data;
        

        console.log("test 0")
        //reassemble image ref
        // const uploadedImgRef = ref(imgStorage, imageName);
        // const uploadedImgRef = ref(imgStorage, "8cfad8b9-fa2e-47f5-b789-746787082cff.png");
        // const uploadedImgRef = storage.bucket(bucketName).file(imageName);
        // const defBucketRef = getStorage(app);
        // const uploadedImgRef = defBucketRef.file(imageName);


        const uploadedImgRef = imgStorage.bucket().file(imageName);
        
        const imageFile = await uploadedImgRef.download();

        const bufferedImg = imageFile[0];
        // const downloadURL = await getDownloadURL(uploadedImgRef)

        
        // console.log(downloadURL)
        

        
        // console.log(uploadedImgRef)
        console.log("test 1")
        console.log(`${uploadedImgRef} buffered img`);
        console.log(`${imageFile} imgfile`);
        console.log(`${await uploadedImgRef.bucket} - server`);
        console.log(`${await imageName} - server`);
        console.log(`${await uploadedImgRef.fullPath} - server`);
        console.log("test 2")
        console.log("------------------------------------------------------------------------------------------------------")

        // console.log(await uploadedImgRef.fullPath)

        


        

        // //setup an imagestream from the ref
        // const imageStream = getStream(uploadedImgRef);
        // const readStream = uploadedImgRef.createReadStream().on('error', function(err) {console.log("error?")}).on('response', function(response) {console.log("response?")}).on('data', function(chunk) {console.log("chunk?")}).on('end', function() {console.log("end?")})

        // const readStream = uploadedImgRef.createReadStream()
        // .on('error', function(err) {
        //     console.error('Error reading the stream:', err);
        // })
        // .on('response', function(response) {
        //     console.log('Server responded with status code:', response.statusCode);
        //     console.log('Response headers:', response.headers);
        // })
        // .on('data', function(chunk) {
        //     console.log('Received a chunk of data:', chunk.length);
        // })
        // .on('end', function() {
        //     console.log('Readable stream has ended.');
        // });



        console.log("test 3")
            // //use sharp to resize and make thumbnail
        
        const createdThumb = await sharp(bufferedImg).resize(200,200, {fit: 'outside'}).toBuffer();
        
        // await sharp(uploadedImgRef).resize(200,200, {fit: 'outside'})

        // console.log("test 4")
        // //takes that same image and its ref to make a thumbnail in the thumb bucket
        // const uploadedThumbRef = admin.storage().bucket('post_thumbs').file(thumbName);

        // console.log("test 5")
        // //upload thumbnail
        // await uploadBytes(uploadedThumbRef, createdThumb);

        // console.log("test 6")


        
        console.log("test 3")
            // //use sharp to resize and make thumbnail
        console.log("test 4")
        const thumbStorage = await getStorage().bucket('post_thumbs')    
        await thumbStorage.file(thumbName).save(createdThumb)

        // console.log(`thumb uploaded! file#: ${thumbName}`);

        // return uploadedThumbRef;
        // return "hello";
    
    } catch (error) {
        throw new HttpsError(error);
    }

    console.log("test");

    return "hello";
    

});
