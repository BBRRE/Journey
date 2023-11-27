import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"
import { storage } from './firebase'



export async function uploadImages(images, uid, projectName, overview){
    //allows multiple files to be sent
    for(let i = 0; i < images.length; i++){
        let bucket = `/JourneyImages/${uid}/${projectName}/${overview}/${images[i].name}`
        const imageRef = ref(storage, bucket)
        const result = await uploadBytes(imageRef, images[i]).then(console.log('success')).catch((err) => {
            console.log(err)
        })
    }
}

export async function retrieveImages(bucket) {
    const res = await listAll(ref(storage, bucket));
    return Promise.all(res.items.map(element => getDownloadURL(ref(storage, element.fullPath)))); }