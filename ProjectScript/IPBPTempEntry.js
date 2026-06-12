var colorArray = ['#33ccff', '#ff66cc', '#ff9966', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D'];
var Count = 0;
$(document).ready(function () {
    $('#Temp_').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13||38) {
            e.preventDefault();
           
        }
    });
  
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate();
        
    });
  
});
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

    GetList(CurDate, CurDate, 0, 0,'Temperature');

    $("#btnsearch").click(function (e) {

        var Flag = $("input[name=entrytype]:checked").val();

        GetList($('#FromDate').val(), $('#ToDate').val(), $("#DoctorId").val(), $("#PatientId").val(),Flag);
    });
    $("#btnrefresh").click(function (e) {
        formrefresh()
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
                            AdmitDate: item.FromDate,
                            AdmitTime: item.ToDate,
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
           
        },
    });


}



function GetType(Flag) {
    GetList($('#FromDate').val(), $('#ToDate').val(), $("#DoctorId").val(), $("#PatientId").val(),Flag);
}


function GetList(FromDate, ToDate, Doctor, Patient,Flag) {

    $("#LoadingSmall").show();

    var data = {};
    data.FromDate = '';
    data.ToDate = '';
    data.DoctorId = 0;
    data.PatientId = Patient;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Flag = 0;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IP_BP_TempEntryGets",
        data: data,
        success: function (result) {

            if (Flag == 'Temperature') {
                LoadList(result);
            }
            else {
                LoadListBP(result);
            }
        }
    });
}

function LoadList(result) {
    Count = result.length;
    disable_datatable('tbl_WorkSheet');
    var responseText = "<thead><tr>" +
        "<th> </th>" +
        "<th>Reg#</th>" +
        "<th>IP#</th>" +
        "<th> </th>" +
        "<th>Patient</th>" +
        "<th> </th>" +

        "<th>Contact</th>" +
        "<th>Room</th>" +
        "<th> </th>" +
        "<th> </th>" +
        "</tr><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>Reg#</th>" +
        "<th>IP#</th>" +
        "<th>Date</th>" +
        "<th>Patient</th>" +
        "<th>Gender</th>" +
        
        "<th>Contact</th>" +
        "<th>Room</th>" +
        "<th>Temperature</th>" +
        "<th></th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {

        if (result[i].DelFlag == 0) var Status = '<span class="badge badge-danger">Admitted</span>';
        else var Status = '<span class="badge badge-info">Discharged</span>';

        var slno = parseInt(i + 1);
        responseText += '<tr id="MTr_' + slno + '">' +
            '<td align=center>' + slno +
            '<input type="hidden" id="OPVisitId_' + slno + '" value="' + result[i].RevisitId + '" />' +
            '<input type="hidden" id="OPSerId_' + slno + '" value="' + result[i].OPSerId + '" />' +
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

            '<td>' + result[i].Contact + '</td>' +
            '<td>' + result[i].ShiftName + '</td>' +
            '<td align=center><input type="text" class="form-control smallTextBox" onkeypress="return TempNumber(event,this)" onkeydown=FocusNext(event,\'\',\'Temp_\',\'\',\'' + slno + '\',\'MTr_\') id="Temp_' + slno + '" /></td>' +
            '<td align="center">' +
            '<button class="btn btn-outline-danger btn-sm m-0" onclick="GetTempandBPGraph(\'' + slno + '\',1,0,\'line\')"><i class="fa fa-thermometer-half"></i></button>' +
            '</td>' +
            '</tr>';
    }
    $('#tbl_WorkSheet').html(responseText + "</tbody>");
    var title = 'IP Temperature Entry '
    datatableWithsearch('tbl_WorkSheet', true, title, 'itemListButtonPlace');
    $("#LoadingSmall").hide();
    $("#Temp_1").focus();
    $("#MTr_1").addClass("rowactive");
}

