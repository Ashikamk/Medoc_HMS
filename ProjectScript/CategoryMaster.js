$(document).ready(function () {
    Defaultfocus();



    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

});//Document Close


function Defaultfocus() {
    $('#CategoryCode').focus();
}

function CodeName() {
    if ($('#CategoryId').val() == 0) {
        $('#CategoryName').val($('#CategoryCode').val())
    }
}


function SaveAndUpdate(Flag) {
    if ($('#CategoryCode').val() == "") {
        warningshow('Please Enter Code', 'CategoryCode');
    }
    else if ($('#CategoryName').val() == "") {
        warningshow('Please Enter Name', 'CategoryName');
    }
    else {
        var data = {};   //array
        data.CategoryId = $('#CategoryId').val();;
        data.CategoryName = $('#CategoryName').val();
        data.CategoryCode = $('#CategoryCode').val();
        data.CategoryDescription = $('#CategoryDescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/CategoryInsertandUpdate",
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
    $('#CategoryName').val('');
    $('#CategoryCode').val('');
    $('#CategoryDescription').val('');
    $('#CategoryCode').focus();
    $('#CategoryId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}


function ShowCategorylist(result) {
    disable_datatable('tblcategory');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1% ;align=center>Sl#</th><th width=6%>Code</th><th width=35%>Name</th><th width=35%>Description</th><th width=3% align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].CategoryCode + '</td><td>' + result[i].CategoryName + '</td><td>' + result[i].CategoryDescription + '</td><td align=center><a onclick="GetRows(' + result[i].CategoryId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblcategory').html(responseText + '</tbody><tfoot><tr><th align=center>Sl#</th><th>Code</th><th>Name</th><th>Description</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblcategory');
}

var oTable = $("#tblcategory").dataTable({
    // Your other options here...
    "bAutoWidth": true
});
function ShowCategoryGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#CategoryName').val(result[i].CategoryName);
        $('#CategoryCode').val(result[i].CategoryCode);
        $('#CategoryDescription').val(result[i].CategoryDescription);
        $('#CategoryCode').focus();

    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(CategoryId) {
    $('#CategoryId').val(CategoryId)
    var data = {};
    data.CategoryId = CategoryId;
    $.ajax({
        type: "POST",
        url: "../Master/CategoryGetandGets",
        data: data,
        success: function (result) {
            if (CategoryId == 0)
                ShowCategorylist(result.oList);
            else
                ShowCategoryGet(result.oList);

        }
    });

}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Serial#' && title != ' ' && title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'Code') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Name') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Description') {
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


function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}



