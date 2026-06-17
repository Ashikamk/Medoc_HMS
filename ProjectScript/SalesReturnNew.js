var UnitSelect = ''; var TaxSelect = ''; var LocnSelect = ''; var DeptSelect = "";  var SavingFlg = 0;
function LocationLoad(result, a) {
    $("#select_locn,#select_location0,#locn_job").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        if (LocArray.includes(result[i].LocationId))
            LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
        else
            LocnSelect += "<option style='color:#26ACAE' disabled value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }
    $("#select_location0,#select_locn,#locn_job").append(LocnSelect);
    //if (a == 0) {
    $('#select_locn').val(UserLocationId);
    $('#select_location0').val(UserLocationId);
    $('#locn_job').val(UserLocationId);
    //}
    //else {
    //    $('#select_locn').val(a);
    //    $('#select_location0').val(a);
    //}
}
var BaseCurrency;
function CurncyLoad(result, a) {
    $("#select_crncy").empty();
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
            BaseCurrency = result[i].BaseCurrencyId;
        }
    }
    $("#select_crncy").append("<option value='0'>--Select--</option>");
    document.getElementById("select_crncy").options[0].disabled = true;
    for (var i = 0; i < result.length; i++) {
        $("#select_crncy").append("<option value='" + result[i].Id + "' name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");
    }
    if (a == 0) {
        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val(parseFloat($('#select_crncy').find("option:selected").attr("name") || 0).toFixed(Decimal));

    }
    else {
        $('#select_crncy').val(a);
        $('#txtcrncyrate').val(parseFloat($('#select_crncy').find("option:selected").attr("name") || 0).toFixed(Decimal));
        for (var m = 1; m <= i; m++) {
            amountcalculation(m);
        }
        CalcGrandTotal(i);
        roundoffcalc();
    }
}

function UnitLoad(result) {
    $("#select_unit0,#unit_job").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'name='" + result[i].UnitName + "'>" + result[i].UnitName + "</option>";
    }
    $("#select_unit0,#unit_job").append(UnitSelect);
}

//Load Tax for dropdown and Tax Split Table

function TaxLoad(result) {
    $('#tbltaxsplit td').remove();
    var s = 0;
    DefaultTaxArray = [];
    $("#select_tax0,#tax_job").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "' name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
        s = i + 1;
        TaxSplitrow = "<tr class='jsgrid-row' id='" + result[i].TaxId + "'>" +
       "<td class='text-center' style='width:auto;width:30%;border:1px solid #BABFC7;'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + parseInt(result[i].TaxRate) + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +
       "<td class='text-center' style='width:auto;width:40%;border:1px solid #BABFC7;'><input type='text' disabled style='background-color:white;border:none;height:30px' class='form-control text-center' id='splittaxable_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittaxable_" + result[i].TaxRate + "' value='0.00' /></td>" +
       "<td class='text-center' style='width:auto;width:40%;border:1px solid #BABFC7;'><input type='text' disabled style='background-color:white;border:none;height:30px' class='form-control text-center' id='splittax_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittax_" + result[i].TaxRate + "' value='0.00' /></td>" +
       "</tr>";
        DefaultTaxArray.push(result[i].TaxRate);
        $('#tbltaxsplit').append(TaxSplitrow);
    }
    $("#select_tax0,#tax_job").append(TaxSelect);
    TaxClear();
    $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
    $("#txttaxpercent0").val($("#select_tax0").find("option:selected").attr("name"));
}

//Clear Tax values
function TaxClear() {
    for (var j = 0; j <= DefaultTaxArray.length; j++) {
        var k = DefaultTaxArray[j];
        $('#splittaxable_' + k).val('0.00');
        $('#hiddensplittaxable_' + k).val('0.00');
        $('#splittax_' + k).val('0.00');
        $('#hiddensplittax_' + k).val('0.00');
        $('#splittaxable_' + k).prop("disabled", true);
        $('#hiddensplittaxable_' + k).prop("disabled", true);
        $('#splittax_' + k).prop("disabled", true);
        $('#hiddensplittax_' + k).prop("disabled", true);
    }
}

var UserSalesmanId = 0;
function SalesmanLoad(result, a) {
    $("#select_salesman").empty();
    $("#select_salesman").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_salesman").append("<option value='" + result[i].Id + "'>" + result[i].FirstName + "</option>");
        if (result[i].UserId == ERPUserId)
            UserSalesmanId = result[i].Id;
    }
    if (a == 0) {
        $('#select_salesman').val(UserSalesmanId);
    }
    else {
        $('#select_salesman').val(a);
    }
}

var DefaultArea = 0;
function AreaLoad(result, a) {

    $("#select_place").empty();
    $("#select_place").append("<option value='0'>Place Of Supply</option>");
    for (var i = 0; i < result.length; i++) {
        if (result[i].DefaultArea != 0) {
            DefaultArea = result[i].DefaultArea
        }
        $("#select_place").append("<option value='" + result[i].AreaId + "'>" + result[i].AreaName + "</option>");
    }
    if (a == 0) {
        $('#select_place').val(DefaultArea);
    }
    else {
        $('#select_place').val(a);
    }
}
function Billseriesload(result) {
    if (result.length == 0) {
        $("#addacnttype").show();
    }
    else {
        $("#addacnttype").hide();
        Defaultfocus();
    }
    $("#txtBillseriesId").empty();
    for (var i = 0; i < result.length; i++) {
        $("#txtBillseriesId").append("<option value='" + result[i].id + "' name='" + result[i].CurrentNo + "'>" + result[i].BillDescription + "</option>");
    }
    $('#txtBillSlNo').val(result[0].CurrentNo)
    $('#txtBlSlNo').val(result[0].CurrentNo);
    $('#txtBillSlNocopy').val(result[0].CurrentNo)
    JsBarcode("#barcode1", result[0].CurrentNo)

}
function BillLoad() {

    var data = {};
    data.id = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/BillSeriesSalesReturnGetandGets",
        data: data,
        success: function (result) {
            Billseriesload(result.oList);
        }
    });
} function TermsLoad(result, a) {
    $("#select_terms").empty();
    $("#select_terms").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_terms").append("<option value='" + result[i].TermsId + "' name='" + result[i].Terms + "'>" + result[i].TermsDescription + "</option>");
    }
    if (a == 0) {
        $('#select_terms').val(0);
    }
    else {
        $('#select_terms').val(a);

    }
}

function crncyload(id) {
    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data,
        success: function (result) {
            CurncyLoad(result.oList, id);
        }
    });
}
function placeload(id) {
    var data = {};
    data.AreaId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            AreaLoad(result.oList, id);
        }
    });
}

var LocArray = [];
function LocnLoad(id) {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList, id);
        }
    });

}
function Salesman(id) {

    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SalesmanGetandGets",
        data: data,
        success: function (result) {
            SalesmanLoad(result.oList, id);


        }
    });

}
function Terms(id) {
    var data = {};
    data.TermsId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TermsGetandGets",
        data: data,
        success: function (result) {
            TermsLoad(result.oList, id);
        }
    });

}

function discclr(flg) {

    if (flg == 0) {
        if ($('#disc').val() == 0) { $('#disc').val('0'); }
        $('#disc').select();
        $('#disc').css('background-color', '#58dbe4')
    }

    else if (flg == 1) {
        if ($('#disc').val() == '' || $('#disc').val() == 0) {
            $('#disc').val('0.00');
        }
        $('#disc').css('background-color', 'white');
    }
}

var Decimal = Decimal;
var editflag = 0;
var i = 1;


//--------------------Billwise discount Calculation------------------
var BillDiscountFlag = 0;
function Checkbilldiscnt(id) {
    BillDiscountFlag = 0;
    for (var j = 1; j < id; j++) {
        if (parseFloat($('#txtdiscount' + j).val()) > 0) {
            BillDiscountFlag = 1;
        }
    }

    if (BillDiscountFlag == 1) {
        $('#disc').prop("disabled", true);
        $('#disc').val('0.00');
        $('#Discountpercent').val('');
    }
    else {
        $('#disc').prop("disabled", false);
        $('#disc').val('0.00');
        $('#Discountpercent').val('');
    }
}

function CalcDiscountSplitTax1() {
    if ($('#tblsalesinvoice tr').length > 0) {

        if (parseFloat($('#disc').val() || 0) > 0) {


            if ((usermenu1.indexOf("M252") == -1)) {                                   //Discount Minus from Taxable
                var Totalamt = parseFloat($('#HiddenTotal').val() || 0);
                var DisAMt = parseFloat($('#disc').val() || 0);
                var NetAMT = parseFloat(Totalamt - DisAMt);
                NetAMT = NetAMT.toFixed(Decimal);

                var Dispers = parseFloat((100 * DisAMt) / Totalamt) || 0;
                $('#Discountpercent').val(Dispers.toFixed(Decimal));
                if (parseFloat(Dispers) > parseFloat(DiscountLimit) && copyflag == 0) {
                    warningshow('Maximum Discount% allowed for user is ' + parseFloat(DiscountLimit) + '%', 'disc');
                    $('#disc').val(0);
                    $('#disc').select();
                    $('#Discountpercent').val('');
                    CalcGrandTotal(i);
                    CalCDefTaxSplit();
                }
                else {
                    billwisediscount(NetAMT, Dispers);
                }
            }
            else {                                                                           //Discount Minus from Grand Total
                var Totalamt = parseFloat($('#GTotal').val() || 0);
                var DisAMt = parseFloat($('#disc').val() || 0);
                var NetAMT = parseFloat(Totalamt - DisAMt);
                NetAMT = NetAMT.toFixed(Decimal);

                var Dispers = parseFloat((100 * DisAMt) / Totalamt) || 0;
                $('#Discountpercent').val(Dispers.toFixed(Decimal));


                if (parseFloat(Dispers) > parseFloat(DiscountLimit) && copyflag == 0) {
                    warningshow('Maximum Discount% allowed for user is ' + parseFloat(DiscountLimit) + '%', 'disc');
                    $('#disc').val(0);
                    $('#disc').select();
                    $('#Discountpercent').val('');
                    CalcGrandTotal(i);
                    CalCDefTaxSplit();
                }
                else {
                    billwisediscount(NetAMT, Dispers);
                }
            }

            

        }
        else {
            $('#Discountpercent').val('');
            CalcGrandTotal(i);
            CalCDefTaxSplit();
        }
    }
}

function CalCDefTaxSplit() {
    for (var h = 0; h < $('#tbltaxsplit tr').length - 1; h++) {
        var TaxId = DefaultTaxArray[h];
        var DefSpliTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val());
        var DefSpliTax = parseFloat($('#hiddensplittax_' + TaxId).val());
        DefSpliTaxable = DefSpliTaxable.toFixed(Decimal);
        DefSpliTax = DefSpliTax.toFixed(Decimal);

        $('#splittaxable_' + TaxId).val(DefSpliTaxable);
        $('#splittax_' + TaxId).val(DefSpliTax);
    }
}

function billwisediscount(TotalAmt, Dispers) {

    $('#GrandTotal,#TotalTaxable,#TotalTax').val('')
    var FCAmount = 0;
    var FCtottaxable = 0;
    var FCtottax = 0;
    var BillDisc = 0;

    var AMT0 = 0;
    var GST0 = 0;
    var AMT5 = 0;
    var GST5 = 0;
    var AMT12 = 0;
    var GST12 = 0;
    var AMT18 = 0;
    var GST18 = 0;
    var AMT28 = 0;
    var GST28 = 0;

    if ((usermenu1.indexOf("M252") == -1))                   //Discount From Total Taxable 
    {
        for (var k = 1; k < i; k++) {
            var Amount = $('#txttaxableamnt' + k).val();
            var GSTPERS = parseFloat($('#txttaxpercent' + k).val() || 0);

            var disamt = parseFloat(Amount - ((Amount * Dispers) / 100));
            disamt = disamt.toFixed(Decimal);
            var TaxAmt = parseFloat(disamt * GSTPERS) / parseFloat(100);

            var GStAmount = TaxAmt.toFixed(Decimal);
            Amount = parseFloat(disamt) || 0;

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

        var GrandTotal = 0; var TotalTax = 0;
        TotalTax = parseFloat(GST0 + GST5 + GST12 + GST18 + GST28).toFixed(Decimal);
        GrandTotal = parseFloat(TotalAmt) + parseFloat(TotalTax);

        var FCrate = parseFloat($('#txtcrncyrate').val() || 0).toFixed(Decimal);
        FCrate = isNaN(FCrate) ? 0 : FCrate;
        BillDisc = parseFloat($('#disc').val() || 0);

        $('#FcGrandTotal').val('')
        $('#FcTotalTaxable').val('')
        $('#FcTotalTax').val('');

        FCAmount = GrandTotal * FCrate;
        FCtottaxable = TotalAmt * FCrate;
        FCtottax = TotalTax * FCrate;
        BillDisc = BillDisc * FCrate;


        $('#fcdisc').val(BillDisc.toFixed(Decimal));
        $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
        $('#gndtotal').text(GrandTotal.toFixed(Decimal));
        $('#TotalTaxable').val(parseFloat(TotalAmt).toFixed(Decimal));
        $('#TotalTax').val(parseFloat(TotalTax).toFixed(Decimal));
        $('#FcGrandTotal').val(FCAmount.toFixed(Decimal));
        $('#FcTotalTaxable').val(FCtottaxable.toFixed(Decimal));
        $('#FcTotalTax').val(FCtottax.toFixed(Decimal));

    }
    else             //Discount From Grand Total
    {
        for (var k = 1; k < i; k++) {
            var Amount = $('#txtamnt' + k).val();
            var GSTPERS = parseFloat($('#txttaxpercent' + k).val() || 0);
            var disamt = parseFloat(Amount - ((Amount * Dispers) / 100));
            disamt = disamt.toFixed(Decimal);


            var newamount = parseFloat(disamt);
            var newtaxable = (100 * newamount) / (100 + GSTPERS);
            var TaxAmt = parseFloat(newamount) - parseFloat(newtaxable);

            var GStAmount = TaxAmt.toFixed(Decimal);
            Amount = parseFloat(disamt) || 0;

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


        var GrandTotal = parseFloat(TotalAmt); var TotalTax = 0; var TotalTaxable = 0;
        TotalTax = parseFloat(GST0 + GST5 + GST12 + GST18 + GST28).toFixed(Decimal);
        TotalTaxable = parseFloat(TotalAmt) - parseFloat(TotalTax);

        var FCrate = parseFloat($('#txtcrncyrate').val() || 0).toFixed(Decimal);
        FCrate = isNaN(FCrate) ? 0 : FCrate;
        BillDisc = parseFloat($('#disc').val() || 0);

        $('#FcGrandTotal').val('')
        $('#FcTotalTaxable').val('')
        $('#FcTotalTax').val('');

        FCAmount = GrandTotal * FCrate;
        FCtottaxable = TotalTaxable * FCrate;
        FCtottax = TotalTax * FCrate;
        BillDisc = BillDisc * FCrate;


        $('#fcdisc').val(BillDisc.toFixed(Decimal));
        $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
        $('#gndtotal').text(GrandTotal.toFixed(Decimal));
        $('#TotalTaxable').val(TotalTaxable);
        $('#TotalTax').val(parseFloat(TotalTax).toFixed(Decimal));
        $('#FcGrandTotal').val(FCAmount.toFixed(Decimal));
        $('#FcTotalTaxable').val(FCtottaxable.toFixed(Decimal));
        $('#FcTotalTax').val(FCtottax.toFixed(Decimal));

    }

    $('#gndtotal').text(FCAmount.toFixed(Decimal));

    if ($('#txtcrncyrate').val() == 1 || $('#FcGrandTotal').val() <= 0) {
        $("#fc").css("opacity", '0');
        $('#fc').text('FC : ' + GrandTotal.toFixed(Decimal));
    }
    else if ($('#txtcrncyrate').val() != 1 && $('#FcGrandTotal').val() > 0) {
        $("#fc").css("opacity", '100');
        $('#fc').text('FC : ' + GrandTotal.toFixed(Decimal));
    }



}
//--------------------End of Billwise discount Calculation----------- 


function Selecttrans() {
    if ($('#salestransdiv').is(':visible'))
        TransactionSales();
    else if ($('#purchasetransdiv').is(':visible'))
        TransactionPurchase();
    else if ($('#alltranstransdiv').is(':visible'))
        TransactionAll();
}

function TransactionSales() {
    if ($("#PrdtId0").val() != 0) {

        $('#idforlabeltype').text('All');
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;

        var data = {};
        data.ProductId = $("#PrdtId0").val();
        data.DeptId = ERPDeptId;
        data.type = flag;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: '../SalesInvoice/SalesTransGetandGets',
            data: data,
            success: function (result) {
                productpopuprefresh();
                $('#purchasetransdiv').hide();
                $('#salestranspopupdiv').show();
                var ProductDesc = $('#ProductDesc0').val();
                var product = $('#txtproduct0').val();
                $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Last Sales Transaction Details');
                $('#salestransdiv').show();
                $('#txtquantity0').focus();
                SalesTransLoad(result);
            }
        });
    }
}

function TransactionPurchase() {
    if ($("#PrdtId0").val() != 0) {

        $('#idforlabeltype').text('All');
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;

        var data = {};
        data.ItemId = $("#PrdtId0").val();
        data.DepartmentId = ERPDeptId;
        data.UserId = ERPUserId;
        data.Type = flag;
        $.ajax({
            type: "POST",
            url: '../Purchase/PurchaseTransactionSearch',
            data: data,
            success: function (result) {
                productpopuprefresh();
                disable_datatable('tblurchasetrans');
                $('#tblurchasetrans tr').remove();
                // $('#tblurchasetrans tr td').remove();
                $('#salestranspopupdiv').show();
                $('#purchasetransdiv').show();

                var AVCOST = '';
                if (result.length > 0) {
                    AVCOST = '[ Average Cost : ' + parseFloat(result[0].Cost).toFixed(Decimal) + ']';
                }

                var ProductDesc = $('#ProductDesc0').val();
                var product = $('#txtproduct0').val();
                $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Last Purchase Transaction Details  ' + AVCOST);
                $('#salestransdiv').hide();
                $('#txtquantity0').focus();

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Qty.</th><th>FC Cost</th><th>Cost</th><th>Location</th><th>Currency</th><th>Dept</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                                "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Qty.</th><th>FC Cost</th><th>Cost</th><th>Location</th><th>Currency </th><th>Dept</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";


                if (result.length != 0) {

                    for (var p = 0; p < result.length; p++) {
                        var a = (result[p].Rate + result[p].OtherCost).toFixed(Decimal);
                        var lpotr = '';
                        if (result[p].LPO != '0')
                            lpotr = result[p].LPO;

                        if (result[p].PurchaseType == 'Local' || SuppDetailsRight == 'Yes') {
                            ProdRow = ProdRow + "<tr id=" + 'pdctrow' + (p + 1) + ">" +
                                "<td style='width:12%' class='text-left'>Sl No: (" + result[p].SlNo + ") - Inv No: (" + result[p].InvoNo + ")</td>" +
                                "<td class='text-left'>" + result[p].InvoDate + "</td>" +
                                "<td style='width:20%' class='text-left'>" + result[p].SupplierName + "</td>" +
                                "<td class='text-left'>" + result[p].AccName + "</td>" +
                                "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                                "<td style='text-align:right'>" + parseFloat(result[p].FCGrandTotal).toFixed(Decimal) + "</td>" +
                                "<td style='text-align:right'>" + a + "</td>" +
                                //"<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                                "<td class='text-left'>" + result[p].Locnname + "</td>" +
                                "<td class='text-left'>" + result[p].CurrencyName + "</td>" +
                                "<td class='text-left'>" + result[p].DeptName + "</td>" +
                                "<td class='text-left'>" + lpotr + "</td>" +
                                 "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                                "</tr>";
                        }
                        else {
                            ProdRow = ProdRow + "<tr id=" + 'pdctrow' + (p + 1) + ">" +
                                "<td style='width:12%' class='text-left'>Sl No: (" + result[p].SlNo + ") - Inv No: (" + result[p].InvoNo + ")</td>" +
                                "<td class='text-left'>" + result[p].InvoDate + "</td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                                "<td style='text-align:right'>" + parseFloat(result[p].FCGrandTotal).toFixed(Decimal) + "</td>" +
                                "<td style='text-align:right'>" + a + "</td>" +
                                //"<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                                "<td class='text-left'>" + result[p].Locnname + "</td>" +
                                "<td class='text-left'>" + result[p].CurrencyName + "</td>" +
                                "<td class='text-left'>" + result[p].DeptName + "</td>" +
                                "<td class='text-left'>" + lpotr + "</td>" +
                                 "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                                "</tr>";
                        }
                    }

                    $('#tblurchasetrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblurchasetrans', 'MultiplePurchaseT');
                    $('#tblurchasetrans').scrollTop(0);

                }
                else {
                    $('#tblurchasetrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblurchasetrans', 'MultiplePurchaseT');
                }
            }
        });
    }
}

