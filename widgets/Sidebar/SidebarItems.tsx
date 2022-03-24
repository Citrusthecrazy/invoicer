import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
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
      <FaFileInvoice
        style={{ width: "1.5rem", height: "1.5rem", color: "black" }}
      />
    ),
    path: "/invoices",
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
