document.addEventListener('DOMContentLoaded', () => {
    // API details
    
    const apiKey = '<your_API_key>';
    const apiHost = 'cricbuzz-cricket.p.rapidapi.com';

    //  const apiKey = 'c99bf3b5fcmsh78bf7999ec5b408p19fb4bjsn76999f05c7d5'; 
    // const apiUrl = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent'; 

     // const fetchRecentMatches = async () => {
     //    try
        
     //    {
     //        response = await fetch(`https://${apiHost}/vrecent/v1`, {
     //            method: 'GET',
     //            headers: {
     //                'X-RapidAPI-Key': apiKey,
     //                'X-RapidAPI


    
   
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

    if (document.body.classList.contains('home')) {
        fetchRecentMatches();
    }

    if (document.body.classList.contains('team-details')) {
        displayTeamDetails();


        //   if (document.body.clas.contains('teamdetails')) {
        // Team();Details
    }
});


