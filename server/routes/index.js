import express from "express";
import property from "./property";
import user from "./user";
import auth from "./auth";

const router = express.Router();

property(router);
user(router);
auth(router);

export default router;
