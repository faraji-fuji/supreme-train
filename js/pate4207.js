function initialize() {
    setHeader();
    fetchProvinces();
}

function fetchProvinces() {
    // Fetch provinces data from provinces.json
    fetch('data/provinces.json')
        .then((response) => response.json())
        .then((data) => {
            const provinceList = document.getElementById('province-list');
            data.provinces.forEach((province) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <a href="pages/province.html?province=${province.name}">
                        <img src="images/${province.flag}" alt="${province.name} Flag">
                        ${province.name}
                    </a>
                `;
                provinceList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching provinces data:', error);
        });
}

function setHeader() {
    const fullName = "Rudra Patel"
    const homeCountry = "India"

    const header = document.getElementById('main-header');
    header.innerHTML = `Fall 2023 Assignment #2 for ${fullName} from ${homeCountry}`;
}
