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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./GeometryOffsetAttribute-5aa2ee88"],function(c,o,e,u,t,d,n,y,a,r,p,b,i,C,l){"use strict";var h=new d.Cartesian3;function s(e){var t=(e=u.defaultValue(e,u.defaultValue.EMPTY_OBJECT)).minimum,n=e.maximum;if(o.Check.typeOf.object("min",t),o.Check.typeOf.object("max",n),c.defined(e.offsetAttribute)&&e.offsetAttribute===l.GeometryOffsetAttribute.TOP)throw new o.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._min=d.Cartesian3.clone(t),this._max=d.Cartesian3.clone(n),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}s.fromDimensions=function(e){var t=(e=u.defaultValue(e,u.defaultValue.EMPTY_OBJECT)).dimensions;o.Check.typeOf.object("dimensions",t),o.Check.typeOf.number.greaterThanOrEquals("dimensions.x",t.x,0),o.Check.typeOf.number.greaterThanOrEquals("dimensions.y",t.y,0),o.Check.typeOf.number.greaterThanOrEquals("dimensions.z",t.z,0);var n=d.Cartesian3.multiplyByScalar(t,.5,new d.Cartesian3);return new s({minimum:d.Cartesian3.negate(n,new d.Cartesian3),maximum:n,offsetAttribute:e.offsetAttribute})},s.fromAxisAlignedBoundingBox=function(e){return o.Check.typeOf.object("boundindBox",e),new s({minimum:e.minimum,maximum:e.maximum})},s.packedLength=2*d.Cartesian3.packedLength+1,s.pack=function(e,t,n){return o.Check.typeOf.object("value",e),o.Check.defined("array",t),n=u.defaultValue(n,0),d.Cartesian3.pack(e._min,t,n),d.Cartesian3.pack(e._max,t,n+d.Cartesian3.packedLength),t[n+2*d.Cartesian3.packedLength]=u.defaultValue(e._offsetAttribute,-1),t};var f=new d.Cartesian3,m=new d.Cartesian3,A={minimum:f,maximum:m,offsetAttribute:void 0};return s.unpack=function(e,t,n){o.Check.defined("array",e),t=u.defaultValue(t,0);var a=d.Cartesian3.unpack(e,t,f),r=d.Cartesian3.unpack(e,t+d.Cartesian3.packedLength,m),i=e[t+2*d.Cartesian3.packedLength];return c.defined(n)?(n._min=d.Cartesian3.clone(a,n._min),n._max=d.Cartesian3.clone(r,n._max),n._offsetAttribute=-1===i?void 0:i,n):(A.offsetAttribute=-1===i?void 0:i,new s(A))},s.createGeometry=function(e){var t=e._min,n=e._max;if(!d.Cartesian3.equals(t,n)){var a=new C.GeometryAttributes,r=new Uint16Array(24),i=new Float64Array(24);i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=n.x,i[4]=t.y,i[5]=t.z,i[6]=n.x,i[7]=n.y,i[8]=t.z,i[9]=t.x,i[10]=n.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=n.z,i[15]=n.x,i[16]=t.y,i[17]=n.z,i[18]=n.x,i[19]=n.y,i[20]=n.z,i[21]=t.x,i[22]=n.y,i[23]=n.z,a.position=new b.GeometryAttribute({componentDatatype:p.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:i}),r[0]=4,r[1]=5,r[2]=5,r[3]=6,r[4]=6,r[5]=7,r[6]=7,r[7]=4,r[8]=0,r[9]=1,r[10]=1,r[11]=2,r[12]=2,r[13]=3,r[14]=3,r[15]=0,r[16]=0,r[17]=4,r[18]=1,r[19]=5,r[20]=2,r[21]=6,r[22]=3,r[23]=7;var o=d.Cartesian3.subtract(n,t,h),u=.5*d.Cartesian3.magnitude(o);if(c.defined(e._offsetAttribute)){var s=i.length,f=new Uint8Array(s/3),m=e._offsetAttribute===l.GeometryOffsetAttribute.NONE?0:1;l.arrayFill(f,m),a.applyOffset=new b.GeometryAttribute({componentDatatype:p.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:f})}return new b.Geometry({attributes:a,indices:r,primitiveType:b.PrimitiveType.LINES,boundingSphere:new y.BoundingSphere(d.Cartesian3.ZERO,u),offsetAttribute:e._offsetAttribute})}},function(e,t){return c.defined(t)&&(e=s.unpack(e,t)),s.createGeometry(e)}});
