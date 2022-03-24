import { db } from "../lib/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { Customer } from "./types";

export const getCustomers = async (
  user: User
): Promise<Array<DocumentData> | undefined> => {
  if (!user || !user.email) return;

  const customersRef = collection(db, "Customers");
  const userRef = await getUserRef(user);

  const q = query(customersRef, where("owner", "==", userRef));
  const querySnapshot = await getDocs(q);

  let customers: Array<any> = [];
  querySnapshot.forEach((doc) => {
    const document = {
      id: doc.id,
      ...doc.data(),
    };
    customers = [...customers, document];
  });
  return customers;
};

export const getCustomerById = async (id: string): Promise<DocumentData> => {
  const docRef = doc(db, "Customers", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("Customer doesn't exist");
  }
};

export const getUserRef = async (
  user: User
): Promise<DocumentReference | undefined> => {
  if (!user || !user.email) return;

  const userRef = await doc(db, "Users", user.email);

  return userRef;
};

export const addCustomer = async (customer: Customer) => {
  await addDoc(collection(db, "Customers"), {
    companyName: customer.companyName,
    address: customer.address,
    zip: Number(customer.zip),
    country: customer.country,
    city: customer.city,
    owner: customer.owner,
  });
};
