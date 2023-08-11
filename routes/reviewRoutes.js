const express = require("express");
const router = express.Router({ mergeParams: true });
const CatchAsync = require("../utils/CatchAsync");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthorized,
} = require("../middleware");
const reviews = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, CatchAsync(reviews.createReviews));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthorized,
  CatchAsync(reviews.deleteReviews)
);

module.exports = router;
