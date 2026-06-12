$(document).ready(function () {
    Defaultfocus();
    CreatedByLoad();
    LocnLoad();
    //Focus
    $('input').keydown(function (e) {
        if (e.which === 13) {
            $(this).closest('td').nextAll().eq(0).find('input').focus().select()
        }
    });
    $('input').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }
    });


    $('select').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }
    });

    $('#StartDate,#EndDate,#ReturnDate,#CheckoutDate,#CheckinDate,#TicketDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear() + 50, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }

    });

    $('#btnnew').click(function () {
        formrefresh();
    });
    
});

function Defaultfocus() {
    $('#Customer').focus();   
}

function CreatedByLoad() {
    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            var Department = result.oList[0].DepartmentName;
            var UserName = result.oList[0].User;
            var DepartmentId = result.oList[0].DepartmentId;
            var UserId = result.oList[0].UserId;

            $('#CreatedBy').val(UserName);
            $('#CreatedById').val(UserId);
            
        }
    });
}


function LocnLoad() {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList);
        }
    });
}

function LocationLoad(result) {
    $("#Checkoutlocation").empty();
    $("#Checkinlocation").empty();

    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
            LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }
    $("#Checkoutlocation").append(LocnSelect);
    $('#Checkinlocation').append(LocnSelect);
}


function SaveAgreement(flag) {
    var StartDate = '';
    var EndDate = '';
    StartDate = $('#StartDate').val();
    EndDate = $('#EndDate').val();

    var momentA = moment(StartDate, "DD/MM/YYYY");
    var momentB = moment(EndDate, "DD/MM/YYYY");
  

    if ($('#Customer').val() == '') {
        warningshow('Please Select Customer', 'Customer');
    }
    else if (momentA > momentB) {
        warningshow('Start Date must be less than End Date', 'StartDate');
    }
    else if ($('#AgreementNo').val() == '') {
        warningshow('Please Enter Agreement Number', 'AgreementNo');
    }
   
    else if ($('#VechicleNo').val() == '') {
        warningshow('Please Select Vechicle', 'VechicleNo');
    }
   
    else if ($('#PONo').val() == '') {
        warningshow('Please Enter Purchase Order Number', 'PONo');
    }
    else if ($('#Checkoutlocation').val() == 0) {
        warningshow('Please Select Check-Out Location', 'Checkoutlocation');
    }
    else if ($('#Checkinlocation').val() == 0) {
        warningshow('Please Select Check-In Location', 'Checkinlocation');
    }
    else {
        var data = {};   //array
        data.AgreementId = $('#AgreementId').val();
        data.StartDate = $('#StartDate').val();
        data.EndDate = $('#EndDate').val();
        data.ReturnDate = $('#ReturnDate').val();
        data.CustomerId = $('#CustomerId').val();
        data.AgreementNo = $('#AgreementNo').val();
        data.LicenseNo = $('#LicenseNo').val();
        data.CheckoutDate = $('#CheckoutDate').val();
        data.CheckinDate = $('#CheckinDate').val();
        data.TicketDate = $('#TicketDate').val();
        data.VechicleId = $('#VechicleId').val();
        data.Make = $('#Make').val();
        data.Model = $('#Model').val();
        data.Phone = $('#Phone').val();
        data.CardNo = $('#CardNo').val();
        data.PONo = $('#PONo').val();
        data.Checkoutlocation = $('#Checkoutlocation').val();
        data.Checkinlocation = $('#Checkinlocation').val();
        data.AgreementType = $('#AgreementType').val();
        data.CreatedById = $('#CreatedById').val();
        data.DelFlag = flag;
        data.CurrDate = CurDate;
        data.AgreementStatus = $('#AgreementStatus').text();
        data.UserId = ERPUserId;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../CarAgreement/CarAgreementInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                }
            }
        });

    }
   
}

function GetRows(AgreementId) {
    $('#AgreementId').val(AgreementId)
    var data = {};
    data.AgreementId = AgreementId;
    $.ajax({
        type: "POST",
        url: "../CarAgreement/CarAgreementGetandGets",
        data: data,
        success: function (result) {
            if (AgreementId == 0){
                  ShowCarAgreementlist(result.oList);
            }
              
        else{
                 ShowCarAgreementGet(result.oList);
                }
               

        }
    });
}

function ShowCarAgreementlist(result) {
    disable_datatable('tblagreement');
    $('#Entry').hide();
    $('#listing').show();
    var Status=''
    var responseText = "<thead><tr><th width=1% ;align=center>Sl#</th><th>Agreement#</th><th>vehicle#</th><th>vehicle Description</th><th>License#</th><th>Chk-Out Date</th><th>Chk-In Date</th><th>Customer</th><th>Phone#</th><th>Status</th><th>Created Date</th><th>Created By</th><th>Sales Status</th><th width=3% align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        if (result[i].SalesFlag == 0) {
            var rowclass = 'badge-success';
            Status = 'Open';
        }
        else {
            var rowclass = 'badge-danger';
            Status = 'Closed';
        }
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].AgreementNo + '</td><td>' + result[i].VechicleNo + '</td><td>' + result[i].VechicleDesc + '</td><td>' + result[i].LicenseNo + '</td><td>' + result[i].CheckoutDate + '</td><td>' + result[i].CheckinDate + '</td><td>' + result[i].CustomerName + '</td><td>' + result[i].Phone + '</td><td>' + result[i].AgreementStatus + '</td><td>' + result[i].CurrDate + '</td><td>' + result[i].CreatedBy + '</td><td><div class="text-center" style="width:100%"><span style="width:100%" class="badge ' + rowclass + '">' + Status + '</span></div></td><td align=center><a onclick="GetRows(' + result[i].AgreementId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblagreement').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Agreement#</th><th>vehicle#</th><th>vehicle Description</th><th>License#</th><th>Check-Out Date</th><th>Check-In Date</th><th>Customer</th><th>Phone#</th><th>Status</th><th>Created Date</th><th>Created By</th><th>Sales Status</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch('tblagreement');
}

