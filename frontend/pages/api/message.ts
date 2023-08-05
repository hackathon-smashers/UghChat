import { getApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const secret = process.env.NEXTAUTH_SECRET
const app = getApp()
const db = getDatabase(app)