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
	import { Point } from 'ol/geom';
	import { goto } from '$app/navigation';

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
				center: fromLonLat([8.41728, 49.011819]),
				zoom: 18.47
			})
		});
		const indoorEqual = new IndoorEqual(map, { apiKey });
		const control = new LevelControl(indoorEqual);
		map.addControl(control);

		source.addFeature(
			new Feature({
				geometry: new Point(fromLonLat([8.41728, 49.011819])),
				name: 'Test'
			})
		);
		map.on('click', (e) => {
			const features = map.getFeaturesAtPixel(e.pixel);
			if (features.length > 0) {
				console.log(features[0].get('name'), 'at: ', e.coordinate);
				goto('/show/' + e.coordinate.join(':'));
			}
		});
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
