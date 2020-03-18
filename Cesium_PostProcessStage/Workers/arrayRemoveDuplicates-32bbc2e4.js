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
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./defaultValue-199f5aa8","./Math-2145e044"],function(e,l,s,h,f){"use strict";var d=f.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,f,t){if(s.Check.defined("equalsEpsilon",f),l.defined(e)){t=h.defaultValue(t,!1);var i,n,a,r=e.length;if(r<2)return e;for(i=1;i<r&&!f(n=e[i-1],a=e[i],d);++i);if(i===r)return t&&f(e[0],e[e.length-1],d)?e.slice(1):e;for(var u=e.slice(0,i);i<r;++i)f(n,a=e[i],d)||(u.push(a),n=a);return t&&1<u.length&&f(u[0],u[u.length-1],d)&&u.shift(),u}}});
