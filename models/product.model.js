const { default: mongoose } = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        surname: {
            type: String,
            required: [true, "Please provide a name"],
        },
        age: {
            type: Number,
            required: [true, "Please provide a name"],
        },
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;