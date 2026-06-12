var FirstId = 0;
$(document).ready(function () {
    Defaultfocus();
    DoctorLoad();
    $('#myModal').on('shown.bs.modal', function () {
        $('#NormalValue_0').focus();
    });

    $('#signimg').attr('src', "../app-assets/img/Signs/" + ERPUserId + ".jpeg");
    //$("#btnmail").click(function (e) {
       
    //});

    //var doc = new jsPDF();
    //var specialElementHandlers = {
    //    "#editor": function (element, renderer) {
    //        return true;
    //    }
    //};
    //$("#btnmail").click(function () {
    //    doc.fromHTML($("#content").html(), 15, 15, {
    //        width: 190,
    //        elementHandlers: specialElementHandlers
    //    });
    //    doc.save("sample-page.pdf");
    //});



    $("#btnsubmit").click(function (e) {
        SaveandUpdateResult(1);
    });
    $("#btnlist").click(function (e) {
        $("#FromDate,#ToDate").val(CurDate);
        $("#DoctorSearchId,#PatientSearchId").val(0);

        GetRows(0,0,0,0);
        formrefresh();
    });
    $("#btnnew").click(function (e) {
        formrefresh();
    });
    $("#btndelete").click(function (e) {
        SaveandUpdateResult(0);
    });
    $("#btnprint").click(function (e) {
        CmnPrintFunction('TestResult',$("#GridLength").val(),'Copy',0);
    });

    $('#RegNumber').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#PatientName').focus();
        }
    });
    $('#Doctor').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && FirstId!=0) {
            e.preventDefault();
            $('#Result_' + FirstId).focus();
            $('#Result_' + FirstId).select();
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


    $('#ResconfirmOk').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            e.preventDefault();
            $('#ResconfirmCancel').focus();        
        }
    });
    $('#ResconfirmCancel').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            e.preventDefault();
            $('#ResconfirmOk').focus();
        }
    });
});

function Defaultfocus() {
    $("#RegNumber").focus();

  
    if (LabHead == 2) {
       
        $("#headprint").prop('checked', true);
    }
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
                $("#Doctor,#DoctorSearchId").empty()
                $("#Doctor,#DoctorSearchId").append("<option value='0' Fee='0'>--Select--</option>");

                for (var i = 0; i < result.oList.length; i++) {
                    $("#Doctor,#DoctorSearchId").append("<option value='" + result.oList[i].DoctorId + "' Fee='" + result.oList[i].ConsultFees + "'>" + result.oList[i].DoctorName + "</option>");
                }

            }
        }
    });
}

function ClearPatData() {

    $("#DOB").val('');
    $("#BloodGroup").val('');
    $("#Gender").val('');
    $("#PatientId").val(0);
}

function CalcAge() {
    var age = AgeCalculation($("#DOB").val());

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
    $("#Age").val(CurrentAge);
}

function GetLabBill(Flag) {
    var data = {};                                       //dropdownbind
    data.OPNumber = $("#OPNumber").val();
    data.PatientId = $("#PatientId").val();
    data.DeptId = ERPDeptId;
    data.Flag = Flag;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_LabBillGets",
        data: data,
        success: function (result) {
            LabBillLoad(result.oList,Flag)
        }
    });
    if (Flag == 1) { $("#OPNumber").val(''); }
}

