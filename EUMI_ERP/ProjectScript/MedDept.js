var Decimal = Decimal;
$(document).ready(function () {
    Defaultfocus();


    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

});

function Defaultfocus() {
    $('#txt_dname').focus();
}

//Submit Button Click Event
function SaveAndUpdate(Flag) {
    if ($('#txt_dname').val() == "") {
        warningshow('Please Enter Name', 'txt_dname');
    }
    else if ($('#txt_num').val() == "") {
        warningshow('Please Enter Number', 'txt_num');
    }
    else if ($('#txt_desc').val() == "") {
        warningshow('Please Enter Desc', 'txt_desc');
    }
    else if ($('#txt_head').val() == "") {
        warningshow('Please Enter Head Of Department', 'txt_head');
    }
    else {
        var data = {};   //array
        data.DepId = $('#DepId').val();
        data.Department = $.trim($('#txt_dname').val());
        data.Description = $.trim($('#txt_desc').val());
        data.PhNumber = $.trim($('#txt_num').val());
        data.HOD = $.trim($('#txt_head').val());
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/MedDeptInsertandUpdate",
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
    $('#txt_desc').val('');
    $('#txt_dname').val('');
    $('#txt_head').val('');
    $('#txt_num').val('');
    $('#txt_dname').focus();
    $('#DepId').val(0);
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
    disable_datatable('tbl_dept');
    $('#Entry').hide();
    $('#listing').show();
    $('#btnnew').show();
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=3% >Department</th><th  width=35%>Description</th><th width=7% >Number</th><th width=7%  >HOD</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].Department + '</td><td>' + result[i].Description + '</td><td>' + result[i].PhNumber + '</td><td >' + result[i].HOD + '</td><td onclick="GetRows(' + result[i].DepId + ')" align=center width=10px bgcolor="#00ffff "><a>' + Editbutton + '</a></td></tr>';
    }
    $('#tbl_dept').html(responseText + '</tbody><tfoot><tr><th> </th><th>Name</th><th>Desc</th><th>Phone</th><th>Head</th><th align=center> </th></tr></tfoot> ');
    datatableWithsearch1('tbl_dept');
}
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function ShowAreaGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txt_dname').val(result[i].Department);
        $('#txt_desc').val(result[i].Description);
        $('#txt_num').val(result[i].PhNumber);
        $('#txt_head').val(result[i].HOD);
        $('#txt_dname').focus();
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

function KisNumberInt(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}




function GetRows(DepId) {

    $('#Entry').hide();
    $('#listing').show();
    $('#DepId').val(DepId)
    var data = {};
    data.DepId = DepId;
    $('#Entry').hide();
    $.ajax({

        type: "POST",
        url: "../Master/MedDeptGetandGets",
        data: data,
        success: function (result) {
            if (DepId == 0)
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
        if (title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');
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
                    exportOptions: { columns: [0, 1, 2, 3,4] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3,4] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3,4] }
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
