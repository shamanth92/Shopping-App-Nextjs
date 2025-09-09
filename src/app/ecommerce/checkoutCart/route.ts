import { headers } from "next/headers";

export async function POST(request: any): Promise<Response> {
  const apiUrl = `${process.env.API_URL}/ecommerce/checkoutcart`;
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const addItemsToCart = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
        body: JSON.stringify(await request.json()),
      });
      if (!addItemsToCart.ok) {
        throw new Error(`Error from external API: ${addItemsToCart.statusText}`);
      }
      const response = await addItemsToCart.json();
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
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
  const email = searchParams.get("email");
  const apiUrl = `${process.env.API_URL}/ecommerce/checkoutcart?email=${email}`;
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const getCartItems = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
      });
      console.log()
      if (!getCartItems.ok) {
        throw new Error(`Error from external API: ${getCartItems.statusText}`);
      }
      const response = await getCartItems.json();
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
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
    const email = searchParams.get('email');
    const id = searchParams.get('id');
    console.log(email, id);
    const apiUrl = `${process.env.API_URL}/ecommerce/CheckoutCart?email=${email}&id=${id}`;
    const headersList = headers();
    const referer = headersList.get("authorization");
    if (referer) {
      try {
        const deleteItemFromCart = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": referer
          },
        });
        if (!deleteItemFromCart.ok) {
          throw new Error(`Error from external API: ${deleteItemFromCart.statusText}`);
        }
      //   const response = await deleteItemFromCart.json();
        return new Response(JSON.stringify({ message: 'Item deleted from cart' }), {
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
