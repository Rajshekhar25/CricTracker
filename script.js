document.addEventListener('DOMContentLoaded', () => {
    // API details
    // const apiKey = '0a132ef8c7mshfc63cc875df757fp1dbdb3jsn4ad3941f77d4';
    const apiKey = 'c99bf3b5fcmsh78bf7999ec5b408p19fb4bjsn76999f05c7d5'; 
    // const apiHost = 'cricbuzz-cricket.p.rapidapi.com';
    const apiUrl = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent'; 

    // Function to fetch recent matches
    const fetchRecentMatches = async () => {
        try {
            const response = await fetch(`https://${apiHost}/matches/v1/recent`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost
                }
            });
            const data = await response.json();
            displayRecentMatches(data.matches);
        } catch (error) {
            console.error('Error fetching recent matches:', error);
        }
    };

    // Function to display recent matches
    const displayRecentMatches = (matches) => {
        const cardsContainer = document.querySelector('.cards');
        cardsContainer.innerHTML = ''; // Clear existing cards

        matches.forEach(match => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h2>${match.team1} vs ${match.team2}</h2>
                <p>${match.matchDescription}</p>
                <button onclick="viewDetails(${match.matchId})">View Details</button>
            `;
            cardsContainer.appendChild(card);
        });
    };

    // Function to fetch and display team details
    window.viewDetails = async (matchId) => {
        try {
            const response = await fetch(`https://${apiHost}/matches/v1/${matchId}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost
                }
            });
            const data = await response.json();
            localStorage.setItem('selectedMatch', JSON.stringify(data));
            window.location.href = 'team-details.html';
        } catch (error) {
            console.error('Error fetching match details:', error);
        }
    };

    // Function to display team details on team-details.html
    const displayTeamDetails = () => {
        const match = JSON.parse(localStorage.getItem('selectedMatch'));
        if (match) {
            const teamInfoContainer = document.querySelector('.team-info');
            teamInfoContainer.innerHTML = `
                <h2>${match.team1.name}</h2>
                <p>${match.team1.shortName}</p>
                <h2>${match.team2.name}</h2>
                <p>${match.team2.shortName}</p>
            `;
        }
    };

    // Call fetchRecentMatches on the home page
    if (document.body.classList.contains('home')) {
        fetchRecentMatches();
    }

    // Call displayTeamDetails on the team details page
    if (document.body.classList.contains('team-details')) {
        displayTeamDetails();
    }
});


