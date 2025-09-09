import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Welcome to the ShopBot. How may we assist you? `, {})],
  botName: 'ShopBot',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#21b6ae',
    },
    chatButton: {
      backgroundColor: '#21b6ae',
    },
  },
};

export default config;