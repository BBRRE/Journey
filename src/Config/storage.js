import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"
import { storage } from './firebase'
import ImageCompressor from "image-compressor.js"
import imageConversion  from 'image-conversion'


export async function uploadImages(images, uid, projectName, overview){
    //allows multiple files to be sent
    for(let i = 0; i < images.length; i++){
        let bucket = `/JourneyImages/${uid}/${projectName}/${overview}/${images[i].name}`
        const imageRef = ref(storage, bucket)
        const compressor = new ImageCompressor();
        const newImage = await compressor.compress(images[i], { quality: 0.8 });
        await uploadBytes(imageRef, newImage).then(console.log('success')).catch((err) => {
            console.error(err)
        })
    }
}

export async function retrieveImages(bucket) {
    const res = await listAll(ref(storage, bucket));
    return Promise.all(res.items.map(element => getDownloadURL(ref(storage, element.fullPath)))); }