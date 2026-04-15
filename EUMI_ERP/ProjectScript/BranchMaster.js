
$(document).ready(function () {
    Defaultfocus();

       

    $("#btnsubmit").click(function (e) {
       
            SaveAndUpdate(1)
    });

       
        $("#txtphone").keypress(function (e) {

            if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
                warningshow('Digits Only', 'txtphone')
                return false;
            }

        });

        $("#txtphone1").keypress(function (e) {

            if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
                warningshow('Digits Only', 'txtphone1')
                return false;
            }

        });
    });
   

function Defaultfocus() {
    $('#txtaddr1').focus();

}
function CodeName() {
    if ($('#BrnchId').val() == 0) {
        $('#txtname').val($('#txtcode').val());
    }
}
function SaveAndUpdate(Flag) {
    if ($('#txtaddr1').val() == "") {
        warningshow('Please Enter Opening Amount', 'txtaddr1');
    }
    else if ($('#txtaddr2').val() == "" && $('#txtphone').val() == "" && $('#txtphone1').val() == "") {
        warningshow('Please Enter Any PatType', 'txtphone1');
    }
    else if (($('#txtaddr3').val() || 0) == 0){
        warningshow('Please select Any User', 'txtaddr3');
    }
       
    else {
        $('#btnsubmit').prop('disabled', true);

        debugger;
        var data = {};   //array           
        data.BrnchId = $('#BrnchId').val();
        data.BrnchCode = ERPUserId;
        data.BrnchName = 0;
        data.BrnchDescription =$('#txtdesc').val();
        data.BrnchAddress1 = parseInt($("#txtaddr1").val() || 0);
        data.BrnchAddress2 = parseInt($("#txtaddr2").val() || 0);
        data.BrnchAddress3 =$('#txtaddr3').val();
        data.BrnchContactNo = parseInt($("#txtphone").val() || 0);
        data.BrnchMobileNo = parseInt($("#txtphone1").val() || 0);
        data.BrnchEmail = 0;
        data.DelFlag = Flag;
        console.log(data)
        $.ajax({
            type: "POST",
            url: "../Master/BranchInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {

                    console.log(result.oList)
                    var Status = result.oList[i].Status;
                    $('#btnsubmit').prop('disabled', false);
                    Showalerts(Status);
                 
                }
            }
        });

    }
}
function formrefresh() {
   
    $('#txtaddr1').val('');
    $('#txtaddr2').val('');
    $('#txtaddr3').val(0);
    $('#txtphone').val('');
    $('#txtphone1').val('');
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

function ShowArealist(result) {
  
    disable_datatable('tblbranch');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=35%>Opening</th><th width=35%>Date</th><th width=35%>Cash</th><th width=10%>Upi</th><th width=10%>Card</th><th width=10%>Hand Over to</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].BrnchAddress1 + '</td><td>' + result[i].BrnchDescription + '</td><td>' + result[i].BrnchAddress2 + '</td><td>' + result[i].BrnchContactNo + '</td><td>' + result[i].BrnchMobileNo + '</td><td>' + result[i].BrnchEmail + '</td><td><a onclick="GetRows(' + result[i].BrnchId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblbranch').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Name</th><th>Date</th><th>Card</th><th>Upi</th><th>Card</th><th>Hand Over to</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblbranch');
}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Serial#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Code' || title == 'Name' || title == 'Description' || title == 'Address' || title == 'Contact#' || title == 'Mobile#' || title == 'Email')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
    });
   

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
                        exportOptions: { columns: [0, 1, 2, 3,4,5,6,7] }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
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

function ShowAreaGet(result) {
    for (var i = 0; i < result.length; i++) {
        debugger;
        $('#txtname').val(result[i].BrnchName);
        $('#txtcode').val(result[i].BrnchCode);
        $('#txtdesc').val(result[i].BrnchDescription);
        $('#txtaddr1').val(result[i].BrnchAddress1);
        $('#txtaddr2').val(result[i].BrnchAddress2);
        $('#txtaddr3').val(result[i].BrnchAddress3);
        $('#txtphone').val(result[i].BrnchContactNo);
        $('#txtphone1').val(result[i].BrnchMobileNo);
        $('#txtemail').val(result[i].BrnchEmail);      
      
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#Warningpopup').fadeOut();
    $('#txtcode').focus();
}

function GetRows(BrnchId) {
    $('#BrnchId').val(BrnchId)
    var data = {};
    data.BrnchId = BrnchId;
    $.ajax({
        type: "POST",
        url: "../Master/BranchGetandGets",
        data: data,
        success: function (result) {
            if (BrnchId == 0)
                ShowArealist(result.oList);
            else
                ShowAreaGet(result.oList);

        }
    });

}

function isNumber(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

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