##

### Model 添加

```
//viewer.entities.add ....model
function createModel1(url, height) {
    //viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(114, 30, height);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = viewer.entities.add({
        name : url,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            minimumPixelSize : 128,
            maximumScale : 20000,
            silhouetteColor:Cesium.Color.BLUE, //轮廓线颜色
            silhouetteSize:3
        }
    });
    viewer.trackedEntity = entity;
}
```

```
    //scene.primitives.add ....model
      function createModel3(url, height) {
        scene.primitives.removeAll();

        var position = Cesium.Cartesian3.fromDegrees(114, 30, height);
        var heading = Cesium.Math.toRadians(135);
        var pitch = 0;
        var roll = 0;
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

        // 模型矩阵
        var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          hpr
        );

        var model = Cesium.Model.fromGltf({
          url: url,
          modelMatrix: modelMatrix,
          minimumPixelSize: 128,
          maximumScale: 20000,
        });

        scene.primitives.add(model);
        scene.camera.lookAt(position, new Cesium.Cartesian3(0.0, 0.0, 10.0));
        //camera.lookAtTransform(Cesium.Matrix4.IDENTITY); //
      }

```

3dtiles inspector

Cesium.Cesium3DTileStyle(style)
3D Tiles Styling language(https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling)

ClassificationPrimitive(单体化？)
