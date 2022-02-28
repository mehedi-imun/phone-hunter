// get input search input value and dynamic url function 
const getPhone = () => {
    const inputField = document.getElementById('search-input').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
    document.getElementById('search-input').value = '';

}

// display phone function 
const displayPhone = (phones) => {
    // search input error handle 
    if (phones.length == 0) {
        document.getElementById('input-error').style.display = "block"
    }

    else {
        document.getElementById('input-error').style.display = "none"
        const phonesDiv = document.getElementById('phones');
        // remove old search result
        phonesDiv.textContent = ''

        // get every phone by forEach 
        phones?.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div')
            // add class div 
            div.classList.add("col-12", "col-lg-4")
            div.innerHTML = `
                        <div class="card border-0 shadow p-3 rounded mx-auto" style="width:20rem">
                        <img src="${phone.image}" class="card-img-top" alt="..." />
                            <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">${phone.brand} </p>
                            <button onclick="getId('${phone.slug}')" class="btn btn-primary">see more</button>
                            </div>
                        </div>
                        `;
            phonesDiv.appendChild(div)

        })
    }


};

const getId = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))

};

const displayDetails = (product) => {
    const detailsDiv = document.getElementById('show-details');
    detailsDiv.textContent = ''
    const div = document.createElement('div');
    div.classList.add("row", "shadow")
    div.innerHTML = `
    <div class="p-3  col-6 ">
        <h3 class="card-text">${product.name} </h3>
        <h5 class="text-danger">${product.releaseDate}</h5>
        <h4 class="card-text">${product.brand} </h4>
        <img src="${product.image}" class="card-img-top" alt=""/>
    </div>
    <div class=" p-3 col-6 ">
         <ul class="list-group">
            <h3 class="text-center text-info">Main Features</h3>
            <li class="list-group-item"><h6 class="card-text">ChipSet: ${product.mainFeatures.chipSet} </h6></li>
            <li class="list-group-item"><h6 class="card-text">Display: ${product.mainFeatures.displaySize} </h6></li>
            <li class="list-group-item"><h6 class="card-text">Memory: ${product.mainFeatures.memory} </h6></li>
         </ul>
         
         <ul class="list-group">
            <h3 class="text-center text-info">Sensor Information</h3>
            <li class="list-group-item"><h6 class="card-text">${product.mainFeatures.sensors[0]} </h6></li>
            <li class="list-group-item"><h6 class="card-text">${product.mainFeatures.sensors[1]} </h6></li>
            <li class="list-group-item"><h6 class="card-text">${product.mainFeatures.sensors[2]} </h6></li>
            <li class="list-group-item"><h6 class="card-text">${product.mainFeatures.sensors[3]} </h6></li>
            <li class="list-group-item"><h6 class="card-text">${product.mainFeatures.sensors[4]} </h6></li>
            <li class="list-group-item"><h6 class="card-text">${product.mainFeatures.sensors[5]} </h6></li>
         </ul>

         <ul class="list-group">
            <h3 class="text-center text-info"> Others Information </h3>
            <li class="list-group-item"><h6 class="card-text">Bluetooth: ${product.others?.Bluetooth} </h6></li>
            <li class="list-group-item"><h6 class="card-text">GPS: ${product.others?.GPS} </h6></li>
            <li class="list-group-item"><h6 class="card-text">Radio: ${product.others?.Radio} </h6></li>
            <li class="list-group-item"><h6 class="card-text">USB: ${product.others?.USB} </h6></li>
            <li class="list-group-item"><h6 class="card-text">WLAN: ${product.others?.WLAN} </h6></li>
         </ul>
    </div>
    `;
    detailsDiv.appendChild(div)
}