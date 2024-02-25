/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.exonum = (function() {
    
        /**
         * Namespace exonum.
         * @exports exonum
         * @namespace
         */
        var exonum = {};
    
        exonum.common = (function() {
    
            /**
             * Namespace common.
             * @memberof exonum
             * @namespace
             */
            var common = {};
    
            common.BitVec = (function() {
    
                /**
                 * Properties of a BitVec.
                 * @memberof exonum.common
                 * @interface IBitVec
                 * @property {Uint8Array|null} [data] BitVec data
                 * @property {number|Long|null} [len] BitVec len
                 */
    
                /**
                 * Constructs a new BitVec.
                 * @memberof exonum.common
                 * @classdesc Represents a BitVec.
                 * @implements IBitVec
                 * @constructor
                 * @param {exonum.common.IBitVec=} [properties] Properties to set
                 */
                function BitVec(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * BitVec data.
                 * @member {Uint8Array} data
                 * @memberof exonum.common.BitVec
                 * @instance
                 */
                BitVec.prototype.data = $util.newBuffer([]);
    
                /**
                 * BitVec len.
                 * @member {number|Long} len
                 * @memberof exonum.common.BitVec
                 * @instance
                 */
                BitVec.prototype.len = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
                /**
                 * Creates a new BitVec instance using the specified properties.
                 * @function create
                 * @memberof exonum.common.BitVec
                 * @static
                 * @param {exonum.common.IBitVec=} [properties] Properties to set
                 * @returns {exonum.common.BitVec} BitVec instance
                 */
                BitVec.create = function create(properties) {
                    return new BitVec(properties);
                };
    
                /**
                 * Encodes the specified BitVec message. Does not implicitly {@link exonum.common.BitVec.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.common.BitVec
                 * @static
                 * @param {exonum.common.IBitVec} message BitVec message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BitVec.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.data != null && message.hasOwnProperty("data"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                    if (message.len != null && message.hasOwnProperty("len"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.len);
                    return writer;
                };
    
                /**
                 * Encodes the specified BitVec message, length delimited. Does not implicitly {@link exonum.common.BitVec.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.common.BitVec
                 * @static
                 * @param {exonum.common.IBitVec} message BitVec message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BitVec.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a BitVec message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.common.BitVec
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.common.BitVec} BitVec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BitVec.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.common.BitVec();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.data = reader.bytes();
                            break;
                        case 2:
                            message.len = reader.uint64();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a BitVec message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.common.BitVec
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.common.BitVec} BitVec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BitVec.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a BitVec message.
                 * @function verify
                 * @memberof exonum.common.BitVec
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                BitVec.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.data != null && message.hasOwnProperty("data"))
                        if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                            return "data: buffer expected";
                    if (message.len != null && message.hasOwnProperty("len"))
                        if (!$util.isInteger(message.len) && !(message.len && $util.isInteger(message.len.low) && $util.isInteger(message.len.high)))
                            return "len: integer|Long expected";
                    return null;
                };
    
                /**
                 * Creates a BitVec message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.common.BitVec
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.common.BitVec} BitVec
                 */
                BitVec.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.common.BitVec)
                        return object;
                    var message = new $root.exonum.common.BitVec();
                    if (object.data != null)
                        if (typeof object.data === "string")
                            $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                        else if (object.data.length)
                            message.data = object.data;
                    if (object.len != null)
                        if ($util.Long)
                            (message.len = $util.Long.fromValue(object.len)).unsigned = true;
                        else if (typeof object.len === "string")
                            message.len = parseInt(object.len, 10);
                        else if (typeof object.len === "number")
                            message.len = object.len;
                        else if (typeof object.len === "object")
                            message.len = new $util.LongBits(object.len.low >>> 0, object.len.high >>> 0).toNumber(true);
                    return message;
                };
    
                /**
                 * Creates a plain object from a BitVec message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.common.BitVec
                 * @static
                 * @param {exonum.common.BitVec} message BitVec
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                BitVec.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.data = "";
                        else {
                            object.data = [];
                            if (options.bytes !== Array)
                                object.data = $util.newBuffer(object.data);
                        }
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, true);
                            object.len = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.len = options.longs === String ? "0" : 0;
                    }
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                    if (message.len != null && message.hasOwnProperty("len"))
                        if (typeof message.len === "number")
                            object.len = options.longs === String ? String(message.len) : message.len;
                        else
                            object.len = options.longs === String ? $util.Long.prototype.toString.call(message.len) : options.longs === Number ? new $util.LongBits(message.len.low >>> 0, message.len.high >>> 0).toNumber(true) : message.len;
                    return object;
                };
    
                /**
                 * Converts this BitVec to JSON.
                 * @function toJSON
                 * @memberof exonum.common.BitVec
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                BitVec.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return BitVec;
            })();
    
            return common;
        })();
    
        exonum.crypto = (function() {
    
            /**
             * Namespace crypto.
             * @memberof exonum
             * @namespace
             */
            var crypto = {};
    
            crypto.Hash = (function() {
    
                /**
                 * Properties of a Hash.
                 * @memberof exonum.crypto
                 * @interface IHash
                 * @property {Uint8Array|null} [data] Hash data
                 */
    
                /**
                 * Constructs a new Hash.
                 * @memberof exonum.crypto
                 * @classdesc Represents a Hash.
                 * @implements IHash
                 * @constructor
                 * @param {exonum.crypto.IHash=} [properties] Properties to set
                 */
                function Hash(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Hash data.
                 * @member {Uint8Array} data
                 * @memberof exonum.crypto.Hash
                 * @instance
                 */
                Hash.prototype.data = $util.newBuffer([]);
    
                /**
                 * Creates a new Hash instance using the specified properties.
                 * @function create
                 * @memberof exonum.crypto.Hash
                 * @static
                 * @param {exonum.crypto.IHash=} [properties] Properties to set
                 * @returns {exonum.crypto.Hash} Hash instance
                 */
                Hash.create = function create(properties) {
                    return new Hash(properties);
                };
    
                /**
                 * Encodes the specified Hash message. Does not implicitly {@link exonum.crypto.Hash.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.crypto.Hash
                 * @static
                 * @param {exonum.crypto.IHash} message Hash message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Hash.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.data != null && message.hasOwnProperty("data"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                    return writer;
                };
    
                /**
                 * Encodes the specified Hash message, length delimited. Does not implicitly {@link exonum.crypto.Hash.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.crypto.Hash
                 * @static
                 * @param {exonum.crypto.IHash} message Hash message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Hash.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Hash message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.crypto.Hash
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.crypto.Hash} Hash
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Hash.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.crypto.Hash();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.data = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Hash message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.crypto.Hash
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.crypto.Hash} Hash
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Hash.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Hash message.
                 * @function verify
                 * @memberof exonum.crypto.Hash
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Hash.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.data != null && message.hasOwnProperty("data"))
                        if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                            return "data: buffer expected";
                    return null;
                };
    
                /**
                 * Creates a Hash message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.crypto.Hash
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.crypto.Hash} Hash
                 */
                Hash.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.crypto.Hash)
                        return object;
                    var message = new $root.exonum.crypto.Hash();
                    if (object.data != null)
                        if (typeof object.data === "string")
                            $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                        else if (object.data.length)
                            message.data = object.data;
                    return message;
                };
    
                /**
                 * Creates a plain object from a Hash message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.crypto.Hash
                 * @static
                 * @param {exonum.crypto.Hash} message Hash
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Hash.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if (options.bytes === String)
                            object.data = "";
                        else {
                            object.data = [];
                            if (options.bytes !== Array)
                                object.data = $util.newBuffer(object.data);
                        }
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                    return object;
                };
    
                /**
                 * Converts this Hash to JSON.
                 * @function toJSON
                 * @memberof exonum.crypto.Hash
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Hash.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Hash;
            })();
    
            crypto.PublicKey = (function() {
    
                /**
                 * Properties of a PublicKey.
                 * @memberof exonum.crypto
                 * @interface IPublicKey
                 * @property {Uint8Array|null} [data] PublicKey data
                 */
    
                /**
                 * Constructs a new PublicKey.
                 * @memberof exonum.crypto
                 * @classdesc Represents a PublicKey.
                 * @implements IPublicKey
                 * @constructor
                 * @param {exonum.crypto.IPublicKey=} [properties] Properties to set
                 */
                function PublicKey(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * PublicKey data.
                 * @member {Uint8Array} data
                 * @memberof exonum.crypto.PublicKey
                 * @instance
                 */
                PublicKey.prototype.data = $util.newBuffer([]);
    
                /**
                 * Creates a new PublicKey instance using the specified properties.
                 * @function create
                 * @memberof exonum.crypto.PublicKey
                 * @static
                 * @param {exonum.crypto.IPublicKey=} [properties] Properties to set
                 * @returns {exonum.crypto.PublicKey} PublicKey instance
                 */
                PublicKey.create = function create(properties) {
                    return new PublicKey(properties);
                };
    
                /**
                 * Encodes the specified PublicKey message. Does not implicitly {@link exonum.crypto.PublicKey.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.crypto.PublicKey
                 * @static
                 * @param {exonum.crypto.IPublicKey} message PublicKey message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PublicKey.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.data != null && message.hasOwnProperty("data"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                    return writer;
                };
    
                /**
                 * Encodes the specified PublicKey message, length delimited. Does not implicitly {@link exonum.crypto.PublicKey.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.crypto.PublicKey
                 * @static
                 * @param {exonum.crypto.IPublicKey} message PublicKey message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PublicKey.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a PublicKey message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.crypto.PublicKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.crypto.PublicKey} PublicKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PublicKey.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.crypto.PublicKey();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.data = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a PublicKey message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.crypto.PublicKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.crypto.PublicKey} PublicKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PublicKey.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a PublicKey message.
                 * @function verify
                 * @memberof exonum.crypto.PublicKey
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PublicKey.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.data != null && message.hasOwnProperty("data"))
                        if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                            return "data: buffer expected";
                    return null;
                };
    
                /**
                 * Creates a PublicKey message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.crypto.PublicKey
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.crypto.PublicKey} PublicKey
                 */
                PublicKey.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.crypto.PublicKey)
                        return object;
                    var message = new $root.exonum.crypto.PublicKey();
                    if (object.data != null)
                        if (typeof object.data === "string")
                            $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                        else if (object.data.length)
                            message.data = object.data;
                    return message;
                };
    
                /**
                 * Creates a plain object from a PublicKey message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.crypto.PublicKey
                 * @static
                 * @param {exonum.crypto.PublicKey} message PublicKey
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PublicKey.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if (options.bytes === String)
                            object.data = "";
                        else {
                            object.data = [];
                            if (options.bytes !== Array)
                                object.data = $util.newBuffer(object.data);
                        }
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                    return object;
                };
    
                /**
                 * Converts this PublicKey to JSON.
                 * @function toJSON
                 * @memberof exonum.crypto.PublicKey
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PublicKey.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return PublicKey;
            })();
    
            crypto.Signature = (function() {
    
                /**
                 * Properties of a Signature.
                 * @memberof exonum.crypto
                 * @interface ISignature
                 * @property {Uint8Array|null} [data] Signature data
                 */
    
                /**
                 * Constructs a new Signature.
                 * @memberof exonum.crypto
                 * @classdesc Represents a Signature.
                 * @implements ISignature
                 * @constructor
                 * @param {exonum.crypto.ISignature=} [properties] Properties to set
                 */
                function Signature(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Signature data.
                 * @member {Uint8Array} data
                 * @memberof exonum.crypto.Signature
                 * @instance
                 */
                Signature.prototype.data = $util.newBuffer([]);
    
                /**
                 * Creates a new Signature instance using the specified properties.
                 * @function create
                 * @memberof exonum.crypto.Signature
                 * @static
                 * @param {exonum.crypto.ISignature=} [properties] Properties to set
                 * @returns {exonum.crypto.Signature} Signature instance
                 */
                Signature.create = function create(properties) {
                    return new Signature(properties);
                };
    
                /**
                 * Encodes the specified Signature message. Does not implicitly {@link exonum.crypto.Signature.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.crypto.Signature
                 * @static
                 * @param {exonum.crypto.ISignature} message Signature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Signature.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.data != null && message.hasOwnProperty("data"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                    return writer;
                };
    
                /**
                 * Encodes the specified Signature message, length delimited. Does not implicitly {@link exonum.crypto.Signature.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.crypto.Signature
                 * @static
                 * @param {exonum.crypto.ISignature} message Signature message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Signature.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Signature message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.crypto.Signature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.crypto.Signature} Signature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Signature.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.crypto.Signature();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.data = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Signature message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.crypto.Signature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.crypto.Signature} Signature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Signature.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Signature message.
                 * @function verify
                 * @memberof exonum.crypto.Signature
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Signature.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.data != null && message.hasOwnProperty("data"))
                        if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                            return "data: buffer expected";
                    return null;
                };
    
                /**
                 * Creates a Signature message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.crypto.Signature
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.crypto.Signature} Signature
                 */
                Signature.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.crypto.Signature)
                        return object;
                    var message = new $root.exonum.crypto.Signature();
                    if (object.data != null)
                        if (typeof object.data === "string")
                            $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                        else if (object.data.length)
                            message.data = object.data;
                    return message;
                };
    
                /**
                 * Creates a plain object from a Signature message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.crypto.Signature
                 * @static
                 * @param {exonum.crypto.Signature} message Signature
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Signature.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if (options.bytes === String)
                            object.data = "";
                        else {
                            object.data = [];
                            if (options.bytes !== Array)
                                object.data = $util.newBuffer(object.data);
                        }
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                    return object;
                };
    
                /**
                 * Converts this Signature to JSON.
                 * @function toJSON
                 * @memberof exonum.crypto.Signature
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Signature.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Signature;
            })();
    
            return crypto;
        })();
    
        exonum.KeyValue = (function() {
    
            /**
             * Properties of a KeyValue.
             * @memberof exonum
             * @interface IKeyValue
             * @property {string|null} [key] KeyValue key
             * @property {Uint8Array|null} [value] KeyValue value
             */
    
            /**
             * Constructs a new KeyValue.
             * @memberof exonum
             * @classdesc Represents a KeyValue.
             * @implements IKeyValue
             * @constructor
             * @param {exonum.IKeyValue=} [properties] Properties to set
             */
            function KeyValue(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * KeyValue key.
             * @member {string} key
             * @memberof exonum.KeyValue
             * @instance
             */
            KeyValue.prototype.key = "";
    
            /**
             * KeyValue value.
             * @member {Uint8Array} value
             * @memberof exonum.KeyValue
             * @instance
             */
            KeyValue.prototype.value = $util.newBuffer([]);
    
            /**
             * Creates a new KeyValue instance using the specified properties.
             * @function create
             * @memberof exonum.KeyValue
             * @static
             * @param {exonum.IKeyValue=} [properties] Properties to set
             * @returns {exonum.KeyValue} KeyValue instance
             */
            KeyValue.create = function create(properties) {
                return new KeyValue(properties);
            };
    
            /**
             * Encodes the specified KeyValue message. Does not implicitly {@link exonum.KeyValue.verify|verify} messages.
             * @function encode
             * @memberof exonum.KeyValue
             * @static
             * @param {exonum.IKeyValue} message KeyValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KeyValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.key != null && message.hasOwnProperty("key"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };
    
            /**
             * Encodes the specified KeyValue message, length delimited. Does not implicitly {@link exonum.KeyValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof exonum.KeyValue
             * @static
             * @param {exonum.IKeyValue} message KeyValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KeyValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a KeyValue message from the specified reader or buffer.
             * @function decode
             * @memberof exonum.KeyValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {exonum.KeyValue} KeyValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KeyValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.KeyValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.key = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a KeyValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof exonum.KeyValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {exonum.KeyValue} KeyValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KeyValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a KeyValue message.
             * @function verify
             * @memberof exonum.KeyValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            KeyValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.key != null && message.hasOwnProperty("key"))
                    if (!$util.isString(message.key))
                        return "key: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };
    
            /**
             * Creates a KeyValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof exonum.KeyValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {exonum.KeyValue} KeyValue
             */
            KeyValue.fromObject = function fromObject(object) {
                if (object instanceof $root.exonum.KeyValue)
                    return object;
                var message = new $root.exonum.KeyValue();
                if (object.key != null)
                    message.key = String(object.key);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };
    
            /**
             * Creates a plain object from a KeyValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof exonum.KeyValue
             * @static
             * @param {exonum.KeyValue} message KeyValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            KeyValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.key = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.key != null && message.hasOwnProperty("key"))
                    object.key = message.key;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };
    
            /**
             * Converts this KeyValue to JSON.
             * @function toJSON
             * @memberof exonum.KeyValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            KeyValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return KeyValue;
        })();
    
        exonum.KeyValueSequence = (function() {
    
            /**
             * Properties of a KeyValueSequence.
             * @memberof exonum
             * @interface IKeyValueSequence
             * @property {Array.<exonum.IKeyValue>|null} [entries] KeyValueSequence entries
             */
    
            /**
             * Constructs a new KeyValueSequence.
             * @memberof exonum
             * @classdesc Represents a KeyValueSequence.
             * @implements IKeyValueSequence
             * @constructor
             * @param {exonum.IKeyValueSequence=} [properties] Properties to set
             */
            function KeyValueSequence(properties) {
                this.entries = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * KeyValueSequence entries.
             * @member {Array.<exonum.IKeyValue>} entries
             * @memberof exonum.KeyValueSequence
             * @instance
             */
            KeyValueSequence.prototype.entries = $util.emptyArray;
    
            /**
             * Creates a new KeyValueSequence instance using the specified properties.
             * @function create
             * @memberof exonum.KeyValueSequence
             * @static
             * @param {exonum.IKeyValueSequence=} [properties] Properties to set
             * @returns {exonum.KeyValueSequence} KeyValueSequence instance
             */
            KeyValueSequence.create = function create(properties) {
                return new KeyValueSequence(properties);
            };
    
            /**
             * Encodes the specified KeyValueSequence message. Does not implicitly {@link exonum.KeyValueSequence.verify|verify} messages.
             * @function encode
             * @memberof exonum.KeyValueSequence
             * @static
             * @param {exonum.IKeyValueSequence} message KeyValueSequence message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KeyValueSequence.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.entries != null && message.entries.length)
                    for (var i = 0; i < message.entries.length; ++i)
                        $root.exonum.KeyValue.encode(message.entries[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified KeyValueSequence message, length delimited. Does not implicitly {@link exonum.KeyValueSequence.verify|verify} messages.
             * @function encodeDelimited
             * @memberof exonum.KeyValueSequence
             * @static
             * @param {exonum.IKeyValueSequence} message KeyValueSequence message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            KeyValueSequence.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a KeyValueSequence message from the specified reader or buffer.
             * @function decode
             * @memberof exonum.KeyValueSequence
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {exonum.KeyValueSequence} KeyValueSequence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KeyValueSequence.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.KeyValueSequence();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.entries && message.entries.length))
                            message.entries = [];
                        message.entries.push($root.exonum.KeyValue.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a KeyValueSequence message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof exonum.KeyValueSequence
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {exonum.KeyValueSequence} KeyValueSequence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            KeyValueSequence.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a KeyValueSequence message.
             * @function verify
             * @memberof exonum.KeyValueSequence
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            KeyValueSequence.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.entries != null && message.hasOwnProperty("entries")) {
                    if (!Array.isArray(message.entries))
                        return "entries: array expected";
                    for (var i = 0; i < message.entries.length; ++i) {
                        var error = $root.exonum.KeyValue.verify(message.entries[i]);
                        if (error)
                            return "entries." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a KeyValueSequence message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof exonum.KeyValueSequence
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {exonum.KeyValueSequence} KeyValueSequence
             */
            KeyValueSequence.fromObject = function fromObject(object) {
                if (object instanceof $root.exonum.KeyValueSequence)
                    return object;
                var message = new $root.exonum.KeyValueSequence();
                if (object.entries) {
                    if (!Array.isArray(object.entries))
                        throw TypeError(".exonum.KeyValueSequence.entries: array expected");
                    message.entries = [];
                    for (var i = 0; i < object.entries.length; ++i) {
                        if (typeof object.entries[i] !== "object")
                            throw TypeError(".exonum.KeyValueSequence.entries: object expected");
                        message.entries[i] = $root.exonum.KeyValue.fromObject(object.entries[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a KeyValueSequence message. Also converts values to other types if specified.
             * @function toObject
             * @memberof exonum.KeyValueSequence
             * @static
             * @param {exonum.KeyValueSequence} message KeyValueSequence
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            KeyValueSequence.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.entries = [];
                if (message.entries && message.entries.length) {
                    object.entries = [];
                    for (var j = 0; j < message.entries.length; ++j)
                        object.entries[j] = $root.exonum.KeyValue.toObject(message.entries[j], options);
                }
                return object;
            };
    
            /**
             * Converts this KeyValueSequence to JSON.
             * @function toJSON
             * @memberof exonum.KeyValueSequence
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            KeyValueSequence.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return KeyValueSequence;
        })();
    
        exonum.SignedMessage = (function() {
    
            /**
             * Properties of a SignedMessage.
             * @memberof exonum
             * @interface ISignedMessage
             * @property {Uint8Array|null} [payload] SignedMessage payload
             * @property {exonum.crypto.IPublicKey|null} [author] SignedMessage author
             * @property {exonum.crypto.ISignature|null} [signature] SignedMessage signature
             */
    
            /**
             * Constructs a new SignedMessage.
             * @memberof exonum
             * @classdesc Represents a SignedMessage.
             * @implements ISignedMessage
             * @constructor
             * @param {exonum.ISignedMessage=} [properties] Properties to set
             */
            function SignedMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SignedMessage payload.
             * @member {Uint8Array} payload
             * @memberof exonum.SignedMessage
             * @instance
             */
            SignedMessage.prototype.payload = $util.newBuffer([]);
    
            /**
             * SignedMessage author.
             * @member {exonum.crypto.IPublicKey|null|undefined} author
             * @memberof exonum.SignedMessage
             * @instance
             */
            SignedMessage.prototype.author = null;
    
            /**
             * SignedMessage signature.
             * @member {exonum.crypto.ISignature|null|undefined} signature
             * @memberof exonum.SignedMessage
             * @instance
             */
            SignedMessage.prototype.signature = null;
    
            /**
             * Creates a new SignedMessage instance using the specified properties.
             * @function create
             * @memberof exonum.SignedMessage
             * @static
             * @param {exonum.ISignedMessage=} [properties] Properties to set
             * @returns {exonum.SignedMessage} SignedMessage instance
             */
            SignedMessage.create = function create(properties) {
                return new SignedMessage(properties);
            };
    
            /**
             * Encodes the specified SignedMessage message. Does not implicitly {@link exonum.SignedMessage.verify|verify} messages.
             * @function encode
             * @memberof exonum.SignedMessage
             * @static
             * @param {exonum.ISignedMessage} message SignedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SignedMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.payload != null && message.hasOwnProperty("payload"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.payload);
                if (message.author != null && message.hasOwnProperty("author"))
                    $root.exonum.crypto.PublicKey.encode(message.author, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.signature != null && message.hasOwnProperty("signature"))
                    $root.exonum.crypto.Signature.encode(message.signature, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified SignedMessage message, length delimited. Does not implicitly {@link exonum.SignedMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof exonum.SignedMessage
             * @static
             * @param {exonum.ISignedMessage} message SignedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SignedMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SignedMessage message from the specified reader or buffer.
             * @function decode
             * @memberof exonum.SignedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {exonum.SignedMessage} SignedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SignedMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.SignedMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.payload = reader.bytes();
                        break;
                    case 2:
                        message.author = $root.exonum.crypto.PublicKey.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.signature = $root.exonum.crypto.Signature.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SignedMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof exonum.SignedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {exonum.SignedMessage} SignedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SignedMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SignedMessage message.
             * @function verify
             * @memberof exonum.SignedMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SignedMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.payload != null && message.hasOwnProperty("payload"))
                    if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                        return "payload: buffer expected";
                if (message.author != null && message.hasOwnProperty("author")) {
                    var error = $root.exonum.crypto.PublicKey.verify(message.author);
                    if (error)
                        return "author." + error;
                }
                if (message.signature != null && message.hasOwnProperty("signature")) {
                    var error = $root.exonum.crypto.Signature.verify(message.signature);
                    if (error)
                        return "signature." + error;
                }
                return null;
            };
    
            /**
             * Creates a SignedMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof exonum.SignedMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {exonum.SignedMessage} SignedMessage
             */
            SignedMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.exonum.SignedMessage)
                    return object;
                var message = new $root.exonum.SignedMessage();
                if (object.payload != null)
                    if (typeof object.payload === "string")
                        $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                    else if (object.payload.length)
                        message.payload = object.payload;
                if (object.author != null) {
                    if (typeof object.author !== "object")
                        throw TypeError(".exonum.SignedMessage.author: object expected");
                    message.author = $root.exonum.crypto.PublicKey.fromObject(object.author);
                }
                if (object.signature != null) {
                    if (typeof object.signature !== "object")
                        throw TypeError(".exonum.SignedMessage.signature: object expected");
                    message.signature = $root.exonum.crypto.Signature.fromObject(object.signature);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a SignedMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof exonum.SignedMessage
             * @static
             * @param {exonum.SignedMessage} message SignedMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SignedMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.payload = "";
                    else {
                        object.payload = [];
                        if (options.bytes !== Array)
                            object.payload = $util.newBuffer(object.payload);
                    }
                    object.author = null;
                    object.signature = null;
                }
                if (message.payload != null && message.hasOwnProperty("payload"))
                    object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                if (message.author != null && message.hasOwnProperty("author"))
                    object.author = $root.exonum.crypto.PublicKey.toObject(message.author, options);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = $root.exonum.crypto.Signature.toObject(message.signature, options);
                return object;
            };
    
            /**
             * Converts this SignedMessage to JSON.
             * @function toJSON
             * @memberof exonum.SignedMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SignedMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SignedMessage;
        })();
    
        exonum.CoreMessage = (function() {
    
            /**
             * Properties of a CoreMessage.
             * @memberof exonum
             * @interface ICoreMessage
             * @property {exonum.runtime.IAnyTx|null} [any_tx] CoreMessage any_tx
             * @property {exonum.IPrecommit|null} [precommit] CoreMessage precommit
             */
    
            /**
             * Constructs a new CoreMessage.
             * @memberof exonum
             * @classdesc Represents a CoreMessage.
             * @implements ICoreMessage
             * @constructor
             * @param {exonum.ICoreMessage=} [properties] Properties to set
             */
            function CoreMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CoreMessage any_tx.
             * @member {exonum.runtime.IAnyTx|null|undefined} any_tx
             * @memberof exonum.CoreMessage
             * @instance
             */
            CoreMessage.prototype.any_tx = null;
    
            /**
             * CoreMessage precommit.
             * @member {exonum.IPrecommit|null|undefined} precommit
             * @memberof exonum.CoreMessage
             * @instance
             */
            CoreMessage.prototype.precommit = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * CoreMessage kind.
             * @member {"any_tx"|"precommit"|undefined} kind
             * @memberof exonum.CoreMessage
             * @instance
             */
            Object.defineProperty(CoreMessage.prototype, "kind", {
                get: $util.oneOfGetter($oneOfFields = ["any_tx", "precommit"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new CoreMessage instance using the specified properties.
             * @function create
             * @memberof exonum.CoreMessage
             * @static
             * @param {exonum.ICoreMessage=} [properties] Properties to set
             * @returns {exonum.CoreMessage} CoreMessage instance
             */
            CoreMessage.create = function create(properties) {
                return new CoreMessage(properties);
            };
    
            /**
             * Encodes the specified CoreMessage message. Does not implicitly {@link exonum.CoreMessage.verify|verify} messages.
             * @function encode
             * @memberof exonum.CoreMessage
             * @static
             * @param {exonum.ICoreMessage} message CoreMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CoreMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.any_tx != null && message.hasOwnProperty("any_tx"))
                    $root.exonum.runtime.AnyTx.encode(message.any_tx, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.precommit != null && message.hasOwnProperty("precommit"))
                    $root.exonum.Precommit.encode(message.precommit, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CoreMessage message, length delimited. Does not implicitly {@link exonum.CoreMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof exonum.CoreMessage
             * @static
             * @param {exonum.ICoreMessage} message CoreMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CoreMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CoreMessage message from the specified reader or buffer.
             * @function decode
             * @memberof exonum.CoreMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {exonum.CoreMessage} CoreMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CoreMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.CoreMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.any_tx = $root.exonum.runtime.AnyTx.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.precommit = $root.exonum.Precommit.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CoreMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof exonum.CoreMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {exonum.CoreMessage} CoreMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CoreMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CoreMessage message.
             * @function verify
             * @memberof exonum.CoreMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CoreMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.any_tx != null && message.hasOwnProperty("any_tx")) {
                    properties.kind = 1;
                    {
                        var error = $root.exonum.runtime.AnyTx.verify(message.any_tx);
                        if (error)
                            return "any_tx." + error;
                    }
                }
                if (message.precommit != null && message.hasOwnProperty("precommit")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.exonum.Precommit.verify(message.precommit);
                        if (error)
                            return "precommit." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a CoreMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof exonum.CoreMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {exonum.CoreMessage} CoreMessage
             */
            CoreMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.exonum.CoreMessage)
                    return object;
                var message = new $root.exonum.CoreMessage();
                if (object.any_tx != null) {
                    if (typeof object.any_tx !== "object")
                        throw TypeError(".exonum.CoreMessage.any_tx: object expected");
                    message.any_tx = $root.exonum.runtime.AnyTx.fromObject(object.any_tx);
                }
                if (object.precommit != null) {
                    if (typeof object.precommit !== "object")
                        throw TypeError(".exonum.CoreMessage.precommit: object expected");
                    message.precommit = $root.exonum.Precommit.fromObject(object.precommit);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CoreMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof exonum.CoreMessage
             * @static
             * @param {exonum.CoreMessage} message CoreMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CoreMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.any_tx != null && message.hasOwnProperty("any_tx")) {
                    object.any_tx = $root.exonum.runtime.AnyTx.toObject(message.any_tx, options);
                    if (options.oneofs)
                        object.kind = "any_tx";
                }
                if (message.precommit != null && message.hasOwnProperty("precommit")) {
                    object.precommit = $root.exonum.Precommit.toObject(message.precommit, options);
                    if (options.oneofs)
                        object.kind = "precommit";
                }
                return object;
            };
    
            /**
             * Converts this CoreMessage to JSON.
             * @function toJSON
             * @memberof exonum.CoreMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CoreMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CoreMessage;
        })();
    
        exonum.Precommit = (function() {
    
            /**
             * Properties of a Precommit.
             * @memberof exonum
             * @interface IPrecommit
             * @property {number|null} [validator] Precommit validator
             * @property {number|Long|null} [height] Precommit height
             * @property {number|null} [round] Precommit round
             * @property {exonum.crypto.IHash|null} [propose_hash] Precommit propose_hash
             * @property {exonum.crypto.IHash|null} [block_hash] Precommit block_hash
             * @property {google.protobuf.ITimestamp|null} [time] Precommit time
             */
    
            /**
             * Constructs a new Precommit.
             * @memberof exonum
             * @classdesc Represents a Precommit.
             * @implements IPrecommit
             * @constructor
             * @param {exonum.IPrecommit=} [properties] Properties to set
             */
            function Precommit(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Precommit validator.
             * @member {number} validator
             * @memberof exonum.Precommit
             * @instance
             */
            Precommit.prototype.validator = 0;
    
            /**
             * Precommit height.
             * @member {number|Long} height
             * @memberof exonum.Precommit
             * @instance
             */
            Precommit.prototype.height = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Precommit round.
             * @member {number} round
             * @memberof exonum.Precommit
             * @instance
             */
            Precommit.prototype.round = 0;
    
            /**
             * Precommit propose_hash.
             * @member {exonum.crypto.IHash|null|undefined} propose_hash
             * @memberof exonum.Precommit
             * @instance
             */
            Precommit.prototype.propose_hash = null;
    
            /**
             * Precommit block_hash.
             * @member {exonum.crypto.IHash|null|undefined} block_hash
             * @memberof exonum.Precommit
             * @instance
             */
            Precommit.prototype.block_hash = null;
    
            /**
             * Precommit time.
             * @member {google.protobuf.ITimestamp|null|undefined} time
             * @memberof exonum.Precommit
             * @instance
             */
            Precommit.prototype.time = null;
    
            /**
             * Creates a new Precommit instance using the specified properties.
             * @function create
             * @memberof exonum.Precommit
             * @static
             * @param {exonum.IPrecommit=} [properties] Properties to set
             * @returns {exonum.Precommit} Precommit instance
             */
            Precommit.create = function create(properties) {
                return new Precommit(properties);
            };
    
            /**
             * Encodes the specified Precommit message. Does not implicitly {@link exonum.Precommit.verify|verify} messages.
             * @function encode
             * @memberof exonum.Precommit
             * @static
             * @param {exonum.IPrecommit} message Precommit message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Precommit.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.validator != null && message.hasOwnProperty("validator"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.validator);
                if (message.height != null && message.hasOwnProperty("height"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.height);
                if (message.round != null && message.hasOwnProperty("round"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.round);
                if (message.propose_hash != null && message.hasOwnProperty("propose_hash"))
                    $root.exonum.crypto.Hash.encode(message.propose_hash, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.block_hash != null && message.hasOwnProperty("block_hash"))
                    $root.exonum.crypto.Hash.encode(message.block_hash, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.time != null && message.hasOwnProperty("time"))
                    $root.google.protobuf.Timestamp.encode(message.time, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Precommit message, length delimited. Does not implicitly {@link exonum.Precommit.verify|verify} messages.
             * @function encodeDelimited
             * @memberof exonum.Precommit
             * @static
             * @param {exonum.IPrecommit} message Precommit message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Precommit.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Precommit message from the specified reader or buffer.
             * @function decode
             * @memberof exonum.Precommit
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {exonum.Precommit} Precommit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Precommit.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.Precommit();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.validator = reader.uint32();
                        break;
                    case 2:
                        message.height = reader.uint64();
                        break;
                    case 3:
                        message.round = reader.uint32();
                        break;
                    case 4:
                        message.propose_hash = $root.exonum.crypto.Hash.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.block_hash = $root.exonum.crypto.Hash.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.time = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Precommit message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof exonum.Precommit
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {exonum.Precommit} Precommit
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Precommit.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Precommit message.
             * @function verify
             * @memberof exonum.Precommit
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Precommit.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.validator != null && message.hasOwnProperty("validator"))
                    if (!$util.isInteger(message.validator))
                        return "validator: integer expected";
                if (message.height != null && message.hasOwnProperty("height"))
                    if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                        return "height: integer|Long expected";
                if (message.round != null && message.hasOwnProperty("round"))
                    if (!$util.isInteger(message.round))
                        return "round: integer expected";
                if (message.propose_hash != null && message.hasOwnProperty("propose_hash")) {
                    var error = $root.exonum.crypto.Hash.verify(message.propose_hash);
                    if (error)
                        return "propose_hash." + error;
                }
                if (message.block_hash != null && message.hasOwnProperty("block_hash")) {
                    var error = $root.exonum.crypto.Hash.verify(message.block_hash);
                    if (error)
                        return "block_hash." + error;
                }
                if (message.time != null && message.hasOwnProperty("time")) {
                    var error = $root.google.protobuf.Timestamp.verify(message.time);
                    if (error)
                        return "time." + error;
                }
                return null;
            };
    
            /**
             * Creates a Precommit message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof exonum.Precommit
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {exonum.Precommit} Precommit
             */
            Precommit.fromObject = function fromObject(object) {
                if (object instanceof $root.exonum.Precommit)
                    return object;
                var message = new $root.exonum.Precommit();
                if (object.validator != null)
                    message.validator = object.validator >>> 0;
                if (object.height != null)
                    if ($util.Long)
                        (message.height = $util.Long.fromValue(object.height)).unsigned = true;
                    else if (typeof object.height === "string")
                        message.height = parseInt(object.height, 10);
                    else if (typeof object.height === "number")
                        message.height = object.height;
                    else if (typeof object.height === "object")
                        message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber(true);
                if (object.round != null)
                    message.round = object.round >>> 0;
                if (object.propose_hash != null) {
                    if (typeof object.propose_hash !== "object")
                        throw TypeError(".exonum.Precommit.propose_hash: object expected");
                    message.propose_hash = $root.exonum.crypto.Hash.fromObject(object.propose_hash);
                }
                if (object.block_hash != null) {
                    if (typeof object.block_hash !== "object")
                        throw TypeError(".exonum.Precommit.block_hash: object expected");
                    message.block_hash = $root.exonum.crypto.Hash.fromObject(object.block_hash);
                }
                if (object.time != null) {
                    if (typeof object.time !== "object")
                        throw TypeError(".exonum.Precommit.time: object expected");
                    message.time = $root.google.protobuf.Timestamp.fromObject(object.time);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Precommit message. Also converts values to other types if specified.
             * @function toObject
             * @memberof exonum.Precommit
             * @static
             * @param {exonum.Precommit} message Precommit
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Precommit.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.validator = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.height = options.longs === String ? "0" : 0;
                    object.round = 0;
                    object.propose_hash = null;
                    object.block_hash = null;
                    object.time = null;
                }
                if (message.validator != null && message.hasOwnProperty("validator"))
                    object.validator = message.validator;
                if (message.height != null && message.hasOwnProperty("height"))
                    if (typeof message.height === "number")
                        object.height = options.longs === String ? String(message.height) : message.height;
                    else
                        object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber(true) : message.height;
                if (message.round != null && message.hasOwnProperty("round"))
                    object.round = message.round;
                if (message.propose_hash != null && message.hasOwnProperty("propose_hash"))
                    object.propose_hash = $root.exonum.crypto.Hash.toObject(message.propose_hash, options);
                if (message.block_hash != null && message.hasOwnProperty("block_hash"))
                    object.block_hash = $root.exonum.crypto.Hash.toObject(message.block_hash, options);
                if (message.time != null && message.hasOwnProperty("time"))
                    object.time = $root.google.protobuf.Timestamp.toObject(message.time, options);
                return object;
            };
    
            /**
             * Converts this Precommit to JSON.
             * @function toJSON
             * @memberof exonum.Precommit
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Precommit.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Precommit;
        })();
    
        exonum.runtime = (function() {
    
            /**
             * Namespace runtime.
             * @memberof exonum
             * @namespace
             */
            var runtime = {};
    
            runtime.Caller = (function() {
    
                /**
                 * Properties of a Caller.
                 * @memberof exonum.runtime
                 * @interface ICaller
                 * @property {exonum.crypto.IPublicKey|null} [transaction_author] Caller transaction_author
                 * @property {number|null} [instance_id] Caller instance_id
                 * @property {google.protobuf.IEmpty|null} [blockchain] Caller blockchain
                 */
    
                /**
                 * Constructs a new Caller.
                 * @memberof exonum.runtime
                 * @classdesc Represents a Caller.
                 * @implements ICaller
                 * @constructor
                 * @param {exonum.runtime.ICaller=} [properties] Properties to set
                 */
                function Caller(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Caller transaction_author.
                 * @member {exonum.crypto.IPublicKey|null|undefined} transaction_author
                 * @memberof exonum.runtime.Caller
                 * @instance
                 */
                Caller.prototype.transaction_author = null;
    
                /**
                 * Caller instance_id.
                 * @member {number} instance_id
                 * @memberof exonum.runtime.Caller
                 * @instance
                 */
                Caller.prototype.instance_id = 0;
    
                /**
                 * Caller blockchain.
                 * @member {google.protobuf.IEmpty|null|undefined} blockchain
                 * @memberof exonum.runtime.Caller
                 * @instance
                 */
                Caller.prototype.blockchain = null;
    
                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;
    
                /**
                 * Caller caller.
                 * @member {"transaction_author"|"instance_id"|"blockchain"|undefined} caller
                 * @memberof exonum.runtime.Caller
                 * @instance
                 */
                Object.defineProperty(Caller.prototype, "caller", {
                    get: $util.oneOfGetter($oneOfFields = ["transaction_author", "instance_id", "blockchain"]),
                    set: $util.oneOfSetter($oneOfFields)
                });
    
                /**
                 * Creates a new Caller instance using the specified properties.
                 * @function create
                 * @memberof exonum.runtime.Caller
                 * @static
                 * @param {exonum.runtime.ICaller=} [properties] Properties to set
                 * @returns {exonum.runtime.Caller} Caller instance
                 */
                Caller.create = function create(properties) {
                    return new Caller(properties);
                };
    
                /**
                 * Encodes the specified Caller message. Does not implicitly {@link exonum.runtime.Caller.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.runtime.Caller
                 * @static
                 * @param {exonum.runtime.ICaller} message Caller message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Caller.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.transaction_author != null && message.hasOwnProperty("transaction_author"))
                        $root.exonum.crypto.PublicKey.encode(message.transaction_author, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.instance_id != null && message.hasOwnProperty("instance_id"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.instance_id);
                    if (message.blockchain != null && message.hasOwnProperty("blockchain"))
                        $root.google.protobuf.Empty.encode(message.blockchain, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified Caller message, length delimited. Does not implicitly {@link exonum.runtime.Caller.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.runtime.Caller
                 * @static
                 * @param {exonum.runtime.ICaller} message Caller message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Caller.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Caller message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.runtime.Caller
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.runtime.Caller} Caller
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Caller.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.runtime.Caller();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.transaction_author = $root.exonum.crypto.PublicKey.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.instance_id = reader.uint32();
                            break;
                        case 3:
                            message.blockchain = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Caller message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.runtime.Caller
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.runtime.Caller} Caller
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Caller.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Caller message.
                 * @function verify
                 * @memberof exonum.runtime.Caller
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Caller.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.transaction_author != null && message.hasOwnProperty("transaction_author")) {
                        properties.caller = 1;
                        {
                            var error = $root.exonum.crypto.PublicKey.verify(message.transaction_author);
                            if (error)
                                return "transaction_author." + error;
                        }
                    }
                    if (message.instance_id != null && message.hasOwnProperty("instance_id")) {
                        if (properties.caller === 1)
                            return "caller: multiple values";
                        properties.caller = 1;
                        if (!$util.isInteger(message.instance_id))
                            return "instance_id: integer expected";
                    }
                    if (message.blockchain != null && message.hasOwnProperty("blockchain")) {
                        if (properties.caller === 1)
                            return "caller: multiple values";
                        properties.caller = 1;
                        {
                            var error = $root.google.protobuf.Empty.verify(message.blockchain);
                            if (error)
                                return "blockchain." + error;
                        }
                    }
                    return null;
                };
    
                /**
                 * Creates a Caller message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.runtime.Caller
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.runtime.Caller} Caller
                 */
                Caller.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.runtime.Caller)
                        return object;
                    var message = new $root.exonum.runtime.Caller();
                    if (object.transaction_author != null) {
                        if (typeof object.transaction_author !== "object")
                            throw TypeError(".exonum.runtime.Caller.transaction_author: object expected");
                        message.transaction_author = $root.exonum.crypto.PublicKey.fromObject(object.transaction_author);
                    }
                    if (object.instance_id != null)
                        message.instance_id = object.instance_id >>> 0;
                    if (object.blockchain != null) {
                        if (typeof object.blockchain !== "object")
                            throw TypeError(".exonum.runtime.Caller.blockchain: object expected");
                        message.blockchain = $root.google.protobuf.Empty.fromObject(object.blockchain);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a Caller message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.runtime.Caller
                 * @static
                 * @param {exonum.runtime.Caller} message Caller
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Caller.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (message.transaction_author != null && message.hasOwnProperty("transaction_author")) {
                        object.transaction_author = $root.exonum.crypto.PublicKey.toObject(message.transaction_author, options);
                        if (options.oneofs)
                            object.caller = "transaction_author";
                    }
                    if (message.instance_id != null && message.hasOwnProperty("instance_id")) {
                        object.instance_id = message.instance_id;
                        if (options.oneofs)
                            object.caller = "instance_id";
                    }
                    if (message.blockchain != null && message.hasOwnProperty("blockchain")) {
                        object.blockchain = $root.google.protobuf.Empty.toObject(message.blockchain, options);
                        if (options.oneofs)
                            object.caller = "blockchain";
                    }
                    return object;
                };
    
                /**
                 * Converts this Caller to JSON.
                 * @function toJSON
                 * @memberof exonum.runtime.Caller
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Caller.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Caller;
            })();
    
            runtime.CallInfo = (function() {
    
                /**
                 * Properties of a CallInfo.
                 * @memberof exonum.runtime
                 * @interface ICallInfo
                 * @property {number|null} [instance_id] CallInfo instance_id
                 * @property {number|null} [method_id] CallInfo method_id
                 */
    
                /**
                 * Constructs a new CallInfo.
                 * @memberof exonum.runtime
                 * @classdesc Represents a CallInfo.
                 * @implements ICallInfo
                 * @constructor
                 * @param {exonum.runtime.ICallInfo=} [properties] Properties to set
                 */
                function CallInfo(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * CallInfo instance_id.
                 * @member {number} instance_id
                 * @memberof exonum.runtime.CallInfo
                 * @instance
                 */
                CallInfo.prototype.instance_id = 0;
    
                /**
                 * CallInfo method_id.
                 * @member {number} method_id
                 * @memberof exonum.runtime.CallInfo
                 * @instance
                 */
                CallInfo.prototype.method_id = 0;
    
                /**
                 * Creates a new CallInfo instance using the specified properties.
                 * @function create
                 * @memberof exonum.runtime.CallInfo
                 * @static
                 * @param {exonum.runtime.ICallInfo=} [properties] Properties to set
                 * @returns {exonum.runtime.CallInfo} CallInfo instance
                 */
                CallInfo.create = function create(properties) {
                    return new CallInfo(properties);
                };
    
                /**
                 * Encodes the specified CallInfo message. Does not implicitly {@link exonum.runtime.CallInfo.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.runtime.CallInfo
                 * @static
                 * @param {exonum.runtime.ICallInfo} message CallInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CallInfo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.instance_id != null && message.hasOwnProperty("instance_id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.instance_id);
                    if (message.method_id != null && message.hasOwnProperty("method_id"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.method_id);
                    return writer;
                };
    
                /**
                 * Encodes the specified CallInfo message, length delimited. Does not implicitly {@link exonum.runtime.CallInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.runtime.CallInfo
                 * @static
                 * @param {exonum.runtime.ICallInfo} message CallInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CallInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a CallInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.runtime.CallInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.runtime.CallInfo} CallInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CallInfo.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.runtime.CallInfo();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.instance_id = reader.uint32();
                            break;
                        case 2:
                            message.method_id = reader.uint32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a CallInfo message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.runtime.CallInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.runtime.CallInfo} CallInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CallInfo.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a CallInfo message.
                 * @function verify
                 * @memberof exonum.runtime.CallInfo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CallInfo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.instance_id != null && message.hasOwnProperty("instance_id"))
                        if (!$util.isInteger(message.instance_id))
                            return "instance_id: integer expected";
                    if (message.method_id != null && message.hasOwnProperty("method_id"))
                        if (!$util.isInteger(message.method_id))
                            return "method_id: integer expected";
                    return null;
                };
    
                /**
                 * Creates a CallInfo message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.runtime.CallInfo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.runtime.CallInfo} CallInfo
                 */
                CallInfo.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.runtime.CallInfo)
                        return object;
                    var message = new $root.exonum.runtime.CallInfo();
                    if (object.instance_id != null)
                        message.instance_id = object.instance_id >>> 0;
                    if (object.method_id != null)
                        message.method_id = object.method_id >>> 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a CallInfo message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.runtime.CallInfo
                 * @static
                 * @param {exonum.runtime.CallInfo} message CallInfo
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CallInfo.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.instance_id = 0;
                        object.method_id = 0;
                    }
                    if (message.instance_id != null && message.hasOwnProperty("instance_id"))
                        object.instance_id = message.instance_id;
                    if (message.method_id != null && message.hasOwnProperty("method_id"))
                        object.method_id = message.method_id;
                    return object;
                };
    
                /**
                 * Converts this CallInfo to JSON.
                 * @function toJSON
                 * @memberof exonum.runtime.CallInfo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CallInfo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return CallInfo;
            })();
    
            runtime.AnyTx = (function() {
    
                /**
                 * Properties of an AnyTx.
                 * @memberof exonum.runtime
                 * @interface IAnyTx
                 * @property {exonum.runtime.ICallInfo|null} [call_info] AnyTx call_info
                 * @property {Uint8Array|null} ["arguments"] AnyTx arguments
                 */
    
                /**
                 * Constructs a new AnyTx.
                 * @memberof exonum.runtime
                 * @classdesc Represents an AnyTx.
                 * @implements IAnyTx
                 * @constructor
                 * @param {exonum.runtime.IAnyTx=} [properties] Properties to set
                 */
                function AnyTx(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * AnyTx call_info.
                 * @member {exonum.runtime.ICallInfo|null|undefined} call_info
                 * @memberof exonum.runtime.AnyTx
                 * @instance
                 */
                AnyTx.prototype.call_info = null;
    
                /**
                 * AnyTx arguments.
                 * @member {Uint8Array} arguments
                 * @memberof exonum.runtime.AnyTx
                 * @instance
                 */
                AnyTx.prototype["arguments"] = $util.newBuffer([]);
    
                /**
                 * Creates a new AnyTx instance using the specified properties.
                 * @function create
                 * @memberof exonum.runtime.AnyTx
                 * @static
                 * @param {exonum.runtime.IAnyTx=} [properties] Properties to set
                 * @returns {exonum.runtime.AnyTx} AnyTx instance
                 */
                AnyTx.create = function create(properties) {
                    return new AnyTx(properties);
                };
    
                /**
                 * Encodes the specified AnyTx message. Does not implicitly {@link exonum.runtime.AnyTx.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.runtime.AnyTx
                 * @static
                 * @param {exonum.runtime.IAnyTx} message AnyTx message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AnyTx.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.call_info != null && message.hasOwnProperty("call_info"))
                        $root.exonum.runtime.CallInfo.encode(message.call_info, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message["arguments"] != null && message.hasOwnProperty("arguments"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message["arguments"]);
                    return writer;
                };
    
                /**
                 * Encodes the specified AnyTx message, length delimited. Does not implicitly {@link exonum.runtime.AnyTx.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.runtime.AnyTx
                 * @static
                 * @param {exonum.runtime.IAnyTx} message AnyTx message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AnyTx.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an AnyTx message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.runtime.AnyTx
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.runtime.AnyTx} AnyTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AnyTx.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.runtime.AnyTx();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.call_info = $root.exonum.runtime.CallInfo.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message["arguments"] = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an AnyTx message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.runtime.AnyTx
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.runtime.AnyTx} AnyTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AnyTx.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an AnyTx message.
                 * @function verify
                 * @memberof exonum.runtime.AnyTx
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AnyTx.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.call_info != null && message.hasOwnProperty("call_info")) {
                        var error = $root.exonum.runtime.CallInfo.verify(message.call_info);
                        if (error)
                            return "call_info." + error;
                    }
                    if (message["arguments"] != null && message.hasOwnProperty("arguments"))
                        if (!(message["arguments"] && typeof message["arguments"].length === "number" || $util.isString(message["arguments"])))
                            return "arguments: buffer expected";
                    return null;
                };
    
                /**
                 * Creates an AnyTx message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.runtime.AnyTx
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.runtime.AnyTx} AnyTx
                 */
                AnyTx.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.runtime.AnyTx)
                        return object;
                    var message = new $root.exonum.runtime.AnyTx();
                    if (object.call_info != null) {
                        if (typeof object.call_info !== "object")
                            throw TypeError(".exonum.runtime.AnyTx.call_info: object expected");
                        message.call_info = $root.exonum.runtime.CallInfo.fromObject(object.call_info);
                    }
                    if (object["arguments"] != null)
                        if (typeof object["arguments"] === "string")
                            $util.base64.decode(object["arguments"], message["arguments"] = $util.newBuffer($util.base64.length(object["arguments"])), 0);
                        else if (object["arguments"].length)
                            message["arguments"] = object["arguments"];
                    return message;
                };
    
                /**
                 * Creates a plain object from an AnyTx message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.runtime.AnyTx
                 * @static
                 * @param {exonum.runtime.AnyTx} message AnyTx
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AnyTx.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.call_info = null;
                        if (options.bytes === String)
                            object["arguments"] = "";
                        else {
                            object["arguments"] = [];
                            if (options.bytes !== Array)
                                object["arguments"] = $util.newBuffer(object["arguments"]);
                        }
                    }
                    if (message.call_info != null && message.hasOwnProperty("call_info"))
                        object.call_info = $root.exonum.runtime.CallInfo.toObject(message.call_info, options);
                    if (message["arguments"] != null && message.hasOwnProperty("arguments"))
                        object["arguments"] = options.bytes === String ? $util.base64.encode(message["arguments"], 0, message["arguments"].length) : options.bytes === Array ? Array.prototype.slice.call(message["arguments"]) : message["arguments"];
                    return object;
                };
    
                /**
                 * Converts this AnyTx to JSON.
                 * @function toJSON
                 * @memberof exonum.runtime.AnyTx
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AnyTx.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return AnyTx;
            })();
    
            runtime.ArtifactId = (function() {
    
                /**
                 * Properties of an ArtifactId.
                 * @memberof exonum.runtime
                 * @interface IArtifactId
                 * @property {number|null} [runtime_id] ArtifactId runtime_id
                 * @property {string|null} [name] ArtifactId name
                 * @property {string|null} [version] ArtifactId version
                 */
    
                /**
                 * Constructs a new ArtifactId.
                 * @memberof exonum.runtime
                 * @classdesc Represents an ArtifactId.
                 * @implements IArtifactId
                 * @constructor
                 * @param {exonum.runtime.IArtifactId=} [properties] Properties to set
                 */
                function ArtifactId(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ArtifactId runtime_id.
                 * @member {number} runtime_id
                 * @memberof exonum.runtime.ArtifactId
                 * @instance
                 */
                ArtifactId.prototype.runtime_id = 0;
    
                /**
                 * ArtifactId name.
                 * @member {string} name
                 * @memberof exonum.runtime.ArtifactId
                 * @instance
                 */
                ArtifactId.prototype.name = "";
    
                /**
                 * ArtifactId version.
                 * @member {string} version
                 * @memberof exonum.runtime.ArtifactId
                 * @instance
                 */
                ArtifactId.prototype.version = "";
    
                /**
                 * Creates a new ArtifactId instance using the specified properties.
                 * @function create
                 * @memberof exonum.runtime.ArtifactId
                 * @static
                 * @param {exonum.runtime.IArtifactId=} [properties] Properties to set
                 * @returns {exonum.runtime.ArtifactId} ArtifactId instance
                 */
                ArtifactId.create = function create(properties) {
                    return new ArtifactId(properties);
                };
    
                /**
                 * Encodes the specified ArtifactId message. Does not implicitly {@link exonum.runtime.ArtifactId.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.runtime.ArtifactId
                 * @static
                 * @param {exonum.runtime.IArtifactId} message ArtifactId message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ArtifactId.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.runtime_id != null && message.hasOwnProperty("runtime_id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.runtime_id);
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                    if (message.version != null && message.hasOwnProperty("version"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.version);
                    return writer;
                };
    
                /**
                 * Encodes the specified ArtifactId message, length delimited. Does not implicitly {@link exonum.runtime.ArtifactId.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.runtime.ArtifactId
                 * @static
                 * @param {exonum.runtime.IArtifactId} message ArtifactId message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ArtifactId.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an ArtifactId message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.runtime.ArtifactId
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.runtime.ArtifactId} ArtifactId
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ArtifactId.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.runtime.ArtifactId();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.runtime_id = reader.uint32();
                            break;
                        case 2:
                            message.name = reader.string();
                            break;
                        case 3:
                            message.version = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an ArtifactId message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.runtime.ArtifactId
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.runtime.ArtifactId} ArtifactId
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ArtifactId.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an ArtifactId message.
                 * @function verify
                 * @memberof exonum.runtime.ArtifactId
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ArtifactId.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.runtime_id != null && message.hasOwnProperty("runtime_id"))
                        if (!$util.isInteger(message.runtime_id))
                            return "runtime_id: integer expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.version != null && message.hasOwnProperty("version"))
                        if (!$util.isString(message.version))
                            return "version: string expected";
                    return null;
                };
    
                /**
                 * Creates an ArtifactId message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.runtime.ArtifactId
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.runtime.ArtifactId} ArtifactId
                 */
                ArtifactId.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.runtime.ArtifactId)
                        return object;
                    var message = new $root.exonum.runtime.ArtifactId();
                    if (object.runtime_id != null)
                        message.runtime_id = object.runtime_id >>> 0;
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.version != null)
                        message.version = String(object.version);
                    return message;
                };
    
                /**
                 * Creates a plain object from an ArtifactId message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.runtime.ArtifactId
                 * @static
                 * @param {exonum.runtime.ArtifactId} message ArtifactId
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ArtifactId.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.runtime_id = 0;
                        object.name = "";
                        object.version = "";
                    }
                    if (message.runtime_id != null && message.hasOwnProperty("runtime_id"))
                        object.runtime_id = message.runtime_id;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = message.version;
                    return object;
                };
    
                /**
                 * Converts this ArtifactId to JSON.
                 * @function toJSON
                 * @memberof exonum.runtime.ArtifactId
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ArtifactId.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return ArtifactId;
            })();
    
            runtime.ArtifactSpec = (function() {
    
                /**
                 * Properties of an ArtifactSpec.
                 * @memberof exonum.runtime
                 * @interface IArtifactSpec
                 * @property {exonum.runtime.IArtifactId|null} [artifact] ArtifactSpec artifact
                 * @property {Uint8Array|null} [payload] ArtifactSpec payload
                 */
    
                /**
                 * Constructs a new ArtifactSpec.
                 * @memberof exonum.runtime
                 * @classdesc Represents an ArtifactSpec.
                 * @implements IArtifactSpec
                 * @constructor
                 * @param {exonum.runtime.IArtifactSpec=} [properties] Properties to set
                 */
                function ArtifactSpec(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ArtifactSpec artifact.
                 * @member {exonum.runtime.IArtifactId|null|undefined} artifact
                 * @memberof exonum.runtime.ArtifactSpec
                 * @instance
                 */
                ArtifactSpec.prototype.artifact = null;
    
                /**
                 * ArtifactSpec payload.
                 * @member {Uint8Array} payload
                 * @memberof exonum.runtime.ArtifactSpec
                 * @instance
                 */
                ArtifactSpec.prototype.payload = $util.newBuffer([]);
    
                /**
                 * Creates a new ArtifactSpec instance using the specified properties.
                 * @function create
                 * @memberof exonum.runtime.ArtifactSpec
                 * @static
                 * @param {exonum.runtime.IArtifactSpec=} [properties] Properties to set
                 * @returns {exonum.runtime.ArtifactSpec} ArtifactSpec instance
                 */
                ArtifactSpec.create = function create(properties) {
                    return new ArtifactSpec(properties);
                };
    
                /**
                 * Encodes the specified ArtifactSpec message. Does not implicitly {@link exonum.runtime.ArtifactSpec.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.runtime.ArtifactSpec
                 * @static
                 * @param {exonum.runtime.IArtifactSpec} message ArtifactSpec message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ArtifactSpec.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.artifact != null && message.hasOwnProperty("artifact"))
                        $root.exonum.runtime.ArtifactId.encode(message.artifact, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.payload != null && message.hasOwnProperty("payload"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
                    return writer;
                };
    
                /**
                 * Encodes the specified ArtifactSpec message, length delimited. Does not implicitly {@link exonum.runtime.ArtifactSpec.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.runtime.ArtifactSpec
                 * @static
                 * @param {exonum.runtime.IArtifactSpec} message ArtifactSpec message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ArtifactSpec.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an ArtifactSpec message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.runtime.ArtifactSpec
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.runtime.ArtifactSpec} ArtifactSpec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ArtifactSpec.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.runtime.ArtifactSpec();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.artifact = $root.exonum.runtime.ArtifactId.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.payload = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an ArtifactSpec message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.runtime.ArtifactSpec
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.runtime.ArtifactSpec} ArtifactSpec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ArtifactSpec.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an ArtifactSpec message.
                 * @function verify
                 * @memberof exonum.runtime.ArtifactSpec
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ArtifactSpec.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.artifact != null && message.hasOwnProperty("artifact")) {
                        var error = $root.exonum.runtime.ArtifactId.verify(message.artifact);
                        if (error)
                            return "artifact." + error;
                    }
                    if (message.payload != null && message.hasOwnProperty("payload"))
                        if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                            return "payload: buffer expected";
                    return null;
                };
    
                /**
                 * Creates an ArtifactSpec message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.runtime.ArtifactSpec
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.runtime.ArtifactSpec} ArtifactSpec
                 */
                ArtifactSpec.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.runtime.ArtifactSpec)
                        return object;
                    var message = new $root.exonum.runtime.ArtifactSpec();
                    if (object.artifact != null) {
                        if (typeof object.artifact !== "object")
                            throw TypeError(".exonum.runtime.ArtifactSpec.artifact: object expected");
                        message.artifact = $root.exonum.runtime.ArtifactId.fromObject(object.artifact);
                    }
                    if (object.payload != null)
                        if (typeof object.payload === "string")
                            $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                        else if (object.payload.length)
                            message.payload = object.payload;
                    return message;
                };
    
                /**
                 * Creates a plain object from an ArtifactSpec message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.runtime.ArtifactSpec
                 * @static
                 * @param {exonum.runtime.ArtifactSpec} message ArtifactSpec
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ArtifactSpec.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.artifact = null;
                        if (options.bytes === String)
                            object.payload = "";
                        else {
                            object.payload = [];
                            if (options.bytes !== Array)
                                object.payload = $util.newBuffer(object.payload);
                        }
                    }
                    if (message.artifact != null && message.hasOwnProperty("artifact"))
                        object.artifact = $root.exonum.runtime.ArtifactId.toObject(message.artifact, options);
                    if (message.payload != null && message.hasOwnProperty("payload"))
                        object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
                    return object;
                };
    
                /**
                 * Converts this ArtifactSpec to JSON.
                 * @function toJSON
                 * @memberof exonum.runtime.ArtifactSpec
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ArtifactSpec.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return ArtifactSpec;
            })();
    
            runtime.InstanceSpec = (function() {
    
                /**
                 * Properties of an InstanceSpec.
                 * @memberof exonum.runtime
                 * @interface IInstanceSpec
                 * @property {number|null} [id] InstanceSpec id
                 * @property {string|null} [name] InstanceSpec name
                 * @property {exonum.runtime.IArtifactId|null} [artifact] InstanceSpec artifact
                 */
    
                /**
                 * Constructs a new InstanceSpec.
                 * @memberof exonum.runtime
                 * @classdesc Represents an InstanceSpec.
                 * @implements IInstanceSpec
                 * @constructor
                 * @param {exonum.runtime.IInstanceSpec=} [properties] Properties to set
                 */
                function InstanceSpec(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * InstanceSpec id.
                 * @member {number} id
                 * @memberof exonum.runtime.InstanceSpec
                 * @instance
                 */
                InstanceSpec.prototype.id = 0;
    
                /**
                 * InstanceSpec name.
                 * @member {string} name
                 * @memberof exonum.runtime.InstanceSpec
                 * @instance
                 */
                InstanceSpec.prototype.name = "";
    
                /**
                 * InstanceSpec artifact.
                 * @member {exonum.runtime.IArtifactId|null|undefined} artifact
                 * @memberof exonum.runtime.InstanceSpec
                 * @instance
                 */
                InstanceSpec.prototype.artifact = null;
    
                /**
                 * Creates a new InstanceSpec instance using the specified properties.
                 * @function create
                 * @memberof exonum.runtime.InstanceSpec
                 * @static
                 * @param {exonum.runtime.IInstanceSpec=} [properties] Properties to set
                 * @returns {exonum.runtime.InstanceSpec} InstanceSpec instance
                 */
                InstanceSpec.create = function create(properties) {
                    return new InstanceSpec(properties);
                };
    
                /**
                 * Encodes the specified InstanceSpec message. Does not implicitly {@link exonum.runtime.InstanceSpec.verify|verify} messages.
                 * @function encode
                 * @memberof exonum.runtime.InstanceSpec
                 * @static
                 * @param {exonum.runtime.IInstanceSpec} message InstanceSpec message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InstanceSpec.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && message.hasOwnProperty("id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                    if (message.artifact != null && message.hasOwnProperty("artifact"))
                        $root.exonum.runtime.ArtifactId.encode(message.artifact, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified InstanceSpec message, length delimited. Does not implicitly {@link exonum.runtime.InstanceSpec.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof exonum.runtime.InstanceSpec
                 * @static
                 * @param {exonum.runtime.IInstanceSpec} message InstanceSpec message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                InstanceSpec.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an InstanceSpec message from the specified reader or buffer.
                 * @function decode
                 * @memberof exonum.runtime.InstanceSpec
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {exonum.runtime.InstanceSpec} InstanceSpec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InstanceSpec.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.exonum.runtime.InstanceSpec();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.uint32();
                            break;
                        case 2:
                            message.name = reader.string();
                            break;
                        case 3:
                            message.artifact = $root.exonum.runtime.ArtifactId.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an InstanceSpec message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof exonum.runtime.InstanceSpec
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {exonum.runtime.InstanceSpec} InstanceSpec
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                InstanceSpec.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an InstanceSpec message.
                 * @function verify
                 * @memberof exonum.runtime.InstanceSpec
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                InstanceSpec.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isInteger(message.id))
                            return "id: integer expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.artifact != null && message.hasOwnProperty("artifact")) {
                        var error = $root.exonum.runtime.ArtifactId.verify(message.artifact);
                        if (error)
                            return "artifact." + error;
                    }
                    return null;
                };
    
                /**
                 * Creates an InstanceSpec message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof exonum.runtime.InstanceSpec
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {exonum.runtime.InstanceSpec} InstanceSpec
                 */
                InstanceSpec.fromObject = function fromObject(object) {
                    if (object instanceof $root.exonum.runtime.InstanceSpec)
                        return object;
                    var message = new $root.exonum.runtime.InstanceSpec();
                    if (object.id != null)
                        message.id = object.id >>> 0;
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.artifact != null) {
                        if (typeof object.artifact !== "object")
                            throw TypeError(".exonum.runtime.InstanceSpec.artifact: object expected");
                        message.artifact = $root.exonum.runtime.ArtifactId.fromObject(object.artifact);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from an InstanceSpec message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof exonum.runtime.InstanceSpec
                 * @static
                 * @param {exonum.runtime.InstanceSpec} message InstanceSpec
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                InstanceSpec.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = 0;
                        object.name = "";
                        object.artifact = null;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.artifact != null && message.hasOwnProperty("artifact"))
                        object.artifact = $root.exonum.runtime.ArtifactId.toObject(message.artifact, options);
                    return object;
                };
    
                /**
                 * Converts this InstanceSpec to JSON.
                 * @function toJSON
                 * @memberof exonum.runtime.InstanceSpec
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                InstanceSpec.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return InstanceSpec;
            })();
    
            return runtime;
        })();
    
        return exonum;
    })();
    
    $root.google = (function() {
    
        /**
         * Namespace google.
         * @exports google
         * @namespace
         */
        var google = {};
    
        google.protobuf = (function() {
    
            /**
             * Namespace protobuf.
             * @memberof google
             * @namespace
             */
            var protobuf = {};
    
            protobuf.Empty = (function() {
    
                /**
                 * Properties of an Empty.
                 * @memberof google.protobuf
                 * @interface IEmpty
                 */
    
                /**
                 * Constructs a new Empty.
                 * @memberof google.protobuf
                 * @classdesc Represents an Empty.
                 * @implements IEmpty
                 * @constructor
                 * @param {google.protobuf.IEmpty=} [properties] Properties to set
                 */
                function Empty(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Creates a new Empty instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {google.protobuf.IEmpty=} [properties] Properties to set
                 * @returns {google.protobuf.Empty} Empty instance
                 */
                Empty.create = function create(properties) {
                    return new Empty(properties);
                };
    
                /**
                 * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Empty.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };
    
                /**
                 * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Empty.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an Empty message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Empty} Empty
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Empty.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Empty();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Empty message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.Empty} Empty
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Empty.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an Empty message.
                 * @function verify
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Empty.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };
    
                /**
                 * Creates an Empty message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Empty} Empty
                 */
                Empty.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Empty)
                        return object;
                    return new $root.google.protobuf.Empty();
                };
    
                /**
                 * Creates a plain object from an Empty message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {google.protobuf.Empty} message Empty
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Empty.toObject = function toObject() {
                    return {};
                };
    
                /**
                 * Converts this Empty to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Empty
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Empty.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Empty;
            })();
    
            protobuf.Timestamp = (function() {
    
                /**
                 * Properties of a Timestamp.
                 * @memberof google.protobuf
                 * @interface ITimestamp
                 * @property {number|Long|null} [seconds] Timestamp seconds
                 * @property {number|null} [nanos] Timestamp nanos
                 */
    
                /**
                 * Constructs a new Timestamp.
                 * @memberof google.protobuf
                 * @classdesc Represents a Timestamp.
                 * @implements ITimestamp
                 * @constructor
                 * @param {google.protobuf.ITimestamp=} [properties] Properties to set
                 */
                function Timestamp(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Timestamp seconds.
                 * @member {number|Long} seconds
                 * @memberof google.protobuf.Timestamp
                 * @instance
                 */
                Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
                /**
                 * Timestamp nanos.
                 * @member {number} nanos
                 * @memberof google.protobuf.Timestamp
                 * @instance
                 */
                Timestamp.prototype.nanos = 0;
    
                /**
                 * Creates a new Timestamp instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {google.protobuf.ITimestamp=} [properties] Properties to set
                 * @returns {google.protobuf.Timestamp} Timestamp instance
                 */
                Timestamp.create = function create(properties) {
                    return new Timestamp(properties);
                };
    
                /**
                 * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Timestamp.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                    return writer;
                };
    
                /**
                 * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Timestamp message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Timestamp} Timestamp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Timestamp.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.seconds = reader.int64();
                            break;
                        case 2:
                            message.nanos = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Timestamp message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.Timestamp} Timestamp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Timestamp.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Timestamp message.
                 * @function verify
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Timestamp.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                            return "seconds: integer|Long expected";
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        if (!$util.isInteger(message.nanos))
                            return "nanos: integer expected";
                    return null;
                };
    
                /**
                 * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Timestamp} Timestamp
                 */
                Timestamp.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Timestamp)
                        return object;
                    var message = new $root.google.protobuf.Timestamp();
                    if (object.seconds != null)
                        if ($util.Long)
                            (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                        else if (typeof object.seconds === "string")
                            message.seconds = parseInt(object.seconds, 10);
                        else if (typeof object.seconds === "number")
                            message.seconds = object.seconds;
                        else if (typeof object.seconds === "object")
                            message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                    if (object.nanos != null)
                        message.nanos = object.nanos | 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Timestamp
                 * @static
                 * @param {google.protobuf.Timestamp} message Timestamp
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Timestamp.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.seconds = options.longs === String ? "0" : 0;
                        object.nanos = 0;
                    }
                    if (message.seconds != null && message.hasOwnProperty("seconds"))
                        if (typeof message.seconds === "number")
                            object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                        else
                            object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                    if (message.nanos != null && message.hasOwnProperty("nanos"))
                        object.nanos = message.nanos;
                    return object;
                };
    
                /**
                 * Converts this Timestamp to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Timestamp
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Timestamp.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Timestamp;
            })();
    
            return protobuf;
        })();
    
        return google;
    })();
    
    $root.votings_service = (function() {
    
        /**
         * Namespace votings_service.
         * @exports votings_service
         * @namespace
         */
        var votings_service = {};
    
        votings_service.ServiceConfig = (function() {
    
            /**
             * Properties of a ServiceConfig.
             * @memberof votings_service
             * @interface IServiceConfig
             * @property {Array.<string>|null} [api_public_keys] ServiceConfig api_public_keys
             */
    
            /**
             * Constructs a new ServiceConfig.
             * @memberof votings_service
             * @classdesc Represents a ServiceConfig.
             * @implements IServiceConfig
             * @constructor
             * @param {votings_service.IServiceConfig=} [properties] Properties to set
             */
            function ServiceConfig(properties) {
                this.api_public_keys = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ServiceConfig api_public_keys.
             * @member {Array.<string>} api_public_keys
             * @memberof votings_service.ServiceConfig
             * @instance
             */
            ServiceConfig.prototype.api_public_keys = $util.emptyArray;
    
            /**
             * Creates a new ServiceConfig instance using the specified properties.
             * @function create
             * @memberof votings_service.ServiceConfig
             * @static
             * @param {votings_service.IServiceConfig=} [properties] Properties to set
             * @returns {votings_service.ServiceConfig} ServiceConfig instance
             */
            ServiceConfig.create = function create(properties) {
                return new ServiceConfig(properties);
            };
    
            /**
             * Encodes the specified ServiceConfig message. Does not implicitly {@link votings_service.ServiceConfig.verify|verify} messages.
             * @function encode
             * @memberof votings_service.ServiceConfig
             * @static
             * @param {votings_service.IServiceConfig} message ServiceConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.api_public_keys != null && message.api_public_keys.length)
                    for (var i = 0; i < message.api_public_keys.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.api_public_keys[i]);
                return writer;
            };
    
            /**
             * Encodes the specified ServiceConfig message, length delimited. Does not implicitly {@link votings_service.ServiceConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.ServiceConfig
             * @static
             * @param {votings_service.IServiceConfig} message ServiceConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ServiceConfig message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.ServiceConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.ServiceConfig} ServiceConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServiceConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.ServiceConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.api_public_keys && message.api_public_keys.length))
                            message.api_public_keys = [];
                        message.api_public_keys.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ServiceConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.ServiceConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.ServiceConfig} ServiceConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServiceConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ServiceConfig message.
             * @function verify
             * @memberof votings_service.ServiceConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServiceConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.api_public_keys != null && message.hasOwnProperty("api_public_keys")) {
                    if (!Array.isArray(message.api_public_keys))
                        return "api_public_keys: array expected";
                    for (var i = 0; i < message.api_public_keys.length; ++i)
                        if (!$util.isString(message.api_public_keys[i]))
                            return "api_public_keys: string[] expected";
                }
                return null;
            };
    
            /**
             * Creates a ServiceConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.ServiceConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.ServiceConfig} ServiceConfig
             */
            ServiceConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.ServiceConfig)
                    return object;
                var message = new $root.votings_service.ServiceConfig();
                if (object.api_public_keys) {
                    if (!Array.isArray(object.api_public_keys))
                        throw TypeError(".votings_service.ServiceConfig.api_public_keys: array expected");
                    message.api_public_keys = [];
                    for (var i = 0; i < object.api_public_keys.length; ++i)
                        message.api_public_keys[i] = String(object.api_public_keys[i]);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ServiceConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.ServiceConfig
             * @static
             * @param {votings_service.ServiceConfig} message ServiceConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServiceConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.api_public_keys = [];
                if (message.api_public_keys && message.api_public_keys.length) {
                    object.api_public_keys = [];
                    for (var j = 0; j < message.api_public_keys.length; ++j)
                        object.api_public_keys[j] = message.api_public_keys[j];
                }
                return object;
            };
    
            /**
             * Converts this ServiceConfig to JSON.
             * @function toJSON
             * @memberof votings_service.ServiceConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServiceConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ServiceConfig;
        })();
    
        votings_service.BigUint = (function() {
    
            /**
             * Properties of a BigUint.
             * @memberof votings_service
             * @interface IBigUint
             * @property {Uint8Array|null} [data] BigUint data
             */
    
            /**
             * Constructs a new BigUint.
             * @memberof votings_service
             * @classdesc Represents a BigUint.
             * @implements IBigUint
             * @constructor
             * @param {votings_service.IBigUint=} [properties] Properties to set
             */
            function BigUint(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BigUint data.
             * @member {Uint8Array} data
             * @memberof votings_service.BigUint
             * @instance
             */
            BigUint.prototype.data = $util.newBuffer([]);
    
            /**
             * Creates a new BigUint instance using the specified properties.
             * @function create
             * @memberof votings_service.BigUint
             * @static
             * @param {votings_service.IBigUint=} [properties] Properties to set
             * @returns {votings_service.BigUint} BigUint instance
             */
            BigUint.create = function create(properties) {
                return new BigUint(properties);
            };
    
            /**
             * Encodes the specified BigUint message. Does not implicitly {@link votings_service.BigUint.verify|verify} messages.
             * @function encode
             * @memberof votings_service.BigUint
             * @static
             * @param {votings_service.IBigUint} message BigUint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BigUint.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                return writer;
            };
    
            /**
             * Encodes the specified BigUint message, length delimited. Does not implicitly {@link votings_service.BigUint.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.BigUint
             * @static
             * @param {votings_service.IBigUint} message BigUint message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BigUint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BigUint message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.BigUint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.BigUint} BigUint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BigUint.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.BigUint();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BigUint message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.BigUint
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.BigUint} BigUint
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BigUint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BigUint message.
             * @function verify
             * @memberof votings_service.BigUint
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BigUint.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };
    
            /**
             * Creates a BigUint message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.BigUint
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.BigUint} BigUint
             */
            BigUint.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.BigUint)
                    return object;
                var message = new $root.votings_service.BigUint();
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                return message;
            };
    
            /**
             * Creates a plain object from a BigUint message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.BigUint
             * @static
             * @param {votings_service.BigUint} message BigUint
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BigUint.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                return object;
            };
    
            /**
             * Converts this BigUint to JSON.
             * @function toJSON
             * @memberof votings_service.BigUint
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BigUint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BigUint;
        })();
    
        votings_service.SealedBoxPublicKey = (function() {
    
            /**
             * Properties of a SealedBoxPublicKey.
             * @memberof votings_service
             * @interface ISealedBoxPublicKey
             * @property {Uint8Array|null} [data] SealedBoxPublicKey data
             */
    
            /**
             * Constructs a new SealedBoxPublicKey.
             * @memberof votings_service
             * @classdesc Represents a SealedBoxPublicKey.
             * @implements ISealedBoxPublicKey
             * @constructor
             * @param {votings_service.ISealedBoxPublicKey=} [properties] Properties to set
             */
            function SealedBoxPublicKey(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SealedBoxPublicKey data.
             * @member {Uint8Array} data
             * @memberof votings_service.SealedBoxPublicKey
             * @instance
             */
            SealedBoxPublicKey.prototype.data = $util.newBuffer([]);
    
            /**
             * Creates a new SealedBoxPublicKey instance using the specified properties.
             * @function create
             * @memberof votings_service.SealedBoxPublicKey
             * @static
             * @param {votings_service.ISealedBoxPublicKey=} [properties] Properties to set
             * @returns {votings_service.SealedBoxPublicKey} SealedBoxPublicKey instance
             */
            SealedBoxPublicKey.create = function create(properties) {
                return new SealedBoxPublicKey(properties);
            };
    
            /**
             * Encodes the specified SealedBoxPublicKey message. Does not implicitly {@link votings_service.SealedBoxPublicKey.verify|verify} messages.
             * @function encode
             * @memberof votings_service.SealedBoxPublicKey
             * @static
             * @param {votings_service.ISealedBoxPublicKey} message SealedBoxPublicKey message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SealedBoxPublicKey.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                return writer;
            };
    
            /**
             * Encodes the specified SealedBoxPublicKey message, length delimited. Does not implicitly {@link votings_service.SealedBoxPublicKey.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.SealedBoxPublicKey
             * @static
             * @param {votings_service.ISealedBoxPublicKey} message SealedBoxPublicKey message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SealedBoxPublicKey.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SealedBoxPublicKey message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.SealedBoxPublicKey
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.SealedBoxPublicKey} SealedBoxPublicKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SealedBoxPublicKey.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.SealedBoxPublicKey();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SealedBoxPublicKey message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.SealedBoxPublicKey
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.SealedBoxPublicKey} SealedBoxPublicKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SealedBoxPublicKey.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SealedBoxPublicKey message.
             * @function verify
             * @memberof votings_service.SealedBoxPublicKey
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SealedBoxPublicKey.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };
    
            /**
             * Creates a SealedBoxPublicKey message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.SealedBoxPublicKey
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.SealedBoxPublicKey} SealedBoxPublicKey
             */
            SealedBoxPublicKey.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.SealedBoxPublicKey)
                    return object;
                var message = new $root.votings_service.SealedBoxPublicKey();
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                return message;
            };
    
            /**
             * Creates a plain object from a SealedBoxPublicKey message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.SealedBoxPublicKey
             * @static
             * @param {votings_service.SealedBoxPublicKey} message SealedBoxPublicKey
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SealedBoxPublicKey.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                return object;
            };
    
            /**
             * Converts this SealedBoxPublicKey to JSON.
             * @function toJSON
             * @memberof votings_service.SealedBoxPublicKey
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SealedBoxPublicKey.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SealedBoxPublicKey;
        })();
    
        votings_service.SealedBoxSecretKey = (function() {
    
            /**
             * Properties of a SealedBoxSecretKey.
             * @memberof votings_service
             * @interface ISealedBoxSecretKey
             * @property {Uint8Array|null} [data] SealedBoxSecretKey data
             */
    
            /**
             * Constructs a new SealedBoxSecretKey.
             * @memberof votings_service
             * @classdesc Represents a SealedBoxSecretKey.
             * @implements ISealedBoxSecretKey
             * @constructor
             * @param {votings_service.ISealedBoxSecretKey=} [properties] Properties to set
             */
            function SealedBoxSecretKey(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SealedBoxSecretKey data.
             * @member {Uint8Array} data
             * @memberof votings_service.SealedBoxSecretKey
             * @instance
             */
            SealedBoxSecretKey.prototype.data = $util.newBuffer([]);
    
            /**
             * Creates a new SealedBoxSecretKey instance using the specified properties.
             * @function create
             * @memberof votings_service.SealedBoxSecretKey
             * @static
             * @param {votings_service.ISealedBoxSecretKey=} [properties] Properties to set
             * @returns {votings_service.SealedBoxSecretKey} SealedBoxSecretKey instance
             */
            SealedBoxSecretKey.create = function create(properties) {
                return new SealedBoxSecretKey(properties);
            };
    
            /**
             * Encodes the specified SealedBoxSecretKey message. Does not implicitly {@link votings_service.SealedBoxSecretKey.verify|verify} messages.
             * @function encode
             * @memberof votings_service.SealedBoxSecretKey
             * @static
             * @param {votings_service.ISealedBoxSecretKey} message SealedBoxSecretKey message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SealedBoxSecretKey.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                return writer;
            };
    
            /**
             * Encodes the specified SealedBoxSecretKey message, length delimited. Does not implicitly {@link votings_service.SealedBoxSecretKey.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.SealedBoxSecretKey
             * @static
             * @param {votings_service.ISealedBoxSecretKey} message SealedBoxSecretKey message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SealedBoxSecretKey.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SealedBoxSecretKey message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.SealedBoxSecretKey
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.SealedBoxSecretKey} SealedBoxSecretKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SealedBoxSecretKey.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.SealedBoxSecretKey();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SealedBoxSecretKey message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.SealedBoxSecretKey
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.SealedBoxSecretKey} SealedBoxSecretKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SealedBoxSecretKey.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SealedBoxSecretKey message.
             * @function verify
             * @memberof votings_service.SealedBoxSecretKey
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SealedBoxSecretKey.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };
    
            /**
             * Creates a SealedBoxSecretKey message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.SealedBoxSecretKey
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.SealedBoxSecretKey} SealedBoxSecretKey
             */
            SealedBoxSecretKey.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.SealedBoxSecretKey)
                    return object;
                var message = new $root.votings_service.SealedBoxSecretKey();
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                return message;
            };
    
            /**
             * Creates a plain object from a SealedBoxSecretKey message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.SealedBoxSecretKey
             * @static
             * @param {votings_service.SealedBoxSecretKey} message SealedBoxSecretKey
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SealedBoxSecretKey.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                return object;
            };
    
            /**
             * Converts this SealedBoxSecretKey to JSON.
             * @function toJSON
             * @memberof votings_service.SealedBoxSecretKey
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SealedBoxSecretKey.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SealedBoxSecretKey;
        })();
    
        votings_service.SealedBoxNonce = (function() {
    
            /**
             * Properties of a SealedBoxNonce.
             * @memberof votings_service
             * @interface ISealedBoxNonce
             * @property {Uint8Array|null} [data] SealedBoxNonce data
             */
    
            /**
             * Constructs a new SealedBoxNonce.
             * @memberof votings_service
             * @classdesc Represents a SealedBoxNonce.
             * @implements ISealedBoxNonce
             * @constructor
             * @param {votings_service.ISealedBoxNonce=} [properties] Properties to set
             */
            function SealedBoxNonce(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SealedBoxNonce data.
             * @member {Uint8Array} data
             * @memberof votings_service.SealedBoxNonce
             * @instance
             */
            SealedBoxNonce.prototype.data = $util.newBuffer([]);
    
            /**
             * Creates a new SealedBoxNonce instance using the specified properties.
             * @function create
             * @memberof votings_service.SealedBoxNonce
             * @static
             * @param {votings_service.ISealedBoxNonce=} [properties] Properties to set
             * @returns {votings_service.SealedBoxNonce} SealedBoxNonce instance
             */
            SealedBoxNonce.create = function create(properties) {
                return new SealedBoxNonce(properties);
            };
    
            /**
             * Encodes the specified SealedBoxNonce message. Does not implicitly {@link votings_service.SealedBoxNonce.verify|verify} messages.
             * @function encode
             * @memberof votings_service.SealedBoxNonce
             * @static
             * @param {votings_service.ISealedBoxNonce} message SealedBoxNonce message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SealedBoxNonce.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                return writer;
            };
    
            /**
             * Encodes the specified SealedBoxNonce message, length delimited. Does not implicitly {@link votings_service.SealedBoxNonce.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.SealedBoxNonce
             * @static
             * @param {votings_service.ISealedBoxNonce} message SealedBoxNonce message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SealedBoxNonce.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SealedBoxNonce message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.SealedBoxNonce
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.SealedBoxNonce} SealedBoxNonce
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SealedBoxNonce.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.SealedBoxNonce();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SealedBoxNonce message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.SealedBoxNonce
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.SealedBoxNonce} SealedBoxNonce
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SealedBoxNonce.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SealedBoxNonce message.
             * @function verify
             * @memberof votings_service.SealedBoxNonce
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SealedBoxNonce.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };
    
            /**
             * Creates a SealedBoxNonce message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.SealedBoxNonce
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.SealedBoxNonce} SealedBoxNonce
             */
            SealedBoxNonce.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.SealedBoxNonce)
                    return object;
                var message = new $root.votings_service.SealedBoxNonce();
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                return message;
            };
    
            /**
             * Creates a plain object from a SealedBoxNonce message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.SealedBoxNonce
             * @static
             * @param {votings_service.SealedBoxNonce} message SealedBoxNonce
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SealedBoxNonce.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                return object;
            };
    
            /**
             * Converts this SealedBoxNonce to JSON.
             * @function toJSON
             * @memberof votings_service.SealedBoxNonce
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SealedBoxNonce.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SealedBoxNonce;
        })();
    
        /**
         * VotingState enum.
         * @name votings_service.VotingState
         * @enum {string}
         * @property {number} Registration=0 Registration value
         * @property {number} InProcess=1 InProcess value
         * @property {number} Stopped=2 Stopped value
         * @property {number} Finished=3 Finished value
         */
        votings_service.VotingState = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Registration"] = 0;
            values[valuesById[1] = "InProcess"] = 1;
            values[valuesById[2] = "Stopped"] = 2;
            values[valuesById[3] = "Finished"] = 3;
            return values;
        })();
    
        /**
         * InvalidReason enum.
         * @name votings_service.InvalidReason
         * @enum {string}
         * @property {number} WrongDistrict=0 WrongDistrict value
         * @property {number} DecryptionError=1 DecryptionError value
         */
        votings_service.InvalidReason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "WrongDistrict"] = 0;
            values[valuesById[1] = "DecryptionError"] = 1;
            return values;
        })();
    
        votings_service.CryptoSystemSettings = (function() {
    
            /**
             * Properties of a CryptoSystemSettings.
             * @memberof votings_service
             * @interface ICryptoSystemSettings
             * @property {votings_service.ISealedBoxPublicKey|null} [public_key] CryptoSystemSettings public_key
             * @property {votings_service.ISealedBoxSecretKey|null} [private_key] CryptoSystemSettings private_key
             */
    
            /**
             * Constructs a new CryptoSystemSettings.
             * @memberof votings_service
             * @classdesc Represents a CryptoSystemSettings.
             * @implements ICryptoSystemSettings
             * @constructor
             * @param {votings_service.ICryptoSystemSettings=} [properties] Properties to set
             */
            function CryptoSystemSettings(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * CryptoSystemSettings public_key.
             * @member {votings_service.ISealedBoxPublicKey|null|undefined} public_key
             * @memberof votings_service.CryptoSystemSettings
             * @instance
             */
            CryptoSystemSettings.prototype.public_key = null;
    
            /**
             * CryptoSystemSettings private_key.
             * @member {votings_service.ISealedBoxSecretKey|null|undefined} private_key
             * @memberof votings_service.CryptoSystemSettings
             * @instance
             */
            CryptoSystemSettings.prototype.private_key = null;
    
            /**
             * Creates a new CryptoSystemSettings instance using the specified properties.
             * @function create
             * @memberof votings_service.CryptoSystemSettings
             * @static
             * @param {votings_service.ICryptoSystemSettings=} [properties] Properties to set
             * @returns {votings_service.CryptoSystemSettings} CryptoSystemSettings instance
             */
            CryptoSystemSettings.create = function create(properties) {
                return new CryptoSystemSettings(properties);
            };
    
            /**
             * Encodes the specified CryptoSystemSettings message. Does not implicitly {@link votings_service.CryptoSystemSettings.verify|verify} messages.
             * @function encode
             * @memberof votings_service.CryptoSystemSettings
             * @static
             * @param {votings_service.ICryptoSystemSettings} message CryptoSystemSettings message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CryptoSystemSettings.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.public_key != null && message.hasOwnProperty("public_key"))
                    $root.votings_service.SealedBoxPublicKey.encode(message.public_key, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.private_key != null && message.hasOwnProperty("private_key"))
                    $root.votings_service.SealedBoxSecretKey.encode(message.private_key, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified CryptoSystemSettings message, length delimited. Does not implicitly {@link votings_service.CryptoSystemSettings.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.CryptoSystemSettings
             * @static
             * @param {votings_service.ICryptoSystemSettings} message CryptoSystemSettings message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CryptoSystemSettings.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CryptoSystemSettings message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.CryptoSystemSettings
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.CryptoSystemSettings} CryptoSystemSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CryptoSystemSettings.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.CryptoSystemSettings();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.public_key = $root.votings_service.SealedBoxPublicKey.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.private_key = $root.votings_service.SealedBoxSecretKey.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CryptoSystemSettings message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.CryptoSystemSettings
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.CryptoSystemSettings} CryptoSystemSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CryptoSystemSettings.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CryptoSystemSettings message.
             * @function verify
             * @memberof votings_service.CryptoSystemSettings
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CryptoSystemSettings.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.public_key != null && message.hasOwnProperty("public_key")) {
                    var error = $root.votings_service.SealedBoxPublicKey.verify(message.public_key);
                    if (error)
                        return "public_key." + error;
                }
                if (message.private_key != null && message.hasOwnProperty("private_key")) {
                    var error = $root.votings_service.SealedBoxSecretKey.verify(message.private_key);
                    if (error)
                        return "private_key." + error;
                }
                return null;
            };
    
            /**
             * Creates a CryptoSystemSettings message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.CryptoSystemSettings
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.CryptoSystemSettings} CryptoSystemSettings
             */
            CryptoSystemSettings.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.CryptoSystemSettings)
                    return object;
                var message = new $root.votings_service.CryptoSystemSettings();
                if (object.public_key != null) {
                    if (typeof object.public_key !== "object")
                        throw TypeError(".votings_service.CryptoSystemSettings.public_key: object expected");
                    message.public_key = $root.votings_service.SealedBoxPublicKey.fromObject(object.public_key);
                }
                if (object.private_key != null) {
                    if (typeof object.private_key !== "object")
                        throw TypeError(".votings_service.CryptoSystemSettings.private_key: object expected");
                    message.private_key = $root.votings_service.SealedBoxSecretKey.fromObject(object.private_key);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a CryptoSystemSettings message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.CryptoSystemSettings
             * @static
             * @param {votings_service.CryptoSystemSettings} message CryptoSystemSettings
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CryptoSystemSettings.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.public_key = null;
                    object.private_key = null;
                }
                if (message.public_key != null && message.hasOwnProperty("public_key"))
                    object.public_key = $root.votings_service.SealedBoxPublicKey.toObject(message.public_key, options);
                if (message.private_key != null && message.hasOwnProperty("private_key"))
                    object.private_key = $root.votings_service.SealedBoxSecretKey.toObject(message.private_key, options);
                return object;
            };
    
            /**
             * Converts this CryptoSystemSettings to JSON.
             * @function toJSON
             * @memberof votings_service.CryptoSystemSettings
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CryptoSystemSettings.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CryptoSystemSettings;
        })();
    
        votings_service.BallotConfig = (function() {
    
            /**
             * Properties of a BallotConfig.
             * @memberof votings_service
             * @interface IBallotConfig
             * @property {number|null} [district_id] BallotConfig district_id
             * @property {string|null} [question] BallotConfig question
             * @property {Object.<string,string>|null} [options] BallotConfig options
             * @property {number|null} [min_choices] BallotConfig min_choices
             * @property {number|null} [max_choices] BallotConfig max_choices
             */
    
            /**
             * Constructs a new BallotConfig.
             * @memberof votings_service
             * @classdesc Represents a BallotConfig.
             * @implements IBallotConfig
             * @constructor
             * @param {votings_service.IBallotConfig=} [properties] Properties to set
             */
            function BallotConfig(properties) {
                this.options = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BallotConfig district_id.
             * @member {number} district_id
             * @memberof votings_service.BallotConfig
             * @instance
             */
            BallotConfig.prototype.district_id = 0;
    
            /**
             * BallotConfig question.
             * @member {string} question
             * @memberof votings_service.BallotConfig
             * @instance
             */
            BallotConfig.prototype.question = "";
    
            /**
             * BallotConfig options.
             * @member {Object.<string,string>} options
             * @memberof votings_service.BallotConfig
             * @instance
             */
            BallotConfig.prototype.options = $util.emptyObject;
    
            /**
             * BallotConfig min_choices.
             * @member {number} min_choices
             * @memberof votings_service.BallotConfig
             * @instance
             */
            BallotConfig.prototype.min_choices = 0;
    
            /**
             * BallotConfig max_choices.
             * @member {number} max_choices
             * @memberof votings_service.BallotConfig
             * @instance
             */
            BallotConfig.prototype.max_choices = 0;
    
            /**
             * Creates a new BallotConfig instance using the specified properties.
             * @function create
             * @memberof votings_service.BallotConfig
             * @static
             * @param {votings_service.IBallotConfig=} [properties] Properties to set
             * @returns {votings_service.BallotConfig} BallotConfig instance
             */
            BallotConfig.create = function create(properties) {
                return new BallotConfig(properties);
            };
    
            /**
             * Encodes the specified BallotConfig message. Does not implicitly {@link votings_service.BallotConfig.verify|verify} messages.
             * @function encode
             * @memberof votings_service.BallotConfig
             * @static
             * @param {votings_service.IBallotConfig} message BallotConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BallotConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.district_id);
                if (message.question != null && message.hasOwnProperty("question"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.question);
                if (message.options != null && message.hasOwnProperty("options"))
                    for (var keys = Object.keys(message.options), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.options[keys[i]]).ldelim();
                if (message.min_choices != null && message.hasOwnProperty("min_choices"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.min_choices);
                if (message.max_choices != null && message.hasOwnProperty("max_choices"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.max_choices);
                return writer;
            };
    
            /**
             * Encodes the specified BallotConfig message, length delimited. Does not implicitly {@link votings_service.BallotConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.BallotConfig
             * @static
             * @param {votings_service.IBallotConfig} message BallotConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BallotConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BallotConfig message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.BallotConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.BallotConfig} BallotConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BallotConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.BallotConfig(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.district_id = reader.uint32();
                        break;
                    case 2:
                        message.question = reader.string();
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.options === $util.emptyObject)
                            message.options = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.options[key] = reader.string();
                        break;
                    case 4:
                        message.min_choices = reader.uint32();
                        break;
                    case 5:
                        message.max_choices = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BallotConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.BallotConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.BallotConfig} BallotConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BallotConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BallotConfig message.
             * @function verify
             * @memberof votings_service.BallotConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BallotConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.question != null && message.hasOwnProperty("question"))
                    if (!$util.isString(message.question))
                        return "question: string expected";
                if (message.options != null && message.hasOwnProperty("options")) {
                    if (!$util.isObject(message.options))
                        return "options: object expected";
                    var key = Object.keys(message.options);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "options: integer key{k:uint32} expected";
                        if (!$util.isString(message.options[key[i]]))
                            return "options: string{k:uint32} expected";
                    }
                }
                if (message.min_choices != null && message.hasOwnProperty("min_choices"))
                    if (!$util.isInteger(message.min_choices))
                        return "min_choices: integer expected";
                if (message.max_choices != null && message.hasOwnProperty("max_choices"))
                    if (!$util.isInteger(message.max_choices))
                        return "max_choices: integer expected";
                return null;
            };
    
            /**
             * Creates a BallotConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.BallotConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.BallotConfig} BallotConfig
             */
            BallotConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.BallotConfig)
                    return object;
                var message = new $root.votings_service.BallotConfig();
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.question != null)
                    message.question = String(object.question);
                if (object.options) {
                    if (typeof object.options !== "object")
                        throw TypeError(".votings_service.BallotConfig.options: object expected");
                    message.options = {};
                    for (var keys = Object.keys(object.options), i = 0; i < keys.length; ++i)
                        message.options[keys[i]] = String(object.options[keys[i]]);
                }
                if (object.min_choices != null)
                    message.min_choices = object.min_choices >>> 0;
                if (object.max_choices != null)
                    message.max_choices = object.max_choices >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a BallotConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.BallotConfig
             * @static
             * @param {votings_service.BallotConfig} message BallotConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BallotConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.options = {};
                if (options.defaults) {
                    object.district_id = 0;
                    object.question = "";
                    object.min_choices = 0;
                    object.max_choices = 0;
                }
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                if (message.question != null && message.hasOwnProperty("question"))
                    object.question = message.question;
                var keys2;
                if (message.options && (keys2 = Object.keys(message.options)).length) {
                    object.options = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.options[keys2[j]] = message.options[keys2[j]];
                }
                if (message.min_choices != null && message.hasOwnProperty("min_choices"))
                    object.min_choices = message.min_choices;
                if (message.max_choices != null && message.hasOwnProperty("max_choices"))
                    object.max_choices = message.max_choices;
                return object;
            };
    
            /**
             * Converts this BallotConfig to JSON.
             * @function toJSON
             * @memberof votings_service.BallotConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BallotConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BallotConfig;
        })();
    
        votings_service.Voting = (function() {
    
            /**
             * Properties of a Voting.
             * @memberof votings_service
             * @interface IVoting
             * @property {string|null} [voting_id] Voting voting_id
             * @property {votings_service.ICryptoSystemSettings|null} [crypto_system] Voting crypto_system
             * @property {Object.<string,votings_service.IBallotConfig>|null} [ballots_config] Voting ballots_config
             * @property {votings_service.VotingState|null} [state] Voting state
             * @property {boolean|null} [revote_enabled] Voting revote_enabled
             */
    
            /**
             * Constructs a new Voting.
             * @memberof votings_service
             * @classdesc Represents a Voting.
             * @implements IVoting
             * @constructor
             * @param {votings_service.IVoting=} [properties] Properties to set
             */
            function Voting(properties) {
                this.ballots_config = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Voting voting_id.
             * @member {string} voting_id
             * @memberof votings_service.Voting
             * @instance
             */
            Voting.prototype.voting_id = "";
    
            /**
             * Voting crypto_system.
             * @member {votings_service.ICryptoSystemSettings|null|undefined} crypto_system
             * @memberof votings_service.Voting
             * @instance
             */
            Voting.prototype.crypto_system = null;
    
            /**
             * Voting ballots_config.
             * @member {Object.<string,votings_service.IBallotConfig>} ballots_config
             * @memberof votings_service.Voting
             * @instance
             */
            Voting.prototype.ballots_config = $util.emptyObject;
    
            /**
             * Voting state.
             * @member {votings_service.VotingState} state
             * @memberof votings_service.Voting
             * @instance
             */
            Voting.prototype.state = 0;
    
            /**
             * Voting revote_enabled.
             * @member {boolean} revote_enabled
             * @memberof votings_service.Voting
             * @instance
             */
            Voting.prototype.revote_enabled = false;
    
            /**
             * Creates a new Voting instance using the specified properties.
             * @function create
             * @memberof votings_service.Voting
             * @static
             * @param {votings_service.IVoting=} [properties] Properties to set
             * @returns {votings_service.Voting} Voting instance
             */
            Voting.create = function create(properties) {
                return new Voting(properties);
            };
    
            /**
             * Encodes the specified Voting message. Does not implicitly {@link votings_service.Voting.verify|verify} messages.
             * @function encode
             * @memberof votings_service.Voting
             * @static
             * @param {votings_service.IVoting} message Voting message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Voting.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.crypto_system != null && message.hasOwnProperty("crypto_system"))
                    $root.votings_service.CryptoSystemSettings.encode(message.crypto_system, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.ballots_config != null && message.hasOwnProperty("ballots_config"))
                    for (var keys = Object.keys(message.ballots_config), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                        $root.votings_service.BallotConfig.encode(message.ballots_config[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.state);
                if (message.revote_enabled != null && message.hasOwnProperty("revote_enabled"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.revote_enabled);
                return writer;
            };
    
            /**
             * Encodes the specified Voting message, length delimited. Does not implicitly {@link votings_service.Voting.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.Voting
             * @static
             * @param {votings_service.IVoting} message Voting message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Voting.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Voting message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.Voting
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.Voting} Voting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Voting.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.Voting(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.crypto_system = $root.votings_service.CryptoSystemSettings.decode(reader, reader.uint32());
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.ballots_config === $util.emptyObject)
                            message.ballots_config = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.ballots_config[key] = $root.votings_service.BallotConfig.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.state = reader.int32();
                        break;
                    case 5:
                        message.revote_enabled = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Voting message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.Voting
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.Voting} Voting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Voting.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Voting message.
             * @function verify
             * @memberof votings_service.Voting
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Voting.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.crypto_system != null && message.hasOwnProperty("crypto_system")) {
                    var error = $root.votings_service.CryptoSystemSettings.verify(message.crypto_system);
                    if (error)
                        return "crypto_system." + error;
                }
                if (message.ballots_config != null && message.hasOwnProperty("ballots_config")) {
                    if (!$util.isObject(message.ballots_config))
                        return "ballots_config: object expected";
                    var key = Object.keys(message.ballots_config);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "ballots_config: integer key{k:uint32} expected";
                        {
                            var error = $root.votings_service.BallotConfig.verify(message.ballots_config[key[i]]);
                            if (error)
                                return "ballots_config." + error;
                        }
                    }
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.revote_enabled != null && message.hasOwnProperty("revote_enabled"))
                    if (typeof message.revote_enabled !== "boolean")
                        return "revote_enabled: boolean expected";
                return null;
            };
    
            /**
             * Creates a Voting message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.Voting
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.Voting} Voting
             */
            Voting.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.Voting)
                    return object;
                var message = new $root.votings_service.Voting();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.crypto_system != null) {
                    if (typeof object.crypto_system !== "object")
                        throw TypeError(".votings_service.Voting.crypto_system: object expected");
                    message.crypto_system = $root.votings_service.CryptoSystemSettings.fromObject(object.crypto_system);
                }
                if (object.ballots_config) {
                    if (typeof object.ballots_config !== "object")
                        throw TypeError(".votings_service.Voting.ballots_config: object expected");
                    message.ballots_config = {};
                    for (var keys = Object.keys(object.ballots_config), i = 0; i < keys.length; ++i) {
                        if (typeof object.ballots_config[keys[i]] !== "object")
                            throw TypeError(".votings_service.Voting.ballots_config: object expected");
                        message.ballots_config[keys[i]] = $root.votings_service.BallotConfig.fromObject(object.ballots_config[keys[i]]);
                    }
                }
                switch (object.state) {
                case "Registration":
                case 0:
                    message.state = 0;
                    break;
                case "InProcess":
                case 1:
                    message.state = 1;
                    break;
                case "Stopped":
                case 2:
                    message.state = 2;
                    break;
                case "Finished":
                case 3:
                    message.state = 3;
                    break;
                }
                if (object.revote_enabled != null)
                    message.revote_enabled = Boolean(object.revote_enabled);
                return message;
            };
    
            /**
             * Creates a plain object from a Voting message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.Voting
             * @static
             * @param {votings_service.Voting} message Voting
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Voting.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.ballots_config = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.crypto_system = null;
                    object.state = options.enums === String ? "Registration" : 0;
                    object.revote_enabled = false;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.crypto_system != null && message.hasOwnProperty("crypto_system"))
                    object.crypto_system = $root.votings_service.CryptoSystemSettings.toObject(message.crypto_system, options);
                var keys2;
                if (message.ballots_config && (keys2 = Object.keys(message.ballots_config)).length) {
                    object.ballots_config = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.ballots_config[keys2[j]] = $root.votings_service.BallotConfig.toObject(message.ballots_config[keys2[j]], options);
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.votings_service.VotingState[message.state] : message.state;
                if (message.revote_enabled != null && message.hasOwnProperty("revote_enabled"))
                    object.revote_enabled = message.revote_enabled;
                return object;
            };
    
            /**
             * Converts this Voting to JSON.
             * @function toJSON
             * @memberof votings_service.Voting
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Voting.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Voting;
        })();
    
        votings_service.VotersRegistry = (function() {
    
            /**
             * Properties of a VotersRegistry.
             * @memberof votings_service
             * @interface IVotersRegistry
             * @property {string|null} [voting_id] VotersRegistry voting_id
             * @property {number|null} [voters_amount] VotersRegistry voters_amount
             * @property {Object.<string,number>|null} [issued_ballots_counter] VotersRegistry issued_ballots_counter
             */
    
            /**
             * Constructs a new VotersRegistry.
             * @memberof votings_service
             * @classdesc Represents a VotersRegistry.
             * @implements IVotersRegistry
             * @constructor
             * @param {votings_service.IVotersRegistry=} [properties] Properties to set
             */
            function VotersRegistry(properties) {
                this.issued_ballots_counter = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * VotersRegistry voting_id.
             * @member {string} voting_id
             * @memberof votings_service.VotersRegistry
             * @instance
             */
            VotersRegistry.prototype.voting_id = "";
    
            /**
             * VotersRegistry voters_amount.
             * @member {number} voters_amount
             * @memberof votings_service.VotersRegistry
             * @instance
             */
            VotersRegistry.prototype.voters_amount = 0;
    
            /**
             * VotersRegistry issued_ballots_counter.
             * @member {Object.<string,number>} issued_ballots_counter
             * @memberof votings_service.VotersRegistry
             * @instance
             */
            VotersRegistry.prototype.issued_ballots_counter = $util.emptyObject;
    
            /**
             * Creates a new VotersRegistry instance using the specified properties.
             * @function create
             * @memberof votings_service.VotersRegistry
             * @static
             * @param {votings_service.IVotersRegistry=} [properties] Properties to set
             * @returns {votings_service.VotersRegistry} VotersRegistry instance
             */
            VotersRegistry.create = function create(properties) {
                return new VotersRegistry(properties);
            };
    
            /**
             * Encodes the specified VotersRegistry message. Does not implicitly {@link votings_service.VotersRegistry.verify|verify} messages.
             * @function encode
             * @memberof votings_service.VotersRegistry
             * @static
             * @param {votings_service.IVotersRegistry} message VotersRegistry message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VotersRegistry.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.voters_amount != null && message.hasOwnProperty("voters_amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.voters_amount);
                if (message.issued_ballots_counter != null && message.hasOwnProperty("issued_ballots_counter"))
                    for (var keys = Object.keys(message.issued_ballots_counter), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.issued_ballots_counter[keys[i]]).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified VotersRegistry message, length delimited. Does not implicitly {@link votings_service.VotersRegistry.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.VotersRegistry
             * @static
             * @param {votings_service.IVotersRegistry} message VotersRegistry message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VotersRegistry.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a VotersRegistry message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.VotersRegistry
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.VotersRegistry} VotersRegistry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VotersRegistry.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.VotersRegistry(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.voters_amount = reader.uint32();
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.issued_ballots_counter === $util.emptyObject)
                            message.issued_ballots_counter = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.issued_ballots_counter[key] = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a VotersRegistry message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.VotersRegistry
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.VotersRegistry} VotersRegistry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VotersRegistry.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a VotersRegistry message.
             * @function verify
             * @memberof votings_service.VotersRegistry
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VotersRegistry.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.voters_amount != null && message.hasOwnProperty("voters_amount"))
                    if (!$util.isInteger(message.voters_amount))
                        return "voters_amount: integer expected";
                if (message.issued_ballots_counter != null && message.hasOwnProperty("issued_ballots_counter")) {
                    if (!$util.isObject(message.issued_ballots_counter))
                        return "issued_ballots_counter: object expected";
                    var key = Object.keys(message.issued_ballots_counter);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "issued_ballots_counter: integer key{k:uint32} expected";
                        if (!$util.isInteger(message.issued_ballots_counter[key[i]]))
                            return "issued_ballots_counter: integer{k:uint32} expected";
                    }
                }
                return null;
            };
    
            /**
             * Creates a VotersRegistry message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.VotersRegistry
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.VotersRegistry} VotersRegistry
             */
            VotersRegistry.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.VotersRegistry)
                    return object;
                var message = new $root.votings_service.VotersRegistry();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.voters_amount != null)
                    message.voters_amount = object.voters_amount >>> 0;
                if (object.issued_ballots_counter) {
                    if (typeof object.issued_ballots_counter !== "object")
                        throw TypeError(".votings_service.VotersRegistry.issued_ballots_counter: object expected");
                    message.issued_ballots_counter = {};
                    for (var keys = Object.keys(object.issued_ballots_counter), i = 0; i < keys.length; ++i)
                        message.issued_ballots_counter[keys[i]] = object.issued_ballots_counter[keys[i]] >>> 0;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a VotersRegistry message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.VotersRegistry
             * @static
             * @param {votings_service.VotersRegistry} message VotersRegistry
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VotersRegistry.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.issued_ballots_counter = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.voters_amount = 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.voters_amount != null && message.hasOwnProperty("voters_amount"))
                    object.voters_amount = message.voters_amount;
                var keys2;
                if (message.issued_ballots_counter && (keys2 = Object.keys(message.issued_ballots_counter)).length) {
                    object.issued_ballots_counter = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.issued_ballots_counter[keys2[j]] = message.issued_ballots_counter[keys2[j]];
                }
                return object;
            };
    
            /**
             * Converts this VotersRegistry to JSON.
             * @function toJSON
             * @memberof votings_service.VotersRegistry
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VotersRegistry.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return VotersRegistry;
        })();
    
        votings_service.Voter = (function() {
    
            /**
             * Properties of a Voter.
             * @memberof votings_service
             * @interface IVoter
             * @property {string|null} [voter_id] Voter voter_id
             * @property {boolean|null} [is_participation_revoked] Voter is_participation_revoked
             * @property {number|null} [ballot_issuing_district] Voter ballot_issuing_district
             */
    
            /**
             * Constructs a new Voter.
             * @memberof votings_service
             * @classdesc Represents a Voter.
             * @implements IVoter
             * @constructor
             * @param {votings_service.IVoter=} [properties] Properties to set
             */
            function Voter(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Voter voter_id.
             * @member {string} voter_id
             * @memberof votings_service.Voter
             * @instance
             */
            Voter.prototype.voter_id = "";
    
            /**
             * Voter is_participation_revoked.
             * @member {boolean} is_participation_revoked
             * @memberof votings_service.Voter
             * @instance
             */
            Voter.prototype.is_participation_revoked = false;
    
            /**
             * Voter ballot_issuing_district.
             * @member {number} ballot_issuing_district
             * @memberof votings_service.Voter
             * @instance
             */
            Voter.prototype.ballot_issuing_district = 0;
    
            /**
             * Creates a new Voter instance using the specified properties.
             * @function create
             * @memberof votings_service.Voter
             * @static
             * @param {votings_service.IVoter=} [properties] Properties to set
             * @returns {votings_service.Voter} Voter instance
             */
            Voter.create = function create(properties) {
                return new Voter(properties);
            };
    
            /**
             * Encodes the specified Voter message. Does not implicitly {@link votings_service.Voter.verify|verify} messages.
             * @function encode
             * @memberof votings_service.Voter
             * @static
             * @param {votings_service.IVoter} message Voter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Voter.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voter_id);
                if (message.is_participation_revoked != null && message.hasOwnProperty("is_participation_revoked"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.is_participation_revoked);
                if (message.ballot_issuing_district != null && message.hasOwnProperty("ballot_issuing_district"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.ballot_issuing_district);
                return writer;
            };
    
            /**
             * Encodes the specified Voter message, length delimited. Does not implicitly {@link votings_service.Voter.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.Voter
             * @static
             * @param {votings_service.IVoter} message Voter message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Voter.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Voter message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.Voter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.Voter} Voter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Voter.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.Voter();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voter_id = reader.string();
                        break;
                    case 2:
                        message.is_participation_revoked = reader.bool();
                        break;
                    case 3:
                        message.ballot_issuing_district = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Voter message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.Voter
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.Voter} Voter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Voter.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Voter message.
             * @function verify
             * @memberof votings_service.Voter
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Voter.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    if (!$util.isString(message.voter_id))
                        return "voter_id: string expected";
                if (message.is_participation_revoked != null && message.hasOwnProperty("is_participation_revoked"))
                    if (typeof message.is_participation_revoked !== "boolean")
                        return "is_participation_revoked: boolean expected";
                if (message.ballot_issuing_district != null && message.hasOwnProperty("ballot_issuing_district"))
                    if (!$util.isInteger(message.ballot_issuing_district))
                        return "ballot_issuing_district: integer expected";
                return null;
            };
    
            /**
             * Creates a Voter message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.Voter
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.Voter} Voter
             */
            Voter.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.Voter)
                    return object;
                var message = new $root.votings_service.Voter();
                if (object.voter_id != null)
                    message.voter_id = String(object.voter_id);
                if (object.is_participation_revoked != null)
                    message.is_participation_revoked = Boolean(object.is_participation_revoked);
                if (object.ballot_issuing_district != null)
                    message.ballot_issuing_district = object.ballot_issuing_district >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a Voter message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.Voter
             * @static
             * @param {votings_service.Voter} message Voter
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Voter.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voter_id = "";
                    object.is_participation_revoked = false;
                    object.ballot_issuing_district = 0;
                }
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    object.voter_id = message.voter_id;
                if (message.is_participation_revoked != null && message.hasOwnProperty("is_participation_revoked"))
                    object.is_participation_revoked = message.is_participation_revoked;
                if (message.ballot_issuing_district != null && message.hasOwnProperty("ballot_issuing_district"))
                    object.ballot_issuing_district = message.ballot_issuing_district;
                return object;
            };
    
            /**
             * Converts this Voter to JSON.
             * @function toJSON
             * @memberof votings_service.Voter
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Voter.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Voter;
        })();
    
        votings_service.Choices = (function() {
    
            /**
             * Properties of a Choices.
             * @memberof votings_service
             * @interface IChoices
             * @property {Array.<number>|null} [data] Choices data
             */
    
            /**
             * Constructs a new Choices.
             * @memberof votings_service
             * @classdesc Represents a Choices.
             * @implements IChoices
             * @constructor
             * @param {votings_service.IChoices=} [properties] Properties to set
             */
            function Choices(properties) {
                this.data = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Choices data.
             * @member {Array.<number>} data
             * @memberof votings_service.Choices
             * @instance
             */
            Choices.prototype.data = $util.emptyArray;
    
            /**
             * Creates a new Choices instance using the specified properties.
             * @function create
             * @memberof votings_service.Choices
             * @static
             * @param {votings_service.IChoices=} [properties] Properties to set
             * @returns {votings_service.Choices} Choices instance
             */
            Choices.create = function create(properties) {
                return new Choices(properties);
            };
    
            /**
             * Encodes the specified Choices message. Does not implicitly {@link votings_service.Choices.verify|verify} messages.
             * @function encode
             * @memberof votings_service.Choices
             * @static
             * @param {votings_service.IChoices} message Choices message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Choices.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.data != null && message.data.length) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork();
                    for (var i = 0; i < message.data.length; ++i)
                        writer.uint32(message.data[i]);
                    writer.ldelim();
                }
                return writer;
            };
    
            /**
             * Encodes the specified Choices message, length delimited. Does not implicitly {@link votings_service.Choices.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.Choices
             * @static
             * @param {votings_service.IChoices} message Choices message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Choices.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Choices message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.Choices
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.Choices} Choices
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Choices.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.Choices();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.data && message.data.length))
                            message.data = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.data.push(reader.uint32());
                        } else
                            message.data.push(reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Choices message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.Choices
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.Choices} Choices
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Choices.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Choices message.
             * @function verify
             * @memberof votings_service.Choices
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Choices.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.data != null && message.hasOwnProperty("data")) {
                    if (!Array.isArray(message.data))
                        return "data: array expected";
                    for (var i = 0; i < message.data.length; ++i)
                        if (!$util.isInteger(message.data[i]))
                            return "data: integer[] expected";
                }
                return null;
            };
    
            /**
             * Creates a Choices message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.Choices
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.Choices} Choices
             */
            Choices.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.Choices)
                    return object;
                var message = new $root.votings_service.Choices();
                if (object.data) {
                    if (!Array.isArray(object.data))
                        throw TypeError(".votings_service.Choices.data: array expected");
                    message.data = [];
                    for (var i = 0; i < object.data.length; ++i)
                        message.data[i] = object.data[i] >>> 0;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Choices message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.Choices
             * @static
             * @param {votings_service.Choices} message Choices
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Choices.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.data = [];
                if (message.data && message.data.length) {
                    object.data = [];
                    for (var j = 0; j < message.data.length; ++j)
                        object.data[j] = message.data[j];
                }
                return object;
            };
    
            /**
             * Converts this Choices to JSON.
             * @function toJSON
             * @memberof votings_service.Choices
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Choices.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Choices;
        })();
    
        votings_service.EncryptedChoice = (function() {
    
            /**
             * Properties of an EncryptedChoice.
             * @memberof votings_service
             * @interface IEncryptedChoice
             * @property {Uint8Array|null} [encrypted_message] EncryptedChoice encrypted_message
             * @property {votings_service.ISealedBoxNonce|null} [nonce] EncryptedChoice nonce
             * @property {votings_service.ISealedBoxPublicKey|null} [public_key] EncryptedChoice public_key
             */
    
            /**
             * Constructs a new EncryptedChoice.
             * @memberof votings_service
             * @classdesc Represents an EncryptedChoice.
             * @implements IEncryptedChoice
             * @constructor
             * @param {votings_service.IEncryptedChoice=} [properties] Properties to set
             */
            function EncryptedChoice(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * EncryptedChoice encrypted_message.
             * @member {Uint8Array} encrypted_message
             * @memberof votings_service.EncryptedChoice
             * @instance
             */
            EncryptedChoice.prototype.encrypted_message = $util.newBuffer([]);
    
            /**
             * EncryptedChoice nonce.
             * @member {votings_service.ISealedBoxNonce|null|undefined} nonce
             * @memberof votings_service.EncryptedChoice
             * @instance
             */
            EncryptedChoice.prototype.nonce = null;
    
            /**
             * EncryptedChoice public_key.
             * @member {votings_service.ISealedBoxPublicKey|null|undefined} public_key
             * @memberof votings_service.EncryptedChoice
             * @instance
             */
            EncryptedChoice.prototype.public_key = null;
    
            /**
             * Creates a new EncryptedChoice instance using the specified properties.
             * @function create
             * @memberof votings_service.EncryptedChoice
             * @static
             * @param {votings_service.IEncryptedChoice=} [properties] Properties to set
             * @returns {votings_service.EncryptedChoice} EncryptedChoice instance
             */
            EncryptedChoice.create = function create(properties) {
                return new EncryptedChoice(properties);
            };
    
            /**
             * Encodes the specified EncryptedChoice message. Does not implicitly {@link votings_service.EncryptedChoice.verify|verify} messages.
             * @function encode
             * @memberof votings_service.EncryptedChoice
             * @static
             * @param {votings_service.IEncryptedChoice} message EncryptedChoice message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EncryptedChoice.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.encrypted_message != null && message.hasOwnProperty("encrypted_message"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encrypted_message);
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    $root.votings_service.SealedBoxNonce.encode(message.nonce, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.public_key != null && message.hasOwnProperty("public_key"))
                    $root.votings_service.SealedBoxPublicKey.encode(message.public_key, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified EncryptedChoice message, length delimited. Does not implicitly {@link votings_service.EncryptedChoice.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.EncryptedChoice
             * @static
             * @param {votings_service.IEncryptedChoice} message EncryptedChoice message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            EncryptedChoice.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an EncryptedChoice message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.EncryptedChoice
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.EncryptedChoice} EncryptedChoice
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EncryptedChoice.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.EncryptedChoice();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.encrypted_message = reader.bytes();
                        break;
                    case 2:
                        message.nonce = $root.votings_service.SealedBoxNonce.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.public_key = $root.votings_service.SealedBoxPublicKey.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an EncryptedChoice message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.EncryptedChoice
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.EncryptedChoice} EncryptedChoice
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            EncryptedChoice.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an EncryptedChoice message.
             * @function verify
             * @memberof votings_service.EncryptedChoice
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            EncryptedChoice.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.encrypted_message != null && message.hasOwnProperty("encrypted_message"))
                    if (!(message.encrypted_message && typeof message.encrypted_message.length === "number" || $util.isString(message.encrypted_message)))
                        return "encrypted_message: buffer expected";
                if (message.nonce != null && message.hasOwnProperty("nonce")) {
                    var error = $root.votings_service.SealedBoxNonce.verify(message.nonce);
                    if (error)
                        return "nonce." + error;
                }
                if (message.public_key != null && message.hasOwnProperty("public_key")) {
                    var error = $root.votings_service.SealedBoxPublicKey.verify(message.public_key);
                    if (error)
                        return "public_key." + error;
                }
                return null;
            };
    
            /**
             * Creates an EncryptedChoice message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.EncryptedChoice
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.EncryptedChoice} EncryptedChoice
             */
            EncryptedChoice.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.EncryptedChoice)
                    return object;
                var message = new $root.votings_service.EncryptedChoice();
                if (object.encrypted_message != null)
                    if (typeof object.encrypted_message === "string")
                        $util.base64.decode(object.encrypted_message, message.encrypted_message = $util.newBuffer($util.base64.length(object.encrypted_message)), 0);
                    else if (object.encrypted_message.length)
                        message.encrypted_message = object.encrypted_message;
                if (object.nonce != null) {
                    if (typeof object.nonce !== "object")
                        throw TypeError(".votings_service.EncryptedChoice.nonce: object expected");
                    message.nonce = $root.votings_service.SealedBoxNonce.fromObject(object.nonce);
                }
                if (object.public_key != null) {
                    if (typeof object.public_key !== "object")
                        throw TypeError(".votings_service.EncryptedChoice.public_key: object expected");
                    message.public_key = $root.votings_service.SealedBoxPublicKey.fromObject(object.public_key);
                }
                return message;
            };
    
            /**
             * Creates a plain object from an EncryptedChoice message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.EncryptedChoice
             * @static
             * @param {votings_service.EncryptedChoice} message EncryptedChoice
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            EncryptedChoice.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.encrypted_message = "";
                    else {
                        object.encrypted_message = [];
                        if (options.bytes !== Array)
                            object.encrypted_message = $util.newBuffer(object.encrypted_message);
                    }
                    object.nonce = null;
                    object.public_key = null;
                }
                if (message.encrypted_message != null && message.hasOwnProperty("encrypted_message"))
                    object.encrypted_message = options.bytes === String ? $util.base64.encode(message.encrypted_message, 0, message.encrypted_message.length) : options.bytes === Array ? Array.prototype.slice.call(message.encrypted_message) : message.encrypted_message;
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    object.nonce = $root.votings_service.SealedBoxNonce.toObject(message.nonce, options);
                if (message.public_key != null && message.hasOwnProperty("public_key"))
                    object.public_key = $root.votings_service.SealedBoxPublicKey.toObject(message.public_key, options);
                return object;
            };
    
            /**
             * Converts this EncryptedChoice to JSON.
             * @function toJSON
             * @memberof votings_service.EncryptedChoice
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            EncryptedChoice.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return EncryptedChoice;
        })();
    
        votings_service.Ballot = (function() {
    
            /**
             * Properties of a Ballot.
             * @memberof votings_service
             * @interface IBallot
             * @property {number|null} [index] Ballot index
             * @property {exonum.crypto.IPublicKey|null} [voter] Ballot voter
             * @property {number|null} [district_id] Ballot district_id
             * @property {votings_service.IEncryptedChoice|null} [encrypted_choice] Ballot encrypted_choice
             * @property {Array.<number>|null} [decrypted_choices] Ballot decrypted_choices
             * @property {exonum.crypto.IHash|null} [store_tx_hash] Ballot store_tx_hash
             * @property {exonum.crypto.IHash|null} [decrypt_tx_hash] Ballot decrypt_tx_hash
             * @property {votings_service.IBallotStatus|null} [status] Ballot status
             */
    
            /**
             * Constructs a new Ballot.
             * @memberof votings_service
             * @classdesc Represents a Ballot.
             * @implements IBallot
             * @constructor
             * @param {votings_service.IBallot=} [properties] Properties to set
             */
            function Ballot(properties) {
                this.decrypted_choices = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Ballot index.
             * @member {number} index
             * @memberof votings_service.Ballot
             * @instance
             */
            Ballot.prototype.index = 0;
    
            /**
             * Ballot voter.
             * @member {exonum.crypto.IPublicKey|null|undefined} voter
             * @memberof votings_service.Ballot
             * @instance
             */
            Ballot.prototype.voter = null;
    
            /**
             * Ballot district_id.
             * @member {number} district_id
             * @memberof votings_service.Ballot
             * @instance
             */
            Ballot.prototype.district_id = 0;
    
            /**
             * Ballot encrypted_choice.
             * @member {votings_service.IEncryptedChoice|null|undefined} encrypted_choice
             * @memberof votings_service.Ballot
             * @instance
             */
            Ballot.prototype.encrypted_choice = null;
    
            /**
             * Ballot decrypted_choices.
             * @member {Array.<number>} decrypted_choices
             * @memberof votings_service.Ballot
             * @instance
             */
            Ballot.prototype.decrypted_choices = $util.emptyArray;
    
            /**
             * Ballot store_tx_hash.
             * @member {exonum.crypto.IHash|null|undefined} store_tx_hash
             * @memberof votings_service.Ballot
             * @instance
             */
            Ballot.prototype.store_tx_hash = null;
    
            /**
             * Ballot decrypt_tx_hash.
             * @member {exonum.crypto.IHash|null|undefined} decrypt_tx_hash
             * @memberof votings_service.Ballot
             * @instance
             */
            Ballot.prototype.decrypt_tx_hash = null;
    
            /**
             * Ballot status.
             * @member {votings_service.IBallotStatus|null|undefined} status
             * @memberof votings_service.Ballot
             * @instance
             */
            Ballot.prototype.status = null;
    
            /**
             * Creates a new Ballot instance using the specified properties.
             * @function create
             * @memberof votings_service.Ballot
             * @static
             * @param {votings_service.IBallot=} [properties] Properties to set
             * @returns {votings_service.Ballot} Ballot instance
             */
            Ballot.create = function create(properties) {
                return new Ballot(properties);
            };
    
            /**
             * Encodes the specified Ballot message. Does not implicitly {@link votings_service.Ballot.verify|verify} messages.
             * @function encode
             * @memberof votings_service.Ballot
             * @static
             * @param {votings_service.IBallot} message Ballot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Ballot.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && message.hasOwnProperty("index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                if (message.voter != null && message.hasOwnProperty("voter"))
                    $root.exonum.crypto.PublicKey.encode(message.voter, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.district_id);
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice"))
                    $root.votings_service.EncryptedChoice.encode(message.encrypted_choice, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.decrypted_choices != null && message.decrypted_choices.length) {
                    writer.uint32(/* id 5, wireType 2 =*/42).fork();
                    for (var i = 0; i < message.decrypted_choices.length; ++i)
                        writer.uint32(message.decrypted_choices[i]);
                    writer.ldelim();
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    $root.exonum.crypto.Hash.encode(message.store_tx_hash, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash"))
                    $root.exonum.crypto.Hash.encode(message.decrypt_tx_hash, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.status != null && message.hasOwnProperty("status"))
                    $root.votings_service.BallotStatus.encode(message.status, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Ballot message, length delimited. Does not implicitly {@link votings_service.Ballot.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.Ballot
             * @static
             * @param {votings_service.IBallot} message Ballot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Ballot.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Ballot message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.Ballot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.Ballot} Ballot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Ballot.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.Ballot();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.index = reader.uint32();
                        break;
                    case 2:
                        message.voter = $root.exonum.crypto.PublicKey.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.district_id = reader.uint32();
                        break;
                    case 4:
                        message.encrypted_choice = $root.votings_service.EncryptedChoice.decode(reader, reader.uint32());
                        break;
                    case 5:
                        if (!(message.decrypted_choices && message.decrypted_choices.length))
                            message.decrypted_choices = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.decrypted_choices.push(reader.uint32());
                        } else
                            message.decrypted_choices.push(reader.uint32());
                        break;
                    case 6:
                        message.store_tx_hash = $root.exonum.crypto.Hash.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.decrypt_tx_hash = $root.exonum.crypto.Hash.decode(reader, reader.uint32());
                        break;
                    case 8:
                        message.status = $root.votings_service.BallotStatus.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Ballot message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.Ballot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.Ballot} Ballot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Ballot.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Ballot message.
             * @function verify
             * @memberof votings_service.Ballot
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Ballot.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.voter != null && message.hasOwnProperty("voter")) {
                    var error = $root.exonum.crypto.PublicKey.verify(message.voter);
                    if (error)
                        return "voter." + error;
                }
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice")) {
                    var error = $root.votings_service.EncryptedChoice.verify(message.encrypted_choice);
                    if (error)
                        return "encrypted_choice." + error;
                }
                if (message.decrypted_choices != null && message.hasOwnProperty("decrypted_choices")) {
                    if (!Array.isArray(message.decrypted_choices))
                        return "decrypted_choices: array expected";
                    for (var i = 0; i < message.decrypted_choices.length; ++i)
                        if (!$util.isInteger(message.decrypted_choices[i]))
                            return "decrypted_choices: integer[] expected";
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash")) {
                    var error = $root.exonum.crypto.Hash.verify(message.store_tx_hash);
                    if (error)
                        return "store_tx_hash." + error;
                }
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash")) {
                    var error = $root.exonum.crypto.Hash.verify(message.decrypt_tx_hash);
                    if (error)
                        return "decrypt_tx_hash." + error;
                }
                if (message.status != null && message.hasOwnProperty("status")) {
                    var error = $root.votings_service.BallotStatus.verify(message.status);
                    if (error)
                        return "status." + error;
                }
                return null;
            };
    
            /**
             * Creates a Ballot message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.Ballot
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.Ballot} Ballot
             */
            Ballot.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.Ballot)
                    return object;
                var message = new $root.votings_service.Ballot();
                if (object.index != null)
                    message.index = object.index >>> 0;
                if (object.voter != null) {
                    if (typeof object.voter !== "object")
                        throw TypeError(".votings_service.Ballot.voter: object expected");
                    message.voter = $root.exonum.crypto.PublicKey.fromObject(object.voter);
                }
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.encrypted_choice != null) {
                    if (typeof object.encrypted_choice !== "object")
                        throw TypeError(".votings_service.Ballot.encrypted_choice: object expected");
                    message.encrypted_choice = $root.votings_service.EncryptedChoice.fromObject(object.encrypted_choice);
                }
                if (object.decrypted_choices) {
                    if (!Array.isArray(object.decrypted_choices))
                        throw TypeError(".votings_service.Ballot.decrypted_choices: array expected");
                    message.decrypted_choices = [];
                    for (var i = 0; i < object.decrypted_choices.length; ++i)
                        message.decrypted_choices[i] = object.decrypted_choices[i] >>> 0;
                }
                if (object.store_tx_hash != null) {
                    if (typeof object.store_tx_hash !== "object")
                        throw TypeError(".votings_service.Ballot.store_tx_hash: object expected");
                    message.store_tx_hash = $root.exonum.crypto.Hash.fromObject(object.store_tx_hash);
                }
                if (object.decrypt_tx_hash != null) {
                    if (typeof object.decrypt_tx_hash !== "object")
                        throw TypeError(".votings_service.Ballot.decrypt_tx_hash: object expected");
                    message.decrypt_tx_hash = $root.exonum.crypto.Hash.fromObject(object.decrypt_tx_hash);
                }
                if (object.status != null) {
                    if (typeof object.status !== "object")
                        throw TypeError(".votings_service.Ballot.status: object expected");
                    message.status = $root.votings_service.BallotStatus.fromObject(object.status);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Ballot message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.Ballot
             * @static
             * @param {votings_service.Ballot} message Ballot
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Ballot.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.decrypted_choices = [];
                if (options.defaults) {
                    object.index = 0;
                    object.voter = null;
                    object.district_id = 0;
                    object.encrypted_choice = null;
                    object.store_tx_hash = null;
                    object.decrypt_tx_hash = null;
                    object.status = null;
                }
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.voter != null && message.hasOwnProperty("voter"))
                    object.voter = $root.exonum.crypto.PublicKey.toObject(message.voter, options);
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice"))
                    object.encrypted_choice = $root.votings_service.EncryptedChoice.toObject(message.encrypted_choice, options);
                if (message.decrypted_choices && message.decrypted_choices.length) {
                    object.decrypted_choices = [];
                    for (var j = 0; j < message.decrypted_choices.length; ++j)
                        object.decrypted_choices[j] = message.decrypted_choices[j];
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    object.store_tx_hash = $root.exonum.crypto.Hash.toObject(message.store_tx_hash, options);
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash"))
                    object.decrypt_tx_hash = $root.exonum.crypto.Hash.toObject(message.decrypt_tx_hash, options);
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = $root.votings_service.BallotStatus.toObject(message.status, options);
                return object;
            };
    
            /**
             * Converts this Ballot to JSON.
             * @function toJSON
             * @memberof votings_service.Ballot
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Ballot.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Ballot;
        })();
    
        votings_service.DecryptionStatistics = (function() {
    
            /**
             * Properties of a DecryptionStatistics.
             * @memberof votings_service
             * @interface IDecryptionStatistics
             * @property {number|null} [decrypted_ballots_amount] DecryptionStatistics decrypted_ballots_amount
             * @property {number|null} [invalid_ballots_amount] DecryptionStatistics invalid_ballots_amount
             */
    
            /**
             * Constructs a new DecryptionStatistics.
             * @memberof votings_service
             * @classdesc Represents a DecryptionStatistics.
             * @implements IDecryptionStatistics
             * @constructor
             * @param {votings_service.IDecryptionStatistics=} [properties] Properties to set
             */
            function DecryptionStatistics(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DecryptionStatistics decrypted_ballots_amount.
             * @member {number} decrypted_ballots_amount
             * @memberof votings_service.DecryptionStatistics
             * @instance
             */
            DecryptionStatistics.prototype.decrypted_ballots_amount = 0;
    
            /**
             * DecryptionStatistics invalid_ballots_amount.
             * @member {number} invalid_ballots_amount
             * @memberof votings_service.DecryptionStatistics
             * @instance
             */
            DecryptionStatistics.prototype.invalid_ballots_amount = 0;
    
            /**
             * Creates a new DecryptionStatistics instance using the specified properties.
             * @function create
             * @memberof votings_service.DecryptionStatistics
             * @static
             * @param {votings_service.IDecryptionStatistics=} [properties] Properties to set
             * @returns {votings_service.DecryptionStatistics} DecryptionStatistics instance
             */
            DecryptionStatistics.create = function create(properties) {
                return new DecryptionStatistics(properties);
            };
    
            /**
             * Encodes the specified DecryptionStatistics message. Does not implicitly {@link votings_service.DecryptionStatistics.verify|verify} messages.
             * @function encode
             * @memberof votings_service.DecryptionStatistics
             * @static
             * @param {votings_service.IDecryptionStatistics} message DecryptionStatistics message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DecryptionStatistics.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.decrypted_ballots_amount != null && message.hasOwnProperty("decrypted_ballots_amount"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.decrypted_ballots_amount);
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.invalid_ballots_amount);
                return writer;
            };
    
            /**
             * Encodes the specified DecryptionStatistics message, length delimited. Does not implicitly {@link votings_service.DecryptionStatistics.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.DecryptionStatistics
             * @static
             * @param {votings_service.IDecryptionStatistics} message DecryptionStatistics message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DecryptionStatistics.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DecryptionStatistics message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.DecryptionStatistics
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.DecryptionStatistics} DecryptionStatistics
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DecryptionStatistics.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.DecryptionStatistics();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.decrypted_ballots_amount = reader.uint32();
                        break;
                    case 2:
                        message.invalid_ballots_amount = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DecryptionStatistics message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.DecryptionStatistics
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.DecryptionStatistics} DecryptionStatistics
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DecryptionStatistics.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DecryptionStatistics message.
             * @function verify
             * @memberof votings_service.DecryptionStatistics
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DecryptionStatistics.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.decrypted_ballots_amount != null && message.hasOwnProperty("decrypted_ballots_amount"))
                    if (!$util.isInteger(message.decrypted_ballots_amount))
                        return "decrypted_ballots_amount: integer expected";
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    if (!$util.isInteger(message.invalid_ballots_amount))
                        return "invalid_ballots_amount: integer expected";
                return null;
            };
    
            /**
             * Creates a DecryptionStatistics message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.DecryptionStatistics
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.DecryptionStatistics} DecryptionStatistics
             */
            DecryptionStatistics.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.DecryptionStatistics)
                    return object;
                var message = new $root.votings_service.DecryptionStatistics();
                if (object.decrypted_ballots_amount != null)
                    message.decrypted_ballots_amount = object.decrypted_ballots_amount >>> 0;
                if (object.invalid_ballots_amount != null)
                    message.invalid_ballots_amount = object.invalid_ballots_amount >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a DecryptionStatistics message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.DecryptionStatistics
             * @static
             * @param {votings_service.DecryptionStatistics} message DecryptionStatistics
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DecryptionStatistics.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.decrypted_ballots_amount = 0;
                    object.invalid_ballots_amount = 0;
                }
                if (message.decrypted_ballots_amount != null && message.hasOwnProperty("decrypted_ballots_amount"))
                    object.decrypted_ballots_amount = message.decrypted_ballots_amount;
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    object.invalid_ballots_amount = message.invalid_ballots_amount;
                return object;
            };
    
            /**
             * Converts this DecryptionStatistics to JSON.
             * @function toJSON
             * @memberof votings_service.DecryptionStatistics
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DecryptionStatistics.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DecryptionStatistics;
        })();
    
        votings_service.DistrictResults = (function() {
    
            /**
             * Properties of a DistrictResults.
             * @memberof votings_service
             * @interface IDistrictResults
             * @property {number|null} [district_id] DistrictResults district_id
             * @property {Object.<string,number>|null} [tally] DistrictResults tally
             * @property {number|null} [invalid_ballots_amount] DistrictResults invalid_ballots_amount
             * @property {number|null} [unique_valid_ballots_amount] DistrictResults unique_valid_ballots_amount
             */
    
            /**
             * Constructs a new DistrictResults.
             * @memberof votings_service
             * @classdesc Represents a DistrictResults.
             * @implements IDistrictResults
             * @constructor
             * @param {votings_service.IDistrictResults=} [properties] Properties to set
             */
            function DistrictResults(properties) {
                this.tally = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DistrictResults district_id.
             * @member {number} district_id
             * @memberof votings_service.DistrictResults
             * @instance
             */
            DistrictResults.prototype.district_id = 0;
    
            /**
             * DistrictResults tally.
             * @member {Object.<string,number>} tally
             * @memberof votings_service.DistrictResults
             * @instance
             */
            DistrictResults.prototype.tally = $util.emptyObject;
    
            /**
             * DistrictResults invalid_ballots_amount.
             * @member {number} invalid_ballots_amount
             * @memberof votings_service.DistrictResults
             * @instance
             */
            DistrictResults.prototype.invalid_ballots_amount = 0;
    
            /**
             * DistrictResults unique_valid_ballots_amount.
             * @member {number} unique_valid_ballots_amount
             * @memberof votings_service.DistrictResults
             * @instance
             */
            DistrictResults.prototype.unique_valid_ballots_amount = 0;
    
            /**
             * Creates a new DistrictResults instance using the specified properties.
             * @function create
             * @memberof votings_service.DistrictResults
             * @static
             * @param {votings_service.IDistrictResults=} [properties] Properties to set
             * @returns {votings_service.DistrictResults} DistrictResults instance
             */
            DistrictResults.create = function create(properties) {
                return new DistrictResults(properties);
            };
    
            /**
             * Encodes the specified DistrictResults message. Does not implicitly {@link votings_service.DistrictResults.verify|verify} messages.
             * @function encode
             * @memberof votings_service.DistrictResults
             * @static
             * @param {votings_service.IDistrictResults} message DistrictResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DistrictResults.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.district_id);
                if (message.tally != null && message.hasOwnProperty("tally"))
                    for (var keys = Object.keys(message.tally), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.tally[keys[i]]).ldelim();
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.invalid_ballots_amount);
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.unique_valid_ballots_amount);
                return writer;
            };
    
            /**
             * Encodes the specified DistrictResults message, length delimited. Does not implicitly {@link votings_service.DistrictResults.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.DistrictResults
             * @static
             * @param {votings_service.IDistrictResults} message DistrictResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DistrictResults.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DistrictResults message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.DistrictResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.DistrictResults} DistrictResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DistrictResults.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.DistrictResults(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.district_id = reader.uint32();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.tally === $util.emptyObject)
                            message.tally = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.tally[key] = reader.uint32();
                        break;
                    case 3:
                        message.invalid_ballots_amount = reader.uint32();
                        break;
                    case 4:
                        message.unique_valid_ballots_amount = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DistrictResults message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.DistrictResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.DistrictResults} DistrictResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DistrictResults.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DistrictResults message.
             * @function verify
             * @memberof votings_service.DistrictResults
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DistrictResults.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.tally != null && message.hasOwnProperty("tally")) {
                    if (!$util.isObject(message.tally))
                        return "tally: object expected";
                    var key = Object.keys(message.tally);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "tally: integer key{k:uint32} expected";
                        if (!$util.isInteger(message.tally[key[i]]))
                            return "tally: integer{k:uint32} expected";
                    }
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    if (!$util.isInteger(message.invalid_ballots_amount))
                        return "invalid_ballots_amount: integer expected";
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    if (!$util.isInteger(message.unique_valid_ballots_amount))
                        return "unique_valid_ballots_amount: integer expected";
                return null;
            };
    
            /**
             * Creates a DistrictResults message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.DistrictResults
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.DistrictResults} DistrictResults
             */
            DistrictResults.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.DistrictResults)
                    return object;
                var message = new $root.votings_service.DistrictResults();
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.tally) {
                    if (typeof object.tally !== "object")
                        throw TypeError(".votings_service.DistrictResults.tally: object expected");
                    message.tally = {};
                    for (var keys = Object.keys(object.tally), i = 0; i < keys.length; ++i)
                        message.tally[keys[i]] = object.tally[keys[i]] >>> 0;
                }
                if (object.invalid_ballots_amount != null)
                    message.invalid_ballots_amount = object.invalid_ballots_amount >>> 0;
                if (object.unique_valid_ballots_amount != null)
                    message.unique_valid_ballots_amount = object.unique_valid_ballots_amount >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a DistrictResults message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.DistrictResults
             * @static
             * @param {votings_service.DistrictResults} message DistrictResults
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DistrictResults.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.tally = {};
                if (options.defaults) {
                    object.district_id = 0;
                    object.invalid_ballots_amount = 0;
                    object.unique_valid_ballots_amount = 0;
                }
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                var keys2;
                if (message.tally && (keys2 = Object.keys(message.tally)).length) {
                    object.tally = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.tally[keys2[j]] = message.tally[keys2[j]];
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    object.invalid_ballots_amount = message.invalid_ballots_amount;
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    object.unique_valid_ballots_amount = message.unique_valid_ballots_amount;
                return object;
            };
    
            /**
             * Converts this DistrictResults to JSON.
             * @function toJSON
             * @memberof votings_service.DistrictResults
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DistrictResults.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DistrictResults;
        })();
    
        votings_service.VotingResults = (function() {
    
            /**
             * Properties of a VotingResults.
             * @memberof votings_service
             * @interface IVotingResults
             * @property {Object.<string,votings_service.IDistrictResults>|null} [district_results] VotingResults district_results
             * @property {number|null} [invalid_ballots_amount] VotingResults invalid_ballots_amount
             * @property {number|null} [unique_valid_ballots_amount] VotingResults unique_valid_ballots_amount
             */
    
            /**
             * Constructs a new VotingResults.
             * @memberof votings_service
             * @classdesc Represents a VotingResults.
             * @implements IVotingResults
             * @constructor
             * @param {votings_service.IVotingResults=} [properties] Properties to set
             */
            function VotingResults(properties) {
                this.district_results = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * VotingResults district_results.
             * @member {Object.<string,votings_service.IDistrictResults>} district_results
             * @memberof votings_service.VotingResults
             * @instance
             */
            VotingResults.prototype.district_results = $util.emptyObject;
    
            /**
             * VotingResults invalid_ballots_amount.
             * @member {number} invalid_ballots_amount
             * @memberof votings_service.VotingResults
             * @instance
             */
            VotingResults.prototype.invalid_ballots_amount = 0;
    
            /**
             * VotingResults unique_valid_ballots_amount.
             * @member {number} unique_valid_ballots_amount
             * @memberof votings_service.VotingResults
             * @instance
             */
            VotingResults.prototype.unique_valid_ballots_amount = 0;
    
            /**
             * Creates a new VotingResults instance using the specified properties.
             * @function create
             * @memberof votings_service.VotingResults
             * @static
             * @param {votings_service.IVotingResults=} [properties] Properties to set
             * @returns {votings_service.VotingResults} VotingResults instance
             */
            VotingResults.create = function create(properties) {
                return new VotingResults(properties);
            };
    
            /**
             * Encodes the specified VotingResults message. Does not implicitly {@link votings_service.VotingResults.verify|verify} messages.
             * @function encode
             * @memberof votings_service.VotingResults
             * @static
             * @param {votings_service.IVotingResults} message VotingResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VotingResults.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.district_results != null && message.hasOwnProperty("district_results"))
                    for (var keys = Object.keys(message.district_results), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                        $root.votings_service.DistrictResults.encode(message.district_results[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.invalid_ballots_amount);
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.unique_valid_ballots_amount);
                return writer;
            };
    
            /**
             * Encodes the specified VotingResults message, length delimited. Does not implicitly {@link votings_service.VotingResults.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.VotingResults
             * @static
             * @param {votings_service.IVotingResults} message VotingResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VotingResults.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a VotingResults message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.VotingResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.VotingResults} VotingResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VotingResults.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.VotingResults(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.district_results === $util.emptyObject)
                            message.district_results = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.district_results[key] = $root.votings_service.DistrictResults.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.invalid_ballots_amount = reader.uint32();
                        break;
                    case 3:
                        message.unique_valid_ballots_amount = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a VotingResults message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.VotingResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.VotingResults} VotingResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VotingResults.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a VotingResults message.
             * @function verify
             * @memberof votings_service.VotingResults
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VotingResults.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.district_results != null && message.hasOwnProperty("district_results")) {
                    if (!$util.isObject(message.district_results))
                        return "district_results: object expected";
                    var key = Object.keys(message.district_results);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "district_results: integer key{k:uint32} expected";
                        {
                            var error = $root.votings_service.DistrictResults.verify(message.district_results[key[i]]);
                            if (error)
                                return "district_results." + error;
                        }
                    }
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    if (!$util.isInteger(message.invalid_ballots_amount))
                        return "invalid_ballots_amount: integer expected";
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    if (!$util.isInteger(message.unique_valid_ballots_amount))
                        return "unique_valid_ballots_amount: integer expected";
                return null;
            };
    
            /**
             * Creates a VotingResults message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.VotingResults
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.VotingResults} VotingResults
             */
            VotingResults.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.VotingResults)
                    return object;
                var message = new $root.votings_service.VotingResults();
                if (object.district_results) {
                    if (typeof object.district_results !== "object")
                        throw TypeError(".votings_service.VotingResults.district_results: object expected");
                    message.district_results = {};
                    for (var keys = Object.keys(object.district_results), i = 0; i < keys.length; ++i) {
                        if (typeof object.district_results[keys[i]] !== "object")
                            throw TypeError(".votings_service.VotingResults.district_results: object expected");
                        message.district_results[keys[i]] = $root.votings_service.DistrictResults.fromObject(object.district_results[keys[i]]);
                    }
                }
                if (object.invalid_ballots_amount != null)
                    message.invalid_ballots_amount = object.invalid_ballots_amount >>> 0;
                if (object.unique_valid_ballots_amount != null)
                    message.unique_valid_ballots_amount = object.unique_valid_ballots_amount >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a VotingResults message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.VotingResults
             * @static
             * @param {votings_service.VotingResults} message VotingResults
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VotingResults.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.district_results = {};
                if (options.defaults) {
                    object.invalid_ballots_amount = 0;
                    object.unique_valid_ballots_amount = 0;
                }
                var keys2;
                if (message.district_results && (keys2 = Object.keys(message.district_results)).length) {
                    object.district_results = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.district_results[keys2[j]] = $root.votings_service.DistrictResults.toObject(message.district_results[keys2[j]], options);
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    object.invalid_ballots_amount = message.invalid_ballots_amount;
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    object.unique_valid_ballots_amount = message.unique_valid_ballots_amount;
                return object;
            };
    
            /**
             * Converts this VotingResults to JSON.
             * @function toJSON
             * @memberof votings_service.VotingResults
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VotingResults.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return VotingResults;
        })();
    
        votings_service.BallotsStorage = (function() {
    
            /**
             * Properties of a BallotsStorage.
             * @memberof votings_service
             * @interface IBallotsStorage
             * @property {string|null} [voting_id] BallotsStorage voting_id
             * @property {Object.<string,number>|null} [stored_ballots_counter] BallotsStorage stored_ballots_counter
             * @property {votings_service.IDecryptionStatistics|null} [decrypted_ballots_counter] BallotsStorage decrypted_ballots_counter
             * @property {votings_service.IVotingResults|null} [voting_results] BallotsStorage voting_results
             */
    
            /**
             * Constructs a new BallotsStorage.
             * @memberof votings_service
             * @classdesc Represents a BallotsStorage.
             * @implements IBallotsStorage
             * @constructor
             * @param {votings_service.IBallotsStorage=} [properties] Properties to set
             */
            function BallotsStorage(properties) {
                this.stored_ballots_counter = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BallotsStorage voting_id.
             * @member {string} voting_id
             * @memberof votings_service.BallotsStorage
             * @instance
             */
            BallotsStorage.prototype.voting_id = "";
    
            /**
             * BallotsStorage stored_ballots_counter.
             * @member {Object.<string,number>} stored_ballots_counter
             * @memberof votings_service.BallotsStorage
             * @instance
             */
            BallotsStorage.prototype.stored_ballots_counter = $util.emptyObject;
    
            /**
             * BallotsStorage decrypted_ballots_counter.
             * @member {votings_service.IDecryptionStatistics|null|undefined} decrypted_ballots_counter
             * @memberof votings_service.BallotsStorage
             * @instance
             */
            BallotsStorage.prototype.decrypted_ballots_counter = null;
    
            /**
             * BallotsStorage voting_results.
             * @member {votings_service.IVotingResults|null|undefined} voting_results
             * @memberof votings_service.BallotsStorage
             * @instance
             */
            BallotsStorage.prototype.voting_results = null;
    
            /**
             * Creates a new BallotsStorage instance using the specified properties.
             * @function create
             * @memberof votings_service.BallotsStorage
             * @static
             * @param {votings_service.IBallotsStorage=} [properties] Properties to set
             * @returns {votings_service.BallotsStorage} BallotsStorage instance
             */
            BallotsStorage.create = function create(properties) {
                return new BallotsStorage(properties);
            };
    
            /**
             * Encodes the specified BallotsStorage message. Does not implicitly {@link votings_service.BallotsStorage.verify|verify} messages.
             * @function encode
             * @memberof votings_service.BallotsStorage
             * @static
             * @param {votings_service.IBallotsStorage} message BallotsStorage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BallotsStorage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.stored_ballots_counter != null && message.hasOwnProperty("stored_ballots_counter"))
                    for (var keys = Object.keys(message.stored_ballots_counter), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.stored_ballots_counter[keys[i]]).ldelim();
                if (message.decrypted_ballots_counter != null && message.hasOwnProperty("decrypted_ballots_counter"))
                    $root.votings_service.DecryptionStatistics.encode(message.decrypted_ballots_counter, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.voting_results != null && message.hasOwnProperty("voting_results"))
                    $root.votings_service.VotingResults.encode(message.voting_results, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified BallotsStorage message, length delimited. Does not implicitly {@link votings_service.BallotsStorage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.BallotsStorage
             * @static
             * @param {votings_service.IBallotsStorage} message BallotsStorage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BallotsStorage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BallotsStorage message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.BallotsStorage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.BallotsStorage} BallotsStorage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BallotsStorage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.BallotsStorage(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.stored_ballots_counter === $util.emptyObject)
                            message.stored_ballots_counter = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.stored_ballots_counter[key] = reader.uint32();
                        break;
                    case 3:
                        message.decrypted_ballots_counter = $root.votings_service.DecryptionStatistics.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.voting_results = $root.votings_service.VotingResults.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BallotsStorage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.BallotsStorage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.BallotsStorage} BallotsStorage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BallotsStorage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BallotsStorage message.
             * @function verify
             * @memberof votings_service.BallotsStorage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BallotsStorage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.stored_ballots_counter != null && message.hasOwnProperty("stored_ballots_counter")) {
                    if (!$util.isObject(message.stored_ballots_counter))
                        return "stored_ballots_counter: object expected";
                    var key = Object.keys(message.stored_ballots_counter);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "stored_ballots_counter: integer key{k:uint32} expected";
                        if (!$util.isInteger(message.stored_ballots_counter[key[i]]))
                            return "stored_ballots_counter: integer{k:uint32} expected";
                    }
                }
                if (message.decrypted_ballots_counter != null && message.hasOwnProperty("decrypted_ballots_counter")) {
                    var error = $root.votings_service.DecryptionStatistics.verify(message.decrypted_ballots_counter);
                    if (error)
                        return "decrypted_ballots_counter." + error;
                }
                if (message.voting_results != null && message.hasOwnProperty("voting_results")) {
                    var error = $root.votings_service.VotingResults.verify(message.voting_results);
                    if (error)
                        return "voting_results." + error;
                }
                return null;
            };
    
            /**
             * Creates a BallotsStorage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.BallotsStorage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.BallotsStorage} BallotsStorage
             */
            BallotsStorage.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.BallotsStorage)
                    return object;
                var message = new $root.votings_service.BallotsStorage();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.stored_ballots_counter) {
                    if (typeof object.stored_ballots_counter !== "object")
                        throw TypeError(".votings_service.BallotsStorage.stored_ballots_counter: object expected");
                    message.stored_ballots_counter = {};
                    for (var keys = Object.keys(object.stored_ballots_counter), i = 0; i < keys.length; ++i)
                        message.stored_ballots_counter[keys[i]] = object.stored_ballots_counter[keys[i]] >>> 0;
                }
                if (object.decrypted_ballots_counter != null) {
                    if (typeof object.decrypted_ballots_counter !== "object")
                        throw TypeError(".votings_service.BallotsStorage.decrypted_ballots_counter: object expected");
                    message.decrypted_ballots_counter = $root.votings_service.DecryptionStatistics.fromObject(object.decrypted_ballots_counter);
                }
                if (object.voting_results != null) {
                    if (typeof object.voting_results !== "object")
                        throw TypeError(".votings_service.BallotsStorage.voting_results: object expected");
                    message.voting_results = $root.votings_service.VotingResults.fromObject(object.voting_results);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a BallotsStorage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.BallotsStorage
             * @static
             * @param {votings_service.BallotsStorage} message BallotsStorage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BallotsStorage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.stored_ballots_counter = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.decrypted_ballots_counter = null;
                    object.voting_results = null;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                var keys2;
                if (message.stored_ballots_counter && (keys2 = Object.keys(message.stored_ballots_counter)).length) {
                    object.stored_ballots_counter = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.stored_ballots_counter[keys2[j]] = message.stored_ballots_counter[keys2[j]];
                }
                if (message.decrypted_ballots_counter != null && message.hasOwnProperty("decrypted_ballots_counter"))
                    object.decrypted_ballots_counter = $root.votings_service.DecryptionStatistics.toObject(message.decrypted_ballots_counter, options);
                if (message.voting_results != null && message.hasOwnProperty("voting_results"))
                    object.voting_results = $root.votings_service.VotingResults.toObject(message.voting_results, options);
                return object;
            };
    
            /**
             * Converts this BallotsStorage to JSON.
             * @function toJSON
             * @memberof votings_service.BallotsStorage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BallotsStorage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BallotsStorage;
        })();
    
        votings_service.BallotStatus = (function() {
    
            /**
             * Properties of a BallotStatus.
             * @memberof votings_service
             * @interface IBallotStatus
             * @property {google.protobuf.IEmpty|null} [unknown] BallotStatus unknown
             * @property {google.protobuf.IEmpty|null} [valid] BallotStatus valid
             * @property {votings_service.InvalidReason|null} [invalid] BallotStatus invalid
             */
    
            /**
             * Constructs a new BallotStatus.
             * @memberof votings_service
             * @classdesc Represents a BallotStatus.
             * @implements IBallotStatus
             * @constructor
             * @param {votings_service.IBallotStatus=} [properties] Properties to set
             */
            function BallotStatus(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BallotStatus unknown.
             * @member {google.protobuf.IEmpty|null|undefined} unknown
             * @memberof votings_service.BallotStatus
             * @instance
             */
            BallotStatus.prototype.unknown = null;
    
            /**
             * BallotStatus valid.
             * @member {google.protobuf.IEmpty|null|undefined} valid
             * @memberof votings_service.BallotStatus
             * @instance
             */
            BallotStatus.prototype.valid = null;
    
            /**
             * BallotStatus invalid.
             * @member {votings_service.InvalidReason} invalid
             * @memberof votings_service.BallotStatus
             * @instance
             */
            BallotStatus.prototype.invalid = 0;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * BallotStatus kind.
             * @member {"unknown"|"valid"|"invalid"|undefined} kind
             * @memberof votings_service.BallotStatus
             * @instance
             */
            Object.defineProperty(BallotStatus.prototype, "kind", {
                get: $util.oneOfGetter($oneOfFields = ["unknown", "valid", "invalid"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new BallotStatus instance using the specified properties.
             * @function create
             * @memberof votings_service.BallotStatus
             * @static
             * @param {votings_service.IBallotStatus=} [properties] Properties to set
             * @returns {votings_service.BallotStatus} BallotStatus instance
             */
            BallotStatus.create = function create(properties) {
                return new BallotStatus(properties);
            };
    
            /**
             * Encodes the specified BallotStatus message. Does not implicitly {@link votings_service.BallotStatus.verify|verify} messages.
             * @function encode
             * @memberof votings_service.BallotStatus
             * @static
             * @param {votings_service.IBallotStatus} message BallotStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BallotStatus.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.unknown != null && message.hasOwnProperty("unknown"))
                    $root.google.protobuf.Empty.encode(message.unknown, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.valid != null && message.hasOwnProperty("valid"))
                    $root.google.protobuf.Empty.encode(message.valid, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.invalid != null && message.hasOwnProperty("invalid"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.invalid);
                return writer;
            };
    
            /**
             * Encodes the specified BallotStatus message, length delimited. Does not implicitly {@link votings_service.BallotStatus.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.BallotStatus
             * @static
             * @param {votings_service.IBallotStatus} message BallotStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BallotStatus.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BallotStatus message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.BallotStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.BallotStatus} BallotStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BallotStatus.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.BallotStatus();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.unknown = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.valid = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.invalid = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BallotStatus message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.BallotStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.BallotStatus} BallotStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BallotStatus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BallotStatus message.
             * @function verify
             * @memberof votings_service.BallotStatus
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BallotStatus.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.unknown != null && message.hasOwnProperty("unknown")) {
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.Empty.verify(message.unknown);
                        if (error)
                            return "unknown." + error;
                    }
                }
                if (message.valid != null && message.hasOwnProperty("valid")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.Empty.verify(message.valid);
                        if (error)
                            return "valid." + error;
                    }
                }
                if (message.invalid != null && message.hasOwnProperty("invalid")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    switch (message.invalid) {
                    default:
                        return "invalid: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                }
                return null;
            };
    
            /**
             * Creates a BallotStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.BallotStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.BallotStatus} BallotStatus
             */
            BallotStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.BallotStatus)
                    return object;
                var message = new $root.votings_service.BallotStatus();
                if (object.unknown != null) {
                    if (typeof object.unknown !== "object")
                        throw TypeError(".votings_service.BallotStatus.unknown: object expected");
                    message.unknown = $root.google.protobuf.Empty.fromObject(object.unknown);
                }
                if (object.valid != null) {
                    if (typeof object.valid !== "object")
                        throw TypeError(".votings_service.BallotStatus.valid: object expected");
                    message.valid = $root.google.protobuf.Empty.fromObject(object.valid);
                }
                switch (object.invalid) {
                case "WrongDistrict":
                case 0:
                    message.invalid = 0;
                    break;
                case "DecryptionError":
                case 1:
                    message.invalid = 1;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a BallotStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.BallotStatus
             * @static
             * @param {votings_service.BallotStatus} message BallotStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BallotStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.unknown != null && message.hasOwnProperty("unknown")) {
                    object.unknown = $root.google.protobuf.Empty.toObject(message.unknown, options);
                    if (options.oneofs)
                        object.kind = "unknown";
                }
                if (message.valid != null && message.hasOwnProperty("valid")) {
                    object.valid = $root.google.protobuf.Empty.toObject(message.valid, options);
                    if (options.oneofs)
                        object.kind = "valid";
                }
                if (message.invalid != null && message.hasOwnProperty("invalid")) {
                    object.invalid = options.enums === String ? $root.votings_service.InvalidReason[message.invalid] : message.invalid;
                    if (options.oneofs)
                        object.kind = "invalid";
                }
                return object;
            };
    
            /**
             * Converts this BallotStatus to JSON.
             * @function toJSON
             * @memberof votings_service.BallotStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BallotStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BallotStatus;
        })();
    
        votings_service.Config = (function() {
    
            /**
             * Properties of a Config.
             * @memberof votings_service
             * @interface IConfig
             * @property {Array.<string>|null} [api_public_keys] Config api_public_keys
             */
    
            /**
             * Constructs a new Config.
             * @memberof votings_service
             * @classdesc Represents a Config.
             * @implements IConfig
             * @constructor
             * @param {votings_service.IConfig=} [properties] Properties to set
             */
            function Config(properties) {
                this.api_public_keys = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Config api_public_keys.
             * @member {Array.<string>} api_public_keys
             * @memberof votings_service.Config
             * @instance
             */
            Config.prototype.api_public_keys = $util.emptyArray;
    
            /**
             * Creates a new Config instance using the specified properties.
             * @function create
             * @memberof votings_service.Config
             * @static
             * @param {votings_service.IConfig=} [properties] Properties to set
             * @returns {votings_service.Config} Config instance
             */
            Config.create = function create(properties) {
                return new Config(properties);
            };
    
            /**
             * Encodes the specified Config message. Does not implicitly {@link votings_service.Config.verify|verify} messages.
             * @function encode
             * @memberof votings_service.Config
             * @static
             * @param {votings_service.IConfig} message Config message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Config.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.api_public_keys != null && message.api_public_keys.length)
                    for (var i = 0; i < message.api_public_keys.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.api_public_keys[i]);
                return writer;
            };
    
            /**
             * Encodes the specified Config message, length delimited. Does not implicitly {@link votings_service.Config.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.Config
             * @static
             * @param {votings_service.IConfig} message Config message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Config.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Config message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.Config
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.Config} Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Config.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.Config();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.api_public_keys && message.api_public_keys.length))
                            message.api_public_keys = [];
                        message.api_public_keys.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Config message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.Config
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.Config} Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Config.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Config message.
             * @function verify
             * @memberof votings_service.Config
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Config.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.api_public_keys != null && message.hasOwnProperty("api_public_keys")) {
                    if (!Array.isArray(message.api_public_keys))
                        return "api_public_keys: array expected";
                    for (var i = 0; i < message.api_public_keys.length; ++i)
                        if (!$util.isString(message.api_public_keys[i]))
                            return "api_public_keys: string[] expected";
                }
                return null;
            };
    
            /**
             * Creates a Config message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.Config
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.Config} Config
             */
            Config.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.Config)
                    return object;
                var message = new $root.votings_service.Config();
                if (object.api_public_keys) {
                    if (!Array.isArray(object.api_public_keys))
                        throw TypeError(".votings_service.Config.api_public_keys: array expected");
                    message.api_public_keys = [];
                    for (var i = 0; i < object.api_public_keys.length; ++i)
                        message.api_public_keys[i] = String(object.api_public_keys[i]);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Config message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.Config
             * @static
             * @param {votings_service.Config} message Config
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Config.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.api_public_keys = [];
                if (message.api_public_keys && message.api_public_keys.length) {
                    object.api_public_keys = [];
                    for (var j = 0; j < message.api_public_keys.length; ++j)
                        object.api_public_keys[j] = message.api_public_keys[j];
                }
                return object;
            };
    
            /**
             * Converts this Config to JSON.
             * @function toJSON
             * @memberof votings_service.Config
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Config.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Config;
        })();
    
        votings_service.TxStoreBallotCopy = (function() {
    
            /**
             * Properties of a TxStoreBallotCopy.
             * @memberof votings_service
             * @interface ITxStoreBallotCopy
             * @property {string|null} [voting_id] TxStoreBallotCopy voting_id
             * @property {number|null} [district_id] TxStoreBallotCopy district_id
             * @property {votings_service.ITxEncryptedChoice|null} [encrypted_choice] TxStoreBallotCopy encrypted_choice
             */
    
            /**
             * Constructs a new TxStoreBallotCopy.
             * @memberof votings_service
             * @classdesc Represents a TxStoreBallotCopy.
             * @implements ITxStoreBallotCopy
             * @constructor
             * @param {votings_service.ITxStoreBallotCopy=} [properties] Properties to set
             */
            function TxStoreBallotCopy(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxStoreBallotCopy voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxStoreBallotCopy
             * @instance
             */
            TxStoreBallotCopy.prototype.voting_id = "";
    
            /**
             * TxStoreBallotCopy district_id.
             * @member {number} district_id
             * @memberof votings_service.TxStoreBallotCopy
             * @instance
             */
            TxStoreBallotCopy.prototype.district_id = 0;
    
            /**
             * TxStoreBallotCopy encrypted_choice.
             * @member {votings_service.ITxEncryptedChoice|null|undefined} encrypted_choice
             * @memberof votings_service.TxStoreBallotCopy
             * @instance
             */
            TxStoreBallotCopy.prototype.encrypted_choice = null;
    
            /**
             * Creates a new TxStoreBallotCopy instance using the specified properties.
             * @function create
             * @memberof votings_service.TxStoreBallotCopy
             * @static
             * @param {votings_service.ITxStoreBallotCopy=} [properties] Properties to set
             * @returns {votings_service.TxStoreBallotCopy} TxStoreBallotCopy instance
             */
            TxStoreBallotCopy.create = function create(properties) {
                return new TxStoreBallotCopy(properties);
            };
    
            /**
             * Encodes the specified TxStoreBallotCopy message. Does not implicitly {@link votings_service.TxStoreBallotCopy.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxStoreBallotCopy
             * @static
             * @param {votings_service.ITxStoreBallotCopy} message TxStoreBallotCopy message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStoreBallotCopy.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.district_id);
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice"))
                    $root.votings_service.TxEncryptedChoice.encode(message.encrypted_choice, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxStoreBallotCopy message, length delimited. Does not implicitly {@link votings_service.TxStoreBallotCopy.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxStoreBallotCopy
             * @static
             * @param {votings_service.ITxStoreBallotCopy} message TxStoreBallotCopy message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStoreBallotCopy.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxStoreBallotCopy message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxStoreBallotCopy
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxStoreBallotCopy} TxStoreBallotCopy
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStoreBallotCopy.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxStoreBallotCopy();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.district_id = reader.uint32();
                        break;
                    case 3:
                        message.encrypted_choice = $root.votings_service.TxEncryptedChoice.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxStoreBallotCopy message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxStoreBallotCopy
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxStoreBallotCopy} TxStoreBallotCopy
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStoreBallotCopy.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxStoreBallotCopy message.
             * @function verify
             * @memberof votings_service.TxStoreBallotCopy
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxStoreBallotCopy.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice")) {
                    var error = $root.votings_service.TxEncryptedChoice.verify(message.encrypted_choice);
                    if (error)
                        return "encrypted_choice." + error;
                }
                return null;
            };
    
            /**
             * Creates a TxStoreBallotCopy message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxStoreBallotCopy
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxStoreBallotCopy} TxStoreBallotCopy
             */
            TxStoreBallotCopy.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxStoreBallotCopy)
                    return object;
                var message = new $root.votings_service.TxStoreBallotCopy();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.encrypted_choice != null) {
                    if (typeof object.encrypted_choice !== "object")
                        throw TypeError(".votings_service.TxStoreBallotCopy.encrypted_choice: object expected");
                    message.encrypted_choice = $root.votings_service.TxEncryptedChoice.fromObject(object.encrypted_choice);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxStoreBallotCopy message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxStoreBallotCopy
             * @static
             * @param {votings_service.TxStoreBallotCopy} message TxStoreBallotCopy
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxStoreBallotCopy.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.district_id = 0;
                    object.encrypted_choice = null;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice"))
                    object.encrypted_choice = $root.votings_service.TxEncryptedChoice.toObject(message.encrypted_choice, options);
                return object;
            };
    
            /**
             * Converts this TxStoreBallotCopy to JSON.
             * @function toJSON
             * @memberof votings_service.TxStoreBallotCopy
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxStoreBallotCopy.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxStoreBallotCopy;
        })();
    
        votings_service.TxCryptoSystemSettings = (function() {
    
            /**
             * Properties of a TxCryptoSystemSettings.
             * @memberof votings_service
             * @interface ITxCryptoSystemSettings
             * @property {votings_service.ISealedBoxPublicKey|null} [public_key] TxCryptoSystemSettings public_key
             */
    
            /**
             * Constructs a new TxCryptoSystemSettings.
             * @memberof votings_service
             * @classdesc Represents a TxCryptoSystemSettings.
             * @implements ITxCryptoSystemSettings
             * @constructor
             * @param {votings_service.ITxCryptoSystemSettings=} [properties] Properties to set
             */
            function TxCryptoSystemSettings(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxCryptoSystemSettings public_key.
             * @member {votings_service.ISealedBoxPublicKey|null|undefined} public_key
             * @memberof votings_service.TxCryptoSystemSettings
             * @instance
             */
            TxCryptoSystemSettings.prototype.public_key = null;
    
            /**
             * Creates a new TxCryptoSystemSettings instance using the specified properties.
             * @function create
             * @memberof votings_service.TxCryptoSystemSettings
             * @static
             * @param {votings_service.ITxCryptoSystemSettings=} [properties] Properties to set
             * @returns {votings_service.TxCryptoSystemSettings} TxCryptoSystemSettings instance
             */
            TxCryptoSystemSettings.create = function create(properties) {
                return new TxCryptoSystemSettings(properties);
            };
    
            /**
             * Encodes the specified TxCryptoSystemSettings message. Does not implicitly {@link votings_service.TxCryptoSystemSettings.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxCryptoSystemSettings
             * @static
             * @param {votings_service.ITxCryptoSystemSettings} message TxCryptoSystemSettings message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxCryptoSystemSettings.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.public_key != null && message.hasOwnProperty("public_key"))
                    $root.votings_service.SealedBoxPublicKey.encode(message.public_key, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxCryptoSystemSettings message, length delimited. Does not implicitly {@link votings_service.TxCryptoSystemSettings.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxCryptoSystemSettings
             * @static
             * @param {votings_service.ITxCryptoSystemSettings} message TxCryptoSystemSettings message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxCryptoSystemSettings.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxCryptoSystemSettings message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxCryptoSystemSettings
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxCryptoSystemSettings} TxCryptoSystemSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxCryptoSystemSettings.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxCryptoSystemSettings();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.public_key = $root.votings_service.SealedBoxPublicKey.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxCryptoSystemSettings message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxCryptoSystemSettings
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxCryptoSystemSettings} TxCryptoSystemSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxCryptoSystemSettings.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxCryptoSystemSettings message.
             * @function verify
             * @memberof votings_service.TxCryptoSystemSettings
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxCryptoSystemSettings.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.public_key != null && message.hasOwnProperty("public_key")) {
                    var error = $root.votings_service.SealedBoxPublicKey.verify(message.public_key);
                    if (error)
                        return "public_key." + error;
                }
                return null;
            };
    
            /**
             * Creates a TxCryptoSystemSettings message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxCryptoSystemSettings
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxCryptoSystemSettings} TxCryptoSystemSettings
             */
            TxCryptoSystemSettings.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxCryptoSystemSettings)
                    return object;
                var message = new $root.votings_service.TxCryptoSystemSettings();
                if (object.public_key != null) {
                    if (typeof object.public_key !== "object")
                        throw TypeError(".votings_service.TxCryptoSystemSettings.public_key: object expected");
                    message.public_key = $root.votings_service.SealedBoxPublicKey.fromObject(object.public_key);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxCryptoSystemSettings message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxCryptoSystemSettings
             * @static
             * @param {votings_service.TxCryptoSystemSettings} message TxCryptoSystemSettings
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxCryptoSystemSettings.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.public_key = null;
                if (message.public_key != null && message.hasOwnProperty("public_key"))
                    object.public_key = $root.votings_service.SealedBoxPublicKey.toObject(message.public_key, options);
                return object;
            };
    
            /**
             * Converts this TxCryptoSystemSettings to JSON.
             * @function toJSON
             * @memberof votings_service.TxCryptoSystemSettings
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxCryptoSystemSettings.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxCryptoSystemSettings;
        })();
    
        votings_service.TxDistrictResults = (function() {
    
            /**
             * Properties of a TxDistrictResults.
             * @memberof votings_service
             * @interface ITxDistrictResults
             * @property {number|null} [district_id] TxDistrictResults district_id
             * @property {Object.<string,number>|null} [tally] TxDistrictResults tally
             * @property {number|null} [invalid_ballots_amount] TxDistrictResults invalid_ballots_amount
             * @property {number|null} [unique_valid_ballots_amount] TxDistrictResults unique_valid_ballots_amount
             */
    
            /**
             * Constructs a new TxDistrictResults.
             * @memberof votings_service
             * @classdesc Represents a TxDistrictResults.
             * @implements ITxDistrictResults
             * @constructor
             * @param {votings_service.ITxDistrictResults=} [properties] Properties to set
             */
            function TxDistrictResults(properties) {
                this.tally = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxDistrictResults district_id.
             * @member {number} district_id
             * @memberof votings_service.TxDistrictResults
             * @instance
             */
            TxDistrictResults.prototype.district_id = 0;
    
            /**
             * TxDistrictResults tally.
             * @member {Object.<string,number>} tally
             * @memberof votings_service.TxDistrictResults
             * @instance
             */
            TxDistrictResults.prototype.tally = $util.emptyObject;
    
            /**
             * TxDistrictResults invalid_ballots_amount.
             * @member {number} invalid_ballots_amount
             * @memberof votings_service.TxDistrictResults
             * @instance
             */
            TxDistrictResults.prototype.invalid_ballots_amount = 0;
    
            /**
             * TxDistrictResults unique_valid_ballots_amount.
             * @member {number} unique_valid_ballots_amount
             * @memberof votings_service.TxDistrictResults
             * @instance
             */
            TxDistrictResults.prototype.unique_valid_ballots_amount = 0;
    
            /**
             * Creates a new TxDistrictResults instance using the specified properties.
             * @function create
             * @memberof votings_service.TxDistrictResults
             * @static
             * @param {votings_service.ITxDistrictResults=} [properties] Properties to set
             * @returns {votings_service.TxDistrictResults} TxDistrictResults instance
             */
            TxDistrictResults.create = function create(properties) {
                return new TxDistrictResults(properties);
            };
    
            /**
             * Encodes the specified TxDistrictResults message. Does not implicitly {@link votings_service.TxDistrictResults.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxDistrictResults
             * @static
             * @param {votings_service.ITxDistrictResults} message TxDistrictResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxDistrictResults.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.district_id);
                if (message.tally != null && message.hasOwnProperty("tally"))
                    for (var keys = Object.keys(message.tally), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.tally[keys[i]]).ldelim();
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.invalid_ballots_amount);
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.unique_valid_ballots_amount);
                return writer;
            };
    
            /**
             * Encodes the specified TxDistrictResults message, length delimited. Does not implicitly {@link votings_service.TxDistrictResults.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxDistrictResults
             * @static
             * @param {votings_service.ITxDistrictResults} message TxDistrictResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxDistrictResults.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxDistrictResults message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxDistrictResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxDistrictResults} TxDistrictResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxDistrictResults.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxDistrictResults(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.district_id = reader.uint32();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.tally === $util.emptyObject)
                            message.tally = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.tally[key] = reader.uint32();
                        break;
                    case 3:
                        message.invalid_ballots_amount = reader.uint32();
                        break;
                    case 4:
                        message.unique_valid_ballots_amount = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxDistrictResults message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxDistrictResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxDistrictResults} TxDistrictResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxDistrictResults.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxDistrictResults message.
             * @function verify
             * @memberof votings_service.TxDistrictResults
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxDistrictResults.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.tally != null && message.hasOwnProperty("tally")) {
                    if (!$util.isObject(message.tally))
                        return "tally: object expected";
                    var key = Object.keys(message.tally);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "tally: integer key{k:uint32} expected";
                        if (!$util.isInteger(message.tally[key[i]]))
                            return "tally: integer{k:uint32} expected";
                    }
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    if (!$util.isInteger(message.invalid_ballots_amount))
                        return "invalid_ballots_amount: integer expected";
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    if (!$util.isInteger(message.unique_valid_ballots_amount))
                        return "unique_valid_ballots_amount: integer expected";
                return null;
            };
    
            /**
             * Creates a TxDistrictResults message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxDistrictResults
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxDistrictResults} TxDistrictResults
             */
            TxDistrictResults.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxDistrictResults)
                    return object;
                var message = new $root.votings_service.TxDistrictResults();
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.tally) {
                    if (typeof object.tally !== "object")
                        throw TypeError(".votings_service.TxDistrictResults.tally: object expected");
                    message.tally = {};
                    for (var keys = Object.keys(object.tally), i = 0; i < keys.length; ++i)
                        message.tally[keys[i]] = object.tally[keys[i]] >>> 0;
                }
                if (object.invalid_ballots_amount != null)
                    message.invalid_ballots_amount = object.invalid_ballots_amount >>> 0;
                if (object.unique_valid_ballots_amount != null)
                    message.unique_valid_ballots_amount = object.unique_valid_ballots_amount >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a TxDistrictResults message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxDistrictResults
             * @static
             * @param {votings_service.TxDistrictResults} message TxDistrictResults
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxDistrictResults.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.tally = {};
                if (options.defaults) {
                    object.district_id = 0;
                    object.invalid_ballots_amount = 0;
                    object.unique_valid_ballots_amount = 0;
                }
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                var keys2;
                if (message.tally && (keys2 = Object.keys(message.tally)).length) {
                    object.tally = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.tally[keys2[j]] = message.tally[keys2[j]];
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    object.invalid_ballots_amount = message.invalid_ballots_amount;
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    object.unique_valid_ballots_amount = message.unique_valid_ballots_amount;
                return object;
            };
    
            /**
             * Converts this TxDistrictResults to JSON.
             * @function toJSON
             * @memberof votings_service.TxDistrictResults
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxDistrictResults.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxDistrictResults;
        })();
    
        votings_service.TxVotingResults = (function() {
    
            /**
             * Properties of a TxVotingResults.
             * @memberof votings_service
             * @interface ITxVotingResults
             * @property {Object.<string,votings_service.ITxDistrictResults>|null} [district_results] TxVotingResults district_results
             * @property {number|null} [invalid_ballots_amount] TxVotingResults invalid_ballots_amount
             * @property {number|null} [unique_valid_ballots_amount] TxVotingResults unique_valid_ballots_amount
             */
    
            /**
             * Constructs a new TxVotingResults.
             * @memberof votings_service
             * @classdesc Represents a TxVotingResults.
             * @implements ITxVotingResults
             * @constructor
             * @param {votings_service.ITxVotingResults=} [properties] Properties to set
             */
            function TxVotingResults(properties) {
                this.district_results = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxVotingResults district_results.
             * @member {Object.<string,votings_service.ITxDistrictResults>} district_results
             * @memberof votings_service.TxVotingResults
             * @instance
             */
            TxVotingResults.prototype.district_results = $util.emptyObject;
    
            /**
             * TxVotingResults invalid_ballots_amount.
             * @member {number} invalid_ballots_amount
             * @memberof votings_service.TxVotingResults
             * @instance
             */
            TxVotingResults.prototype.invalid_ballots_amount = 0;
    
            /**
             * TxVotingResults unique_valid_ballots_amount.
             * @member {number} unique_valid_ballots_amount
             * @memberof votings_service.TxVotingResults
             * @instance
             */
            TxVotingResults.prototype.unique_valid_ballots_amount = 0;
    
            /**
             * Creates a new TxVotingResults instance using the specified properties.
             * @function create
             * @memberof votings_service.TxVotingResults
             * @static
             * @param {votings_service.ITxVotingResults=} [properties] Properties to set
             * @returns {votings_service.TxVotingResults} TxVotingResults instance
             */
            TxVotingResults.create = function create(properties) {
                return new TxVotingResults(properties);
            };
    
            /**
             * Encodes the specified TxVotingResults message. Does not implicitly {@link votings_service.TxVotingResults.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxVotingResults
             * @static
             * @param {votings_service.ITxVotingResults} message TxVotingResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxVotingResults.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.district_results != null && message.hasOwnProperty("district_results"))
                    for (var keys = Object.keys(message.district_results), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                        $root.votings_service.TxDistrictResults.encode(message.district_results[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.invalid_ballots_amount);
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.unique_valid_ballots_amount);
                return writer;
            };
    
            /**
             * Encodes the specified TxVotingResults message, length delimited. Does not implicitly {@link votings_service.TxVotingResults.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxVotingResults
             * @static
             * @param {votings_service.ITxVotingResults} message TxVotingResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxVotingResults.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxVotingResults message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxVotingResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxVotingResults} TxVotingResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxVotingResults.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxVotingResults(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.district_results === $util.emptyObject)
                            message.district_results = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.district_results[key] = $root.votings_service.TxDistrictResults.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.invalid_ballots_amount = reader.uint32();
                        break;
                    case 3:
                        message.unique_valid_ballots_amount = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxVotingResults message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxVotingResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxVotingResults} TxVotingResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxVotingResults.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxVotingResults message.
             * @function verify
             * @memberof votings_service.TxVotingResults
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxVotingResults.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.district_results != null && message.hasOwnProperty("district_results")) {
                    if (!$util.isObject(message.district_results))
                        return "district_results: object expected";
                    var key = Object.keys(message.district_results);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "district_results: integer key{k:uint32} expected";
                        {
                            var error = $root.votings_service.TxDistrictResults.verify(message.district_results[key[i]]);
                            if (error)
                                return "district_results." + error;
                        }
                    }
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    if (!$util.isInteger(message.invalid_ballots_amount))
                        return "invalid_ballots_amount: integer expected";
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    if (!$util.isInteger(message.unique_valid_ballots_amount))
                        return "unique_valid_ballots_amount: integer expected";
                return null;
            };
    
            /**
             * Creates a TxVotingResults message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxVotingResults
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxVotingResults} TxVotingResults
             */
            TxVotingResults.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxVotingResults)
                    return object;
                var message = new $root.votings_service.TxVotingResults();
                if (object.district_results) {
                    if (typeof object.district_results !== "object")
                        throw TypeError(".votings_service.TxVotingResults.district_results: object expected");
                    message.district_results = {};
                    for (var keys = Object.keys(object.district_results), i = 0; i < keys.length; ++i) {
                        if (typeof object.district_results[keys[i]] !== "object")
                            throw TypeError(".votings_service.TxVotingResults.district_results: object expected");
                        message.district_results[keys[i]] = $root.votings_service.TxDistrictResults.fromObject(object.district_results[keys[i]]);
                    }
                }
                if (object.invalid_ballots_amount != null)
                    message.invalid_ballots_amount = object.invalid_ballots_amount >>> 0;
                if (object.unique_valid_ballots_amount != null)
                    message.unique_valid_ballots_amount = object.unique_valid_ballots_amount >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a TxVotingResults message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxVotingResults
             * @static
             * @param {votings_service.TxVotingResults} message TxVotingResults
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxVotingResults.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.district_results = {};
                if (options.defaults) {
                    object.invalid_ballots_amount = 0;
                    object.unique_valid_ballots_amount = 0;
                }
                var keys2;
                if (message.district_results && (keys2 = Object.keys(message.district_results)).length) {
                    object.district_results = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.district_results[keys2[j]] = $root.votings_service.TxDistrictResults.toObject(message.district_results[keys2[j]], options);
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    object.invalid_ballots_amount = message.invalid_ballots_amount;
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    object.unique_valid_ballots_amount = message.unique_valid_ballots_amount;
                return object;
            };
    
            /**
             * Converts this TxVotingResults to JSON.
             * @function toJSON
             * @memberof votings_service.TxVotingResults
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxVotingResults.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxVotingResults;
        })();
    
        votings_service.TxBallotConfig = (function() {
    
            /**
             * Properties of a TxBallotConfig.
             * @memberof votings_service
             * @interface ITxBallotConfig
             * @property {number|null} [district_id] TxBallotConfig district_id
             * @property {string|null} [question] TxBallotConfig question
             * @property {Object.<string,string>|null} [options] TxBallotConfig options
             * @property {number|null} [min_choices] TxBallotConfig min_choices
             * @property {number|null} [max_choices] TxBallotConfig max_choices
             */
    
            /**
             * Constructs a new TxBallotConfig.
             * @memberof votings_service
             * @classdesc Represents a TxBallotConfig.
             * @implements ITxBallotConfig
             * @constructor
             * @param {votings_service.ITxBallotConfig=} [properties] Properties to set
             */
            function TxBallotConfig(properties) {
                this.options = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxBallotConfig district_id.
             * @member {number} district_id
             * @memberof votings_service.TxBallotConfig
             * @instance
             */
            TxBallotConfig.prototype.district_id = 0;
    
            /**
             * TxBallotConfig question.
             * @member {string} question
             * @memberof votings_service.TxBallotConfig
             * @instance
             */
            TxBallotConfig.prototype.question = "";
    
            /**
             * TxBallotConfig options.
             * @member {Object.<string,string>} options
             * @memberof votings_service.TxBallotConfig
             * @instance
             */
            TxBallotConfig.prototype.options = $util.emptyObject;
    
            /**
             * TxBallotConfig min_choices.
             * @member {number} min_choices
             * @memberof votings_service.TxBallotConfig
             * @instance
             */
            TxBallotConfig.prototype.min_choices = 0;
    
            /**
             * TxBallotConfig max_choices.
             * @member {number} max_choices
             * @memberof votings_service.TxBallotConfig
             * @instance
             */
            TxBallotConfig.prototype.max_choices = 0;
    
            /**
             * Creates a new TxBallotConfig instance using the specified properties.
             * @function create
             * @memberof votings_service.TxBallotConfig
             * @static
             * @param {votings_service.ITxBallotConfig=} [properties] Properties to set
             * @returns {votings_service.TxBallotConfig} TxBallotConfig instance
             */
            TxBallotConfig.create = function create(properties) {
                return new TxBallotConfig(properties);
            };
    
            /**
             * Encodes the specified TxBallotConfig message. Does not implicitly {@link votings_service.TxBallotConfig.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxBallotConfig
             * @static
             * @param {votings_service.ITxBallotConfig} message TxBallotConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxBallotConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.district_id);
                if (message.question != null && message.hasOwnProperty("question"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.question);
                if (message.options != null && message.hasOwnProperty("options"))
                    for (var keys = Object.keys(message.options), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.options[keys[i]]).ldelim();
                if (message.min_choices != null && message.hasOwnProperty("min_choices"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.min_choices);
                if (message.max_choices != null && message.hasOwnProperty("max_choices"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.max_choices);
                return writer;
            };
    
            /**
             * Encodes the specified TxBallotConfig message, length delimited. Does not implicitly {@link votings_service.TxBallotConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxBallotConfig
             * @static
             * @param {votings_service.ITxBallotConfig} message TxBallotConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxBallotConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxBallotConfig message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxBallotConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxBallotConfig} TxBallotConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxBallotConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxBallotConfig(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.district_id = reader.uint32();
                        break;
                    case 2:
                        message.question = reader.string();
                        break;
                    case 3:
                        reader.skip().pos++;
                        if (message.options === $util.emptyObject)
                            message.options = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.options[key] = reader.string();
                        break;
                    case 4:
                        message.min_choices = reader.uint32();
                        break;
                    case 5:
                        message.max_choices = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxBallotConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxBallotConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxBallotConfig} TxBallotConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxBallotConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxBallotConfig message.
             * @function verify
             * @memberof votings_service.TxBallotConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxBallotConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.question != null && message.hasOwnProperty("question"))
                    if (!$util.isString(message.question))
                        return "question: string expected";
                if (message.options != null && message.hasOwnProperty("options")) {
                    if (!$util.isObject(message.options))
                        return "options: object expected";
                    var key = Object.keys(message.options);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "options: integer key{k:uint32} expected";
                        if (!$util.isString(message.options[key[i]]))
                            return "options: string{k:uint32} expected";
                    }
                }
                if (message.min_choices != null && message.hasOwnProperty("min_choices"))
                    if (!$util.isInteger(message.min_choices))
                        return "min_choices: integer expected";
                if (message.max_choices != null && message.hasOwnProperty("max_choices"))
                    if (!$util.isInteger(message.max_choices))
                        return "max_choices: integer expected";
                return null;
            };
    
            /**
             * Creates a TxBallotConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxBallotConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxBallotConfig} TxBallotConfig
             */
            TxBallotConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxBallotConfig)
                    return object;
                var message = new $root.votings_service.TxBallotConfig();
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.question != null)
                    message.question = String(object.question);
                if (object.options) {
                    if (typeof object.options !== "object")
                        throw TypeError(".votings_service.TxBallotConfig.options: object expected");
                    message.options = {};
                    for (var keys = Object.keys(object.options), i = 0; i < keys.length; ++i)
                        message.options[keys[i]] = String(object.options[keys[i]]);
                }
                if (object.min_choices != null)
                    message.min_choices = object.min_choices >>> 0;
                if (object.max_choices != null)
                    message.max_choices = object.max_choices >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a TxBallotConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxBallotConfig
             * @static
             * @param {votings_service.TxBallotConfig} message TxBallotConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxBallotConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.options = {};
                if (options.defaults) {
                    object.district_id = 0;
                    object.question = "";
                    object.min_choices = 0;
                    object.max_choices = 0;
                }
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                if (message.question != null && message.hasOwnProperty("question"))
                    object.question = message.question;
                var keys2;
                if (message.options && (keys2 = Object.keys(message.options)).length) {
                    object.options = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.options[keys2[j]] = message.options[keys2[j]];
                }
                if (message.min_choices != null && message.hasOwnProperty("min_choices"))
                    object.min_choices = message.min_choices;
                if (message.max_choices != null && message.hasOwnProperty("max_choices"))
                    object.max_choices = message.max_choices;
                return object;
            };
    
            /**
             * Converts this TxBallotConfig to JSON.
             * @function toJSON
             * @memberof votings_service.TxBallotConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxBallotConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxBallotConfig;
        })();
    
        votings_service.TxCreateVoting = (function() {
    
            /**
             * Properties of a TxCreateVoting.
             * @memberof votings_service
             * @interface ITxCreateVoting
             * @property {votings_service.ITxCryptoSystemSettings|null} [crypto_system] TxCreateVoting crypto_system
             * @property {Array.<votings_service.ITxBallotConfig>|null} [ballots_config] TxCreateVoting ballots_config
             * @property {boolean|null} [revote_enabled] TxCreateVoting revote_enabled
             */
    
            /**
             * Constructs a new TxCreateVoting.
             * @memberof votings_service
             * @classdesc Represents a TxCreateVoting.
             * @implements ITxCreateVoting
             * @constructor
             * @param {votings_service.ITxCreateVoting=} [properties] Properties to set
             */
            function TxCreateVoting(properties) {
                this.ballots_config = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxCreateVoting crypto_system.
             * @member {votings_service.ITxCryptoSystemSettings|null|undefined} crypto_system
             * @memberof votings_service.TxCreateVoting
             * @instance
             */
            TxCreateVoting.prototype.crypto_system = null;
    
            /**
             * TxCreateVoting ballots_config.
             * @member {Array.<votings_service.ITxBallotConfig>} ballots_config
             * @memberof votings_service.TxCreateVoting
             * @instance
             */
            TxCreateVoting.prototype.ballots_config = $util.emptyArray;
    
            /**
             * TxCreateVoting revote_enabled.
             * @member {boolean} revote_enabled
             * @memberof votings_service.TxCreateVoting
             * @instance
             */
            TxCreateVoting.prototype.revote_enabled = false;
    
            /**
             * Creates a new TxCreateVoting instance using the specified properties.
             * @function create
             * @memberof votings_service.TxCreateVoting
             * @static
             * @param {votings_service.ITxCreateVoting=} [properties] Properties to set
             * @returns {votings_service.TxCreateVoting} TxCreateVoting instance
             */
            TxCreateVoting.create = function create(properties) {
                return new TxCreateVoting(properties);
            };
    
            /**
             * Encodes the specified TxCreateVoting message. Does not implicitly {@link votings_service.TxCreateVoting.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxCreateVoting
             * @static
             * @param {votings_service.ITxCreateVoting} message TxCreateVoting message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxCreateVoting.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.crypto_system != null && message.hasOwnProperty("crypto_system"))
                    $root.votings_service.TxCryptoSystemSettings.encode(message.crypto_system, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.ballots_config != null && message.ballots_config.length)
                    for (var i = 0; i < message.ballots_config.length; ++i)
                        $root.votings_service.TxBallotConfig.encode(message.ballots_config[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.revote_enabled != null && message.hasOwnProperty("revote_enabled"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.revote_enabled);
                return writer;
            };
    
            /**
             * Encodes the specified TxCreateVoting message, length delimited. Does not implicitly {@link votings_service.TxCreateVoting.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxCreateVoting
             * @static
             * @param {votings_service.ITxCreateVoting} message TxCreateVoting message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxCreateVoting.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxCreateVoting message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxCreateVoting
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxCreateVoting} TxCreateVoting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxCreateVoting.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxCreateVoting();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.crypto_system = $root.votings_service.TxCryptoSystemSettings.decode(reader, reader.uint32());
                        break;
                    case 2:
                        if (!(message.ballots_config && message.ballots_config.length))
                            message.ballots_config = [];
                        message.ballots_config.push($root.votings_service.TxBallotConfig.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.revote_enabled = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxCreateVoting message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxCreateVoting
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxCreateVoting} TxCreateVoting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxCreateVoting.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxCreateVoting message.
             * @function verify
             * @memberof votings_service.TxCreateVoting
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxCreateVoting.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.crypto_system != null && message.hasOwnProperty("crypto_system")) {
                    var error = $root.votings_service.TxCryptoSystemSettings.verify(message.crypto_system);
                    if (error)
                        return "crypto_system." + error;
                }
                if (message.ballots_config != null && message.hasOwnProperty("ballots_config")) {
                    if (!Array.isArray(message.ballots_config))
                        return "ballots_config: array expected";
                    for (var i = 0; i < message.ballots_config.length; ++i) {
                        var error = $root.votings_service.TxBallotConfig.verify(message.ballots_config[i]);
                        if (error)
                            return "ballots_config." + error;
                    }
                }
                if (message.revote_enabled != null && message.hasOwnProperty("revote_enabled"))
                    if (typeof message.revote_enabled !== "boolean")
                        return "revote_enabled: boolean expected";
                return null;
            };
    
            /**
             * Creates a TxCreateVoting message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxCreateVoting
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxCreateVoting} TxCreateVoting
             */
            TxCreateVoting.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxCreateVoting)
                    return object;
                var message = new $root.votings_service.TxCreateVoting();
                if (object.crypto_system != null) {
                    if (typeof object.crypto_system !== "object")
                        throw TypeError(".votings_service.TxCreateVoting.crypto_system: object expected");
                    message.crypto_system = $root.votings_service.TxCryptoSystemSettings.fromObject(object.crypto_system);
                }
                if (object.ballots_config) {
                    if (!Array.isArray(object.ballots_config))
                        throw TypeError(".votings_service.TxCreateVoting.ballots_config: array expected");
                    message.ballots_config = [];
                    for (var i = 0; i < object.ballots_config.length; ++i) {
                        if (typeof object.ballots_config[i] !== "object")
                            throw TypeError(".votings_service.TxCreateVoting.ballots_config: object expected");
                        message.ballots_config[i] = $root.votings_service.TxBallotConfig.fromObject(object.ballots_config[i]);
                    }
                }
                if (object.revote_enabled != null)
                    message.revote_enabled = Boolean(object.revote_enabled);
                return message;
            };
    
            /**
             * Creates a plain object from a TxCreateVoting message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxCreateVoting
             * @static
             * @param {votings_service.TxCreateVoting} message TxCreateVoting
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxCreateVoting.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.ballots_config = [];
                if (options.defaults) {
                    object.crypto_system = null;
                    object.revote_enabled = false;
                }
                if (message.crypto_system != null && message.hasOwnProperty("crypto_system"))
                    object.crypto_system = $root.votings_service.TxCryptoSystemSettings.toObject(message.crypto_system, options);
                if (message.ballots_config && message.ballots_config.length) {
                    object.ballots_config = [];
                    for (var j = 0; j < message.ballots_config.length; ++j)
                        object.ballots_config[j] = $root.votings_service.TxBallotConfig.toObject(message.ballots_config[j], options);
                }
                if (message.revote_enabled != null && message.hasOwnProperty("revote_enabled"))
                    object.revote_enabled = message.revote_enabled;
                return object;
            };
    
            /**
             * Converts this TxCreateVoting to JSON.
             * @function toJSON
             * @memberof votings_service.TxCreateVoting
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxCreateVoting.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxCreateVoting;
        })();
    
        votings_service.TxRegisterVoters = (function() {
    
            /**
             * Properties of a TxRegisterVoters.
             * @memberof votings_service
             * @interface ITxRegisterVoters
             * @property {string|null} [voting_id] TxRegisterVoters voting_id
             * @property {Array.<string>|null} [voters] TxRegisterVoters voters
             */
    
            /**
             * Constructs a new TxRegisterVoters.
             * @memberof votings_service
             * @classdesc Represents a TxRegisterVoters.
             * @implements ITxRegisterVoters
             * @constructor
             * @param {votings_service.ITxRegisterVoters=} [properties] Properties to set
             */
            function TxRegisterVoters(properties) {
                this.voters = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxRegisterVoters voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxRegisterVoters
             * @instance
             */
            TxRegisterVoters.prototype.voting_id = "";
    
            /**
             * TxRegisterVoters voters.
             * @member {Array.<string>} voters
             * @memberof votings_service.TxRegisterVoters
             * @instance
             */
            TxRegisterVoters.prototype.voters = $util.emptyArray;
    
            /**
             * Creates a new TxRegisterVoters instance using the specified properties.
             * @function create
             * @memberof votings_service.TxRegisterVoters
             * @static
             * @param {votings_service.ITxRegisterVoters=} [properties] Properties to set
             * @returns {votings_service.TxRegisterVoters} TxRegisterVoters instance
             */
            TxRegisterVoters.create = function create(properties) {
                return new TxRegisterVoters(properties);
            };
    
            /**
             * Encodes the specified TxRegisterVoters message. Does not implicitly {@link votings_service.TxRegisterVoters.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxRegisterVoters
             * @static
             * @param {votings_service.ITxRegisterVoters} message TxRegisterVoters message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxRegisterVoters.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.voters != null && message.voters.length)
                    for (var i = 0; i < message.voters.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.voters[i]);
                return writer;
            };
    
            /**
             * Encodes the specified TxRegisterVoters message, length delimited. Does not implicitly {@link votings_service.TxRegisterVoters.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxRegisterVoters
             * @static
             * @param {votings_service.ITxRegisterVoters} message TxRegisterVoters message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxRegisterVoters.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxRegisterVoters message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxRegisterVoters
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxRegisterVoters} TxRegisterVoters
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxRegisterVoters.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxRegisterVoters();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        if (!(message.voters && message.voters.length))
                            message.voters = [];
                        message.voters.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxRegisterVoters message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxRegisterVoters
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxRegisterVoters} TxRegisterVoters
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxRegisterVoters.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxRegisterVoters message.
             * @function verify
             * @memberof votings_service.TxRegisterVoters
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxRegisterVoters.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.voters != null && message.hasOwnProperty("voters")) {
                    if (!Array.isArray(message.voters))
                        return "voters: array expected";
                    for (var i = 0; i < message.voters.length; ++i)
                        if (!$util.isString(message.voters[i]))
                            return "voters: string[] expected";
                }
                return null;
            };
    
            /**
             * Creates a TxRegisterVoters message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxRegisterVoters
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxRegisterVoters} TxRegisterVoters
             */
            TxRegisterVoters.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxRegisterVoters)
                    return object;
                var message = new $root.votings_service.TxRegisterVoters();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.voters) {
                    if (!Array.isArray(object.voters))
                        throw TypeError(".votings_service.TxRegisterVoters.voters: array expected");
                    message.voters = [];
                    for (var i = 0; i < object.voters.length; ++i)
                        message.voters[i] = String(object.voters[i]);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxRegisterVoters message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxRegisterVoters
             * @static
             * @param {votings_service.TxRegisterVoters} message TxRegisterVoters
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxRegisterVoters.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.voters = [];
                if (options.defaults)
                    object.voting_id = "";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.voters && message.voters.length) {
                    object.voters = [];
                    for (var j = 0; j < message.voters.length; ++j)
                        object.voters[j] = message.voters[j];
                }
                return object;
            };
    
            /**
             * Converts this TxRegisterVoters to JSON.
             * @function toJSON
             * @memberof votings_service.TxRegisterVoters
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxRegisterVoters.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxRegisterVoters;
        })();
    
        votings_service.TxStopRegistration = (function() {
    
            /**
             * Properties of a TxStopRegistration.
             * @memberof votings_service
             * @interface ITxStopRegistration
             * @property {string|null} [voting_id] TxStopRegistration voting_id
             * @property {number|Long|null} [seed] TxStopRegistration seed
             */
    
            /**
             * Constructs a new TxStopRegistration.
             * @memberof votings_service
             * @classdesc Represents a TxStopRegistration.
             * @implements ITxStopRegistration
             * @constructor
             * @param {votings_service.ITxStopRegistration=} [properties] Properties to set
             */
            function TxStopRegistration(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxStopRegistration voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxStopRegistration
             * @instance
             */
            TxStopRegistration.prototype.voting_id = "";
    
            /**
             * TxStopRegistration seed.
             * @member {number|Long} seed
             * @memberof votings_service.TxStopRegistration
             * @instance
             */
            TxStopRegistration.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new TxStopRegistration instance using the specified properties.
             * @function create
             * @memberof votings_service.TxStopRegistration
             * @static
             * @param {votings_service.ITxStopRegistration=} [properties] Properties to set
             * @returns {votings_service.TxStopRegistration} TxStopRegistration instance
             */
            TxStopRegistration.create = function create(properties) {
                return new TxStopRegistration(properties);
            };
    
            /**
             * Encodes the specified TxStopRegistration message. Does not implicitly {@link votings_service.TxStopRegistration.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxStopRegistration
             * @static
             * @param {votings_service.ITxStopRegistration} message TxStopRegistration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStopRegistration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.seed);
                return writer;
            };
    
            /**
             * Encodes the specified TxStopRegistration message, length delimited. Does not implicitly {@link votings_service.TxStopRegistration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxStopRegistration
             * @static
             * @param {votings_service.ITxStopRegistration} message TxStopRegistration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStopRegistration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxStopRegistration message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxStopRegistration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxStopRegistration} TxStopRegistration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStopRegistration.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxStopRegistration();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.seed = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxStopRegistration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxStopRegistration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxStopRegistration} TxStopRegistration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStopRegistration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxStopRegistration message.
             * @function verify
             * @memberof votings_service.TxStopRegistration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxStopRegistration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxStopRegistration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxStopRegistration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxStopRegistration} TxStopRegistration
             */
            TxStopRegistration.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxStopRegistration)
                    return object;
                var message = new $root.votings_service.TxStopRegistration();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a TxStopRegistration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxStopRegistration
             * @static
             * @param {votings_service.TxStopRegistration} message TxStopRegistration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxStopRegistration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                return object;
            };
    
            /**
             * Converts this TxStopRegistration to JSON.
             * @function toJSON
             * @memberof votings_service.TxStopRegistration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxStopRegistration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxStopRegistration;
        })();
    
        votings_service.TxRevokeVoterParticipation = (function() {
    
            /**
             * Properties of a TxRevokeVoterParticipation.
             * @memberof votings_service
             * @interface ITxRevokeVoterParticipation
             * @property {string|null} [voting_id] TxRevokeVoterParticipation voting_id
             * @property {string|null} [voter_id] TxRevokeVoterParticipation voter_id
             * @property {number|Long|null} [seed] TxRevokeVoterParticipation seed
             */
    
            /**
             * Constructs a new TxRevokeVoterParticipation.
             * @memberof votings_service
             * @classdesc Represents a TxRevokeVoterParticipation.
             * @implements ITxRevokeVoterParticipation
             * @constructor
             * @param {votings_service.ITxRevokeVoterParticipation=} [properties] Properties to set
             */
            function TxRevokeVoterParticipation(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxRevokeVoterParticipation voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxRevokeVoterParticipation
             * @instance
             */
            TxRevokeVoterParticipation.prototype.voting_id = "";
    
            /**
             * TxRevokeVoterParticipation voter_id.
             * @member {string} voter_id
             * @memberof votings_service.TxRevokeVoterParticipation
             * @instance
             */
            TxRevokeVoterParticipation.prototype.voter_id = "";
    
            /**
             * TxRevokeVoterParticipation seed.
             * @member {number|Long} seed
             * @memberof votings_service.TxRevokeVoterParticipation
             * @instance
             */
            TxRevokeVoterParticipation.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new TxRevokeVoterParticipation instance using the specified properties.
             * @function create
             * @memberof votings_service.TxRevokeVoterParticipation
             * @static
             * @param {votings_service.ITxRevokeVoterParticipation=} [properties] Properties to set
             * @returns {votings_service.TxRevokeVoterParticipation} TxRevokeVoterParticipation instance
             */
            TxRevokeVoterParticipation.create = function create(properties) {
                return new TxRevokeVoterParticipation(properties);
            };
    
            /**
             * Encodes the specified TxRevokeVoterParticipation message. Does not implicitly {@link votings_service.TxRevokeVoterParticipation.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxRevokeVoterParticipation
             * @static
             * @param {votings_service.ITxRevokeVoterParticipation} message TxRevokeVoterParticipation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxRevokeVoterParticipation.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.voter_id);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.seed);
                return writer;
            };
    
            /**
             * Encodes the specified TxRevokeVoterParticipation message, length delimited. Does not implicitly {@link votings_service.TxRevokeVoterParticipation.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxRevokeVoterParticipation
             * @static
             * @param {votings_service.ITxRevokeVoterParticipation} message TxRevokeVoterParticipation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxRevokeVoterParticipation.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxRevokeVoterParticipation message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxRevokeVoterParticipation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxRevokeVoterParticipation} TxRevokeVoterParticipation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxRevokeVoterParticipation.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxRevokeVoterParticipation();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.voter_id = reader.string();
                        break;
                    case 3:
                        message.seed = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxRevokeVoterParticipation message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxRevokeVoterParticipation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxRevokeVoterParticipation} TxRevokeVoterParticipation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxRevokeVoterParticipation.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxRevokeVoterParticipation message.
             * @function verify
             * @memberof votings_service.TxRevokeVoterParticipation
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxRevokeVoterParticipation.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    if (!$util.isString(message.voter_id))
                        return "voter_id: string expected";
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxRevokeVoterParticipation message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxRevokeVoterParticipation
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxRevokeVoterParticipation} TxRevokeVoterParticipation
             */
            TxRevokeVoterParticipation.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxRevokeVoterParticipation)
                    return object;
                var message = new $root.votings_service.TxRevokeVoterParticipation();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.voter_id != null)
                    message.voter_id = String(object.voter_id);
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a TxRevokeVoterParticipation message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxRevokeVoterParticipation
             * @static
             * @param {votings_service.TxRevokeVoterParticipation} message TxRevokeVoterParticipation
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxRevokeVoterParticipation.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.voter_id = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    object.voter_id = message.voter_id;
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                return object;
            };
    
            /**
             * Converts this TxRevokeVoterParticipation to JSON.
             * @function toJSON
             * @memberof votings_service.TxRevokeVoterParticipation
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxRevokeVoterParticipation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxRevokeVoterParticipation;
        })();
    
        votings_service.TxIssueBallot = (function() {
    
            /**
             * Properties of a TxIssueBallot.
             * @memberof votings_service
             * @interface ITxIssueBallot
             * @property {string|null} [voting_id] TxIssueBallot voting_id
             * @property {string|null} [voter_id] TxIssueBallot voter_id
             * @property {number|null} [district_id] TxIssueBallot district_id
             * @property {number|Long|null} [seed] TxIssueBallot seed
             */
    
            /**
             * Constructs a new TxIssueBallot.
             * @memberof votings_service
             * @classdesc Represents a TxIssueBallot.
             * @implements ITxIssueBallot
             * @constructor
             * @param {votings_service.ITxIssueBallot=} [properties] Properties to set
             */
            function TxIssueBallot(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxIssueBallot voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxIssueBallot
             * @instance
             */
            TxIssueBallot.prototype.voting_id = "";
    
            /**
             * TxIssueBallot voter_id.
             * @member {string} voter_id
             * @memberof votings_service.TxIssueBallot
             * @instance
             */
            TxIssueBallot.prototype.voter_id = "";
    
            /**
             * TxIssueBallot district_id.
             * @member {number} district_id
             * @memberof votings_service.TxIssueBallot
             * @instance
             */
            TxIssueBallot.prototype.district_id = 0;
    
            /**
             * TxIssueBallot seed.
             * @member {number|Long} seed
             * @memberof votings_service.TxIssueBallot
             * @instance
             */
            TxIssueBallot.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new TxIssueBallot instance using the specified properties.
             * @function create
             * @memberof votings_service.TxIssueBallot
             * @static
             * @param {votings_service.ITxIssueBallot=} [properties] Properties to set
             * @returns {votings_service.TxIssueBallot} TxIssueBallot instance
             */
            TxIssueBallot.create = function create(properties) {
                return new TxIssueBallot(properties);
            };
    
            /**
             * Encodes the specified TxIssueBallot message. Does not implicitly {@link votings_service.TxIssueBallot.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxIssueBallot
             * @static
             * @param {votings_service.ITxIssueBallot} message TxIssueBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxIssueBallot.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.voter_id);
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.district_id);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.seed);
                return writer;
            };
    
            /**
             * Encodes the specified TxIssueBallot message, length delimited. Does not implicitly {@link votings_service.TxIssueBallot.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxIssueBallot
             * @static
             * @param {votings_service.ITxIssueBallot} message TxIssueBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxIssueBallot.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxIssueBallot message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxIssueBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxIssueBallot} TxIssueBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxIssueBallot.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxIssueBallot();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.voter_id = reader.string();
                        break;
                    case 3:
                        message.district_id = reader.uint32();
                        break;
                    case 4:
                        message.seed = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxIssueBallot message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxIssueBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxIssueBallot} TxIssueBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxIssueBallot.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxIssueBallot message.
             * @function verify
             * @memberof votings_service.TxIssueBallot
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxIssueBallot.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    if (!$util.isString(message.voter_id))
                        return "voter_id: string expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxIssueBallot message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxIssueBallot
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxIssueBallot} TxIssueBallot
             */
            TxIssueBallot.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxIssueBallot)
                    return object;
                var message = new $root.votings_service.TxIssueBallot();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.voter_id != null)
                    message.voter_id = String(object.voter_id);
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a TxIssueBallot message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxIssueBallot
             * @static
             * @param {votings_service.TxIssueBallot} message TxIssueBallot
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxIssueBallot.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.voter_id = "";
                    object.district_id = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.voter_id != null && message.hasOwnProperty("voter_id"))
                    object.voter_id = message.voter_id;
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                return object;
            };
    
            /**
             * Converts this TxIssueBallot to JSON.
             * @function toJSON
             * @memberof votings_service.TxIssueBallot
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxIssueBallot.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxIssueBallot;
        })();
    
        votings_service.TxAddVoterKey = (function() {
    
            /**
             * Properties of a TxAddVoterKey.
             * @memberof votings_service
             * @interface ITxAddVoterKey
             * @property {string|null} [voting_id] TxAddVoterKey voting_id
             * @property {exonum.crypto.IPublicKey|null} [voter_key] TxAddVoterKey voter_key
             */
    
            /**
             * Constructs a new TxAddVoterKey.
             * @memberof votings_service
             * @classdesc Represents a TxAddVoterKey.
             * @implements ITxAddVoterKey
             * @constructor
             * @param {votings_service.ITxAddVoterKey=} [properties] Properties to set
             */
            function TxAddVoterKey(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxAddVoterKey voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxAddVoterKey
             * @instance
             */
            TxAddVoterKey.prototype.voting_id = "";
    
            /**
             * TxAddVoterKey voter_key.
             * @member {exonum.crypto.IPublicKey|null|undefined} voter_key
             * @memberof votings_service.TxAddVoterKey
             * @instance
             */
            TxAddVoterKey.prototype.voter_key = null;
    
            /**
             * Creates a new TxAddVoterKey instance using the specified properties.
             * @function create
             * @memberof votings_service.TxAddVoterKey
             * @static
             * @param {votings_service.ITxAddVoterKey=} [properties] Properties to set
             * @returns {votings_service.TxAddVoterKey} TxAddVoterKey instance
             */
            TxAddVoterKey.create = function create(properties) {
                return new TxAddVoterKey(properties);
            };
    
            /**
             * Encodes the specified TxAddVoterKey message. Does not implicitly {@link votings_service.TxAddVoterKey.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxAddVoterKey
             * @static
             * @param {votings_service.ITxAddVoterKey} message TxAddVoterKey message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxAddVoterKey.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.voter_key != null && message.hasOwnProperty("voter_key"))
                    $root.exonum.crypto.PublicKey.encode(message.voter_key, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxAddVoterKey message, length delimited. Does not implicitly {@link votings_service.TxAddVoterKey.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxAddVoterKey
             * @static
             * @param {votings_service.ITxAddVoterKey} message TxAddVoterKey message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxAddVoterKey.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxAddVoterKey message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxAddVoterKey
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxAddVoterKey} TxAddVoterKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxAddVoterKey.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxAddVoterKey();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.voter_key = $root.exonum.crypto.PublicKey.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxAddVoterKey message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxAddVoterKey
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxAddVoterKey} TxAddVoterKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxAddVoterKey.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxAddVoterKey message.
             * @function verify
             * @memberof votings_service.TxAddVoterKey
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxAddVoterKey.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.voter_key != null && message.hasOwnProperty("voter_key")) {
                    var error = $root.exonum.crypto.PublicKey.verify(message.voter_key);
                    if (error)
                        return "voter_key." + error;
                }
                return null;
            };
    
            /**
             * Creates a TxAddVoterKey message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxAddVoterKey
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxAddVoterKey} TxAddVoterKey
             */
            TxAddVoterKey.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxAddVoterKey)
                    return object;
                var message = new $root.votings_service.TxAddVoterKey();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.voter_key != null) {
                    if (typeof object.voter_key !== "object")
                        throw TypeError(".votings_service.TxAddVoterKey.voter_key: object expected");
                    message.voter_key = $root.exonum.crypto.PublicKey.fromObject(object.voter_key);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxAddVoterKey message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxAddVoterKey
             * @static
             * @param {votings_service.TxAddVoterKey} message TxAddVoterKey
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxAddVoterKey.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.voter_key = null;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.voter_key != null && message.hasOwnProperty("voter_key"))
                    object.voter_key = $root.exonum.crypto.PublicKey.toObject(message.voter_key, options);
                return object;
            };
    
            /**
             * Converts this TxAddVoterKey to JSON.
             * @function toJSON
             * @memberof votings_service.TxAddVoterKey
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxAddVoterKey.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxAddVoterKey;
        })();
    
        votings_service.TxEncryptedChoice = (function() {
    
            /**
             * Properties of a TxEncryptedChoice.
             * @memberof votings_service
             * @interface ITxEncryptedChoice
             * @property {Uint8Array|null} [encrypted_message] TxEncryptedChoice encrypted_message
             * @property {votings_service.ISealedBoxNonce|null} [nonce] TxEncryptedChoice nonce
             * @property {votings_service.ISealedBoxPublicKey|null} [public_key] TxEncryptedChoice public_key
             */
    
            /**
             * Constructs a new TxEncryptedChoice.
             * @memberof votings_service
             * @classdesc Represents a TxEncryptedChoice.
             * @implements ITxEncryptedChoice
             * @constructor
             * @param {votings_service.ITxEncryptedChoice=} [properties] Properties to set
             */
            function TxEncryptedChoice(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxEncryptedChoice encrypted_message.
             * @member {Uint8Array} encrypted_message
             * @memberof votings_service.TxEncryptedChoice
             * @instance
             */
            TxEncryptedChoice.prototype.encrypted_message = $util.newBuffer([]);
    
            /**
             * TxEncryptedChoice nonce.
             * @member {votings_service.ISealedBoxNonce|null|undefined} nonce
             * @memberof votings_service.TxEncryptedChoice
             * @instance
             */
            TxEncryptedChoice.prototype.nonce = null;
    
            /**
             * TxEncryptedChoice public_key.
             * @member {votings_service.ISealedBoxPublicKey|null|undefined} public_key
             * @memberof votings_service.TxEncryptedChoice
             * @instance
             */
            TxEncryptedChoice.prototype.public_key = null;
    
            /**
             * Creates a new TxEncryptedChoice instance using the specified properties.
             * @function create
             * @memberof votings_service.TxEncryptedChoice
             * @static
             * @param {votings_service.ITxEncryptedChoice=} [properties] Properties to set
             * @returns {votings_service.TxEncryptedChoice} TxEncryptedChoice instance
             */
            TxEncryptedChoice.create = function create(properties) {
                return new TxEncryptedChoice(properties);
            };
    
            /**
             * Encodes the specified TxEncryptedChoice message. Does not implicitly {@link votings_service.TxEncryptedChoice.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxEncryptedChoice
             * @static
             * @param {votings_service.ITxEncryptedChoice} message TxEncryptedChoice message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxEncryptedChoice.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.encrypted_message != null && message.hasOwnProperty("encrypted_message"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encrypted_message);
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    $root.votings_service.SealedBoxNonce.encode(message.nonce, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.public_key != null && message.hasOwnProperty("public_key"))
                    $root.votings_service.SealedBoxPublicKey.encode(message.public_key, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxEncryptedChoice message, length delimited. Does not implicitly {@link votings_service.TxEncryptedChoice.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxEncryptedChoice
             * @static
             * @param {votings_service.ITxEncryptedChoice} message TxEncryptedChoice message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxEncryptedChoice.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxEncryptedChoice message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxEncryptedChoice
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxEncryptedChoice} TxEncryptedChoice
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxEncryptedChoice.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxEncryptedChoice();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.encrypted_message = reader.bytes();
                        break;
                    case 2:
                        message.nonce = $root.votings_service.SealedBoxNonce.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.public_key = $root.votings_service.SealedBoxPublicKey.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxEncryptedChoice message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxEncryptedChoice
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxEncryptedChoice} TxEncryptedChoice
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxEncryptedChoice.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxEncryptedChoice message.
             * @function verify
             * @memberof votings_service.TxEncryptedChoice
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxEncryptedChoice.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.encrypted_message != null && message.hasOwnProperty("encrypted_message"))
                    if (!(message.encrypted_message && typeof message.encrypted_message.length === "number" || $util.isString(message.encrypted_message)))
                        return "encrypted_message: buffer expected";
                if (message.nonce != null && message.hasOwnProperty("nonce")) {
                    var error = $root.votings_service.SealedBoxNonce.verify(message.nonce);
                    if (error)
                        return "nonce." + error;
                }
                if (message.public_key != null && message.hasOwnProperty("public_key")) {
                    var error = $root.votings_service.SealedBoxPublicKey.verify(message.public_key);
                    if (error)
                        return "public_key." + error;
                }
                return null;
            };
    
            /**
             * Creates a TxEncryptedChoice message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxEncryptedChoice
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxEncryptedChoice} TxEncryptedChoice
             */
            TxEncryptedChoice.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxEncryptedChoice)
                    return object;
                var message = new $root.votings_service.TxEncryptedChoice();
                if (object.encrypted_message != null)
                    if (typeof object.encrypted_message === "string")
                        $util.base64.decode(object.encrypted_message, message.encrypted_message = $util.newBuffer($util.base64.length(object.encrypted_message)), 0);
                    else if (object.encrypted_message.length)
                        message.encrypted_message = object.encrypted_message;
                if (object.nonce != null) {
                    if (typeof object.nonce !== "object")
                        throw TypeError(".votings_service.TxEncryptedChoice.nonce: object expected");
                    message.nonce = $root.votings_service.SealedBoxNonce.fromObject(object.nonce);
                }
                if (object.public_key != null) {
                    if (typeof object.public_key !== "object")
                        throw TypeError(".votings_service.TxEncryptedChoice.public_key: object expected");
                    message.public_key = $root.votings_service.SealedBoxPublicKey.fromObject(object.public_key);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxEncryptedChoice message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxEncryptedChoice
             * @static
             * @param {votings_service.TxEncryptedChoice} message TxEncryptedChoice
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxEncryptedChoice.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.encrypted_message = "";
                    else {
                        object.encrypted_message = [];
                        if (options.bytes !== Array)
                            object.encrypted_message = $util.newBuffer(object.encrypted_message);
                    }
                    object.nonce = null;
                    object.public_key = null;
                }
                if (message.encrypted_message != null && message.hasOwnProperty("encrypted_message"))
                    object.encrypted_message = options.bytes === String ? $util.base64.encode(message.encrypted_message, 0, message.encrypted_message.length) : options.bytes === Array ? Array.prototype.slice.call(message.encrypted_message) : message.encrypted_message;
                if (message.nonce != null && message.hasOwnProperty("nonce"))
                    object.nonce = $root.votings_service.SealedBoxNonce.toObject(message.nonce, options);
                if (message.public_key != null && message.hasOwnProperty("public_key"))
                    object.public_key = $root.votings_service.SealedBoxPublicKey.toObject(message.public_key, options);
                return object;
            };
    
            /**
             * Converts this TxEncryptedChoice to JSON.
             * @function toJSON
             * @memberof votings_service.TxEncryptedChoice
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxEncryptedChoice.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxEncryptedChoice;
        })();
    
        votings_service.TxStoreBallot = (function() {
    
            /**
             * Properties of a TxStoreBallot.
             * @memberof votings_service
             * @interface ITxStoreBallot
             * @property {string|null} [voting_id] TxStoreBallot voting_id
             * @property {number|null} [district_id] TxStoreBallot district_id
             * @property {votings_service.ITxEncryptedChoice|null} [encrypted_choice] TxStoreBallot encrypted_choice
             */
    
            /**
             * Constructs a new TxStoreBallot.
             * @memberof votings_service
             * @classdesc Represents a TxStoreBallot.
             * @implements ITxStoreBallot
             * @constructor
             * @param {votings_service.ITxStoreBallot=} [properties] Properties to set
             */
            function TxStoreBallot(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxStoreBallot voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxStoreBallot
             * @instance
             */
            TxStoreBallot.prototype.voting_id = "";
    
            /**
             * TxStoreBallot district_id.
             * @member {number} district_id
             * @memberof votings_service.TxStoreBallot
             * @instance
             */
            TxStoreBallot.prototype.district_id = 0;
    
            /**
             * TxStoreBallot encrypted_choice.
             * @member {votings_service.ITxEncryptedChoice|null|undefined} encrypted_choice
             * @memberof votings_service.TxStoreBallot
             * @instance
             */
            TxStoreBallot.prototype.encrypted_choice = null;
    
            /**
             * Creates a new TxStoreBallot instance using the specified properties.
             * @function create
             * @memberof votings_service.TxStoreBallot
             * @static
             * @param {votings_service.ITxStoreBallot=} [properties] Properties to set
             * @returns {votings_service.TxStoreBallot} TxStoreBallot instance
             */
            TxStoreBallot.create = function create(properties) {
                return new TxStoreBallot(properties);
            };
    
            /**
             * Encodes the specified TxStoreBallot message. Does not implicitly {@link votings_service.TxStoreBallot.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxStoreBallot
             * @static
             * @param {votings_service.ITxStoreBallot} message TxStoreBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStoreBallot.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.district_id);
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice"))
                    $root.votings_service.TxEncryptedChoice.encode(message.encrypted_choice, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxStoreBallot message, length delimited. Does not implicitly {@link votings_service.TxStoreBallot.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxStoreBallot
             * @static
             * @param {votings_service.ITxStoreBallot} message TxStoreBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStoreBallot.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxStoreBallot message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxStoreBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxStoreBallot} TxStoreBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStoreBallot.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxStoreBallot();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.district_id = reader.uint32();
                        break;
                    case 3:
                        message.encrypted_choice = $root.votings_service.TxEncryptedChoice.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxStoreBallot message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxStoreBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxStoreBallot} TxStoreBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStoreBallot.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxStoreBallot message.
             * @function verify
             * @memberof votings_service.TxStoreBallot
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxStoreBallot.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice")) {
                    var error = $root.votings_service.TxEncryptedChoice.verify(message.encrypted_choice);
                    if (error)
                        return "encrypted_choice." + error;
                }
                return null;
            };
    
            /**
             * Creates a TxStoreBallot message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxStoreBallot
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxStoreBallot} TxStoreBallot
             */
            TxStoreBallot.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxStoreBallot)
                    return object;
                var message = new $root.votings_service.TxStoreBallot();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.encrypted_choice != null) {
                    if (typeof object.encrypted_choice !== "object")
                        throw TypeError(".votings_service.TxStoreBallot.encrypted_choice: object expected");
                    message.encrypted_choice = $root.votings_service.TxEncryptedChoice.fromObject(object.encrypted_choice);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxStoreBallot message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxStoreBallot
             * @static
             * @param {votings_service.TxStoreBallot} message TxStoreBallot
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxStoreBallot.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.district_id = 0;
                    object.encrypted_choice = null;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                if (message.encrypted_choice != null && message.hasOwnProperty("encrypted_choice"))
                    object.encrypted_choice = $root.votings_service.TxEncryptedChoice.toObject(message.encrypted_choice, options);
                return object;
            };
    
            /**
             * Converts this TxStoreBallot to JSON.
             * @function toJSON
             * @memberof votings_service.TxStoreBallot
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxStoreBallot.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxStoreBallot;
        })();
    
        votings_service.TxStopVoting = (function() {
    
            /**
             * Properties of a TxStopVoting.
             * @memberof votings_service
             * @interface ITxStopVoting
             * @property {string|null} [voting_id] TxStopVoting voting_id
             * @property {number|Long|null} [seed] TxStopVoting seed
             */
    
            /**
             * Constructs a new TxStopVoting.
             * @memberof votings_service
             * @classdesc Represents a TxStopVoting.
             * @implements ITxStopVoting
             * @constructor
             * @param {votings_service.ITxStopVoting=} [properties] Properties to set
             */
            function TxStopVoting(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxStopVoting voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxStopVoting
             * @instance
             */
            TxStopVoting.prototype.voting_id = "";
    
            /**
             * TxStopVoting seed.
             * @member {number|Long} seed
             * @memberof votings_service.TxStopVoting
             * @instance
             */
            TxStopVoting.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new TxStopVoting instance using the specified properties.
             * @function create
             * @memberof votings_service.TxStopVoting
             * @static
             * @param {votings_service.ITxStopVoting=} [properties] Properties to set
             * @returns {votings_service.TxStopVoting} TxStopVoting instance
             */
            TxStopVoting.create = function create(properties) {
                return new TxStopVoting(properties);
            };
    
            /**
             * Encodes the specified TxStopVoting message. Does not implicitly {@link votings_service.TxStopVoting.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxStopVoting
             * @static
             * @param {votings_service.ITxStopVoting} message TxStopVoting message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStopVoting.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.seed);
                return writer;
            };
    
            /**
             * Encodes the specified TxStopVoting message, length delimited. Does not implicitly {@link votings_service.TxStopVoting.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxStopVoting
             * @static
             * @param {votings_service.ITxStopVoting} message TxStopVoting message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStopVoting.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxStopVoting message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxStopVoting
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxStopVoting} TxStopVoting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStopVoting.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxStopVoting();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.seed = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxStopVoting message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxStopVoting
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxStopVoting} TxStopVoting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStopVoting.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxStopVoting message.
             * @function verify
             * @memberof votings_service.TxStopVoting
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxStopVoting.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxStopVoting message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxStopVoting
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxStopVoting} TxStopVoting
             */
            TxStopVoting.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxStopVoting)
                    return object;
                var message = new $root.votings_service.TxStopVoting();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a TxStopVoting message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxStopVoting
             * @static
             * @param {votings_service.TxStopVoting} message TxStopVoting
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxStopVoting.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                return object;
            };
    
            /**
             * Converts this TxStopVoting to JSON.
             * @function toJSON
             * @memberof votings_service.TxStopVoting
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxStopVoting.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxStopVoting;
        })();
    
        votings_service.TxPublishDecryptionKey = (function() {
    
            /**
             * Properties of a TxPublishDecryptionKey.
             * @memberof votings_service
             * @interface ITxPublishDecryptionKey
             * @property {string|null} [voting_id] TxPublishDecryptionKey voting_id
             * @property {votings_service.ISealedBoxSecretKey|null} [private_key] TxPublishDecryptionKey private_key
             * @property {number|Long|null} [seed] TxPublishDecryptionKey seed
             */
    
            /**
             * Constructs a new TxPublishDecryptionKey.
             * @memberof votings_service
             * @classdesc Represents a TxPublishDecryptionKey.
             * @implements ITxPublishDecryptionKey
             * @constructor
             * @param {votings_service.ITxPublishDecryptionKey=} [properties] Properties to set
             */
            function TxPublishDecryptionKey(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxPublishDecryptionKey voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxPublishDecryptionKey
             * @instance
             */
            TxPublishDecryptionKey.prototype.voting_id = "";
    
            /**
             * TxPublishDecryptionKey private_key.
             * @member {votings_service.ISealedBoxSecretKey|null|undefined} private_key
             * @memberof votings_service.TxPublishDecryptionKey
             * @instance
             */
            TxPublishDecryptionKey.prototype.private_key = null;
    
            /**
             * TxPublishDecryptionKey seed.
             * @member {number|Long} seed
             * @memberof votings_service.TxPublishDecryptionKey
             * @instance
             */
            TxPublishDecryptionKey.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new TxPublishDecryptionKey instance using the specified properties.
             * @function create
             * @memberof votings_service.TxPublishDecryptionKey
             * @static
             * @param {votings_service.ITxPublishDecryptionKey=} [properties] Properties to set
             * @returns {votings_service.TxPublishDecryptionKey} TxPublishDecryptionKey instance
             */
            TxPublishDecryptionKey.create = function create(properties) {
                return new TxPublishDecryptionKey(properties);
            };
    
            /**
             * Encodes the specified TxPublishDecryptionKey message. Does not implicitly {@link votings_service.TxPublishDecryptionKey.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxPublishDecryptionKey
             * @static
             * @param {votings_service.ITxPublishDecryptionKey} message TxPublishDecryptionKey message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxPublishDecryptionKey.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.private_key != null && message.hasOwnProperty("private_key"))
                    $root.votings_service.SealedBoxSecretKey.encode(message.private_key, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.seed);
                return writer;
            };
    
            /**
             * Encodes the specified TxPublishDecryptionKey message, length delimited. Does not implicitly {@link votings_service.TxPublishDecryptionKey.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxPublishDecryptionKey
             * @static
             * @param {votings_service.ITxPublishDecryptionKey} message TxPublishDecryptionKey message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxPublishDecryptionKey.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxPublishDecryptionKey message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxPublishDecryptionKey
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxPublishDecryptionKey} TxPublishDecryptionKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxPublishDecryptionKey.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxPublishDecryptionKey();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.private_key = $root.votings_service.SealedBoxSecretKey.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.seed = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxPublishDecryptionKey message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxPublishDecryptionKey
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxPublishDecryptionKey} TxPublishDecryptionKey
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxPublishDecryptionKey.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxPublishDecryptionKey message.
             * @function verify
             * @memberof votings_service.TxPublishDecryptionKey
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxPublishDecryptionKey.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.private_key != null && message.hasOwnProperty("private_key")) {
                    var error = $root.votings_service.SealedBoxSecretKey.verify(message.private_key);
                    if (error)
                        return "private_key." + error;
                }
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxPublishDecryptionKey message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxPublishDecryptionKey
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxPublishDecryptionKey} TxPublishDecryptionKey
             */
            TxPublishDecryptionKey.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxPublishDecryptionKey)
                    return object;
                var message = new $root.votings_service.TxPublishDecryptionKey();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.private_key != null) {
                    if (typeof object.private_key !== "object")
                        throw TypeError(".votings_service.TxPublishDecryptionKey.private_key: object expected");
                    message.private_key = $root.votings_service.SealedBoxSecretKey.fromObject(object.private_key);
                }
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a TxPublishDecryptionKey message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxPublishDecryptionKey
             * @static
             * @param {votings_service.TxPublishDecryptionKey} message TxPublishDecryptionKey
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxPublishDecryptionKey.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.private_key = null;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.private_key != null && message.hasOwnProperty("private_key"))
                    object.private_key = $root.votings_service.SealedBoxSecretKey.toObject(message.private_key, options);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                return object;
            };
    
            /**
             * Converts this TxPublishDecryptionKey to JSON.
             * @function toJSON
             * @memberof votings_service.TxPublishDecryptionKey
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxPublishDecryptionKey.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxPublishDecryptionKey;
        })();
    
        votings_service.TxDecryptBallot = (function() {
    
            /**
             * Properties of a TxDecryptBallot.
             * @memberof votings_service
             * @interface ITxDecryptBallot
             * @property {string|null} [voting_id] TxDecryptBallot voting_id
             * @property {number|null} [ballot_index] TxDecryptBallot ballot_index
             * @property {number|Long|null} [seed] TxDecryptBallot seed
             */
    
            /**
             * Constructs a new TxDecryptBallot.
             * @memberof votings_service
             * @classdesc Represents a TxDecryptBallot.
             * @implements ITxDecryptBallot
             * @constructor
             * @param {votings_service.ITxDecryptBallot=} [properties] Properties to set
             */
            function TxDecryptBallot(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxDecryptBallot voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxDecryptBallot
             * @instance
             */
            TxDecryptBallot.prototype.voting_id = "";
    
            /**
             * TxDecryptBallot ballot_index.
             * @member {number} ballot_index
             * @memberof votings_service.TxDecryptBallot
             * @instance
             */
            TxDecryptBallot.prototype.ballot_index = 0;
    
            /**
             * TxDecryptBallot seed.
             * @member {number|Long} seed
             * @memberof votings_service.TxDecryptBallot
             * @instance
             */
            TxDecryptBallot.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new TxDecryptBallot instance using the specified properties.
             * @function create
             * @memberof votings_service.TxDecryptBallot
             * @static
             * @param {votings_service.ITxDecryptBallot=} [properties] Properties to set
             * @returns {votings_service.TxDecryptBallot} TxDecryptBallot instance
             */
            TxDecryptBallot.create = function create(properties) {
                return new TxDecryptBallot(properties);
            };
    
            /**
             * Encodes the specified TxDecryptBallot message. Does not implicitly {@link votings_service.TxDecryptBallot.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxDecryptBallot
             * @static
             * @param {votings_service.ITxDecryptBallot} message TxDecryptBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxDecryptBallot.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.ballot_index != null && message.hasOwnProperty("ballot_index"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.ballot_index);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.seed);
                return writer;
            };
    
            /**
             * Encodes the specified TxDecryptBallot message, length delimited. Does not implicitly {@link votings_service.TxDecryptBallot.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxDecryptBallot
             * @static
             * @param {votings_service.ITxDecryptBallot} message TxDecryptBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxDecryptBallot.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxDecryptBallot message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxDecryptBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxDecryptBallot} TxDecryptBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxDecryptBallot.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxDecryptBallot();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.ballot_index = reader.uint32();
                        break;
                    case 3:
                        message.seed = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxDecryptBallot message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxDecryptBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxDecryptBallot} TxDecryptBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxDecryptBallot.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxDecryptBallot message.
             * @function verify
             * @memberof votings_service.TxDecryptBallot
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxDecryptBallot.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.ballot_index != null && message.hasOwnProperty("ballot_index"))
                    if (!$util.isInteger(message.ballot_index))
                        return "ballot_index: integer expected";
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxDecryptBallot message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxDecryptBallot
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxDecryptBallot} TxDecryptBallot
             */
            TxDecryptBallot.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxDecryptBallot)
                    return object;
                var message = new $root.votings_service.TxDecryptBallot();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.ballot_index != null)
                    message.ballot_index = object.ballot_index >>> 0;
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a TxDecryptBallot message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxDecryptBallot
             * @static
             * @param {votings_service.TxDecryptBallot} message TxDecryptBallot
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxDecryptBallot.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.ballot_index = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.ballot_index != null && message.hasOwnProperty("ballot_index"))
                    object.ballot_index = message.ballot_index;
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                return object;
            };
    
            /**
             * Converts this TxDecryptBallot to JSON.
             * @function toJSON
             * @memberof votings_service.TxDecryptBallot
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxDecryptBallot.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxDecryptBallot;
        })();
    
        votings_service.TxFinalizeVoting = (function() {
    
            /**
             * Properties of a TxFinalizeVoting.
             * @memberof votings_service
             * @interface ITxFinalizeVoting
             * @property {string|null} [voting_id] TxFinalizeVoting voting_id
             * @property {number|Long|null} [seed] TxFinalizeVoting seed
             */
    
            /**
             * Constructs a new TxFinalizeVoting.
             * @memberof votings_service
             * @classdesc Represents a TxFinalizeVoting.
             * @implements ITxFinalizeVoting
             * @constructor
             * @param {votings_service.ITxFinalizeVoting=} [properties] Properties to set
             */
            function TxFinalizeVoting(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxFinalizeVoting voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxFinalizeVoting
             * @instance
             */
            TxFinalizeVoting.prototype.voting_id = "";
    
            /**
             * TxFinalizeVoting seed.
             * @member {number|Long} seed
             * @memberof votings_service.TxFinalizeVoting
             * @instance
             */
            TxFinalizeVoting.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new TxFinalizeVoting instance using the specified properties.
             * @function create
             * @memberof votings_service.TxFinalizeVoting
             * @static
             * @param {votings_service.ITxFinalizeVoting=} [properties] Properties to set
             * @returns {votings_service.TxFinalizeVoting} TxFinalizeVoting instance
             */
            TxFinalizeVoting.create = function create(properties) {
                return new TxFinalizeVoting(properties);
            };
    
            /**
             * Encodes the specified TxFinalizeVoting message. Does not implicitly {@link votings_service.TxFinalizeVoting.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxFinalizeVoting
             * @static
             * @param {votings_service.ITxFinalizeVoting} message TxFinalizeVoting message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxFinalizeVoting.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.seed);
                return writer;
            };
    
            /**
             * Encodes the specified TxFinalizeVoting message, length delimited. Does not implicitly {@link votings_service.TxFinalizeVoting.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxFinalizeVoting
             * @static
             * @param {votings_service.ITxFinalizeVoting} message TxFinalizeVoting message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxFinalizeVoting.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxFinalizeVoting message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxFinalizeVoting
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxFinalizeVoting} TxFinalizeVoting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxFinalizeVoting.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxFinalizeVoting();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.seed = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxFinalizeVoting message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxFinalizeVoting
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxFinalizeVoting} TxFinalizeVoting
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxFinalizeVoting.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxFinalizeVoting message.
             * @function verify
             * @memberof votings_service.TxFinalizeVoting
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxFinalizeVoting.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxFinalizeVoting message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxFinalizeVoting
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxFinalizeVoting} TxFinalizeVoting
             */
            TxFinalizeVoting.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxFinalizeVoting)
                    return object;
                var message = new $root.votings_service.TxFinalizeVoting();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a TxFinalizeVoting message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxFinalizeVoting
             * @static
             * @param {votings_service.TxFinalizeVoting} message TxFinalizeVoting
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxFinalizeVoting.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                return object;
            };
    
            /**
             * Converts this TxFinalizeVoting to JSON.
             * @function toJSON
             * @memberof votings_service.TxFinalizeVoting
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxFinalizeVoting.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxFinalizeVoting;
        })();
    
        votings_service.TxFinalizeVotingWithResults = (function() {
    
            /**
             * Properties of a TxFinalizeVotingWithResults.
             * @memberof votings_service
             * @interface ITxFinalizeVotingWithResults
             * @property {string|null} [voting_id] TxFinalizeVotingWithResults voting_id
             * @property {number|Long|null} [seed] TxFinalizeVotingWithResults seed
             * @property {votings_service.ITxVotingResults|null} [results] TxFinalizeVotingWithResults results
             */
    
            /**
             * Constructs a new TxFinalizeVotingWithResults.
             * @memberof votings_service
             * @classdesc Represents a TxFinalizeVotingWithResults.
             * @implements ITxFinalizeVotingWithResults
             * @constructor
             * @param {votings_service.ITxFinalizeVotingWithResults=} [properties] Properties to set
             */
            function TxFinalizeVotingWithResults(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxFinalizeVotingWithResults voting_id.
             * @member {string} voting_id
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @instance
             */
            TxFinalizeVotingWithResults.prototype.voting_id = "";
    
            /**
             * TxFinalizeVotingWithResults seed.
             * @member {number|Long} seed
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @instance
             */
            TxFinalizeVotingWithResults.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * TxFinalizeVotingWithResults results.
             * @member {votings_service.ITxVotingResults|null|undefined} results
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @instance
             */
            TxFinalizeVotingWithResults.prototype.results = null;
    
            /**
             * Creates a new TxFinalizeVotingWithResults instance using the specified properties.
             * @function create
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @static
             * @param {votings_service.ITxFinalizeVotingWithResults=} [properties] Properties to set
             * @returns {votings_service.TxFinalizeVotingWithResults} TxFinalizeVotingWithResults instance
             */
            TxFinalizeVotingWithResults.create = function create(properties) {
                return new TxFinalizeVotingWithResults(properties);
            };
    
            /**
             * Encodes the specified TxFinalizeVotingWithResults message. Does not implicitly {@link votings_service.TxFinalizeVotingWithResults.verify|verify} messages.
             * @function encode
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @static
             * @param {votings_service.ITxFinalizeVotingWithResults} message TxFinalizeVotingWithResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxFinalizeVotingWithResults.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.seed);
                if (message.results != null && message.hasOwnProperty("results"))
                    $root.votings_service.TxVotingResults.encode(message.results, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxFinalizeVotingWithResults message, length delimited. Does not implicitly {@link votings_service.TxFinalizeVotingWithResults.verify|verify} messages.
             * @function encodeDelimited
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @static
             * @param {votings_service.ITxFinalizeVotingWithResults} message TxFinalizeVotingWithResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxFinalizeVotingWithResults.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxFinalizeVotingWithResults message from the specified reader or buffer.
             * @function decode
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {votings_service.TxFinalizeVotingWithResults} TxFinalizeVotingWithResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxFinalizeVotingWithResults.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.votings_service.TxFinalizeVotingWithResults();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.seed = reader.uint64();
                        break;
                    case 3:
                        message.results = $root.votings_service.TxVotingResults.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxFinalizeVotingWithResults message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {votings_service.TxFinalizeVotingWithResults} TxFinalizeVotingWithResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxFinalizeVotingWithResults.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxFinalizeVotingWithResults message.
             * @function verify
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxFinalizeVotingWithResults.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                if (message.results != null && message.hasOwnProperty("results")) {
                    var error = $root.votings_service.TxVotingResults.verify(message.results);
                    if (error)
                        return "results." + error;
                }
                return null;
            };
    
            /**
             * Creates a TxFinalizeVotingWithResults message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {votings_service.TxFinalizeVotingWithResults} TxFinalizeVotingWithResults
             */
            TxFinalizeVotingWithResults.fromObject = function fromObject(object) {
                if (object instanceof $root.votings_service.TxFinalizeVotingWithResults)
                    return object;
                var message = new $root.votings_service.TxFinalizeVotingWithResults();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                if (object.results != null) {
                    if (typeof object.results !== "object")
                        throw TypeError(".votings_service.TxFinalizeVotingWithResults.results: object expected");
                    message.results = $root.votings_service.TxVotingResults.fromObject(object.results);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxFinalizeVotingWithResults message. Also converts values to other types if specified.
             * @function toObject
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @static
             * @param {votings_service.TxFinalizeVotingWithResults} message TxFinalizeVotingWithResults
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxFinalizeVotingWithResults.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                    object.results = null;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                if (message.results != null && message.hasOwnProperty("results"))
                    object.results = $root.votings_service.TxVotingResults.toObject(message.results, options);
                return object;
            };
    
            /**
             * Converts this TxFinalizeVotingWithResults to JSON.
             * @function toJSON
             * @memberof votings_service.TxFinalizeVotingWithResults
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxFinalizeVotingWithResults.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxFinalizeVotingWithResults;
        })();
    
        return votings_service;
    })();
    
    $root.actual_ballots_service = (function() {
    
        /**
         * Namespace actual_ballots_service.
         * @exports actual_ballots_service
         * @namespace
         */
        var actual_ballots_service = {};
    
        actual_ballots_service.ServiceConfig = (function() {
    
            /**
             * Properties of a ServiceConfig.
             * @memberof actual_ballots_service
             * @interface IServiceConfig
             * @property {Array.<string>|null} [api_public_keys] ServiceConfig api_public_keys
             */
    
            /**
             * Constructs a new ServiceConfig.
             * @memberof actual_ballots_service
             * @classdesc Represents a ServiceConfig.
             * @implements IServiceConfig
             * @constructor
             * @param {actual_ballots_service.IServiceConfig=} [properties] Properties to set
             */
            function ServiceConfig(properties) {
                this.api_public_keys = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ServiceConfig api_public_keys.
             * @member {Array.<string>} api_public_keys
             * @memberof actual_ballots_service.ServiceConfig
             * @instance
             */
            ServiceConfig.prototype.api_public_keys = $util.emptyArray;
    
            /**
             * Creates a new ServiceConfig instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.ServiceConfig
             * @static
             * @param {actual_ballots_service.IServiceConfig=} [properties] Properties to set
             * @returns {actual_ballots_service.ServiceConfig} ServiceConfig instance
             */
            ServiceConfig.create = function create(properties) {
                return new ServiceConfig(properties);
            };
    
            /**
             * Encodes the specified ServiceConfig message. Does not implicitly {@link actual_ballots_service.ServiceConfig.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.ServiceConfig
             * @static
             * @param {actual_ballots_service.IServiceConfig} message ServiceConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.api_public_keys != null && message.api_public_keys.length)
                    for (var i = 0; i < message.api_public_keys.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.api_public_keys[i]);
                return writer;
            };
    
            /**
             * Encodes the specified ServiceConfig message, length delimited. Does not implicitly {@link actual_ballots_service.ServiceConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.ServiceConfig
             * @static
             * @param {actual_ballots_service.IServiceConfig} message ServiceConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServiceConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ServiceConfig message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.ServiceConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.ServiceConfig} ServiceConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServiceConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.ServiceConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.api_public_keys && message.api_public_keys.length))
                            message.api_public_keys = [];
                        message.api_public_keys.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ServiceConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.ServiceConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.ServiceConfig} ServiceConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServiceConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ServiceConfig message.
             * @function verify
             * @memberof actual_ballots_service.ServiceConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServiceConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.api_public_keys != null && message.hasOwnProperty("api_public_keys")) {
                    if (!Array.isArray(message.api_public_keys))
                        return "api_public_keys: array expected";
                    for (var i = 0; i < message.api_public_keys.length; ++i)
                        if (!$util.isString(message.api_public_keys[i]))
                            return "api_public_keys: string[] expected";
                }
                return null;
            };
    
            /**
             * Creates a ServiceConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.ServiceConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.ServiceConfig} ServiceConfig
             */
            ServiceConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.ServiceConfig)
                    return object;
                var message = new $root.actual_ballots_service.ServiceConfig();
                if (object.api_public_keys) {
                    if (!Array.isArray(object.api_public_keys))
                        throw TypeError(".actual_ballots_service.ServiceConfig.api_public_keys: array expected");
                    message.api_public_keys = [];
                    for (var i = 0; i < object.api_public_keys.length; ++i)
                        message.api_public_keys[i] = String(object.api_public_keys[i]);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ServiceConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.ServiceConfig
             * @static
             * @param {actual_ballots_service.ServiceConfig} message ServiceConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServiceConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.api_public_keys = [];
                if (message.api_public_keys && message.api_public_keys.length) {
                    object.api_public_keys = [];
                    for (var j = 0; j < message.api_public_keys.length; ++j)
                        object.api_public_keys[j] = message.api_public_keys[j];
                }
                return object;
            };
    
            /**
             * Converts this ServiceConfig to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.ServiceConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServiceConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ServiceConfig;
        })();
    
        /**
         * InvalidReason enum.
         * @name actual_ballots_service.InvalidReason
         * @enum {string}
         * @property {number} WrongDistrict=0 WrongDistrict value
         * @property {number} DecryptionError=1 DecryptionError value
         */
        actual_ballots_service.InvalidReason = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "WrongDistrict"] = 0;
            values[valuesById[1] = "DecryptionError"] = 1;
            return values;
        })();
    
        actual_ballots_service.GroupedTxHash = (function() {
    
            /**
             * Properties of a GroupedTxHash.
             * @memberof actual_ballots_service
             * @interface IGroupedTxHash
             * @property {number|null} [index] GroupedTxHash index
             * @property {string|null} [store_tx_hash] GroupedTxHash store_tx_hash
             * @property {string|null} [encrypted_group_id] GroupedTxHash encrypted_group_id
             * @property {string|null} [group_id] GroupedTxHash group_id
             * @property {number|Long|null} [ts] GroupedTxHash ts
             */
    
            /**
             * Constructs a new GroupedTxHash.
             * @memberof actual_ballots_service
             * @classdesc Represents a GroupedTxHash.
             * @implements IGroupedTxHash
             * @constructor
             * @param {actual_ballots_service.IGroupedTxHash=} [properties] Properties to set
             */
            function GroupedTxHash(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GroupedTxHash index.
             * @member {number} index
             * @memberof actual_ballots_service.GroupedTxHash
             * @instance
             */
            GroupedTxHash.prototype.index = 0;
    
            /**
             * GroupedTxHash store_tx_hash.
             * @member {string} store_tx_hash
             * @memberof actual_ballots_service.GroupedTxHash
             * @instance
             */
            GroupedTxHash.prototype.store_tx_hash = "";
    
            /**
             * GroupedTxHash encrypted_group_id.
             * @member {string} encrypted_group_id
             * @memberof actual_ballots_service.GroupedTxHash
             * @instance
             */
            GroupedTxHash.prototype.encrypted_group_id = "";
    
            /**
             * GroupedTxHash group_id.
             * @member {string} group_id
             * @memberof actual_ballots_service.GroupedTxHash
             * @instance
             */
            GroupedTxHash.prototype.group_id = "";
    
            /**
             * GroupedTxHash ts.
             * @member {number|Long} ts
             * @memberof actual_ballots_service.GroupedTxHash
             * @instance
             */
            GroupedTxHash.prototype.ts = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new GroupedTxHash instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.GroupedTxHash
             * @static
             * @param {actual_ballots_service.IGroupedTxHash=} [properties] Properties to set
             * @returns {actual_ballots_service.GroupedTxHash} GroupedTxHash instance
             */
            GroupedTxHash.create = function create(properties) {
                return new GroupedTxHash(properties);
            };
    
            /**
             * Encodes the specified GroupedTxHash message. Does not implicitly {@link actual_ballots_service.GroupedTxHash.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.GroupedTxHash
             * @static
             * @param {actual_ballots_service.IGroupedTxHash} message GroupedTxHash message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GroupedTxHash.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && message.hasOwnProperty("index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.store_tx_hash);
                if (message.encrypted_group_id != null && message.hasOwnProperty("encrypted_group_id"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.encrypted_group_id);
                if (message.group_id != null && message.hasOwnProperty("group_id"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.group_id);
                if (message.ts != null && message.hasOwnProperty("ts"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.ts);
                return writer;
            };
    
            /**
             * Encodes the specified GroupedTxHash message, length delimited. Does not implicitly {@link actual_ballots_service.GroupedTxHash.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.GroupedTxHash
             * @static
             * @param {actual_ballots_service.IGroupedTxHash} message GroupedTxHash message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GroupedTxHash.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GroupedTxHash message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.GroupedTxHash
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.GroupedTxHash} GroupedTxHash
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GroupedTxHash.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.GroupedTxHash();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.index = reader.uint32();
                        break;
                    case 2:
                        message.store_tx_hash = reader.string();
                        break;
                    case 3:
                        message.encrypted_group_id = reader.string();
                        break;
                    case 4:
                        message.group_id = reader.string();
                        break;
                    case 5:
                        message.ts = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GroupedTxHash message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.GroupedTxHash
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.GroupedTxHash} GroupedTxHash
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GroupedTxHash.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GroupedTxHash message.
             * @function verify
             * @memberof actual_ballots_service.GroupedTxHash
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GroupedTxHash.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    if (!$util.isString(message.store_tx_hash))
                        return "store_tx_hash: string expected";
                if (message.encrypted_group_id != null && message.hasOwnProperty("encrypted_group_id"))
                    if (!$util.isString(message.encrypted_group_id))
                        return "encrypted_group_id: string expected";
                if (message.group_id != null && message.hasOwnProperty("group_id"))
                    if (!$util.isString(message.group_id))
                        return "group_id: string expected";
                if (message.ts != null && message.hasOwnProperty("ts"))
                    if (!$util.isInteger(message.ts) && !(message.ts && $util.isInteger(message.ts.low) && $util.isInteger(message.ts.high)))
                        return "ts: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a GroupedTxHash message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.GroupedTxHash
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.GroupedTxHash} GroupedTxHash
             */
            GroupedTxHash.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.GroupedTxHash)
                    return object;
                var message = new $root.actual_ballots_service.GroupedTxHash();
                if (object.index != null)
                    message.index = object.index >>> 0;
                if (object.store_tx_hash != null)
                    message.store_tx_hash = String(object.store_tx_hash);
                if (object.encrypted_group_id != null)
                    message.encrypted_group_id = String(object.encrypted_group_id);
                if (object.group_id != null)
                    message.group_id = String(object.group_id);
                if (object.ts != null)
                    if ($util.Long)
                        (message.ts = $util.Long.fromValue(object.ts)).unsigned = false;
                    else if (typeof object.ts === "string")
                        message.ts = parseInt(object.ts, 10);
                    else if (typeof object.ts === "number")
                        message.ts = object.ts;
                    else if (typeof object.ts === "object")
                        message.ts = new $util.LongBits(object.ts.low >>> 0, object.ts.high >>> 0).toNumber();
                return message;
            };
    
            /**
             * Creates a plain object from a GroupedTxHash message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.GroupedTxHash
             * @static
             * @param {actual_ballots_service.GroupedTxHash} message GroupedTxHash
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GroupedTxHash.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.index = 0;
                    object.store_tx_hash = "";
                    object.encrypted_group_id = "";
                    object.group_id = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ts = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ts = options.longs === String ? "0" : 0;
                }
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    object.store_tx_hash = message.store_tx_hash;
                if (message.encrypted_group_id != null && message.hasOwnProperty("encrypted_group_id"))
                    object.encrypted_group_id = message.encrypted_group_id;
                if (message.group_id != null && message.hasOwnProperty("group_id"))
                    object.group_id = message.group_id;
                if (message.ts != null && message.hasOwnProperty("ts"))
                    if (typeof message.ts === "number")
                        object.ts = options.longs === String ? String(message.ts) : message.ts;
                    else
                        object.ts = options.longs === String ? $util.Long.prototype.toString.call(message.ts) : options.longs === Number ? new $util.LongBits(message.ts.low >>> 0, message.ts.high >>> 0).toNumber() : message.ts;
                return object;
            };
    
            /**
             * Converts this GroupedTxHash to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.GroupedTxHash
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GroupedTxHash.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return GroupedTxHash;
        })();
    
        actual_ballots_service.ActualBallot = (function() {
    
            /**
             * Properties of an ActualBallot.
             * @memberof actual_ballots_service
             * @interface IActualBallot
             * @property {string|null} [voter] ActualBallot voter
             * @property {number|null} [district_id] ActualBallot district_id
             * @property {Array.<number>|null} [decrypted_choices] ActualBallot decrypted_choices
             * @property {string|null} [store_tx_hash] ActualBallot store_tx_hash
             * @property {string|null} [decrypt_tx_hash] ActualBallot decrypt_tx_hash
             * @property {actual_ballots_service.IBallotStatus|null} [status] ActualBallot status
             */
    
            /**
             * Constructs a new ActualBallot.
             * @memberof actual_ballots_service
             * @classdesc Represents an ActualBallot.
             * @implements IActualBallot
             * @constructor
             * @param {actual_ballots_service.IActualBallot=} [properties] Properties to set
             */
            function ActualBallot(properties) {
                this.decrypted_choices = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ActualBallot voter.
             * @member {string} voter
             * @memberof actual_ballots_service.ActualBallot
             * @instance
             */
            ActualBallot.prototype.voter = "";
    
            /**
             * ActualBallot district_id.
             * @member {number} district_id
             * @memberof actual_ballots_service.ActualBallot
             * @instance
             */
            ActualBallot.prototype.district_id = 0;
    
            /**
             * ActualBallot decrypted_choices.
             * @member {Array.<number>} decrypted_choices
             * @memberof actual_ballots_service.ActualBallot
             * @instance
             */
            ActualBallot.prototype.decrypted_choices = $util.emptyArray;
    
            /**
             * ActualBallot store_tx_hash.
             * @member {string} store_tx_hash
             * @memberof actual_ballots_service.ActualBallot
             * @instance
             */
            ActualBallot.prototype.store_tx_hash = "";
    
            /**
             * ActualBallot decrypt_tx_hash.
             * @member {string} decrypt_tx_hash
             * @memberof actual_ballots_service.ActualBallot
             * @instance
             */
            ActualBallot.prototype.decrypt_tx_hash = "";
    
            /**
             * ActualBallot status.
             * @member {actual_ballots_service.IBallotStatus|null|undefined} status
             * @memberof actual_ballots_service.ActualBallot
             * @instance
             */
            ActualBallot.prototype.status = null;
    
            /**
             * Creates a new ActualBallot instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.ActualBallot
             * @static
             * @param {actual_ballots_service.IActualBallot=} [properties] Properties to set
             * @returns {actual_ballots_service.ActualBallot} ActualBallot instance
             */
            ActualBallot.create = function create(properties) {
                return new ActualBallot(properties);
            };
    
            /**
             * Encodes the specified ActualBallot message. Does not implicitly {@link actual_ballots_service.ActualBallot.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.ActualBallot
             * @static
             * @param {actual_ballots_service.IActualBallot} message ActualBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActualBallot.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voter != null && message.hasOwnProperty("voter"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voter);
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.district_id);
                if (message.decrypted_choices != null && message.decrypted_choices.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (var i = 0; i < message.decrypted_choices.length; ++i)
                        writer.uint32(message.decrypted_choices[i]);
                    writer.ldelim();
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.store_tx_hash);
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.decrypt_tx_hash);
                if (message.status != null && message.hasOwnProperty("status"))
                    $root.actual_ballots_service.BallotStatus.encode(message.status, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ActualBallot message, length delimited. Does not implicitly {@link actual_ballots_service.ActualBallot.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.ActualBallot
             * @static
             * @param {actual_ballots_service.IActualBallot} message ActualBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActualBallot.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an ActualBallot message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.ActualBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.ActualBallot} ActualBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActualBallot.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.ActualBallot();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voter = reader.string();
                        break;
                    case 2:
                        message.district_id = reader.uint32();
                        break;
                    case 3:
                        if (!(message.decrypted_choices && message.decrypted_choices.length))
                            message.decrypted_choices = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.decrypted_choices.push(reader.uint32());
                        } else
                            message.decrypted_choices.push(reader.uint32());
                        break;
                    case 4:
                        message.store_tx_hash = reader.string();
                        break;
                    case 5:
                        message.decrypt_tx_hash = reader.string();
                        break;
                    case 6:
                        message.status = $root.actual_ballots_service.BallotStatus.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an ActualBallot message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.ActualBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.ActualBallot} ActualBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActualBallot.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an ActualBallot message.
             * @function verify
             * @memberof actual_ballots_service.ActualBallot
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ActualBallot.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voter != null && message.hasOwnProperty("voter"))
                    if (!$util.isString(message.voter))
                        return "voter: string expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.decrypted_choices != null && message.hasOwnProperty("decrypted_choices")) {
                    if (!Array.isArray(message.decrypted_choices))
                        return "decrypted_choices: array expected";
                    for (var i = 0; i < message.decrypted_choices.length; ++i)
                        if (!$util.isInteger(message.decrypted_choices[i]))
                            return "decrypted_choices: integer[] expected";
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    if (!$util.isString(message.store_tx_hash))
                        return "store_tx_hash: string expected";
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash"))
                    if (!$util.isString(message.decrypt_tx_hash))
                        return "decrypt_tx_hash: string expected";
                if (message.status != null && message.hasOwnProperty("status")) {
                    var error = $root.actual_ballots_service.BallotStatus.verify(message.status);
                    if (error)
                        return "status." + error;
                }
                return null;
            };
    
            /**
             * Creates an ActualBallot message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.ActualBallot
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.ActualBallot} ActualBallot
             */
            ActualBallot.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.ActualBallot)
                    return object;
                var message = new $root.actual_ballots_service.ActualBallot();
                if (object.voter != null)
                    message.voter = String(object.voter);
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.decrypted_choices) {
                    if (!Array.isArray(object.decrypted_choices))
                        throw TypeError(".actual_ballots_service.ActualBallot.decrypted_choices: array expected");
                    message.decrypted_choices = [];
                    for (var i = 0; i < object.decrypted_choices.length; ++i)
                        message.decrypted_choices[i] = object.decrypted_choices[i] >>> 0;
                }
                if (object.store_tx_hash != null)
                    message.store_tx_hash = String(object.store_tx_hash);
                if (object.decrypt_tx_hash != null)
                    message.decrypt_tx_hash = String(object.decrypt_tx_hash);
                if (object.status != null) {
                    if (typeof object.status !== "object")
                        throw TypeError(".actual_ballots_service.ActualBallot.status: object expected");
                    message.status = $root.actual_ballots_service.BallotStatus.fromObject(object.status);
                }
                return message;
            };
    
            /**
             * Creates a plain object from an ActualBallot message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.ActualBallot
             * @static
             * @param {actual_ballots_service.ActualBallot} message ActualBallot
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActualBallot.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.decrypted_choices = [];
                if (options.defaults) {
                    object.voter = "";
                    object.district_id = 0;
                    object.store_tx_hash = "";
                    object.decrypt_tx_hash = "";
                    object.status = null;
                }
                if (message.voter != null && message.hasOwnProperty("voter"))
                    object.voter = message.voter;
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                if (message.decrypted_choices && message.decrypted_choices.length) {
                    object.decrypted_choices = [];
                    for (var j = 0; j < message.decrypted_choices.length; ++j)
                        object.decrypted_choices[j] = message.decrypted_choices[j];
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    object.store_tx_hash = message.store_tx_hash;
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash"))
                    object.decrypt_tx_hash = message.decrypt_tx_hash;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = $root.actual_ballots_service.BallotStatus.toObject(message.status, options);
                return object;
            };
    
            /**
             * Converts this ActualBallot to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.ActualBallot
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActualBallot.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ActualBallot;
        })();
    
        actual_ballots_service.DistrictResults = (function() {
    
            /**
             * Properties of a DistrictResults.
             * @memberof actual_ballots_service
             * @interface IDistrictResults
             * @property {number|null} [district_id] DistrictResults district_id
             * @property {Object.<string,number>|null} [tally] DistrictResults tally
             * @property {number|null} [invalid_ballots_amount] DistrictResults invalid_ballots_amount
             * @property {number|null} [unique_valid_ballots_amount] DistrictResults unique_valid_ballots_amount
             */
    
            /**
             * Constructs a new DistrictResults.
             * @memberof actual_ballots_service
             * @classdesc Represents a DistrictResults.
             * @implements IDistrictResults
             * @constructor
             * @param {actual_ballots_service.IDistrictResults=} [properties] Properties to set
             */
            function DistrictResults(properties) {
                this.tally = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DistrictResults district_id.
             * @member {number} district_id
             * @memberof actual_ballots_service.DistrictResults
             * @instance
             */
            DistrictResults.prototype.district_id = 0;
    
            /**
             * DistrictResults tally.
             * @member {Object.<string,number>} tally
             * @memberof actual_ballots_service.DistrictResults
             * @instance
             */
            DistrictResults.prototype.tally = $util.emptyObject;
    
            /**
             * DistrictResults invalid_ballots_amount.
             * @member {number} invalid_ballots_amount
             * @memberof actual_ballots_service.DistrictResults
             * @instance
             */
            DistrictResults.prototype.invalid_ballots_amount = 0;
    
            /**
             * DistrictResults unique_valid_ballots_amount.
             * @member {number} unique_valid_ballots_amount
             * @memberof actual_ballots_service.DistrictResults
             * @instance
             */
            DistrictResults.prototype.unique_valid_ballots_amount = 0;
    
            /**
             * Creates a new DistrictResults instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.DistrictResults
             * @static
             * @param {actual_ballots_service.IDistrictResults=} [properties] Properties to set
             * @returns {actual_ballots_service.DistrictResults} DistrictResults instance
             */
            DistrictResults.create = function create(properties) {
                return new DistrictResults(properties);
            };
    
            /**
             * Encodes the specified DistrictResults message. Does not implicitly {@link actual_ballots_service.DistrictResults.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.DistrictResults
             * @static
             * @param {actual_ballots_service.IDistrictResults} message DistrictResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DistrictResults.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.district_id);
                if (message.tally != null && message.hasOwnProperty("tally"))
                    for (var keys = Object.keys(message.tally), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 0 =*/16).uint32(message.tally[keys[i]]).ldelim();
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.invalid_ballots_amount);
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.unique_valid_ballots_amount);
                return writer;
            };
    
            /**
             * Encodes the specified DistrictResults message, length delimited. Does not implicitly {@link actual_ballots_service.DistrictResults.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.DistrictResults
             * @static
             * @param {actual_ballots_service.IDistrictResults} message DistrictResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DistrictResults.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DistrictResults message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.DistrictResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.DistrictResults} DistrictResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DistrictResults.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.DistrictResults(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.district_id = reader.uint32();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.tally === $util.emptyObject)
                            message.tally = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.tally[key] = reader.uint32();
                        break;
                    case 3:
                        message.invalid_ballots_amount = reader.uint32();
                        break;
                    case 4:
                        message.unique_valid_ballots_amount = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DistrictResults message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.DistrictResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.DistrictResults} DistrictResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DistrictResults.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DistrictResults message.
             * @function verify
             * @memberof actual_ballots_service.DistrictResults
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DistrictResults.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.tally != null && message.hasOwnProperty("tally")) {
                    if (!$util.isObject(message.tally))
                        return "tally: object expected";
                    var key = Object.keys(message.tally);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "tally: integer key{k:uint32} expected";
                        if (!$util.isInteger(message.tally[key[i]]))
                            return "tally: integer{k:uint32} expected";
                    }
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    if (!$util.isInteger(message.invalid_ballots_amount))
                        return "invalid_ballots_amount: integer expected";
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    if (!$util.isInteger(message.unique_valid_ballots_amount))
                        return "unique_valid_ballots_amount: integer expected";
                return null;
            };
    
            /**
             * Creates a DistrictResults message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.DistrictResults
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.DistrictResults} DistrictResults
             */
            DistrictResults.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.DistrictResults)
                    return object;
                var message = new $root.actual_ballots_service.DistrictResults();
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.tally) {
                    if (typeof object.tally !== "object")
                        throw TypeError(".actual_ballots_service.DistrictResults.tally: object expected");
                    message.tally = {};
                    for (var keys = Object.keys(object.tally), i = 0; i < keys.length; ++i)
                        message.tally[keys[i]] = object.tally[keys[i]] >>> 0;
                }
                if (object.invalid_ballots_amount != null)
                    message.invalid_ballots_amount = object.invalid_ballots_amount >>> 0;
                if (object.unique_valid_ballots_amount != null)
                    message.unique_valid_ballots_amount = object.unique_valid_ballots_amount >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a DistrictResults message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.DistrictResults
             * @static
             * @param {actual_ballots_service.DistrictResults} message DistrictResults
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DistrictResults.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.tally = {};
                if (options.defaults) {
                    object.district_id = 0;
                    object.invalid_ballots_amount = 0;
                    object.unique_valid_ballots_amount = 0;
                }
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                var keys2;
                if (message.tally && (keys2 = Object.keys(message.tally)).length) {
                    object.tally = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.tally[keys2[j]] = message.tally[keys2[j]];
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    object.invalid_ballots_amount = message.invalid_ballots_amount;
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    object.unique_valid_ballots_amount = message.unique_valid_ballots_amount;
                return object;
            };
    
            /**
             * Converts this DistrictResults to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.DistrictResults
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DistrictResults.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DistrictResults;
        })();
    
        actual_ballots_service.VotingResults = (function() {
    
            /**
             * Properties of a VotingResults.
             * @memberof actual_ballots_service
             * @interface IVotingResults
             * @property {Object.<string,actual_ballots_service.IDistrictResults>|null} [district_results] VotingResults district_results
             * @property {number|null} [invalid_ballots_amount] VotingResults invalid_ballots_amount
             * @property {number|null} [unique_valid_ballots_amount] VotingResults unique_valid_ballots_amount
             */
    
            /**
             * Constructs a new VotingResults.
             * @memberof actual_ballots_service
             * @classdesc Represents a VotingResults.
             * @implements IVotingResults
             * @constructor
             * @param {actual_ballots_service.IVotingResults=} [properties] Properties to set
             */
            function VotingResults(properties) {
                this.district_results = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * VotingResults district_results.
             * @member {Object.<string,actual_ballots_service.IDistrictResults>} district_results
             * @memberof actual_ballots_service.VotingResults
             * @instance
             */
            VotingResults.prototype.district_results = $util.emptyObject;
    
            /**
             * VotingResults invalid_ballots_amount.
             * @member {number} invalid_ballots_amount
             * @memberof actual_ballots_service.VotingResults
             * @instance
             */
            VotingResults.prototype.invalid_ballots_amount = 0;
    
            /**
             * VotingResults unique_valid_ballots_amount.
             * @member {number} unique_valid_ballots_amount
             * @memberof actual_ballots_service.VotingResults
             * @instance
             */
            VotingResults.prototype.unique_valid_ballots_amount = 0;
    
            /**
             * Creates a new VotingResults instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.VotingResults
             * @static
             * @param {actual_ballots_service.IVotingResults=} [properties] Properties to set
             * @returns {actual_ballots_service.VotingResults} VotingResults instance
             */
            VotingResults.create = function create(properties) {
                return new VotingResults(properties);
            };
    
            /**
             * Encodes the specified VotingResults message. Does not implicitly {@link actual_ballots_service.VotingResults.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.VotingResults
             * @static
             * @param {actual_ballots_service.IVotingResults} message VotingResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VotingResults.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.district_results != null && message.hasOwnProperty("district_results"))
                    for (var keys = Object.keys(message.district_results), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                        $root.actual_ballots_service.DistrictResults.encode(message.district_results[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.invalid_ballots_amount);
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.unique_valid_ballots_amount);
                return writer;
            };
    
            /**
             * Encodes the specified VotingResults message, length delimited. Does not implicitly {@link actual_ballots_service.VotingResults.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.VotingResults
             * @static
             * @param {actual_ballots_service.IVotingResults} message VotingResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VotingResults.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a VotingResults message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.VotingResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.VotingResults} VotingResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VotingResults.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.VotingResults(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.district_results === $util.emptyObject)
                            message.district_results = {};
                        key = reader.uint32();
                        reader.pos++;
                        message.district_results[key] = $root.actual_ballots_service.DistrictResults.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.invalid_ballots_amount = reader.uint32();
                        break;
                    case 3:
                        message.unique_valid_ballots_amount = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a VotingResults message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.VotingResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.VotingResults} VotingResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VotingResults.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a VotingResults message.
             * @function verify
             * @memberof actual_ballots_service.VotingResults
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VotingResults.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.district_results != null && message.hasOwnProperty("district_results")) {
                    if (!$util.isObject(message.district_results))
                        return "district_results: object expected";
                    var key = Object.keys(message.district_results);
                    for (var i = 0; i < key.length; ++i) {
                        if (!$util.key32Re.test(key[i]))
                            return "district_results: integer key{k:uint32} expected";
                        {
                            var error = $root.actual_ballots_service.DistrictResults.verify(message.district_results[key[i]]);
                            if (error)
                                return "district_results." + error;
                        }
                    }
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    if (!$util.isInteger(message.invalid_ballots_amount))
                        return "invalid_ballots_amount: integer expected";
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    if (!$util.isInteger(message.unique_valid_ballots_amount))
                        return "unique_valid_ballots_amount: integer expected";
                return null;
            };
    
            /**
             * Creates a VotingResults message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.VotingResults
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.VotingResults} VotingResults
             */
            VotingResults.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.VotingResults)
                    return object;
                var message = new $root.actual_ballots_service.VotingResults();
                if (object.district_results) {
                    if (typeof object.district_results !== "object")
                        throw TypeError(".actual_ballots_service.VotingResults.district_results: object expected");
                    message.district_results = {};
                    for (var keys = Object.keys(object.district_results), i = 0; i < keys.length; ++i) {
                        if (typeof object.district_results[keys[i]] !== "object")
                            throw TypeError(".actual_ballots_service.VotingResults.district_results: object expected");
                        message.district_results[keys[i]] = $root.actual_ballots_service.DistrictResults.fromObject(object.district_results[keys[i]]);
                    }
                }
                if (object.invalid_ballots_amount != null)
                    message.invalid_ballots_amount = object.invalid_ballots_amount >>> 0;
                if (object.unique_valid_ballots_amount != null)
                    message.unique_valid_ballots_amount = object.unique_valid_ballots_amount >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a VotingResults message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.VotingResults
             * @static
             * @param {actual_ballots_service.VotingResults} message VotingResults
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VotingResults.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.district_results = {};
                if (options.defaults) {
                    object.invalid_ballots_amount = 0;
                    object.unique_valid_ballots_amount = 0;
                }
                var keys2;
                if (message.district_results && (keys2 = Object.keys(message.district_results)).length) {
                    object.district_results = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.district_results[keys2[j]] = $root.actual_ballots_service.DistrictResults.toObject(message.district_results[keys2[j]], options);
                }
                if (message.invalid_ballots_amount != null && message.hasOwnProperty("invalid_ballots_amount"))
                    object.invalid_ballots_amount = message.invalid_ballots_amount;
                if (message.unique_valid_ballots_amount != null && message.hasOwnProperty("unique_valid_ballots_amount"))
                    object.unique_valid_ballots_amount = message.unique_valid_ballots_amount;
                return object;
            };
    
            /**
             * Converts this VotingResults to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.VotingResults
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VotingResults.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return VotingResults;
        })();
    
        actual_ballots_service.ActualBallotsStorage = (function() {
    
            /**
             * Properties of an ActualBallotsStorage.
             * @memberof actual_ballots_service
             * @interface IActualBallotsStorage
             * @property {string|null} [voting_id] ActualBallotsStorage voting_id
             * @property {number|null} [actual_ballots_amount] ActualBallotsStorage actual_ballots_amount
             * @property {actual_ballots_service.IVotingResults|null} [voting_results] ActualBallotsStorage voting_results
             */
    
            /**
             * Constructs a new ActualBallotsStorage.
             * @memberof actual_ballots_service
             * @classdesc Represents an ActualBallotsStorage.
             * @implements IActualBallotsStorage
             * @constructor
             * @param {actual_ballots_service.IActualBallotsStorage=} [properties] Properties to set
             */
            function ActualBallotsStorage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ActualBallotsStorage voting_id.
             * @member {string} voting_id
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @instance
             */
            ActualBallotsStorage.prototype.voting_id = "";
    
            /**
             * ActualBallotsStorage actual_ballots_amount.
             * @member {number} actual_ballots_amount
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @instance
             */
            ActualBallotsStorage.prototype.actual_ballots_amount = 0;
    
            /**
             * ActualBallotsStorage voting_results.
             * @member {actual_ballots_service.IVotingResults|null|undefined} voting_results
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @instance
             */
            ActualBallotsStorage.prototype.voting_results = null;
    
            /**
             * Creates a new ActualBallotsStorage instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @static
             * @param {actual_ballots_service.IActualBallotsStorage=} [properties] Properties to set
             * @returns {actual_ballots_service.ActualBallotsStorage} ActualBallotsStorage instance
             */
            ActualBallotsStorage.create = function create(properties) {
                return new ActualBallotsStorage(properties);
            };
    
            /**
             * Encodes the specified ActualBallotsStorage message. Does not implicitly {@link actual_ballots_service.ActualBallotsStorage.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @static
             * @param {actual_ballots_service.IActualBallotsStorage} message ActualBallotsStorage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActualBallotsStorage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.actual_ballots_amount != null && message.hasOwnProperty("actual_ballots_amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.actual_ballots_amount);
                if (message.voting_results != null && message.hasOwnProperty("voting_results"))
                    $root.actual_ballots_service.VotingResults.encode(message.voting_results, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ActualBallotsStorage message, length delimited. Does not implicitly {@link actual_ballots_service.ActualBallotsStorage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @static
             * @param {actual_ballots_service.IActualBallotsStorage} message ActualBallotsStorage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActualBallotsStorage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an ActualBallotsStorage message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.ActualBallotsStorage} ActualBallotsStorage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActualBallotsStorage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.ActualBallotsStorage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.actual_ballots_amount = reader.uint32();
                        break;
                    case 3:
                        message.voting_results = $root.actual_ballots_service.VotingResults.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an ActualBallotsStorage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.ActualBallotsStorage} ActualBallotsStorage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActualBallotsStorage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an ActualBallotsStorage message.
             * @function verify
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ActualBallotsStorage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.actual_ballots_amount != null && message.hasOwnProperty("actual_ballots_amount"))
                    if (!$util.isInteger(message.actual_ballots_amount))
                        return "actual_ballots_amount: integer expected";
                if (message.voting_results != null && message.hasOwnProperty("voting_results")) {
                    var error = $root.actual_ballots_service.VotingResults.verify(message.voting_results);
                    if (error)
                        return "voting_results." + error;
                }
                return null;
            };
    
            /**
             * Creates an ActualBallotsStorage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.ActualBallotsStorage} ActualBallotsStorage
             */
            ActualBallotsStorage.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.ActualBallotsStorage)
                    return object;
                var message = new $root.actual_ballots_service.ActualBallotsStorage();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.actual_ballots_amount != null)
                    message.actual_ballots_amount = object.actual_ballots_amount >>> 0;
                if (object.voting_results != null) {
                    if (typeof object.voting_results !== "object")
                        throw TypeError(".actual_ballots_service.ActualBallotsStorage.voting_results: object expected");
                    message.voting_results = $root.actual_ballots_service.VotingResults.fromObject(object.voting_results);
                }
                return message;
            };
    
            /**
             * Creates a plain object from an ActualBallotsStorage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @static
             * @param {actual_ballots_service.ActualBallotsStorage} message ActualBallotsStorage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActualBallotsStorage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.actual_ballots_amount = 0;
                    object.voting_results = null;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.actual_ballots_amount != null && message.hasOwnProperty("actual_ballots_amount"))
                    object.actual_ballots_amount = message.actual_ballots_amount;
                if (message.voting_results != null && message.hasOwnProperty("voting_results"))
                    object.voting_results = $root.actual_ballots_service.VotingResults.toObject(message.voting_results, options);
                return object;
            };
    
            /**
             * Converts this ActualBallotsStorage to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.ActualBallotsStorage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActualBallotsStorage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ActualBallotsStorage;
        })();
    
        actual_ballots_service.BallotStatus = (function() {
    
            /**
             * Properties of a BallotStatus.
             * @memberof actual_ballots_service
             * @interface IBallotStatus
             * @property {google.protobuf.IEmpty|null} [unknown] BallotStatus unknown
             * @property {google.protobuf.IEmpty|null} [valid] BallotStatus valid
             * @property {actual_ballots_service.InvalidReason|null} [invalid] BallotStatus invalid
             */
    
            /**
             * Constructs a new BallotStatus.
             * @memberof actual_ballots_service
             * @classdesc Represents a BallotStatus.
             * @implements IBallotStatus
             * @constructor
             * @param {actual_ballots_service.IBallotStatus=} [properties] Properties to set
             */
            function BallotStatus(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * BallotStatus unknown.
             * @member {google.protobuf.IEmpty|null|undefined} unknown
             * @memberof actual_ballots_service.BallotStatus
             * @instance
             */
            BallotStatus.prototype.unknown = null;
    
            /**
             * BallotStatus valid.
             * @member {google.protobuf.IEmpty|null|undefined} valid
             * @memberof actual_ballots_service.BallotStatus
             * @instance
             */
            BallotStatus.prototype.valid = null;
    
            /**
             * BallotStatus invalid.
             * @member {actual_ballots_service.InvalidReason} invalid
             * @memberof actual_ballots_service.BallotStatus
             * @instance
             */
            BallotStatus.prototype.invalid = 0;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * BallotStatus kind.
             * @member {"unknown"|"valid"|"invalid"|undefined} kind
             * @memberof actual_ballots_service.BallotStatus
             * @instance
             */
            Object.defineProperty(BallotStatus.prototype, "kind", {
                get: $util.oneOfGetter($oneOfFields = ["unknown", "valid", "invalid"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new BallotStatus instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.BallotStatus
             * @static
             * @param {actual_ballots_service.IBallotStatus=} [properties] Properties to set
             * @returns {actual_ballots_service.BallotStatus} BallotStatus instance
             */
            BallotStatus.create = function create(properties) {
                return new BallotStatus(properties);
            };
    
            /**
             * Encodes the specified BallotStatus message. Does not implicitly {@link actual_ballots_service.BallotStatus.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.BallotStatus
             * @static
             * @param {actual_ballots_service.IBallotStatus} message BallotStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BallotStatus.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.unknown != null && message.hasOwnProperty("unknown"))
                    $root.google.protobuf.Empty.encode(message.unknown, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.valid != null && message.hasOwnProperty("valid"))
                    $root.google.protobuf.Empty.encode(message.valid, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.invalid != null && message.hasOwnProperty("invalid"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.invalid);
                return writer;
            };
    
            /**
             * Encodes the specified BallotStatus message, length delimited. Does not implicitly {@link actual_ballots_service.BallotStatus.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.BallotStatus
             * @static
             * @param {actual_ballots_service.IBallotStatus} message BallotStatus message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BallotStatus.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a BallotStatus message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.BallotStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.BallotStatus} BallotStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BallotStatus.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.BallotStatus();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.unknown = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.valid = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.invalid = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a BallotStatus message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.BallotStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.BallotStatus} BallotStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BallotStatus.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a BallotStatus message.
             * @function verify
             * @memberof actual_ballots_service.BallotStatus
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BallotStatus.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.unknown != null && message.hasOwnProperty("unknown")) {
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.Empty.verify(message.unknown);
                        if (error)
                            return "unknown." + error;
                    }
                }
                if (message.valid != null && message.hasOwnProperty("valid")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.Empty.verify(message.valid);
                        if (error)
                            return "valid." + error;
                    }
                }
                if (message.invalid != null && message.hasOwnProperty("invalid")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    switch (message.invalid) {
                    default:
                        return "invalid: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                }
                return null;
            };
    
            /**
             * Creates a BallotStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.BallotStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.BallotStatus} BallotStatus
             */
            BallotStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.BallotStatus)
                    return object;
                var message = new $root.actual_ballots_service.BallotStatus();
                if (object.unknown != null) {
                    if (typeof object.unknown !== "object")
                        throw TypeError(".actual_ballots_service.BallotStatus.unknown: object expected");
                    message.unknown = $root.google.protobuf.Empty.fromObject(object.unknown);
                }
                if (object.valid != null) {
                    if (typeof object.valid !== "object")
                        throw TypeError(".actual_ballots_service.BallotStatus.valid: object expected");
                    message.valid = $root.google.protobuf.Empty.fromObject(object.valid);
                }
                switch (object.invalid) {
                case "WrongDistrict":
                case 0:
                    message.invalid = 0;
                    break;
                case "DecryptionError":
                case 1:
                    message.invalid = 1;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a BallotStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.BallotStatus
             * @static
             * @param {actual_ballots_service.BallotStatus} message BallotStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BallotStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.unknown != null && message.hasOwnProperty("unknown")) {
                    object.unknown = $root.google.protobuf.Empty.toObject(message.unknown, options);
                    if (options.oneofs)
                        object.kind = "unknown";
                }
                if (message.valid != null && message.hasOwnProperty("valid")) {
                    object.valid = $root.google.protobuf.Empty.toObject(message.valid, options);
                    if (options.oneofs)
                        object.kind = "valid";
                }
                if (message.invalid != null && message.hasOwnProperty("invalid")) {
                    object.invalid = options.enums === String ? $root.actual_ballots_service.InvalidReason[message.invalid] : message.invalid;
                    if (options.oneofs)
                        object.kind = "invalid";
                }
                return object;
            };
    
            /**
             * Converts this BallotStatus to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.BallotStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BallotStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return BallotStatus;
        })();
    
        actual_ballots_service.Config = (function() {
    
            /**
             * Properties of a Config.
             * @memberof actual_ballots_service
             * @interface IConfig
             * @property {Array.<string>|null} [api_public_keys] Config api_public_keys
             */
    
            /**
             * Constructs a new Config.
             * @memberof actual_ballots_service
             * @classdesc Represents a Config.
             * @implements IConfig
             * @constructor
             * @param {actual_ballots_service.IConfig=} [properties] Properties to set
             */
            function Config(properties) {
                this.api_public_keys = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Config api_public_keys.
             * @member {Array.<string>} api_public_keys
             * @memberof actual_ballots_service.Config
             * @instance
             */
            Config.prototype.api_public_keys = $util.emptyArray;
    
            /**
             * Creates a new Config instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.Config
             * @static
             * @param {actual_ballots_service.IConfig=} [properties] Properties to set
             * @returns {actual_ballots_service.Config} Config instance
             */
            Config.create = function create(properties) {
                return new Config(properties);
            };
    
            /**
             * Encodes the specified Config message. Does not implicitly {@link actual_ballots_service.Config.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.Config
             * @static
             * @param {actual_ballots_service.IConfig} message Config message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Config.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.api_public_keys != null && message.api_public_keys.length)
                    for (var i = 0; i < message.api_public_keys.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.api_public_keys[i]);
                return writer;
            };
    
            /**
             * Encodes the specified Config message, length delimited. Does not implicitly {@link actual_ballots_service.Config.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.Config
             * @static
             * @param {actual_ballots_service.IConfig} message Config message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Config.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Config message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.Config
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.Config} Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Config.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.Config();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.api_public_keys && message.api_public_keys.length))
                            message.api_public_keys = [];
                        message.api_public_keys.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Config message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.Config
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.Config} Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Config.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Config message.
             * @function verify
             * @memberof actual_ballots_service.Config
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Config.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.api_public_keys != null && message.hasOwnProperty("api_public_keys")) {
                    if (!Array.isArray(message.api_public_keys))
                        return "api_public_keys: array expected";
                    for (var i = 0; i < message.api_public_keys.length; ++i)
                        if (!$util.isString(message.api_public_keys[i]))
                            return "api_public_keys: string[] expected";
                }
                return null;
            };
    
            /**
             * Creates a Config message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.Config
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.Config} Config
             */
            Config.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.Config)
                    return object;
                var message = new $root.actual_ballots_service.Config();
                if (object.api_public_keys) {
                    if (!Array.isArray(object.api_public_keys))
                        throw TypeError(".actual_ballots_service.Config.api_public_keys: array expected");
                    message.api_public_keys = [];
                    for (var i = 0; i < object.api_public_keys.length; ++i)
                        message.api_public_keys[i] = String(object.api_public_keys[i]);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Config message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.Config
             * @static
             * @param {actual_ballots_service.Config} message Config
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Config.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.api_public_keys = [];
                if (message.api_public_keys && message.api_public_keys.length) {
                    object.api_public_keys = [];
                    for (var j = 0; j < message.api_public_keys.length; ++j)
                        object.api_public_keys[j] = message.api_public_keys[j];
                }
                return object;
            };
    
            /**
             * Converts this Config to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.Config
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Config.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Config;
        })();
    
        actual_ballots_service.TxActualBallot = (function() {
    
            /**
             * Properties of a TxActualBallot.
             * @memberof actual_ballots_service
             * @interface ITxActualBallot
             * @property {string|null} [voter] TxActualBallot voter
             * @property {number|null} [district_id] TxActualBallot district_id
             * @property {Array.<number>|null} [decrypted_choices] TxActualBallot decrypted_choices
             * @property {string|null} [store_tx_hash] TxActualBallot store_tx_hash
             * @property {string|null} [decrypt_tx_hash] TxActualBallot decrypt_tx_hash
             * @property {actual_ballots_service.IBallotStatus|null} [status] TxActualBallot status
             */
    
            /**
             * Constructs a new TxActualBallot.
             * @memberof actual_ballots_service
             * @classdesc Represents a TxActualBallot.
             * @implements ITxActualBallot
             * @constructor
             * @param {actual_ballots_service.ITxActualBallot=} [properties] Properties to set
             */
            function TxActualBallot(properties) {
                this.decrypted_choices = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxActualBallot voter.
             * @member {string} voter
             * @memberof actual_ballots_service.TxActualBallot
             * @instance
             */
            TxActualBallot.prototype.voter = "";
    
            /**
             * TxActualBallot district_id.
             * @member {number} district_id
             * @memberof actual_ballots_service.TxActualBallot
             * @instance
             */
            TxActualBallot.prototype.district_id = 0;
    
            /**
             * TxActualBallot decrypted_choices.
             * @member {Array.<number>} decrypted_choices
             * @memberof actual_ballots_service.TxActualBallot
             * @instance
             */
            TxActualBallot.prototype.decrypted_choices = $util.emptyArray;
    
            /**
             * TxActualBallot store_tx_hash.
             * @member {string} store_tx_hash
             * @memberof actual_ballots_service.TxActualBallot
             * @instance
             */
            TxActualBallot.prototype.store_tx_hash = "";
    
            /**
             * TxActualBallot decrypt_tx_hash.
             * @member {string} decrypt_tx_hash
             * @memberof actual_ballots_service.TxActualBallot
             * @instance
             */
            TxActualBallot.prototype.decrypt_tx_hash = "";
    
            /**
             * TxActualBallot status.
             * @member {actual_ballots_service.IBallotStatus|null|undefined} status
             * @memberof actual_ballots_service.TxActualBallot
             * @instance
             */
            TxActualBallot.prototype.status = null;
    
            /**
             * Creates a new TxActualBallot instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.TxActualBallot
             * @static
             * @param {actual_ballots_service.ITxActualBallot=} [properties] Properties to set
             * @returns {actual_ballots_service.TxActualBallot} TxActualBallot instance
             */
            TxActualBallot.create = function create(properties) {
                return new TxActualBallot(properties);
            };
    
            /**
             * Encodes the specified TxActualBallot message. Does not implicitly {@link actual_ballots_service.TxActualBallot.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.TxActualBallot
             * @static
             * @param {actual_ballots_service.ITxActualBallot} message TxActualBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxActualBallot.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voter != null && message.hasOwnProperty("voter"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voter);
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.district_id);
                if (message.decrypted_choices != null && message.decrypted_choices.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (var i = 0; i < message.decrypted_choices.length; ++i)
                        writer.uint32(message.decrypted_choices[i]);
                    writer.ldelim();
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.store_tx_hash);
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.decrypt_tx_hash);
                if (message.status != null && message.hasOwnProperty("status"))
                    $root.actual_ballots_service.BallotStatus.encode(message.status, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxActualBallot message, length delimited. Does not implicitly {@link actual_ballots_service.TxActualBallot.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.TxActualBallot
             * @static
             * @param {actual_ballots_service.ITxActualBallot} message TxActualBallot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxActualBallot.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxActualBallot message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.TxActualBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.TxActualBallot} TxActualBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxActualBallot.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.TxActualBallot();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voter = reader.string();
                        break;
                    case 2:
                        message.district_id = reader.uint32();
                        break;
                    case 3:
                        if (!(message.decrypted_choices && message.decrypted_choices.length))
                            message.decrypted_choices = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.decrypted_choices.push(reader.uint32());
                        } else
                            message.decrypted_choices.push(reader.uint32());
                        break;
                    case 4:
                        message.store_tx_hash = reader.string();
                        break;
                    case 5:
                        message.decrypt_tx_hash = reader.string();
                        break;
                    case 6:
                        message.status = $root.actual_ballots_service.BallotStatus.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxActualBallot message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.TxActualBallot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.TxActualBallot} TxActualBallot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxActualBallot.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxActualBallot message.
             * @function verify
             * @memberof actual_ballots_service.TxActualBallot
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxActualBallot.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voter != null && message.hasOwnProperty("voter"))
                    if (!$util.isString(message.voter))
                        return "voter: string expected";
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    if (!$util.isInteger(message.district_id))
                        return "district_id: integer expected";
                if (message.decrypted_choices != null && message.hasOwnProperty("decrypted_choices")) {
                    if (!Array.isArray(message.decrypted_choices))
                        return "decrypted_choices: array expected";
                    for (var i = 0; i < message.decrypted_choices.length; ++i)
                        if (!$util.isInteger(message.decrypted_choices[i]))
                            return "decrypted_choices: integer[] expected";
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    if (!$util.isString(message.store_tx_hash))
                        return "store_tx_hash: string expected";
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash"))
                    if (!$util.isString(message.decrypt_tx_hash))
                        return "decrypt_tx_hash: string expected";
                if (message.status != null && message.hasOwnProperty("status")) {
                    var error = $root.actual_ballots_service.BallotStatus.verify(message.status);
                    if (error)
                        return "status." + error;
                }
                return null;
            };
    
            /**
             * Creates a TxActualBallot message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.TxActualBallot
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.TxActualBallot} TxActualBallot
             */
            TxActualBallot.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.TxActualBallot)
                    return object;
                var message = new $root.actual_ballots_service.TxActualBallot();
                if (object.voter != null)
                    message.voter = String(object.voter);
                if (object.district_id != null)
                    message.district_id = object.district_id >>> 0;
                if (object.decrypted_choices) {
                    if (!Array.isArray(object.decrypted_choices))
                        throw TypeError(".actual_ballots_service.TxActualBallot.decrypted_choices: array expected");
                    message.decrypted_choices = [];
                    for (var i = 0; i < object.decrypted_choices.length; ++i)
                        message.decrypted_choices[i] = object.decrypted_choices[i] >>> 0;
                }
                if (object.store_tx_hash != null)
                    message.store_tx_hash = String(object.store_tx_hash);
                if (object.decrypt_tx_hash != null)
                    message.decrypt_tx_hash = String(object.decrypt_tx_hash);
                if (object.status != null) {
                    if (typeof object.status !== "object")
                        throw TypeError(".actual_ballots_service.TxActualBallot.status: object expected");
                    message.status = $root.actual_ballots_service.BallotStatus.fromObject(object.status);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxActualBallot message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.TxActualBallot
             * @static
             * @param {actual_ballots_service.TxActualBallot} message TxActualBallot
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxActualBallot.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.decrypted_choices = [];
                if (options.defaults) {
                    object.voter = "";
                    object.district_id = 0;
                    object.store_tx_hash = "";
                    object.decrypt_tx_hash = "";
                    object.status = null;
                }
                if (message.voter != null && message.hasOwnProperty("voter"))
                    object.voter = message.voter;
                if (message.district_id != null && message.hasOwnProperty("district_id"))
                    object.district_id = message.district_id;
                if (message.decrypted_choices && message.decrypted_choices.length) {
                    object.decrypted_choices = [];
                    for (var j = 0; j < message.decrypted_choices.length; ++j)
                        object.decrypted_choices[j] = message.decrypted_choices[j];
                }
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    object.store_tx_hash = message.store_tx_hash;
                if (message.decrypt_tx_hash != null && message.hasOwnProperty("decrypt_tx_hash"))
                    object.decrypt_tx_hash = message.decrypt_tx_hash;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = $root.actual_ballots_service.BallotStatus.toObject(message.status, options);
                return object;
            };
    
            /**
             * Converts this TxActualBallot to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.TxActualBallot
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxActualBallot.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxActualBallot;
        })();
    
        actual_ballots_service.TxCreateActualBallotsStorage = (function() {
    
            /**
             * Properties of a TxCreateActualBallotsStorage.
             * @memberof actual_ballots_service
             * @interface ITxCreateActualBallotsStorage
             * @property {string|null} [voting_id] TxCreateActualBallotsStorage voting_id
             */
    
            /**
             * Constructs a new TxCreateActualBallotsStorage.
             * @memberof actual_ballots_service
             * @classdesc Represents a TxCreateActualBallotsStorage.
             * @implements ITxCreateActualBallotsStorage
             * @constructor
             * @param {actual_ballots_service.ITxCreateActualBallotsStorage=} [properties] Properties to set
             */
            function TxCreateActualBallotsStorage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxCreateActualBallotsStorage voting_id.
             * @member {string} voting_id
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @instance
             */
            TxCreateActualBallotsStorage.prototype.voting_id = "";
    
            /**
             * Creates a new TxCreateActualBallotsStorage instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @static
             * @param {actual_ballots_service.ITxCreateActualBallotsStorage=} [properties] Properties to set
             * @returns {actual_ballots_service.TxCreateActualBallotsStorage} TxCreateActualBallotsStorage instance
             */
            TxCreateActualBallotsStorage.create = function create(properties) {
                return new TxCreateActualBallotsStorage(properties);
            };
    
            /**
             * Encodes the specified TxCreateActualBallotsStorage message. Does not implicitly {@link actual_ballots_service.TxCreateActualBallotsStorage.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @static
             * @param {actual_ballots_service.ITxCreateActualBallotsStorage} message TxCreateActualBallotsStorage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxCreateActualBallotsStorage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                return writer;
            };
    
            /**
             * Encodes the specified TxCreateActualBallotsStorage message, length delimited. Does not implicitly {@link actual_ballots_service.TxCreateActualBallotsStorage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @static
             * @param {actual_ballots_service.ITxCreateActualBallotsStorage} message TxCreateActualBallotsStorage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxCreateActualBallotsStorage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxCreateActualBallotsStorage message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.TxCreateActualBallotsStorage} TxCreateActualBallotsStorage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxCreateActualBallotsStorage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.TxCreateActualBallotsStorage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxCreateActualBallotsStorage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.TxCreateActualBallotsStorage} TxCreateActualBallotsStorage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxCreateActualBallotsStorage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxCreateActualBallotsStorage message.
             * @function verify
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxCreateActualBallotsStorage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                return null;
            };
    
            /**
             * Creates a TxCreateActualBallotsStorage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.TxCreateActualBallotsStorage} TxCreateActualBallotsStorage
             */
            TxCreateActualBallotsStorage.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.TxCreateActualBallotsStorage)
                    return object;
                var message = new $root.actual_ballots_service.TxCreateActualBallotsStorage();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                return message;
            };
    
            /**
             * Creates a plain object from a TxCreateActualBallotsStorage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @static
             * @param {actual_ballots_service.TxCreateActualBallotsStorage} message TxCreateActualBallotsStorage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxCreateActualBallotsStorage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.voting_id = "";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                return object;
            };
    
            /**
             * Converts this TxCreateActualBallotsStorage to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.TxCreateActualBallotsStorage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxCreateActualBallotsStorage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxCreateActualBallotsStorage;
        })();
    
        actual_ballots_service.TxStoreGroupedTxHash = (function() {
    
            /**
             * Properties of a TxStoreGroupedTxHash.
             * @memberof actual_ballots_service
             * @interface ITxStoreGroupedTxHash
             * @property {string|null} [voting_id] TxStoreGroupedTxHash voting_id
             * @property {string|null} [store_tx_hash] TxStoreGroupedTxHash store_tx_hash
             * @property {string|null} [encrypted_group_id] TxStoreGroupedTxHash encrypted_group_id
             * @property {number|Long|null} [ts] TxStoreGroupedTxHash ts
             */
    
            /**
             * Constructs a new TxStoreGroupedTxHash.
             * @memberof actual_ballots_service
             * @classdesc Represents a TxStoreGroupedTxHash.
             * @implements ITxStoreGroupedTxHash
             * @constructor
             * @param {actual_ballots_service.ITxStoreGroupedTxHash=} [properties] Properties to set
             */
            function TxStoreGroupedTxHash(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxStoreGroupedTxHash voting_id.
             * @member {string} voting_id
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @instance
             */
            TxStoreGroupedTxHash.prototype.voting_id = "";
    
            /**
             * TxStoreGroupedTxHash store_tx_hash.
             * @member {string} store_tx_hash
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @instance
             */
            TxStoreGroupedTxHash.prototype.store_tx_hash = "";
    
            /**
             * TxStoreGroupedTxHash encrypted_group_id.
             * @member {string} encrypted_group_id
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @instance
             */
            TxStoreGroupedTxHash.prototype.encrypted_group_id = "";
    
            /**
             * TxStoreGroupedTxHash ts.
             * @member {number|Long} ts
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @instance
             */
            TxStoreGroupedTxHash.prototype.ts = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new TxStoreGroupedTxHash instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @static
             * @param {actual_ballots_service.ITxStoreGroupedTxHash=} [properties] Properties to set
             * @returns {actual_ballots_service.TxStoreGroupedTxHash} TxStoreGroupedTxHash instance
             */
            TxStoreGroupedTxHash.create = function create(properties) {
                return new TxStoreGroupedTxHash(properties);
            };
    
            /**
             * Encodes the specified TxStoreGroupedTxHash message. Does not implicitly {@link actual_ballots_service.TxStoreGroupedTxHash.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @static
             * @param {actual_ballots_service.ITxStoreGroupedTxHash} message TxStoreGroupedTxHash message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStoreGroupedTxHash.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.store_tx_hash);
                if (message.encrypted_group_id != null && message.hasOwnProperty("encrypted_group_id"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.encrypted_group_id);
                if (message.ts != null && message.hasOwnProperty("ts"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.ts);
                return writer;
            };
    
            /**
             * Encodes the specified TxStoreGroupedTxHash message, length delimited. Does not implicitly {@link actual_ballots_service.TxStoreGroupedTxHash.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @static
             * @param {actual_ballots_service.ITxStoreGroupedTxHash} message TxStoreGroupedTxHash message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStoreGroupedTxHash.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxStoreGroupedTxHash message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.TxStoreGroupedTxHash} TxStoreGroupedTxHash
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStoreGroupedTxHash.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.TxStoreGroupedTxHash();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.store_tx_hash = reader.string();
                        break;
                    case 3:
                        message.encrypted_group_id = reader.string();
                        break;
                    case 4:
                        message.ts = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxStoreGroupedTxHash message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.TxStoreGroupedTxHash} TxStoreGroupedTxHash
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStoreGroupedTxHash.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxStoreGroupedTxHash message.
             * @function verify
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxStoreGroupedTxHash.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    if (!$util.isString(message.store_tx_hash))
                        return "store_tx_hash: string expected";
                if (message.encrypted_group_id != null && message.hasOwnProperty("encrypted_group_id"))
                    if (!$util.isString(message.encrypted_group_id))
                        return "encrypted_group_id: string expected";
                if (message.ts != null && message.hasOwnProperty("ts"))
                    if (!$util.isInteger(message.ts) && !(message.ts && $util.isInteger(message.ts.low) && $util.isInteger(message.ts.high)))
                        return "ts: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxStoreGroupedTxHash message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.TxStoreGroupedTxHash} TxStoreGroupedTxHash
             */
            TxStoreGroupedTxHash.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.TxStoreGroupedTxHash)
                    return object;
                var message = new $root.actual_ballots_service.TxStoreGroupedTxHash();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.store_tx_hash != null)
                    message.store_tx_hash = String(object.store_tx_hash);
                if (object.encrypted_group_id != null)
                    message.encrypted_group_id = String(object.encrypted_group_id);
                if (object.ts != null)
                    if ($util.Long)
                        (message.ts = $util.Long.fromValue(object.ts)).unsigned = false;
                    else if (typeof object.ts === "string")
                        message.ts = parseInt(object.ts, 10);
                    else if (typeof object.ts === "number")
                        message.ts = object.ts;
                    else if (typeof object.ts === "object")
                        message.ts = new $util.LongBits(object.ts.low >>> 0, object.ts.high >>> 0).toNumber();
                return message;
            };
    
            /**
             * Creates a plain object from a TxStoreGroupedTxHash message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @static
             * @param {actual_ballots_service.TxStoreGroupedTxHash} message TxStoreGroupedTxHash
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxStoreGroupedTxHash.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    object.store_tx_hash = "";
                    object.encrypted_group_id = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ts = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ts = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.store_tx_hash != null && message.hasOwnProperty("store_tx_hash"))
                    object.store_tx_hash = message.store_tx_hash;
                if (message.encrypted_group_id != null && message.hasOwnProperty("encrypted_group_id"))
                    object.encrypted_group_id = message.encrypted_group_id;
                if (message.ts != null && message.hasOwnProperty("ts"))
                    if (typeof message.ts === "number")
                        object.ts = options.longs === String ? String(message.ts) : message.ts;
                    else
                        object.ts = options.longs === String ? $util.Long.prototype.toString.call(message.ts) : options.longs === Number ? new $util.LongBits(message.ts.low >>> 0, message.ts.high >>> 0).toNumber() : message.ts;
                return object;
            };
    
            /**
             * Converts this TxStoreGroupedTxHash to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.TxStoreGroupedTxHash
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxStoreGroupedTxHash.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxStoreGroupedTxHash;
        })();
    
        actual_ballots_service.TxResolveGroupIds = (function() {
    
            /**
             * Properties of a TxResolveGroupIds.
             * @memberof actual_ballots_service
             * @interface ITxResolveGroupIds
             * @property {string|null} [voting_id] TxResolveGroupIds voting_id
             * @property {Object.<string,string>|null} [resolved_group_ids] TxResolveGroupIds resolved_group_ids
             */
    
            /**
             * Constructs a new TxResolveGroupIds.
             * @memberof actual_ballots_service
             * @classdesc Represents a TxResolveGroupIds.
             * @implements ITxResolveGroupIds
             * @constructor
             * @param {actual_ballots_service.ITxResolveGroupIds=} [properties] Properties to set
             */
            function TxResolveGroupIds(properties) {
                this.resolved_group_ids = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxResolveGroupIds voting_id.
             * @member {string} voting_id
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @instance
             */
            TxResolveGroupIds.prototype.voting_id = "";
    
            /**
             * TxResolveGroupIds resolved_group_ids.
             * @member {Object.<string,string>} resolved_group_ids
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @instance
             */
            TxResolveGroupIds.prototype.resolved_group_ids = $util.emptyObject;
    
            /**
             * Creates a new TxResolveGroupIds instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @static
             * @param {actual_ballots_service.ITxResolveGroupIds=} [properties] Properties to set
             * @returns {actual_ballots_service.TxResolveGroupIds} TxResolveGroupIds instance
             */
            TxResolveGroupIds.create = function create(properties) {
                return new TxResolveGroupIds(properties);
            };
    
            /**
             * Encodes the specified TxResolveGroupIds message. Does not implicitly {@link actual_ballots_service.TxResolveGroupIds.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @static
             * @param {actual_ballots_service.ITxResolveGroupIds} message TxResolveGroupIds message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxResolveGroupIds.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.resolved_group_ids != null && message.hasOwnProperty("resolved_group_ids"))
                    for (var keys = Object.keys(message.resolved_group_ids), i = 0; i < keys.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.resolved_group_ids[keys[i]]).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxResolveGroupIds message, length delimited. Does not implicitly {@link actual_ballots_service.TxResolveGroupIds.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @static
             * @param {actual_ballots_service.ITxResolveGroupIds} message TxResolveGroupIds message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxResolveGroupIds.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxResolveGroupIds message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.TxResolveGroupIds} TxResolveGroupIds
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxResolveGroupIds.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.TxResolveGroupIds(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        reader.skip().pos++;
                        if (message.resolved_group_ids === $util.emptyObject)
                            message.resolved_group_ids = {};
                        key = reader.string();
                        reader.pos++;
                        message.resolved_group_ids[key] = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxResolveGroupIds message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.TxResolveGroupIds} TxResolveGroupIds
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxResolveGroupIds.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxResolveGroupIds message.
             * @function verify
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxResolveGroupIds.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.resolved_group_ids != null && message.hasOwnProperty("resolved_group_ids")) {
                    if (!$util.isObject(message.resolved_group_ids))
                        return "resolved_group_ids: object expected";
                    var key = Object.keys(message.resolved_group_ids);
                    for (var i = 0; i < key.length; ++i)
                        if (!$util.isString(message.resolved_group_ids[key[i]]))
                            return "resolved_group_ids: string{k:string} expected";
                }
                return null;
            };
    
            /**
             * Creates a TxResolveGroupIds message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.TxResolveGroupIds} TxResolveGroupIds
             */
            TxResolveGroupIds.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.TxResolveGroupIds)
                    return object;
                var message = new $root.actual_ballots_service.TxResolveGroupIds();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.resolved_group_ids) {
                    if (typeof object.resolved_group_ids !== "object")
                        throw TypeError(".actual_ballots_service.TxResolveGroupIds.resolved_group_ids: object expected");
                    message.resolved_group_ids = {};
                    for (var keys = Object.keys(object.resolved_group_ids), i = 0; i < keys.length; ++i)
                        message.resolved_group_ids[keys[i]] = String(object.resolved_group_ids[keys[i]]);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxResolveGroupIds message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @static
             * @param {actual_ballots_service.TxResolveGroupIds} message TxResolveGroupIds
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxResolveGroupIds.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.resolved_group_ids = {};
                if (options.defaults)
                    object.voting_id = "";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                var keys2;
                if (message.resolved_group_ids && (keys2 = Object.keys(message.resolved_group_ids)).length) {
                    object.resolved_group_ids = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.resolved_group_ids[keys2[j]] = message.resolved_group_ids[keys2[j]];
                }
                return object;
            };
    
            /**
             * Converts this TxResolveGroupIds to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.TxResolveGroupIds
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxResolveGroupIds.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxResolveGroupIds;
        })();
    
        actual_ballots_service.TxStoreActualBallots = (function() {
    
            /**
             * Properties of a TxStoreActualBallots.
             * @memberof actual_ballots_service
             * @interface ITxStoreActualBallots
             * @property {string|null} [voting_id] TxStoreActualBallots voting_id
             * @property {Array.<actual_ballots_service.ITxActualBallot>|null} [actual_ballots] TxStoreActualBallots actual_ballots
             */
    
            /**
             * Constructs a new TxStoreActualBallots.
             * @memberof actual_ballots_service
             * @classdesc Represents a TxStoreActualBallots.
             * @implements ITxStoreActualBallots
             * @constructor
             * @param {actual_ballots_service.ITxStoreActualBallots=} [properties] Properties to set
             */
            function TxStoreActualBallots(properties) {
                this.actual_ballots = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxStoreActualBallots voting_id.
             * @member {string} voting_id
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @instance
             */
            TxStoreActualBallots.prototype.voting_id = "";
    
            /**
             * TxStoreActualBallots actual_ballots.
             * @member {Array.<actual_ballots_service.ITxActualBallot>} actual_ballots
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @instance
             */
            TxStoreActualBallots.prototype.actual_ballots = $util.emptyArray;
    
            /**
             * Creates a new TxStoreActualBallots instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @static
             * @param {actual_ballots_service.ITxStoreActualBallots=} [properties] Properties to set
             * @returns {actual_ballots_service.TxStoreActualBallots} TxStoreActualBallots instance
             */
            TxStoreActualBallots.create = function create(properties) {
                return new TxStoreActualBallots(properties);
            };
    
            /**
             * Encodes the specified TxStoreActualBallots message. Does not implicitly {@link actual_ballots_service.TxStoreActualBallots.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @static
             * @param {actual_ballots_service.ITxStoreActualBallots} message TxStoreActualBallots message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStoreActualBallots.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.actual_ballots != null && message.actual_ballots.length)
                    for (var i = 0; i < message.actual_ballots.length; ++i)
                        $root.actual_ballots_service.TxActualBallot.encode(message.actual_ballots[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified TxStoreActualBallots message, length delimited. Does not implicitly {@link actual_ballots_service.TxStoreActualBallots.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @static
             * @param {actual_ballots_service.ITxStoreActualBallots} message TxStoreActualBallots message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxStoreActualBallots.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxStoreActualBallots message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.TxStoreActualBallots} TxStoreActualBallots
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStoreActualBallots.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.TxStoreActualBallots();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        if (!(message.actual_ballots && message.actual_ballots.length))
                            message.actual_ballots = [];
                        message.actual_ballots.push($root.actual_ballots_service.TxActualBallot.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxStoreActualBallots message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.TxStoreActualBallots} TxStoreActualBallots
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxStoreActualBallots.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxStoreActualBallots message.
             * @function verify
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxStoreActualBallots.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.actual_ballots != null && message.hasOwnProperty("actual_ballots")) {
                    if (!Array.isArray(message.actual_ballots))
                        return "actual_ballots: array expected";
                    for (var i = 0; i < message.actual_ballots.length; ++i) {
                        var error = $root.actual_ballots_service.TxActualBallot.verify(message.actual_ballots[i]);
                        if (error)
                            return "actual_ballots." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a TxStoreActualBallots message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.TxStoreActualBallots} TxStoreActualBallots
             */
            TxStoreActualBallots.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.TxStoreActualBallots)
                    return object;
                var message = new $root.actual_ballots_service.TxStoreActualBallots();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.actual_ballots) {
                    if (!Array.isArray(object.actual_ballots))
                        throw TypeError(".actual_ballots_service.TxStoreActualBallots.actual_ballots: array expected");
                    message.actual_ballots = [];
                    for (var i = 0; i < object.actual_ballots.length; ++i) {
                        if (typeof object.actual_ballots[i] !== "object")
                            throw TypeError(".actual_ballots_service.TxStoreActualBallots.actual_ballots: object expected");
                        message.actual_ballots[i] = $root.actual_ballots_service.TxActualBallot.fromObject(object.actual_ballots[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a TxStoreActualBallots message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @static
             * @param {actual_ballots_service.TxStoreActualBallots} message TxStoreActualBallots
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxStoreActualBallots.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.actual_ballots = [];
                if (options.defaults)
                    object.voting_id = "";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.actual_ballots && message.actual_ballots.length) {
                    object.actual_ballots = [];
                    for (var j = 0; j < message.actual_ballots.length; ++j)
                        object.actual_ballots[j] = $root.actual_ballots_service.TxActualBallot.toObject(message.actual_ballots[j], options);
                }
                return object;
            };
    
            /**
             * Converts this TxStoreActualBallots to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.TxStoreActualBallots
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxStoreActualBallots.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxStoreActualBallots;
        })();
    
        actual_ballots_service.TxTallyResults = (function() {
    
            /**
             * Properties of a TxTallyResults.
             * @memberof actual_ballots_service
             * @interface ITxTallyResults
             * @property {string|null} [voting_id] TxTallyResults voting_id
             * @property {number|Long|null} [seed] TxTallyResults seed
             */
    
            /**
             * Constructs a new TxTallyResults.
             * @memberof actual_ballots_service
             * @classdesc Represents a TxTallyResults.
             * @implements ITxTallyResults
             * @constructor
             * @param {actual_ballots_service.ITxTallyResults=} [properties] Properties to set
             */
            function TxTallyResults(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * TxTallyResults voting_id.
             * @member {string} voting_id
             * @memberof actual_ballots_service.TxTallyResults
             * @instance
             */
            TxTallyResults.prototype.voting_id = "";
    
            /**
             * TxTallyResults seed.
             * @member {number|Long} seed
             * @memberof actual_ballots_service.TxTallyResults
             * @instance
             */
            TxTallyResults.prototype.seed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new TxTallyResults instance using the specified properties.
             * @function create
             * @memberof actual_ballots_service.TxTallyResults
             * @static
             * @param {actual_ballots_service.ITxTallyResults=} [properties] Properties to set
             * @returns {actual_ballots_service.TxTallyResults} TxTallyResults instance
             */
            TxTallyResults.create = function create(properties) {
                return new TxTallyResults(properties);
            };
    
            /**
             * Encodes the specified TxTallyResults message. Does not implicitly {@link actual_ballots_service.TxTallyResults.verify|verify} messages.
             * @function encode
             * @memberof actual_ballots_service.TxTallyResults
             * @static
             * @param {actual_ballots_service.ITxTallyResults} message TxTallyResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxTallyResults.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.voting_id);
                if (message.seed != null && message.hasOwnProperty("seed"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.seed);
                return writer;
            };
    
            /**
             * Encodes the specified TxTallyResults message, length delimited. Does not implicitly {@link actual_ballots_service.TxTallyResults.verify|verify} messages.
             * @function encodeDelimited
             * @memberof actual_ballots_service.TxTallyResults
             * @static
             * @param {actual_ballots_service.ITxTallyResults} message TxTallyResults message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxTallyResults.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a TxTallyResults message from the specified reader or buffer.
             * @function decode
             * @memberof actual_ballots_service.TxTallyResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {actual_ballots_service.TxTallyResults} TxTallyResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxTallyResults.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actual_ballots_service.TxTallyResults();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.voting_id = reader.string();
                        break;
                    case 2:
                        message.seed = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a TxTallyResults message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof actual_ballots_service.TxTallyResults
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {actual_ballots_service.TxTallyResults} TxTallyResults
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxTallyResults.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a TxTallyResults message.
             * @function verify
             * @memberof actual_ballots_service.TxTallyResults
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TxTallyResults.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    if (!$util.isString(message.voting_id))
                        return "voting_id: string expected";
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (!$util.isInteger(message.seed) && !(message.seed && $util.isInteger(message.seed.low) && $util.isInteger(message.seed.high)))
                        return "seed: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a TxTallyResults message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof actual_ballots_service.TxTallyResults
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {actual_ballots_service.TxTallyResults} TxTallyResults
             */
            TxTallyResults.fromObject = function fromObject(object) {
                if (object instanceof $root.actual_ballots_service.TxTallyResults)
                    return object;
                var message = new $root.actual_ballots_service.TxTallyResults();
                if (object.voting_id != null)
                    message.voting_id = String(object.voting_id);
                if (object.seed != null)
                    if ($util.Long)
                        (message.seed = $util.Long.fromValue(object.seed)).unsigned = true;
                    else if (typeof object.seed === "string")
                        message.seed = parseInt(object.seed, 10);
                    else if (typeof object.seed === "number")
                        message.seed = object.seed;
                    else if (typeof object.seed === "object")
                        message.seed = new $util.LongBits(object.seed.low >>> 0, object.seed.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a TxTallyResults message. Also converts values to other types if specified.
             * @function toObject
             * @memberof actual_ballots_service.TxTallyResults
             * @static
             * @param {actual_ballots_service.TxTallyResults} message TxTallyResults
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TxTallyResults.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.voting_id = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.seed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seed = options.longs === String ? "0" : 0;
                }
                if (message.voting_id != null && message.hasOwnProperty("voting_id"))
                    object.voting_id = message.voting_id;
                if (message.seed != null && message.hasOwnProperty("seed"))
                    if (typeof message.seed === "number")
                        object.seed = options.longs === String ? String(message.seed) : message.seed;
                    else
                        object.seed = options.longs === String ? $util.Long.prototype.toString.call(message.seed) : options.longs === Number ? new $util.LongBits(message.seed.low >>> 0, message.seed.high >>> 0).toNumber(true) : message.seed;
                return object;
            };
    
            /**
             * Converts this TxTallyResults to JSON.
             * @function toJSON
             * @memberof actual_ballots_service.TxTallyResults
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TxTallyResults.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return TxTallyResults;
        })();
    
        return actual_ballots_service;
    })();

    return $root;
});
