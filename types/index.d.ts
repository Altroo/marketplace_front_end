export {};

declare global {
	interface Window {
		// eslint-disable-next-line
		fbq: (key, name, options?: any ) => void;
	}
}
