
function LocationLoad(result, a) {
    $("#select_locn,#select_location0,#locn_job").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {

        LocnSelect += "<option value='" + result[i].LocationId + "' name='" + result[i].NegativeBillingFlag + "'>" + result[i].LocationCode + "</option>";

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

    for (var i = 0; i < result.length; i++) {
        $("#select_crncy").append("<option value='" + result[i].Id + "' name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");
    }
    if (a == 0) {
        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));

    }
    else {
        $('#select_crncy').val(a);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        for (var m = 1; m <= i; m++) {
            amountcalculation(m);
        }
        CalcGrandTotal(i);

        CalcDiscountSplitTax1();
        roundoffcalc();
    }
}
function UnitLoad(result) {
    $("#select_unit0,#unit_job").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    var UnitJob = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'name='" + result[i].UnitName + "'>" + result[i].UnitName + "</option>";
        UnitJob += "<option value='" + result[i].UnitId + "'name='" + result[i].UnitName + "'>" + result[i].UnitName + "</option>";
    }
    $("#select_unit0").append(UnitSelect);
    $("#unit_job").append(UnitJob);
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
    // var DefaultArea = 0;
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
    JsBarcode("#barcode1", $('#txtBillseriesId').val() + '-' + result[0].CurrentNo)
}

function BillLoad() {
    var data = {};
    data.id = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/BillSeriesGetandGets",
        data: data,
        success: function (result) {
            Billseriesload(result.oList);
        }
    });
}

