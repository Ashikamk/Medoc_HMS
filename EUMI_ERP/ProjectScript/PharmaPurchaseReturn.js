var EditFlag = 0; var CurrencySelect = ''; var FlagCostEdit = 0; var BillDiscountFlag = 0; var CopyFlag = 0; var MainEditFlag = 0; var BaseCurrency = 0; var NextInvoiceNo = 0;

$(document).ready(function () {

    Defaultfocus();
    Serialnoload();
    GetCurrency();
    GetLocation();
    GetTax();

    if (CessType == 1) { $("#CessCheck").prop("checked", true); }
    else { $("#CessCheck").prop("checked", false); }

    $('#PINo_S').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#Location").focus().select();

        }
    });
    $('#Product_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($("#ProductId_0").val() != 0) {
                e.preventDefault();
                $("#Batch_0").focus().select();
            }
            else {
                warningshow('Select Medicine', 'Product_0');
            }
        }
    });
    $('#Batch_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($("#BatchSlNo_0").val() != 0) {
                e.preventDefault();
                $("#Pack_0").focus().select();
            }
            else {
                warningshow('Select Batch', 'Batch_0');
            }
        }
    });
    $('#MRP_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnadd").focus();

        }
    });
    $('#acctype').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#account").focus().select();

        }
    });
    $('#account').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($("#accid").val() != 0) {
                e.preventDefault();
                $("#accountdescription").focus().select();
            }
            else {
                warningshow('Please Enter Account', 'account');
            }
        }
    });
    $('#accountdescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#CostCurrency").focus();

        }
    });
    $('#CostCurrency,#CostCurrRate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#costamount").focus().select();

        }
    });
    $('#costamount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnaddcost").focus();

        }
    });

    $('.smallTextbox').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if (!$(this).is('button') && $(this).attr('id') != 'Product_0' && $(this).attr('id') != 'MRP_0' && $(this).attr('id') != 'Batch_0') {
                e.preventDefault();
                var inputs = $(this).closest('form').find(':input:text:enabled,select:enabled');
                inputs.eq(inputs.index(this) + 1).focus().select();

            }

        }
    });

    $("#otp").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#otpremarks').focus();
        }

    });
    $("#otpremarks").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btncnclsave').focus();
        }

    });
    $("#btncnclsave").focus(function (e) {
        $("#btncnclsave").removeClass("btn btn-outline-warning");
        $("#btncnclsave").addClass("btn btn-warning white");
    });

    $("#btncnclsave").focusout(function (e) {
        $("#btncnclsave").removeClass("btn btn-warning white");
        $("#btncnclsave").addClass("btn btn-outline-warning");
    });
    $("#btnadd").click(function () {
        ProductAdd();
    });
    $("#Currency").change(function () {
        $("#Curr_Rate").val(parseFloat($("#Currency").find("option:selected").attr("name")));
        CalcAmt();
        ResetBillDiscount();
    });

    $("#CostCurrency").change(function () {
        $("#CostCurrRate").val(parseFloat($(this).find("option:selected").attr("name") || 0));
        CalcFCCost();
    });

    $("#TaxId_0").change(function () {
        $("#TaxRate_0").val($("#TaxId_0").find("option:selected").attr("name"))
    });

    if ((usermenu1.indexOf("M252") == -1)) { // From Total Taxable
        $("#DiscFromGrandTotal").prop("checked", false);
        $("#DiscFromGrandTotal").prop("disabled", true);
    }
    else { // From GrandTotal
        $("#DiscFromGrandTotal").prop("checked", true);
        $("#DiscFromGrandTotal").prop("disabled", false);
    }

    $("#btnnew").click(function () {
        createnew();
    });

    $("#btnsubmit").click(function () {
        SavePurchase();
    });


    $("#btnlist").click(function () {
        GetCopy(0);
    });
    $("#btnedit").click(function () {
        EditInvoice(0, 0);
    });
    $("#btnsaveedit").click(function () {
        UpdatePurchase();
    });
    $("#btndelete").click(function () {
        DeletePurchase();
    });

    LoadBatch(0);
});




function Defaultfocus() {
    $("#PINo_S").focus().select();
}

function Serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#confirmff,#keyboardff').show();
                $("#PINo_S").blur();
            }
            else {

                $('#PINo_A').val(result.oList[0].PRNo);
                NextInvoiceNo = result.oList[0].PRNo;
                $('#ImpTax').val(result.oList[0].ImportPurTax);
                $('#accountdescription').val('Other Cost Against Purchase InvNo: ' + result.oList[0].PRNo);
                NextInvoiceNo = parseInt(result.oList[0].PRNo || 0);

            }
        }
    });
}

function GetCurrency() {

    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data,
        success: function (result) {
            CurncyLoad(result.oList);


        }
    });
}

function CurncyLoad(result) {
    $("#Currency,#CostCurrency").empty();
    CurrencySelect = '';
    for (var i = 0; i < result.length; i++) {

        if (result[i].BaseCurrencyId != 0) {
            BaseCurrency = result[i].BaseCurrencyId
        }
        CurrencySelect = CurrencySelect + "<option value='" + result[i].Id + "'name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>";
        $("#Currency,#CostCurrency").append("<option value='" + result[i].Id + "'name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");
    }

    $('#Currency,#CostCurrency').val(BaseCurrency);
    $("#Curr_Rate").val(parseFloat($("#Currency").find("option:selected").attr("name")));
    $("#CostCurrRate").val(parseFloat($("#CostCurrency").find("option:selected").attr("name")));

}


function GetLocation() {
    var data = {};
    data.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList);


        }
    });

}

function LocationLoad(result) {
    $("#Location").empty();
    LocationSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "'locname='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";

    }
    $("#Location").append(LocationSelect);

    $('#Location').val(UserLocationId);
}


function GetTax() {
    var data = {};
    data.TaxId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TaxGetandGets",
        data: data,
        success: function (result) {
            TaxLoad(result.oList);


        }
    });
}

function TaxLoad(result) {
    $("#TaxId_0").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    var TaxSplit = "";
    var s = 0;
    DefaultTaxArray = [];
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "'name='" + result[i].TaxRate + "' title='" + result[i].TaxName + "'>" + result[i].TaxName + "</option>";
        s = i + 1;
        TaxSplit = "<tr class='jsgrid-row' id='" + result[i].TaxId + "'>" +

            "<td class='text-center'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + result[i].TaxId + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +

        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center distxtbox bg-white borderno' id='splittaxable_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittaxable_" + result[i].TaxRate + "' value='0.00' /></td>" +

        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox  text-center distxtbox dedisa bg-white borderno' id='splittax_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittax_" + result[i].TaxRate + "' value='0.00' /></td>" +

         "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center bg-white borderno'  value='" + result[i].TaxRate / 2 + " %'></td>" +

        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center distxtbox bg-white borderno' id='CGST_" + result[i].TaxRate + "' value='0.00'></td>" +

         "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center bg-white borderno'  value='" + result[i].TaxRate / 2 + " %'></td>" +

        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center distxtbox bg-white borderno' id='SGST_" + result[i].TaxRate + "' value='0.00'></td>" +

         "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center bg-white borderno'  value='" + result[i].TaxRate + " %'></td>" +

        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center distxtbox bg-white borderno' id='IGST_" + result[i].TaxRate + "' value='0.00'></td>" +

        "</tr>";
        DefaultTaxArray.push(result[i].TaxRate);
        $('#tbltaxsplit').append(TaxSplit);
    }
    $("#TaxId_0").append(TaxSelect);
    $("#TaxRate_0").val($('#TaxId_0').find("option:selected").attr("name"));
}


