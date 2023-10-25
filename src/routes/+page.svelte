<script lang="ts">
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import { fromLonLat, toLonLat } from 'ol/proj';
	import OSM from 'ol/source/OSM';
	import TileJSON from 'ol/source/TileJSON';
	import { add } from 'ol/coordinate';
	import IndoorEqual, { LevelControl } from 'openlayers-indoorequal';
	import { onMount } from 'svelte';
	import { coordinateRelationship } from 'ol/extent';

	const apiKey = 'iek_exsKG2tSMNmq2Yy3J9kS3D3AKj4R';
	onMount(() => {
		const osmLayer = new TileLayer({
			source: new OSM()
		});
		let map = new Map({
			target: mapContainer,
			layers: [osmLayer],
			view: new View({
				center: fromLonLat([8.41728, 49.011819]),
				zoom: 18.47
			})
		});
		const indoorEqual = new IndoorEqual(map, { apiKey });
		const control = new LevelControl(indoorEqual);
		map.addControl(control);
	});

	let mapContainer: HTMLDivElement;
</script>

<div bind:this={mapContainer} />

<style>
	div {
		height: 100vh;
		width: 100vw;
	}
</style>
