const API_url = 'https://projectattempt1a.onrender.com'; //Render URL 

var patientDataInput = document.getElementById('patient-data-input');

var patientDataView = document.getElementById('patient-data-view');

var patientDataForm = document.getElementById('patient-data-form');

var patientDataResponse = document.getElementById('patient-data-response');

var patientDataStored = document.getElementById('stored-patient-data');

var display_data_button = document.getElementById('display-data-button');

var return_button = document.getElementById('return-patient-input');


//handle data submitted by form and does the post request 

patientDataForm.addEventListener('submit', async(e) => {

    e.preventDefault(); //preventing default reload of webpage 

    var patientName = document.getElementById('name').value;
    var patientAge = parseInt(document.getElementById('age').value);
    var patientHeight = parseInt(document.getElementById('height').value);
    var patientGender = document.getElementById('gender').value;
    var patientWeight = parseInt(document.getElementById('weight').value);

    try{
        const response = await fetch(`${API_url}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },body: JSON.stringify({patientName,patientAge,patientHeight,patientGender,patientWeight})// these are inputs collected from the form so add accordingly 
        });
        const responseBody = await response.json();
        patientDataResponse.textContent = JSON.stringify(responseBody,null,5); //thes have to do with how many inputs we are taking in so increase count accordingly 
        patientDataForm.reset();

    } catch (err) {
        patientDataResponse.textContent = 'Error found: ' + err;
    }

});


//handle the get request to see that stored patient data 

display_data_button.addEventListener('click', async ()=> {
    try {
        const response = await fetch(`${API_url}/data`);

        const responseBody = await response.json();
        patientDataStored.textContent = JSON.stringify(responseBody, null, 5);
        patientDataInput.classList.remove('active');
        patientDataView.classList.add('active');
    } catch (err) {
        patientDataStored.textContent = 'Error found:' + err;
    }
});

// taking us back to the input patient data section 
return_button.addEventListener('click',() =>{
    patientDataView.classList.remove('active');
    patientDataInput.classList.add('active');
});