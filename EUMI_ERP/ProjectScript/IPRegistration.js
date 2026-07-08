$(document).ready(function () {
    SerialNoLoad();
    Defaultfocus();
    DoctorLoad();
    RoomLoad();
    $("#IPDate").val(CurDate);
    $("#LabelDate").text(CurDate);
    $("#btnsubmit").click(function (e) {
        SaveandUpdateIPRegistration(1,0);
    });
    $("#btnlist").click(function (e) {
        $("#FromDate,#ToDate").val(CurDate);
        $("#DoctorSearch,#SearchRegNo").val('');
        $("#DoctorSearchId,#SearchPatientId").val(0);
        GetRows(0);
        formrefresh();
    });
    $("#btnnew").click(function (e) {
        formrefresh();
    });
    $("#btndelete").click(function (e) {
        SaveandUpdateIPRegistration(0,1);
    });

    $('#DocName').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#RoomCode').focus();
            $('#RoomCode').select();
        }
    });
    $('#RoomCode').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }
    });
    $('.enterflow').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });
});

function SerialNoLoad() {
    var data = {};
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMSSerialNoGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#IPYear").val(result.oList[0].CYear);
                $("#IPNumber").val(result.oList[0].IPNo);
                $("#IPYeardply").val((result.oList[0].CYear));
            }
            else {
                $('#confirmff,#keyboardff').show();
                $("#RegNumber").blur();
            }
        }
    });
}

function DoctorLoad() {
    var data = {};                                       //dropdownbind
    data.DoctorId = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_RevistDoctorGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#DocName,#DoctorSearchId").empty()
                $("#DocName,#DoctorSearchId").append("<option value='0' Fee='0'>--Select--</option>");

                for (var i = 0; i < result.oList.length; i++) {
                    $("#DocName,#DoctorSearchId").append("<option value='" + result.oList[i].DoctorId + "' Fee='" + result.oList[i].ConsultFees + "'>" + result.oList[i].DoctorName + "</option>");
                }

            }
        }
    });
}

function Defaultfocus() {
    $("#RegNumber").focus();
}

function RoomLoad() {

}

function ClearPatData() {
    $('.detextnull').text('');
    $('#PatName').val('');
    $('#PatientId').val(0);
    $('#myImg').attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
}


function GetPatientData(result, Flag) {

    if (result.length > 0) {

        var age = AgeCalculation(result[0].DOB);

        var CurrentAge = '';
        if (age.years < 10) {
            if (age.years > 1) yearString = " Years";
            else yearString = " Year";
            if (age.months > 1) monthString = " Months";
            else monthString = " Month";
            if (age.days > 1) dayString = " Days";
            else dayString = " Day";

            if (age.years > 0) { CurrentAge = CurrentAge + age.years + yearString; } if (CurrentAge != '' && (age.months > 0 || age.days > 0)) { CurrentAge = CurrentAge + ', ' }
            if (age.months > 0) { CurrentAge = CurrentAge + age.months + monthString; } if (CurrentAge != '' && age.months > 0 && age.days > 0) { CurrentAge = CurrentAge + ', ' }
            if (age.days > 0) { CurrentAge = CurrentAge + age.days + dayString; }

        }
        else {
            CurrentAge = age.years + ' Years';
        }

        $("#PatientId").val(result[0].PatientId);
        $("#RegNumber").val(result[0].OPNumber);
        $("#PatName").val(result[0].PatientName);
        $("#PatAge").text(CurrentAge);
        $("#PatGender").text(result[0].Gender);
        $("#PatDOB").text(result[0].DOB);
        $("#PatBloodGrp").text(result[0].BloodGroup);
        $("#PatOccuPation").text(result[0].Occupation);
        $("#PatLastVisit").text(result[0].LastVisit);
        $("#PatDOR").text(result[0].RegDate);
        $("#PatHealthCard").text(result[0].HealthCard);
        $("#PatAadhar").text(result[0].AadharNo);
        $("#PatAdd1").text(result[0].Add1);
        $("#PatAdd2").text(result[0].Add2);
        $("#PatAdd3").text(result[0].Add3);
        $("#PatNumber").text(result[0].Contact);

        $("#RegSeries").val(result[0].OPSerName);
        $("#RegSeriesId").val(result[0].OPSerId);

        var Ext = (result[0].Status).split('.').pop();
        CheckImgValid('myImg', result[0].PatientId, Ext);

        if (parseInt($("#IPPrimaryId").val() || 0) == 0) {
            $("#OPVisitId").val(result[0].RevisitId);
            $("#DocName").val(result[0].DoctorId);
        }

    }
}


