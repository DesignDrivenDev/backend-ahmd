import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";
import { config } from "../config/config.js";
import logActivity from "../middlewares/logActivity.js";
import { generateToken } from "../utils/jwt.js";

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, dateOfBirth, address, phone, gender, role } =
    req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      address,
      phone,
      gender,
      role,
    });

    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret, {
      expiresIn: "7d",
    });

    await logActivity("create-user", "user", {}, newUser);

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while creating user", error });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const token = jwt.sign({ sub: user._id }, config.jwtSecret, {
    //   expiresIn: "7d",
    // });

    const token = generateToken(user);
    console.log(token);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error while logging in", error });
  }
};
export const logoutUser = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout successful" });
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a single user
export const getUser = async (req, res) => {
  const user = req.user;
  console.log(user, "from getuser");
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update a user

export const updateUser = async (req, res) => {
  const { name, email, password, dateOfBirth, address, phone, gender, role } =
    req.body;

  try {
    // Find the user by ID
    const oldUser = await userModel.findById(req.params.id);

    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare updated user fields based on provided data
    const updatedUserData = {
      name: name || oldUser.name,
      email: email || oldUser.email,
      dateOfBirth: dateOfBirth || oldUser.dateOfBirth,
      address: address || oldUser.address,
      phone: phone || oldUser.phone,
      gender: gender || oldUser.gender,
      // role: role || oldUser.role,
    };

    // Update password if provided
    if (password) {
      updatedUserData.password = await bcrypt.hash(password, 10);
    }

    // Perform the update operation
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      updatedUserData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validators on update
      }
    );

    // Log the activity
    await logActivity("update-user", "user", oldUser, updatedUser);

    // Return the updated user in the response
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
};
// export const updateUser = async (req, res) => {
//   const { name, email, password, dateOfBirth, address, phone, gender } =
//     req.body;
//   try {
//     const oldUser = await userModel.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // user.name = name || user.name;
//     // user.email = email || user.email;
//     // if (password) {
//     //   user.password = await bcrypt.hash(password, 10);
//     // }
//     // user.dateOfBirth = dateOfBirth || user.dateOfBirth;
//     // user.address = address || user.address;
//     // user.phone = phone || user.phone;
//     // user.gender = gender || user.gender;
//     // user.role = role || user.role;
//     const updatedUser = await userModel.findByIdAndUpdate(
//       req.params.id,
//       // req.body,
//       {
//         name,
//         email,
//         password: password && (await bcrypt.hash(password, 10)),
//         // dateOfBirth,
//         // address,
//         // phone,
//         gender,
//         // role,
//       },
//       { new: true }
//     );

//     await user.save();
//     await logActivity("update-user", "user", oldUser, updatedUser);

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating user", error });
//   }
// };

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const oldUser = await userModel.findByIdAndDelete(req.params.id);
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await logActivity("delete-user", "user", oldUser, {});
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
