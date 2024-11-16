document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user') || 'currentUser'; // Replace 'currentUser' with actual logic

    const profilePhoto = document.getElementById('profile-photo');
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const profileInterests = document.getElementById('profile-interests');
    const profileSkills = document.getElementById('profile-skills');
    const profileProjects = document.getElementById('profile-projects');
    const profileAvailability = document.getElementById('profile-availability');
    const profileLinkedIn = document.getElementById('profile-linkedin');
    const profileGitHub = document.getElementById('profile-github');

    const editForm = document.getElementById('edit-profile-form');

    // Fetch user profile data from backend
    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/profile/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const profile = await response.json();

            // Populate profile details
            profilePhoto.src = profile.photo || 'default-profile.png';
            profileName.textContent = profile.name || 'Unnamed User';
            profileBio.textContent = profile.bio || 'No bio available.';
            profileInterests.textContent = profile.interests.join(', ') || 'None';
            profileSkills.textContent = profile.skills.join(', ') || 'None';
            profileProjects.textContent = profile.projects.join(', ') || 'None';
            profileAvailability.textContent = profile.availability || 'Not specified';
            profileLinkedIn.href = profile.linkedin || '#';
            profileGitHub.href = profile.github || '#';
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // Populate edit form with current profile data
    const populateEditForm = async () => {
        try {
            const response = await fetch(`/api/profile/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const profile = await response.json();

            document.getElementById('edit-name').value = profile.name || '';
            document.getElementById('edit-photo').value = profile.photo || '';
            document.getElementById('edit-bio').value = profile.bio || '';
            document.getElementById('edit-interests').value = profile.interests.join(', ') || '';
            document.getElementById('edit-skills').value = profile.skills.join(', ') || '';
            document.getElementById('edit-projects').value = profile.projects.join(', ') || '';
            document.getElementById('edit-availability').value = profile.availability || '';
            document.getElementById('edit-linkedin').value = profile.linkedin || '';
            document.getElementById('edit-github').value = profile.github || '';
        } catch (error) {
            console.error('Error populating edit form:', error);
        }
    };

    // Handle form submission to update profile
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedProfile = {
            name: document.getElementById('edit-name').value.trim(),
            photo: document.getElementById('edit-photo').value.trim(),
            bio: document.getElementById('edit-bio').value.trim(),
            interests: document.getElementById('edit-interests').value.split(',').map(s => s.trim()),
            skills: document.getElementById('edit-skills').value.split(',').map(s => s.trim()),
            projects: document.getElementById('edit-projects').value.split(',').map(s => s.trim()),
            availability: document.getElementById('edit-availability').value.trim(),
            linkedin: document.getElementById('edit-linkedin').value.trim(),
            github: document.getElementById('edit-github').value.trim(),
        };

        try {
            const response = await fetch(`/api/profile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            // Refresh profile data
            fetchProfile();
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    });

    // Initialize profile page
    fetchProfile();
    populateEditForm();
});
