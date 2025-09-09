import { headers } from "next/headers";

export async function POST(request: any): Promise<Response> {
    const apiUrl = `${process.env.API_URL}/ecommerce/saveAccount`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const addAccount = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
          body: JSON.stringify(await request.json()),
        });
        if (!addAccount.ok) {
          throw new Error(`Error from external API: ${addAccount.statusText}`);
        }
        const response = await addAccount.json();
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(
        JSON.stringify({ error: error.message || "Unknown error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
      }
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  export async function GET(request: any): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const apiUrl = `${process.env.API_URL}/ecommerce/getAccount?email=${email}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const getAccount = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
        });
        if (!getAccount.ok) {
          throw new Error(`Error from external API: ${getAccount.statusText}`);
        }
        const response = await getAccount.json();
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(
        JSON.stringify({ error: error.message || "Unknown error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
      }
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
 
  }