var colorArray = ['#33ccff', '#ff66cc', '#ff9966', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D'];
$(function () {
    $('.dedate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $('.dedate').val(CurDate);

    GetList(CurDate, CurDate, 0, 0);

    $("#btnsearch").click(function (e) {
        GetList($('#FromDate').val(), $('#ToDate').val(), $("#DoctorId").val(), $("#PatientId").val());
    });
    $("#btnrefresh").click(function (e) {
        $('.dedate').val(CurDate);
        $('.denull').val('');
        $('.dezero').val(0);
        $('#btnadmitted').prop("checked", true);

        GetList(CurDate, CurDate, 0, 0);
    });

    $("#tbl_WorkSheet").on('touchstart mousedown', function (e) {

        if (e.button == 2) {
            var o = {
                left: e.pageX,
                top: e.pageY
            };
            $("#divContainerNew").offset(o);
        }
    });

    $('#myModal').on('shown.bs.modal', function () {
        $('#RA_RegNumber').focus();
    });
    $('#myModal_2').on('shown.bs.modal', function () {
        $('#RC_RegNumber').focus();
    });
    
   
});

function RegNoLoad(Id) {
    $("#" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {

            if (Id == "RegNo") {
                $("#PatientId").val(0);
            }
            else if (Id == "RA_RegNumber") {
                $("#RA_IPNumber,#RA_PatName,#RA_IPYear").val('')
            }
            else if (Id == "RC_RegNumber") {
                $("#RC_IPNumber,#RC_PatName,#RC_IPYear,#RC_AdmitDate").val('')
            }

            var data = {};
            data.PatientName = $("#" + Id).val();
            data.Flag = 0;
            data.DeptId = ERPDeptId;
            $.ajax({
                url: '../Revisit/HMS_IPPatientSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'GR3',
                            label: item.OPSerName + ' - ' + item.OPNumber,
                            label1: item.PatientName,
                            label2: item.AadharNo,            //IP NUMBER
                            PatientId: item.PatientId,
                            DOB: item.DOB,
                            Contact: item.Contact,
                            OPNumber: item.OPNumber,
                            PatientName: item.PatientName,
                            IpNo: item.AadharNo,
                            IPYear: item.Status,
                            AdmitDate:item.FromDate,
                            AdmitTime:item.ToDate,
                            headers: ["RegNo", "Patient", "IP No"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,

        select: function (event, ui) {
            
            if (Id == "RegNo") {
                $("#PatientId").val(ui.item.PatientId);
                $("#btnsearch").focus();
            }
            else if (Id == "RA_RegNumber" || Id == "RC_RegNumber") {
                if (ui.item.IpNo == 0) {
                    warningshow('Patient Not Registred for IP', 'RA_RegNumber');
                    return false;
                }
                else if (Id == "RA_RegNumber"){
                    $("#RA_IPNumber").val(ui.item.IpNo);
                    $("#RA_PatName").val(ui.item.PatientName);
                    $("#RA_IPYear").val(ui.item.IPYear);
                    $("#RA_RoomCode").focus().select();
                }
                else if (Id == "RC_RegNumber") {
                    $("#RC_IPNumber").val(ui.item.IpNo);
                    $("#RC_PatName").val(ui.item.PatientName);
                    $("#RC_IPYear").val(ui.item.IPYear);
                    $("#RC_AdmitDate").val(ui.item.AdmitDate +' - '+(ui.item.AdmitTime));
                    $("#RC_RoomCode").focus().select();


                    GetRoomAllocationDeatils(ui.item.IpNo, ui.item.IPYear);

                }
            }
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && Id == "RA_RegNumber") {
            $("#RA_RoomCode").focus().select();
        }
        else if ((e.which == 13) && Id == "RC_RegNumber") {
            $("#RC_RoomCode").focus().select();
        }

    });

    
}

function GetRoomAllocationDeatils(IpNo,IPYear){
    var data = {};
    data.IPYear = IPYear;
    data.IPNumber = IpNo;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_RoomIPDetails",
        data: data,
        success: function (result) {
            LoadRoomAllocationDeatils(result.oList)         
        }
    });
}

function LoadRoomAllocationDeatils(result) {

    disable_datatable('tbl_RoomDetails');
    var responseText = "<thead><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>Room</th>" +
        "<th>FromDate</th>" +
        "<th>FromTime</th>" +
        "<th>ToDate</th>" +
        "<th>ToTime</th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {



        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td>' + result[i].RoomCode + '</td>' +
            '<td>' + result[i].Date + '</td>' +
            '<td>' + result[i].InTime + '</td>' +
            '<td>' + result[i].DDate + '</td>' +
            '<td>' + result[i].DTime + '</td>' +            
            '</tr>';
    }
    $('#tbl_RoomDetails').html(responseText + "</tbody>");
    datatableWithsearch('tbl_RoomDetails');
}

function RoomSearch(Id) {
    $("#" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            if (Id == 'RA_RoomCode') {
                $("#RA_RoomId").val(0);
                $("#RA_RoomName,#RA_RoomRate").val('');
            }
            else if (Id == 'RC_RoomCode') {
                $("#RC_RoomId").val(0);
                $("#RC_RoomName,#RC_RoomRate").val('');
            }
           
            var data = {};
            data.RoomName = $("#" + Id).val();

            $.ajax({
                url: '../Revisit/HMS_VacantRoomGets',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '2',
                            label: item.RoomCode,
                            label1: item.RoomName,
                            RoomName: item.RoomName,
                            RoomId: item.RoomId,
                            Rate: item.RoomRate,
                            headers: ["Code", "Name"]
                        })
                    }));
                }



            })
        },
        autoFocus: true,

        select: function (event, ui) {

            if (Id == 'RA_RoomCode') {

                $("#RA_RoomId").val(ui.item.RoomId);
                $("#RA_RoomName").val(ui.item.RoomName);
                $("#RA_RoomRate").val(parseFloat(ui.item.Rate || 0).toFixed(Decimal));
                $("#btnRASave").focus();
            }
            else if (Id == 'RC_RoomCode') {

                $("#RC_RoomId").val(ui.item.RoomId);
                $("#RC_RoomName").val(ui.item.RoomName);
                $("#RC_RoomRate").val(parseFloat(ui.item.Rate || 0).toFixed(Decimal));
                $("#btnRCSave").focus();
            }
        },

    }).on('keydown', function (e) {
        if ((e.which == 13) && Id == "RA_RoomCode") {
            $("#btnRASave").focus();
        }
        else if ((e.which == 13) && Id == "RC_RoomCode") {
            $("#btnRCSave").focus();
        }

    });
}