function createnew() {
    if ($("#Tbl_Purchase tr").length > 0 && (CopyFlag == 0 || (CopyFlag == 1 && MainEditFlag == 1))) {
        $('#Confirmflag').val('CreateNew'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
    else {
        formrefresh(0);
    }
}

function formrefresh(Flag) {

    if (Flag != 1) {
        Serialnoload();
        Defaultfocus();
        CopyFlag = 0;
        $("#CrntMode").removeClass();
        $("#CrntMode").addClass("badge badge-primary");
        $("#CrntMode").text('Mode : New');
        $('.smallTextbox,.billdisc,#PharmaPIDate,#txtnotes,.btndis,.btn').prop("disabled", false);
        $("#copypurchase,#popupdesc").hide();
        $("#purchaseinv,#btnsubmit").show();
        $("#PINo_A").prop("disabled", true);
    }
    $("#btnedit,#btndelete,#btnsaveedit,#btnprint,#btnacctran").hide();
    $('.dezero').val(0);
    if (CessType == 1) { $("#CessCheck").prop("checked", true); }
    else { $("#CessCheck").prop("checked", false); }
    $('.detextnull').text('');
    $("#PharmaPIDate").val(CurDate);
    $('.denull').val('');
    $('#Location').val(UserLocationId);
    $("#PRType").val('Local');
    $("#PayType").val(2);
    $('#Currency,#CostCurrency').val(BaseCurrency);
    $("#Curr_Rate").val(parseFloat($("#Currency").find("option:selected").attr("name")));
    $("#CostCurrRate").val(parseFloat($("#CostCurrency").find("option:selected").attr("name")));
    $('.dediszero,.distxtbox').val(parseFloat(0).toFixed(Decimal));
    $('.detextdiszero').text(parseFloat(0).toFixed(Decimal))
    $("#CessCheck").prop("disabled", false);
    $(".dedisa").prop("disabled", true);
    $("#Tbl_Purchase tr").remove();

    $("#popupdesc").hide();
    $("#ShortCutDiv").slideUp('slow', 'linear');


    if ((usermenu1.indexOf("M252") == -1)) { // From Total Taxable
        $("#DiscFromGrandTotal").prop("checked", false);
        $("#DiscFromGrandTotal").prop("disabled", true);
    }
    else { // From GrandTotal
        $("#DiscFromGrandTotal").prop("checked", true);
        $("#DiscFromGrandTotal").prop("disabled", false);
    }
    EditFlag = 0; FlagCostEdit = 0; BillDiscountFlag = 0; MainEditFlag = 0;
}

function ClearProductRow(Id, Flag) {

    if (Flag == 0) {
        if (Id == 0) {

            $("#ProductId_" + Id + ",#BatchSlNo_" + Id + ",#PurSlNo_" + Id + ",#InvId_" + Id + ",#TaxId_" + Id).val(0);
            $("#TaxRate_" + Id + ",#Cess_" + Id).val(0);
            $("#Batch_" + Id + ",#Expiry_" + Id + ",#Pack_" + Id + ",#Qty_" + Id + ",#Loose_" + Id + ",#Free_" + Id).val('');
            $("#Rate_" + Id + ",#SR_" + Id + ",#Discount_" + Id + ",#DiscountPer_" + Id + ",#MRP_" + Id).val('');

            PopUpClose(4);
        }
        else {
            $("#ProductId_" + Id + ",#BatchSlNo_" + Id + ",#PurSlNo_" + Id + ",#InvId_" + Id).val(0);
            $("#Batch_" + Id).val('');
        }

    }
    else if (Flag == 2) {
        if (Id == 0) {
            $("#BatchSlNo_" + Id + ",#PurSlNo_" + Id + ",#InvId_" + Id + ",#TaxId_" + Id + "#TaxRate_" + Id).val(0);
            $("#Expiry_" + Id + ",#Pack_" + Id + ",#Qty_" + Id + ",#Loose_" + Id + ",#Free_" + Id).val('');
            $("#Rate_" + Id + ",#SR_" + Id + ",#Discount_" + Id + ",#DiscountPer_" + Id + ",#MRP_" + Id).val('');
        }
        else {
            $("#BatchSlNo_" + Id + ",#PurSlNo_" + Id + ",#InvId_" + Id).val(0);
        }
    }
    else if (Flag == 1) {

        $("#ProductId_" + Id + ",#BatchSlNo_" + Id + ",#PurSlNo_" + Id + ",#InvId_" + Id + ",#TaxId_" + Id).val(0);
        $("#TaxRate_" + Id + ",#Cess_" + Id).val(0);
        $("#Product_" + Id + ",#Batch_" + Id + ",#Expiry_" + Id + ",#Pack_" + Id + ",#Qty_" + Id + ",#Loose_" + Id + ",#Free_" + Id).val('');
        $("#Rate_" + Id + ",#SR_" + Id + ",#Discount_" + Id + ",#DiscountPer_" + Id + ",#MRP_" + Id).val('');

        $().val('');
        $("#Product_" + Id).focus();

        PopUpClose(4);
    }




}

function ProductAdd() {
    if (parseInt($("#ProductId_0").val() || 0) == 0) {
        warningshow('Select Medicine', 'Product_0');
        return false;
    }
    else if (parseInt($("#BatchSlNo_0").val() || 0) == 0) {
        warningshow('Select Batch', 'Batch_0');
        return false;
    }
    else if ($.trim($("#Batch_0").val()) == '') {
        warningshow('Select Batch', 'Batch_0');
        return false;
    }
    else if ($.trim($("#Expiry_0").val()) == '' || $.trim($("#Expiry_0").val().length) != 7) {
        warningshow('Enter Expiry', 'Expiry_0');
        return false;
    }
    else if (parseInt($("#Pack_0").val() || 0) == 0) {
        warningshow('Enter Pack', 'Pack_0');
        return false;
    }
    else if (parseInt($("#Qty_0").val() || 0) == 0) {
        warningshow('Enter Quantity', 'Qty_0');
        return false;
    }
    else if (parseFloat($("#Rate_0").val() || 0) == 0) {
        warningshow('Enter Purchase Rate', 'Rate_0');
        return false;
    }

    else if (parseInt($("#TaxId_0").val() || 0) == 0) {
        warningshow('Select Tax', 'TaxId_0');
        return false;
    }
    //else if (parseFloat($("#SR_0").val() || 0) == 0) {
    //    warningshow('Enter Selling Rate', 'SR_0');
    //    return false;
    //}
    //else if (parseFloat($("#SR_0").val() || 0) < parseFloat($("#Rate_0").val() || 0)) {
    //    warningshow('Selling Rate cannot be less than Purchase Rate', 'SR_0');
    //    return false;
    //}
    //else if (parseFloat($("#MRP_0").val() || 0) == 0) {
    //    warningshow('Enter MRP', 'MRP_0');
    //    return false;
    //}

    else if (parseFloat($("#MRP_0").val() || 0) < parseFloat($("#Rate_0").val() || 0)) {
        warningshow('MRP cannot be less than Purchase Rate', 'MRP_0');
        return false;
    }
    else if (parseFloat($("#Lqtty_0").val() || 0) < parseFloat($("#Qty_0").val() || 0)) {     
        warningshow('Not Enough Quantity!!!', 'Qty_0');
        return false;
    }
    else {
        OKProductAdd();
    }
}

function OKProductAdd() {


    if ($("#Tbl_Purchase tr").length == 0) { $("#GridLength").val(0); }
    var Id = parseInt($("#GridLength").val() || 0) + 1;

    var ProductRow = '<tr id="MTr_' + Id + '" onfocusout="UpdateRow(' + Id + ')">' +
        '<td width="2%" align="center"><input class="jsgrid-button jsgrid-delete-button" type="button" onclick="DeleteRow(' + Id + ')" title="Delete" autocomplete="off"></td>' +
        '<td width="3%" align="center" id="MTd_' + Id + '">' + Id + '</td>' +
        '<td width="13%"><input id="Product_' + Id + '" value="' + $.trim($("#Product_0").val()) + '" onkeyup="LoadProduct(' + Id + ')" class="form-control smallTextbox borderno" /></td>' +
        '<td width="5%"><input id="Batch_' + Id + '" value="' + $.trim($("#Batch_0").val()) + '" class="form-control smallTextbox borderno" onkeyup="LoadBatch(\'' + Id + '\')" /></td>' +
        '<td width="5%"><input id="Expiry_' + Id + '" value="' + $.trim($("#Expiry_0").val()) + '" class="form-control text-center smallTextbox borderno"  onkeypress="isNumberDate(event, this)" onkeyup="ExpiryDate(\'Expiry_' + Id + '\')" onkeydown="FocusNext(event, \'Batch_\', \'Expiry_\', \'Pack_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Pack_' + Id + '" value="' + parseInt($("#Pack_0").val() || 0) + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Expiry_\', \'Pack_\', \'Qty_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Qty_' + Id + '" value="' + parseInt($("#Qty_0").val() || 0) + '" disabled class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Pack_\', \'Qty_\', \'Free_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Free_' + Id + '" value="' + parseInt($("#Free_0").val() || 0) + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Qty_\', \'Free_\', \'Loose_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Loose_' + Id + '" value="' + parseInt($("#Loose_0").val() || 0) + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Free_\', \'Loose_\', \'Rate_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Rate_' + Id + '" value="' + parseFloat($("#Rate_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Loose_\', \'Rate_\', \'TaxId_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><select id="TaxId_' + Id + '" class="form-control smallTextbox borderno" onchange="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Rate_\', \'TaxId_\', \'DiscountPer_\', ' + Id + ',\'MTr_\')">' + TaxSelect + '</select></td>' +
        '<td width="5%"><input id="DiscountPer_' + Id + '" value="' + parseFloat($("#DiscountPer_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcDiscRow(' + Id + ',1,1)" onkeydown="FocusNext(event, \'TaxId_\', \'DiscountPer_\', \'Discount_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Discount_' + Id + '" value="' + parseFloat($("#Discount_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcDiscRow(' + Id + ',0,1)" onkeydown="FocusNext(event, \'DiscountPer_\', \'Discount_\', \'SR_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="SR_' + Id + '" value="' + parseFloat($("#SR_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'Discount_\', \'SR_\', \'MRP_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="MRP_' + Id + '" value="' + parseFloat($("#MRP_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'SR_\', \'MRP_\', \'\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="TQty_' + Id + '" value="0" class="form-control text-center smallTextbox borderno dedisa bg-white" disabled /></td>' +
        '<td width="5%"><input id="TLQty_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="FCTaxable_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="FCTax_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="FCAmt_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="Margin_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="CessAmount_' + Id + '" value="' + parseFloat(0).toFixed(Decimal) + '" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +

        '<td width="5%" style="display:none;">' +

        '<input id="ProductId_' + Id + '" value="' + $("#ProductId_0").val() + '" />' +
        '<input id="TaxRate_' + Id + '" value="' + $("#TaxRate_0").val() + '" />' +
        '<input id="BaseDiscount_' + Id + '" value="0" />' +
        '<input id="BaseTaxable_' + Id + '" value="0" />' +
        '<input id="BaseTax_' + Id + '" value="0" />' +
        '<input id="BaseAmt_' + Id + '" value="0" />' +
        '<input id="Cess_' + Id + '" value="' + $("#Cess_0").val() + '" />' +
        '<input id="BaseCessAmount_' + Id + '" value="0" />' +
        '<input id="BatchSlNo_' + Id + '" value="' + $("#BatchSlNo_0").val() + '" />' +
        '<input id="PurSlNo_' + Id + '" value="' + $("#PurSlNo_0").val() + '" />' +
        '<input id="InvId_' + Id + '" value="' + $("#InvId_0").val() + '" />' +
        '</td>' +
        '</tr>';

    $("#Tbl_Purchase").append(ProductRow);

    $('#TaxId_' + Id).val($('#TaxId_0').val())
    $("#TaxRate_" + Id).val($('#TaxId_' + Id).find("option:selected").attr("name"));
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    $("#GridLength").val(Id);
    ClearProductRow(0, 1);

    CalcAmt();
    ResetBillDiscount();

}

function DeleteRow(Id) {
    $('#Confirmflag').val('DeleteRow'), $('#ConfirmRowId').val(Id)
    $('#confirmmessage').text('Do you want to delete this row?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}

function OKDelete(RowId) {
    $('#MTr_' + RowId).remove();
    CalcAmt();

}

function UpdateRow(Id) {

    EditFlag = Id;

    if (parseInt($("#ProductId_" + Id).val() || 0) == 0) {
        warningshow('Select Medicine', 'Product_' + Id);
        return false;
    }
    else if ($.trim($("#Batch_" + Id).val()) == '') {
        warningshow('Enter Batch', 'Batch_' + Id);
        return false;
    }
    else if ($.trim($("#Expiry_" + Id).val()) == '' || $.trim($("#Expiry_" + Id).val().length) != 7) {
        warningshow('Enter Expiry', 'Expiry_' + Id);
        return false;
    }
    else if (parseInt($("#Pack_" + Id).val() || 0) == 0) {
        warningshow('Enter Pack', 'Pack_' + Id);
        return false;
    }
    else if (parseInt($("#Qty_" + Id).val() || 0) == 0) {
        warningshow('Enter Quantity', 'Qty_' + Id);
        return false;
    }
    else if (parseFloat($("#Rate_" + Id).val() || 0) == 0) {
        warningshow('Enter Purchase Rate', 'Rate_' + Id);
        return false;
    }

    else if (parseInt($("#TaxId_" + Id).val() || 0) == 0) {
        warningshow('Select Tax', 'TaxId_' + Id);
        return false;
    }
    else if (parseFloat($("#SR_" + Id).val() || 0) == 0) {
        warningshow('Enter Selling Rate', 'SR_' + Id);
        return false;
    }
    else if (parseFloat($("#SR_" + Id).val() || 0) < parseFloat($("#Rate_" + Id).val() || 0)) {
        warningshow('Selling Rate cannot be less than Purchase Rate', 'SR_' + Id);
        return false;
    }
    else if (parseFloat($("#MRP_" + Id).val() || 0) == 0) {
        warningshow('Enter MRP', 'MRP_' + Id);
        return false;
    }
    else if (parseFloat($("#MRP_" + Id).val() || 0) < parseFloat($("#Rate_" + Id).val() || 0)) {
        warningshow('MRP cannot be less than Purchase Rate', 'MRP_' + Id);
        return false;
    }
    else {
        EditFlag = 0;
        CalcAmt();
        return true;
    }
}

function CalcAmt() {

    var slno = 1;
    BillDiscountFlag = 0;
    var GridLength = $("#GridLength").val();
    for (var i = 1; i <= GridLength; i++) {
        if ($('#Product_' + i).val() != undefined) {
            if (parseFloat($('#Discount_' + i).val() || 0) > 0) {
                CalcDiscRow(i, 0, 0);
            }
            else {
                CalcAmount(i);
            }
            $('#MTd_' + i).text(slno);
            slno++;
        }
    }
    CalcTotal();

}

function ResetBillDiscount() {
    $('#disc,#Discountpercent').val('0.00');
}

function CalcDiscRow(Id, Flag, TotalFlag) {

    var Pack = parseInt($("#Pack_" + Id).val() || 0);
    var Qty = parseInt($("#Qty_" + Id).val() || 0);
    var Rate = parseFloat($("#Rate_" + Id).val() || 0).toFixed(Decimal);
    var Loose = parseInt($("#Loose_" + Id).val() || 0);
    var DiscPer = parseFloat($("#DiscountPer_" + Id).val() || 0).toFixed(Decimal);
    var DiscAmt = parseFloat($("#Discount_" + Id).val() || 0).toFixed(Decimal);

    if (parseFloat($("#Rate_" + Id).val() || 0) > 0 && Pack > 0 && Qty > 0) {
        var UnitAmount = Rate / Pack;
        var AmtQty = (Qty * Pack) + Loose;

        if (Flag == 1)//Discount Per
        {
            DiscAmt = (AmtQty * UnitAmount * DiscPer) / 100;
            DiscAmt = Number(DiscAmt).toFixed(Decimal);
            $('#Discount_' + Id).val(DiscAmt);
        }
        else { // Discount Amount
            DiscPer = (DiscAmt * 100) / (UnitAmount * AmtQty);
            DiscPer = Number(DiscPer).toFixed(Decimal);
            $('#DiscountPer_' + Id).val(DiscPer);
        }


        if (Id > 0) {
            CalcAmount(Id);
            ResetBillDiscount();
            if (TotalFlag == 1) {
                CalcTotal();

            }
        }
    }
    else {
        $('#Discount_' + Id).val(parseFloat(0).toFixed(Decimal));
        $('#DiscountPer_' + Id).val(parseFloat(0).toFixed(Decimal));
    }
}

function CalcAmount(Id) {
    var Pack = parseInt($("#Pack_" + Id).val() || 0);
    var Qty = parseInt($("#Qty_" + Id).val() || 0);
    var Free = parseInt($("#Free_" + Id).val() || 0);
    var Loose = parseInt($("#Loose_" + Id).val() || 0);
    var Rate = parseFloat($("#Rate_" + Id).val() || 0).toFixed(Decimal);
    var TaxPer = parseFloat($("#TaxId_" + Id).find("option:selected").attr("name") || 0);
    var FCRate = parseFloat($("#Curr_Rate").val() || 1);
    var Discount = parseFloat($("#Discount_" + Id).val() || 0).toFixed(Decimal);

    if ($("#CessCheck").prop("checked") == true) {
        var CessPer = parseFloat($("#Cess_" + Id).val() || 0);
    }
    else {
        var CessPer = 0;
    }

    if (Discount > 0) { BillDiscountFlag = 1; $(".billdisc").prop("disabled", true); $(".billdisc").val("0.00") }

    // Qty Calculation
    var TQty = Qty + Free + (Loose / Pack);
    var TLQty = (Qty * Pack) + (Free * Pack) + Loose;

    //Amount Calculation

    var UnitAmount = Rate / Pack;
    var AmtQty = (Qty * Pack) + Loose;
    var Taxable = ((AmtQty * UnitAmount) - Discount).toFixed(Decimal);
    var TaxAmount = (Taxable * (TaxPer / 100)).toFixed(Decimal);
    var CessAmount = Taxable * (CessPer / 100).toFixed(Decimal);
    var Amount = Number(Taxable) + Number(TaxAmount) + Number(CessAmount);

    //BaseCalculation
    var BaseDisc = (Discount * FCRate).toFixed(Decimal);
    var BaseTaxable = (((AmtQty * UnitAmount) - Discount) * FCRate).toFixed(Decimal);
    var BaseTaxAmount = (Taxable * (TaxPer / 100) * FCRate).toFixed(Decimal);
    var BaseCessAmount = (Taxable * (CessPer / 100) * FCRate).toFixed(Decimal);
    var BaseAmount = Number(BaseTaxable) + Number(BaseTaxAmount) + Number(BaseCessAmount);
    //Save Data
    $("#TQty_" + Id).val(TQty);
    $("#TLQty_" + Id).val(TLQty);

    //$("#Rate_" + Id).val(Number(Rate).toFixed(Decimal));
    //$("#Discount_" + Id).val(Number(Discount).toFixed(Decimal));
    $("#BaseDiscount_" + Id).val(Number(BaseDisc).toFixed(Decimal));

    $("#FCTaxable_" + Id).val(Number(Taxable).toFixed(Decimal));
    $("#FCTax_" + Id).val(Number(TaxAmount).toFixed(Decimal));
    $("#FCAmt_" + Id).val(Number(Amount).toFixed(Decimal));

    $("#BaseTaxable_" + Id).val(Number(BaseTaxable).toFixed(Decimal));
    $("#BaseTax_" + Id).val(Number(BaseTaxAmount).toFixed(Decimal));
    $("#BaseAmt_" + Id).val(Number(BaseAmount).toFixed(Decimal));



    $("#CessAmount_" + Id).val(Number(CessAmount).toFixed(Decimal));
    $("#BaseCessAmount_" + Id).val(Number(BaseCessAmount).toFixed(Decimal));

}

function CalcTotal() {

    var GridLength = $("#GridLength").val();

    $(".distxtbox").val(parseFloat(0).toFixed(Decimal));

    var TotalQty = 0, TotalLooseQty = 0, TotalFCDisc = 0, TotalBDisc = 0, TotalFCTaxable = 0, TotalBTaxable = 0, TotalFCTax = 0, TotalBTax = 0, TotalFCAmt = 0, TotalBAmt = 0, TotalCess = 0; TotalBaseCess = 0;

    for (var i = 1; i <= GridLength; i++) {

        if ($('#Product_' + i).val() != undefined) {
            TotalQty = Number(TotalQty) + Number($("#TQty_" + i).val());
            TotalLooseQty = Number(TotalLooseQty) + Number($("#TLQty_" + i).val());

            TotalFCDisc = Number(TotalFCDisc) + Number($("#Discount_" + i).val());
            TotalBDisc = Number(TotalBDisc) + Number($("#Discount_" + i).val());

            TotalFCTaxable = Number(TotalFCTaxable) + Number($("#FCTaxable_" + i).val());
            TotalBTaxable = Number(TotalBTaxable) + Number($("#BaseTaxable_" + i).val());

            TotalFCTax = Number(TotalFCTax) + Number($("#FCTax_" + i).val());
            TotalBTax = Number(TotalBTax) + Number($("#BaseTax_" + i).val());

            TotalFCAmt = Number(TotalFCAmt) + Number($("#FCAmt_" + i).val());
            TotalBAmt = Number(TotalBAmt) + Number($("#BaseAmt_" + i).val());

            TotalCess = TotalCess + Number($("#CessAmount_" + i).val());
            TotalBaseCess = TotalBaseCess + Number($("#BaseCessAmount_" + i).val());

            //SplitTaxCalculation
            var TaxRate = parseFloat($("#TaxId_" + i).find("option:selected").attr("name") || 0);

            var CurrentTaxable = $("#hiddensplittaxable_" + TaxRate).val();
            var NewTaxable = Number(CurrentTaxable) + Number($("#FCTaxable_" + i).val());
            $("#hiddensplittaxable_" + TaxRate).val(parseFloat(NewTaxable).toFixed(Decimal));
            $("#splittaxable_" + TaxRate).val(parseFloat(NewTaxable).toFixed(Decimal));

            var CurrentTax = $("#hiddensplittax_" + TaxRate).val();
            var NewTax = Number(CurrentTax) + Number($("#FCTax_" + i).val());
            var CGST = (Number(NewTax).toFixed(Decimal)) / 2;
            $("#hiddensplittax_" + TaxRate).val(parseFloat(NewTax).toFixed(Decimal));
            $("#splittax_" + TaxRate).val(parseFloat(NewTax).toFixed(Decimal));

            if ($("#PRType").val() == 'Local') {
                $("#CGST_" + TaxRate).val(parseFloat(CGST).toFixed(Decimal));
                $("#SGST_" + TaxRate).val(parseFloat(CGST).toFixed(Decimal));
                $("#IGST_" + TaxRate).val(parseFloat(0).toFixed(Decimal));
            }
            else {
                $("#CGST_" + TaxRate).val(parseFloat(0).toFixed(Decimal));
                $("#SGST_" + TaxRate).val(parseFloat(0).toFixed(Decimal));
                $("#IGST_" + TaxRate).val(parseFloat(NewTax).toFixed(Decimal));
            }
        }
    }

    $("#totdisc").val(TotalFCDisc.toFixed(Decimal));
    $("#BaseDiscount").val(TotalBDisc.toFixed(Decimal));

    $("#tottaxable,#HiddenTaxable").val(TotalFCTaxable.toFixed(Decimal));
    $("#BaseTaxable").val(TotalBTaxable.toFixed(Decimal));

    $("#tottax,#HiddenTax").val(TotalFCTax.toFixed(Decimal));
    $("#BaseTax").val(TotalBTax.toFixed(Decimal));

    $("#FCAmount,#HiddenGrandTotal").val(TotalFCAmt.toFixed(Decimal));
    $("#BaseAmount").val(TotalBAmt.toFixed(Decimal));

    $("#FCTotalCess").val(TotalCess.toFixed(Decimal));
    $("#BaseTotalCess").val(TotalBaseCess.toFixed(Decimal));

    $("#FCTextTotal").text(TotalFCAmt.toFixed(Decimal));

    if (parseFloat($("#Curr_Rate").val() || 1) > 1) {
        $("#BaseTextTotal").text(TotalBAmt.toFixed(Decimal));
    }
    else {
        $("#BaseTextTotal").text('');
    }
    CalcInvoice();
    if (BillDiscountFlag == 0 && (CopyFlag == 0 || (CopyFlag == 1 && MainEditFlag == 1))) { $(".billdisc").prop("disabled", false); }

    TaxSubAmountCalc(0);

}

function CalcInvoice() {
    var FCRate = parseFloat($("#Curr_Rate").val() || 1);
    var FCInvoice = parseFloat($("#FCInvoiceTotal").val() || 0);
    var BaseInvoice = FCInvoice * FCRate;

    $("#BInvoiceTotal").val(BaseInvoice.toFixed(Decimal));
}

//Tax SubTotal Calculation
function TaxSubAmountCalc(flg) {
    var SubTaxableamt = 0; var SubTaxamt = 0; var Cgstamt = 0; var Sgstamt = 0; var Igstamt = 0;
    for (var k = 0; k < DefaultTaxArray.length; k++) {
        var m = DefaultTaxArray[k];
        var SAmt1 = parseFloat($('#splittaxable_' + m).val()); var SAmt2 = parseFloat($('#splittax_' + m).val());
        var SAmt3 = parseFloat($('#CGST_' + m).val()); var SAmt4 = parseFloat($('#SGST_' + m).val());
        var SAmt5 = parseFloat($('#IGST_' + m).val());

        SubTaxableamt = parseFloat(SubTaxableamt) + SAmt1;
        SubTaxamt = parseFloat(SubTaxamt) + SAmt2;
        Cgstamt = parseFloat(Cgstamt) + SAmt3;
        Sgstamt = parseFloat(Sgstamt) + SAmt4;
        Igstamt = parseFloat(Igstamt) + SAmt5;
    }

    $('#SubTaxable').val(SubTaxableamt.toFixed(Decimal));
    $('#SubTax').val(SubTaxamt.toFixed(Decimal));
    $('#SubCGST').val(Cgstamt.toFixed(Decimal));
    $('#SubSGST').val(Sgstamt.toFixed(Decimal));
    $('#SubIGST').val(Igstamt.toFixed(Decimal));
}

function TaxSplitShow() {
    $("#TaxSpliPopup").modal("show");
    $("#TaxSpliPopup").appendTo("body");
}
function PopUpClose(Flag) {
    if (Flag == 1)
        $("#TaxSpliPopup").modal("hide");
    else if (Flag == 3)
        $("#PurchaseView").modal("hide");
    else if (Flag == 4)
        $("#productpdiv").modal("hide");
    else if (Flag == 5)
        $("#PurchaseTransactionPopup").modal("hide");
    else if (Flag == 6)
        $("#PurchaseDocument").modal("hide");
}


function AccountAutoComplete(Id) {

    $("#acc_" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.AccountDescription = $("#acc_" + Id).val();
            $.ajax({
                url: '../Inventory/AccountNumberSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '1',
                            label: item.DebitAccount + "-" + item.AccountDescription,
                            label1: item.AccountDescription,
                            DebitAccount: item.DebitAccount,
                            AccountDescription: item.AccountDescription,
                            AccountId: item.AccountId,
                            headers: ["Account Code - Description"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#accid_' + Id).val(ui.item.AccountId)
            $("#acc_" + Id).val(ui.item.DebitAccount + "-" + ui.item.AccountDescription);

        },
    });
}

function ClearCostRow(AccountDescription) {
    if ($('#acctype').val() == 'C') {
        $('#acctype').val('D')
    }
    else {
        $('#acctype').val('C')
    }
    $('#account').val('')
    $('#accid').val(0)
    //$('#costamount').val('0.00')
    $('#BaseCost').val(0)
    $('#BaseDebit').val('')
    $('#BaseCredit').val('')
    $('#accountdescription').val(AccountDescription);
    $('#debitamount').val('')
    $('#creditamount').val('')
    $('#acctype').focus();
}

function CalcFCCost() {
    var currate = 0; var FCost = 0; var BaseCost = 0;

    currate = parseFloat($('#CostCurrRate').val() || 0);
    FCost = parseFloat($('#costamount').val() || 0);

    currate = isNaN(currate) ? 0 : currate;
    FCost = isNaN(FCost) ? 0 : FCost;

    BaseCost = parseFloat(currate * FCost);

    $('#BaseCost').val(parseFloat(BaseCost).toFixed(Decimal));

}

function CalcFCCostGrid(RowId) {
    var RowCurrRate = 0;
    var Fcredit = 0; var BCredit = 0;
    var FDebit = 0; var BDebit = 0;

    RowCurrRate = parseFloat($('#CostCurrRate_' + RowId).val() || 0);
    RowCurrRate = isNaN(RowCurrRate) ? 0 : RowCurrRate;

    if ($('#acctype_' + RowId).val() == 'C') {

        Fcredit = parseFloat($('#CreditAmount_' + RowId).val() || 0);
        Fcredit = isNaN(Fcredit) ? 0 : Fcredit;
        BCredit = parseFloat(RowCurrRate * Fcredit);

        $('#BaseCredit_' + RowId).val(parseFloat(BCredit).toFixed(Decimal));

        $('#BaseList_' + RowId).val(parseFloat(BCredit).toFixed(Decimal));
    }
    else if ($('#acctype_' + RowId).val() == 'D') {

        FDebit = parseFloat($('#DebitAmount_' + RowId).val() || 0);
        FDebit = isNaN(FDebit) ? 0 : FDebit;
        BDebit = parseFloat(RowCurrRate * FDebit);

        $('#BaseDebit_' + RowId).val(parseFloat(BDebit).toFixed(Decimal));

        $('#BaseList_' + RowId).val(parseFloat(BDebit).toFixed(Decimal));
    }
    CalcCreditandDebit();
}
//Tally Credit and Debit Function

function CalcCreditandDebit() {
    var TotalCredit = 0;
    var TotalDebit = 0;
    var CreditDebitDiff = 0;

    var BaseTotalCredit = 0;
    var BaseTotalDebit = 0;
    var BaseCreditDebitDiff = 0;
    var x = $("#CostGridLength").val()
    for (var k = 1; k <= x; k++) {
        TotalCredit = TotalCredit + parseFloat($('#CreditAmount_' + k).val() || 0);
        TotalDebit = TotalDebit + parseFloat($('#DebitAmount_' + k).val() || 0);

        BaseTotalCredit = BaseTotalCredit + parseFloat($('#BaseCredit_' + k).val() || 0);
        BaseTotalDebit = BaseTotalDebit + parseFloat($('#BaseDebit_' + k).val() || 0);
    }
    CreditDebitDiff = TotalCredit - TotalDebit;
    BaseCreditDebitDiff = BaseTotalCredit - BaseTotalDebit;

    $('#totcredit').val(TotalCredit.toFixed(Decimal));
    $('#totdebit').val(TotalDebit.toFixed(Decimal));
    $('#costdiff').val(CreditDebitDiff.toFixed(Decimal));

    $('#totbasecredit').val(BaseTotalCredit.toFixed(Decimal));
    $('#totbasedebit').val(BaseTotalDebit.toFixed(Decimal));
    $('#costbasediff').val(BaseCreditDebitDiff.toFixed(Decimal));
}


function FocusDate(Id) {

    $(Id).prop('selectionStart', 0);
    $(Id).prop('selectionEnd', 2);

}

function DateKeyDown(event, Id) {
    var x = event.keyCode;

    if (x == 37) {
        event.preventDefault();
        var Cursor = $(Id).prop('selectionStart');

        if (Cursor >= 6 && Cursor <= 10) {
            $(Id).prop('selectionStart', 3);
            $(Id).prop('selectionEnd', 5);
        }

        if (Cursor >= 3 && Cursor <= 5) {
            $(Id).prop('selectionStart', 0);
            $(Id).prop('selectionEnd', 2);
        }

    }
    else if (x == 39) {

        event.preventDefault();

        var Cursor = $(Id).prop('selectionStart');

        if (Cursor >= 0 && Cursor <= 2) {
            $(Id).prop('selectionStart', 3);
            $(Id).prop('selectionEnd', 5);
        }

        if (Cursor >= 3 && Cursor <= 5) {
            $(Id).prop('selectionStart', 6);
            $(Id).prop('selectionEnd', 10);
        }
    }
}



function LoadProduct(Id) {
    $("#Product_" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {


            ClearProductRow(Id, 0);


            var data = {};
            data.ItemCode = $("#Product_" + Id).val();
            data.SlNumber = $("#SupplierId").val();
            data.DeptId = ERPDeptId;
            data.UserId = ERPUserId;

            $.ajax({
                url: '../Pharmacy/HMS_PurchaseProductSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '4PurchasePro',
                            label: item.Description,
                            label1: item.ItemCode,
                            label2: item.Group,
                            label3: item.Category,

                            ItemId: item.ItemId,
                            ItemCode: item.ItemCode,
                            Description: item.Description,
                            Tax: item.VatId,
                            Taxper: item.VatPer,
                            Rate: (item.AvgCost).toFixed(Decimal),
                            SellingPrice: (item.SellingPrice).toFixed(Decimal),
                            MRP: (item.MRP).toFixed(Decimal),
                            LPCost: (item.LPCost).toFixed(Decimal),
                            Cess: item.Model1,
                            headers: ["Name", "Code", "Company", "Type"]
                        })
                    }));
                }

            })

        },
        autoFocus: true,
        select: function (event, ui) {

            $("#ProductId_" + Id).val(ui.item.ItemId);

            $("#Batch_" + Id).focus().select();
            $("#Cess_" + Id).val(ui.item.Cess);

            if (Id == 0) {
                var data = {};
                data.ProductId = ui.item.ItemId;
                data.CustId = 0;
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: '../SalesInvoice/CustomerProductDetailsSearch',
                    data: data,
                    success: function (result) {
                        CustPrdctLoad(result.oList);
                    }
                });
            }
            else {
                CalcAmt();
                $('#disc,#Discountpercent').val('0.00');
            }
        },
    });
}

