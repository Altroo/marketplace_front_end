/** @type {import("next").NextConfig} */

const path = require('path');
// const withImages = require('next-images')

const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	images: {
		domains: [`${process.env.API_ROOT_URL}`],
		remotePatterns: [
			{
        protocol: `${process.env.HTTP_PROTOCOLE}`,
        hostname: `${process.env.API_ROOT_URL}`
      }
		]
	},
	experimental: {
		swcMinifyDebugOptions: {
			compress: {
				defaults: true,
				side_effects: false
			}
		}
	},
	swcMinify: true
};

module.exports = nextConfig;

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
