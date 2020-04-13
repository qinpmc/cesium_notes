


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
- billboard : BillboardGraphics 
- box : BoxGraphics 
- corridor : CorridorGraphics	 
- cylinder : CylinderGraphics	 
- ellipse : EllipseGraphics	 
- ellipsoid : EllipsoidGraphics 
- label : LabelGraphics	 
- model : ModelGraphics	 
- tileset : Cesium3DTilesetGraphics	 
- path : PathGraphics	 
- plane : PlaneGraphics	 
- point : PointGraphics	 
- polygon : PolygonGraphics	 
- polyline : PolylineGraphics	 
- properties : PropertyBag	 
- polylineVolume : PolylineVolumeGraphics	 
- rectangle : RectangleGraphics	 
- wall : WallGraphics



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