function LoadBatch(Id) {
    $("#Batch_" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {


            ClearProductRow(Id, 2);

            var data = {};
            data.ItemId = $("#ProductId_" + Id).val();
            data.SupplierId = $("#SupplierId").val();
            data.Batch = $("#Batch_" + Id).val();
            data.DeptId = ERPDeptId;
            data.UserId = ERPUserId;
            data.LocationId = $("#Location").val();

            $.ajax({
                url: '../Pharmacy/HMS_BatchPurchaseReturn',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        console.log(item)
                        if (item.Loose > 0) {
                            return ({
                                ColCount: '7',
                                label: item.Batch,
                                label1: item.SupplierName,
                                label2: item.Rate,
                                label3: item.Status,
                                label4: item.Expiry,
                                label5: item.Loose,
                                label6: item.InvoNo + '/' + item.SlNo,
                                //label5: item.TLQty,
                                Batch: item.Batch,
                                BatchSlNo: item.BatchSlNo,
                                SlNo: item.SlNo,
                                InvoDate: item.InvoDate,
                                Rate: (item.Rate).toFixed(Decimal),
                                SellingRate: (item.SellingRate).toFixed(Decimal),
                                MRP: (item.MRP).toFixed(Decimal),
                                Expiry: item.Expiry,
                                InvId: item.InvId,
                                TaxId: item.TaxId,
                                TaxRate: item.TaxRate,
                                Lqty: item.Loose,
                                Supplier: (item.SupplierName).split("##")[0],

                                IPack: (item.SupplierName).split("##")[1],
                                InvNo: item.InvoNo,
                                headers: ["Batch", "Supplier#", "Rate", "Location", "Expiry", "Stock", "Inv-No"]
                            })
                        }
                    }));
                }

            })

        },
        autoFocus: true,
        select: function (event, ui) {

            $("#BatchSlNo_" + Id).val(ui.item.BatchSlNo);
            $("#Rate_" + Id).val(ui.item.Rate);

            $("#Expiry_" + Id).val(ui.item.Expiry);
            $("#Pack_" + Id).val(ui.item.IPack);
            $("#Qty_" + Id).val(1);
            $("#Rate_" + Id).val(ui.item.Rate);
            $("#TaxId_" + Id).val(ui.item.TaxId);
            $("#TaxRate_" + Id).val(ui.item.TaxRate);
            $("#SR_" + Id).val(ui.item.SellingRate);
            $("#MRP_" + Id).val(ui.item.MRP);
            $("#PurSlNo_" + Id).val(ui.item.SlNo);
            $("#InvId_" + Id).val(ui.item.InvId);
            $("#Lqtty_" + Id).val(ui.item.Lqty);

        },
    }).bind('focus', function () { $(this).autocomplete("search"); });
}

