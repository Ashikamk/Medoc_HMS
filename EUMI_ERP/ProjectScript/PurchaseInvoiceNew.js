var EditFlag = 0; var CurrencySelect = ''; var FlagCostEdit = 0; var BillDiscountFlag = 0; var CopyFlag = 0; var MainEditFlag = 0; var BaseCurrency = 0; var NextInvoiceNo = 0; var DefaultSupplier = 0; var DefaultInvo = '';
var OtherCostFlag = 0;
$(document).ready(function () {

    if ((usermenu1.indexOf("M224") != -1)) {
        $("#upload,#fileUpload").show();

    }

    Defaultfocus();
    Serialnoload();
    GetCurrency();
    GetLocation();
    GetTax();
    GetTempPurchase();

    if (CessType == 1) { $("#CessCheck").prop("checked", false); }
    else { $("#CessCheck").prop("checked", false); }


    $('#Othercostpopup').on('shown.bs.modal', function () {
        if (FlagCostEdit != 0) {
            warningshow('Row Details are not Complete', 'accdesc_' + FlagCostEdit);

        }
        else if (OtherCostFlag == 1) {
            warningshow('Other Cost Not Saved', 'btnothercostsave');
        }
        else {
            $('#acctype').focus();
        }
    })

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
            e.preventDefault();
            $("#Expiry_0").focus().select();

        }
    });
    $('#Expiry_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#Pack_0").focus().select();

        }
    });
    $('#Pack_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#Qty_0").focus().select();

        }
    });
    $('#Qty_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#Free_0").focus().select();

        }
    });

    $('#Free_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#Surate_0").focus().select();

        }
    });


    $('#Surate_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#Rate_0").focus().select();

        }
    });









    $('#Rate_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#MRP_0").focus().select();

        }
    });
    $('#DiscountPer_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#SR_0").focus().select();

        }
    });

    $('#Discount_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#MRP_0").focus().select();

        }
    });


    //$('#MRP_0').keydown(function (e) {
    //    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //    if (key == 13) {
    //        e.preventDefault();
    //        $("#SR_0").focus().select();

    //    }
    //});


    $('#MRP_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#SR_0").focus().select();

        }
    });


    $('#SR_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnadd").focus();

        }
    });
    $('#Margin_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#SR_0").focus().select();;

        }
    });
    $('#acctype').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#account").focus().select();

        }
    });


    $('#PharmaPIDate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#Supplier").focus().select();

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
            if (!$(this).is('button') && $(this).attr('name') != 'NoEnterFlow') {
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

    $("#btntempsave").click(function () {
        TempSave(1);
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
    $("#ViewFiles").click(function () {
        ViewSavedFiles();
    });

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

                $('#PINo_A').val(result.oList[0].PurSlno);
                NextInvoiceNo = result.oList[0].PurSlno;
                $('#ImpTax').val(result.oList[0].ImportPurTax);
                $('#accountdescription').val('Other Cost Against Purchase InvNo: ' + result.oList[0].PurSlno);
                NextInvoiceNo = parseInt(result.oList[0].PurSlno || 0);

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

            "<td class='text-center taxsplithead' id='TaxSplitHeadTd_" + result[i].TaxId + "'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + result[i].TaxId + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +

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
        $("#purchaseinv,#btnsubmit,#btntempsave").show();
        $("#PINo_A").prop("disabled", true);

        if ((usermenu1.indexOf("M224") != -1)) {
            $("#upload,#fileUpload").show();

        }
        else {
            $("#upload,#fileUpload").hide();
        }
    }
    $("#btnedit,#btndelete,#btnsaveedit,#btnprint,#ViewFiles,#btnExport,#btnacctran").hide();
    $('.dezero').val(0);
    if (CessType == 1) { $("#CessCheck").prop("checked", false); }
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
    $("#Tbl_Purchase tr,#tblOtherCost tr").remove();

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
    DefaultSupplier = 0; DefaultInvo = '';
    $(".taxsplithead").removeClass('bg-secondary white');
}

function ClearProductRow(Flag) {

    $('#Surate_0').val('')
    $("#ProductId_0").val(0);
    $("#Batch_0").val('');
    $("#Expiry_0").val('');
    $("#Pack_0").val('');
    $("#Qty_0").val('');
    $("#Loose_0").val('');
    $("#Free_0").val('');
    $("#Rate_0").val('');
    $("#TaxId_0").val(0);
    $("#TaxRate_0").val(0);
    $("#SR_0").val('');
    $("#Discount_0").val('');
    $("#DiscountPer_0").val('');
    $("#MRP_0").val('');
    $("#Cess_0").val(0);
    $("#Margin_0").val('');
    if (Flag == 1) {
        $("#Product_0").val('');
        $("#Product_0").focus();
    }
    PopUpClose(4);
}

function ProductAdd() {


    var name = ($('#Product_0').val()).substring(0, 2);

    //alert(name)
    if (parseInt($("#ProductId_0").val() || 0) == 0) {
        warningshow('Select Medicine', 'Product_0');
        return false;
    }
    else if ($.trim($("#Batch_0").val()) == '') {
        warningshow('Enter Batch', 'Batch_0');
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
    else if (parseFloat($("#Rate_0").val() || 0) == 0 && name != 'S-') {
        warningshow('Enter Purchase Rate', 'Rate_0');
        return false;
    }

    else if (parseInt($("#TaxId_0").val() || 0) == 0) {
        warningshow('Select Tax', 'TaxId_0');
        return false;
    }
    else if (parseFloat($("#SR_0").val() || 0) == 0 && name != 'S-') {
        warningshow('Enter Selling Rate', 'SR_0');
        return false;
    }
    else if (parseFloat($("#SR_0").val() || 0) < parseFloat($("#Rate_0").val() || 0)) {
        warningshow('Selling Rate cannot be less than Purchase Rate', 'SR_0');
        return false;
    }
    else if (parseFloat($("#MRP_0").val() || 0) == 0 && name != 'S-') {
        warningshow('Enter MRP', 'MRP_0');
        return false;
    }
    else if (parseFloat($("#MRP_0").val() || 0) < parseFloat($("#Rate_0").val() || 0)) {
        warningshow('MRP cannot be less than Purchase Rate', 'MRP_0');
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
        '<td width="5%"><input id="Batch_' + Id + '" value="' + $.trim($("#Batch_0").val()) + '" class="form-control smallTextbox borderno" onkeydown="FocusNext(event, \'\', \'Batch_\', \'Expiry_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Expiry_' + Id + '" value="' + $.trim($("#Expiry_0").val()) + '" class="form-control text-center smallTextbox borderno"  onkeypress="isNumberDate(event, this)" onkeyup="ExpiryDate(\'Expiry_' + Id + '\')" onkeydown="FocusNext(event, \'Batch_\', \'Expiry_\', \'Pack_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Pack_' + Id + '" value="' + parseInt($("#Pack_0").val() || 0) + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Expiry_\', \'Pack_\', \'Qty_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Qty_' + Id + '" value="' + parseInt($("#Qty_0").val() || 0) + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Pack_\', \'Qty_\', \'Free_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Free_' + Id + '" value="' + parseInt($("#Free_0").val() || 0) + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Qty_\', \'Free_\', \'Loose_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Loose_' + Id + '" value="' + parseInt($("#Loose_0").val() || 0) + '" class="form-control text-center smallTextbox borderno" onkeypress="isNumberInt(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Free_\', \'Loose_\', \'Rate_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Rate_' + Id + '" value="' + parseFloat($("#Rate_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Loose_\', \'Rate_\', \'TaxId_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><select id="TaxId_' + Id + '" class="form-control smallTextbox borderno" onchange="CalcAmt(),ResetBillDiscount()" onkeydown="FocusNext(event, \'Rate_\', \'TaxId_\', \'DiscountPer_\', ' + Id + ',\'MTr_\')">' + TaxSelect + '</select></td>' +
        '<td width="5%"><input id="DiscountPer_' + Id + '" value="' + parseFloat($("#DiscountPer_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcDiscRow(' + Id + ',1,1)" onkeydown="FocusNext(event, \'TaxId_\', \'DiscountPer_\', \'Discount_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="Discount_' + Id + '" value="' + parseFloat($("#Discount_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeyup="CalcDiscRow(' + Id + ',0,1)" onkeydown="FocusNext(event, \'DiscountPer_\', \'Discount_\', \'SR_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="SR_' + Id + '" value="' + parseFloat($("#SR_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'Discount_\', \'SR_\', \'MRP_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="MRP_' + Id + '" value="' + parseFloat($("#MRP_0").val() || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'SR_\', \'MRP_\', \'Margin_\', ' + Id + ',\'MTr_\')" /></td>' +
        '<td width="5%"><input id="TQty_' + Id + '" value="0" class="form-control text-center smallTextbox borderno dedisa bg-white" disabled /></td>' +
        '<td width="5%"><input id="TLQty_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="FCTaxable_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="FCTax_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="FCAmt_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="Margin_' + Id + '" value="0" class="form-control text-center smallTextbox borderno" onkeyup="CalcSellingPriceWithMargin(' + Id + ')" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'MRP_\', \'Margin_\', \'\', ' + Id + ',\'MTr_\')"   /></td>' +
        '<td width="5%"><input id="CessAmount_' + Id + '" value="' + parseFloat(0).toFixed(Decimal) + '" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%"><input id="OtherCost_' + Id + '" value="' + parseFloat($('#Surate_0').val()||0).toFixed(Decimal) + '" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
        '<td width="5%" style="display:none;">' +

        '<input id="ProductId_' + Id + '" value="' + $("#ProductId_0").val() + '" />' +
        '<input id="TaxRate_' + Id + '" value="' + $("#TaxRate_0").val() + '" />' +

        '<input id="BaseDiscount_' + Id + '" value="0" />' +
        '<input id="BaseTaxable_' + Id + '" value="0" />' +
        '<input id="BaseTax_' + Id + '" value="0" />' +
        '<input id="BaseAmt_' + Id + '" value="0" />' +
        '<input id="Cess_' + Id + '" value="' + $("#Cess_0").val() + '" />' +
        '<input id="BaseCessAmount_' + Id + '" value="0" />' +
        '<input id="BatchSlNo_' + Id + '" value="0" />' +
        '</td>' +
        '</tr>';

    $("#Tbl_Purchase").append(ProductRow);

    $('#TaxId_' + Id).val($('#TaxId_0').val())
    $("#TaxRate_" + Id).val($('#TaxId_' + Id).find("option:selected").attr("name"));
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    $("#GridLength").val(Id);
    ClearProductRow(1);

    CalcAmt();
    ResetBillDiscount();

    OKTempSave(0);
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
        OKTempSave(0);
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
    //CalcOtherCost();
}

function ResetBillDiscount() {
    $('#disc,#Discountpercent').val('0.00');
    $('#otrcost').val('0.00');
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
                CalcOtherCost();
            }
        }
    }
    else {
        $('#Discount_' + Id).val(parseFloat(0).toFixed(Decimal));
        $('#DiscountPer_' + Id).val(parseFloat(0).toFixed(Decimal));
    }
}

function CalcSellingPriceWithMargin(Id) {
    var Rate = parseFloat($("#Rate_" + Id).val() || 0).toFixed(Decimal);
    var Margin = parseFloat($("#Margin_" + Id).val() || 0).toFixed(Decimal);
    var SellingRate = parseFloat(Rate * (1 + (Margin / 100))).toFixed(Decimal);

    $("#SR_" + Id).val(SellingRate);
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
    var SellingRate = parseFloat($("#SR_" + Id).val() || 0).toFixed(Decimal);

    if ($("#CessCheck").prop("checked") == true) {
        var CessPer = 0;// parseFloat($("#Cess_" + Id).val() || 0);
    }
    else {
        var CessPer = 0;
    }

    //if (Discount > 0) { BillDiscountFlag = 1; $(".billdisc").prop("disabled", true); $(".billdisc").val("0.00") }

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

    var Margin = (((100 * SellingRate) / Rate) - 100).toFixed(Decimal);


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
    if (Rate != 0)
        $("#Margin_" + Id).val(Number(Margin).toFixed(Decimal));
    else
        $("#Margin_" + Id).val('');
}

function CalcTotal() {

    var GridLength = $("#GridLength").val();

    $(".distxtbox").val(parseFloat(0).toFixed(Decimal));
    $(".taxsplithead").removeClass('bg-secondary white');


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
            var TaxId = $("#TaxId_" + i).val();

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

            $("#TaxSplitHeadTd_" + TaxId).addClass('bg-secondary white');
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
function TempPurchaseShow() {
    $("#TempPurchasePopup").modal("show");
    $("#TempPurchasePopup").appendTo("body");
}

function PopUpClose(Flag) {
    if (Flag == 1)
        $("#TaxSpliPopup").modal("hide");
    else if (Flag == 2)
        $("#TempPurchasePopup").modal("hide");
    else if (Flag == 3)
        $("#PurchaseView").modal("hide");
    else if (Flag == 4)
        $("#productpdiv").modal("hide");
    else if (Flag == 5)
        $("#PurchaseTransactionPopup").modal("hide");
    else if (Flag == 6)
        $("#PurchaseDocument").modal("hide");
}

function OtherCostPopUp() {
    $("#Othercostpopup").modal("show");
    $("#Othercostpopup").appendTo("body");
    $('#OtherCostheader').text('Other Cost');

}

function OtherCostAdd() {

    CalcFCCost();

    var a = parseFloat($('#CostCurrRate').val());
    var c = parseFloat($('#costamount').val());
    $("#CostCurrRate").val(isNaN(a) ? '0.00' : a);
    $('#costamount').val(isNaN(c) ? '0.00' : c.toFixed(Decimal));


    if ($.trim($('#account').val()) == "") {
        warningshow('Please Enter Account', 'account');
        return false;
    }
    else if ($.trim($('#accid').val()) == 0) {
        warningshow('Please Enter Valid Account', 'account');
        return false;
    }
    else if ($.trim($('#accid').val()) == 0) {
        warningshow('Please Enter Valid Account', 'account');
        return false;
    }
    else if ($.trim($('#CostCurrRate').val()) == "" || $.trim($('#CostCurrRate').val()) == 0) {
        warningshow('Please Enter CurrencyRate', 'CostCurrRate');
        $('#CostCurrRate').select();
        return false;
    }
    else if (parseFloat($('#costamount').val()) == 0 || parseFloat($('#BaseCost').val() == 0)) {
        warningshow('Please Enter Amount', 'costamount');
        $('#costamount').select();
        return false;
    }
    else {



        if ($('#acctype').val() == 'C') {
            $('#creditamount').val($('#costamount').val())
            $('#BaseCredit').val($('#BaseCost').val())
            $('#debitamount').val(0)
            $('#BaseDebit').val(0)


        }
        else {
            $('#debitamount').val($("#costamount").val())
            $('#BaseDebit').val($('#BaseCost').val())
            $('#creditamount').val(0)
            $('#BaseCredit').val(0)

        }
        if ($("#tblOtherCost tr").length == 0) { $("#CostGridLength").val(0); }
        var no = $('#tblOtherCost tr').length + 1;
        var tid = parseInt(Number($("#CostGridLength").val()) + 1);

        var OtherCostRow = '<tr class="jsgrid-row" id="costrow_' + tid + '" onfocusin="CostEditrow(' + tid + ')" onfocusout="CostUpdaterow(' + tid + ')">' +
            '<td style="width:2%" id="costtd_' + tid + '" align="center">' + no + '</td>' +
            '<td style="width:10%">' +
            '<input id="acc_' + tid + '" value="' + $.trim($("#account").val()) + '" class="form-control smallTextbox borderno" onkeyup="AccountAutoComplete(' + tid + ')"   />' +
            '</td>' +
            '<td style="width:15%">' +
            '<input type="text" id="accdesc_' + tid + '" class="form-control smallTextbox borderno" value="' + $("#accountdescription").val() + '"  onkeydown="FocusNext(event, \'\', \'accdesc_\', \'CostCurr_\', ' + tid + ',\'costrow_\')" />' +
            '</td>' +
            '<td style="width:6%">' +
            '<select id="CostCurr_' + tid + '" class="form-control smallTextbox borderno" onchange="CostCurrencyChange(' + tid + ')" onkeydown="FocusNext(event, \'accdesc_\', \'CostCurr_\', \'CostCurrRate_\', ' + tid + ',\'costrow_\')" >"'
            + CurrencySelect + '"</select>' +
            '</td>' +
            '<td style="width:6%">' +
            '<input type="text" id="CostCurrRate_' + tid + '" onkeypress="isNumber(event,this)"  class="form-control text-right smallTextbox borderno" value="' + parseFloat($("#CostCurrRate").val() || 0) + '"  onkeydown="FocusNext(event, \'CostCurr_\', \'CostCurrRate_\', \'acctype_\', ' + tid + ',\'costrow_\')" />' +
            '</td>' +
            '<td style="width:6%">' +
            '<select id="acctype_' + tid + '" class="form-control smallTextbox borderno"   onkeydown="FocusNext(event, \'CostCurrRate_\', \'acctype_\', \'CreditAmount_\', ' + tid + ',\'costrow_\')" ><option value="C">Credit</option><option value="D">Debit</option></select>' +
            '</td>' +
            '<td style="width:6%">' +
            '<input type="text" id="CreditAmount_' + tid + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event,this)" onkeyup="CalcFCCostGrid(' + tid + ')" value="' + parseFloat($("#creditamount").val() || 0).toFixed(Decimal) + '"   onkeydown="FocusNext(event, \'acctype_\', \'CreditAmount_\', \'DebitAmount_\', ' + tid + ',\'costrow_\')" />' +
            '</td>' +
            '<td style="width:6%">' +
            '<input type="text" id="DebitAmount_' + tid + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event,this)" onkeyup="CalcFCCostGrid(' + tid + ')"  value="' + parseFloat($("#debitamount").val() || 0).toFixed(Decimal) + '" onkeydown="FocusNext(event, \'CreditAmount_\', \'DebitAmount_\', \'\', ' + tid + ',\'costrow_\')"  />' +
            '</td>' +
            '<td style="width:6%">' +
            '<input type="text" id="BaseList_' + tid + '" class="form-control text-right bg-white smallTextbox dedisa borderno" disabled value="' + parseFloat($("#BaseCost").val() || 0).toFixed(Decimal) + '">' +
            '</td>' +
            '<td style="width:2%" align="center">' +
            '<input class="jsgrid-button jsgrid-delete-button"  type="button" onclick="CostDeleterow(' + tid + ')"  title=Delete >' +
            '</td>' +
            '<td style="display:none">' +
            '<input type="text" id="costsl_' + tid + '" value="0">' +
            '<input type="text" id="accid_' + tid + '" value="' + $('#accid').val() + '">' +
            '<input type="text" id="BaseCredit_' + tid + '" value="' + parseFloat($("#BaseCredit").val() || 0).toFixed(Decimal) + '">' +
            '<input type="text" id="BaseDebit_' + tid + '" value="' + parseFloat($("#BaseDebit").val() || 0).toFixed(Decimal) + '">' +
            '</td>' +
            '</tr>';


        $('#tblOtherCost').append(OtherCostRow);

        $("#CostGridLength").val(tid);

        $('#acctype_' + tid).val($('#acctype').val());
        $('#CostCurr_' + tid).val($('#CostCurrency').val());
        ClearCostRow($('#accountdescription').val());

        CalcCreditandDebit();
        //$('#CostCurrency').prop("disabled", true);
        //$('#CostCurrRate').prop("disabled", true);

        $('#OthreCostdiv').animate({ scrollTop: 5000 }, 900);


        $('#acc_' + tid).prop("disabled", false);
        $('#accdesc_' + tid).prop("disabled", false);
        $('#CostCurr_' + tid).prop("disabled", false);
        $('#CostCurrRate_' + tid).prop("disabled", false);
        $('#acctype_' + tid).prop("disabled", false);
        $('#CreditAmount_' + tid).prop("disabled", false);
        $('#DebitAmount_' + tid).prop("disabled", false);
    }
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

//Close Other Cost Popup Function

function CloseOtherCost() {
    $("#Othercostpopup").modal("hide");
}

//SaveOther Cost Popup Function

function SaveOtherCost() {
    var x = $("#CostGridLength").val()
    if ($('#costbasediff').val() != 0) {
        warningshow('Debit Amount and Credit Amount is not Tally');
        return false;
    }
    else if (FlagCostEdit != 0) {
        warningshow('Edit Mode! Please Update');
        return false;
    }
    else {
        if ($('#totcredit').val() != '') {
            $('#otrcost').val($('#totbasecredit').val());
            CalcOtherCost();
            CloseOtherCost();

            for (var s = 1; s <= x; s++) {
                $('#costsl_' + s).val(1);
            }
        }
        else {
            warningshow('No Values Added');
        }
    }

}


//Edit Other Cost Grid Function

function CostEditrow(RowId) {
    $('#costsl_' + RowId).val(0);
    CalcCreditandDebit();
    $('#otrcost').val('0.00');
    CalcOtherCost();
    FlagCostEdit = RowId;
}


function CostCurrencyChange(RowId) {

    $("#CostCurrRate_" + RowId).val($("#CostCurr_" + RowId).find("option:selected").attr("name"));
    CalcFCCostGrid(RowId);
}


function ClearOtherCost(Flag) {
    if ($('#tblOtherCost tr').length != 0) {

        if (Flag == 0) {
            CloseOtherCost();
            $('#confirm').show();
            $('#confirmOk').prop("disabled", false);
            $('#confirmOk').focus();
            $('#Confirmflag').val('ClearOtherCost'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Do you want to Clear Other Cost Details?')

        }
        else {
            $('#tblOtherCost tr').remove();
            $('#otrcost').val('0.00');
            $("#CostGridLength").val(0);
            CalcCreditandDebit();
            ClearCostRow();
            CalcOtherCost();
            CloseOtherCost();
            FlagCostEdit = 0;
        }
    }
    else {
        ClearCostRow();
        CloseOtherCost();
        FlagCostEdit = 0;
    }
}

//Update Other Cost Grid Function

function CostUpdaterow(RowId) {

    var a = parseFloat($('#DebitAmount_' + RowId).val());
    a = isNaN(a) ? 0 : a;
    var b = parseFloat($('#CreditAmount_' + RowId).val());
    b = isNaN(b) ? 0 : b;

    if (parseFloat($('#accid_' + RowId).val()) == 0) {
        warningshow('Select Valid account', 'acc_' + RowId);
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'C' && a != 0) {
        warningshow('Debit Amount Should be 0 For Credit', 'DebitAmount_' + RowId);
        $('#DebitAmount_' + RowId).select();
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'D' && b != 0) {
        warningshow('Credit Amount Should be 0 For Debit', 'CreditAmount_' + RowId);
        $('#CreditAmount_' + RowId).select();
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'C' && (b == 0 || $('#CreditAmount_' + RowId).val() == '')) {
        warningshow('Enter Credit Amount', 'CreditAmount_' + RowId);
        $('#CreditAmount_' + RowId).select();
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'D' && (a == 0 || $('#DebitAmount_' + RowId).val() == '')) {
        warningshow('Enter Debit Amount', 'DebitAmount_' + RowId);
        $('#DebitAmount_' + RowId).select();
        return false;
    }
    else if ($('#CostCurr_' + RowId).val() == 0 || parseFloat($('#CostCurrRate_' + RowId).val() || 0) == 0) {
        warningshow('Select Currency', 'CostCurr_' + RowId);
        return false;
    }
    else {
        FlagCostEdit = 0;
        $('#BaseCredit_' + RowId).val(0);
        $('#BaseDebit_' + RowId).val(0);

        $('#CostUpdaterow_' + RowId).hide();
        $('#CostEditRow_' + RowId).show();


        var creditamt = parseFloat(b);
        $("#CreditAmount_" + RowId).val(creditamt.toFixed(Decimal));
        var debitamt = parseFloat(a);
        $("#DebitAmount_" + RowId).val(debitamt.toFixed(Decimal));
        var currrate = parseFloat($("#CostCurrRate_" + RowId).val() || 0);
        $("#CostCurrRate_" + RowId).val(currrate);

        CalcAmt();
        CalcFCCostGrid(RowId);
        ResetBillDiscount();
    }
}

//Delete Other Cost Grid Function

function CostDeleterow(RowId) {
    CloseOtherCost();
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
    $('#Confirmflag').val('DeleteCostRow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?')

}

function OKCostDeleterow(RowId) {
    OtherCostPopUp();
    var x = $("#CostGridLength").val();

    var slno = 1;
    $('#costrow_' + RowId).remove();

    for (var j = 1; j <= x; j++) {

        if ($('#acc_' + j).val() != undefined) {
            $('#costsl_' + j).val(0);
            $('#costtd_' + j).text(slno);
            slno++;
        }
    }
    $('#acctype').focus();
    CalcCreditandDebit(i);
    $('#otrcost').val('0.00');
    CalcOtherCost();
}

function CalcOtherCost() {
    var GridLength = $("#GridLength").val();
    var quantity = [];
    var rate = [];
    var amt = [];
    var costA = [];
    var costB = [];
    var OtherCost = [];

    var tamount = 0;
    var totalothercost = parseFloat($('#otrcost').val() || 0);

    for (var m = 1; m <= GridLength; m++) {
        if ($('#Product_' + m).val() != undefined) {
            var Pack = parseInt($("#Pack_" + m).val() || 0);
            var Qty = parseInt($("#Qty_" + m).val() || 0);
            var Free = parseInt($("#Free_" + m).val() || 0);
            var Loose = parseInt($("#Loose_" + m).val() || 0);
            var Rate = parseFloat($("#Rate_" + m).val() || 0).toFixed(Decimal);

            var UnitAmount = Rate / Pack;
            var AmtQty = (Qty * Pack) + Loose;

            quantity[m] = parseFloat(AmtQty || 0);
            rate[m] = parseFloat(UnitAmount || 0);
            tamount = tamount + parseFloat(quantity[m] * rate[m]);
        }
    }
    for (var j = 1; j <= GridLength; j++) {
        if ($('#Product_' + j).val() != undefined) {

            var Pack = parseInt($("#Pack_" + j).val() || 0);
            var Qty = parseInt($("#Qty_" + j).val() || 0);
            var Free = parseInt($("#Free_" + j).val() || 0);
            var Loose = parseInt($("#Loose_" + j).val() || 0);
            var Rate = parseFloat($("#Rate_" + j).val() || 0).toFixed(Decimal);

            var UnitAmount = Rate / Pack;
            var AmtQty = (Qty * Pack) + Loose;

            quantity[j] = parseFloat(AmtQty || 0);
            rate[j] = parseFloat(UnitAmount || 0);
            amt[j] = parseFloat(quantity[j] * rate[j]);
            costA[j] = parseFloat(amt[j] / tamount);
            costB[j] = parseFloat(totalothercost * costA[j]);
            OtherCost[j] = parseFloat(costB[j] / quantity[j] || 0);
        }
    }
    for (var f = 1; f <= GridLength; f++) {
        if ($('#Product_' + f).val() != undefined) {
            $('#OtherCost_' + f).val(OtherCost[f].toFixed(Decimal))
        }
    }
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

            $("#ProductId_" + Id).val(0);

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
                            ColCount: '-20ph',
                            label: item.Description,
                            label1: item.Model1,
                            label2: item.Category,


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
                            headers: ["Name", "Company", "Type"]
                        })
                    }));
                }

            })

        },
        autoFocus: true,
        select: function (event, ui) {

            $("#ProductId_" + Id).val(ui.item.ItemId);
            $("#Pack_" + Id).val(1);
            $("#Qty_" + Id).val(1);
            $("#Rate_" + Id).val(ui.item.Rate);
            $("#TaxId_" + Id).val(ui.item.Tax);
            $("#TaxRate_" + Id).val(ui.item.Taxper);
            $("#SR_" + Id).val(ui.item.SellingPrice);
            $("#MRP_" + Id).val(ui.item.MRP);
            $("#Batch_" + Id).focus().select();
            $("#Cess_" + Id).val(ui.item.Cess);
            CalcAmt();
            $('#disc,#Discountpercent').val('0.00');
        },
    });
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
                var CessPer = 0// $("#Cess_" + k).val();
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
                var CessPer = 0;//$("#Cess_" + k).val();
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
    var x = $("#CostGridLength").val();
    OtherCostFlag = 0;
    for (var s = 1; s <= x; s++) {
        if ($('#costsl_' + s).val() == 0) {
            OtherCostFlag = 1;
            break;
        }
        else {
            OtherCostFlag = 0;
            continue;
        }
    }

    if (CopyFlag == 1) {
        warningshow('Purchase In Modify Mode. Cannot Save as New Purchase', '');
        return false;
    }
    else if ($.trim($("#PINo_S").val()) == '') {
        warningshow('Enter Invoice Number', 'PINo_S');
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
    else if (FlagCostEdit != 0 || OtherCostFlag == 1) {
        OtherCostPopUp();
        return false;
    }
    //else if (parseFloat($("#FCAmount").val() || 0) <= 0) {
    //    warningshow('GrandTotal Cannot be Zero', '');
    //    return false;
    //}
    //else if (parseFloat($("#FCInvoiceTotal").val() || 0) <= 0) {
    //    warningshow('Invoice Total Cannot be Zero', 'FCInvoiceTotal');
    //    return false;
    //}
    else if (parseFloat($("#FCInvoiceTotal").val() || 0) != parseFloat($("#FCAmount").val() || 0)) {
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
        $('#Confirmflag').val('SavePurchase'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Difference in Invoice Total and Grand Total.Do you want to Save this Purchase?');
    }
    else {
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
        $('#Confirmflag').val('SavePurchase'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do you want to Save this Purchase?');
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

                'FCRoundOff': 0,
                'RoundOff': parseFloat($('#otrcost').val() || 0),
                'BDFlag': BDFlag,
                'CessFlag': CessFlag,
                'Remarks': $.trim($("#txtnotes").val()),
                'SubId': parseFloat($("#Cess_" + i).val() || 0),
                'ItemId': parseFloat($("#ProductId_" + i).val() || 0),
                'ItemCode': $.trim($("#Product_" + i).val()),
                'ItemDescription': $.trim($("#Product_" + i).val()),
                'LocationId': parseFloat($("#Location").val() || 0),
                'UnitId': 0,
                'BatchSlNo': 0,
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
                'P_OtherCost': parseFloat($("#OtherCost_" + i).val() || 0),
                'DelFlag': 1,
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,
                'IMEINumber': '',
                'PO_No': 0,
                'PO_SubTbl_Id': 0,
                'MRV_No': 0,
                'MRV_SubTbl_Id': 0,
                'Performa_NO': 0,
                'Performa_SubTbl_Id': 0,
                'Variable1': '',
                'Variable2': '',
                'Status': '',
                'Terms': 0,
                'DueDate': '',
                'LPO_No': '',
                'JobNo': 0,
                'Area': 0,
                'ShipDate': '',
                'Flag': $("#TempSlNo").val(),
            });
        }
    }

    if (oArray.length > 0) {


        var data = { 'PharmacyModel': oArray };
        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_PurchaseInsert",
            data: data,
            success: function (result) {

                var status = result.oList[0].Status;
                var no = result.oList[0].SlNo;

                if (status == 1 && $("#tblOtherCost tr").length > 0) {

                    var x = $("#CostGridLength").val()
                    var bArray = new Array();
                    for (var i = 1; i <= x; i++) {
                        var OCId = 0;
                        var SlNo = no;
                        var InvoDate = $("#PharmaPIDate").val();

                        var PayType = $('#acctype_' + i).val();
                        var AccId = $('#accid_' + i).val();
                        var Description = $('#accdesc_' + i).val();
                        var CurrencyId = $('#CostCurr_' + i).val();
                        var CurrencyRate = $('#CostCurrRate_' + i).val();


                        if ($('#acctype_' + i).val() == 'C') {
                            var OCAmount = parseFloat($('#BaseCredit_' + i).val());
                            var OCFCAmount = parseFloat($('#CreditAmount_' + i).val());
                        }
                        else if ($('#acctype_' + i).val() == 'D') {
                            var OCAmount = parseFloat($('#BaseDebit_' + i).val());
                            var OCFCAmount = parseFloat($('#DebitAmount_' + i).val());
                        }
                        var JobCode = 0;
                        var UserId = ERPUserId;
                        var DepartmentId = ERPDeptId;
                        var DelFlag = 1;

                        if (!(typeof AccId == "undefined")) {
                            bArray.push({
                                'OCId': OCId,
                                'SlNo': SlNo,
                                'InvoDate': InvoDate,
                                'PayType': PayType,
                                'AccId': AccId,
                                'Description': Description,
                                'OCAmount': OCAmount,               //BaseCurrency
                                'OCFCAmount': OCFCAmount,           //ForeignCurrency
                                'JobCode': JobCode,
                                'CurrencyId': CurrencyId,
                                'CurrencyRate': CurrencyRate,
                                'UserId': UserId,
                                'DepartmentId': DepartmentId,
                                'DeleteFlag': DelFlag
                            })
                        }
                    }
                    if (bArray != "") {
                        var data = { 'PurchaseInvoiceModel': bArray };
                        $.ajax({
                            type: "POST",
                            url: "../Purchase/OtherCostInsertandUpdate",
                            data: data,
                            success: function (result) {
                                $('#confirmOk,#btnsubmit').prop("disabled", false);
                                $('#LoadingSmall').hide();
                                Showalerts(status, no);
                            }
                        });
                    }
                }
                else {
                    $('#confirmOk,#btnsubmit').prop("disabled", false);
                    $('#LoadingSmall').hide();
                    Showalerts(status, no);
                }
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

function TempSave(Flag) {
    if (CopyFlag == 1) {
        warningshow('Purchase In Modify Mode. Cannot Save as Temporary', '');
        return false;
    }
    else if ($("#Tbl_Purchase tr").length == 0) {
        warningshow('No Products Added', 'Product_0');
        return false;
    }
    else {
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
        $('#Confirmflag').val('TempSave'); $('#ConfirmRowId').val(Flag);
        $('#confirmmessage').text('Do you want Temporary Save this Purchase?');
    }
}

function OKTempSave(Flag) {
    var TempSlno = 0;
    if (Flag == 1) {
        $('#confirmOk,#btntempsave').prop("disabled", true);
        $('#LoadingSmall').show();
        TempSlno = parseInt($("#TempSlNo").val() || 0);

    }
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
                'SlNo': TempSlno,
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
                'FCGST_0': parseFloat($("#CGST_0").val() || 0),
                'FCGST_5': parseFloat($("#CGST_5").val() || 0),
                'FCGST_12': parseFloat($("#CGST_12").val() || 0),
                'FCGST_18': parseFloat($("#CGST_18").val() || 0),
                'FCGST_28': parseFloat($("#CGST_28").val() || 0),
                'FCess': parseFloat($("#FCTotalCess").val() || 0),

                'BilDiscount': parseFloat($("#basedisc").val() || 0),
                'TotalDiscount': parseFloat($("#BaseDiscount").val() || 0),
                'TotalTaxable': parseFloat($("#BaseTaxable").val() || 0),
                'TotalTax': parseFloat($("#BaseTax").val() || 0),
                'BaseTotal': parseFloat($("#BaseAmount").val() || 0),
                'BaseInvoiceTotal': parseFloat($("#BInvoiceTotal").val() || 0),
                'BCGST_0': parseFloat(Number($("#CGST_0").val() || 0) * CurrencyRate).toFixed(Decimal),
                'BCGST_5': parseFloat(Number($("#CGST_5").val() || 0) * CurrencyRate).toFixed(Decimal),
                'BCGST_12': parseFloat(Number($("#CGST_12").val() || 0) * CurrencyRate).toFixed(Decimal),
                'BCGST_18': parseFloat(Number($("#CGST_18").val() || 0) * CurrencyRate).toFixed(Decimal),
                'BCGST_28': parseFloat(Number($("#CGST_28").val() || 0) * CurrencyRate).toFixed(Decimal),
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
                'UnitId': 0,
                'BatchSlNo': Flag,
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
                'P_OtherCost': parseFloat($("#OtherCost_" + i).val() || 0),
                'DelFlag': 1,
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,
                'IMEINumber': '',
                'PO_No': 0,
                'PO_SubTbl_Id': 0,
                'MRV_No': 0,
                'MRV_SubTbl_Id': 0,
                'Performa_NO': 0,
                'Performa_SubTbl_Id': 0,
                'Variable1': '',
                'Variable2': '',
                'Status': '',
                'Terms': 0,
                'DueDate': '',
                'LPO_No': '',
                'JobNo': 0,
                'Area': 0,
                'ShipDate': '',
                'Flag': 0,
            });
        }
    }

    if (oArray.length > 0) {


        var data = { 'PharmacyModel': oArray };
        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_PurchaseInsertTemp",
            data: data,
            success: function (result) {
                if (Flag == 1) {
                    var status = result.oList[0].Status;
                    var no = result.oList[0].SlNo;
                    $('#confirmOk,#btntempsave').prop("disabled", false);
                    $('#LoadingSmall').hide();
                    Showalerts(status, no);
                }
            }
        })
    }
    else {

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
        $("#purchaseinv,#btnsubmit,#btntempsave").hide();
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
            url: "../Pharmacy/HMS_PurchaseGetandGets",
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
    $("#upload,#fileUpload").hide();
    $("#Tbl_Purchase tr").remove();
    if (result.length > 0) {
        DefaultSupplier = result[0].SupplierId; DefaultInvo = result[0].InvoNo;
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
        $("#Location").val(result[0].LocationId);
        $("#FCInvoiceTotal").val(parseFloat(result[0].InvoiceTotal || 0).toFixed(Decimal));

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
                '<td width="5%"><input id="MRP_' + Id + '" value="' + parseFloat(result[i].MRP || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'SR_\', \'MRP_\', \'Margin_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="TQty_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="TLQty_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCTaxable_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCTax_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCAmt_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="Margin_' + Id + '" value="0" class="form-control text-center smallTextbox borderno" onkeyup="CalcSellingPriceWithMargin(' + Id + ')" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'MRP_\', \'Margin_\', \'\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="CessAmount_' + Id + '" value="' + parseFloat(0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="OtherCost_' + Id + '" value="' + parseFloat(result[i].P_OtherCost || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno bg-white" disabled /></td>' +
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
        $("#btnedit,#btndelete,#btnprint,#ViewFiles,#btnExport,#btnacctran").show();
        //OtherCostGets();
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
    }
    else {
        CheckDeleted();
    }

    $("#otrcost").val(result[0].RoundOff);
    if (parseInt(result[0].RoundOff || 0) > 0) {
        //  $('#FCTextTotal').val(parseFloat($('#FCTextTotal').val())-parseFloat(result[0].RoundOff));
    }
}

function lessamountchange() {
    var less = parseFloat($("#otrcost").val() || 0)
    var amount = parseFloat($('#tottaxable').val()) + parseFloat($('#tottax').val());
    var lessamt = parseFloat(amount - less).toFixed(2);
    $('#FCTextTotal').text(lessamt)
}

function CheckDeleted() {
    var datax = {};
    datax.BillNo = 'PI';
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
                    swal('Invoice No-' + slno + ' ', "Cancelled!!!", "error");
                    $('.swal-button swal-button--confirm').focus();
                }
            }
        }
    });
}

