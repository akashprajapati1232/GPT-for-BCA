# GPT for BCA 🎓🤖

<div align="center">

![GPT for BCA Banner](./Frontend/src/assets/favicon.png)

**An AI-powered study platform built by BCA students, for BCA students.**

[![React](https://img.shields.io/badge/React-v19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red?style=flat-square)](#)

</div>

---

## 📖 About the Project

**GPT for BCA** is a student-driven educational platform that eliminates the frustration of scattered study materials and disorganized syllabi.  
It organizes the complete BCA curriculum — **Semester 1 through 6** — in a clean, structured, and AI-assisted interface.

Students can:
- Browse the **full syllabus** organized semester and subject-wise
- Get **AI-powered explanations** for complex topics
- **Download PDFs** of their semester syllabus with one click
- **Search** for any subject, topic, or unit instantly

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📚 **Structured Syllabus** | Complete semester-wise breakdown for all 6 semesters |
| 🤖 **AI-Powered Learning** | Smart explanations and Q&A for every topic |
| 📥 **PDF Downloads** | One-click download for individual or full semester syllabi |
| 🔍 **Fast Search** | Instantly find any subject, unit, or topic |
| 📱 **Responsive Design** | Fully optimized for desktop, tablet, and mobile |
| 🌙 **Dark Mode UI** | Eye-friendly dark theme for long study sessions |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React v19** | UI Framework |
| **Vite** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Vanilla CSS** | Custom styling (`global.css`, page-level CSS modules) |
| **Font Awesome** | Icon library |
| **Google Fonts** (Inter + Outfit) | Typography |

### Backend / Data
| Technology | Purpose |
|---|---|
| **JS Data Files** (`syllabusData.js`) | Structured curriculum data |
| **JSON Folders** | Raw semester-wise syllabus resources |
| **PDF Assets** | Downloadable syllabus files |

---

## 📁 Project Structure

```text
GPT for BCA/                          ← Root project folder
├── README.md                         ← You are here
├── Backend/                          ← Raw syllabus resources
│   └── JSON Sallybus/                ← Semester-wise data folders
│       ├── Sem 2nd/
│       ├── Sem 4th/
│       └── Sem 6th/
└── Frontend/                         ← React Application
    ├── public/                       ← Static public assets (PDFs, icons)
    ├── src/
    │   ├── assets/                   ← Images, favicon, team photos
    │   ├── components/               ← Shared UI components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── data/                     ← Curriculum data
    │   │   └── syllabusData.js
    │   ├── pages/                    ← Route-level page components
    │   │   ├── Home.jsx
    │   │   ├── About.jsx
    │   │   ├── Syllabus.jsx
    │   │   └── Contact.jsx
    │   ├── styles/                   ← CSS files per page/component
    │   │   ├── global.css
    │   │   ├── Navbar.css
    │   │   ├── Footer.css
    │   │   ├── Home.css
    │   │   ├── About.css
    │   │   ├── Syllabus.css
    │   │   └── Contact.css
    │   ├── App.jsx                   ← Root component + routing
    │   └── main.jsx                  ← React entry point
    ├── index.html                    ← Base HTML template
    ├── package.json                  ← Dependencies & scripts
    ├── vite.config.js                ← Vite config
    └── eslint.config.js              ← ESLint config
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes with Node.js)

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/akashprajapati1232/GPT-for-BCA.git

# 2. Navigate into the frontend directory
cd "GPT for BCA/Frontend"

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser and visit: **http://localhost:5173/**

### Building for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` folder.

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Landing page with hero, features, and CTA sections |
| `/about` | **About** | Project story, team members, mentor, mission & stats |
| `/syllabus` | **Syllabus** | Full 6-semester curriculum browser with AI assistant |
| `/contact` | **Contact** | Contact form and developer information |

---

## 👨‍💻 Meet the Builders

<table>
  <tr>
    <td align="center">
      <strong>Akash Prajapati</strong><br/>
      <em>Full Stack Developer &amp; Project Lead</em><br/>
      Roll No: 237092010005 | BCA 3rd Year<br/>
      <a href="https://github.com/akashprajapati1232">GitHub</a> •
      <a href="https://www.linkedin.com/in/akash-prajapati1232/">LinkedIn</a> •
      <a href="https://akashprajapati.rf.gd/?i=1">Portfolio</a>
    </td>
    <td align="center">
      <strong>Vivek Yadav</strong><br/>
      <em>UI/UX Designer &amp; Developer</em><br/>
      Roll No: 237092010053 | BCA 3rd Year<br/>
      GitHub • LinkedIn
    </td>
  </tr>
</table>

### 🎓 Project Mentor

**Mr. Ashish Sharma**  
*Project Guide & Mentor*  
Department of Computer Science Engineering & Application  
Bhagwant Institute of Technology, Muzaffarnagar

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

*Built with ❤️ for BCA Students at Bhagwant Institute of Technology, Muzaffarnagar.*

⭐ If this project helped you, consider giving it a star on GitHub!

</div>