function TransactionAll() {
    if ($("#PrdtId0").val() != 0) {

        $('#idforlabeltype').text('Previous');
        $("#txtquantity0,#txtproduct0").blur();
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;

        var data = {};
        data.ItemId = $("#TransPrdtId0").val();
        data.DepartmentId = ERPDeptId;
        data.UserId = ERPUserId;
        data.Type = flag;
        $.ajax({
            type: "POST",
            url: "../Purchase/TransactionSearch",
            data: data,
            success: function (result) {

                var ProductDesc = $('#ProductDesc0').val();
                var product = $('#txtproduct0').val();

                disable_datatable('tblalltrans');
                productpopuprefresh();
                $('#salestranspopupdiv').show();
                $('#salestransdiv').hide();
                $('#alltranstransdiv').show();
                $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - All Transaction Details');
                $('#purchasetransdiv').hide();
                $("#txtquantity0,#txtproduct0").blur();
                $('#tblalltrans tr').remove();

                var ProdRow = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account Name</th><th>Remarks</th><th>Qty.</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Dept</th><th>Job Code</th></tr>" +
                            "<tr><th>Bill Number</th><th>Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account Name</th><th>Remarks</th><th>Qty.</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Dept</th><th>Job Code</th></tr></thead><tbody>";

                if (result.length != 0) {

                    var BalQty = parseInt(result[0].OpeningQty);

                    for (var n = 0; n < result.length; n++) {
                        if (result[n].Status == 'IN') {
                            BalQty += parseInt(result[n].Quantity)
                        }
                        else {
                            BalQty = BalQty - parseInt(result[n].Quantity)
                        }

                        ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                              "<td class='text-left'  style='width:1%'> " + result[n].BillNo + "</td>" +
                                "<td class='text-left' style='width:1%'>" + result[n].InvoDate + " </td>" +
                              "<td class='text-left' style='width:1%'>" + result[n].TransType + "  </td>" +
                             "<td class='text-left' style='width:3%'>" + result[n].Salesman + " </td>" +
                               "<td class='text-left' style='width:1%'>" + result[n].Status + "  </td>" +
                             "<td class='text-left' style='width:8%'>" + result[n].AccountName + " </td>" +
                               "<td class='text-left' style='width:8%'>" + result[n].Remarks + " </td>" +
                             "<td class='text-left' style='width:1%'>" + result[n].Quantity + " </td>" +
                             "<td class='text-left' style='width:1%'>" + BalQty + "  </td>" +
                             "<td class='text-right' style='width:3%'>" + parseFloat(result[n].Cost || 0).toFixed(Decimal) + "   </td>" +
                             "<td class='text-right' style='width:3%'>" + parseFloat(result[n].TransPrice || 0).toFixed(Decimal) + " </td>" +
                              "<td class='text-left' style='width:5%'>" + result[n].Locnname + " </td>" +
                               "<td class='text-left' style='width:1%'>" + result[n].DeptName + "  </td>" +
                               "<td class='text-left' style='width:6%'>" + result[n].JobCode + "  </td>" + "</tr>";
                    }
                    $('#tblalltrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblalltrans', 'MultipleAllTransaction');
                    $('#alltranstransdiv').scrollTop(0);
                }
                else {
                    $('#tblalltrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblalltrans', 'MultipleAllTransaction');
                }
            }
        });

    }
}


$(document).keydown(function (e) {

    var x = event.keyCode;
    if ((x > 111 && x < 124)) {
        if (x == 118 && (!$("#addacnttype,#returndiv,#discdiv").is(":visible"))) {                                                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionSales();
        }
        else if (x == 119 && (!$("#addacnttype,#returndiv,#discdiv").is(":visible"))) {                                               // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionPurchase();
        }
        else if (x == 120 && (!$("#addacnttype,#returndiv,#discdiv").is(":visible"))) {                                                // F9 :   All Transaction details Popup      
            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionAll()
        }

        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }

    if ((e.altKey && e.keyCode == 83) && (!$("#addacnttype,#returndiv,#discdiv,#alertpopup").is(":visible")) && (!$("#salestranspopupdiv").is(":visible"))) {                        //Alt+S
        if (copyflag != 1 && updateflag == 0 && editflag == 0 && SavingFlg==0) 
            savesalesreturn();
    }
    else if ((e.altKey && e.keyCode == 67) && (!$("#addacnttype,#returndiv,#discdiv,#alertpopup").is(":visible")) && (!$("#salestranspopupdiv").is(":visible"))) {                 //Alt+C        
        if (copyflag != 1 && updateflag == 0)
            GetRows(0);
    }
    else if ((e.altKey && e.keyCode == 78) && (!$("#addacnttype,#returndiv,#discdiv,#alertpopup").is(":visible")) && (!$("#salestranspopupdiv").is(":visible"))) {                  //Alt+N
        formrefreshconfirm();
    }
    else if ((e.altKey && e.keyCode == 65) && ($("#tblAlert tr").length > 2)) {                        //Alt+A - Advance PopUp Show
        $('#alertpopup').show();
        $('#alertdiv').show();
        $('#alertdiv1').hide();
        $("#btnokalert").focus();
    }
    else if ((e.altKey && e.keyCode == 71) && (!$("#addacnttype,#returndiv,#discdiv").is(":visible")) && (!$("#salestranspopupdiv").is(":visible"))) {          //Alt+g  - Focus Product Grid
        if ((copyflag == 0) && ($('#tblsalesinvoice tr').length > 0)) {
            try {
                var row = $('#tblsalesinvoice').find(' tbody tr:eq(0)').attr('id').match(/\d+/)[0];
                if (row) {
                    $('#txtquantity' + row).focus();
                    $('#txtquantity' + row).select();
                }
            }
            catch (err) {

            }
        }
    }
    else if (e.keyCode == 27) {
        if (copyflag != 1) {
            productpopuprefresh();

            popuprefresh();

            jobpopuprefresh();
            salestranspopuprefresh();
            CloseEnquiry();

            $('#Revisionpopupdiv,#Revdiv').hide();
            if ($('#discdiv').is(':visible')) {
                $('#discdiv').hide();
                $('#txtproduct0').focus();
            }
            if ($('#returndiv').is(':visible')) {
                returnpopclose();
            }

        }
    }
    else if (e.altKey && e.keyCode == 49 && (copyflag == 0)) {
        $('#typecredit').prop("checked", true);
        $('#txtcustomer').focus();
    }
    else if (e.altKey && e.keyCode == 50 && (copyflag == 0)) {
        $('#typecash').prop("checked", true);
        $('#txtcustomer').focus();
    }
});

//Pop Up for Sales Transactions
function SalesTransLoad(result) {

    disable_datatable('tblsalestrans');
    $('#tblsalestrans tr').remove();
    var ProdRow = "<thead><tr><th>SalesInvoice</th><th>Date</th><th style='width:25%'>AccountName</th><th style='width:6%'>Qty.</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr>" +
                               "<tr><th>SalesInvoice</th><th>Date</th><th style='width:25%'>AccountName</th><th style='width:6%'>Qty.</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr></thead><tbody>";


    if (result.length != 0) {

        for (var n = 0; n < result.length; n++) {

            ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
               "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
               "<td class='text-left'>" + result[n].InvDate + "                                   </td>" +
               "<td  class='text-left'>" + result[n].CustName + "                                   </td>" +
               //"<td style='width:15%' class='text-left'>" + result[n].CustAddress + "                                   </td>" +
               "<td  class='text-right'>" + result[n].ProdQty + "                                   </td>" +
               "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
               "<td class='text-left'>" + result[n].Location + " </td>" +
               "<td class='text-left'>" + result[n].SalesMan + " </td>" +
               //"<td style='width:7%' class='text-left'>" + result[n].LPONumber + "                                   </td>" +
               "<td class='text-left'>" + result[n].DepartmentName + "                                   </td>" +
                "</tr>";
        }
        $('#tblsalestrans').html(ProdRow + '</tbody>');
        datatableWithsearch('tblsalestrans', 'MultipleSalesT');
        $('#tblsalestrans').scrollTop(0);
    }
    else {
        $('#tblsalestrans').html(ProdRow + '</tbody>');
        datatableWithsearch('tblsalestrans', 'MultipleSalesT');
    }
}

//Close Transaction Popup
function salestranspopuprefresh() {

    $('#tblsalestrans tr td').remove();
    $('#tblurchasetrans tr td').remove();
    $('#tblalltrans tr td').remove();
    $('#salestranspopupdiv').hide();
    $('#salestransdiv').hide();
    $('#alltranstransdiv').hide();
    $('#purchasetransdiv').hide();
    $('#salesheader').text('Transaction Details');
    $('#txtproduct0').focus();
}


