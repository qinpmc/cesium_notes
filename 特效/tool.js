(function () {
  var tool = {};
  /**
   *
   * @param center
   * @param points
   * @param direction
   * @returns {Array}
   */
  function getCurveDynamicPointsAndLine(center, points, direction) {
    var lineArr = [];
    for (var i = 0; i < points.length; ++i) {
      var centerArr = { lng: center.x, lat: center.y };
      var point = { lng: points[i].x, lat: points[i].y };
      var curvePoints = getCurvePoints([centerArr, point]);
      var lineString = new tool.LineString({ spatialReference: 4326 });
      switch (direction) {
        case "out":
          // 从中心点向四周扩散
          for (var j = 0; j < curvePoints.length; ++j) {
            lineString.addPoint({
              x: curvePoints[j][0],
              y: curvePoints[j][1],
              z: 0,
              spatialReference: 4326,
            });
          }
          break;
        default:
          // 从四周向中心点汇聚
          for (var j = curvePoints.length - 1; j >= 0; --j) {
            lineString.addPoint({
              x: curvePoints[j][0],
              y: curvePoints[j][1],
              z: 0,
              spatialReference: 4326,
            });
          }
          break;
      }

      lineArr.push(lineString);
    }
    return lineArr;
  }

  /**
   *
   * @param points
   * @param options
   * @returns {Array}
   */
  function getCurvePoints(points, options) {
    options = options || {};
    var curvePoints = [];
    for (var i = 0; i < points.length - 1; i++) {
      var p = getCurveByTwoPoints(points[i], points[i + 1], options.count);
      if (p && p.length > 0) {
        curvePoints = curvePoints.concat(p);
      }
    }
    return curvePoints;
  }

  /**
   *
   * @param obj1
   * @param obj2
   * @param count
   * @returns {*}
   */
  function getCurveByTwoPoints(obj1, obj2, count) {
    if (!obj1 || !obj2) {
      return null;
    }

    var B1 = function (x) {
      return 1 - 2 * x + x * x;
    };
    var B2 = function (x) {
      return 2 * x - 2 * x * x;
    };
    var B3 = function (x) {
      return x * x;
    };

    var curveCoordinates = [];

    var count = count || 40; // 曲线是由一些小的线段组成的，这个表示这个曲线所有到的折线的个数
    var isFuture = false;
    var t, h, h2, lat3, lng3, j, t2;
    var LnArray = [];
    var i = 0;
    var inc = 0;

    if (typeof obj2 == "undefined") {
      if (typeof curveCoordinates != "undefined") {
        curveCoordinates = [];
      }
      return;
    }

    var lat1 = parseFloat(obj1.lat);
    var lat2 = parseFloat(obj2.lat);
    var lng1 = parseFloat(obj1.lng);
    var lng2 = parseFloat(obj2.lng);

    // 计算曲线角度的方法
    if (lng2 > lng1) {
      if (parseFloat(lng2 - lng1) > 180) {
        if (lng1 < 0) {
          lng1 = parseFloat(180 + 180 + lng1);
        }
      }
    }

    if (lng1 > lng2) {
      if (parseFloat(lng1 - lng2) > 180) {
        if (lng2 < 0) {
          lng2 = parseFloat(180 + 180 + lng2);
        }
      }
    }
    j = 0;
    t2 = 0;
    if (lat2 == lat1) {
      t = 0;
      h = lng1 - lng2;
    } else if (lng2 == lng1) {
      t = Math.PI / 2;
      h = lat1 - lat2;
    } else {
      t = Math.atan((lat2 - lat1) / (lng2 - lng1));
      h = (lat2 - lat1) / Math.sin(t);
    }
    if (t2 == 0) {
      t2 = t + Math.PI / 5;
    }
    h2 = h / 2;
    lng3 = h2 * Math.cos(t2) + lng1;
    lat3 = h2 * Math.sin(t2) + lat1;

    for (i = 0; i < count + 1; i++) {
      curveCoordinates.push([
        lng1 * B1(inc) + lng3 * B2(inc) + lng2 * B3(inc),
        lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc),
      ]);
      inc = inc + 1 / count;
    }
    return curveCoordinates;
  }

  function LineString(options) {
    this.spatialReference = options.spatialReference;
    this.points = [];
  }
  LineString.prototype.addPoint = function (point) {
    this.points.push(point);
  };

  LineString.prototype.length = function () {
    var tollen = 0;
    for (var i = 0, len = this.points.length - 1; i < len; i++) {
      tollen += Math.sqrt(
        Math.pow(this.points[i + 1].x - this.points[i].x, 2) +
          Math.pow(this.points[i + 1].y - this.points[i].y, 2)
      );
    }
    return tollen;
  };

  LineString.prototype.getPartPoint = function (length) {
    if (length <= 0) return this.points[0];
    var count = this.points.length;
    var pathLen = this.length();
    if (length >= pathLen) return this.points[count - 1];
    var dCurLen = 0,
      pnt1,
      pnt2,
      distance;
    for (var i = 0, len = count - 1; i < len; ++i) {
      pnt1 = this.points[i];
      pnt2 = this.points[i + 1];
      distance = Math.sqrt(
        Math.pow(pnt1.x - pnt2.x, 2) + Math.pow(pnt1.y - pnt2.y, 2)
      );
      if (dCurLen + distance >= length) {
        var dRadio = (length - dCurLen) / distance;
        return {
          x: pnt1.x + (pnt2.x - pnt1.x) * dRadio,
          y: pnt1.y + (pnt2.y - pnt1.y) * dRadio,
          spatialReference: pnt1.spatialReference,
        };
      }
      dCurLen += distance;
    }
    return this.points[count - 1];
  };

  var proj4326 = new proj4.Proj("EPSG:" + 4326);
  var proj3857 = new proj4.Proj("EPSG:" + 3857);

  // coords : Array
  function trans4326To3857(coords) {
    var pnt = proj4.toPoint(coords);
    var result = proj4.transform(proj4326, proj3857, pnt);
    return [result.x, result.y];
  }

  function trans3857To4326(coords) {
    var pnt = proj4.toPoint(coords);
    var result = proj4.transform(proj3857, proj4326, pnt);
    return [result.x, result.y];
  }

  tool.getCurveDynamicPointsAndLine = getCurveDynamicPointsAndLine;
  tool.LineString = LineString;
  tool.trans4326To3857 = trans4326To3857;
  tool.trans3857To4326 = trans3857To4326;

  this.tool = tool;
})();
