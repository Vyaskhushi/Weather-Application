
document.getElementById('searchForm').addEventListener('submit', function(e) {
e.preventDefault();

const trainNumber = document.getElementById('trainNumber').value;

fetchTrainData(trainNumber);
});

function fetchTrainData(trainNumber) {
const apiUrl = `https://indianrailapi.com/api/v2/TrainInformation/apikey/5067a22f2f886c7993b8ab934dcf6e8e/TrainNumber/${trainNumber}/`;

fetch(apiUrl)
.then(response => {
    if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
})
.then(data => displayResults(data))
.catch(error => {
    console.error('Error fetching train data:', error);
    document.getElementById('results').innerHTML = `<p>${error.message}</p>`;
});
}


function displayResults(data) {
const resultsDiv = document.getElementById('results');
resultsDiv.innerHTML = '';

if (data && data.Status === "SUCCESS") {
const table = `
    <table>
        <tr>
            <th>Train Number</th>
            <td>${data.TrainNo}</td>
        </tr>
        <tr>
            <th>Train Name</th>
            <td>${data.TrainName}</td>
        </tr>
        <tr>
            <th>Source Station Code</th>
            <td>${data.Source.Code}</td>
        </tr>
        <tr>
            <th>Source Arrival Time</th>
            <td>${data.Source.Arrival}</td>
        </tr>
        <tr>
            <th>Destination Station Code</th>
            <td>${data.Destination.Code}</td>
        </tr>
        <tr>
            <th>Destination Arrival Time</th>
            <td>${data.Destination.Arrival}</td>
        </tr>
    </table>
`;
resultsDiv.innerHTML = table;
} else {
resultsDiv.innerHTML = `<p>No results found or ${data.Message}</p>`;
}
}


