var CountryId = 0;
var bookings = [];
var MOCK_DOCTORS = [];
var selectedDay = null;
var selectedTime = null;
var selectedDoctor = null;
var today = new Date();
var currentStartIndex = 0;
var lastSearchDoctorId = 0;
var lastSearchFrom = '';
var lastSearchTo = '';
var appointmentDataTable = null;

$(document).ready(function () {
    $('.form-control').attr('autocomplete', 'off');
    initExistingOPAutocomplete();

    // Load appointments FIRST, then load doctors and show list
    $.ajax({
        type: "POST",
        url: "../Master/AppointmentGets",
        data: { AppointmentId: 0, DoctorId: 0, FromDate: '', ToDate: '' },
        success: function (result) {
            window._appointmentList = result.oList || [];
            console.log("Pre-loaded appointments:", window._appointmentList.length);
        },
        error: function () {
            window._appointmentList = [];
        }
    });

    Doctorload();
    renderTimeSlots();
    showListView();

    document.getElementById('scrollLeftBtnDoctor').addEventListener('click', function () {
        var container = document.getElementById('doctorSelection');
        container.scrollBy({ left: -200, behavior: 'smooth' });
    });

    document.getElementById('scrollRightBtnDoctor').addEventListener('click', function () {
        var container = document.getElementById('doctorSelection');
        container.scrollBy({ left: 200, behavior: 'smooth' });
    });

    document.getElementById('scrollLeftBtn').addEventListener('click', function () {
        document.getElementById('dayPicker').scrollBy({ left: -300, behavior: 'smooth' });
    });

    document.getElementById('scrollRightBtn').addEventListener('click', function () {
        document.getElementById('dayPicker').scrollBy({ left: 300, behavior: 'smooth' });
    });

    document.getElementById('dayPicker').addEventListener('scroll', function () {
        updateMonthDisplay();
    });

    //// Initialize flatpickr date pickers for search modal
    //if (typeof flatpickr !== 'undefined') {
    //    flatpickr('#search-from', { dateFormat: 'd/m/Y', allowInput: true });
    //    flatpickr('#search-to', { dateFormat: 'd/m/Y', allowInput: true });
    //    flatpickr('#edit-PDOB', { dateFormat: 'd/m/Y', allowInput: true, onChange: function () { editCalculateAgeFromDOB(); } });
    //    flatpickr('#edit-PDATE', { dateFormat: 'd/m/Y', allowInput: true });
    //}
});
function normalizeDateToDDMMYYYY(raw) {
    if (!raw || raw === '') return '';
    raw = raw.toString().trim();

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) return raw;
    if (/^\d{2}-\d{2}-\d{4}$/.test(raw)) {
        var p = raw.split('-');
        return p[0] + '/' + p[1] + '/' + p[2];
    }
    var isoMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        return isoMatch[3] + '/' + isoMatch[2] + '/' + isoMatch[1];
    }

    return raw;
}

function stripTimePart(raw) {
    if (!raw || raw === '') return '';
    return raw.toString().trim().split(' ')[0];
}

function calcAgeFields(dobDDMMYYYY, yrId, moId, daId) {
    if (!dobDDMMYYYY || dobDDMMYYYY === '') return;
    var parts = dobDDMMYYYY.split('/');
    if (parts.length !== 3) return;
    var dob = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    if (isNaN(dob.getTime())) return;

    var now = new Date();
    var years = now.getFullYear() - dob.getFullYear();
    var months = now.getMonth() - dob.getMonth();
    var days = now.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    if (years < 0) years = 0;
    if (months < 0) months = 0;
    if (days < 0) days = 0;

    document.getElementById(yrId).value = years;
    document.getElementById(moId).value = months;
    document.getElementById(daId).value = days;
}
function editCalculateAgeFromDOB() {
    var dob = document.getElementById('edit-PDOB').value;
    calcAgeFields(dob, 'edit-Age', 'edit-AgeMonths', 'edit-AgeDays');
}
function calculateAgeFromDOB() {
    var raw = document.getElementById('PDOB').value;
    if (!raw) return;
    var parts = raw.split('-');
    if (parts.length === 3) {
        var dob = parts[2] + '/' + parts[1] + '/' + parts[0];
        calcAgeFields(dob, 'Age', 'AgeMonths', 'AgeDays');
    }
}
function Doctorload() {
    $.ajax({
        type: "POST",
        url: "/Master/DoctorGetandGets",
        data: { DoctorsId: 0 },
        success: function (result) {
            if (result && result.oList) {
                MOCK_DOCTORS = result.oList.map(function (d) {
                    return { id: d.DoctorsId, name: d.Name, specialty: d.Department };
                });
                var docDropdown = document.getElementById('Doctor');
                docDropdown.innerHTML = '<option value="0">Select Doctor</option>';
                MOCK_DOCTORS.forEach(function (d) {
                    var opt = document.createElement('option');
                    opt.value = d.id;
                    opt.innerText = d.name;
                    docDropdown.appendChild(opt);
                });

                if (MOCK_DOCTORS.length > 0) {
                    selectedDoctor = MOCK_DOCTORS[0].id;
                    renderDoctors();
                    generateDays();
                }
            }
        }
    });
}

