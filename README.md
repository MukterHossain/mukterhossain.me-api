# 🌐 Personal Portfolio Website API

A full-stack **portfolio website** built with **Next.js**, **Express.js**, **Node.js**, **Typescript** and **Prisma**, designed to showcase blog, projects, and personal information — with a secure owner dashboard for content management.

--

## 📁 Project Overview

This portfolio project is a dynamic, full-stack web application with **public-facing sections** for visitors and **private dashboard** for the site owner. It allows the owner to manage blogs and projects easily, while showcasing professional details to the public.

### ✨ Key Features

- 🔐 **Authentication & Authorization** - JWT-based secure login for owner access.
- 📊 **Dashboard** - Owner-only dashboard to manage blogs and projects.
- 📝 **Blog Management** - Create, read, update, and delete (CRUD).
- 📝 **Project Management** - Create, read, update, and delete (CRUD).
- ✅ **Strict Error Handling** - Validation, API errors.


--

## 🧰 Tech Stack

### **Frontend**
- [Next.js](https://nextjs.org/) - React-based framework for SSR/SSG/ISR
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS for styling.
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications.
- TypeScript - Strongly type JavaScript for safer code

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### **Backend**
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) - REST API backend
- [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://www.prisma.io/) - Database ORM
- [JWT](https://jwt.io/) + [bcryptjs](https://www.npmjs.com/package/bcrypt) - Authentication and password hashing

--

## ⚙️ Backend Setup (Expres + Prisma)
```bash
Clone the Repository
-git clone https://github.com/MukterHossain/mukterhossain.me-api.git
cd mukterhossain.me-api
```
* Install Dependencies
```
bash
npm install
```

* Create a **.env** file:
```
PORT="5000"
NODE_ENV="development"

DATABASE_URL="postgresql://username:password@localhost:5432/DBName?schema=public"

# BCRYPT
BCRYPT_SALT_ROUND=10

# OWNER
OWNER_EMAIL=your_email@example.com
OWNER_PASSWORD=userPassword
OWNER_PHONE=userPhone
OWNER_IMAGE=userImage

# Jwt
JWT_ACCESS_SECRET=secret
JWT_ACCESS_EXPIRE=date
```
* Run Prisma migrations and seed Admin/Owner user:
```
bash
npx prisma migrate dev
npx prisma db seed
```


* Install Dependencies:
``` 
bash
npm install
```
- The backend will run at: http://localhost:5000




## ⚙️ Frontend Setup (Next.js)
* Clone the Repository
```bash

git clone https://github.com/MukterHossain/mukterhossain.me-ui.git

```
* Navigate to backend folter
```
cd mukterhossain.me-ui
```
* Install Dependencies
```
bash
npm install
```

* Create a **.env.local** file:
```
NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
AUTH_SECRET=secret
```
- The backend will run at: http://localhost:3000

### Required Command
| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start development server     |
| `npm run build`     | Build project for production |
| `npm start`         | Start production server      |
| `npx prisma studio` | Open Prisma database UI      |
