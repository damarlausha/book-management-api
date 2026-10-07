# 📚 Book Management System

A full-stack Book Management System built using Java, Spring Boot, Spring Security, JWT Authentication, MySQL, HTML, CSS, and JavaScript.

This project provides a secure REST API and a user-friendly web interface for managing books.

---

## 🚀 Features

### 🔐 Authentication
- User registration
- User login
- BCrypt password encryption
- JWT-based authentication
- Protected book APIs
- Logout functionality

### 📚 Book Management
- Add new books
- View all books
- Update books
- Delete books
- Book validation
- Error handling

### 🎨 Frontend
- Login page
- Book management dashboard
- Add Book form
- Edit Book modal
- Delete confirmation modal
- Responsive design
- Loading and error messages

### ⚙️ Backend
- RESTful APIs
- Spring Boot
- Spring Data JPA
- MySQL database
- Spring Security
- JWT authentication
- Global exception handling
- Bean validation

### 📦 Production Build
- Maven production build
- Executable Spring Boot JAR
- Application tested independently using the generated JAR

---

## 🛠️ Technologies Used

### Backend
- Java 21
- Spring Boot 4.1.1
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven

### Database
- MySQL

### Frontend
- HTML5
- CSS3
- JavaScript

### Tools
- IntelliJ IDEA
- MySQL Workbench
- Postman
- Git
- GitHub

---

## 🏗️ Project Architecture

```text
Frontend
   │
   │ HTTP Requests
   ▼
Spring Boot REST API
   │
   ├── Controller
   │
   ├── Service
   │
   ├── Repository
   │
   └── Entity
   │
   ▼
MySQL Database