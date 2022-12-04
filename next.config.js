/** @type {import("next").NextConfig} */

const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

const headers = [
  "Accept", "Accept-Version", "Content-Length",
  "Content-MD5", "Content-Type", "Date", "X-Api-Version",
  "X-CSRF-Token", "X-Requested-With",
];

const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: [`${process.env.API_ROOT_URL}`],
		remotePatterns: [
			{
				protocol: `${process.env.HTTP_PROTOCOLE}`,
				hostname: `${process.env.API_ROOT_URL}`,
			},
		],
	},
	sentry: {
		// Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
		// for client-side builds. (This will be the default starting in
		// `@sentry/nextjs` version 8.0.0.) See
		// https://webpack.js.org/configuration/devtool/ and
		// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
		// for more information.
		hideSourceMaps: true,
	},
	async headers() {
    return [
      {
	      source: "/api/(.*)",
        headers: [
	        { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: process.env.NODE_ENV !== "production" ? '*' : "https://www.qaryb.com,https://qaryb.com"},
          { key: "Access-Control-Allow-Methods", value: "GET,HEAD,PUT,PATCH,POST,DELETE" },
          { key: "Access-Control-Allow-Headers", value: headers.join(", ") }
	      ]
      }
    ];
  }
};

module.exports = withSentryConfig(nextConfig, {
	// Additional config options for the Sentry Webpack plugin. Keep in mind that
	// the following options are set automatically, and overriding them is not
	// recommended:
	//   release, url, org, project, authToken, configFile, stripPrefix,
	//   urlPrefix, include, ignore
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
	silent: false,
});

// module.exports = {
// 	...nextConfig,
// 	...withLangxJs
//
// 	// webpack5: true,
// 	// webpack: (config) => {
// 	// 	config.resolve.fallback = {fs: false};
// 	// 	return config;
// 	// }
// };