function autogroup() {
    var data = {};
    $.ajax({
        type: "POST",
        url: "../Master/AutomobileGroupGetandGets",
        data: data,
        success: function (result) {
            autogroupload(result.oList);
        }
    });
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
function LocnLoad(id) {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserLocationGetandGets",
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

function autogroupload(result) {
    $("#AutoType").empty();
    $("#AutoType").append("<option value='0'>--All--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#AutoType").append("<option value='" + result[i].GrpId + "' name='" + result[i].GrpName + "'>" + result[i].GrpName + "</option>");
    }
}

function TermsLoad(result, a) {
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

var DefaultTaxArray = [];
function TaxCall() {
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
       "<td class='text-center' style='width:auto;width:30%;border:1px solid #BABFC7;'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + result[i].TaxId + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +
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




var Decimal = Decimal;
var editflag = 0;
var i = 1;
var BillDiscountFlag = 0;


$(document).keydown(function (e) {





    var x = event.keyCode;
    if ((x > 111 && x < 124)) {                  //Functional Keys default function block  
        if ((x == 118) && (!$("#addacnttype").is(":visible"))) {                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            if (!(($("#HiddenItemId").val() == 0) && ($("#iconForm").is(":visible")) && (!$('#duecheckdiv,#confirm,promptdiv').is(":visible")))) {
                salestranspopuprefresh();
                MonthwisePurchasepopuprefresh();
                if ($("#HiddenItemId").val() != 0)
                { $('#iconForm').hide(); }

                $('#alltranscheckboxdivsales').show();
                $('#idforlabeltype').text('All');
                $('#status_type').prop("checked", false);
                SalesTransType();

            }
        }
        else if ((x == 119) && (!$("#addacnttype").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {                         // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
            if (!(($("#HiddenItemId").val() == 0) && ($("#iconForm").is(":visible")))) {
                salestranspopuprefresh();
                MonthwisePurchasepopuprefresh();

                if ($("#HiddenItemId").val() != 0)
                    $('#iconForm').hide();

                $('#alltranscheckboxdivsales').show();
                $('#idforlabeltype').text('All');
                $('#status_type').prop("checked", false);
                PurchaseTransType();


            }
        }
        else if ((x == 120) && (!$("#addacnttype").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {  // F9 :   All Transaction details Popup      
            if (!(($("#HiddenItemId").val() == 0) && ($("#iconForm").is(":visible")))) {
                salestranspopuprefresh();
                //closepopupprdtlist();
                MonthwisePurchasepopuprefresh();

                if ($("#HiddenItemId").val() != 0)
                    $('#iconForm').hide();

                $('#alltranscheckboxdivsales').show();
                $('#idforlabeltype').text('Previous');
                $('#status_type').prop("checked", false);

                AllTransactionsTransType();

            }
        }
        else if ((x == 121) && (!$("#addacnttype").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv,#MonthwisePurchasediv').is(":visible"))) {  // F10 :   Monthwise details Popup     
            if (!(($("#HiddenItemId").val() == 0) && ($("#iconForm").is(":visible")))) {
                // MonthwisePurchasepopuprefresh();


                MonthwisePurchaseType();
            }
        }

        else if ((x == 113) && (!$("#addacnttype").is(":visible")) && (!$("#iconForm").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {    // F2 -   Multiple Products List 
            if (editflag == 0 && copyflag == 0) {
                hidepopup(1);
                salestranspopuprefresh();
                closewarningdesc();
                cleargridids();
                $('#temptxtproduct0').val('');
                if (($('#txtproduct0').val()).toUpperCase() == "JOB") {
                    warningshow('Please Enter Valid Data!', 'txtproduct0');
                }
                else {
                    clearrow(1);
                    Multipleproduct();
                }
            }
        }

        else if ((x == 114) && (!$("#iconForm").is(":visible")) && (!$("#automobiles").is(":visible")) && editflag == 0 && copyflag == 0 && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {          //F3   - Item mapping                           // F3
            hidepopup(1);
            salestranspopuprefresh();
            closewarningdesc();
            cleargridids();
            clearrow(1);
            $('#automobiles').show();
            $('#AutoItemCode').focus();
            $('#temptxtproduct0').val('');
        }

        else if ((x == 115)) {                                       // F4
            if ($("#iconForm").is(":visible"))
                addgridproducts();
            else if ($("#automobiles").is(":visible"))
                autoaddgridproducts();
        }
        else if ((x == 117) && ($('#bouncediv').is(":visible"))) {                                       // F6
            saveOrderBouncing();
        }
            //else if ((x == 116)) {                                       // F5
            //    alert('F5');
            //}
        else if ((x == 118)) {                                       // F7
            //alert('F7');
        }
        else if ((x == 119)) {                                       // F8
            //alert('F8');
        }
        else if ((x == 120)) {                                       // F9
            //alert('F9');
        }

        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }
    else if ((e.altKey && e.keyCode == 83) && (!$("#addacnttype").is(":visible")) && (!$("#iconForm,#salestranspopupdiv").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {                        //Alt+S
        if (copyflag != 1 && updateflag == 0 && editflag == 0)
            savesales();
        else if (editflag != 0) {
            warningshow('Please Update Edit Mode');
            return false;
        }
    }
    else if ((e.altKey && e.keyCode == 67) && (!$("#addacnttype").is(":visible")) && (!$("#iconForm,#salestranspopupdiv").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {                 //Alt+C        
        if (copyflag != 1 && updateflag == 0)
            GetRows();
    }
    else if ((e.altKey && e.keyCode == 78) && (!$("#addacnttype").is(":visible")) && (!$("#iconForm,#salestranspopupdiv").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {                  //Alt+N
        formrefreshconfirm();
    }
    else if (e.keyCode == 27) {
        if (copyflag != 1) {
            if (!$("#salestranspopupdiv").is(":visible"))
                cleargridids();
            hidepopup(1);
            alertpopuprefresh()
            popuprefresh();
            jobpopuprefresh();
            salestranspopuprefresh();
            CloseEnquiry();
            MonthwisePurchasepopuprefresh();
            $('#Revisionpopupdiv,#Revdiv').hide();
            areagroupadd(2);

        }
        $('#OTPDiv').hide();
        $('#txtotp,#otpremarks').val('');
        $('#CancelOTPDiv').hide();
        $('#cancelotp,#cancelotpremarks').val('');

        if ($('#iconForm').is(":visible"))
            $("#txtproduct0").blur();

        if ($('#duecheckdiv').is(":visible")) {
            $('#duecheckdiv').hide();
            $('#txtproduct0').focus();
        }


        popupclose();
    }
    else if ((e.altKey && e.keyCode == 53) && (!$("#iconForm").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {        //Alt+5 - Alternative Items
        if ($('#PrdtId0').val() != 0 && copyflag == 0) {
            closewarningdesc();
            // productpopuprefresh();
            hidepopup(1);
            GetAlternateProducts();
        }
    }
    else if ((e.altKey && e.keyCode == 71) && (!$("#addacnttype").is(":visible")) && (!$("#iconForm,#salestranspopupdiv,#duecheckdiv,#confirm,#promptdiv").is(":visible"))) {          //Alt+g  - Focus Product Grid
        if ((copyflag == 0) && ($('#tblsalesinvoice tr').length > 0)) {
            try {
                var row = $('#tblsalesinvoice').find(' tbody tr:eq(0)').attr('id').match(/\d+/)[0];
                if (row) {
                    $('#txtquantity' + row).focus();
                    $('#txtquantity' + row).select();
                    GetproddetailsGrid(row);

                    var desc = $("#ProductDesc" + row).val();
                    var j = 0, strLength = desc.length;
                    for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                    var code = $("#txtproduct" + row).val();
                    var k = 0, strLength1 = code.length;
                    for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                    GetPrdtId($("#PrdtId" + row).val(), desc, code, 2);
                }
            }
            catch (err) {
            }
        }
    }
    else if ((e.altKey && e.keyCode == 66) && (copyflag == 0) && (!$("#bouncediv").is(":visible")) && (!$('#duecheckdiv,#confirm,#promptdiv').is(":visible"))) {                  //Alt+B - Order Bouncing 
        closewarningdesc();
        $('#bouncediv').show();
        $('#orderbounce').show();

        if ($('#txtcustomer').val() != '') {
            $('#BounceCustomer').val($('#txtcustomer').val());
            $('#BounceCustId').val(($('#txtCustId').val() || 0));
        }

        if (!$("#Productlist").is(":visible")) {
            if ($('#txtproduct0').val() != '') {
                $('#BounceItem').val($('#txtproduct0').val());
                $('#BounceItemId').val(($('#PrdtId0').val() || 0));
                $('#BounceDesc').val($('#ProductDesc0').val());
            }
        }
        else if ($("#HiddenItemId").val() != '' && $("#HiddenItemId").val() != 0) {
            $('#BounceItem').val($('#HiddenItem').val());
            $('#BounceItemId').val(($('#HiddenItemId').val() || 0));
            $('#BounceDesc').val($('#HiddenDesc').val());

        }


        $('#BounceCustomer').focus();
        $('#BounceCustomer').select();
    }
});

function MonthwisePurchaseType() {
    hidepopup(1);
    salestranspopuprefresh();
    if ($("#HiddenItemId").val() != 0)
        $('#iconForm').hide();
    if ($("#TransPrdtId0").val() != 0) {

        MonthwisePurchasePopup($("#TransPrdtId0").val(), $('#txtproduct0').val(), $('#ProductDesc0').val());
    }
    else if ($("#HiddenItemId").val() != 0) {

        MonthwisePurchasePopup($("#HiddenItemId").val(), $("#HiddenItem").val(), $("#HiddenDesc").val());
    }
    else if ($("#HiddenGridItemId").val() != 0) {

        MonthwisePurchasePopup($("#HiddenGridItemId").val(), $("#HiddenGridItem").val(), $("#HiddenGridDesc").val());
    }
    else if ($("#HiddenAutoItemId").val() != 0) {

        $("#automobiles").hide();
        MonthwisePurchasePopup($("#HiddenAutoItemId").val(), $("#HiddenAutoItem").val(), $("#HiddenAutoDesc").val());
    }

}

function MonthwisePurchasepopuprefresh() {
    var pdtrowcnt = $('#pdtrowcnt').val();
    for (var n = 0; n <= pdtrowcnt; n++) {
        $('#pdctrow' + n).remove();
    }
    $('#MonthwisePurchase').hide();
    $('#MonthwisePurchasediv').hide();
    $('#MonthwisePurchaseheader').text('Transaction Details');

    if ($("#HiddenItemId").val() != 0 && $("#HiddenItemId").val() != '') {
        $('#iconForm').show();
        $('#searchItemCode').focus();
    }
    else if ($('#PrdtId0').val() != 0 && $("#PrdtId0").val() != 0) {
        $('#txtquantity0').focus();
        $('#txtquantity0').select();
        if ($('#descpopup').text() != '')
            $('#popupdesc').show();
    }
    else if ($('#HiddenAutoItemId').val() != 0 && $('#HiddenAutoItemId').val() != '') {
        $('#AutoItemCode').focus();
        $('#automobiles').show();
        if ($('#descpopup').text() != '')
            $('#popupdesc').show();
    }
}

function MonthwisePurchasePopup(ItemId, Code, Desc) {
    $('#popupdesc').fadeOut();
    $('#MonthwisePurchasediv').show();
    $('#MonthwisePurchase').show();


    var data = {};
    data.ItemId = ItemId;
    data.Department = ERPDeptId;
    $.ajax({
        type: "POST",
        url: '../Purchaseandsalesreports/MonthwisePurchaseStockQuery',
        data: data,
        success: function (result) {
            var ProductDesc = Desc;
            var product = Code;
            $('#MonthwisePurchaseheader').text(ProductDesc + '(' + product + ')' + ' - Monthwise Details');
            MonthwisePurchaseLoad(result);

            var data = {};
            data.ItemId = ItemId;
            data.Department = ERPDeptId;
            $.ajax({
                type: "POST",
                url: '../Purchaseandsalesreports/MonthwiseSalesStockQuery',
                data: data,
                success: function (result) {
                    MonthwiseSalesLoad(result);
                }
            });
        }
    });
}


function MonthwisePurchaseLoad(result) {

    $('#pdtrowcnt').val(result.length);
    for (var n = 0; n <= result.length; n++) {
        $('#pdctrow' + n).remove();
    }
    $('#tblMonthwisePurchase td').remove();
    for (var n = 0; n < result.length; n++) {

        var ProdRow = "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
         "<td >" + result[n].Year + "                          </td>" +
        "<td >" + parseInt(result[n].Column1 || 0) + "       </td>" +
         "<td >" + parseInt(result[n].Column2 || 0) + "        </td>" +
        "<td >" + parseInt(result[n].Column3 || 0) + "      </td>" +
        "<td >" + parseInt(result[n].Column4 || 0) + "       </td>" +
         "<td >" + parseInt(result[n].Column5 || 0) + "       </td>" +
        "<td >" + parseInt(result[n].Column6 || 0) + "         </td>" +
        "<td >" + parseInt(result[n].Column7 || 0) + "         </td>" +
         "<td >" + parseInt(result[n].Column8 || 0) + "        </td>" +
        "<td >" + parseInt(result[n].Column9 || 0) + "         </td>" +
        "<td >" + parseInt(result[n].Column10 || 0) + "        </td>" +
         "<td >" + parseInt(result[n].Column11 || 0) + "       </td>" +
        "<td >" + parseInt(result[n].Column12 || 0) + "        </td>" +
          "<td >" + parseInt(result[n].Column13 || 0) + "       </td>" +
        "</tr>";

        $('#tblMonthwisePurchase').append(ProdRow);

    }
}

function MonthwiseSalesLoad(result) {

    $('#pdtrowcnt').val(result.length);
    for (var n = 0; n <= result.length; n++) {
        // $('#pdctrow' + n).remove();
    }
    $('#tblMonthwiseSales td').remove();
    for (var n = 0; n < result.length; n++) {

        var ProdRow = "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
        "<td >" + result[n].Year + "                          </td>" +
        "<td >" + parseInt(result[n].Column1 || 0) + "       </td>" +
         "<td >" + parseInt(result[n].Column2 || 0) + "        </td>" +
        "<td >" + parseInt(result[n].Column3 || 0) + "      </td>" +
        "<td >" + parseInt(result[n].Column4 || 0) + "       </td>" +
         "<td >" + parseInt(result[n].Column5 || 0) + "       </td>" +
        "<td >" + parseInt(result[n].Column6 || 0) + "         </td>" +
        "<td >" + parseInt(result[n].Column7 || 0) + "         </td>" +
         "<td >" + parseInt(result[n].Column8 || 0) + "        </td>" +
        "<td >" + parseInt(result[n].Column9 || 0) + "         </td>" +
        "<td >" + parseInt(result[n].Column10 || 0) + "        </td>" +
         "<td >" + parseInt(result[n].Column11 || 0) + "       </td>" +
        "<td >" + parseInt(result[n].Column12 || 0) + "        </td>" +
          "<td >" + parseInt(result[n].Column13 || 0) + "       </td>" +
        "</tr>";

        $('#tblMonthwiseSales').append(ProdRow);

    }
}




function SalesTransType() {
    if ($('#status_type').prop("checked"))
        var flag = 1;
    else
        var flag = 0;

    if ($("#TransPrdtId0").val() != 0) {
        SalesTransactions($("#TransPrdtId0").val(), $('#txtproduct0').val(), $('#ProductDesc0').val(), flag);
    }
    else if ($("#HiddenItemId").val() != 0) {
        SalesTransactions($("#HiddenItemId").val(), $("#HiddenItem").val(), $("#HiddenDesc").val(), flag);
    }
    else if ($("#HiddenGridItemId").val() != 0) {
        SalesTransactions($("#HiddenGridItemId").val(), $("#HiddenGridItem").val(), $("#HiddenGridDesc").val(), flag);
    }
    else if ($("#HiddenAutoItemId").val() != 0) {
        $("#automobiles").hide();
        SalesTransactions($("#HiddenAutoItemId").val(), $("#HiddenAutoItem").val(), $("#HiddenAutoDesc").val(), flag);
    }
}

function PurchaseTransType() {
    if ($('#status_type').prop("checked"))
        var flag = 1;
    else
        var flag = 0;

    if ($("#TransPrdtId0").val() != 0) {
        PurchaseTransactions($("#TransPrdtId0").val(), $('#txtproduct0').val(), $('#ProductDesc0').val(), flag);
    }
    else if ($("#HiddenItemId").val() != 0) {
        PurchaseTransactions($("#HiddenItemId").val(), $("#HiddenItem").val(), $("#HiddenDesc").val(), flag);
    }
    else if ($("#HiddenGridItemId").val() != 0) {
        PurchaseTransactions($("#HiddenGridItemId").val(), $("#HiddenGridItem").val(), $("#HiddenGridDesc").val(), flag);
    }
    else if ($("#HiddenAutoItemId").val() != 0) {
        $("#automobiles").hide();
        PurchaseTransactions($("#HiddenAutoItemId").val(), $("#HiddenAutoItem").val(), $("#HiddenAutoDesc").val(), flag);
    }
}

function AllTransactionsTransType() {
    if ($('#status_type').prop("checked"))
        var flag = 1;
    else
        var flag = 0;

    if ($("#TransPrdtId0").val() != 0) {
        AllTransactions($("#TransPrdtId0").val(), $('#txtproduct0').val(), $('#ProductDesc0').val(), flag);
    }
    else if ($("#HiddenItemId").val() != 0) {
        AllTransactions($("#HiddenItemId").val(), $("#HiddenItem").val(), $("#HiddenDesc").val(), flag);
    }
    else if ($("#HiddenGridItemId").val() != 0) {
        AllTransactions($("#HiddenGridItemId").val(), $("#HiddenGridItem").val(), $("#HiddenGridDesc").val(), flag);
    }
    else if ($("#HiddenAutoItemId").val() != 0) {
        $("#automobiles").hide();
        AllTransactions($("#HiddenAutoItemId").val(), $("#HiddenAutoItem").val(), $("#HiddenAutoDesc").val(), flag);
    }
}

function CheckTransType() {
    if ($("#salestransdiv").is(":visible"))
        SalesTransType();

    else if ($("#purchasetransdiv").is(":visible"))
        PurchaseTransType();

    else if ($("#alltranstransdiv").is(":visible"))
        AllTransactionsTransType();
}

//Sales Transactions Load
function SalesTransactions(ProductId, product, ProductDesc, flag) {
    $('#popupdesc').fadeOut();
    var data = {};
    data.ProductId = ProductId;
    data.DeptId = ERPDeptId;
    data.type = flag;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: '../SalesInvoice/SalesTransGetandGets',
        data: data,
        success: function (result) {

            disable_datatable('tblsalestrans');
            //  productpopuprefresh();
            hidepopup(1);
            $('#salestranspopupdiv').show();
            $('#purchasetransdiv').hide();
            $('#alltranstransdiv').hide();
            $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Last Sales Transaction Details');
            $('#salestransdiv').show();
            $("#txtquantity0,#txtproduct0").blur();
            $('#tblsalestrans tr').remove();

            var ProdRow = "<thead><tr><th>SalesInvoice</th><th>Date</th><th style='width:12%'>AccountName</th><th style='width:15%'>Address</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th>SalesMan</th><th style='width:7%'>LPO</th><th>Department</th></tr>" +
                               "<tr><th>SalesInvoice</th><th>Date</th><th style='width:12%'>AccountName</th><th style='width:15%'>Address</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th>SalesMan</th><th style='width:7%'>LPO</th><th>Department</th></tr></thead><tbody>";

            if (result.length != 0) {

                for (var n = 0; n < result.length; n++) {

                    ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                       "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
                       "<td class='text-left'>" + result[n].InvDate + "                                   </td>" +
                       "<td style='width:12%' class='text-left'>" + result[n].CustName + "                                   </td>" +
                       "<td style='width:15%' class='text-left'>" + result[n].CustAddress + "                                   </td>" +
                       "<td style='width:6%' class='text-right'>" + result[n].ProdQty + "                                   </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
                       "<td class='text-left'>" + result[n].Location + " </td>" +
                       "<td class='text-left'>" + result[n].SalesMan + " </td>" +
                       "<td style='width:7%' class='text-left'>" + result[n].LPONumber + "                                   </td>" +
                       "<td class='text-left'>" + result[n].DepartmentName + "                                   </td>" +
                        "</tr>";
                }
                $('#tblsalestrans').html(ProdRow + '</tbody>');
                datatableWithsearch('tblsalestrans', 'Multiple');
                $('#tblsalestrans').scrollTop(0);
            }
            else {
                $('#tblsalestrans').html(ProdRow + '</tbody>');
                datatableWithsearch('tblsalestrans', 'Multiple');
            }
        }
    });
}

//Purchase Transactions Load
function PurchaseTransactions(ProductId, product, ProductDesc, flag) {
    $('#popupdesc').fadeOut();

    var data = {};
    data.ItemId = ProductId;
    data.DepartmentId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Type = flag;
    $.ajax({
        type: "POST",
        url: '../Purchase/PurchaseTransactionSearch',
        data: data,
        success: function (result) {

            disable_datatable('tblurchasetrans');
            //  productpopuprefresh();
            hidepopup(1);
            $('#salestranspopupdiv').show();
            $('#salestransdiv').hide();
            $('#alltranstransdiv').hide();
            $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Last Purchase Transaction Details');
            $('#purchasetransdiv').show();
            $("#txtquantity0,#txtproduct0").blur();
            $('#tblurchasetrans tr td').remove();

            var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency</th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                                 "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency </th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";

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
                            "<td style='text-align:right'>" + a + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
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
                            "<td style='text-align:right'>" + a + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                            "<td class='text-left'>" + result[p].Locnname + "</td>" +
                            "<td class='text-left'>" + result[p].CurrencyName + "</td>" +
                            "<td class='text-left'>" + result[p].DeptName + "</td>" +
                            "<td class='text-left'>" + lpotr + "</td>" +
                             "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                            "</tr>";
                    }
                }

                $('#tblurchasetrans').html(ProdRow + '</tbody>');
                datatableWithsearch('tblurchasetrans', 'Multiple');
                $('#tblurchasetrans').scrollTop(0);

            }
            else {
                $('#tblurchasetrans').html(ProdRow + '</tbody>');
                datatableWithsearch('tblurchasetrans', 'Multiple');
            }

        }
    });
}

//All Transactions Load
function AllTransactions(ProductId, product, ProductDesc, flag) {
    $('#popupdesc').fadeOut();
    var data = {};
    data.ItemId = ProductId;
    data.DepartmentId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Type = flag;
    $.ajax({
        type: "POST",
        url: "../Purchase/TransactionSearch",
        data: data,
        success: function (result) {

            disable_datatable('tblalltrans');
            // productpopuprefresh();
            hidepopup(1);
            $('#salestranspopupdiv').show();
            $('#salestransdiv').hide();
            $('#alltranstransdiv').show();
            $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - All Transaction Details');
            $('#purchasetransdiv').hide();
            $("#txtquantity0,#txtproduct0").blur();
            $('#tblalltrans tr').remove();

            var ProdRow = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account Name</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr>" +
                            "<tr><th>Bill Number</th><th>Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account Name</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr></thead><tbody>";


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
                              "<td class='text-left' style='width:6%'>" + result[n].AccountName + " </td>" +
                                "<td class='text-left' style='width:6%'>" + result[n].Remarks + " </td>" +
                              "<td class='text-left' style='width:1%'>" + result[n].Quantity + " </td>" +
                              "<td class='text-left' style='width:1%'>" + BalQty + "  </td>" +
                              "<td class='text-right' style='width:3%'>" + parseFloat(result[n].Cost || 0).toFixed(Decimal) + "   </td>" +
                              "<td class='text-right' style='width:3%'>" + parseFloat(result[n].TransPrice || 0).toFixed(Decimal) + " </td>" +
                               "<td class='text-left' style='width:5%'>" + result[n].Locnname + " </td>" +
                                "<td class='text-left' style='width:1%'>" + result[n].DeptName + "  </td>" +
                                "<td class='text-left' style='width:6%'>" + result[n].JobCode + "  </td>" + "</tr>";
                }
                $('#tblalltrans').html(ProdRow + '</tbody>');
                datatableWithsearch('tblalltrans', 'Multiple');
                $('#alltranstransdiv').scrollTop(0);

            }
            else {
                $('#tblalltrans').html(ProdRow + '</tbody>');
                datatableWithsearch('tblalltrans', 'Multiple');
            }
        }
    });
}

//Close Transaction Popup
function salestranspopuprefresh() {
    $('#tblsalestrans tr td').remove();
    $('#tblurchasetrans tr td').remove();
    $('#tblalltrans tr td').remove();
    $('#salestranspopupdiv').hide();
    $('#salestransdiv').hide();
    $('#purchasetransdiv').hide();
    $('#alltranstransdiv').hide();
    $('#salesheader').text('Transaction Details');




    if ($("#HiddenItemId").val() != 0 && $("#HiddenItemId").val() != '') {
        $('#iconForm').show();
        $('#searchItemCode').focus();
    }
    else if ($('#PrdtId0').val() != 0 && $("#PrdtId0").val() != 0) {
        $('#txtquantity0').focus();
        $('#txtquantity0').select();
        if ($('#descpopup').text() != '')
            $('#popupdesc').show();
    }
    else if ($('#HiddenAutoItemId').val() != 0 && $('#HiddenAutoItemId').val() != '') {
        $('#AutoItemCode').focus();
        $('#automobiles').show();
        if ($('#descpopup').text() != '')
            $('#popupdesc').show();
    }
}

//Function call for Multiple Product Selection List 
function Multipleproduct() {
    var data = {};
    data.ItemCode = $("#txtproduct0").val();
    data.LocId = $("#select_locn").val();
    data.DeptId = ERPDeptId;
    data.CustId = $("#txtCustId").val();
    data.UserId = ERPUserId;
    data.ProductMultiPriceId = ($("#PriceGroupId").val() || 0);
    $.ajax({
        url: "../SalesInvoice/ProductSearchSales",
        type: "POST",
        data: data,
        dataType: "json",
        success: function (result) {
            $('#mltrsltlng').val(result.length);
            ShowMultipleProductsList(result, 0);
            // $('#txtproduct0').val($('#temptxtproduct0').val()); 
        }
    })
}

//Hide Multiple Product Selection List 
function closepopupprdtlist(flg) {
    $('#Productlist tr').remove();
    $('#Productlist thead').remove();
    $('#pcol1').text("");
    $('#pcol2').text("");
    $('#Itemname').text('');
    //$('#pcol1').hide();
    //$('#pcol2').hide();
    $('#pdthead').css("height", '60px');
    clearprodlist(1);
    $("#HiddenItemId").val(0);
    $('#HiddenDesc').val('');
    $('#HiddenItem').val('');
    $('#Warningpopup').fadeOut();
    if (flg != 1)
        $('#txtproduct0').focus();
}

//Show more products in popup in Multiple Product Selection List 
function ShowMultipleProductsList(result, st) {



    totalproductslist();
    cleargridids();
    $("#HiddenItemId").val(0);
    $("#HiddenDesc").val('');
    $("#HiddenItem").val('');
    $("#emptyrslt").remove();
    var sln = 0;
    if (st == 0) {
        $('#Productlist thead').remove();
        $('#Productlist tr').remove();
    }
    else {

        $('#Productlist thead').remove();


        $('.removeme').remove();

        var rowid;
        if ($('#Productlist tr').length = 0)
            rowid = 1;
        else {
            try { rowid = $('#Productlist tr:last').attr('id').match(/\d+/)[0]; }
            catch (err) {
                rowid = 1;
            }

        }



        sln = parseInt(rowid || 1);

        //for (var c = 0; c <= $('#mltrsltlng').val()+1 ; c++) { 
        //    if (!$("#SlNoHeadCheckgrid" + c).is(":checked")) {               
        //        $("#mltplerow" + c).remove();                
        //    }
        //    else
        //    {
        //      sln = c;
        //    }
        //}

    }

    $('#iconForm').show();
    var slno = parseInt(sln);
    if (result != 0) {
        var responseText1 = "<thead><tr><th style='width:90px;'> </th><th>Product</th><th>Description</th><th>Stock</th><th>Unit</th><th>Location</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th></tr></thead>";
        $('#Productlist').append(responseText1);
        for (var l = 0; l < result.length; l++) {


            if ((MultiPdtArray.indexOf("" + result[l].ItemId + "") == -1)) {
                var bins = '';
                if (result[l].Bin_A != '') { bins = result[l].Bin_A } if (result[l].Bin_B != '') { bins = bins + ' , ' + result[l].Bin_B } if (result[l].Bin_C != '') { bins = bins + ' , ' + result[l].Bin_C }
                if (result[l].Bin_D != '') { bins = bins + ' , ' + result[l].Bin_D } if (result[l].Bin_E != '') { bins = bins + ' , ' + result[l].Bin_E } if (result[l].Bin_F != '') { bins = bins + ' , ' + result[l].Bin_F }
                if (result[l].Bin_G != '') { bins = bins + ' , ' + result[l].Bin_G } if (result[l].Bin_H != '') { bins = bins + ' , ' + result[l].Bin_H }

                slno++;
                var responseText =
                    '<tr class="removeme"  onclick="GetPrdtId(' + result[l].ItemId + ",'" + result[l].Description + "','" + result[l].ItemCode + "'," + 1 + '),Getproddetails(' + slno + '),rowbgcolor(' + slno + ')" id="mltplerow' + slno + '"><td style="width:90px;" ><input name="Checkprdtlist" onchange=clearcheck(' + slno + ') type="checkbox" disabled id= ' + 'SlNoHeadCheckgrid' + slno + '  class="form-control" style="zoom:.7;align:center"></td>' +
                    '<td style=display:none;><input type="text" style="display:none;" id= ' + 'ItemIdgrid' + slno + ' value= ' + result[l].ItemId + '></td>' +
                    '<td id="col' + slno + '">' + result[l].ItemCode + '<input type="text" style="display:none;" id= ' + 'Itemcodegrid' + slno + ' value= ' + result[l].ItemCode + '></td>' +
                    '<td id=' + 'Itemdescgrid' + slno + '>' + result[l].Description + '</td>' +
                    '<td style="text-align:center;" id=' + 'ItemStockqty' + slno + '>' + result[l].TotQty + '</td>' +
                    '<td style="text-align:center;" ><select  style="height:30px;" class=form-control id=' + 'Itemunitgrid' + slno + ' onkeydown=Focusnext(event,' + slno + ',"u")>' + UnitSelect + '</select></td>' +
                    '<td style="text-align:center;" ><select  style="height:30px;" class=form-control id=' + 'ItemLocngrid' + slno + ' onchange=Locationqtycheck(' + slno + ') onkeydown=Focusnext(event,' + slno + ',"l") >' + LocnSelect + '</select></td>' +
                    '<td style="text-align:center;width:130px;" ><input type="text" style="height:30px;" class="form-control" id= ' + 'qtypr' + slno + '  onkeypress=isNumberInt(event,this) onkeyup=gridamountcalculation(' + slno + '),checkqtystock(' + slno + '),Checkme(' + slno + ') onkeydown=Focusnext(event,' + slno + ',"q")></td>' +
                    '<td style="text-align:center;width:130px;" >' +
                    '<input type="text" style="height:30px;" class="form-control" id= ' + 'prrate' + slno + ' value=' + result[l].SellingPrice.toFixed(Decimal) + ' onblur=checkratestock(' + slno + ')  onkeypress=isNumber(event,this)  onkeyup=gridamountcalculation(' + slno + '),Checkme(' + slno + ') onkeydown=Focusnext(event,' + slno + ',"r")>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prdfcrate' + slno + '></td>' +
                    '<td style="text-align:center;width:130px;">' +
                    '<input type="text" style="height:30px;" class="form-control" id= ' + 'prdisc' + slno + ' onkeypress=isNumber(event,this)   onkeyup=gridamountcalculation(' + slno + '),checkdiscount(' + slno + ') onkeydown=Focusnext(event,' + slno + ',"d")>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prdfcdiscount' + slno + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prdtaxableamnt' + slno + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prdfctaxableamnt' + slno + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prdtaxamnt' + slno + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prdfctaxamnt' + slno + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prdamnt' + slno + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prdfcamnt' + slno + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'pravgcost' + slno + ' value=' + result[l].AvgCost + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prLineAvgCost' + slno + '>' +
                    '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'prStockqty' + slno + ' value=' + result[l].stocktotloseqty + '></td>' +
                    '<td style="text-align:center;" ><select  style="height:30px;" class=form-control id=' + 'Itemtaxgrid' + slno + ' onkeydown=Focusnext(event,' + slno + ',"t") onchange=gridamountcalculation(' + slno + ') >' + TaxSelect + '</select></td>' +
                    '<td style="display:none" id=' + 'Binm' + slno + '>' + bins + '</td>' +
                    '</tr>';
                $('#Productlist').append(responseText);

                $('#Itemunitgrid' + slno).val(result[l].UnitId);
                $('#Itemtaxgrid' + slno).val(result[l].VatId);
                $('#ItemLocngrid' + slno).val($('#select_location0').val());
                $('#mltrcurrlength').val(slno);
                $('#RowGetprdt').val(result.length);
            }
        }
        //$('#Productlist').append('</tbody>');
        //if (st == 2)

        $('#searchItemCode').focus();
        //else
        //    $('#searchGroup').focus();
    }
    //else {
    //    var responseText = '<tr id="emptyrslt"><td colspan=10 style="text-align:center"><b>No Datas Found</b></td><tr></tbody>';
    //    $('#Productlist').append(responseText);
    //}
    $('#div1').animate({ scrollTop: 0 });

    totalproductslist();
}

//Get ItemId From Multiple Production List To Get Transaction Details
function GetPrdtId(ItemId, Desc, Code, slno) {

    if (slno == 1) {
        $("#HiddenItemId").val(ItemId);
        $("#HiddenDesc").val(Desc);
        $("#HiddenItem").val(Code);
    }
    else if (slno == 2) {
        var descr = Desc;
        var j = 0, strLength = descr.length;
        for (j; j < strLength; j++) {
            descr = descr.replace("@%@", " ");
        }

        var codes = Code;
        var k = 0, strLength1 = codes.length;
        for (k; k < strLength1; k++) {
            codes = codes.replace("@%@", " ");
        }

        $("#HiddenGridItemId").val(ItemId);
        $("#HiddenGridDesc").val(descr);
        $("#HiddenGridItem").val(codes);
    }
    else if (slno == 3) {
        var descr = Desc;
        var j = 0, strLength = descr.length;
        for (j; j < strLength; j++) {
            descr = descr.replace("#%#", " ");
        }

        var codes = Code;
        var k = 0, strLength1 = codes.length;
        for (k; k < strLength1; k++) {
            codes = codes.replace("#%#", " ");
        }

        $("#HiddenGridItemId").val(ItemId);
        $("#HiddenGridDesc").val(descr);
        $("#HiddenGridItem").val(codes);
    }
    else if (slno == 4) {                              //F3 POPUP
        //var descr = Desc;
        //var j = 0, strLength = descr.length;
        //for (j; j < strLength; j++) {
        //    descr = descr.replace("#%#", " ");
        //}

        //var codes = Code;
        //var k = 0, strLength1 = codes.length;
        //for (k; k < strLength1; k++) {
        //    codes = codes.replace("#%#", " ");
        //}

        $("#HiddenAutoItemId").val(ItemId);
        $("#HiddenAutoDesc").val(Desc);
        $("#HiddenAutoItem").val(Code);
    }
}

//Function Call to Load Stock Qty When Location Change in Multiple Product Selection List for Qty Checking
function Locationqtycheck(id) {
    $('#qtypr' + id).val('');
    document.getElementById("SlNoHeadCheckgrid" + id).checked = false;
    document.getElementById("SlNoHeadCheckgrid" + id).disabled = true;
    var data = {};
    data.ProductId = $('#ItemIdgrid' + id).val();
    data.LocnId = $('#ItemLocngrid' + id).val();
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/GetQuantitybyLocation",
        data: data,
        success: function (result) {
            qtyload(result.oList, id)
        }
    });
}

//Load Stock Qty When Location Change in Multiple Product Selection List for Qty Checking 
function qtyload(result, id) {
    if (result.length == 'undefined') {
        $('#prStockqty' + id).val(0);
    }
    else {
        for (var j = 0; j < result.length; j++)
            $('#prStockqty' + id).val(result[j].stocktotloseqty);
    }
}

//Check Qty>Stock Qty in Multiple Product Selection List 
function checkqtystock(id) {
    if (Negativebill == 'NO' && ($("#ItemLocngrid" + id).find("option:selected").attr("name") == 0)) {
        var pflg = 0;
        var pdtsumqty = 0;
        var pdtsumqty1 = 0;
        for (var p = 1; p <= i; p++) {
            if (($('#PrdtId' + p).val() == $("#ItemIdgrid" + id).val()) && ($('#select_location' + p).val() == $("#ItemLocngrid" + id).val()) && ($('#txtquantity' + p).attr('name') == 'prdaddqty')) {
                pflg = 1;
            }
        }
        if (pflg == 0) {                      //If Product is not already added in product grid-check qty<stockqty
            if (($('#ItemIdgrid' + id).val() != 0) && (parseInt($('#qtypr' + id).val()) > parseInt($('#prStockqty' + id).val()))) {
                warningshow('Not Enough Stock!Available stock is ' + $('#prStockqty' + id).val());
                $('#qtypr' + id).val('');
                $('#qtypr' + id).focus();
                document.getElementById("SlNoHeadCheckgrid" + id).checked = false;
                document.getElementById("SlNoHeadCheckgrid" + id).disabled = true;
                return false;
            }
        }
        else                          //else check qty < stockqty-(sum of qty of pdts in pdt grid)
        {
            for (var g = 1; g <= i; g++) {
                if (($('#PrdtId' + g).val() == $("#ItemIdgrid" + id).val()) && ($('#select_location' + g).val() == $("#ItemLocngrid" + id).val()) && ($('#txtquantity' + g).attr('name') == 'prdaddqty')) {
                    pdtsumqty = parseInt(pdtsumqty) + parseInt($("#txtquantity" + g).val());
                    pdtsumqty1 = parseInt(pdtsumqty);
                }
            }
            if ($("#qtypr" + id).val() > (parseInt($('#prStockqty' + id).val()) - pdtsumqty1)) {
                warningshow('Available Quantity is ' + (parseInt($('#prStockqty' + id).val()) - pdtsumqty1), 'qtypr' + id);
                $('#qtypr' + id).val('');
                $('#qtypr' + id).focus();
                return false;
            }
        }
    }
}

var rateflg = 0;
//Check Rate>Average Rate (check onblur)
function checkratestock(id) {

    // if ($("#SlNoHeadCheckgrid" + id).is(":checked")) {

    if ((BelowCost == 'NO') && ($('#pravgcost' + id).val() != 0) && (parseFloat($('#prrate' + id).val()) < parseFloat($('#pravgcost' + id).val()))) {
        warningshow('Rate must be greater than ' + $('#pravgcost' + id).val(), 'prrate' + id);
        rateflg = 1;
        return false;
    }

    else {
        rateflg = 0;
    }
    // }
}

//check discount > rate
function checkdiscount(id) {
    if ((parseFloat($("#prrate" + id).val()) > 0) && (parseFloat($("#prdisc" + id).val()) >= parseFloat($("#prrate" + id).val()))) {
        warningshow('Discount should be less than rate', 'prdisc' + id);
        $('#prdisc' + id).val('');
        return false;
    }
}

//find total products and quantity in multiple productlist
function totalproductslist() {

    var totqty = 0;
    $('#Totgridpdcts').val('');
    $('#Totgridqty').val('');

    var flg = 0;
    for (var p = 1; p <= $('#mltrcurrlength').val() ; p++) {
        if ($('#SlNoHeadCheckgrid' + p).prop('checked')) {
            totqty = totqty + parseFloat($('#qtypr' + p).val() || 0);
            flg++;
        }

    }

    //var checkboxes = document.getElementsByName('Checkprdtlist');
    //$('#Totgridpdcts').val(checkboxes.length);
    $('#Totgridpdcts').val(flg);

    $('#Totgridqty').val(totqty);
}

//Calculate total amount in Multiple Product Selection List 
function gridamountcalculation(id) {

    var fc = parseFloat($('#txtcrncyrate').val());
    var fcprodrate = 0;
    var fcproddisc = 0;
    var fctaxable = 0;
    var fctax = 0;
    var fcamnt = 0;


    var quantity = $('#qtypr' + id).val() || 0;
    var rate = parseFloat($('#prrate' + id).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var amount = parseFloat(quantity * rate);
    var discount = parseFloat($('#prdisc' + id).val() || 0);
    discount = isNaN(discount) ? 0 : discount;
    var taxableamount = parseFloat(amount - discount);
    var taxrate = parseFloat($('#Itemtaxgrid' + id).find("option:selected").attr("name") || 0);
    var taxamount = parseFloat(taxableamount * taxrate) / 100;
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));
    var LineAvgCost = quantity * parseFloat($('#pravgcost' + id).val() || 0);

    $('#prdamnt' + id).val(totalamount.toFixed(Decimal));
    $('#prdtaxableamnt' + id).val(taxableamount.toFixed(Decimal));
    $('#prdtaxamnt' + id).val((taxamount).toFixed(Decimal));
    $('#prLineAvgCost' + id).val(LineAvgCost.toFixed(Decimal));

    fcprodrate = parseFloat($('#prrate' + id).val() || 0) * fc;
    fcproddisc = parseFloat($('#prdisc' + id).val() || 0) * fc;
    fctaxable = parseFloat($('#prdtaxableamnt' + id).val() || 0) * fc;
    fctax = parseFloat($('#prdtaxamnt' + id).val() || 0) * fc;
    fcamnt = parseFloat($('#prdamnt' + id).val() || 0) * fc;

    $('#prdfcrate' + id).val(fcprodrate.toFixed(Decimal));
    $('#prdfcdiscount' + id).val(fcproddisc.toFixed(Decimal));
    $('#prdfctaxableamnt' + id).val(fctaxable.toFixed(Decimal));
    $('#prdfctaxamnt' + id).val(fctax.toFixed(Decimal));
    $('#prdfcamnt' + id).val(fcamnt.toFixed(Decimal));

    totalproductslist();
}


var ProductFlag1 = 0;
var Prodarray = [];
var ProdIdArray = [];
//Add Products into Product Grid from Multiple Product Selection List 
function addgridproducts() {


    for (j = 1; j <= $('#mltrcurrlength').val() ; j++) {
        if ($("#SlNoHeadCheckgrid" + j).is(":checked")) {
            if ((BelowCost == 'NO') && ($('#pravgcost' + j).val() != 0) && (parseFloat($('#prrate' + j).val()) < parseFloat($('#pravgcost' + j).val()))) {
                rateflg = 1;
            }
            else
                rateflg = 0;
        }

    }

    //var a = $('#Productlist tr:last td:last').text();

    Prodarray = [];
    if (rateflg == 0) {

        var cnt = $('#mltrcurrlength').val();
        var rowcount1 = CountRows();
        if (rowcount1 == 0) {
            i = 1;
        }

        for (var n = 1; n <= cnt; n++) {                                               //Add Checked Row Id's to Prodarray[]
            if ($("#SlNoHeadCheckgrid" + n).is(":checked")) {
                Prodarray.push(n);
            }
        }

        var y = 0;
        for (var b = 0; b < Prodarray.length; b++) {                            //Add Already added Item Id Into ProdIdArray[]
            y = Prodarray[b];

            for (var p = 1; p <= rowcount1; p++) {
                if (($('#PrdtId' + p).val() == $('#ItemIdgrid' + y).val())) {
                    var n = ProdIdArray.includes($('#ItemIdgrid' + y).val());
                    if (n != true) {
                        ProdIdArray.push($('#ItemIdgrid' + y).val());
                    }
                }
            }
            var mm = 0;
            for (var p = 0; p <= ProdIdArray.length; p++) {                      //Check wheather selected Item Id is in ProdIdArray
                mm = ProdIdArray[p];
                if ((mm == $('#ItemIdgrid' + y).val())) {
                    var pdt = $('#Itemdescgrid' + y).text();
                    var Res = confirm(pdt + ' already Added! Do You Want to Continue');
                    if (Res == false) {
                        Prodarray.splice(b, 1);
                    }
                }
            }
        }
        if (Prodarray.length <= 0) {
            warningshow('Select Product');
        }
        else {
            $('#disc').prop("disabled", false);
            $('#disc').val('0.00');
            $('#Discountpercent').val('');
            var m = 0;
            for (var b = 0; b < Prodarray.length; b++) {
                m = Prodarray[b];
                if ($("#SlNoHeadCheckgrid" + m).is(":checked")) {

                    if ($("#Itemunitgrid" + m).val() == '') {
                        warningshow('Please Select Unit', 'Itemunitgrid' + m);
                        $('#Itemunitgrid' + m).select();
                        return false;
                    }
                    else if ($("#qtypr" + m).val() == '' || 0) {
                        warningshow('Please Enter The Quantity', 'qtypr' + m);
                        $('#qtypr' + m).select();
                        return false;
                    }
                    else if ($("#prrate" + m).val() == '' || 0) {
                        warningshow('Please Enter the Rate', 'prrate' + m);
                        $('#prrate' + m).select();
                        return false;
                    }
                    else if (parseFloat($("#prdisc" + m).val()) >= parseFloat($("#prrate" + m).val())) {
                        warningshow('Discount should be less than rate', 'prdisc' + m);
                        $('#prdisc' + m).val('');
                        return false;
                    }
                    else if ($("#prdamnt" + m).val() == '' || $("#prdamnt" + m).val() == 0) {
                        warningshow('Amount can not be Zero', 'prdamnt' + m);
                        $('#prrate' + m).select();
                        return false;
                    }
                    else if ($("#prdamnt" + m).val() < 0) {
                        warningshow('Amount can not be Negative', 'prdamnt' + m);
                        $('#prdisc' + m).select();
                        return false;
                    }
                    else if ($("#Itemunitgrid" + m).val() == 0) {
                        warningshow('Please Select The Unit', 'Itemunitgrid' + m);
                        $('#Itemunitgrid' + m).select();
                        return false;
                    }
                    else if ($("#Itemtaxgrid" + m).val() == 0) {
                        warningshow('Please Select Tax', 'Itemtaxgrid' + m);
                        return false;
                    }
                    else if ($("#ItemLocngrid" + m).val() == '' || $("#ItemLocngrid" + m).val() == 0) {
                        warningshow('Please Select Location', 'ItemLocngrid' + m);
                        $('#ItemLocngrid' + m).select();
                        return false;
                    }
                    else {

                        var bins = '';
                        if ($('#Binm' + m).text() != '')
                            bins = $('#Binm' + m).text();

                        BillDiscountFlag = 0;

                        var slno = parseInt(++rowcount1);
                        var id = parseInt(i);

                        var desc = $('#Itemdescgrid' + m).text();
                        var j = 0, strLength = desc.length;
                        for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                        var code = $('#Itemcodegrid' + m).val();
                        var k = 0, strLength1 = code.length;
                        for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                        var ProdRows = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + $('#ItemIdgrid' + m).val() + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $('#ItemIdgrid' + m).val() + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $('#Itemcodegrid' + m).val() + "'  data-toggle='tooltip' title='" + $('#Itemcodegrid' + m).val() + "'></td>" +
                            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $('#Itemdescgrid' + m).text() + "' data-toggle='tooltip' title='" + $('#Itemdescgrid' + m).text() + "'></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'  onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select style='background-color:white;height:30px'  id=" + 'select_location' + id + " class='form-control' onchange ='Locationqtycheckmain(" + id + ")' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' class='form-control text-center' name='prdaddqty' id=" + 'txtquantity' + id + " value=" + parseInt($('#qtypr' + m).val()) + " style='background-color:white;height:30px' onkeyup='checkqty(" + id + "),amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + ($('#prStockqty' + m).val() || 0) + " style='display:none'></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#prdfcrate' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#prrate' + m).val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#prdfcdiscount' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#prdisc' + m).val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#prdfctaxableamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#prdtaxableamnt' + m).val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#Itemtaxgrid' + m).find("option:selected").attr("name") + " onkeyup='amountcalculation(" + id + ")'></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#prdfctaxamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#prdtaxamnt' + m).val()).toFixed(Decimal) + " disabled=''></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#prdfcamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#prdamnt' + m).val() + "></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + parseFloat($('#prLineAvgCost' + m).val()).toFixed(Decimal) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#pravgcost' + m).val()).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                            "<td style='display:none' id=" + 'Bin' + id + ">" + bins + "</td>" +
                          "</tr>";
                        $('#tblsalesinvoice').append(ProdRows);
                        $('#select_unit' + id).val($('#Itemunitgrid' + m).val());
                        $('#select_tax' + id).val($('#Itemtaxgrid' + m).val());
                        $('#select_location' + id).val($('#ItemLocngrid' + m).val());
                        TaxSplit(id);
                        CalcGrandTotal(i);
                        fccalculation(i);
                        $("#SlNoHeadCheckgrid" + m).prop("checked", false);
                        $('#RowGetprdt').val(0);
                        ProductFlag1 = 0;


                        if (parseFloat($('#txtdiscount' + id).val()) > 0) {
                            $('#disc').prop("disabled", true);
                            $('#disc').val('0.00');
                            $('#Discountpercent').val('');

                            BillDiscountFlag = 1;
                        }
                        i++;
                        $('#iconForm').hide();
                        $('#Warningpopup').fadeOut();
                        CalcDiscountSplitTax1();
                        roundoffcalc();
                        clearprodlist(1);
                        totalproducts();
                        $('#txtproduct0').focus();
                        $("#HiddenItemId").val(0);
                        $("#HiddenDesc").val('');
                        $("#HiddenItem").val('');

                        if ($("#PrdtId0").val() != 0 && $("#PrdtId0").val() != '')
                            $("#TransPrdtId0").val($("#PrdtId0").val());


                    }
                }
                $('#proddiv').animate({ scrollTop: 5000 }, 900);

            }
            TemporarySalessave();
        }

    }
    else {
        warningshow('Rate must be greater than average Cost For All Products');
    }
}

var MultiPdtArray = [];
//checking corresponding check box when entering any data 
function Checkme(Id) {
    if (($('#qtypr' + Id).val() != '') && ($('#prrate' + Id).val() != '') && ($('#prdamnt' + Id).val() != 0)) {

        $("#mltplerow" + Id).removeClass("removeme");
        $("#mltplerow" + Id).addClass("notremove");

        document.getElementById("SlNoHeadCheckgrid" + Id).checked = true;
        document.getElementById("SlNoHeadCheckgrid" + Id).disabled = false;

        var x = $('#ItemIdgrid' + Id).val();
        if (MultiPdtArray.indexOf(x) == -1)
            MultiPdtArray.push(x)

    }
    else {

        $("#mltplerow" + Id).addClass("removeme");
        $("#mltplerow" + Id).removeClass("notremove");
        document.getElementById("SlNoHeadCheckgrid" + Id).checked = false;
        document.getElementById("SlNoHeadCheckgrid" + Id).disabled = true;


    }
    totalproductslist();
}

//Clear fields on unticking checkbox
function clearcheck(Id) {
    $('#qtypr' + Id).val('');
    // $('#prrate' + Id).val('');
    document.getElementById("SlNoHeadCheckgrid" + Id).disabled = true;
    $("#mltplerow" + Id).addClass("removeme");
    $("#mltplerow" + Id).removeClass("notremove");

    totalproductslist();
}

//Focus to next text box in Multiple Product Selection List  
function Focusnext(e, Id, col) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    var rowcount1 = CountRows();

    if (key == 40) {            // Down Arrow
        $('#mltplerow' + Id).css('background-color', '');
        $('#mltplerow' + Id).css('font-weight', '');
        $('#qtypr' + Id + ',#prrate' + Id + ',#prdisc' + Id + ',#Itemunitgrid' + Id + ',#Itemtaxgrid' + Id + ',#ItemLocngrid' + Id).css('font-weight', '');

        Getproddetails(Id);
        GetPrdtId($('#ItemIdgrid' + Id).val(), $('#Itemdescgrid' + Id).text(), $('#col' + Id).text(), 1)
        e.preventDefault();
        var nextID = Id;
        try {
            nextID = ($('#Itemdescgrid' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            nextID = Id;
        }
        Getproddetails(nextID);
        GetPrdtId($('#ItemIdgrid' + nextID).val(), $('#Itemdescgrid' + nextID).text(), $('#col' + nextID).text(), 1)
        $('#mltplerow' + nextID).css('background-color', '#FFC6B0');
        $('#mltplerow' + nextID).css('font-weight', 'bold');
        $('#qtypr' + nextID + ',#prrate' + nextID + ',#ItemLocngrid' + nextID + ',#Itemunitgrid' + nextID + ',#prdisc' + nextID + ',#Itemtaxgrid' + nextID).css('font-weight', 'bold');

        if (col == 'q') {
            $('#qtypr' + nextID).focus();
            $('#qtypr' + nextID).select();


        }
        else if (col == 'r') {
            $('#prrate' + nextID).focus();
            $('#prrate' + nextID).select();


        }
        else if (col == 'd') {
            $('#prdisc' + nextID).focus();
            $('#prdisc' + nextID).select();

        }
        else if (col == 'u') {
            $('#Itemunitgrid' + nextID).focus();

        }
        else if (col == 't') {
            $('#Itemtaxgrid' + nextID).focus();

        }
        else if (col == 'l') {
            $('#ItemLocngrid' + nextID).focus();

        }
    }
    else if (key == 39) {       //Right Arrow
        $('#mltplerow' + Id).css('background-color', '');
        $('#mltplerow' + Id).css('font-weight', '');
        $('#qtypr' + Id + ',#prrate' + Id + ',#prdisc' + Id + ',#Itemunitgrid' + Id + ',#Itemtaxgrid' + Id + ',#ItemLocngrid' + Id).css('font-weight', '');

        e.preventDefault();
        $('#mltplerow' + Id).css('background-color', '#FFC6B0');
        $('#mltplerow' + Id).css('font-weight', 'bold');
        $('#qtypr' + Id + ',#prrate' + Id + ',#ItemLocngrid' + Id + ',#Itemunitgrid' + Id + ',#prdisc' + Id + ',#Itemtaxgrid' + Id).css('font-weight', 'bold');

        if (col == 'r') {
            $('#prdisc' + Id).focus();
            $('#prdisc' + Id).select();
        }
        else if (col == 'q') {
            $('#prrate' + Id).focus();
            $('#prrate' + Id).select();
        }
        else if (col == 'u') {
            $('#ItemLocngrid' + Id).focus();

        }
        else if (col == 'd') {
            $('#Itemtaxgrid' + Id).focus();
        }
        else if (col == 't') {
            $('#Itemunitgrid' + Id).focus();
        }
        else if (col == 'l') {
            $('#qtypr' + Id).focus();
            $('#qtypr' + Id).select();
        }
    }
    else if (key == 37) {       //Left Arrow
        $('#mltplerow' + Id).css('background-color', '');
        $('#mltplerow' + Id).css('font-weight', '');
        $('#qtypr' + Id + ',#prrate' + Id + ',#prdisc' + Id + ',#Itemunitgrid' + Id + ',#Itemtaxgrid' + Id + ',#ItemLocngrid' + Id).css('font-weight', '');

        e.preventDefault();
        $('#mltplerow' + Id).css('background-color', '#FFC6B0');
        $('#mltplerow' + Id).css('font-weight', 'bold');
        $('#qtypr' + Id + ',#prrate' + Id + ',#ItemLocngrid' + Id + ',#Itemunitgrid' + Id + ',#prdisc' + Id + ',#Itemtaxgrid' + Id).css('font-weight', 'bold');

        if (col == 'r') {
            $('#qtypr' + Id).focus();
            $('#qtypr' + Id).select();
        }
        else if (col == 'q') {
            $('#ItemLocngrid' + Id).focus();

        }
        else if (col == 'u') {
            $('#Itemtaxgrid' + Id).focus();
        }
        else if (col == 'l') {

            $('#Itemunitgrid' + Id).focus();
        }
        else if (col == 't') {
            $('#prdisc' + Id).focus();
            $('#prdisc' + Id).select();
        }
        else if (col == 'd') {
            $('#prrate' + Id).focus();
            $('#prrate' + Id).select();
        }

    }
    else if (key == 38) {              //Up Arrow
        $('#mltplerow' + Id).css('background-color', '');
        $('#mltplerow' + Id).css('font-weight', '');
        $('#qtypr' + Id + ',#prrate' + Id + ',#prdisc' + Id + ',#Itemunitgrid' + Id + ',#Itemtaxgrid' + Id + ',#ItemLocngrid' + Id).css('font-weight', '');


        e.preventDefault();
        var prevID = Id;
        try {
            prevID = ($('#Itemdescgrid' + Id).closest('tr').prev('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            prevID = Id;
        }
        Getproddetails(prevID);
        GetPrdtId($('#ItemIdgrid' + prevID).val(), $('#Itemdescgrid' + prevID).text(), $('#col' + prevID).text(), 1)
        $('#mltplerow' + prevID).css('background-color', '#FFC6B0');
        $('#mltplerow' + prevID).css('font-weight', 'bold');
        $('#qtypr' + prevID + ',#prrate' + prevID + ',#prdisc' + prevID + ',#Itemunitgrid' + prevID + ',#Itemtaxgrid' + prevID + ',#ItemLocngrid' + prevID).css('font-weight', 'bold');


        if (col == 'q') {
            $('#qtypr' + prevID).focus();
            $('#qtypr' + prevID).select();
        }
        else if (col == 'r') {
            $('#prrate' + prevID).focus();
            $('#prrate' + prevID).select();
        }
        else if (col == 'd') {
            $('#prdisc' + prevID).focus();
            $('#prdisc' + prevID).select();
        }
        else if (col == 'u') {
            $('#Itemunitgrid' + prevID).focus();
        }
        else if (col == 't') {
            $('#Itemtaxgrid' + prevID).focus();
        }
        else if (col == 'l') {
            $('#ItemLocngrid' + prevID).focus();
        }
    }

    else if (key == 13) {
        //Getproddetails(Id);
        //GetPrdtId($('#ItemIdgrid' + Id).val(), $('#Itemdescgrid' + Id).text(), $('#col' + Id).text(), 1)

        $('#mltplerow' + Id).css('background-color', '');
        $('#mltplerow' + Id).css('font-weight', '');
        $('#qtypr' + Id + ',#prrate' + Id + ',#prdisc' + Id + ',#Itemunitgrid' + Id + ',#Itemtaxgrid' + Id + ',#ItemLocngrid' + Id).css('font-weight', '');


        if (col == 'q') {
            e.preventDefault();
            $('#mltplerow' + Id).css('background-color', '#FFC6B0');
            $('#mltplerow' + Id).css('font-weight', 'bold');
            $('#qtypr' + Id + ',#prrate' + Id + ',#ItemLocngrid' + Id + ',#Itemunitgrid' + Id + ',#prdisc' + Id + ',#Itemtaxgrid' + Id).css('font-weight', 'bold');
            Getproddetails(Id);
            GetPrdtId($('#ItemIdgrid' + Id).val(), $('#Itemdescgrid' + Id).text(), $('#col' + Id).text(), 1)
            $('#prrate' + Id).focus();
            $('#prrate' + Id).select();
        }

        else if (col == 'r') {
            e.preventDefault();
            var nextID;
            try {
                nextID = ($('#Itemdescgrid' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0];
            }
            catch (err) {
                nextID = Id;
            }
            Getproddetails(nextID);
            GetPrdtId($('#ItemIdgrid' + nextID).val(), $('#Itemdescgrid' + nextID).text(), $('#col' + nextID).text(), 1)
            $('#qtypr' + nextID).focus();
            $('#qtypr' + nextID).select();
            $('#mltplerow' + nextID).css('background-color', '#FFC6B0');
            $('#mltplerow' + nextID).css('font-weight', 'bold');
            $('#qtypr' + nextID + ',#prrate' + nextID + ',#ItemLocngrid' + nextID + ',#Itemunitgrid' + nextID + ',#prdisc' + nextID + ',#Itemtaxgrid' + nextID).css('font-weight', 'bold');
        }
    }
}

function rowbgcolor(Id) {
    var a;
    try {
        a = $('#Productlist tr:last').attr('id').match(/\d+/)[0];
    }
    catch (err) {
        a = 1;
    }
    for (var c = 1; c <= a; c++) {
        $('#mltplerow' + c).css('background-color', '');
        $('#mltplerow' + c).css('font-weight', '');
        $('#qtypr' + c + ',#prrate' + c + ',#prdisc' + c + ',#Itemunitgrid' + c + ',#Itemtaxgrid' + c + ',#ItemLocngrid' + c).css('font-weight', '');

    }
    if (Id != 0) {
        $('#mltplerow' + Id).css('background-color', '#FFC6B0');
        $('#mltplerow' + Id).css('font-weight', 'bold');
        $('#qtypr' + Id + ',#prrate' + Id + ',#ItemLocngrid' + Id + ',#Itemunitgrid' + Id + ',#prdisc' + Id + ',#Itemtaxgrid' + Id).css('font-weight', 'bold');
    }
}

//Function Call To Load Details of Product in Multiple Product Selection List when focus goes on a product 
function Getproddetails(id) {

    $('#pcol1').text("");
    $('#pcol2').text("");
    $('#Itemname').text('');
    if (id != 0) {
        var data = {};
        data.ProductId = $("#ItemIdgrid" + id).val();
        data.CustId = $("#txtCustId").val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: '../SalesInvoice/CustomerProductDetailsSearch',
            data: data,
            success: function (result) {
                LoadProddetails(result.oList, 1);
            }
        });
    }

}


//Function Call To Load Details of Product from Product Grid focus goes on a product 
function GetproddetailsGrid(id) {
    if (($("#PrdtId" + id).val() != 0) && (copyflag == 0)) {
        var data = {};
        data.ProductId = $("#PrdtId" + id).val();
        data.CustId = $("#txtCustId").val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: '../SalesInvoice/CustomerProductDetailsSearch',
            data: data,
            success: function (result) {
                CustPrdctLoad(result.oList);
            }
        });
        hidepopup(0);
    }
}


//Load Details of Product in Multiple Product Selection List when focus goes on a product 
function LoadProddetails(result, flg) {
    if (flg == 1)                                 //For F2 Popup 
    {
        $('#pcol1').text("");
        $('#pcol2').text("");

        if (result[0].ProductCode != undefined) {
            $('#Itemname').text(result[0].ProductCode);
        }
        for (var n = 0; n < result.length; n++) {
            var custstat;
            if (result[n].LastSellingPrice == 0) {
                custstat = "Last Selling Price";
            }
            else {
                custstat = result[n].custstats;
            }
            var strr = result[n].Locationstock;
            var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
            var strr2 = strr1.replace(/#/gi, "&emsp;");
            var strr3 = strr2.replace(/,/gi, "&nbsp;");
            if (result[n].custstats == 'Last Selling Price' && $('#txtCustId').val() == 0) {
                var ProdRow =
                 "Average Cost : " + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; LP Cost : " + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; " + custstat + " :" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "";
                var ProdRow2 = strr3;
                $('#pcol1').append(ProdRow);
                $('#pcol2').append(ProdRow2);
                $('#ItemDetails').show();
                $('#pcol1').show();
                //$('#pcol2').hide();
                // $('#pdthead').css("height", '80px');
                var height = $('#pcol2').height();
                var x = 60 + height + 'px';
                $('#pdthead').css("height", x)
            }
            else {
                var ProdRow =
                "Average Cost : " + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; LPCost : " + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; CLS Price :" + (parseFloat(result[n].CustLastSellingPrice || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; Last Selling Price :" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "";
                var ProdRow2 = strr3;
                $('#pcol1').append(ProdRow);
                $('#pcol2').append(ProdRow2);
                $('#ItemDetails').show();
                $('#pcol1').show();
                //$('#pcol2').hide();
                // $('#pdthead').css("height", '80px');
                var height = $('#pcol2').height();
                var x = 60 + height + 'px';
                $('#pdthead').css("height", x)
            }

        }
    }
    else if (flg == 2)                                  //For F3 Popup
    {
        $('#autopcol1').text("");
        $('#autopcol2').text("");

        if (result[0].ProductCode != undefined) {
            $('#AutoItemname').text(result[0].ProductCode);
        }
        for (var n = 0; n < result.length; n++) {
            var custstat;
            if (result[n].LastSellingPrice == 0) {
                custstat = "Last Selling Price";
            }
            else {
                custstat = result[n].custstats;
            }
            var strr = result[n].Locationstock;
            var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
            var strr2 = strr1.replace(/#/gi, "&emsp;");
            var strr3 = strr2.replace(/,/gi, "&nbsp;");
            if (result[n].custstats == 'Last Selling Price' && $('#txtCustId').val() == 0) {
                var ProdRow =
                 "Average Cost : " + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; LP Cost : " + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; " + custstat + " :" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "";
                var ProdRow2 = strr3;
                $('#autopcol1').append(ProdRow);
                $('#autopcol2').append(ProdRow2);

                $('#TblAutomobile').show();
                $('#autopcol1').show();
                var height = $('#autopcol2').height();
                var x = 60 + height + 'px';
                $('#autopdthead').css("height", x)
            }
            else {
                var ProdRow =
                "Average Cost : " + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; LPCost : " + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; CLS Price :" + (parseFloat(result[n].CustLastSellingPrice || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; Last Selling Price :" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "";
                var ProdRow2 = strr3;
                $('#autopcol1').append(ProdRow);
                $('#autopcol2').append(ProdRow2);
                $('#TblAutomobile').show();
                $('#autopcol1').show();
                var height = $('#autopcol2').height();
                var x = 60 + height + 'px';
                $('#autopdthead').css("height", x)
            }

        }
    }
}


//Paytype change function
function loadcust() {
    if ($('#select_payterms').val() == 1)         //if Paytype=Cash load Cashcustomer details 
    {
        $('#txtcustomer').val('CASH CUSTOMER');
        checkcustomerempty();
    }
    else if (!($('#txtCustId').val() > 0)) {
        $('#txtcustomer').val('');
    }
    $('#txtcustomer').focus();
    $('#txtcustomer').select();
}

function maxcheck() {
    //if (parseFloat($('#CashAdvance').val()) > 1000)
    //{
    //    warningshow('Advance Must be less than 1000', 'CashAdvance');
    //    $('#CashAdvance').val('1000');
    //    $('#CashAdvance').select();
    //    return false;
    //}
    if (($('#GrandTotal').val() != 0) && (parseFloat($('#CashAdvance').val()) > $('#GrandTotal').val())) {
        warningshow('Advance Must be less than ' + $('#GrandTotal').val(), 'CashAdvance');
        $('#CashAdvance').val('0.00');
        $('#CashAdvance').select();
        return false;
    }
    else
        return true;
}

//Save Sales Invoice
function savesales() {

    var len = $('#tblsalesinvoice tr').length;

    var r = parseFloat($('#txtcrncyrate').val());
    $("#txtcrncyrate").val(isNaN(r) ? 0 : r);
    var rowcount = CountRows();

    if ($("#txtBillSlNo").val() == '') {
        warningshow('Please Enter Bill Number', 'txtBillSlNo');
    }
    else if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else if (copyflag == 1) {
        return false;
    }
    else if (($("#txtCustId").val() != 0) && (len > 0) && (parseFloat($('#GrandTotal').val()) <= 0) && ($('#disc').val() != 0)) {
        warningshow('GrandTotal Cannot be Negative or Zero', 'disc');
        $('#disc').select();
    }
    else if ($("#select_payterms").val() == 0) {
        warningshow('Please Select Payment Type', 'select_payterms');
    }
    else if ($.trim($("#txtcustomer").val()) == '') {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if (($("#txtCustId").val() == 0) && ($("#select_payterms").val() == 2)) {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if ($('#select_locn').val() == 0) {
        warningshow('Please Select Location', 'select_locn');
    }
    else if ($('#select_salesman').val() == 0) {
        warningshow('Please Select Sales Man', 'select_salesman');
    }
    else if ($('#select_place').val() == 0) {
        warningshow('Please Select Place', 'select_place');
    }
    else if ($('#select_crncy').val() == 0 || $('#select_crncy').val() == null) {
        warningshow('Please Select Currency', 'select_crncy');
    }
    else if ($.trim($('#txtcrncyrate').val()) == '' || $.trim($('#txtcrncyrate').val()) == 0) {
        warningshow('Enter Currency Rate', 'txtcrncyrate');
        $('#txtcrncyrate').select();
    }
    else if (($('#select_jobno').val() != '') && ($('#ProjectJobId').val() == 0)) {
        warningshow('Please Select A Valid Job', 'select_jobno');
    }
    else if (rowcount == 0) {
        warningshow('No Products Added!', 'txtproduct0');
    }
    else if ((parseFloat($('#GrandTotal').val()) <= 0) && ($('#disc').val() != 0)) {
        warningshow('GrandTotal Cannot be Negative or Zero', 'disc');
        $('#disc').select();
    }
    else if ((parseFloat($('#disc').val()) >= parseFloat($('#CheckForDiscount').val())) && parseFloat($('#disc').val() != 0)) {
        warningshow('Discount must be less than ' + parseFloat($('#CheckForDiscount').val()), 'disc');
        $('#disc').select();
        return false;
    }
    else if (Creditcheck(2) == 1 && Creditflag == 0) {


        $('#promptdiv').show();
        $('#promptflag').val('savebill'); $('#promptRowId').val(0);
        $('#promptmessage').append('Credit Limit Of ' + parseFloat($('#txtcreditlimit').val() || 0) + ' Exceeded.</br>Enter OTP Continue!');
        $('#promptdata').focus();

        //var Res = prompt('Credit Limit Of ' + parseFloat($('#txtcreditlimit').val() || 0) + ' Exceeded.Enter OTP Continue!');
        //if (Res != null) {
        //    var status1;
        //    var data = {};
        //    data.UserId = ERPUserId;
        //    data.OTP = Res;
        //    data.Remarks = '';
        //    data.Operation = 'Sales Invoice- OTP - CreditLimit Exceed';
        //    data.DeptId = ERPDeptId;
        //    $.ajax({
        //        type: "POST",
        //        url: "../Home/OTPCheckforUser",
        //        data: data,
        //        success: function (result) {
        //            status1 = result.oList[0].Status;
        //            if (status1 != 1) {
        //                // clearrow(0);
        //                Creditflag = 0;
        //                warningshow('Invalid OTP');
        //                return false;
        //            }
        //            else {
        //                Creditflag = 1; 
        //                $('#confirm').show();
        //                $('#confirmOk').focus();
        //                $('#Confirmflag').val('save'); $('#ConfirmRowId').val(0);
        //                $('#confirmmessage').text('Do You Want To Save The Bill?');
        //            }
        //        }
        //    });
        //}
        //else if (Res == "null" || Res == null || Res == "") {           
        //    Creditflag = 0;
        //    return false;
        //}
    }
    else {
        var a = maxcheck();
        if (a != false) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('save'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Do You Want To Save The Bill?');
        }
    }
}

//function save confirm
function savesalesconfirm() {
    $('#btnsubmit').prop('disabled', true);
    $('#confirmOk').prop("disabled", true);

    var oArray = new Array();
    for (var k = 1; k <= i - 1; k++) {

        var ProductId = $('#PrdtId' + k).val();
        var ProductCode = $('#txtproduct' + k).val();
        var ProductDescr = $('#ProductDesc' + k).val();
        var BillSeriesId = $('#txtBillseriesId').val();
        var BillSlNo = $('#txtBillSlNo').val();
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
        var LocId = $('#select_locn').val();
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
        var EnquiryNo = $('#enqno' + k).val();
        var QuotationNo = $('#qutnnum' + k).val();
        var OrderNo = $('#slordeno' + k).val();
        var DeliveryOrderNo = $('#delvno' + k).val();
        var BillDiscount = $('#fcdisc').val();
        var AvgCost = $('#AvgCost' + k).val();
        var TotalCost = $('#TotalAvgCost').val();
        var SOSubId = $('#slordsubid' + k).val();
        var DOrdSubId = $('#delvsubid' + k).val();
        var FcBillDiscount = $('#disc').val();
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
        var CashAdvance = $('#CashAdvance').val();


        if (ProductCode != undefined) {

            oArray.push({

                'ProductId': ProductId,
                'ProductCode': ProductCode,
                'ProductDescr': ProductDescr,
                'BillSeriesId': BillSeriesId,
                'BillSlNo': BillSlNo,
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
                'EnquiryNo': EnquiryNo,
                'QuotationNo': QuotationNo,
                'OrderNo': OrderNo,
                'DeliveryOrderNo': DeliveryOrderNo,
                'BillDiscount': BillDiscount,
                'AvgCost': AvgCost,
                'TotalCost': TotalCost,
                'SOSubId': SOSubId,
                'DOrdSubId': DOrdSubId,
                'FcBillDiscount': FcBillDiscount,
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
                'CashAdvance': CashAdvance,
            })
        }

    }

    if (oArray != "") {
        var data = { 'SalesInvoiceModel': oArray };
        $.ajax(
    {

        type: "POST",
        url: "../SalesInvoice/SalesInsertandUpdate",
        data: data,
        success: function (result) {
            for (var i = 0; i < result.oList.length; i++) {
                var status = result.oList[i].Status;
                var billno = result.oList[i].BillSlNo;
                $('#savedbillno').val(billno);
                var billsrs = $('#txtBillseriesId').find("option:selected").text();
                $('#btnsubmit').prop('disabled', false);
                $('#confirmOk').prop("disabled", false);

                if (status != 0) {
                    Showalerts(status, billsrs, billno);
                    JsBarcode("#barcode1", $('#txtBillseriesId').val() + '-' + billno);
                }
                else {

                    $('#tblAlert tr').remove();
                    $('#alertpopup').show();
                    $('#alertdiv').show();
                    $('#alertdiv1').hide();
                    var Prod1 = "<tr class='jsgrid-row'><td colspan=4><h2 style='color:#FF586B'>Not enough quantity on hand!</h2></td></tr>" +
                      "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Location</th></tr>";
                    $('#tblAlert').append(Prod1);
                    $("#btnokalert").focus();
                    for (var i = 0; i <= result.oList.length; i++) {
                        var Prod =
                        "<tr class='jsgrid-row' style='color:#607D8B'>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ProductCode + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ProductDescr + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ProdQty + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].LocnName + "</td></tr>";
                        $('#tblAlert').append(Prod);
                    }

                }
            }
        }
    });
    }
}


//--------------------------------------------------------------------------------Temporary Sales Save-----------------------------------                                               
function TemporarySalessave() {

    // if ($('#txtCustId').val() != 0 && $('#txtCustId').val() != null) { 

    if ($('#tblsalesinvoice tr').length >= 1) {
        var oArray = new Array();
        for (var k = 1; k <= i; k++) {

            var ProductId = $('#PrdtId' + k).val();
            var ProductCode = $('#txtproduct' + k).val();
            var ProductDescr = $('#ProductDesc' + k).val();
            var BillSeriesId = $('#txtBillseriesId').val();
            var BillSlNo = $('#txtBillSlNo').val();
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
            var LocId = $('#select_locn').val();
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
            var EnquiryNo = $('#enqno' + k).val();
            var QuotationNo = $('#qutnnum' + k).val();
            var OrderNo = $('#slordeno' + k).val();
            var DeliveryOrderNo = $('#delvno' + k).val();
            var BillDiscount = $('#fcdisc').val();
            var AvgCost = $('#AvgCost' + k).val();
            var TotalCost = $('#TotalAvgCost').val();
            var SOSubId = $('#slordsubid' + k).val();
            var DOrdSubId = $('#delvsubid' + k).val();
            var FcBillDiscount = $('#disc').val();
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
            var CashAdvance = $('#CashAdvance').val();


            if (ProductCode != undefined) {

                oArray.push({

                    'ProductId': ProductId,
                    'ProductCode': ProductCode,
                    'ProductDescr': ProductDescr,
                    'BillSeriesId': BillSeriesId,
                    'BillSlNo': BillSlNo,
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
                    'EnquiryNo': EnquiryNo,
                    'QuotationNo': QuotationNo,
                    'OrderNo': OrderNo,
                    'DeliveryOrderNo': DeliveryOrderNo,
                    'BillDiscount': BillDiscount,
                    'AvgCost': AvgCost,
                    'TotalCost': TotalCost,
                    'SOSubId': SOSubId,
                    'DOrdSubId': DOrdSubId,
                    'FcBillDiscount': FcBillDiscount,
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
                    'CashAdvance': CashAdvance,
                })
            }

        }


        if (oArray != "") {
            var data = { 'SalesInvoiceModel': oArray };
            $.ajax(
        {

            type: "POST",
            url: "../SalesInvoice/TemporarySalesInsertandUpdate",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
            }
        });
        }
    }
    //}
}

var Fillitem = {};
function CheckPrevoiusItems() {

    // if ($('#txtCustId').val() != 0 ) {

    var data = {};
    data.CustId = $('#txtCustId').val();
    data.UserId = ERPUserId;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/PrevoiusUnsavedProductofCustomer",
        data: data,
        success: function (result) {


            if (result.length > 0) {
                Fillitem = result;
                $('#Confirmflag').val('loadprevdata'), $('#ConfirmRowId').val(0)
                $('#confirmmessage').text('Previous Data Available. Do you want to Load?')
                $('#confirm').show();
                $('#confirmOk').focus();
            }

        }
    });
    // }
}

function FillPrevoiusUnsavedProduct(result) {


    if (result.length > 0) {
        cleargridids();
        Tbldelete();
        TaxClear();
        i = 1;

        for (var n = 0; n < result.length; n++) {


            $('#txtcustomer').val(result[n].CustName);
            $('#txtCustId').val(result[n].CustId);
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(result[n].CurrencyRate);


            var rowcount = CountRows();
            //if (rowcount == 0) {
            //    i = 1;
            //}



            BillDiscountFlag = 0;
            var slno = rowcount + 1;
            var id = parseInt(n + 1);

            var Otherdescription = "";
            if (result[n].Otherdescription != undefined)
                Otherdescription = result[n].Otherdescription;

            var desc = result[n].ProductDescr;
            var j = 0, strLength = desc.length;
            for (j; j < strLength; j++) { desc = desc.replace(" ", "#%#"); }

            var code = result[n].ProductCode;
            var k = 0, strLength1 = code.length;
            for (k; k < strLength1; k++) { code = code.replace(" ", "#%#"); }

            var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + result[n].ProductId + ",'" + desc + "','" + code + "'," + 3 + ") onfocusout='updaterow(" + id + ")'  id=" + 'row' + id + " class='jsgrid-row'>" +
                      "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                      "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + " </td>" +
                      "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='display:none;height:30px' id=" + 'Otherdescription' + id + " value='" + Otherdescription + "'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "' data-toggle='tooltip' title='" + result[n].ProductCode + "'></td>" +
                      "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "' data-toggle='tooltip' title='" + result[n].ProductDescr + "'></td>" +
                      "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                      "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><select id=" + 'select_location' + id + " value=" + result[n].LocnId + " style='background-color:white;height:30px' class='form-control' onchange ='Locationqtycheckmain(" + id + ")'  onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                      "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' name='prdaddqty' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='checkqty(" + id + "),amountcalculation(" + id + ")' onkeydown=Focusnextgrid(event,'q'," + id + ") onkeypress=isNumberInt(event,this) onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt(result[n].stocktotloseqty) + " style='display:none'></td>" +
                      "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                      "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                      "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                      "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                      "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                      "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                      "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                      "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (result[n].AvgCost * result[n].ProdQty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat(result[n].AvgCost).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                      "</tr>";
            $('#tblsalesinvoice').append(ProdRow1);
            $('#select_unit' + id).val(result[n].UnitId);
            $('#select_tax' + id).val(result[n].TaxId);
            $('#select_location' + id).val(result[n].LocnId);

            TaxSplit(id);


            i++;

        }
        CalcGrandTotal(i);
        CalcDiscountSplitTax1();
        roundoffcalc();

        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        totalproducts();
    }
    Fillitem = '';
    $('#txtcustomer').focus();
    $('#txtcustomer').select();
    getcreditlimit();
}
//--------------------------------------------------------------------------------End Temporary Sales Save-----------------------------------       


//Search MultipleProduct While Buton Click and Live Search
function MultipleProductBind(st) {
    var grp = '', subgrp = '', cat = '', subcat = '', Condition = ''
    var GrpId = $('#hiddengrpno').val();
    var SubGrpId = $('#hiddensubgrpno').val();
    var CatId = $('#hiddencatno').val();
    var SubCatID = $('#hiddensubcatno').val();
    var Item = $('#hiddenitemcode').val();
    var Des = $("#searchItemCode").val();

    var LocId = $('#Location').val();
    var flag = 1;

    if ($('#SearchType').val() == 0) {                                       //ItemCode
        if (Item != '' && Item != 0) {
            Condition += ' Itemid= ' + Item;
        }
        if (Des != '') {

            if (Condition.length == 0) {//1 satart

                Condition += Des;
            }//1 end

        }
    }

    else if ($('#SearchType').val() == 1) {                                    //Model
        if (Item != '' && Item != 0) {
            Condition += ' Itemid= ' + Item;
        }
        if (Des != '') {

            if (Condition.length == 0)
            { Condition += ' Description like  ' + "'" + Des + "%' or ItemCode like  " + "'" + Des + "%'"; }
            else
            { Condition += ' and Description like  ' + "'" + Des + "%'" + ' or ItemCode like  ' + "'" + Des + "%'" }

        }
    }
    else if ($('#SearchType').val() == 2) { if (GrpId != '' && GrpId != 0) { Condition += ' GroupId= ' + GrpId } }                 //Group
    else if ($('#SearchType').val() == 3) { if (SubGrpId != '' && SubGrpId != 0) { Condition += ' SubGroupId= ' + SubGrpId; } }    //SubGroup
    else if ($('#SearchType').val() == 4) { if (CatId != '' && CatId != 0) { Condition += 'CategoryId=' + CatId; } }                //Category
    else if ($('#SearchType').val() == 5) { if (SubCatID != '' && SubCatID != 0) { Condition += 'SubCategoryId=' + SubCatID; } }  //SubCategory


    var delay = 2000;
    var data = {};
    data.LocId = $("#select_locn").val();
    data.DeptId = ERPDeptId;
    data.Condition = Condition;
    data.ProductMultiPriceId = ($("#PriceGroupId").val() || 0);

    $.ajax({
        type: "POST",
        url: "../SalesInvoice/ProductDetailsSearchSalesInvoice",
        beforeSend: function () {
            setTimeout(delay);
        },
        data: data,
        success: function (result) {
            ShowMultipleProductsList(result, st);
        }
    });
}


//Function Call to Load Stock Qty When Location Change in Product grid for Qty Checking
function Locationqtycheckmain(id) {
    $('#txtquantity' + id).val('');
    var data = {};
    data.ProductId = $('#PrdtId' + id).val();
    data.LocnId = $('#select_location' + id).val();
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/GetQuantitybyLocation",
        data: data,
        success: function (result) {
            qtyloadmain(result.oList, id);
        }
    });
}

//Load Stock Qty When Location Change in Product grid for Qty Checking
function qtyloadmain(result, id) {
    if (result.length == 'undefined')
        $('#txtstocktotloseqty' + id).val(0);
    else {
        $('#txtstocktotloseqty' + id).val(result[0].stocktotloseqty);

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

        if (col != 'bt' && col != 's' && col != 'g') {
            var desc = $("#ProductDesc" + Id).val();
            var j = 0, strLength = desc.length;
            for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

            var code = $("#txtproduct" + Id).val();
            var k = 0, strLength1 = code.length;
            for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

            GetPrdtId($("#PrdtId" + Id).val(), desc, code, 2);

            if (!$('#productpopupdiv').is(':visible'))
                GetproddetailsGrid(Id);
        }

        if (col == 'u' && Id == 0) {
            e.preventDefault();
            $('#txtquantity' + Id).focus();
            $('#txtquantity' + Id).select();
        }
        if (col == 'u' && Id != 0) {
            e.preventDefault();
            $('#select_location' + Id).focus();
        }
        else if (col == 'q') {
            e.preventDefault();
            $('#txtrate' + Id).focus();
            $('#txtrate' + Id).select();
        }
        else if (col == 'r') {
            e.preventDefault();
            $('#txtdiscount' + Id).focus();
            $('#txtdiscount' + Id).select();
        }
        else if (col == 'd') {
            e.preventDefault();
            $('#select_tax' + Id).focus();
        }
        else if (col == 't' && Id != 0) {
            e.preventDefault();
            $('#select_unit' + Id).focus();
        }
        else if (col == 't' && Id == 0) {
            e.preventDefault();
            $('#btnadd').focus();
            // $('#txtproduct0').select(); 
        }
        else if (col == 'l' && Id == 0) {
            e.preventDefault();
            $('#select_unit' + Id).focus();
        }
        else if (col == 'l' && Id != 0) {
            e.preventDefault();
            $('#txtquantity' + Id).focus();
            $('#txtquantity' + Id).select();
        }

        else if (col == 'p' && $('#txtproduct0').val() == '') {
            e.preventDefault();
            $('#select_location0').focus();
        }
        else if (col == 'g' && Id == 0) {
            e.preventDefault();
            $('#searchItemCode').focus();
            $('#searchItemCode').select();
        }
        else if (col == 'bt' && Id == 1) {
            e.preventDefault();
            $('#btnclearproduct').focus();
        }

        else if (col == 'b') {
            e.preventDefault();
            $('#txtproduct0').select();
            $('#txtproduct0').focus();
        }
    }
    else if (key == 37) {              // Left Arrow

        if (col != 'bt' && col != 's') {
            var desc = $("#ProductDesc" + Id).val();
            var j = 0, strLength = desc.length;
            for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

            var code = $("#txtproduct" + Id).val();
            var k = 0, strLength1 = code.length;
            for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

            GetPrdtId($("#PrdtId" + Id).val(), desc, code, 2);

            if (!$('#productpopupdiv').is(':visible'))
                GetproddetailsGrid(Id);
        }


        if (col == 'u' && Id == 0) {
            e.preventDefault();
            $('#select_location' + Id).focus();
        }
        else if (col == 'u' && Id != 0) {
            e.preventDefault();
            $('#select_tax' + Id).focus();
        }
        else if (col == 'q' && Id == 0) {
            e.preventDefault();
            $('#select_unit' + Id).focus();
        }
        else if (col == 'q' && Id != 0) {
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
            $('#select_unit' + Id).focus();
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
        else if (col == 's' && Id == 0 && $('#searchItemCode').val() == '') {
            e.preventDefault();
            $('#SearchType').focus();
        }
        else if (col == 'bt' && Id == 2) {
            e.preventDefault();
            $('#btnsearchproduct').focus();
        }
        else if (col == 'bt' && Id == 1) {
            e.preventDefault();
            $('#searchItemCode').focus();
        }
    }

    else if (key == 40 && Id != 0)          // Down Arrow
    {
        e.preventDefault();
        var Rid = Id;
        salestranspopuprefresh();
        try {

            Rid = ($('#row' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0];
            if (Rid) {
                // productpopuprefresh();

                GetproddetailsGrid(Rid);

                var desc = $("#ProductDesc" + Rid).val();
                var j = 0, strLength = desc.length;
                for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                var code = $("#txtproduct" + Rid).val();
                var k = 0, strLength1 = code.length;
                for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                GetPrdtId($("#PrdtId" + Rid).val(), desc, code, 2)
            }
        }
        catch (err) {
            hidepopup(1);
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
        var Rid = Id;
        salestranspopuprefresh();
        try {

            Rid = ($('#row' + Id).closest('tr').prev('tr').attr('id')).match(/\d+/)[0];
            if (Rid) {
                //  productpopuprefresh();

                GetproddetailsGrid(Rid);

                var desc = $("#ProductDesc" + Rid).val();
                var j = 0, strLength = desc.length;
                for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                var code = $("#txtproduct" + Rid).val();
                var k = 0, strLength1 = code.length;
                for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                GetPrdtId($("#PrdtId" + Rid).val(), desc, code, 2)
            }
        }
        catch (err) {
            hidepopup(1);
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
}

//Document Ready
$(document).ready(function () {


    deptload();

    // CheckPrevoiusItems();

    $("#btndept").focus(function (e) {
        $("#btndept").removeClass("btn btn-outline-primary");
        $("#btndept").addClass("btn btn-primary");
    });
    $("#btndept").focusout(function () {
        $("#btndept").removeClass("btn btn-primary");
        $("#btndept").addClass("btn btn-outline-primary");
    });


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

    $("#searchGroup,#searchSubGroup,#searchCat,#searchSubcat,#searchItemCode,#SearchType").focus(function (e) {
        Getproddetails(0);
        rowbgcolor(0);
        $('#pdthead').css("height", 60)
    });

    $("#btndue").focus(function (e) {
        $("#btndue").removeClass("btn btn-outline-primary");
        $("#btndue").addClass("btn btn-primary");
    });
    $("#btndue").focusout(function () {
        $("#btndue").removeClass("btn btn-primary");
        $("#btndue").addClass("btn btn-outline-primary");
    });

    $("#btnadd").focus(function (e) {
        $("#btnadd").removeClass("btn btn-outline-primary");
        $("#btnadd").addClass("btn btn-primary");
    });
    $("#btnadd").focusout(function () {
        $("#btnadd").removeClass("btn btn-primary");
        $("#btnadd").addClass("btn btn-outline-primary");
    });
    $("#btnaddbounce").focus(function (e) {
        $("#btnaddbounce").removeClass("btn btn-outline-primary");
        $("#btnaddbounce").addClass("btn btn-primary");
    });
    $("#btnaddbounce").focusout(function () {
        $("#btnaddbounce").removeClass("btn btn-primary");
        $("#btnaddbounce").addClass("btn btn-outline-primary");
    });

    $("#btnjobsave").focus(function (e) {
        $("#btnjobsave").removeClass("btn btn-outline-primary");
        $("#btnjobsave").addClass("btn btn-primary");
    });
    $("#btnjobsave").focusout(function (e) {
        $("#btnjobsave").removeClass("btn btn-primary");
        $("#btnjobsave").addClass("btn btn-outline-primary");
    });
    $("#btnokalert").focus(function (e) {
        $("#btnokalert").removeClass("btn btn-outline-primary");
        $("#btnokalert").addClass("btn btn-primary");
    });

    $("#btncustprnt").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncustprnt1").focus();
        }
    });

    $("#btncustprnt1").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btncustprnt").focus();
        }
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
    $("#btnotpsave").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnotpcancel").focus();
        }
    });
    $("#btncnclsave").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btndivdelete").focus();
        }
    });
    $("#btnotpcancel").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnotpsave").focus();
        }
    });
    $("#btndivdelete").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclsave").focus();
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

    $("#btncnclsave").focus(function (e) {
        $("#btncnclsave").removeClass("btn btn-outline-warning");
        $("#btncnclsave").addClass("btn btn-warning");
    });
    $("#btncnclsave").focusout(function (e) {
        $("#btncnclsave").removeClass("btn btn-warning");
        $("#btncnclsave").addClass("btn btn-outline-warning");
    });

    $("#btnotpcancel").focus(function (e) {
        $("#btnotpcancel").removeClass("btn btn-outline-secondary");
        $("#btnotpcancel").addClass("btn btn-secondary");
    });
    $("#btnotpcancel").focusout(function (e) {
        $("#btnotpcancel").removeClass("btn btn-secondary");
        $("#btnotpcancel").addClass("btn btn-outline-secondary");
    });

    $("#btndivdelete").focus(function (e) {
        $("#btndivdelete").removeClass("btn btn-outline-secondary");
        $("#btndivdelete").addClass("btn btn-secondary");
    });
    $("#btndivdelete").focusout(function (e) {
        $("#btndivdelete").removeClass("btn btn-secondary");
        $("#btndivdelete").addClass("btn btn-outline-secondary");

    });

    $("#btnok").focus(function (e) {
        $("#btnok").removeClass("btn btn-outline-primary");
        $("#btnok").addClass("btn btn-primary");
    });
    $("#btnok").focusout(function (e) {
        $("#btnok").removeClass("btn btn-primary");
        $("#btnok").addClass("btn btn-outline-primary");
    });
    $("#btncustomok").focus(function (e) {
        $("#btncustomok").removeClass("btn btn-outline-primary");
        $("#btncustomok").addClass("btn btn-primary");
    });
    $("#btncustomok").focusout(function (e) {
        $("#btncustomok").removeClass("btn btn-primary");
        $("#btncustomok").addClass("btn btn-outline-primary");
    });
    $("#btncnclalrt").focus(function (e) {
        $("#btncnclalrt").removeClass("btn btn-outline-primary");
        $("#btncnclalrt").addClass("btn btn-primary");
    });
    $("#btncnclalrt").focusout(function (e) {
        $("#btncnclalrt").removeClass("btn btn-primary");
        $("#btncnclalrt").addClass("btn btn-outline-primary");
    });

    $("#btnok").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclalrt").focus();
        }
    });
    $("#btncustomok").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclalrt").focus();
        }
        else if (key == 37) {
            $("#btnok").focus();
        }
    });

    $("#btncnclalrt").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnok").focus();
        }
    });


    //Print Button Click After Save Bill
    $('#btnok').click(function () {

        if (SalesBillType == 'MOBILE')
            PrintthisBillWindows('SALES', i, 'MAINMOBILE');
        else if (SalesBillType == 'LOCAL')
            PrintthisBillWindows('SALES', i, 'MAIN');
        else if (SalesBillType == 'ORYX')
            PrintthisBillWindows('SALES', i, 'MAINORYX');
        else if (SalesBillType == 'AUTOMOBILES')
            PrintthisBillWindows('SALES', i, 'MAINAUTOMOBILES');

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


    $('#btnclearproduct').click(function (e) {
        clearprodlist(1);
        Multipleproduct();

    });

    $('#btndelete').click(function (e) {                       //Bill Cancel Button

        if ($('#txtBillSlNocopy').val() == '') {
            warningshow('Press Enter Bill Number', 'txtBillSlNocopy');
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


    //Search function in Multiple Product Selection List  
    $('#btnsearchproduct').click(function (e) {
        if ($.trim($('#searchItemCode').val()) != '')
            MultipleProductBind(1);
        else
            warningshow('Please Enter Data to Search', 'searchItemCode');
    });
    LocnLoad(0);
    $('.form-control').attr('autocomplete', 'off');
    $('#btntrnsfr').css("height", '100%');
    $('#select_transfer').css("height", '100%');
    $('#btnlocn').css("height", '100%');
    $('#select_locn').css("height", '100%');
    $('#btnsales').css("height", '100%');
    $('#select_salesman').css("height", '100%');
    $('#btnsply').css("height", '100%');
    $('#select_place').css("height", '100%');
    $('#btnterms').css("height", '85%');
    $('#select_terms').css("height", '85%');
    $('#btncrncy').css("height", '100%');
    $('#select_crncy').css("height", '100%');

    crncyload(0);
    placeload(0);

    Salesman(0);


    BillLoad();
    Terms(0);
    TaxCall();
    autogroup();

    $("#btnsubmit").click(function (e) {
        savesales();
    });

    $("#tax_job").change(function () {
        var selectedValue = $(this).val();
        $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
        var x = $('#taxpercentage_job').val();
        CalcJobAmount();
    });

    $("#AutoType").change(function () {
        AutoMobileItemList();
    });


    $("#SearchType").change(function () {
        clearprodlist(0);
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
                if ($('#select_locn').val() == 0) {
                    warningshow('Press Enter Location', 'select_locn');
                    return false;
                }
                $('#txtquantity0').focus();
            }
            else if ($('#PrdtId0').val() == 0 && ($.trim($('#txtproduct0').val()) == 'job' || $.trim($('#txtproduct0').val()) == 'JOB')) {
                addpopupjob(1);
                hidepopup(1);
                clearrow(0);
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
                    GetproddetailsGrid(row);

                    var desc = $("#ProductDesc" + row).val();
                    var j = 0, strLength = desc.length;
                    for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                    var code = $("#txtproduct" + row).val();
                    var k = 0, strLength1 = code.length;
                    for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                    GetPrdtId($("#PrdtId" + row).val(), desc, code, 2);
                }
            }
            catch (err) {
            }

        }
        if (key == 13 && qtyflag == 1 && (Negativebill == 'NO') && ($("#select_locn").find("option:selected").attr("name") == 0)) {
            qtyflag == 1;
            warningshow('Not enough stock!', 'txtproduct0');
            $('#txtproduct0').select();
            return false;
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

    $('#promptdata').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#promptdata1").focus();
            $("#promptdata1").select();
        }
    });
    $('#promptdata1').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#promptOk").focus();
        }
    });
    $('#promptOk').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            e.preventDefault();
            $("#promptCancel").focus();
        }
    });
    $('#promptCancel').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            e.preventDefault();
            $("#promptOk").focus();
        }
    });
    $("#promptOk").focus(function (e) {
        $("#promptOk").removeClass("btn btn-outline-primary");
        $("#promptOk").addClass("btn btn-primary");
    });
    $("#promptOk").focusout(function () {
        $("#promptOk").removeClass("btn btn-primary");
        $("#promptOk").addClass("btn btn-outline-primary");
    });
    $("#promptCancel").focus(function (e) {
        $("#promptCancel").removeClass("btn btn-outline-secondary");
        $("#promptCancel").addClass("btn btn-secondary");
    });
    $("#promptCancel").focusout(function () {
        $("#promptCancel").removeClass("btn btn-secondary");
        $("#promptCancel").addClass("btn btn-outline-secondary");
    });

    $('#txt_code,#txt_cname,#txt_rate,#txtname,#txtcode,#txtdescription,#LocationName,#LocationCode,#code,#txt_fname,#txt_lname,#txt_amount,#txt_address1,#txt_address2,#txt_address3,#txtdesc,#artxtcode,#artxtname').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });

    $('#txt_remark,#txtdescription,#LocationDescription,#txt_contactnumber,#txtterms,#select_areagroup,#artxtdescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 2).focus();
        }

    });



    $("#txtBillseriesId").change(function () {
        //  $('#tour1').hide();
        Tbldelete();
        copyrefresh();
        var selectedValue = $(this).val();
        $("#txtBillSlNo").val($(this).find("option:selected").attr("name"))
        $("#txtBillSlNocopy").val($(this).find("option:selected").attr("name"))
        $('#txtBlSlNo').val($(this).find("option:selected").attr("name"));
        $('#txtBillseriesId').focus();
        if (copyflag == 1) {
            $('#txtBillSlNocopy').focus();
            $('#txtBillSlNocopy').select();
        }

    });



    $('#select_payterms').val(1);

    loadcust();


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
            $('#txtlpono').focus();
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
        $("#txtcrncyrate").val($(this).find("option:selected").attr("name"))
        for (j = 0; j <= i; j++) {
            amountcalculation(j);
        }

        $('#disc').val('0.00');
        $('#Discountpercent').val('');
        CalcGrandTotal(i);
        CalcDiscountSplitTax1();
        roundoffcalc();
    });

    $("#select_unit0").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit").val($(this).find("option:selected").attr("name"))
        //$('#txtquantity0').focus();
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
        $('#txtquantity0').val('');
        var data = {};                                    //Function Call to Load Stock Qty When Location Change during product add
        data.ProductId = $('#PrdtId0').val();
        data.LocnId = $('#select_locn').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/GetQuantitybyLocation",
            data: data,
            success: function (result) {
                checkqtyload(result.oList);
            }
        });

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
            $('#select_crncy').focus();
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
            $('#select_unit0').focus();
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
            if (!$('#duecheckdiv').is(':visible'))
                $('#txtproduct0').focus();
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
        // $('#tour1').fadeOut();
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
        $('#select_locn,#locn_job').val($('#select_location0').val());
        $('#txtquantity0').val('');
        var data = {};                                    //Function Call to Load Stock Qty When Location Change during product add
        data.ProductId = $('#PrdtId0').val();
        data.LocnId = $('#select_location0').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/GetQuantitybyLocation",
            data: data,
            success: function (result) {
                checkqtyload(result.oList);
            }
        });
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


    if (getQueryString('slno') != null) {
        var data = {};
        data.BillSlNo = getQueryString('slno');
        data.BillSeriesId = getQueryString('billseries');;
        data.DeptId = getQueryString('dept');
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesGetandGets",
            data: data,
            success: function (result) {
                SalesGets(result.oList);
                $('.form-control').prop('disabled', true);
                $('.jsgrid-button').prop('disabled', true);
                $('#txtBillSlNo').val(data.BillSlNo)
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


    // ----------------------------------------------------------------------------------------------------------Enquiry-----------------------
    //View Button Click to view product details against an enquiry
    $("#btnview").click(function (e) {
        GetenqProduct();
    });
    //Button Click to add selected product details to grid from popup table(Enquiry table data)
    $("#btnprdtadd").click(function (e) {

        var row = $('#RowGet1').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        TaxClear();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('CheckItemen');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
            }
            else {

                if ($("#SlNoCheckItem" + m).is(":checked")) {
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
                    var enqno = $('#enqnoRow' + m).text();
                    if (Location != 0 || Location != '')
                        $('#select_locn').val(Location);
                    else
                        $('#select_locn').val(UserLocationId);
                    $('#EnquiryNo').val(enqno)
                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }

                    BillDiscountFlag = 0;
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var desc = ProductDescr;
                    var j = 0, strLength = desc.length;
                    for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                    var code = Productcode;
                    var k = 0, strLength1 = code.length;
                    for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                    var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'enqno' + id + " style='display:none' value='" + enqno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "' data-toggle='tooltip' title='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "' data-toggle='tooltip' title='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select  id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'  onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select  id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text'  class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'  onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (avgcst * qty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + avgcst + " style='background-color:white;height:30px'></td>" +
                        "</tr>";
                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    amountcalculation(id);

                    if (Location != 0 || Location != '')
                        $('#select_location' + id).val(Location);
                    else
                        $('#select_location' + id).val(UserLocationId);
                    TaxSplit(id);
                    // productpopuprefresh();
                    hidepopup(1);
                    CalcGrandTotal(i);
                    fccalculation(i);


                    if (parseFloat($('#txtdiscount' + id).val()) > 0) {
                        $('#disc').prop("disabled", true);
                        $('#disc').val('0.00');
                        $('#Discountpercent').val('');
                        BillDiscountFlag = 1;
                    }
                    i++;
                }
                // i = parseInt(row) + 1;
                CloseEnquiry();
                $('#txtproduct0').focus();
                CalcDiscountSplitTax1();
                roundoffcalc();
                totalproducts();
            }
        }

        Location = '';
    });

    //Clear Enquiry Search details when CustId==0  (for Whole Enquiry List)
    $('#btnclear').click(function (e) {
        clear();
    });

    //Search function for Customr Enquiry when CustId==0 (for Whole Enquiry List)
    $('#btnsearch').click(function (e) {
        disable_datatable('tblEnquiry');
        if ($('#hiddencustIdenq').val() == 0 && $('#SearchFromdateenq').val() == '' && $('#SearchToDateenq').val() == '') {

        }
        else {
            var data = {};
            data.CustId = $('#hiddencustIdenq').val();
            data.FromDate = $('#SearchFromdateenq').val();
            data.ToDate = $('#SearchToDateenq').val();
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/CustomerSearchPopuPEnqSales",
                data: data,
                success: function (result) {
                    if (result.oList.length == 0) {
                        $('#tblEnquiry').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                    }
                    else {
                        EnquiryLoad(result.oList);
                    }
                },
            });
        }
    });

    //Clear Enquiry Search details when CustId!=0   (for Selected Customer List)
    $('#btnclear1').click(function (e) {
        clear1();
    });

    //Search function for Customr Enquiry            (for Selected Customer List)
    $('#btnsearch1').click(function (e) {
        disable_datatable('tblEnquirycust');
        if ($('#SearchFromdateenq1').val() == '' && $('#SearchToDateenq1').val() == '') {

        }
        else {
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = $('#SearchFromdateenq1').val();
            data.ToDate = $('#SearchToDateenq1').val();
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/CustomerSearchPopuPEnqSales",
                data: data,
                success: function (result) {
                    if (result.oList.length == 0) {
                        $('#tblEnquirycust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                    }
                    else {
                        EnquiryLoadCust(result.oList);
                    }
                },
            });
        }
    });

    //Clear Enquiry Search details when CustId!=0   (for Get Product List)
    $('#btnclear2').click(function (e) {
        clear2();
    });

    //Search function for Customr Enquiry            (for Get Product List)
    $('#btnsearch2').click(function (e) {
        if ($('#SearchProdenq').val() == '') {
        }
        else {
            disable_datatable('tblEnquirypsub');
            var data = {};
            data.EnquiryNum = $("#enqnosearch").val();
            data.ProductId = $("#hiddenProdIdenq").val();
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SearchCustomerEnquiryProductsInSales",
                data: data,
                success: function (result) {
                    if (result.oList.length == 0) {
                        $('#tblEnquirypsub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                    }
                    else {
                        ShowItemGet(result.oList);
                    }
                }
            });
        }
    });

    // ---------------------------------------------------------------------------------------------------------End Enquiry----------------------

    // ------------------------------------------------------------------------------------------------------------Quotation--------------------

    //View Button Click to view product details against a Quotation
    $("#btnview1").click(function (e) {
        var QtnNo = '';
        var qtnmainid = 0;
        var CurncyId = '';
        var row = $('#RowGet3').val();
        var fl = 0;

        var checkboxes = document.getElementsByName('Checkcust');
        for (var k = 0, j = checkboxes.length; k < j; k++) {
            if (checkboxes[k].checked == true) {
                fl++;
            }
        }
        if (fl == 0) {
            warningshow('Select One Quotation Number');
        }
        else {
            for (var n = 1; n <= row; n++) {
                if ($("#SlNoHdCheckCust" + n).is(":checked")) {
                    CurncyId = $('#CurncyId' + n).text();
                    break;
                }
            }
            for (var m = 1; m <= row; m++) {
                if ($("#SlNoHdCheckCust" + m).is(":checked")) {
                    if (($('#CurncyId' + m).text() != CurncyId)) {
                        warningshow('Please Select Quotation with Same Curency!');
                        return false;
                    }
                    else {
                        if (QtnNo == '') {
                            QtnNo += $('#Qtncol' + m).text();
                        }
                        else {
                            QtnNo += ',' + $('#Qtncol' + m).text();
                        }
                    }
                }
            }
            var data = {};
            qtno = QtnNo;
            data.QtnNo = QtnNo;
            data.ProductId = 0;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/QuotationEntryGetProducts",
                data: data,
                success: function (result) {
                    if (QtnNo != 0)
                        ShowItemGetQtn(result.oList);
                }
            });
        }


    });


    //Button Click to add selected product details to grid from popup table (quotation table data)
    $("#btnprdtadd1").click(function (e) {

        var row = $('#RowGet3').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        TaxClear();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('CheckQtnItem');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
            }
            else {

                if ($("#SlNoCheckQtnItem" + m).is(":checked")) {
                    var ProductId = $('#ItemId' + m).val();
                    var Productcode = $('#Productcode' + m).text();
                    var ProductDescr = $('#Des' + m).text();
                    var unitIdgrid = $('#UnitIdgrid' + m).val();
                    var qty = parseInt($('#qty_' + m).val() || 0);
                    var avgcst = parseFloat($('#avg_' + m).val() || 0).toFixed(Decimal);
                    var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
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
                    var qtnno = $('#qtnnoRow' + m).text();

                    $('#QuotationNo').val(qtnno);
                    if (Location1 != 0 || Location1 != '')
                        $('#select_locn').val(Location1);
                    else
                        $('#select_locn').val(UserLocationId);
                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }

                    BillDiscountFlag = 0;
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var desc = ProductDescr;
                    var j = 0, strLength = desc.length;
                    for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                    var code = Productcode;
                    var k = 0, strLength1 = code.length;
                    for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                    var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'qutnnum' + id + " style='display:none' value='" + qtnno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "' data-toggle='tooltip' title='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "' data-toggle='tooltip' title='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select  id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text'  id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (avgcst * qty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + avgcst + " style='background-color:white;height:30px'></td>" +
                        "</tr>";

                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    amountcalculation(id);
                    if (Location1 != 0 || Location1 != '')
                        $('#select_location' + id).val(Location1);
                    else
                        $('#select_location' + id).val(UserLocationId);

                    TaxSplit(id);
                    // productpopuprefresh();
                    hidepopup(1);
                    CalcGrandTotal(i);

                    fccalculation(i);


                    if (parseFloat($('#txtdiscount' + id).val()) > 0) {
                        $('#disc').prop("disabled", true);
                        $('#disc').val('0.00');
                        $('#Discountpercent').val('');
                        BillDiscountFlag = 1;
                    }
                    i++;
                }
                //i = parseInt(row) + 1;
                CloseEnquiry();
                $('#txtproduct0').focus();
                CalcDiscountSplitTax1();
                roundoffcalc();
                totalproducts();
            }
        }

        Location1 = '';
    });
    // ------------------------------------------------------------------------------------------------------End Quotation-----------------------

    // ------------------------------------------------------------------------------------------------------------Sales Order--------------------

    //View Button Click to view product details against an Order
    $("#btnview2").click(function (e) {
        var OrdNo = '';
        var CurncyId = '';
        var row = $('#RowGet4').val();
        var fl = 0;

        var checkboxes = document.getElementsByName('Checkcust');
        for (var k = 0, j = checkboxes.length; k < j; k++) {
            if (checkboxes[k].checked == true) {
                fl++;
            }
        }
        if (fl == 0) {
            warningshow('Select Order Number');
        }
        else {
            for (var n = 1; n <= row; n++) {
                if ($("#SlNoHdCheckCust" + n).is(":checked")) {
                    CurncyId = $('#CurncyId' + n).text();
                    break;
                }
            }
            for (var m = 1; m <= row; m++) {
                if ($("#SlNoHdCheckCust" + m).is(":checked")) {
                    if (($('#CurncyId' + m).text() != CurncyId)) {
                        warningshow('Please Select Sales Order with Same Curency!');
                        return false;
                    }
                    else {
                        if (OrdNo == '') {
                            OrdNo += $('#SalesOrdercol' + m).text();
                        }
                        else {
                            OrdNo += ',' + $('#SalesOrdercol' + m).text();
                        }
                    }
                }
            }
            var data = {};

            sono = OrdNo;
            data.OrdNo = OrdNo;
            data.ProductId = 0;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesOrderGetProductsSalesInv",
                data: data,
                success: function (result) {
                    if (OrdNo != 0)
                        ShowItemGetSalesOrder(result.oList);
                }
            });
        }

    });


    //Button Click to add selected product details to grid from popup table (SalesOrder table data)
    $("#btnprdtadd2").click(function (e) {

        var row = $('#RowGet6').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        TaxClear();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('CheckSordItem');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
            }
            else {

                if ($("#SlNoCheckSoItem" + m).is(":checked")) {
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
                    var ordersubid = $('#ordersubidrow' + m).text();
                    var Locnid = $('#LocnId' + m).val();

                    $('#OrderNo').val(orderno);
                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }

                    BillDiscountFlag = 0;
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var desc = ProductDescr;
                    var j = 0, strLength = desc.length;
                    for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                    var code = Productcode;
                    var k = 0, strLength1 = code.length;
                    for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                    var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'slordsubid' + id + " style='display:none' value='" + ordersubid + "' /><input type='text' id=" + 'slordeno' + id + " style='display:none' value='" + orderno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "' data-toggle='tooltip' title='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "' data-toggle='tooltip' title='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'  onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text'  id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px'  id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'  onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (avgcst * qty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + avgcst + " style='background-color:white;height:30px'></td>" +
                        "</tr>";

                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    $('#select_location' + id).val(Locnid);
                    amountcalculation(id);
                    TaxSplit(id);
                    // productpopuprefresh();
                    hidepopup(1);
                    CalcGrandTotal(i);
                    fccalculation(i);


                    if (parseFloat($('#txtdiscount' + id).val()) > 0) {
                        $('#disc').prop("disabled", true);
                        $('#disc').val('0.00');
                        $('#Discountpercent').val('');
                        BillDiscountFlag = 1;
                    }
                    i++;
                }
                CloseEnquiry();
                $('#txtproduct0').focus();
                CalcDiscountSplitTax1();
                roundoffcalc();
                totalproducts();
            }
        }

    });
    // ------------------------------------------------------------------------------------------------------End Sales Order-----------------------

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
        for (var k = 0, j = checkboxes.length; k < j; k++) {
            if (checkboxes[k].checked == true) {
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
            }
            sino = Billsln;
            sisno = Billsr;
            var data = {};
            data.BlSlNo = Billsln;
            data.BlSeriesId = Billsr;
            data.ProductId = 0;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceGetProducts",
                data: data,
                success: function (result) {
                    if (Billsr != 0)
                        ShowItemGetSalesInvoice(result.oList);
                }
            });
        }

    });


    //Button Click to add selected product details to grid from popup table (SalesInvoice table data)
    $("#btnprdtadd3").click(function (e) {

        var row = $('#RowGet9').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        TaxClear();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('CheckSInvItem');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
            }
            else {

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

                    $('#txtSalesNo').val(srlno);
                    $('#txtSalesSrlNo').val(srsno);

                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }

                    BillDiscountFlag = 0;
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var desc = ProductDescr;
                    var j = 0, strLength = desc.length;
                    for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                    var code = Productcode;
                    var k = 0, strLength1 = code.length;
                    for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                    var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'bilsers' + id + " style='display:none' value='" + srsno + "' /><input type='text' id=" + 'bilnum' + id + " style='display:none' value='" + srlno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "' data-toggle='tooltip' title='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "' data-toggle='tooltip' title='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text'  class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (avgcst * qty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + avgcst + " style='background-color:white;height:30px'></td>" +
                        "</tr>";

                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    $('#select_location' + id).val(Locnid);
                    amountcalculation(id);
                    TaxSplit(id);
                    //    productpopuprefresh();
                    hidepopup(1);
                    CalcGrandTotal(i);
                    fccalculation(i);



                    if (parseFloat($('#txtdiscount' + id).val()) > 0) {
                        $('#disc').prop("disabled", true);
                        $('#disc').val('0.00');
                        $('#Discountpercent').val('');
                        BillDiscountFlag = 1;
                    }
                    i++;
                }
                CloseEnquiry();
                $('#txtproduct0').focus();
                CalcDiscountSplitTax1();
                roundoffcalc();
                totalproducts();
            }
        }

    });
    // ------------------------------------------------------------------------------------------------------End Sales Invoice-----------------------

    // ------------------------------------------------------------------------------------------------------------Delivery Order--------------------

    //View Button Click to view product details against a Delivery Order
    $("#btnview4").click(function (e) {
        var DOrdNo = '';
        var CurncyId = '';
        var row = $('#RowGet10').val();
        var fl = 0;

        var checkboxes = document.getElementsByName('Checkcust');
        for (var k = 0, j = checkboxes.length; k < j; k++) {
            if (checkboxes[k].checked == true) {
                fl++;
            }
        }
        if (fl == 0) {
            warningshow('Select Order Number');
        }
        else {
            for (var n = 1; n <= row; n++) {
                if ($("#SlNoHdCheckCust" + n).is(":checked")) {
                    CurncyId = $('#CurncyId' + n).text();
                    break;
                }
            }

            for (var m = 1; m <= row; m++) {
                if ($("#SlNoHdCheckCust" + m).is(":checked")) {
                    if ($('#CurncyId' + m).text() != CurncyId) {
                        warningshow('Please Select Sales Order with Same Curency!');
                        return false;
                    }
                    else {
                        if (DOrdNo == '') {
                            DOrdNo += $('#Deliverycol' + m).text();
                        }
                        else {
                            DOrdNo += ',' + $('#Deliverycol' + m).text();

                        }
                    }
                }
            }
            var data = {};
            data.DeliveryOrdNo = DOrdNo;
            data.ProductId = 0;
            data.DeptId = ERPDeptId;
            dono = DOrdNo;

            $.ajax({
                type: "POST",
                url: "../SalesInvoice/DeliveryOrderGetProductsSalesInv",
                data: data,
                success: function (result) {
                    if (DOrdNo != 0)
                        ShowItemGetDeliveryOrder(result.oList);
                }
            });
        }
    });


    //Button Click to add selected product details to grid from popup table (Delivery Order table data)
    $("#btnprdtadd4").click(function (e) {

        var row = $('#RowGet12').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        TaxClear();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('CheckDelordItem');
            for (var k = 0, j = checkboxes.length; k < j; k++) {
                if (checkboxes[k].checked == true) {
                    flg++;
                }
            }
            if (flg == 0) {
                warningshow('Select Product');
            }
            else {

                if ($("#SlNoCheckSoItem" + m).is(":checked")) {
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
                    var ordersubid = $('#delvordsubid' + m).text();
                    var Locnid = $('#LocnId' + m).val();

                    $('#DeliveryOrderNO').val(orderno);
                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }

                    BillDiscountFlag = 0;
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var desc = ProductDescr;
                    var j = 0, strLength = desc.length;
                    for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                    var code = Productcode;
                    var k = 0, strLength1 = code.length;
                    for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                    var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'delvsubid' + id + " style='display:none' value='" + ordersubid + "' /><input type='text' id=" + 'delvno' + id + " style='display:none' value='" + orderno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "' data-toggle='tooltip' title='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "' data-toggle='tooltip' title='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select  id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select  id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text'  class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text'  id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px'  id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (avgcst * qty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + avgcst + " style='background-color:white;height:30px'></td>" +
                        "</tr>";

                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    $('#select_location' + id).val(Locnid);
                    amountcalculation(id);
                    TaxSplit(id);
                    //   productpopuprefresh();
                    hidepopup(1);
                    CalcGrandTotal(i);
                    fccalculation(i);


                    if (parseFloat($('#txtdiscount' + id).val()) > 0) {
                        $('#disc').prop("disabled", true);
                        $('#disc').val('0.00');
                        $('#Discountpercent').val('');
                        BillDiscountFlag = 1;
                    }
                    i++;
                }
                //  i = parseInt(row) + 1;
                CloseEnquiry();
                $('#txtproduct0').focus();
                CalcDiscountSplitTax1();
                roundoffcalc();
                totalproducts();
            }
        }

    });
    // ------------------------------------------------------------------------------------------------------End Delivery Order-----------------------



});



