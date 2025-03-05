import { useEffect, useRef, useState } from 'react';
import './newPrompt.css';
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from "../../lib/gemini";
import Markdown from 'react-markdown'


const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      // maxOutputTokens: 100,
    }
  })

  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [question, answer, img.dbData]);

  const add = async (text) => {
    setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
    );
    let accumulateText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      accumulateText += chunkText
      setAnswer(accumulateText);
    }  
    
    } catch (error) {
      console.error("Error generating response:", error);
      setAnswer("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    await add(text);
  };

  return (
    <>
      {img.isLoading && <div>Loading...</div>}

      {img.dbData?.filePath && (
        <IKImage 
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="300"
          transformation={[{ width: 380 }]}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {answer && <div className="message"><Markdown>{answer}</Markdown></div>}

      <div className="endchat" ref={endRef} />

      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id='file' type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask Me Anything!" />
        <button type="submit">
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
