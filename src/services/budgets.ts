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
import { Vendor } from '../models/vendor';


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
    const budgets=budgetSnapshot.docs.map(doc => doc.data() as Budget);
    const budgetsWithVendors = await Promise.all(budgets.map(async budget => {
        const vendorDoc = await getDoc(doc(db, 'vendors', budget.vendorId));
        const vendorData = vendorDoc.exists() ? vendorDoc.data() as Vendor : null;
        return { ...budget, vendor: vendorData };
    }));
    return budgetsWithVendors;
}