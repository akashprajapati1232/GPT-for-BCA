# GPT for BCA 🚀

**GPT for BCA** is a student-driven educational platform designed exclusively for Bachelor of Computer Applications (BCA) students. Built by BCA students for BCA students, it aims to eliminate the frustration of scattered study materials and disorganized syllabi. 

The platform organizes the complete BCA curriculum—from Semester 1 to Semester 6—in a highly structured, easy-to-navigate interface, and pairs it with the power of Artificial Intelligence. Students can find unit-wise breakdowns, download PDFs of their semester syllabus, and get AI-powered explanations for complex topics.

## 🌟 Key Features

- **Semester-Wise Structured Syllabus**: Access detailed subject and unit breakdowns for all 6 semesters.
- **AI-Powered Learning**: Get intelligent explanations, summaries, and Q&A assistance for every topic.
- **Syllabus Downloads**: One-click PDF downloads for individual semesters or the complete curriculum.
- **Searchable Topics**: Instantly find subjects, topics, and units using our fast search functionality.
- **Responsive & Modern Design**: A clean, distraction-free UI designed specifically for an optimal learning experience on both desktop and mobile devices.

## 🛠 Tech Stack

- **Frontend Framework:** React (v19) combined with Vite for ultra-fast development and build times.
- **Routing:** React Router v7 for smooth, client-side navigation.
- **Styling:** Custom vanilla CSS (`global.css`, `Home.css`, `About.css`, `Syllabus.css`, etc.) implementing modern UI patterns and fully responsive layouts.
- **Data Management:** Local JSON/JS data structures (`syllabusData.js`) serving static curriculum info.

## 📁 Project Structure

```text
GPT for BCA/
├── Backend/                 # Contains raw syllabus resources (PDFs, docs) 
│   └── JSON Sallybus/       # Semester-wise data folders (Sem 2nd, Sem 4th, Sem 6th, etc.)
└── Frontend/                # The main React Application folder
    ├── public/              # Public assets (e.g. PDFs for downloading)
    ├── src/                 # Application Source Code
    │   ├── assets/          # Static assets like images and icons 
    │   ├── components/      # Reusable UI components (Navbar, Footer, ScrollToTop)
    │   ├── data/            # Local data structures (e.g., syllabusData.js)
    │   ├── pages/           # Route views (Home, About, Contact, Syllabus)
    │   ├── styles/          # Modular CSS files for pages and components
    │   ├── App.jsx          # Main application component and routing configuration
    │   └── main.jsx         # React application entry point
    ├── index.html           # Base HTML template
    ├── package.json         # Project metadata and dependencies
    └── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

To run the frontend of this application locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- `npm` (Node Package Manager).

### Installation

1. Navigate to the `Frontend` directory from the project root:
   ```bash
   cd Frontend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:5173/` (or the port specified in your terminal).

## 👨‍💻 Meet the Builders

- **Akash Prajapati** - Full Stack Developer & Project Lead
- **Vivek Yadav** - UI/UX Designer & Developer

---
*Built with ❤️ for BCA Students.*