function GetList(FromDate, ToDate, Doctor, Patient) {

    var Type = 0;
    if ($("#btndischarged").prop("checked") == true) Type = 1;
    else if($("#btnall").prop("checked") == true) Type = 2;

    var data = {};
    data.FromDate = FromDate;
    data.ToDate = ToDate;
    data.DoctorId = Doctor;
    data.PatientId = Patient;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Flag = Type;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IPWorkSheetDoctor",
        data: data,
        success: function (result) {

            LoadList(result);
        }
    });
}

function LoadList(result) {

    disable_datatable('tbl_WorkSheet');
    var responseText = "<thead><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>Reg#</th>" +
        "<th>IP#</th>" +
        "<th>Date</th>" +
        "<th>Patient</th>" +
        "<th>Gender</th>" +
        "<th>DOB</th>" +
        "<th>Contact</th>" +
        "<th>Room</th>" +
        "<th>Status</th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {

        if (result[i].DelFlag == 0) var Status = '<span class="badge badge-danger">Admitted</span>';
        else var Status = '<span class="badge badge-info">Discharged</span>';

        var slno = parseInt(i + 1);
        responseText += '<tr  onmousedown="WhichButton(event,' + slno + ')" oncontextmenu="return false">' +
            '<td align=center>' + slno +
            '<input type="hidden" id="OPVisitId_' + slno + '" value="' + result[i].RevisitId + '" />' +
            '<input type="hidden" id="OPSerName_' + slno + '" value="' + result[i].OPSerName + '" />' +
            '<input type="hidden" id="OPNumber_' + slno + '" value="' + result[i].OPNumber + '" />' +
            '<input type="hidden" id="PatientId_' + slno + '" value="' + result[i].PatientId + '" />' +
            '<input type="hidden" id="DOB_' + slno + '" value="' + result[i].DOB + '" />' +
            '<input type="hidden" id="BloodGroup_' + slno + '" value="' + result[i].BloodGroup + '" />' +
            '<input type="hidden" id="PatientName_' + slno + '" value="' + result[i].PatientName + '" />' +
            '<input type="hidden" id="Gender_' + slno + '" value="' + result[i].Gender + '" />' +
            '<input type="hidden" id="IPYear_' + slno + '" value="' + result[i].Flag + '" />' +
            '<input type="hidden" id="IPNumber_' + slno + '" value="' + result[i].IPNumber + '" />' +
            '<input type="hidden" id="AdmittedDate_' + slno + '" value="' + result[i].RevisitDate + '" />' +
            '<input type="hidden" id="AdmittedTime_' + slno + '" value="' + result[i].Status + '" />' +
            '</td>' +
            '<td>' + result[i].OPSerName + '/' + result[i].OPNumber + '</td>' +
            '<td>' + result[i].Flag + '/' + result[i].IPNumber + '</td>' +
            '<td>' + result[i].RevisitDate + '</td>' +
            '<td>' + result[i].PatientName + '</td>' +
            '<td>' + result[i].Gender + '</td>' +
            '<td>' + result[i].DOB + '</td>' +
            '<td>' + result[i].Contact + '</td>' +
            '<td>' + result[i].ShiftName + '</td>' +
            '<td align=center>' + Status + '</td>' +
            '</tr>';
    }
    $('#tbl_WorkSheet').html(responseText + "</tbody><tfoot><tr>" +
        "<th> </th>" +
        "<th>Reg#</th>" +
        "<th>IP#</th>" +
        "<th> </th>" +
        "<th>Patient</th>" +
        "<th> </th>" +
        "<th>DOB</th>" +
        "<th>Contact</th>" +
        "<th>Room</th>" +
        "<th> </th>" +
        "</tr></tfoot>");
    var title = 'IP WorkSheet From ' + $("#FromDate").val() + ' To ' + $("#ToDate").val();
    datatableWithsearch('tbl_WorkSheet', true, title, 'itemListButtonPlace');
}

