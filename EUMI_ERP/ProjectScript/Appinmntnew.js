// 1. REPLACE: initFirebaseAndAuth() -> Not needed in MVC, removed.
// 2. REPLACE: listenForBookings() -> fetchBookedSlots()

/**
 * Fetch Booked Slots from .NET Controller
 * Call this inside renderTimeSlots() or whenever Day/Doctor changes
 */
function fetchBookedSlots() {
    if (!selectedDoctor || !selectedDay) return;

    // Show loading state if needed
    $('#timeSlotsContainer').css('opacity', '0.5');

    $.ajax({
        url: '/Appointments/GetBookedSlots', // Matches Controller Action
        type: 'GET',
        data: {
            doctorId: selectedDoctor,
            date: selectedDay
        },
        success: function (data) {
            // Update the global bookings array with data from SQL
            // Map the SQL columns to the format the frontend expects
            bookings = data.map(item => ({
                doctorId: selectedDoctor,
                date: selectedDay,
                time: item.time,
                patientName: item.patientName,
                patientPhone: item.patientPhone,
                mrNumber: item.mrNumber
            }));

            // Refresh the UI
            renderTimeSlots();
            $('#timeSlotsContainer').css('opacity', '1');
        },
        error: function (err) {
            console.error('Error fetching slots:', err);
            $('#timeSlotsContainer').css('opacity', '1');
        }
    });
}

/**
 * Submit Booking to .NET Controller
 * REPLACE the existing submitPatientDetails function content with this:
 */
window.submitPatientDetails = function () {
    if (!selectedDoctor || !selectedDay || !selectedTime) {
        alert("Please select a doctor, date, and time.");
        return;
    }

    const patientName = document.getElementById('AppFirst').value;
    const patientPhone = document.getElementById('MobileNo').value;

    if (!patientName || !patientPhone) {
        alert("Please fill in First Name and Contact No.");
        return;
    }

    const confirmBtn = document.getElementById('saveBtn');
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Saving...';

    // Construct the object matching C# Appointment Model
    const appointmentData = {
        FirstName: patientName,
        LastName: document.getElementById('AppLast').value, // MR No
        DOB: document.getElementById('PDOB').value || null,
        Department: document.getElementById('txt_docdeptname').value,
        Gender: parseInt(document.getElementById('PGender').value),
        Nationality: document.getElementById('Country').value,
        Contact: patientPhone,
        Email: document.getElementById('EmailId').value,
        Branch: document.getElementById('Branch').value, // Token No
        Doctor: selectedDoctor,
        AppointmentDate: selectedDay,
        AppointmentTime: selectedTime,
        Age: parseInt(document.getElementById('Age').value) || 0,
        DeptId: 0, // Set default or get from UI
        UserId: "1" // Set current logged in user ID from Session
    };

    $.ajax({
        url: '/Appointments/BookAppointment',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(appointmentData),
        success: function (response) {
            if (response.success) {
                // Booking Successful
                const successMessage = `Appointment confirmed for ${selectedDay} at ${selectedTime}!`;

                // Show success message
                $('#timeSlotsContainer').prepend(`<p class="text-green-600 font-semibold p-4 bg-green-50 rounded-lg">${successMessage}</p>`);

                closePatientModal();

                // Refresh slots to mark this one as booked
                fetchBookedSlots();
            } else {
                // Booking Failed (e.g. Duplicate)
                alert(response.message);
            }
        },
        error: function (err) {
            console.error('Error booking:', err);
            alert("Failed to book appointment. Please try again.");
        },
        complete: function () {
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = '<i class="fas fa-save mr-2"></i> Save Booking';
        }
    });
};

// Add Trigger:
// In your existing code, find where `selectedDay` or `selectedDoctor` changes (handleDayClick, handleDoctorClick).
// Add `fetchBookedSlots();` after the selection logic.