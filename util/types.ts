import { DocumentReference } from "firebase/firestore";

export interface Customer {
  address: string;
  city: string;
  companyName: string;
  country: string;
  zip: Number;
  owner: DocumentReference;
}
