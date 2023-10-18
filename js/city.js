function initialize() {
    setHeader();

    // Fetch city details when the page loads
    fetchCityDetails();

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function () {
        window.history.back();
    });
}

function fetchCityDetails() {
    // Extract the selected city name from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCity = urlParams.get('city');

    // Fetch city details from cities.json
    fetch('../data/cities.json')
        .then((response) => response.json())
        .then((data) => {
            const cityDetails = data.cities.find((city) => city.name === selectedCity);
            if (cityDetails) {
                // Populate the page with city details
                const cityDetailsDiv = document.getElementById('city-details');
                cityDetailsDiv.innerHTML = `
                    <h3>${cityDetails.name}</h3>
                    <p>${cityDetails.description}</p>
                    <h4>Top Colleges/Universities:</h4>
                    <ul>
                        ${cityDetails.colleges.map((college) => `<li>${college}</li>`).join('')}
                    </ul>
                `;

                // Fetch a random activity using the Fetch API
                fetch('https://www.boredapi.com/api/activity')
                    .then((response) => response.json())
                    .then((activityData) => {
                        const activity = activityData.activity;
                        cityDetailsDiv.innerHTML += `
                            <h4>Random Fun Activity:</h4>
                            <p>${activity}</p>
                        `;
                    })
                    .catch((error) => {
                        console.error('Error fetching random activity:', error);
                    });

                // Fetch a list of holidays in the province using XMLHttpRequest
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://date.nager.at/api/v2/publicholidays/2020/CA', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const holidaysData = JSON.parse(xhr.responseText);
                        const holidays = holidaysData.map((holiday) => holiday.localName);
                        cityDetailsDiv.innerHTML += `
                            <h4>Holidays in the Province:</h4>
                            <ul>
                                ${holidays.map((holiday) => `<li>${holiday}</li>`).join('')}
                            </ul>
                        `;
                    } else if (xhr.status !== 200) {
                        console.error('Error fetching holidays data:', xhr.status);
                    }
                };
                xhr.send();
            } else {
                console.error('City details not found');
            }
        })
        .catch((error) => {
            console.error('Error fetching city details:', error);
        });
}


function setHeader() {
    const fullName = "Rudra Patel"
    const homeCountry = "India"

    const header = document.getElementById('main-header');
    header.innerHTML = `Fall 2023 Assignment #2 for ${fullName} from ${homeCountry}`;
}