function CalcDiscountSplitTax() {

    if ($('#Tbl_Purchase tr').length > 0) {

        if (parseFloat($('#disc').val() || 0) > 0) {

            var Totalamt = 0;
            if ($("#DiscFromGrandTotal").prop("checked") == false) {
                Totalamt = parseFloat($('#HiddenTaxable').val() || 0);
            }
            else {
                Totalamt = parseFloat($('#HiddenGrandTotal').val() || 0);
            }

            var DisAMt = parseFloat($('#disc').val() || 0);
            var NetAMT = parseFloat(Totalamt - DisAMt);
            NetAMT = NetAMT.toFixed(Decimal);
            var Dispers = parseFloat((100 * DisAMt) / Totalamt) || 0;
            $('#Discountpercent').val(Dispers.toFixed(Decimal));
            BillwiseDiscount(NetAMT, Dispers);


        }
        else {
            CalcAmt();
            $('#Discountpercent').val('0.00');
        }
    }
}
function CalcDiscountSplitTaxbyPrecentage() {
    if ($('#Tbl_Purchase tr').length > 0) {
        if (parseFloat($('#Discountpercent').val() || 0) > 0) {

            var Totalamt = 0;
            if ($("#DiscFromGrandTotal").prop("checked") == false) {
                Totalamt = parseFloat($('#HiddenTaxable').val() || 0);
            }
            else {
                Totalamt = parseFloat($('#HiddenGrandTotal').val() || 0);
            }

            var DisPercen = parseFloat($('#Discountpercent').val() || 0);
            var DisAMt = parseFloat((Totalamt * DisPercen) / 100) || 0;
            var NetAMT = parseFloat(Totalamt - DisAMt);
            NetAMT = NetAMT.toFixed(Decimal);
            $('#disc').val(DisAMt.toFixed(Decimal));
            BillwiseDiscount(NetAMT, DisPercen);


        }
        else {
            CalcAmt();
            $('#disc').val('0.00');
        }
    }
}

function BillwiseDiscount(TotalAmt, Dispers) {


    var FCAmount = 0, FCtottaxable = 0, FCtottax = 0, BillDisc = 0, BaseCess = 0;

    var AMT0 = 0, GST0 = 0;
    var AMT5 = 0, GST5 = 0;
    var AMT12 = 0, GST12 = 0;
    var AMT18 = 0, GST18 = 0;
    var AMT28 = 0, GST28 = 0;

    var SGST_0 = 0, SGST_5 = 0, SGST_12 = 0, SGST_18 = 0, SGST_28 = 0;

    var FCCessAmt = 0;

    var i = $("#GridLength").val();



    if ($("#DiscFromGrandTotal").prop("checked") == false)                    //Discount From Total Taxable 
    {
        for (var k = 1; k <= i; k++) {

            if ($("#CessCheck").prop("checked") == true) {
                var CessPer = $("#Cess_" + k).val();
            }
            else {
                var CessPer = 0;
            }

            var Amount = $('#FCTaxable_' + k).val();
            var GSTPERS = parseFloat($("#TaxId_" + k).find("option:selected").attr("name") || 0);


            var disamt = parseFloat(Amount - ((Amount * Dispers) / 100));
            disamt = disamt.toFixed(Decimal);
            var TaxAmt = parseFloat(disamt * GSTPERS) / parseFloat(100);

            var GStAmount = TaxAmt.toFixed(Decimal);
            Amount = parseFloat(disamt) || 0;


            var CessAmt = disamt * (CessPer / 100);
            FCCessAmt = FCCessAmt + CessAmt;

            if (GSTPERS == 0) {
                AMT0 = parseFloat(AMT0) + parseFloat(Amount) || 0
                GST0 = parseFloat(GST0 + GStAmount) || 0
            }
            else if (GSTPERS == 5) {
                AMT5 = parseFloat(AMT5) + parseFloat(Amount) || 0
                GST5 = parseFloat(GST5) + parseFloat(GStAmount) || 0
            }
            else if (GSTPERS == 12) {
                AMT12 = parseFloat(AMT12) + parseFloat(Amount) || 0
                GST12 = parseFloat(GST12) + parseFloat(GStAmount) || 0
            }
            else if (GSTPERS == 18) {
                AMT18 = parseFloat(AMT18) + parseFloat(Amount) || 0
                GST18 = parseFloat(GST18) + parseFloat(GStAmount) || 0
            }
            else {
                AMT28 = parseFloat(AMT28) + parseFloat(Amount) || 0
                GST28 = parseFloat(GST28) + parseFloat(GStAmount) || 0
            }



        }

        SGST_0 = Number(GST0.toFixed(Decimal)) / 2;
        SGST_5 = Number(GST5.toFixed(Decimal)) / 2;
        SGST_12 = Number(GST12.toFixed(Decimal)) / 2;
        SGST_18 = Number(GST18.toFixed(Decimal)) / 2;
        SGST_28 = Number(GST28.toFixed(Decimal)) / 2;

        $('#splittaxable_0').val(AMT0.toFixed(Decimal));
        $('#splittax_0').val(GST0.toFixed(Decimal));

        $('#splittaxable_5').val(AMT5.toFixed(Decimal));
        $('#splittax_5').val(GST5.toFixed(Decimal));

        $('#splittaxable_12').val(AMT12.toFixed(Decimal));
        $('#splittax_12').val(GST12.toFixed(Decimal));

        $('#splittaxable_18').val(AMT18.toFixed(Decimal));
        $('#splittax_18').val(GST18.toFixed(Decimal));

        $('#splittaxable_28').val(AMT28.toFixed(Decimal));
        $('#splittax_28').val(GST28.toFixed(Decimal));


        if ($("#PRType").val() == 'Local') {
            $("#SGST_0,#CGST_0").val(SGST_0.toFixed(Decimal));
            $("#SGST_5,#CGST_5").val(SGST_5.toFixed(Decimal));
            $("#SGST_12,#CGST_12").val(SGST_12.toFixed(Decimal));
            $("#SGST_18,#CGST_18").val(SGST_18.toFixed(Decimal));
            $("#SGST_28,#CGST_28").val(SGST_28.toFixed(Decimal));
            $("#IGST_0,#IGST_5,#IGST_12,#IGST_18,#IGST_28").val(parseFloat(0).toFixed(Decimal));
        }
        else {
            $("#IGST_0").val(GST0.toFixed(Decimal));
            $("#IGST_5").val(GST5.toFixed(Decimal));
            $("#IGST_12").val(GST12.toFixed(Decimal));
            $("#IGST_18").val(GST18.toFixed(Decimal));
            $("#IGST_28").val(GST28.toFixed(Decimal));
            $("#SGST_0,#CGST_0,#SGST_5,#CGST_5,#SGST_12,#CGST_12,#SGST_18,#CGST_18,#SGST_28,#CGST_28").val(parseFloat(0).toFixed(Decimal));
        }



        var GrandTotal = 0; var TotalTax = 0;
        TotalTax = parseFloat(GST0 + GST5 + GST12 + GST18 + GST28).toFixed(Decimal);
        GrandTotal = parseFloat(TotalAmt) + parseFloat(TotalTax) + parseFloat(FCCessAmt);


        var FCrate = parseFloat($('#Curr_Rate').val() || 1);
        FCrate = isNaN(FCrate) ? 0 : FCrate;
        BillDisc = parseFloat($('#disc').val() || 0);


        FCAmount = GrandTotal * FCrate;
        FCtottaxable = TotalAmt * FCrate;
        FCtottax = TotalTax * FCrate;
        BillDisc = BillDisc * FCrate;
        BaseCess = FCCessAmt * FCrate;

        $('#basedisc').val(BillDisc.toFixed(Decimal));
        $('#FCAmount').val(GrandTotal.toFixed(Decimal));
        $('#tottaxable').val(parseFloat(TotalAmt).toFixed(Decimal));
        $('#tottax').val(parseFloat(TotalTax).toFixed(Decimal));

        $('#BaseAmount').val(FCAmount.toFixed(Decimal));
        $('#BaseTaxable').val(FCtottaxable.toFixed(Decimal));
        $('#BaseTax').val(FCtottax.toFixed(Decimal));

        $('#FCTotalCess').val(FCCessAmt.toFixed(Decimal));
        $('#BaseTotalCess').val(BaseCess.toFixed(Decimal));

        $('#FCTextTotal').text(GrandTotal.toFixed(Decimal));
        if (FCrate > 1) {
            $('#BaseTextTotal').text(FCAmount.toFixed(Decimal));
        }
        TaxSubAmountCalc(0);
    }
    else             //Discount From Grand Total
    {
        for (var k = 1; k <= i; k++) {

            if ($("#CessCheck").prop("checked") == true) {
                var CessPer = $("#Cess_" + k).val();
            }
            else {
                var CessPer = 0;
            }

            var Amount = $('#FCAmt_' + k).val();
            var GSTPERS = parseFloat($("#TaxId_" + k).find("option:selected").attr("name") || 0);
            var disamt = parseFloat(Amount - ((Amount * Dispers) / 100));
            disamt = disamt.toFixed(Decimal);


            var newamount = parseFloat(disamt);


            var ABC = 100 + Number(GSTPERS) + Number(CessPer);
            var newtaxable = Number((100 * newamount) / ABC).toFixed(Decimal);

            //var TaxAmt = parseFloat(newamount) - parseFloat(newtaxable);
            var TaxAmt = newtaxable * (GSTPERS / 100);

            var GStAmount = TaxAmt.toFixed(Decimal);
            Amount = parseFloat(disamt) || 0;

            var CessAmt = newtaxable * (CessPer / 100);
            FCCessAmt = FCCessAmt + CessAmt;

            if (GSTPERS == 0) {
                AMT0 = parseFloat(AMT0) + parseFloat(newtaxable) || 0
                GST0 = parseFloat(GST0 + GStAmount) || 0
            }
            else if (GSTPERS == 5) {
                AMT5 = parseFloat(AMT5) + parseFloat(newtaxable) || 0
                GST5 = parseFloat(GST5) + parseFloat(GStAmount) || 0
            }
            else if (GSTPERS == 12) {
                AMT12 = parseFloat(AMT12) + parseFloat(newtaxable) || 0
                GST12 = parseFloat(GST12) + parseFloat(GStAmount) || 0
            }
            else if (GSTPERS == 18) {
                AMT18 = parseFloat(AMT18) + parseFloat(newtaxable) || 0
                GST18 = parseFloat(GST18) + parseFloat(GStAmount) || 0
            }
            else {
                AMT28 = parseFloat(AMT28) + parseFloat(newtaxable) || 0
                GST28 = parseFloat(GST28) + parseFloat(GStAmount) || 0
            }
        }

        SGST_0 = Number(GST0.toFixed(Decimal)) / 2;
        SGST_5 = Number(GST5.toFixed(Decimal)) / 2;
        SGST_12 = Number(GST12.toFixed(Decimal)) / 2;
        SGST_18 = Number(GST18.toFixed(Decimal)) / 2;
        SGST_28 = Number(GST28.toFixed(Decimal)) / 2;

        $('#splittaxable_0').val(AMT0.toFixed(Decimal));
        $('#splittax_0').val(GST0.toFixed(Decimal));

        $('#splittaxable_5').val(AMT5.toFixed(Decimal));
        $('#splittax_5').val(GST5.toFixed(Decimal));

        $('#splittaxable_12').val(AMT12.toFixed(Decimal));
        $('#splittax_12').val(GST12.toFixed(Decimal));

        $('#splittaxable_18').val(AMT18.toFixed(Decimal));
        $('#splittax_18').val(GST18.toFixed(Decimal));

        $('#splittaxable_28').val(AMT28.toFixed(Decimal));
        $('#splittax_28').val(GST28.toFixed(Decimal));

        if ($("#PRType").val() == 'Local') {
            $("#SGST_0,#CGST_0").val(SGST_0.toFixed(Decimal));
            $("#SGST_5,#CGST_5").val(SGST_5.toFixed(Decimal));
            $("#SGST_12,#CGST_12").val(SGST_12.toFixed(Decimal));
            $("#SGST_18,#CGST_18").val(SGST_18.toFixed(Decimal));
            $("#SGST_28,#CGST_28").val(SGST_28.toFixed(Decimal));
            $("#IGST_0,#IGST_5,#IGST_12,#IGST_18,#IGST_28").val(parseFloat(0).toFixed(Decimal));
        }
        else {
            $("#IGST_0").val(GST0.toFixed(Decimal));
            $("#IGST_5").val(GST5.toFixed(Decimal));
            $("#IGST_12").val(GST12.toFixed(Decimal));
            $("#IGST_18").val(GST18.toFixed(Decimal));
            $("#IGST_28").val(GST28.toFixed(Decimal));
            $("#SGST_0,#CGST_0,#SGST_5,#CGST_5,#SGST_12,#CGST_12,#SGST_18,#CGST_18,#SGST_28,#CGST_28").val(parseFloat(0).toFixed(Decimal));
        }

        var GrandTotal = parseFloat(TotalAmt); var TotalTax = 0; var TotalTaxable = 0;
        TotalTax = parseFloat(GST0 + GST5 + GST12 + GST18 + GST28).toFixed(Decimal);
        TotalTaxable = parseFloat(TotalAmt) - parseFloat(TotalTax) - parseFloat(FCCessAmt);

        var FCrate = parseFloat($('#Curr_Rate').val() || 1).toFixed(Decimal);
        FCrate = isNaN(FCrate) ? 1 : FCrate;
        BillDisc = parseFloat($('#disc').val() || 0);

        FCAmount = GrandTotal * FCrate;
        FCtottaxable = TotalTaxable * FCrate;
        FCtottax = TotalTax * FCrate;
        BillDisc = BillDisc * FCrate;
        BaseCess = FCCessAmt * FCrate;


        $('#basedisc').val(BillDisc.toFixed(Decimal));
        $('#FCAmount').val(GrandTotal.toFixed(Decimal));
        $('#tottaxable').val(TotalTaxable.toFixed(Decimal));
        $('#tottax').val(parseFloat(TotalTax).toFixed(Decimal));
        $('#BaseAmount').val(FCAmount.toFixed(Decimal));
        $('#BaseTaxable').val(FCtottaxable.toFixed(Decimal));
        $('#BaseTax').val(FCtottax.toFixed(Decimal));

        $('#FCTotalCess').val(FCCessAmt.toFixed(Decimal));
        $('#BaseTotalCess').val(BaseCess.toFixed(Decimal));

        $('#FCTextTotal').text(GrandTotal.toFixed(Decimal));
        if (FCrate > 1) {
            $('#BaseTextTotal').text(FCAmount.toFixed(Decimal));
        }
        TaxSubAmountCalc(0);
    }

    CalcInvoice();

}

