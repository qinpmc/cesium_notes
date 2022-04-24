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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./IndexDatatype-668aa2f9","./GeometryOffsetAttribute-5aa2ee88","./CylinderGeometryLibrary-c0d72f53"],function(_,f,e,d,t,A,i,O,r,a,v,C,o,R,G,V,g){"use strict";var k=new A.Cartesian2;function b(e){var t=(e=d.defaultValue(e,d.defaultValue.EMPTY_OBJECT)).length,i=e.topRadius,r=e.bottomRadius,a=d.defaultValue(e.slices,128),o=Math.max(d.defaultValue(e.numberOfVerticalLines,16),0);if(f.Check.typeOf.number("options.positions",t),f.Check.typeOf.number("options.topRadius",i),f.Check.typeOf.number("options.bottomRadius",r),f.Check.typeOf.number.greaterThanOrEquals("options.slices",a,3),_.defined(e.offsetAttribute)&&e.offsetAttribute===V.GeometryOffsetAttribute.TOP)throw new f.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._length=t,this._topRadius=i,this._bottomRadius=r,this._slices=a,this._numberOfVerticalLines=o,this._offsetAttribute=e.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}b.packedLength=6,b.pack=function(e,t,i){return f.Check.typeOf.object("value",e),f.Check.defined("array",t),i=d.defaultValue(i,0),t[i++]=e._length,t[i++]=e._topRadius,t[i++]=e._bottomRadius,t[i++]=e._slices,t[i++]=e._numberOfVerticalLines,t[i]=d.defaultValue(e._offsetAttribute,-1),t};var c={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return b.unpack=function(e,t,i){f.Check.defined("array",e),t=d.defaultValue(t,0);var r=e[t++],a=e[t++],o=e[t++],n=e[t++],s=e[t++],u=e[t];return _.defined(i)?(i._length=r,i._topRadius=a,i._bottomRadius=o,i._slices=n,i._numberOfVerticalLines=s,i._offsetAttribute=-1===u?void 0:u,i):(c.length=r,c.topRadius=a,c.bottomRadius=o,c.slices=n,c.numberOfVerticalLines=s,c.offsetAttribute=-1===u?void 0:u,new b(c))},b.createGeometry=function(e){var t=e._length,i=e._topRadius,r=e._bottomRadius,a=e._slices,o=e._numberOfVerticalLines;if(!(t<=0||i<0||r<0||0===i&&0===r)){var n,s=2*a,u=g.CylinderGeometryLibrary.computePositions(t,i,r,a,!1),f=2*a;if(0<o){var d=Math.min(o,a);n=Math.round(a/d),f+=d}var b,c=G.IndexDatatype.createTypedArray(s,2*f),m=0;for(b=0;b<a-1;b++)c[m++]=b,c[m++]=b+1,c[m++]=b+a,c[m++]=b+1+a;if(c[m++]=a-1,c[m++]=0,c[m++]=a+a-1,c[m++]=a,0<o)for(b=0;b<a;b+=n)c[m++]=b,c[m++]=b+a;var l=new R.GeometryAttributes;l.position=new C.GeometryAttribute({componentDatatype:v.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),k.x=.5*t,k.y=Math.max(r,i);var p=new O.BoundingSphere(A.Cartesian3.ZERO,A.Cartesian2.magnitude(k));if(_.defined(e._offsetAttribute)){t=u.length;var y=new Uint8Array(t/3),h=e._offsetAttribute===V.GeometryOffsetAttribute.NONE?0:1;V.arrayFill(y,h),l.applyOffset=new C.GeometryAttribute({componentDatatype:v.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:y})}return new C.Geometry({attributes:l,indices:c,primitiveType:C.PrimitiveType.LINES,boundingSphere:p,offsetAttribute:e._offsetAttribute})}},function(e,t){return _.defined(t)&&(e=b.unpack(e,t)),b.createGeometry(e)}});
