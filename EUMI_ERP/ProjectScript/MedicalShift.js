var ShiftSelect = '';
var DaysSelect =
                  '<option value=1>Monday</option>' +
                  '<option value=2>Tuesday</option>' +
                  '<option value=3>Wednesday</option>' +
                  '<option value=4>Thursday</option>' +
                  '<option value=5>Friday</option>' +
                  '<option value=6>Saturday</option>' +
                  '<option value=7>Sunday</option>' 
                       

$(document).ready(function () {
   
    Defaultfocus();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmit").click(function (e) {
        SaveUpdateS(1);
    });

    var data = {};
    data.Id = 0;
    $.ajax({

        type: "POST",
        url: "../Master/DoctorGetandGets",
        data: data,
        success: function (result) {
            ShowDoct(result.oList);
        }

    });
    var data = {};
    data.Id = 0;
    $.ajax({

        type: "POST",
        url: "../Revisit/HMS_ShiftGetandGets",
        data: data,
        success: function (result) {
            ShiftLoad(result.oList);
        }

    });
 

});//Document Close


function formrefresh() {
   
    Count = 0;
   // Testing(0)
    $('#select_doc').val('');
    $('#select_days0').val('1');
    $('#Time0').val('');
    $('#EndTime0').val('');
    $('#select_shift0').val('1');
    $('#select_status').prop('checked', false);
    $('#AvailableId').val(0);
    $('#btndelete').hide();
    $('#Warningpopup').fadeOut();
    $('#tblsalesinvoice tr').remove();
    $('.swal-button swal-button--confirm').focus();
    $('#select_doc').focus();
   

}
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'delete') {
        rowdeleteconfirm(rowid);
    }
    else if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'copy') {
        SalesCopy();
    }
    $('#confirm').fadeOut();

}
function rowdeleteconfirm(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    $('#row' + RowId).remove();
    for (var j = 1; j <= Count; j++) {
        if ($('#select_days' + j).val() != undefined) {
            $('#td' + j).text(slno);
            slno++;
        }
    }
    $('#select_days0').focus();
   
}

function timediffblur(slno, e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (diffkey != 1) {
        if ($('#outtime' + slno).val() != '') {
            $("#txttype" + slno).attr("disabled", false);


            if ($('#intime' + slno).val() == '' && $('#outtime' + slno).val() != '') {
                warningshow('Please Enter In Time', '#intime' + slno);
            }
            else {

                var startTime = $('#intime' + slno).val();
                var endTime = $('#outtime' + slno).val();

                if (startTime != '' && endTime != '') {
                    var startTimeArray = startTime.split(":");
                    var startInputHrs = parseInt(startTimeArray[0]);
                    var startInputMins = parseInt(startTimeArray[1]);

                    var endTimeArray = endTime.split(":");
                    var endInputHrs = parseInt(endTimeArray[0]);
                    var endInputMins = parseInt(endTimeArray[1]);

                    var startMin = startInputHrs * 60 + startInputMins;
                    var endMin = endInputHrs * 60 + endInputMins;

                    var result;

                    if (endMin < startMin) {
                        var minutesPerDay = 24 * 60;
                        result = minutesPerDay - startMin;  // Minutes till midnight
                        result += endMin; // Minutes in the next day
                    } else {
                        result = endMin - startMin;
                    }
                    var minutesElapsed = result % 60;
                    var hoursElapsed = (result - minutesElapsed) / 60;
                    var r
                    if (minutesElapsed > 0 && minutesElapsed < 10) {

                        var ext = '0' + minutesElapsed

                        r = hoursElapsed + ':' + ext


                    }
                    else if (minutesElapsed > 10) {
                        r = hoursElapsed + ':' + minutesElapsed


                    }
                    else {
                        r = hoursElapsed
                    }
                    $('#WorkingHrs' + slno).text(r)
                }

            }
        }
        else if (key == 8) {
            $('#WorkingHrs' + slno).text(0);
            $("#txttype" + slno).attr("disabled", false);
        }

    }

}
function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want to Delete this Record?');
}
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}
function ShowDoct(result) {

    $("#select_doc").empty();
    $("#select_doc").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_doc").append("<option value='" + result[i].DoctorsId + "'  >" + result[i].Name + "</option>");
    }
}