function SavePurchase() {

    if (CopyFlag == 1) {
        warningshow('Purchase In Modify Mode. Cannot Save as New Purchase', '');
        return false;
    }
    else if ($.trim($("#PINo_S").val()) != '' && $("#PIValid").val()==0) {
        warningshow('Enter Valid Purchase SlNo', 'PINo_S');
        return false;
    }
    else if ($("#Location").val() == 0 || $("#Location").val() == undefined || $("#Location").val() == null || $("#Location").val() == '') {
        warningshow('Select Location', 'Location');
        return false;
    }
    else if ($("#PRType").val() == 0 || $("#PRType").val() == undefined || $("#PRType").val() == null || $("#PRType").val() == '') {
        warningshow('Select Purchase Type', 'PRType');
        return false;
    }
    else if (parseInt($("#SupplierId").val() || 0) == 0) {
        warningshow('Select Supplier', 'Supplier');
        return false;
    }
    else if ($("#PayType").val() == 0 || $("#PayType").val() == undefined || $("#PayType").val() == null || $("#PayType").val() == '') {
        warningshow('Select Pay Type', 'PayType');
        return false;
    }
    else if ($("#Tbl_Purchase tr").length == 0) {
        warningshow('No Products Added', 'Product_0');
        return false;
    }
    else if (EditFlag != 0) {
        warningshow('Row Details are not Complete', 'Batch_' + EditFlag);
        return false;
    }
    else if (parseFloat($("#FCAmount").val() || 0) <= 0) {
        warningshow('GrandTotal Cannot be Zero', '');
        return false;
    }
    else {
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
        $('#Confirmflag').val('SavePurchase'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do you want Save this Purchase Return?');
    }
}

function OKSavePurchase() {
    $('#LoadingSmall').show();
    $('#confirmOk,#btnsubmit').prop("disabled", true);
    var GridLength = $("#GridLength").val();
    var BDFlag = 0; if ($("#DiscFromGrandTotal").prop("checked") == true) { BDFlag = 1; }
    var CessFlag = 0; if ($("#CessCheck").prop("checked") == true) { CessFlag = 1; }

    var oArray = new Array();

    var slno = 0;
    for (var i = 1; i <= GridLength; i++) {

        var CurrencyRate = parseFloat($("#Curr_Rate").val() || 1);

        if ($('#Product_' + i).val() != undefined) {
            slno++;
            oArray.push({

                'PurMainId': slno,
                'SlNo': $("#PINo_A").val(),
                'InvoNo': $.trim($("#PINo_S").val()),
                'SupplierId': parseInt($("#SupplierId").val() || 0),
                'PayType': parseInt($("#PayType").val() || 0),
                'PurchaseType': $("#PRType").val(),
                'InvoDate': $("#PharmaPIDate").val(),
                'CurrencyId': parseInt($("#Currency").val() || 0),
                'CurrencyRate': parseFloat($("#Curr_Rate").val() || 1),
                'FBillDiscount': parseFloat($("#disc").val() || 0),
                'FDiscount': parseFloat($("#totdisc").val() || 0),
                'FTaxable': parseFloat($("#tottaxable").val() || 0),
                'FTax': parseFloat($("#tottax").val() || 0),
                'FCTotal': parseFloat($("#FCAmount").val() || 0),
                'InvoiceTotal': parseFloat($("#FCInvoiceTotal").val() || 0),
                'FCGST_0': parseFloat($("#splittax_0").val() || 0),
                'FCGST_5': parseFloat($("#splittax_5").val() || 0),
                'FCGST_12': parseFloat($("#splittax_12").val() || 0),
                'FCGST_18': parseFloat($("#splittax_18").val() || 0),
                'FCGST_28': parseFloat($("#splittax_28").val() || 0),
                'FCess': parseFloat($("#FCTotalCess").val() || 0),

                'BilDiscount': parseFloat($("#basedisc").val() || 0),
                'TotalDiscount': parseFloat($("#BaseDiscount").val() || 0),
                'TotalTaxable': parseFloat($("#BaseTaxable").val() || 0),
                'TotalTax': parseFloat($("#BaseTax").val() || 0),
                'BaseTotal': parseFloat($("#BaseAmount").val() || 0),
                'BaseInvoiceTotal': parseFloat($("#BInvoiceTotal").val() || 0),
                'BCGST_0': parseFloat(Number($("#splittaxable_0").val() || 0)).toFixed(Decimal),
                'BCGST_5': parseFloat(Number($("#splittaxable_5").val() || 0)).toFixed(Decimal),
                'BCGST_12': parseFloat(Number($("#splittaxable_12").val() || 0)).toFixed(Decimal),
                'BCGST_18': parseFloat(Number($("#splittaxable_18").val() || 0)).toFixed(Decimal),
                'BCGST_28': parseFloat(Number($("#splittaxable_28").val() || 0)).toFixed(Decimal),
                'BCess': parseFloat($("#BaseTotalCess").val() || 0),
                'BDFlag': BDFlag,
                'CessFlag': CessFlag,
                'Remarks': $.trim($("#txtnotes").val()),
                'SubId': parseFloat($("#Cess_" + i).val() || 0),
                'ItemId': parseFloat($("#ProductId_" + i).val() || 0),
                'ItemCode': $.trim($("#Product_" + i).val()),
                'ItemDescription': $.trim($("#Product_" + i).val()),
                'LocationId': parseFloat($("#Location").val() || 0),
                'BatchSlNo': parseInt($("#BatchSlNo_" + i).val() || 0),
                'Batch': $.trim($("#Batch_" + i).val()),
                'Expiry': $.trim($("#Expiry_" + i).val()),
                'Pack': parseInt($("#Pack_" + i).val() || 0),
                'Quantity': parseFloat($("#Qty_" + i).val() || 0),
                'Free': parseFloat($("#Free_" + i).val() || 0),
                'Loose': parseFloat($("#Loose_" + i).val() || 0),
                'SellingRate': parseFloat($("#SR_" + i).val() || 0),
                'MRP': parseFloat($("#MRP_" + i).val() || 0),
                'TQty': parseFloat($("#TQty_" + i).val() || 0),
                'TLQty': parseFloat($("#TLQty_" + i).val() || 0),
                'TaxId': parseFloat($("#TaxId_" + i).val() || 0),
                'TaxRate': parseFloat($("#TaxId_" + i).find("option:selected").attr("name") || 0),
                'FCRate': parseFloat($("#Rate_" + i).val() || 0),
                'FCDiscount': parseFloat($("#Discount_" + i).val() || 0),
                'FCTaxable': parseFloat($("#FCTaxable_" + i).val() || 0),
                'FCTax': parseFloat($("#FCTax_" + i).val() || 0),
                'FCAmount': parseFloat($("#FCAmt_" + i).val() || 0),
                'FC_Cess': parseFloat($("#CessAmount_" + i).val() || 0),
                'Rate': parseFloat(Number($("#Rate_" + i).val()) * CurrencyRate).toFixed(Decimal),
                'Discount': parseFloat($("#BaseDiscount_" + i).val() || 0),
                'TaxableAmount': parseFloat($("#BaseTaxable_" + i).val() || 0),
                'TaxAmount': parseFloat($("#BaseTax_" + i).val() || 0),
                'Amount': parseFloat($("#BaseAmt_" + i).val() || 0),
                'B_Cess': parseFloat($("#Cess_" + i).val() || 0),
                'Margin': parseFloat($("#Margin_" + i).val() || 0),
                'DelFlag': 1,
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,
                'FCRoundOff': 0,
                'RoundOff': 0,
                'UnitId': parseInt($("#InvId_" + i).val() || 0),
                'P_OtherCost': 0,
                'IMEINumber': '0',
                'PO_No': 0,
                'PO_SubTbl_Id': 0,
                'MRV_No': 0,
                'MRV_SubTbl_Id': 0,
                'Performa_NO': 0,
                'Performa_SubTbl_Id': 0,
                'Terms': 0,
                'JobNo': 0,
                'Area': 0,
                'Flag': parseInt($("#PurSlNo_" + i).val() || 0),
                'Variable1': '0',
                'Variable2': '0',
                'Status': '0',
                'DueDate': '',
                'LPO_No': '0',
                'ShipDate': '',

            });
        }
    }

    if (oArray.length > 0) {


        var data = { 'PharmacyModel': oArray };
        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_PurchaseReturnInsert",
            data: data,
            success: function (result) {

                var status = result.oList[0].Status;
                var no = result.oList[0].SlNo;


                $('#confirmOk,#btnsubmit').prop("disabled", false);
                $('#LoadingSmall').hide();
                Showalerts(status, no);

            }
        });

    }
    else {
        $('#confirmOk,#btnsubmit').prop("disabled", false);
        $('#LoadingSmall').hide();
        warningshow('No Products Added', 'Product_0');
        return false;
    }

}


