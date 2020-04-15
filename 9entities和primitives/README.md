


viewer.entities : EntityCollection



### EntityCollection


- add(entity) → Entity
- getById(id) → Entity
- contains(entity) → Boolean
- remove(entity) → Boolean
- removeAll() 
- removeById(id) → Boolean




### Cesium.Entity(options)
options: 
- id : String	 
- name : String	 
- availability : TimeIntervalCollection	 
- show : Boolean 
- description : Property	 
- position : PositionProperty(The interface for all Property objects that define a world location as a Cartesian3 with an associated ReferenceFrame)	 
- orientation : Property	 
- viewFrom : Property	 
- parent : Entity	 
- billboard : BillboardGraphics  广告牌
- box : BoxGraphics              盒子
- corridor : CorridorGraphics	 通道
- cylinder : CylinderGraphics	 圆柱
- ellipse : EllipseGraphics	     椭圆
- ellipsoid : EllipsoidGraphics  椭球体
- label : LabelGraphics	         标签
- model : ModelGraphics	         模型
- tileset : Cesium3DTilesetGraphics	 3dTiles模型
- path : PathGraphics	         路径
- plane : PlaneGraphics	         平板
- point : PointGraphics	         点
- polygon : PolygonGraphics	     面
- polyline : PolylineGraphics	 线 
- properties : PropertyBag	 
- polylineVolume : PolylineVolumeGraphics	 折线体
- rectangle : RectangleGraphics	 矩形
- wall : WallGraphics            墙体



scene.primitives: PrimitiveCollection

### PrimitiveCollection



### PointPrimitiveCollection(options)

options:
- modelMatrix: Matrix4， Matrix4.IDENTITY	，变换矩阵
- debugShowBoundingVolume: Boolean	，默认false	optionalFor debugging only.  
- blendOption: BlendOption	，默认BlendOption.OPAQUE_AND_TRANSLUCENT


### Cesium.PointPrimitive()   

created and rendered using a PointPrimitiveCollection. 不使用new 创建



Appearance 外观：

Appearance(接口)：
  
EllipsoidSurfaceAppearance
MaterialAppearance
PerInstanceColorAppearance
PolylineColorAppearance
PolylineMaterialAppearance

矩形： 西南东北


```
var greenLine = viewer.entities.add({
    polyline : {
        positions : [startPosition, endPosition],
        width : 5,
        material : Cesium.Color.SPRINGGREEN
    }
});
 
var polylines = scene.primitives.add(new Cesium.PolylineCollection());
var polyline = polylines.add({
    positions : Cesium.PolylinePipeline.generateCartesianArc({
        positions : [startPosition, endPosition]
    }),
    material : Cesium.Material.fromType('Color', {
        color : Cesium.Color.SPRINGGREEN
    }),
    width: 5
});

```
