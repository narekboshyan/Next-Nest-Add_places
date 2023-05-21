"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const setCookie = (res, name, value, options) => {
    console.log(res.cookie, 'response');
    res.cookie(name, value, options);
};
exports.setCookie = setCookie;
//# sourceMappingURL=helpers.js.map