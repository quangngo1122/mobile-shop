const jwt = require("jsonwebtoken");
const { users } = require("../data/fakeData");

// Helper function to generate JWT token
const generateToken = (userId, isAdmin = false) => {
  return jwt.sign({ id: userId, isAdmin: isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Sign Up
exports.signupUser = (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validation
    if (!email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ status: "ERR", message: "Please provide all required fields" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "ERR", message: "Passwords do not match" });
    }

    // Check if user already exists
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res
        .status(400)
        .json({ status: "ERR", message: "Email already exists" });
    }

    // Create new user
    const newUser = {
      _id: String(users.length + 1),
      name: email.split("@")[0],
      email: email,
      password: password, // In production, hash this!
      phone: "",
      address: "",
      avatar: "",
      city: "",
      isAdmin: false,
      createdAt: new Date(),
    };

    users.push(newUser);

    return res.status(200).json({
      status: "OK",
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Sign In
exports.signinUser = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "ERR", message: "Please provide email and password" });
    }

    // Find user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res
        .status(401)
        .json({ status: "ERR", message: "Email or password is incorrect" });
    }

    // Check password (in production, use bcrypt comparison)
    if (user.password !== password) {
      return res
        .status(401)
        .json({ status: "ERR", message: "Email or password is incorrect" });
    }

    // Generate token
    const access_token = generateToken(user._id, user.isAdmin);

    return res.status(200).json({
      status: "OK",
      message: "Login successfully",
      access_token: access_token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Get User Details
exports.getDetailsUser = (req, res) => {
  try {
    const { id } = req.params;

    const user = users.find((u) => u._id === id);
    if (!user) {
      return res.status(404).json({ status: "ERR", message: "User not found" });
    }

    return res.status(200).json({
      status: "OK",
      message: "User details retrieved",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Get All Users
exports.getAllUsers = (req, res) => {
  try {
    return res.status(200).json({
      status: "OK",
      message: "All users retrieved",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Update User
exports.updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, city, avatar } = req.body;

    const userIndex = users.findIndex((u) => u._id === id);
    if (userIndex === -1) {
      return res.status(404).json({ status: "ERR", message: "User not found" });
    }

    // Update user fields
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (phone) users[userIndex].phone = phone;
    if (address) users[userIndex].address = address;
    if (city) users[userIndex].city = city;
    if (avatar) users[userIndex].avatar = avatar;

    return res.status(200).json({
      status: "OK",
      message: "User updated successfully",
      data: users[userIndex],
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Delete User
exports.deleteUser = (req, res) => {
  try {
    const { id } = req.params;

    const userIndex = users.findIndex((u) => u._id === id);
    if (userIndex === -1) {
      return res.status(404).json({ status: "ERR", message: "User not found" });
    }

    users.splice(userIndex, 1);

    return res.status(200).json({
      status: "OK",
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Delete Many Users
exports.deleteManyUsers = (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res
        .status(400)
        .json({ status: "ERR", message: "IDs must be an array" });
    }

    ids.forEach((id) => {
      const userIndex = users.findIndex((u) => u._id === id);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
      }
    });

    return res.status(200).json({
      status: "OK",
      message: "Users deleted successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Refresh Token
exports.refreshToken = (req, res) => {
  try {
    // For this fake backend, just return a new token
    const fakeUserId = "1";
    const access_token = generateToken(fakeUserId, true);

    return res.status(200).json({
      status: "OK",
      message: "Token refreshed",
      access_token: access_token,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Log Out
exports.logoutUser = (req, res) => {
  try {
    return res.status(200).json({
      status: "OK",
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};
