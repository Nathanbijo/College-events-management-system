const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let db = new sqlite3.Database("events.db");

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

app.post("/add-event", (req, res) => {
    let { name, date, time, venue, organizer, desc, type } = req.body;

    db.run("INSERT INTO events (name, date, time, venue, organizer, desc, type) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [name, date, time, venue, organizer, desc, type], function(err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to add event" });
        } else {
            res.json({ id: this.lastID });
        }
    });
});



// Login API (Simple authentication)
app.post("/login", (req, res) => {
    const users = {
        "student": "rajagiri123",
        "Clubleader": "rajagiri@123",
        "admin": "rajagiri"
    };

    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        res.json({ success: true, role: username });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});


// Get all events (for all users)
app.get("/events", (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
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

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
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
app.put("/edit-event/:id", (req, res) => {
    let { name, date, time, venue, organizer, desc, type } = req.body;
    let id = req.params.id;

    db.run(
        "UPDATE events SET name = ?, date = ?, time = ?, venue = ?, organizer = ?, desc = ?, type = ? WHERE id = ?",
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
async function editBooking(id, eventName, clubName, venue, fromDate, toDate) {
    document.getElementById("eventName").value = eventName;
    document.getElementById("clubName").value = clubName;
    document.getElementById("venueSelect").value = venue;
    document.getElementById("fromDate").value = fromDate;
    document.getElementById("toDate").value = toDate;

    await fetch(`http://localhost:3000/edit-booking/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_name: eventName, club_name: clubName, from_date: fromDate, to_date: toDate, venue })
    });

    alert("Booking updated!");
    loadVenues();
}

// Delete Event
app.delete("/delete-event/:id", (req, res) => {
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


async function deleteBooking(id) {
    if (confirm("Are you sure you want to delete this booking?")) {
        await fetch(`http://localhost:3000/delete-booking/${id}`, { method: "DELETE" });
        alert("Booking deleted!");
        loadVenues();
    }
}
