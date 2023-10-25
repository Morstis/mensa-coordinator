<script lang="ts">
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import { fromLonLat, toLonLat } from 'ol/proj';
	import OSM from 'ol/source/OSM';
	import TileJSON from 'ol/source/TileJSON';
	import { add } from 'ol/coordinate';
	import VectorLayer from 'ol/layer/Vector';
	import IndoorEqual, { LevelControl } from 'openlayers-indoorequal';
	import { onMount } from 'svelte';
	import { coordinateRelationship } from 'ol/extent';
	import VectorSource from 'ol/source/Vector';
	import Feature from 'ol/Feature';
	import { Circle, Point } from 'ol/geom';
	import { page } from '$app/stores';
	import Style from 'ol/style/Style';
	import Fill from 'ol/style/Fill';
	import Stroke from 'ol/style/Stroke';

	const apiKey = 'iek_exsKG2tSMNmq2Yy3J9kS3D3AKj4R';
	onMount(() => {
		const source = new VectorSource();
		const markers = new VectorLayer({
			source
		});

		const osmLayer = new TileLayer({
			source: new OSM()
		});
		let map = new Map({
			target: mapContainer,
			layers: [osmLayer, markers],
			view: new View({
				center: $page.params.lonLat.split(':').map(parseFloat),
				zoom: 18.47
			})
		});
		const indoorEqual = new IndoorEqual(map, { apiKey });
		const control = new LevelControl(indoorEqual);
		map.addControl(control);

		source.addFeature(
			new Feature({
				geometry: new Point($page.params.lonLat.split(':').map(parseFloat))
			})
		);
	});

	let mapContainer: HTMLDivElement;
</script>

<main>
	<h1>Du sitzt hier:</h1>
	<div bind:this={mapContainer} />
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
	}
	div {
		height: 100%;
		width: 100%;
	}
</style>
