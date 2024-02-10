import { Request, Response } from "express";
import { isUserExists } from "../../service/userExists";
import { createUser } from "../../controllers/users";

const users = {
  async signin(req: Request, res: Response) {
    try {
      const user = req.body;
      const exists = await isUserExists(user.contact);
      //if user was not created
      if (exists !== null) {
        res.json({
          msg: "user has already an account",
        });
        return;
      }

      const newUser = await createUser(user);

      res.json({
        msg: "new user created",
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { contact, password } = req.body;

      if (!contact || !password) {
        res.json({
          msg: "username or contact or password not found!",
        });
        return;
      }

      const user = await isUserExists(contact);

      if (user === null) {
        res.json({
          msg: "user does not exits create an account first!",
        });
        return;
      }
      res.json({
        msg: "logged in",
        user,
      });
    } catch (error) {}
  },
};

export default users;
