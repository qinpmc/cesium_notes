
 
 
## Cesium.TerrainProvider 接口

- EllipsoidTerrainProvider ：一种非常简单的地形提供程序，通过镶嵌椭球面生成几何图形   
- CesiumTerrainProvider ：  Cesium格式地形provider  
- VRTheWorldTerrainProvider : A TerrainProvider that produces terrain geometry by tessellating height maps retrieved from a VT MÄK VR-TheWorld server.  
- GoogleEarthEnterpriseTerrainProvider : 谷歌地形provider
 
 
 
### Cesium.createWorldTerrain(options) → CesiumTerrainProvider

- requestVertexNormals：Boolean，默认alse	 
- requestWaterMask：Boolean，false	 
 
 
### Cesium.sampleTerrain(terrainProvider, level, positions) → Promise.<Array.<Cartographic>>

- terrainProvider： TerrainProvider	   The terrain provider from which to query heights.
- level	Number： The terrain level-of-detail from which to query terrain heights.
- positions: Array.<Cartographic>	The positions to update with terrain heights.


 
### Cesium.sampleTerrainMostDetailed(terrainProvider, positions) → Promise.<Array.<Cartographic>>
 
- terrainProvider: TerrainProvider	The terrain provider from which to query heights.
- positions: Array.<Cartographic>	The positions to update with terrain heights.

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