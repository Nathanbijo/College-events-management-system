---

## 🎓 Event and Venue Management System

The **Event and Venue Management System** is a full-stack web application designed to **digitize and streamline event organization and venue allocation** within academic institutions. The system enables structured collaboration between students, club leaders, and administrators through **role-based workflows**, ensuring transparent scheduling, controlled approvals, and efficient venue utilization.

The platform replaces manual coordination with a centralized system for **event creation, venue booking, approval management, and event visibility**, reducing conflicts and administrative overhead.

---

## 🧠 Project Overview

In college environments, event planning and venue booking are often handled manually through informal communication channels, leading to:

* Scheduling conflicts and double bookings
* Lack of approval traceability
* Poor visibility of upcoming events
* Administrative overhead and delays

The Event and Venue Management System addresses these issues by introducing **clearly defined roles, approval pipelines, and structured data management**, allowing events and venues to be managed in a reliable and auditable manner.

---

## ❓ Motivation and Problem Statement

Academic institutions frequently face the following challenges:

* No centralized system for event and venue coordination
* Manual approval processes prone to delays and miscommunication
* Difficulty tracking venue availability across dates
* Limited transparency for students regarding approved events

This system provides a systematic solution by offering:

* Digitized event creation and venue request workflows
* Role-based access control and approval mechanisms
* Conflict-free venue booking with validation logic
* Centralized visibility of approved and upcoming events

---

## 🚀 Key Functional Features

### 1. Role-Based Access System

The system supports three distinct user roles, each with clearly defined responsibilities:

#### 🧑‍🎓 Student

* View all approved and upcoming events
* Access event details including date, time, venue, and organizer
* Read-only access to ensure data integrity

#### 🧑‍💼 Club Leader

* Create and manage events
* Submit venue booking requests for events
* Edit or delete events prior to administrative approval
* Track booking status (*Pending*, *Approved*, *Rejected*)

#### 👨‍💼 Administrator

* Review and approve or reject venue booking requests
* Manage overall venue availability
* Maintain administrative oversight of events and bookings

---

### 2. Secure Authentication & Authorization

* Centralized login system with role-based redirection
* Backend validation of credentials via REST API endpoints
* UI rendering based on authenticated user role
* Controlled access to protected routes and features

---

### 3. Event Management

* Club leaders can create, update, and remove events
* Events categorized by type (*Games*, *Sports*, *Arts*, *Workshop*)
* Automatic event status classification (*Upcoming*, *Ongoing*, *Completed*)
* Structured storage of event metadata for consistency

---

### 4. Venue Booking & Approval Workflow

* Interactive venue selection with area-based filtering
* Date-range validation to prevent overlapping bookings
* Admin-controlled approval or rejection of venue requests
* Status-driven visibility of events across user dashboards

---

### 5. Dashboard & User Interfaces

* **Student Dashboard:** View-only access to approved events
* **Club Leader Dashboard:** Event management and venue booking
* **Admin Dashboard:** Centralized venue approval and oversight panel
* Role-based navigation and workflow isolation

---

## 🧩 System Workflow (High-Level Process Flow)

Student Views Approved Events
  ↓
Club Leader Creates Event & Requests Venue
  ↓
Admin Reviews Booking Request
  ↓
Approval / Rejection Decision
  ↓
Approved Events Become Publicly Visible

---

## 🏗️ System Architecture

```
┌────────────────────────────┐
│        Frontend UI         │
│   (HTML, CSS, JavaScript)  │
└────────────┬───────────────┘
             │
┌────────────▼───────────────┐
│      Express Backend       │
│   (REST APIs & Logic)      │
└────────────┬───────────────┘
             │
        ┌────▼────┐
        │ SQLite  │
        │Database │
        └─────────┘
```

---

## 🧰 Technologies Employed

| System Layer  | Technology                   |
| ------------- | ---------------------------- |
| Frontend      | HTML5, CSS3, JavaScript      |
| Backend       | Node.js, Express.js          |
| Database      | SQLite                       |
| Communication | REST APIs (`fetch`)          |
| Deployment    | Localhost / Node Environment |

---

## 🗄️ Database Schema

### **Table: events**

| Field     | Type         | Description             |
| --------- | ------------ | ----------------------- |
| id        | INTEGER (PK) | Unique event identifier |
| name      | TEXT         | Event name              |
| date      | TEXT         | Event date              |
| time      | TEXT         | Event time              |
| venue     | TEXT         | Venue name              |
| organizer | TEXT         | Organizing club         |
| desc      | TEXT         | Event description       |
| type      | TEXT         | Event category          |

---

### **Table: venues**

| Field      | Type         | Description                                  |
| ---------- | ------------ | -------------------------------------------- |
| id         | INTEGER (PK) | Unique booking identifier                    |
| event_name | TEXT         | Associated event                             |
| club_name  | TEXT         | Requesting club                              |
| from_date  | TEXT         | Booking start date                           |
| to_date    | TEXT         | Booking end date                             |
| venue      | TEXT         | Requested venue                              |
| status     | TEXT         | Booking status (*Pending/Approved/Rejected*) |

---

## ⚙️ Deployment and Setup Instructions

### Prerequisites

* Node.js
* npm

### Execution

```bash
git clone https://github.com/your-username/event-venue-management.git
cd event-venue-management
npm install express sqlite3 cors
node server.js
```

* Backend runs on: **[http://localhost:3000](http://localhost:3000)**
* Frontend served via `index.html`

---

## 💡 Demonstration Workflow

* User logs in with role-based credentials
* Club leader creates an event and submits a venue request
* Admin reviews and approves/rejects the request
* Approved events become visible to all students

---

## 🚀 Future Enhancements

* Email / SMS notifications for approvals
* Calendar-based venue availability visualization
* Advanced event search and filtering
* Persistent multi-user authentication
* Responsive UI improvements

---

## 👨‍💻 Development Team

**Event & Venue Management System Developers**
An academic project focused on **role-based system design, workflow automation, and structured data management**.

© 2025 — All Rights Reserved

---