//Main Function For Transfer dropdown
function Transfer() {
    disabletables();
    closewarningdesc();
    if ($('#select_transfer').val() == 1)      //Quotation
    {
        Enquirypopupwindow(3);
    }
    else if ($('#select_transfer').val() == 2)      // Sales Order 
    {
        Enquirypopupwindow(2);
    }
    else if ($('#select_transfer').val() == 3)       //Enquiry 
    {
        Enquirypopupwindow(1);
    }
    else if ($('#select_transfer').val() == 4)       //Recall Old
    {
        Enquirypopupwindow(4);
    }
    else if ($('#select_transfer').val() == 5)       //DeliveryOrder
    {
        Enquirypopupwindow(5);
    }
}

//Show Enquiry PopUp and Display Enquiry List 
function Enquirypopupwindow(id) {
    disabletables();
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
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    $('#DeliveryOrderdiv').hide();
    $('#DeliveryOrderdivcust').hide();
    $('#DeliveryOrderdivsub').hide();
    if (id == 1)                                                           //List Customer Enquiry Details in pop up
    {
        if ($('#txtCustId').val() == 0)      //If CustId==0 Get all Enquiry Details
        {
            EnqLoadCall();
        }
        else                              //If CustId!=0 Get Enquiry Details against That Customer
        {
            EnqCustLoadCall();
        }

    }

    else if (id == 2)                                                      //List SalesOrder Details in pop up
    {
        if ($('#txtCustId').val() == 0)              //If CustId==0 Get all SalesOrder Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Sales Order Details');
            $('#SalesOrderdiv').show();
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdivcust').hide();
            $('#SalesOrderdivsub').hide();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            $('#DeliveryOrderdiv').hide();
            $('#DeliveryOrderdivcust').hide();
            $('#DeliveryOrderdivsub').hide();
            var data = {};
            data.CustId = 0;
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesOrderRecallSalesInv",
                data: data,
                success: function (result) {
                    $('#tblSalesOrder tr').remove();
                    SalesOrderLoad(result.oList);
                }
            });
        }
        else                                         //If CustId!=0 Get SalesOrder Details against That Customer                     
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Sales Order Details');
            $('#SalesOrderdivcust').show();
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdiv').hide();
            $('#SalesOrderdivsub').hide();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            $('#DeliveryOrderdiv').hide();
            $('#DeliveryOrderdivcust').hide();
            $('#DeliveryOrderdivsub').hide();
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesOrderRecallSalesInv",
                data: data,
                success: function (result) {
                    $('#tblSalesOrdercust tr').remove();
                    SalesOrderCustLoad(result.oList);
                }
            });
        }
    }

    else if (id == 3)                                                      //List All Quotation Entry Details in pop up 
    {
        if ($('#txtCustId').val() == 0)            //If CustId==0 Get all Quotation Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Quotation Entry Details');
            $('#Qtndiv').show();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdiv').hide();
            $('#SalesOrderdivcust').hide();
            $('#SalesOrderdivsub').hide();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            $('#DeliveryOrderdiv').hide();
            $('#DeliveryOrderdivcust').hide();
            $('#DeliveryOrderdivsub').hide();
            var data = {};
            data.QuotationNo = 0;
            data.CustId = 0;
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/QuotationEntryRecall",
                data: data,
                success: function (result) {
                    $('#tblQtn tr').remove();
                    QuotationLoad(result.oList);
                }
            });
        }
        else                                //If CustId!=0 Get Quotation Details against That Customer                     
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Quotation Entry Details');
            $('#Qtndivcust').show();
            $('#Qtndiv').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdiv').hide();
            $('#SalesOrderdivcust').hide();
            $('#SalesOrderdivsub').hide();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            $('#DeliveryOrderdiv').hide();
            $('#DeliveryOrderdivcust').hide();
            $('#DeliveryOrderdivsub').hide();
            var data = {};
            data.QuotationNo = 0;
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/QuotationEntryRecall",
                data: data,
                success: function (result) {
                    $('#tblQtncust tr').remove();
                    QuotationCustLoad(result.oList);

                }
            });
        }
    }

    else if (id == 4)                                                      //List All Sales Invoice Details in pop up (Recall)
    {
        if ($('#txtCustId').val() == 0)            //If CustId==0 Get all Sales Invoice Details
        {
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
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecall",
                data: data,
                success: function (result) {
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
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesInvoiceRecall",
                data: data,
                success: function (result) {
                    $('#tblSalesInvcust tr').remove();
                    SalesInvoiceCustLoad(result.oList);
                }
            });
        }
    }
    else if (id == 5)                                                      //List DeliveryOrder Details in pop up
    {
        if ($('#txtCustId').val() == 0)              //If CustId==0 Get all DeliveryOrder Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Delivery Order Details');
            $('#SalesOrderdiv').hide();
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdivcust').hide();
            $('#SalesOrderdivsub').hide();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            $('#DeliveryOrderdivcust').hide();
            $('#DeliveryOrderdivsub').hide();
            $('#DeliveryOrderdiv').show();
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/DeliveryOrderRecallSalesInv",
                data: data,
                success: function (result) {
                    $('#tblDeliveryOrder tr').remove();
                    DeliveryOrderLoad(result.oList);
                }
            });
        }
        else                                         //If CustId!=0 Get DeliveryOrder Details against That Customer                     
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Delivery Order Details');
            $('#SalesOrderdivcust').hide();
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            $('#SalesOrderdiv').hide();
            $('#SalesOrderdivsub').hide();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#SalesInvdiv').hide();
            $('#SalesInvdivcust').hide();
            $('#SalesInvdivsub').hide();
            $('#DeliveryOrderdiv').hide();
            $('#DeliveryOrderdivcust').show();
            $('#DeliveryOrderdivsub').hide();
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/DeliveryOrderRecallSalesInv",
                data: data,
                success: function (result) {
                    $('#tblDeliveryOrdercust tr').remove();
                    DeliveryOrderCustLoad(result.oList);
                }
            });
        }
    }
}


