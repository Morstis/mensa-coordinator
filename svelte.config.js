import adapter from '@ptkdev/sveltekit-cordova-adapter';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			strict: false,
			platform: 'capacitor',
			fallback: 'index.html'
		})
	}
};

export default config;
