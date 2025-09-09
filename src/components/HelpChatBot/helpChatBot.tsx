import { Box } from "@mui/material";
import config from "./config";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

export const HelpChatBot = () => {
  return (
    <Box>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </Box>
  );
};