//---------------------------------------------------------------------------------------------Close Enquiry&Quotation--------------------------

//Close Enquiry PopUP
function CloseEnquiry() {
    if ($('#Enquirypopup').is(':visible'))
        cleargridids();
    disabletables();
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
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    $('#Enquirypopup').hide();
    $('#Qtndiv').hide();
    $('#DeliveryOrderdiv').hide();
    $('#DeliveryOrderdivcust').hide();
    $('#DeliveryOrderdivsub').hide();
    $('#RowGet1').val(0);
    $('#RowGet').val(0);
    $('#RowGet2').val(0);
    $('#RowGet4').val(0);
    $('#RowGet5').val(0);
    $('#RowGet6').val(0);
    $('#RowGet7').val(0);
    $('#RowGet8').val(0);
    $('#RowGet9').val(0);
    $('#RowGet10').val(0);
    $('#RowGet11').val(0);
    $('#RowGet12').val(0);
    $('#Warningpopup').fadeOut();
    qtno = ''; sono = ''; sino = ''; sisno = ''; dono = '';
    //  removetblrow();
    $('#SearchCustenq').val('');
    $('#hiddencustIdenq').val('');
    $('#SearchFromdateenq').val('');
    $('#SearchToDateenq').val('');
    $('#SearchFromdateenq1').val(CurDate);
    $('#SearchToDateenq1').val(CurDate);
    $('#SearchProdenq').val('');
    $("#enqnosearch").val('');

    $('#SearchCustqtn').val('');
    $('#hiddencustIdqtn').val(0);
    $('#SearchFromdateqtn').val(CurDate);
    $('#SearchToDateqtn').val(CurDate);

    $('#SearchFromdateqtn1').val(CurDate);
    $('#SearchToDateqtn1').val(CurDate);

    $('#SearchProdqtn').val('')
    $('#hiddenProdIdqtn').val('');


    $('#SearchCustsi').val('')
    $('#hiddencustIdsi').val(0);
    $('#SearchFromdatesi').val(CurDate);
    $('#SearchToDatesi').val(CurDate);

    $('#SearchFromdatesi1').val(CurDate);
    $('#SearchToDatesi1').val(CurDate);

    $('#SearchProdsi').val('')
    $('#hiddenProdIdsi').val('');

    $('#SearchCustdo').val('')
    $('#hiddencustIddo').val(0);
    $('#SearchFromdatedo').val(CurDate);
    $('#SearchToDatedo').val(CurDate);

    $('#SearchFromdatedo1').val(CurDate);
    $('#SearchToDatedo1').val(CurDate);
    $('#SearchProddo').val('')
    $('#hiddenProdIddo').val('');

    $('#SearchCustso').val('')
    $('#hiddencustIdso').val(0);
    $('#SearchFromdateso').val(CurDate);
    $('#SearchToDateso').val(CurDate);

    $('#SearchFromdateso1').val(CurDate);
    $('#SearchToDateso1').val(CurDate);
    $('#SearchProdso').val('')
    $('#hiddenProdIdso').val('');

    if (($('#txtcrncyrate').val() == 1 || $('#GrandTotal').val() <= 0)) {
        $("#fc").css("opacity", '0');
    }
    else {
        $("#fc").css("opacity", '100');
    }
}

//Remove Rows of All The Tables In the Popup
function removetblrow() {
    $('#tblEnquiry tr').remove();
    $('#tblEnquirycust tr').remove();
    $('#tblEnquirypsub tr').remove();
    $('#tblQtn tr').remove();
    $('#tblQtncust tr').remove();
    $('#tblQtnsub tr').remove();
    $('#tblSalesOrder tr').remove();
    $('#tblSalesOrdercust tr').remove();
    $('#tblSalesOrdersub tr').remove();
    $('#tblSalesInv tr').remove();
    $('#tblSalesInvcust tr').remove();
    $('#tblSalesInvsub tr').remove();
    $('#tblDeliveryOrder tr').remove();
    $('#tblDeliveryOrdercust tr').remove();
    $('#tblDeliveryOrdersub tr').remove();
}

//Clear Id's in Search
function emptyId(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddenProdIdsi').val(0);

        $('#hiddenProdIdso').val(0);

        $('#hiddenProdIddo').val(0);

        $('#hiddenProdIdqtn').val(0);

        $('#hiddencustIdqtn').val(0);

        $('#hiddencustIdsi').val(0);

        $('#hiddencustIdso').val(0);

        $('#hiddencustIddo').val(0);
    }
}

//Back Button for Transfer Popup
function Back(id) {
    if (id == 1) {
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').show();
    }
    else if (id == 2) {
        $('#Qtndiv').hide();
        $('#Qtndivcust').show();
        $('#Qtndivsub').hide();
        $('#SearchCustqtn').val('');
        $('#hiddencustIdqtn').val(0);
        $('#SearchFromdateqtn').val(CurDate);
        $('#SearchToDateqtn').val(CurDate);

        $('#SearchFromdateqtn1').val(CurDate);
        $('#SearchToDateqtn1').val(CurDate);

        $('#SearchProdqtn').val('')
        $('#hiddenProdIdqtn').val('');
    }
    else if (id == 3) {
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').show();
        $('#SalesOrderdivsub').hide();
        $('#SearchCustso').val('')
        $('#hiddencustIdso').val(0);
        $('#SearchFromdateso').val(CurDate);
        $('#SearchToDateso').val(CurDate);

        $('#SearchFromdateso1').val(CurDate);
        $('#SearchToDateso1').val(CurDate);
        $('#SearchProdso').val('')
        $('#hiddenProdIdso').val('');
    }
    else if (id == 4) {
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
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').show();
        $('#DeliveryOrderdivsub').hide();
        $('#SearchCustdo').val('')
        $('#hiddencustIddo').val(0);
        $('#SearchFromdatedo').val(CurDate);
        $('#SearchToDatedo').val(CurDate);

        $('#SearchFromdatedo1').val(CurDate);
        $('#SearchToDatedo1').val(CurDate);
        $('#SearchProddo').val('')
        $('#hiddenProdIddo').val('');
    }
}

//Disable all tables
function disabletables() {
    disable_datatable('tblEnquiry');
    disable_datatable('tblEnquirycust');
    disable_datatable('tblEnquirypsub');

    disable_datatable('tblQtn');
    disable_datatable('tblQtncust');
    disable_datatable('tblQtnsub');

    disable_datatable('tblSalesOrder');
    disable_datatable('tblSalesOrdercust');
    disable_datatable('tblSalesOrdersub');

    disable_datatable('tblSalesInv');
    disable_datatable('tblSalesInvcust');
    disable_datatable('tblSalesInvsub');

    disable_datatable('tblDeliveryOrder');
    disable_datatable('tblDeliveryOrdercust');
    disable_datatable('tblDeliveryOrdersub');
}

//---------------------------------------------------------------------------------------------End---------------------------------------------

//----------------------------------------------------------------------------------------------Enquiry---------------------------------------------

//Function Call To Load Enquiry Details When CustId=0
function EnqLoadCall() {
    $("#Enquirypopup").css("margin-top", '-100px');
    $('#Enquirypopup').show();
    $('#Enquiryheader').text('Customer Enquiry');
    $('#Enquirydiv').show();
    $('#Qtndiv').hide();
    $('#Qtndivcust').hide();
    $('#Qtndivsub').hide();
    $('#SalesOrderdiv').hide();
    $('#SalesOrderdivcust').hide();
    $('#SalesOrderdivsub').hide();
    $('#Enquirydivsub').hide();
    $('#Enquirydivcust').hide();
    $('#SalesInvdiv').hide();
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    $('#DeliveryOrderdiv').hide();
    $('#DeliveryOrderdivcust').hide();
    $('#DeliveryOrderdivsub').hide();
    var data = {};
    data.CustId = 0;
    data.DeptId = ERPDeptId;
    data.FromDate = '';
    data.ToDate = '';
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/SalesEnquiryGets",
        data: data,
        success: function (result) {
            $('#tblEnquiry tr').remove();
            EnquiryLoad(result.oList);
        }
    });
}

//List Enquiry Details in Enquiry Popup table
function EnquiryLoad(result) {
    disable_datatable('tblEnquiry');
    var responseText = "<thead><tr><th>Enquiry No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Subject</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th></th></tr>" +
        "<tr><th>Enquiry No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Subject</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th>Select</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
           '<td id=' + 'Enquirycols' + slno + '>' + result[l].EnquiryNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].PhoneNumber + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].Subject + '</td>' +
           '<td>' + result[l].DocNumber + '</td>' +
           '<td>' + result[l].Salesman + '</td>' +
            '<td>' + result[l].AreaName + '</td>' +
             '<td>' + result[l].CurrencyName + '</td>' +
              '<td><a onclick="EditEnquiry(' + result[l].EnquiryNo + ')"><i class="ft-plus-square"></i></a></td>' +
           '</tr>';
    }
    $('#tblEnquiry').html(responseText + '</tbody>');
    datatableWithsearch('tblEnquiry', 'Single');
}

