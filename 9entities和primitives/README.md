- https://blog.csdn.net/vc___ae/article/details/110918301
- https://www.cxymm.net/article/luoyun620/107425770#:~:text=cesium%E6%8F%90%E4%BE%9B%E4%BA%86SimplePolylineGeometry%E3%80%81PolylineGeometry%E3%80%81PolylineVolumeGeometry%E3%80%81PolylineVolumeOutlineGeometry%E3%80%81GroundPolylineGeometry%E4%BA%94%E7%A7%8D%E5%88%9B%E5%BB%BA%E7%BA%BF%E7%9A%84,%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E3%80%82%20%E9%A6%96%E5%85%88%E7%9C%8B%E4%B8%80%E4%B8%8BSimplePolylineGeometry%E5%92%8CPolylineGeometry%E7%9A%84API%E8%A7%A3%E9%87%8A%EF%BC%9A

- https://blog.csdn.net/weixin_40902527/article/details/95785501
- https://cesium.com/blog/2016/03/02/performance-tips-for-points

primitives 总体结构：

![primitives](./primitives.png)

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
- billboard : BillboardGraphics 广告牌
- box : BoxGraphics 盒子
- corridor : CorridorGraphics 通道
- cylinder : CylinderGraphics 圆柱
- ellipse : EllipseGraphics 椭圆
- ellipsoid : EllipsoidGraphics 椭球体
- label : LabelGraphics 标签
- model : ModelGraphics 模型
- tileset : Cesium3DTilesetGraphics 3dTiles 模型
- path : PathGraphics 路径
- plane : PlaneGraphics 平板
- point : PointGraphics 点
- polygon : PolygonGraphics 面
- polyline : PolylineGraphics 线
- properties : PropertyBag
- polylineVolume : PolylineVolumeGraphics 折线体
- rectangle : RectangleGraphics 矩形
- wall : WallGraphics 墙体

scene.primitives: PrimitiveCollection

### PrimitiveCollection

### PointPrimitiveCollection(options)

options:

- modelMatrix: Matrix4， Matrix4.IDENTITY ，变换矩阵
- debugShowBoundingVolume: Boolean ，默认 false optionalFor debugging only.
- blendOption: BlendOption ，默认 BlendOption.OPAQUE_AND_TRANSLUCENT

### GeometryInstance

多个 instance 可以引用同一个几何体（ Geometry），而每个 instance 可以有不同的偏移矩阵（modelMatrix）。这样，我们就只需要计算一次几何体（计算顶点等）而多次使用它。
![GeometryInstance_Geometry](./GeometryInstance_Geometry.png)

更新每个 instance 的属性
即便是已经添加到图元里，每个 instance 的一些属性也可以修改，包括：

Color : ColorGeometryInstanceAttribute 决定了几何体颜色。不过图元应该设置一个 PerInstanceColorAppearance 外观。
Show :布尔变量决定 instance 是否可见，对任意 instance 都有效。

### Appearances（外观）

几何体定义了结构。图元的另一个关键属性是 appearance，决定图元的着色，也就说每个像素是如何上色的。  
一个图元可以有若干个几何体 instance，但是只能有一个 appearance 属性。根据 appearance 类型不同，一个 appearance 可能有一个 material 属性，材质属性决定了大体的着色。

![GeometryInstance_Appearance](./GeometryInstance_Appearance.png)

### Cesium.PointPrimitive()

created and rendered using a PointPrimitiveCollection. 不使用 new 创建

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

## clampToGround 和 classificationType

把线条贴到 3dtiles 上需要用到两个属性：clampToGround 和 classificationType。

clampToGround 属性用来表示该线段要贴地。1.54 版以后贴地中的地字同时指代地形和 3dtiles 数据。

还有一个属性 classificationType，则用来描述是否只贴地形（ClassificationType.TERRAIN），或者只贴 3dtiles 数据（ClassificationType.CESIUM_3D_TILE），或者二者都贴（ClassificationType.BOTH）。默认情况下是二者都贴。

链接：https://www.jianshu.com/p/aab4a0bb0d0e?tdsourcetag=s_pctim_aiomsg

### ArcType : Number

ArcType defines the path that should be taken connecting vertices.

- NONE Number Straight line that does not conform to the surface of the ellipsoid.
- GEODESIC Number Follow geodesic path.
- RHUMB Number Follow rhumb or loxodrome path.

## polygon,rectangle,ellipse,corridor 的注意点

1.  Corridors, polygons and rectangles will be clamped automatically if they are filled with a constant color and
    has no height or extruded height.
    NOTE: Setting height to 0 will disable clamping.（https://sandcastle.cesium.com/?src=Clamp%20to%20Terrain.html&label=All）
    实际测试 Cesium1.89，设置 extrudedHeight，在 positions 中设置有 height，均默认贴地

2.  Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height. heightReference will be ignored
    定义了 heightReference 时，必须专门设置 height 属性值

```
// corridor例子测试
    const e = viewer.entities.add({
        corridor: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -122.19,
            46.1914,
            1000000,
            -122.21,
            46.21,
            1000000,
            -122.23,
            46.21,
            100000
        ]),
        width: 2000.0,
        material: Cesium.Color.RED.withAlpha(0.5),
        //height:20 ,
        heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND
        },
    });

    viewer.zoomTo(e);


```