function OtherCostGets() {
    var data = {};
    data.SlNo = $('#PINo_A').val();
    data.DepartmentId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseOtherCostGetandGets",
        data: data,
        success: function (result) {
            if (result.dList.length > 0) {
                ShowOtherCost(result.dList);
            }
            else {
                CalcOtherCost();
            }
        }
    });

}

function ShowOtherCost(result) {
    $('#accountdescription').val('');
    $('#otrcost').val('0.00');
    var a = 0; var b = 0;

    for (var n = 0; n < result.length; n++) {

        var Credit = 0;
        var BaseCredit = 0;
        var Debit = 0;
        var BaseDebit = 0;
        var tid = parseInt(n + 1);


        if (result[n].PayType == 'C') {

            Credit = (result[n].OCAmount).toFixed(Decimal);
            BaseCredit = (result[n].OCFCAmount).toFixed(Decimal);
            a = parseFloat(a + BaseCredit).toFixed(Decimal);
            $('#otrcost').val(parseFloat($('#otrcost').val() || 0) + parseFloat(result[n].OCFCAmount || 0));
            Debit = '0.00';
            BaseDebit = 0;
        }
        else if (result[n].PayType == 'D') {
            Debit = (result[n].OCAmount).toFixed(Decimal);
            BaseDebit = (result[n].OCFCAmount).toFixed(Decimal);
            // b = parseFloat(b + result[n].OCAmount || 0).toFixed(Decimal);
            Credit = '0.00';
            BaseCredit = 0;
        }


        var OtherCostRow = '<tr class="jsgrid-row" id="costrow_' + tid + '" onfocusin="CostEditrow(' + tid + ')" onfocusout="CostUpdaterow(' + tid + ')">' +
            '<td style="width:2%" id="costtd_' + tid + '" align="center">' + tid + '</td>' +
            '<td style="width:10%">' +
            '<input id="acc_' + tid + '" value="' + result[n].AccName + '" class="form-control smallTextbox borderno" onkeyup="AccountAutoComplete(' + tid + ')"   />' +
            '</td>' +
            '<td style="width:15%">' +
            '<input type="text" id="accdesc_' + tid + '" class="form-control smallTextbox borderno" value="' + result[n].Description + '"  onkeydown="FocusNext(event, \'\', \'accdesc_\', \'CostCurr_\', ' + tid + ',\'costrow_\')" />' +
            '</td>' +
            '<td style="width:6%">' +
            '<select id="CostCurr_' + tid + '" class="form-control smallTextbox borderno" onchange="CostCurrencyChange(' + tid + ')" onkeydown="FocusNext(event, \'accdesc_\', \'CostCurr_\', \'CostCurrRate_\', ' + tid + ',\'costrow_\')" >"'
            + CurrencySelect + '"</select>' +
            '</td>' +
            '<td style="width:6%">' +
            '<input type="text" id="CostCurrRate_' + tid + '" onkeypress="isNumber(event,this)"  class="form-control text-right smallTextbox borderno" value="' + parseFloat(result[n].CurrencyRate || 0) + '"  onkeydown="FocusNext(event, \'CostCurr_\', \'CostCurrRate_\', \'acctype_\', ' + tid + ',\'costrow_\')" />' +
            '</td>' +
            '<td style="width:6%">' +
            '<select id="acctype_' + tid + '" class="form-control smallTextbox borderno"   onkeydown="FocusNext(event, \'CostCurrRate_\', \'acctype_\', \'CreditAmount_\', ' + tid + ',\'costrow_\')" ><option value="C">Credit</option><option value="D">Debit</option></select>' +
            '</td>' +
            '<td style="width:6%">' +
            '<input type="text" id="CreditAmount_' + tid + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event,this)" onkeyup="CalcFCCostGrid(' + tid + ')" value="' + Credit + '"   onkeydown="FocusNext(event, \'acctype_\', \'CreditAmount_\', \'DebitAmount_\', ' + tid + ',\'costrow_\')" />' +
            '</td>' +
            '<td style="width:6%">' +
            '<input type="text" id="DebitAmount_' + tid + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event,this)" onkeyup="CalcFCCostGrid(' + tid + ')"  value="' + Debit + '" onkeydown="FocusNext(event, \'CreditAmount_\', \'DebitAmount_\', \'\', ' + tid + ',\'costrow_\')"  />' +
            '</td>' +
            '<td style="width:6%">' +
            '<input type="text" id="BaseList_' + tid + '" class="form-control text-right bg-white smallTextbox dedisa borderno" disabled value="' + parseFloat(result[n].OCFCAmount || 0).toFixed(Decimal) + '">' +
            '</td>' +
            '<td style="width:2%" align="center">' +
            '<input class="jsgrid-button jsgrid-delete-button"  type="button" onclick="CostDeleterow(' + tid + ')"  title=Delete >' +
            '</td>' +
            '<td style="display:none">' +
            '<input type="text" id="costsl_' + tid + '" value="1">' +
            '<input type="text" id="accid_' + tid + '" value="' + result[n].AccId + '">' +
            '<input type="text" id="BaseCredit_' + tid + '" value="' + BaseCredit + '">' +
            '<input type="text" id="BaseDebit_' + tid + '" value="' + BaseDebit + '">' +
            '</td>' +
            '</tr>'

        $('#tblOtherCost').append(OtherCostRow);
        $('#acctype_' + tid).val(result[n].PayType);
        $('#CostCurr_' + tid).val(result[n].CurrencyId);
        $('#CostCurrency').val(result[n].CurrencyId);
        $('#CostCurrRate').val(parseFloat(result[n].CurrencyRate))


    }

    $('.jsgrid-button,.smallTextbox,#DiscFromGrandTotal,#CessCheck').prop('disabled', true);
    $('#PINo_C,#btnprvs,#btnnxt').prop("disabled", false);

    $("#CostGridLength").val(result.length + 1)
    CalcCreditandDebit();
    $('#OthreCostdiv').animate({ scrollTop: 5000 }, 900);

    CalcOtherCost();
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
    $('#confirmmessage').text('Do you want to Delete this Purchase?')
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
        url: "../Pharmacy/HMS_PurchaseDelete",
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
            Operation = 'Purchase Invoice Edit- OTP , Bill No : ' + $("#PINo_A").val() + ' , ' + $("#PRType").val() + ' Purchase';
        else if (Flag == 1)
            Operation = 'Purchase Invoice Delete- OTP , Bill No : ' + $("#PINo_A").val() + ' , ' + $("#PRType").val() + ' Purchase';

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
    var x = $("#CostGridLength").val();
    OtherCostFlag = 0;
    for (var s = 1; s <= x; s++) {
        if ($('#costsl_' + s).val() == 0) {
            OtherCostFlag = 1;
            break;
        }
        else {
            OtherCostFlag = 0;
            continue;
        }
    }

    if ($.trim($("#PINo_S").val()) == '') {
        warningshow('Enter Invoice Number', 'PINo_S');
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
    else if (FlagCostEdit != 0 || OtherCostFlag == 1) {
        OtherCostPopUp();
        return false;
    }
    else if (parseFloat($("#FCAmount").val() || 0) <= 0) {
        warningshow('GrandTotal Cannot be Zero', '');
        return false;
    }
    else if (parseFloat($("#FCInvoiceTotal").val() || 0) <= 0) {
        warningshow('Invoice Total Cannot be Zero', 'FCInvoiceTotal');
        return false;
    }
    else if (parseFloat($("#FCInvoiceTotal").val() || 0) != parseFloat($("#FCAmount").val() || 0)) {
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
        $('#Confirmflag').val('UpdatePurchase'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Difference in Invoice Total and Grand Total.Do you want to Update this Purchase?');
    }
    else {
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
        $('#Confirmflag').val('UpdatePurchase'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do you want to Update this Purchase?');
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
                'UnitId': 0,
                'BatchSlNo': parseInt($("#BatchSlNo_" + i).val()),
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
                'P_OtherCost': parseFloat($("#OtherCost_" + i).val() || 0),
                'DelFlag': 1,
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,
                'IMEINumber': '',
                'PO_No': 0,
                'PO_SubTbl_Id': 0,
                'MRV_No': 0,
                'MRV_SubTbl_Id': 0,
                'Performa_NO': 0,
                'Performa_SubTbl_Id': 0,
                'Variable1': '',
                'Variable2': '',
                'Status': '',
                'Terms': 0,
                'DueDate': '',
                'LPO_No': '',
                'JobNo': 0,
                'Area': 0,
                'ShipDate': '',
                'Flag': 0,
            });
        }
    }

    if (oArray.length > 0) {


        var data = { 'PharmacyModel': oArray };
        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_PurchaseUpdate",
            data: data,
            success: function (result) {

                var status = result.oList[0].Status;
                var no = result.oList[0].SlNo;

                if (status == 2 && $("#tblOtherCost tr").length > 0) {

                    var x = $("#CostGridLength").val()
                    var bArray = new Array();
                    for (var i = 1; i <= x; i++) {
                        var OCId = 0;
                        var SlNo = no;
                        var InvoDate = $("#PharmaPIDate").val();

                        var PayType = $('#acctype_' + i).val();
                        var AccId = $('#accid_' + i).val();
                        var Description = $('#accdesc_' + i).val();
                        var CurrencyId = $('#CostCurr_' + i).val();
                        var CurrencyRate = $('#CostCurrRate_' + i).val();


                        if ($('#acctype_' + i).val() == 'C') {
                            var OCAmount = parseFloat($('#BaseCredit_' + i).val());
                            var OCFCAmount = parseFloat($('#CreditAmount_' + i).val());
                        }
                        else if ($('#acctype_' + i).val() == 'D') {
                            var OCAmount = parseFloat($('#BaseDebit_' + i).val());
                            var OCFCAmount = parseFloat($('#DebitAmount_' + i).val());
                        }
                        var JobCode = 0;
                        var UserId = ERPUserId;
                        var DepartmentId = ERPDeptId;
                        var DelFlag = 1;

                        if (!(typeof AccId == "undefined")) {
                            bArray.push({
                                'OCId': OCId,
                                'SlNo': SlNo,
                                'InvoDate': InvoDate,
                                'PayType': PayType,
                                'AccId': AccId,
                                'Description': Description,
                                'OCAmount': OCAmount,               //BaseCurrency
                                'OCFCAmount': OCFCAmount,           //ForeignCurrency
                                'JobCode': JobCode,
                                'CurrencyId': CurrencyId,
                                'CurrencyRate': CurrencyRate,
                                'UserId': UserId,
                                'DepartmentId': DepartmentId,
                                'DeleteFlag': DelFlag
                            })
                        }
                    }
                    if (bArray != "") {
                        var data = { 'PurchaseInvoiceModel': bArray };
                        $.ajax({
                            type: "POST",
                            url: "../Purchase/OtherCostInsertandUpdate",
                            data: data,
                            success: function (result) {
                                $('#confirmOk,#btnsubmit').prop("disabled", false);
                                $('#LoadingSmall').hide();
                                Showalerts(status, no);
                            }
                        });
                    }
                }
                else {
                    $('#confirmOk,#btnsubmit').prop("disabled", false);
                    $('#LoadingSmall').hide();
                    Showalerts(status, no);
                }
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

function GetTempPurchase() {
    var data = {};
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Pharmacy/HMS_PurchaseTempList",
        data: data,
        success: function (result) {
            FillTempPurchases(result);


        }
    });
}

function FillTempPurchases(result) {

    $("#TBL_TempPurchaseList tr").remove();

    for (var i = 0; i < result.length; i++) {

        var Id = i + 1;

        var PayType = 'Credit'
        if (result[i].PayType == 1) { PayType = 'Cash'; }

        var TempPurchase = '<tr class="jsgrid-row">' +
            '<td class="jsgrid-cell p-1" style="width:80px;" align="center">' + Id + '</td>' +
            '<td class="jsgrid-cell p-1" style="width:150px;">' + result[i].InvoDate + '</td>' +
            '<td class="jsgrid-cell p-1" style="width:300px;">' + result[i].SlNo + ' - ' + result[i].InvoNo + '</td>' +
            '<td class="jsgrid-cell p-1" style="width:130px;">' + PayType + '</td>' +
            '<td class="jsgrid-cell p-1" style="width:130px;">' + result[i].PurchaseType + '</td>' +
            '<td class="jsgrid-cell p-1" style="">' + result[i].SupplierName + '</td>' +
            '<td class="jsgrid-cell p-0" style="width:100px;" align="center"><button type="button" class="btn btn-sm btn-outline-danger mb-0" onclick="GetTempSaved(' + result[i].SlNo + ',1)">Reload <i class="fa fa-refresh"></i></button></td>' +
            '<tr>';

        $("#TBL_TempPurchaseList").append(TempPurchase);
    }
}

function GetPrevTempSave(Flag) {
    if ($("#Tbl_Purchase tr").length > 0 || Flag == 0) {
        $('#Confirmflag').val('LoadPrevData'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Load Previous Data?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
    else {
        GetTempSaved(0, 0);
    }
}

function GetTempSaved(TempSlNo, Type) {
    formrefresh(0);
    var data = {};
    data.SlNo = TempSlNo;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Flag = Type
    $.ajax({
        type: "POST",
        url: "../Pharmacy/HMS_PurchaseTempGets",
        data: data,
        success: function (result) {
            TempSavedPurchaseLoad(result);
            PopUpClose(2);
        }
    });
}

function TempSavedPurchaseLoad(result) {
    if (result.length > 0) {
        $("#TempSlNo").val(result[0].SlNo)
        $("#PINo_S,#PINo_C").val(result[0].InvoNo);
        $("#SupplierId").val(result[0].SupplierId);
        $("#Supplier").val(result[0].SupplierName);
        $("#PayType").val(result[0].PayType);
        $("#PRType").val(result[0].PurchaseType);
        //$("#PharmaPIDate").val(result[0].InvoDate);
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
                '<td width="13%"><input id="Product_' + Id + '" value="' + result[i].ItemCode + '" onkeyup="LoadProduct(' + Id + ')" class="form-control smallTextbox borderno" /></td>' +
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
                '<td width="5%"><input id="MRP_' + Id + '" value="' + parseFloat(result[i].MRP || 0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'SR_\', \'MRP_\', \'Margin_\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="TQty_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="TLQty_' + Id + '" value="0" class="form-control text-center smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCTaxable_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCTax_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="FCAmt_' + Id + '" value="0" class="form-control text-right smallTextbox dedisa borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="Margin_' + Id + '" value="0" class="form-control text-center smallTextbox borderno" onkeyup="CalcSellingPriceWithMargin(' + Id + ')" onkeypress="isNumber(event, this)" onkeydown="FocusNext(event, \'MRP_\', \'Margin_\', \'\', ' + Id + ',\'MTr_\')" /></td>' +
                '<td width="5%"><input id="CessAmount_' + Id + '" value="' + parseFloat(0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno bg-white" disabled /></td>' +
                '<td width="5%"><input id="OtherCost_' + Id + '" value="' + parseFloat(0).toFixed(Decimal) + '" class="form-control text-right smallTextbox borderno bg-white" disabled /></td>' +
                '<td width="5%" style="display:none;">' +

                '<input id="ProductId_' + Id + '" value="' + result[i].ItemId + '" />' +
                '<input id="TaxRate_' + Id + '" value="' + result[i].TaxRate + '" />' +

                '<input id="BaseDiscount_' + Id + '" value="0" />' +
                '<input id="BaseTaxable_' + Id + '" value="0" />' +
                '<input id="BaseTax_' + Id + '" value="0" />' +
                '<input id="BaseAmt_' + Id + '" value="0" />' +
                '<input id="Cess_' + Id + '" value="' + result[i].CessPer + '" />' +
                '<input id="BaseCessAmount_' + Id + '" value="0" />' +
                '<input id="BatchSlNo_' + Id + '" value="0" />' +
                '</td>' +
                '</tr>';

            $("#Tbl_Purchase").append(ProductRow);

            $('#TaxId_' + Id).val(result[i].TaxId)
        }

        $("#GridLength").val(result.length);
        CalcCopyData();
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
    }
    else {
        swal('Temporary Data Not Available', "", "error");
        $('.swal-button swal-button--confirm').focus();
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
        url: "../Purchase/PurchaseInvoiceList",
        data: dataPI,
        success: function (result) {
            GetPIListView(result.oList);


        }
    });
}
function GetPIListView(result) {


    $('#ViewFromDate,#ViewToDate').prop("disabled", false);
    disable_datatable('tbl_PIViewList');

    var responseText = "<thead><tr><th>Sl#</th><th>PI#</th><th>Invoice#</th><th>Date</th><th>Supplier</th><th>PType</th><th>Grand Total</th><th>User</th><th>Print</th></tr>" +
        "<tr><th> </th><th>PI#</th><th>Invoice#</th><th>Date</th><th>Supplier</th><th>PType</th><th>Grand Total</th><th>User</th><th> </th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);


        responseText += '<tr ondblclick="GetCopyofThisPurchase(' + result[l].SlNo + ',' + result[l].DepartmentId + ',0)"><td style="" align="center">' + slno + '</td><td id=' + 'InvoView_' + slno + '>' +
            result[l].SlNo + '</td><td>' +
            result[l].InvoNo + '</td><td>' +
            result[l].InvoDate + '</td><td>' +
            result[l].SupplierName + '</td><td>' +
            result[l].PurchaseType + '</td><td align="right">' +
            parseFloat(result[l].GrandTotal).toFixed(Decimal) + '</td><td>' +
            result[l].AccName + '</td>' +
            '<td align="center"><button class="btn btn-warning white btn-round btn-sm m-0" onclick="GetCopyofThisPurchase(' + result[l].SlNo + ',' + result[l].DepartmentId + ',1)" autocomplete="off">Print <i class="ft-printer"></i></button></td></tr>';
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
    $("#purchaseinv,#btnsubmit,#btntempsave").hide();
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
        url: "../Pharmacy/HMS_PurchaseGetandGets",
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
    else if (Result == 'false' && status == 'DeleteCostRow') {
        OtherCostPopUp();
    }
    else if (Result == 'true' && status == 'ClearOtherCost') {
        ClearOtherCost(1);
    }
    else if (Result == 'false' && status == 'ClearOtherCost') {
        OtherCostPopUp();
    }
    else if (Result == 'true' && status == 'CreateNew') {
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'SavePurchase') {
        OKSavePurchase();
    }
    else if (Result == 'true' && status == 'TempSave') {
        OKTempSave(rowid);
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
    else if (Result == 'true' && status == 'LoadPrevData') {
        GetPrevTempSave(1);
    }
    else if (Result == 'true' && status == 'PurchaseFiles') {
        OKUploadPurchaseFiles();
    }
    else if (Result == 'false' && status == 'PurchaseFiles') {
        if (!($('#PurchaseDocument').is(':visible'))) {
            $("#PurchaseDocument").modal("show");
            $("#PurchaseDocument").appendTo("body");
        }
    }
    else if (Result == 'true' && status == 'Filedelete') {
        OKDeleteDocument(rowid);
    }
    else if (Result == 'false' && status == 'Filedelete') {
        if (!($('#PurchaseDocument').is(':visible'))) {
            $("#PurchaseDocument").modal("show");
            $("#PurchaseDocument").appendTo("body");
        }
    }
    else if (Result == 'true' && status == 'Copy') {
        GetCopy(1);
    }

    $('#confirm').fadeOut();
}

function Showalerts(Status, no) {
    if (Status == 1) {
        formrefresh(0);
        swal('Invoice No-' + no + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
        GetTempPurchase();
    }
    else if (Status == 2) {
        formrefresh(0);
        swal('Invoice No-' + no + ' ', "Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh(0);
        swal('Invoice No-' + no + ' ', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        $('#LoadingSmall').hide();
        swal('Invoice No-' + no + ' Already Exist', "for Previous Purchase", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh(0);
        swal('Temporary Purchase Sl# -' + no + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
        GetTempPurchase();
    }
    else if (Status == 7) {
        $('#LoadingSmall').hide();
        swal('Sales already done against this Purchase', "Cannot Update", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 8) {
        $('#LoadingSmall').hide();
        swal('Sales already done against this Purchase', "Cannot Delete", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        $('#LoadingSmall').hide();
        swal('Same Invoice Number Already Exists For This Supplier', "", "warning");
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
                { "width": "40%", "targets": 4 },
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

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency</th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                    "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency </th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";
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
                            "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
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
                            "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
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


function UploadPurchaseFiles() {
    PopUpClose(6);
    $('#Confirmflag').val('PurchaseFiles'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do You Want To Upload These Files?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}
function OKUploadPurchaseFiles() {

    if (document.getElementById('PURCHASEfileUpload').files.length > 0) {

        CreateFolder();
        $("#LoadingSmall").show();
    }
    else {
        warningshow('No Files Selected', 'PURCHASEfileUpload');
        return false;
    }

}

function CreateFolder() {
    var data = {};
    data.DepartmentId = ERPDeptId;
    data.SlNo = $("#PINo_A").val();
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseFolderCreate",
        data: data,
        success: function (result) {
            FileUploadDB(0);
        }
    });
}

function FileUploadDB(Flag) {
    // Database Save

    var data = {};
    data.SlNo = $("#PINo_A").val();
    data.FileName = $("#PURCHASEfileUpload").get(0).files[Flag].name;
    data.Extension = $("#PURCHASEfileUpload").get(0).files[Flag].name.split('.').pop();
    data.Flag = Flag;
    data.DepartmentId = ERPDeptId;
    data.UserId = ERPUserId;

    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseFileInsert",
        data: data,
        success: function (result) {
            var DBFlag = result.dList[0].Flag;
            var status = result.dList[0].Status;

            if (status == 1) {
                FileUploadFolder(Flag, DBFlag, status);
            }

        }
    });




}
function FileUploadFolder(Flag, DBFlag, status) {
    // Folder Save

    var formData = new FormData();
    var imageName = DBFlag
    var browsedFile = document.getElementById("PURCHASEfileUpload").files[Flag];
    var Extension = $("#PURCHASEfileUpload").get(0).files[Flag].name.split('.').pop();
    var SlNo = $("#PINo_A").val();
    var DeptId = ERPDeptId;

    formData.append("FileUpload", browsedFile);
    formData.append("FileName", imageName);
    formData.append("SlNo", SlNo);
    formData.append("DeptId", DeptId);
    formData.append("Extension", Extension);

    $.ajax({
        type: "POST",
        url: '/Purchase/PurchaseFileUpload',
        data: formData,
        dataType: "html",
        contentType: false,
        processData: false,
        success: function (result) {
            if (Flag < document.getElementById('PURCHASEfileUpload').files.length - 1) {
                Flag++;
                FileUploadDB(Flag);
            }
            else {
                $("#LoadingSmall").hide();
                swal('Documents Uploaded Successfully', "", "success");
                $('.swal-button swal-button--confirm').focus();
                $("#PURCHASEfileUpload").val('');
                ViewSavedFiles();
            }
        }
    });


}

function ViewSavedFiles() {
    if (!($('#PurchaseDocument').is(':visible'))) {
        $("#PurchaseDocument").modal("show");
        $("#PurchaseDocument").appendTo("body");
    }

    var data = {};
    data.SlNo = $("#PINo_A").val();
    data.DepartmentId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseFileGets",
        data: data,
        success: function (result) {
            ShowSavedFiles(result.oList);

        }
    });
}


function ShowSavedFiles(result) {

    disable_datatable('tbl_documentlist');


    var responseText = "<tbody>";

    if (result.length > 0) {
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);

            var Icon = '<img src="../app-assets/Project_Icons/DOC_ICON.png" style="width:50px;height:40px" />';

            var Extension = (result[l].Extension).toLowerCase();

            if (Extension == 'pdf') {
                Icon = '<img src="../app-assets/Project_Icons/PDF_ICON.jpg" style="width:50px;height:40px" />';
            }
            else if (Extension == 'jpeg' || Extension == 'jpg' || Extension == 'png' || Extension == 'gif' || Extension == 'tif') {
                Icon = '<img src="../app-assets/Project_Icons/IMG_ICON.jpg" style="width:50px;height:40px" />';
            }
            else if (Extension == 'xlsx' || Extension == 'xls' || Extension == 'xlsm' || Extension == 'xlm' || Extension == 'xltx' || Extension == 'xltm' || Extension == 'xlt') {
                Icon = '<img src="../app-assets/Project_Icons/EXCEL_ICON.png" style="width:50px;height:40px" />';
            }


            responseText += "<tr id='doctr_" + result[l].PFileId + "'>" +
                "<td align='center'>" + Icon + "</td>" +
                "<td>" + result[l].FileName + "</td>" +

                "<td  align='center'>" +
                "<a onclick=\"ViewDocuments(\'" + result[l].Flag + "'\,\'" + result[l].Extension + "'\)\"><i class='fa fa-download' style='color:darkorange'></i><a>" +
                "</td>" +

                "<td align='center' class='hideedit'>" +
                "<a onclick=\"DeleteDocument(\'" + result[l].PFileId + "'\,\'" + slno + "'\)\">" + DeleteButton + "</a>" +
                "</td>" +

                "</tr>";


        }
    }
    else {
        responseText = "<tr><td style='text-align:center;color:red;font-weight:500'>NO DOCUMENTS</td></tr>"
    }

    $('#tbl_documentlist').html(responseText + '</tbody>');

    if (MainEditFlag != 1) {
        $('.hideedit').hide();
    }

}

function ViewDocuments(DocumentId, Extension) {
    var flname = '../ProjectImages/Purchase/' + ERPDeptId + '/' + $("#PINo_A").val() + '/' + DocumentId + '.' + Extension;
    window.open(flname);
}

function DeleteDocument(FileId, slno) {
    PopUpClose(6);
    $('#Confirmflag').val('Filedelete'), $('#ConfirmRowId').val(FileId)
    $('#confirmmessage').text('Do You Want To Delete This File?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}
function OKDeleteDocument(FileId) {
    var data = {};
    data.PFileId = FileId;
    data.DepartmentId = ERPDeptId;
    data.UserId = ERPUserId;

    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseFileDelete",
        data: data,
        success: function (result) {
            $("#doctr_" + FileId).remove();
            swal('Documents Deleted Successfully', "", "error");
            $('.swal-button swal-button--confirm').focus();

        }
    });
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
    else if (!($('.modal').is(':visible'))) {

        if ((e.altKey) && e.keyCode == 80) {        // Alt + P :Prev Data
            GetPrevTempSave(0);
        }
    }
    else if (X == 27) {                         //ESC       :   Popup Close

        CloseAllMainPopups();
        $("#PurchaseTransactionPopup").modal("hide");
    }

});


function CloseAllMainPopups() {
    $("#TaxSpliPopup").modal("hide");
    $("#TempPurchasePopup").modal("hide");
    $("#Othercostpopup").modal("hide");
    $("#PurchaseView").modal("hide");
    $("#productpdiv").modal("hide");
}

function GetTrans() {
    if (CopyFlag == 1) {
        $("#CmnVoucherNo").val($("#PINo_A").val());
        $("#CmnPref0").val("PI");
        $("#CmnPref1").val("OC");
        $("#CmnPref2").val("");
        $("#CmnPref3").val("");
        $("#CmnDeptId").val(ERPDeptId);
        $("#CmnUserId").val(ERPUserId);
        $("#CmnCondition").val("");
        CmnAccTransGet();
    }
}