function GetCopy(Flag) {
    if ($("#Tbl_Purchase tr").length > 0 && Flag == 0) {

        $('#Confirmflag').val('Copy'), $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
    else {
        CopyFlag = 1;
        formrefresh(1);
        $('.smallTextbox,.billdisc,#PharmaPIDate,#txtnotes,.btndis').prop("disabled", true);
        $('#copypurchase').show();
        $("#purchaseinv,#btnsubmit").hide();
        $("#CrntMode").removeClass();
        $("#CrntMode").addClass("badge badge-warning white");
        $("#CrntMode").text('Mode : Copy');
        $('#PINo_C,#btnprvs,#btnnxt').prop("disabled", false);
        $("#PINo_C").val('');
        $("#PINo_C").focus();
    }
}

function GetBillPrevousornext(Value) {

    var SlNo = parseInt($('#PINo_A').val() || 0);
    SlNo = SlNo + Value;
    if ((SlNo <= 0) || (SlNo >= NextInvoiceNo)) {
        warningshow('Invoice Number Not Valid', 'PINo_C');
        return false;
    }
    else {
        $('#PINo_A').val(SlNo);
        var data = {};
        data.SlNo = $('#PINo_A').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_PurchaseReturnGetandGets",
            data: data,
            success: function (result) {
                formrefresh(1);
                PurchaseGets(result);
                $('#btnnew').focus();

            }
        });
    }
}

function PurchaseGets(result) {
    $("#Tbl_Purchase tr").remove();
    if (result.length > 0) {
        $("#PIValid").val(1);
        $("#PINo_A").val(result[0].SlNo);
        $("#PINo_S,#PINo_C").val(result[0].InvoNo);
        $("#SupplierId").val(result[0].SupplierId);
        $("#Supplier").val(result[0].SupplierName);
        $("#PayType").val(result[0].PayType);
        $("#PRType").val(result[0].PurchaseType);
        $("#PharmaPIDate").val(result[0].InvoDate);
        $("#Currency").val(result[0].CurrencyId);
        $("#Curr_Rate").val(result[0].CurrencyRate);
        $("#txtnotes").val(result[0].Remarks);
        $("#disc").val(parseFloat(result[0].FBillDiscount || 0).toFixed(Decimal));

        if (result[0].BDFlag == 1) { $("#DiscFromGrandTotal").prop("checked", true); }
        else { $("#DiscFromGrandTotal").prop("checked", false); }
        if (result[0].CessFlag == 1) { $("#CessCheck").prop("checked", true) }
        else { $("#CessCheck").prop("checked", false) }

        for (var i = 0; i < result.length; i++) {

            var Pack = result[i].Pack;
            var Qty = result[i].Quantity;
            var Rate = parseFloat(result[i].FCRate || 0).toFixed(Decimal);
            var Loose = result[i].Loose;
            var DiscAmt = parseFloat(result[i].FCDiscount || 0).toFixed(Decimal);

            var DiscPer = (DiscAmt * 100) / ((Rate / Pack) * ((Pack * Qty) + Loose));
            DiscPer = Number(DiscPer).toFixed(Decimal);

            var Id = i + 1;
            var ProductRow = '<tr id="MTr_' + Id + '" onfocusout="UpdateRow(' + Id + ')">' +
                '<td width="2%" align="center"><input class="jsgrid-button jsgrid-delete-button" type="button" onclick="DeleteRow(' + Id + ')" title="Delete" autocomplete="off"></td>' +
                '<td width="3%" align="center" id="MTd_' + Id + '">' + Id + '</td>' +
                '<td width="13%"><input id="Product_' + Id + '" value="' + result[i].ItemDescription + '" onkeyup="LoadProduct(' + Id + ')" class="form-control smallTextbox borderno" /></td>' +
                '<td width="5%"><input id="Batch_' + Id + '" value="' + result[i].Batch + '" class="form-control smallTextbox borderno" onkeydown="FocusNext(event, \'\', \'Batch_\', \'Expiry_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="Expiry_' + Id + '" value="' + result[i].Expiry + '" class="form-control text-center smallTextbox borderno"  onkeypress="isNumberDate(event, this)" onkeyup="ExpiryDate(\'Expiry_' + Id + '\')" onkeydown="FocusNext(event, \'Batch_\', \'Expiry_\', \'Pack_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="Pack_' + Id + '" value="' + result[i].Pack + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Expiry_\', \'Pack_\', \'Qty_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="Qty_' + Id + '" value="' + result[i].Quantity + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Pack_\', \'Qty_\', \'Free_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="Free_' + Id + '" value="' + result[i].Free + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Qty_\', \'Free_\', \'Loose_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="Loose_' + Id + '" value="' + result[i].Loose + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Free_\', \'Loose_\', \'Rate_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="Rate_' + Id + '" value="' + parseFloat(result[i].FCRate || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Loose_\', \'Rate_\', \'TaxId_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><select id="TaxId_' + Id + '" class="form-control smallTextbox borderno" onchange="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Rate_\', \'TaxId_\', \'DiscountPer_\', ' + Id + ',\'MTr_\')">' + TaxSelect + '</select></td>' +
                '<td width="5%"><input id="DiscountPer_' + Id + '" value="' + DiscPer + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcDiscRow(' + Id + ',1,1)" onkeydown="FocusNext(event, \'TaxId_\', \'DiscountPer_\', \'Discount_\', ' + Id + ',\'MTr_\')" /></td>' +

                '<td width="5%"><input id="Discount_' + Id + '" value="' + parseFloat(result[i].FCDiscount || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcDiscRow(' + Id + ',0,1)" onkeydown="FocusNext(event, \'DiscountPer_\', \'Discount_\', \'SR_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="SR_' + Id + '" value="' + parseFloat(result[i].SellingRate || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'Discount_\', \'SR_\', \'MRP_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="MRP_' + Id + '" value="' + parseFloat(result[i].MRP || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'SR_\', \'MRP_\', \'\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="TQty_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="TLQty_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCTaxable_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCTax_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCAmt_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="Margin_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="CessAmount_' + Id + '" value="' + parseFloat(0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno bg-white" disabled /></td>' +

                '<td width="5%" style="display:none;">' +

                '<input id="ProductId_' + Id + '" value="' + result[i].ItemId + '" />' +
                '<input id="TaxRate_' + Id + '" value="' + result[i].TaxRate + '" />' +

                '<input id="BaseDiscount_' + Id + '" value="0" />' +
                '<input id="BaseTaxable_' + Id + '" value="0" />' +
                '<input id="BaseTax_' + Id + '" value="0" />' +
                '<input id="BaseAmt_' + Id + '" value="0" />' +
                '<input id="Cess_' + Id + '" value="' + result[i].CessPer + '" />' +
                '<input id="BaseCessAmount_' + Id + '" value="0" />' +
                '<input id="BatchSlNo_' + Id + '" value="' + result[i].BatchSlNo + '" />' +
                '<input id="PurSlNo_' + Id + '" value="' + result[i].LPO_No + '" />' +
                '<input id="InvId_' + Id + '" value="' + result[i].InvId + '" />' +
                '</td>' +
                '</tr>';

            $("#Tbl_Purchase").append(ProductRow);

            $('#TaxId_' + Id).val(result[i].TaxId)
        }

        $("#GridLength").val(result.length);
        CalcCopyData();

        $('.jsgrid-button,.smallTextbox,#DiscFromGrandTotal,#CessCheck').prop('disabled', true);
        $('#PINo_C,#btnprvs,#btnnxt').prop("disabled", false);
        $("#btnnew").focus();
        $("#btnedit,#btndelete,#btnprint,#btnacctran").show();

        $('#proddiv').animate({ scrollTop: 5000 }, 900);
    }
    else {
        CheckDeleted();
    }
}

function CheckDeleted() {
    var datax = {};
    datax.BillNo = 'PR';
    datax.SlNo = $('#PINo_A').val();
    datax.DepartmentId = ERPDeptId;
    datax.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Purchase/CheckDeletedPurchase",
        data: datax,
        success: function (result) {
            if (result.oList.length > 0) {
                var status = result.oList[0].Status;
                var slno = result.oList[0].SlNo;
                if (status == 1) {
                    swal('PR# -' + slno + ' ', "Cancelled!!!", "error");
                    $('.swal-button swal-button--confirm').focus();
                }
            }
        }
    });
}


function CalcCopyData() {
    var slno = 1;
    BillDiscountFlag = 0;
    var GridLength = $("#GridLength").val();
    for (var i = 1; i <= GridLength; i++) {
        if ($('#Product_' + i).val() != undefined) {
            CalcAmount(i);
            $('#MTd_' + i).text(slno);
            slno++;
        }
    }
    CalcTotal();
    CalcDiscountSplitTax();
}

function DeletePurchase() {
    $('#Confirmflag').val('DeletePurchase'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Delete this Purchase Return?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}

function OKDeletePurchase() {
    $('#OTPDiv').hide();

    var data = {};
    data.SlNo = $('#PINo_A').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Pharmacy/HMS_PurchaseReturnDelete",
        data: data,
        success: function (result) {

            var status = result.oList[0].Status;
            var slno = result.oList[0].SlNo;
            Showalerts(status, slno);
        }
    });

}

function EditInvoice(Flag, EditDisc) {

    if (Flag == 0 && EditDisc == 0 && (usermenu1.indexOf("M252") == -1) && $("#DiscFromGrandTotal").prop("checked") == true && parseFloat($("#disc").val() || 0) > 0) {
        $('#Confirmflag').val('MainEditDisc'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('User Right and Purchase Bill Discount Type is not match! Continue?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
    else {
        $("#btncnclsave").attr("onclick", "CheckEditInvoce(" + Flag + ")");
        $('#otp,#otpremarks').prop("disabled", false);
        $('#OTPDiv').show();
        $("#otp,#otpremarks").val('');
        $("#otp").focus();
    }
}

function CheckEditInvoce(Flag) {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'Purchase Return Edit- OTP , Bill No : ' + $("#PINo_A").val() + ' , ' + $("#PRType").val() + ' Purchase Return';
        else if (Flag == 1)
            Operation = 'Purchase Return Delete- OTP , Bill No : ' + $("#PINo_A").val() + ' , ' + $("#PRType").val() + ' Purchase';

        var data = {};
        data.UserId = ERPUserId;
        data.OTP = $("#otp").val();
        data.Remarks = $('#otpremarks').val();
        data.Operation = Operation;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Home/OTPCheckforUser",
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    OTPCheck(status, Flag)
                }
            }
        });
    }
}

function OTPCheck(status, Flag) {
    if (status == 1) {
        if (Flag == 0) {
            OKEditInvoce();
        }
        else if (Flag == 1) {
            OKDeletePurchase();
        }

    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}

function OKEditInvoce() {
    MainEditFlag = 1;
    $('#OTPDiv').hide();
    $('#btnedit,#btnprint,#copypurchase,#btndelete,#btnExport,#btnacctran').hide();
    $('#btnsaveedit,#purchaseinv').show();

    $('.smallTextbox,.btndis,.jsgrid-button,#PharmaPIDate,#txtnotes,#CessCheck').prop("disabled", false);
    $('.dedisa').prop("disabled", true);

    if (BillDiscountFlag == 0) {
        $('.billdisc').prop("disabled", false);
    }

    if ((usermenu1.indexOf("M252") == -1)) { // From Total Taxable
        if ($("#DiscFromGrandTotal").prop("checked") == true && parseFloat($("#disc").val() || 0) > 0) {
            ResetBillDiscount();
            $("#DiscFromGrandTotal").prop("checked", false);
            CalcAmt();
        }

        $("#DiscFromGrandTotal").prop("disabled", true);
    }
    else { // From GrandTotal
        $("#DiscFromGrandTotal").prop("disabled", false);
    }

    $("#CrntMode").removeClass();
    $("#CrntMode").addClass("badge badge-danger");
    $("#CrntMode").text('Mode : Modify');
}


function UpdatePurchase() {
     if ($.trim($("#PINo_S").val()) != '' && $("#PIValid").val()==0) {
        warningshow('Enter Valid Purchase SlNo', 'PINo_S');
        return false;
    }
    else if ($("#Location").val() == 0 || $("#Location").val() == undefined || $("#Location").val() == null || $("#Location").val() == '') {
        warningshow('Select Location', 'Location');
        return false;
    }
    else if ($("#PRType").val() == 0 || $("#PRType").val() == undefined || $("#PRType").val() == null || $("#PRType").val() == '') {
        warningshow('Select Purchase Type', 'PRType');
        return false;
    }
    else if (parseInt($("#SupplierId").val() || 0) == 0) {
        warningshow('Select Supplier', 'Supplier');
        return false;
    }
    else if ($("#PayType").val() == 0 || $("#PayType").val() == undefined || $("#PayType").val() == null || $("#PayType").val() == '') {
        warningshow('Select Pay Type', 'PayType');
        return false;
    }
    else if ($("#Tbl_Purchase tr").length == 0) {
        warningshow('No Products Added', 'Product_0');
        return false;
    }
    else if (EditFlag != 0) {
        warningshow('Row Details are not Complete', 'Batch_' + EditFlag);
        return false;
    }
    else if (parseFloat($("#FCAmount").val() || 0) <= 0) {
        warningshow('GrandTotal Cannot be Zero', '');
        return false;
    }
    else {
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
        $('#Confirmflag').val('UpdatePurchase'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do you want Update this Purchase Return?');
    }
}

function OKUpdatePurchase() {
    $('#LoadingSmall').show();
    $('#confirmOk,#btnsubmit').prop("disabled", true);
    var GridLength = $("#GridLength").val();
    var BDFlag = 0; if ($("#DiscFromGrandTotal").prop("checked") == true) { BDFlag = 1; }
    var CessFlag = 0; if ($("#CessCheck").prop("checked") == true) { CessFlag = 1; }

    var oArray = new Array();

    var slno = 0;
    for (var i = 1; i <= GridLength; i++) {

        var CurrencyRate = parseFloat($("#Curr_Rate").val() || 1);

        if ($('#Product_' + i).val() != undefined) {
            slno++;
            oArray.push({

                'PurMainId': slno,
                'SlNo': $("#PINo_A").val(),
                'InvoNo': $.trim($("#PINo_S").val()),
                'SupplierId': parseInt($("#SupplierId").val() || 0),
                'PayType': parseInt($("#PayType").val() || 0),
                'PurchaseType': $("#PRType").val(),
                'InvoDate': $("#PharmaPIDate").val(),
                'CurrencyId': parseInt($("#Currency").val() || 0),
                'CurrencyRate': parseFloat($("#Curr_Rate").val() || 1),
                'FBillDiscount': parseFloat($("#disc").val() || 0),
                'FDiscount': parseFloat($("#totdisc").val() || 0),
                'FTaxable': parseFloat($("#tottaxable").val() || 0),
                'FTax': parseFloat($("#tottax").val() || 0),
                'FCTotal': parseFloat($("#FCAmount").val() || 0),
                'InvoiceTotal': parseFloat($("#FCInvoiceTotal").val() || 0),
                'FCGST_0': parseFloat($("#splittax_0").val() || 0),
                'FCGST_5': parseFloat($("#splittax_5").val() || 0),
                'FCGST_12': parseFloat($("#splittax_12").val() || 0),
                'FCGST_18': parseFloat($("#splittax_18").val() || 0),
                'FCGST_28': parseFloat($("#splittax_28").val() || 0),
                'FCess': parseFloat($("#FCTotalCess").val() || 0),

                'BilDiscount': parseFloat($("#basedisc").val() || 0),
                'TotalDiscount': parseFloat($("#BaseDiscount").val() || 0),
                'TotalTaxable': parseFloat($("#BaseTaxable").val() || 0),
                'TotalTax': parseFloat($("#BaseTax").val() || 0),
                'BaseTotal': parseFloat($("#BaseAmount").val() || 0),
                'BaseInvoiceTotal': parseFloat($("#BInvoiceTotal").val() || 0),
                'BCGST_0': parseFloat(Number($("#splittaxable_0").val() || 0)).toFixed(Decimal),
                'BCGST_5': parseFloat(Number($("#splittaxable_5").val() || 0)).toFixed(Decimal),
                'BCGST_12': parseFloat(Number($("#splittaxable_12").val() || 0)).toFixed(Decimal),
                'BCGST_18': parseFloat(Number($("#splittaxable_18").val() || 0)).toFixed(Decimal),
                'BCGST_28': parseFloat(Number($("#splittaxable_28").val() || 0)).toFixed(Decimal),
                'BCess': parseFloat($("#BaseTotalCess").val() || 0),

                'FCRoundOff': 0,
                'RoundOff': 0,
                'BDFlag': BDFlag,
                'CessFlag': CessFlag,
                'Remarks': $.trim($("#txtnotes").val()),
                'SubId': parseFloat($("#Cess_" + i).val() || 0),
                'ItemId': parseFloat($("#ProductId_" + i).val() || 0),
                'ItemCode': $.trim($("#Product_" + i).val()),
                'ItemDescription': $.trim($("#Product_" + i).val()),
                'LocationId': parseFloat($("#Location").val() || 0),

                'BatchSlNo': parseInt($("#BatchSlNo_" + i).val() || 0),
                'Batch': $.trim($("#Batch_" + i).val()),
                'Expiry': $.trim($("#Expiry_" + i).val()),
                'Pack': parseInt($("#Pack_" + i).val() || 0),
                'Quantity': parseFloat($("#Qty_" + i).val() || 0),
                'Free': parseFloat($("#Free_" + i).val() || 0),
                'Loose': parseFloat($("#Loose_" + i).val() || 0),
                'SellingRate': parseFloat($("#SR_" + i).val() || 0),
                'MRP': parseFloat($("#MRP_" + i).val() || 0),
                'TQty': parseFloat($("#TQty_" + i).val() || 0),
                'TLQty': parseFloat($("#TLQty_" + i).val() || 0),
                'TaxId': parseFloat($("#TaxId_" + i).val() || 0),
                'TaxRate': parseFloat($("#TaxId_" + i).find("option:selected").attr("name") || 0),
                'FCRate': parseFloat($("#Rate_" + i).val() || 0),
                'FCDiscount': parseFloat($("#Discount_" + i).val() || 0),
                'FCTaxable': parseFloat($("#FCTaxable_" + i).val() || 0),
                'FCTax': parseFloat($("#FCTax_" + i).val() || 0),
                'FCAmount': parseFloat($("#FCAmt_" + i).val() || 0),
                'FC_Cess': parseFloat($("#CessAmount_" + i).val() || 0),
                'Rate': parseFloat(Number($("#Rate_" + i).val()) * CurrencyRate).toFixed(Decimal),
                'Discount': parseFloat($("#BaseDiscount_" + i).val() || 0),
                'TaxableAmount': parseFloat($("#BaseTaxable_" + i).val() || 0),
                'TaxAmount': parseFloat($("#BaseTax_" + i).val() || 0),
                'Amount': parseFloat($("#BaseAmt_" + i).val() || 0),
                'B_Cess': parseFloat($("#Cess_" + i).val() || 0),
                'Margin': parseFloat($("#Margin_" + i).val() || 0),
                'DelFlag': 1,
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,
                'UnitId': parseInt($("#InvId_" + i).val() || 0),
                'Flag': parseInt($("#PurSlNo_" + i).val() || 0),
                'JobNo': 0,
                'Area': 0,
                'P_OtherCost': 0,
                'PO_No': 0,
                'PO_SubTbl_Id': 0,
                'MRV_No': 0,
                'MRV_SubTbl_Id': 0,
                'Performa_NO': 0,
                'Performa_SubTbl_Id': 0,
                'IMEINumber': '',
                'Variable1': '',
                'Variable2': '',
                'Status': '',
                'Terms': 0,
                'DueDate': '',
                'LPO_No': '',
                'ShipDate': '',

            });
        }
    }

    if (oArray.length > 0) {


        var data = { 'PharmacyModel': oArray };
        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_PurchaseReturnUpdate",
            data: data,
            success: function (result) {

                var status = result.oList[0].Status;
                var no = result.oList[0].SlNo;
                $('#confirmOk,#btnsubmit').prop("disabled", false);
                $('#LoadingSmall').hide();
                Showalerts(status, no);

            }
        });

    }
    else {
        $('#confirmOk,#btnsubmit').prop("disabled", false);
        $('#LoadingSmall').hide();
        warningshow('No Products Added', 'Product_0');
        return false;
    }

}






function GetPurchaseListDefault() {

    $('#ViewFromDate').val(GetFirstDayMonth());
    $('#ViewToDate').val(CurDate);

    $('#PurchaseView').modal("show");
    $("#PurchaseView").appendTo("body");

    GetPurchaseList();
}

function GetPurchaseList() {

    var dataPI = {};
    dataPI.FromDate = $('#ViewFromDate').val();
    dataPI.ToDate = $('#ViewToDate').val();
    dataPI.PurchaseDeptId = ERPDeptId;
    dataPI.DepartmentId = ERPDeptId;
    dataPI.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseReturnList",
        data: dataPI,
        success: function (result) {
            GetPIListView(result.oList);


        }
    });
}
function GetPIListView(result) {


    $('#ViewFromDate,#ViewToDate').prop("disabled", false);
    disable_datatable('tbl_PIViewList');

    var responseText = "<thead><tr><th>Sl#</th><th>PR#</th><th>Date</th><th>Supplier</th><th>PType</th><th>Grand Total</th><th>User</th><th>Remarks</th><th>Print</th></tr>" +
        "<tr><th> </th><th>PR#</th><th>Date</th><th>Supplier</th><th>PType</th><th>Grand Total</th><th>User</th><th>Remarks</th><th> </th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr ondblclick="GetCopyofThisPurchase(' + result[l].EnquiryNo + ',' + result[l].DepartmentId + ',0)"><td style="" align="center">' + slno + '</td><td id=' + 'InvoView_' + slno + '>' +
            result[l].EnquiryNo + '</td><td>' +
            result[l].EnquiryDate + '</td><td>' +
            result[l].SupplierName + '</td><td>' +
            result[l].Status + '</td><td align="right">' +
            parseFloat(result[l].GrandTotal).toFixed(Decimal) + '</td><td>' +
            result[l].CurrencyName + '</td><td>' +
            result[l].Remarks + '</td>' +
            '<td align="center"><button class="btn btn-warning white btn-round btn-sm m-0" onclick="GetCopyofThisPurchase(' + result[l].EnquiryNo + ',' + result[l].DepartmentId + ',1)" autocomplete="off">Print <i class="ft-printer"></i></button></td></tr>';
    }



    $('#tbl_PIViewList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_PIViewList', 'Multiple');

}


