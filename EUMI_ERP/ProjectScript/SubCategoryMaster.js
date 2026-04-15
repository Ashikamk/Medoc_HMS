$(document).ready(function () {
    Defaultfocus();

    function CategoryLoad(result) {
        $("#CategoryName").empty();
        $("#CategoryName").append("<option value='0'>--Select--</option>");
        for (var i = 0; i < result.length; i++) {
            $("#CategoryName").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
        }
    }

    var data = {};
    data.CategoryId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CategoryGetandGets",
        data: data,
        success: function (result) {
            CategoryLoad(result.oList);

        }
    });

    $('#CategoryName').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#SubCategoryName').focus();
            e.preventDefault();
        }
    });
    $('#SubCategoryName').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#SubCategoryDescription').focus();
            e.preventDefault();
        }
    });
    $('#SubCategoryDescription').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnsubmit').focus();
            e.preventDefault();
        }
    });



    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

    $(document).keydown(function (e) {
        $('#Warningpopup').fadeOut();
        if (e.altKey && e.keyCode == 83) {
            SaveAndUpdate(1)
        }
        else if (e.altKey && e.keyCode == 76) {
            GetRows(0)
        }
        else if (e.altKey && e.keyCode == 67) {
            formrefresh();
        }
        else if (e.altKey && e.keyCode == 88) {
            closetable();
        }

    })


    $("#btndelete").click(function (e) {
        $('#confirm').show();
        $('#confirmOk').focus();

    });

});//Document Close



function Defaultfocus() {

    $('#CategoryName').focus();
}


function SaveAndUpdate(Flag) {

    if ($('#CategoryName').val() == 0) {
        warningshow('Please Select  Category Name', 'CategoryName');
    }
    else if ($('#SubCategoryName').val() == "") {
        warningshow('Please Enter SubCategory Name', 'SubCategoryName');
    }

    else {

        var data = {};   //array
        data.SubCategoryId = $('#SubCategoryId').val();;
        data.CategoryId = $('#CategoryName').val();
        data.SubCategoryName = $('#SubCategoryName').val();
        data.SubCategoryDescription = $('#SubCategoryDescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/SubCategoryInsertandUpdate",
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
    $('#CategoryName').val('0');
    $('#SubCategoryName').val('');
    $('#SubCategoryDescription').val('');
    $('#CategoryName').focus();
    $('#SubCategoryId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}


function ShowSubCategorylist(result) {
    disable_datatable('tblsubcategory');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center;>Sl#</th><th width=3%>Category Name</th><th  width=3%>SubCategory Name</th><th width=45%>Description</th><th  width=3% ; align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].CatName + '</td><td>' + result[i].SubCategoryName + '</td><td>' + result[i].SubCategoryDescription + '</td><td align=center><a onclick="GetRows(' + result[i].SubCategoryId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblsubcategory').html(responseText + '</tbody> <tfoot><th>Sl#</th><th>Category Name</th><th>SubCategory Name</th><th>Description</th><th>Edit</th></tr> </tfoot>');
    datatableWithsearch('tblsubcategory');
}

function ShowSubCategoryGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#CategoryName').val(result[i].CategoryId);
        $('#SubCategoryName').val(result[i].SubCategoryName);
        $('#SubCategoryDescription').val(result[i].SubCategoryDescription);
        $('#CategoryName').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}


function GetRows(SubCategoryId) {
    $('#SubCategoryId').val(SubCategoryId)
    var data = {};
    data.SubCategoryId = SubCategoryId;
    $.ajax({
        type: "POST",
        url: "../Master/SubCategoryGetandGets",
        data: data,
        success: function (result) {
            if (SubCategoryId == 0)
                ShowSubCategorylist(result.oList);
            else
                ShowSubCategoryGet(result.oList);

        }
    });

}


function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true') {
        SaveAndUpdate(0)
    }
    $('#confirm').fadeOut();

}


//Show Window Alert Insert,update delete  Modify
function Showalerts(Status) {
    if (Status == 1) {
        formrefresh();
        swal('Data Saved Successfully', "", "success");
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
    else if (Status == 4) {
        formrefresh();
        swal('Cannot Deleted', "", "error");
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

//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
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
function datatableWithsearch(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Category Name') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'SubCategory Name') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

        if (title == 'Description') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }

    });
   // var table = null;
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
        //table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        //$("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
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





