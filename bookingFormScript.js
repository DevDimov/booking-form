var datePicker = document.getElementById("date");
var reservations = [];
document.body.onload = runOnLoad();

function runOnLoad() {
    var minDate = new Date();
    var maxDate = new Date();
    if (minDate.getDay() == 0 || minDate.getDay() == 6) {
        if (minDate.getHours() >= 17) {
            minDate.setDate(minDate.getDate() + 1);
        }
    }
    else {
        if (minDate.getHours() >= 19) {
            minDate.setDate(minDate.getDate() + 1);
        }
    }
    maxDate.setDate(minDate.getDate() + 14);
    datePicker.setAttribute("min", minDate.toISOString().split("T")[0]);
    datePicker.setAttribute("max", maxDate.toISOString().split("T")[0]);
    datePicker.addEventListener("input", updateTimeOptions);
}

function updateTimeOptions() {
    var timeOptions = document.getElementById("time");
    timeOptions.removeAttribute("disabled");
    var optionsCount = timeOptions.length;

    var dateInput = datePicker.value.split("-");
    var selectedDate = new Date(dateInput[0], dateInput[1]-1, dateInput[2]);
    var weekDay = selectedDate.getDay();

    var dateNow = new Date();
    var hourNow = dateNow.getHours();
    var bookingTime = hourNow + 1;
    var closeTime;
    
    if (selectedDate > dateNow) {
        if (weekDay == 0 || weekDay == 6) {
            bookingTime = 12;
            closeTime = 18;
        }
        else {
            bookingTime = 10;
            closeTime = 20;
        }
    }
    else {
        if (weekDay == 0 || weekDay == 6) {
            closeTime = 18;
            if (hourNow <= 12 && hourNow > 17) {
                bookingTime = 12;
            }
        }
        else {
            closeTime = 20;
            if (hourNow <= 10 && hourNow > 19) {
                bookingTime = 10;
            }
        }
    }
    for (i = 0; i < optionsCount; i++) {
        timeOptions.remove(0);
    }
    for (i = bookingTime; i < closeTime; i++) {
        var option = document.createElement("option");
        option.text = i + ":00";
        option.value = i.toString();
        timeOptions.add(option);
    }
}

function inputIsEmpty(inputField) {
    if (inputField.value.length == 0) {  	
        return true; 
    }
    else {
        return false; 
    }
}

function showLabel(label) {
    label.style.visibility = "visible";
}

function dateIsEmpty(date) {
    if (date.value == null) {  	
        return true; 
    }
    else {
        return false; 
    }
}

function submitForm() {
    var name = document.getElementById("full-name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var statusLabel = document.getElementById("form-status-label");

    if (inputIsEmpty(name) == true) {
        showLabel(statusLabel);
        statusLabel.innerHTML = "Please enter your name";
    }
    else if (inputIsEmpty(email) == true) {
        showLabel(statusLabel);
        statusLabel.innerHTML = "Please enter your email";
    }
    else if (hasAlreadyBooked(email.value)) {
        showLabel(statusLabel);
        statusLabel.innerHTML = "Sorry, a booking has already been made with this email";
    }
    else if (inputIsEmpty(phone) == true) {
        showLabel(statusLabel);
        statusLabel.innerHTML = "Please enter your phone number";
    }
    else if (phone.value.toString().length != 11) {
        showLabel(statusLabel);
        statusLabel.innerHTML = "Please enter a valid mobile number starting with 07";
    }
    else if (inputIsEmpty(datePicker) == true) {
        showLabel(statusLabel);
        statusLabel.innerHTML = "Please select a date";
    }
    else {
        var firstName = document.getElementById("full-name").value.split(" ")[0];
        
        var partySize = document.getElementById("party-size").value;
        if (partySize == "Larger party") {
            partySize = "a large group";
        }
        
        var calendarMonths = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var bookedMonth = parseInt(datePicker.value.split("-")[1]);
        var bookedDate = calendarMonths[bookedMonth] + " " + datePicker.value.split("-")[2];
        var bookedTime = document.getElementById("time").value + ":00";
        
        showLabel(statusLabel);
        statusLabel.innerHTML = "Hi " + firstName + ", you have successfully booked a table for " + partySize + " on " + bookedDate + " at " + bookedTime
                                + ". An email confirmation has been sent to " + email.value;
        
        reservations.push(email.value);
        resetForm();
    }
}

function hasAlreadyBooked(email) {
    for (i = 0; i < reservations.length; i++) {
        if (reservations[i] == email) {
            return true;
        }
    }
    return false;
}

function resetForm() {
    document.getElementById("full-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    datePicker.value = null;
    document.getElementById("time").disabled = true;
}