function renderDoctors() {
    var container = document.getElementById('doctorSelection');
    container.innerHTML = '';

    MOCK_DOCTORS.forEach(function (doc) {
        var card = document.createElement('div');
        card.className = 'doctor-card' + (doc.id === selectedDoctor ? ' selected' : '');
        card.innerHTML = '<p>' + doc.name + '</p><p>' + doc.specialty + '</p>';
        card.onclick = function () {
            selectedDoctor = doc.id;
            document.querySelectorAll('.doctor-card').forEach(function (c) { c.classList.remove('selected'); });
            card.classList.add('selected');
            selectedDay = null;
            renderTimeSlots();
            generateDays();
        };
        container.appendChild(card);
    });
}

function generateDays() {
    var container = document.getElementById('dayPicker');
    container.innerHTML = '';

    var startDate = new Date(today);
    var totalDays = 365;
    var todayFormatted = formatDate(today);

    for (var i = 0; i < totalDays; i++) {
        var date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        var btn = document.createElement('button');
        btn.className = 'day-slot';

        var formatted = formatDate(date);
        btn.dataset.date = formatted;

        var dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        var dayNumber = date.getDate();

        btn.innerHTML =
            '<div class="day-name">' + dayName + '</div>' +
            '<div class="day-number">' + dayNumber + '</div>';

        btn.onclick = function () {
            document.querySelectorAll('.day-slot').forEach(function (b) { b.classList.remove('selected-day'); });
            this.classList.add('selected-day');
            selectedDay = this.dataset.date;
            GetBookedSession(selectedDoctor, selectedDay);
        };

        container.appendChild(btn);
    }

    updateMonthDisplay();
}

//function GetBookedSession(docId, date) {
//    var parts = date.split('-');
//    var displayDate = parts[2] + '/' + parts[1] + '/' + parts[0];

//    $.ajax({
//        type: "POST",
//        url: "../Master/GetBookedSession",
//        data: { DoctorId: docId, Date: displayDate },
//        success: function (res) {
//            var bookedTimes = res.oList ? res.oList.map(function (x) { return x.AppointmentTime; }) : [];
//            renderTimeSlots(bookedTimes);
//        },
//        error: function () { renderTimeSlots([]); }
//    });
//}

function GetBookedSession(docId, date) {

    var bookedTimes = [];

    if (window._appointmentList && window._appointmentList.length > 0) {
        window._appointmentList.forEach(function (item) {

            var apptDate = '';
            var raw = (item.AppointmentDate || '').toString().trim();

            if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
                apptDate = raw.substring(0, 10);
            } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
                var p = raw.split('/');
                apptDate = p[2] + '-' + p[1] + '-' + p[0];
            } else {
                apptDate = raw;
            }

            var sameDoctor = String(item.DoctorId) === String(docId) || String(item.Doctor) === String(docId);
            var sameDate = apptDate === date;
            var notCancelled = item.Status1 !== 'Cancelled';
            if (sameDoctor && sameDate && notCancelled && item.AppointmentTime) {
                bookedTimes.push({
                    time: item.AppointmentTime.trim(),
                    cancelled: false
                });
            }
        });
    }
    console.log("_appointmentList length:", window._appointmentList ? window._appointmentList.length : 0);
    console.log("Looking for docId:", docId, "date:", date);
    console.log("Booked times found:", bookedTimes);

    renderTimeSlots(bookedTimes);
}

