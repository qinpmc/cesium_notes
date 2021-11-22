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
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./Math-2145e044","./Cartesian2-40ed5530","./Transforms-94513c2d","./GeometryAttribute-4754007e"],function(t,Y,x,P,W,n,R){"use strict";var v=Math.cos,O=Math.sin,p=Math.sqrt,a={computePosition:function(t,n,a,r,e,o,s){var i=n.radiiSquared,h=t.nwCorner,g=t.boundingRectangle,u=h.latitude-t.granYCos*r+e*t.granXSin,C=v(u),c=O(u),l=i.z*c,d=h.longitude+r*t.granYSin+e*t.granXCos,M=C*v(d),S=C*O(d),w=i.x*M,m=i.y*S,f=p(w*M+m*S+l*c);if(o.x=w/f,o.y=m/f,o.z=l/f,a){var X=t.stNwCorner;Y.defined(X)?(u=X.latitude-t.stGranYCos*r+e*t.stGranXSin,d=X.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(d-t.stWest)*t.lonScalar,s.y=(u-t.stSouth)*t.latScalar):(s.x=(d-g.west)*t.lonScalar,s.y=(u-g.south)*t.latScalar)}}},_=new R.Matrix2,G=new W.Cartesian3,y=new W.Cartographic,I=new W.Cartesian3,T=new n.GeographicProjection;function E(t,n,a,r,e,o,s){var i=Math.cos(n),h=r*i,g=a*i,u=Math.sin(n),C=r*u,c=a*u;G=T.project(t,G),G=W.Cartesian3.subtract(G,I,G);var l=R.Matrix2.fromRotation(n,_);G=R.Matrix2.multiplyByVector(l,G,G),G=W.Cartesian3.add(G,I,G),--o,--s;var d=(t=T.unproject(G,t)).latitude,M=d+o*c,S=d-h*s,w=d-h*s+o*c,m=Math.max(d,M,S,w),f=Math.min(d,M,S,w),X=t.longitude,Y=X+o*g,v=X+s*C,O=X+s*C+o*g;return{north:m,south:f,east:Math.max(X,Y,v,O),west:Math.min(X,Y,v,O),granYCos:h,granYSin:C,granXCos:g,granXSin:c,nwCorner:t}}a.computeOptions=function(t,n,a,r,e,o,s){var i,h,g,u,C,c=t.east,l=t.west,d=t.north,M=t.south,S=!1,w=!1;d===P.CesiumMath.PI_OVER_TWO&&(S=!0),M===-P.CesiumMath.PI_OVER_TWO&&(w=!0);var m=d-M;g=(C=c<l?P.CesiumMath.TWO_PI-l+c:c-l)/((i=Math.ceil(C/n)+1)-1),u=m/((h=Math.ceil(m/n)+1)-1);var f=W.Rectangle.northwest(t,o),X=W.Rectangle.center(t,y);0===a&&0===r||(X.longitude<f.longitude&&(X.longitude+=P.CesiumMath.TWO_PI),I=T.project(X,I));var Y=u,v=g,O=W.Rectangle.clone(t,e),R={granYCos:Y,granYSin:0,granXCos:v,granXSin:0,nwCorner:f,boundingRectangle:O,width:i,height:h,northCap:S,southCap:w};if(0!==a){var p=E(f,a,g,u,0,i,h);if(d=p.north,M=p.south,c=p.east,l=p.west,d<-P.CesiumMath.PI_OVER_TWO||d>P.CesiumMath.PI_OVER_TWO||M<-P.CesiumMath.PI_OVER_TWO||M>P.CesiumMath.PI_OVER_TWO)throw new x.DeveloperError("Rotated rectangle is invalid.  It crosses over either the north or south pole.");R.granYCos=p.granYCos,R.granYSin=p.granYSin,R.granXCos=p.granXCos,R.granXSin=p.granXSin,O.north=d,O.south=M,O.east=c,O.west=l}if(0!==r){a-=r;var _=W.Rectangle.northwest(O,s),G=E(_,a,g,u,0,i,h);R.stGranYCos=G.granYCos,R.stGranXCos=G.granXCos,R.stGranYSin=G.granYSin,R.stGranXSin=G.granXSin,R.stNwCorner=_,R.stWest=G.west,R.stSouth=G.south}return R},t.RectangleGeometryLibrary=a});
