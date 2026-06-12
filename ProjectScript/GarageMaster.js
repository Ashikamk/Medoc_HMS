$(document).ready(function () {
    Defaultfocus();
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

});

function Defaultfocus() {
    $('#GarageName').focus();
}

function SaveAndUpdate(Flag) {
    if ($('#GarageName').val() == "") {
        warningshow('Please Enter Name', 'GarageName');
    }
   
    else {
        var data = {};   //array
        data.GarageId = $('#GarageId').val();;
        data.GarageName = $('#GarageName').val();
        data.txt_address = $('#txt_address').val();
        data.PhoneNumber = $('#PhoneNumber').val();
        data.DelFlag = Flag;
        //console.log(data)
        $.ajax({
            type: "POST",
            url: "../Master/GarageInsertandUpdate",
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

function GetRows(GarageId) {
    $('#GarageId').val(GarageId)
    var data = {};
    data.GarageId = GarageId;
    $.ajax({
        type: "POST",
        url: "../Master/GarageGetandGets",
        data: data,
        success: function (result) {
            if (GarageId == 0)
                ShowGaragelist(result.oList);
            else
                ShowGarageGet(result.oList);

        }
    });

}

function ShowGaragelist(result) {
    disable_datatable('tblgarage');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=35%>Name</th><th width=35%>Address</th><th width=15%>Phone#</th><th width=3% align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].GarageName + '</td><td>' + result[i].txt_address + '</td><td>' + result[i].PhoneNumber + '</td><td align=center><a onclick="GetRows(' + result[i].GarageId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblgarage').html(responseText + '</tbody><tfoot><tr><th align=center>Sl#</th><th>Name</th><th>Address</th><th>Phone#</th><th>Edit</th></tr></tfoot>');
    datatableWithsearchs('tblgarage');
}

function datatableWithsearchs(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'Name' || title == 'Address' || title == 'Phone#') {
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

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}


function isNumberInt(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}


function ShowGarageGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#GarageName').val(result[i].GarageName);
        $('#txt_address').val(result[i].txt_address);
        $('#PhoneNumber').val(result[i].PhoneNumber);
        $('#GarageName').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}


function formrefresh() {
    $('#GarageName').val('');
    $('#txt_address').val('');
    $('#PhoneNumber').val('');
    $('#GarageName').focus();
    $('#GarageId').val(0);
    $('#btndelete').hide();
}
