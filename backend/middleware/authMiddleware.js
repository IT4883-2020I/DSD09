import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import axios from "axios";

const protect = asyncHandler(async (req, res, next) => {
  const apiToken = req.headers["api-token"] || "";
  const projectType = req.headers["project-type"] || "";

  const verify = await axios.get("https://distributed.de-lalcool.com/api/verify-token", {
    headers: {
      "api-token": apiToken,
      "project-type": projectType
    }
  });
  if (verify.data.status === "fail") {
    return res.status(401).json(verify.data);
  }
  req.user = verify.data.result;
  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