//Save Sales Return
function savesalesreturn() {

    var len = $('#tblsalesinvoice tr').length;

  

    if ($('#typecash').prop("checked")) {
        $("#select_payterms").val(1);

    }
    else if ($('#typecredit').prop("checked")) {
        $("#select_payterms").val(2);

    }

    var r = parseFloat($('#txtcrncyrate').val() || 0).toFixed(Decimal);
    $("#txtcrncyrate").val(isNaN(r) ? 0 : r);
    var rowcount = CountRows();
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else if (copyflag == 1) {
        return false;
    }
    else if (($("#txtCustId").val() != 0) && (len > 0) && (parseFloat($('#GrandTotal').val()) <= 0) && ($('#disc').val() != 0)) {
        warningshow('GrandTotal Cannot be Negative or Zero', 'disc');
        $('#disc').select();
    }
    //else if ($("#select_payterms").val() == 0) {
    //    warningshow('Please Select Payment Type', 'select_payterms');
    //}
    else if ($.trim($("#txtcustomer").val()) == '') {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if (($("#txtCustId").val() == 0) && ($("#select_payterms").val() == 2)) {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    //else if ($('#select_salesman').val() == 0) {
    //    warningshow('Please Select Sales Man', 'select_salesman');
    //}
    else if ($('#select_place').val() == 0) {
        warningshow('Please Select Place', 'select_place');
    }
    //else if ($('#select_crncy').val() == 0 || $('#select_crncy').val() == null) {
    //    warningshow('Please Select Currency', 'select_crncy');
    //}
    //else if ($.trim($('#txtcrncyrate').val()) == '' || $.trim($('#txtcrncyrate').val()) == 0) {
    //    warningshow('Enter Currency Rate', 'txtcrncyrate');
    //    $('#txtcrncyrate').select();
    //}
    //else if (($('#select_jobno').val() != '') && ($('#ProjectJobId').val() == 0)) {
    //    warningshow('Please Select A Valid Job', 'select_jobno');
    //}
    else if (rowcount == 0) {
        warningshow('No Products Added!', 'txtproduct0');
    }
    else {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('save'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do You Want To Save?');

    }
}

function SaveConfirm() {
    SavingFlg = 1;
    $('#Loadingsave').show();
    $('#btnsubmit').prop('disabled', true);

    if ($('#select_salesman').val() == 0 || $('#select_salesman').val() == '')
        $('#select_salesman').val(UserSalesmanId);

    var oArray = new Array();
    for (var k = 1; k <= i - 1; k++) {

        var ProductId = $('#PrdtId' + k).val();
        var ProductCode = $('#txtproduct' + k).val();
        var ProductDescr = $('#ProductDesc' + k).val();
        var BillSeries = $('#txtBillseriesId').val();
        var ReturnNo = $('#txtBillSlNo').val();
        var UnitId = $('#select_unit' + k).val();
        var UnitName = $('#select_unit' + k).find("option:selected").attr("name");
        var ProdQty = $('#txtquantity' + k).val();
        var ProdRate = $('#txtfcrate' + k).val();
        var FcProdRate = $('#txtrate' + k).val();
        var ProdDisc = $('#txtfcdiscount' + k).val();
        var FcProdDisc = $('#txtdiscount' + k).val();
        var TaxableAmount = $('#txtfctaxableamnt' + k).val();
        var FCTaxableAmount = $('#txttaxableamnt' + k).val();
        var TaxId = $('#select_tax' + k).val();
        var TaxPercent = $('#txttaxpercent' + k).val();
        var TaxAmount = $('#txtfctaxamnt' + k).val();
        var FCTaxAmount = $('#txttaxamnt' + k).val();
        var Amount = $('#txtfcamnt' + k).val();
        var FCAmount = $('#txtamnt' + k).val();
        var LocnId = $('#select_location' + k).val();
        if ($('#select_location' + k).val() == 0 || $('#select_location' + k).val() == '' || $('#select_location' + k).val() == null)
            LocnId = UserLocationId;
        var BatchSNo = 1;
        var Batch = '';
        var PayType = $('#select_payterms').val();
        var LPONumber = $('#txtlpono').val();
        var CustId = $('#txtCustId').val();
        var CustName = $('#txtcustomer').val();
        var CustAddress = $('#txtaddress').val();
        var InvDate = $('#txtivdate').val();
        var InvTerms = $('#select_terms').val();
        var DueDate = $('#txtduedate').val();
        var LocId = $('#select_location0').val();
        if ($('#select_location0').val() == 0 || $('#select_location0').val() == '' || $('#select_location0').val() == null)
            LocId = UserLocationId;
        var SalesManId = $('#select_salesman').val();
        var AreaId = $('#select_place').val();
        var CurrencyId = $('#select_crncy').val();
        var CurrencyRate = $('#txtcrncyrate').val();
        var JobNumber = $('#ProjectJobId').val();
        var GrandTotal = $('#FcGrandTotal').val();
        var RoundGrandTotal = $('#roundgndtotal').val();
        var FCGrandTotal = $('#GrandTotal').val();
        var RoundFCGrandTotal = $('#roundfcgndtotal').val();
        var TotalDiscount = $('#FcTotalDiscount').val();
        var FCTotalDiscount = $('#TotalDiscount').val();
        var TotalTaxable = $('#FcTotalTaxable').val();
        var FCTotTaxable = $('#TotalTaxable').val();
        var TotalTax = $('#FcTotalTax').val();
        var FCTotTax = $('#TotalTax').val();
        var Remarks = $('#txtmsg').val();
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = 1;
        var BillDiscount = $('#disc').val();
        var AvgCost = $('#AvgCost' + k).val();
        var TotalCost = $('#TotalAvgCost').val();
        var BillSlNo = $('#Bilnumbr' + k).val();
        var BillSeriesId = $('#Bilseries' + k).val();

        var Taxable0 = $('#splittaxable_0').val();
        var Tax0 = $('#splittax_0').val();
        var Taxable5 = $('#splittaxable_5').val();
        var Tax5 = $('#splittax_5').val();
        var Taxable12 = $('#splittaxable_12').val();
        var Tax12 = $('#splittax_12').val();
        var Taxable18 = $('#splittaxable_18').val();
        var Tax18 = $('#splittax_18').val();
        var Taxable28 = $('#splittaxable_28').val();
        var Tax28 = $('#splittax_28').val();
        var TaxId1 = $('#mtaxid1').val();
        var TaxId2 = $('#mtaxid2').val();
        var TaxId3 = $('#mtaxid3').val();
        var TaxId4 = $('#mtaxid4').val();
        var TaxId5 = $('#mtaxid5').val();
        var Salesubid = $('#salesubid' + k).val();

        if (ProductCode != undefined) {
            oArray.push({
                'ProductId': ProductId,
                'ProductCode': ProductCode,
                'ProductDescr': ProductDescr,
                'BillSeries': BillSeries,
                'ReturnNo': ReturnNo,
                'UnitId': UnitId,
                'UnitName': UnitName,
                'ProdQty': ProdQty,
                'ProdRate': ProdRate,
                'FcProdRate': FcProdRate,
                'ProdDisc': ProdDisc,
                'FcProdDisc': FcProdDisc,
                'TaxableAmount': TaxableAmount,
                'FCTaxableAmount': FCTaxableAmount,
                'TaxId': TaxId,
                'TaxPercent': TaxPercent,
                'TaxAmount': TaxAmount,
                'FCTaxAmount': FCTaxAmount,
                'Amount': Amount,
                'FCAmount': FCAmount,
                'LocnId': LocnId,
                'BatchSNo': BatchSNo,
                'Batch': Batch,
                'PayType': PayType,
                'LPONumber': LPONumber,
                'CustId': CustId,
                'CustName': CustName,
                'CustAddress': CustAddress,
                'InvDate': InvDate,
                'InvTerms': InvTerms,
                'DueDate': DueDate,
                'LocId': LocId,
                'SalesManId': SalesManId,
                'AreaId': AreaId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'JobNumber': JobNumber,
                'GrandTotal': GrandTotal,
                'RoundGrandTotal': RoundGrandTotal,
                'FCGrandTotal': FCGrandTotal,
                'RoundFCGrandTotal': RoundFCGrandTotal,
                'TotalDiscount': TotalDiscount,
                'FCTotalDiscount': FCTotalDiscount,
                'TotalTaxable': TotalTaxable,
                'FCTotTaxable': FCTotTaxable,
                'TotalTax': TotalTax,
                'FCTotTax': FCTotTax,
                'Remarks': Remarks,
                'DeptId': DeptId,
                'UserId': UserId,
                'DelFlag': DelFlag,
                'BillDiscount': BillDiscount,
                'AvgCost': AvgCost,
                'TotalCost': TotalCost,
                'BillSlNo': BillSlNo,
                'BillSeriesId': BillSeriesId,

                'Taxable0': Taxable0,
                'Tax0': Tax0,
                'Taxable5': Taxable5,
                'Tax5': Tax5,
                'Taxable12': Taxable12,
                'Tax12': Tax12,
                'Taxable18': Taxable18,
                'Tax18': Tax18,
                'Taxable28': Taxable28,
                'Tax28': Tax28,
                'TaxId1': TaxId1,
                'TaxId2': TaxId2,
                'TaxId3': TaxId3,
                'TaxId4': TaxId4,
                'TaxId5': TaxId5,
                'Salesubid': Salesubid,
            })
        }

    }
    if (oArray != "") {

        var data = { 'SalesReturnModel': oArray };
        $.ajax(
    {

        type: "POST",
        url: "../SalesInvoice/SalesReturnInsertandUpdate",
        data: data,
        success: function (result) {
           
            
          
                var status = result.oList[0].Status;
                var billno = result.oList[0].ReturnNo;
                $('#txtBillSlNoSave').val(billno);
                JsBarcode("#barcode1", billno);
                var billsrs = $('#txtBillseriesId').find("option:selected").text();
                $('#btnsubmit').prop('disabled', false);
                $('#Loadingsave').hide();
                Showalerts(status, billsrs, billno);

            
        }
    });
    }
}

//Update Sales Return 
function updatesalesreturn() {

    var len = $('#tblsalesinvoice tr').length;

    if ($('#select_salesman').val() == 0 || $('#select_salesman').val() == '')
        $('#select_salesman').val(UserSalesmanId)

    if ($('#typecash').prop("checked")) {
        $("#select_payterms").val(1);

    }
    else if ($('#typecredit').prop("checked")) {
        $("#select_payterms").val(2);

    }

    var r = parseFloat($('#txtcrncyrate').val() || 0).toFixed(Decimal);
    $("#txtcrncyrate").val(isNaN(r) ? 0 : r);
    var rowcount = CountRows();
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else if (copyflag == 1) {
        return false;
    }
    else if (($("#txtCustId").val() != 0) && (len > 0) && (parseFloat($('#GrandTotal').val()) <= 0) && ($('#disc').val() != 0)) {
        warningshow('GrandTotal Cannot be Negative or Zero', 'disc');
        $('#disc').select();
    }
    //else if ($("#select_payterms").val() == 0) {
    //    warningshow('Please Select Payment Type', 'select_payterms');
    //}
    else if ($.trim($("#txtcustomer").val()) == '') {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if (($("#txtCustId").val() == 0) && ($("#select_payterms").val() == 2)) {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    //else if ($('#select_salesman').val() == 0) {
    //    warningshow('Please Select Sales Man', 'select_salesman');
    //}
    else if ($('#select_place').val() == 0) {
        warningshow('Please Select Place', 'select_place');
    }
    //else if ($('#select_crncy').val() == 0 || $('#select_crncy').val() == null) {
    //    warningshow('Please Select Currency', 'select_crncy');
    //}
    //else if ($.trim($('#txtcrncyrate').val()) == '' || $.trim($('#txtcrncyrate').val()) == 0) {
    //    warningshow('Enter Currency Rate', 'txtcrncyrate');
    //    $('#txtcrncyrate').select();
    //}
    //else if (($('#select_jobno').val() != '') && ($('#ProjectJobId').val() == 0)) {
    //    warningshow('Please Select A Valid Job', 'select_jobno');
    //}
    else if (rowcount == 0) {
        warningshow('No Products Added!', 'txtproduct0');
    }
    else {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('update'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do You Want To Update?');

    }
}

function UpdateConfirm() {
    $('#Loadingsave').show();
    $('#btnsaveedit').prop('disabled', true);

    var oArray = new Array();
    for (var k = 1; k <= i - 1; k++) {

        var ProductId = $('#PrdtId' + k).val();
        var ProductCode = $('#txtproduct' + k).val();
        var ProductDescr = $('#ProductDesc' + k).val();
        var BillSeries = $('#txtBillseriesId').val();
        var ReturnNo = $('#txtBillSlNo').val();
        var UnitId = $('#select_unit' + k).val();
        var UnitName = $('#select_unit' + k).find("option:selected").attr("name");
        var ProdQty = $('#txtquantity' + k).val();
        var ProdRate = $('#txtfcrate' + k).val();
        var FcProdRate = $('#txtrate' + k).val();
        var ProdDisc = $('#txtfcdiscount' + k).val();
        var FcProdDisc = $('#txtdiscount' + k).val();
        var TaxableAmount = $('#txtfctaxableamnt' + k).val();
        var FCTaxableAmount = $('#txttaxableamnt' + k).val();
        var TaxId = $('#select_tax' + k).val();
        var TaxPercent = $('#txttaxpercent' + k).val();
        var TaxAmount = $('#txtfctaxamnt' + k).val();
        var FCTaxAmount = $('#txttaxamnt' + k).val();
        var Amount = $('#txtfcamnt' + k).val();
        var FCAmount = $('#txtamnt' + k).val();
        var LocnId = $('#select_location' + k).val();
        if ($('#select_location' + k).val() == 0 || $('#select_location' + k).val() == '' || $('#select_location' + k).val() == null)
            LocnId = UserLocationId;
        var BatchSNo = 1;
        var Batch = '';
        var PayType = $('#select_payterms').val();
        var LPONumber = $('#txtlpono').val();
        var CustId = $('#txtCustId').val();
        var CustName = $('#txtcustomer').val();
        var CustAddress = $('#txtaddress').val();
        var InvDate = $('#txtivdate').val();
        var InvTerms = $('#select_terms').val();
        var DueDate = $('#txtduedate').val();
        var LocId = $('#select_location0').val();
        if ($('#select_location0').val() == 0 || $('#select_location0').val() == '' || $('#select_location0').val() == null)
            LocId = UserLocationId;
        var SalesManId = $('#select_salesman').val();
        var AreaId = $('#select_place').val();
        var CurrencyId = $('#select_crncy').val();
        var CurrencyRate = $('#txtcrncyrate').val();
        var JobNumber = $('#ProjectJobId').val();
        var GrandTotal = $('#FcGrandTotal').val();
        var RoundGrandTotal = $('#roundgndtotal').val();
        var FCGrandTotal = $('#GrandTotal').val();
        var RoundFCGrandTotal = $('#roundfcgndtotal').val();
        var TotalDiscount = $('#FcTotalDiscount').val();
        var FCTotalDiscount = $('#TotalDiscount').val();
        var TotalTaxable = $('#FcTotalTaxable').val();
        var FCTotTaxable = $('#TotalTaxable').val();
        var TotalTax = $('#FcTotalTax').val();
        var FCTotTax = $('#TotalTax').val();
        var Remarks = $('#txtmsg').val();
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = 1;
        var BillDiscount = $('#disc').val();
        var AvgCost = $('#AvgCost' + k).val();
        var TotalCost = $('#TotalAvgCost').val();
        var BillSlNo = $('#Bilnumbr' + k).val();
        var BillSeriesId = $('#Bilseries' + k).val();

        var Taxable0 = $('#splittaxable_0').val();
        var Tax0 = $('#splittax_0').val();
        var Taxable5 = $('#splittaxable_5').val();
        var Tax5 = $('#splittax_5').val();
        var Taxable12 = $('#splittaxable_12').val();
        var Tax12 = $('#splittax_12').val();
        var Taxable18 = $('#splittaxable_18').val();
        var Tax18 = $('#splittax_18').val();
        var Taxable28 = $('#splittaxable_28').val();
        var Tax28 = $('#splittax_28').val();
        var TaxId1 = $('#mtaxid1').val();
        var TaxId2 = $('#mtaxid2').val();
        var TaxId3 = $('#mtaxid3').val();
        var TaxId4 = $('#mtaxid4').val();
        var TaxId5 = $('#mtaxid5').val();
        var Salesubid = $('#salesubid' + k).val();

        if (ProductCode != undefined) {
            oArray.push({
                'ProductId': ProductId,
                'ProductCode': ProductCode,
                'ProductDescr': ProductDescr,
                'BillSeries': BillSeries,
                'ReturnNo': ReturnNo,
                'UnitId': UnitId,
                'UnitName': UnitName,
                'ProdQty': ProdQty,
                'ProdRate': ProdRate,
                'FcProdRate': FcProdRate,
                'ProdDisc': ProdDisc,
                'FcProdDisc': FcProdDisc,
                'TaxableAmount': TaxableAmount,
                'FCTaxableAmount': FCTaxableAmount,
                'TaxId': TaxId,
                'TaxPercent': TaxPercent,
                'TaxAmount': TaxAmount,
                'FCTaxAmount': FCTaxAmount,
                'Amount': Amount,
                'FCAmount': FCAmount,
                'LocnId': LocnId,
                'BatchSNo': BatchSNo,
                'Batch': Batch,
                'PayType': PayType,
                'LPONumber': LPONumber,
                'CustId': CustId,
                'CustName': CustName,
                'CustAddress': CustAddress,
                'InvDate': InvDate,
                'InvTerms': InvTerms,
                'DueDate': DueDate,
                'LocId': LocId,
                'SalesManId': SalesManId,
                'AreaId': AreaId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'JobNumber': JobNumber,
                'GrandTotal': GrandTotal,
                'RoundGrandTotal': RoundGrandTotal,
                'FCGrandTotal': FCGrandTotal,
                'RoundFCGrandTotal': RoundFCGrandTotal,
                'TotalDiscount': TotalDiscount,
                'FCTotalDiscount': FCTotalDiscount,
                'TotalTaxable': TotalTaxable,
                'FCTotTaxable': FCTotTaxable,
                'TotalTax': TotalTax,
                'FCTotTax': FCTotTax,
                'Remarks': Remarks,
                'DeptId': DeptId,
                'UserId': UserId,
                'DelFlag': DelFlag,
                'BillDiscount': BillDiscount,
                'AvgCost': AvgCost,
                'TotalCost': TotalCost,
                'BillSlNo': BillSlNo,
                'BillSeriesId': BillSeriesId,

                'Taxable0': Taxable0,
                'Tax0': Tax0,
                'Taxable5': Taxable5,
                'Tax5': Tax5,
                'Taxable12': Taxable12,
                'Tax12': Tax12,
                'Taxable18': Taxable18,
                'Tax18': Tax18,
                'Taxable28': Taxable28,
                'Tax28': Tax28,
                'TaxId1': TaxId1,
                'TaxId2': TaxId2,
                'TaxId3': TaxId3,
                'TaxId4': TaxId4,
                'TaxId5': TaxId5,
                'Salesubid': Salesubid,
            })
        }

    }
    if (oArray != "") {

        var data = { 'SalesReturnModel': oArray };
        $.ajax(
    {

        type: "POST",
        url: "../SalesInvoice/SalesReturnUpdate",
        data: data,
        success: function (result) {
            $('#Loadingsave').hide();
            $('#btnsaveedit').prop('disabled', false);

            if (result.oList[0].Status == 3) {
                $('#tblAlert tr').remove();
                $('#alertpopup').show();
                $('#alertdiv').show();
                $('#alertdiv1').hide();

                var Prod1 = "<tr class='jsgrid-row'><td colspan=3><h2 style='color:#FF586B'>Quantity Must be less than Billed Quantity</h2></td></tr>" +
                  "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>MaxQty</th></tr>";
                $('#tblAlert').append(Prod1);
                $("#btnokalert").focus();


                for (var k = 0; k < result.oList.length; k++) {

                    var Prod =
                    "<tr class='jsgrid-row' style='color:#607D8B'>" +
                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[k].ProductCode + "</td>" +
                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[k].ProductDescr + "</td>" +
                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[k].ProdQty + "</td></tr>";
                    $('#tblAlert').append(Prod);
                }
            }
            else {
                var status = result.oList[0].Status;
                var billno = result.oList[0].ReturnNo;
                $('#txtBillSlNoSave').val(billno);
                JsBarcode("#barcode1", billno);
                var billsrs = $('#txtBillseriesId').find("option:selected").text();

                Showalerts(status, billsrs, billno);
            }
        }
    });
    }
}

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv1').hide();
    $('#alertdiv').hide();
    $('#savedbillno').val('');
}

function deptload() {
    var data = {};
    data.DepartmentId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            $("#DepartmentCode").val(result.oList[0].DepartmentCode);
        }
    });

    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            DeptSelect = "";
            $("#select_dept").empty();
            DeptSelect = "<option value=0>-All-</option>";
            for (var j = 0; j < result.oList.length; j++) {
                DeptSelect += "<option value='" + result.oList[j].DepartmentId + "'name='" + result.oList[j].DepartmentName + "'>" + result.oList[j].DepartmentName + "</option>";
            }
            $("#select_dept").append(DeptSelect);
        }
    });
}

function GetDepartment() {
    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad(result.oList);


        }
    });
}

var DeptArray = [];

function DepartmentLoad(result) {
    for (var i = 0; i < result.length; i++) {
        DeptArray.push(result[i].DepartmentId);
    }
}

var DiscountLimit = 0;

function Getdisclimit() {
    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UsersGetandGets",
        data: data,
        success: function (result) {
            DiscountLimit = result.oList[0].DiscountPercent;
        }
    });

}

var PostingAllow = '';
function GetComapDets(result) {
    PostingAllow = result[0].PostingAllow;
    if (PostingAllow == 1) {
        $('.rndof').show();
        $('#msgdiv').attr("colspan", 6);
        $('#roundoffstatus').prop('checked', false);
    }
}

