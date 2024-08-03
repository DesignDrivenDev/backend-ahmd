import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
};

// MONGO_URI=mongodb://localhost:27017/redux_app
// JWT_SECRET=my_jwt_secret_is_padmalochaan
// PORT=5000

// NODE_ENV="production"
