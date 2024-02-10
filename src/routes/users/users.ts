import { Request, Response } from "express";
import { isUserExists } from "../../service/userExists";
import { createUser, userType } from "../../controllers/users";
import { createToken } from "../../service/token";

const users = {
  async signin(req: Request, res: Response) {
    try {
      const user: userType = req.body;
      const exists = await isUserExists(user.contact);
      //if user was not created
      if (exists !== null) {
        const token = createToken((exists?.toJSON()).id);
        res.json({
          msg: "user has already an account",
          token,
        });
        return;
      }

      const newUser = await createUser(user);

      res.json({
        msg: "new user created",
        token: createToken((newUser?.toJSON()).id),
      });
    } catch (error) {
      res.json({
        msg: "user could't create or found",
      });
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
        token: createToken(user.toJSON().id),
      });
    } catch (error) {
      console.log("there is an error on login");
      res.json({
        err: "failed to login user",
      });
    }
  },
};

export default users;
