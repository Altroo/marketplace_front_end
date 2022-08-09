/** @type {import("next").NextConfig} */

const path = require('path');
const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	experimental: {
		images: {
			allowFutureImage: true
		},
		swcPlugins: [['css-variable/swc', { displayName: true, basePath: __dirname }]]
	}
};

module.exports = nextConfig;

// module.exports = {
// 	webpack5: true,
// 	webpack: (config) => {
// 		config.resolve.fallback = {fs: false};
// 		return config;
// 	}
// };
