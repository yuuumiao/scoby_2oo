const express = require("express");
const router = express.Router();
const User = require("../models/User")


//Updates the current user
//app.use("/api/users", usersRouter);
router.patch("/me", (req, res, next) => {
     console.log(req.body, req.session.currentUser, "session.currentUser._id")
     User.findByIdAndUpdate(req.session.currentUser, req.body, {new: true})
      .then((resFromApi) => res.status(200).json(resFromApi))
      .catch((error) => next(error))
});



//Get’s information of the current user
router.get("/me", (req, res, next) => {
    User.findById(req.session.currentUser)
    .then((resFromApi) => {
        // console.log(resFromApi)
        res.status(200).json(resFromApi)})
    .catch((error) => next(error))

});


module.exports = router;
