const { Schema, model } = require("mongoose");

const CalcuSchema = new Schema({
  investment: { type: Number, required: true },
  year: { type: Number, required: true },
  interest: { type: Number, required: true },
});

const CalcuModel = model("calcu", CalcuSchema);
module.exports = CalcuModel;
