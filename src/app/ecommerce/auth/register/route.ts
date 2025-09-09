import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
  } from "firebase/auth";
import { app } from "@/firebase/initialize";

export async function GET(request: any): Promise<Response> {
    const auth = getAuth(app);
    const { searchParams } = new URL(request.url);
    const email: any = searchParams.get('email');
    const password: any = searchParams.get('password');
    const fullName: any = searchParams.get('fullName');
    try {
        const registerUser = await createUserWithEmailAndPassword(auth, email, password);
        const user = registerUser.user;
        console.log('res: ', registerUser);
        updateProfile(user, {
            displayName: fullName,
          })
            .then((res) => {
              // Profile updated!
              // ...
              console.log('res: ', res);
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
  }