function CheckImgValid(Id, RegId, Ext) {
    var d = new Date();
    $.ajax({
        url: "../ProjectImages/PatientImage/" + RegId + "." + Ext + "",
        type: 'HEAD',
        error: function () {
            $('#' + Id).attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
        },
        success: function () {
            $('#' + Id).attr('src', "../ProjectImages/PatientImage/" + RegId + "." + Ext + "?" + d.getSeconds());
        }
    });
}

function SaveandUpdateIPRegistration(Flag, RoomFlag) {
    $('#confirm').hide();

    if (parseInt($('#PatientId').val() || 0) == 0) {
        warningshow('Please Select Patient', 'RegNumber');
    }
    else if (parseInt($('#OPVisitId').val() || 0) == 0) {
        warningshow('Please Select OPVisit#', 'OPVisitId');
    }

    else if ($('#bystandername').val() =='') {
        warningshow('Please Enter bystander name', 'bystandername');
    }

    else if ($('#bystanderphone').val() == '') {
        warningshow('Please Enter Contact no', 'bystanderphone');
    }

   // $("#bystandername").val() + '@@' + $("#bystanderphone").val();



    else if (parseInt($("#RoomId").val() || 0) == 0 && RoomFlag==0 && Flag==1) {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('RoomConfirm'); $('#ConfirmRowId').val(Flag);
        $('#confirmmessage').text('Do you want to continue without selecting Room?');
    }
    else {
        if (parseInt($("#IPPrimaryId").val() || 0) == 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Save'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want Save this IP-Registration?');
        }
        else if (parseInt($("#IPPrimaryId").val() || 0) != 0) {
            if (Flag == 1) {
                $('#confirm').show();
                $('#confirmOk').focus();
                $('#Confirmflag').val('Update'); $('#ConfirmRowId').val(Flag);
                $('#confirmmessage').text('Do you want Update this IP-Registration?');
            }
            else {
                $('#confirm').show();
                $('#confirmOk').focus();
                $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(Flag);
                $('#confirmmessage').text('Do you want Delete this IP-Registration?');
            }
        }
        else {
            OKSaveandUpdateIPRegistration(Flag);
        }
    }
}

function OKSaveandUpdateIPRegistration(Flag) {
    var data = {};
    data.IPMainId = $("#IPPrimaryId").val();
    data.IPYear = $("#IPYear").val();
    data.IPNumber = $("#IPNumber").val();
    data.OPVisitId = $("#OPVisitId").val();
    data.RegSeries = $("#RegSeriesId").val();
    data.RegNo = $("#RegNumber").val();
    data.PatientId = $("#PatientId").val();
    data.DoctorId = $("#DocName").val();
    data.Date = $("#IPDate").val();
    data.InTime = $("#IPSavedTime").val() + '##' + $("#bystandername").val() + '@@' + $("#bystanderphone").val();
    data.RoomId = $("#RoomId").val();
    data.DelFlag = Flag;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IPRegistrationInsertandUpdate",
        data: data,
        success: function (result) {

            if (result.oList.length > 0) {
                var status = result.oList[0].Status;
                var IPNumber = result.oList[0].IPNumber;
                Showalerts(status, IPNumber);
            }
            else {
                alert("Error")
            }
        }
    });
}

function GetRows(Flag) {
    var dt = new Date();

    var data = {};                                       
    data.IPYear = $('#IpYear').val() // dt.getFullYear();
    data.IPNumber=Flag;
    data.Date = $("#FromDate").val();
    data.DDate = $("#ToDate").val();
    data.DoctorId = $("#DoctorSearchId").val();
    data.PatientId = $("#SearchPatientId").val();
    data.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IPRegistrationGets",
        data: data,
        success: function (result) {
            if (Flag == 0) {
                GetList(result);
            } else {
                GetIPRegistration(result);
            }
        }
    });
}

