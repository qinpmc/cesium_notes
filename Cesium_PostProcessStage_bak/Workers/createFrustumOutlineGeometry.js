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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./Plane-297770b0","./VertexFormat-61bc2255","./FrustumGeometry-c2369916"],function(s,p,e,m,t,f,r,d,n,a,h,k,i,g,u,o,y){"use strict";var _=0,c=1;function l(e){p.Check.typeOf.object("options",e),p.Check.typeOf.object("options.frustum",e.frustum),p.Check.typeOf.object("options.origin",e.origin),p.Check.typeOf.object("options.orientation",e.orientation);var t,r,n=e.frustum,a=e.orientation,i=e.origin,u=m.defaultValue(e._drawNearPlane,!0);n instanceof y.PerspectiveFrustum?(t=_,r=y.PerspectiveFrustum.packedLength):n instanceof y.OrthographicFrustum&&(t=c,r=y.OrthographicFrustum.packedLength),this._frustumType=t,this._frustum=n.clone(),this._origin=f.Cartesian3.clone(i),this._orientation=d.Quaternion.clone(a),this._drawNearPlane=u,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+r+f.Cartesian3.packedLength+d.Quaternion.packedLength}l.pack=function(e,t,r){p.Check.typeOf.object("value",e),p.Check.defined("array",t),r=m.defaultValue(r,0);var n=e._frustumType,a=e._frustum;return(t[r++]=n)===_?(y.PerspectiveFrustum.pack(a,t,r),r+=y.PerspectiveFrustum.packedLength):(y.OrthographicFrustum.pack(a,t,r),r+=y.OrthographicFrustum.packedLength),f.Cartesian3.pack(e._origin,t,r),r+=f.Cartesian3.packedLength,d.Quaternion.pack(e._orientation,t,r),t[r+=d.Quaternion.packedLength]=e._drawNearPlane?1:0,t};var v=new y.PerspectiveFrustum,b=new y.OrthographicFrustum,C=new d.Quaternion,F=new f.Cartesian3;return l.unpack=function(e,t,r){p.Check.defined("array",e),t=m.defaultValue(t,0);var n,a=e[t++];a===_?(n=y.PerspectiveFrustum.unpack(e,t,v),t+=y.PerspectiveFrustum.packedLength):(n=y.OrthographicFrustum.unpack(e,t,b),t+=y.OrthographicFrustum.packedLength);var i=f.Cartesian3.unpack(e,t,F);t+=f.Cartesian3.packedLength;var u=d.Quaternion.unpack(e,t,C),o=1===e[t+=d.Quaternion.packedLength];if(!s.defined(r))return new l({frustum:n,origin:i,orientation:u,_drawNearPlane:o});var c=a===r._frustumType?r._frustum:void 0;return r._frustum=n.clone(c),r._frustumType=a,r._origin=f.Cartesian3.clone(i,r._origin),r._orientation=d.Quaternion.clone(u,r._orientation),r._drawNearPlane=o,r},l.createGeometry=function(e){var t=e._frustumType,r=e._frustum,n=e._origin,a=e._orientation,i=e._drawNearPlane,u=new Float64Array(24);y.FrustumGeometry._computeNearFarPlanes(n,a,t,r,u);for(var o,c,s=new g.GeometryAttributes({position:new k.GeometryAttribute({componentDatatype:h.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u})}),p=i?2:1,m=new Uint16Array(8*(1+p)),f=i?0:1;f<2;++f)c=4*f,m[o=i?8*f:0]=c,m[o+1]=c+1,m[o+2]=c+1,m[o+3]=c+2,m[o+4]=c+2,m[o+5]=c+3,m[o+6]=c+3,m[o+7]=c;for(f=0;f<2;++f)c=4*f,m[o=8*(p+f)]=c,m[o+1]=c+4,m[o+2]=c+1,m[o+3]=c+5,m[o+4]=c+2,m[o+5]=c+6,m[o+6]=c+3,m[o+7]=c+7;return new k.Geometry({attributes:s,indices:m,primitiveType:k.PrimitiveType.LINES,boundingSphere:d.BoundingSphere.fromVertices(u)})},function(e,t){return s.defined(t)&&(e=l.unpack(e,t)),l.createGeometry(e)}});
