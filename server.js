const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");


const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

let dbPath = path.join(__dirname, "events.db");
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Failed to open DB:", err);
    else console.log(`Using database at ${dbPath}`);
});

// Create tables if not exists
db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY, 
    name TEXT, 
    date TEXT, 
    time TEXT, 
    venue TEXT, 
    organizer TEXT, 
    desc TEXT,
    type TEXT /* NEW COLUMN for event type */
)`);

db.run(`CREATE TABLE IF NOT EXISTS venues (
    id INTEGER PRIMARY KEY, 
    event_name TEXT, 
    club_name TEXT, 
    from_date TEXT, 
    to_date TEXT, 
    venue TEXT, 
    status TEXT DEFAULT 'Pending'
)`);

// CSS
app.use("/css", express.static(path.join(__dirname, "css")));

// Icons
app.use("/icons", express.static(path.join(__dirname, "frontend/icons")));
// Images used by frontend (backgrounds, etc.)
app.use("/images", express.static(path.join(__dirname, "frontend/images")));

/* =========================
   FRONTEND ROUTES (UniSync)
   ========================= */

const FRONTEND = path.join(__dirname, "frontend");

app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND, "index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(FRONTEND, "home.html"));
});

app.get("/events", (req, res) => {
  res.sendFile(path.join(FRONTEND, "events.html"));
});

app.get("/venues", (req, res) => {
  res.sendFile(path.join(FRONTEND, "venues.html"));
});

app.get("/approval", (req, res) => {
  res.sendFile(path.join(FRONTEND, "approval.html"));
});

app.post("/api/add-event", (req, res) => {
    let { name, date, time, venue, organizer, desc, type } = req.body;
    console.log("POST /api/add-event payload:", { name, date, time, venue, organizer, desc, type });

    // Quote the `desc` column name to avoid conflicts with SQL keywords
    const sql = 'INSERT INTO events (name, date, time, venue, organizer, "desc", type) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [name, date, time, venue, organizer, desc, type], function(err) {
        if (err) {
            console.error("DB Insert Error (/api/add-event):", err);
            return res.status(500).json({ error: "Failed to add event", details: err.message });
        }
        console.log("Event inserted with id", this.lastID);
        res.status(201).json({ id: this.lastID });
    });
});



// Login API (Simple authentication)
app.post("/login", (req, res) => {
    // accept credentials (case-insensitive username)
    const creds = {
        admin: "Admin123",
        student: "Student123",
        clubleader: "Club123"
    };

    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const uname = String(username).toLowerCase();
    console.log(`Login attempt for user: ${uname}`);
    if (creds[uname] && creds[uname] === password) {
        // return role names that frontend expects
        if (uname === 'clubleader') {
            console.log('Login success: Clubleader');
            return res.json({ success: true, role: 'Clubleader' });
        }
        console.log(`Login success: ${uname}`);
        return res.json({ success: true, role: uname });
    } else {
        console.log('Login failed for user:', uname);
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});


// Get all events (API)
app.get("/api/events", (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) {
            console.error("DB Read Error (/api/events):", err);
            return res.status(500).json({ error: "Failed to read events" });
        }
        res.json(rows);
    });
});



// Book Venue (Club Leader)
app.post("/book-venue", (req, res) => {
    let { event_name, club_name, from_date, to_date, venue } = req.body;
    db.run("INSERT INTO venues (event_name, club_name, from_date, to_date, venue) VALUES (?, ?, ?, ?, ?)",
        [event_name, club_name, from_date, to_date, venue], function() {
            res.json({ id: this.lastID });
        });
});

// Get Venue Bookings (For Admin)
app.get("/venue-bookings", (req, res) => {
    db.all("SELECT * FROM venues", [], (err, rows) => {
        res.json(rows);
    });
});

// Approve/Reject Venue (Admin)
app.put("/update-venue-status/:id", (req, res) => {
    let { status } = req.body;
    let id = req.params.id;
    db.run("UPDATE venues SET status = ? WHERE id = ?", [status, id], function() {
        res.sendStatus(200);
    });
});
// Edit Booking
app.put("/edit-booking/:id", (req, res) => {
    let { event_name, club_name, from_date, to_date, venue } = req.body;
    let id = req.params.id;
    db.run(
        "UPDATE venues SET event_name = ?, club_name = ?, from_date = ?, to_date = ?, venue = ? WHERE id = ?",
        [event_name, club_name, from_date, to_date, venue, id],
        function () {
            res.sendStatus(200);
        }
    );
});
app.put("/api/edit-event/:id", (req, res) => {
    let { name, date, time, venue, organizer, desc, type } = req.body;
    let id = req.params.id;

    db.run(
        'UPDATE events SET name = ?, date = ?, time = ?, venue = ?, organizer = ?, "desc" = ?, type = ? WHERE id = ?',
        [name, date, time, venue, organizer, desc, type, id],
        function (err) {
            if (err) {
                console.error("Database Update Error:", err);
                res.status(500).json({ error: "Failed to update event" });
            } else {
                res.sendStatus(200);
            }
        }
    );
});


// Delete Booking
app.delete("/delete-booking/:id", (req, res) => {
    let id = req.params.id;
    db.run("DELETE FROM venues WHERE id = ?", [id], function () {
        res.sendStatus(200);
    });
});

// Delete Event
app.delete("/api/delete-event/:id", (req, res) => {
    let id = req.params.id;
    db.run("DELETE FROM events WHERE id = ?", [id], function(err) {
        if (err) {
            console.error("Error deleting event:", err);
            res.status(500).json({ error: "Failed to delete event" });
        } else {
            res.sendStatus(200);
        }
    });
});


// Client-side helper functions were previously embedded here by mistake and removed.
app.listen(PORT, () => {
  console.log(`✅ UniSync running at http://localhost:${PORT}`);
});