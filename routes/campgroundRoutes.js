const express = require("express");
const router = express.Router();
const AsyncError = require("../utils/CatchAsync");
const CampGround = require("../models/campground");
const {
  isLoggedIn,
  isAuthorized,
  validateCampground,
} = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

router
  .route("/")
  .get(AsyncError(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    AsyncError(campgrounds.createNewCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(AsyncError(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthorized,
    upload.array("image"),
    validateCampground,
    AsyncError(campgrounds.editCampground)
  )
  .delete(isLoggedIn, isAuthorized, AsyncError(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthorized,
  AsyncError(campgrounds.renderEditCampground)
);

module.exports = router;
