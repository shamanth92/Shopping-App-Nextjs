import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase/initialize";

export async function GET(request: any): Promise<Response> {
    const auth = getAuth(app);
    const { searchParams } = new URL(request.url);
    const email: any = searchParams.get('email');
    const password: any = searchParams.get('password');
    try {
        const signInUser = await signInWithEmailAndPassword(auth, email, password);
        const user = signInUser.user;
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    } catch (error) {
        return new Response(
          JSON.stringify({ message: (error as any)?.message || "Unknown error" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
  }