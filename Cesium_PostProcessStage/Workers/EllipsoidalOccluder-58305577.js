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
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./defaultValue-199f5aa8","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d"],function(e,u,p,f,m,i,r){"use strict";function t(e,i){p.Check.typeOf.object("ellipsoid",e),this._ellipsoid=e,this._cameraPosition=new m.Cartesian3,this._cameraPositionInScaledSpace=new m.Cartesian3,this._distanceToLimbInScaledSpaceSquared=0,u.defined(i)&&(this.cameraPosition=i)}i.defineProperties(t.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(e){var i=this._ellipsoid.transformPositionToScaledSpace(e,this._cameraPositionInScaledSpace),t=m.Cartesian3.magnitudeSquared(i)-1;m.Cartesian3.clone(e,this._cameraPosition),this._cameraPositionInScaledSpace=i,this._distanceToLimbInScaledSpaceSquared=t}}});var o=new m.Cartesian3;t.prototype.isPointVisible=function(e){var i=this._ellipsoid.transformPositionToScaledSpace(e,o);return this.isScaledSpacePointVisible(i)},t.prototype.isScaledSpacePointVisible=function(e){var i=this._cameraPositionInScaledSpace,t=this._distanceToLimbInScaledSpaceSquared,a=m.Cartesian3.subtract(e,i,o),n=-m.Cartesian3.dot(a,i);return!(t<0?0<n:t<n&&n*n/m.Cartesian3.magnitudeSquared(a)>t)},t.prototype.computeHorizonCullingPoint=function(e,i,t){p.Check.typeOf.object("directionToPoint",e),p.Check.defined("positions",i),u.defined(t)||(t=new m.Cartesian3);for(var a=this._ellipsoid,n=P(a,e),r=0,o=0,s=i.length;o<s;++o){var c=h(a,i[o],n);r=Math.max(r,c)}return S(n,r,t)};var C=new m.Cartesian3;t.prototype.computeHorizonCullingPointFromVertices=function(e,i,t,a,n){p.Check.typeOf.object("directionToPoint",e),p.Check.defined("vertices",i),p.Check.typeOf.number("stride",t),u.defined(n)||(n=new m.Cartesian3),a=f.defaultValue(a,m.Cartesian3.ZERO);for(var r=this._ellipsoid,o=P(r,e),s=0,c=0,d=i.length;c<d;c+=t){C.x=i[c]+a.x,C.y=i[c+1]+a.y,C.z=i[c+2]+a.z;var l=h(r,C,o);s=Math.max(s,l)}return S(o,s,n)};var s=[];t.prototype.computeHorizonCullingPointFromRectangle=function(e,i,t){p.Check.typeOf.object("rectangle",e);var a=m.Rectangle.subsample(e,i,0,s),n=r.BoundingSphere.fromPoints(a);if(!(m.Cartesian3.magnitude(n.center)<.1*i.minimumRadius))return this.computeHorizonCullingPoint(n.center,a,t)};var c=new m.Cartesian3,d=new m.Cartesian3;function h(e,i,t){var a=e.transformPositionToScaledSpace(i,c),n=m.Cartesian3.magnitudeSquared(a),r=Math.sqrt(n),o=m.Cartesian3.divideByScalar(a,r,d);n=Math.max(1,n);var s=1/(r=Math.max(1,r));return 1/(m.Cartesian3.dot(o,t)*s-m.Cartesian3.magnitude(m.Cartesian3.cross(o,t,o))*(Math.sqrt(n-1)*s))}function S(e,i,t){if(!(i<=0||i===1/0||i!=i))return m.Cartesian3.multiplyByScalar(e,i,t)}var a=new m.Cartesian3;function P(e,i){return m.Cartesian3.equals(i,m.Cartesian3.ZERO)?i:(e.transformPositionToScaledSpace(i,a),m.Cartesian3.normalize(a,a))}e.EllipsoidalOccluder=t});
