import { Request, Response } from "express";

const userController = {
  test: (req: Request, res: Response): void => {
    res.json({
      message: "User route is working!",
    });
  },
};

export default userController;
