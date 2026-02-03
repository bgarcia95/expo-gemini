import { ChatMessages } from '@/components/chat/ChatMessages';
import CustomInputBox from '@/components/chat/CustomInputBox';
import { useBasicPromptStore } from '@/store/basic-prompt/basicPrompt.store';
import { Layout } from '@ui-kitten/components';



const BasicPromptScreen = () => {

  // const { messages } = useBasicPromptStore();
  const messages = useBasicPromptStore((state) => state.messages);
  const isGeminiWriting = useBasicPromptStore(state => state.isGeminiWriting);
  const { addMessage } = useBasicPromptStore();

  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} isGeminiWriting={isGeminiWriting} />

      <CustomInputBox onSendMessage={(message, files) => {
        console.log('message', message);
        console.log('files', files);
        addMessage(message, files)
      }} />
    </Layout>
  );
};

export default BasicPromptScreen;
