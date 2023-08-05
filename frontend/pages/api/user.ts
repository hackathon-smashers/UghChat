import { getToken, JWT } from "next-auth/jwt"
import { getApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const secret = process.env.NEXTAUTH_SECRET
const app = getApp()
const db = getDatabase(app)

export default async function handler(req: any, res: any) {

    console.log(db)

    const someRef = ref(db, 'users/');
    onValue(someRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        return res.status(200).json({message: JSON.stringify(data)})
    });


    return res.status(200).json({message: "iasjdoiasjdoiasjd"})






//   if (req.method === 'POST') {
//     // Process a POST request
//   } else {
//     // Handle any other HTTP method
//   }
}