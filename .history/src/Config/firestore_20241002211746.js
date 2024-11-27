import { Firestore, addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from './firebase'
import { where } from "firebase/firestore";
import { retrieveImages } from "./storage";
import { storage } from './firebase'
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"
import { isTemporaryLayout } from "react-md";
import { deleteObject } from "firebase/storage";
import { deleteDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";


//path for fireStore
const JOURNEYDATA = `journeyData`

export async function addJourneyData(uid, location, name, description, uuid, email, photoURL, Continent) {
  //add a document to the collection in db with the path of JOURNEYDATA, with an object
  const username = (await getDoc(doc(db, `users/${email}`))).data()

  const myDocRef = await addDoc(collection(db, JOURNEYDATA), {
    uid: uid,
    name: name,
    description: description,
    location: location,
    imageBucket: `/JourneyImages/${uid}/${uuid}/overview`,
    userName: username.username,
    Continent: Continent,
    photoURL: photoURL,
    likes: 0
  })
  return myDocRef
}


export async function addActivityData(activityName, description, price, location, imageBucket, docRef, n) {

  addDoc(collection(db, `${docRef.path}/acivity`), {
    activityNumber: n,
    activityName: activityName,
    description: description,
    price: price,
    location: location,
    imageBucket: imageBucket
  })
}

//fetch data
export async function getJourney(x, filter) {
  const querySnapshot = await getDocs(collection(db, x));
  let allData = [];

  if (filter !== undefined) {
    const lowercaseSearchTerm = filter.toLowerCase();
    const searchFields = ['description', 'name', 'Continent', 'location'];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      const matchesFilter = searchFields.some(field => 
        data[field] && data[field].toLowerCase().includes(lowercaseSearchTerm)
      );

      if (matchesFilter) {
        allData.push({
          ...data,
          id: doc.id,
          imageURL: await retrieveImages(data['imageBucket'])
        });
      }
    }
  } else {
    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      allData.push({
        ...data,
        id: doc.id,
        imageURL: await retrieveImages(data['imageBucket'])
      });
    }
  }

  return allData;
}

export async function getUserJourney(user) {
  console.log(user)
  const querya = query(collection(db, JOURNEYDATA), where('userName', '==', await user))
  const querySnapshot = await getDocs(querya)

  let allData = []

  for (const documentSnapshot of querySnapshot.docs) {
    const data = documentSnapshot.data()
    allData.push({
      ...data,
      id: documentSnapshot.id,
      imageURL: await retrieveImages(data['imageBucket'])
    })
  }
  return allData
}

export async function deleteData(x) {
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
  try {
    deleteDoc(lastDoc)
  } catch (err) {
    console.error(err)
  }
}

export async function CheckIfUserExsits(email) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    return querySnapshot.empty; // Return true if no matching username is found
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw error;
  }
}


export async function GetUserName(email, method) {
  try {
    console.log(email)
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where(method, '==', email));
    const querySnapshot = await getDocs(q);
    const final = querySnapshot.docs[0].data()

    console.log(final)
    return final; // Return array of usernames
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw error;
  }
}

export async function UploadProfile(formdata, user) {

  const docRef = doc(db, 'users', formdata.email); // Construct document reference

  try {
    await setDoc(docRef, {
      email: formdata.email,
      username: formdata.username,
      loaction: formdata.location,
      bio: formdata.bio,
      photoURL: user
    });

    console.log('Profile data uploaded successfully.');
  } catch (error) {
    console.error('Error uploading profile data:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}


export async function IsUsernameAvailable(username) {
  if (username.length < 1) {
    return false; // Reject empty username
  }

  try {
    // Get a reference to the users collection
    const usersRef = collection(db, 'users');

    // Query all documents in the users collection
    const querySnapshot = await getDocs(usersRef);

    // Flag to track username availability
    let isAvailable = true;

    // Iterate over each document in the query snapshot
    querySnapshot.forEach((doc) => {
      // Get the data of the document
      const userData = doc.data();

      // Check if the username matches the provided username
      if (userData.username === username) {
        // Username is already taken
        isAvailable = false;
      }
    });

    // Return the final availability status
    return isAvailable;
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw error; // Throw the error for handling in the calling code
  }
}

export async function updateJourneyLikes(id,newLikeCount){
  try {
    const journeyRef = doc(db, "journeyData", id);

    await updateDoc(journeyRef, {
      likes: newLikeCount
    });

    console.log("Document successfully updated!");
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;}
}