function LabBillLoad(result,Flag) {
    $("#BillGridLength").val(0);
    $(".Billtr").remove();
    $("#GridLength").val(0);
    $(".Resulttr").remove();

    for (var i = 0; i < result.length; i++) {

        if (result[i].Flag == 1)
            var Span = '<span class="badge badge-success"><i class="fa fa-check"></i> Result</span>';
        else
            var Span = '<span class="badge badge-info"><i class="fa fa-plus"></i> Pending</span>'
        
        var id = parseInt(i) + 1;
        var ProdEditRow = "<tr class='jsgrid-row Billtr' id='Brow_" + id + "' onclick=GetBill('" + id + "',0)>" +
            "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:10%;text-align:center' >" + id +
            "<input type='hidden' id='BillNo_" + id + "' value='" + result[i].BillNo + "' />" +
            "<input type='hidden' id='OPNumber_" + id + "' value='" + result[i].OPNumber + "' />" +
            "<input type='hidden' id='BillYear_" + id + "' value='" + result[i].BillYear + "' />" +
            "<input type='hidden' id='Resulted_" + id + "' value='" + result[i].Flag + "' />" +
            "<input type='hidden' id='DoctorId_" + id + "' value='" + result[i].DoctorId + "' />" +
            "<input type='hidden' id='IPNumber_" + id + "' value='" + result[i].IPNumber + "' />" +
            "<input type='hidden' id='PType_" + id + "' value='" + result[i].PType + "' />" +
            "</td>" +
            "<td class='jsgrid-cell p-1 GridBRow' id='TxtBillNo_" + id + "'  style= 'width:15%;' >" + result[i].BillNo +
            "</td>" +
            "<td class='jsgrid-cell p-1 GridBRow' id='TxtDate_" + id + "' style= 'width:15%;' >" + result[i].Date +
            "</td>" +
            "<td class='jsgrid-cell p-1 GridBRow' id='TxtDoctorName_" + id + "'  style= 'width:45%;' >" + result[i].Doctor +
        "</td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Status_" + id + "'  style= 'width:15%;' >" + Span +
        "</td>" +
        "</tr>";

        $('#tbl_BillList').append(ProdEditRow);
    }

    if (result.length == 0) {

        if (Flag == 0) { var NoResult = 'No Bill Available Against this OPVisit#'; }
        else if (Flag == 1) { var NoResult = 'No Bill Available Against this Patient'; }

        var ProdEditRow = "<tr class='jsgrid-row Billtr'>" +
    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:10%;text-align:center;font-weight:bold;color:red;' >" + NoResult + "</td>" +
    "</tr>";

        $('#tbl_BillList').append(ProdEditRow);
    }
    $("#BillGridLength").val(result.length);
}
var MasterBillNo = 0;

function GetBill(Id,Flag) {
    if ($("#Resulted_" + Id).val() == 1 && Flag==0) {

        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        
        $('#Confirmflag').val('AlreadySaved'); $('#ConfirmRowId').val(Id);
        $('#confirmmessage').text('Result of Bill Available! Continue to Edit');
        $('#confirmOk').focus();
    }
    else if (Flag == 1) {
        $("#OPNumber").val($("#OPNumber_" + Id).val());
        //copy of test result
        MasterBillNo = $("#BillNo_" + Id).val();
        var BillNo = $("#BillNo_" + Id).val();
        var BillYear = $("#BillYear_" + Id).val();
        GetRows(1, BillNo, BillYear, 1);
        $('.Billtr').removeClass('SelectedRow');
        
        $("#Brow_" + Id).removeClass('Resulted');
        $("#Brow_" + Id).addClass('SelectedRow');
    }
    else
    {
        $("#OPNumber").val($("#OPNumber_" + Id).val());
        $('.Billtr').removeClass('SelectedRow');
        $("#Brow_" + Id).addClass('SelectedRow');
        $("#Doctor").val($("#DoctorId_" + Id).val());
        $("#BillNo").val($("#BillNo_" + Id).val());
        $("#BillYear").val($("#BillYear_" + Id).val());

        $("#IPNumber").val($("#IPNumber_" + Id).val());
        $("#PType").val($("#PType_" + Id).val());

       // $("#Remarks").val('');
        
        var data = {};                                       
        data.BillNo = $("#BillNo_" + Id).val();
        data.Flag = Flag;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_LabBillTestGets",
            data: data,
            success: function (result) {

                $("#BillDate").val($.trim($("#TxtDate_" + Id).text()));
                $("#ResultDate").val(CurDate);
                LabBillTestLoad(result.oList)
            }
        });
    }
}

