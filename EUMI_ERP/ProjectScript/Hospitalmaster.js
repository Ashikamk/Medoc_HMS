$(document).ready(function () {
    Defaultfocus();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });


});//Document Close

function Defaultfocus() {
    $('#hms_name').focus();
}

function SaveAndUpdate(Flag) {

    if ($('#hms_name').val() == "") {
        warningshow('Please Enter Hospital Name', 'hms_name');
    }

    else if ($('#hms_contact').val() == "") {
        warningshow('Please Enter Contact Number', 'hms_contact');
    }
    else if ($('#hms_address').val() == "") {
        warningshow('Please Enter Address', 'hms_address');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var data = {};   //array
        data.HospitalId = $('#HospitalId').val();
        data.HospitalName = $.trim($('#hms_name').val());
        data.ContactNumber = $.trim($('#hms_contact').val());
        data.Address = $('#hms_address').val();
        data.DelFlag = Flag;

        $.ajax({
            type: "POST",
            url: "../Master/HospitalInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    $('#btnsubmit').prop('disabled', false);
                    Showalerts(status);
                }
            }
        });

    }


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


function formrefresh() {
    $('#hms_address').val('');
    $('#hms_name').val('');
    $('#hms_contact').val('');
    $('#hms_name').focus();
    $('#HospitalId').val(0);
    $('#btndelete').hide();
    $('#Warningpopup').fadeOut();
    $('.swal-button swal-button--confirm').focus();

}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowTermlist(result) {
    $('#Entry').hide();
    $('#listing').show();
    disable_datatable('tblhosp');
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=20% >Name</th><th  width=20%>Contact</th><th  >Address</th><th >Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].HospitalName + '</td><td>' + result[i].ContactNumber + '</td><td>' + (result[i].Address) + '</td><td onclick="GetRows(' + result[i].ProcedureId + ')" align=center width=10px bgcolor="#00ffff "><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tblhosp').html(responseText + '</tbody> <tfoot> <tr><th> </th><th>Name</th><th>Contact</th><th>Address</th><th> </th></tr></tfoot>');
    datatableWithsearch1('tblhosp');
}

function check() {


    var mobile = document.getElementById('txt_docmob');


    var message = document.getElementById('message');

    var goodColor = "#0C6";
    var badColor = "#1cbcd8";

    if (mobile.value.length <= 9 || mobile.value.length >= 15) {

        mobile.style.backgroundColor = badColor;
        message.style.color = badColor;
        warningshow('Not a Valid Number')

    }
}
function ShowTermGet(result) {
    for (var i = 0; i < result.length; i++) {
        $("#HospitalId").val(result[i].HospitalId);
        $('#hms_name').val(result[i].HospitalName);
        $('#hms_contact').val(result[i].ContactNumber);
        $('#hms_address').val(result[i].Address);

    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtname').focus();
}



//Get List and Single Row from table

function GetRows(HospitalId) {

    $('#HospitalId').val(HospitalId)
    var data = {};
    data.HospitalId = HospitalId;
    $.ajax({
        type: "POST",
        url: "../Master/HospitalGetandGets",
        data: data,
        success: function (result) {
            if (HospitalId == 0)
                ShowTermlist(result.oList);
            else
                ShowTermGet(result.oList);

        }
    });

}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ' )
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');
       
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
                    exportOptions: { columns: [0, 1, 2, 3] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3] }
                }
            ]
        },
        //'colvis'
        ],
        "columnDefs": [
                  { "width": "0%", "targets": 0 },
                  { "width": "0%", "targets": 1 },
                  { "width": "100%", "targets": 2 },
                  { "width": "0%", "targets": 3 },
                    { "width": "0%", "targets": 4 },

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



