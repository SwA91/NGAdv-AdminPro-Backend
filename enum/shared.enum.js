/**
 * Enum for type table
 * @readonly
 * @enum
 */
const TypeTable = Object.freeze({
    USERS: 'users',
    DOCTORS: 'doctors',
    HOSPITALS: 'hospitals'
});

/**
 * Enum for type APIs
 * @readonly
 * @enum
 */
const TypeAPI = Object.freeze({
    ALL: 'all',
    API: 'api',
    COLLECTION: 'collection',
    DOCTORS: 'doctors',
    GOOGLE: 'google',
    HOSPITALS: 'hospitals',
    LOGIN: 'login',
    RENEW: 'renew',
    UPLOADS: 'uploads',
    USERS: 'users',
});

/**
 * Enum for type params query string
 * @readonly
 * @enum
 */
const TypeParamsQS = Object.freeze({
    SEARCH: 'search',
    TABLE: 'table',
    TYPE: 'type',
    ID: 'id',
    PHOTO: 'photo',
    FROM: 'from',
    UID: 'uid',
});

/**
 * Enum for type headers
 * @readonly
 * @enum
 */
const TypeHeader = Object.freeze({
    TOKEN: 'x-token'
});

/**
 * Enum for type image allowed
 * @readonly
 * @enum
 */
const TypeImageAllowed = Object.freeze({
    PNG: 'png',
    JPG: 'jpg',
    JPEG: 'jpeg',
    GIF: 'gif'
});

module.exports = {
    TypeTable,
    TypeAPI,
    TypeImageAllowed,
    TypeParamsQS,
    TypeHeader
}