function ShowCarAgreementGet(result) {
    //alert(result.length)
    for (var i = 0; i < result.length; i++) {
        $('#StartDate').val(result[i].StartDate);
        $('#EndDate').val(result[i].EndDate);
        $('#ReturnDate').val(result[i].ReturnDate);
        $('#CheckoutDate').val(result[i].CheckoutDate);
        $('#CheckinDate').val(result[i].CheckinDate);
        $('#TicketDate').val(result[i].TicketDate);
        $('#AgreementId').val(result[i].AgreementId);
        $('#Customer').val(result[i].CustomerName);
        $('#CustomerId').val(result[i].CustomerId);
        $('#AgreementNo').val(result[i].AgreementNo);
        $('#LicenseNo').val(result[i].LicenseNo);
        $('#VechicleNo').val(result[i].VechicleNo);
        $('#VechicleId').val(result[i].VechicleId);
        $('#VehicleDesc').val(result[i].VechicleDesc);
        $('#Make').val(result[i].Make);
        $('#Model').val(result[i].Model);
        $('#Phone').val(result[i].Phone);
        $('#CardNo').val(result[i].CardNo);
        $('#PONo').val(result[i].PONo);
        $('#Checkoutlocation').val(result[i].Checkoutlocation);
        $('#Checkinlocation').val(result[i].Checkinlocation);
        $('#CreatedBy').val(result[i].CreatedBy);
        $('#CreatedById').val(result[i].CreatedById);
        $('#DailyPrice').val(result[i].DailyPrice);
        $('#WeeklyPrice').val(result[i].WeeklyPrice);
        $('#MonthlyPrice').val(result[i].MonthlyPrice);
        $('#AnnualPrice').val(result[i].AnnualPrice);
        $('#SalesFlag').val(result[i].SalesFlag);
        $('#Address').val(result[i].Address);
        $('#PhoneNo').val(result[i].PhoneNo);
        $('#Email').val(result[i].Email);
        $('#ItemId').val(result[i].ItemId);
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
   
    if ($('#SalesFlag').val() == 0) {
        $('#btnSI').show();
    }
    else
    {
        $('#btnSI').hide();
    }
}

function formrefresh() {
    Defaultfocus();
    CreatedByLoad();
    LocnLoad();
    $('#StartDate').val(CurDate);
    $('#EndDate').val(CurDate);
    $('#ReturnDate').val(CurDate);
    $('#CheckoutDate').val(CurDate);
    $('#CheckinDate').val(CurDate);
    $('#TicketDate').val(CurDate);
    $('#AgreementId').val(0);
    $('#Customer').val('');
    $('#CustomerId').val('');
    $('#AgreementNo').val('');
    $('#LicenseNo').val('');
    $('#VechicleNo').val('');
    $('#VechicleId').val('');
    $('#VehicleDesc').val('');
    $('#Make').val('');
    $('#Model').val('');
    $('#Phone').val('');
    $('#CardNo').val('');
    $('#PONo').val('');
    $('#Checkoutlocation').val(0);
    $('#Checkinlocation').val(0);
    $('#CreatedBy').val('');
    $('#CreatedById').val('');
    $('#btndelete').hide();
    $('#btnSI').hide();
    $('#SalesFlag').val('');
    $('#Address').val('');
    $('#PhoneNo').val('');
    $('#Email').val('');
    $('#ItemId').val('');
}

function closetable() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}



//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

//Numeric Only Text Boxes
function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 43 && charCode != 45 && charCode != 40 && charCode != 41 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}



//Show Window Alert Insert,update delete  Modify
function Showalerts(Status) {
    if (Status == 1) {
        //formrefresh();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 2) {
       // formrefresh();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 3) {
        
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 4) {
       
        swal('Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 5) {
       
        swal('Data Cancelled', "", "error");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 6) {
       
        swal('Data Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 7) {
        swal('Car Not Available In These Days', "", "error");
        $('.swal-button swal-button--confirm').focus();       
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}
//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}


function datatableWithsearch(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'vehicle#' || title == 'Agreement#' || title == 'vehicle Description' || title == 'License#' || title == 'Check-Out Date' || title == 'Check-In Date' || title == 'Customer' || title == 'Phone#' || title == 'Status' || title == 'Created Date' || title == 'Created By' || title == 'Sales Status') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }       
    });

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
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5,6,7,8,9,10,11] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
                }
            ]
        },
        //'colvis'
        ]
    });
    table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
    $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");


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
