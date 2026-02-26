const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/User.js");
const Course = require("./src/models/Course.js");
const bcrypt = require("bcryptjs");

dotenv.config();

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});
    await Course.deleteMany({});

const users = await User.insertMany([
  {
    name: "Admin User",
    email: "admin@example.com",
    password: await bcrypt.hash("123456", 10), // ✅ hashed
    role: "admin"
  },
  {
    name: "Instructor User",
    email: "instructor@example.com",
    password: await bcrypt.hash("123456", 10), // ✅ hashed
    role: "instructor"
  },
  {
    name: "Student User",
    email: "student@example.com",
    password: await bcrypt.hash("123456", 10), // ✅ hashed
    role: "student"
  }
]);

    await Course.insertMany([
      { title: "Intro to Node.js", description: "Learn backend basics", price: 99, instructor: users[1]._id },
      { title: "React Fundamentals", description: "Frontend essentials with React and Vite", price: 79, instructor: users[1]._id }
    ]);

    console.log("✅ Seed data created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();