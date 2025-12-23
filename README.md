🎓 Event and Venue Management System

The Event and Venue Management System is a full-stack web application designed for colleges to streamline event organization, venue booking, and administrative approvals. It provides a clean, role-based interface for students, club leaders, and administrators, with a strong focus on usability, clarity, and scheduling transparency.

🧭 Purpose

The system digitizes and automates academic event and venue coordination, replacing manual approvals and fragmented communication with a structured, intuitive workflow.

Recent updates emphasize:

Cleaner data presentation

Reduced visual clutter

Faster decision-making for administrators

🧩 Key Features
🧑‍🎓 Student Role

View all approved and upcoming events.

See event details: name, date & time, venue, and organizer.

Read-only access (no modification privileges).

🪪 Login Credentials

Username: student  
Password: Student123

🧑‍💼 Club Leader Role

Create events and request venue bookings.

Edit or delete bookings before approval.

Track booking status clearly:

Pending

Approved

Rejected

Visual feedback for booking conflicts and availability.

🪪 Login Credentials

Username: Clubleader  
Password: Club123

👨‍💼 Admin Role

Review all venue booking requests in a single, modern approval table.

Approve or reject bookings with one click.

Quickly understand booking timelines and locations.

Clear visual distinction between requests.

🪪 Login Credentials

Username: admin  
Password: Admin123

⚙️ System Workflow

Student logs in → views approved & upcoming events.

Club Leader creates an event → requests a venue with a date range.

Admin reviews pending bookings:

Duration shown in a single column.

Venue displayed with building context.

Approved bookings become visible to all users.

🧱 Core Modules
1. Login & Authentication

Role-based login system.

UI rendered dynamically based on user role.

Credentials validated via backend /login API.

2. Event Management

Create, edit, and delete events (Club Leaders).

Event categorization:

Games

Sports

Arts

Workshop

Automatic event status calculation:

Upcoming

Ongoing

Completed

3. Venue Booking

Area-based venue selection (Main Block, KE Block, PG Block, Outdoor Areas).

Date-range validation prevents overlapping bookings.

Booking statuses clearly reflected in UI.

4. Venue Approval Dashboard (Admin) ✅ Updated

Recent UI Enhancements:

Single “Duration” column replaces separate From/To columns.

Example: 23 Dec 2025 → 25 Dec 2025

Venue displayed with building context:

Auditorium
KE Block


Cleaner table layout:

Reduced borders

Softer hover highlights

Improved spacing and readability

Pill-shaped action buttons for approve/reject actions.

No backend or database changes were required for these improvements.

5. Dashboard

Home Page routes users based on role.

Club Leader: Event management + venue booking.

Admin: Venue approval interface.

Student: Event viewing only.

🧰 Technology Stack
Layer	Technology
Frontend	HTML5, CSS3, Vanilla JavaScript
Backend	Node.js with Express.js
Database	SQLite
Server	Localhost / Node environment
Communication	REST APIs using fetch()

⚠️ No frontend frameworks (React, Vue, etc.) are used.
The project intentionally relies on plain HTML/CSS/JS for learning clarity.

🗄️ Database Schema
Table: events
Field	Type	Description
id	INTEGER (PK)	Unique event ID
name	TEXT	Event name
date	TEXT	Event date
time	TEXT	Event time
venue	TEXT	Venue name
organizer	TEXT	Organizing club
desc	TEXT	Event description
type	TEXT	Event category
Table: venues
Field	Type	Description
id	INTEGER (PK)	Unique booking ID
event_name	TEXT	Event name
club_name	TEXT	Club requesting booking
from_date	TEXT	Booking start date
to_date	TEXT	Booking end date
venue	TEXT	Requested venue
status	TEXT	Pending / Approved / Rejected

ℹ️ Building names are derived on the frontend using a mapping (no schema change).

🧩 Installation and Setup

Clone the repository

git clone https://github.com/your-username/event-venue-management.git
cd event-venue-management


Install dependencies

npm install express sqlite3 cors


Start backend

node server.js


Server runs at: http://localhost:3000

Run frontend

Open index.html in a browser.

Ensure requests to localhost:3000 are allowed.

🚀 Future Enhancements

Email / WhatsApp notifications for approvals.

Admin filters (by venue, date range, status).

Calendar-based booking view.

Database-driven user authentication.
