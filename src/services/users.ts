import { db } from '../../database/firebase';
import { User } from '../models';
// import { Event } from '../models';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import {ROLES as USER_TYPE } from '../shared/enum';
import { Vendor } from '../models/vendor';
import { Guest } from '../models/guest';

/*****************USER QUERRY ****************/


export const getUsersQuery = async () => {
  const users = collection(db, 'users');
  const usersSnapshot = await getDocs(users);
  const usersList: User[] = [];
  usersSnapshot.forEach((doc) => {
    const user = doc.data() as User;
    if (!user.deleted) usersList.push(user);
  });
  return usersList;
};

export const createUserQuery = async (user: User,serviceType: string | undefined) => {
  const docRef = await addDoc(collection(db, 'users'), user);
  await updateDoc(docRef, { id: docRef.id });
  let entityObj= {};
  let entitydocRef = null;
  const typeOfUser: USER_TYPE = user.role;
  if (typeOfUser === USER_TYPE.ORGANIZER) {
    entityObj = {...user,
      uid: docRef.id
    } as User
    entitydocRef = await addDoc(collection(db, 'organizers'), entityObj);
    await updateDoc(entitydocRef, { id: entitydocRef.id });
  }
  else if(typeOfUser === USER_TYPE.VENDOR) {
    entityObj = {
      uid: docRef.id,
      contact: user.phone || user.email,
      name: user.name,
      serviceType: serviceType,
    } as Vendor;
    entitydocRef = await addDoc(collection(db, 'vendors'), entityObj);
    await updateDoc(entitydocRef, { id: entitydocRef.id });
  }
  else {
    entityObj = {
      uid: docRef.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    } as Guest;
    entitydocRef = await addDoc(collection(db, 'guests'), entityObj);
    await updateDoc(docRef, { id: entitydocRef.id });
  }
  return docRef.id;
};

export const createGuestQuery = async (user: User) => {
  const docRef = await addDoc(collection(db, 'users'), user);
  await updateDoc(docRef, { id: docRef.id });
  const entityObj = {
    uid: docRef.id,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
  } as Guest;
  const entitydocRef = await addDoc(collection(db, 'guests'), entityObj);
  await updateDoc(entitydocRef, { id: entitydocRef.id });
  return entitydocRef.id;
};

export const getUserWithIdQuery = async (id: string): Promise<User | null> => {
  const userSnapshot = await getDoc(doc(db, 'users', id));
  if (!userSnapshot.exists()) return null;
  const user = userSnapshot.data() as User;
  if (user.deleted) return null;
  return user;
};

export const updateUserQuery = async (
  id: string,
  data: object
): Promise<User | null> => {
  const userDoc = doc(db, 'users', id);
  await updateDoc(userDoc, data);
  const updatedUser = await getDoc(userDoc);
  if (!updatedUser.exists()) return null;
  return updatedUser.data() as User;
};

export const deleteUserQuery = async (id: string) => {
  const data = { deleted: true };
  await updateUserQuery(id, data);
};

export const getUserByEmailorPhoneQuery = async (email: string | undefined, phone: string | undefined): Promise<User | null> => {
  const users = collection(db, 'users');
  const usersSnapshot = await getDocs(users);
  let user: User | null = null;
  usersSnapshot.forEach((doc) => {
    const userDoc = doc.data() as User;
    if (userDoc.email && userDoc.email === email){
      user = userDoc;
    }
    else if(userDoc.phone && userDoc.phone === phone){
      user = userDoc;
    }
  });
  return user;
};

export const getUserIdByOrganizerIdQuery = async (id: string): Promise<string | null> => {
  const organizer = await getDoc(doc(db, 'organizers', id));
  if (!organizer.exists()) return null;
  return organizer.data().uid;
}