function GetList(result) {
    $("#listing").show();
    $("#Entry").hide();

    disable_datatable('tbl_IPRegistration');
    var responseText = "<thead><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>IP Date</th>" +
        "<th>IPNumber</th>" +
       
        "<th>Reg#</th>" +
        "<th>Patient</th>" +
        "<th>Contact</th>" +
        "<th>Gender</th>" +
        "<th>Bystander</th>" +
        "<th>Contact</th>" +
       
        "<th>Doctor</th>" +
        "<th>Status</th>" +
        "<th >Edit</th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {

       var AA= (result[i].InTime).split("##");

        if (result[i].Flag == 0) { var Status = '<span class="badge badge-warning">Admitted</span>'; } else { var Status = '<span class="badge badge-info">Discharged</span>'; }

        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td align=center>' + result[i].Date + '</td>' +
            '<td>' + result[i].IPYear + '/' + '' + result[i].IPNumber + '</td>' +
           
            '<td>' + result[i].RegSeriesName + '-' + result[i].RegNo + '</td>' +
            '<td>' + result[i].PatientName + '</td>' +
            '<td>' + result[i].Contact + '</td>' +
            '<td>' + result[i].Gender + '</td>' +
            '<td>' + AA[1] + '</td>' +
            '<td>' + AA[2] + '</td>' +
           
            '<td>' + result[i].DoctorName + '</td>' +
            '<td style="text-align:center">' + Status + '</td>' +
            '<td onclick="GetRows(' + result[i].IPMainId + ')" align=center><a>' + Editbutton + '</a></td>' +
            '</tr>';
    }
    $('#tbl_IPRegistration').html(responseText + "</tbody><tfoot><tr>" +
        "<th> </th>" +
        "<th> </th>" +
        "<th>IPNumber</th>" +
      
        "<th>Reg#</th>" +
        "<th>Patient</th>" +
        "<th>Contact</th>" +
        "<th>Gender</th>" +
        "<th>Bystander</th>" +
        "<th>Contact</th>" +
      
        "<th>Doctor</th>" +
        "<th>Status</th>" +
        "<th > </th>" +
        "</tr></tfoot>");
    datatableWithsearch('tbl_IPRegistration');
    $("#popupdiv").hide();
}

