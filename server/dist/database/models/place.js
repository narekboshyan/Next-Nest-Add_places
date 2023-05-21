"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = exports.Location = void 0;
const graphql_1 = require("@nestjs/graphql");
const sequelize_typescript_1 = require("sequelize-typescript");
const base_model_1 = require("./base.model");
const user_1 = require("./user");
var Location;
(function (Location) {
    Location["LAT"] = "LAT";
    Location["LNG"] = "LNG";
})(Location = exports.Location || (exports.Location = {}));
(0, graphql_1.registerEnumType)(Location, {
    name: 'Location',
});
let Place = class Place extends base_model_1.BaseModel {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Place.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Place.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Place.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Place.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Location),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: Object.values(Location),
        }),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Place.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Place.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_1.User),
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.User, { foreignKey: 'userId', as: 'user' }),
    __metadata("design:type", user_1.User)
], Place.prototype, "user", void 0);
Place = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, sequelize_typescript_1.Table)({ tableName: 'places', timestamps: true })
], Place);
exports.Place = Place;
//# sourceMappingURL=place.js.map