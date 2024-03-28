import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { HydrogenRequest } from "@shopify/hydrogen";

export async function api(request: HydrogenRequest) {
	if (request.method === "GET") return new Response(null, { status: 302, headers: { Location: "/contact-us" } });
	if (request.method !== "POST") return new Response(null, { status: 405 });

	const client = new SESClient({
		credentials: {
			accessKeyId: Oxygen.env.SES_ACCESS_KEY_ID,
			secretAccessKey: Oxygen.env.SES_ACCESS_KEY,
		},
		region: "us-east-1",
	});

	const data = await request.formData();
	const { name, email, message, locale, "g-recaptcha-response": recaptchaToken } = Object.fromEntries(data.entries());
	if (!name || !email || !message) return new Response(null, { status: 400 });
	if (
		typeof name !== "string" ||
		typeof email !== "string" ||
		typeof message !== "string" ||
		(locale && typeof locale !== "string")
	)
		return new Response(null, { status: 400 });

	let potentiallySpam = false;
	if (recaptchaToken && typeof recaptchaToken === "string") {
		const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				secret: Oxygen.env.PRIVATE_RECAPTCHA_SECRET_KEY,
				response: recaptchaToken,
			}),
		});
		if (!recaptchaResponse.ok) potentiallySpam = true;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { success, score = 1 } = await recaptchaResponse.json();
		if (!success) potentiallySpam = true;
		if (score <= 0.1 || message.includes("http")) potentiallySpam = true;
	} else {
		potentiallySpam = true;
	}

	const date = new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		timeZone: "America/Los_Angeles",
	})
		.format(new Date())
		.replace("AM", "am")
		.replace("PM", "pm");

	const command = new SendEmailCommand({
		Source: "Teacaps (Shopify) <hello@teacaps.studio>",
		Destination: {
			ToAddresses: ["hello@teacaps.studio"],
		},
		ReplyToAddresses: [`${name} <${email}>`],
		Message: {
			Subject: {
				Data: (potentiallySpam ? "[POTENTIALLY SPAM] " : "") + `New customer message on ${date}`,
			},
			Body: {
				Html: {
					Data: CONTACT_EMAIL({ name, email, message, locale }),
				},
			},
		},
	});
	client.send(command, (err, data) => {
		if (err || !data) {
			console.error(err || "No data returned");
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			return new Response(err, { status: 500 });
		}
		return new Response(null, { status: 200 });
	});
}

