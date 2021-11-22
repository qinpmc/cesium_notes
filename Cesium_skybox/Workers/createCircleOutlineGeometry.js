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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./IndexDatatype-668aa2f9","./GeometryOffsetAttribute-5aa2ee88","./EllipseGeometryLibrary-adc347fa","./EllipseOutlineGeometry-78291aef"],function(l,r,e,n,i,a,t,s,o,d,u,c,m,p,y,f,G,h){"use strict";function _(e){var i=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).radius;r.Check.typeOf.number("radius",i);var t={center:e.center,semiMajorAxis:i,semiMinorAxis:i,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new h.EllipseOutlineGeometry(t),this._workerName="createCircleOutlineGeometry"}_.packedLength=h.EllipseOutlineGeometry.packedLength,_.pack=function(e,i,t){return r.Check.typeOf.object("value",e),h.EllipseOutlineGeometry.pack(e._ellipseGeometry,i,t)};var O=new h.EllipseOutlineGeometry({center:new a.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),b={center:new a.Cartesian3,radius:void 0,ellipsoid:a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return _.unpack=function(e,i,t){var r=h.EllipseOutlineGeometry.unpack(e,i,O);return b.center=a.Cartesian3.clone(r._center,b.center),b.ellipsoid=a.Ellipsoid.clone(r._ellipsoid,b.ellipsoid),b.height=r._height,b.extrudedHeight=r._extrudedHeight,b.granularity=r._granularity,b.numberOfVerticalLines=r._numberOfVerticalLines,l.defined(t)?(b.semiMajorAxis=r._semiMajorAxis,b.semiMinorAxis=r._semiMinorAxis,t._ellipseGeometry=new h.EllipseOutlineGeometry(b),t):(b.radius=r._semiMajorAxis,new _(b))},_.createGeometry=function(e){return h.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(e,i){return l.defined(i)&&(e=_.unpack(e,i)),e._ellipseGeometry._center=a.Cartesian3.clone(e._ellipseGeometry._center),e._ellipseGeometry._ellipsoid=a.Ellipsoid.clone(e._ellipseGeometry._ellipsoid),_.createGeometry(e)}});
