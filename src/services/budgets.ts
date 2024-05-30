import { db } from '../../database/firebase';
import { Budget } from '../models/budget';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import {ROLES as User_Type} from '../shared/enum/index';
import { query, where } from 'firebase/firestore'; // Import the necessary package


export const createBudgetQuery = async (budget: Budget) => {
    const docRef = await addDoc(collection(db, 'budgets'), budget);
    await updateBudgetQuery(docRef.id, { id: docRef.id });
    return docRef.id;
}

export const updateBudgetQuery = async (
    id: string,
    data: object
): Promise<Budget | null> => {
    const budgetDoc = doc(db, 'budgets', id);
    await updateDoc(budgetDoc, data);
    const updatedBudget = await getDoc(budgetDoc);
    if (!updatedBudget.exists()) return null;
    return updatedBudget.data() as Budget;
}

export const getBudgetByIdQuery = async (id: string): Promise<Budget | null> => {
    const budgetSnapshot = await getDoc(doc(db, 'budgets', id));
    if (!budgetSnapshot.exists()) return null;
    const budget = budgetSnapshot.data() as Budget;
    if (budget.deleted) return null;
    return budget;
}

export const getBudgetsByEventIdQuery = async (eventId: string): Promise<Budget[]> => {
    const budgetCollection = collection(db, 'budgets');
    const budgetQuery = query(budgetCollection, where('eventId', '==', eventId));
    const budgetSnapshot = await getDocs(budgetQuery);
    return budgetSnapshot.docs.map(doc => doc.data() as Budget);
}