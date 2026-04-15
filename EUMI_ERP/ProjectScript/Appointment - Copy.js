var CountryId = 0; var SearchFlag = 0;
$(document).ready(function () {
    Defaultfocuss();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmitapp").click(function (e) {
        SaveAndUpdates(1)
    });
    LoadDates();
    CountryLoad();
    DoctorLoad();
    $("#Branch").val(window.LoggedInUserArray[4]);

    $('.frsdwn').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find('.frsdwn:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('#PTime').keydown(function (e) {
     
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmitapp').focus().select();
        }
    });
    $('.frsup').keydown(function (e) {

        alert('1')
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            alert('2')
            e.preventDefault();
            var inputs = $(this).closest('form').find('.frsup:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });

});//Document Close


function Defaultfocuss() {
    $('#AppFirst').focus();
    $('#self').prop("checked",true);
    $('#yes').prop("checked", true);
}

function SaveAndUpdates(Flag) {

   
    if ($('#AppFirst').val() == "") {
        warningshow('Please Enter First Name', 'AppFirst');
    }

  
    else if (($('#Doctor').val() || 0)==0) {
        warningshow('Please Select Doctor ', 'Doctor');

    }
    else if (($('#PGender').val() || 0)==0) {
        warningshow('Please Select Gender', 'PGender');
    }
    else if (($('#Country').val() || 0)==0) {
        warningshow('Please Select Nationality', 'Country'); 
    }
    else if ($('#MobileNo').val() == "") {
        warningshow('Please Enter Contact Number', 'MobileNo');
    }
 
    else {
        $('#btnsubmit').prop('disabled', true);
        var sts;
        var yess;
        if ($('#self').prop("checked")) {
            sts = 0;
        }
        else if ($('#insurance').prop("checked")) {
            sts = 1;
        }
        if ($('#yes').prop("checked")) {
            yess = 0;
        }
        else if ($('#no').prop("checked")) {
            yess = 1;
        }
        var data = {};   //array
        data.AppointmentId = $('#AppointmentId').val();
        data.FirstName = $.trim($('#AppFirst').val());
        data.LastName = $.trim($('#AppLast').val());
        data.DOB = $('#PDOB').val();
     
        data.Gender = $('#PGender').val();
        data.Nationality = $.trim($('#Country').val());
        data.Contact = $.trim($('#MobileNo').val());
        data.Email = $.trim($('#EmailId').val());
        data.Branch = $.trim($('#Branch').val());
        data.Department = $.trim($('#txt_docdeptname').val());
        data.Doctor = $.trim($('#Doctor').val());
        data.AppointmentDate = $.trim($('#PDATE').val());
        data.AppointmentTime = $.trim($('#PTime').val());
        data.Status1 = sts;
        data.Status2 = yess;
     
        data.DelFlag = Flag;
       
        console.log(data)
        $.ajax({
            type: "POST",
            url: "../Master/AppointmentInsertandUpdate",
            data: data,
            success: function (result) {
               
                    var status = result.oList[0].Status;
                    $('#btnsubmitapp').prop('disabled', false);
                    Showalertsnew(status);
                
            }
        });

    }
   

}


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
function CountryLoad() {
    var data = {};
    data.CountryId = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetCountry",
        data: data,
        success: function (result) {
            $("#Country").empty();
            for (var i = 0; i < result.oList.length; i++) {
                $("#Country").append("<option value='" + result.oList[i].CountryId + "'>" + result.oList[i].CountryName + "</option>");
                if ((result.oList[i].CountryName).toUpperCase() == 'INDIA')
                { CountryId = result.oList[i].CountryId; }
                if (i == (result.oList.length - 1) && CountryId > 0)
                { $("#Country").val(CountryId) }
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
                $("#Doctor").empty();
                $("#Doctor").append("<option value='0' Fee='0'>Select</option>");
                for (var i = 0; i < result.oList.length; i++) {
                    $("#Doctor").append("<option value='" + result.oList[i].DoctorId + "' Fee='" + result.oList[i].ConsultFees + "'>" + result.oList[i].DoctorName + "</option>");
                }
            }
        }
    });
}
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true') {
        SaveAndUpdates(0);
    }
    $('#confirm').fadeOut();
}
function TokenLoad() {
    if ($("#Doctor").val() != 0) {
        var data = {};
        data.DoctorId = $("#Doctor").val();
        data.Shift = $("#Shift").val();
        data.RevisitDate = $("#RegDate").val(); 
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_TokenNumberGets",
            data: data,
            success: function (result) {
                if (result.oList.length > 0) {
                    $("#TokenNo").val(result.oList[0].TokenNumber);
                }
            }
        });
    }
    else {
        $("#TokenNo").val(''); 
    }
}
function ChangeFee() {
    $("#ConsultFee").val(parseFloat($("#Doctor").find("option:selected").attr("Fee") || 0).toFixed(Decimal));
}
function ShowDept(result) {

    $("#txt_docdeptname").empty();
    $("#txt_docdeptname").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#txt_docdeptname").append("<option value='" + result[i].DepId + "'  >" + result[i].Department + "</option>");
    }
}
var data = {};
data.Id = 0;
$.ajax({

    type: "POST",
    url: "../Master/MedDeptGetandGets",
    data: data,
    success: function (result) {
        ShowDept(result.oList);
    }

});
function GetPatientAge() {
    $('#Age,#Age1,#Age2').val('');
    var yearString = ""; var monthString = ""; var dayString = "";

    var dateString = document.getElementById("PDOB").value;

    var age = AgeCalculation(dateString);

    if (age.years > 1) yearString = " Years";
    else yearString = " Year";
    if (age.months > 1) monthString = " Months";
    else monthString = " Month";
    if (age.days > 1) dayString = " Days";
    else dayString = " Day";

    if (age.years > 0) { $('#Age').val(age.years + yearString); }
    if (age.months > 0) { $('#Age1').val(age.months + monthString); }
    if (age.days > 0) { $('#Age2').val(age.days + dayString); }

    if (dateString == CurDate) {
        $('#Age2').val('0 Day');
    }
}
function Showalertsnew(Status) {
    if (Status == 1) {
        formrefresher();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresher();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresher();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        formrefresher();
        swal('Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        formrefresher();
        swal('Data Cancelled', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresher();
        swal('Data Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }

}


function LoadDates() {
    $('#PDATE,#PDOB').daterangepicker({

        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    });
}

//Numeric Only Text Boxes with Decimal Point

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


function formrefresher() {
  
    $('#AppFirst').focus();
    $('#AppFirst').val('');
    $('#AppLast').val('');
    $('#PGender').val('0');
    $('#MobileNo').val('');
    $('#PDOB').val('');
    $('#Country').val('78');
    CountryLoad();
    $('#Age').val('');
    $('#Age1').val('');
    $('#Age2').val('');
    $('#EmailId').val('');
    $('#txt_docdeptname').val('0');
    $('#Branch').val('');
    $('#Doctor').val('0'); 
    $('#PTime').val('');
    $('#PDATE').val('');
    $('#self').prop("checked", true);
    $('#yes').prop("checked", true);
  
    $('#AppointmentId').val(0);
    $('#btndeleted').hide();
    $('#Warningpopup').fadeOut();
   
    if (parseInt($('#AppointmentId').val() || 0) != 0) {
        $("#AppointmentId").val($('#AppointmentId').val());
        $("#AppFirst").val($('#AppFirst').val());
        GetRowsss($('#AppointmentId').val());
    }
   
    LoadDates();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresher();
}



function ShowTermGet(result) {
    console.log('Status1 '+(result[0].Status1))
    console.log('Status2 ' + (result[0].Status2))
        if (result[0].Status1 == 1)
            $('#self').prop('checked', true);
    else
            $('#self').prop('checked', false);
        if (result[0].Status2 == 1)
            $('#yes').prop('checked', true);
        else
            $('#yes').prop('checked', false);
    for (var i = 0; i < result.length; i++) {
       
        $('#AppointmentId').val(result[i].AppointmentId);
        $('#AppFirst').val(result[i].FirstName);
        $('#AppLast').val(result[i].LastName);
        $('#PDOB').val(result[i].DOB);
        
        $('#PGender').val(result[i].Gender);
        $('#Country').val(result[i].Nationality);
        $('#MobileNo').val(result[i].Contact);
        $('#EmailId').val(result[i].Email);
        $('#Branch').val(result[i].Branch);
        $('#txt_docdeptname').val(result[i].Department);
        $('#Doctor').val(result[i].Doctor);
        $('#PDATE').val(result[i].AppointmentDate);
        $('#PTime').val(result[i].AppointmentTime);
        


    }
    $('#Entry').show();
   
   
    $('#txtname').focus();
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

function Validateemail() {
    var email = $('#EmailId').val();
    if (email != '') {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //var address = document.getElementById[email].value;
        if (reg.test(email) == false) {
            warningshow('Please Enter a valid Email', 'EmailId');
            return (false);
        }
        else
            return true;
    }
    else
        return true;

}
//Get List and Single Row from table

function GetRowsss(AppointmentId) {

    $('#AppointmentId').val(AppointmentId)
    var data = {};
    data.AppointmentId = AppointmentId;
    $.ajax({
        type: "POST",
        url: "../Master/AppointmentGetandGets",
        data: data,
        success: function (result) {
            if (AppointmentId == 0)
                ShowTermGet(result.oList);
            

        }
    });

}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');

    });
    //var table = null;
    //if (download) {
    //    if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }

    // AddColumnSelectionButton(tableButtonContainerId, tablename)

    table = $('#' + tablename).DataTable({
        dom: 'Blfrtip',
        dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-1'i><'col-sm-11'p>>",
        buttons: [],

    });
    new $.fn.dataTable.Buttons(table, {
        buttons: [
        {
            extend: 'collection',
            text: 'Export',
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: title,
                    messageTop: 'EUMI ERP',
                    exportOptions: { columns: [0, 1, 2] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'EUMI ERP',
                    exportOptions: { columns: [0, 1, 2] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'EUMI ERP',
                    exportOptions: { columns: [0, 1, 2] }
                }
            ]
        },
        //'colvis'
        ],
        "columnDefs": [
                  { "width": "0%", "targets": 0 },
                  { "width": "20%", "targets": 1 },
                  { "width": "30%", "targets": 2 },
                  { "width": "20%", "targets": 3 },
                    { "width": "20%", "targets": 4 },
                     { "width": "10%", "targets": 4 },

        ],
    });

    table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
    $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");


    //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
    //    var column = table.column($(this).attr('data-em-col'));
    //    console.log($(this).attr('data-em-col'));
    //    console.log(column);
    //    column.visible($(this).prop("checked"));
    //});
    //} else {
    //    table = $('#' + tablename).DataTable();
    //}
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
}
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresher();
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



