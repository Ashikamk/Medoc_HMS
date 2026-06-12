$(document).ready(function () {
    Defaultfocus();


    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });



    $('#FuelType').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Driver').focus();
            e.preventDefault();
        }
    });

    $('#InsuranceType').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Validity').focus();
            e.preventDefault();
        }
    });




});//Document Close



function Defaultfocus() {
    $('#RegistrationNumber').focus();
}
function CodeName() {
    if ($('#VehicleId').val() == 0) {
        $('#Name').val($('#RegistrationNumber').val())
    }
}


function SaveAndUpdate(Flag) {
    if ($.trim($('#RegistrationNumber').val()) == "") {
        warningshow('Please Select patient', 'RegistrationNumber');
    }
    else if ($.trim($('#Name').val()) == "") {
        warningshow('Please Enter Name', 'Name');
    }


    else if (parseFloat($('#Driver').val()||0) == 0) {
        warningshow('Please  Enter Advance Amount', 'Driver');
    }
    else {
        var s = "Inactive";
        if ($('#VehicleStatus').prop("checked"))
        { s = "Active"; }
        var data = {};   //array
        data.VehicleId = $('#VehicleId').val();;
        data.RegistrationNumber = $('#RegistrationNumber').val();
        data.Name = $('#Name').val();
        data.VehicleStatus = $('#PID').val();
        data.FuelType = $('#FuelType').val();
        data.Driver = parseFloat( $('#Driver').val()||0);
        data.RegistrationDate = $('#RegistrationDate').val();
        data.ExpiryDate = $('#ExpiryDate').val();
        data.InsuranceType = $('#InsuranceType').val();
        data.Validity = $('#Validity').val();
        data.VehicleDescription = $('#VehicleDescription').val() + '##' + ERPDeptId + '@@' + ERPUserId;
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/VehicleInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                }
            }
        });

    }


}




function formrefresh() {
    $('#Name').val('');
    $('#RegistrationNumber').val('');
    $('#FuelType').val('1');
    $('#Driver').val('');
    $('#RegistrationDate').val(CurDate);
    $('#ExpiryDate').val(CurDate);
    $('#InsuranceType').val('0');
    $('#Validity').val('');
    $('#VehicleDescription').val('');
    $('#VehicleStatus').prop("checked", true);
    $('#RegistrationNumber').focus();
    $('#VehicleId').val(0);
    $('#PID').val(0)
    $('#btndelete1').hide();
    $('#btnprint').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}


function ShowVehiclelist(result) {
    disable_datatable('tblvehicle');
    $('#Entry').hide();
    $('#listing').show();
    var Ptype = "";
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=10%>Ip#</th><th width=10%>Reg#</th><th width=25%>Name</th><th width=7%>Ad-Date</th><th width=7%>Type</th><th width=7%>Amount</th><th width=7%>Notes</th> <th width=7%>Edit</th>   </tr></thead><tbody>";
   for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        if (result[i].FuelType == 1) { Ptype = 'CASH' }
        else if (result[i].FuelType == 2) { Ptype = 'UPI/OTHER' }
        else { Ptype = 'BANK/CARD' }
        responseText += '<tr><td align=center;>' + slno + '</td><td>' + result[i].InsuranceType + '</td><td>' + result[i].RegistrationNumber + '</td><td>' + result[i].Name + '</td><td>' + result[i].RegistrationDate + '</td><td>' + Ptype + '</td><td>' + result[i].Driver + '</td><td></td><td align=center><a onclick="GetRows(' + result[i].VehicleId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblvehicle').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>IP#</th><th>Reg#</th><th>Name</th><th>Ad-Date</th><th>Type</th><th>Amount</th><th>Notes</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblvehicle');
}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'Registration#') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Name') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Status') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Fuel Type') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Driver') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Registration Date') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Validity Date') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Insurance Type') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Expiry Date') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
    });
    var table = null;
    table = $('#' + tablename).DataTable({
        dom: 'Blfrtip',
        dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-1'i><'col-sm-11'p>>",
        buttons: [],
        //"columnDefs": [

        //     { "width": "17%", "targets": 2 },
        //     { "width": "18%", "targets": 3 },
        //      { "width": "15%", "targets": 4 },
        //        { "width": "15%", "targets": 5 },
        //          { "width": "10%", "targets": 6 },
        //           { "width": "10%", "targets": 7 },

        //]

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
                    exportOptions: { columns: [0, 1, 2,3,4,5,6,7,8,9] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }
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
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function ShowVehicleGet(result) {
    for (var i = 0; i < result.length; i++) {
        
        $('#Name').val(result[i].Name);
        $('#RegistrationNumber').val(result[i].RegistrationNumber);
        $('#VehicleStatus').val(result[i].VehicleStatus);
        $('#FuelType').val(result[i].FuelType);
        $('#Driver').val(result[i].Driver);
        $('#RegistrationDate').val(result[i].RegistrationDate);
        $('#ExpiryDate').val(result[i].ExpiryDate);
        $('#InsuranceType').val(result[i].InsuranceType);
        $('#Validity').val(result[i].Validity);
        $('#VehicleDescription').val(result[i].VehicleDescription);
        $('#RegistrationNumber').focus();
    }
    $('#Entry').show();
    $('#btnsubmit').hide();
    $('#listing').hide();
    $('#btndelete1').show();
    $('#btnprint').show();
}



function GetRows(VehicleId) {
    $('#VehicleId').val(VehicleId)
    var data = {};
    data.VehicleId = VehicleId;
    $.ajax({
        type: "POST",
        url: "../Master/VehicleGetandGets",
        data: data,
        success: function (result) {
            if (VehicleId == 0)
                ShowVehiclelist(result.oList);
            else
                ShowVehicleGet(result.oList);

        }
    });

}