function SaveNewAdmitDateTime() {
    var newAdmitDate = $('#NewAdmitDate').val();
    var newDischargeDate = $('#NewDischargeDate').val();

    // Build admit time string from dropdowns (24-hour for DB storage)
    var admitH = parseInt($('#NewAdmitHour').val() || 0);
    var admitM = $('#NewAdmitMinute').val() || '00';
    var admitAmPm = $('#NewAdmitAmPm').val();
    if (admitAmPm === 'PM' && admitH !== 12) admitH += 12;
    if (admitAmPm === 'AM' && admitH === 12) admitH = 0;
    var admitHH = admitH < 10 ? '0' + admitH : '' + admitH;
    var newAdmitTime = admitHH + ':' + admitM;

    // Validations
    if (!newAdmitDate) {
        warningshow('Please select Admit Date', 'NewAdmitDate');
        return;
    }
    if (!$('#NewAdmitHour').val()) {
        warningshow('Please select Admit Time', 'NewAdmitHour');
        return;
    }

    var status = $('#BadgeStatus').text().trim();
    var newDischargeTime = '';

    if (status === 'Discharged') {
        if (!newDischargeDate) {
            warningshow('Please select Discharge Date', 'NewDischargeDate');
            return;
        }
        if (!$('#NewDischargeHour').val()) {
            warningshow('Please select Discharge Time', 'NewDischargeHour');
            return;
        }

        var disH = parseInt($('#NewDischargeHour').val() || 0);
        var disM = $('#NewDischargeMinute').val() || '00';
        var disAmPm = $('#NewDischargeAmPm').val();
        if (disAmPm === 'PM' && disH !== 12) disH += 12;
        if (disAmPm === 'AM' && disH === 12) disH = 0;
        var disHH = disH < 10 ? '0' + disH : '' + disH;
        newDischargeTime = disHH + ':' + disM;

        var admitParts = newAdmitDate.split('/');
        var disParts = newDischargeDate.split('/');

        var admitDT = new Date(
            parseInt(admitParts[2]),
            parseInt(admitParts[1]) - 1,
            parseInt(admitParts[0]),
            parseInt(admitHH),
            parseInt(admitM)
        );
        var disDT = new Date(
            parseInt(disParts[2]),
            parseInt(disParts[1]) - 1,
            parseInt(disParts[0]),
            disH,
            parseInt(disM)
        );

        if (disDT < admitDT) {
            warningshow('Discharge date/time cannot be before Admit date/time', 'NewDischargeDate');
            return;
        }
    }

    // ── Capture OLD values from screen BEFORE updating ──────────────────
    var oldAdmitDate = $('#IPDate').val();
    var oldAdmitTime = $('#IPSavedTime').val();
    var oldDischargeDate = $('#DDay').text().trim();
    var oldDischargeTime = $('#DTime').text().trim();
    // ────────────────────────────────────────────────────────────────────

    var bystander = $('#bystandername').val() || '';
    var bystanderPhone = $('#bystanderphone').val() || '';
    var inTimeParam = newAdmitTime + '##' + bystander + '@@' + bystanderPhone;

    var data = {};
    data.IPMainId = $('#IPPrimaryId').val();
    data.Date = newAdmitDate;
    data.InTime = inTimeParam;
    data.DDate = newDischargeDate || '';
    data.DTime = newDischargeTime;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.OldAdmitDate = oldAdmitDate;        // ← OLD values
    data.OldAdmitTime = oldAdmitTime;
    data.OldDischargeDate = oldDischargeDate;
    data.OldDischargeTime = oldDischargeTime;

    $.ajax({
        type: 'POST',
        url: '../Revisit/HMS_IPRegistrationUpdateDateTime',
        data: data,
        success: function (result) {
            if (result.oList.length > 0 && result.oList[0].Status == '1') {
                $('#ChangeAdmitDiv').hide();
                $('#IPDate').val(newAdmitDate);
                $('#IPSavedTime').val(newAdmitTime);

                if (status === 'Discharged') {
                    $('#DDay').text(newDischargeDate);
                    $('#DTime').text(newDischargeTime);
                }
                swal('Date & Time', 'Updated Successfully', 'success');
            } else {
                swal('Error', 'Could not update Date & Time', 'error');
            }
        },
        error: function () {
            swal('Error', 'Server error occurred', 'error');
        }
    });
} function GetIPRegistration(result) {

    $("#listing").hide();
    $("#Entry,#btndelete").show();
    if (result.length > 0) {       

        var data = {};                                       //dropdownbind
        data.PatientId = result[0].PatientId;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_PatientSearchGet",
            data: data,
            success: function (result) {
                if (result.oList.length > 0) {
                    GetPatientData(result.oList, 0);
                }
            }
        });
        //if (result[0].Flag == 1) {
        //    $('.collan').text(':');
        //    $('#LDDay').text('Discharge Date');
        //    $('#DDay').text(result[0].DDate);
        //    $('#LDTime').text('Discharge Time');
        //    $('#DTime').text(result[0].DTime);
        //    $("#BadgeStatus").addClass('badge badge-info');
        //    $("#BadgeStatus").text('Discharged');
        //}
        //else {
        //    $("#BadgeStatus").addClass('badge badge-warning');
        //    $("#BadgeStatus").text('Admitted');
        //}

        if (result[0].Flag == 1) {
            $('.collan').text(':');
            $('#LDDay').text('Discharge Date');
            $('#DDay').text(result[0].DDate);
            $('#LDTime').text('Discharge Time');
            $('#DTime').text(result[0].DTime);
            $("#BadgeStatus").addClass('badge badge-info');
            $("#BadgeStatus").text('Discharged');
            if (usermenu1.indexOf("M431") != -1) {
                $("#btnChangeAdmitDateTime").show();
            }
        }
        else {
            $("#BadgeStatus").addClass('badge badge-warning');
            $("#BadgeStatus").text('Admitted');
            if (usermenu1.indexOf("M431") != -1) {
                $("#btnChangeAdmitDateTime").show();
            }
        }
        
    }
    for (var i = 0; i < result.length; i++) {

        $("#IPPrimaryId").val(result[i].IPMainId);
        $("#IPYear").val(result[i].IPYear);

        $("#IPYeardply").val(result[i].IPYear);



        $("#IPNumber").val(result[i].IPNumber);
        $("#OPVisitId").val(result[i].OPVisitId);
        $("#RegSeriesId").val(result[i].RegSeries);
        $("#RegSeries").val(result[i].RegSeriesName);
        $("#RegNumber").val(result[i].RegNo);
        $("#PatientId").val(result[i].PatientId);
        $("#PatName").val(result[i].PatientName);
        $("#DocName").val(result[i].DoctorId);
        $("#IPDate").val(result[i].Date);

        var AA = (result[i].InTime).split("##");

        $("#IPSavedTime").val(AA[0]);

        $("#bystandername").val(AA[1]);
        $("#bystanderphone").val(AA[2]);


        $("#RoomId").val(result[i].RoomId);
        $("#RoomCode").val(result[i].RoomCode);
        $("#RoomName").val(result[i].RoomName);
        if(parseFloat(result[i].RoomRate||0)!=0)
            $("#RoomRate").val(parseFloat(result[i].RoomRate || 0).toFixed(Decimal));
        else
            $("#RoomRate").val('');

    }
    $("#DocName").focus();
}

