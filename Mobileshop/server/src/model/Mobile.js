"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mobile = void 0;
var mongoose_1 = require("mongoose");
// Mobile schema definition using the interface
var MobileSchema = new mongoose_1.default.Schema({
    brand: { type: String, required: true },
    modelName: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true }
});
// Export the model based on the schema
exports.Mobile = mongoose_1.default.model('Mobile', MobileSchema);
