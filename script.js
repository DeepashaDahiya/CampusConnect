document.addEventListener("DOMContentLoaded", () => {
    // Dummy data for teammates and notifications
    const teammates = [
        { name: "Alice", skill: "React Developer" },
        { name: "Bob", skill: "Python Developer" },
        { name: "Charlie", skill: "UI/UX Designer" }
    ];

    const notifications = [
        "You have a new teammate request from Alice.",
        "Bob has commented on your project.",
        "Reminder: AI Ideathon registration ends tomorrow."
    ];

    // Load teammates into the list
    const teammatesList = document.getElementById('teammates-list');
    teammates.forEach(teammate => {
        const li = document.createElement('li');
        li.textContent = `${teammate.name} - ${teammate.skill}`;
        teammatesList.appendChild(li);
    });

    // Load notifications into the list
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = ''; // Clear placeholder text
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification;
        notificationsList.appendChild(li);
    });
});


// Handle project form submission
document.getElementById('project-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const projectTitle = document.getElementById('project-title').value;
    const projectDescription = document.getElementById('project-description').value;
    
    // Create project list item
    const li = document.createElement('li');
    li.innerHTML = `<strong>${projectTitle}</strong>: ${projectDescription}`;
    
    // Append project to the list
    document.getElementById('project-list').appendChild(li);
    
    // Clear form
    document.getElementById('project-form').reset();
});

// Handle teammate form submission
document.getElementById('teammate-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const skills = document.getElementById('skills').value;

    // Create teammate list item
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong> is skilled in: ${skills}`;

    // Append teammate request to the list
    document.getElementById('teammate-list').appendChild(li);

    // Clear form
    document.getElementById('teammate-form').reset();
});
