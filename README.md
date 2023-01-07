<p align="center">
	<img src="https://user-images.githubusercontent.com/80354781/193418094-18319483-fda8-4325-81c1-a564d31a57ee.png#gh-dark-mode-only" height="72">
	<img src="https://user-images.githubusercontent.com/80354781/193418071-7f329930-b0a5-4031-9c62-5d805ab6c02e.png#gh-light-mode-only" height="72">
</p>
<p align="center">
    <a href="https://app.netlify.com/sites/teacaps/deploys">
        <img src="https://api.netlify.com/api/v1/badges/da6865bd-adb3-4c66-909d-ff13f683112b/deploy-status" alt="Netlify badge" />
    </a>
    <br>
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

The following environment variables are needed.    
All Shopify environment variables can be obtained from the custom app.     
Environment variables beginning with SES, used for mail, can be found upon creating an AWS IAM user (`AmazonSESFullAccess` policy is needed).
Environment variables for ReCAPTCHA can be found upon creating a ReCAPTCHA v3 site.

[Shopify Help Center: Custom apps](https://help.shopify.com/en/manual/apps/custom-apps?shpxid=94647310-2188-415C-BA52-58EC257705DA#create-and-install-a-custom-app)    
[AWS IAM Management Console](https://us-east-1.console.aws.amazon.com/iam/home)
```
ADMIN_API_TOKEN=...
ADMIN_API_VERSION=...
STOREFRONT_NAME=...
STOREFRONT_TOKEN=...
STOREFRONT_API_VERSION=...
SES_ACCESS_KEY=...
SES_ACCESS_KEY_ID=...
PUBLIC_RECAPTCHA_SITE_KEY=...
PRIVATE_RECAPTCHA_SECRET_KEY=...
```

## Deployment
Pushing to main will automatically create a Vercel production deployment.

When a pull request is opened, a Vercel preview deployment will be automatically created.

To deploy from a local copy, run `vercel` in the project directory.


## License

The Teacaps website is licensed under the Mozilla Public License, version 2.0. See the [LICENSE](./LICENSE) file for more information.