function ShowModal(Flag) {
    if (Flag == 0)  // Room Allocation
    {
        $("#RA_IPYear,#RA_IPNumber,#RA_PatName,#RA_RegNumber,#RA_RoomCode,#RA_RoomName,#RA_RoomRate").val('');
        $("#RA_Date").val(CurDate);
        $("#RA_RoomId").val(0);
        $("#myModal").modal("show");
        $("#myModal").appendTo("body");
    }
    if (Flag == 1)  // Room Change
    {
        GetRoomAllocationDeatils(0,0)
        var date = new Date();
        var Hour = date.getHours(); if (Hour < 10) Hour = '0' + Hour;
        var Minutes = date.getMinutes(); if (Minutes < 10) Minutes = '0' + Minutes;

        $("#RC_Time").val(Hour + ":" + Minutes);
        $("#RC_TimeID").val('A');


        $("#RC_RegNumber,#RC_IPNumber,#RC_PatName,#RC_IPYear,#RC_AdmitDate,#RC_RoomCode,#RC_RoomName,#RC_RoomRate,#RC_Remarks").val('');
        $("#RC_RoomId").val(0);

        $("#myModal_2").modal("show");
        $("#myModal_2").appendTo("body");
    }

}

function ngOnDestroy(Flag) {
    if (Flag == 0) {
        $("#myModal").modal("hide");
    }
    else if (Flag == 1) {
        $("#myModal_2").modal("hide");
    }
}

function SaveRoomAllocation() {
    if (parseInt($("#RA_IPNumber").val() || 0) == 0) {
        warningshow('Patient Not Registred for IP', 'RA_RegNumber');
        return false;
    }
    else if (parseInt($("#RA_RoomId").val() || 0) == 0) {
        warningshow('Room Not Selected', 'RA_RoomCode');
        return false;
    }
    else {
        var data = {};

        data.IPYear = $("#RA_IPYear").val();
        data.IPNumber = $("#RA_IPNumber").val();
        data.Date = $("#RA_Date").val();
        data.InTime = $("#RA_Time").val();
        data.RoomId = $("#RA_RoomId").val();
        data.DelFlag = 1;
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;

        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_RoomAllocation",
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
}


function SaveRoomChange() {

    if (parseInt($("#RC_IPNumber").val() || 0) == 0) {
        warningshow('Patient Not Registred for IP', 'RC_RegNumber');
        return false;
    }
    else if (parseInt($("#RC_RoomId").val() || 0) == 0) {
        warningshow('Room Not Selected', 'RC_RoomCode');
        return false;
    }
    else if (parseInt($("#RC_TimeID").val() || 0) == 0 && $("#RC_TimeID").val()!='A') {
        warningshow('Time Not Selected', 'RC_Time');
        return false;
    }
    else {

        var data = {};
        data.IPYear = $("#RC_IPYear").val();
        data.IPNumber = $("#RC_IPNumber").val();
        data.Date = $("#RC_Date").val();
        data.InTime = $("#RC_Time").val();
        data.RoomId = $("#RC_RoomId").val();
        data.Status = $("#RC_Remarks").val();
        data.DelFlag = 1;
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;

        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_RoomChange",
            data: data,
            success: function (result) {

                if (result.oList.length > 0) {
                    var status = result.oList[0].Status;
                    var IPNumber = result.oList[0].IPNumber;
                    ShowalertsRC(status, IPNumber);
                }
                else {
                    alert("Error")
                }
            }
        });
    }
}


