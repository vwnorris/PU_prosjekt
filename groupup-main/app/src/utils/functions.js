import db from "./firebase";
import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  getDocFromCache,
  where,
  query,
  arrayUnion,
} from "firebase/firestore";
import { Group, groupConverter } from "../models/Group";

/**
 * Finds a user from an array based on firstname
 * @param {*} arr Array with users from db
 * @param {*} name as String
 * @returns the user object (json string)
 */
export const findUser = (arr, name) => {
  return arr.filter((user) => user.firstname === name)[0];
};

/**
 * Fetches user doc from database
 * @returns a promise object
 */
export const fetchUser = async (user) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    return data;
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching user data");
  }
};

export const fetchAllUsers = async () => {
  const usersCollectionRef = collection(db, "users");
  const data = await getDocs(usersCollectionRef);
  let users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return users;
};

/**
 * Fetches all groups from the database
 * @returns all groups in database as a Promise object
 */
export const fetchAllGroups = async () => {
  const groupCollectionRef = collection(db, "groups");
  const data = await getDocs(groupCollectionRef);
  let groups = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return groups;
};

export const addGroupToUser = async (user, groupname) => {
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const userDocs = await getDocs(q);
  const userDocRef = userDocs.docs[0].ref;

  // Get path to new grop
  let path = `groups/${groupname}`;

  // Document reference to group
  let docRef = doc(db, path);

  // Update doc
  await updateDoc(userDocRef, {
    myGroups: arrayUnion(docRef),
  });
};