function ShiftLoad() {
    var data = {};                                       //dropdownbind
    data.Flag = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_ShiftGetandGets",
        data: data,
        success: function (result) {
            ShiftSelect = '';
            if (result.oList.length > 0) {
                $("#select_shift0").empty()
                for (var i = 0; i < result.oList.length; i++) {
                    ShiftSelect = ShiftSelect + "<option value='" + result.oList[i].Flag + "'>" + result.oList[i].Shift + "</option>"                    
                }
                $("#select_shift0").append(ShiftSelect);
                
            }
        }
    });
}
function Defaultfocus() {
    $('#select_doc').focus();
    $('#select_status').prop('checked',false);
}
function Testing(id) {
  
    if (($("#checkstatus" + id).prop('checked')) == true ) {
        
        if ($("#Time" + id).val() == 0) {
            warningshow('Please Enter Start Time', 'Time' + id);
            $('#Time' + id).select();
            $("#checkstatus" + id).prop('checked') == $("#checkstatus" + id).prop('unchecked')
            return false;
        }
        else if ($("#EndTime" + id).val() == 0) {
            warningshow('Please Enter End Time', 'EndTime' + id);
            $("#checkstatus" + id).prop('checked') == $("#checkstatus" + id).prop('unchecked')
            $('#EndTime' + id).select();
            
            return false;
        }
    
    }
    else if (($("#checkstatus" + id).prop('checked',false)) == true ) {
        SaveUpdateS(1);
    }
   
}
var Count = 0;
function doctoradd() {
    if (($("#select_doc").val()) == '') {
        warningshow('Please Select The doctor', 'select_doc');
    }

    else if (($("#select_days0").val()) == '0') {
        warningshow('Please Select The Days', 'select_days0');
    }
    else if ($("#Time0").val() == 0) {
        warningshow('Please Enter Start Time', 'Time0');
        $('#Time0').select();
    }
    else if ($("#EndTime0").val() == 0) {
        warningshow('Please Enter End Time', 'EndTime0');
        $('#EndTime0').select();
    }
 
    else {
        if ($('#tblsalesinvoice tr').length == 0) {
            Count = 0;
        }

        Count++;
        var id = parseInt(Count);
        var slno = $('#tblsalesinvoice tr').length + 1;


        $('#Warningpopup').fadeOut();

        var ProdRow1 = "<tr id=" + 'row' + id + " class=jsgrid-row>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
             "<td  class='jsgrid-cell' style='width:2% ;text-align:center;zoom:1.5' ><input type=checkbox id ='checkstatus" + id + "' checked ></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:3%;text-align:center'>" + slno + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:10%;text-align:center' ><input type='text' id=" + 'AvailableId' + id + " style='display:none' value='" + $("#AvailableId0").val() + "' /><select style='height:45px;background-color:009DA0' class='form-control text-left'  id=select_days" + id + "  value='" + $("#select_days0").val() + "'>" + DaysSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:4%;text-align:center' ><select style='height:45px;background-color:009DA0' class='form-control text-left' id=" + 'select_shift' + id + " value='" + $("#select_shift0").val() + "'>" + ShiftSelect + "</select></td>" +
              "<td  onfocusout=Testing(" + id + ") class='jsgrid-cell jsgrid-align-right' style='width:4%;text-align:center' ><input type='Time' style='height:45px;background-color:white' class='form-control text-left' id=" + 'Time' + id + " value='" + $("#Time0").val() + "'></td>" +
             "<td  onfocusout=Testing(" + id + ") class='jsgrid-cell jsgrid-align-right' style='width:4%;text-align:center;margin-bottom:10px' ><input type='Time' style='height:45px;background-color:white' class='form-control text-left' id=" + 'EndTime' + id + " value='" + $("#EndTime0").val() + "'></td>" +
            "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_shift' + id).val($('#select_shift0').val());
        $('#select_days' + id).val($('#select_days0').val());

        $('#proddiv').animate({ scrollTop: 5000 }, 900);
    }
   
}
function Check() {
   
    var st = $('#select_status').prop('checked');
    $('input[type=checkbox]').prop('checked', st);
}
function CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblsalesinvoice");
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++;
        }
    }
    var message = "Total Row Count: " + totalRowCount;
    message += "\nRow Count: " + rowCount;
    return rowCount;
}


    function Tbldelete() {
        $('#tblsalesinvoice tr').remove();
        i = 1;
        //$('#txtproduct0').focus();
    }
    function Showalerts(Status) {
        if (Status == 1) {
            swal(' Data Saved Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();
        }
        else if (Status == 2) {
            formrefresh();
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


    function PisNumber(evt, selectedvalue) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
        if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            warningshow('Digits Only')
            return false;
        }
        return true;

    }

    //Numeric Only Text Boxes without Decimal Point

    function PisNumberInt(evt, selectedvalue) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
        if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            warningshow('Digits Only')
            return false;
        }
        return true;

    }


    function changetoupper(Id) {
        $('#' + Id).val($('#' + Id).val().toUpperCase())
    }

   
   

    function closetable(value) {
        $('#Entry').show();
        $('#listing').hide();
        if (value == 1)
            formrefresh();
    }


    function closelist() {
        $('#Entry').show();
        $('#listing').hide();
        formrefresh();
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

    function SaveUpdateS(Flag) {

        if ($('#tblsalesinvoice tr').length == 0) {
            warningshow('Please Add Shift to Save');
        }

        else {
            var oArray = new Array();
            for (var k = 1; k <= Count; k++) {

                var AvailableId = 0;
                var Days = $('#select_days' + k).val();
                var StartTime = $('#Time' + k).val();
                var EndTime = $('#EndTime' + k).val();
                var Shift = $('#select_shift' + k).val();
                var Doctors = $('#doctorId').val();
                var DelFlag = Flag;
                var DepId = ERPDeptId;
                var UserId = ERPUserId;
                if ($('#checkstatus' + k).prop('checked')) {
                    oArray.push({
                        'AvailableId': AvailableId,
                        'Days': Days,
                        'StartTime': StartTime,
                        'EndTime': EndTime,
                        'Shift': Shift,
                        'Doctors': Doctors,
                        'DelFlag': DelFlag,
                        'DepId': DepId,
                        'UserId': UserId

                    })
                }
            }
            console.log(oArray)
            if (oArray != "") {

                var data = { 'MedicalShift': oArray };
                $.ajax(
            {

                type: "POST",
                url: "../Master/MedShiftInsertandUpdate",
                data: data,
                success: function (result) {

                    var status = result.oList[0].Status;
                    Showalerts(status);
                    Tbldelete();
                    $('#btnsubmit').prop('disabled', false);

                }
            });
            }
            formrefresh();
        }
    }


