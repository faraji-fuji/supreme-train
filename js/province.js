function initialize() {
    setHeader();
    // Fetch province details when the page loads
    fetchProvinceDetails();

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function () {
        window.history.back();
    });
}

function fetchProvinceDetails() {
    // Extract the selected province name from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedProvince = urlParams.get('province');

    // Fetch province details from provinces.json
    fetch('../data/provinces.json')
        .then((response) => response.json())
        .then((data) => {
            const provinceDetails = data.provinces.find((province) => province.name === selectedProvince);
            if (provinceDetails) {
                // Populate the page with province details
                const provinceDetailsDiv = document.getElementById('province-details');
                provinceDetailsDiv.innerHTML = `
                    <h3>${provinceDetails.name}</h3>
                    <img src="../images/${provinceDetails.flag}" alt="${provinceDetails.name} Flag">
                    <p>${provinceDetails.description}</p>
                    <h4>Major Cities:</h4>
                    <ul>
                        ${provinceDetails.cities.map((city) => `<li><a href="city.html?city=${city}">${city}</a> </li>`).join('')}
                    </ul>
                `;
            } else {
                console.error('Province details not found');
            }
        })
        .catch((error) => {
            console.error('Error fetching province details:', error);
        });
}

function setHeader() {
    const fullName = "Rudra Patel"
    const homeCountry = "India"

    const header = document.getElementById('main-header');
    header.innerHTML = `Fall 2023 Assignment #2 for ${fullName} from ${homeCountry}`;
}