//Function Call To Load Enquiry Details Against Customer in Enquiry Popup table
function EnqCustLoadCall() {
    $("#Enquirypopup").css("margin-top", '-100px');
    $('#Enquirypopup').show();
    $('#Enquiryheader').text('Customer Enquiry');
    $('#Enquirydivcust').show();
    $('#Qtndiv').hide();
    $('#Qtndivcust').hide();
    $('#Qtndivsub').hide();
    $('#SalesOrderdiv').hide();
    $('#SalesOrderdivcust').hide();
    $('#SalesOrderdivsub').hide();
    $('#Enquirydiv').hide();
    $('#Enquirydivsub').hide();
    $('#SalesInvdiv').hide();
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').hide();
    $('#DeliveryOrderdiv').hide();
    $('#DeliveryOrderdivcust').hide();
    $('#DeliveryOrderdivsub').hide();
    var data = {};
    data.CustId = $('#txtCustId').val();
    data.DeptId = ERPDeptId;
    data.FromDate = '';
    data.ToDate = '';
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/SalesEnquiryGets",
        data: data,
        success: function (result) {
            $('#tblEnquirypsub tr').remove();
            EnquiryLoadCust(result.oList);
        }
    });
}


var Location = '';
//List Enquiry Details Against Customer in Enquiry Popup table
function EnquiryLoadCust(result) {
    disable_datatable('tblEnquirycust');
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' style='zoom:1.5' checked id= 'SlNoHeadCheckCust0' 'custom-control-input cz-bg-image-display' onchange='selectallcust()'>&nbsp;&nbsp;&nbsp;Select</th><th>Enquiry No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Subject</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style=display:none></th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Enquiry No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Subject</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style=display:none></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        $('#txtEnquiryNo').val(result[l].EnquiryNo);
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;" ><input type="checkbox" style="zoom:1.5;align:center;" checked  name="checkenqry"  id=' + 'SlNoHeadCheckCust' + slno + '  "custom-control-input cz-bg-image-display" ></td>' +
           '<td id=' + 'Enquirycol' + slno + '>' + result[l].EnquiryNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].PhoneNumber + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].Subject + '</td>' +
           '<td>' + result[l].DocNumber + '</td>' +
           '<td>' + result[l].Salesman + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td style="display:none" id=' + 'CurncyId' + slno + '>' + result[l].CurrencyId + '</td>' +
           '</tr>';
    }
    $('#tblEnquirycust').html(responseText + '</tbody>');
    datatableWithsearch('tblEnquirycust', 'Multiple');
    $('#RowGetenqcust').val(result.length);
    //for (var l = 0; l < 1; l++) {
    Location = result[0].Location;
    //    break;
    //}
}

//Selecting checkbox for enquiry Customer List
function selectallcust() {
    var rowCount = $('#RowGetenqcust').val();
    var flag = $("#SlNoHeadCheckCust0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoHeadCheckCust" + h) != null) {
            document.getElementById("SlNoHeadCheckCust" + h).checked = flag;
        }
    }
}


//Selecting checkbox for productslist(Enquiry)
function selectallprdt() {
    var rowCount = $('#RowGet1').val();
    var flag = $("#SlNoCheckItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckItem" + h) != null) {
            document.getElementById("SlNoCheckItem" + h).checked = flag;
        }
    }
}

//Function Call To Load Enquiry Details To the Fields against an Enquiry No
function EditEnquiry(EnquiryNo) {
    if (EnquiryNo != 0) {
        var data = {};
        data.EnquiryNo = EnquiryNo;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/CustomerEnquiryGetandGetsSales",
            data: data,
            success: function (result) {
                CustomerEnquiryGets(result.oList);
                CloseEnquiry();
            }
        });
    }
}

//To Load Enquiry Details To the Fields against an Enquiry No
function CustomerEnquiryGets(result) {
    Tbldelete();
    copyrefresh();
    TaxClear();
    for (var n = 0; n < result.length; n++) {
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);

        if (result[n].SalesManId != 0 || result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 || result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(1);
        if (result[n].CurrencyId != 0 || result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        if (result[n].Location != 0 || result[n].Location != '') {

            $('#select_locn').val(result[n].Location);
        }
        else {
            $('#select_locn').val(UserLocationId);
        }

        $('#select_location0').val($('#select_locn').val());
        $('#GrandTotal').val((parseFloat(result[n].FCGrandTotal).toFixed(Decimal)));
        $('#FcGrandTotal').val((parseFloat(result[n].GrandTotal).toFixed(Decimal)));
        $('#FcTotalTaxable').val((parseFloat(result[n].FCTotTaxable).toFixed(Decimal)));
        $('#TotalTaxable').val((parseFloat(result[n].TotalTaxable).toFixed(Decimal)));
        $('#FcTotalDiscount').val((parseFloat(result[n].FCTotalDiscount).toFixed(Decimal)));
        $('#TotalDiscount').val((parseFloat(result[n].TotalDiscount).toFixed(Decimal)));
        $('#FcTotalTax').val((parseFloat(result[n].FCTotTax).toFixed(Decimal)));
        $('#TotalTax').val((parseFloat(result[n].TotalTax).toFixed(Decimal)));
        $('#txtmsg').val(result[n].Remarks);
        $('#gndtotal').text(parseFloat(result[n].GrandTotal).toFixed(Decimal));
        // $('#txtEnqNo').val(result[n].EnquiryNo);
        $('#EnquiryNo').val(result[n].EnquiryNo);
        $('#txtphone').val(result[n].PhoneNumber);
        $('#txtdocumentno').val(result[n].DocNumber);
        $('#txtsubject').val(result[n].Subject);
        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        $("#fc").css("opacity", '100');
        $('#PhoneNo').val(result[n].PhoneNumber);

        BillDiscountFlag = 0;

        var id = parseInt(n + 1);

        var desc = result[n].ProductDescr;
        var j = 0, strLength = desc.length;
        for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

        var code = result[n].ProductCode;
        var k = 0, strLength1 = code.length;
        for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

        var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + result[n].ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center'  id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + id + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'enqno' + id + " style='display:none' value='" + result[n].EnquiryNo + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "' data-toggle='tooltip' title='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "' data-toggle='tooltip' title='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'  onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select  id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text'  class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text'  id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px'  id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + parseFloat(result[n].AvgCost * result[n].ProdQty).toFixed(Decimal) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat(result[n].AvgCost).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        if (result[n].Location != 0 || result[n].Location != '') {

            $('#select_location' + id).val(result[n].Location);
        }
        else {
            $('#select_location' + id).val(UserLocationId);
        }
        TaxSplit(id);
        clearrow(0);
        amountcalculation(id);


        if (parseFloat($('#txtdiscount' + id).val()) > 0) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
            $('#Discountpercent').val('');
            BillDiscountFlag = 1;
        }
        id++;
    }
    i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);
    CalcDiscountSplitTax1();
    roundoffcalc();
    totalproducts();
    getcreditlimit();
}

//Function Call To ProductList in the DB based on Customer Enquiry No
function GetenqProduct() {
    var EnqNo = '';
    var CurncyId = '';
    var fl = 0;
    var row = $('#RowGetenqcust').val();
    var checkboxes = document.getElementsByName('checkenqry');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        if (checkboxes[k].checked == true) {
            fl++;
        }
    }
    if (fl == 0) {
        warningshow('Select Enquiry Number');
    }
    else {
        for (var n = 1; n <= row; n++) {
            if ($("#SlNoHeadCheckCust" + n).is(":checked")) {
                CurncyId = $('#CurncyId' + n).text();
                break;
            }
        }
        for (var m = 1; m <= row; m++) {
            if ($("#SlNoHeadCheckCust" + m).is(":checked")) {
                if (($('#CurncyId' + m).text() != CurncyId)) {
                    warningshow('Please Select Enquiry with Same Curency!');
                    return false;
                }
                else {
                    if (EnqNo == '') {
                        EnqNo += $('#Enquirycol' + m).text();
                    }
                    else {
                        EnqNo += ',' + $('#Enquirycol' + m).text();
                    }
                }
            }
        }
        $("#enqnosearch").val(EnqNo);
        var data = {};
        data.EnquiryNum = EnqNo;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/CustomerEnquiryGetProductsSales",
            data: data,
            success: function (result) {
                if (EnqNo != 0)
                    ShowItemGet(result.oList);
            }
        });
    }
}

//ProductList in the DB based on Customer Enquiry No
function ShowItemGet(result) {
    $('#Enquirydivcust').hide();
    $('#Enquirydivsub').show();
    disable_datatable('tblEnquirypsub');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5' checked id= 'SlNoCheckItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdt()'>&nbsp;&nbsp;&nbsp;Select</th><th>Enquiry No</th><th style=display:none></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style=display:none></th><th style=display:none></th><th style=display:none></th><th style=display:none></th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th style='width:90px;'>Select</th><th>Enquiry No</th><th style=display:none></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style=display:none></th><th style=display:none></th><th style=display:none></th><th style=display:none></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" style="zoom:1.5;" name="CheckItemen" checked  id= ' + 'SlNoCheckItem' + slno + ' ></td>' +
       '<td id=' + 'enqnoRow' + slno + '>' + result[l].EnquiryNo + '<input type="hidden" id="enqno"' + slno + '" value=' + result[l].EnquiryNo + '></td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '><input type="hidden" id="avg_' + slno + '" value=' + result[l].AvgCost + '></td>' +
        '<td style=display:none; id=' + 'discount' + slno + '>' + parseFloat(result[l].ProdDisc).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' + result[l].ProdDisc + '><input type="hidden" id="fcdis_' + slno + '" value=' + result[l].FcProdDisc + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' + result[l].TaxId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' + result[l].TaxPercent + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' + result[l].TaxableAmount + '><input type="text" style="display:none;" id= ' + 'fctaxableamt' + slno + ' value= ' + result[l].FCTaxableAmount + '></td>' +
        '<td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].TaxAmount).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' + result[l].TaxAmount + '><input type="hidden" id="fctaxamt_' + slno + '" value=' + result[l].FCTaxAmount + '>' +
        '<td id=' + 'total' + slno + '>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '><input type="hidden" id="fctotal_' + slno + '" value=' + result[l].FCAmount + '></td></tr>';
    }

    $('#tblEnquirypsub').html(responseText + '</tbody>');
    datatableWithsearch('tblEnquirypsub', 'Multiple');
    $('#RowGet1').val(result.length);
}

//--------------------------------------------------------------------------------------------End Enquiry--------------------------------------------

//--------------------------------------------------------------------------------------------Quotation---------------------------------------------

//List Quotation Details in Quotation Popup 
function QuotationLoad(result) {
    disable_datatable('tblQtn');
    var responseText = "<thead><tr><th></th><th>Quotation No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style=display:none></th><th style=display:none></th><th></th></tr>" +
        "<tr><th>Select</th><th>Quotation No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style=display:none></th><th style=display:none></th><th>Details</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" name="CheckRevision" style="zoom:1.5;" id= ' + 'SlNoCheckRevision' + slno + ' ></td>' +
           '<td id=' + 'qtncols' + slno + '>' + result[l].QuotationNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].PhoneNumber + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].DocNumber + '</td>' +
           '<td>' + result[l].Salesman + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td style="display:none" id=' + 'Qtnnum' + slno + '> ' + result[l].QuotationNo + '</td>' +
           '<td style="display:none" id=' + 'Qtmainid' + slno + '>' + result[l].QuotationEntryMainId + '</td>' +
           '<td><a onclick="ViewRevisionDetails(' + result[l].QuotationNo + ')">Details</a></td>' +
           '</tr>';

    }
    $('#tblQtn').html(responseText + '</tbody>');
    datatableWithsearch('tblQtn', 'Single');
    $('#RowGet2').val(result.length);
}


//List Quotation Details against a customer in Quotation Popup 
var Location1 = '';
function QuotationCustLoad(result) {
    disable_datatable('tblQtncust');
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' style='zoom:1.5;' checked id= 'SlNoHdCheckCust0' 'custom-control-input cz-bg-image-display' onchange='selectallcust5()'>&nbsp;&nbsp;&nbsp;Select</th><th>Quotation No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style=display:none></th><th style=display:none></th><th></th></tr>" +
        "<tr><th  style='width:90px;'>Select</th><th>Quotation No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style=display:none></th><th style=display:none></th><th>Details</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="Checkcust" checked id= ' + 'SlNoHdCheckCust' + slno + ' ></td>' +
           '<td id=' + 'Qtncol' + slno + '>' + result[l].QuotationNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].PhoneNumber + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].DocNumber + '</td>' +
           '<td>' + result[l].Salesman + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td style="display:none" id=' + 'CurncyId' + slno + '>' + result[l].CurrencyId + '</td>' +
           '<td id=' + 'qtnmainid' + slno + ' style="display:none">' + result[l].QuotationEntryMainId + '</td>' +
           '<td><a onclick="ViewRevisionDetails(' + result[l].QuotationNo + ')">Details</a></td>' +
           '</tr>';
    }
    $('#tblQtncust').html(responseText + '</tbody>');
    datatableWithsearch('tblQtncust', 'Multiple');
    $('#RowGet3').val(result.length);
    //for (var l = 0; l < 1; l++) {
    Location1 = result[0].Location;
    //    break;
    //}
}

//Selecting checkbox for Quotation Customer List
function selectallcust5() {
    var rowCount = $('#RowGet3').val();
    var flag = $("#SlNoHdCheckCust0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoHdCheckCust" + h) != null) {
            document.getElementById("SlNoHdCheckCust" + h).checked = flag;
        }
    }
}


//ProductList in the DB based on Quotation No 
function ShowItemGetQtn(result) {
    $('#Qtndivcust').hide();
    $('#Qtndivsub').show();
    disable_datatable('tblQtnsub');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckQtnItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtqtn()'>&nbsp;&nbsp;&nbsp;Select</th><th>Quotation No</th><th style=display:none></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style=display:none></th><th style=display:none></th><th style=display:none></th><th style=display:none></th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th style='width:90px;'>Select</th><th>Quotation No</th><th style=display:none></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style=display:none></th><th style=display:none></th><th style=display:none></th><th style=display:none></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" style="zoom:1.5;" name="CheckQtnItem" checked  id= ' + 'SlNoCheckQtnItem' + slno + ' ></td>' +
       '<td id=' + 'qtnnoRow' + slno + '>' + result[l].QuotationNo + '<input type="hidden" id="enqno"' + slno + '" value=' + result[l].QuotationNo + '></td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '><input type="hidden" id="avg_' + slno + '" value=' + result[l].AvgCost + '></td>' +
        '<td style=display:none; id=' + 'discount' + slno + '>' + parseFloat(result[l].ProdDisc).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' + result[l].ProdDisc + '><input type="hidden" id="fcdis_' + slno + '" value=' + result[l].FcProdDisc + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' + result[l].TaxId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' + result[l].TaxPercent + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' + result[l].TaxableAmount + '><input type="text" style="display:none;" id= ' + 'fctaxableamt' + slno + ' value= ' + result[l].FCTaxableAmount + '></td>' +
        '<td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].TaxAmount).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' + result[l].TaxAmount + '><input type="hidden" id="fctaxamt_' + slno + '" value=' + result[l].FCTaxAmount + '>' +
        '<td id=' + 'total' + slno + '>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '><input type="hidden" id="fctotal_' + slno + '" value=' + result[l].FCAmount + '></td></tr>';
    }

    $('#tblQtnsub').html(responseText + '</tbody>');
    datatableWithsearch('tblQtnsub', 'Multiple');
    $('#RowGet3qt').val(result.length);
}

//Selecting checkbox for productslist(Quotation)
function selectallprdtqtn() {
    var rowCount = $('#RowGet3qt').val();
    var flag = $("#SlNoCheckQtnItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckQtnItem" + h) != null) {
            document.getElementById("SlNoCheckQtnItem" + h).checked = flag;
        }
    }
}

//Function Call To Load Quotation Details To the Fields against a Qtn No
function EditQtn() {
    var row = parseInt($('#RowGet2').val());
    var flg = 0;
    var checkboxes = document.getElementsByName('CheckRevision');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        if (checkboxes[k].checked == true) {
            flg++;
        }
    }
    if (flg != 1) {
        warningshow('Select One Quotation Number');
    }
    else {
        $('#Warningpopup').fadeOut();
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckRevision" + m).is(":checked")) {
                $('#txtEnquiryNo').hide();
                $('#txtQuotationNo').show();
                var data = {};
                data.QuotationNo = $('#qtncols' + m).text();
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/QuotationEntryGetandGets",
                    data: data,
                    success: function (result) {
                        QtnEntryGets(result.oList);
                        CloseEnquiry();
                    }
                });

            }
        }
    }
}

//To Load Qtn Details To the Fields against a Qtn No 
function QtnEntryGets(result) {
    Tbldelete();
    copyrefresh();
    TaxClear();
    for (var n = 0; n < result.length; n++) {
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);
        if (result[n].SalesManId != 0 || result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 || result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(1);
        if (result[n].CurrencyId != 0 || result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        if (result[n].Location != 0 || result[n].Location != '') {

            $('#select_locn').val(result[n].Location);
        }
        else {
            $('#select_locn').val(UserLocationId);
        }
        $('#select_location0').val($('#select_locn').val());
        $('#GrandTotal').val((parseFloat(result[n].FCGrandTotal).toFixed(Decimal)));
        $('#FcGrandTotal').val((parseFloat(result[n].GrandTotal).toFixed(Decimal)));
        $('#FcTotalTaxable').val((parseFloat(result[n].FCTotTaxable).toFixed(Decimal)));
        $('#TotalTaxable').val((parseFloat(result[n].TotalTaxable).toFixed(Decimal)));
        $('#FcTotalDiscount').val((parseFloat(result[n].FCTotalDiscount).toFixed(Decimal)));
        $('#TotalDiscount').val((parseFloat(result[n].TotalDiscount).toFixed(Decimal)));
        $('#FcTotalTax').val((parseFloat(result[n].FCTotTax).toFixed(Decimal)));
        $('#TotalTax').val((parseFloat(result[n].TotalTax).toFixed(Decimal)));
        $('#txtmsg').val(result[n].Remarks);
        $('#gndtotal').text(parseFloat(result[n].GrandTotal).toFixed(Decimal));
        $('#QuotationNo').val(result[n].QuotationNo);
        $('#txtphone').val(result[n].PhoneNumber);
        $('#txtdocumentno').val(result[n].DocNumber);
        $('#txtsubject').val(result[n].Subjects);

        $('#txtattention').val(result[n].Attention);
        $('#txtdays').val(result[n].QDays);

        $('#PhoneNo').val(result[n].PhoneNumber);

        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        $("#fc").css("opacity", '100');
        var rowcount = CountRows();
        if (rowcount == 0) {
            i = 1;
        }

        BillDiscountFlag = 0;
        var slno = rowcount + 1;
        var id = parseInt(n + 1);

        var desc = result[n].ProductDescr;
        var j = 0, strLength = desc.length;
        for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

        var code = result[n].ProductCode;
        var k = 0, strLength1 = code.length;
        for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

        var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + result[n].ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'qutnnum' + id + " style='display:none' value='" + result[n].QuotationNo + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "' data-toggle='tooltip' title='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "' data-toggle='tooltip' title='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select  id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'  onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select  id=" + 'select_location' + id + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text'  class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text'  id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px'  id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (result[n].AvgCost * result[n].ProdQty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat(result[n].AvgCost).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);

        if (result[n].Location != 0 || result[n].Location != '') {

            $('#select_location' + id).val(result[n].Location);
        }
        else {
            $('#select_location' + id).val(UserLocationId);
        }
        TaxSplit(id);
        amountcalculation(id);


        if (parseFloat($('#txtdiscount' + id).val()) > 0) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
            $('#Discountpercent').val('');
            BillDiscountFlag = 1;
        }
        i++;

    }
    //  i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);

    CalcDiscountSplitTax1();
    roundoffcalc();
    totalproducts();
    $('#txtproduct0').focus();
    getcreditlimit();


}

//Function Call To View Revision Details of Selected Quotation No
function ViewRevisionDetails(qn) {
    $('#Warningpopup').fadeOut();
    $('#Revisionpopupdiv,#Revdiv').show();
    $('#revheader').text('Revision Details')
    $('#tblRevision tr').remove();
    var data = {};
    data.QuotationNo = qn;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/QuotationGetRevision",
        data: data,
        success: function (result) {
            ViewRevision(result.oList);
        }
    });
}

//View Revision Details In Popup
function ViewRevision(result) {
    var checkboxes = document.getElementsByName('CheckRevision');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        checkboxes[k].checked = false;
    }
    if (result.length == 0) {
        $('#tblRevision').html("<span class='label label-danger'>No records found</span>");
    }
    else {
        var responseText = "<thead><tr><th>Quotation No</th><th>Customer</th><th>Address</th><th>Date</th><th>Currency</th><th>Currency Rate</th><th>Total Discount</th><th>Total Taxable</th><th>Total Tax</th><th>Grand Toatal</th><th></th></tr></thead><tbody>";
        for (var l = 0; l < result.length; l++) {

            var slno = parseInt(l + 1);
            responseText += '<tr id=' + "row" + slno + '>' +
               '<td id=' + 'Enquirycol' + slno + '>' + result[l].QuotationNo + '</td>' +
               '<td>' + result[l].CustName + '</td>' +
               '<td >' + result[l].CustAddress + '</td>' +
               '<td>' + result[l].InvDate + '</td>' +
               '<td>' + result[l].CurrencyName + '</td>' +
               '<td>' + parseFloat(result[l].CurrencyRate).toFixed(Decimal) + '</td>' +
               '<td>' + parseFloat(result[l].TotalDiscount).toFixed(Decimal) + '</td>' +
               '<td>' + parseFloat(result[l].TotalTaxable).toFixed(Decimal) + '</td>' +
               '<td>' + parseFloat(result[l].TotalTax).toFixed(Decimal) + '</td>' +
               '<td>' + parseFloat(result[l].FCGrandTotal).toFixed(Decimal) + '</td>' +
               '</tr>';

        }
        $('#tblRevision').html(responseText + '</tbody>');
    }
}

//Saerch Customer in Quotation Popup When CustId=0
function SearchQuotation(Flag) {
    disable_datatable('tblQtn');
    if (Flag == 1)                         //search
    {

        if ($('#hiddencustIdqtn').val() == 0) {
            $('#SearchCustqtn').val('');
            $('#SearchCustqtn').focus();
        }
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Quotation Entry Details');
        $('#Qtndiv').show();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.QuotationNo = 0;
        data.CustId = $('#hiddencustIdqtn').val() || 0;
        data.FromDate = $('#SearchFromdateqtn').val();
        data.ToDate = $('#SearchToDateqtn').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryRecall",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblQtn').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    QuotationLoad(result.oList);
                }
            }
        });
    }
    else if (Flag == 0)                      //Clear
    {
        $('#SearchCustqtn').val('')
        $('#hiddencustIdqtn').val(0);
        $('#SearchFromdateqtn').val(CurDate);
        $('#SearchToDateqtn').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Quotation Entry Details');
        $('#Qtndiv').show();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.QuotationNo = 0;
        data.CustId = 0;
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryRecall",
            data: data,
            success: function (result) {
                QuotationLoad(result.oList);
            }
        });
    }
}

//Search Customer in Quotation Popup When CustId!=0
function SearchSQtnCust(flag) {
    disable_datatable('tblQtncust');
    if (flag == 1)          //Search
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Quotation Entry Details');
        $('#Qtndivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.QuotationNo = 0;
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdateqtn1').val();
        data.ToDate = $('#SearchToDateqtn1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryRecall",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblQtncust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    QuotationCustLoad(result.oList);
                }
            }
        });
    }
    else if (flag == 0)        //Clear
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Quotation Entry Details');
        $('#Qtndivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#SearchFromdateqtn1').val(CurDate);
        $('#SearchToDateqtn1').val(CurDate);
        var data = {};
        data.QuotationNo = 0;
        data.CustId = $('#txtCustId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryRecall",
            data: data,
            success: function (result) {
                QuotationCustLoad(result.oList);
            }
        });

    }
}

//Saerch Product in Quotation Popup 
var qtno = '';
function SearchSQtnSub(Flag) {
    disable_datatable('tblQtnsub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIdqtn').val() == 0) {
            $('#SearchProdqtn').val('');
            $('#SearchProdqtn').focus();
        }
        var data = {};
        data.QtnNo = qtno;
        data.ProductId = $('#hiddenProdIdqtn').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryGetProducts",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblQtnsub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    ShowItemGetQtn(result.oList);
                }
            }
        });
    }

    else if (Flag == 0) {
        $('#SearchProdqtn').val('')
        $('#hiddenProdIdqtn').val('');

        var data = {};
        data.QtnNo = qtno;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEntryGetProducts",
            data: data,
            success: function (result) {
                ShowItemGetQtn(result.oList);
            }
        });
    }                    //Clear
}



//---------------------------------------------------------------------------------------------End Quotation------------------------------------

//-------------------------------------------------------------------------------------------Sales Order--------------------------------

//List Sales Order Details in Popup 
function SalesOrderLoad(result) {
    disable_datatable('tblSalesOrder');
    var responseText = "<thead><tr><th></th><th>Order No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr>" +
        "<tr><th>Select</th><th>Order No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="CheckRevision" id= ' + 'SlNoCheckRevision' + slno + ' ></td>' +
           '<td id=' + 'socols' + slno + '>' + result[l].OrderNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].Area + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].Currency + '</td>' +
           '<td style="display:none" id=' + 'Qtnnum' + slno + '> ' + result[l].OrderNo + '</td>' +
           '<td style="display:none" id=' + 'Qtmainid' + slno + '>' + result[l].SalesOrderMainId + '</td>' +
           '</tr>';

    }
    $('#tblSalesOrder').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesOrder', 'Single');
    $('#RowGet5').val(result.length);
}


//List  Sales Order Details against a customer in Popup 
function SalesOrderCustLoad(result) {
    disable_datatable('tblSalesOrdercust');
    var responseText = "<thead><tr><th><input type='checkbox' style='zoom:1.5;' checked id= 'SlNoHdCheckCust0' 'custom-control-input cz-bg-image-display' onchange='selectallcust4()'>&nbsp;&nbsp;&nbsp;Select</th><th>Order No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr>" +
        "<tr><th style='width:110px;'>Select</th><th>Order No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" checked name="Checkcust" id= ' + 'SlNoHdCheckCust' + slno + ' ></td>' +
           '<td id=' + 'SalesOrdercol' + slno + '>' + result[l].OrderNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].Area + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].Currency + '</td>' +
           '<td style="display:none" id=' + 'CurncyId' + slno + '>' + result[l].CurrencyId + '</td>' +
           '</tr>';
    }
    $('#tblSalesOrdercust').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesOrdercust', 'Multiple');
    $('#RowGet4').val(result.length);
}

//Selecting checkbox for Sales Order Customer List
function selectallcust4() {
    var rowCount = $('#RowGet4').val();
    var flag = $("#SlNoHdCheckCust0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoHdCheckCust" + h) != null) {
            document.getElementById("SlNoHdCheckCust" + h).checked = flag;
        }
    }
}

//Function Call To Load Sales Order Details To the Fields against an Order No
function EditSalesOrder() {
    var row = parseInt($('#RowGet5').val());
    var flg = 0;
    var checkboxes = document.getElementsByName('CheckRevision');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        if (checkboxes[k].checked == true) {
            flg++;
        }
    }
    if (flg != 1) {
        warningshow('Select One Order Number');
    }
    else {
        $('#Warningpopup').fadeOut();
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckRevision" + m).is(":checked")) {
                var data = {};
                data.OrderNo = $('#socols' + m).text();
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/SalesOrderGetandGetsSalesInv",
                    data: data,
                    success: function (result) {
                        SalesOrderGets(result.oList);
                        CloseEnquiry();
                    }
                });

            }
        }
    }
}


//To Load Sales Order Details To the Fields against an Order No 
function SalesOrderGets(result) {
    Tbldelete();
    copyrefresh();
    TaxClear();
    for (var n = 0; n < result.length; n++) {
        $('#OrderNo').val(result[n].OrderNo);
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);
        $('#select_payterms').val(result[n].PayType);
        $('#txtlpono').val(result[n].LPONumber);
        $('#select_terms').val(result[n].InvTerms);
        $('#txtExpdate').val(result[n].ExpectedDate);
        if (result[n].SalesManId != 0 || result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 || result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(1);
        if (result[n].CurrencyId != 0 || result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        $('#select_locn').val(result[n].LocId);
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
        $('#PhoneNo').val(result[n].PhoneNumber);

        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        $("#fc").css("opacity", '100');
        var rowcount = CountRows();
        if (rowcount == 0) {
            i = 1;
        }

        BillDiscountFlag = 0;
        var slno = rowcount + 1;
        var id = parseInt(n + 1);

        var desc = result[n].ProductDescr;
        var j = 0, strLength = desc.length;
        for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

        var code = result[n].ProductCode;
        var k = 0, strLength1 = code.length;
        for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

        var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + result[n].ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'slordsubid' + id + " style='display:none' value='" + result[n].SalesOrderSubId + "' /><input type='text' id=" + 'slordeno' + id + " style='display:none' value='" + result[n].OrderNo + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "' data-toggle='tooltip' title='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "' data-toggle='tooltip' title='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select  id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'   onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><select id=" + 'select_location' + id + " value=" + result[n].LocnId + " style='background-color:white;height:30px'  class='form-control'  onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text'  class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text'  id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px'  id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'  onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (result[n].AvgCost * result[n].ProdQty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat(result[n].AvgCost).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        $('#select_location' + id).val(result[n].LocnId);
        TaxSplit(id);
        amountcalculation(id);



        if (parseFloat($('#txtdiscount' + id).val()) > 0) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
            $('#Discountpercent').val('');
            BillDiscountFlag = 1;
        }
        i++;

    }
    //  i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);

    CalcDiscountSplitTax1();
    roundoffcalc();
    totalproducts();
    $('#txtproduct0').focus();
    getcreditlimit();
}


//ProductList in the DB based on Order No 
function ShowItemGetSalesOrder(result) {
    $('#SalesOrderdivcust').hide();
    $('#SalesOrderdivsub').show();
    disable_datatable('tblSalesOrdersub');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckSoItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtso()'>&nbsp;&nbsp;&nbsp;Select</th><th>Order No</th><th style='display:none'></th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Order No</th><th style='display:none'></th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" style="zoom:1.5;" name="CheckSordItem" checked  id= ' + 'SlNoCheckSoItem' + slno + ' ></td>' +
       '<td id=' + 'qtnnoRow' + slno + '>' + result[l].OrderNo + '<input type="hidden" id="enqno"' + slno + '" value=' + result[l].OrderNo + '></td>' +
        '<td id=' + 'ordersubidrow' + slno + ' style=display:none;>' + result[l].SalesOrderSubId + '</td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
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

    $('#tblSalesOrdersub').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesOrdersub', 'Multiple');
    $('#RowGet6').val(result.length);
}

//Selecting checkbox for productslist(Sales Order)
function selectallprdtso() {
    var rowCount = $('#RowGet6').val();
    var flag = $("#SlNoCheckSoItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckSoItem" + h) != null) {
            document.getElementById("SlNoCheckSoItem" + h).checked = flag;
        }
    }
}

//Saerch Customer in sales Order Popup When CustId=0
function SearchSOrder(Flag) {
    disable_datatable('tblSalesOrder');
    if (Flag == 1)                         //search
    {
        if ($('#hiddencustIdso').val() == 0) {
            $('#SearchCustso').val('');
            $('#SearchCustso').focus();
        }
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Order Details');
        $('#SalesOrderdiv').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.QuotationNo = 0;
        data.CustId = $('#hiddencustIdso').val();
        data.FromDate = $('#SearchFromdateso').val();
        data.ToDate = $('#SearchToDateso').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderRecallSalesInv",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesOrder').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    SalesOrderLoad(result.oList);
                }
            }
        });

    }
    else if (Flag == 0)                      //Clear
    {

        $('#SearchCustso').val('')
        $('#hiddencustIdso').val(0);
        $('#SearchFromdateso').val(CurDate);
        $('#SearchToDateso').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Order Details');
        $('#SalesOrderdiv').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.QuotationNo = 0;
        data.CustId = 0;
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderRecallSalesInv",
            data: data,
            success: function (result) {

                SalesOrderLoad(result.oList);
            }
        });
    }
}

//Search Customer in sales Order Popup When CustId!=0
function SearchSOrderCust(flag) {
    disable_datatable('tblSalesOrdercust');
    if (flag == 1)          //Search
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Order Details');
        $('#SalesOrderdiv').hide();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdivcust').show();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdateso1').val();
        data.ToDate = $('#SearchToDateso1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderRecallSalesInv",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesOrdercust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    SalesOrderCustLoad(result.oList);
                }
            }
        });
    }
    else if (flag == 0)        //Clear
    {
        $('#SearchFromdateso1').val(CurDate);
        $('#SearchToDateso1').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Sales Order Details');
        $('#SalesOrderdivcust').show();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivsub').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderRecallSalesInv",
            data: data,
            success: function (result) {
                SalesOrderCustLoad(result.oList);
            }
        });
    }
}

//Saerch Product in sales Order Popup
var sono = '';
function SearchSOrderSub(Flag) {
    disable_datatable('tblSalesOrdersub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIdso').val() == 0) {
            $('#SearchProdso').val('');
            $('#SearchProdso').focus();
        }
        var data = {};
        data.OrdNo = sono;
        data.ProductId = $('#hiddenProdIdso').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderGetProductsSalesInv",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesOrdersub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    ShowItemGetSalesOrder(result.oList);
                }
            }
        });
    }
    else if (Flag == 0) {
        $('#SearchProdso').val('')
        $('#hiddenProdIdso').val('');
        var data = {};
        data.OrdNo = sono;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesOrderGetProductsSalesInv",
            data: data,
            success: function (result) {
                ShowItemGetSalesOrder(result.oList);
            }
        });
    }                    //Clear
}

