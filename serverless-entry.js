import "@shopify/hydrogen/web-polyfills";
import indexTemplate from "./dist/client/index.html?raw";
import handleRequest from "./src/App.server";

export default function (req, res) {
	handleRequest(req, { streamableResponse: res, indexTemplate });
}
