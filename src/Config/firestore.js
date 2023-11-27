import { addDoc, collection, doc, getDoc, getDocs, query  } from "firebase/firestore";
import { db } from './firebase'
import { where } from "firebase/firestore";
import { retrieveImages } from "./storage";



//path for fireStore
const JOURNEYDATA = `journeyData`

export async function addJourneyData(uid,location,name,description,price, uuid, username,photoURL){
    //add a document to the collection in db with the path of JOURNEYDATA, with an object
    const myDocRef = addDoc(collection(db,JOURNEYDATA), {uid: uid,
        name: name,
        location: location,
        description: description,
        price: price,
        imageBucket: `/JourneyImages/${uid}/${uuid}/overview`,
        userName: username,
        photoURL: photoURL
    })
         
        return myDocRef 
} 


export async function addActivityData(activityName, description, price, imageBucket , docRef,n){
    
    addDoc(collection(db,`${docRef.path}/acivity`),{
        activityNumber: n,
        activityName: activityName,
        description: description,
        price: price,
        imageBucket: imageBucket
    })
}

//fetch data
export async function getJourney(x){
    const querySnapshot = getDocs(collection(db,x))

    let allData = []

    for(const documentSnapshot of (await querySnapshot).docs){
        const data = documentSnapshot.data()
        allData.push({
            ...data,
            id: documentSnapshot.id,
            imageURL: await retrieveImages(data['imageBucket'])
        })
    }
    return allData

}

export async function getUserJourney(user){
    if(user){
    console.log(user)
    const querya =  query(collection(db,JOURNEYDATA), where('uid', '==', await user))
    const querySnapshot = await getDocs(querya)

    let allData = []

    for(const documentSnapshot of querySnapshot.docs){
        const data = documentSnapshot.data()
        allData.push({
            ...data,
            id: documentSnapshot.id,
            imageURL: await retrieveImages(data['imageBucket'])
        })
    }
    return allData
    }
}

export async function deleteData(x){
    // go to the projects folder and delete it,
    // loop over the project folder then loop over any subfolders and delete all files
   
    //then go to the overview documents file's subcollection activity if it exists
    //loop over those files and delete
    //then delete the overview file
    
}