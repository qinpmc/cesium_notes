/**
 * @description:动态立体墙材质
 * @date: 2022-02-11
 */

//动态墙材质
function DynamicWallMaterialProperty(options) {
  // 默认参数设置
  this._definitionChanged = new Cesium.Event();
  this._color = undefined;
  this._repeat = undefined;
  this._speed = undefined;
  this._axisY = undefined;
  this._image = undefined;
  this._color = options.color;
  this._speed = options.speed;
  this._image = options.trailImage;
  this._axisY = options.axisY;
  this._repeat = options.repeat;
  this._time = new Date().getTime();
  this.duration = options.duration;
}
Object.defineProperties(DynamicWallMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return false;
    },
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  color: Cesium.createPropertyDescriptor("color"),
});
DynamicWallMaterialProperty.prototype.getType = function (time) {
  return "DynamicWall";
};
DynamicWallMaterialProperty.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {};
  }
  result.color = this._color;

  result.image = Cesium.Material.DynamicWallImage;
  result.speed = this._speed;
  result.axisY = this._axisY;
  result.repeat = this._repeat;
  if (this.duration) {
    result.time =
      ((new Date().getTime() - this._time) % this.duration) / this.duration;
  }
  // viewer.scene.requestRender();
  return result;
};
DynamicWallMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof DynamicWallMaterialProperty &&
      Cesium.Property.equals(this._color, other._color))
  );
};
Cesium.DynamicWallMaterialProperty = DynamicWallMaterialProperty;
Cesium.Material.DynamicWallType = "DynamicWall";
Cesium.Material.DynamicWallImage = "./lineClr.png";
Cesium.Material.DynamicWallSource =
  "uniform sampler2D image; \n\
   uniform vec2 repeat; \n\
   uniform float time; \n\
  czm_material czm_getMaterial(czm_materialInput materialInput) \n\
 {\n\
    czm_material material = czm_getDefaultMaterial(materialInput);\n\
    vec2 st = repeat * materialInput.st;\n\
    float currTime;\n\
    if(time < 0.0){\n\
     currTime = speed*czm_frameNumber/1000.0;\n\
    }\n\
    else{\n\
     currTime = time;\n\
    }\n\
    vec4 colorImage = texture2D(image, vec2(fract((st.t) - currTime), st.t));\n\
    if(color.a == 0.0) {\n\
       if(colorImage.rgb == vec3(1.0)){\n\
          discard;\n\
        }\n\
        material.alpha = colorImage.a;\n\
        material.diffuse = colorImage.rgb;\n\
    }\n\
    else {\n\
        material.alpha = colorImage.a * color.a;\n\
        material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);\n\
    }\n\
    return material;\n\
}\n\
";
Cesium.Material._materialCache.addMaterial(Cesium.Material.DynamicWallType, {
  fabric: {
    type: Cesium.Material.DynamicWallType,
    uniforms: {
      color: new Cesium.Color(1.0, 1.0, 1.0, 1),
      image: Cesium.Material.DynamicWallImage,
      time: 0,
      axisY: false,
      speed: 10,
      repeat: new Cesium.Cartesian2(1, 1),
    },
    source: Cesium.Material.DynamicWallSource,
  },
  translucent: function (material) {
    return true;
  },
});
