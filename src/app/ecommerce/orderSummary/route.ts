import { headers } from "next/headers";

export async function POST(request: any): Promise<Response> {
  const apiUrl = `${process.env.API_URL}/ecommerce/ordersummary`;
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const storeOrderSummary = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
        body: JSON.stringify(await request.json()),
      });
      if (!storeOrderSummary.ok) {
        throw new Error(
          `Error from external API: ${storeOrderSummary.statusText}`
        );
      }
      const response = await storeOrderSummary.json();
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
  const apiUrl = `${process.env.API_URL}/ecommerce/ordersummary?email=${email}`;
  const headersList = headers();
  const referer = headersList.get("authorization");
  if (referer) {
    try {
      const getOrders = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": referer
        },
      });
      if (!getOrders.ok) {
        throw new Error(`Error from external API: ${getOrders.statusText}`);
      }
      const response = await getOrders.json();
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
