/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5"],function(e,n,d,t,i,u,a){"use strict";function s(e){this._ellipsoid=t.defaultValue(e,u.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}a.defineProperties(s.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),s.mercatorAngleToGeodeticLatitude=function(e){return i.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-e))},s.geodeticLatitudeToMercatorAngle=function(e){s.MaximumLatitude<e?e=s.MaximumLatitude:e<-s.MaximumLatitude&&(e=-s.MaximumLatitude);var t=Math.sin(e);return.5*Math.log((1+t)/(1-t))},s.MaximumLatitude=s.mercatorAngleToGeodeticLatitude(Math.PI),s.prototype.project=function(e,t){var i=this._semimajorAxis,a=e.longitude*i,r=s.geodeticLatitudeToMercatorAngle(e.latitude)*i,o=e.height;return n.defined(t)?(t.x=a,t.y=r,t.z=o,t):new u.Cartesian3(a,r,o)},s.prototype.unproject=function(e,t){if(!n.defined(e))throw new d.DeveloperError("cartesian is required");var i=this._oneOverSemimajorAxis,a=e.x*i,r=s.mercatorAngleToGeodeticLatitude(e.y*i),o=e.z;return n.defined(t)?(t.longitude=a,t.latitude=r,t.height=o,t):new u.Cartographic(a,r,o)},e.WebMercatorProjection=s});