function renderTimeSlots(bookedTimes) {
    bookedTimes = bookedTimes || [];
    var container = document.getElementById('timeSlotsContainer');

    if (!selectedDay) {
        container.innerHTML = `
            <label style="font-size:14px; color:#6b7280;">Slot Duration (Mins)</label>
            <select id="slotDuration" class="time-dropdown" disabled>
                <option value="15">15 Minutes</option>
            </select>
            <p class="time-note">Please select a date to view available time slots.</p>`;
        return;
    }

    document.body.style.overflow = "auto";
    setTimeout(function () {
        document.getElementById("timeSlotsContainer").scrollIntoView({ behavior: "smooth" });
    }, 200);

    container.innerHTML = `
        <label style="font-size:14px; color:#6b7280;">Slot Duration (Mins)</label>
        <select id="slotDuration" class="time-dropdown" disabled>
            <option value="15">15 Minutes</option>
        </select>
        <h3 class="slot-heading">Morning Slots</h3>
        <div id="morningSlots"></div>
        <h3 class="slot-heading">Afternoon Slots</h3>
        <div id="afternoonSlots"></div>
        <h3 class="slot-heading">Evening Slots</h3>
        <div id="eveningSlots"></div>`;

    var slots = generateSlots(15);

    slots.forEach(function (slot) {
        var parent = slot.group === "morning" ? "morningSlots"
            : slot.group === "afternoon" ? "afternoonSlots"
                : "eveningSlots";

        var btn = document.createElement("button");
        btn.innerText = slot.time;
        btn.style.margin = "6px";
        btn.style.padding = "10px 14px";
        btn.style.borderRadius = "10px";
        btn.style.border = "1px solid #ddd";

        var bookedEntry = bookedTimes.find(function (bt) {
            return bt.time.trim().toUpperCase() === slot.time.trim().toUpperCase();
        });

        if (bookedEntry) {
            btn.disabled = true;
            btn.style.cursor = "not-allowed";
            btn.style.opacity = "0.7";
            btn.style.textDecoration = "line-through";
            btn.style.position = "relative";

            // Find patient name from appointment list
            var patientName = '';
            var patientContact = '';
            var patientOP = '';
            if (window._appointmentList) {
                window._appointmentList.forEach(function (appt) {
                    if (appt.AppointmentTime &&
                        appt.AppointmentTime.trim().toUpperCase() === slot.time.trim().toUpperCase()) {
                        var apptDate = '';
                        var raw = (appt.AppointmentDate || '').toString().trim();
                        if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
                            apptDate = raw.substring(0, 10);
                        } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
                            var p = raw.split('/');
                            apptDate = p[2] + '-' + p[1] + '-' + p[0];
                        }
                        if (apptDate === selectedDay &&
                            String(appt.DoctorId) === String(selectedDoctor)) {
                            patientName = appt.FirstName || '';
                            patientContact = appt.Contact || '';
                            patientOP = appt.LastName || '';   // OP number stored in LastName
                        }
                    }
                });
            }

            btn.style.background = "#fee2e2";
            btn.style.color = "#ef4444";

            var tooltipText = bookedEntry.cancelled
                ? 'Cancelled appointment'
                : 'Already booked' + (patientName ? ' by ' + patientName : '') +
                (patientOP ? ' | OP: ' + patientOP : '') +
                (patientContact ? ' | Ph: ' + patientContact : '');

            btn.title = tooltipText;

            // Custom styled tooltip
            btn.setAttribute('data-tooltip', tooltipText);
            btn.addEventListener('mouseenter', function () {
                var tip = document.createElement('div');
                tip.id = 'slot-tooltip';
                tip.style.cssText = 'position:fixed;background:#1f2937;color:white;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:500;z-index:99999;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,0.3);max-width:220px;text-align:center;';
                tip.innerText = tooltipText;
                document.body.appendChild(tip);

                var rect = btn.getBoundingClientRect();
                tip.style.left = (rect.left + rect.width / 2 - tip.offsetWidth / 2) + 'px';
                tip.style.top = (rect.top - tip.offsetHeight - 8) + 'px';
            });
            btn.addEventListener('mouseleave', function () {
                var tip = document.getElementById('slot-tooltip');
                if (tip) tip.remove();
            });
            btn.addEventListener('mousemove', function (e) {
                var tip = document.getElementById('slot-tooltip');
                if (tip) {
                    tip.style.left = (e.clientX - tip.offsetWidth / 2) + 'px';
                    tip.style.top = (e.clientY - tip.offsetHeight - 12) + 'px';
                }
            });
        } else {
            btn.onclick = function () {
                selectedTime = slot.time;
                document.querySelectorAll("#timeSlotsContainer button").forEach(function (b) { b.classList.remove("active-slot"); });
                btn.classList.add("active-slot");
                openPatientModal();
            };
        }
        document.getElementById(parent).appendChild(btn);
    });
}

function generateSlots(duration) {
    var slots = [];
    var start = 8 * 60;
    var end = 20 * 60;

    for (var i = start; i < end; i += duration) {
        var hour = Math.floor(i / 60);
        var min = i % 60;
        var ampm = hour >= 12 ? "PM" : "AM";
        var displayHour = hour % 12 || 12;
        var time = displayHour + ":" + (min === 0 ? "00" : String(min).padStart(2, '0')) + " " + ampm;
        var group = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
        slots.push({ time: time, group: group });
    }
    return slots;
}

function formatDate(date) {
    return date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, '0') + "-" +
        String(date.getDate()).padStart(2, '0');
}

