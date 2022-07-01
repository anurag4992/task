const express= require("express")
const bodyParser= require("body-parser")
const app=express()
const PORT=3000;

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("We are up and running");
})




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})