function LabBillTestLoad(result) {
    $("#GridLength").val(0);
    $(".Resulttr").remove();
    $("#LabResultId").val(0);
    $("#btndelete,#btnprint").hide();
    FirstId = 0;var datax=[]
    for (var i = 0; i < result.length; i++) {

        var id = parseInt(i) + 1;
        datax = result[i].MedDeptName.split("#");
       
        $('#PatientName').val(datax[1]);

        if (result[i].Flag == 1) {
            var ProdEditRow = "<tr class='jsgrid-sub-header-row Resulttr' id='Trow_" + id + "' >" +
                "<td id='td_" + id + "' class='jsgrid-header-cell GridBRowTop'  style= 'width:72px;text-align:center' >" + id +              
                "<input type='hidden' id='SubResultId_" + id + "' value='0'/>" +
                "<input type='hidden' id='TestId_" + id + "' value='" + result[i].TestId + "'/>" +
                "<input type='hidden' id='SubTestId_" + id + "' value='" + result[i].SubTestId + "'/>" +
                "<input type='hidden' id='HFlag_" + id + "' value='" + result[i].Flag + "'/>" +
                "<input type='hidden' id='MaxVal_" + id + "' value='" + result[i].MaxValue + "'/>" +
                "<input type='hidden' id='MinVal_" + id + "' value='" + result[i].MinValue + "'/>" +
                "<input type='hidden' id='subtype_" + id + "' value='" + result[i].Status + "'/>" +
                "<input type='hidden' id='MedDeptId_" + id + "' value='" + result[i].MedDeptId + "'/>" +
                "<input type='hidden' id='MedDept_" + id + "' value='" + datax[0] + "'/>" +
                "</td>" +
                "<td class='jsgrid-header-cell GridBRowTop' id='TestName_" + id + "'  style= 'width:384px;' >" + result[i].TestName +
                "</td>" +
                "<td class='jsgrid-header-cell GridBRowTop' id='Resulttd_" + id + "' style= 'width:384px;' >" +
                "</td>" +
                "<td class='jsgrid-header-cell GridBRowTop' id='NormalValuetd_" + id + "'  style= 'width:284px;' >" +
                "</td>" +
                "<td class='jsgrid-header-cell GridBRowTop' id='StdUnit_" + id + "'  style= 'width:14%;display:none;' >" +
                "<td class='jsgrid-header-cell GridBRowTop'  id='Notestd_" + id + "'  style= 'width:28%;'>" +
                "</td>" +
                "</td>" +
            "</tr>";
        }
        else {
            if (FirstId == 0) FirstId = id;
            if (i < result.length-1) {
                if (result[i].TestId != result[i + 1].TestId || result[i].Status=='NO') { var Border = 'GridBRowBottom'; } else var Border = '';
            }
            else var Border = 'GridBRowBottom';

            var ProdEditRow = "<tr class='jsgrid-row Resulttr' id='row_" + id + "' >" +
                "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow " + Border + "'  style= 'width:72px;text-align:center;font-weight:bold;' >" + id +
                "<input type='hidden' id='SubResultId_" + id + "' value='0'/>" +
                "<input type='hidden' id='TestId_" + id + "' value='" + result[i].TestId + "'/>" +
                "<input type='hidden' id='SubTestId_" + id + "' value='" + result[i].SubTestId + "'/>" +
                "<input type='hidden' id='HFlag_" + id + "' value='" + result[i].Flag + "'/>" +
                "<input type='hidden' id='MaxVal_" + id + "' value='" + result[i].MaxValue + "'/>" +
                "<input type='hidden' id='MinVal_" + id + "' value='" + result[i].MinValue + "'/>" +
                "<input type='hidden' id='MedDeptId_" + id + "' value='" + result[i].MedDeptId + "'/>" +
                "<input type='hidden' id='MedDept_" + id + "' value='" + datax[0] + "'/>" +
                "<input type='hidden' id='subtype_" + id + "' value='" + result[i].Status + "'/>" +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='TestName_" + id + "'  style= 'width:384px;font-weight:bold;' >" + result[i].TestName +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='Resulttd_" + id + "' style= 'width:384px;' >" +
                "<input type='text' class='form-control GridText' id='Result_" + id + "' value='" + result[i].Result + "' onkeydown=FocusNext(\'" + id + "\',\'Result_\',event) ondblclick=ShowModal(\'Result_'\,\'" + id + "'\) />" +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='NormalValuetd_" + id + "'  style= 'width:284px;' align='center'>" +
                "<input type='text' class='form-control GridText' id='NormalValue_" + id + "' value='" + result[i].NormalValue + "' onkeydown=FocusNext(\'" + id + "\',\'NormalValue_\',event) ondblclick=ShowModal(\'NormalValue_'\,\'" + id + "'\) />" +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='StdUnit_" + id + "'  style= 'width:14%;display:none;'  align='center'>" + result[i].StdUnit +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='Notestd_" + id + "'  style= 'width:28%;'  align='center'>" +
                "<input type='text' class='form-control GridText' id='Notes_" + id + "' value='" + result[i].Notes + "' onkeydown=FocusNext(\'" + id + "\',\'Notes_\',event) ondblclick=ShowModal(\'Notes_'\,\'" + id + "'\) />" +
                "</td>" +
            "</tr>";
        }       

        $('#tbl_TestResult').append(ProdEditRow);
    }
    $("#GridLength").val(result.length);
    $("#Result_" + FirstId).focus();
}

