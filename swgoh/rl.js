window.onload = function () {
    if (localStorage) {
        populateform();
        var form = document.getElementById("form");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            saveData();
        });
    }
};

function saveData() {
    var user = document.getElementById("user").value.trim();
    var ac = document.getElementById("ac").value.trim();
    if (!/^\d{9}$/.test(ac)) {
        document.getElementById("duplicateMessage").innerHTML = "You put in a fake ally code. It must be 9 digits.";
        return;
    }
    var votes = JSON.parse(localStorage.getItem("votes")) || [];
    var isDuplicate = votes.some(vote => vote.username === user && vote.allyCode === ac);

    if (isDuplicate) {
        document.getElementById("duplicateMessage").innerHTML = "This vote has already been submitted.";
        return;
    } else {
        document.getElementById("duplicateMessage").innerHTML = "";  // Clear any previous message
    }
    votes.push({ username: user, allyCode: ac });
    localStorage.setItem("votes", JSON.stringify(votes));
    displayVotes(votes);
}
function populateform() {
    var user = document.getElementById("user");
    var ac = document.getElementById("ac");

    if (localStorage.getItem("user") !== null) {
        user.value = localStorage.getItem("user");
    }

    if (localStorage.getItem("ac") !== null) {
        ac.value = localStorage.getItem("ac");
    }
    var votes = JSON.parse(localStorage.getItem("votes")) || [];
    displayVotes(votes);
}

function displayVotes(votes) {
    var output = document.getElementById("output");
    output.innerHTML = "";
    var totalVotes = votes.length;
    document.getElementById("totalVotes").innerHTML = `Total Votes: ${totalVotes}`;

    if (totalVotes > 0) {
        output.innerHTML = "Votes:<br>";

        votes.forEach(function (vote, index) {
            output.innerHTML += `${index + 1}. ${vote.username} - ${vote.allyCode}<br>`;
        });
    } else {
        output.innerHTML = "No votes yet.";
    }
}