function Filter() {

    $("#FromDate,#ToDate").val(CurDate);
    $("#DoctorSearch,#SearchRegNo").val('');
    $("#DoctorSearchId,#SearchPatientId").val(0);
    $("#popupdiv").show();
}

function ConfirmboxResult(Result, status, rowid) {
    
    if (Result == 'true' && status == 'Save') {
        OKSaveandUpdateIPRegistration(rowid);
    }
    if (Result == 'true' && status == 'RoomConfirm') {
        SaveandUpdateIPRegistration(rowid, 1);
        return true;
    }
    else if (Result == 'true' && status == 'Update') {
        OKSaveandUpdateIPRegistration(rowid);
    }
    else if (Result == 'true' && status == 'Delete') {
        OKSaveandUpdateIPRegistration(rowid);
    }
    else if (Result == 'true' && status == 'Delete') {
        OKSaveandUpdateIPRegistration(0);
    }
    $('#confirm').fadeOut();

}
function formrefresh() {
    $("#BadgeStatus").removeClass('badge badge-info badge-warning');
    $('.denull').val('');
    SerialNoLoad();
    $('.dezero').val(0);
    $('.detextnull').text('');
    $("#IPDate").val(CurDate);
    $("#LabelDate").text(CurDate);
    $('#myImg').attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
    $("#btndelete").hide();
    $("#btnChangeAdmitDateTime").hide();
}

