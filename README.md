# 🏫 Student Institute Management System

A full-stack web application designed to efficiently manage all aspects of a learning institute. The system centralizes operations for tracking student progress, managing teaching staff, administering tests, and handling institute finances.

## 🎯 Project Overview

The Student Institute Management System is a comprehensive solution for educational institutes to manage their daily operations. The main goal is to manage a student institute and generate monthly progress reports for each student while handling accounting, teacher management, and academic tracking.

**Key Objectives:**
- Centralized management of students, teachers, and classes
- Automated monthly progress reporting with quiz percentage tracking
- Complete accounting management (student payments, teacher salaries, bills)
- Test administration and grade management

## ✨ Features

### 📚 Academic Management
- **Student Management**: Add, remove, edit, and view student profiles. Generate detailed monthly progress reports for each student.
- **Teacher Management**: Add, remove, edit, and manage teacher profiles. Link teachers with subjects and manage associated costs.
- **Subject Management**: Add, remove, edit, and organize subjects taught at the institute.
- **Class Management**: Create and manage classes by linking teachers with specific subjects.
- **Test & Assessment System**: Create and manage tests, register student marks, and link assessments to individual student reports. Includes quiz percentage tracking in monthly reports.

### 💰 Financial & Administrative Oversight
- **Accounting Module**: Track student payments, manage teacher salaries, and record institute bills.
- **Balance Overview**: View the institute's total financial balance at a glance.
- **Financial Reporting**: Generate reports on income, expenses, and overall financial health.

### 📊 Reporting & Analytics
- **Monthly Progress Reports**: Automated generation of detailed reports for each student.
- **Performance Analytics**: Track student performance across tests and subjects.
- **Institute Analytics**: Overview of institute operations, enrollment, and financial status.

## 🛠️ Tech Stack

This project is built with a modern, separated full-stack architecture:

### Frontend 
- **Framework/Library**: React
- **State Management**: Redux / Context API 
- **UI Components**: Tailwind CSS / custom CSS
- **HTTP Client**: Axios 
- **Routing**: React Router 
- **Build Tool**: Vite 

### Backend 
- **Framework**: ASP.NET Core / .NET 6
- **API Framework**: ASP.NET Web API
- **ORM**: Dapper
- **Authentication**: Identity
- **Validation**: FluentValidation 

### Database
- **Database**: Microsoft SQL Server
- **Stored Procedures**: TSQL scripts for complex operations
- **Database Tools**: SQL Server Management Studio 

### Development & Deployment
- **Version Control**: Git, GitHub
- **Package Management**: npm for frontend
- **Development Environment**: Visual Studio / VS Code
- **API Testing**:  Swagger 
- **Code Quality**: ESLint / Prettier for JS

### Architecture
- **Pattern**: Repository Pattern / Clean Architecture
- **API Design**: RESTful API
- **Frontend-Backend Communication**: HTTP/HTTPS, JSON


