const mongoose = require("mongoose");
const CampGround = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(error));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedsDB = async () => {
  await CampGround.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random150 = Math.floor(Math.random() * 150);
    const price = Math.floor(Math.random() * 20) + 10;
    const c = new CampGround({
      author: "64d64491e66cabe9e1811bc3",
      location: `${cities[random150].city}, ${cities[random150].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,

      image: [
        {
          url: "https://res.cloudinary.com/dba8hnojy/image/upload/v1690268160/YelpCamp/gh1opcgbk2ljjjuzqa0r.jpg",
          filename: "YelpCamp/gh1opcgbk2ljjjuzqa0r",
        },
        {
          url: "https://res.cloudinary.com/dba8hnojy/image/upload/v1690268160/YelpCamp/ta4iaybbpzhtbnwjcfau.jpg",
          filename: "YelpCamp/ta4iaybbpzhtbnwjcfau",
        },
      ],
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random150].longitude, cities[random150].latitude],
      },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quidem, odit alias eaque aliquid perferendis vel, dolor impedit culpa non expedita? Nobis velit consequatur rem numquam. Eaque eveniet optio placeat.",
    });
    await c.save();
  }
};

seedsDB().then(() => {
  mongoose.connection.close();
});
