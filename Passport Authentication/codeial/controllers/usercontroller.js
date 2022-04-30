const { redirect } = require("express/lib/response");
const User=require("../models/user")
module.exports.profile= function (req, res) {
  return res.render("user_profile",{
      title:"User Profile",
    })
}



//render the singup page
module.exports.signup=function(req,res){
  if(req.isAuthenticated()){
   return res.redirect("/users/profile")
  }


  return res.render("user_sign_up",{
    title:"codeial | sign up"
  })
}


//render the sing in page
module.exports.signin=function(req,res){

  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in",{
    title:"codeial | sign in"
  })
}

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("password error");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
         
            console.log("error");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      console.log("successfull");
      return res.redirect("back");
    }
  });
};
// sign in and create the user session 
// module.exports.createession = function (req, res) {
// //find the user
// User.findOne({email:req.body.email},function(err,user){
//   if (err) {
//     console.log("err in finding the user");
//     return;
//   }
//   //handle user found
//   if (user) {
//     //handle passowrd which dont match

//     if (user.password != req.body.password) {
//       return res.redirect("back");
//     }
//     //handle seession creation

//     res.cookie("user_id", user.id);
//     return res.redirect("/users/profile");
//   } else {
//     //handle user not found

//     return res.redirect("back");
//   }
// })
// }

// sign in and create the user session 
module.exports.createSession = function (req, res){
 return res.redirect("/"); 
}
module.exports.destroySession=function(req,res){
  req.logout();
  
  return res.redirect("/");
}