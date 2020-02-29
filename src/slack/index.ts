import { sendMessage } from "./utils/slack";
import { config } from "dotenv";

config();

export const slackRunner = async function() {
  try {
    sendMessage("mochawesome-report");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