function FocusNext(e, P_Col, C_Col, N_Col, RowId, TR) {


    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if ((key == 13 || key == 40) && RowId != 0 && C_Col != '')          // Down Arrow
    {
        $("#tbl_WorkSheet tr").removeClass("rowactive");

        e.preventDefault();
        var Rid;

        try { Rid = ($('#' + TR + RowId).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; }
        catch (err) { Rid = RowId; }

        $("#" + C_Col + Rid).focus().select();
        $("#" + TR + Rid).addClass("rowactive");

    }
    else if (key == 38 && RowId != 0 && C_Col != '') {           // Up Arrow

        $("#tbl_WorkSheet tr").removeClass("rowactive");
        e.preventDefault();
        var Rid;

        try { Rid = ($('#' + TR + RowId).closest('tr').prev('tr').attr('id')).match(/\d+/)[0]; }
        catch (err) { Rid = RowId; }

        $("#" + C_Col + Rid).focus().select();
        $("#" + TR + Rid).addClass("rowactive");

    }
}

function TempNumber(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8  && charCode != 13 && (charCode < 48 || charCode > 57) && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}


function ConfirmboxResult(Result, status, rowid) {


    if (Result == 'true' && status == 'Save') {
        OKSaveAndUpdate()
    }

    $('#confirm').fadeOut();
}

function SaveAndUpdate() {
    var Status = $("input[name='entrytype']:checked").val();
    $('#Confirmflag').val('Save'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to save this ' + Status + ' Entry?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}
function OKSaveAndUpdate() {
  
    var Temp;
    var Status = $("input[name='entrytype']:checked").val();
    
   
    var oArray = new Array();
    for (var k = 1; k <= Count; k++) {
   
        if (Status == 'Temperature') {
            Temp = $.trim($('#Temp_' + k).val());
        }
        else {
            Temp = $.trim($('#BP_' + k).val());
        }
        
        if (Temp != '') {

            var IPMainId = $('#IPMainId').val();
            var PatientId = $('#PatientId_' + k).val();
            var RegSeries = $('#OPSerId_' + k).val();
            var RegNo = $('#OPNumber_' + k).val();
            var IPNumber = $('#IPNumber_' + k).val();
            var IPYear = $('#IPYear_' + k).val();
            var OPVisitId = $('#OPVisitId_' + k).val();
            var DDate = CurDate;
            var DTime = '';
            var Status = Status;
            var RegSeriesName = '';
            var PatientName = Temp;
            var InTime = '';
            var DelFlag = 1;
            var DeptId = ERPDeptId;
            var UserId = ERPUserId;

            if ($('#PatientId_' + k).val() != undefined) {

                oArray.push({

                    'IPMainId': IPMainId,
                    'PatientId': PatientId,
                    'RegSeries': RegSeries,
                    'RegNo': RegNo,
                    'IPNumber': IPNumber,
                    'IPYear': IPYear,
                    'OPVisitId': OPVisitId,
                    'DDate': DDate,
                    'DTime': DTime,
                    'Status': Status,
                    'RegSeriesName': RegSeriesName,
                    'PatientName': PatientName,
                    'InTime': InTime,
                    'DelFlag': DelFlag,
                    'DeptId': DeptId,
                    'UserId': UserId

                })
                

            }
        }
    }
    console.log(oArray)
    if (oArray != "") {
        var data = { 'IPRegistration': oArray };
        $.ajax({
        type: "POST",
        url: "../Master/HMS_IP_BPTEMPInsertandUpdate",
        data: data,
        success: function (result) {

            var status = result.oList[0].Status;
            ShowalertsSave(status);
            
            $('#btnsubmit').prop('disabled', false);
            formrefresh();
        }
        });
      
    }
    else {
        warningshow('No ' + Status + ' Entries Available', '');
    }
   

}

function GetGraph() {
    var x = $("input[name='GraphType']:checked").val();
    GetTempandBPGraph(0, x, 1, 'line')
}


function GetTempandBPGraph(Id, Flag, Selection, GrType) {
    
    var FromDate = CurDate; var ToDate = CurDate;

    var Temp = 'Temperature'; if (Flag == 2) { Temp = 'BP'; }

   
        if (Selection == 0) {
            $('#TempFromDate,#TempToDate').val(CurDate);
            $("#CurrentGraph").val(Id);
        }
        else {
            var FromDate = $('#TempFromDate').val(); 
            var ToDate = $('#TempToDate').val();
            Id = $("#CurrentGraph").val();
        }
        $("#TempPatName").text($("#PatientName_" + Id).val());

    var data = {};
    data.IPYear = $("#IPYear_" + Id).val();
    data.IPNumber = $("#IPNumber_" + Id).val();
    data.Date = FromDate;
    data.DDate = ToDate;
    data.Status = Temp;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IP_BPTempGraph",
        data: data,
        success: function (result) {
            ShowPopup(Flag);
            if (Flag==1)
                LoadTempGraph(result, GrType);
            else
                LoadBPGraph(result, GrType);

            if (result.length == 0) {
                $(".graphnull").text('');
            }
        }
    }); 
}

function LoadTempGraph(result, GrType) {
    var Date = []; var Temp = [];

    for (var i = 0; i < result.length; i++) {
        Date.push(result[i].Date + ' - ' + result[i].InTime);
        Temp.push(Number(result[i].Status));
        $("#TempAdmitDate").text(result[i].DOB);
        $("#TempAdmitTIme").text(result[i].Contact);
    }

    Highcharts.chart('ContainerTemp', {
        chart: {
            type: GrType
        },
        title: {
            text: 'Temperature Graph'
        },

        subtitle: {
            text: $("#TempFromDate").val() + ' to ' + $("#TempToDate").val()
        },
        xAxis: {
            categories: Date
        },
        yAxis: {
            title: {
                text: 'Temperature'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Temperature',
            data: Temp
        }]
    });
}
function LoadBPGraph(result, GrType) {
    var Date = []; var BP = [];

    for (var i = 0; i < result.length; i++) {
        Date.push(result[i].Date + ' - ' + result[i].InTime);
        BP.push(Number(result[i].Status));
        $("#TempAdmitDate").text(result[i].DOB);
        $("#TempAdmitTIme").text(result[i].Contact);
    }

    Highcharts.chart('ContainerTemp', {
        chart: {
            type: GrType
        },
        title: {
            text: 'Blood Pressure Graph'
        },

        subtitle: {
            text: $("#TempFromDate").val() + ' to ' + $("#TempToDate").val()
        },
        xAxis: {
            categories: Date
        },
        yAxis: {
            title: {
                text: 'BP'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'BP',
            data: BP
        }]
    });
}


