 https://blog.csdn.net/caozl1132/article/details/90257043
 https://blog.csdn.net/weitaming1/article/details/95067688
 https://zhuanlan.zhihu.com/p/44767866
 
 
 
 在cesium中，想获取不同的对象，需要通过pick方法来进行拾取，但是Cesium中有多种pick的方法，例如 scene中有pick、pickPosition、及drillPick等，camera中有getPickRay、pickEllipsoid等，globel中有pick；
 
 先来分类说一下各个pick的作用：
 
 scene中（一般用来获取entity对象）：
 
 pick：scene.pick可以通过此方法获取到pick对象，通过pick.id即可拾取当前的entity对象，也可以获取Cesium3DTileFeature对象；
 
 drillPick：scene.drillPick(click.position)是从当前鼠标点击位置获取entity的集合，然后通过for循环可以获取当前坐标下的所有entity；
 
 pickPosition：通过viewer.scene.pickPosition(movement.position)获取，可以获取场中任意点击处的对应的世界坐标。（高程不精确）
 
 pick与drillPick的区别：pick只可获取一个entity对象（如该位置存在多个entity，哪怕面点线不在同一高度，面entity都可能会盖住点线entity），但drillPick可获取当前坐标下的多个对象；
 
 camera和globel中的pick：
 
 这两个里面的pick一般搭配使用，通过camera中的getPickRay获取ray（射线），然后通过globel中的pick方法，获取世界坐标，如下面的地形坐标的获取；
 
 ======================================================
 
 1、通过pick进行地形上的坐标的获取
 
 这个是常用的方法，当你想获取当前鼠标位置的三维坐标时，经常使用到这个方法：
 
 第一步：通过camera的getPickRay，将当前的屏幕坐标转为ray（射线）；
 
 viewer.camera.getPickRay(windowCoordinates);
 第二步：找出ray和地形的交点，即可求出三维世界坐标
 
 globe.pick(ray, scene);
 2、通过pick获取entity 
 
  handler.setInputAction(function (movement) {
         var pick = viewer.scene.pick(movement.endPosition);  //获取的pick对象
         var pickedEntity = Cesium.defined(pick) ? pick.id : undefined; //pick.id即为entity
     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
 
 
 
 
 
 
 
 