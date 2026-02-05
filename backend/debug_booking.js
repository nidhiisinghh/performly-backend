const mongoose = require("mongoose");
const Booking = require("./db/models/booking");
const Client = require("./db/models/client");
const User = require("./db/models/user");
// Register Performer model as it is referenced
const Performer = require("./db/models/performer");
require("dotenv").config();

const run = async () => {
  try {
    const mongoURL =
      process.env.MONGO_URL || "mongodb://localhost:27017/practice";
    await mongoose.connect(mongoURL);
    console.log("Connected to DB");

    const bookings = await Booking.find()
      .populate("clientId", "name email phone")
      .sort({ createdAt: -1 })
      .limit(5);

    console.log("Bookings Found:", bookings.length);
    bookings.forEach((b, i) => {
      console.log(`\nBooking ${i}:`);
      console.log(`  ID: ${b._id}`);
      if (b.clientId) {
        console.log(`  User Name:`, b.clientId.name);
        console.log(`  User Email:`, b.clientId.email);
        console.log(`  User Phone:`, b.clientId.phone);
        console.log(`  User Phone Type:`, typeof b.clientId.phone);
      } else {
        console.log(`  User Not Populated`);
      }
    });

    // Also check a raw user to ensure the field exists in the DB
    if (bookings.length > 0 && bookings[0].clientId) {
      const userId = bookings[0].clientId._id;
      const rawUser = await User.findById(userId);
      console.log("\nRaw User Check:");
      console.log("  ID:", rawUser._id);
      console.log("  Phone Field:", rawUser.phone);
    }

    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

run();
