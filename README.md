# Portfolio — Taha Siddiqui

Personal portfolio website with a RAG-based AI chatbot that answers questions about my work, projects, and skills.

**Live site:** (add Vercel link here)

---

## Project Structure

```
Portfolio/
├── backend/                  # Node.js backend — RAG chatbot API
│   ├── data/
│   │   └── portfolio.txt     # Knowledge base for the chatbot
│   ├── rag.js                # Embedding + retrieval logic
│   ├── server.js             # Express server, Gemini API integration
│   ├── listmodels.js         # Utility to list available Gemini models
│   └── package.json
│
└── Taha-Siddiqui-Portfolio/  # React frontend
    ├── src/
    │   ├── components/       # All UI components
    │   └── App.jsx
    ├── public/
    └── package.json
```

---

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express, @xenova/transformers (local embeddings), Google Gemini API  
**Deployment:** Vercel (frontend) + Render (backend)

---

## Running Locally

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:
```
GEMINI_API_KEY=your_api_key_here
```

```bash
node server.js
```

Backend runs on `http://localhost:5000`

### Frontend

```bash
cd Taha-Siddiqui-Portfolio
npm install
```

Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

---

## Deployment

- **Backend** is deployed on [Render](https://render.com) as a Node web service
- **Frontend** is deployed on [Vercel](https://vercel.com) with `VITE_API_URL` set to the Render backend URL

---

## Contact

- GitHub: [github.com/TahaSiddiqui120505](https://github.com/TahaSiddiqui120505)
- LinkedIn: [linkedin.com/in/taha-siddiqui-4086122a5](https://linkedin.com/in/taha-siddiqui-4086122a5)
