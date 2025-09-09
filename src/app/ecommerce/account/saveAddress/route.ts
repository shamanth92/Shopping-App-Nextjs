import { headers } from "next/headers";

export async function POST(request: any): Promise<Response> {
    const apiUrl = `${process.env.API_URL}/ecommerce/addAddress`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) { 
      try {
        const addAddress = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
          body: JSON.stringify(await request.json()),
        });
        if (!addAddress.ok) {
          throw new Error(`Error from external API: ${addAddress.statusText}`);
        }
        const response = await addAddress.json();
        return new Response(JSON.stringify(response), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(
          JSON.stringify({ error: error.message || "Unknown error" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
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
    const apiUrl = `${process.env.API_URL}/ecommerce/addAddress?email=${email}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const getAddresses = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
        });
        if (!getAddresses.ok) {
          throw new Error(`Error from external API: ${getAddresses.statusText}`);
        }
        const response = await getAddresses.json();
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

  export async function DELETE(request: any): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const apiUrl = `${process.env.API_URL}/ecommerce/deleteAddress?id=${id}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const deleteAddress = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
        });
        if (!deleteAddress.ok) {
          throw new Error(`Error from external API: ${deleteAddress.statusText}`);
        }
        return new Response(JSON.stringify({ message: 'address deleted' }), {
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

  export async function PUT(request: any): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const apiUrl = `${process.env.API_URL}/ecommerce/updateAddress?id=${id}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const updateAddress = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
          body: JSON.stringify(await request.json()),
        });
        if (!updateAddress.ok) {
          throw new Error(`Error from external API: ${updateAddress.statusText}`);
        }
        return new Response(JSON.stringify({ message: 'address updated' }), {
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