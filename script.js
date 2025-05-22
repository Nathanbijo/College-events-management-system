document.getElementById("eventForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    let id = document.getElementById("eventId").value;
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let desc = document.getElementById("desc").value;

    if (id) {
        // Edit existing event
        await fetch(`http://localhost:3000/edit-event/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, date, desc })
        });
        alert("Event updated!");
    } else {
        // Add new event
        await fetch("http://localhost:3000/add-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, date, desc })
        });
        alert("Event added!");
    }

    document.getElementById("eventForm").reset();
    document.getElementById("eventId").value = "";
    loadEvents();
});

async function loadEvents() {
    let response = await fetch("http://localhost:3000/events");
    let events = await response.json();
    let table = document.getElementById("eventTable");
    table.innerHTML = "<tr><th>Name</th><th>Date</th><th>Description</th><th>Actions</th></tr>";

    events.forEach(event => {
        table.innerHTML += `
            <tr>
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td>${event.desc}</td>
                <td>
                    <button onclick="editEvent(${event.id}, '${event.name}', '${event.date}', '${event.desc}')">Edit</button>
                    <button onclick="deleteEvent(${event.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editEvent(id, name, date, desc) {
    document.getElementById("eventId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("date").value = date;
    document.getElementById("desc").value = desc;
}

async function deleteEvent(id) {
    if (confirm("Are you sure you want to delete this event?")) {
        await fetch(`http://localhost:3000/delete-event/${id}`, { method: "DELETE" });
        alert("Event deleted!");
        loadEvents();
    }
}

loadEvents();
