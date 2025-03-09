# Full Stack LLM Chatbot

## Overview

This project was a part of the intern recruitment process for Sarvam AI. The project is a scalable, production-ready LLM chatbot powered by Google's Gemini API, integrated with Clerk for authentication and MongoDB Atlas for database management. The frontend is built with React 19, and the backend runs on Node.js with Express. The system leverages prompt engineering to enhance chatbot responses.

## Overall Approach and Design Philosophy

1. **Modular Architecture:**  
   - The project follows a modular design, separating concerns between the frontend, backend, and database.  
   - API routes handle authentication (via Clerk), chat interactions, and user management.  

2. **Efficient Prompt Engineering:**  
   - Custom prompts and context management are used to improve the chatbot’s responses and maintain user engagement.  

## How the System Handles Scaling

To make the project production-ready, **Dockerization and Kubernetes** were applied. By dockerizing the project, all dependencies and runtime configurations are encapsulated into a portable Docker image.  

The Kubernetes setup includes:  
- **ConfigMap** for managing environment variables.  
- **Deployment** to control the number of running instances.  
- **Horizontal Pod Autoscaler (HPA)** to dynamically scale based on CPU usage.  
- **Service** to expose the backend and frontend externally.  

This setup ensures seamless scalability and high availability.

## Key Technical Decisions

1. **Technology Stack:**  
   - **Backend:** Node.js, Express  
   - **Frontend:** React 19, Vite  
   - **Database:** MongoDB Atlas  
   - **Authentication:** Clerk  
   - **LLM API:** Gemini API  
   - **Containerization & Deployment:** Docker, Kubernetes

2. **Why Node.js and Express?**
   - Node.js is event-driven, making it great for handling multiple requests simultaneously.
   - Express provides a minimalistic framework with middleware support, making it easy to build APIs.

4. **Why React 19 and Vite?**  
   - React 19 provides enhanced performance and better state management, making the chatbot more responsive.
   - Vite provides lightning-fast development with instant HMR (Hot Module Replacement).

5. **Why Clerk for Authentication?**  
   - Clerk simplifies authentication with prebuilt UI components, reducing development overhead while maintaining security.  

6. **Why MongoDB Atlas?**
   - MongoDB's NoSQL structure allows for flexible schema design and horizontal scaling.
   - MongoDB Atlas handles backups, security, and scaling automatically.

7. **Why Gemini Api?**
   - Gemini Api can work efficiently for both image and text data.

8. **Why Docker and Kubernetes?**
   - Docker ensures that the app runs consistently across different environments.
   - Kubernetes handles auto-scaling, load balancing, and zero-downtime deployments.
---

## Deployment Instructions

### **Deployment Without Docker**
To deploy the project on your local machine without Docker, follow these steps:

#### **1. Clone The Repo**
Clone the repository using
```sh
gh repo clone PiyushKBhattacharyya/LLM-ChatBot
```

#### **2. Setup Environment Variables**
##### **For Backend**
1. Navigate to the backend folder:
```sh
cd backend
```
2. Create a .env file and add the following:
```sh
IMAGE_KIT_ENDPOINT=<YOUR_IMAGE_KIT_ENDPOINT_URL>
IMAGE_KIT_PUBLIC_KEY=<YOUR_IMAGE_KIT_PUBLIC_KEY>
IMAGE_KIT_PRIVATE_KEY=<YOUR_IMAGE_KIT_PRIVATE_KEY>
CLIENT_URL=http://localhost:5173
MONGO=<YOUR_MONGO_DB_CONNECTION_STRING>
CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>
PORT=3000
```
##### **For Frontend**
1. Navigate to the Frontend folder:
```sh
cd client
```
2. Create a .env file and add the following:
```sh
VITE_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
VITE_IMAGE_KIT_ENDPOINT=<YOUR_IMAGE_KIT_ENDPOINT_URL>
VITE_IMAGE_KIT_PUBLIC_KEY=<YOUR_IMAGE_KIT_PUBLIC_KEY>
VITE_GEMINI_PUBLIC_KEY=<YOUR_GEMINI_API_PUBLIC_KEY>
VITE_API_URL=http://localhost:3000
```
#### **3. Install Dependencies**
##### **For Backend**
```sh
cd backend
npm i --force
```
##### **For Frontend**
```sh
cd client
npm i --force
```
#### **4. Run the Backend Server**
```sh
cd backend
npm start
```
#### **5. Run the Frontend App**
```sh
cd client
npm run dev
```
Your app should now be accessible at http://localhost:5173 with the backend running at http://localhost:3000.

### **Deployment Using Docker**
To deploy the project on your local machine using Docker, follow these steps:

#### **1. Clone The Repo**
Clone the repository using
```sh
gh repo clone PiyushKBhattacharyya/LLM-ChatBot
```

#### **2. Setup Environment Variables**
Follow the same steps as in the "Deployment without Docker" section to create ```sh .env``` files in both backend and frontend directories.

#### **3. Build and Run Containers**
```sh
docker-compose up --build
```
This command builds and starts the application using Docker Compose, ensuring all services are properly configured and networked.


## Future Enhancements
- Implement Redis caching for faster responses
- Enhance security with OAuth integrations
- Integrate with other APIs for more features
- Improve error handling and logging
- Deployment on Cloud
- Implement CI/CD pipeline using GitHub Actions or CircleCI
- Implement RAG Model
