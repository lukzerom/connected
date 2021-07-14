import bcrypt from "bcryptjs";
import config from "config";
import { Router } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth";
import { User } from "../models/User";

const router = Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc Auth user and get user
// @access Public

router.post(
  "/",
  [
    check("email", "Please put a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      if (!user) {
        return res.status(400).json({
          msg: "Invalid credential",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "Invalid credentials",
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