function updateMonthDisplay() {
    var container = document.getElementById('dayPicker');
    var slots = container.querySelectorAll('.day-slot');
    if (slots.length === 0) return;

    var containerLeft = container.scrollLeft;
    var containerWidth = container.offsetWidth;
    var centerX = containerLeft + containerWidth / 2;

    var closestSlot = null;
    var closestDist = Infinity;

    slots.forEach(function (slot) {
        var slotCenter = slot.offsetLeft + slot.offsetWidth / 2;
        var dist = Math.abs(slotCenter - centerX);
        if (dist < closestDist) { closestDist = dist; closestSlot = slot; }
    });

    if (closestSlot) {
        var dateStr = closestSlot.dataset.date;
        var parts = dateStr.split('-');
        var visibleDate = new Date(parts[0], parts[1] - 1, parts[2]);
        document.getElementById('currentMonthDisplay').innerText =
            visibleDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
}
function openPatientModal() {
    switchTab('new');
    document.querySelector('footer').style.display = 'none';
    var docDropdown = document.getElementById("Doctor");
    docDropdown.disabled = false;
    if (selectedDoctor) {
        docDropdown.value = selectedDoctor;
    } else if (MOCK_DOCTORS.length > 0) {
        docDropdown.value = MOCK_DOCTORS[0].id;
        selectedDoctor = MOCK_DOCTORS[0].id;
    }
    docDropdown.disabled = true;
    docDropdown.classList.add("readonly-input");
    if (selectedDay) {
        var parts = selectedDay.split('-');
        document.getElementById("PDATE").value = parts[2] + '/' + parts[1] + '/' + parts[0];
    }
    if (selectedTime) {
        document.getElementById("PTime").value = selectedTime;
    }
    var doctorName = "";
    if (docDropdown.selectedIndex !== -1) {
        doctorName = docDropdown.options[docDropdown.selectedIndex].text;
    }
    document.getElementById("appointment-summary-text").innerText =
        doctorName + " - " + (document.getElementById("PDATE").value || "") + " at " + (selectedTime || "");
    document.getElementById("patient-modal").style.display = "flex";
    document.body.classList.add('modal-open');

    TokenLoad();
    setTimeout(function () {
        document.getElementById("patient-modal-content").scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
}

function initExistingOPAutocomplete() {
    if ($("#ExistingOP").data("ui-autocomplete")) {
        $("#ExistingOP").autocomplete("destroy");
    }

    $("#ExistingOP").autocomplete({
        appendTo: "body",
        delay: 0,
        autoFocus: true,
        minLength: 1,
        source: function (request, response) {
            $.ajax({
                url: '../Revisit/HMS_PatientSearch',
                type: "POST",
                data: { PatientName: request.term, DeptId: 1 },
                dataType: "json",
                success: function (result) {
                    var data = result.oList || result;
                    if (!data || data.length === 0) { response([]); return; }
                    response($.map(data, function (item) {
                        return {
                            ColCount: '3R',
                            label: item.OPSerName + '-' + item.OPNumber,
                            label1: item.PatientName,
                            label2: item.Contact,
                            headers: ["RegNo", "Patient", "Mobile"],
                            PatientName: item.PatientName,
                            Contact: item.Contact,
                            DOB: item.DOB,
                            Gender: item.Gender,
                            Age: item.Age,
                            OPNumber: item.OPNumber
                        };
                    }));
                },
                error: function () { response([]); }
            });
        },
        select: function (event, ui) {
            event.preventDefault();
            var gender = 0;
            if (ui.item.Gender === 'Male') gender = 1;
            else if (ui.item.Gender === 'Female') gender = 2;
            else gender = 3;

            $('#AppFirst').val(ui.item.PatientName);
            $('#ExistingOP').val(ui.item.label.split('-')[0] !== '' ? ui.item.label : ui.item.OPNumber);
            $('#MobileNo').val(ui.item.Contact);
            $('#PGender').val(gender);

            var dob = normalizeDateToDDMMYYYY(ui.item.DOB);
            if (dob) {
                calcAgeFields(dob, 'Age', 'AgeMonths', 'AgeDays');
                var parts = dob.split('/');
                if (parts.length === 3) {
                    $('#PDOB').val(parts[2] + '-' + parts[1] + '-' + parts[0]);
                }
            } else if (ui.item.Age && ui.item.Age !== '') {
                $('#Age').val(ui.item.Age);
                $('#AgeMonths').val('0');
                $('#AgeDays').val('0');
            }
        },
        focus: function (event, ui) { event.preventDefault(); }
    });

    $(document).on('mousedown', '.ui-menu-item', function () { $(this).click(); });
}

function closePatientModal() {
    document.querySelector('footer').style.display = 'flex';
    document.getElementById("patient-modal").style.display = "none";
    document.body.classList.remove('modal-open');
}

function clearPatientForm() {
    document.getElementById("AppFirst").value = "";
    document.getElementById("ExistingOP").value = "";
    document.getElementById("MobileNo").value = "";
    document.getElementById("PEmail").value = "";
    document.getElementById("PDOB").value = "";
    document.getElementById("Age").value = "";
    document.getElementById("AgeMonths").value = "";
    document.getElementById("AgeDays").value = "";
    document.getElementById("PGender").value = "0";
    document.getElementById("PNationality").value = "0";
    document.getElementById("PDept").value = "0";
    document.getElementById("AppointmentId").value = "0";
    document.getElementById("AppFirst").focus();
}

function submitPatientDetails(flag) {
    if (!document.getElementById("AppFirst").value) {
        swal("Please Enter First Name", "", "warning");
        document.getElementById("AppFirst").focus();
        return;
    }
    var doctorVal = document.getElementById("Doctor").value;
    if (!doctorVal || doctorVal == "0") {
        swal("Doctor not selected properly", "", "warning");
        return;
    }

    if (document.getElementById("PGender").value == "0") {
        swal("Please Select Gender", "", "warning"); return;
    }
    if (!document.getElementById("MobileNo").value) {
        swal("Please Enter Contact Number", "", "warning"); return;
    }

    var data = {
        AppointmentId: document.getElementById("AppointmentId").value,
        FirstName: document.getElementById("AppFirst").value,
        LastName: (function () {
            var op = document.getElementById("ExistingOP").value || '';
            if (op.indexOf('-') > -1) {
                return op.split('-').pop();
            }
            return op;
        })(),
        DOB: (function () {
            var raw = document.getElementById('PDOB').value;
            if (!raw) return '';
            var p = raw.split('-');
            return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : raw;
        })(),
        Age: parseInt(document.getElementById("Age").value) || 0,
        Gender: document.getElementById("PGender").value,
        Nationality: document.getElementById("PNationality").value,
        Contact: document.getElementById("MobileNo").value,
        Email: document.getElementById("PEmail").value,
        Department: document.getElementById("PDept").options[document.getElementById("PDept").selectedIndex]?.value || "0",
        Branch: document.getElementById("PToken").value,
        Doctor: selectedDoctor || document.getElementById("Doctor").value,
        AppointmentDate: document.getElementById("PDATE").value,
        AppointmentTime: document.getElementById("PTime").value,
        Status1: "Booked",
        Status2: document.getElementById("ExistingOP").value ? "1" : "0",
        DelFlag: 0
    };
    console.log("Saving appointment data:", JSON.stringify(data));
    $.ajax({
        type: "POST",
        url: "../Master/AppointmentInsertandUpdate",
        data: data,
        success: function (result) {
            swal("Saved Successfully", "Appointment booked successfully", "success");
            clearPatientForm();
            closePatientModal();
        },
        error: function (xhr) {
            console.error("Save failed:", xhr.responseText);
            swal("Error", "Failed to save appointment", "error");
        }
    });
}

function TokenLoad() {
    var doctorVal = $("#Doctor").val();
    var dateVal = $("#PDATE").val();
    if (!doctorVal || doctorVal == "0") return;
    if (!dateVal || dateVal == "") return;

    var shiftName = getShiftFromTime();
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_TokenNumberGets",
        data: { DoctorId: doctorVal, Shift: shiftName, RevisitDate: dateVal, DeptId: 1 },
        success: function (result) {
            if (result && result.oList && result.oList.length > 0) {
                var tokenNumber = result.oList[0].TokenNumber;
                $("#PToken").val(tokenNumber && tokenNumber !== '' ? tokenNumber : '1');
            } else {
                $("#PToken").val('1');
            }
        }
    });
}

function getShiftFromTime() {
    var time = $("#PTime").val();
    if (!time) return "Morning";
    var hour = parseInt(time.split(":")[0]);
    var isPM = time.includes("PM");
    if (isPM && hour != 12) hour += 12;
    if (!isPM && hour == 12) hour = 0;
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
}
function showListView() {
    var calView = document.getElementById('calendar-view');
    var listView = document.getElementById('list-view');
    var showAll = document.getElementById('showAllBtn');

    if (calView) calView.style.display = 'none';
    if (listView) listView.style.display = 'block';
    if (showAll) showAll.style.display = 'none';

    lastSearchDoctorId = 0;
    lastSearchFrom = '';
    lastSearchTo = '';

    loadAppointmentList(0, '', '', '');
}
function showCalendarView() {
    document.getElementById('list-view').style.display = 'none';
    document.getElementById('calendar-view').style.display = 'block';

    // Always refresh appointment list when going to calendar
    $.ajax({
        type: "POST",
        url: "../Master/AppointmentGets",
        data: { AppointmentId: 0, DoctorId: 0, FromDate: '', ToDate: '' },
        success: function (result) {
            window._appointmentList = result.oList || [];
            console.log("Calendar view - appointments loaded:", window._appointmentList.length);
            // Re-render slots if a date is already selected
            if (selectedDay && selectedDoctor) {
                GetBookedSession(selectedDoctor, selectedDay);
            }
        }
    });
}
function loadAppointmentList(doctorId, fromDate, toDate, status) {
   

    $.ajax({
        type: "POST",
        url: "../Master/AppointmentGets",
        data: {
            AppointmentId: 0,
            DoctorId: doctorId || 0,
            FromDate: fromDate || '',
            ToDate: toDate || '',
            Status1: status || ''   
        },
        success: function (result) {
            console.log('Records returned:', result.oList ? result.oList.length : 0);
            renderAppointmentTable(result.oList || []);
        },
        error: function (xhr) {
            renderAppointmentTable([]);
        }
    });
}
//function renderAppointmentTable(list) {
//    var tbody = document.getElementById('appointment-tbody');
//    tbody.innerHTML = '';
//    if (!list || list.length === 0) {
//        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px;color:#6b7280;">No appointments found</td></tr>';
//        return;
//    }
//    list.forEach(function (item, index) {
//        var tr = document.createElement('tr');
//        tr.style.borderBottom = '1px solid #e5e7eb';

//        var rawDate = stripTimePart(item.AppointmentDate || '');
//        var displayDate = normalizeDateToDDMMYYYY(rawDate);

//        tr.innerHTML =
//            '<td style="padding:10px 12px;">' + (index + 1) + '</td>' +
//            '<td style="padding:10px 12px;">' + (item.AppointmentId || '') + '</td>' +
//            '<td style="padding:10px 12px;">' + (item.FirstName || '') + '</td>' +
//            '<td style="padding:10px 12px;">' + (item.LastName || '') + '</td>' +
//            //'<td style="padding:10px 12px;">' + (item.Name || item.Doctor || '') + '</td>' +
//            '<td style="padding:10px 12px;">' + getDoctorName(item.Name || item.name, item.Doctor) + '</td>' +
//            '<td style="padding:10px 12px;">' + displayDate + '</td>' +
//            '<td style="padding:10px 12px;">' + (item.AppointmentTime || '') + '</td>' +
//            '<td style="padding:10px 12px;">' + (item.Contact || '') + '</td>' +
//            '<td style="padding:10px 12px;">' + (item.Branch || '') + '</td>' +
//            '<td style="padding:10px 12px;">' + getStatusBadge(item.Status1) + '</td>' +
//            '<td style="padding:10px 12px;"><button onclick="openEditModal(' + index + ')" style="padding:5px 14px;background:#3c2a8c;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px;">Edit</button></td>';
//        tr.setAttribute('data-index', index);
//        tbody.appendChild(tr);
//    });
//    window._appointmentList = list;
//}

function renderAppointmentTable(list) {
    if ($.fn.DataTable.isDataTable('#Tblreport')) {
        $('#Tblreport').DataTable().destroy();
    }
    $('#Tblreport tfoot th').each(function () {
        $(this).html($(this).text());
    });

    var tbody = document.getElementById('appointment-tbody');
    tbody.innerHTML = '';

    if (!list || list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:20px;color:#6b7280;">No appointments found</td></tr>';
        window._appointmentList = [];
        return;
    }

    list.forEach(function (item, index) {
        var tr = document.createElement('tr');
        var rawDate = stripTimePart(item.AppointmentDate || '');
        var displayDate = normalizeDateToDDMMYYYY(rawDate);

        tr.innerHTML =
            '<td>' + (index + 1) + '</td>' +
            '<td>' + (item.AppointmentId || '') + '</td>' +
            '<td>' + (item.FirstName || '') + '</td>' +
            '<td>' + (item.LastName || '') + '</td>' +
            '<td>' + getDoctorName(item.Name || item.name, item.Doctor) + '</td>' +
            '<td>' + displayDate + '</td>' +
            '<td>' + (item.AppointmentTime || '') + '</td>' +
            '<td>' + (item.Contact || '') + '</td>' +
            '<td>' + (item.Branch || '') + '</td>' +
            '<td>' + getStatusBadge(item.Status1) + '</td>' +
            '<td><button onclick="openEditModal(' + index + ')" style="padding:5px 14px;background:#3c2a8c;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px;">Edit</button></td>';
        tr.setAttribute('data-index', index);
        tbody.appendChild(tr);
    });

    window._appointmentList = list;

    // Update badges
    var totalCount = list.length;
    var bookedCount = list.filter(function (i) {
        return i.Status1 === 'Booked' || !i.Status1 || i.Status1.trim() === '';
    }).length;
    var cancelledCount = list.filter(function (i) { return i.Status1 === 'Cancelled'; }).length;
    var rescheduledCount = list.filter(function (i) { return i.Status1 === 'Rescheduled'; }).length;
    var notAnsweredCount = list.filter(function (i) { return i.Status1 === 'NotAnswered'; }).length;
    var othersCount = list.filter(function (i) { return i.Status1 === 'Others'; }).length;
    var completedCount = list.filter(function (i) { return i.Status1 === 'Completed'; }).length;

    document.getElementById('badge-total').innerText = 'All: ' + totalCount;
    document.getElementById('badge-booked').innerText = '▶ Booked: ' + bookedCount;
    document.getElementById('badge-cancelled').innerText = '▶ Cancelled: ' + cancelledCount;
    document.getElementById('badge-rescheduled').innerText = '▶ Rescheduled: ' + rescheduledCount;
    document.getElementById('badge-notanswered').innerText = '▶ Not Answered: ' + notAnsweredCount;
    document.getElementById('badge-others').innerText = '▶ Others: ' + othersCount;
    document.getElementById('badge-completed').innerText = '▶ Completed: ' + completedCount;

    datatableWithsearch('Tblreport', false, 'Appointment List', 'buttonPlace');
    $('#Tblreport').DataTable().columns([0, 1]).visible(true);
}

function getStatusBadge(status) {
    if (!status || status.trim() === '') status = 'Booked';
    var colors = {
        'Booked': { bg: '#dcfce7', color: '#166534' },
        'Cancelled': { bg: '#fee2e2', color: '#991b1b' },
        'Rescheduled': { bg: '#fef9c3', color: '#854d0e' },
        'NotAnswered': { bg: '#f3f4f6', color: '#374151' },
        'Others': { bg: '#ede9fe', color: '#5b21b6' },
        'Completed': { bg: '#dbeafe', color: '#1e40af' }
    };
    var c = colors[status] || { bg: '#f3f4f6', color: '#374151' };
    return '<span style="padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;background:' + c.bg + ';color:' + c.color + ';">' + status + '</span>';
}

function getDoctorName(nameFromServer, doctorId) {
    if (nameFromServer && nameFromServer.toString().trim() !== '') {
        return nameFromServer;
    }
    if (doctorId) {
        var found = MOCK_DOCTORS.find(function (d) {
            return String(d.id) === String(doctorId);
        });
        if (found) return found.name;
    }
    return doctorId || '';
}


function openSearchModal() {
    var sel = document.getElementById('search-doctor');
    sel.innerHTML = '<option value="0">Select</option>';
    MOCK_DOCTORS.forEach(function (d) {
        var opt = document.createElement('option');
        opt.value = d.id;
        opt.innerText = d.name + ' - ' + d.specialty;
        sel.appendChild(opt);
    });

    var todayStr = $.datepicker.formatDate('dd/mm/yy', new Date());
    document.getElementById('search-from').value = todayStr;
    document.getElementById('search-to').value = todayStr;
    document.getElementById('search-modal').style.display = 'flex';
}

function closeSearchModal() {
    document.getElementById('search-modal').style.display = 'none';
}

function applySearch() {
    var docId = document.getElementById('search-doctor').value;
    var fromISO = document.getElementById('search-from').value;
    var toISO = document.getElementById('search-to').value;
    var status = document.getElementById('search-status').value; // ✅ add this

    function isoToDDMMYYYY(iso) {
        if (!iso || iso.length !== 10) return '';
        var p = iso.split('-');
        return p[2] + '/' + p[1] + '/' + p[0];
    }

    var fromDDMMYYYY = isoToDDMMYYYY(fromISO);
    var toDDMMYYYY = isoToDDMMYYYY(toISO);

    lastSearchDoctorId = docId || 0;
    lastSearchFrom = fromDDMMYYYY;
    lastSearchTo = toDDMMYYYY;

    closeSearchModal();
    document.getElementById('showAllBtn').style.display = 'block';
    loadAppointmentList(docId, fromDDMMYYYY, toDDMMYYYY, status); // ✅ pass status
}
function openEditModal(index) {
    var item = window._appointmentList[index];
    if (!item) return;
    document.getElementById('edit-AppointmentId').value = item.AppointmentId || 0;
    document.getElementById('edit-AppFirst').value = item.FirstName || '';
    document.getElementById('edit-ExistingOP').value = item.LastName || '';
    document.getElementById('edit-MobileNo').value = item.Contact || '';
    document.getElementById('edit-PEmail').value = item.Email || '';
    document.getElementById('edit-PToken').value = item.Branch || '';
    document.getElementById('edit-modal-subtitle').innerText = 'Edit Appointment ID: ' + item.AppointmentId;

    var rawApptDate = stripTimePart(item.AppointmentDate || '');
    var formattedDate = normalizeDateToDDMMYYYY(rawApptDate);
    var dateParts = formattedDate.split('/');
    document.getElementById('edit-PDATE').value = dateParts.length === 3
        ? dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
        : '';
    document.getElementById('edit-PTime').value = item.AppointmentTime || '';

    var dobNormalized = normalizeDateToDDMMYYYY(item.DOB || '');
    var isValidDOB = dobNormalized !== '' && dobNormalized !== '01/01/0001' && dobNormalized !== '01/01/1900';

    if (isValidDOB) {
        document.getElementById('edit-PDOB').value = dobNormalized;
        calcAgeFields(dobNormalized, 'edit-Age', 'edit-AgeMonths', 'edit-AgeDays');
    } else if (item.Age && parseInt(item.Age) > 0) {
        document.getElementById('edit-PDOB').value = '';
        document.getElementById('edit-Age').value = item.Age;
        document.getElementById('edit-AgeMonths').value = '';
        document.getElementById('edit-AgeDays').value = '';
    } else {
        document.getElementById('edit-PDOB').value = '';
        document.getElementById('edit-Age').value = '';
        document.getElementById('edit-AgeMonths').value = '';
        document.getElementById('edit-AgeDays').value = '';
    }
    var genderVal = '0';
    var g = String(item.Gender || '').trim();
    if (g === 'Male' || g === '1') genderVal = '1';
    else if (g === 'Female' || g === '2') genderVal = '2';
    else if (g === 'Others' || g === 'Other' || g === '3') genderVal = '3';
    document.getElementById('edit-PGender').value = genderVal;
    var docSel = document.getElementById('edit-Doctor');
    docSel.innerHTML = '<option value="0">Select Doctor</option>';
    MOCK_DOCTORS.forEach(function (d) {
        var opt = document.createElement('option');
        opt.value = d.id;
        opt.innerText = d.name;
        docSel.appendChild(opt);
    });
    docSel.value = item.DoctorId || '0';
    document.getElementById("edit-PDATE").readOnly = true;
    document.getElementById("edit-PTime").readOnly = true;
    document.getElementById("edit-Doctor").disabled = true;
    document.getElementById('edit-modal').style.display = 'flex';
    document.getElementById("edit-Status").value = item.Status1 || "Booked";
    handleEditStatusChange();
    //// Re-init flatpickr on edit modal fields if available
    //if (typeof flatpickr !== 'undefined') {
    //    flatpickr('#edit-PDOB', {
    //        dateFormat: 'd/m/Y',
    //        allowInput: true,
    //        onChange: function () { editCalculateAgeFromDOB(); }
    //    });
    //    flatpickr('#edit-PDATE', { dateFormat: 'd/m/Y', allowInput: true });
    //}
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function submitEditDetails() {
    if (!document.getElementById('edit-AppFirst').value) {
        swal("Please Enter First Name", "", "warning"); return;
    }
    var status = document.getElementById('edit-Status').value;

    if (status === "Rescheduled" && document.getElementById('edit-Doctor').value == "0") {
        swal("Please Select Doctor", "", "warning"); return;
    }

    if (!document.getElementById('edit-MobileNo').value) {
        swal("Please Enter Contact Number", "", "warning"); return;
    }

    var data = {
        AppointmentId: document.getElementById('edit-AppointmentId').value,
        FirstName: document.getElementById('edit-AppFirst').value,
        LastName: (function () {
            var op = document.getElementById('edit-ExistingOP').value || '';
            if (op.indexOf('-') > -1) {
                return op.split('-').pop();
            }
            return op;
        })(),
        DOB: document.getElementById('edit-PDOB').value,
        Age: parseInt(document.getElementById('edit-Age').value) || 0,
        Gender: document.getElementById('edit-PGender').value,
        Nationality: document.getElementById('edit-PNationality').value,
        Contact: document.getElementById('edit-MobileNo').value,
        Email: document.getElementById('edit-PEmail').value,
        Department: document.getElementById('edit-PDept').value,
        Branch: document.getElementById('edit-PToken').value,
        Doctor: document.getElementById('edit-Doctor').value,
        AppointmentDate: document.getElementById('edit-PDATE').value,
        AppointmentTime: document.getElementById('edit-PTime').value,
        Status1: document.getElementById('edit-Status').value,
        Status2: document.getElementById('edit-ExistingOP').value ? "1" : "0",
        DelFlag: 1
    };

    $.ajax({
        type: "POST",
        url: "../Master/AppointmentInsertandUpdate",
        data: data,
        success: function () {
            swal("Updated!", "Appointment updated successfully", "success");
            closeEditModal();
            loadAppointmentList(lastSearchDoctorId, lastSearchFrom, lastSearchTo);
        },
        error: function () { swal("Error", "Update failed", "error"); }
    });
}
function convertToYYYYMMDD(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('/');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
}
function showAllAppointments() {
    lastSearchDoctorId = 0;
    lastSearchFrom = '';
    lastSearchTo = '';
    document.getElementById('showAllBtn').style.display = 'none';
    loadAppointmentList(0, '', '', ''); // ✅ empty status = all
}
function handleEditStatusChange() {
    var status = document.getElementById("edit-Status").value;

    var isReschedule = status === "Rescheduled";

    document.getElementById("edit-PDATE").readOnly = !isReschedule;
    document.getElementById("edit-PTime").readOnly = !isReschedule;
    document.getElementById("edit-Doctor").disabled = !isReschedule;
}

function switchTab(tab) {
    if (tab === 'new') {
        document.getElementById('existingOP-row').style.display = 'none';
        document.getElementById('tab-new').style.background = 'white';
        document.getElementById('tab-new').style.color = '#3c2a8c';
        document.getElementById('tab-revisit').style.background = 'rgba(255,255,255,0.25)';
        document.getElementById('tab-revisit').style.color = 'white';
    } else {
        document.getElementById('existingOP-row').style.display = 'flex';
        document.getElementById('tab-revisit').style.background = 'white';
        document.getElementById('tab-revisit').style.color = '#3c2a8c';
        document.getElementById('tab-new').style.background = 'rgba(255,255,255,0.25)';
        document.getElementById('tab-new').style.color = 'white';
    }
}

function Defaultfocus() {
    try {
        // ✅ Focus the actual first field in your form
        var el = document.getElementById('AppFirst')
            || document.getElementById('txtFirstName');
        if (el) el.focus();
    } catch (e) { }
}


$(document).ready(function () {

    $('#search-from').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

    $('#search-to').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

    $('#search-from, #search-to').val(CurDate);

});


