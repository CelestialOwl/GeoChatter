import mongoose from "mongoose";
import moment from "moment";

export default (req, res, next) => {
  //   console.log(req);
  const currentTime = moment().format("h:mm a");
  console.log(currentTime);
  next();
};
