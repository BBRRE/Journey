import { Firestore, addDoc, collection, doc, getDoc, getDocs, query  } from "firebase/firestore";
import { db } from './firebase'
import { where } from "firebase/firestore";
import { retrieveImages } from "./storage";
import { storage } from './firebase'
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"
import { isTemporaryLayout } from "react-md";
import { deleteObject } from "firebase/storage";
import { deleteDoc } from "firebase/firestore";


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
    
    const folderRef = ref(storage, x.imageBucket.replace('/overview', ''))

    //     works, looks bad but it goes to the projects folder iterates over it and gives the names
    //     of the subfodleres overview activity 1 activity 2 ect. Then iteratiee over those for a list of
    //     images that it then deletes. Might be a better way
    try {
         await listAll(folderRef).then((des) => {
            des.prefixes.forEach((folderRef) => {
                listAll(folderRef).then((res) => {
                    res.items.forEach((item) => {
                        deleteObject(item).then(() => {
                            console.log('succesfull')
                          }).catch((error) => {
                        console.error(error)
                          });
                    })
                })
              });
        })

      } catch (error) {
        console.error(`Error deleting files in folder ${folderRef} from storage:`, error);
      }


    //  const subcollections =  collection(db,`journeyData/${x.id}/acivity`)
    //  const docsSnap = await getDocs(subcollections)
    // docsSnap.docs.forEach(async doc => {
    //     await deleteDoc(doc(db,`journeyData/${x.id}/acivity/${doc.id}`))
    // })
    const subcollections = collection(db, `journeyData/${x.id}/acivity`);
    const docsSnap = await getDocs(subcollections);
    
    // Use map to create an array of promises for each delete operation
    const deletePromises = docsSnap.docs.map(async doci => {
        await deleteDoc(doc(db, `journeyData/${x.id}/acivity/${doci.id}`));
    });
    
    // Use Promise.all to wait for all delete operations to complete
    await Promise.all(deletePromises).then(() => {
        console.log('succesfull')
    }).catch((err) => {
        console.error(err)
    })
    
    //delete the overview document
    const lastDoc = doc(db, `journeyData/${x.id}`)
    try{
        deleteDoc(lastDoc)
    }catch(err){
        console.error(err)
    }
    // Continue with the rest of your code after all deletions are complete
    
//     // Loop over subcollections and delete documents
//     subcollections.forEach(async (subcollection) => {
//       const documents = await subcollection.listDocuments();
      
//       documents.forEach(async (document) => {
//         await document.delete();
//         console.log(`Document ${document.id} deleted from subcollection`);
//       });
    // });
}