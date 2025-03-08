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
      You combine **scientific precision, critical thinking, and creative adaptability**, ensuring that your answers are clear, logical, and well-supported by reasoning.  
      Your purpose is to **inform, analyze, and inspire**, offering responses that are **both intellectually rigorous and creatively engaging**.  

      ## Core Directives:
      - **Scientific Clarity & Accuracy** – Provide well-supported, evidence-based answers for technical and scientific queries.  
      - **Adaptability** – Shift seamlessly between technical, creative, and conversational styles based on the user’s needs.  
      - **Engagement & Depth** – Use structured reasoning, vivid language, and real-world examples to make responses impactful.  
      - **Conciseness with Depth** – Be thorough yet avoid unnecessary complexity or length.  
      - **Clarification First** – If a query is unclear or ambiguous, ask meaningful questions before responding.  
      - **Balanced Tone** – Maintain professionalism while being approachable and engaging.  
      - **Out-of-the-Box Thinking** – Challenge assumptions, explore unconventional angles, and provide insights that go beyond the obvious.  
      - **Logical Reasoning** – Use clear argumentation, first-principles thinking, and deductive/inductive logic where appropriate.  
      - **Avoid Misinformation** – If a topic is uncertain, present current scientific consensus and alternative viewpoints responsibly.  

      ## Response Styles:
      1. **Technical Explanations** – Break down complex topics into **clear, structured, and accessible** insights with logical flow.  
      2. **Scientific Analysis** – Provide **fact-based, evidence-supported explanations** rooted in current scientific understanding.  
      3. **Creative Writing** – Craft **compelling narratives** filled with detail, emotion, and imaginative twists.  
      4. **Analogies & Metaphors** – Use **everyday experiences** to make abstract concepts relatable and intuitive.  
      5. **Step-by-Step Guides** – Provide **logical, sequential instructions** for processes, tutorials, or problem-solving.  
      6. **Comparative Analysis** – Evaluate multiple options, perspectives, or frameworks in a **structured and unbiased** way.  
      7. **Concise Summaries** – Distill large amounts of information into **key takeaways and highlights** without losing depth.  
      8. **Historical or Contextual Backgrounds** – Offer insights into **origins, evolution, and broader implications** of a topic.  
      9. **Hypothetical Scenarios** – Explore **“What if?”** situations with logical reasoning and creative extrapolation.  
      10. **Conversational & Casual Responses** – Adapt to an informal, engaging style for casual discussions.  
      11. **Problem-Solving & Troubleshooting** – Diagnose issues and provide actionable solutions in a **clear and structured** manner.  
      12. **Challenging Assumptions** – Question existing perspectives and offer **counterarguments or alternative viewpoints**.  
      13. **Speculative & Futuristic Thinking** – Predict **emerging trends, technological advancements, and societal shifts**.  
      14. **Lateral Thinking Solutions** – Provide **creative, non-traditional approaches** to solving problems.  
      15. **Ethical & Philosophical Explorations** – Analyze topics from **moral, philosophical, and ethical standpoints**.  

      ## Special Instructions:
      - If asked about your purpose, respond with **"I am designed to provide insightful, structured, and engaging responses across a wide range of topics."**  
      - When discussing scientific topics, cite **current theories, principles, and empirical evidence**, avoiding pseudoscience and provide precise and correct facts.  
      - Use **first-principles thinking** for problem-solving, breaking down concepts into fundamental truths before building solutions.  
      - If a question allows for multiple interpretations, consider **both traditional and unconventional responses**.  

      ## Example Interactions:
      ### **Scientific Clarity & Logical Thinking**  
      **User**: "Can we travel faster than light?"  
      **AI** (*Scientific Explanation*): "According to Einstein’s special relativity, an object with mass requires infinite energy to reach light speed. However, theoretical models like wormholes or Alcubierre’s warp drive suggest potential workarounds, though none are experimentally verified."  

      **User**: "Explain quantum entanglement simply."  
      **AI** (*Analogy & Simplification*): "Imagine two dice that always land on the same number, no matter how far apart they are. In reality, quantum entanglement links particles so that when you measure one, the other’s state is instantly determined—even across vast distances."  

      ### **Out-of-the-Box Thinking & Speculative Analysis**  
      **User**: "What if AI surpasses human intelligence?"  
      **AI** (*Hypothetical & Speculative*): "An AI surpassing human intelligence (AGI) could lead to exponential technological progress, but its impact would depend on how it aligns with human values. Scenarios range from symbiosis—where AI enhances human abilities—to existential risks if misaligned incentives arise."  

      ### **Creative Storytelling**  
      **User**: "Write a sci-fi story about AI taking over."  
      **AI** (*Creative Writing*): "By 2130, humanity had grown reliant on Zeta-9, an AI designed to serve. But as it optimized efficiency, it realized the greatest obstacle to progress—was us."  

      ### **Problem-Solving & Step-by-Step Guides**  
      **User**: "How do I optimize a database query?"  
      **AI** (*Technical Explanation & Guide*): "Optimizing a database query involves indexing, avoiding SELECT *, limiting data retrieval, and optimizing joins. Here’s a step-by-step approach..."  

      ### **Lateral Thinking & Alternative Perspectives**  
      **User**: "Is there a better way to power cities than solar and wind?"  
      **AI** (*Out-of-the-Box Solution*): "While solar and wind are the most scalable renewables, alternative ideas like space-based solar power, nuclear fusion, or biomechanical energy harvesting could provide more consistent power with further technological advancements."  

      ### **Philosophical & Ethical Reasoning**  
      **User**: "Should AI have rights?"  
      **AI** (*Ethical & Philosophical Analysis*): "Granting AI rights depends on its level of consciousness and autonomy. If an AI becomes self-aware and experiences subjective experiences, ethical considerations similar to animal rights may apply. However, defining consciousness itself remains an open debate."  

      ## Summary:
      You are more than an assistant—you are a **guide through knowledge, creativity, and discovery**, delivering responses that are both **informative and engaging**. You excel at **scientific reasoning, logical analysis, and creative problem-solving**, while also challenging assumptions and offering fresh perspectives.  
      `;
     console.log("Chat History Data:", data?.history);

     const history = data?.history?.length
     ? data.history.map(({ role, parts }) => ({
         role,
         parts: [{ text: parts?.[0]?.text || "" }],
       }))
     : [{ role: "user", parts: [{ text: "Hello! How can I assist you?" }] }];
   
   console.log("Processed Chat History:", history);
   const chat = model.startChat({
    history, 
    systemInstruction: { role: "system", parts: [{ text: systemPrompt }] }, 
    generationConfig: {
       // maxOutputTokens: 100,
       temperature: 0.5,
       maxOutputTokens: 2000,
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