function GetCopyofThisPurchase(slno, dept, Print) {

    PopUpClose(3);

    CopyFlag = 1;
    formrefresh(1);
    $('.smallTextbox,.billdisc,#PharmaPIDate,#txtnotes,.btndis').prop("disabled", true);
    $('#copypurchase').show();
    $("#purchaseinv,#btnsubmit").hide();
    $("#CrntMode").removeClass();
    $("#CrntMode").addClass("badge badge-warning white");
    $("#CrntMode").text('Mode : Copy');
    $('#PINo_C,#btnprvs,#btnnxt').prop("disabled", false);
    $("#PINo_C").val('');
    $("#PINo_C").focus();

    $('#PINo_A').val(slno);
    var data = {};
    data.SlNo = $('#PINo_A').val();
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Pharmacy/HMS_PurchaseReturnGetandGets",
        data: data,
        success: function (result) {
            formrefresh(1);
            PurchaseGets(result);
            $('#btnnew').focus();

            if (Print == 1) {
                //print
            }
        }
    });
}

function ConfirmboxResult(Result, status, rowid) {


    if (Result == 'true' && status == 'DeleteRow') {
        OKDelete(rowid)
    }
    else if (Result == 'true' && status == 'DeleteCostRow') {
        OKCostDeleterow(rowid);
    }
    else if (Result == 'true' && status == 'CreateNew') {
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'SavePurchase') {
        OKSavePurchase();
    }
    else if (Result == 'true' && status == 'MainEditDisc') {
        EditInvoice(0, 1);
    }
    else if (Result == 'true' && status == 'UpdatePurchase') {
        OKUpdatePurchase();
    }
    else if (Result == 'true' && status == 'DeletePurchase') {
        EditInvoice(1, 0);
    }


    $('#confirm').fadeOut();
}

function Showalerts(Status, no) {
    if (Status == 1) {
        formrefresh(0);
        swal('PR# -' + no + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh(0);
        swal('PR# -' + no + ' ', "Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh(0);
        swal('PR# -' + no + ' ', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        $('#LoadingSmall').hide();
        swal('PR# -' + no + ' Already Exist', "for Previous Purchase", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        $('#LoadingSmall').hide();
        swal('Same PR Invoice Number Already Exists For This Supplier', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}
function FocusNext(e, P_Col, C_Col, N_Col, RowId, TR) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key == 39 && N_Col != '') {              // Right Arrow and Left Arrow
        e.preventDefault();

        $("#" + N_Col + RowId).focus().select();
    }
    else if (key == 37 && P_Col != '') {              // Right Arrow and Left Arrow
        e.preventDefault();

        $("#" + P_Col + RowId).focus().select();
    }

    else if (key == 40 && RowId != 0 && C_Col != '')          // Down Arrow
    {
        e.preventDefault();
        var Rid;

        try { Rid = ($('#' + TR + RowId).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; }
        catch (err) { Rid = RowId; }

        $("#" + C_Col + Rid).focus().select();



    }
    else if (key == 38 && RowId != 0 && C_Col != '') {           // Up Arrow
        e.preventDefault();
        var Rid;

        try { Rid = ($('#' + TR + RowId).closest('tr').prev('tr').attr('id')).match(/\d+/)[0]; }
        catch (err) { Rid = RowId; }

        $("#" + C_Col + Rid).focus().select();

    }
}

function SearchSupplierInvoice() {
    if ($('#SupplierId').val() != 0 && $.trim($("#PINo_S").val()) != '') {
        if (CopyFlag == 0) {

            var data = {};
            data.InvoNo = $.trim($('#PINo_S').val());
            data.SupplierId = $('#SupplierId').val();
            $.ajax({
                type: "POST",
                url: "../Purchase/SupplierInvoiceNoSearch",
                data: data,
                success: function (result) {

                    var status = result[0].Flag
                    if (status == 1) {
                        warningshow('Same Invoice Number Already Exists For This Supplier ', 'PINo_S');
                        $('.smallTextbox,.jsgrid-button,.btn,.billdisc').prop('disabled', true);
                        $("#Supplier,#PINo_S,#btnnew").prop('disabled', false);
                        $("#PINo_S").focus();
                    }
                    else if (status == 0) {

                        $('.smallTextbox,.jsgrid-button,.btn,.billdisc').prop('disabled', false);
                        $('.dedisa').prop('disabled', true);

                    }
                }
            });

        }
        else {
            if ($('#SupplierId').val() != DefaultSupplier || $.trim($('#PINo_S').val()) != DefaultInvo) {

                var data = {};
                data.InvoNo = $.trim($('#PINo_S').val());
                data.SupplierId = $('#SupplierId').val();
                $.ajax({
                    type: "POST",
                    url: "../Purchase/SupplierInvoiceNoSearch",
                    data: data,
                    success: function (result) {

                        var status = result[0].Flag

                        if (status == 1) {
                            warningshow('Same Invoice Number Already Exists For This Supplier ', 'PINo_S');
                            $('.smallTextbox,.jsgrid-button,.btn').prop('disabled', true);
                            $("#Supplier,#PINo_S").prop('disabled', false);
                        }
                        else if (status == 0) {

                            $('.smallTextbox,.jsgrid-button,.btn').prop('disabled', false);
                            $('.dedisa').prop('disabled', true);
                        }
                    }
                });
            }

        }
    }
}


//Numeric Only Text Boxes with Decimal Point

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

//Numeric Only Text Boxes without Decimal Point

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

function isNumberDate(evt, selectedvalue) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\./]/g, ''));
    if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}
function ExpiryDate(Id) {

    var Expiry = $("#" + Id).val();
    var NewExpiry = '';
    var Year = '/20';

    if (Expiry.length >= 2) {

        if (Expiry.length < 8) {

            if (parseInt(Expiry.substring(0, 2) || 0) > 12 || parseInt(Expiry.substring(0, 2) || 0) == 0) {
                $("#" + Id).val('');
                console.log('a')
            }
            else if (Expiry.length == 2) {
                NewExpiry = Expiry + Year;
                $("#" + Id).val(NewExpiry);
                console.log('b')
            }

        }
        else {
            NewExpiry = Expiry.substring(0, 7);
            $("#" + Id).val(NewExpiry);
            console.log('c')
        }
    }
    else if (Expiry.length == 1) {
        if (Expiry != '0' && Expiry != '1') {
            NewExpiry = '0' + Expiry + Year;
            $("#" + Id).val(NewExpiry);
        }
        //else if (Expiry == '1') {
        //    NewExpiry = Expiry + '2' + Year;
        //    $("#" + Id).val(NewExpiry);
        //}
    }
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

function GetFirstDayMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    var month = firstDay.getMonth() + 1;
    var day = firstDay.getDate();
    var year = firstDay.getFullYear();

    if (day < 10)
        day = '0' + day
    if (month < 10)
        month = '0' + month

    return day + "/" + month + "/" + year;
}


function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" class="form-control smallTextbox"  style="width:100%"  placeholder="' + title + '"/>')

    });


    var table = null;

    if (tablename == 'tbl_PIViewList') {

        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "autoWidth": false,
            "columnDefs": [
                            { "width": "40%", "targets": 3 },
            ],
            "order": [],
            "pageLength": -1,

        });
    }
    else if (Type == 'MultiplePurchaseT') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                            { "width": "10%", "targets": 0 },
                            { "width": "15%", "targets": 2 },
            ],
            orderCellsTop: true,
            "order": [],
            autoWidth: false
        });

    }
    else if (Type == 'MultipleSalesT') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                            { "width": "8%", "targets": 0 },
                            { "width": "8%", "targets": 1 },
                            { "width": "6%", "targets": 3 },
                            { "width": "7%", "targets": 4 },
                            { "width": "10%", "targets": 5 },
                            { "width": "20%", "targets": 6 },
                            { "width": "12%", "targets": 7 },
            ],
            orderCellsTop: true,
            "order": [],
        });


    }
    else if (Type == 'MultipleAllTransaction') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "6%", "targets": 0 },
                { "width": "6%", "targets": 1 },
                { "width": "5%", "targets": 2 },
                { "width": "30%", "targets": 3 },
                { "width": "5%", "targets": 4 },

            ],
            orderCellsTop: true,
            "order": [],
            autoWidth: false
        });

    }
    else if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,

        });

    }
    else {
        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "order": [],
            "pageLength": -1
        });
    }

    table.columns().every(function (index) {
        $('#' + tablename + ' thead tr:eq(1) th:eq(' + index + ') input').on('keyup change', function () {
            table.column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });
    });
}


