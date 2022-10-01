<p align="center">
	<img src="https://user-images.githubusercontent.com/80354781/193418094-18319483-fda8-4325-81c1-a564d31a57ee.png#gh-dark-mode-only" height="72">
	<img src="https://user-images.githubusercontent.com/80354781/193418071-7f329930-b0a5-4031-9c62-5d805ab6c02e.png#gh-light-mode-only" height="72">
</p>
<p align="center">
	<a href="https://teacaps.studio">
		<img src="https://therealsujitk-vercel-badge.vercel.app/?app=teacaps&logo=false" alt="Vercel badge" />
	</a>
	<a href="#">
		<img src="https://img.shields.io/badge/license-MPL--2.0-informational" alt="MPL-2.0 license badge" />
	</a>
	<a href="https://instagram.com/shopteacaps">
		<img src="https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white" alt="Teacaps Instagram" />
	</a>
	<a href="https://twitter.com/shopteacaps">
		<img src="https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white" alt="Teacaps Twitter" />
	</a>
</p>

## Installation

```
git clone git@github.com:teacaps/website.git
cd website
yarn install
yarn prepare
```

## Development

```
yarn dev
```

You'll need the following environment variables; all can be obtained from the Shopify custom app.
[Shopify Help Center: Custom apps](https://help.shopify.com/en/manual/apps/custom-apps?shpxid=94647310-2188-415C-BA52-58EC257705DA#create-and-install-a-custom-app)
```
ADMIN_API_TOKEN=...
ADMIN_API_VERSION=...
STOREFRONT_NAME=...
STOREFRONT_TOKEN=...
STOREFRONT_API_VERSION=...
```

## Deployment
Pushing to main will automatically create a Vercel production deployment.

When a pull request is opened, a Vercel preview deployment will be automatically created.

To deploy from a local copy, run `vercel` in the project directory.


## License

The Teacaps website is licensed under the Mozilla Public License, version 2.0. See the [LICENSE](./LICENSE) file for more information.