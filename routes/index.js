const express= require("express")
const router= express.Router()
const control= require("../controllers/control")

router.get("/", control.home)

router.get("/login", control.login)

router.get("/signup", control.signup)

router.post("/login", control.postLogin)

router.post("/signup", control.postSignup)

router.get("/logout", control.logout)

router.get("/viewAll", control.viewAll)

router.post("/add", control.add)

router.get("/edit/:id", control.edit)

router.post("/viewAll", control.editPost)

router.post("/delete", control.delete)

router.post("/deleteAll", control.deleteAll)

module.exports= router