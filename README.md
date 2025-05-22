# 🧮 MathMasters: AI-Powered Educational Game for Africa Students

> A gamified math learning platform with local language support and AI tutoring.

---

## 🎯 Overview

**MathMasters** turns math into a fun, culturally relevant game for  students. The goal is to help learners understand math using:
- African proverbs and market logic
- Gamification (XP, badges, leaderboards)
- AI-powered tutoring via **Math King Ade**

The project was built to run on:
- **React + TailwindCSS** (frontend)
- **Node.js + Express** (backend)
- **Firebase** (for multiplayer duels)

---

## ⚠️ Note on AI Tutoring

At the time of submission:
- We attempted integration with the **Sensay AI API**, but we were unable to get it working due to SDK generation issues and invalid schema names like `` `replicaUUID` parameter ``.
- As a fallback, we implemented a **gemini ai** using local logic.

This is **not ideal**, as the full vision includes an AI tutor powered by Sensay or that explains math problems like a real Nigerian teacher.

---

## 🛠️ Tech Stack

| Layer | Tech |
|------|------|
| Frontend | React + TailwindCSS |
| Backend | Node.js + Express |
| AI Integration | Attempted with Sensay AI, fallback to manual prompt-based logic |
| Multiplayer | Firebase Realtime Database |
| Hosting | Vercel (Frontend), Render(Backend) |
| Offline Support | LocalStorage caching |
| Language Switching | Manual translation support |

---

## 🧩 Features Implemented

- Solo Practice Mode
- XP Tracker & Badges
- Multilingual Support (English, Yoruba, Hausa, Igbo)
- Leaderboard (local version)

---

## 🚧 Known Limitations

- [ ] **No working AI Tutor yet**
- [ ] SDK generation failed due to OpenAPI schema issues
- [ ] Temporary solution uses hardcoded questions and explanations
- [ ] Full AI functionality will require Sensay API fix

---

## 🌍 Vision

To build an engaging, culturally grounded educational tool where students are taught by AI replicas like **Math King Ade**, who uses African markets and Nigerian wisdom to explain math.

---

## 🧑‍💻 Developer

**Oluwafemi Victor Jacob**  
Softwaare Engineer  
Nigeria  

---

## 🙌 Acknowledgements

Special thanks to the hackathon organizers for the opportunity to build for education in Nigeria.
