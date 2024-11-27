import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp  } from "firebase/firestore";
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
import { getAuth } from "firebase/auth";


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
export async function getJourney(collectionName, searchTerm) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const allData = [];

  // Prepare search term for case-insensitive search
  const lowercaseSearchTerm = searchTerm ? searchTerm.toLowerCase() : null;
  const searchFields = ['description', 'name', 'Continent', 'location'];

  for (const docSnap of querySnapshot.docs) {
    const data = docSnap.data();

    // Check if the document matches the search criteria (if a searchTerm is provided)
    const matchesSearch = lowercaseSearchTerm
      ? searchFields.some(field =>
          data[field] && data[field].toLowerCase().includes(lowercaseSearchTerm)
        )
      : true;

    if (matchesSearch) {
      // Fetch the activity subcollection for each post
      const activityCollectionRef = collection(db, collectionName, docSnap.id, 'acivity');
      const activitySnapshot = await getDocs(activityCollectionRef);

      // Calculate totalPrice and numActivities
      let totalPrice = 0;
      let numActivities = 0;

      activitySnapshot.forEach(activityDoc => {
        const activityData = activityDoc.data();
        totalPrice += activityData.price || 0;
        numActivities += 1;
      });

      // Add data including calculated totalPrice and numActivities
      allData.push({
        ...data,
        id: docSnap.id,
        totalPrice,
        numActivities,
        imageURL: await retrieveImages(data['imageBucket']),
      });
    }
  }

  return allData;
}


export async function filteredSearch(filters) {
  
  const {
    minPrice,
    maxPrice,
    continent,
    minActivities,
} = filters;

// Reference to the journeys collection
const journeysRef = collection(db, 'journeyData');

// Create initial query with continent filter if specified
let q = journeysRef;
if (continent) {
    q = query(journeysRef, where('Continent', '==', continent));
}

// Get all matching documents
const querySnapshot = await getDocs(q);
const results = [];

// Process each journey
for (const doc of querySnapshot.docs) {
    const journeyData = doc.data();
    
    // Get activities subcollection for this journey
    const activitiesRef = collection(doc.ref, 'acivity');
    const activitiesSnapshot = await getDocs(activitiesRef);
    const activities = activitiesSnapshot.docs.map(activityDoc => activityDoc.data());

    // Calculate total price and number of activities
    const totalPrice = activities.reduce((sum, activity) => sum + (activity.price || 0), 0);
    const numActivities = activities.length;
    // Apply filters
    if (
        totalPrice >= minPrice &&
        totalPrice <= maxPrice &&
        numActivities >= minActivities
    ) {
        results.push({
            id: doc.id,
            ...journeyData,
            activities,
            totalPrice,
            numActivities,
            imageURL: await retrieveImages(journeyData['imageBucket'])
        });
    }
}

return results;
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

export async function checkIfUserLikedPost(journeyId, userEmail) {
  try {
    const likeDoc = doc(db, "users", userEmail, "likes", journeyId);
    const likeSnapshot = await getDoc(likeDoc);
    return likeSnapshot.exists();
  } catch (error) { 
    console.error("Error checking like status:", error);
    return false;
  }
}

// Add like to user's likes collection
export async function addLikeToUser(journeyId, docId,  username, userEmail) {
  try {
    const userLikesRef = doc(db, "users", userEmail, "likes", journeyId);
    await setDoc(userLikesRef, {
      journeyId,
      docId,
      username,
      likedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error adding like:", error);
    throw error;
  }
}

// Remove like from user's likes collection
export async function removeLikeFromUser(journeyId, userEmail) {
  try {
    const likeDoc = doc(db, "users", userEmail, "likes", journeyId);
    await deleteDoc(likeDoc);
    return true;
  } catch (error) {
    console.error("Error removing like:", error);
    throw error;
  }
}

// Update journey likes count
export async function updateJourneyLikes(id, newLikeCount) {
  try {
    const journeyRef = doc(db, "journeyData", id);
    await updateDoc(journeyRef, {
      likes: newLikeCount
    });
    return true;
  } catch (error) {
    console.error("Error updating journey likes:", error);
    throw error;
  }
}

export async function getLikedPosts( userEmail) {
  try {
    // Array to store the final liked posts
    const likedPosts = [];

    // Reference to the user's likes collection
    const likesCollectionRef = collection(db, 'users', userEmail, 'likes');

    // Get all documents from the likes collection
    const likesSnapshot = await getDocs(likesCollectionRef);

    // If no likes are found, return empty array
    if (likesSnapshot.empty) {
      return [];
    }

    // Get all document IDs from likes collection
    const likedPostIds = likesSnapshot.docs.map(doc => doc.id);

    // Fetch the actual posts from journeydata collection
    const fetchPostPromises = likedPostIds.map(async (postId) => {
      const postRef = doc(db, 'journeydata', postId);
      const postSnap = await getDoc(postRef);
      
      if (postSnap.exists()) {
        return {
          id: postSnap.docId,
          ...postSnap.data()
        };
      }
      return null;
    });

    // Wait for all posts to be fetched
    const posts = await Promise.all(fetchPostPromises);
    console.log(posts, likedPostIds)

    // Filter out any null values (posts that might have been deleted)
    return posts.filter(post => post !== null);

  } catch (error) {
    console.error('Error fetching liked posts:', error);
    throw error;
  }
}