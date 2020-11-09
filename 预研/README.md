// Scene.js line:1840

```
function getOccluder(scene) {
    // TODO: The occluder is the top-level globe. When we add
    //       support for multiple central bodies, this should be the closest one.
    var globe = scene.globe;
    if (
        scene._mode === SceneMode.SCENE3D &&
        defined(globe) &&
        globe.show &&
        !scene._cameraUnderground &&
        !scene._globeTranslucencyState.translucent
    ) {
        var ellipsoid = globe.ellipsoid;
        var minimumTerrainHeight = scene.frameState.minimumTerrainHeight;
        scratchOccluderBoundingSphere.radius =
            ellipsoid.minimumRadius + minimumTerrainHeight;
        scratchOccluder = Occluder.fromBoundingSphere(
            scratchOccluderBoundingSphere,
            scene.camera.positionWC,
            scratchOccluder
        );
        return scratchOccluder;
    }

    return undefined;
}
```

开启地下模式后，!scene.\_globeTranslucencyState.translucent 为 !true = false; 造成 return undefined

```
   /**
    * 点是否可见
    * @param {g2.sfs.Point} point 点的位置
    * @returns {Boolean} 返回true为可见，false为不可见
    */
globe.prototype.isPointVisible = function (point) {
    var frameState = this._cesiumWidget.scene._frameState;
    var occluder = frameState.occluder;
    // if(occluder){
    //     cartesian = Cesium.Cartesian3.fromDegrees(point.x, point.y, point.z, undefined, cartesian);
    //     var visible = occluder.isPointVisible(cartesian);
    //     return visible;
    // }
    // return true;
    cartesian = Cesium.Cartesian3.fromDegrees(point.x, point.y, point.z, undefined, cartesian);
    var visible = occluder.isPointVisible(cartesian);
    return visible;
}
```
