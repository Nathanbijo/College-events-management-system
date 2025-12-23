# 🎓 Event and Venue Management System

The **Event and Venue Management System** is a full-stack web application designed for colleges to streamline **event organization**, **venue booking**, and **administrative approvals**. It provides a simple, role-based login system that allows **students**, **club leaders**, and **administrators** to collaborate effectively while ensuring smooth scheduling and transparency.

---

## 🧭 Purpose

The goal of the system is to **digitize and automate event management** within an academic environment. It minimizes manual coordination by introducing structured event creation, venue request, and approval workflows.

---

## 🧩 Key Features

### 🧑‍🎓 **Student Role**

* View all upcoming and approved events.
* Access detailed event information (name, date, time, venue, and organizer).
* Read-only access for event viewing.

🪪 **Login Credentials:**

```
Username: student  
Password: Student123
```

---

### 🧑‍💼 **Club Leader Role**

* Create new events and request venue bookings.
* Edit or delete their own events prior to admin approval.
* Track booking status: *Pending*, *Approved*, or *Rejected*.

🪪 **Login Credentials:**

```
Username: Clubleader  
Password: Club123
```

---

### 👨‍💼 **Admin Role**

* View and approve or reject venue booking requests.
* Manage overall venue availability.
* Access and manage the event list for administrative oversight.

🪪 **Login Credentials:**

```
Username: admin  
Password: Admin123
```

---

## ⚙️ System Workflow

1. **Student** logs in to view upcoming events.
2. **Club Leader** submits a new event and requests a venue booking.
3. **Admin** reviews pending requests and approves or rejects them.
4. Approved events automatically become visible to all users.

---

## 🧱 Core Modules

### 1. **Login & Authentication**

* Secure login page with three distinct user roles.
* Role-based UI rendering after login.
* Credentials validated through backend API (`/login` endpoint).

### 2. **Event Management**

* Club Leaders can create, edit, and delete events.
* Events are categorized by type (*Games*, *Sports*, *Arts*, *Workshop*).
* Automatic status display: *Upcoming*, *Ongoing*, *Completed*.

### 3. **Venue Booking**

* Interactive venue selection with area-based filtering.
* Date range validation ensures no overlapping bookings.
* Admin can approve or reject bookings directly through a dedicated interface.

### 4. **Dashboard**

* **Home Page:** Role-based redirection to correct module (Admin, Club Leader, Student).
* **Club Leader:** Access to venue booking and event management.
* **Admin:** Venue approval dashboard.
* **Student:** View-only events page.

---

## 🧰 Technology Stack

| Layer             | Technology                           |
| ----------------- | ------------------------------------ |
| **Frontend**      | HTML5, CSS3, JavaScript              |
| **Backend**       | Node.js with Express.js              |
| **Database**      | SQLite                               |
| **Server**        | Localhost / XAMPP / Node environment |
| **Communication** | REST APIs with `fetch()`             |

---

## 🗄️ Database Schema

### **Table: events**

| Field     | Type         | Description                                 |
| --------- | ------------ | ------------------------------------------- |
| id        | INTEGER (PK) | Unique event ID                             |
| name      | TEXT         | Event name                                  |
| date      | TEXT         | Date of event                               |
| time      | TEXT         | Event time                                  |
| venue     | TEXT         | Venue name                                  |
| organizer | TEXT         | Organizing club                             |
| desc      | TEXT         | Event description                           |
| type      | TEXT         | Event category (Games/Sports/Arts/Workshop) |

### **Table: venues**

| Field      | Type         | Description                                        |
| ---------- | ------------ | -------------------------------------------------- |
| id         | INTEGER (PK) | Unique booking ID                                  |
| event_name | TEXT         | Event name                                         |
| club_name  | TEXT         | Club requesting booking                            |
| from_date  | TEXT         | Booking start date                                 |
| to_date    | TEXT         | Booking end date                                   |
| venue      | TEXT         | Requested venue                                    |
| status     | TEXT         | Booking status (*Pending*, *Approved*, *Rejected*) |

---

## 🧩 Installation and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/event-venue-management.git
   cd event-venue-management
   ```

2. **Install dependencies**

   ```bash
   npm install express sqlite3 cors
   ```

3. **Start the backend server**

   ```bash
   node server.js
   ```

   * The server runs on: **[http://localhost:3000](http://localhost:3000)**

4. **Run the frontend**

   * Open `index.html` in your browser.
   * Ensure your browser allows requests to `http://localhost:3000`.

---

## 💻 Usage Guide

1. **Login**

   * Use provided credentials to access different user dashboards.

2. **Club Leader Dashboard**

   * Go to “Book Venue” to submit venue requests.
   * Manage events in “Manage Events” section.

3. **Admin Dashboard**

   * Navigate to “Approve Venues” to manage booking requests.

4. **Student Dashboard**

   * View all approved and upcoming events.

---

## 🚀 Future Enhancements

* Email / SMS notifications for approvals.
* Calendar-based venue availability visualization.
* Search and filtering system for events.
* Multi-user authentication with database-stored credentials.
* Improved UI with responsive design.

---
