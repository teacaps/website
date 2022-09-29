import { gql } from "@shopify/hydrogen";
import { adminApiClient } from "../../lib/gqlAdminApiClient";
import type { CreateCustomerMutation } from "../../graphql/admin.generated";
import type { HydrogenRequest } from "@shopify/hydrogen";

export async function api(request: HydrogenRequest) {
	if (request.method !== "POST") return new Response(null, { status: 405 });

	const data = await request.formData();
	const email = data.get("email");
	if (!email || typeof email !== "string") return new Response(null, { status: 400 });

	const response = await adminApiClient<CreateCustomerMutation>(CREATE_CUSTOMER_MUTATION, { email }).catch((err) => {
		console.error(err);
		return new Response(err, { status: 500 });
	});
	if (response instanceof Response) return response;
	if (response) {
		return new Response(null, { status: 200 });
	}
	return new Response(null, { status: 500 });
}

const CREATE_CUSTOMER_MUTATION = gql`
	mutation CreateCustomer($email: String!) {
		customerCreate(
			input: {
				email: $email
				emailMarketingConsent: { marketingState: SUBSCRIBED, marketingOptInLevel: CONFIRMED_OPT_IN }
			}
		) {
			customer {
				email
				emailMarketingConsent {
					marketingState
					marketingOptInLevel
				}
			}
			userErrors {
				field
				message
			}
		}
	}
`;
