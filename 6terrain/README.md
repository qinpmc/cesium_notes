## Cesium.TerrainProvider 接口

- EllipsoidTerrainProvider ：一种非常简单的地形提供程序，通过镶嵌椭球面生成几何图形
- CesiumTerrainProvider ： Cesium 格式地形 provider
- VRTheWorldTerrainProvider : A TerrainProvider that produces terrain geometry by tessellating height maps retrieved from a VT MÄK VR-TheWorld server.
- GoogleEarthEnterpriseTerrainProvider : 谷歌地形 provider

### Cesium.createWorldTerrain(options) → CesiumTerrainProvider

- requestVertexNormals：Boolean，默认 alse
- requestWaterMask：Boolean，false

- 使用 requestWaterMask 以类似的方式启用水体效果.

- 若要启用地形照明，请将 requestVertexNormals 设为 true 并开启全球光照.

```
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider : Cesium.createWorldTerrain({
        requestVertexNormals: true
    })
});
viewer.scene.globe.enableLighting = true;
```

### Cesium.sampleTerrain(terrainProvider, level, positions) → Promise.<Array.<Cartographic>>

- terrainProvider： TerrainProvider The terrain provider from which to query heights.
- level Number： The terrain level-of-detail from which to query terrain heights.
- positions: Array.<Cartographic> The positions to update with terrain heights.

### Cesium.sampleTerrainMostDetailed(terrainProvider, positions) → Promise.<Array.<Cartographic>>

- terrainProvider: TerrainProvider The terrain provider from which to query heights.
- positions: Array.<Cartographic> The positions to update with terrain heights.

```

// Query the terrain height of two Cartographic positions
var terrainProvider = Cesium.createWorldTerrain();
var positions = [
    Cesium.Cartographic.fromDegrees(86.925145, 27.988257),
    Cesium.Cartographic.fromDegrees(87.0, 28.0)
];
var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, positions);
Cesium.when(promise, function(updatedPositions) {
    // positions[0].height and positions[1].height have been updated.
    // updatedPositions is just a reference to positions.
});


```

## 地形透明

https://stackoverflow.com/questions/41541223/how-to-display-data-underground-in-cesium-js
https://groups.google.com/forum/#!topic/cesium-dev/Z_bX7pr1sRg // translucent-terrain branch
https://community.cesium.com/t/how-to-display-underground-entity/6314/4
https://github.com/CesiumGS/cesium/pull/8726
https://www.google.com/search?source=univ&tbm=isch&q=cesium+translucent+terrain&hl=en&sa=X&ved=2ahUKEwjR1ebKzdHrAhVQnp4KHfgPDVYQsAR6BAgKEAE //谷歌图片 cesium translucent terrain

https://github.com/CesiumGS/cesium/issues/5665
