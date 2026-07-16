  #🏙️ CityPulse AI
 
CityPulse AI is an AI-powered Smart City Complaint Management Platform that enables citizens to report civic issues while leveraging Google Gemini AI to analyze, classify, prioritize, and route complaints through a Human-in-the-Loop (HITL) workflow. The platform helps government departments efficiently manage, assign, and resolve complaints with role-based access control and real-time notifications.
 
---
 
## 🚀 Features
 
### 👤 Citizen
- Register and Login
- Create complaints with image upload
- Live location selection using maps
- Track complaint status
- View complaint history and timeline
- Receive real-time notifications
- Update profile and change password
 
### 👨‍💼 Department Manager
- Review AI-generated complaint analysis
- Accept or override AI recommendations
- Assign complaints to officers
- Monitor active and resolved complaints
- Receive complaint notifications
 
### 👷 Officer
- View assigned complaints
- Start work on complaints
- Mark complaints as resolved
- Update complaint progress
- Receive work notifications
 
### 👨‍💻 Admin
- Dashboard overview
- Create Officers and Department Managers
- Manage departments
- Enable/Disable user accounts
- Change user departments
- Enforce one Department Manager per department
- Manage system users
 
---
 
## 🤖 AI Features
 
- AI-powered complaint analysis using Google Gemini AI
- Complaint categorization
- Priority prediction
- Severity detection
- Department recommendation
- Image verification
- Text and image consistency validation
- Duplicate complaint detection
- AI-generated complaint summary
 
---
 
## 🛠️ Technology Stack
 
### Backend
- Java 21
- Spring Boot 3.5
- Spring Security
- Spring Data JPA (Hibernate)
- MySQL
- JWT Authentication
- Maven
 
### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React
- React Hot Toast
 
### AI & Cloud
- Google Gemini AI
- Cloudinary
- OpenStreetMap
- Leaflet
 
### DevOps
- Docker
- Docker Compose
- Nginx
 
---
 
## 🏗️ Architecture
 
```
Citizen
    │
    ▼
Complaint Submission
    │
    ▼
Google Gemini AI Analysis
    │
    ▼
Department Manager Review
    │
    ▼
Officer Assignment
    │
    ▼
Work Progress
    │
    ▼
Complaint Resolution
    │
    ▼
Citizen Notification
```
 
---
 
## 🔐 User Roles
 
- Citizen
- Officer
- Department Manager
- Administrator
 
---
 
## 📁 Project Structure
 
```
CityPulse-AI/
│
├── backend/
│   └── CityPulse-AI/
│
├── frontend/
│   └── citypulse-ai/
│
├── docker-compose.yml
├── .env.example
├── README.md
└── .gitignore
```
 
---
 
## ⚙️ Getting Started
 
### 1. Clone the Repository
 
```bash
git clone https://github.com/<your-username>/CityPulse-AI.git
cd CityPulse-AI
```
 
### 2. Configure Environment Variables
 
Create a `.env` file in the project root using `.env.example` and provide:
 
- Database credentials
- JWT Secret
- Google Gemini API Key
- Cloudinary credentials
 
### 3. Run with Docker
 
```bash
docker compose up --build
```
 
### 4. Access the Application
 
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
 
---
 
## 📸 Screenshots
 
Add screenshots of:
 
- Login Page
- Citizen Dashboard
- Create Complaint
- AI Analysis
- Department Manager Dashboard
- Officer Dashboard
- Admin Dashboard
- Notifications
 
---
 
## 🔒 Security Features
 
- JWT Authentication
- Role-Based Access Control (RBAC)
- Password Encryption using BCrypt
- Global Exception Handling
- Secure REST APIs
- Input Validation
 
---
 
## 📌 Key Highlights
 
- AI-assisted complaint classification and prioritization
- Human-in-the-Loop decision making
- Automated department recommendation
- Real-time notification system
- Complaint lifecycle tracking
- Responsive and modern UI
- Production-style modular architecture
- Dockerized deployment
 
---
 
## 👥 Team
 
Developed as part of a Smart City Hackathon Project.
 
---
 
## 📄 License
 
This project is developed for educational and hackathon purposes.
