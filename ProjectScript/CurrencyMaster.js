var Decimal = Decimal;
$(document).ready(function () {
    Defaultfocus();


    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

});

function Defaultfocus() {
    $('#txt_code').focus();
}
function CodeName() {
    if ($('#Id').val() == 0) {
        $('#txt_cname').val($('#txt_code').val())
    }
}
//Submit Button Click Event
function SaveAndUpdate(Flag) {
    if ($('#txt_code').val() == "") {
        warningshow('Please Enter Code', 'txt_code');
    }
    else if ($('#txt_cname').val() == "") {
        warningshow('Please Enter Name', 'txt_cname');
    }
    else if ($('#txt_rate').val() == "") {
        warningshow('Please Enter Rate', 'txt_rate');
    }
    else {
        var data = {};   //array
        data.Id = $('#Id').val();;
        data.CurrencyCode = $('#txt_code').val();
        data.CurrencyName = $('#txt_cname').val();
        data.CurrencyRate = $('#txt_rate').val();
        data.Remarks = $('#txt_remark').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/CurrencyInsertandUpdate",
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
    $('#txt_code').val('');
    $('#txt_cname').val('');
    $('#txt_rate').val('');
    $('#txt_remark').val('');
    $('#txt_code').focus();
    $('#Id').val(0);
    $('#btndelete').hide();
    $('#btnsubmit').show();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowArealist(result) {
    disable_datatable('tbl_currency1');
    $('#Entry').hide();
    $('#listing').show();
    $('#btnnew').show();
    var responseText = "<thead><tr><th width=width=1% ;align=center>Sl#</th><th  width=11%>Code</th><th width=55%>Name</th><th width=20% ; align=center>Rate</th><th width=3%;align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].CurrencyCode + '</td><td>' + result[i].CurrencyName + '</td><td align=right>' + parseFloat(result[i].CurrencyRate) + '</td><td align=center><a onclick="GetRows(' + result[i].Id + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tbl_currency1').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Name</th><th>Rate</th><th align=center>Edit</th></tr></tfoot> ');
    datatableWithsearch1('tbl_currency1');
}
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function ShowAreaGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txt_code').val(result[i].CurrencyCode);
        $('#txt_cname').val(result[i].CurrencyName);
        $('#txt_rate').val(result[i].CurrencyRate);
        $('#txt_remark').val(result[i].Remarks);
        $('#txt_code').focus();
    }
    if ($('#txt_rate').val() == 1) {
        $('#btnsubmit').hide();
    }
    else {
        $('#btnsubmit').show();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();

}




function GetRows(Id) {
    $('#Entry').hide();
    $('#listing').show();
    $('#Id').val(Id)
    var data = {};
    data.Id = Id;
    $('#Entry').hide();
    $.ajax({

        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data,
        success: function (result) {
            if (Id == 0)
                ShowArealist(result.oList);
            else
                ShowAreaGet(result.oList);

        }
    });

}



function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != 'Rate' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'Code') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Name') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Rate') {
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
