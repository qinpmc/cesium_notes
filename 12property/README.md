
## CompositeProperty
CompositeProperty的意思是组合的Property，可以把多种不同类型的ConstantProperty、SampleProperty、TimeIntervalCollectionProperty等Property组合在一起来操作。比如前一个时间段需要线性运动，后一段时间再跳跃式运动。 
 function change_composit() {

      // 1 sampledProperty
        var sampledProperty = new Cesium.SampledProperty(Cesium.Cartesian3);
        sampledProperty.addSample(...);
 

        // 2 ticProperty
        var ticProperty = new Cesium.TimeIntervalCollectionProperty();
        ticProperty.intervals.addInterval(...);
 

        // 3 compositeProperty
        var compositeProperty = new Cesium.CompositeProperty();
        compositeProperty.intervals.addInterval(
          Cesium.TimeInterval.fromIso8601({
            iso8601: "2019-01-01T00:00:00.00Z/2019-01-02T00:00:00.00Z",
            data: sampledProperty,
          })
        );
        compositeProperty.intervals.addInterval(
          Cesium.TimeInterval.fromIso8601({
            iso8601: "2019-01-02T00:00:00.00Z/2019-01-03T00:00:00.00Z",
            isStartIncluded: false,
            isStopIncluded: false,
            data: ticProperty,
          })
        );
   
        // 4 设置position
        blueBox.box.dimensions = compositeProperty;
 }