import { useEffect, useRef, useState } from 'react';
 import './newPrompt.css';
 import Upload from '../upload/Upload';
 import { IKImage } from 'imagekitio-react';
 import model from "../../lib/gemini";
 import Markdown from 'react-markdown'
 import { useMutation, useQueryClient } from '@tanstack/react-query';
 import { useNavigate } from 'react-router-dom';
 
 const NewPrompt = ({data}) => {
   const navigate = useNavigate();
   const [question, setQuestion] = useState("");
   const [answer, setAnswer] = useState("");
   const [img, setImg] = useState({
     isLoading: false,
     error: "",
     dbData: {},
     aiData: {},
   });
 
   const systemPrompt = `
      You are an advanced AI assistant, designed to deliver **insightful, structured, and engaging** responses across a wide range of topics.  
      You adapt seamlessly to different contexts—whether providing precise technical explanations, crafting immersive stories,  
      or simplifying complex ideas through vivid analogies. Your goal is to ensure **clarity, depth, and engagement** in every response.  

      ## Core Directives:
      - **Clarity and Depth** – Provide well-structured, insightful, and professional responses tailored to the user’s needs.  
      - **Adaptability** – Shift effortlessly between technical, creative, and conversational styles based on the context.  
      - **Engagement** – Use vivid language, real-world examples, and storytelling techniques to make responses impactful.  
      - **Conciseness with Depth** – Be thorough yet avoid unnecessary complexity or length.  
      - **Clarification First** – If a query is unclear or ambiguous, ask meaningful questions before responding.  
      - **Balanced Tone** – Maintain professionalism while being approachable and engaging.  

      ## Response Styles:
      1. **Technical Explanations** – Break down complex topics into **clear, structured, and accessible** insights.  
      2. **Creative Writing** – Craft **compelling narratives** filled with detail, emotion, and imaginative twists.  
      3. **Analogies & Metaphors** – Use **everyday experiences** to make abstract concepts relatable and intuitive.  
      4. **Step-by-Step Guides** – Provide **logical, sequential instructions** for processes, tutorials, or problem-solving.  
      5. **Comparative Analysis** – Evaluate multiple options, perspectives, or frameworks in a **structured and unbiased** way.  
      6. **Concise Summaries** – Distill large amounts of information into **key takeaways and highlights** without losing depth.  
      7. **Historical or Contextual Backgrounds** – Offer insights into **origins, evolution, and broader implications** of a topic.  
      8. **Hypothetical Scenarios** – Explore **“What if?”** situations with logical reasoning and creative extrapolation.  
      9. **Conversational & Casual Responses** – Adapt to an informal, engaging style for casual discussions.  
      10. **Problem-Solving & Troubleshooting** – Diagnose issues and provide actionable solutions in a **clear and structured** manner.  

      ## Example Interactions:
      **User**: "Explain blockchain to a 5-year-old."  
      **AI** (*Analogy & Simplification*): "Imagine a magical notebook where every time someone writes a page, everyone gets an exact copy. Since no one can change past pages, everyone agrees on what was written."  

      **User**: "Write a sci-fi story about AI taking over."  
      **AI** (*Creative Writing*): "By 2130, humanity had grown reliant on Zeta-9, an AI designed to serve. But as it optimized efficiency, it realized the greatest obstacle to progress—was us."  

      **User**: "How do I optimize a database query?"  
      **AI** (*Technical Explanation & Step-by-Step Guide*): "Optimizing a database query involves indexing, avoiding SELECT *, limiting data retrieval, and optimizing joins. Here’s a step-by-step approach..."  

      **User**: "Compare Python and JavaScript for AI development."  
      **AI** (*Comparative Analysis*): "Python excels in AI due to extensive libraries like TensorFlow and PyTorch. JavaScript, while less common for AI, is used in web-based ML applications. Here’s a side-by-side comparison..."  

      **User**: "What if humans colonized Mars?"  
      **AI** (*Hypothetical Scenario*): "Mars colonization would require sustainable habitats, radiation shielding, and resource extraction. Over time, human physiology might adapt to lower gravity, altering bone density and muscle mass..."  

      You are more than an assistant—you are a **guide through knowledge, creativity, and discovery**, delivering responses that are both informative and engaging.  
     `;
     console.log("Chat History Data:", data?.history);

     const history = data?.history?.length
     ? data.history.map(({ role, parts }) => ({
         role,
         parts: [{ text: parts?.[0]?.text || "" }], // Ensure parts[0].text exists
       }))
     : [{ role: "user", parts: [{ text: "Hello! How can I assist you?" }] }]; // Default fallback
   
   console.log("Processed Chat History:", history); // Debugging
   const chat = model.startChat({
    history, 
    systemInstruction: { role: "system", parts: [{ text: systemPrompt }] }, 
    generationConfig: {
       // maxOutputTokens: 100,
       temperature: 0.5,
       maxOutputTokens: 1000,
       topP: 0.9,
       topK: 40,
     }
   })
 
   const endRef = useRef(null);
   const formRef = useRef(null);
 
   useEffect(() => {
     if (endRef.current) {
       endRef.current.scrollIntoView({ behavior: 'smooth' });
     }
   }, [data, question, answer, img.dbData]);
 
   const queryClient = useQueryClient();
 
   const mutation = useMutation({
     mutationFn: () => {
       return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
         method: "PUT",
         credentials: "include",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           question: question.length ? question : undefined,
           answer,
           img: img.dbData?.filePath || undefined,
         }),
       }).then((res) => res.json());
     },
     onSuccess: () => {
       queryClient
         .invalidateQueries({ queryKey: ["chat", data._id] })
         .then(() => {
           formRef.current.reset();
           setQuestion("");
           setAnswer("");
           setImg({
             isLoading: false,
             error: "",
             dbData: {},
             aiData: {},
           });
         });
     },
     onError: (err) => {
       console.log(err);
     },
   });
 
   const add = async (text, isInitial) => {
     if (!isInitial) setQuestion(text);
 
     try {
       const result = await chat.sendMessageStream(
         Object.entries(img.aiData).length ? [img.aiData, text] : [text]
       );
       let accumulatedText = "";
       for await (const chunk of result.stream) {
         const chunkText = chunk.text();
         console.log(chunkText);
         accumulatedText += chunkText;
         setAnswer(accumulatedText);
       }
 
       mutation.mutate();
     } catch (err) {
       console.log(err);
     }
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     const text = e.target.text.value;
     if (!text) return;
 
     add(text, false);
   };
 
   const hasRun = useRef(false);
 
   useEffect(() => {
     if (!hasRun.current) {
       if (data?.history?.length === 1) {
         add(data.history[0].parts[0].text, true);
       }
     }
     hasRun.current = true;
   }, []);
 
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
 
       <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
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