//--------------------------------------------------------------------------------------------End-----------------------------------------------------------------

//--------------------------------------------------------------------------------------------Recall Sales Invoice-----------------------------------------------------------------

//List Sales Invoice Details in Popup 
function SalesInvLoad(result) {
    disable_datatable('tblSalesInv');
    var responseText = "<thead><tr><th></th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr>" +
                              "<tr><th>Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" name="CheckSInv" style="zoom:1.5;" id= ' + 'SlNoChecksalesinv' + slno + ' ></td>' +
            '<td >' + result[l].BillDescription + '</td>' +
           '<td id=' + 'Invcol' + slno + '>' + result[l].BillSlNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           //'<td style="display:none" id=' + 'Blsl' + slno + '> ' + result[l].BillSlNo + '</td>' + 
           '<td style="display:none" id=' + 'Blsrs' + slno + '>' + result[l].BillSeriesId + '</td>' +
           '</tr>';

    }
    $('#tblSalesInv').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesInv', 'Single');
    $('#RowGet7').val(result.length);
}

//Function Call To Load Sales Invoice Details To the Fields against a Bill No
function EditSalesInvoice() {
    var row = parseInt($('#RowGet7').val());
    var flg = 0;
    var checkboxes = document.getElementsByName('CheckSInv');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        if (checkboxes[k].checked == true) {
            flg++;
        }
    }
    if (flg != 1) {
        warningshow('Select One Bill Number');
    }
    else {
        $('#Warningpopup').fadeOut();
        for (m = 1; m <= row; m++) {
            if ($("#SlNoChecksalesinv" + m).is(":checked")) {
                var data = {};
                data.BillSlNo = $('#Invcol' + m).text();
                data.BillSeriesId = $('#Blsrs' + m).text();
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/SalesGetandGets",
                    data: data,
                    success: function (result) {
                        SalesInvGets(result.oList);
                        CloseEnquiry();
                    }
                });

            }
        }
    }
}

//To Load Sales Invoice Details To the Fields against a Bill No
function SalesInvGets(result) {
    Tbldelete();
    copyrefresh();
    TaxClear();
    for (var n = 0; n < result.length; n++) {
        $('#txtBillSlNocopy').val(result[n].BillSlNo);
        $('#txtSalesNo').val(result[n].BillSlNo);
        $('#txtBillseriesId').val(result[n].BillSeriesId);
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);
        $('#select_payterms').val(result[n].PayType);
        $('#txtlpono').val(result[n].LPONumber);
        $('#select_terms').val(result[n].InvTerms);
        $('#txtExpdate').val(result[n].ExpectedDate);
        if (result[n].SalesManId != 0 || result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 || result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(1);
        if (result[n].CurrencyId != 0 || result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        $('#select_locn').val(result[n].LocId);
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
        $('#PhoneNo').val(result[n].PhoneNumber);

        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        $("#fc").css("opacity", '100');
        var rowcount = CountRows();
        if (rowcount == 0) {
            i = 1;
        }

        BillDiscountFlag = 0;
        var slno = rowcount + 1;
        var id = parseInt(n + 1);

        var desc = result[n].ProductDescr;
        var j = 0, strLength = desc.length;
        for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

        var code = result[n].ProductCode;
        var k = 0, strLength1 = code.length;
        for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

        var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + result[n].ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "' data-toggle='tooltip' title='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "' data-toggle='tooltip' title='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select  id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'  onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><select id=" + 'select_location' + id + " value=" + result[n].LocnId + " style='background-color:white;height:30px'  class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text'  class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text'  id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px'  id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (result[n].AvgCost * result[n].ProdQty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat(result[n].AvgCost).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                 "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        $('#select_location' + id).val(result[n].LocnId);
        TaxSplit(id);
        amountcalculation(id);

        if (result[n].RoundFCGrandTotal != 0)
            $('#roundoffstatus').prop("checked", true);
        else
            $('#roundoffstatus').prop("checked", false);

        if (parseFloat($('#txtdiscount' + id).val()) > 0) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
            $('#Discountpercent').val('');
            BillDiscountFlag = 1;
        }
        else {
            $('#disc').val(result[n].BillDiscount);
            $('#fcdisc').val(result[n].FcBillDiscount);
        }
        i++;
    }
    //  i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);

    CalcDiscountSplitTax1();
    getdate();
    roundoffcalc();
    totalproducts();
    $('#txtproduct0').focus();
    getcreditlimit();
}

//List  Sales Invoice Details against a customer in Popup  
function SalesInvoiceCustLoad(result) {
    disable_datatable('tblSalesInvcust');
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' style='zoom:1.5;' checked id= 'SlNoHdCheckCustSlInv0' 'custom-control-input cz-bg-image-display' onchange='selectallcust1()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="CheckcustSInv" checked id= ' + 'SlNoHdCheckCustSlInv' + slno + ' ></td>' +
              '<td >' + result[l].BillDescription + '</td>' +
           '<td id=' + 'SInvcol' + slno + '>' + result[l].BillSlNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
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

//ProductList in the DB based on Bill No 
function ShowItemGetSalesInvoice(result) {
    $('#SalesInvdivcust').hide();
    $('#SalesInvdivsub').show();
    disable_datatable('tblSalesInvsub');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckSIItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtsI()'>&nbsp;&nbsp;&nbsp;Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Bill Series</th><th>Bill No</th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input style="zoom:1.5;" type="checkbox" name="CheckSInvItem" checked  id= ' + 'SlNoCheckSIItem' + slno + ' ></td>' +
       '<td id=' + 'Billdesc' + slno + '>' + result[l].BillDescription + '<input type="hidden" id=' + 'billseriesno' + slno + ' value=' + result[l].BillSeriesId + '></td>' +
       '<td id=' + 'billnoRow' + slno + '>' + result[l].BillSlNo + '<input type="hidden" id=' + 'billnumber' + slno + ' value=' + result[l].BillSlNo + '></td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
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

    $('#tblSalesInvsub').html(responseText + '</tbody>');
    datatableWithsearch('tblSalesInvsub', 'Multiple');
    $('#RowGet9').val(result.length);
}

//Selecting checkbox for productslist(Sales Invoice)
function selectallprdtsI() {
    var rowCount = $('#RowGet9').val();
    var flag = $("#SlNoCheckSIItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckSIItem" + h) != null) {
            document.getElementById("SlNoCheckSIItem" + h).checked = flag;
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
            url: "../SalesInvoice/SalesInvoiceRecall",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInv').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
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
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecall",
            data: data,
            success: function (result) {
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
            url: "../SalesInvoice/SalesInvoiceRecall",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInvcust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
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
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesInvoiceRecall",
            data: data,
            success: function (result) {
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
            url: "../SalesInvoice/SalesInvoiceGetProducts",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblSalesInvsub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
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
            url: "../SalesInvoice/SalesInvoiceGetProducts",
            data: data,
            success: function (result) {
                ShowItemGetSalesInvoice(result.oList);
            }
        });
    }
}

//--------------------------------------------------------------------------------------------End Sales Invoice-----------------------------------------------------------------

//-------------------------------------------------------------------------------------------DeliveryOrder--------------------------------

//List DeliveryOrder Details in Popup  
function DeliveryOrderLoad(result) {
    disable_datatable('tblDeliveryOrder');
    var responseText = "<thead><tr><th></th><th>DO No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr>" +
                              "<tr><th>Select</th><th>DO No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" name="CheckDelivery" id= ' + 'SlNoCheckDelivery' + slno + ' ></td>' +
           '<td id=' + 'Deliverycols' + slno + '>' + result[l].DeliveryOrderNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].Area + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].Currency + '</td>' +
           '<td style="display:none" id=' + 'Qtmainid' + slno + '>' + result[l].DeliveryOrderMainId + '</td>' +
           '</tr>';
    }
    $('#tblDeliveryOrder').html(responseText + '</tbody>');
    datatableWithsearch('tblDeliveryOrder', 'Single');
    $('#RowGet11').val(result.length);
}


//Function Call To Load DeliveryOrder Details To the Fields against an Order No
function EditDeliveryOrder() {
    var row = parseInt($('#RowGet11').val());
    var flg = 0;
    var checkboxes = document.getElementsByName('CheckDelivery');
    for (var k = 0, j = checkboxes.length; k < j; k++) {
        if (checkboxes[k].checked == true) {
            flg++;
        }
    }
    if (flg != 1) {
        warningshow('Select One Order Number');
    }
    else {
        $('#Warningpopup').fadeOut();
        for (m = 1; m <= row; m++) {

            if ($("#SlNoCheckDelivery" + m).is(":checked")) {
                var data = {};
                data.DeliveryOrderNo = $('#Deliverycols' + m).text();
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/DeliveryOrderGetandGetsSalesInv",
                    data: data,
                    success: function (result) {
                        DeliveryOrderGets(result.oList);
                        CloseEnquiry();
                    }
                });

            }
        }
    }
}


//To Load DeliveryOrder Details To the Fields against an Order No 
function DeliveryOrderGets(result) {
    Tbldelete();
    copyrefresh();
    TaxClear();
    for (var n = 0; n < result.length; n++) {
        $('#DeliveryOrderNO').val(result[n].DeliveryOrderNo);
        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
        $('#txtaddress').val(result[n].CustAddress);
        $('#select_payterms').val(result[n].PayType);
        $('#txtlpono').val(result[n].LPONumber);
        if (result[n].SalesManId != 0 || result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 || result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(1);
        if (result[n].CurrencyId != 0 || result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        $('#select_locn').val(result[n].LocId);
        $('#select_location0').val($('#select_locn').val());
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
        $('#PhoneNo').val(result[n].PhoneNumber);

        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        $("#fc").css("opacity", '100');
        var rowcount = CountRows();
        if (rowcount == 0) {
            i = 1;
        }

        BillDiscountFlag = 0;
        var slno = rowcount + 1;
        var id = parseInt(n + 1);

        var desc = result[n].ProductDescr;
        var j = 0, strLength = desc.length;
        for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

        var code = result[n].ProductCode;
        var k = 0, strLength1 = code.length;
        for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

        var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + result[n].ProductId + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'delvsubid' + id + " style='display:none' value='" + result[n].DeliveryOrderSubId + "' /><input type='text' id=" + 'delvno' + id + " style='display:none' value='" + result[n].DeliveryOrderNo + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "' data-toggle='tooltip' title='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "' data-toggle='tooltip' title='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><select id=" + 'select_location' + id + " value=" + result[n].LocnId + " style='background-color:white;height:30px' class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                 "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + (result[n].AvgCost * result[n].ProdQty) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat(result[n].AvgCost).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        $('#select_location' + id).val(result[n].LocnId);
        TaxSplit(id);
        amountcalculation(id);


        if (parseFloat($('#txtdiscount' + id).val()) > 0) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
            $('#Discountpercent').val('');
            BillDiscountFlag = 1;
        }
        i++;
    }
    //  i = parseInt(result.length + 1);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    CalcGrandTotal(i);

    CalcDiscountSplitTax1();
    roundoffcalc();
    totalproducts();
    $('#txtproduct0').focus();
    getcreditlimit();

}


//ProductList in the DB based on Order No 
function ShowItemGetDeliveryOrder(result) {
    $('#DeliveryOrderdivcust').hide();
    $('#DeliveryOrderdivsub').show();
    disable_datatable('tblDeliveryOrdersub');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5;' checked id= 'SlNoCheckSoItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtdo()'>&nbsp;&nbsp;&nbsp;Select</th><th>DO No</th><th style='display:none'></th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>DO No</th><th style='display:none'></th><th style='display:none'></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" style="zoom:1.5;" name="CheckDelordItem" checked  id= ' + 'SlNoCheckSoItem' + slno + ' ></td>' +
       '<td id=' + 'qtnnoRow' + slno + '>' + result[l].DeliveryOrderNo + '<input type="hidden" id="enqno"' + slno + '" value=' + result[l].DeliveryOrderNo + '></td>' +
       '<td id=' + 'delvordsubid' + slno + ' style=display:none;>' + result[l].DeliveryOrderSubId + '</td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
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

    $('#tblDeliveryOrdersub').html(responseText + '</tbody>');
    datatableWithsearch('tblDeliveryOrdersub', 'Multiple');
    $('#RowGet12').val(result.length);
}

//Selecting checkbox for productslist(DeliveryOrder)
function selectallprdtdo() {
    var rowCountdo = $('#RowGet12').val();
    var flag = $("#SlNoCheckSoItem0").is(":checked")
    for (var h = 1; h <= rowCountdo; h++) {
        if (document.getElementById("SlNoCheckSoItem" + h) != null) {
            document.getElementById("SlNoCheckSoItem" + h).checked = flag;
        }
    }
}

//List  DeliveryOrder Details against a customer in Popup 
function DeliveryOrderCustLoad(result) {
    disable_datatable('tblDeliveryOrdercust');
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' style='zoom:1.5;' checked id= 'SlNoHdCheckCust0' 'custom-control-input cz-bg-image-display' onchange='selectallcust3()'>&nbsp;&nbsp;&nbsp;Select</th><th>DO No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>DO No</th><th>Customer</th><th>Address</th><th>Date</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" style="zoom:1.5;" checked name="Checkcust" id= ' + 'SlNoHdCheckCust' + slno + ' ></td>' +
           '<td id=' + 'Deliverycol' + slno + '>' + result[l].DeliveryOrderNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].SalesMan + '</td>' +
           '<td>' + result[l].Area + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].Currency + '</td>' +
           '<td style="display:none" id=' + 'CurncyId' + slno + '>' + result[l].CurrencyId + '</td>' +
           '<td id=' + 'qtnmainid' + slno + ' style="display:none">' + result[l].DeliveryOrderMainId + '</td>' +
           '</tr>';
    }
    $('#tblDeliveryOrdercust').html(responseText + '</tbody>');
    datatableWithsearch('tblDeliveryOrdercust', 'Multiple');
    $('#RowGet10').val(result.length);
}

//Selecting checkbox for Delivery Order Customer List
function selectallcust3() {
    var rowCount = $('#RowGet10').val();
    var flag = $("#SlNoHdCheckCust0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoHdCheckCust" + h) != null) {
            document.getElementById("SlNoHdCheckCust" + h).checked = flag;
        }
    }
}

//Saerch Customer in Delivery Order Popup When CustId=0
function SearchDlOrder(Flag) {
    disable_datatable('tblDeliveryOrder');
    if (Flag == 1)                         //search
    {
        if ($('#hiddencustIddo').val() == 0) {
            $('#SearchCustdo').val('');
            $('#SearchCustdo').focus();
        }
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Delivery Order Details');
        $('#SalesOrderdiv').hide();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        $('#DeliveryOrderdiv').show();
        var data = {};
        data.CustId = $('#hiddencustIddo').val();
        data.FromDate = $('#SearchFromdatedo').val();
        data.ToDate = $('#SearchToDatedo').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/DeliveryOrderRecallSalesInv",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblDeliveryOrder').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    DeliveryOrderLoad(result.oList);
                }
            }
        });
    }
    else if (Flag == 0)                      //Clear
    {
        $('#SearchCustdo').val('')
        $('#hiddencustIddo').val(0);
        $('#SearchFromdatedo').val(CurDate);
        $('#SearchToDatedo').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Delivery Order Details');
        $('#SalesOrderdiv').hide();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdivcust').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdivcust').hide();
        $('#DeliveryOrderdivsub').hide();
        $('#DeliveryOrderdiv').show();
        var data = {};
        data.CustId = 0;
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/DeliveryOrderRecallSalesInv",
            data: data,
            success: function (result) {
                DeliveryOrderLoad(result.oList);
            }
        });
    }
}

//Search Customer in Delivery Order Popup When CustId!=0
function SearchDlOrderCust(flag) {
    disable_datatable('tblDeliveryOrdercust');
    if (flag == 1)          //Search
    {
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Delivery Order Details');
        $('#SalesOrderdivcust').hide();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').show();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdatedo1').val();
        data.ToDate = $('#SearchToDatedo1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/DeliveryOrderRecallSalesInv",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblDeliveryOrdercust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    DeliveryOrderCustLoad(result.oList);
                }
            }
        });
    }
    else if (flag == 0)        //Clear
    {
        $('#SearchFromdateso1').val(CurDate);
        $('#SearchToDateso1').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
        $('#Enquirypopup').show();
        $('#Enquiryheader').text('Delivery Order Details');
        $('#SalesOrderdivcust').hide();
        $('#Qtndiv').hide();
        $('#Qtndivcust').hide();
        $('#Qtndivsub').hide();
        $('#SalesOrderdiv').hide();
        $('#SalesOrderdivsub').hide();
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').hide();
        $('#SalesInvdiv').hide();
        $('#SalesInvdivcust').hide();
        $('#SalesInvdivsub').hide();
        $('#DeliveryOrderdiv').hide();
        $('#DeliveryOrderdivcust').show();
        $('#DeliveryOrderdivsub').hide();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/DeliveryOrderRecallSalesInv",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblDeliveryOrdercust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    DeliveryOrderCustLoad(result.oList);
                }
            }
        });
    }
}

//Saerch Product in Delivery Order Popup
var dono = '';
function SearchDlOrderSub(Flag) {
    disable_datatable('tblDeliveryOrdersub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIddo').val() == 0) {
            $('#SearchProddo').val('');
            $('#SearchProddo').focus();
        }
        var data = {};
        data.DeliveryOrdNo = dono;
        data.ProductId = $('#hiddenProdIddo').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/DeliveryOrderGetProductsSalesInv",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblDeliveryOrdersub').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    ShowItemGetDeliveryOrder(result.oList);
                }
            }
        });
    }
    else if (Flag == 0) {
        $('#SearchProddo').val('')
        $('#hiddenProdIddo').val('');
        var data = {};
        data.DeliveryOrdNo = dono;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/DeliveryOrderGetProductsSalesInv",
            data: data,
            success: function (result) {
                ShowItemGetDeliveryOrder(result.oList);
            }
        });
    }                    //Clear
}
//--------------------------------------------------------------------------------------------End-----------------------------------------------------------------


var copyflag = 0;

function formrefreshconfirm() {
    //if (editflag != 0) {
    //    warningshow('Please Update Edit Mode');
    //}
    //else {
    var rowcount = CountRows();
    if (rowcount > 0 && copyflag == 0) {
        $('#confirm').show();

        $('#Confirmflag').val('refresh'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Data will be lost.Do you want to Continue?');
        $('#confirmOk').focus();
    }
    else {
        formrefresh();
    }
    //}
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
    //if (editflag != 0) {
    //    warningshow('Please Update Edit Mode');
    //}
    // else {
    TemporarySalesDelete();
    Prodarray = [];
    ProdIdArray = [];
    MultiPdtArray = [];

    BillDiscountFlag = 0;
    $('#copybill').hide();
    $('#bill').show();
    $('#txtBillSlNocopy').prop('disabled', false);

    $('#btnlist').prop('disabled', false);

    $('#btntrnsfr').css("height", '100%');
    $('#select_transfer').css("height", '100%');
    $('#confirmOk').prop("disabled", false);
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

    $('#select_transfer').val(0);
    $('#txtcustomer').val('');
    $('#txtCustId').val(0);
    $('#select_terms').val(0);

    $('#txtaddress').val('');
    $('#adr1').val('');
    $('#adr2').val('');
    $('#adr3').val('');
    $('#Trnno').val('');
    $('#txtcreditlimit').val('');
    $('#PhoneNo').val('');
    $('#PriceGroupId').val(0);
    $('#select_salesman').val(UserSalesmanId);
    $('#select_place').val(0);
    $('#select_jobno').val('');
    $('#txtproduct0').val('');
    $('#ProductDesc0').val('');
    $('#PrdtId0').val('');
    $('#MRP0').val('');
    $('#Otherdescription0').val('');

    $('#select_unit0').val(0);
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#txtlpono').val('');
    $('#CashAdvance').val('0.00');


    $('#EnquiryNo').val(0);
    $('#QuotationNo').val(0);
    $('#OrderNo').val(0);
    $('#DeliveryOrderNo').val(0);

    $('#roundgndtotal').val(0);
    $('#roundfcgndtotal').val(0);
    $('#TotRoundOff').val('0.00');


    $('#TotalDiscount').val('0.00');
    $('#TotalTaxable').val('0.00');
    $('#CheckForDiscount').val(0);
    $('#TotalTax').val('0.00');
    $('#GrandTotal').val('0.00');
    $('#disc').val('0.00');
    $('#fcdisc').val('');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
    $('#Warningpopup').fadeOut();
    GrandTotal = 0;
    BillLoad();
    copyflag = 0;
    foc = 0;
    qtyflag = 0;
    rateflg = 0;
    Creditflag = 0;

    $('#mltrcurrlength').val(0);
    $("#panel1").hide();
    $('#txtduedate').css("background-color", 'white');
    $('#txttaxpercent0').css("background-color", 'white');
    //$('#txtamnt0').css("background-color", 'white');
    $('.form-control,.btn-outline-primary').prop("disabled", false);
    $('#txtBillSlNo').prop("disabled", true);
    $('#txtduedate').prop("disabled", true);
    $('#txttaxpercent0').prop("disabled", true);
    $('#txtamnt0').prop("disabled", true);

    $('.jsgrid').prop("disabled", false);
    // $('#tour1').fadeOut();

    productpopuprefresh();
    hidepopup(1);

    Tbldelete();
    copyrefresh();

    $('#custlsp').hide();
    $('#btnprvs').prop("disabled", true);
    $('#btnnxt').prop("disabled", true);

    $('#select_crncy').val(BaseCurrency);
    $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));

    $('#RowGet1').val(0);
    $('#RowGet').val(0);
    $('#RowGet2').val(0);
    $('#RowGet3').val(0);
    $('#RowGet3qt').val(0);
    $('#RowGet4').val(0);
    $('#RowGet5').val(0);
    $('#RowGet6').val(0);
    $('#RowGet7').val(0);
    $('#RowGet8').val(0);
    $('#RowGet9').val(0);
    $('#RowGet10').val(0);
    $('#RowGet11').val(0);
    $('#RowGet12').val(0);
    $('#RowGetprdt').val(0);
    $('#temptxtproduct0').val('');

    CloseEnquiry();

    $('#editheader').show();
    $('#select_locn').val(UserLocationId);
    $('#select_location0').val(UserLocationId);
    $('#locn_job').val(UserLocationId);
    $('#select_place').val(DefaultArea);

    $('#TotalAvgCost').val(0);
    $('#LineAvgCost0').val(0);
    $('#savedbillno').val('');


    $('#AvgCost0').val(0);
    $('#TotalDiscount,#TotalTaxable,#TotalTax').prop("disabled", true);
    eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';
    splittaxid = ""; splittaxbleat = ""; splittaxat = "";
    $('#btnprint').hide(); $('#btnsubmit').show(); $('#btnlist').show();
    $('#btncustomprint').hide();
    ProductFlag1 = 0;
    removetblrow();
    // $('#select_location0').prop('disabled', 'true');
    $('#txtduedate').val(CurDate);
    $("#btndelete").hide();

    $('#btnedit').hide();
    $('#btnsaveedit').hide();
    $("#btnwrk").hide();

    $('.footertable').prop("disabled", true);
    $('#TotRoundOff').prop("disabled", true);
    $('#Discountpercent').val();
    $('#Discountpercent,#TotalProducts,#TotalPdtQty').prop("disabled", true);
    $('#HiddenTotal').val(0);
    TaxClear();
    $('#roundoffstatus').prop("checked", true);
    $('#roundoffstatus').prop("disabled", false);
    $("#txtotp,#otpremarks").val('');
    $("#cancelotp,#cancelotpremarks").val('');
    totalproducts();
    closepopupprdtlist(1);
    // $("#EditId").val(0);
    editflag = 0;
    //  }
    cleargridids();
    closewarningdesc();
    $('#select_payterms').val(1);
    loadcust();
    $('#status_type').prop("checked", false);
    closeautomobile();
    clearrow(1);
}

//Temporary Sales Delete
function TemporarySalesDelete() {
    var data = {};
    data.BillSeriesId = $('#txtBillseriesId').val();
    data.BillSlNo = $('#txtBillSlNo').val();
    data.UserId = ERPUserId;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/TemporarySalesDelete",
        data: data,
        success: function (result) {
        }
    });

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

function Defaultfocus() {
    if ($('#areadiv').is(":visible")) {
        $('#select_areagroup').focus();
    }
    else if ($('#bouncediv').is(":visible")) {
        $('#BounceCustomer').focus();
    }
    else if (!($('#confirm').is(":visible"))) {
        $('#txtcustomer').focus();
        if (copyflag == 1) {
            Tbldelete();
            copyrefresh();
            $('#txtBillSlNocopy').select();
            $('#txtBillSlNocopy').focus();
        }
    }

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

    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#TotalDiscount').val(TotalDiscount.toFixed(Decimal));
    $('#TotalTax').val(TotalTax.toFixed(Decimal));
    $('#TotalTaxable').val(TotalTaxable.toFixed(Decimal));
    $('#CheckForDiscount').val(TotalTaxable.toFixed(Decimal));
    $('#TotalAvgCost').val(LineAverage.toFixed(Decimal));
    $('#gndtotal').text(GrandTotal.toFixed(Decimal));

    fccalculation(Id);


}



function roundoffcalc() {
    CalcGrandTotal(i);
    CalcDiscountSplitTax1();

    var gamt = 0; var roundgndtotal = 0; var gntamt = 0; var fgamt = 0; var fcgntamt = 0; var roundfcgndtotal = 0; var GTotal = 0; var GFcTotal = 0;

    gamt = parseFloat($('#FcGrandTotal').val() || 0);
    gntamt = Math.round(gamt);
    roundgndtotal = (gntamt - $('#FcGrandTotal').val()).toFixed(Decimal);

    fgamt = parseFloat($('#GrandTotal').val() || 0);
    fcgntamt = Math.round(fgamt);
    roundfcgndtotal = (fcgntamt - $('#GrandTotal').val()).toFixed(Decimal);

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


//Calculate Each Row Total Amount FC
function fccalculation(id) {
    var fc = parseFloat($('#txtcrncyrate').val()).toFixed(Decimal);
    fc = isNaN(fc) ? 0 : fc;

    var fcgrandtotal = 0;
    var fctotdisc = 0;
    var fctottaxable = 0;
    var fctottax = 0;
    var BillDisc = 0;

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
    BillDisc = parseFloat($('#disc').val() || 0);
    BillDisc = BillDisc * fc;

    fctotdisc = parseFloat($('#TotalDiscount').val()) * fc;
    fctottaxable = parseFloat($('#TotalTaxable').val()) * fc;
    fctottax = parseFloat($('#TotalTax').val()) * fc;

    $('#fcdisc').val(BillDisc.toFixed(Decimal));
    $('#FcTotalDiscount').val(fctotdisc.toFixed(Decimal));
    $('#FcTotalTaxable').val(fctottaxable.toFixed(Decimal));
    $('#FcTotalTax').val(fctottax.toFixed(Decimal));
    $('#FcGrandTotal').val(fcgrandtotal.toFixed(Decimal));


}

//Calculate Each Row Total Amount
function amountcalculation(id) {
    var fc = $('#txtcrncyrate').val();
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

    }
    roundoffcalc();
}

//Clear Product Row After Adding
function clearrow(flg) {
    $('#TransPrdtId0').val(0);
    $('#PrdtId0').val('');
    $('#MRP0').val('');
    $('#Otherdescription0').val('');
    $('#txtproduct0').val('');
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_unit0').val(0);
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#txttaxpercent0').val('');
    $("#PopUpDetailbin").val('');

    $('#select_location0').val($('#select_locn').val());
    $('#AvgCost0').val('');
    $('#ProductDesc0').val('');

    if (flg == 0)
        $('#txtproduct0').focus();

    $('#descpopup').text('');
    $('#popupdesc').hide();
}


var qtyflag = 0;
var foc = 0;


