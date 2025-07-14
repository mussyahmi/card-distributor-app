# 🃏 Part A – Card Distributor App

## ⏱ Time Spent
~3.5 hours

---

## 💡 Overview

This app distributes a standard 52-card deck randomly to **n** people. It ensures proper validation, error handling, and formatted output. The interface is clean and user-friendly, built with React and Tailwind CSS. The backend logic is implemented in PHP.

---

## ⚙️ Tech Stack

- **Frontend:** React 19.1 + Tailwind CSS 4.1
- **Backend:** PHP 7.3
- **Environment:** Docker + Docker Compose
- **Build Tool:** Vite 7

---

## 🧪 How to Run

1. **Clone the repository**
```bash
git clone https://github.com/mussyahmi/card-distributor-app.git
cd card-distributor
```

2. **Run Docker**
```bash
docker-compose up --build
```

3. **Access**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

---

## ✅ Features

- Input: Number of people (validated)
- Error message shown if:
  - Input is missing or non-numeric
  - Input < 0
- Handles n > 52 properly (not an error)
- Random distribution of cards
- Card format follows the spec:
  - Suits: `S`, `H`, `D`, `C`
  - Values: `A`, `2`–`9`, `X` (10), `J`, `Q`, `K`
- Output:
  - First person on first row
  - Second person on second row
  - Cards comma-separated
  - No `[LF]` between lines

---

## 🛠 File Structure

```
/frontend        # React + Tailwind app
/backend         # PHP logic (card distribution)
compose.yaml
README.md
B_SQL_Optimization.md
```

---

## 🚧 Edge Case Handling

- If input is missing, invalid, or < 0 → `Input value does not exist or value is invalid`
- If system exception occurs → `Irregularity occurred` is shown
- Cards are reshuffled and randomized each time

---

## 🧾 Usage Example

Input: `3`

Output:
```
H-A,C-5,S-Q,...
D-3,S-4,H-K,...
C-2,D-9,S-J,...
```

---

## 📦 Deployment Notes

- Dockerized for consistency
- Uses UTF-8 character encoding and LF line endings
- Compatible with:
  - PHP 7.3
  - Node v12+
  - React v16+

---

## 📘 Notes

- All logic is commented inline for clarity
- GitHub repository includes this explanation and all code
- No sensitive information or reproduction permitted

---

📌 **Submitted via GitHub with complete front-end and back-end code.**
