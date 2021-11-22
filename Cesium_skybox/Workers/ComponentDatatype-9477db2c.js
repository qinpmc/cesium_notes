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
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./WebGLConstants-554ddbe2"],function(e,a,E,r,N,n){"use strict";var T={BYTE:n.WebGLConstants.BYTE,UNSIGNED_BYTE:n.WebGLConstants.UNSIGNED_BYTE,SHORT:n.WebGLConstants.SHORT,UNSIGNED_SHORT:n.WebGLConstants.UNSIGNED_SHORT,INT:n.WebGLConstants.INT,UNSIGNED_INT:n.WebGLConstants.UNSIGNED_INT,FLOAT:n.WebGLConstants.FLOAT,DOUBLE:n.WebGLConstants.DOUBLE,getSizeInBytes:function(e){if(!a.defined(e))throw new E.DeveloperError("value is required.");switch(e){case T.BYTE:return Int8Array.BYTES_PER_ELEMENT;case T.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case T.SHORT:return Int16Array.BYTES_PER_ELEMENT;case T.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case T.INT:return Int32Array.BYTES_PER_ELEMENT;case T.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;case T.FLOAT:return Float32Array.BYTES_PER_ELEMENT;case T.DOUBLE:return Float64Array.BYTES_PER_ELEMENT;default:throw new E.DeveloperError("componentDatatype is not a valid value.")}},fromTypedArray:function(e){return e instanceof Int8Array?T.BYTE:e instanceof Uint8Array?T.UNSIGNED_BYTE:e instanceof Int16Array?T.SHORT:e instanceof Uint16Array?T.UNSIGNED_SHORT:e instanceof Int32Array?T.INT:e instanceof Uint32Array?T.UNSIGNED_INT:e instanceof Float32Array?T.FLOAT:e instanceof Float64Array?T.DOUBLE:void 0},validate:function(e){return a.defined(e)&&(e===T.BYTE||e===T.UNSIGNED_BYTE||e===T.SHORT||e===T.UNSIGNED_SHORT||e===T.INT||e===T.UNSIGNED_INT||e===T.FLOAT||e===T.DOUBLE)},createTypedArray:function(e,r){if(!a.defined(e))throw new E.DeveloperError("componentDatatype is required.");if(!a.defined(r))throw new E.DeveloperError("valuesOrLength is required.");switch(e){case T.BYTE:return new Int8Array(r);case T.UNSIGNED_BYTE:return new Uint8Array(r);case T.SHORT:return new Int16Array(r);case T.UNSIGNED_SHORT:return new Uint16Array(r);case T.INT:return new Int32Array(r);case T.UNSIGNED_INT:return new Uint32Array(r);case T.FLOAT:return new Float32Array(r);case T.DOUBLE:return new Float64Array(r);default:throw new E.DeveloperError("componentDatatype is not a valid value.")}},createArrayBufferView:function(e,r,n,t){if(!a.defined(e))throw new E.DeveloperError("componentDatatype is required.");if(!a.defined(r))throw new E.DeveloperError("buffer is required.");switch(n=N.defaultValue(n,0),t=N.defaultValue(t,(r.byteLength-n)/T.getSizeInBytes(e)),e){case T.BYTE:return new Int8Array(r,n,t);case T.UNSIGNED_BYTE:return new Uint8Array(r,n,t);case T.SHORT:return new Int16Array(r,n,t);case T.UNSIGNED_SHORT:return new Uint16Array(r,n,t);case T.INT:return new Int32Array(r,n,t);case T.UNSIGNED_INT:return new Uint32Array(r,n,t);case T.FLOAT:return new Float32Array(r,n,t);case T.DOUBLE:return new Float64Array(r,n,t);default:throw new E.DeveloperError("componentDatatype is not a valid value.")}},fromName:function(e){switch(e){case"BYTE":return T.BYTE;case"UNSIGNED_BYTE":return T.UNSIGNED_BYTE;case"SHORT":return T.SHORT;case"UNSIGNED_SHORT":return T.UNSIGNED_SHORT;case"INT":return T.INT;case"UNSIGNED_INT":return T.UNSIGNED_INT;case"FLOAT":return T.FLOAT;case"DOUBLE":return T.DOUBLE;default:throw new E.DeveloperError("name is not a valid value.")}}},t=r.freezeObject(T);e.ComponentDatatype=t});