//Document Ready
$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: "../Login/CompanyDetailGet",
        data: data,
        success: function (result) {
            GetComapDets(result.QList);
        }
    });

    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserLocationGetandGets",
        data: data,
        success: function (result) {
            for (var b = 0; b <= result.oList.length; b++) {
                if (b != result.oList.length)
                    LocArray.push(result.oList[b].LocationId);
                else
                    LocnLoad(0);
            }
        }
    });

    GetDepartment();
    Getdisclimit();

    $("#btnNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnYes").focus();
        }
    });
    $("#btnYes").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnNo").focus();
        }
    });
    $("#btnNo").focus(function (e) {
        $("#btnNo").removeClass("btn btn-outline-primary");
        $("#btnNo").addClass("btn btn-primary");
    });
    $("#btnNo").focusout(function () {
        $("#btnNo").removeClass("btn btn-primary");
        $("#btnNo").addClass("btn btn-outline-primary");
    });

    $("#btnYes").focus(function (e) {
        $("#btnYes").removeClass("btn btn-outline-primary");
        $("#btnYes").addClass("btn btn-primary");
    });
    $("#btnYes").focusout(function () {
        $("#btnYes").removeClass("btn btn-primary");
        $("#btnYes").addClass("btn btn-outline-primary");
    });

    $("#btndept").focus(function (e) {
        $("#btndept").removeClass("btn btn-outline-primary");
        $("#btndept").addClass("btn btn-primary");
    });
    $("#btndept").focusout(function () {
        $("#btndept").removeClass("btn btn-primary");
        $("#btndept").addClass("btn btn-outline-primary");
    });


    $('#btndelete').click(function (e) {                       //Bill Cancel Button

        if ($('#txtBillSlNocopy').val() == '') {
            warningshow('Press Enter Return Number', 'txtBillSlNocopy');
        }
        else {
            if ($('#tblsalesinvoice tr td').length == 0) {
                Showalerts(3, $('#txtBillseriesId').find("option:selected").text(), $('#txtBillSlNocopy').val());
            }
            else {
                $('#confirm').show();
                $('#confirmOk').focus();
                $('#Confirmflag').val('billcancel'); $('#ConfirmRowId').val(0);
                $('#confirmmessage').text('Do you want to Cancel the Bill?');
            }
        }

    });

    deptload();
    $('.form-control').attr('autocomplete', 'off');

    //$('#btntrnsfr').css("height", '85%');
    //$('#select_transfer').css("height", '85%');
    $('#btnlocn').css("height", '100%');
    $('#select_locn').css("height", '100%');
    $('#btnsales').css("height", '100%');
    $('#select_salesman').css("height", '100%');
    //$('#btnsply').css("height", '100%');
    //$('#select_place').css("height", '100%');
    $('#btnterms').css("height", '85%');
    $('#select_terms').css("height", '85%');
    $('#btncrncy').css("height", '100%');
    $('#select_crncy').css("height", '100%');

    $("#btndisc").focus(function (e) {
        $("#btndisc").removeClass("btn btn-outline-primary");
        $("#btndisc").addClass("btn btn-primary");
    });
    $("#btndisc").focusout(function () {
        $("#btndisc").removeClass("btn btn-primary");
        $("#btndisc").addClass("btn btn-outline-primary");
    });

    $("#btncnclsave").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btndivdelete").focus();
        }
    });
    $("#btndivdelete").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclsave").focus();
        }
    });
    $("#cancelotp").keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#cancelotpremarks").focus();
        }
    });
    $("#cancelotpremarks").keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#btncnclsave").focus();
        }
    });
    $("#btndivdelete").focus(function (e) {
        $("#btndivdelete").removeClass("btn btn-outline-secondary");
        $("#btndivdelete").addClass("btn btn-secondary");
    });
    $("#btndivdelete").focusout(function (e) {
        $("#btndivdelete").removeClass("btn btn-secondary");
        $("#btndivdelete").addClass("btn btn-outline-secondary");

    });
    $("#btncnclsave").focus(function (e) {
        $("#btncnclsave").removeClass("btn btn-outline-warning");
        $("#btncnclsave").addClass("btn btn-warning");
    });
    $("#btncnclsave").focusout(function (e) {
        $("#btncnclsave").removeClass("btn btn-warning");
        $("#btncnclsave").addClass("btn btn-outline-warning");
    });
    $("#btnprdtadd4").focus(function (e) {
        $("#btnprdtadd4").removeClass("btn btn-outline-primary");
        $("#btnprdtadd4").addClass("btn btn-primary");
    });
    $("#btnprdtadd4").focusout(function () {
        $("#btnprdtadd4").removeClass("btn btn-primary");
        $("#btnprdtadd4").addClass("btn btn-outline-primary");
    });

    $("#txtotp").keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#otpremarks").focus();
        }
    });
    $("#otpremarks").keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#btnotpsave").focus();
        }
    });
    $("#btnotpsave").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnotpcancel").focus();
        }
    });
    $("#btnotpcancel").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnotpsave").focus();
        }
    });
    $("#btnotpsave").focus(function (e) {
        $("#btnotpsave").removeClass("btn btn-outline-warning");
        $("#btnotpsave").addClass("btn btn-warning");
    });
    $("#btnotpsave").focusout(function (e) {
        $("#btnotpsave").removeClass("btn btn-warning");
        $("#btnotpsave").addClass("btn btn-outline-warning");
    });
    $("#btnotpcancel").focus(function (e) {
        $("#btnotpcancel").removeClass("btn btn-outline-secondary");
        $("#btnotpcancel").addClass("btn btn-secondary");
    });
    $("#btnotpcancel").focusout(function (e) {
        $("#btnotpcancel").removeClass("btn btn-secondary");
        $("#btnotpcancel").addClass("btn btn-outline-secondary");
    });

    crncyload(0);
    placeload(0);
   
    Salesman(0);

    BillLoad();
    Terms(0);


    if (getQueryString('slno') != null) {
        var data = {};
        data.BillSeries = getQueryString('billseries');
        data.ReturnNo = getQueryString('slno');
        data.DeptId = getQueryString('dept');

        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesReturnGetandGets",
            data: data,
            success: function (result) {
                SalesGets(result.oList);
                // $('#txtBillSlNo').val(data.ReturnNo)
                $('.form-control').prop('disabled', true);
                $('.jsgrid-button').prop('disabled', true);

                $('#btnsubmit').prop("disabled", true);
                $('#btnlist').prop("disabled", true);
                $('#btnadd').prop("disabled", true);
                $('#txtBillSlNo').focus();
            }

        });
    }
    else {

        BillLoad();
    }



    $("#btnadd").focus(function (e) {
        $("#btnadd").removeClass("btn btn-outline-primary");
        $("#btnadd").addClass("btn btn-primary");
    });

    $("#btnadd").focusout(function () {
        $("#btnadd").removeClass("btn btn-primary");
        $("#btnadd").addClass("btn btn-outline-primary");
    });

    $("#btnok").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclalrt").focus();
        }
    });
    $("#btncnclalrt").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnok").focus();
        }
    });
    $("#btnok,#btnokalert").focus(function (e) {
        $("#btnok,#btnokalert").removeClass("btn btn-outline-primary");
        $("#btnok,#btnokalert").addClass("btn btn-primary");
    });
    $("#btnok,#btnokalert").focusout(function (e) {
        $("#btnok,#btnokalert").removeClass("btn btn-primary");
        $("#btnok,#btnokalert").addClass("btn btn-outline-primary");
    });
    $("#btnreturn").focus(function (e) {
        $("#btnreturn").removeClass("btn btn-outline-primary");
        $("#btnreturn").addClass("btn btn-primary");
    });
    $("#btnreturn").focusout(function (e) {
        $("#btnreturn").removeClass("btn btn-primary");
        $("#btnreturn").addClass("btn btn-outline-primary");
    });



    $("#btncnclalrt").focus(function (e) {
        $("#btncnclalrt").removeClass("btn btn-outline-primary");
        $("#btncnclalrt").addClass("btn btn-primary");
    });
    $("#btncnclalrt").focusout(function (e) {
        $("#btncnclalrt").removeClass("btn btn-primary");
        $("#btncnclalrt").addClass("btn btn-outline-primary");
    });

    //Print Button Click After Save Bill
    $('#btnok').click(function () {
        PrintthisBill(0);
        //PrintthisBillWindows('SALESRETURN', i, 'MAIN');
        alertpopuprefresh();
        formrefresh();
        Tbldelete();
    });


    //Cancel Button Click After Save Bill
    $('#btncnclalrt').click(function () {
        alertpopuprefresh();
        formrefresh();
        Tbldelete();
    });

    $("#btnsubmit").click(function (e) {
        savesalesreturn();
    });

    $("#tax_job").change(function () {
        var selectedValue = $(this).val();
        $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
        var x = $('#taxpercentage_job').val();
        CalcJobAmount();
    });


    $('#select_jobno').keypress(function (e) {
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (entrkey == 13) {
            e.preventDefault();
            if (($('#select_jobno').val() != '') && ($('#ProjectJobId').val() == 0)) {
                warningshow('Please Select A Valid Job', 'select_jobno');
                return true;
            }
            else {
                $('#txtproduct0').focus();
            }
        }


    });


    $("#txtproduct0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#PrdtId0').val() != 0) {
                if ($('#select_location0').val() == 0) {
                    warningshow('Press Enter Location', 'select_location0');
                    return false;
                }
                $('#txtquantity0').focus();
            }
            else if ($('#PrdtId0').val() == 0 && ($.trim($('#txtproduct0').val()) == 'job' || $.trim($('#txtproduct0').val()) == 'JOB')) {
                addpopupjob(1);
                clearrow();
                $('#productjob').focus();
            }
        }
        else if (key == 40 && $('#tblsalesinvoice tr').length > 0 && $("#txtproduct0").val() == '')           //By Pressing Down Arrow From Product, Focus goes into first row in the grid
        {
            try {
                var row = $('#tblsalesinvoice').find(' tbody tr:eq(0)').attr('id').match(/\d+/)[0];
                if (row) {
                    $('#txtquantity' + row).focus();
                    $('#txtquantity' + row).select();                   
                }
            }
            catch (err) {
               
            }

        }
    });


    $("#productjob").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();

            $('#unit_job').focus();

        }

    });
    $("#unit_job").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#quantity_job').focus();
        }

    });

    $('#quantity_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtrate_job").focus();
        }

    });
    $('#txtrate_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#discount_job").focus();
        }

    });
    $('#discount_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#tax_job").focus();
        }

    });
    $('#tax_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnjobsave").focus();
        }

    });



    $('#txt_code,#txt_cname,#txt_rate,#txtname,#select_areagroup,#txtcode,#txtdescription,#LocationName,#LocationCode,#code,#txt_fname,#txt_lname,#txt_amount,#txt_address1,#txt_address2,#txt_address3,#txtdesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });

    $('#txt_remark,#txtdescription,#LocationDescription,#txt_contactnumber,#txtterms').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 2).focus();
        }

    });



    $("#txtBillseriesId").change(function () {
        // $('#tour1').hide();
        Tbldelete();
        copyrefresh();
        var selectedValue = $(this).val();
        $("#txtBillSlNo").val($(this).find("option:selected").attr("name"))
        $("#txtBillSlNocopy").val($(this).find("option:selected").attr("name"))
        $('#txtcustomer').focus();

        $('#txtBlSlNo').val($(this).find("option:selected").attr("name"));
    });



    $('#select_payterms').val(2);
    $('#typecredit').prop("checked", true);


    $("#flip1").click(function () {
        $("#panel1").slideToggle(1);
        $('#txtmsg').focus();
    });



    var input = document.getElementById("btnpdct");
    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            $('#txtquantity0').focus();
        }
    });

    var input1 = document.getElementById("btncst");
    input1.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            $('#select_terms').focus();
        }
    });



    $('#select_payterms').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_transfer').focus();
            e.preventDefault();
        }
    });
    $('#select_transfer').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtcustomer').focus(); 
            e.preventDefault();
        }
    });
    $('#txtlpono').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtcustomer").focus();
        }

    });



    $('#select_terms').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_locn').focus();
            e.preventDefault();
        }
    });
    $("#select_terms").change(function () {
        var selectedValue = $(this).val();
        getdate();
    });



    $("#select_crncy").change(function () {

        var selectedValue = $(this).val();
        $("#txtcrncyrate").val(parseFloat($(this).find("option:selected").attr("name") || 0).toFixed(Decimal))
        for (j = 0; j <= i; j++) {
            amountcalculation(j);
        }
        fccalculation(i);
        Checkbilldiscnt(i);
        CalcDiscountSplitTax1();
        CalcGrandTotal(i);
        roundoffcalc();

    });
    $("#select_unit0").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit").val($(this).find("option:selected").attr("name"))
        $('#txtquantity0').focus();
        if ($(this).find("option:selected").attr("name") == 'FOC') {
            foc = 1;
            $('#txtrate0').val(0);
            amountcalculation(0);
        }
        if ($(this).find("option:selected").attr("name") != 'FOC') {
            foc = 0;
        }

    });
    $("#unit_job").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit").val($(this).find("option:selected").attr("name"))
        if ($(this).find("option:selected").attr("name") == 'FOC') {

            foc = 1;
            $('#txtrate_job').val(0);
            CalcJobAmount();
        }
        if ($(this).find("option:selected").attr("name") != 'FOC') {
            foc = 0;
        }
    });

    $("#select_locn").change(function (e) {

        $('#Warningpopup').fadeOut();
        $('#select_location0,#locn_job').val($('#select_locn').val());
        var selectedValue = $(this).val();
        $("#txtlcn").val($(this).find("option:selected").attr("name"))
        $('#select_location0').prop('disabled', true);
        checkpdcttextempty(this);
        $('#txtproduct0').val('');
        $('#ProductDesc0').val('');
        $('#PrdtId0').val('');
    });

    $('#select_locn').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_salesman').focus();
            e.preventDefault();
        }
    });
    $('#select_salesman').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_place').focus();
            e.preventDefault();
        }
    });
    $('#select_place').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtproduct0').focus();
            e.preventDefault();
        }
    });

    $('#select_crncy').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_jobno').focus();
            e.preventDefault();
        }
    });


    $('#select_tax0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnadd').focus();
            e.preventDefault();
        }
    });
    $('#select_location0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtquantity0').focus(); 
            e.preventDefault();
        }
    });
    $('#select_unit0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtquantity0').focus();
            e.preventDefault();
        }
    });
    $('#select_tax0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnadd').focus();
            e.preventDefault();
        }
    });

    $('#txtcustomer').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            //if ($('#txtCustId').val() == 0) {
                $('#txtproduct0').focus();
            //}

            e.preventDefault();
        }
    });
    $('#txtproduct0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && $('#PrdtId0').val() != 0) {
            $('#txtquantity0').focus();
            e.preventDefault();
        }
    });
    $('#txtBillseriesId').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtBillSlNocopy').focus();
            $('#txtBillSlNocopy').select();

            e.preventDefault();
        }
    });
    $('#txtBillSlNocopy').keyup(function (e) {
        e.preventDefault();
        //  $('#tour1').fadeOut();
        $('#Warningpopup').fadeOut();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        if (entrkey == 8) {
            Tbldelete();
            copyrefresh();
        }


    });

    $("#select_location0").change(function (e) {
        var selectedValue = $(this).val();
        $("#txtlcn").val($(this).find("option:selected").attr("name"))
    });




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



    var data = {};
    data.UnitId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UnitGetandGets",
        data: data,
        success: function (result) {
            UnitLoad(result.oList);
        }
    });



    // ------------------------------------------------------------------------------------------------------------Sales Invoice--------------------

    //View Button Click to view product details against an Invoice
    $("#btnview3").click(function (e) {
       
        
        var Billsln = '';
        var Billsr = 0;
        var CurncyId = '';
        var row = $('#RowGet8').val();
        var fl = 0;
        var SBlsrs = '';

        var checkboxes = document.getElementsByName('CheckcustSInv');
        for (var k = 1, j = row; k <= j; k++) { 
            if ($("#SlNoHdCheckCustSlInv" + k).is(":checked")) {   
                fl++;
            }
        }
        if (fl == 0) {
            warningshow('Select Bill Number');
        }
        else {
           
          
            for (var n = 1; n <= row; n++) {
                if ($("#SlNoHdCheckCustSlInv" + n).is(":checked")) {
                    CurncyId = $('#CurncyId' + n).text();
                    SBlsrs = $('#SBlsrs' + n).text();
                    break;
                }
            }
            for (var m = 1; m <= row; m++) {
                if ($("#SlNoHdCheckCustSlInv" + m).is(":checked")) {
                    if ($('#CurncyId' + m).text() != CurncyId) {
                        warningshow('Please Select Sales Invoice with Same Curency!');
                        return false;
                    }
                    else if ($('#SBlsrs' + m).text() != SBlsrs) {
                        warningshow('Please Select Sales Invoice with Same Series No!');
                        return false;
                    }
                    else {                      
                        if (Billsln == '') {
                            Billsln += $('#SInvcol' + m).text();
                            Billsr = $('#SBlsrs' + m).text();
                        }
                        else {

                            Billsln += ',' + $('#SInvcol' + m).text();
                        }
                    }
                }
                if(m==row)
                {
                    $('#Loadingsave').show();
                    document.getElementById("Enquirypopup").style.zIndex = "3";
                    sino = Billsln;
                    sisno = Billsr;
                    var data = {};
                    data.BlSlNo = Billsln;
                    data.BlSeriesId = Billsr;
                    data.ProductId = 0;
                    data.DeptId = ERPDeptId;
                    $.ajax({
                        type: "POST",
                        url: "../SalesInvoice/SalesInvoiceGetProductsSalesReturn",
                        data: data,
                        success: function (result) {
                            if (Billsr != 0) {
                                disable_datatable('tblSalesInvsub');
                                $('#tblSalesInvsub tr').remove();
                                ShowItemGetSalesInvoice(result.oList);
                            }
                        }
                    });
                }
            }
           
        }

    });


    //Button Click to add selected product details to grid from popup table (SalesInvoice table data)
    $("#btnprdtadd3").click(function (e) {
        var row = $('#tblSalesInvsub tr:last').attr('id').match(/\d+/)[0] || 1;
        var flg = 0;
        var checkboxes = document.getElementsByName('checkitemsi');
        for (var k = 0, j = checkboxes.length; k < j ; k++) {
            if (checkboxes[k].checked == true) {
                flg++; 
            }
            if(k==(j-1)) 
            {
              
                if (flg == 0) {
                    warningshow('Select Product');
                   
                }
                else {
                                    
                    $("#tblsalesinvoice tr").remove();
                    TaxClear();

                    var avail = 0;
                    $('#tblAlert tr').remove();
                    $('#alertpopup').hide();
                    $('#alertdiv').hide();
                    $('#alertdiv1').hide();
                    var Prod1 = "<tr class='jsgrid-row'><td colspan=4><h2 style='color:#FF586B'>Advance Given For These Products...</h2></td></tr>" +
                         "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Bill Number</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Amount</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Advance</th></tr>";
                    $('#tblAlert').append(Prod1);
                    for (m = 1; m <= row; m++) {
                        if ($("#SlNoCheckSIItem" + m).is(":checked")) {
                            var ProductId = $('#ItemId' + m).val();
                            var Productcode = $('#Productcode' + m).text();
                            var ProductDescr = $('#Des' + m).text();
                            var unitIdgrid = $('#UnitIdgrid' + m).val();
                            var qty = parseInt($('#qty_' + m).val() || 0);
                            var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
                            var avgcst = parseFloat($('#avg_' + m).val() || 0).toFixed(Decimal);
                            var discount = parseFloat($('#dis_' + m).val() || 0).toFixed(Decimal);
                            var taxid = $('#taxid' + m).val();
                            var taxrate = $('#taxrate' + m).val();
                            var taxableamt = parseFloat($('#taxableamt' + m).val() || 0).toFixed(Decimal);
                            var taxamt = parseFloat($('#taxamt_' + m).val() || 0).toFixed(Decimal);
                            var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
                            var fcrate = parseFloat($('#fcrte_' + m).val() || 0).toFixed(Decimal);
                            var fcdiscount = parseFloat($('#fcdis_' + m).val() || 0).toFixed(Decimal);
                            var fctaxableamt = parseFloat($('#fctaxableamt' + m).val() || 0).toFixed(Decimal);
                            var fctaxamt = parseFloat($('#fctaxamt_' + m).val() || 0).toFixed(Decimal);
                            var fctotal = parseFloat($('#fctotal_' + m).val() || 0).toFixed(Decimal);
                            var orderno = $('#qtnnoRow' + m).text();
                            var Locnid = $('#LocnId' + m).val();
                            var srsno = $('#billseriesno' + m).val();
                            var srlno = $('#billnumber' + m).val();
                            var advance = $('#advance' + m).val();
                            var slssubid = $('#slssubidrow' + m).val();

                            $('#txtSalesNo').val(srlno);
                            $('#txtSalesSrlNo').val(srsno);

                            var rowcount = CountRows();
                            if (rowcount == 0) {
                                i = 1;
                            }
                            var slno = rowcount + 1;
                            var id = parseInt(i);

                            var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row' onfocusout='updaterow(" + id + ")'>" +
                                "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                                //"<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                                "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                                "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'Bilseries' + id + " style='display:none' value='" + srsno + "' /><input type='text' id=" + 'Bilnumbr' + id + " style='display:none' value='" + srlno + "' /><input type='text' id=" + 'salesubid' + id + " style='display:none' value='" + slssubid + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "'></td>" +
                                "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "'></td>" +
                                "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                                "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='EditWarning(" + id + "),amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' id=" + 'txtquantity_id' + id + " value=" + qty + " style='display:none'></td>" +
                                "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='EditWarning(" + id + "),amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'  onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")> <input type='text' id=" + 'txtrate_id' + id + " value=" + rate + " style='display:none'></td>" +
                                "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (avgcst * qty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + avgcst + " style='background-color:white;height:30px'></td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                                "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "><input type='text' id=" + 'txtamnt_id' + id + " value=" + total + " style='display:none' name='transferamt'></td>" +
                                "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'><select disabled='' id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                                "</tr>";

                            $('#tblsalesinvoice').append(ProdRow1);
                            $('#select_unit' + id).val(unitIdgrid);
                            $('#select_tax' + id).val(taxid);
                            $('#select_location' + id).val(Locnid);
                            amountcalculation(id);
                            TaxSplit(id);

                            $('#select_unit' + id).prop('disabled', false);
                            $('#txtquantity' + id).prop('disabled', false);
                            $('#txtrate' + id).prop('disabled', false);
                            $('#txtdiscount' + id).prop('disabled', false);
                            $('#select_tax' + id).prop('disabled', false);
                            $('#select_location' + id).prop('disabled', false);

                            productpopuprefresh();
                            CalcGrandTotal(i);
                            fccalculation(i);

                            if (advance > 0) {
                                var Prod =
                                "<tr class='jsgrid-row' style='color:#607D8B'>" +
                                 "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + srlno + "</td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + Productcode + "</td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + total + "</td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + advance + "</td></tr>";    //Advance Amount
                                $('#tblAlert').append(Prod);
                                avail++;
                            }

                            i++;
                        }
                        // i = parseInt(row) + 1;
                        CloseEnquiry();
                        $('#txtproduct0').focus();
                        getdate();
                        if (avail != 0) {
                            $('#alertpopup').show();
                            $('#alertdiv').show();
                            $("#btnokalert").focus();
                        }

                        if ((parseFloat(discn) > 0)) {
                            $('#discmsg').text('');
                            $('#discdiv').show();
                            $('#discmsg').append('<h2>' + parseFloat(discn).toFixed(Decimal) + '</h2><h4>Total Discount given for Invoice</h4>');
                            $('#btndisc').focus();
                        }
                    }
                    Checkbilldiscnt(i);
                    CalcDiscountSplitTax1();
                    discn = 0;
                    roundoffcalc();
                    disabletables();
                }
            }
        }
             
    });
    // ------------------------------------------------------------------------------------------------------End Sales Invoice-----------------------

    //Button Click to add selected product details to grid from popup table (SalesInvoice table data) when custid=0
    $("#btnprdtadd4").click(function (e) {
        if ($('#tblSalesMainInvsub tr').length) {
            var row = $('#tblSalesMainInvsub tr:last').attr('id').match(/\d+/)[0] || 1;
            var flg = 0;

            var checkboxes = document.getElementsByName('checkitemsimain');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
                if (k == (j - 1)) {
                    if (flg == 0) {
                        warningshow('Select Product');
                    }
                    else {

                        $("#tblsalesinvoice tr").remove();
                        TaxClear();

                        var avail = 0;
                        $('#tblAlert tr').remove();
                        $('#alertpopup').hide();
                        $('#alertdiv').hide();
                        $('#alertdiv1').hide();
                        var Prod1 = "<tr class='jsgrid-row'><td colspan=4><h2 style='color:#FF586B'>Advance Given For These Products...</h2></td></tr>" +
                             "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Bill Number</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Amount</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Advance</th></tr>";
                        $('#tblAlert').append(Prod1);

                        for (m = 1; m <= row; m++) {
                            if ($("#SlNoCheckSImainItem" + m).is(":checked")) {
                                var ProductId = $('#ItemId' + m).val();
                                var Productcode = $('#Productcode' + m).text();
                                var ProductDescr = $('#Des' + m).text();
                                var unitIdgrid = $('#UnitIdgrid' + m).val();
                                var qty = parseInt($('#qty_' + m).val() || 0);
                                var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
                                var avgcst = parseFloat($('#avg_' + m).val() || 0).toFixed(Decimal);
                                var discount = parseFloat($('#dis_' + m).val() || 0).toFixed(Decimal);
                                var taxid = $('#taxid' + m).val();
                                var taxrate = $('#taxrate' + m).val();
                                var taxableamt = parseFloat($('#taxableamt' + m).val() || 0).toFixed(Decimal);
                                var taxamt = parseFloat($('#taxamt_' + m).val() || 0).toFixed(Decimal);
                                var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
                                var fcrate = parseFloat($('#fcrte_' + m).val() || 0).toFixed(Decimal);
                                var fcdiscount = parseFloat($('#fcdis_' + m).val() || 0).toFixed(Decimal);
                                var fctaxableamt = parseFloat($('#fctaxableamt' + m).val() || 0).toFixed(Decimal);
                                var fctaxamt = parseFloat($('#fctaxamt_' + m).val() || 0).toFixed(Decimal);
                                var fctotal = parseFloat($('#fctotal_' + m).val() || 0).toFixed(Decimal);
                                var orderno = $('#qtnnoRow' + m).text();
                                var Locnid = $('#LocnId' + m).val();
                                var srsno = $('#billseriesno' + m).val();
                                var srlno = $('#billnumber' + m).val();
                                var advance = $('#advance' + m).val();
                                var slssubid = $('#salesub' + m).val();

                                $('#txtSalesNo').val(srlno);
                                $('#txtSalesSrlNo').val(srsno);

                                var rowcount = CountRows();
                                if (rowcount == 0) {
                                    i = 1;
                                }
                                var slno = rowcount + 1;
                                var id = parseInt(i);

                                var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row' onfocusout='updaterow(" + id + ")'>" +
                                    "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                                    //"<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                                    "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                                    "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'Bilseries' + id + " style='display:none' value='" + srsno + "' /><input type='text' id=" + 'Bilnumbr' + id + " style='display:none' value='" + srlno + "' /><input type='text' id=" + 'salesubid' + id + " style='display:none' value='" + slssubid + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "'></td>" +
                                    "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "'></td>" +
                                    "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                                    "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='EditWarning(" + id + "),amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")> <input type='text' id=" + 'txtquantity_id' + id + " value=" + qty + " style='display:none'></td>" +
                                    "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='EditWarning(" + id + "),amountcalculation(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")> <input type='text' id=" + 'txtrate_id' + id + " value=" + rate + " style='display:none'></td>" +
                                    "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (avgcst * qty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + avgcst + " style='background-color:white;height:30px'></td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                                    "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "><input type='text' id=" + 'txtamnt_id' + id + " value=" + total + " style='display:none' name='transferamt'></td>" +
                                    "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'><select disabled='' id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                                    "</tr>";

                                $('#tblsalesinvoice').append(ProdRow1);
                                $('#select_unit' + id).val(unitIdgrid);
                                $('#select_tax' + id).val(taxid);
                                $('#select_location' + id).val(Locnid);
                                amountcalculation(id);
                                TaxSplit(id);

                                $('#select_unit' + id).prop('disabled', false);
                                $('#txtquantity' + id).prop('disabled', false);
                                $('#txtrate' + id).prop('disabled', false);
                                $('#txtdiscount' + id).prop('disabled', false);
                                $('#select_tax' + id).prop('disabled', false);
                                $('#select_location' + id).prop('disabled', false);

                                productpopuprefresh();
                                CalcGrandTotal(i);
                                fccalculation(i);

                                if (advance > 0) {
                                    var Prod =
                                    "<tr class='jsgrid-row' style='color:#607D8B'>" +
                                     "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + srlno + "</td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + Productcode + "</td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + total + "</td>" +
                                    "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + advance + "</td></tr>";    //Advance Amount
                                    $('#tblAlert').append(Prod);
                                    avail++;
                                }

                                i++;
                            }
                            // i = parseInt(row) + 1;
                            CloseEnquiry();
                            $('#txtproduct0').focus();
                            getdate();
                            if (avail != 0) {
                                $('#alertpopup').show();
                                $('#alertdiv').show();
                                $("#btnokalert").focus();
                            }
                        }
                        CalcDiscountSplitTax1();
                        roundoffcalc();
                        disabletables();
                        if ($('#select_transfer').val() > 0)
                            EditSalesInvoice(0);
                        else
                            EditSalesInvoice(1);
                    }

                }
            }
        }
        
    });
    // ------------------------------------------------------------------------------------------------------End Sales Invoice-----------------------
});