function Creditcheck(flg) {

    $('#creditmsg').text('');
    var gtot = 0;
    if (flg == 1) {
        gtot = parseFloat($('#txtamnt0').val()) + parseFloat($('#GrandTotal').val());

        if ((parseFloat($('#txtcreditlimit').val()) > 0) && (parseFloat(gtot) > parseFloat($('#txtcreditlimit').val()))) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else if (flg == 2) {

        gtot = $('#GrandTotal').val();
        if ((parseFloat($('#txtcreditlimit').val()) > 0) && (parseFloat(gtot) > parseFloat($('#txtcreditlimit').val()))) {
            return 1;
        }
        else {
            return 0;
        }
    }

}



var Creditflag = 0;
//Add Product Details To Product Grid
function productaddconfirm() {


    var a = parseFloat($('#txtdiscount0').val());
    var c = parseFloat($('#txtrate0').val());
    $("#txtdiscount0").val(isNaN(a) ? 0 : a);
    $('#txtrate0').val(isNaN(c) ? 0 : c);
    var rowcount = CountRows();
    var ProductFlag = 0;
    var pdtsumqty = 0;
    var pdtsumqty1 = 0;
    for (var g = 1; g <= i; g++) {
        if (($('#PrdtId' + g).val() == $("#PrdtId0").val()) && ($('#select_location' + g).val() == $("#select_location0").val()) && ($('#txtquantity' + g).attr('name') == 'prdaddqty')) {
            pdtsumqty = parseInt(pdtsumqty) + parseInt($("#txtquantity" + g).val());
            pdtsumqty1 = parseInt(pdtsumqty);
        }
    }
    //for (var p = 1; p <= i; p++) {
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

    else if (($("#PrdtId0").val() != 0) && (qtyflag == 1) && (Negativebill == 'NO') && ($("#select_locn").find("option:selected").attr("name") == 0)) {
        warningshow('Not enough stock!', 'txtproduct0');
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
    else if ($("#txtquantity0").val() > (parseInt($('#txtstocktotloseqty0').val()) - pdtsumqty1) && (Negativebill == 'NO') && ($("#select_locn").find("option:selected").attr("name") == 0)) {
        warningshow('Available Quantity is ' + (parseInt($('#txtstocktotloseqty0').val()) - pdtsumqty1), 'txtquantity0');
        $('#txtquantity0').select();
    }
    else if ($("#txtrate0").val() == '') {
        warningshow('Please Enter The Rate', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ((parseFloat($("#txtrate0").val()) < parseFloat($('#AvgCost0').val())) && (BelowCost == 'NO')) {
        warningshow('Rate must be greater than' + $('#AvgCost0').val(), 'txtrate0');
        $('#txtrate0').select();
    }
    else if (foc == 0 && ($("#txtamnt0").val() == 0)) {

        warningshow('Amount cant be 0', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ($("#txtamnt0").val() < 0) {

        warningshow('Amount cant be Negative', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ($("#select_tax0").val() == 0 || $("#select_tax0").val() == null) {
        warningshow('Please select Tax', 'select_tax0');
    }

    else if (Creditcheck(1) == 1 && Creditflag == 0) {
        if (rowcount == 0)
            i = 1;

        $('#promptdiv').show();
        $('#promptflag').val('credit'); $('#promptRowId').val(0);
        $('#promptmessage').append('Credit Limit Of ' + parseFloat($('#txtcreditlimit').val() || 0) + ' Exceeded.</br>Enter OTP Continue!');
        $('#promptdata').focus();


        //var Res = prompt('Credit Limit Of ' + parseFloat($('#txtcreditlimit').val() || 0) + ' Exceeded.Enter OTP Continue!');
        //if (Res != null)
        //{
        //    var status1;
        //    var data = {};
        //    data.UserId = ERPUserId;
        //    data.OTP = Res;
        //    data.Remarks = ''; 
        //    data.Operation = 'Sales Invoice- OTP - CreditLimit Exceed'; 
        //    data.DeptId = ERPDeptId;
        //    $.ajax({
        //        type: "POST",
        //        url: "../Home/OTPCheckforUser",
        //        data: data,
        //        success: function (result) {                      
        //            status1 = result.oList[0].Status;
        //            if (status1 != 1) {                         
        //                Creditflag = 0;
        //                warningshow('Invalid OTP');
        //            }
        //            else
        //            {
        //                if (rowcount == 0)
        //                    i = 1;
        //                productadd();
        //                Creditflag = 1;                            
        //            }
        //        }
        //    });               
        //}
        //else if (Res == "null" || Res == null || Res == "") 
        //{

        //    Creditflag = 0;
        //}
    }
    else {
        if (rowcount == 0)
            i = 1;
        productadd();
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    roundoffcalc();
    totalproducts();
    cleargridids();
    closewarningdesc();

}

function productadd() {

    var a = parseFloat($('#txtdiscount0').val());
    var c = parseFloat($('#txtrate0').val());
    $("#txtdiscount0").val(isNaN(a) ? 0 : a);
    $('#txtrate0').val(isNaN(c) ? 0 : c);
    var rowcount = CountRows();
    var ProductFlag = 0;
    var pdtsumqty = 0;
    var pdtsumqty1 = 0;
    for (var g = 1; g <= i; g++) {
        if (($('#PrdtId' + g).val() == $("#PrdtId0").val()) && ($('#select_location' + g).val() == $("#select_location0").val()) && ($('#txtquantity' + g).attr('name') == 'prdaddqty')) {
            pdtsumqty = parseInt(pdtsumqty) + parseInt($("#txtquantity" + g).val());
            pdtsumqty1 = parseInt(pdtsumqty);
        }
    }

    var rowcount = CountRows();
    $('#Warningpopup').fadeOut();
    amountcalculation(0);
    var slno = rowcount + 1;
    var id = parseInt(i);
    var desc = $("#ProductDesc0").val();
    var j = 0, strLength = desc.length;
    for (j; j < strLength; j++) {
        desc = desc.replace(" ", "@%@");
    }

    var code = $("#txtproduct0").val();
    var k = 0, strLength1 = code.length;
    for (k; k < strLength1; k++) {
        code = code.replace(" ", "@%@");
    }

    var bins = '';
    if ($("#PopUpDetailbin").text() != '')
        bins = $("#PopUpDetailbin").text();

    var ProdRow1 = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + $("#PrdtId0").val() + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")'  id=" + 'row' + id + " class='jsgrid-row'>" +
        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' style='width:10px type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:4%;text-align:center'>" + slno + "</td>" +
        "<td class='jsgrid-cell jsgrid-align-right' style='width:20%;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $("#PrdtId0").val() + "' /><input type='text' style='display:none;height:30px' id=" + 'Otherdescription' + id + " value='" + $("#Otherdescription0").val() + "'><input type='text' style='display:none;height:30px' id=" + 'MRP' + id + " value='" + $("#MRP0").val() + "'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#txtproduct0").val() + "' data-toggle='tooltip' title='" + $("#txtproduct0").val() + "'></td>" +
        "<td class='jsgrid-cell jsgrid-align-right' style='width:25%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $("#ProductDesc0").val() + "' data-toggle='tooltip' title='" + $("#ProductDesc0").val() + "'></td>" +
        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
         "<td class='jsgrid-cell jsgrid-align-center' style='width:40px;display:none'><select style='background-color:white;height:30px' id=" + 'select_location' + id + " class='form-control' onchange ='Locationqtycheckmain(" + id + ")' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
        "<td class='jsgrid-cell jsgrid-align-center' style='width:8%'><input type='text' name='prdaddqty' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#txtquantity0').val()) + " style='background-color:white;height:30px' onkeyup='checkqty(" + id + "),amountcalculation(" + id + ")' onkeydown=Focusnextgrid(event,'q'," + id + ") onkeypress=isNumberInt(event,this) onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
        "<td class='jsgrid-cell jsgrid-align-center' style='width:8%;'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#txtfcrate0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate0').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onblur=checkrate(" + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:8%'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#txtfcdiscount0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#txtdiscount0').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px;display:none'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#txtfctaxableamnt0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxableamnt0').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
        "<td class='jsgrid-cell jsgrid-align-center' style='width:38px;display:none'><select style='background-color:white;height:30px;display:none' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px;display:none'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + ($('#txttaxpercent0').val() || 0) + " onkeyup='amountcalculation(" + id + ")'></td>" +
        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#txtfctaxamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttaxamnt0').val()).toFixed(Decimal) + " disabled=''></td>" +
        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center;display:none' style='width:8%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#txtfcamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#txtamnt0').val() + "></td>" +
        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'LineAvgCost' + id + " value=" + parseFloat($('#LineAvgCost0').val()).toFixed(Decimal) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#AvgCost0').val()).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
        "<td style='display:none' id=" + 'Bin' + id + ">" + bins + "</td>" +
        "</tr>";

    $('#tblsalesinvoice').append(ProdRow1);
    $('#select_unit' + id).val($('#select_unit0').val());
    $('#select_tax' + id).val($('#select_tax0').val());
    $('#select_location' + id).val($('#select_location0').val());




    var n = ProdIdArray.includes($("#PrdtId0").val());
    if (n != true) {
        ProdIdArray.push($("#PrdtId0").val());
    }

    var m = autoProdIdArray.includes($("#PrdtId0").val());
    if (n != true) {
        autoProdIdArray.push($("#PrdtId0").val());
    }

    if (parseFloat($('#txtdiscount' + slno).val()) > 0) {
        $('#disc').prop("disabled", true);
        $('#disc').val('0.00');
        $('#Discountpercent').val('');
        BillDiscountFlag = 1;
    }

    TemporarySalessave();

    i++;
    clearrow(0);
    $('#disc').val('0.00');
    $('#Discountpercent').val('');

    TaxClear();
    for (var d = 1; d <= i; d++) {
        TaxSplit(d);
    }

    //  productpopuprefresh();
    hidepopup(1);
    CalcGrandTotal(i);
    fccalculation(i);
    $('#temptxtproduct0').val('');
}

function PromptboxResult(Result, status, rowid, data1, data2) {
    if (Result == 'true' && status == 'credit') {                               //Creditlimit check during Product Add
        if (data1 == '')
            warningshow('Please Enter OTP', 'promptdata');
        else if (data2 == '')
            warningshow('Please Enter Remarks', 'promptdata1');
        else {

            var status1;
            var data = {};
            data.UserId = ERPUserId;
            data.OTP = data1;
            data.Remarks = data2;
            data.Operation = 'Sales Invoice- OTP - CreditLimit Exceed';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../Home/OTPCheckforUser",
                data: data,
                success: function (result) {
                    status1 = result.oList[0].Status;
                    if (status1 != 1) {
                        Creditflag = 0;
                        warningshow('Invalid OTP', 'promptdata');
                        $('#promptdata').select();
                    }
                    else {
                        productadd();
                        Creditflag = 1;
                        promptclear(1);
                    }
                }
            });

        }
    }
    else if (Result == 'true' && status == 'savebill')                              //Creditlimit check during Bill Save
    {
        if (data1 == '')
            warningshow('Please Enter OTP', 'promptdata');
        else if (data2 == '')
            warningshow('Please Enter Remarks', 'promptdata1');
        else {
            var status1;
            var data = {};
            data.UserId = ERPUserId;
            data.OTP = data1;
            data.Remarks = data2;
            data.Operation = 'Sales Invoice- OTP - CreditLimit Exceed';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../Home/OTPCheckforUser",
                data: data,
                success: function (result) {
                    status1 = result.oList[0].Status;
                    if (status1 != 1) {
                        Creditflag = 0;
                        warningshow('Invalid OTP', 'promptdata');
                        $('#promptdata').select();
                    }
                    else {
                        Creditflag = 1;
                        promptclear(1);
                        $('#confirm').show();
                        $('#confirmOk').focus();
                        $('#Confirmflag').val('save'); $('#ConfirmRowId').val(0);
                        $('#confirmmessage').text('Do You Want To Save The Bill?');
                    }
                }
            });
        }
    }
    else if (Result == 'true' && status == 'updatebill')                              //Creditlimit check during Bill Update
    {
        if (data1 == '')
            warningshow('Please Enter OTP', 'promptdata');
        else if (data2 == '')
            warningshow('Please Enter Remarks', 'promptdata1');
        else {
            var status1;
            var data = {};
            data.UserId = ERPUserId;
            data.OTP = data1;
            data.Remarks = data2;
            data.Operation = 'Sales Invoice- OTP - CreditLimit Exceed';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../Home/OTPCheckforUser",
                data: data,
                success: function (result) {
                    status1 = result.oList[0].Status;
                    if (status1 != 1) {
                        Creditflag = 0;
                        warningshow('Invalid OTP', 'promptdata');
                        $('#promptdata').select();
                    }
                    else {
                        Creditflag = 1;
                        promptclear(1);
                        $('#confirm').show();
                        $('#confirmOk').focus();
                        $('#Confirmflag').val('update'); $('#ConfirmRowId').val(0);
                        $('#confirmmessage').text('Do You Want To Update The Bill?');
                    }
                }
            });
        }
    }
    else if (Result == 'false') {
        Creditflag = 0;
        promptclear(1);
    }
}

function promptclear(flg) {
    if (flg == 1) {
        $('#promptflag').val(''); $('#promptRowId').val(0);
        $('#promptmessage').text('');
        $('#promptdata1').val('');
        $('#txtproduct0').focus();
        $('#txtproduct0').select();
    }
    $('#promptdata').val('');
    $('#promptdiv').hide();
}

function getcreditlimit() {
    var data = {};
    data.CustId = $('#txtCustId').val();
    data.cstyp = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CustomerGetandGets",
        data: data,
        success: function (result) {
            $('#txtcreditlimit').val(result.oList[0].CreditLimit);
        }
    });
}

//Clear Fields for Transaction From Product Grid 
function cleargridids() {
    $('#HiddenGridItemId').val('0')
    $('#HiddenGridDesc').val('')
    $('#HiddenGridItem').val('')

}


//find total products and quantity in productgrid
function totalproducts() {
    var ln = $('#tblsalesinvoice tr').length;
    var totqty = 0;
    $('#TotalProducts').val('');
    $('#TotalPdtQty').val('');
    for (var p = 1; p <= i; p++) {
        totqty = totqty + parseFloat($('#txtquantity' + p).val() || 0);
    }
    $('#TotalProducts').val(ln);
    $('#TotalPdtQty').val(totqty);
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

//--------------------Billwise discount Calculation------------------
function CalcDiscountSplitTax1() {
    if ($('#tblsalesinvoice tr').length > 0) {
        if (parseFloat($('#disc').val() || 0) > 0) {
            var Totalamt = parseFloat($('#HiddenTotal').val() || 0);
            var DisAMt = parseFloat($('#disc').val() || 0);
            var NetAMT = parseFloat(Totalamt - DisAMt);
            NetAMT = NetAMT.toFixed(Decimal);

            var Dispers = parseFloat((100 * DisAMt) / Totalamt) || 0;
            $('#Discountpercent').val(Dispers.toFixed(Decimal));
            billwisediscount(NetAMT, Dispers);

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
        //var Taxamt = parseFloat(DefSpliTaxable * TaxId) / 100;
        //Taxamt = Taxamt.toFixed(Decimal);

        $('#splittaxable_' + TaxId).val(DefSpliTaxable);
        $('#splittax_' + TaxId).val(DefSpliTax);
    }
}

function billwisediscount(TotalTaxable, Dispers) {

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
    GrandTotal = parseFloat(TotalTaxable) + parseFloat(TotalTax);

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

    //  $('#gndtotal').text(FCAmount.toFixed(Decimal));

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
        //else if ($('#unit_job').val() == 0) {
        //    warningshow('Please Select Unit', 'unit_job');
        //    return false;
        //}
    else if ($.trim($('#quantity_job').val()) == '' || $.trim($('#quantity_job').val()) == 0) {
        warningshow('Please Enter Quantity', 'quantity_job');
        return false;
    }
        //else if ($.trim($('#txtrate_job').val()) == '') {
        //    warningshow('Please Enter Rate', 'txtrate_job');
        //    return false;
        //}
    else if ($('#discount_job').val() > 100) {
        warningshow('Discount Limit Exceeded', 'discount_job');
        return false;
    }
    else if ($('#tax_job').val() == 0) {
        warningshow('Please select Tax', 'tax_job');
        return false;
    }
    else if (a > b) {
        warningshow('Amount Cannot be Negative', 'txtrate_job');
        return false;
    }
        //else if (foc == 0 && ($("#amount_job").val() == 0)) {

        //    warningshow('Amount cant be 0', 'txtrate_job');
        //}
    else {
        var no = $('#tblsalesinvoice tr').length + 1;

        if ($('#tblsalesinvoice tr').length == 0)
            i = 1;
        var id = parseInt(i);

        $('#disc').val('0.00');
        $('#Discountpercent').val('');


        var prodjob = "<tr onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + no + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='0' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#productjob").val() + "' data-toggle='tooltip' title='" + $("#productjob").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='JOB' data-toggle='tooltip' title='JOB'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select  id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select style='background-color:white;height:30px'  id=" + 'select_location' + id + " class='form-control' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#quantity_job').val() || 0) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeydown=Focusnextgrid(event,'q'," + id + ") onkeypress=isNumberInt(event,this) onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#fcamount_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text'  class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate_job').val() || 0).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onblur=checkrate(" + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#fctxtdisc_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text'  id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#discount_job').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#fctxttaxable_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxable_job').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' ></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px'  id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value='" + $('#taxpercentage_job').val() + "' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#fctxttax_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttax_job').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#fctxtsubtotal_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#amount_job').val() + "></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value='0.00' style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value='0.00' style='background-color:white;height:30px'></td>" +
            "</tr>";


        $('#tblsalesinvoice').append(prodjob);

        $('#select_unit' + id).val($('#unit_job').val());
        $('#select_tax' + id).val($('#tax_job').val());
        $('#select_location' + id).val($('#locn_job').val());
        $('#txtunit_' + id).val($('#txtunit_job').val());
        TaxSplit(id);
        i++;
        clearrow(0);
        jobpopuprefresh();
        $('#product_0').val('');
        CalcGrandTotal(i);
        CalcDiscountSplitTax1();

        if (parseFloat($('#txtdiscount' + id).val()) > 0) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
            $('#Discountpercent').val('');
            BillDiscountFlag = 1;
        }
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    roundoffcalc();
    totalproducts();
    TemporarySalessave();
}

//Calculate Job Total
function CalcJobAmount() {
    var fc = $('#txtcrncyrate').val();
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


        //   $('#EditId').val(id);  

        //  editflag = editflag + 1;
        CalCDefTaxSplit();
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
        $('#select_unit' + id).focus();
        $('#select_location' + id).prop('disabled', false);

        $('#disc').val('0.00');
        $('#Discountpercent').val('');

        TaxClear();
        for (var d = 1; d <= i; d++) {
            TaxSplit(d);
        }
        CalcGrandTotal(i);
        roundoffcalc();
    }
    else {
        warningshow('Update Edit Mode Row First');
    }

}

//Edit Cancel
function editcancel(id) {


    // editflag--;
    //   $('#EditId').val(0);
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

    $('#disc').val('0.00');
    $('#Discountpercent').val('');

    TaxClear();
    for (var d = 1; d <= i; d++) {
        TaxSplit(d);
    }
    roundoffcalc();
    totalproducts();
}

var splittaxid = "";
var splittaxbleat = "";
var splittaxat = "";
//Update Function
function updaterow(id) {

    var a = parseFloat($('#txtdiscount' + id).val());
    var c = parseFloat($('#txtrate' + id).val());

    var b = parseFloat($('#txtquantity' + id).val());

    $("#txtdiscount" + id).val(isNaN(a) ? 0 : a);
    $('#txtrate' + id).val(isNaN(c) ? 0 : c);
    if (($('#txtquantity' + id).val() == '')) {
        warningshow('Please Enter Quantity', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        editflag = 1;
        return false;

    }
    else if (($('#txtquantity' + id).val() == 0)) {
        warningshow('Quantity can not be Zero', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        editflag = 1;
        return false;

    }
    else if (($('#txtrate' + id).val() == '')) {
        warningshow('Please Enter the Rate', 'txtrate' + id);
        editflag = 1;
        return false;

    }
    else if ($("#txtdiscount" + id).val() > (c * b)) {
        warningshow('Discount Must Be Less Than ' + (c * b), 'txtdiscount' + id);
        $('#txtdiscount' + id).select();
        editflag = 1;
        return false;

    }
    else if ($("#txtamnt" + id).val() < 0) {
        warningshow('Amount Cant be negative', 'txtrate' + id);
        $('#txtrate' + id).select();
        editflag = 1;
        return false;

    }
    else if (foc == 0 && ($("#txtamnt" + id).val() == 0)) {
        warningshow('Amount Cant be Zero', 'txtrate' + id);
        $('#txtrate' + id).select();
        editflag = 1;
        return false;

    }
    else if ((BelowCost == 'NO') && ($('#PrdtId' + id).val() != 0) && ($('#AvgCost' + id).val() != 0) && (parseFloat($('#txtrate' + id).val()) < parseFloat($('#AvgCost' + id).val()))) {
        warningshow('Rate must be greater than ' + $('#AvgCost' + id).val());
        $('#txtrate' + id).select();
        editflag = 1;
        return false;

    }
    else if ($("#select_tax" + id).val() == 0) {
        warningshow('Please Select Tax', 'select_tax' + id);
        editflag = 1;
        return false;

    }
    else if ($("#select_location" + id).val() == 0) {
        warningshow('Please Select Location', 'select_location' + id);
        editflag = 1;
        return false;

    }
    else if (checkqty(id) != false) {

        BillDiscountFlag = 0;
        for (var j = 1; j < i; j++) {
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
        //  editflag--;
        //  $('#EditId').val(0);
        var ratenum = parseFloat($("#txtrate" + id).val() || 0);
        $("#txtrate" + id).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#txtdiscount" + id).val() || 0);
        $("#txtdiscount" + id).val(disnum.toFixed(Decimal));
        $('#row' + id).children('td,th').css('background-color', 'white');
        $('#col14_' + id).hide();
        $('#col13_' + id).show();
        $('#editcancelheader').hide();
        $('#editheader').show();
        //$('#txtproduct' + id).prop('disabled', true);
        //$('#select_unit' + id).prop('disabled', true);
        //$('#txtquantity' + id).prop('disabled', true);
        //$('#txtrate' + id).prop('disabled', true);
        //$('#txtdiscount' + id).prop('disabled', true);
        //$('#select_tax' + id).prop('disabled', true);
        //$('#select_location' + id).prop('disabled', true);
        //$('#select_location' + id).prop('disabled', true);

        //$('#txtproduct0').focus();
        CalcGrandTotal(i);

        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = ''; elocn = '';

        TaxSplitupdate(splittaxid, splittaxbleat, splittaxat, id);
        $('#disc').val('0.00');
        $('#Discountpercent').val('');
        TaxClear();
        for (var d = 1; d <= i; d++) {
            TaxSplit(d);
        }
        splittaxid = "";
        splittaxbleat = "";
        splittaxat = "";
        $('#Warningpopup').fadeOut();
        roundoffcalc();
        totalproducts();
        editflag = 0;
        TemporarySalessave();

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
    $('#select_payterms').val(1);
    loadcust();
    $('#select_transfer').val(0);
    $('#txtcustomer').val('');
    $('#select_terms').val(0);
    $('#txtduedate').val('');
    $('#txtaddress').val('');
    $('#adr1').val('');
    $('#adr2').val('');
    $('#adr3').val('');
    $('#Trnno').val('');
    $('#txtcreditlimit').val('');
    $('#PhoneNo').val('');
    $('#PriceGroupId').val(0);
    $('#select_locn').val(0);
    $('#select_salesman').val(UserSalesmanId);
    $('#select_place').val(DefaultArea);
    $('#select_crncy').val(BaseCurrency);
    $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
    $('#select_jobno').val('');
    $('#txtproduct0').val('');
    $('#select_locn').val(UserLocationId);
    $('#select_location0').val(UserLocationId);
    $('#select_unit0').val(0);
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#txtlpono').val('');

    $('#TotalDiscount').val('0.00');
    $('#TotalTaxable').val('0.00');
    $('#CheckForDiscount').val(0);
    $('#TotalTax').val('0.00');
    $('#GrandTotal').val('0.00');
    $('#disc').val('0.00');
    $('#Discountpercent').val('');
    $('#fcdisc').val('');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');

    TaxClear();
    Creditflag = 0;
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
    var rowslno = parseInt(slno);
    if ($('#tblsalesinvoice tr').length == 0) {
        BillDiscountFlag = 0;
    }
    var splittaxable = parseFloat($('#txttaxableamnt' + RowId).val());
    var splittax = parseFloat($('#txttaxamnt' + RowId).val());
    var splittaxid = $('#txttaxpercent' + RowId).val();

    $('#row' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#txtproduct' + j).val() != undefined) {
            $('#td' + j).text(slno);
            slno++;
            if (parseFloat($('#txtdiscount' + j).val()) != 0) {
                BillDiscountFlag = 1;
            }
            else {
                BillDiscountFlag = 0;
            }
        }
    }


    if (BillDiscountFlag == 0) {
        $('#disc').prop("disabled", false);
        $('#disc').val('0.00');
        $('#Discountpercent').val('');
    }
    $('#txtproduct0').focus();
    TaxSplitDelete(splittaxid, splittaxable, splittax);

    $('#disc').val('0.00');
    $('#Discountpercent').val('');
    TaxClear();
    for (var d = 1; d <= i; d++) {
        TaxSplit(d);
    }
    CalcGrandTotal(i);
    roundoffcalc();
    totalproducts();
    cleargridids();
    if ($('#tblsalesinvoice tr').length == 0) {
        BillDiscountFlag = 0;

    }
    else
        TemporarySalessave();


}

// Confirm box
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'delete') {
        rowdeleteconfirm(rowid);
    }
    else if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'copy') {
        SalesCopy();
    }
    else if (Result == 'true' && status == 'billcancel') {
        $('#CancelOTPDiv').show();
        $('#cancelotp,#cancelotpremarks').prop('disabled', false);
        $('#cancelotp,#cancelotpremarks').val('');
        $('#cancelotp').focus();
    }
    else if (Result == 'true' && status == 'save') {
        savesalesconfirm();
    }
    else if (Result == 'true' && status == 'update') {
        updateconfirm();
    }
    else if (Result == 'true' && status == 'loadprevdata') {
        //FillPrevoiusUnsavedProduct(Fillitem);
    }
    else if (Result == 'false' && status == 'loadprevdata') {
        Fillitem = '';
        $('#txtcustomer').focus();
        $('#txtcustomer').select();
    }


    $('#confirm').fadeOut();
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
        url: "../SalesInvoice/SalesInvoiceCancel",
        data: data,
        success: function (result) {
            TaxClear();
            for (var i = 0; i <= result.oList.length; i++) {
                var status = result.oList[i].Status;
                var billno = result.oList[i].BillSlNo;
                var billsrs = $('#txtBillseriesId').find("option:selected").text();
                Showalerts(status, billsrs, billno);
            }
        }
    });
}

//If value of CustomerId is empty
function checkcustomerempty() {
    if ($('#txtCustId').val() != 0) {
        $('#txtCustId').val(0);
        $('#txtaddress').val('');
        $('#adr1').val('');
        $('#adr2').val('');
        $('#adr3').val('');
        $('#Trnno').val('');
        $('#txtlpono').val('');
        $('#txtcreditlimit').val('');
        $('#PhoneNo').val('');
        $('#PriceGroupId').val(0);
        $('#select_salesman').val(UserSalesmanId);
        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        for (j = 0; j <= i; j++) {
            amountcalculation(j);
        }
        CalcGrandTotal(i);

        CalcDiscountSplitTax1();
        $('#select_place').val(0);

        $('#select_terms').val(0);
        getdate();
        roundoffcalc();
        Creditflag = 0;
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

            if ($('#PrdtId0').val() != 0)
                hidepopup(1);
            //$('#toggle').click();

            $('#TransPrdtId0').val(0);
            $('#PrdtId0').val(0);
            $('#Otherdescription0').val('');
            $('#MRP0').val('');
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
            //productpopuprefresh();
            qtyflag = 0;
            $('#tblMultiprice td').remove();
            closewarningdesc();
        }
        else {
            hidepopup(0);
        }

    }
    if ($('#txtproduct0').val() == '') {
        // productpopuprefresh();
        hidepopup(1);
    }
    else {
        hidepopup(0);
    }
}

function hidepopup(flg) {
    if (flg == 0)                 //Show Popup
    {
        if ($('#toggle').prop("checked") == false)
            $('#toggle').click();
    }
    else if (flg == 1)           //Hide Popup 
    {
        if ($('#toggle').prop("checked") == true)
            $('#toggle').click();
    }
}


//Clear CustId Customer='' in EnqSearch
function checkcusttextempty() {
    if ($('#SearchCustenq').val() == '') {
        $('#hiddencustIdenq').val('');
    }
    else {
        $('#hiddencustIdenq').val(0);
    }
}

//Clear Fields Of Enquiry Search when CustId=0
function clear() {
    disable_datatable('tblEnquiry');
    $('#SearchCustenq').val('');
    $('#hiddencustIdenq').val('');
    $('#SearchFromdateenq').val(CurDate);
    $('#SearchToDateenq').val(CurDate);
    EnqLoadCall();
}

//Clear  Enquiry Search Customer when CustId!=0
function clear1() {
    disable_datatable('tblEnquirycust');
    $('#SearchFromdateenq1').val(CurDate);
    $('#SearchToDateenq1').val(CurDate);
    EnqCustLoadCall();
}

//Clear Enquiry Search Product when CustId!=0
function clear2() {
    disable_datatable('tblEnquirypsub');
    $('#SearchProdenq').val('');
    GetenqProduct();
}