function formrefresh() {
    $(".denull").val('');
    $(".dezero").val(0);
    $(".Billtr,.Resulttr").remove();
    Defaultfocus();
    $("#btndelete,#btnprint").hide();
    $("#btnwapp,#btnmail").hide();
    FirstId = 0;
}

function SaveandUpdateResult(Flag) {

    if (parseInt($('#PatientId').val() || 0)==0) {
        warningshow('Select OPNumber', 'OPNumber');
    }
    else if (parseInt($("#Doctor").val() || 0) == 0) {
        warningshow('Select Doctor', 'Doctor');
    }
    else if (parseInt($("#BillNo").val() || 0) == 0) {
        warningshow('Select Bill', '');
    }
    
    else {
        if (parseInt($('#LabResultId').val() || 0) == 0) {
            $('#confirm').show();
            $('#confirmOk').prop("disabled", false);
            $('#confirmOk').focus();
            $('#Confirmflag').val('Save'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to save this Result?');
        }
        else if (Flag == 1) {
            $('#confirm').show();
            $('#confirmOk').prop("disabled", false);
            $('#confirmOk').focus();
            $('#Confirmflag').val('Update'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to update this Result?');
        }
        else {
            $('#confirm').show();
            $('#confirmOk').prop("disabled", false);
            $('#confirmOk').focus();
            $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to delete this Result?');
        }

    }
}

function OKSaveandUpdateResult(DFlag) {
    var oArray = new Array();
    if ($("#PType").val()!='IP'){$("#PType").val('OP');}
    
    for (var k = 1; k <= $("#GridLength").val() ; k++) {

        var ResultId = $('#LabResultId').val();
        var OPNumber = $.trim($('#OPNumber').val());
        var PatientId = parseInt($('#PatientId').val()||0);
        var DoctorId = parseInt($('#Doctor').val() || 0);
        var BillNo = $('#BillNo').val();
        var BillYear = $("#BillYear").val();
        var SubResultId = $("#SubResultId_" + k).val();
        var TestId = $('#TestId_' + k).val();
        var SubTestId = parseInt($('#SubTestId_' + k).val()||0);
        var TestName = $('#TestName_' + k).text();
        var Result = $('#Result_' + k).val();           
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = DFlag;
        var Flag = $("#IPNumber").val();
        var Status = $("#PType").val();
        var NormalValue = $('#NormalValue_' + k).val();
        var Notes = $('#Notes_' + k).val();
        var Remarks = $("#Remarks").val();


        if (!(typeof TestName == "undefined") && SubTestId != 0 && TestId != 0) {

            oArray.push({
                'ResultId': ResultId,
                'OPNumber': OPNumber,
                'PatientId': PatientId,
                'DoctorId': DoctorId,
                'BillNo': BillNo,
                'BillYear': BillYear,
                'SubResultId':SubResultId,
                'TestId': TestId,
                'SubTestId': SubTestId,
                'TestName': TestName,
                'Result': Result,
                'DeptId': DeptId,
                'UserId': UserId,
                'DelFlag': DelFlag,
                'Flag': Flag,
                'Status': Status,
                'NormalValue': NormalValue,
                'Notes': Notes,
                'Remarks': Remarks

            })
        }
    }

    if (oArray != "") {

        var data = { 'LabResult': oArray };
        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_ResultInsertandUpdate",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                var Date = result.oList[0].Date;
                var Time = result.oList[0].ToDate;
                $("#ResultDate").val(Date);
                $("#ResultTime").val(Time);
                
                var Flag = 'Save'; var Msg = 'Saved Successfully<br/><span style="font-size:small;">Do you want to Print Result?</span>';
                if (status == 2) { Flag = 'Update'; Msg = 'Modified Successfully<br/><span style="font-size:small;">Do you want to Print Result?<span>'; }
                

                if (status == 1 || status == 2) {

                    $('#Resconfirm').show();
                    $('#ResConfirmflag').val(Flag); $('#ResConfirmRowId').val(0);
                    $('#Resconfirmmessage').html(Msg);
                    $('#ResconfirmOk').focus();
                }
                else {
                    Showalerts(status);
                }
            }
        });
    }
    else {
        warningshow('Datas are not complete', 'TestName');

    }
}