function EditWarning(id) {
    amountcalculation(id);
    if ($('#billnumber' + id).val() != 0 && $('#billnumber' + id).val() != '') {
        var quantityedit = parseFloat($('#txtquantity' + id).val());
        var rateedit = $('#txtamnt' + id).val();
        if (quantityedit > parseFloat($('#txtquantity_id' + id).val())) {
            warningshow('Quantity must be <= ' + $('#txtquantity_id' + id).val());
            $('#txtquantity' + id).val($('#txtquantity_id' + id).val());
            return false;
        }
        else if (parseFloat(rateedit) > parseFloat($('#txtamnt_id' + id).val())) {
            warningshow('Amount must be <=' + $('#txtamnt_id' + id).val());
            $('#txtrate' + id).val($('#txtrate_id' + id).val());
            return false;
        }
    }

}


function viewsales() {

  
    var Billsln = '';
    var Billsr = 0;
    var CurncyId = '';
    var row = $('#RowGet7').val();
    var fl = 0;
    var SBlsrs = '';

    var checkboxes = document.getElementsByName('CheckSInv');
       
    for (var k = 1, j = row; k <= j; k++) {
       
       if ($("#SlNoChecksalesinv" + k).is(":checked")) { 
            fl++;
        }
    }
    if (fl != 1) {
        warningshow('Select One Bill Number');
    }
    else {
        $('#Loadingsave').show();
        document.getElementById("Enquirypopup").style.zIndex = "3";
        for (var m = 1; m <= row; m++) {
            if ($("#SlNoChecksalesinv" + m).is(":checked")) {

                if (Billsln == '') {
                    Billsln += $('#Invcol' + m).text();
                    Billsr = $('#Blsrs' + m).text();
                }

            }
        }
        sinomain = Billsln;
        sisnomain = Billsr;
        var data = {};
        data.BlSlNo = Billsln;
        data.BlSeriesId = Billsr;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceGetProductsSalesReturn",
            data: data,
            success: function (result) {
                if (Billsr != 0)
                {

                    disable_datatable('tblSalesMainInvsub');
                    $('#tblSalesMainInvsub tr').remove();
                    ShowItemGetSalesInvoiceMain(result.oList);
}
                   
            }
        });
    }
}

//Main Function For Transfer dropdown
function Transfer() {
    disabletables();
    if ($('#select_transfer').val() == '')       //Sales Invoice  
    {
        Enquirypopupwindow(1);
    }
    else if ($('#select_transfer').val() > 0) {
        Enquirypopupwindow(2);
    }
}

//Show Enquiry PopUp and Display Enquiry List
function Enquirypopupwindow(id) {
    disabletables();
    $('#SalesInvdiv').hide();
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    $('#SalesInvMaindivsub').hide();
    if (id == 1)                                                      //List All Sales Invoice Details in pop up (Recall)
    {
        $('#btnback').show();
        if ($('#txtCustId').val() == 0 || $('#txtCustId').val() == '')            //If CustId==0 Get all Sales Invoice Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Sales Invoice Details');
            $('#SalesInvdiv').show();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.CustId = 0;
            data.FromDate = CurDate;
            data.ToDate = CurDate;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecallSalesreturn",
                data: data,
                success: function (result) {
                    disable_datatable('tblSalesInv');
                    $('#tblSalesInv tr').remove();
                  
                    SalesInvLoad(result.oList);
                }
            });
        }
        else                              //If CustId!=0 Get Sales Invoice Details against That Customer 
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Sales Invoice Details');
            $('#SalesInvdivcust').show();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivsub').hide();
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = CurDate;
            data.ToDate = CurDate;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecallSalesreturn",
                data: data,
                success: function (result) {
                    disable_datatable('tblSalesInvcust');
                    $('#tblSalesInvcust tr').remove();
                    SalesInvoiceCustLoad(result.oList);
                }
            });
        }
    }
    else if (id == 2)      //List Invoice Detials of Particular Billnumber
    {
        if ($('#Transferdeptid').val() != '' && $('#Transferdeptid').val() != '') {
            $('#btnback').hide();

            var data = {};
            data.CustId = 0;
            data.FromDate = CurDate;
            data.ToDate = CurDate;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecallSalesreturn",
                data: data,
                success: function (result) {
                    disable_datatable('tblSalesInv');
                    $('#tblSalesInv tr').remove();
                    SalesInvLoad(result.oList);
                }
            });

           
            sinomain = $('#select_transfer').val();
            sisnomain = $('#Transferbillseries').val();

            var data = {};
            data.BlSlNo = $('#select_transfer').val();
            data.BlSeriesId = $('#Transferbillseries').val();
            data.ProductId = 0;
            data.DeptId = $('#Transferdeptid').val();
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceGetProductsSalesReturn",
                data: data,
                success: function (result) {
                    if (result.oList.length > 0) {
                        $("#Enquirypopup").css("margin-top", '-50px');
                        $('#Enquirypopup').show();
                        $('#Enquiryheader').text('Sales Invoice Details');
                        disable_datatable('tblSalesMainInvsub');
                        $('#tblSalesMainInvsub tr').remove();
                        ShowItemGetSalesInvoiceMain(result.oList);
                    }
                    else {
                        $('#returnmsg').text('');
                        $('#returndiv').show();
                        $('#returnmsg').append('<h2>Bill Number ' + $('#select_transfer').val() + ' is already returned!</h2>');
                        $('#btnreturn').focus();
                    }

                }
            });

        }
        else
            warningshow('Please enter a valid Bill', 'select_transfer');
        $('#select_transfer').select();
    }
}

function cleartransferdetails(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode != 13) {
        $('#Transferbillseries').val('');
        $('#Transferdeptid').val('');

        $('#Salesmanlabel').text('');
    }
}

//---------------------------------------------------------------------------------------------Close Enquiry&Quotation--------------------------

//Close Enquiry PopUP
function CloseEnquiry() {
    disabletables();
    $('#SalesInvdiv').hide();
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    $('#Enquirypopup').hide();
    $('#Qtndiv').hide();
    $('#RowGet7').val(0);
    $('#RowGet8').val(0);
    $('#RowGet9').val(0);
    $('#rowcnt').val(0);
    $('#Warningpopup').fadeOut();
    Location = ''; Location1 = '';
    sino = ''; sisno = '';

    $('#SearchCustsi').val('')
    $('#hiddencustIdsi').val(0);
    $('#SearchFromdatesi').val(CurDate);
    $('#SearchToDatesi').val(CurDate);

    $('#SearchFromdatesi1').val(CurDate);
    $('#SearchToDatesi1').val(CurDate);

    $('#SearchProdsi').val('')
    $('#hiddenProdIdsi').val('');


    if (($('#txtcrncyrate').val() == 1 || $('#GrandTotal').val() <= 0)) {
        $("#fc").css("opacity", '0');
    }
    else {
        $("#fc").css("opacity", '100');
    }
   
}



//Clear Id's in Search
function emptyId(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddenProdIdsi').val(0);

        $('#hiddencustIdsi').val(0);
    }
}

//Back Button for Transfer Popup
function Back(id) {
    if (id == 4) {
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').show();
        $('#SalesInvdivsub').hide();
        $('#SearchCustsi').val('')
        $('#hiddencustIdsi').val(0);
        $('#SearchFromdatesi').val(CurDate);
        $('#SearchToDatesi').val(CurDate);

        $('#SearchFromdatesi1').val(CurDate);
        $('#SearchToDatesi1').val(CurDate);

        $('#SearchProdsi').val('')
        $('#hiddenProdIdsi').val('');
    }
    else if (id == 5) {
        $('#SalesInvMaindivsub').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdiv').show();
        $('#SalesInvdivsub').hide();

        $('#SearchProdsimain').val('')
        $('#hiddenProdIdsimain').val('');
    }
}

//Disable all tables
function disabletables() {
    try {
        //disable_datatable('tblSalesInv');
        //disable_datatable('tblSalesInvcust');
        //disable_datatable('tblSalesInvsub');
        //disable_datatable('tblSalesMainInvsub');
    }
    catch (err) {
    }

}

//---------------------------------------------------------------------------------------------End---------------------------------------------

//-------------------------------------------------------------------------------------------- Sales Invoice-----------------------------------------------------------------

//List Sales Invoice Details in Popup 
function SalesInvLoad(result) {
    var responseText = "<thead><tr><th></th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th>Grand Total</th><th style='display:none'></th></tr>" +
                              "<tr><th>Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th>GrandTotal</th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="CheckSInv" id= ' + 'SlNoChecksalesinv' + slno + ' ></td>' +
            '<td >' + result[l].BillDescription + '</td>' +
           '<td id=' + 'Invcol' + slno + '>' + result[l].BillSlNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td id=' + 'fcgrndtotal' + slno + '>' + parseFloat(result[l].FCGrandTotal).toFixed(Decimal) + '</td>' +
           '<td style="display:none" id=' + 'Blsrs' + slno + '>' + result[l].BillSeriesId + '</td>' +
           '</tr>';

    }
    $('#tblSalesInv').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesInv', 'Single');
    $('#RowGet7').val(result.length);
}

//Function Call To Load Sales Invoice Details To the Fields against a Bill No
function EditSalesInvoice(flg) {
    var row = $('#tblSalesMainInvsub tr:last').attr('id').match(/\d+/)[0];   
    if (flg == 1) {
        var BillSlNo; var BillSeriesId;
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckSImainItem" + m).is(":checked")) {
                BillSlNo = $('#billnumber' + m).val();
                BillSeriesId = $('#billseriesno' + m).val();
            }
            if (m == row) {
                var data = {};
                data.BillSlNo = BillSlNo;
                data.BillSeriesId = BillSeriesId;
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/SalesGetandGetsSalesretun",
                    data: data,
                    success: function (result) {
                        SalesInvGets(result.oList);
                    }
                });
            }
        }
    }
    else if (flg == 0) {

        var data = {};
        data.BillSlNo = $('#select_transfer').val();
        data.BillSeriesId = $('#Transferbillseries').val();
        data.DeptId = $('#Transferdeptid').val();

        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesGetandGetsSalesretun",
            data: data,
            success: function (result) {
                SalesInvGets(result.oList);
                $("#select_transfer").val(data.BillSlNo);
            }
        });
    }

}

//To Load Sales Invoice Details To the Fields against a Bill No
function SalesInvGets(result) {
   
    if (parseFloat(result[0].BillDiscount) > 0) {
        $('#discmsg').text('');
        $('#discdiv').show();
        $('#discmsg').append('<h2>' + parseFloat(result[0].BillDiscount).toFixed(Decimal) + '</h2><h4>Discount given for this Invoice</h4>');
        $('#btndisc').focus();
    }

    if (result[0].PayType == 2)
            $('#typecredit').prop("checked", true);
        else if (result[0].PayType == 1)
            $('#typecash').prop("checked", true);

    if (result[0].Status==0)        
            $('#disc').val(parseFloat(result[0].BillDiscount).toFixed(Decimal)); 
        else
            $('#disc').val('0.00');

    for (var n = 0; n < result.length; n++) {
        $('#txtSalesNo').val(result[n].BillSlNo);
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);
        $('#select_payterms').val(result[n].PayType);
        $('#txtlpono').val(result[n].TrnNumber);
        $('#select_terms').val(result[n].InvTerms);
        $('#txtExpdate').val(result[n].ExpectedDate);
        if (result[n].SalesManId != 0 && result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);

        $('#Salesmanlabel').text('Salesman : '+($('#select_salesman :selected').text()));
        if (result[n].AreaId != 0 && result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(DefaultArea);
        if (result[n].CurrencyId != 0 && result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate || 0).toFixed(Decimal));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val(parseFloat($('#select_crncy').find("option:selected").attr("name") || 0).toFixed(Decimal));
        }
        if (result[n].LocId != 0 && result[n].LocId != '')
            $('#select_locn').val(result[n].LocId);
        else
            $('#select_locn').val(UserLocationId);
        $('#select_location0').val($('#select_locn').val());
        
        $('#select_jobno').val(result[n].JobCode);
        $('#GrandTotal').val((parseFloat(result[n].FCGrandTotal).toFixed(Decimal)));
        $('#FcGrandTotal').val((parseFloat(result[n].GrandTotal).toFixed(Decimal)));
        $('#TotalTaxable').val((parseFloat(result[n].TotalTaxable).toFixed(Decimal)));
        $('#FcTotalTaxable').val((parseFloat(result[n].FCTotTaxable).toFixed(Decimal)));
        $('#TotalDiscount').val((parseFloat(result[n].TotalDiscount).toFixed(Decimal)));
        $('#FcTotalDiscount').val((parseFloat(result[n].FCTotalDiscount).toFixed(Decimal)));
        $('#TotalTax').val((parseFloat(result[n].TotalTax).toFixed(Decimal)));
        $('#FcTotalTax').val((parseFloat(result[n].FCTotTax).toFixed(Decimal)));
        $('#txtmsg').val(result[n].Remarks);
        $('#gndtotal').text(parseFloat(result[n].GrandTotal).toFixed(Decimal));
        $('#ProjectJobId').val(result[n].JobNumber);
        $('#TotalAvgCost').val((parseFloat(result[n].TotalCost).toFixed(Decimal)));
       
       


        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        $("#fc").css("opacity", '100');

    }

    //Checkbilldiscnt(i);


    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);
    CalcDiscountSplitTax1();
    $('#tblSalesInvsub tr').remove();
    getdate();
    roundoffcalc();
}

//List  Sales Invoice Details against a customer in Popup  
function SalesInvoiceCustLoad(result) {
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' style='zoom:1.5;'  id= 'SlNoHdCheckCustSlInv0' 'custom-control-input cz-bg-image-display' onchange='selectallcust1()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th>Grand Total</th><th style='display:none'></th><th style='display:none'></th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th>Grand Total</th><th style='display:none'></th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="CheckcustSInv" id= ' + 'SlNoHdCheckCustSlInv' + slno + ' ></td>' +
              '<td >' + result[l].BillDescription + '</td>' +
           '<td id=' + 'SInvcol' + slno + '>' + result[l].BillSlNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td id=' + 'fcgrndtotalc' + slno + '>' + parseFloat(result[l].FCGrandTotal).toFixed(Decimal) + '</td>' +
           '<td style="display:none" id=' + 'CurncyId' + slno + '>' + result[l].CurrencyId + '</td>' +
           '<td style="display:none" id=' + 'SBlsrs' + slno + '>' + result[l].BillSeriesId + '</td>' +
           '</tr>';
    }
    $('#tblSalesInvcust').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesInvcust', 'Multiple');
    $('#RowGet8').val(result.length);
}

