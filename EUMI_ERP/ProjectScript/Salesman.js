$(document).ready(function () {
    Defaultfocus();
    GetUser();
   

    $("#btnsubmit").click(function (e) {

        SaveAndUpdate(1)
    });


    $("#txt_contactnumber").keypress(function (e) {

        if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only', 'txt_contactnumber')
            return false;
        }

    });

});

function GetUser() {
    var data = {};
    data.UserName = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UserSearchInUserMenuSettings",
        data: data,
        success: function (result) {
            GetUserList(result);

        }
    });

}

function GetUserList(result) {
    $("#User").empty();
    $("#User").append("<option value='0'>---Select User---</option>");
    for (var i = 0; i < result.length; i++) {
        $("#User").append("<option value='" + result[i].UserId + "'>" + result[i].UserName + "</option>");
    }
}





function formrefresh() {
    $("#User").val(0);
    $('#txt_code').val('');
    $('#txt_fname').val('');
    $('#txt_lname').val('');
    $('#txt_amount').val('');
    $('#file').val('');
    $('#txt_contactnumber').val('');
    $('#txt_address1').val('');
    $('#txt_address2').val('');
    $('#txt_address3').val('');
    $('#Id').val(0);
    $('#txt_code').focus();
    $('#btndelete').hide();
}


function Defaultfocus() {
    $('#txt_code').focus();
}

function CodeName() {
    if ($('#Id').val() == 0) {
        $('#txt_fname').val($('#txt_code').val())
    }
}
function SaveAndUpdate(Flag) {
    if ($('#txt_code').val() == "") {
        warningshow('Please Enter Code', 'txt_code');
    }
    else if ($('#txt_fname').val() == "") {
        warningshow('Please Enter  Name', 'txt_fname');
    }
    else if ($('#txt_lname').val() == "") {
        warningshow('Please Enter Last Name', 'txt_lname');
    }
    //else if ($('#User').val() == 0) {
    //    warningshow('Please Select User', 'User');
    //}


    else {
        var data = {};
        data.Id = $('#Id').val();;
        data.Code = $('#txt_code').val().trim();
        data.FirstName = $('#txt_fname').val().trim();
        data.LastName = $('#txt_lname').val();
        data.TargetAmount = $('#txt_amount').val();
        data.Image = $('file').val();
        data.ContactNumber = $('#txt_contactnumber').val();
        data.Address1 = $('#txt_address1').val();
        data.Address2 = $('#txt_address2').val();
        data.Address3 = $('#txt_address3').val();
        data.UserId = $('#User').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/SalesmanInsertandUpdate",
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

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowArealist(result) {
    disable_datatable('tbl_salesman');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th  width=1%;align=center>Sl#</th><th width=1%>Code</th><th width=1%> Name</th><th width=1%>Target Amt.</th><th width=1%>Contact#</th><th >Address1</th><th>Address2</th><th>Address3</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td  align=center>' + slno + '</td><td>' + result[i].Code + '</td><td>' + result[i].FirstName +
            '</td><td align=right>' + result[i].TargetAmount.toFixed(Decimal) +
            '</td><td>' + result[i].ContactNumber + '</td><td>' + result[i].Address1 + '</td><td>' + result[i].Address2 +
            '</td><td>' + result[i].Address3 + '</td><td align=center><a onclick="GetRows(' + result[i].Id + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tbl_salesman').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Name</th><th>Target Amt.</th><th>Contact#</th><th>Address1</th><th>Address2</th><th>Address3</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tbl_salesman');
}
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Serial#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Code' || title == 'Name' || title == 'Target Amt.' || title == 'Contact#' || title == 'Address1' || title == 'Address2' || title == 'Address3' || title == 'Contact#')
        $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
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
    if (ExcelExport == 0) {
        $('.excelexport').hide();
    }
}

//function datatableWithsearchSalesman(tablename, download, title, tableButtonContainerId) {

//    var a = '#' + tablename + ' tfoot th'
//    $(a).each(function () {
//        var title = $(this).text();
//        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
//            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
//        if (title == 'Code' || title == 'Name' || title == 'Target Amt.' || title == 'Contact#' || title == 'Address1' || title == 'Address2' || title == 'Address3' || title == 'Contact#')
//            $(this).html('<input type="text" placeholder="' + title + '" style="width=100%" />');
//    });
//    var table = null;
//    if (download) {
//        if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }

//        // AddColumnSelectionButton(tableButtonContainerId, tablename)

//        table = $('#' + tablename).DataTable({
//            // dom: 'Bfrtip',
//            dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
//                    "<'row'<'col-sm-12'tr>>" +
//                    "<'row'<'col-sm-1'i><'col-sm-11'p>>",
//            buttons: []

//        });
//        new $.fn.dataTable.Buttons(table, {
//            buttons: [
//            {
//                extend: 'collection',
//                text: 'Export',
//                buttons: [
//                    {
//                        extend: 'excelHtml5',
//                        title: title,
//                        messageTop: 'MEDOC HMS',
//                        exportOptions: { columns: ":visible" }
//                    },
//                    {
//                        extend: 'pdfHtml5',
//                        title: title,
//                        messageTop: 'MEDOC HMS',
//                        exportOptions: { columns: ":visible" }
//                    },
//                    {
//                        extend: 'print',
//                        title: title,
//                        messageTop: 'MEDOC HMS',
//                        exportOptions: { columns: ":visible" }
//                    }
//                ]
//            },
//            'colvis'
//            ]
//        });
//        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
//        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
//        //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
//        //    var column = table.column($(this).attr('data-em-col'));
//        //    console.log($(this).attr('data-em-col'));
//        //    console.log(column);
//        //    column.visible($(this).prop("checked"));
//        //});
//    } else {
//        table = $('#' + tablename).DataTable();
//    }
//    table.columns().every(function () {
//        var that = this;
//        $('input', this.footer()).on('keyup change', function () {
//            if (that.search() !== this.value) {
//                that
//                    .search(this.value)
//                    .draw();

//            }
//        });
//    });
//}

function ShowAreaGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txt_code').val(result[i].Code);
        $('#txt_fname').val(result[i].FirstName);
        $('#txt_lname').val(result[i].LastName);
        $('#txt_amount').val(result[i].TargetAmount.toFixed(Decimal));
        $('#file').val(result[i].Image);
        $('#txt_contactnumber').val(result[i].ContactNumber);
        $('#txt_address1').val(result[i].Address1);
        $('#txt_address2').val(result[i].Address2);
        $('#txt_address3').val(result[i].Address3);
        $('#User').val(result[i].UserId);
        $('#txtcode').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



//Get List and Single Row from table

function GetRows(Id) {

    $('#Id').val(Id)
    var data = {};

    data.Id = Id;
    $.ajax({
        type: "POST",
        url: "../Master/SalesmanGetandGets",
        data: data,
        success: function (result) {
            if (Id == 0)
                ShowArealist(result.oList);
            else
                ShowAreaGet(result.oList);

        }
    });

}


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        warningshow('Digits Only')
        return false;
    }

    return true;
}