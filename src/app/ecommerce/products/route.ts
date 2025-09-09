import { headers } from "next/headers";

export async function GET(request: any): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let apiUrl;
  if (!id) {
    apiUrl = `${process.env.API_URL}/ecommerce/fetchproducts`;
  } else {
    apiUrl = `${process.env.API_URL}/ecommerce/fetchproducts?id=${id}`;
  }
    try {
      const getProducts = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!getProducts.ok) {
        throw new Error(`Error from external API: ${getProducts.statusText}`);
      }
      const response = await getProducts.json();
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
}
