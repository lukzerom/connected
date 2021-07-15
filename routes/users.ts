import bcrypt from "bcryptjs";
import config from "config";
import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

// @route POST api/users
// @desc Register user
// @access Public

router.post(
  "/",
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("surname", "Please enter your surname").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter password eith 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, surname, email, phone, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (user) {
        return res.status(400).json({
          msg: "User already exist",
        });
      }

      user = new User({
        name,
        surname,
        phone,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