function Showalerts(Status, IPNumber) {
    if (Status == 1) {
        ngOnDestroy(0);
        swal('Room Allocated for IP# : ' + IPNumber + '', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {

        swal('Selected Room for IP# : ' + IPNumber + '', "is Occupied", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Room For IP# : ' + IPNumber + '', "Already Allotted", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
}

function ShowalertsRC(Status, IPNumber) {
    if (Status == 1) {
        ngOnDestroy(1);
        swal('Room Changed for IP# : ' + IPNumber + '', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {

        swal('Selected Room for IP# : ' + IPNumber + '', "is Occupied", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 3) {

       swal('IP# : ' + IPNumber + '', "Already Discharged", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('IP# : ' + IPNumber + '', "Room Not Alloted to Change", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
}

function WhichButton(e, Id) {
    if (e.button == 2)  //Right Click
    {
        $("#divContainerNew").slideDown(500);
        $("#CurrentselectedId").val(Id);
    }
}

function RedirectTo(Flag) {
    if ($("#CurrentselectedId").val() != 0) {
        var Id = $("#CurrentselectedId").val();

        if (Flag == 1) //Case Sheet
        {
            //window.open('../Revisit/LabBill?from=SOPWorkSheet', '_blank');
        }
        else if (Flag == 2)    //Lab Result
        {
            sessionStorage.setItem("SOP_OV", $("#OPVisitId_" + Id).val());
            sessionStorage.setItem("SOP_RS", $("#OPSerName_" + Id).val());
            sessionStorage.setItem("SOP_RN", $("#OPNumber_" + Id).val());
            sessionStorage.setItem("SOP_PI", $("#PatientId_" + Id).val());
            sessionStorage.setItem("SOP_DO", $("#DOB_" + Id).val());
            sessionStorage.setItem("SOP_BG", $("#BloodGroup_" + Id).val());
            sessionStorage.setItem("SOP_PN", $("#PatientName_" + Id).val());
            sessionStorage.setItem("SOP_GE", $("#Gender_" + Id).val());
            sessionStorage.setItem("SOP_IP", $("#IPNumber_" + Id).val());


            window.open('../Revisit/LabResult?from=SOPWorkSheet', '_blank');
        }
        else if (Flag == 3) //Temperature
        {
            window.open('../Revisit/IPBPTempEntry', '_blank');
        }
        else if (Flag == 4) //Temperature
        {

            sessionStorage.setItem("SOP_PI", $("#PatientId_" + Id).val());            
            sessionStorage.setItem("SOP_IP", $("#IPNumber_" + Id).val());
            sessionStorage.setItem("SOP_IPY", $("#IPYear_" + Id).val());
            sessionStorage.setItem("SOP_PN", $("#PatientName_" + Id).val());
            sessionStorage.setItem("SOP_AD", $("#AdmittedDate_" + Id).val());
            sessionStorage.setItem("SOP_AT", $("#AdmittedTime_" + Id).val());
            sessionStorage.setItem("SOP_OV", $("#OPVisitId_" + Id).val());
            sessionStorage.setItem("SOP_RS", $("#OPSerName_" + Id).val());
            sessionStorage.setItem("SOP_RN", $("#OPNumber_" + Id).val());


            window.open('../Revisit/IPStatement?from=SOPWorkSheet', '_blank');
        }
    }
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
                                   { "width": "1%", "targets": 0 },
                                   { "width": "2%", "targets": 1 },
                                   { "width": "2%", "targets": 2 },
                                   { "width": "2%", "targets": 3 },
                                   { "width": "15%", "targets": 4 },
                                   { "width": "1%", "targets": 5 },
                                   { "width": "2%", "targets": 6 },
                                   { "width": "4%", "targets": 7 },
                                   { "width": "5%", "targets": 8 },
                                   { "width": "2%", "targets": 9 },
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

    }
    else if (tablename == 'tbl_RoomDetails') {
        table = $('#' + tablename).DataTable({
            "dom": 't',
            "paging": false,
            "searching": false

        });
    }
    else {
        table = $('#' + tablename).DataTable({


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

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}