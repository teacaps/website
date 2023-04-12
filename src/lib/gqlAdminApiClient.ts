// reference: https://github.com/Shopify/hydrogen/pull/1788/files#diff-4d536ffe12775c4364d272c9fb3d1675c5119d01cffec3e3cddd6b67bb299ade
const env: Record<string, string> = typeof Oxygen !== "undefined" && "env" in Oxygen ? Oxygen.env : import.meta.env;
export async function adminApiClient<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
	const endpoint = `https://${env.STOREFRONT_NAME}.myshopify.com/admin/api/${env.ADMIN_API_VERSION}/graphql.json`;
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Shopify-Access-Token": env.ADMIN_API_TOKEN,
		},
		body: JSON.stringify({ query, variables }),
	});
	if (!response.ok) {
		throw new Error(await response.text());
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const json: { errors?: Array<{ message: string }>; data: T } = await response.json();
	if (json?.errors?.length) {
		throw new Error(json.errors[0].message);
	}
	return json.data;
}
