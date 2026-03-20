import {
  FaLaptop,
  FaTv,
  FaHeadphones,
  FaCamera,
  FaKeyboard,
  FaMouse,
  FaSpeakerDeck,
  FaWifi,
  FaToolbox,
} from "react-icons/fa";
import { FaMobileScreen, FaTabletScreenButton } from "react-icons/fa6";

import { IoWatchOutline } from "react-icons/io5";

export const categories = [
  { name: "Mobile", icon: <FaMobileScreen /> },
  { name: "Laptop", icon: <FaLaptop /> },
  { name: "Smart Watch", icon: <IoWatchOutline /> },
  { name: "Monitor", icon: <FaTv /> },
  { name: "Headphone", icon: <FaHeadphones /> },
  { name: "Tablet", icon: <FaTabletScreenButton /> },
  { name: "Camera", icon: <FaCamera /> },
  { name: "Keyboard", icon: <FaKeyboard /> },
  { name: "Mouse", icon: <FaMouse /> },
  { name: "Speaker", icon: <FaSpeakerDeck /> },
  { name: "Router", icon: <FaWifi /> },
  { name: "Accessory", icon: <FaToolbox /> },
];
