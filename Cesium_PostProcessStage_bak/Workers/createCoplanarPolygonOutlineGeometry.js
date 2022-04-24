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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./AttributeCompression-a7396e6f","./GeometryPipeline-bd87b3b1","./EncodedCartesian3-e7615897","./IndexDatatype-668aa2f9","./IntersectionTests-f6d27a39","./Plane-297770b0","./GeometryInstance-02cd2d29","./arrayRemoveDuplicates-32bbc2e4","./EllipsoidTangentPlane-1ba7ce65","./OrientedBoundingBox-d258fabd","./CoplanarPolygonGeometryLibrary-081c9c70","./ArcType-c72d871a","./EllipsoidRhumbLine-d5ed1c3f","./PolygonPipeline-eaa2424e","./PolygonGeometryLibrary-4d2d35e1"],function(i,a,e,y,t,l,r,d,n,o,p,s,c,u,f,m,b,g,h,P,v,G,C,k,L,T,E,H,w){"use strict";function A(e){for(var t=e.length,r=new Float64Array(3*t),n=g.IndexDatatype.createTypedArray(t,2*t),o=0,i=0,a=0;a<t;a++){var y=e[a];r[o++]=y.x,r[o++]=y.y,r[o++]=y.z,n[i++]=a,n[i++]=(a+1)%t}var c=new u.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:p.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r})});return new s.Geometry({attributes:c,indices:n,primitiveType:s.PrimitiveType.LINES})}function I(e){var t=(e=y.defaultValue(e,y.defaultValue.EMPTY_OBJECT)).polygonHierarchy;a.Check.defined("options.polygonHierarchy",t),this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=w.PolygonGeometryLibrary.computeHierarchyPackedLength(t)+1}I.fromPositions=function(e){return e=y.defaultValue(e,y.defaultValue.EMPTY_OBJECT),a.Check.defined("options.positions",e.positions),new I({polygonHierarchy:{positions:e.positions}})},I.pack=function(e,t,r){return a.Check.typeOf.object("value",e),a.Check.defined("array",t),r=y.defaultValue(r,0),t[r=w.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r)]=e.packedLength,t};var O={polygonHierarchy:{}};return I.unpack=function(e,t,r){a.Check.defined("array",e),t=y.defaultValue(t,0);var n=w.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=n.startingIndex,delete n.startingIndex;var o=e[t];return i.defined(r)||(r=new I(O)),r._polygonHierarchy=n,r.packedLength=o,r},I.createGeometry=function(e){var t=e._polygonHierarchy,r=t.positions;if(!((r=G.arrayRemoveDuplicates(r,l.Cartesian3.equalsEpsilon,!0)).length<3)&&L.CoplanarPolygonGeometryLibrary.validOutline(r)){var n=w.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t,!1);if(0!==n.length){for(var o=[],i=0;i<n.length;i++){var a=new v.GeometryInstance({geometry:A(n[i])});o.push(a)}var y=m.GeometryPipeline.combineInstances(o)[0],c=d.BoundingSphere.fromPoints(t.positions);return new s.Geometry({attributes:y.attributes,indices:y.indices,primitiveType:y.primitiveType,boundingSphere:c})}}},function(e,t){return i.defined(t)&&(e=I.unpack(e,t)),e._ellipsoid=l.Ellipsoid.clone(e._ellipsoid),I.createGeometry(e)}});