const CONTACT_EMAIL = ({
	name,
	email,
	message,
	locale = "Unknown",
}: {
	name: string;
	email: string;
	message: string;
	locale?: string;
}) => `
<table
  style="
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    mso-table-lspace: 0;
    mso-table-rspace: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
  "
  cellpadding="0"
  cellspacing="0"
>
  <tbody>
    <tr style="margin-top: 0; margin-bottom: 0; padding: 0">
      <td
        style="
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
          mso-table-lspace: 0;
          mso-table-rspace: 0;
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
          border: 0;
        "
      ></td>
      <td
        style="
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
          mso-table-lspace: 0;
          mso-table-rspace: 0;
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
          border: 0;
        "
      >
        <table
          align="center"
          style="
            width: 100%;
            border-collapse: initial;
            border-spacing: 0;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            mso-table-lspace: 0;
            mso-table-rspace: 0;
            max-width: 470px;
            text-align: left;
            border-radius: 8px;
            overflow: hidden;
            margin: 32px auto 0;
            padding: 0;
            border: 1px solid #c9cccf;
          "
          cellpadding="0"
          cellspacing="0"
        >
          <tbody>
            <tr style="margin-top: 0; margin-bottom: 0; padding: 0">
              <td
                style="
                  -webkit-text-size-adjust: 100%;
                  -moz-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                  text-size-adjust: 100%;
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  margin-top: 0;
                  margin-bottom: 0;
                  padding: 0;
                  border: 0;
                "
              >
                <table
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border-spacing: 0;
                    -webkit-text-size-adjust: 100%;
                    -moz-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    text-size-adjust: 100%;
                    mso-table-lspace: 0;
                    mso-table-rspace: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                    padding: 0;
                  "
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tbody>
                    <tr style="margin-top: 0; margin-bottom: 0; padding: 0">
                      <td
                        style="
                          -webkit-text-size-adjust: 100%;
                          -moz-text-size-adjust: 100%;
                          -ms-text-size-adjust: 100%;
                          text-size-adjust: 100%;
                          mso-table-lspace: 0;
                          mso-table-rspace: 0;
                          margin-top: 0;
                          margin-bottom: 0;
                          padding: 20px;
                          border: 0;
                        "
                      >
                        <table
                          style="
                            width: 100%;
                            border-collapse: collapse;
                            border-spacing: 0;
                            -webkit-text-size-adjust: 100%;
                            -moz-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                            text-size-adjust: 100%;
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            margin-top: 0;
                            margin-bottom: 0;
                            padding: 0;
                          "
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tbody>
                            <tr
                              style="
                                margin-top: 0;
                                margin-bottom: 0;
                                padding: 0;
                              "
                            >
                              <td
                                style="
                                  -webkit-text-size-adjust: 100%;
                                  -moz-text-size-adjust: 100%;
                                  -ms-text-size-adjust: 100%;
                                  text-size-adjust: 100%;
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  margin-top: 0;
                                  margin-bottom: 0;
                                  padding: 0 0 20px;
                                  border: 0;
                                "
                              >
                                <table
                                  style="
                                    width: 100%;
                                    border-collapse: collapse;
                                    border-spacing: 0;
                                    -webkit-text-size-adjust: 100%;
                                    -moz-text-size-adjust: 100%;
                                    -ms-text-size-adjust: 100%;
                                    text-size-adjust: 100%;
                                    mso-table-lspace: 0;
                                    mso-table-rspace: 0;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                    padding: 0;
                                  "
                                  cellpadding="0"
                                  cellspacing="0"
                                >
                                  <tbody>
                                    <tr
                                      style="
                                        margin-top: 0;
                                        margin-bottom: 0;
                                        padding: 0;
                                      "
                                    >
                                      <td
                                        style="
                                          -webkit-text-size-adjust: 100%;
                                          -moz-text-size-adjust: 100%;
                                          -ms-text-size-adjust: 100%;
                                          text-size-adjust: 100%;
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          margin-top: 0;
                                          margin-bottom: 0;
                                          padding: 0;
                                          border: 0;
                                        "
                                      >
                                        <div>
                                          You received a new message from your
                                          online store's contact form.
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          style="
                            width: 100%;
                            border-collapse: collapse;
                            border-spacing: 0;
                            -webkit-text-size-adjust: 100%;
                            -moz-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                            text-size-adjust: 100%;
                            mso-table-lspace: 0;
                            mso-table-rspace: 0;
                            margin-top: 0;
                            margin-bottom: 0;
                            padding: 0;
                          "
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tbody>
                            <tr
                              style="
                                margin-top: 0;
                                margin-bottom: 0;
                                border-top-width: 1px;
                                border-top-color: #c9cccf;
                                border-top-style: solid;
                                padding: 0;
                              "
                            >
                              <td
                                style="
                                  -webkit-text-size-adjust: 100%;
                                  -moz-text-size-adjust: 100%;
                                  -ms-text-size-adjust: 100%;
                                  text-size-adjust: 100%;
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  margin-top: 0;
                                  margin-bottom: 0;
                                  padding: 20px 0 0;
                                  border: 0;
                                "
                              >
                                <div>
                                  <b>Country Code:</b>
                                  <pre
                                    style="
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 20px;
                                      text-transform: initial;
                                      letter-spacing: initial;
                                      color: #202223;
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, San Francisco,
                                        Segoe UI, Roboto, Helvetica Neue,
                                        sans-serif;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      white-space: pre-line;
                                      padding: 0;
                                    "
                                  >
${locale}</pre
                                  >
                                </div>
                                <div style="margin-top: 8px">
                                  <b>Name:</b>
                                  <pre
                                    style="
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 20px;
                                      text-transform: initial;
                                      letter-spacing: initial;
                                      color: #202223;
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, San Francisco,
                                        Segoe UI, Roboto, Helvetica Neue,
                                        sans-serif;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      white-space: pre-line;
                                      padding: 0;
                                    "
                                  >
${name}</pre
                                  >
                                </div>
                                <div style="margin-top: 8px">
                                  <b>Email:</b>
                                  <pre
                                    style="
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 20px;
                                      text-transform: initial;
                                      letter-spacing: initial;
                                      color: #202223;
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, San Francisco,
                                        Segoe UI, Roboto, Helvetica Neue,
                                        sans-serif;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      white-space: pre-line;
                                      padding: 0;
                                    "
                                  >
${email}</pre
                                  >
                                </div>
                                <div style="margin-top: 8px">
                                  <b>Field:</b>
                                  <pre
                                    style="
                                      font-size: 14px;
                                      font-weight: 400;
                                      line-height: 20px;
                                      text-transform: initial;
                                      letter-spacing: initial;
                                      color: #202223;
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, San Francisco,
                                        Segoe UI, Roboto, Helvetica Neue,
                                        sans-serif;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      white-space: pre-line;
                                      padding: 0;
                                    "
                                  >
${message}</pre
                                  >
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td
        style="
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
          mso-table-lspace: 0;
          mso-table-rspace: 0;
          margin-top: 0;
          margin-bottom: 0;
          padding: 0;
          border: 0;
        "
      ></td>
    </tr>
  </tbody>
</table>
`;