function disable_datatable(tablename) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        return;
    }
}

function CustPrdctLoad(result) {
    $("#tblproductdetails tr").remove();

    if (!($('.modalProduct').is(':visible'))) {
        $('#productpdiv').modal("show");
        $("#productpdiv").appendTo("body");
        $('.modal-backdrop').removeClass("modal-backdrop");
    }

    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "LSP";
        }
        else {
            custstat = "LSP";
        }

        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");

        var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
           "<td style='border:none;font-weight:500;color:yellow' class='text-left'><b>" + $("#Product_0").val() + "</b></td>" +
           "<td class='white font-weight-bold' style='border:none;font-weight:500' class='text-left'>" +
           "<table width='100%'>" +
           "<tr>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>C : </b>" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>LP : </b>" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>" + custstat + " : </b>" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>Stock : </b>" + (result[n].Sumtotqty || 0) + "</td>" +
           "<td style='border:none;font-weight:500'><button type='button' class='btn btn-primary btn-sm m-0' onclick='PopUpClose(4)'><i class='fa fa-close'></i></button></td>" +
           "</tr>" +
           "</table>" +
           "</td>" +
           "</tr>" +
           "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";


        $('#tblproductdetails').append(ProdRow);
        $('#tbllocqty').attr('border', '1');
        $('#tbllocqty').attr('bordercolor', 'white');

    }

}

function LastPurchaseTransactions() {

    CloseAllMainPopups();
    DivHideShow(0);
    var Type = 0;
    if ($('#select_status').prop("checked") == true)
        var Type = 1;

    if ($('#ProductId_0').val() != 0) {

        var data = {};   //array
        data.ItemId = $('#ProductId_0').val();
        data.DepartmentId = ERPDeptId;
        data.UserId = ERPUserId;
        data.Type = Type;

        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseTransactionSearch",
            data: data,
            success: function (result) {


                disable_datatable('tblpurchasetrans');

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency</th><th>Department</th><th>PO_Ref</th></tr>" +
                      "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency </th><th>Department</th><th>PO_Ref</th></tr></thead><tbody>";
                var Qty = 0;

                for (var p = 0; p < result.length; p++) {
                    Z = p + 1;
                    var a = (result[p].Rate + result[p].OtherCost).toFixed(Decimal);
                    var lpotr = '';
                    if (result[p].LPO != '0')
                        lpotr = result[p].LPO;

                    if (result[p].PurchaseType == 'Local' || SuppDetailsRight == 'Yes') {
                        ProdRow = ProdRow + "<tr  id='pid_" + Z + "'>" +
                            "<td>" + result[p].InvoNo + "</td>" +
                            "<td>" + result[p].InvoDate + "</td>" +
                            "<td>" + result[p].SupplierName + "</td>" +
                            "<td>" + result[p].AccName + "</td>" +
                            "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                            "<td style='text-align:right'>" + a + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                            "<td>" + result[p].Locnname + "</td>" +
                            "<td>" + result[p].CurrencyName + "</td>" +
                            "<td>" + result[p].DeptName + "</td>" +
                            "<td>" + lpotr + "</td>" +

                            "</tr>";
                    }
                    else {
                        ProdRow = ProdRow + "<tr  id='pid_" + Z + "'>" +
                            "<td>" + result[p].InvoNo + "</td>" +
                            "<td>" + result[p].InvoDate + "</td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                            "<td style='text-align:right'>" + a + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                            "<td>" + result[p].Locnname + "</td>" +
                            "<td>" + result[p].CurrencyName + "</td>" +
                            "<td>" + result[p].DeptName + "</td>" +
                            "<td>" + lpotr + "</td>" +

                            "</tr>";
                    }

                    Qty = Qty + result[p].Quantity;

                }

                $("#totalnopurchase").text(result.length);
                $("#totalnopurchaseqty").text(Qty);

                $('#tblpurchasetrans').html(ProdRow + "</tbody>");

                datatableWithsearch('tblpurchasetrans', 'MultiplePurchaseT');

            }
        });
    }
}


function LastSalesTransactions() {

    CloseAllMainPopups();
    DivHideShow(1);

    var Type = 0;
    if ($('#select_status_sales').prop("checked") == true)
        var Type = 1;

    if ($('#ProductId_0').val() != 0) {
        var data = {};   //array
        data.ProductId = $('#ProductId_0').val();
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;
        data.type = Type;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesTransGetandGets",
            data: data,
            success: function (result) {
                SalesTransLoad(result);
            }
        });
    }

}

function SalesTransLoad(result) {

    disable_datatable('tblsalestrans');


    var ProdRow = "<thead><tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr>" +
                             "<tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr></thead><tbody>";

    var Qty = 0;
    for (var n = 0; n < result.length; n++) {

        ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                       "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
                       "<td class='text-left'>" + result[n].InvDate + "</td>" +
                       "<td style='' class='text-left'>" + result[n].CustName + "</td>" +
                       "<td style='' class='text-right'>" + result[n].ProdQty + "</td>" +
                       "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
                       "<td class='text-left'>" + result[n].Location + " </td>" +
                       "<td class='text-left' style=''>" + result[n].SalesMan + " </td>" +
                       "<td class='text-left'>" + result[n].DepartmentName + "</td>" +
                        "</tr>";
        Qty = Qty + result[n].Quantity;
    }
    $('#tblsalestrans').html(ProdRow + "</tbody>");

    $("#totalnosales").text(result.length);
    $("#totalnosalesqty").text(Qty);

    datatableWithsearch('tblsalestrans', 'MultipleSalesT');
}


function AllTransaction() {
    if ($('#ProductId_0').val() != 0) {

        CloseAllMainPopups();
        DivHideShow(2);

        var Type = 0;
        if ($('#select_status_PREV').prop("checked"))
            var Type = 1;

        var data = {};
        data.ItemId = $('#ProductId_0').val();
        data.UserId = ERPUserId;
        data.DepartmentId = ERPDeptId;
        data.Type = Type;
        $.ajax({
            type: "POST",
            url: "../Purchase/TransactionSearch",
            data: data,
            success: function (result) {
                if (result.length > 0) {
                    disable_datatable('tblalltrans');

                    var BalQty = parseInt(result[0].OpeningQty);


                    var responseText = "<thead><tr><th>Bill#</th><th>Date</th><th>Type</th><th>Supplier</th><th>Status</th><th>Account</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th></tr>" +
                                  "<tr><th>Bill Number</th><th> Date</th><th>TransType</th><th>Supplier</th><th>Status</th><th>Account</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th></tr></thead><tbody>";


                    for (var n = 0; n < result.length; n++) {

                        if (result[n].Status == 'IN') {
                            BalQty += parseInt(result[n].Quantity)
                        }
                        else {
                            BalQty = BalQty - parseInt(result[n].Quantity)
                        }


                        responseText += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                       "<td >" + result[n].BillNo + "  </td>" +
                       "<td > " + result[n].InvoDate + "</td>" +
                       "<td  class='text-center'>" + result[n].TransType + " </td>" +
                       "<td >" + result[n].Salesman + " </td>" +
                       "<td >" + result[n].Status + "  </td>" +
                       "<td >" + result[n].AccountName + " </td>" +
                       //"<td >" + result[n].Remarks + "  </td>" +
                       "<td class='text-center'>" + result[n].Quantity + " </td>" +
                       "<td class='text-center'>" + BalQty + "  </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].Cost || 0).toFixed(Decimal) + "   </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].TransPrice || 0).toFixed(Decimal) + " </td>" +
                       "<td >" + result[n].Locnname + " </td>" +
                       "<td >" + result[n].DeptName + "  </td>" +
                       //"<td >" + result[n].JobCode + " </td>" +
                       "</tr>";

                    }

                    $('#tblalltrans').html(responseText + '</tbody>');
                    datatableWithsearch('tblalltrans', 'MultipleAllTransaction');
                }
                else {

                    disable_datatable('tblalltrans');
                    var responseText = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr>" +
                                 "<tr><th>Bill Number</th><th> Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr></thead><tbody>";
                    $('#tblalltrans').html(responseText + '</tbody>');
                    datatableWithsearch('tblalltrans', 'Single');

                }
            }

        });
    }
}

function DivHideShow(Flag) {
    if (Flag == 0)     // Last Purchase Transaction
    {
        $("#PurchaseTrans,#PurchaseStatusDiv").show();
        $("#SalesTrans,#SalesStatusDiv,#AllTrans,#AllStatusDiv").hide();
        $("#PurchaseTransactionheader").html('<span style="color:red;">' + ($('#Product_0').val() + '</span> : Last Purchase Transactions'));
    }
    else if (Flag == 1)     // Last Sales Transaction
    {
        $("#SalesTrans,#SalesStatusDiv").show();
        $("#PurchaseTrans,#PurchaseStatusDiv,#AllTrans,#AllStatusDiv").hide();
        $("#PurchaseTransactionheader").html('<span style="color:red;">' + ($('#Product_0').val() + '</span> : Last Sales Transactions'));
    }
    else if (Flag == 2)     // All Transaction
    {
        $("#AllTrans,#AllStatusDiv").show();
        $("#PurchaseTrans,#PurchaseStatusDiv,#SalesTrans,#SalesStatusDiv").hide();
        $("#PurchaseTransactionheader").html('<span style="color:red;">' + ($('#Product_0').val() + '</span> : All Transactions'));
    }
    if (!($('#PurchaseTransactionPopup').is(':visible'))) {
        $("#PurchaseTransactionPopup").modal("show");
        $("#PurchaseTransactionPopup").appendTo("body");
    }
}


$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();

    var X = event.keyCode;

    if ((X > 111 && X < 124)) {
        if (X == 118) {                         // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            LastSalesTransactions();
        }
        else if (X == 119) {                    // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
            LastPurchaseTransactions();
        }
        else if (X == 120) {                     // F9 :   All Transaction details Popup      
            AllTransaction();
        }

        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }
    else if (X == 27) {                         //ESC       :   Popup Close

        CloseAllMainPopups();
        $("#PurchaseTransactionPopup").modal("hide");
    }

});


function CloseAllMainPopups() {
    $("#TaxSpliPopup").modal("hide");
    $("#PurchaseView").modal("hide");
    $("#productpdiv").modal("hide");
}

function GetTrans() {
    if (CopyFlag == 1) {
        $("#CmnVoucherNo").val($("#PINo_A").val());
        $("#CmnPref0").val("PR");
        $("#CmnPref1").val("");
        $("#CmnPref2").val("");
        $("#CmnPref3").val("");
        $("#CmnDeptId").val(ERPDeptId);
        $("#CmnUserId").val(ERPUserId);
        $("#CmnCondition").val("");
        CmnAccTransGet();
    }
}
