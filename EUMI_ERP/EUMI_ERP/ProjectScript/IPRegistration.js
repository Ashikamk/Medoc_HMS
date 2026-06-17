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

function GetIPRegistration(result) {

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
        if (result[0].Flag == 1) {
            $('.collan').text(':');
            $('#LDDay').text('Discharge Date');
            $('#DDay').text(result[0].DDate);
            $('#LDTime').text('Discharge Time');
            $('#DTime').text(result[0].DTime);
            $("#BadgeStatus").addClass('badge badge-info');
            $("#BadgeStatus").text('Discharged');
        }
        else {
            $("#BadgeStatus").addClass('badge badge-warning');
            $("#BadgeStatus").text('Admitted');
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