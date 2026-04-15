
/*=========================================================================================
    File Name: Common.js
    Description: Common Functions
    ----------------------------------------------------------------------------------------
    Item Name: Eumi-ERP
    Version: 1.0
    Author: Eumi
    Author URL: eumierp.com
    Date       :23-07-2018
==========================================================================================*/





$(document).keydown(function (e) {
   // $('#Warningpopup').fadeOut();
    if ((e.altKey && e.keyCode == 83) && (!$("#addacnttype").is(":visible"))) {
        SaveAndUpdate(1)
    }
    else if ((e.altKey && e.keyCode == 76) && (!$("#addacnttype").is(":visible"))) {
        GetRows(0)
    }
    else if ((e.altKey && e.keyCode == 67) && (!$("#addacnttype").is(":visible"))) {
        formrefresh();
    }
    else if (e.altKey && e.keyCode == 88) {
        closetable();
    }

})




$(document).ready(function () {
    var decimail = 2; 

    //Focus next element inside the form (text box)
    $('input').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
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

    $("#btndelete").click(function (e) {
        $('#confirmmessage').text('Do You Want To Delete This Record?')
        $('#confirm').show();
        $('#confirmOk').focus();
    });



    //Only Allows Numbers With Floating Point

    $('input[name="inputnumberfloat"]').keypress(function (e) {
        $(this).val($(this).val().replace(/[^0-9\.]/g,''));
        if (e.which != 8 && e.which != 0 && (e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only')
            return false;
        }

    });

    //Only Allows Numbers Without Floating Point

    $('input[name="inputnumberint"]').keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only')
            return false;
        }

    });


});//End Document.ready

//Numeric Only Text Boxes
function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 43 && charCode != 45 && charCode != 40 && charCode != 41 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}

//Numeric Only Text Boxes with Decimal Point

function isNumberFloatCommon(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }

    return true;

}
//function AddColumnSelectionButton(tableButtonContainerId, tablename) {
//    var jqColSelector = $("<div>").addClass("dropdown")
//        .append($('<button class="btn btn-outline-primary dropdown-toggle mx-2" type="button" id="colSelectorButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">')
//        .text('Columns')).appendTo($("#" + tableButtonContainerId));

//    var jqULSelector = $("<div>").addClass("px-2")
//        .appendTo($("<div>").addClass("dropdown-menu").attr("aria-labeled-by", "colSelectorButton").appendTo(jqColSelector));
//    var colIndex = 0;
//    $("#" + tablename).find("thead").first().find("tr").first().find("th").each(function () {
//        var colName = $(this).text();
//        var jqItem = $("<div>").append($("<label>").addClass("text-nowrap")
//            .append($('<input type="checkbox" />').attr('data-em-col', colIndex++).prop("checked", true))
//            .append(' ').append($("<span>").append(colName)));
//        jqULSelector.append(jqItem);
//    });
//}

//Remove Datatable If alredy data table Created

function datatableWithsearch(tablename, download, title, tableButtonContainerId) {
  
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Slno' && title != 'Serial#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Key')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
    });
    var table = null;
    if (download) {
        if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }

        // AddColumnSelectionButton(tableButtonContainerId, tablename)

        table = $('#' + tablename).DataTable({
            // dom: 'Bfrtip',
            dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-1'i><'col-sm-11'p>>",
            buttons: []
           
        });
        new $.fn.dataTable.Buttons(table, {
            buttons: [
            {
                extend: 'collection',
                text: 'Export',
                className: 'excelexport',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    }
                ]
            },
            'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
        //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
        //    var column = table.column($(this).attr('data-em-col'));
        //    console.log($(this).attr('data-em-col'));
        //    console.log(column);
        //    column.visible($(this).prop("checked"));
        //});
    } else {
        table = $('#' + tablename).DataTable();
    }
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
    if (ExcelExport == 0) {
        $('.excelexport').hide();
    }
}


function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true') {      
        SaveAndUpdate(0)
    }
    $('#confirm').fadeOut();

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

//Show Warnig Popup right top
function warningshow(message, Id) {   
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
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
    else if (Status == 5) {
        formrefresh();
        swal('Data Cancelled', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh();
        swal('Data Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}


function ShowalertsSub(Status) {
    if (Status == 1) {      
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }

}