//Selecting checkbox for Sales Invoice Customer List
function selectallcust1() {
    var rowCount = $('#RowGet8').val();
    var flag = $("#SlNoHdCheckCustSlInv0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoHdCheckCustSlInv" + h) != null) {
            document.getElementById("SlNoHdCheckCustSlInv" + h).checked = flag;
        }
    }
}

function ShowItemGetSalesInvoiceMain(result) {
    $('#SalesInvdiv').hide();
    $('#SalesInvMaindivsub').show();
  
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckSImainItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtsImain()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input name="checkitemsimain" type="checkbox" style="zoom:1.5;" checked  id= ' + 'SlNoCheckSImainItem' + slno + ' ></td>' +
       '<td id=' + 'Billdesc' + slno + '>' + result[l].BillDescription + '<input type="hidden" id=' + 'billseriesno' + slno + ' value=' + result[l].BillSeriesId + '></td>' +
       '<td id=' + 'billnoRow' + slno + '>' + result[l].BillSlNo + '<input type="hidden" id=' + 'billnumber' + slno + ' value=' + result[l].BillSlNo + '></td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '><input type="text" id= ' + 'salesub' + slno + ' value= ' + result[l].SalesSubId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + ' <input type="hidden" id=' + 'advance' + slno + ' value=' + result[l].TotalDiscount + '></td>' +           //TotalDiscount as Cash Advance Here
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '><input type="hidden" id="avg_' + slno + '" value=' + result[l].AvgCost + '></td>' +
        '<td style=display:none; id=' + 'discount' + slno + '>' + parseFloat(result[l].ProdDisc).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' + result[l].ProdDisc + '><input type="hidden" id="fcdis_' + slno + '" value=' + result[l].FcProdDisc + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' + result[l].TaxId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'LocnId' + slno + ' value= ' + result[l].LocnId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' + result[l].TaxPercent + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' + result[l].TaxableAmount + '><input type="text" style="display:none;" id= ' + 'fctaxableamt' + slno + ' value= ' + result[l].FCTaxableAmount + '></td>' +
        '<td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].TaxAmount).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' + result[l].TaxAmount + '><input type="hidden" id="fctaxamt_' + slno + '" value=' + result[l].FCTaxAmount + '>' +
        '<td id=' + 'total' + slno + '>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '><input type="hidden" id="fctotal_' + slno + '" value=' + result[l].FCAmount + '></td></tr>';
    }

    $('#tblSalesMainInvsub').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesMainInvsub', 'Multiple');
    $('#rowcnt').val(result.length);
    $('#Loadingsave').hide();
    document.getElementById("Enquirypopup").style.zIndex = "5"; 
}
var discn = 0;
//ProductList in the DB based on Bill No 
function ShowItemGetSalesInvoice(result) {
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').show();
 
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckSIItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtsI()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input name="checkitemsi" type="checkbox" style="zoom:1.5;" checked  id= ' + 'SlNoCheckSIItem' + slno + ' ></td>' +
       '<td id=' + 'Billdesc' + slno + '>' + result[l].BillDescription + '<input type="hidden" id=' + 'billseriesno' + slno + ' value=' + result[l].BillSeriesId + '></td>' +
       '<td id=' + 'billnoRow' + slno + '>' + result[l].BillSlNo + '<input type="hidden" id=' + 'billnumber' + slno + ' value=' + result[l].BillSlNo + '></td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '><input type="text" id= ' + 'slssubidrow' + slno + ' value= ' + result[l].SalesSubId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + ' <input type="hidden" id=' + 'advance' + slno + ' value=' + result[l].TotalDiscount + '></td>' +           //TotalDiscount as Cash Advance Here
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '><input type="hidden" id="avg_' + slno + '" value=' + result[l].AvgCost + '></td>' +
        '<td style=display:none; id=' + 'discount' + slno + '>' + parseFloat(result[l].ProdDisc).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' + result[l].ProdDisc + '><input type="hidden" id="fcdis_' + slno + '" value=' + result[l].FcProdDisc + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' + result[l].TaxId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'LocnId' + slno + ' value= ' + result[l].LocnId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' + result[l].TaxPercent + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' + result[l].TaxableAmount + '><input type="text" style="display:none;" id= ' + 'fctaxableamt' + slno + ' value= ' + result[l].FCTaxableAmount + '></td>' +
        '<td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].TaxAmount).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' + result[l].TaxAmount + '><input type="hidden" id="fctaxamt_' + slno + '" value=' + result[l].FCTaxAmount + '>' +
        '<td id=' + 'total' + slno + '>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '><input type="hidden" id="fctotal_' + slno + '" value=' + result[l].FCAmount + '></td></tr>';
    }
    $('#Loadingsave').hide();
    document.getElementById("Enquirypopup").style.zIndex = "5";
    $('#tblSalesInvsub').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesInvsub', 'Multiple');
    $('#RowGet9').val(result.length);
    discn = result[0].BillDiscount || 0;
}

//Selecting checkbox for productslist(Sales Invoice) when custid != 0
function selectallprdtsI() {
    var rowCount = $('#RowGet9').val();
    var flag = $("#SlNoCheckSIItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckSIItem" + h) != null) {
            document.getElementById("SlNoCheckSIItem" + h).checked = flag;
        }
    }
}

//Selecting checkbox for productslist(Sales Invoice) when custid=0
function selectallprdtsImain() {
    var rowCount = (($('#tblSalesMainInvsub tr:last').attr('id').match(/\d+/)[0]) || 1);
    var flag = $("#SlNoCheckSImainItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckSImainItem" + h) != null) {
            document.getElementById("SlNoCheckSImainItem" + h).checked = flag;
        }
    }
}

//Saerch Customer in sales Invoice Popup When CustId=0 
function SearchSInv(Flag) {
    disable_datatable('tblSalesInv');
    if (Flag == 1)                         //search
    {
        if ($('#hiddencustIdsi').val() == 0) {
            $('#SearchCustsi').val('');
            $('#SearchCustsi').focus();
        }

        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Invoice Details');
        $('#SalesInvdiv').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = $('#hiddencustIdsi').val();
        data.FromDate = $('#SearchFromdatesi').val();
        data.ToDate = $('#SearchToDatesi').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecallSalesreturn",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInv').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    disable_datatable('tblSalesInv');
                    $('#tblSalesInv tr').remove();
                    SalesInvLoad(result.oList);
                }
            }
        });
    }
    else if (Flag == 0)                      //Clear
    {
        $('#SearchCustsi').val('')
        $('#hiddencustIdsi').val(0);
        $('#SearchFromdatesi').val(CurDate);
        $('#SearchToDatesi').val(CurDate);

        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Invoice Details');
        $('#SalesInvdiv').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = 0;
        data.FromDate = CurDate;
        data.ToDate = CurDate;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecallSalesreturn",
            data: data,
            success: function (result) {
                disable_datatable('tblSalesInv');
                $('#tblSalesInv tr').remove();
                SalesInvLoad(result.oList);
            }
        });
    }
}

//Search Customer in sales Invoice Popup When CustId!=0
function SearchSInvCust(flag) {
    disable_datatable('tblSalesInvcust');
    if (flag == 1)          //Search
    {

        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Invoice Details');
        $('#SalesInvdivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdatesi1').val();
        data.ToDate = $('#SearchToDatesi1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecallSalesreturn",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInvcust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    disable_datatable('tblSalesInvcust');
                    $('#tblSalesInvcust tr').remove();
                    SalesInvoiceCustLoad(result.oList);
                }
            }
        });

    }
    else if (flag == 0)        //Clear
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Invoice Details');
        $('#SalesInvdivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        $('#SearchFromdatesi1').val(CurDate);
        $('#SearchToDatesi1').val(CurDate);
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = CurDate;
        data.ToDate = CurDate;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecallSalesreturn",
            data: data,
            success: function (result) {
                disable_datatable('tblSalesInvcust');
                $('#tblSalesInvcust tr').remove();
                SalesInvoiceCustLoad(result.oList);
            }
        });
    }
}

//Saerch Product in sales Invoice Popup
var sino = ''; var sisno = '';
function SearchSInvoiceSub(Flag) {
    disable_datatable('tblSalesInvsub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIdsi').val() == 0) {
            $('#SearchProdsi').val('');
            $('#SearchProdsi').focus();
        }
        var data = {};
        data.BlSlNo = sino;
        data.BlSeriesId = sisno;
        data.ProductId = $('#hiddenProdIdsi').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceGetProductsSalesReturn",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInvsub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    disable_datatable('tblSalesInvsub');
                    $('#tblSalesInvsub tr').remove();
                    ShowItemGetSalesInvoice(result.oList);
                }
            }
        });
    }

    else if (Flag == 0) {                               //Clear
        $('#SearchProdsi').val('')
        $('#hiddenProdIdsi').val('');
        var data = {};
        data.BlSlNo = sino;
        data.BlSeriesId = sisno;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceGetProductsSalesReturn",
            data: data,
            success: function (result) {
                disable_datatable('tblSalesInvsub');
                $('#tblSalesInvsub tr').remove();
                ShowItemGetSalesInvoice(result.oList);
            }
        });
    }
}


var sinomain = ''; var sisnomain = '';
function SearchSInvoiceSubmain(Flag) {
    disable_datatable('tblSalesMainInvsub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIdsimain').val() == 0) {
            $('#SearchProdsimain').val('');
            $('#SearchProdsimain').focus();
        }
        var data = {};
        data.BlSlNo = sinomain;
        data.BlSeriesId = sisnomain;
        data.ProductId = $('#hiddenProdIdsimain').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceGetProductsSalesReturn",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesMainInvsub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    disable_datatable('tblSalesMainInvsub');
                    $('#tblSalesMainInvsub tr').remove();
                    ShowItemGetSalesInvoiceMain(result.oList);
                }
            }
        });
    }

    else if (Flag == 0) {                               //Clear
        $('#SearchProdsimain').val('')
        $('#hiddenProdIdsimain').val('');
        var data = {};
        data.BlSlNo = sinomain;
        data.BlSeriesId = sisnomain;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceGetProductsSalesReturn",
            data: data,
            success: function (result) {
                disable_datatable('tblSalesMainInvsub');
                $('#tblSalesMainInvsub tr').remove();
                ShowItemGetSalesInvoiceMain(result.oList);
            }
        });
    }
}


//--------------------------------------------------------------------------------------------End Sales Invoice-----------------------------------------------------------------


var copyflag = 0;

function formrefreshconfirm() {
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        var rowcount = CountRows();
        if (rowcount > 0 && copyflag == 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('refresh'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Data will be lost.Do you want to Continue?');
        }
        else {
            formrefresh();
        }
    }
}

//All Popup Refresh
function popuprefresh() {
    $('#popupdiv').hide();
    $('#txt_code').val('');
    $('#txt_cname').val('');
    $('#txt_rate').val('');
    $('#txt_remark').val('');
    $('#CrncyId').val(0);

    $('#txtname').val('');
    $('#select_areagroup').val('0');
    $('#txtcode').val('');
    $('#txtdescription').val('');
    $('#AreaId').val(0);

    $('#LocationName').val('');
    $('#LocationCode').val('');
    $('#LocationDescription').val('');
    $('#LocationId').val(0);

    $('#code').val('');
    $('#txt_fname').val('');
    $('#txt_lname').val('');
    $('#txt_amount').val('');
    $('#txt_contactnumber').val('');
    $('#txt_address1').val('');
    $('#txt_address2').val('');
    $('#txt_address3').val('');
    $('#SalesmanId').val(0);

    $('#txtterms').val('');
    $('#txtdesc').val('');
    $('#TermsId').val(0);
}

//Product Popup Refresh
function productpopuprefresh() {
    $('#productpopupdiv').hide();
    $('#pdctrow').remove();
    $('#pdctrow1').remove();
    $('#custlsp').hide();
}

//Form Refresh
function formrefresh() {
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        $('#copybill').hide();
        $('#bill').show();
        $('#txtBillSlNocopy').prop('disabled', false);
        $('#Trnno').val('');

        $('#btnlist').prop('disabled', false);
        //$('#btntrnsfr').css("height", '85%');

        $('#btnsubmit').prop("disabled", false);
        $('#btnlist').prop("disabled", false);
        $('#txtBillSlNo').prop("disabled", true);
        $('#btnadd').prop("disabled", false);
        $('#txtcustomer').prop("disabled", false);
        $('#txtivdate').val(CurDate);
        $('#txttaxpercent0').val('');
        $('#txtmsg').val('');
        $('#txtBillseriesId').val();
        $('#txtBillSlNo').val('');
        $('#txtBillSlNocopy').val('');
        $('#select_payterms').val(2);
        $('#typecredit').prop("checked", true);
        $('#select_transfer').val('');
        $('#txtcustomer').val('');
        $('#txtCustId').val(0);
        $('#select_terms').val(0);


        $('#txtaddress').val('');
        $('#PriceGroupId').val(0);
        $('#TransPrdtId0').val(0);

        $('#codelength').val('');
        $('#select_salesman').val(UserSalesmanId);

        $('#select_jobno').val('');
        $('#txtproduct0').val('');


        $('#select_unit0').val(0);
        $('#txtquantity0').val('');
        $('#txtstocktotloseqty0').val(0);
        $('#txtrate0').val('');
        $('#txtdiscount0').val('');
        $('#select_tax0').val(0);
        $('#txtamnt0').val('');
        $('#txtlpono').val('');

        $('#roundgndtotal').val(0);
        $('#roundfcgndtotal').val(0);

        $('#TotalDiscount').val('0.00');
        $('#TotalTaxable').val('0.00');
        $('#TotalTax').val('0.00');
        $('#GrandTotal').val('0.00');

        $('#gndtotal').text('0.00');
        $('#fc').text('fc');
        $("#fc").css("opacity", '0');
        $('#btndelete,#btnsaveedit,#btnedit').hide();
        $('#Warningpopup').fadeOut();
        GrandTotal = 0;
        BillLoad();
        copyflag = 0;
        foc = 0;
        qtyflag = 0;
        discn = 0;

        $('#txtduedate').css("background-color", 'white');
        //$('#txttaxpercent0').css("background-color", 'white');
        //$('#txtamnt0').css("background-color", 'white');
        $('.form-control,.btn-outline-primary').prop("disabled", false);
        $('#txtBillSlNo').prop("disabled", true);
        $('#txtduedate').prop("disabled", true);
        $('#txttaxpercent0').prop("disabled", true);
        $('#txtamnt0').prop("disabled", true);

        $('.jsgrid').prop("disabled", false);
        //  $('#tour1').fadeOut();

        productpopuprefresh();

        Tbldelete();
        copyrefresh();
        

        $('#custlsp').hide();
        $('#btnprvs').prop("disabled", true);
        $('#btnnxt').prop("disabled", true);
        //$('#select_transfer').css("height", '85%');
        $('#btnlocn').css("height", '100%');


        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val(parseFloat($('#select_crncy').find("option:selected").attr("name") || 0).toFixed(Decimal));


        $('#RowGet7').val(0);
        $('#RowGet8').val(0);
        $('#RowGet9').val(0);
        $('#RowGetprdt').val(0);
        $('#rowcnt').val(0);

        CloseEnquiry();

        $('#editheader').show();
        $('#select_locn').val(UserLocationId);
        $('#select_location0').val(UserLocationId);
        $('#locn_job').val(UserLocationId);
        $('#select_place').val(DefaultArea);
        $('#HiddenTotal,#GTotal').val(0);

        $('#TotalAvgCost').val(0);
        $('#LineAvgCost0').val(0);
        $('#AvgCost0').val(0);
        $('#txtduedate').val(CurDate);
        $('#TotalDiscount,#TotalTaxable,#TotalTax,#TotRoundOff').prop("disabled", true);
        $('#TotRoundOff').val('0.00');
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';
        $('#btnprint').hide();
        $('#btnsubmit').show();
        $('#btnlist').show();
        $("#panel1").hide();
        TaxClear();
        alertpopuprefresh();
        $('#tblAlert tr').remove();
        $('#Discountpercent').prop("disabled", true);
        Checkbilldiscnt(i);
        CalcDiscountSplitTax1();
        $('#Transferbillseries').val('');
        $('#Transferdeptid').val('');

        $("#txtotp,#otpremarks").val('');
        $("#cancelotp,#cancelotpremarks").val('');
        $('#txtivdate').prop("disabled", false);

        $('#typecash,#typecredit').prop("disabled", false);
        $('#Salesmanlabel,#Userlabel').text('')
        $('#txtBillSlNoSave').val('');

        $('#roundoffstatus').prop('checked', false);
        SavingFlg = 0;
        if (PostingAllow == 0) {
            $('#roundoffstatus').prop('disabled', true);
            roundoffcalc();
        }
        else {
            //$('#roundoffstatus').prop('checked', true);
            $('#roundoffstatus').prop('disabled', false);
            roundoffcalc();
        }
    }

}

function Defaultfocus() {
    $('#select_transfer').focus();
}

//Calculate GrandTotal Amount 
var GrandTotal;
function CalcGrandTotal(Id) {
    var TotalTaxable = 0;
    var TotalDiscount = 0;
    var TotalTax = 0;
    var LineAverage = 0;
    GrandTotal = 0;
    $('#GrandTotal').val('');
    $('#TotalDiscount').val('');
    $('#TotalTax').val('');
    $('#TotalTaxable').val('');
    $('#TotalAvgCost').val('');
    for (var i = 1; i <= Id; i++) {
        GrandTotal = GrandTotal + parseFloat($('#txtamnt' + i).val() || 0);
        TotalDiscount = TotalDiscount + parseFloat($('#txtdiscount' + i).val() || 0);
        TotalTax = TotalTax + parseFloat($('#txttaxamnt' + i).val() || 0);
        TotalTaxable = TotalTaxable + parseFloat($('#txttaxableamnt' + i).val() || 0);
        LineAverage = LineAverage + parseFloat($('#LineAvgCost' + i).val() || 0);
    }
    $('#HiddenTotal').val(TotalTaxable.toFixed(Decimal))
    $('#GTotal').val(GrandTotal.toFixed(Decimal))


    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#TotalDiscount').val(TotalDiscount.toFixed(Decimal));
    $('#TotalTax').val(TotalTax.toFixed(Decimal));
    $('#TotalTaxable').val(TotalTaxable.toFixed(Decimal));
    $('#TotalAvgCost').val(LineAverage.toFixed(Decimal));
    $('#gndtotal').text(GrandTotal.toFixed(Decimal));

    fccalculation(Id);

}

//Calculate Each Row Total Amount FC
function fccalculation(id) {
    var fc = parseFloat($('#txtcrncyrate').val() || 0).toFixed(Decimal);
    fc = isNaN(fc) ? 0 : fc;

    var fcgrandtotal = 0;
    var fctotdisc = 0;
    var fctottaxable = 0;
    var fctottax = 0;

    fcgrandtotal = parseFloat($('#GrandTotal').val() || 0) * fc;
    var rowcount = CountRows();
    if (fcgrandtotal > 0 && rowcount > 0) {
        $("#fc").text('FC : ' + GrandTotal.toFixed(Decimal));

        if (fc != 1) {
            $("#fc").css("opacity", '100');
        }
        else {
            $("#fc").css("opacity", '0');
        }
        $('#gndtotal').text(fcgrandtotal.toFixed(Decimal));

    }
    else {
        $("#fc").css("opacity", '0');
    }


    fctotdisc = parseFloat($('#TotalDiscount').val()) * fc;
    fctottaxable = parseFloat($('#TotalTaxable').val()) * fc;
    fctottax = parseFloat($('#TotalTax').val()) * fc;

    $('#FcTotalDiscount').val(fctotdisc.toFixed(Decimal));
    $('#FcTotalTaxable').val(fctottaxable.toFixed(Decimal));
    $('#FcTotalTax').val(fctottax.toFixed(Decimal));
    $('#FcGrandTotal').val(fcgrandtotal.toFixed(Decimal));


}