function discclr(flg) {

    if (flg == 0) {
        if ($('#disc').val() == 0) { $('#disc').val('0'); }
        $('#disc').select();
    }

    else if (flg == 1) {
        if ($('#disc').val() == '')
            $('#disc').val('0.00');
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
        $('#alertdiv').hide();
        $('#savealert').append('<b>Bill No : ' + billsrs + '-' + billsrlno + '</b><br> Saved Successfully!<br>Do you want to print this bill?');
        $('#btncnclalrt').focus();
        //swal('Bill No : ' + billsrs + '-' + billsrlno+' Saved Successfully', "Do you want to print the bill?", "success");      
        //$('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 3) {
        swal('Bill Number : ' + billsrs + '-' + billsrlno + ' not Valid', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        swal('Bill No : ' + billsrs + '-' + billsrlno, "Cancelled", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        //formrefresh();
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>Bill No : ' + billsrs + '-' + billsrlno + '</b><br> Updated Successfully!<br>Do you want to print this bill?');
        $('#btncnclalrt').focus();
    }
    else if (Status == 5) {
        swal('Bill Saving Failed.Try again!', "", "warning");
        $('.swal-button swal-button--confirm').focus();
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
            "order": [],
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

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#alertdiv1').hide();
    $('#savedbillno').val('');
}

function popupclose() {
    $('#bouncediv').hide();
    $('#orderbounce').hide();
    // clearbounce(0); 
}

var bouncelen = 1;
function clearbounce(flg) {
    $('#BounceQty').val('');
    $('#BounceItem').val('');
    $('#BounceItemId').val('0');
    $('#BounceDesc').val('');
    $('#BounceRemark').val('');
    if (flg == 1 || flg == 2)
    { $('#BounceItem').focus(); }

    else if (flg == 0) {

        $('#BounceCustomer').val('');
        $('#BounceCustId').val('0');
        bouncelen = 1;
        var rowid = $('#tblbounce tr:last').attr('id').match(/\d+/)[0];      //Get Last RowId
        for (var a = 1; a <= rowid; a++)
            $('#brow' + a).remove();
    }
}

function bouncerowdelete(RowId) {

    var row = $('#tblbounce tr:last').attr('id').match(/\d+/)[0];
    var slno = 1;
    var rowslno = parseInt(slno);
    $('#brow' + RowId).remove();
    for (var j = 1; j <= row; j++) {
        if ($('#BounceDesc' + j).val() != undefined) {
            $('#slno_' + j).text(slno);
            slno++;
        }
    }
    $('#BounceItem').focus();
}


var View = '<i class="icon-trash   font-medium-5 my-5" title="Clear"></i>';
var BEdit = '<i class="icon-note   font-medium-5 my-5" title="Edit"></i>';
var BUpdate = '<i class="icon-check   font-medium-5 my-5" title="Clear"></i>';
var BCancel = '<i class="icon-close   font-medium-5 my-5" title="Clear"></i>';


function addbounce() {

    if ($.trim($('#BounceItem').val()) == '') {
        warningshow('Please Enter the Name', 'BounceItem');
    }
    else {
        var slno;
        if ($('#tblbounce tr').length == 1) { bouncelen = 1; slno = 1; }
        else { slno = parseInt($('#tblbounce tr').length); }


        var bounce =
       "<tr id='brow" + bouncelen + "' class='' style=height:30px>" +
       "<td class='text-center' style='width:auto;border:1px solid #BABFC7;' id='slno_" + bouncelen + "'>" + slno + "</td>" +
       "<td class='text-center' style='width:auto;border:1px solid #BABFC7;' id='BounceItem" + bouncelen + "'>" + $('#BounceItem').val() + " <input id='BounceItemId" + bouncelen + "' type=hidden value=" + ($('#BounceItemId').val() || 0) + "></td>" +
       "<td class='text-center' style='width:auto;border:1px solid #BABFC7;' id='BounceDesc" + bouncelen + "'>" + $('#BounceDesc').val() + "</td>" +
       "<td class='text-center' style='width:auto;border:1px solid #BABFC7;' ><input id='BounceRemark" + bouncelen + "' disabled type=text class=form-control value=" + $('#BounceRemark').val() + " ></td>" +
       "<td class='text-center' style='width:auto;border:1px solid #BABFC7;' > <input id='BounceQty" + bouncelen + "' type=text class=form-control value=" + ($('#BounceQty').val() || 0) + " disabled>  </td>" +
       "<td id='beditrow" + bouncelen + "' class='text-center warning' style='width:8%;border:1px solid #BABFC7;'> <a onclick=bouncerowdelete(" + bouncelen + ")>" + View + "</a>  <a onclick=bouncerowedit(" + bouncelen + ")>" + BEdit + "</a></td>" +
       "<td id='bupdaterow" + bouncelen + "' class='text-center warning' style='width:8%;border:1px solid #BABFC7;display:none' > <a onclick=bouncerowupdate(" + bouncelen + ")>" + BUpdate + "</a>  <a onclick=bouncerowcancel(" + bouncelen + ")>" + BCancel + "</a></td>" +
       "</tr>";
        $('#tblbounce').append(bounce);
        slno++;
        bouncelen++;
        clearbounce(2);

    }

    $('#openingdiv').animate({ scrollTop: 5000 }, 900);

}

var brqty = ''; var brrmrk = ''; var beditflg = 0;
function bouncerowedit(id) {
    if (beditflg == 0) {
        $('#beditrow' + id).hide();
        $('#bupdaterow' + id).show();
        $('#BounceRemark' + id).prop("disabled", false);
        $('#BounceQty' + id).prop("disabled", false);

        brrmrk = $('#BounceRemark' + id).val();
        brqty = $('#BounceQty' + id).val();

        $('#BounceRemark' + id).focus();
        beditflg++;
    }
    else {
        warningshow('Please Update Eit Row');
    }
}
function bouncerowupdate(id) {
    $('#beditrow' + id).show();
    $('#bupdaterow' + id).hide();

    $('#BounceRemark' + id).prop("disabled", true);
    $('#BounceQty' + id).prop("disabled", true);

    $('#BounceQty' + id).val(parseInt($('#BounceQty' + id).val()) || 0);


    $('#BounceItem').focus();

    brqty = ''; brrmrk = '';
    beditflg--;
}
function bouncerowcancel(id) {
    $('#beditrow' + id).show();
    $('#bupdaterow' + id).hide();

    $('#BounceRemark' + id).val(brrmrk);
    $('#BounceQty' + id).val(parseInt(brqty));

    $('#BounceRemark' + id).prop("disabled", true);
    $('#BounceQty' + id).prop("disabled", true);
    $('#BounceItem').focus();

    brqty = ''; brrmrk = '';
    beditflg--;
}

function saveOrderBouncing() {
    //if ($.trim($('#BounceCustomer').val()) == '') {
    //    warningshow('Please Enter the Cutomer Name', 'BounceCustomer');
    //}
    //else 
    if (beditflg != 0) {
        warningshow('Please Update Eit Row');
    }
    else if ($("#tblbounce tr").length == 1) {
        warningshow('Please Enter A Product', 'BounceItem')
    }
    else {

        $('#btnsubmitbounce').prop('disabled', true);
        var oArray = new Array();
        for (var k = 1; k < bouncelen ; k++) {

            var ProductId = $('#BounceItemId' + k).val();
            var ProductCode = $('#BounceItem' + k).text();
            var ProductDescr = $('#BounceDesc' + k).text();
            var Remarks = $('#BounceRemark' + k).val();
            var ProdQty = $('#BounceQty' + k).val();
            var UserId = ERPUserId;
            var DeptId = ERPDeptId;
            var Location = $('#select_locn').val();
            var CustId = $('#BounceCustId').val();
            var CustName = $('#BounceCustomer').val();

            if (ProductId != undefined) {
                oArray.push({
                    'ProductId': ProductId,
                    'ProductCode': ProductCode,
                    'ProductDescr': ProductDescr,
                    'Remarks': Remarks,
                    'ProdQty': ProdQty,
                    'UserId': UserId,
                    'DeptId': DeptId,
                    'Location': Location,
                    'CustId': CustId,
                    'CustName': CustName,
                })
            }

        }
        if (oArray != "") {

            var data = { 'SalesInvoiceModel': oArray };

            $.ajax({
                type: "POST",
                url: "../SalesInvoice/OrderBouncingInsert",
                data: data,
                success: function (result) {
                    var status = result.oList[0].Status;
                    popupShowalerts(status, 1);

                    $('#btnsubmitbounce').prop('disabled', false);
                    clearbounce(0);
                }
            });
        }
    }
}





function closewarningdesc() {
    $('#popupdesc').fadeOut();
    $('#descpopup').text('');
}




function GetAlternateProducts() {
    $("#txtproduct0").blur();
    var dataX = {};
    dataX.ItemId = $("#PrdtId0").val();
    $.ajax({
        type: "POST",
        url: "../ProductMstElectroniccs/AccessoriesGetandGets",
        data: dataX,
        success: function (result) {
            if (result.oList.length >= 1) {

                DisplayAlternativeItem(result.oList);


            }
        }
    });
}




function DisplayAlternativeItem(result) {

    disable_datatable('tblalternateitem');

    $('#alternateitem,#alternateitemdiv').show();
    $('#alternateitemheader').text('Substitute Items')

    var AlternativeProducts = "<thead><tr><th>Product Code</th><th>Description</th><th>Stock</th><th>Average Cost</th><th>Add</th></tr>" +
                            "<tr><th>Product Code</th><th>Description</th><th>Stock</th><th>Average Cost</th><th> </th></tr></thead><tbody>";

    for (var j = 0; j < result.length; j++) {


        var AcId = result[j].AccessoriesId;

        var a = result[j].AccessoryCode;
        var c = 0, strLength = a.length;
        for (c; c < strLength; c++) { a = a.replace(" ", "#%#"); }

        var b = result[j].AccessoriesName;
        var k = 0, strLength1 = b.length;
        for (k; k < strLength1; k++) { b = b.replace(" ", "#%#"); }

        AlternativeProducts = AlternativeProducts + "<tr><td style=;text-allign:left'>" + result[j].AccessoryCode + "</td><td>" + result[j].AccessoriesName + "</td><td>0</td><td>" + parseFloat(0).toFixed(Decimal) + "</td><td onclick=AddtoP('" + AcId + "','" + a + "','" + b + "')>" + Addbutton + "</td></tr>";

    }
    $('#tblalternateitem').html(AlternativeProducts + "</tbody>");

    datatableWithsearch('tblalternateitem', 'Multiple');
}


function AddtoP(productid, productcode, productdesc) {
    clearrow(0);
    var a = productcode;
    var c = 0, strLength = a.length;
    for (c; c < strLength; c++) { a = a.replace("#%#", " "); }

    var b = productdesc;
    var k = 0, strLength1 = b.length;
    for (k; k < strLength1; k++) { b = b.replace("#%#", " "); }


    $('#alternateitem,#alternateitemdiv').hide();
    $('#PrdtId0').val(productid);
    $('#txtproduct0').val(a);
    $('#ProductDesc0').val(b);

    $('#AvgCost0').val(0);
    $('#txtproduct0').focus();
    $('#txtproduct0').select();
}



//--------------------ProductList for Automobiles-----(F3 key - Popup)-------------


function AutoMobileItemList() {
    if ($("#Autoitemid").val() == 0 || $("#Autoitemid").val() == '') {
        warningshow('Please Enter the Item', 'AutoItemCode');
    }
    else {

        var data = {};
        data.LocId = $("#select_locn").val();
        data.DeptId = ERPDeptId;
        data.ItemId = $("#Autoitemid").val();
        data.GrpId = $("#AutoType").val();

        $.ajax({
            type: "POST",
            url: "../SalesInvoice/AutoMobileProductDetailsSearch",
            data: data,
            success: function (result) {
                $('#AutoProductlist tr').remove();
                ShowAutoMobileProductsList(result);
            }
        });
    }

}

function ShowAutoMobileProductsList(result) {

    var sln = 1;
    var slno = parseInt(sln);
    var responseText1 = "<tr><th style='width:90px;'> <input onchange=autocheckall() type='checkbox' id='autoSlNoHeadCheckgrid0' class='form-control' style='zoom:.7;align:center'></th><th>Product</th><th>Description</th><th>Stock</th><th>Unit</th><th>Location</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th></tr>";
    $('#AutoProductlist').append(responseText1);
    if (result != 0) {

        for (var l = 0; l < result.length; l++) {
            var bins = '';
            if (result[l].Bin_A != '') { bins = result[l].Bin_A } if (result[l].Bin_B != '') { bins = bins + ' , ' + result[l].Bin_B } if (result[l].Bin_C != '') { bins = bins + ' , ' + result[l].Bin_C }
            if (result[l].Bin_D != '') { bins = bins + ' , ' + result[l].Bin_D } if (result[l].Bin_E != '') { bins = bins + ' , ' + result[l].Bin_E } if (result[l].Bin_F != '') { bins = bins + ' , ' + result[l].Bin_F }
            if (result[l].Bin_G != '') { bins = bins + ' , ' + result[l].Bin_G } if (result[l].Bin_H != '') { bins = bins + ' , ' + result[l].Bin_H }

            var responseText =
                '<tr onclick="GetPrdtId(' + result[l].ItemId + ",'" + result[l].Description + "','" + result[l].ItemCode + "'," + 4 + '),Getproddetailsauto(' + slno + ')"  id="autorow' + slno + '"><td style="width:90px;" ><input name="autoCheckprdtlist" onchange=autoclearcheck(' + slno + ') type="checkbox" id= ' + 'autoSlNoHeadCheckgrid' + slno + '  class="form-control" style="zoom:.7;align:center"></td>' +
                '<td style=display:none;><input type="text" style="display:none;" id= ' + 'autoItemIdgrid' + slno + ' value= ' + result[l].ItemId + '></td>' +
                '<td id="autocol' + slno + '">' + result[l].ItemCode + '<input type="text" style="display:none;" id= ' + 'autoItemcodegrid' + slno + ' value= ' + result[l].ItemCode + '></td>' +
                '<td id=' + 'autoItemdescgrid' + slno + '>' + result[l].Description + '</td>' +
                 '<td id=' + 'autoItemStockqty' + slno + '>' + result[l].TotQty + '</td>' +
                '<td style="text-align:center;" ><select  style="height:30px;" class=form-control id=' + 'autoItemunitgrid' + slno + ' onkeydown=autoFocusnext(event,' + slno + ',"u")>' + UnitSelect + '</select></td>' +
                 '<td style="text-align:center;" ><select  style="height:30px;" class=form-control id=' + 'autoItemLocngrid' + slno + ' onchange=autoLocationqtycheck(' + slno + ') onkeydown=autoFocusnext(event,' + slno + ',"l") >' + LocnSelect + '</select></td>' +
                '<td style="text-align:center;width:130px;" ><input type="text" style="height:30px;" class="form-control" id= ' + 'autoqtypr' + slno + ' value=' + result[l].OpeningQty + '  onkeypress=isNumberInt(event,this) onkeyup=autogridamountcalculation(' + slno + '),autocheckqtystock(' + slno + '),autoCheckme(' + slno + ') onkeydown=autoFocusnext(event,' + slno + ',"q")></td>' +
                '<td style="text-align:center;width:130px;" >' +
                '<input type="text" style="height:30px;" class="form-control" id= ' + 'autoprrate' + slno + ' value=' + result[l].SellingPrice.toFixed(Decimal) + ' onblur=autocheckratestock(' + slno + ')  onkeypress=isNumber(event,this)  onkeyup=autogridamountcalculation(' + slno + '),autoCheckme(' + slno + ') onkeydown=autoFocusnext(event,' + slno + ',"r")>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprdfcrate' + slno + '></td>' +
                '<td style="text-align:center;width:130px;">' +
                '<input type="text" style="height:30px;" class="form-control" id= ' + 'autoprdisc' + slno + ' onkeypress=isNumber(event,this)   onkeyup=autogridamountcalculation(' + slno + '),autocheckdiscount(' + slno + ') onkeydown=autoFocusnext(event,' + slno + ',"d")>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprdfcdiscount' + slno + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprdtaxableamnt' + slno + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprdfctaxableamnt' + slno + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprdtaxamnt' + slno + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprdfctaxamnt' + slno + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprdamnt' + slno + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprdfcamnt' + slno + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autopravgcost' + slno + ' value=' + result[l].AvgCost + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprLineAvgCost' + slno + '>' +
                '<input type="text" style="height:30px;display:none" class="form-control" id= ' + 'autoprStockqty' + slno + ' value=' + result[l].stocktotloseqty + '></td>' +
                '<td style="text-align:center;" ><select  style="height:30px;" class=form-control id=' + 'autoItemtaxgrid' + slno + ' onkeydown=autoFocusnext(event,' + slno + ',"t") onchange=autogridamountcalculation(' + slno + ') >' + TaxSelect + '</select></td>' +
                '<td style="display:none" id=' + 'Bina' + slno + '>' + bins + '</td>' +
               '</tr>';
            $('#AutoProductlist').append(responseText);

            $('#autoItemunitgrid' + slno).val(result[l].UnitId);
            $('#autoItemtaxgrid' + slno).val(result[l].VatId);
            $('#autoItemLocngrid' + slno).val($('#select_location0').val());

            autogridamountcalculation(slno);
            slno++;

        }
    }
    else {
        var responseText1 = "<tr><td class='text-center' colspan=10></br>No Data </td></tr>";
        $('#AutoProductlist').append(responseText1);
    }
}

function clearauto() {
    $("#Autoitemid").val(0);
    $("#AutoItemCode").val('');
    autogroup();
    $('#AutoProductlist tr td').remove();
    $("#AutoItemCode").focus();
}

function autoclearcheck(Id) {

    if (($("#autoSlNoHeadCheckgrid" + Id).prop('checked'))) {


        if (($('#autoqtypr' + Id).val() != '') && ($('#autoprrate' + Id).val() != '') && ($('#autoprdamnt' + Id).val() != 0)) {
            var a = autocheckqtystock(Id);
            if (a)
                $('#autoSlNoHeadCheckgrid' + Id).prop('checked', true);
        }
        else if (($('#autoqtypr' + Id).val() == '' || $('#autoqtypr' + Id).val() == 0)) {
            $('#autoSlNoHeadCheckgrid' + Id).prop('checked', false);
            warningshow('Enter the Quantity', 'autoqtypr' + Id);
            $('#autoqtypr' + Id).select();
        }
        else if (($('#autoprrate' + Id).val() == '' || $('#autoprrate' + Id).val() == 0)) {
            $('#autoSlNoHeadCheckgrid' + Id).prop('checked', false);
            warningshow('Enter the rate', 'autoprrate' + Id);
            $('#autoprrate' + Id).select();
        }
    }
    else {
        $('#autoSlNoHeadCheckgrid' + Id).prop('checked', false);
    }
}

function autocheckall() {

    var rowCount, emptyflg = 0;
    if ($('#automobiles').find("tr:last").attr('id'))
        rowCount = $('#automobiles').find("tr:last").attr('id').match(/\d+/)[0];

    var flag = $("#autoSlNoHeadCheckgrid0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("autoSlNoHeadCheckgrid" + h) != null) {
            if (($('#autoqtypr' + h).val() != '') && ($('#autoprrate' + h).val() != '') && ($('#autoprdamnt' + h).val() != 0)) {

                document.getElementById("autoSlNoHeadCheckgrid" + h).checked = flag;
            }
            else {
                emptyflg = 1;
            }
        }
    }
    if (emptyflg != 0 && flag == true) {
        warningshow('Please Enter Quantity and Rate for selecting all Items');
    }
}

function autogridamountcalculation(id) {

    var fc = parseFloat($('#txtcrncyrate').val());
    var fcprodrate = 0;
    var fcproddisc = 0;
    var fctaxable = 0;
    var fctax = 0;
    var fcamnt = 0;


    var quantity = $('#autoqtypr' + id).val() || 0;
    var rate = parseFloat($('#autoprrate' + id).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var amount = parseFloat(quantity * rate);
    var discount = parseFloat($('#autoprdisc' + id).val() || 0);
    discount = isNaN(discount) ? 0 : discount;
    var taxableamount = parseFloat(amount - discount);
    var taxrate = parseFloat($('#autoItemtaxgrid' + id).find("option:selected").attr("name") || 0);
    var taxamount = parseFloat(taxableamount * taxrate) / 100;
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));
    var LineAvgCost = quantity * parseFloat($('#autopravgcost' + id).val() || 0);

    $('#autoprdamnt' + id).val(totalamount.toFixed(Decimal));
    $('#autoprdtaxableamnt' + id).val(taxableamount.toFixed(Decimal));
    $('#autoprdtaxamnt' + id).val((taxamount).toFixed(Decimal));
    $('#autoprLineAvgCost' + id).val(LineAvgCost.toFixed(Decimal));



    fcprodrate = parseFloat($('#autoprrate' + id).val() || 0) * fc;
    fcproddisc = parseFloat($('#autoprdisc' + id).val() || 0) * fc;
    fctaxable = parseFloat($('#autoprdtaxableamnt' + id).val() || 0) * fc;
    fctax = parseFloat($('#autoprdtaxamnt' + id).val() || 0) * fc;
    fcamnt = parseFloat($('#autoprdamnt' + id).val() || 0) * fc;

    $('#autoprdfcrate' + id).val(fcprodrate.toFixed(Decimal));
    $('#autoprdfcdiscount' + id).val(fcproddisc.toFixed(Decimal));
    $('#autoprdfctaxableamnt' + id).val(fctaxable.toFixed(Decimal));
    $('#autoprdfctaxamnt' + id).val(fctax.toFixed(Decimal));
    $('#autoprdfcamnt' + id).val(fcamnt.toFixed(Decimal));

}

function autocheckqtystock(id) {
    if (Negativebill == 'NO' && ($("#autoItemLocngrid" + id).find("option:selected").attr("name") == 0)) {
        var pflg = 0;
        var pdtsumqty = 0;
        var pdtsumqty1 = 0;
        for (var p = 1; p <= i; p++) {
            if (($('#PrdtId' + p).val() == $("#autoItemIdgrid" + id).val()) && ($('#select_location' + p).val() == $("#autoItemLocngrid" + id).val()) && ($('#txtquantity' + p).attr('name') == 'prdaddqty')) {
                pflg = 1;
            }
        }
        if (pflg == 0) {                      //If Product is not already added in product grid-check qty<stockqty
            if (($('#autoItemIdgrid' + id).val() != 0) && (parseInt($('#autoqtypr' + id).val()) > parseInt($('#autoprStockqty' + id).val()))) {
                warningshow('Not Enough Stock!Available stock is ' + $('#autoprStockqty' + id).val());
                $('#autoqtypr' + id).val('');
                $('#autoqtypr' + id).focus();
                document.getElementById("autoSlNoHeadCheckgrid" + id).checked = false;
                return false;
            }
        }
        else                          //else check qty < stockqty-(sum of qty of pdts in pdt grid)
        {
            for (var g = 1; g <= i; g++) {
                if (($('#PrdtId' + g).val() == $("#autoItemIdgrid" + id).val()) && ($('#select_location' + g).val() == $("#autoItemLocngrid" + id).val()) && ($('#txtquantity' + g).attr('name') == 'prdaddqty')) {
                    pdtsumqty = parseInt(pdtsumqty) + parseInt($("#txtquantity" + g).val());
                    pdtsumqty1 = parseInt(pdtsumqty);
                }
            }
            if ($("#autoqtypr" + id).val() > (parseInt($('#autoprStockqty' + id).val()) - pdtsumqty1)) {
                warningshow('Available Quantity is ' + (parseInt($('#autoprStockqty' + id).val()) - pdtsumqty1), 'autoqtypr' + id);
                $('#autoqtypr' + id).val('');
                $('#autoqtypr' + id).focus();
                return false;
            }
        }
    }
}

function autoCheckme(Id) {

    if (($('#autoqtypr' + Id).val() != '') && ($('#autoprrate' + Id).val() != '') && ($('#autoprdamnt' + Id).val() != 0)) {
        document.getElementById("autoSlNoHeadCheckgrid" + Id).checked = true;
    }
    else {
        document.getElementById("autoSlNoHeadCheckgrid" + Id).checked = false;
    }


}

//Focus to next text box in Multiple Product Selection List  
function autoFocusnext(e, Id, col) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    var rowcount1 = CountRows();

    if (key == 40) {            // Down Arrow

        Getproddetailsauto(Id);
        GetPrdtId($('#autoItemIdgrid' + Id).val(), $('#autoItemdescgrid' + Id).text(), $('#autocol' + Id).text(), 4)
        e.preventDefault();
        var nextID = Id;
        try {
            nextID = ($('#autoItemdescgrid' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0];
            Getproddetailsauto(nextID);
            GetPrdtId($('#autoItemIdgrid' + nextID).val(), $('#autoItemdescgrid' + nextID).text(), $('#autocol' + nextID).text(), 4)
        }
        catch (err) {
        }

        if (col == 'q') {
            $('#autoqtypr' + nextID).focus();
            $('#autoqtypr' + nextID).select();
        }
        else if (col == 'r') {
            $('#autoprrate' + nextID).focus();
            $('#autoprrate' + nextID).select();
        }
        else if (col == 'd') {
            $('#autoprdisc' + nextID).focus();
            $('#autoprdisc' + nextID).select();
        }
        else if (col == 'u') {
            $('#autoItemunitgrid' + nextID).focus();
        }
        else if (col == 't') {
            $('#autoItemtaxgrid' + nextID).focus();
        }
        else if (col == 'l') {
            $('#autoItemLocngrid' + nextID).focus();
        }
    }
    else if (key == 39) {       //Right Arrow
        e.preventDefault();
        if (col == 'r') {
            $('#autoprdisc' + Id).focus();
            $('#autoprdisc' + Id).select();
        }
        else if (col == 'q') {
            $('#autoprrate' + Id).focus();
            $('#autoprrate' + Id).select();
        }
        else if (col == 'u') {
            $('#autoItemLocngrid' + Id).focus();

        }
        else if (col == 'd') {
            $('#autoItemtaxgrid' + Id).focus();
        }
        else if (col == 't') {
            $('#autoItemunitgrid' + Id).focus();
        }
        else if (col == 'l') {
            $('#autoqtypr' + Id).focus();
            $('#autoqtypr' + Id).select();

        }
    }
    else if (key == 37) {       //Left Arrow
        e.preventDefault();
        if (col == 'r') {
            $('#autoqtypr' + Id).focus();
            $('#autoqtypr' + Id).select();
        }
        else if (col == 'q') {
            $('#autoItemLocngrid' + Id).focus();

        }
        else if (col == 'u') {
            $('#autoItemtaxgrid' + Id).focus();
        }
        else if (col == 'l') {
            $('#autoItemunitgrid' + Id).focus();

        }
        else if (col == 't') {
            $('#autoprdisc' + Id).focus();
            $('#autoprdisc' + Id).select();
        }
        else if (col == 'd') {
            $('#autoprrate' + Id).focus();
            $('#autoprrate' + Id).select();
        }

    }
    else if (key == 38) {              //Up Arrow

        e.preventDefault();
        var prevID = Id;
        try {
            prevID = ($('#autoItemdescgrid' + Id).closest('tr').prev('tr').attr('id')).match(/\d+/)[0];
            Getproddetailsauto(prevID);

            GetPrdtId($('#autoItemIdgrid' + prevID).val(), $('#autoItemdescgrid' + prevID).text(), $('#autocol' + prevID).text(), 4)
        }
        catch (err) {
        }

        if (col == 'q') {
            $('#autoqtypr' + prevID).focus();
            $('#autoqtypr' + prevID).select();
        }
        else if (col == 'r') {
            $('#autoprrate' + prevID).focus();
            $('#autoprrate' + prevID).select();
        }
        else if (col == 'd') {
            $('#autoprdisc' + prevID).focus();
            $('#autoprdisc' + prevID).select();
        }
        else if (col == 'u') {
            $('#autoItemunitgrid' + prevID).focus();
        }
        else if (col == 't') {
            $('#autoItemtaxgrid' + prevID).focus();
        }
        else if (col == 'l') {
            $('#autoItemLocngrid' + prevID).focus();
        }
    }

    else if (key == 13) {
        //Getproddetails(Id);
        //GetPrdtId($('#ItemIdgrid' + Id).val(), $('#Itemdescgrid' + Id).text(), $('#col' + Id).text(), 1)



        if (col == 'q') {
            e.preventDefault();

            Getproddetailsauto(Id);
            GetPrdtId($('#autoItemIdgrid' + Id).val(), $('#autoItemdescgrid' + Id).text(), $('#autocol' + Id).text(), 4)

            $('#autoprrate' + Id).focus();
            $('#autoprrate' + Id).select();
        }

        else if (col == 'r') {
            e.preventDefault();
            var nextID;
            try {
                nextID = ($('#autoItemdescgrid' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0];
                Getproddetailsauto(nextID);
                GetPrdtId($('#autoItemIdgrid' + nextID).val(), $('#autoItemdescgrid' + nextID).text(), $('#autocol' + nextID).text(), 4)
                $('#autoqtypr' + nextID).focus();
                $('#autoqtypr' + nextID).select();
            }
            catch (err) {
            }
        }

    }
}

//Check Rate>Average Rate (check onblur)
function autocheckratestock(id) {
    // if ($("#autoSlNoHeadCheckgrid" + id).is(":checked")) {
    if ((BelowCost == 'NO') && ($('#autopravgcost' + id).val() != 0) && (parseFloat($('#autoprrate' + id).val()) < parseFloat($('#autopravgcost' + id).val()))) {
        warningshow('Rate must be greater than ' + $('#autopravgcost' + id).val(), 'autoprrate' + id);
        rateflg = 1;
        return false;
    }
    else
        rateflg = 0;
    // }
}

//check discount > rate
function autocheckdiscount(id) {
    if ((parseFloat($("#autoprrate" + id).val()) > 0) && (parseFloat($("#autoprdisc" + id).val()) >= parseFloat($("#autoprrate" + id).val()))) {
        warningshow('Discount should be less than rate', 'autoprdisc' + id);
        $('#autoprdisc' + id).val('');
        return false;
    }
}

//Function Call to Load Stock Qty When Location Change in Multiple Product Selection List for Qty Checking
function autoLocationqtycheck(id) {
    $('#autoqtypr' + id).val('');
    document.getElementById("autoSlNoHeadCheckgrid" + id).checked = false;

    var data = {};
    data.ProductId = $('#autoItemIdgrid' + id).val();
    data.LocnId = $('#autoItemLocngrid' + id).val();
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/GetQuantitybyLocation",
        data: data,
        success: function (result) {
            autoqtyload(result.oList, id)
        }
    });
}

//Load Stock Qty When Location Change in Multiple Product Selection List for Qty Checking 
function autoqtyload(result, id) {
    if (result.length == 'undefined') {
        $('#autoprStockqty' + id).val(0);
    }
    else {
        for (var j = 0; j < result.length; j++)
            $('#autoprStockqty' + id).val(result[j].stocktotloseqty);
    }
}

//function for Getting Distinct array values      
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var ProductFlag1 = 0;
var autoProdarray = [];
var autoProdIdArray = [];
//Add Products into Product Grid from Multiple Product Selection List 
function autoaddgridproducts() {
    var cnt = 1;

    if ($('#automobiles').find("tr:last").attr('id'))
        cnt = $('#automobiles').find("tr:last").attr('id').match(/\d+/)[0];
    for (j = 1; j <= cnt ; j++) {
        if ($("#autoSlNoHeadCheckgrid" + j).is(":checked")) {
            if ((BelowCost == 'NO') && ($('#autopravgcost' + j).val() != 0) && (parseFloat($('#autoprrate' + j).val()) < parseFloat($('#autopravgcost' + j).val()))) {
                rateflg = 1;
            }
            else
                rateflg = 0;
        }

    }
    autoProdarray = [];
    // autoProdIdArray = [];
    if (rateflg == 0) {

        var rowcount1 = CountRows();
        if (rowcount1 == 0) {
            i = 1;
        }

        for (var n = 1; n <= cnt; n++) {                                               //Add Checked Row Id's to Prodarray[]
            if ($("#autoSlNoHeadCheckgrid" + n).is(":checked")) {
                autoProdarray.push(n);
            }
        }

        var y = 0;
        for (var b = 0; b < autoProdarray.length; b++) {                            //Add Already added Item Id Into ProdIdArray[]
            y = autoProdarray[b];

            for (var p = 1; p <= rowcount1; p++) {
                if (($('#PrdtId' + p).val() == $('#autoItemIdgrid' + y).val())) {
                    var n = autoProdIdArray.includes($('#ItemIdgrid' + y).val());
                    if (n != true) {
                        autoProdIdArray.push($('#autoItemIdgrid' + y).val());
                    }
                }
            }

            autoProdIdArray = autoProdIdArray.filter(onlyUnique);       //Getting Distinct array values         
            var mm = 0;
            for (var p = 0; p <= autoProdIdArray.length; p++) {                      //Check wheather selected Item Id is in ProdIdArray
                mm = autoProdIdArray[p];
                if ((mm == $('#autoItemIdgrid' + y).val())) {
                    var pdt = $('#autoItemdescgrid' + y).text();
                    var Res = confirm(pdt + ' already Added! Do You Want to Continue');
                    if (Res == false) {
                        autoProdarray.splice(b, 1);
                    }
                }
            }
        }
        if (autoProdarray.length <= 0) {
            warningshow('Select Product');
        }


        else {
            $('#disc').prop("disabled", false);
            $('#disc').val('0.00');
            $('#Discountpercent').val('');
            var m = 0;
            for (var b = 0; b < autoProdarray.length; b++) {
                m = autoProdarray[b];
                if ($("#autoSlNoHeadCheckgrid" + m).is(":checked")) {

                    if ($("#autoItemunitgrid" + m).val() == '') {
                        warningshow('Please Select Unit', 'autoItemunitgrid' + m);
                        $('#autoItemunitgrid' + m).select();
                        return false;
                    }
                    else if ($("#autoqtypr" + m).val() == '' || 0) {
                        warningshow('Please Enter The Quantity', 'autoqtypr' + m);
                        $('#autoqtypr' + m).select();
                        return false;
                    }
                    else if ($("#autoprrate" + m).val() == '' || 0) {
                        warningshow('Please Enter the Rate', 'autoprrate' + m);
                        $('#autoprrate' + m).select();
                        return false;
                    }
                    else if (parseFloat($("#autoprdisc" + m).val()) >= parseFloat($("#autoprrate" + m).val())) {
                        warningshow('Discount should be less than rate', 'autoprdisc' + m);
                        $('#autoprdisc' + m).val('');
                        return false;
                    }
                    else if ($("#autoprdamnt" + m).val() == '' || $("#autoprdamnt" + m).val() == 0) {
                        warningshow('Amount can not be Zero', 'autoprdamnt' + m);
                        $('#autoprrate' + m).select();
                        return false;
                    }
                    else if ($("#autoprdamnt" + m).val() < 0) {
                        warningshow('Amount can not be Negative', 'autoprdamnt' + m);
                        $('#autoprdisc' + m).select();
                        return false;
                    }
                    else if ($("#autoItemunitgrid" + m).val() == 0) {
                        warningshow('Please Select The Unit', 'autoItemunitgrid' + m);
                        $('#autoItemunitgrid' + m).select();
                        return false;
                    }
                    else if ($("#autoItemtaxgrid" + m).val() == 0) {
                        warningshow('Please Select Tax', 'autoItemtaxgrid' + m);
                        return false;
                    }
                    else if ($("#autoItemLocngrid" + m).val() == '' || $("#autoItemLocngrid" + m).val() == 0) {
                        warningshow('Please Select Location', 'autoItemLocngrid' + m);
                        $('#autoItemLocngrid' + m).select();
                        return false;
                    }
                    else {
                        var bins = '';
                        if ($('#Bina' + m).text() != '')
                            bins = $('#Bina' + m).text();

                        BillDiscountFlag = 0;

                        var slno = parseInt(++rowcount1);
                        var id = parseInt(i);

                        var desc = $('#autoItemdescgrid' + m).text();
                        var j = 0, strLength = desc.length;
                        for (j; j < strLength; j++) { desc = desc.replace(" ", "@%@"); }

                        var code = $('#autoItemcodegrid' + m).val();
                        var k = 0, strLength1 = code.length;
                        for (k; k < strLength1; k++) { code = code.replace(" ", "@%@"); }

                        var ProdRows = "<tr onclick=GetproddetailsGrid(" + id + "),GetPrdtId(" + $('#autoItemIdgrid' + m).val() + ",'" + desc + "','" + code + "'," + 2 + ") onfocusout='updaterow(" + id + ")' id=" + 'row' + id + " class='jsgrid-row'>" +
                            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
                            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $('#autoItemIdgrid' + m).val() + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $('#autoItemcodegrid' + m).val() + "'  data-toggle='tooltip' title='" + $('#autoItemcodegrid' + m).val() + "'></td>" +
                            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $('#autoItemdescgrid' + m).text() + "' data-toggle='tooltip' title='" + $('#autoItemdescgrid' + m).text() + "'></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'  onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" + UnitSelect + "</select></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select style='background-color:white;height:30px'  id=" + 'select_location' + id + " class='form-control' onchange ='Locationqtycheckmain(" + id + ")' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" + LocnSelect + "</select></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' class='form-control text-center' name='prdaddqty' id=" + 'txtquantity' + id + " value=" + parseInt($('#autoqtypr' + m).val()) + " style='background-color:white;height:30px' onkeyup='checkqty(" + id + "),amountcalculation(" + id + ")' onkeypress=isNumberInt(event,this) onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + ($('#autoprStockqty' + m).val() || 0) + " style='display:none'></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#autoprdfcrate' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#autoprrate' + m).val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#autoprdfcdiscount' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#autoprdisc' + m).val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress=isNumber(event,this) onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#autoprdfctaxableamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#autoprdtaxableamnt' + m).val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:38px'><select style='background-color:white;height:30px' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" + TaxSelect + "</select></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:22px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#autoItemtaxgrid' + m).find("option:selected").attr("name") + " onkeyup='amountcalculation(" + id + ")'></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#autoprdfctaxamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#autoprdtaxamnt' + m).val()).toFixed(Decimal) + " disabled=''></td>" +
                            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#autoprdfcamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#autoprdamnt' + m).val() + "></td>" +
                            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' id=" + 'LineAvgCost' + id + " value=" + parseFloat($('#autoprLineAvgCost' + m).val()).toFixed(Decimal) + " style='display:none'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#autopravgcost' + m).val()).toFixed(Decimal) + " style='background-color:white;height:30px'></td>" +
                            "<td style='display:none' id=" + 'Bin' + id + ">" + bins + "</td>" +
                            "</tr>";
                        $('#tblsalesinvoice').append(ProdRows);

                        $('#select_unit' + id).val($('#autoItemunitgrid' + m).val());
                        $('#select_tax' + id).val($('#autoItemtaxgrid' + m).val());
                        $('#select_location' + id).val($('#autoItemLocngrid' + m).val());

                        TaxSplit(id);
                        CalcGrandTotal(i);
                        fccalculation(i);
                        $("#autoSlNoHeadCheckgrid" + m).prop("checked", false);
                        $('#RowGetprdt').val(0);
                        ProductFlag1 = 0;



                        if (parseFloat($('#txtdiscount' + id).val()) > 0) {
                            $('#disc').prop("disabled", true);
                            $('#disc').val('0.00');
                            $('#Discountpercent').val('');

                            BillDiscountFlag = 1;
                        }
                        i++;
                        $('#automobiles').hide();
                        $('#Warningpopup').fadeOut();
                        CalcDiscountSplitTax1();
                        roundoffcalc();
                        clearprodlist(1);
                        totalproducts();
                        $('#txtproduct0').focus();
                        $("#HiddenItemId").val(0);
                        $("#HiddenDesc").val('');
                        $("#HiddenItem").val('');

                        if ($("#PrdtId0").val() != 0 && $("#PrdtId0").val() != '')
                            $("#TransPrdtId0").val($("#PrdtId0").val());


                    }
                }
                $('#proddiv').animate({ scrollTop: 5000 }, 900);

            }
            TemporarySalessave();
            closeautomobile();
        }
    }
    else {
        warningshow('Rate must be greater than average Cost For All Products');
    }
}

//Function Call To Load Details of Product in Item Mapping(F3 popup) List when focus goes on a product 
function Getproddetailsauto(id) {
    $('#autopcol1').text("");
    $('#autopcol2').text("");
    $('#AutoItemname').text('');
    if (id != 0) {
        var data = {};
        data.ProductId = $("#autoItemIdgrid" + id).val();
        data.CustId = $("#txtCustId").val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: '../SalesInvoice/CustomerProductDetailsSearch',
            data: data,
            success: function (result) {
                LoadProddetails(result.oList, 2);
            }
        });
    }
}

function closeautomobile() {
    $('#AutoItemCode').val('');
    $('#AutoType').val(0);
    $('#automobiles').hide();
    $('#AutoProductlist tr td').remove();

    $('#autopcol1').text("");
    $('#autopcol2').text("");
    $('#AutoItemname').text('');
    $('#autopdthead').css("height", '60px');

    $("#HiddenAutoItemId").val(0);
    $('#HiddenAutoDesc').val('');
    $('#HiddenAutoItem').val('');

    if ($('#descpopup').text() != '')
        $('#popupdesc').show();
}

//--------------------End ProductList for Automobiles------------------


function CustDuedate(CustId) {
    var data = {};
    data.CustId = CustId;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: '../SalesInvoice/CustomerDueDateChecking',
        data: data,
        success: function (result) {
            if (result.oList.length == 1) {
                $('input').blur();
                $('#duemsg').text('');
                $('#duecheckdiv').show();
                $('#duemsg').append('<tr><td><h2> Payment( ' + (result.oList[0].GrandTotal).toFixed(Decimal) + ' ) for </br>Bill Number ' + result.oList[0].BillDescription + ' - ' + result.oList[0].BillSlNo + '</br> is Overdue on ' + result.oList[0].InvDate + '</h2></tr></td>');
                $('#btndue').focus();
            }
            else if (result.oList.length > 1) {
                $('input').blur();
                $('#duemsg').text('');
                $('#duecheckdiv').show();
                $('#btndue').focus();
                $('#duemsg').append('<tr style="color:#ef1111"><td colspan=3><h3>OverDue Bills</h3></td></tr>');
                $('#duemsg').append('<tr class="jsgrid-row"><th class="jsgrid-cell jsgrid-control-field jsgrid-align-center">Bill No</th><th class="jsgrid-cell jsgrid-control-field jsgrid-align-center">DueDate</th><th class="jsgrid-cell jsgrid-control-field jsgrid-align-center">Amount</th></tr>');
                for (var c = 0 ; c < result.oList.length ; c++)
                    $('#duemsg').append('<tr class="jsgrid-row" style="border:1px solid"><td class="jsgrid-cell jsgrid-control-field jsgrid-align-center"><h4>' + result.oList[c].BillDescription + ' - ' + result.oList[c].BillSlNo + ' </h4></td>' +
                        '<td class="jsgrid-cell jsgrid-control-field jsgrid-align-center"><h4>' + result.oList[0].InvDate + '</h4></td>' +
                        '<td class="jsgrid-cell jsgrid-control-field jsgrid-align-center"><h4>' + (result.oList[0].GrandTotal).toFixed(Decimal) + '</h4></td></tr>');

            }
            else {
                $('#txtproduct0').focus();
            }
        }
    });
}