function Showalerts(Status, IPNumber) {
    if (Status == 1) {
        formrefresh();
        swal('IP Registration: ' + IPNumber + '', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh();
        swal('IP Registration: ' + IPNumber + '', "Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh();
        swal('IP Registration: ' + IPNumber + '', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        swal('IP Registration: ' + IPNumber + ' - Discharged', "Cannot Modify", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        swal('IP Registration: ' + IPNumber + ' - Room Allocated', "Cannot Modify", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh();
        swal('IP Registration: ' + IPNumber + 'Saved Successfully', "Room is not Vacant", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 7) {
        formrefresh();
        swal('IP Registration: ' + IPNumber + ' Updated Successfully', "Room is not Vacant", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 8) {
        swal('Patient Prevoius IP is not Discharged Yet', "Previous IP# : " + IPNumber + "", "warning");
        $('.swal-button swal-button--confirm').focus();

    }
    else {
        swal('IP Already Available', "Against this OPVisit, IP# : " + IPNumber + "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}

function ChangeAdmitDateTime() {
    // Populate admit date
    $('#NewAdmitDate').val($('#IPDate').val());

    // --- Parse admit time from IPSavedTime (stored as 24hr: "19:31") ---
    var savedTime = $('#IPSavedTime').val().trim();
    if (savedTime) {
        var parts = savedTime.split(':');
        var h24 = parseInt(parts[0]);
        var min = (parts[1] || '00').substring(0, 2); // guard against "13 PM" style
        var ampm = h24 >= 12 ? 'PM' : 'AM';
        var h12 = h24 % 12;
        if (h12 === 0) h12 = 12;
        var hh = h12 < 10 ? '0' + h12 : '' + h12;
        $('#NewAdmitHour').val(hh);
        $('#NewAdmitMinute').val(min);
        $('#NewAdmitAmPm').val(ampm);
    }

    // --- Parse discharge time from DTime label ---
    // DTime can be stored/displayed in multiple formats:
    //   "23:13"       (24hr, from DB)
    //   "11:13 PM"    (12hr with AM/PM, if previously set by dropdown)
    //   "23:13 PM"    (mixed - guard against this too)
    var dischargeTimeText = $('#DTime').text().trim();
    if (dischargeTimeText) {
        var dtAmPm = 'AM';
        var dtH24, dtMin;

        if (dischargeTimeText.indexOf(' ') !== -1) {
            // Has a space — could be "11:13 PM" or "23:13 PM"
            var spParts = dischargeTimeText.split(' ');
            var timeParts = spParts[0].split(':');
            dtH24 = parseInt(timeParts[0]);
            dtMin = timeParts[1] || '00';
            var rawAmPm = (spParts[1] || '').toUpperCase();

            if (dtH24 > 12) {
                // 24-hr value — ignore the AM/PM text, derive from hour
                dtAmPm = dtH24 >= 12 ? 'PM' : 'AM';
            } else {
                dtAmPm = (rawAmPm === 'PM') ? 'PM' : 'AM';
                if (dtAmPm === 'PM' && dtH24 !== 12) dtH24 += 12;
                if (dtAmPm === 'AM' && dtH24 === 12) dtH24 = 0;
            }
        } else {
            // No space — pure 24-hr "23:13"
            var timeParts = dischargeTimeText.split(':');
            dtH24 = parseInt(timeParts[0]);
            dtMin = timeParts[1] || '00';
            dtAmPm = dtH24 >= 12 ? 'PM' : 'AM';
        }

        // Convert to 12-hour for dropdown
        var dtH12 = dtH24 % 12;
        if (dtH12 === 0) dtH12 = 12;
        var dtHH = dtH12 < 10 ? '0' + dtH12 : '' + dtH12;

        $('#NewDischargeHour').val(dtHH);
        $('#NewDischargeMinute').val(dtMin);
        $('#NewDischargeAmPm').val(dtAmPm);
    }

    // Populate discharge date
    $('#NewDischargeDate').val($('#DDay').text().trim());

    var status = $('#BadgeStatus').text().trim();

    if (status === 'Admitted') {
        $('#NewDischargeDate').prop('disabled', true).css('background-color', '#e9ecef');
        $('#NewDischargeHour, #NewDischargeMinute, #NewDischargeAmPm')
            .prop('disabled', true).css('background-color', '#e9ecef');
    } else {
        $('#NewDischargeDate').prop('disabled', false).css('background-color', 'white');
        $('#NewDischargeHour, #NewDischargeMinute, #NewDischargeAmPm')
            .prop('disabled', false).css('background-color', 'white');
    }

    $('#ChangeAdmitDiv').show();
}
function closelist() {
    
    $("#listing").hide();
    $("#Entry").show();
    Defaultfocus();
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

function datatableWithsearch(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');
    });
    var table = null;
    if (download) {
        if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }

        // AddColumnSelectionButton(tableButtonContainerId, tablename)

        table = $('#' + tablename).DataTable({
            // dom: 'Bfrtip',
            dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-1'i><'col-sm-11'p>>",
            buttons: [],
            "columnDefs": [
                            { "width": "15%", "targets": 5 },
                            { "width": "15%", "targets": 10 },
            ],

        });
        new $.fn.dataTable.Buttons(table, {
            buttons: [
            {
                extend: 'collection',
                text: 'Export',
                className: 'excelexport',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    }
                ]
            },
            'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");

    } else {
        table = $('#' + tablename).DataTable({
            "columnDefs": [
                            { "width": "5%", "targets": 11 },
                            { "width": "7%", "targets": 10 },
            ],
        });
    }
    
    
    table.columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();

            }
        });
    });
    if (ExcelExport == 0) {
        $('.excelexport').hide();
    }
}




function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}