//Calculate Each Row Total Amount
function amountcalculation(id) {
    var fc = parseFloat($('#txtcrncyrate').val() || 0).toFixed(Decimal);
    var fcprodrate = 0;
    var fcproddisc = 0;
    var fctaxable = 0;
    var fctax = 0;
    var fcamnt = 0;

    var quantity = $('#txtquantity' + id).val() || 0;
    var LineAvgCost = quantity * parseFloat($('#AvgCost' + id).val() || 0);
    var rate = parseFloat($('#txtrate' + id).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var amount = parseFloat(quantity * rate);
    var discount = parseFloat($('#txtdiscount' + id).val() || 0);
    discount = isNaN(discount) ? 0 : discount;
    var taxableamount = parseFloat(amount - discount);
    var taxrate = parseFloat($('#txttaxpercent' + id).val() || 0);
    var taxamount = parseFloat((taxableamount * taxrate) / 100);
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));
    $('#LineAvgCost' + id).val(LineAvgCost.toFixed(Decimal));
    $('#txtamnt' + id).val(totalamount.toFixed(Decimal));
    $('#txttaxableamnt' + id).val(taxableamount.toFixed(Decimal));
    $('#txttaxamnt' + id).val((taxamount).toFixed(Decimal));

    fcprodrate = parseFloat($('#txtrate' + id).val() || 0) * fc;
    fcproddisc = parseFloat($('#txtdiscount' + id).val() || 0) * fc;
    fctaxable = parseFloat($('#txttaxableamnt' + id).val() || 0) * fc;
    fctax = parseFloat($('#txttaxamnt' + id).val() || 0) * fc;
    fcamnt = parseFloat($('#txtamnt' + id).val() || 0) * fc;

    $('#txtfcrate' + id).val(fcprodrate.toFixed(Decimal));
    $('#txtfcdiscount' + id).val(fcproddisc.toFixed(Decimal));
    $('#txtfctaxableamnt' + id).val(fctaxable.toFixed(Decimal));
    $('#txtfctaxamnt' + id).val(fctax.toFixed(Decimal));
    $('#txtfcamnt' + id).val(fcamnt.toFixed(Decimal));
    if (id != 0) {
        CalcGrandTotal(i);
        roundoffcalc();
    }
}

//Tax Split for Product Add
function TaxSplit(RowId) {

    var TaxId = $('#txttaxpercent' + RowId).val()
    var splittaxable = parseFloat($('#txttaxableamnt' + RowId).val());
    var CurrentSplitTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val() || 0);

    var splittax = parseFloat($('#txttaxamnt' + RowId).val());
    var CurrentSplitTax = parseFloat($('#hiddensplittax_' + TaxId).val() || 0);
    CurrentSplitTaxable = parseFloat(CurrentSplitTaxable + splittaxable);
    CurrentSplitTax = parseFloat(CurrentSplitTax + splittax);

    $('#splittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#splittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
    $('#hiddensplittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));

}



//Tax Split for Row Delete
function TaxSplitDelete(TaxId, Taxable, Tax) {

    var CurrentSplitTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val());
    CurrentSplitTaxable = parseFloat(CurrentSplitTaxable - Taxable);

    var CurrentSplitTax = parseFloat($('#hiddensplittax_' + TaxId).val());
    CurrentSplitTax = parseFloat(CurrentSplitTax - Tax);
    //CurrentSplitTax = parseFloat((CurrentSplitTaxable * TaxId) / 100);

    $('#splittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#splittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
    $('#hiddensplittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
}

//Tax Split for Row Update
function TaxSplitupdate(PrevtaxId, PrevSplitTaxable, PrevSplitTax, RowId) {

    var PrevTaxable = parseFloat($('#hiddensplittaxable_' + PrevtaxId).val());
    PrevTaxable = parseFloat(PrevTaxable - PrevSplitTaxable);
    var PrevTax = parseFloat($('#hiddensplittax_' + PrevtaxId).val());
    PrevTax = parseFloat(PrevTax - PrevSplitTax);

    $('#splittaxable_' + PrevtaxId).val(PrevTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + PrevtaxId).val(PrevTaxable.toFixed(Decimal));
    $('#splittax_' + PrevtaxId).val(PrevTax.toFixed(Decimal));
    $('#hiddensplittax_' + PrevtaxId).val(PrevTax.toFixed(Decimal));
    TaxSplit(RowId);
}

//Clear Product Row After Adding
function clearrow() {


    $('#codelength').val('');
    $('#TransPrdtId0').val(0);
    $('#PrdtId0').val('');
    $('#txtproduct0').val('');
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_unit0').val(0);
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#txttaxpercent0').val('');
    $('#txtproduct0').focus();
    $('#select_location0').val($('#select_locn').val());
    $('#AvgCost0').val('');
}


var qtyflag = 0;
var foc = 0;

//Add Product Details To Product Grid
function productadd() {
    var a = parseFloat($('#txtdiscount0').val());
    var c = parseFloat($('#txtrate0').val());
    $("#txtdiscount0").val(isNaN(a) ? 0 : a);
    $('#txtrate0').val(isNaN(c) ? 0 : c);
    var rowcount = CountRows();
    var ProductFlag = 0;
    //for (p = 1; p <= i; p++) {
    //    if (($('#PrdtId' + p).val() == $("#PrdtId0").val()) && $('#select_location' + p).val() == $("#select_location0").val()) {
    //        ProductFlag = 1;
    //    }
    //}

    if ($.trim($("#txtproduct0").val()) == '') {
        warningshow('Please Enter The Product', 'txtproduct0');
    }
    else if ($("#PrdtId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
        $('#txtproduct0').select();
    }

    else if ($('#select_location0').val() == 0) {
        warningshow('Please Select Location', 'select_location0');
    }
    else if ($("#select_unit0").val() == 0 || $("#select_unit0").val() == '') {
        warningshow('Please Select The Unit', 'select_unit0');
        $('#select_unit0').select();
    }
    else if ($("#txtquantity0").val() == '' || $("#txtquantity0").val() == 0) {
        warningshow('Please Enter The Quantity', 'txtquantity0');
        $('#txtquantity0').select();
    }
    else if ($("#txtrate0").val() == '') {
        warningshow('Please Enter The Rate', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ((BelowCost == 'NO') && (parseFloat($("#txtrate0").val()) < parseFloat($('#AvgCost0').val()))) {
        warningshow('Rate must be greater than ' + $('#AvgCost0').val(), 'txtrate0');
        $('#txtrate0').select();
        return false;
    }
    else if (foc == 0 && ($("#txtamnt0").val() == 0)) {

        warningshow('Amount cant be 0', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ($("#txtamnt0").val() < 0) {

        warningshow('Amount cant be Negative', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ($("#select_tax0").val() == 0) {
        warningshow('Plaease select Tax', 'select_tax0');
    }
    else {
        if (rowcount == 0) {
            i = 1;
        }
        //if (ProductFlag == 1) {
        //    var Res = confirm('Product Already Added! Do You Want to Continue');
        //    if (Res == false) {
        //        clearrow();
        //        return false;
        //    }
        //}
        //var slno = $('#tblsalesinvoice tr').length+1;    
        $('#Warningpopup').fadeOut();
        amountcalculation(0);
        var slno = rowcount + 1;
        var id = parseInt(i);
        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row' onfocusout='updaterow(" + id + ")'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            //"<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input  class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button'  type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $("#PrdtId0").val() + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#txtproduct0").val() + "'></td>" +
             "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $("#ProductDesc0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#txtquantity0').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#AvgCost0').val()).toFixed(Decimal) + " style='background-color:white;height:30px;display:none'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#txtfcrate0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate0').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'LineAvgCost' + id + " value=" + parseFloat($('#LineAvgCost0').val()).toFixed(Decimal) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#AvgCost0').val()).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#txtfcdiscount0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#txtdiscount0').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#txtfctaxableamnt0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxableamnt0').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#txttaxpercent0').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#txtfctaxamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttaxamnt0').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#txtfcamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#txtamnt0').val() + "></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:3%;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_location' + id + " class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
            "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val($('#select_unit0').val());
        $('#select_tax' + id).val($('#select_tax0').val());
        $('#select_location' + id).val($('#select_location0').val());
        TaxSplit(id);
        clearrow();
        productpopuprefresh();

        CalcGrandTotal(i);
        fccalculation(i);



        $('#select_unit' + id).prop('disabled', false);
        $('#txtquantity' + id).prop('disabled', false);
        $('#txtrate' + id).prop('disabled', false);
        $('#txtdiscount' + id).prop('disabled', false);
        $('#select_tax' + id).prop('disabled', false);
        $('#select_location' + id).prop('disabled', false);

        i++;
        salestranspopuprefresh();

    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    Checkbilldiscnt(i);
    CalcDiscountSplitTax1();
    roundoffcalc();
}


//Job Popup Refresh
function jobpopuprefresh() {

    $('#jobpopupdiv').hide();
    $('#product_0').val('');
    $('#productId_job').val(0);
    $('#productjob').val('');
    $('#unit_job').val(0);
    $('#txtrate_job').val('');
    $('#tax_job').val(0);
    $('#taxpercentage_job').val('');
    $('#quantity_job').val('');
    $('#discount_job').val('');
    $('#amount_job').val('');
}

//Add Details From Job Popup to Product Grid
function JobAdd() {

    var a = parseFloat($('#discount_job').val());
    var b = parseFloat($('#txtsubtotal_job').val());

    var rowcount = CountRows();
    if ($.trim($('#productjob').val()) == "") {
        warningshow('Please Enter Product', 'productjob');
        return false;
    }
    else if ($('#unit_job').val() == 0) {
        warningshow('Please Select Unit', 'unit_job');
        return false;
    }
    else if ($.trim($('#quantity_job').val()) == '' || $.trim($('#quantity_job').val()) == 0) {
        warningshow('Please Enter Quantity', 'quantity_job');
        return false;
    }
    else if ($.trim($('#txtrate_job').val()) == '') {
        warningshow('Please Enter Rate', 'txtrate_job');
        return false;
    }
    else if ($('#discount_job').val() > 100) {
        warningshow('Discount Limit Exceeded', 'discount_job');
        return false;
    }
    else if (a > b) {
        warningshow('Amount Cannot be Negative', 'txtrate_job');
        return false;
    }
    else if (foc == 0 && ($("#amount_job").val() == 0)) {

        warningshow('Amount cant be 0', 'txtrate_job');
    }
    else if ($('#tax_job').val() == 0) {
        warningshow('Please select Tax', 'tax_job');
        return false;
    }
    else {
        var no = $('#tblsalesinvoice tr').length + 1;

        if ($('#tblsalesinvoice tr').length == 0)
            i = 1;

        var id = parseInt(i);


        var prodjob = "<tr id=" + 'row' + id + " class='jsgrid-row' onfocusout='updaterow(" + id + ")'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            //"<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + no + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='0' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#productjob").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='JOB'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#quantity_job').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#fcamount_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate_job').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'LineAvgCost' + id + " value='0.00' style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value='0.00' style='background-color:white;height:30px'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#fctxtdisc_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#discount_job').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#fctxttaxable_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxable_job').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#taxpercentage_job').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#fctxttax_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttax_job').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#fctxtsubtotal_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#amount_job').val() + "></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'><select style='background-color:white;height:30px' disabled='' id=" + 'select_location' + id + " class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
            "</tr>";

        $('#tblsalesinvoice').append(prodjob);
        $('#select_unit' + id).val($('#unit_job').val());
        $('#select_tax' + id).val($('#tax_job').val());
        $('#select_location' + id).val($('#locn_job').val());
        $('#txtunit_' + id).val($('#txtunit_job').val());
        TaxSplit(id);

        $('#select_unit' + id).prop('disabled', false);
        $('#txtquantity' + id).prop('disabled', false);
        $('#txtrate' + id).prop('disabled', false);
        $('#txtdiscount' + id).prop('disabled', false);
        $('#select_tax' + id).prop('disabled', false);
        $('#select_location' + id).prop('disabled', false);

        i++;
        clearrow();
        jobpopuprefresh();
        $('#product_0').val('');
        CalcGrandTotal(i);
    }
    Checkbilldiscnt(i);
    CalcDiscountSplitTax1();
    roundoffcalc();
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}


//Calculate Total Amount Of Job
function CalcJobAmount() {
    var fc = parseFloat($('#txtcrncyrate').val() || 0).toFixed(Decimal);
    var fcjobprodrate = 0;
    var fcjobproddisc = 0;
    var fcjobtaxable = 0;
    var fcjobtax = 0;
    var fcjobamnt = 0;


    var jbquantity = parseFloat($('#quantity_job').val() || 0);
    var jbrate = parseFloat($('#txtrate_job').val() || 0);
    jbrate = isNaN(jbrate) ? 0 : jbrate;
    var jbdiscount = parseFloat($('#discount_job').val() || 0);
    jbdiscount = isNaN(jbdiscount) ? 0 : jbdiscount;
    var jbtaxpercentage = parseFloat($("#taxpercentage_job").val() || 0);
    var jbtamount = parseFloat(jbquantity * jbrate)
    var jbtaxableamount = parseFloat(jbtamount - jbdiscount)
    var jbtaxamount = parseFloat(jbtaxableamount * (jbtaxpercentage / 100));
    var jbtotalamount = parseFloat(jbtaxableamount.toFixed(Decimal)) + parseFloat(jbtaxamount.toFixed(Decimal));

    $("#amount_job").val(jbtotalamount.toFixed(Decimal));
    $("#txttaxable_job").val(jbtaxableamount.toFixed(Decimal));
    $("#txttax_job").val(jbtaxamount.toFixed(Decimal));
    $("#txtsubtotal_job").val(jbtamount.toFixed(Decimal));

    fcjobprodrate = parseFloat($('#txtrate_job').val() || 0) * fc;
    fcjobproddisc = parseFloat($('#discount_job').val() || 0) * fc;
    fcjobtaxable = parseFloat(jbtamount - jbdiscount) * fc;
    fcjobtax = parseFloat(jbtaxableamount * (jbtaxpercentage / 100)) * fc;
    fcjobamnt = parseFloat(jbtaxableamount + jbtaxamount) * fc;

    $("#fcamount_job").val(fcjobprodrate.toFixed(Decimal));
    $("#fctxttaxable_job").val(fcjobtaxable.toFixed(Decimal));
    $("#fctxttax_job").val(fcjobtax.toFixed(Decimal));
    $("#fctxtsubtotal_job").val(fcjobamnt.toFixed(Decimal));
    $("#fctxtdisc_job").val(fcjobproddisc.toFixed(Decimal));

}

//Count Rows Of Product Grid
function CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblsalesinvoice");
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++;
        }
    }
    var message = "Total Row Count: " + totalRowCount;
    message += "\nRow Count: " + rowCount;
    return rowCount;
}

//Tax Change
function ChangeTax(TId, selectObject) {
    var value = selectObject.value;
    $("#txttaxpercent" + TId).val($(selectObject).find("option:selected").attr("name"))
    amountcalculation(TId);
}

//Unit Change
function changeunit(TId, selectObject) {
    var value = selectObject.value;
    var unitsname = $(selectObject).find("option:selected").attr("name");
    if (unitsname == 'FOC') {
        foc = 1;
        $('#txtrate' + TId).val(0);
        amountcalculation(TId);
    }
    else {
        foc = 0;
    }
}

var eunit = ''; var eqnty = ''; var erate = ''; var edis = ''; var etaxable = ''; var etax = ''; var etaxperc = ''; var etaxamnt = ''; var eamnt = ''; var elocn = '';
//Edit Button Click
function EditRow(id) {
    if (editflag == 0) {
        editflag = editflag + 1;
        $('#row' + id).children('td,th').css('background-color', 'rgb(232,226,226)');
        eunit = $('#select_unit' + id).val();
        eqnty = $('#txtquantity' + id).val();
        erate = $('#txtrate' + id).val();
        edis = $('#txtdiscount' + id).val();
        etaxable = $('#txttaxableamnt' + id).val();
        etax = $('#select_tax' + id).val();
        etaxperc = $('#txttaxpercent' + id).val();
        etaxamnt = $('#txttaxamnt' + id).val();
        eamnt = $('#txtamnt' + id).val();
        elocn = $('#select_location' + id).val();

        splittaxid = $('#txttaxpercent' + id).val();
        splittaxbleat = $('#txttaxableamnt' + id).val();
        splittaxat = $('#txttaxamnt' + id).val();

        $('#col13_' + id).hide();
        $('#col14_' + id).show();
        $('#editheader').hide();
        $('#editcancelheader').show();
        $('#select_unit' + id).prop('disabled', false);
        $('#txtquantity' + id).prop('disabled', false);
        $('#txtrate' + id).prop('disabled', false);
        $('#txtdiscount' + id).prop('disabled', false);
        $('#select_tax' + id).prop('disabled', false);
        $('#select_location' + id).prop('disabled', false);

        $('#select_unit' + id).focus();
        CalcGrandTotal(i);
        roundoffcalc();
    }
    else {
        warningshow('Update Edit Mode Row First');
    }

}

//Edit Cancel
function editcancel(id) {
    editflag--;

    $('#row' + id).children('td,th').css('background-color', 'white');
    $('#col14_' + id).hide();
    $('#col13_' + id).show();
    $('#editcancelheader').hide();
    $('#editheader').show();
    $('#select_unit' + id).val(eunit);
    $('#txtquantity' + id).val(eqnty);
    $('#txtrate' + id).val(erate);
    $('#txtdiscount' + id).val(edis);
    $('#txttaxableamnt' + id).val(etaxable);
    $('#select_tax' + id).val(etax);
    $('#txttaxpercent' + id).val(etaxperc);
    $('#txttaxamnt' + id).val(etaxamnt);
    $('#txtamnt' + id).val(eamnt);
    $('#select_location' + id).val(elocn);

    $('#txtproduct' + id).prop('disabled', true);
    $('#select_unit' + id).prop('disabled', true);
    $('#txtquantity' + id).prop('disabled', true);
    $('#txtrate' + id).prop('disabled', true);
    $('#txtdiscount' + id).prop('disabled', true);
    $('#select_tax' + id).prop('disabled', true);
    $('#select_location' + id).prop('disabled', true);

    $('#txtproduct0').focus();
    CalcGrandTotal(i);

    eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';
    $('#Warningpopup').fadeOut();
    Checkbilldiscnt(i);
    CalcDiscountSplitTax1();
    roundoffcalc();
}

var splittaxid = "";
var splittaxbleat = "";
var splittaxat = "";
//Update Function
function updaterow(id) {
    editflag = 1;
    var a = parseFloat($('#txtdiscount' + id).val());
    var c = parseFloat($('#txtrate' + id).val());
    $("#txtdiscount" + id).val(isNaN(a) ? 0 : a);
    $('#txtrate' + id).val(isNaN(c) ? 0 : c);
    if (($('#txtquantity' + id).val() == '')) {
        warningshow('Please Enter Quantity', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        return false;
    }
    else if (($('#select_unit' + id).val() == 0)) {
        warningshow('Please Select Unit', 'select_unit' + id);
        return false;
    }
    else if (($('#txtquantity' + id).val() == 0)) {
        warningshow('Quantity can not be Zero', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        return false;
    }

    else if (($('#txtrate' + id).val() == '')) {
        warningshow('Please Enter the Rate', 'txtrate' + id);
        return false;
    }
    else if ((BelowCost == 'NO') && ($('#PrdtId' + id).val() != 0) && ($('#AvgCost' + id).val() != 0) && (parseFloat($('#txtrate' + id).val()) < parseFloat($('#AvgCost' + id).val()))) {
        warningshow('Rate must be greater than ' + $('#AvgCost' + id).val());
        $('#txtrate' + id).select();
        return false;
    }
    else if ($("#txtamnt" + id).val() < 0) {
        warningshow('Amount Cant be negative', 'txtrate' + id);
        $('#txtrate' + id).select();
        return false;
    }
    else if (foc == 0 && ($("#txtamnt" + id).val() == 0)) {
        warningshow('Amount Cant be Zero', 'txtrate' + id);
        $('#txtrate' + id).select();
        return false;
    }
    else if ($("#select_tax" + id).val() == 0) {
        warningshow('Please Select Tax', 'select_tax' + id);
        return false;
    }
    else if (parseFloat($('#txtamnt' + id).val()) > parseFloat($('#txtamnt_id' + id).val())) {
        warningshow('Amount must be <=' + $('#txtamnt_id' + id).val());
        return false;
    }
    else if ($("#select_location" + id).val() == 0) {
        warningshow('Please Select Location', 'select_location' + id);
        return false;
    }
    else {
        editflag = 0;
        var ratenum = parseFloat($("#txtrate" + id).val() || 0);
        $("#txtrate" + id).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#txtdiscount" + id).val() || 0);
        $("#txtdiscount" + id).val(disnum.toFixed(Decimal));

        $('#row' + id).children('td,th').css('background-color', 'white');


        $('#col14_' + id).hide();
        $('#col13_' + id).show();
        $('#editcancelheader').hide();
        $('#editheader').show();

        $('#txtproduct' + id).prop('disabled', true);
        //$('#select_unit' + id).prop('disabled', true);
        //$('#txtquantity' + id).prop('disabled', true);
        //$('#txtrate' + id).prop('disabled', true);
        //$('#txtdiscount' + id).prop('disabled', true);
        //$('#select_tax' + id).prop('disabled', true);
        //$('#select_location' + id).prop('disabled', true);

        //$('#txtproduct0').focus();
        CalcGrandTotal(i);
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';
        $('#Warningpopup').fadeOut();
        TaxSplitupdate(splittaxid, splittaxbleat, splittaxat, id);
        splittaxid = "";
        splittaxbleat = "";
        splittaxat = "";
        Checkbilldiscnt(i);
        CalcDiscountSplitTax1();
        roundoffcalc();
    }

}

//Changing background color when focus is out of grid textbox
function focusoutgrid(col, Id) {

    if (col == 'q')
    { $('#txtquantity' + Id).css("background-color", 'white'); }
    else if (col == 'r')
    { $('#txtrate' + Id).css("background-color", 'white'); }
    else if (col == 'd')
    { $('#txtdiscount' + Id).css("background-color", 'white'); }
    else if (col == 't')
    { $('#select_tax' + Id).css("background-color", 'white'); }
    else if (col == 'l')
    { $('#select_location' + Id).css("background-color", 'white'); }
    else if (col == 'u')
    { $('#select_unit' + Id).css("background-color", 'white'); }
}

//Changing background color when focus in(grid textbox)
function focusingrid(col, Id) {

    if (col == 'q')
    { $('#txtquantity' + Id).css("background-color", '#58dbe4'); }
    else if (col == 'r')
    { $('#txtrate' + Id).css("background-color", '#58dbe4'); }
    else if (col == 'd')
    { $('#txtdiscount' + Id).css("background-color", '#58dbe4'); }
    else if (col == 't')
    { $('#select_tax' + Id).css("background-color", '#58dbe4'); }
    else if (col == 'l')
    { $('#select_location' + Id).css("background-color", '#58dbe4'); }
    else if (col == 'u')
    { $('#select_unit' + Id).css("background-color", '#58dbe4'); }
}

//Focus to next text box in ProductGrid
function Focusnextgrid(e, col, Id) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key == 39) {              // Right Arrow

        if (col == 'u') {
            e.preventDefault();
            $('#txtquantity' + Id).focus();
            $('#txtquantity' + Id).select();
        }
        else if (col == 'q') {
            e.preventDefault();
            $('#txtrate' + Id).focus();
            $('#txtrate' + Id).select();
        }
        else if (col == 'r') {
            e.preventDefault();
            $('#select_location' + Id).focus();
        }
        else if (col == 'd') {
            e.preventDefault();
            $('#select_tax' + Id).focus();
        }
        else if (col == 't' && Id != 0) {
            e.preventDefault();
            $('#select_location' + Id).focus();
        }
        else if (col == 't' && Id == 0) {
            e.preventDefault();
            $('#btnadd').focus();
            // $('#txtproduct0').select(); 
        }
        else if (col == 'l') {
            e.preventDefault();
            $('#txtquantity' + Id).focus();
            $('#txtquantity' + Id).select();
        }
        else if (col == 'p' && $('#txtproduct0').val() == '') {
            e.preventDefault();
            $('#select_location0').focus();
        }
        else if (col == 'b') {
            e.preventDefault();
            $('#txtproduct0').select();
            $('#txtproduct0').focus();
        }
    }
    else if (key == 37) {              // Left Arrow

        if (col == 'u') {
            e.preventDefault();
            $('#select_location' + Id).focus();
        }
        else if (col == 'q') {
            e.preventDefault();
            $('#select_location' + Id).focus();
        }
        else if (col == 'r') {
            e.preventDefault();
            $('#txtquantity' + Id).focus();
            $('#txtquantity' + Id).select();
        }
        else if (col == 'd') {
            e.preventDefault();
            $('#txtrate' + Id).focus();
            $('#txtrate' + Id).select();
        }
        else if (col == 't') {
            e.preventDefault();
            $('#txtdiscount' + Id).focus();
            $('#txtdiscount' + Id).select();
        }
        else if (col == 'l' && Id != 0) {
            e.preventDefault();
            $('#txtrate' + Id).focus();
            $('#txtrate' + Id).select();
        }
        else if (col == 'l' && Id == 0) {
            e.preventDefault();
            $('#txtproduct0').focus();
            $('#txtproduct0').select();
        }
        else if (col == 'b') {
            e.preventDefault();
            $('#select_tax' + Id).focus();
        }
        else if (col == 'p' && $('#txtproduct0').val() == '') {
            e.preventDefault();
            $('#btnadd').focus();
        }
    }

    else if (key == 40 && Id != 0)          // Down Arrow
    {
        e.preventDefault();
        var Rid;

        try {

            Rid = ($('#row' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            Rid = Id;
        }
        if (col == 'q') {
            $('#txtquantity' + Rid).focus();
            $('#txtquantity' + Rid).select();
        }
        else if (col == 'u') {
            $('#select_unit' + Rid).focus();
            $('#select_unit' + Rid).select();
        }
        else if (col == 'r') {
            $('#txtrate' + Rid).focus();
            $('#txtrate' + Rid).select();
        }
        else if (col == 'd') {
            $('#txtdiscount' + Rid).focus();
            $('#txtdiscount' + Rid).select();
        }
        else if (col == 't') {
            $('#select_tax' + Rid).focus();
            $('#select_tax' + Rid).select();
        }
        else if (col == 'l') {
            $('#select_location' + Rid).focus();
            $('#select_location' + Rid).select();
        }
    }
    else if (key == 38 && Id != 0) {           // Up Arrow
        e.preventDefault();
        var Rid;

        try {

            Rid = ($('#row' + Id).closest('tr').prev('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            Rid = Id;
        }
        if (col == 'q') {
            $('#txtquantity' + Rid).focus();
            $('#txtquantity' + Rid).select();
        }
        else if (col == 'u') {
            $('#select_unit' + Rid).focus();
            $('#select_unit' + Rid).select();
        }
        else if (col == 'r') {
            $('#txtrate' + Rid).focus();
            $('#txtrate' + Rid).select();
        }
        else if (col == 'd') {
            $('#txtdiscount' + Rid).focus();
            $('#txtdiscount' + Rid).select();
        }
        else if (col == 't') {
            $('#select_tax' + Rid).focus();
            $('#select_tax' + Rid).select();
        }
        else if (col == 'l') {
            $('#select_location' + Rid).focus();
            $('#select_location' + Rid).select();
        }
    }
}

//Delete All the rows of Product Grid
function Tbldelete() {
    $('#tblsalesinvoice tr').remove();
    i = 1;
    // $('#txtproduct0').focus();
}

//Clear All Values Before Copy Function
function copyrefresh() {
    $('#Trnno').val('');
    $('#txtlpono').val('');
    $('#select_payterms').val(2);
    $('#typecredit').prop("checked", true);
    $('#select_transfer').val('');
    $('#txtcustomer').val('');
    $('#select_terms').val(0);
    $('#txtduedate').val('');
    $('#txtaddress').val('');
    $('#PriceGroupId').val(0);
    $('#select_locn,#select_location0').val(UserLocationId);
    $('#select_salesman').val(UserSalesmanId);
    $('#select_place').val(DefaultArea);
    $('#select_crncy').val(BaseCurrency);
    $('#txtcrncyrate').val(parseFloat($('#select_crncy').find("option:selected").attr("name") || 0).toFixed(Decimal));
    $('#select_jobno').val('');
    $('#txtproduct0').val('');
    $('#btndelete,#btnsaveedit,#btnedit').hide();
    $('#select_location0').val(UserLocationId);
    $('#select_unit0').val(0);
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');

    $('#TotalDiscount').val('0.00');
    $('#TotalTaxable').val('0.00');
    $('#TotalTax').val('0.00');
    $('#GrandTotal').val('0.00');

    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
    $('#Transferbillseries').val('');
    $('#Transferdeptid').val('');
    $('#txtBillSlNoSave').val('');
}

//Delete The Selected Row in The Product Grid
function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want to Delete this Record?');
}


//Delete rows
function rowdeleteconfirm(RowId) {
    var slno = 1;
    var splittaxable = parseFloat($('#txttaxableamnt' + RowId).val());
    var splittax = parseFloat($('#txttaxamnt' + RowId).val());
    var splittaxid = $('#txttaxpercent' + RowId).val();
    $('#row' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#txtproduct' + j).val() != undefined) {
            $('#td' + j).text(slno);
            slno++;
        }
    }
    TaxSplitDelete(splittaxid, splittaxable, splittax);
    $('#txtproduct0').focus();
    CalcGrandTotal(i);
    Checkbilldiscnt(i);
    CalcDiscountSplitTax1();
    roundoffcalc();
}


//Delete Grid Rows Confirm box
function ConfirmboxResult(Result, status, rowid) {

    $('#confirmOk').prop('disabled', true);

    if (Result == 'true' && status == 'delete') {
        rowdeleteconfirm(rowid);
    }
    else if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'copy') {
        SalesReturnCopy(rowid); 

    }
    else if (Result == 'true' && status == 'save') {
        SaveConfirm();
    }
    else if (Result == 'true' && status == 'update') {
        UpdateConfirm();
    }

    else if (Result == 'true' && status == 'billcancel') {
        $('#CancelOTPDiv').show();
        $('#cancelotp,#cancelotpremarks').prop('disabled', false);
        $('#cancelotp,#cancelotpremarks').val('');
        $('#cancelotp').focus();
    }

    $('#confirm').fadeOut();

    window.setTimeout(function () {
        $('#confirmOk').prop('disabled', false);
    }, 2000);
}

function CheckCancelInvoce() {
    if ($.trim($('#cancelotp').val()) == '') {
        warningshow('Enter OTP', 'cancelotp');
    }
    else if ($.trim($('#cancelotpremarks').val()) == '') {
        warningshow('Enter Remarks', 'cancelotpremarks');
    }
    else {
        var data = {};
        data.UserId = ERPUserId;
        data.OTP = $("#cancelotp").val();
        data.Remarks = $('#cancelotpremarks').val();
        data.Operation = 'Sales Invoice- OTP - Cancel';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Home/OTPCheckforUser",
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    OTPCancelCheck(status)
                }
            }
        });
    }
}

function OTPCancelCheck(status) {
    if (status == 1) {
        BillCancel();
    }
    else {
        warningshow('Invalid OTP', 'cancelotp');
        $("#cancelotp").select();
    }
}

function BillCancel() {
    $('#CancelOTPDiv').hide();
    $('#cancelotp,#cancelotpremarks').val('');
    var data = {};
    data.BillSlNo = $('#txtBillSlNocopy').val();
    data.BillSeriesId = $('#txtBillseriesId').val();
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/SalesReturnCancel",
        data: data,
        success: function (result) {

            var status = result.oList[0].Status;
            var billno = result.oList[0].BillSlNo;
            var billsrs = $('#txtBillseriesId').find("option:selected").text();
            Showalerts(status, billsrs, billno);
            TaxClear();
            Tbldelete();
            copyrefresh();
        }
    });
}


//If value of CustomerId is empty
function checkcustomerempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode != 13) {
        if ($('#txtCustId').val() != 0) {
            $('#txtCustId').val(0);
            $('#txtaddress').val('');
            $('#Trnno').val('');
            $('#txtlpono').val('');
            $('#PriceGroupId').val(0);
            $('#select_salesman').val(UserSalesmanId);
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val(parseFloat($('#select_crncy').find("option:selected").attr("name") || 0).toFixed(Decimal));
            for (j = 0; j <= i; j++) {
                amountcalculation(j);
            }
            CalcGrandTotal(i);

            $('#select_place').val(DefaultArea);

            $('#select_terms').val(0);
            getdate();
            roundoffcalc();
        }
    }
}