function GetRows(Flag,BillNo,BillYear,SFlag) {
    var data = {};                                       //dropdownbind
    data.ResultId = Flag;
    data.DeptId = ERPDeptId;
    data.BillNo=BillNo;
    data.BillYear=BillYear;
    data.Flag = SFlag;
    data.FromDate = $("#FromDate").val();
    data.ToDate = $("#ToDate").val();
    data.DoctorId = $("#DoctorSearchId").val();
    data.PatientId = $("#PatientSearchId").val();
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_ResultGetandGets",
        data: data,
        success: function (result) {
            if (Flag == 0) {
                GetList(result.oList);
            } else {
                GetResult(result.oList);
            }
        }
    });
}

function GetList(result) {
    $("#listing").show();
    $("#Entry").hide();

    disable_datatable('tbl_LabResult');
    var responseText = "<thead><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>Date</th>"+
        "<th>OP-VisitID</th>" +
        "<th>Patient</th>" +
        "<th>Reg No</th>" +
        "<th>DOB</th>" +
        "<th>Doctor</th>" +
        "<th>BillNo</th>" +
        "<th>Edit</th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {



        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td>' + result[i].Date + '</td>' +
            '<td>' + result[i].OPNumber + '</td>' +
            '<td>' + result[i].PatientName + '</td>' +
            '<td>' + result[i].RegNoS + '</td>' +
            '<td>' + result[i].DOB + '</td>' +
            '<td>' + result[i].Doctor + '</td>' +
            '<td>' + result[i].BillNo + '</td>' +
            '<td onclick="GetRows(' + result[i].ResultId + ',0,0,0)" align=center><a>' + Editbutton + '</a></td>' +
            '</tr>';
    }
    $('#tbl_LabResult').html(responseText + "</tbody><tfoot><tr>" +
        "<th> </th>" +
        "<th> </th>"+
        "<th>OP-VisitID</th>" +
        "<th>Patient</th>" +
        "<th>Reg No</th>" +
        "<th>DOB</th>" +
        "<th>Doctor</th>" +
        "<th>BillNo</th>" +
        "<th> </th>" +
        "</tr></tfoot>");
    datatableWithsearch('tbl_LabResult');
    $("#popupdiv").hide();
}
function GetResult(result) {
    $("#listing").hide();
    $("#Entry,#btndelete,#btnprint,#btnwapp,#btnmail").show();
    FirstId = 0;
    if (result.length > 0) {
        $('#LabResultId').val(result[0].ResultId);
        $('#OPNumber').val(result[0].OPNumber);
        $('#PatientId').val(result[0].PatientId);
        $('#Doctor').val(result[0].DoctorId);
        $('#BillNo').val(result[0].BillNo);
        $("#BillYear").val(result[0].BillYear);
        $('#RegNumber').val(result[0].RegNoS);
        $('#PatientName').val(result[0].PatientName);
        $('#DOB').val(result[0].DOB);
        CalcAge();
        $('#BloodGroup').val(result[0].BloodGroup);
        $("#Gender").val(result[0].Gender);
        $("#Remarks").val(result[0].Remarks);
        $('#IPNumber').val(result[0].IPNumber);
        $('#PType').val(result[0].PType);
        $("#RegDate").val(result[0].FromDate);
        $("#ResultDate").val(result[0].Date);
        $("#ResultTime").val(result[0].ToDate);
        $("#BillDate").val(result[0].BillDate);
        $("#GridLength").val(0);
        $(".Resulttr").remove();
        var CurrentHead = '';
        var id = 0;
        for (var i = 0; i < result.length; i++) {

            id++;
            var ProdEditRow = '';
            if (((result[i].Status).toUpperCase() == 'YES') && CurrentHead != result[i].TestName) {

                CurrentHead = result[i].TestName

                 ProdEditRow = "<tr class='jsgrid-sub-header-row Resulttr' id='Trow_" + id + "' >" +
                    "<td id='td_" + id + "' class='jsgrid-header-cell GridBRowTop'  style= 'width:72px;text-align:center' >" + id +
                    "<input type='hidden' id='SubResultId_" + id + "' value='0'/>" +
                    "<input type='hidden' id='TestId_" + id + "' value='" + result[i].TestId + "'/>" +
                    "<input type='hidden' id='SubTestId_" + id + "' value='0'/>" +
                    "<input type='hidden' id='HFlag_" + id + "' value='0'/>" +
                    "<input type='hidden' id='MaxVal_" + id + "' value='0'/>" +
                    "<input type='hidden' id='MinVal_" + id + "' value='0'/>" +
                    "<input type='hidden' id='MedDeptId_" + id + "' value='" + result[i].MedDeptId + "'/>" +
                     "<input type='hidden' id='MedDept_" + id + "' value='" + result[i].MedDeptName + "'/>" +
                     "<input type='hidden' id='subtype_" + id + "' value='" + result[i].Status + "'/>" +
                    "</td>" +
                    "<td class='jsgrid-header-cell GridBRowTop' id='TestName_" + id + "'  style= 'width:384px;' >" + result[i].TestName +
                    "</td>" +
                    "<td class='jsgrid-header-cell GridBRowTop' id='Resulttd_" + id + "' style= 'width:384px;' >" +
                    "</td>" +
                    "<td class='jsgrid-header-cell GridBRowTop' id='NormalValuetd_" + id + "'  style= 'width:284px;' >" +
                    "</td>" +
                    "<td class='jsgrid-header-cell GridBRowTop' id='StdUnit_" + id + "'  style= 'width:14%;display:none;' >" +
                    "</td>" +
                    "<td class='jsgrid-header-cell GridBRowTop' id='Notestd_" + id + "'  style= 'width:28%;' >" +
                    "</td>" +
                "</tr>";
                 id++;
            }
            
            if (FirstId == 0) FirstId = id;
                if (i < result.length - 1) {
                    if (result[i].TestId != result[i + 1].TestId || result[i].Status == 'NO') { var Border = 'GridBRowBottom'; } else var Border = '';
                }
                else var Border = 'GridBRowBottom';

                var ProdEditRow1 = "<tr class='jsgrid-row Resulttr' id='row_" + id + "' >" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow " + Border + "'  style= 'width:72px;text-align:center;font-weight:bold;' >" + id +
                    "<input type='hidden' id='SubResultId_" + id + "' value='" + result[i].SubResultId + "'/>" +
                    "<input type='hidden' id='TestId_" + id + "' value='" + result[i].TestId + "'/>" +
                    "<input type='hidden' id='SubTestId_" + id + "' value='" + result[i].SubTestId + "'/>" +
                    "<input type='hidden' id='HFlag_" + id + "' value='0'/>" +
                    "<input type='hidden' id='MaxVal_" + id + "' value='" + result[i].MaxValue + "'/>" +
                    "<input type='hidden' id='MinVal_" + id + "' value='" + result[i].MinValue + "'/>" +
                    "<input type='hidden' id='MedDeptId_" + id + "' value='" + result[i].MedDeptId + "'/>" +
                    "<input type='hidden' id='MedDept_" + id + "' value='" + result[i].MedDeptName + "'/>" +
                    "<input type='hidden' id='subtype_" + id + "' value='" + result[i].Status + "'/>" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='TestName_" + id + "'  style= 'width:384px;font-weight:bold;' >" + result[i].SubTestName +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='Resulttd_" + id + "' style= 'width:384px;' >" +
                    "<input type='text' class='form-control GridText' id='Result_" + id + "' value='" + result[i].Result + "'  onkeydown=FocusNext(\'" + id + "\',\'Result_\',event) ondblclick=ShowModal(\'Result_'\,\'" + id + "'\) />" +
                    "</td>" +
                   "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='NormalValuetd_" + id + "'  style= 'width:284px;' align='center'>" +
                "<input type='text' class='form-control GridText' id='NormalValue_" + id + "' value='" + result[i].NormalValue + "' onkeydown=FocusNext(\'" + id + "\',\'NormalValue_\',event) ondblclick=ShowModal(\'NormalValue_'\,\'" + id + "'\) />" +
                "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow " + Border + "' id='StdUnit_" + id + "'  style= 'width:14%;display:none;'  align='center'>" + result[i].StdUnit +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow GridBRow " + Border + "' id='Notestd_" + id + "'  style= 'width:28%;'  align='center'>" +
                "<input type='text' class='form-control GridText' id='Notes_" + id + "' value='" + result[i].Notes + "' onkeydown=FocusNext(\'" + id + "\',\'Notes_\',event) ondblclick=ShowModal(\'Notes_'\,\'" + id + "'\) />" +
                "</td>" +
                "</tr>";
                

                $('#tbl_TestResult').append(ProdEditRow + ProdEditRow1);
        }
        $("#GridLength").val(id);

        $("#RegNumber").focus();
    }
}


