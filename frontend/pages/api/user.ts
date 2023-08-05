import { getToken, JWT } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req: any, res: any) {
    // const token = await getToken({req, secret})

    // if (!token) {
    //     return res.status(401).json({message: "Unauthenticated."})
    // }

    

    return res.status(200).json({message: "hello"})






//   if (req.method === 'POST') {
//     // Process a POST request
//   } else {
//     // Handle any other HTTP method
//   }
}