//If value of ProjectJobId is empty
function checkjobempty() {
    $('#ProjectJobId').val(0);
}

//If value of ProductId is empty
function checkpdcttextempty(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode != 13) {
        var a = ($('#txtproduct0').val()).length;
        if ($('#codelength').val() != a) {

            $('#TransPrdtId0').val(0);
            $('#PrdtId0').val(0);
            $('#select_unit0').val(0);
            $('#select_tax0').val(0);
            $('#txttaxpercent0').val('');
            $('#txtrate0').val('');
            $('#txtquantity0').val('');
            $('#txtstocktotloseqty0').val('');
            $('#txtamnt0').val('');
            $('#LPCost').val(0);
            $('#AvgCost0').val(0);
            $('#Sumtotqty').val(0);
            productpopuprefresh();
            qtyflag = 0;
        }

    }
}

function roundoffcalc() {
    CalcGrandTotal(i);
    CalcDiscountSplitTax1();

    var gamt = 0; var roundgndtotal = 0; var gntamt = 0; var fgamt = 0; var fcgntamt = 0; var roundfcgndtotal = 0; var GTotal = 0; var GFcTotal = 0;

    gamt = parseFloat($('#FcGrandTotal').val() || 0);
    gntamt = Math.round(gamt);
    roundgndtotal = (parseFloat(gntamt) - parseFloat($('#FcGrandTotal').val())).toFixed(Decimal);

    fgamt = parseFloat($('#GrandTotal').val() || 0);
    fcgntamt = Math.round(fgamt);
    roundfcgndtotal = (parseFloat(fcgntamt) - parseFloat($('#GrandTotal').val())).toFixed(Decimal);

    if ($('#roundoffstatus').is(':checked')) {
        $('#TotRoundOff').val(roundfcgndtotal || 0);
        $('#gndtotal').text((gntamt || 0).toFixed(Decimal));
        $('#fc').text('FC : ' + (fcgntamt || 0).toFixed(Decimal));

        $('#roundgndtotal').val(roundgndtotal);
        $('#roundfcgndtotal').val(roundfcgndtotal);

        $('#FcGrandTotal').val(gntamt)
        $('#GrandTotal').val(fcgntamt)
    }
    else {
        $('#roundgndtotal').val('0.00');
        $('#roundfcgndtotal').val('0.00');
        $('#TotRoundOff').val('0.00');

        var a = gamt || 0;
        if (a == 0)
            $('#gndtotal').text('0.00');
        else
            $('#gndtotal').text(gamt.toFixed(Decimal));

        var b = fgamt || 0;
        if (b == 0)
            $('#fc').text('0.00');
        else
            $('#fc').text('FC : ' + fgamt.toFixed(Decimal));
    }
}

//--------------Common Functions---------------
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

function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function Showalerts(Status, billsrs, billsrlno) {
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv1').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#savealert').append('<b>Return No : ' + billsrs + '-' + billsrlno + '</b><br> Saved Successfully!<br>Do you want to print this bill?');
        $('#btnok').focus();
        //swal('Bill No : ' + billsrs + '-' + billsrlno+' Saved Successfully', "Do you want to print the bill?", "success");       
        //$('.swal-button swal-button--confirm').focus();    
    }

    else if (Status == 2) {
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#savealert').append('<b>Return No : ' + billsrs + '-' + billsrlno + '</b><br> Updated Successfully!<br>Do you want to print this bill?');
        $('#btnok').focus();
        //swal('Bill No : ' + billsrs + '-' + billsrlno+' Saved Successfully', "Do you want to print the bill?", "success");       
        //$('.swal-button swal-button--confirm').focus();    
    }
    else if (Status == 3) {
        //swal('Bill Number : ' + billsrs + '-' + billsrlno + ' not Valid', "", "warning");
        //$('.swal-button swal-button--confirm').focus();

        $('#returnmsg').text('');
        $('#returndiv').show();
        $('#returnmsg').append('Bill Number : ' + billsrs + '-' + billsrlno + ' not valid');
        $('#btnreturn').focus();
    }
    else if (Status == 4) {

        $('#returnmsg').text('');
        $('#returndiv').show();
        $('#returnmsg').append('<b>Bill No : ' + billsrs + '-' + billsrlno + '</b><br> Cancelled!');
        $('#btnreturn').focus();

    }
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

function datatableWithsearch(tablename, Type) {
    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Select' || title == 'Details') {
                $(this).html('<input type="text" class="form-control"  style="width:30px;display:none"  placeholder="' + title + '"/>')
            }
            else {
                $(this).html('<input type="text" class="form-control"   placeholder="' + title + '"/>')
            }
    });

    var table = null;

    if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            //"order": false,
        });

    }
    else if (Type == 'Multiple') {

        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "order": [],
            "pageLength": -1
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
            //  "pageLength": -1,
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
            // "pageLength": -1
        });


    }

    else if (Type == 'MultipleAllTransaction') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                    { "width": "10%", "targets": 2 }
            ],
            orderCellsTop: true,
            "order": [],
            //"pageLength": -1,
            autoWidth: false
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

//function alertpopuprefresh(e) {
//    $('#alertpopup').hide();
//    $('#alertdiv').hide();

//}