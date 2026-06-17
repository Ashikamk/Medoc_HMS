$(document).ready(function () {
    Defaultfocus();


    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

    $('#TaxRate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }
    });
    $('#TaxableAccountSales').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#TaxableAccountpurchase').focus();
        }
    });
    $('#TaxableAccountpurchase').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#TaxableAcntSalesReturn').focus();
        }
    });


    $('#TaxableAcntSalesReturn').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#TaxableAcntpurReturn').focus();
        }
    });
    $('#TaxableAcntpurReturn').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#TaxAccountSales').focus();
        }
    });


    $('#TaxAccountSales').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#TaxAccountpurchase').focus();
        }
    });
    $('#TaxAccountpurchase').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }
    });
});//Document Close



function Defaultfocus() {
    $('#TaxName').focus();
}

function isNumberValue(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}


function SaveAndUpdate(Flag) {
    if ($.trim($('#TaxName').val()) == "") {
        warningshow('Please Enter Name', 'TaxName');
    }
    else if ($.trim($('#TaxRate').val()) == "") {
        warningshow('Please Enter Rate', 'TaxRate');
    }
        //else if ($('#TaxableAccountSales').val() == '' || (($('#TaxableAccountSales').val() != '') && ($('#hiddendebit').val() == 0))) {
        //    warningshow('Please select a valid Account', 'TaxableAccountSales');
        //    $('#TaxableAccountSales').select();
        //    return false;
        //}
        //else if ($('#TaxableAccountpurchase').val() == '' || (($('#TaxableAccountpurchase').val() != '') && ($('#hiddendebit2').val() == 0))) {
        //    warningshow('Please select a valid Account', 'TaxableAccountpurchase');
        //    $('#TaxableAccountpurchase').select();
        //    return false;
        //}
        //else if ($('#TaxableAcntSalesReturn').val() == '' || (($('#TaxableAcntSalesReturn').val() != '') && ($('#hiddendebit5').val() == 0))) {
        //    warningshow('Please select a valid Account', 'TaxableAcntSalesReturn');
        //    $('#TaxableAcntSalesReturn').select();
        //    return false;
        //}
        //else if ($('#TaxableAcntpurReturn').val() == '' || (($('#TaxableAcntpurReturn').val() != '') && ($('#hiddendebit6').val() == 0))) {
        //    warningshow('Please select a valid Account', 'TaxableAcntpurReturn');
        //    $('#TaxableAcntpurReturn').select();
        //    return false;
        //}
        //else if ($('#TaxAccountSales').val() == '' || (($('#TaxAccountSales').val() != '') && ($('#hiddendebit3').val() == 0))) {
        //    warningshow('Please select a valid Account', 'TaxAccountSales');
        //    $('#TaxAccountSales').select();
        //    return false;
        //}
        //else if ($('#TaxAccountpurchase').val() == '' || (($('#TaxAccountpurchase').val() != '') && ($('#hiddendebit4').val() == 0))) {
        //    warningshow('Please select a valid Account', 'TaxAccountpurchase');
        //    $('#TaxAccountpurchase').select();
        //    return false;
        //}
    else {

        var data = {};   //array
        data.TaxId = $('#TaxId').val();;
        data.TaxName = $('#TaxName').val();
        data.TaxRate = $('#TaxRate').val();
        data.TaxableAccountSales = $('#TaxableAccountSales').val();
        data.TaxableAccountpurchase = $('#TaxableAccountpurchase').val();
        data.TaxAccountSales = $('#TaxAccountSales').val();
        data.TaxAccountpurchase = $('#TaxAccountpurchase').val();
        data.TaxableAccountSalesReturn = $('#TaxableAcntSalesReturn').val();
        data.TaxableAccountpurchaseReturn = $('#TaxableAcntpurReturn').val();
        data.DelFlag = Flag;
        data.SRTax = '';
        data.PRTax = '';
        data.TaxDeptId = 0;
        data.DeptId = ERPDeptId;
        data.UserId=ERPUserId
        $.ajax({
            type: "POST",
            url: "../Master/TaxInsertandUpdate",
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
    $('#TaxName').val('');
    $('#TaxRate').val('');
    $('#TaxableAccountSales').val('');
    $('#TaxableAccountpurchase').val('');
    $('#TaxAccountSales').val('');
    $('#TaxAccountpurchase').val('');
    $('#TaxableAcntSalesReturn').val('');
    $('#TaxableAcntpurReturn').val('');
    $('#hiddendebit').val('');
    $('#hiddendebit2').val('');
    $('#hiddendebit3').val('');
    $('#hiddendebit4').val('');
    $('#hiddendebit5').val('');
    $('#hiddendebit6').val('');
    $('#TaxName').focus();
    $('#TaxId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

//function ShowTaxlist(result) {
//    disable_datatable('tbltax');    
//    $('#Entry').hide();
//    $('#listing').show();
//    var responseText = "<thead><tr><th width=15px>Slno</th><th>Name</th><th>Rate</th><th>SalesTaxable Account</th><th>PurchaseTaxable Account</th><th>SalesReturnTaxable Account</th><th>PurchaseReturnTaxable Account</th><th>SalesTax Account</th><th>PurchaseTax Account</th>   <th width=15px>Edit</th></tr></thead><tbody>";
//    for (var i = 0; i < result.length; i++) {
//        var slno = parseInt(i + 1);     
//        responseText += '<tr><td>' + slno + '</td><td>' + result[i].TaxName + '</td><td>' + result[i].TaxRate + '</td><td>' + result[i].TaxableAccountSales + '</td><td>' + result[i].TaxableAccountpurchase + '</td> <td>' + result[i].TaxableAccountSalesReturn + '</td><td>' + result[i].TaxableAccountpurchaseReturn + '</td> <td>' + result[i].TaxAccountSales + '</td><td>' + result[i].TaxAccountpurchase + '</td><td align=center><a onclick="GetRows(' + result[i].TaxId + ')">' + Editbutton + '</a></td></tr>';
//    }
//    $('#tbltax').html(responseText + '</tbody>'); 
//    $('#tbltax').DataTable(); 
//}
function ShowTaxlist(result) {
    disable_datatable('tbltax');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=5% ;align=center>Sl#</th><th  width=80%>Name</th><th  width=20%;>Rate</th><th width=5% ;align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].TaxName + '</td><td align=right>' + parseFloat(result[i].TaxRate).toFixed(Decimal) + '</td><td align=center><a onclick="GetRows(' + result[i].TaxId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tbltax').html(responseText + '</tbody>');
    //$('#tbltax').DataTable();
    datatableWithsearch1('tbltax');

}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
       
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
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2] }
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
    //table.columns().every(function () {
    //    var that = this;
    //    $('input', this.footer()).on('keyup change', function () {
    //        if (that.search() !== this.value) {
    //            that
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
}

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}


function ShowTaxGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#TaxName').val(result[i].TaxName);
        $('#TaxRate').val(result[i].TaxRate);

        $('#TaxableAccountSales').val(result[i].TaxableAccountSales);
        $('#TaxableAccountpurchase').val(result[i].TaxableAccountpurchase);
        $('#TaxAccountSales').val(result[i].TaxAccountSales);
        $('#TaxAccountpurchase').val(result[i].TaxAccountpurchase);

        $('#TaxableAcntSalesReturn').val(result[i].TaxableAccountSalesReturn);
        $('#TaxableAcntpurReturn').val(result[i].TaxableAccountpurchaseReturn);

        $('#hiddendebit').val(result[i].SaleTaxableId);
        $('#hiddendebit2').val(result[i].PurchaseTaxableId);
        $('#hiddendebit3').val(result[i].SaleTaxId);
        $('#hiddendebit4').val(result[i].PurchaseTaxId);
        $('#hiddendebit5').val(result[i].SaleReturnTaxableId);
        $('#hiddendebit6').val(result[i].PurchaseReturnTaxableId);
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#TaxName').focus();
}



function GetRows(TaxId) {
    $('#TaxId').val(TaxId)
    var data = {};
    data.TaxId = TaxId;
    $.ajax({
        type: "POST",
        url: "../Master/TaxGetandGets",
        data: data,
        success: function (result) {
            if (TaxId == 0)
                ShowTaxlist(result.oList);
            else
                ShowTaxGet(result.oList);

        }
    });

}

function chkacntemptysales(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddendebit').val(0);
    }
}

function chkacntemptypurchase(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddendebit2').val(0);
    }
}
function checktaxtemptysales(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddendebit3').val(0);
    }
}

function checktaxtemptypurchase(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddendebit4').val(0);
    }
}




function checktaxreturntemptysales(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddendebit5').val(0);
    }
}

function checktaxreturnemptypurchase(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddendebit6').val(0);
    }
}





