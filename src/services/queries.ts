import { db } from '../../database/firebase';
import { User } from '../models';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';

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

export const createUserQuery = async (user: User) => {
  const docRef = await addDoc(collection(db, 'users'), user);
  updateUserQuery(docRef.id, { uid: docRef.id });
  return docRef.id;
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
