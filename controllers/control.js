const mongoose= require("mongoose")
const passport= require("passport")
const User= require("../models/user")

let arr=["Hit edit to edit", "Hit delete to delete"]
module.exports= {
    
    home : (req, res) => {
        let auth=req.isAuthenticated()
        if(auth){
        var name=req.user.username;
        var ch=name.charAt(0).toUpperCase(); var i=1;
        while(name.charAt(i)!='@'){
            ch+=name.charAt(i)
            i++;
        }
        }
        res.render("index", {disp : auth? "none": "block", inOrOut : auth? "out": "in", name : !auth? "": ch})
    },
    signup : (req, res) => {
        res.render("signup")
    },
    postSignup : (req, res) => {
        User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
            if(err){
                console.log(err)
                res.render("signup")
            }
            
            passport.authenticate("local")(req, res, () => {
                res.redirect("/")
            })
        
        })
    },
    login : (req, res) => {
        res.render("login")
    },
    postLogin : (req, res) => {
        passport.authenticate("local")(req, res, () => {
            res.redirect("/")
        })
    },
    logout : (req, res) => {
        req.logout(err => {
            if(err){
                res.send(err)
            }
            else{
                res.redirect("/")
            }
        })
        
    },
    viewAll : (req, res) => {
        
        if(req.isAuthenticated()){
            User.findById({_id: req.user.id}, (err, user) => {
                if(err){
                    res.send(err)
                }
                else{
                    user.item=[...user.item, ...arr]
                    user.save()
                    res.render("viewAll", {tasks: user.item})
                    arr=new Array()
                }
            })
        }
        else{
            res.redirect("/login")
        }
    },
    add : (req, res) => {
        if(req.isAuthenticated()){
            arr=[...arr, req.body.add]
            res.redirect("/viewAll")
        }
        else{
            res.redirect("/login")
        }
    },
    edit : (req, res) => {
        const id=req.params.id
        User.findById({_id: req.user.id}, (err, user) => {
            if(err){
                res.send(err)
            }
            else{
                res.render("edit", {id: id, item: req.user.item[id]})
            }
        })
    },
    editPost : (req, res) => {
        User.findById({_id: req.user.id}, (err, user) => {
            if(err){
                res.send(err)
            }
            else{
                user.item[req.body.update]=req.body.newTask
                user.save()
                res.redirect("/viewAll")
            }
        })
    },
    delete : (req, res) => {
        User.findById({_id: req.user.id}, (err, user) => {
            if(err){
                res.send(err)
            }
            else{
                user.item.splice(req.body.delete, 1)
                user.save()
                res.redirect("/viewAll")
            }
        })
    },
    deleteAll : (req, res) => {
        User.findById({_id : req.user.id}, (err, user) => {
            if(err){
                res.send(err)
            }
            else{
                user.item=new Array()
                user.save()
                res.redirect("/viewAll")
            }
        })
    }
}