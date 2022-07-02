const mongoose= require("mongoose")

const itemSchema= mongoose.Schema({
    item: Array
})

module.exports= {
    itemSchema: itemSchema,
    Item: mongoose.model("Item", itemSchema)
}