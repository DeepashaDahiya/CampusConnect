document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('teammate-search-form');
    const resultsList = document.getElementById('teammate-results-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const skill = document.getElementById('skill').value.trim();
        const interest = document.getElementById('interest').value.trim();
        const projectType = document.getElementById('project-type').value;

        // Build query parameters
        let query = '?';
        if (skill) query += `skill=${encodeURIComponent(skill)}&`;
        if (interest) query += `interest=${encodeURIComponent(interest)}&`;
        if (projectType) query += `projectType=${encodeURIComponent(projectType)}&`;

        // Fetch data from backend API
        try {
            const response = await fetch(`/api/teammates${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const teammates = await response.json();

            // Clear previous results
            resultsList.innerHTML = '';

            if (teammates.length === 0) {
                resultsList.innerHTML = '<li>No teammates found matching your criteria.</li>';
                return;
            }

            // Populate results
            teammates.forEach(teammate => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${teammate.name}</strong> - ${teammate.skill}<br>
                    <em>${teammate.interest}</em><br>
                    <a href="profile.html?user=${teammate.id}">View Profile</a>
                `;
                resultsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching teammates:', error);
            resultsList.innerHTML = '<li>Error fetching teammates. Please try again later.</li>';
        }
    });
});
