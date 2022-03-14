import { AiFillHome, AiFillFileAdd } from "react-icons/ai";
import { IoStorefront } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
const items = [
  {
    text: "Home",
    icon: (
      <AiFillHome
        style={{ width: "1.5rem", height: "1.5rem", color: "black" }}
      />
    ),
    path: "/",
  },
  {
    text: "New Invoice",
    icon: (
      <AiFillFileAdd
        style={{ width: "1.5rem", height: "1.5rem", color: "black" }}
      />
    ),
    path: "/invoices/new",
  },
  {
    text: "Products",
    icon: (
      <IoStorefront
        style={{ width: "1.5rem", height: "1.5rem", color: "black" }}
      />
    ),
    path: "/products",
  },
  {
    text: "Customers",
    icon: (
      <BsPeopleFill
        style={{ width: "1.5rem", height: "1.5rem", color: "black" }}
      />
    ),
    path: "/customers",
  },
];

export default items;