function ShowPopup(Flag) {

        
        if (Flag == 1) {
            $("#PopupHead").text('Temperature Graph');
            $("#btngraphtemp").prop("checked",true);
        }
        else {
            $("#PopupHead").text('Blood Pressure Graph');
            $("#btngraphbp").prop("checked", true);
        }
        if (!($('#TemperatureG').is(':visible'))) {
            $("#TemperatureG").modal("show");
            $("#TemperatureG").appendTo("body");
        }
}


function PopUpClose(Flag) {
    if (Flag == 1)
        $("#TemperatureG").modal("hide");
    
    else if (Flag == 0) {
        $("#TemperatureG").modal("hide");
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

function formrefresh() {

    $('.dedate').val(CurDate);
    $('.denull').val('');
    $('.dezero').val(0);
    //$('#btntemp').prop("checked", true);

    var Flag = $("input[name=entrytype]:checked").val();

    GetList(CurDate, CurDate, 0, 0, Flag);

}
function ShowalertsSave(Status) {
    if (Status == 1) {
       
        swal(' Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
  

}

function LoadListBP(result) {
    Count = result.length;
    disable_datatable('tbl_WorkSheet');
    var responseText = "<thead><tr>" +
        "<th> </th>" +
        "<th>Reg#</th>" +
        "<th>IP#</th>" +
        "<th> </th>" +
        "<th>Patient</th>" +
        "<th> </th>" +

        "<th>Contact</th>" +
        "<th>Room</th>" +
        "<th> </th>" +
        "<th> </th>" +
        "</tr><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>Reg#</th>" +
        "<th>IP#</th>" +
        "<th>Date</th>" +
        "<th>Patient</th>" +
        "<th>Gender</th>" +

        "<th>Contact</th>" +
        "<th>Room</th>" +
        "<th>Blood Pressure</th>" +
        "<th></th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {

        if (result[i].DelFlag == 0) var Status = '<span class="badge badge-danger">Admitted</span>';
        else var Status = '<span class="badge badge-info">Discharged</span>';

        var slno = parseInt(i + 1);
        responseText += '<tr id="MTr_' + slno + '">' +
            '<td align=center>' + slno +
            '<input type="hidden" id="OPVisitId_' + slno + '" value="' + result[i].RevisitId + '" />' +
            '<input type="hidden" id="OPSerId_' + slno + '" value="' + result[i].OPSerId + '" />' +
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

            '<td>' + result[i].Contact + '</td>' +
            '<td>' + result[i].ShiftName + '</td>' +
            '<td align=center><input type="text" class="form-control smallTextBox" id="BP_' + slno + '" onkeydown=FocusNext(event,\'\',\'BP_\',\'\',\'' + slno + '\',\'MTr_\') /></td>' +
             '<td align="center">' +
            '<button class="btn btn-outline-danger btn-sm m-0" onclick="GetTempandBPGraph(\'' + slno + '\',2,0,\'line\')"><i class="fa fa-heartbeat"></i></button>' +
            '</td>' +
            '</tr>';
    }
    $('#tbl_WorkSheet').html(responseText + "</tbody>");
    var title = 'IP BP Entry ';
    datatableWithsearch('tbl_WorkSheet', true, title, 'itemListButtonPlace');

    $("#BP_1").focus();
    $("#MTr_1").addClass("rowactive");
    $("#LoadingSmall").hide();
}






function datatableWithsearch(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tr:eq(0) th'
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
            dom: "<'row'<'col-sm-1'><'col-sm-11'>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-1'i><'col-sm-11'>>",
            buttons: [],
            "columnDefs": [
                                   { "width": "1%", "targets": 0 },
                                   { "width": "2%", "targets": 1 },
                                   { "width": "2%", "targets": 2 },
                                   { "width": "2%", "targets": 3 },
                                   { "width": "15%", "targets": 4 },
                                   { "width": "1%", "targets": 5 },
                                   
                                   { "width": "4%", "targets": 6 },
                                   { "width": "5%", "targets": 7 },
                                   { "width": "5%", "targets": 8 },
                                   { "width": "2%", "targets": 9 },
            ],
            "pageLength": -1,
            
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
    else {

        table = $('#' + tablename).DataTable({


        });
    }
    table.columns().every(function (index) {
        $('#' + tablename + ' thead tr:eq(0) th:eq(' + index + ') input').on('keyup change', function () {
            table.column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
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

$(document).keydown(function (e) {

    var X = event.keyCode;

    if (X == 27) {
        PopUpClose(0);
    }
});