function ngOnDestroy(Flag) {
    if (Flag == 1) {
        var Id = $("#CrntNormalId").val();
        var Pos = $("#CrntNormalPos").val();
        $("#" + Pos + Id).val($("#NormalValue_0").val());
    }
    $("#myModal").modal("hide");
    $("body>#EditModal").remove();
    $("#" + Pos + Id).focus();
}

function ShowModal(Pos,Id) {
    $("#NormalValue_0").val($("#" + Pos + Id).val());
    $("#" + Pos + Id).blur() 
    $("#CrntNormalPos").val(Pos);
    $("#CrntNormalId").val(Id);
    $("#HeaderModal").text(Pos.substring(0, Pos.length - 1));
    $("#myModal").modal("show");
    $("#myModal").appendTo("body");
}

function Filter() {

    $("#FromDate,#ToDate").val(CurDate);
    $("#DoctorSearch,#SearchRegNo").val('');
    $("#DoctorSearchId,#PatientSearchId").val(0);
    $("#popupdiv").show();
}

function FocusNext(Id,Key, e) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key == 40 || key == 13) {            // Down Arrow
        e.preventDefault();
        $('.GridText').each((i, item) => {
            var $item = $(item);            
            var NextId = parseInt($item.attr('id').match(/\d+/)[0]);
            if (NextId > Id) {
                $('#' + Key + NextId).focus().select();
                return false;
            }
        });       
    }
    else if (key == 38) {            // Up Arrow
        e.preventDefault();
        $($('.GridText').get().reverse()).each((i, item) => {
            var $item = $(item);
            var NextId = parseInt($item.attr('id').match(/\d+/)[0]);
            if (NextId < Id) {
                $('#' + Key + NextId).focus().select();
                return false;
            }
        });      
    }
    else if (key == 39) {            // Right Arrow
        e.preventDefault();
        if (Key == 'Result_') {
            $('#NormalValue_' + Id).focus().select();
        }
        else if (Key == 'NormalValue_') {
            $('#Notes_' + Id).focus().select();
        }

    }
    else if (key == 37) {            // Left Arrow
        e.preventDefault();
        if (Key == 'NormalValue_') {
            $('#Result_' + Id).focus().select();
        }
        else if (Key == 'Notes_') {
            $('#NormalValue_' + Id).focus().select();
        }
    }
}

function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'Save') {
        OKSaveandUpdateResult(rowid)
    }
    else if (Result == 'true' && status == 'Update') {
        OKSaveandUpdateResult(rowid)
    }
    else if (Result == 'true' && status == 'Delete') {
        OKSaveandUpdateResult(rowid)
    }
    else if (Result == 'true' && status == 'AlreadySaved') {
        GetBill(rowid,1)
    }
    
    $('#confirm').fadeOut();
}
function ResConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'Save') {
        CmnPrintFunction('TestResult', $("#GridLength").val(), 'Save', 0);
        formrefresh();
    }
    else if (Result == 'false' && status == 'Save') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'Update') {
        CmnPrintFunction('TestResult', $("#GridLength").val(), 'Updatesss', 0);
        formrefresh();
    }
    else if (Result == 'false' && status == 'Update') {
        formrefresh();
    }
    $('#Resconfirm').fadeOut();
}

//Show Window Alert Insert,update delete  Modify
function Showalerts(Status) {
    if (Status == 1) {
        //formrefresh();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
       // formrefresh();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
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
            buttons: []

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
                        messageTop: 'EUMI ERP',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'EUMI ERP',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'EUMI ERP',
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