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

    }
}
var UnitSelect = '';
function UnitLoad(result) {
    $("#select_unit0,#unit_job").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'name='" + result[i].UnitName + "'>" + result[i].UnitName + "</option>";
    }
    $("#select_unit0,#unit_job").append(UnitSelect);
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
var LocnSelect = '';
function LocationLoad(result) {
    $("#select_locn").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        if (LocArray.includes(result[i].LocationId))
            LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
        else
            LocnSelect += "<option style='color:#26ACAE' disabled value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }
    $("#select_locn").append(LocnSelect);
    $('#select_locn').val(UserLocationId);
}

var LocArray = [];
function LocnLoad() {
   
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList);
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
       "<td class='text-center' style='width:auto;width:30%;border:1px solid #BABFC7;'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + result[i].TaxRate + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +
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

//Load Quotation No 
function QtnNoload(result) {
    $('#txtQuotationNo').val(result[0].QuotationNo);
    $('#txtBlSlNo').val(result[0].QuotationNo);
    $('#txtQuotationNocopy').val(result[0].QuotationNo);
}

//To Load Quotation No From Settings Table
function QtnLoad() {

    var data = {};
    data.id = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: data,
        success: function (result) {
            QtnNoload(result.oList);
        }
    });
}



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

                //   $('#tblurchasetrans tr td').remove();
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

var Decimal = Decimal;
var editflag = 0;
var i = 1;
$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();


    var x = event.keyCode;
    if ((x > 111 && x < 124)) {                  //Functional Keys default function block  

        if ((x == 118) && !($("#iconForm").is(":visible"))) {                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 

            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionSales();

        }

        else if ((x == 119) && !($("#iconForm").is(":visible"))) {                         // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 

            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionPurchase();


        }
        else if ((x == 120)&& !($("#iconForm").is(":visible"))) {  // F9 :   All Transaction details Popup      

            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionAll();
        }
        else if ((x == 113) && (!$("#iconForm").is(":visible")) && (!$('#confirm,#promptdiv').is(":visible"))) {    // F2 -   Multiple Products List  
            if (editflag == 0 && copyflag == 0) {               
                salestranspopuprefresh();                                           
                clearrow(); 
                Multipleproduct();                  
            }
        }
        else if ((x == 115)) {                                       // F4
            if ($("#iconForm").is(":visible"))
                addgridproducts();           
        }

        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }

    if ((e.altKey && e.keyCode == 83) && (!$("#salestranspopupdiv").is(":visible"))) {  //alt+s


        if ((copyflag != 1) && ($("#btnsubmit").is(":disabled") == false)) {
            saveQuotation(1);
        }


        //if (copyflag != 1)
        //    saveQuotation(1);
    }
    else if ((e.altKey && e.keyCode == 67) && (!$("#salestranspopupdiv").is(":visible"))) {   //alt+C
        if (copyflag != 1)
            GetRows();
    }
    else if ((e.altKey && e.keyCode == 78) && (!$("#salestranspopupdiv").is(":visible"))) {  //alt+N
        formrefreshconfirm();
    }
    else if (e.keyCode == 27) { //escape
        if (copyflag != 1) {
            productpopuprefresh();
            popuprefresh();
            jobpopuprefresh();
            salestranspopuprefresh();
            CloseEnquiry();
            $('#Revisionpopupdiv,#Revdiv').hide()
        }

    }
    else if (e.altKey && e.keyCode == 49) { //alt+1 


    }
    else if (e.altKey && e.keyCode == 51) { //alt+3  

    }

    else if ((e.altKey && e.keyCode == 52) && (!$("#addacnttype").is(":visible"))) {                      //Alt+4    :   All Transaction details Popup      

    }

})

//Function call for Multiple Product Selection List 
function Multipleproduct() {
    var data = {};
    data.ItemCode = '';
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
          
        }
    })
}


//Show more products in popup in Multiple Product Selection List 
function ShowMultipleProductsList(result, st) {
    totalproductslist();
    var sln = 0;
    if (st == 0) {
        $('#Productlist thead').remove();
        $('#Productlist tr').remove();
    }
    else {

        $('#Productlist thead').remove();
        $('.removeme').remove();
        var rowid = 1;
        if ($('#Productlist tr').length == 0)
            rowid = 1;
        else {
            try {
                //rowid = $('#Productlist tr:last').attr('id').match(/\d+/)[0];
                rowid = $('#Productlist > tbody > tr:last-child()').attr('id').match(/\d+/)[0];
            }
            catch (err) {
                rowid = 1;
            }

        }
        sln = parseInt(rowid || 1);
    }

    $('#iconForm').show();
    var slno = parseInt(sln);
    if (result != 0) {
        var responseText1 = "<thead><tr><th style='width:90px;'> </th><th>Product</th><th>Description</th><th>Stock</th><th>Unit</th><th style='display:none'>Location</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th></tr></thead>";
        $('#Productlist').append(responseText1);
        for (var l = 0; l < result.length; l++) {

            if ((MultiPdtArray.indexOf("" + result[l].ItemId + "") == -1)) {           
                var bins = '';

                if ($('#select_locn').val() == 1) { if (result[l].Bin_A != '') { bins = bins + result[l].Bin_A; } }
                else if ($('#select_locn').val() == 2) { if (result[l].Bin_B != '') { bins = bins + result[l].Bin_B; } }
                else if ($('#select_locn').val() == 3) { if (result[l].Bin_C != '') { bins = bins + result[l].Bin_C; } }
                else if ($('#select_locn').val() == 4) { if (result[l].Bin_D != '') { bins = bins + result[l].Bin_D; } }
                else if ($('#select_locn').val() == 5) { if (result[l].Bin_E != '') { bins = bins + result[l].Bin_E; } }
                else if ($('#select_locn').val() == 6) { if (result[l].Bin_F != '') { bins = bins + result[l].Bin_F; } }
                else if ($('#select_locn').val() == 7) { if (result[l].Bin_G != '') { bins = bins + result[l].Bin_G; } }
                else if ($('#select_locn').val() == 8) { if (result[l].Bin_H != '') { bins = bins + result[l].Bin_H; } }

                slno++;
                var responseText =
                    '<tr class="removeme"  onclick="rowbgcolor(' + slno + '),Getproddetails(' + slno + ')" id="mltplerow' + slno + '"><td style="width:90px;" ><input name="Checkprdtlist" onchange=clearcheck(' + slno + ') type="checkbox" disabled id= ' + 'SlNoHeadCheckgrid' + slno + '  class="form-control" style="align:center"></td>' +
                    '<td style=display:none;><input type="text" style="display:none;" id= ' + 'ItemIdgrid' + slno + ' value= ' + result[l].ItemId + '></td>' +
                    '<td id="col' + slno + '">' + result[l].ItemCode + '<input type="text" style="display:none;" id= ' + 'Itemcodegrid' + slno + ' value= ' + result[l].ItemCode + '></td>' +
                    '<td id=' + 'Itemdescgrid' + slno + '>' + result[l].Description + '</td>' +
                    '<td style="text-align:center;" id=' + 'ItemStockqty' + slno + '>' + result[l].TotQty + '</td>' +
                    '<td style="text-align:center;" ><select  style="height:30px;" class=form-control id=' + 'Itemunitgrid' + slno + ' onkeydown=Focusnext(event,' + slno + ',"u")>' + UnitSelect + '</select></td>' +
                    '<td style="text-align:center;display:none" ><select  style="height:30px;" class=form-control id=' + 'ItemLocngrid' + slno + '>' + LocnSelect + '</select></td>' +
                    '<td style="text-align:center;width:130px;" ><input type="text" style="height:30px;" class="form-control" id= ' + 'qtypr' + slno + '  onkeypress=isNumberInt(event,this) onkeyup=gridamountcalculation(' + slno + '),Checkme(' + slno + ') onkeydown=Focusnext(event,' + slno + ',"q")></td>' +
                    '<td style="text-align:center;width:130px;" >' +
                    '<input type="text" style="height:30px;" class="form-control" id= ' + 'prrate' + slno + ' value=' + result[l].SellingPrice.toFixed(Decimal) + '  onkeypress=isNumber(event,this)  onkeyup=gridamountcalculation(' + slno + '),Checkme(' + slno + ') onkeydown=Focusnext(event,' + slno + ',"r")>' +
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
                $('#ItemLocngrid' + slno).val($('#select_locn').val()); 
                $('#mltrcurrlength').val(slno);
                //$('#RowGetprdt').val(result.length);
            }
        }      
        $('#searchItemCode').focus();
        
    }  
    $('#div1').animate({ scrollTop: 0 });
    totalproductslist();
}

//check discount > rate
function checkdiscount(id) {
    if ((parseFloat($("#prrate" + id).val()) > 0) && (parseFloat($("#prdisc" + id).val()) >= parseFloat($("#prrate" + id).val()))) {
        warningshow('Discount should be less than rate', 'prdisc' + id);
        $('#prdisc' + id).val('');
        return false;
    }
}


function rowbgcolor(Id) {
    var a;
    try {
        a = $('#Productlist > tbody > tr:last-child()').attr('id').match(/\d+/)[0];
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
               
                $('#tbllocqty').attr('border', '1');
                $('#tbllocqty').attr('bordercolor', 'white');
                $('#tbllocqty td').attr('border', '1px solid white');
            }
            else {
                var ProdRow =
                "Average Cost : " + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; LPCost : " + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; CLS Price :" + (parseFloat(result[n].CustLastSellingPrice || 0).toFixed(Decimal)) + " &emsp;&emsp;&emsp;&emsp; Last Selling Price :" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "";
                var ProdRow2 = strr3;
                $('#pcol1').append(ProdRow);
                $('#pcol2').append(ProdRow2);
                $('#ItemDetails').show();
                $('#pcol1').show();
               
                $('#tbllocqty').attr('border', '1');
                $('#tbllocqty').attr('bordercolor', 'white');
                $('#tbllocqty td').attr('border', '1px solid white');
            }

        }
    }
}


//Hide Multiple Product Selection List 
function closepopupprdtlist(flg) {
    $('#Productlist tr').remove();
    $('#pcol1').text("");
    $('#pcol2').text("");
    $('#Itemname').text('');
    $('#pdthead').css("height", '60px');
  
    $('#Warningpopup').fadeOut();
    if (flg != 1)
        $('#txtproduct0').focus();
}

function checkitemtextempty(e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key == 32) {
        if ($('#SearchType').val() == 0 && $('#searchItemCode').val() != '')
            MultipleProductBind(2);

        if ($('#searchItemCode').val() == '') {
            $('#hiddenitemcode').val('');
          
          
            MultipleProductBind(2);
        }
    }
    else if (key == 40 || key == 13) {
        try {
            var row = $('#Productlist').find("td:eq(2)").attr('id').match(/\d+/)[0];
            if (row) {
                $('#qtypr' + row).focus(); $('#qtypr' + row).select();              
                rowbgcolor(row);
            }
        }
        catch (err) {
            // rowbgcolor(0);
        }
    }
}


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

    var delay = 2000;
    var data = {};
    data.LocId = $("#select_location0").val();
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

//Focus to next text box in Multiple Product Selection List  
function Focusnext(e, Id, col) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    var rowcount1 = CountRows();

    if (key == 40) {            // Down Arrow
        $('#mltplerow' + Id).css('background-color', '');
        $('#mltplerow' + Id).css('font-weight', '');
        $('#qtypr' + Id + ',#prrate' + Id + ',#prdisc' + Id + ',#Itemunitgrid' + Id + ',#Itemtaxgrid' + Id + ',#ItemLocngrid' + Id).css('font-weight', '');

        Getproddetails(Id);
      
        e.preventDefault();
        var nextID = Id;
        try {
            nextID = ($('#Itemdescgrid' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            nextID = Id;
        }
        Getproddetails(nextID);
       
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
            //$('#ItemLocngrid' + Id).focus();
            $('#qtypr' + Id).focus();
            $('#qtypr' + Id).select();
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
            //$('#ItemLocngrid' + Id).focus();
             $('#Itemunitgrid' + Id).focus();
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
      

        $('#mltplerow' + Id).css('background-color', '');
        $('#mltplerow' + Id).css('font-weight', '');
        $('#qtypr' + Id + ',#prrate' + Id + ',#prdisc' + Id + ',#Itemunitgrid' + Id + ',#Itemtaxgrid' + Id + ',#ItemLocngrid' + Id).css('font-weight', '');


        if (col == 'q') {
            e.preventDefault();
            $('#mltplerow' + Id).css('background-color', '#FFC6B0');
            $('#mltplerow' + Id).css('font-weight', 'bold');
            $('#qtypr' + Id + ',#prrate' + Id + ',#ItemLocngrid' + Id + ',#Itemunitgrid' + Id + ',#prdisc' + Id + ',#Itemtaxgrid' + Id).css('font-weight', 'bold');
            Getproddetails(Id);
          
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
         
            $('#qtypr' + nextID).focus();
            $('#qtypr' + nextID).select();
            $('#mltplerow' + nextID).css('background-color', '#FFC6B0');
            $('#mltplerow' + nextID).css('font-weight', 'bold');
            $('#qtypr' + nextID + ',#prrate' + nextID + ',#ItemLocngrid' + nextID + ',#Itemunitgrid' + nextID + ',#prdisc' + nextID + ',#Itemtaxgrid' + nextID).css('font-weight', 'bold');
        }
    }
}

//Calculate total amount in Multiple Product Selection List 
function gridamountcalculation(id) {

    var fc = parseFloat($('#txtcrncyrate').val() || 0).toFixed(Decimal);
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

var Prodarray = [];
var ProdIdArray = [];
//Add Products into Product Grid from Multiple Product Selection List 
function addgridproducts() {


    Prodarray = [];

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


                        var ProdRows = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
           "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
           "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
           "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
           "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'enqno' + id + " style='display:none' value='0'/><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $('#ItemIdgrid' + m).val() + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $('#Itemcodegrid' + m).val() + "'></td>" +
           "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $('#Itemdescgrid' + m).text() + "'></td>" +
           "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
           "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#qtypr' + m).val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + "  style='display:none'></td>" +
           "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'><input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#pravgcost' + m).val()).toFixed(Decimal) + " style='background-color:white;height:30px;display:none'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#prdfcrate' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#prrate' + m).val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
           "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#prdfcdiscount' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#prdisc' + m).val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
           "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#prdfctaxableamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#prdtaxableamnt' + m).val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
           "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
           "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#Itemtaxgrid' + m).find("option:selected").attr("name") + " onkeyup='amountcalculation(" + id + ")'></td>" +
           "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#prdfctaxamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#prdtaxamnt' + m).val()).toFixed(Decimal) + " disabled=''></td>" +
           "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#prdfcamnt' + m).val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#prdamnt' + m).val() + "></td>" +
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
                      
                        i++;
                        $('#iconForm').hide();
                        $('#Warningpopup').fadeOut();                     
                        $('#txtproduct0').focus();
                    }
                }
                $('#proddiv').animate({ scrollTop: 5000 }, 900);
                $('#searchItemCode').val('');
                $('#hiddenitemcode').val('');
            }
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
    $('#Totgridpdcts').val(flg);
    $('#Totgridqty').val(totqty);
}

//Pop Up for Sales Transactions
function SalesTransLoad(result) {

    disable_datatable('tblsalestrans');
    $('#tblsalestrans tr').remove();
    var ProdRow = "<thead><tr><th style='width:12%'>SalesInv.</th><th>Date</th><th style='width:12%'>AccountName</th><th style='width:20%'>Address</th><th style='width:6%'>Qty.</th><th>Price</th><th style='width:1%'>Location</th><th>SalesMan</th><th style='width:7%'>LPO</th><th>Dept</th></tr>" +
                               "<tr><th style='width:12%'>SalesInv.</th><th>Date</th><th style='width:12%'>AccountName</th><th style='width:20%'>Address</th><th style='width:6%'>Qty.</th><th>Price</th><th style='width:1%'>Location</th><th>SalesMan</th><th style='width:7%'>LPO</th><th>Dept</th></tr></thead><tbody>";


    if (result.length != 0) {

        for (var n = 0; n < result.length; n++) {

            ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
               "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
               "<td class='text-left'>" + result[n].InvDate + "                                   </td>" +
               "<td class='text-left'>" + result[n].CustName + "                                   </td>" +
               "<td  class='text-left'>" + result[n].CustAddress + "                                   </td>" +
               "<td  class='text-right'>" + result[n].ProdQty + "                                   </td>" +
               "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
               "<td class='text-left'>" + result[n].Location + " </td>" +
               "<td class='text-left'>" + result[n].SalesMan + " </td>" +
               "<td style='width:7%' class='text-left'>" + result[n].LPONumber + "                                   </td>" +
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



//Save Quotation
function saveQuotation(flg) {
    if ($('#select_locn').val() == '' || $('#select_locn').val()==0)
        $('#select_locn').val(UserLocationId);

    if ($('#select_salesman').val() == '' || $('#select_salesman').val() == 0) 
        $('#select_salesman').val(UserSalesmanId);

    $('#select_crncy').val(BaseCurrency);
    $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));

    var r = parseFloat($('#txtcrncyrate').val());
    $("#txtcrncyrate").val(isNaN(r) ? 0 : r);
    var rowcount = CountRows();

    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
        return false;
    }
    else if (copyflag == 1) {
        return false;
    }
    else if ($.trim($("#txtcustomer").val()) == '') {
        warningshow('Please Select Customer', 'txtcustomer');
    }

    else if ($('#select_place').val() == 0) {
        warningshow('Please Select Place', 'select_place');
    }   
    else if (rowcount == 0) {
        warningshow('No Products Added!', 'txtproduct0');
    }
    else {
        
        $('#confirmOk').prop('disabled', true);
        $('#btnsubmit').prop('disabled', true);
        var gamt = $('#FcGrandTotal').val();
        var gntamt = Math.round(gamt);
        var roundgndtotal = 0;
        if (gamt > gntamt) {
            roundgndtotal = $('#FcGrandTotal').val() - gntamt;
        }
        else {
            roundgndtotal = gntamt - $('#FcGrandTotal').val();
        }
        $('#roundgndtotal').val(roundgndtotal.toFixed(Decimal));

        var fgamt = $('#GrandTotal').val();
        var fcgntamt = Math.round(fgamt);
        var roundfcgndtotal = 0;
        if (fgamt > fcgntamt) {
            roundfcgndtotal = $('#GrandTotal').val() - fcgntamt;
        }
        else {
            roundfcgndtotal = fcgntamt - $('#GrandTotal').val();
        }
        $('#roundfcgndtotal').val(roundfcgndtotal.toFixed(Decimal));

        var oArray = new Array();
        for (var k = 1; k <= i; k++) {
            var ProductId = $('#PrdtId' + k).val();
            var ProductCode = $('#txtproduct' + k).val();
            var ProductDescr = $('#ProductDesc' + k).val();
            //var EnquiryNo = $('#txtEnquiryNo').val();
            var EnquiryNo = $('#enqno' + k).val();
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
            var CustId = $('#txtCustId').val();
            var CustName = $('#txtcustomer').val();
            var CustAddress = $('#txtaddress').val();
            var InvDate = $('#txtivdate').val();
            var SalesManId = $('#select_salesman').val();
            var AreaId = $('#select_place').val();
            var CurrencyId = $('#select_crncy').val();
            var CurrencyRate = $('#txtcrncyrate').val();
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
            var PhoneNumber = $('#txtphone').val();
            var DocNumber = $('#txtlpono').val(); //$('#txtdocumentno').val();
            var Subjects = $('#txtsubject').val();
            var QuotationCount = $('#QuotationCount').val();
            var Attention = $('#txtattention').val();
            var Location = $('#select_locn').val();
            var QDays = $('#txtdays').val();
            var QuotationNo = $('#txtQuotationNo').val();
            var DelFlag = 1;
            var EnqSubId = $('#enqsubid' + k).val();
            var EntryDate = $('#QtnDate').val();
            if (ProductCode != undefined) {

                oArray.push({
                    'ProductId': ProductId,
                    'ProductCode': ProductCode,
                    'ProductDescr': ProductDescr,
                    'EnquiryNo': EnquiryNo,
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
                    'CustId': CustId,
                    'CustName': CustName,
                    'CustAddress': CustAddress,
                    'InvDate': InvDate,
                    'SalesManId': SalesManId,
                    'AreaId': AreaId,
                    'CurrencyId': CurrencyId,
                    'CurrencyRate': CurrencyRate,
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
                    'PhoneNumber': PhoneNumber,
                    'DocNumber': DocNumber,
                    'Subjects': Subjects,
                    'QuotationCount': QuotationCount,
                    'Attention': Attention,
                    'Location': Location,
                    'QDays': QDays,
                    'QuotationNo': QuotationNo,
                    'DelFlag': DelFlag,
                    'EnqSubId': EnqSubId,
                    'EntryDate': EntryDate,
                })
            }

        }
        if (oArray != "") {
            var data = { 'QuotationEntryModel': oArray };
            if (flg == 1) {
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/QuotationEntryInsertandUpdate",
                    data: data,
                    success: function (result) {
                    $('#savedQuotation').val(result.oList[0].QuotationNo);
                   var status = result.oList[0].Status;
                   var QuotationNo = result.oList[0].QuotationNo;
                   //$('#btnsubmit').prop('disabled', false);
                   Showalerts(status, QuotationNo);
                    }
                });
            }
            else if (flg == 2) {
                $.ajax({
                    type: "POST",
                    url: "../SalesInvoice/QuotationEntryUpdate",
                    data: data,
                    success: function (result) {
                        $('#savedQuotation').val(result.oList[0].QuotationNo);
                        var status = result.oList[0].Status;
                        var QuotationNo = result.oList[0].QuotationNo;
                        $('#btnsubmit').prop('disabled', false);
                        Showalerts(status, QuotationNo);
                    }
                });
            }
  
        }
    }
}

//Document Ready
$(document).ready(function () {

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
                    LocnLoad();
            }
        }
    });
  
    $('#txtivdate,#QtnDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }

    });
    $('#DateFrom,#DateTo').daterangepicker({
        startDate: CurDate,
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    deptloadView();
    $('#SearchFromdateenq,#SearchToDateenq,#SearchFromdateenq1,#SearchToDateenq1,#SearchFromdateqtn,#SearchToDateqtn,#SearchFromdateqtn1,#SearchToDateqtn1').daterangepicker({
        minDate: minDate,
        // maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }

    });

    $("#searchItemCode").focus(function (e) {
        Getproddetails(0);
        rowbgcolor(0);
        
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
        $("#btncnclsave").addClass("btn btn-warning");
    });
    //Print Button Click After Save Bill
    $('#btnok').click(function () {
        if (QuotationBillType == 'DEFAULT')
        { PrintthisBillWindowsNew('QUOTATION', i, 'MAIN'); }
        else if (QuotationBillType == 'DEFAULT_LETTER')
        { PrintthisBillWindowsNew('QUOTATION_LETTER', i, 'MAIN'); }
        else if (QuotationBillType == 'LOCAL')
        { PrintthisBillWindows('QUOTATION', i, 'MAIN'); }
        else if (QuotationBillType == 'QUOTATIONGAS')
        { PrintthisBillWindows('QUOTATIONGAS', i, 'MAIN'); }

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



    $("#btnadd").focus(function (e) {
        $("#btnadd").removeClass("btn btn-outline-primary");
        $("#btnadd").addClass("btn btn-primary");
    });

    $("#btnadd").focusout(function () {
        $("#btnadd").removeClass("btn btn-primary");
        $("#btnadd").addClass("btn btn-outline-primary");
    });

    $("#btnok").focus(function (e) {
        $("#btnok").removeClass("btn btn-outline-primary");
        $("#btnok").addClass("btn btn-primary");
    });
    $("#btnok").focusout(function (e) {
        $("#btnok").removeClass("btn btn-primary");
        $("#btnok").addClass("btn btn-outline-primary");
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
    $("#btncnclalrt").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnok").focus();
        }
    });
    $('#txt_code,#txt_cname,#txt_rate,#txtname,#select_areagroup,#txtcode,#txtdescription,#code,#txt_fname,#txt_lname,#txt_amount,#txt_address1,#txt_address2,#txt_address3,#txtdesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });



    $('#txt_remark,#txtdescription,#txt_contactnumber,#txtterms').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 2).focus();
        }

    });
    $('.form-control').attr('autocomplete', 'off');
    $('#txtcustomer').focus();
    //$('#btntrnsfr').css("height", '100%');
    //$('#select_transfer').css("height", '100%');

    $('#btncrncy').css("height", '100%');
    $('#select_crncy').css("height", '100%');

    crncyload(0);
    placeload(0);
    Salesman(0);

   
    QtnLoad();
    TaxCall();

    $("#flip1").click(function () {
        $("#panel1").slideToggle(1);
        $('#txtmsg').focus();
    });


    $("#btnsubmit").click(function (e) {
        saveQuotation(1);
    });


    $('#txtphone,#txtcrncyrate,#txtdocumentno,#select_locn,#txtaddress,#txtlpono').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 1).focus();
        }

    });

    
    $('#select_place').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtsubject').focus();
        }

    });
    $('#txtaddress').keydown(function (e) { 
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtattention').focus();
        }

    });
   
    $('#txtsubject').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtcustomer').focus();
        }

    });
    
    $('#txtattention').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtlpono').focus();
        }

    });

    $('#txtivdate,#QtnDate,#txtdays').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtproduct0').focus();
        }

    });
    $('#select_crncy,#select_salesman,#select_transfer').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 2).focus();
        }

    });
    //$('#select_place').keydown(function (e) {
    //    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //    if (key == 13) {
    //        e.preventDefault();
    //        $('#select_crncy').focus();
    //    }

    //});



    $("#tax_job").change(function () {

        var selectedValue = $(this).val();
        $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
        var x = $('#taxpercentage_job').val();
        CalcJobAmount();
    });


    $("#txtproduct0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#PrdtId0').val() != 0) {
                $('#txtquantity0').focus();
            }
            else if ($('#PrdtId0').val() == 0 && ($.trim($('#txtproduct0').val()) == 'job' || $.trim($('#txtproduct0').val()) == 'JOB')) {
                addpopupjob(1);
                clearrow();
                $('#productjob').focus();
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


    //var input = document.getElementById("btnpdct");
    //input.addEventListener("keyup", function (event) {
    //    event.preventDefault();
    //    if (event.keyCode === 13) {
    //        $('#txtquantity0').focus();
    //    }
    //});



    $("#select_crncy").change(function () {

        var selectedValue = $(this).val();
        $("#txtcrncyrate").val($(this).find("option:selected").attr("name"))
        for (j = 0; j <= i; j++) {
            amountcalculation(j);
        }
        CalcGrandTotal(i);
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
            //if ($('#txtCustId').val() != 0) {
            //    $('#txtphone').focus();
            //}
            //else {
                $('#txtproduct0').focus();
           // }
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

    $('#txtQuotationNocopy').keyup(function (e) {
        e.preventDefault();
        //   $('#tour1').fadeOut();
        $('#Warningpopup').fadeOut();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        if (entrkey == 8) {
            Tbldelete();
            copyrefresh();
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
    // ----------------------------------------------------------------------------------------------------------Enquiry-----------------------
    //View Button Click to view product details against an enquity
    $("#btnview").click(function (e) {
        var EnqNo = '';
        var CurncyId = '';
        var fl = 0;
        var row = $('#RowGet4').val();
        var checkboxes = document.getElementsByName('Checkcustenq');
        for (var k = 0, j = checkboxes.length; k < j; k++) {
            if (checkboxes[k].checked == true) {
                fl++;
            }
        }
       
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
            enno = EnqNo;
            var data = {};
            data.EnquiryNum = EnqNo;
            data.ProductId = 0;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/CustomerEnquiryGetProducts",
                data: data,
                success: function (result) {
                    if (EnqNo != 0)
                        ShowItemGet(result.oList);
                }
            });
        

    });


    //Button Click to add selected product details to grid from popup table(Enquiry table data)
    $("#btnprdtadd").click(function (e) {
        var row = $('#RowGet1').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        TaxClear();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('CheckQtnItemen');
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
                    var enqsubid = $('#enqsubidrow' + m).text();


                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'enqsubid' + id + " style='display:none' value='" + enqsubid + "' /><input type='text' id=" + 'enqno' + id + " style='display:none' value='" + enqno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "</tr>";
                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    amountcalculation(id);
                    TaxSplit(id);
                    productpopuprefresh();
                    CalcGrandTotal(i);
                    fccalculation(i);
                    i++;

                }
                //  i = parseInt(row) + 1;
                CloseEnquiry();
                $('#txtproduct0').focus();
                getdate();
            }
        }
    });

    // ---------------------------------------------------------------------------------------------------------End Enquiry----------------------

    // ---------------------------------------------------------------------------------------------------Quotation(Recall&Revision)-------------

    //View Button Click to view product details against an Quotation
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
        if (fl == 0 && $('#select_transfer').val() == 1) {
            warningshow('Select Quotation Number');
        }
        else if (fl != 1 && $('#select_transfer').val() == 2) {
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
                        warningshow('Please Select Quotation Entry with Same Curency!');
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
            qtno = QtnNo;
            var data = {};
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
        var row = $('#RowGet6').val();
        var flg = 0;
        $("#tblsalesinvoice tr").remove();
        TaxClear();
        for (m = 1; m <= row; m++) {
            var checkboxes = document.getElementsByName('CheckQtnItemqn');
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

                    $('#txtQuotationNo').val(qtnno);
                    var rowcount = CountRows();
                    if (rowcount == 0) {
                        i = 1;
                    }
                    var slno = rowcount + 1;
                    var id = parseInt(i);

                    var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                        "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                        "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'qtnno' + id + " style='display:none' value='" + qtnno + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + Productcode + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input disabled='' class='form-control text-left' type='text' style='height:30px;background-color:white' id=" + 'ProductDesc' + id + " value='" + ProductDescr + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + qty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + fcrate + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + rate + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + fcdiscount + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + discount + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + fctaxableamt + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + taxableamt + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px;' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + taxrate + " onkeyup='amountcalculation(" + id + ")'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + fctaxamt + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + taxamt + " disabled=''></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + fctotal + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + total + "></td>" +
                        "</tr>";

                    $('#tblsalesinvoice').append(ProdRow1);
                    $('#select_unit' + id).val(unitIdgrid);
                    $('#select_tax' + id).val(taxid);
                    amountcalculation(id);
                    TaxSplit(id);
                    productpopuprefresh();
                    CalcGrandTotal(i);
                    fccalculation(i);
                    i++;
                }
                //    i = parseInt(row) + 1;
                CloseEnquiry();
                $('#txtproduct0').focus();
                getdate();
            }
        }
    });
    // ------------------------------------------------------------------------------------------------------End Quotation-----------------------

});
function deptloadView() {
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
//Main Function For Transfer dropdown
function Transfer() {
    disabletables();
    if ($('#select_transfer').val() == 1)      //Recall Old
    {
        Enquirypopupwindow(3);
    }
    else if ($('#select_transfer').val() == 2)      //Make Revision
    {
        Enquirypopupwindow(2);
    }
    else if ($('#select_transfer').val() == 3)       //Enquiry 
    {
        Enquirypopupwindow(1);
    }
}

//Show Enquiry PopUp and Display Enquiry List
function Enquirypopupwindow(id) {
    disabletables();
    $('#Enquirydiv').hide();
    $('#Enquirydivcust').hide();
    $('#Qtndiv').hide();
    $('#Qtndivcust').hide();
    $('#Qtndivsub').hide();
    $('#Enquirydivsub').hide();
    if (id == 1)                                                           //List Customer Enquiry Details in pop up
    {
        if ($('#txtCustId').val() == 0)      //If CustId==0 Get all Enquiry Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Customer Enquiry');
            $('#Enquirydiv').show();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            var data = {};
            data.CustId = 0;
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/QuotationEnquiryGets",
                data: data,
                success: function (result) {
                    $('#tblEnquiry tr').remove();
                    EnquiryLoad(result.oList);
                }
            });
        }
        else                              //If CustId!=0 Get Enquiry Details against That Customer
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Customer Enquiry');
            $('#Enquirydivcust').show();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Qtndiv').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            var data = {};
            data.CustId = $('#txtCustId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../SalesInvoice/QuotationEnquiryGets",
                data: data,
                success: function (result) {
                    $('#tblEnquirycust tr').remove();
                    EnquiryLoadCust(result.oList);
                }
            });
        }

    }

    else if (id == 2)                                                      //List Quotation Entry To Make Revision
    {
        if ($('#txtCustId').val() == 0)  //If CustId==0 Get all Quotation Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Make Revision');
            $('#Qtndiv').show();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            var data = {};
            data.QuotationNo = 0;
            data.CustId = 0;
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
            $('#Enquiryheader').text('Make Revision');
            $('#Qtndivcust').show();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#Qtndiv').hide();
            $('#Qtndivsub').hide();
            var data = {};
            data.QuotationNo = 0;
            data.CustId = $('#txtCustId').val();
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

    else if (id == 3)                                                         //List All Quotation Entry Details in pop up (Recall)
    {
        if ($('#txtCustId').val() == 0)            //If CustId==0 Get all Quotation Details
        {
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Quotation Entry Details');
            $('#Qtndiv').show();
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#Qtndivcust').hide();
            $('#Qtndivsub').hide();
            var data = {};
            data.QuotationNo = 0;
            data.CustId = 0;
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
            $('#Enquirydiv').hide();
            $('#Enquirydivsub').hide();
            $('#Enquirydivcust').hide();
            $('#Qtndiv').hide();
            $('#Qtndivsub').hide();
            var data = {};
            data.QuotationNo = 0;
            data.CustId = $('#txtCustId').val();
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
}


//---------------------------------------------------------------------------------------------Close Enquiry&Quotation--------------------------

//Close Enquiry PopUP
function CloseEnquiry() {
    disabletables();
    if ($('#select_transfer').val() != 2) {
        QtnLoad();
    }
    $('#Enquirypopup').hide();
    $('#Enquirydiv').hide();
    $('#Enquirydivsub').hide();
    $('#Enquirydivcust').hide();
    $('#Qtndiv').hide();
    $('#Qtndivcust').hide();
    $('#Qtndivsub').hide();
    $('#RowGet1').val(0);
    $('#RowGet').val(0);
    $('#RowGet2').val(0);
    $('#RowGet3').val(0);
    $('#RowGet4').val(0);
    $('#RowGet5').val(0);
    $('#RowGet6').val(0);
    $('#txtEnquiryNo').hide();
    $('#txtQuotationNo').show();
    $('#Warningpopup').fadeOut();
    //  removetblrow();
    qtno = ''; enno = '';
    $('#SearchCustenq').val('')
    $('#hiddencustIdenq').val(0);
    $('#SearchFromdateenq').val(CurDate);
    $('#SearchToDateenq').val(CurDate);

    $('#SearchFromdateenq1').val(CurDate);
    $('#SearchToDateenq11').val(CurDate);
    $('#SearchProdenq').val('')
    $('#hiddenProdIdenq').val('');

    $('#SearchCustqtn').val('');
    $('#hiddencustIdqtn').val(0);
    $('#SearchFromdateqtn').val(CurDate);
    $('#SearchToDateqtn').val(CurDate);

    $('#SearchFromdateqtn1').val(CurDate);
    $('#SearchToDateqtn1').val(CurDate);

    $('#SearchProdqtn').val('')
    $('#hiddenProdIdqtn').val('');
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
}

//Back Button for Transfer Popup
function Back(id) {
    if (id == 1) {
        $('#Enquirydiv').hide();
        $('#Enquirydivsub').hide();
        $('#Enquirydivcust').show();
        $('#hiddencustIdenq').val(0);
        $('#hiddenProdIdenq').val(0);
        $('#SearchCustenq').val('')
        $('#hiddencustIdenq').val(0);
        $('#SearchFromdateenq').val(CurDate);
        $('#SearchToDateenq').val(CurDate);

        $('#SearchFromdateenq1').val(CurDate);
        $('#SearchToDateenq11').val(CurDate);
        $('#SearchProdenq').val('')
        $('#hiddenProdIdenq').val('');
    }
    else if (id == 2) {
        $('#Qtndiv').hide();
        $('#Qtndivcust').show();
        $('#Qtndivsub').hide();
        $('#hiddenProdIdqtn').val(0);
        $('#hiddenProdIdenq').val(0);
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
}

//Clear Id's in Search
function emptyId(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddenProdIdqtn').val(0);

        $('#hiddenProdIdenq').val(0);

        $('#hiddencustIdqtn').val(0);

        $('#hiddencustIdenq').val(0);
    }
}
//---------------------------------------------------------------------------------------------End---------------------------------------------



//----------------------------------------------------------------------------------------------Enquiry---------------------------------------------

//List Enquiry Details in Enquiry Popup table
function EnquiryLoad(result) {
    disable_datatable('tblEnquiry');
    var responseText = "<thead><tr><th>Enquiry No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Subject</th><th>TRN Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th></th></tr>" +
                              "<tr><th>Enquiry No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Subject</th><th>TRN Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th> </th></tr></thead><tbody>"; // For Search
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
           '<td id=' + 'Enquirycol' + slno + '>' + result[l].EnquiryNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           '<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].PhoneNumber + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].Subject + '</td>' +
           '<td>' + result[l].DocNumber + '</td>' +
           '<td>' + result[l].Salesman + '</td>' +
            '<td>' + result[l].AreaName + '</td>' +
             '<td>' + result[l].CurrencyName + '</td>' +
              '<td><a onclick="EditEnquiry(' + result[l].EnquiryNo + ')">' + Addbutton + '</a></td>' +
           '</tr>';
    }

    $('#tblEnquiry').html(responseText + '</tbody>');
    datatableWithsearch('tblEnquiry', 'Multiple');
}


//List Enquiry Details Against Customer in Enquiry Popup table
function EnquiryLoadCust(result) {
    disable_datatable('tblEnquirycust');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5' checked id= 'SlNoHeadCheckCust0' 'custom-control-input cz-bg-image-display' onchange='selectallcust1()'>&nbsp;&nbsp;&nbsp;Select</th><th>Enquiry No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Subject</th><th>TRN Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr>" +
        "<tr><th style='width:90px;'>Select</th><th>Enquiry No</th><th>Customer</th><th>Address</th><th>Phone No</th><th>Invoice Date</th><th>Subject</th><th>TRN Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        $('#txtEnquiryNo').val(result[l].EnquiryNo);
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;" ><input type="checkbox" name="Checkcustenq"  checked  id=' + 'SlNoHeadCheckCust' + slno + '  "custom-control-input cz-bg-image-display" style="align:center;zoom:1.5"></td>' +
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
    $('#RowGet4').val(result.length);
}

//Selecting checkbox for enquiry Customer List
function selectallcust1() {
    var rowCount = $('#RowGet4').val();
    var flag = $("#SlNoHeadCheckCust0").is(":checked");
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
        $('#txtEnquiryNo').show();
        $('#txtQuotationNo').hide();
        CloseEnquiry();
        var data = {};
        data.EnquiryNo = EnquiryNo;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/CustomerEnquiryGetandGetsQtn",
            data: data,
            success: function (result) {
                CustomerEnquiryGets(result.oList);
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
        $('#txtaddress').val(result[n].PhoneNumber); 
        if (result[n].SalesManId != 0 && result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 && result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(DefaultArea);
        if (result[n].CurrencyId != 0 && result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
        
        $('#txtlpono').val(result[n].TRNNumber); 
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
        $('#txtEnquiryNo').val(result[n].EnquiryNo);
        //$('#txtQuotationNocopy').val(result[n].EnquiryNo);
        $('#txtphone').val(result[n].PhoneNumber);
        $('#txtdocumentno').val(result[n].DocNumber);
        $('#txtsubject').val(result[n].Subject);
        if (result[n].Location != 0 && result[n].Location != '')
            $('#select_locn').val(result[n].Location);
        else
            $('#select_locn').val(UserLocationId);
        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        var id = parseInt(n + 1);

        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + id + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'enqsubid' + id + " style='display:none' value='" + result[n].CustEnquirySubId + "' /><input type='text' id=" + 'enqno' + id + " style='display:none' value='" + result[n].EnquiryNo + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "</tr>";

        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        TaxSplit(id);
        amountcalculation(id);
        id++;
        clearrow();
    }
    i = parseInt(result.length + 1);
    CalcGrandTotal(i);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    getdate();
}

//ProductList in the DB based on Customer Enquiry No
function ShowItemGet(result) {
    disable_datatable('tblEnquirypsub');
    $('#Enquirydivcust').hide();
    $('#Enquirydivsub').show();
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5' checked id= 'SlNoCheckItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdt()'>&nbsp;&nbsp;&nbsp;Select</th><th>Enquiry No</th><th style=display:none;></th><th style=display:none;></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style=display:none;></th><th style=display:none;></th><th style=display:none;></th><th style=display:none;></th><th>Tax Amount</th><th>Amount</th></tr>" +
                              "<tr><th style='width:90px;'> </th><th>Enquiry No</th><th style=display:none;></th><th style=display:none;></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style=display:none;></th><th style=display:none;></th><th style=display:none;></th><th style=display:none;></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" style="zoom:1.5" name="CheckQtnItemen" checked  id= ' + 'SlNoCheckItem' + slno + ' ></td>' +
        '<td id=' + 'enqnoRow' + slno + '>' + result[l].EnquiryNo + '<input type="hidden" id="enqno"' + slno + '" value=' + result[l].EnquiryNo + '></td>' +
        '<td style=display:none; id=' + 'enqsubidrow' + slno + '>' + result[l].CustEnquirySubId + '</td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '></td>' +
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

//Saerch Customer in Enquiry Popup When CustId=0 
function SearchEnquiry(Flag) {
    disable_datatable('tblEnquiry');
    if (Flag == 1)                         //search
    {
        if ($('#hiddencustIdenq').val() == 0) {
            $('#SearchCustenq').val('');
            $('#SearchCustenq').focus();
        }
        $("#Enquirypopup").css("margin-top", '-50px');
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
        var data = {};
        data.CustId = $('#hiddencustIdenq').val();
        data.FromDate = $('#SearchFromdateenq').val();
        data.ToDate = $('#SearchToDateenq').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEnquiryGets",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblEnquiry').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    EnquiryLoad(result.oList);
                }
            }
        });
    }
    else if (Flag == 0)                      //Clear
    {
        $('#SearchCustenq').val('')
        $('#hiddencustIdenq').val(0);
        $('#SearchFromdateenq').val(CurDate);
        $('#SearchToDateenq').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
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
        var data = {};
        data.CustId = 0;
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEnquiryGets",
            data: data,
            success: function (result) {
                EnquiryLoad(result.oList);
            }
        });
    }
}

//Search Customer in Enquiry Popup When CustId!=0
function SearchSEnqCust(flag) {
    disable_datatable('tblEnquirycust');
    if (flag == 1)          //Search
    {
        $("#Enquirypopup").css("margin-top", '-50px');
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
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = $('#SearchFromdateenq1').val();
        data.ToDate = $('#SearchToDateenq1').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEnquiryGets",
            data: data,
            success: function (result) {
                if (result.oList.length == 0) {
                    $('#tblEnquirycust').html("<b><center><span class='label label-danger'>No records found</span></center></b>");
                }
                else {
                    EnquiryLoadCust(result.oList);
                }
            }
        });
    }
    else if (flag == 0)        //Clear
    {
        $('#SearchFromdateenq1').val(CurDate);
        $('#SearchToDateenq1').val(CurDate);
        $("#Enquirypopup").css("margin-top", '-50px');
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
        removetblrow();
        var data = {};
        data.CustId = $('#txtCustId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/QuotationEnquiryGets",
            data: data,
            success: function (result) {
                $("#tblEnquirycust tr").remove();
                EnquiryLoadCust(result.oList);
            }
        });
    }
}

//Saerch Product in Enquiry Popup
var enno = '';
function SearchEnquirySub(Flag) {
    disable_datatable('tblEnquirypsub');
    if (Flag == 1)                          //search
    {
        if ($('#hiddenProdIdenq').val() == 0) {
            $('#SearchProdenq').val('');
            $('#SearchProdenq').focus();
        }
        var data = {};
        data.EnquiryNum = enno;
        data.ProductId = $('#hiddenProdIdenq').val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/CustomerEnquiryGetProducts",
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
    else if (Flag == 0) {
        $('#SearchProdenq').val('')
        $('#hiddenProdIdenq').val('');
        var data = {};
        data.EnquiryNum = enno;
        data.ProductId = 0;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/CustomerEnquiryGetProducts",
            data: data,
            success: function (result) {
                ShowItemGet(result.oList);
            }
        });
    }                    //Clear
}


//--------------------------------------------------------------------------------------------End Enquiry--------------------------------------------

//--------------------------------------------------------------------------------------Quotation(Revision&Recall)---------------------------------------------

//List Quotation Details in Quotation Popup 
function QuotationLoad(result) {
    disable_datatable('tblQtn');
    var responseText = "<thead><tr><th></th><th>Quotation No</th><th>Customer</th><th>Phone No</th><th>Invoice Date</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th></th></tr>" +
                              "<tr><th>Select</th><th>Quotation No</th><th>Customer</th><th>Phone No</th><th>Invoice Date</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'></th><th style='display:none'></th><th>Details</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" name="CheckRevision" id= ' + 'SlNoCheckRevision' + slno + ' style="zoom:1.5"></td>' +
           '<td id=' + 'Enquirycol' + slno + '>' + result[l].QuotationNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           //'<td>' + result[l].CustAddress + '</td>' +
           '<td>' + result[l].PhoneNumber + '</td>' +
           '<td>' + result[l].InvDate + '</td>' +
           '<td>' + result[l].DocNumber + '</td>' +
           '<td>' + result[l].Salesman + '</td>' +
           '<td>' + result[l].AreaName + '</td>' +
           '<td id=' + 'Curncy' + slno + '>' + result[l].CurrencyName + '</td>' +
           '<td style="display:none" id=' + 'Qtnnum' + slno + '> ' + result[l].QuotationNo + '</td>' +
           '<td style="display:none" id=' + 'Qtmainid' + slno + '>' + result[l].QuotationEntryMainId + '</td>' +
           '<td style="display:none" id=' + 'Qtsubid' + slno + '>' + result[l].QuotationEntrySubId + '</td>' +
           '<td><a onclick="ViewRevisionDetails(' + result[l].QuotationNo + ')">Details</a></td>' +
           '</tr>';

    }
    $('#tblQtn').html(responseText + '</tbody>'); 
    datatableWithsearch('tblQtn', 'Multiple');
    $('#RowGet2').val(result.length);
}

//List Quotation Details against a customer in Quotation Popup 
function QuotationCustLoad(result) {
    disable_datatable('tblQtncust');
    var responseText = "<thead><tr><th style='width:90px;'><input type='checkbox' style='zoom:1.5' checked id= 'SlNoHdCheckCust0' 'custom-control-input cz-bg-image-display' onchange='selectallcust()'>&nbsp;&nbsp;&nbsp;Select</th><th>Quotation No</th><th>Customer</th><th>Phone No</th><th>Invoice Date</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'><th></th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Quotation No</th><th>Customer</th><th>Phone No</th><th>Invoice Date</th><th>Document Number</th><th>Salesman</th><th>Area</th><th>Currency</th><th style='display:none'></th><th style='display:none'><th>Details</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        if ($('#select_transfer').val() == 2) {
            $('#QuotationCount').val(result[l].QuotationCount + 1);
            $('#txtQuotationNo').val(result[l].QuotationNo);
        }
        else {
            $('#QuotationCount').val(result[l].QuotationCount);
            QtnLoad();
        }
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
            '<td ><input type="checkbox" name="Checkcust" checked id= ' + 'SlNoHdCheckCust' + slno + ' style="zoom:1.5" ></td>' +
           '<td id=' + 'Qtncol' + slno + '>' + result[l].QuotationNo + '</td>' +
           '<td>' + result[l].CustName + '</td>' +
           //'<td>' + result[l].CustAddress + '</td>' +
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
}

//Selecting checkbox for Quotation Customer List
function selectallcust() {
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
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' style='zoom:1.5' checked id= 'SlNoCheckQtnItem0' 'custom-control-input cz-bg-image-display' onchange='selectallprdtqtn()'>&nbsp;&nbsp;&nbsp;Select</th><th>Quotation No</th><th style=display:none;></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style=display:none;></th><th style=display:none;></th><th style=display:none;></th><th style=display:none;></th><th>Tax Amount</th><th>Amount</th></tr>" +
                              "<tr><th style='width:90px;'>Select</th><th>Quotation No</th><th style=display:none;></th><th>Product Code</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th style=display:none;></th><th style=display:none;></th><th style=display:none;></th><th style=display:none;></th><th>Tax Amount</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;"><input type="checkbox" style="zoom:1.5" name="CheckQtnItemqn" checked  id= ' + 'SlNoCheckQtnItem' + slno + ' ></td>' +
       '<td id=' + 'qtnnoRow' + slno + '>' + result[l].QuotationNo + '<input type="hidden" id="enqno"' + slno + '" value=' + result[l].QuotationNo + '></td>' +
        '<td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ProductId + '></td>' +
        '<td id=' + 'Productcode' + slno + '>' + result[l].ProductCode + '</td>' +
        '<td id=' + 'Des' + slno + '>' + result[l].ProductDescr + '</td>' +
        '<td id=' + 'UnitName' + slno + '>' + result[l].UnitName + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
        '<td id=' + 'qty' + slno + '>' + parseInt(result[l].ProdQty) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].ProdQty + '></td>' +
        '<td id=' + 'rate' + slno + '>' + parseFloat(result[l].ProdRate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].ProdRate + '><input type="hidden" id="fcrte_' + slno + '" value=' + result[l].FcProdRate + '></td>' +
        '<td style=display:none; id=' + 'discount' + slno + '>' + parseFloat(result[l].ProdDisc).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' + result[l].ProdDisc + '><input type="hidden" id="fcdis_' + slno + '" value=' + result[l].FcProdDisc + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' + result[l].TaxId + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' + result[l].TaxPercent + '></td>' +
        '<td style=display:none;><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' + result[l].TaxableAmount + '><input type="text" style="display:none;" id= ' + 'fctaxableamt' + slno + ' value= ' + result[l].FCTaxableAmount + '></td>' +
        '<td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].TaxAmount).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' + result[l].TaxAmount + '><input type="hidden" id="fctaxamt_' + slno + '" value=' + result[l].FCTaxAmount + '>' +
        '<td id=' + 'total' + slno + '>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '><input type="hidden" id="fctotal_' + slno + '" value=' + result[l].FCAmount + '></td></tr>';
    }

    $('#tblQtnsub').html(responseText + '</tbody>');
    datatableWithsearch('tblQtnsub', 'Multiple');
    $('#RowGet6').val(result.length);
}

//Selecting checkbox for productslist(Quotation)
function selectallprdtqtn() {
    var rowCount = $('#RowGet6').val();
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
                data.QuotationNo = $('#Qtnnum' + m).text();
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

    

    $('#txtaddress').val(result[0].CustAddress); 
    $('#txtlpono').val(result[0].DocNumber); 

    for (var n = 0; n < result.length; n++) {
        var en = 0;
        if ($('#select_transfer').val() == 2) {
            $('#QuotationCount').val(result[n].QuotationCount + 1);
            $('#txtQuotationNo').val(result[n].QuotationNo);
            en = result[n].EnquiryNo;
        }
        else {
            $('#QuotationCount').val(result[n].QuotationCount);
            QtnLoad();
        }

        $('#txtcustomer').val(result[n].CustName);
        $('#txtCustId').val(result[n].CustId);
       

        if (result[n].SalesManId != 0 && result[n].SalesManId != '')
            $('#select_salesman').val(result[n].SalesManId);
        else
            $('#select_salesman').val(UserSalesmanId);
        if (result[n].AreaId != 0 && result[n].AreaId != '')
            $('#select_place').val(result[n].AreaId);
        else
            $('#select_place').val(DefaultArea);
        if (result[n].CurrencyId != 0 && result[n].CurrencyId != '') {
            $('#select_crncy').val(result[n].CurrencyId);
            $('#txtcrncyrate').val(parseFloat(result[n].CurrencyRate));
        }
        else {
            $('#select_crncy').val(BaseCurrency);
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        }
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
        $('#txtphone').val(result[n].PhoneNumber);
        $('#txtdocumentno').val(result[n].DocNumber);
        $('#txtsubject').val(result[n].Subjects);

        $('#txtattention').val(result[n].Attention);
        if (result[n].Location != 0 && result[n].Location != '')
            $('#select_locn').val(result[n].Location);
        else
            $('#select_locn').val(UserLocationId);
        $('#txtdays').val(result[n].QDays);

        var fcur = result[n].FCGrandTotal;
        $("#fc").text('FC : ' + fcur.toFixed(Decimal));
        var rowcount = CountRows();
        if (rowcount == 0) {
            i = 1;
        }
        var slno = rowcount + 1;
        var id = parseInt(n + 1);

        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                  "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                  "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
                  "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'enqno' + id + " style='display:none' value='" + en + "' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + result[n].ProductId + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + result[n].ProductCode + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + result[n].ProductDescr + "'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + result[n].ProdQty + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat(result[n].FcProdRate).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat(result[n].ProdRate).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat(result[n].FcProdDisc).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat(result[n].ProdDisc).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat(result[n].FCTaxableAmount).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat(result[n].TaxableAmount).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + result[n].TaxPercent + " onkeyup='amountcalculation(" + id + ")'></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat(result[n].FCTaxAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat(result[n].TaxAmount).toFixed(Decimal) + " disabled=''></td>" +
                  "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat(result[n].FCAmount).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + parseFloat(result[n].Amount).toFixed(Decimal) + "></td>" +
                  "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val(result[n].UnitId);
        $('#select_tax' + id).val(result[n].TaxId);
        TaxSplit(id);
        amountcalculation(id);

        i++;
    }
    //  i = parseInt(result.length + 1);
    CalcGrandTotal(i);
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    getdate();
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
        var responseText = "<thead><tr><th>Quotation No</th><th>Customer</th><th>Phone</th><th>Date</th><th>Currency</th><th>Currency Rate</th><th>Total Discount</th><th>Total Taxable</th><th>Total Tax</th><th>Grand Toatal</th><th></th></tr></thead><tbody>";
        for (var l = 0; l < result.length; l++) {
            var str = result[0].CustAddress;
            var array = [];
            array = str.split("-#%%#-");

            var slno = parseInt(l + 1);
            responseText += '<tr id=' + "row" + slno + '>' +
               '<td id=' + 'Enquirycol' + slno + '>' + result[l].QuotationNo + '</td>' +
               '<td>' + result[l].CustName + '</td>' + 
               '<td >' + array[0] + '</td>' + 
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

function productpopuprefresh() {
    $('#productpopupdiv').hide();
    $('#pdctrow').remove();
    $('#pdctrow1').remove();
    $('#custlsp').hide();
}


function formrefresh() {
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        $('#btnedit').hide();
        $('#btnsaveedit').hide();
        
        $('#PrdtId0').val(0);
        $('#btnview').show();
        Tbldelete();
        copyrefresh();
        QtnLoad();
        removetblrow();
        GrandTotal = 0;

        copyflag = 0;
        foc = 0;
        qtyflag = 0;

        $('#copybill').hide();
        $('#bill').show();

        $('#txtEnquiryNo').hide();
        $('#txtQuotationNo').show();

        $('#btnlist').prop('disabled', false);

        $('#confirmOk').prop('disabled', false);
        $('#btntrnsfr').prop("disabled", false);
        $('#btnsubmit').prop("disabled", false);
        $('#btnlist').prop("disabled", false);
        $('#txtQuotationNo').prop("disabled", true);
        $('#btnadd').prop("disabled", false);
        $('#txtcustomer,#QtnDate').prop("disabled", false);
        $('#txtivdate').val(CurDate);
        $('#QtnDate').val(CurDate);
        
        $('#txttaxpercent0').val('');
        $('#txtmsg').val('');
        $('#txtcustomer').val('');
        $('#txtCustId').val(0);
        $('#txtsubject').val('');
        $('#txtattention').val('');
        $('#txtdays').val('');
        $('#select_transfer').val('0');
        $('#txtaddress').val('');
        $('#PriceGroupId').val(0);
        $('#select_salesman').val(UserSalesmanId);
        $('#select_place').val(DefaultArea);
        $('#txtproduct0').val('');
        $('#btndelete').hide();
        $('#select_unit0').val(0);
        $('#txtquantity0').val('');
        $('#txtstocktotloseqty0').val(0);
        $('#txtrate0').val('');
        $('#txtdiscount0').val('');
        $('#select_tax0').val(0);
        $('#txtamnt0').val('');
        $('#txtdocumentno').val('');
        $('#txtphone').val('');
        $('#roundgndtotal').val(0);
        $('#roundfcgndtotal').val(0);

        $('#TransPrdtId0').val(0);
        $('#codelength').val('');
        $('#AvgCost0').val(0);

        $('#TotalDiscount').val('0.00');
        $('#TotalTaxable').val('0.00');
        $('#TotalTax').val('0.00');
        $('#GrandTotal').val('0.00');
        $('#disc').val('0.00');
        $('#gndtotal').text('0.00');
        $('#fc').text('fc');
        $("#fc").css("opacity", '0');
        $('#btndelete').hide();
        $('#Warningpopup').fadeOut();

        $('#txtduedate').css("background-color", 'white');
        //$('#txttaxpercent0').css("background-color", 'white');
        //$('#txtamnt0').css("background-color", 'white');
        $('.form-control').prop("disabled", false); 
        $('#btncrncy,#btnsales,#btnsply,#btnpdct,#btncst,#btntrnsfr,#btnadd,#txtivdate').prop("disabled", false);
        $('#txtQuotationNo').prop("disabled", true);
        $('#txtduedate').prop("disabled", true);
        $('#txttaxpercent0').prop("disabled", true);
        $('#txtamnt0').prop("disabled", true);

        $('.jsgrid').prop("disabled", false);
        //   $('#tour1').fadeOut();
        $('#select_place').val(DefaultArea);

        productpopuprefresh();
        CloseEnquiry();

        $('#RowGet1').val(0);
        $('#RowGet4').val(0);
        $('#RowGet2').val(0);
        $('#RowGet3').val(0);
        $('#RowGet5').val(0);
        $('#RowGet6').val(0);
        $('#RowGet').val(0);
        $("#panel1").hide();

        $('#custlsp').hide();

        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        Defaultfocus();
        $('#editheader').show();
        $('#select_locn').val(UserLocationId);
        $('#TotalDiscount,#TotalTaxable,#TotalTax').prop("disabled", true);
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = '';
        splittaxid = ""; splittaxbleat = ""; splittaxat = "";
        TaxClear();
        $('#btnprint').hide();
        $('#btnsubmit').show();
        $('#btnlist').show();
        //$('#btntrnsfr').css("height", '80%');
        //$('#select_transfer').css("height", '80%');
        $('#btnsply').css("height", '80%');
        //$('#select_place').css("height", '80%');
        $('#txtlpono').val('');
        MultiPdtArray = [];
        $('#mltrcurrlength').val(0);
        $('#savedQuotation').val('');
        $("#btnExporttoExcel").hide();
    }

}

function EditInvoice(Flag) {


    $("#btncnclsave").attr("onclick", "CheckEditInvioce(" + Flag + ")");
    $('#otp,#otpremarks').prop("disabled", false);
    $('#OTPDiv').show();
    $("#otp,#otpremarks").val('');
    $("#otp").focus();

}

function CheckEditInvioce(Flag) {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'Quotation Entry Edit- OTP , Quotation No : ' + $('#txtQuotationNocopy').val();
        else if (Flag == 1)
            Operation = 'Quotation Entry Delete- OTP , Quotation No : ' + $('#txtQuotationNocopy').val();

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
            OKEditInvoice();
        }
        else if (Flag == 1) {
            ConfirmDelete();
        }
    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}
function ConfirmDelete() {
    $('#OTPDiv').hide();
    var data = {};
    data.QuotationNo = $('#txtQuotationNocopy').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/QuotationEntryDelete",
        data: data,
        success: function (result) {
            var status = result.oList[0].Status;
            var VocNo = result.oList[0].QuotationNo;
            Showalerts(status, VocNo);
        }
    });

}


function OKEditInvoice() {
    copyflag = 0;
    $('#OTPDiv').hide();
    $('#btnedit').hide();
    $('#btndelete,#btnprint,#btnview').hide();
    $('#btnsaveedit').show();
    $('.jsgrid-button').prop("disabled", false);
    $('.form-control,#btnadd').prop("disabled", true);
    $('#btnadd,.inputen,#QtnDate').prop("disabled", false);
    $('#txtQuotationNocopy').prop("disabled", true);
    $('#txtproduct0,#txtquantity0,#txtrate0,#txtdiscount0,#select_tax0').prop('disabled', false);
    $('#txtamnt0').prop('disabled', true);
}


function DeleteInvoice() {
    $('#Confirmflag').val('deleteQtn'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Delete?')
    $('#confirm').show();
    $('#confirmOk').focus();
}

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#alertdiv1').hide();
    $('#savedbillno').val('');
}

function Defaultfocus() {
    $('#txtcustomer').focus();
}

//Calculate GrandTotal Amount 
var GrandTotal;
function CalcGrandTotal(Id) {
    var TotalTaxable = 0;
    var TotalDiscount = 0;
    var TotalTax = 0;
    GrandTotal = 0;
    $('#GrandTotal').val('');
    $('#TotalDiscount').val('');
    $('#TotalTax').val('');
    $('#TotalTaxable').val('');
    for (var i = 1; i <= Id; i++) {
        GrandTotal = GrandTotal + parseFloat($('#txtamnt' + i).val() || 0);
        TotalDiscount = TotalDiscount + parseFloat($('#txtdiscount' + i).val() || 0);
        TotalTax = TotalTax + parseFloat($('#txttaxamnt' + i).val() || 0);
        TotalTaxable = TotalTaxable + parseFloat($('#txttaxableamnt' + i).val() || 0);
    }
    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#TotalDiscount').val(TotalDiscount.toFixed(Decimal));
    $('#TotalTax').val(TotalTax.toFixed(Decimal));
    $('#TotalTaxable').val(TotalTaxable.toFixed(Decimal));
    $('#gndtotal').text(GrandTotal.toFixed(Decimal));

    fccalculation(Id);

}


//Calculate FC of Product Row
function fccalculation(id) {
    var fc = parseFloat($('#txtcrncyrate').val()).toFixed(Decimal);
    fc = isNaN(fc) ? 0 : fc;


    var fcgrandtotal = 0;
    var fctotdisc = 0;
    var fctottaxable = 0;
    var fctottax = 0;

    fcgrandtotal = parseFloat($('#GrandTotal').val() || 0) * fc;
    var rowcount = CountRows();
    if (fcgrandtotal > 0 && rowcount > 0) {
        if (fc != 1) {
            $("#fc").css("opacity", '100');
        }
        else {
            $("#fc").css("opacity", '0');
        }
        $('#gndtotal').text(fcgrandtotal.toFixed(Decimal));

        $("#fc").text('FC : ' + GrandTotal.toFixed(Decimal));
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

//Calculate Product Row Amount
function amountcalculation(id) {
    var fc = $('#txtcrncyrate').val();
    var fcprodrate = 0;
    var fcproddisc = 0;
    var fctaxable = 0;
    var fctax = 0;
    var fcamnt = 0;

    var quantity = $('#txtquantity' + id).val() || 0;
    var rate = parseFloat($('#txtrate' + id).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var amount = parseFloat(quantity * rate);
    var discount = parseFloat($('#txtdiscount' + id).val() || 0);
    discount = isNaN(discount) ? 0 : discount;
    var taxableamount = parseFloat(amount - discount);
    var taxrate = parseFloat($('#txttaxpercent' + id).val() || 0);
    var taxamount = (taxableamount * taxrate) / 100;
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));
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

}

//Clear Product Row After Adding
function clearrow() {
    $('#TransPrdtId0').val(0);

    $('#codelength').val('');
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
    $('#AvgCost0').val(0);

}



var qtyflag = 0;
var foc = 0;

//Add Product Details To Product Grid
function productadd() {
    if ($('#select_locn').val() == '' || $('#select_locn').val() == 0)
        $('#select_locn').val(UserLocationId);
    var rowcount = CountRows();
    var ProductFlag = 0;
    var a = parseFloat($('#txtdiscount0').val());
    var c = parseFloat($('#txtrate0').val());
    $("#txtdiscount0").val(isNaN(a) ? 0 : a);
    $('#txtrate0').val(isNaN(c) ? 0 : c);
    for (var p = 1; p <= i; p++) {
        if (($('#PrdtId' + p).val() == $("#PrdtId0").val())) {
            ProductFlag = 1;
        }
    }
    if ($.trim($("#txtproduct0").val()) == '') {
        warningshow('Please Enter The Product', 'txtproduct0');
    }
    else if ($("#PrdtId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
        $('#txtproduct0').select();
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
        $('#Warningpopup').fadeOut();
        amountcalculation(0);
        var slno = rowcount + 1;
        var id = parseInt(i);
        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + slno + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'enqno' + id + " style='display:none' value='0'/><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $("#PrdtId0").val() + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#txtproduct0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $("#ProductDesc0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#txtquantity0').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'><input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#AvgCost0').val()).toFixed(Decimal) + " style='background-color:white;height:30px;display:none'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#txtfcrate0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate0').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#txtfcdiscount0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#txtdiscount0').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#txtfctaxableamnt0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxableamnt0').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#txttaxpercent0').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#txtfctaxamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttaxamnt0').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#txtfcamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#txtamnt0').val() + "></td>" +
            "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val($('#select_unit0').val());
        $('#select_tax' + id).val($('#select_tax0').val());
        TaxSplit(id);
        i++;
        clearrow();
        productpopuprefresh();
        CalcGrandTotal(i);
        fccalculation(i);
        salestranspopuprefresh();
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);

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
        var id = parseInt(i);


        var prodjob = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:2%'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:2%'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:2%;text-align:center'>" + no + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:3%;text-align:center'><input type='text' id=" + 'enqno' + id + " style='display:none' value='0' /><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='0' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#productjob").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:15%;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='JOB'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:2%'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#quantity_job').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:3%'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#fcamount_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate_job').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#fctxtdisc_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#discount_job').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#fctxttaxable_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxable_job').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px;display:none;'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px;display:none;'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#taxpercentage_job').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#fctxttax_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttax_job').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:3%'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#fctxtsubtotal_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#amount_job').val() + "></td>" +
            "</tr>";

        $('#tblsalesinvoice').append(prodjob);
        $('#select_unit' + id).val($('#unit_job').val());
        $('#select_tax' + id).val($('#tax_job').val());
        $('#txtunit_' + id).val($('#txtunit_job').val());
        TaxSplit(id);

        i++;
        clearrow();
        jobpopuprefresh();
        $('#product_0').val('');
        CalcGrandTotal(i);
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);

}


//Calculate Total Amount Of Job
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

var eunit = ''; var eqnty = ''; var erate = ''; var edis = ''; var etaxable = ''; var etax = ''; var etaxperc = ''; var etaxamnt = ''; var eamnt = '';
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
        CalcGrandTotal(i);
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

    $('#txtproduct' + id).prop('disabled', true);
    $('#select_unit' + id).prop('disabled', true);
    $('#txtquantity' + id).prop('disabled', true);
    $('#txtrate' + id).prop('disabled', true);
    $('#txtdiscount' + id).prop('disabled', true);
    $('#select_tax' + id).prop('disabled', true);

    $('#txtproduct0').focus();
    CalcGrandTotal(i);
    eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = '';
    $('#Warningpopup').fadeOut();
}

var splittaxid = "";
var splittaxbleat = "";
var splittaxat = "";
//Update Function
function updaterow(id) {
    var a = parseFloat($('#txtdiscount' + id).val());
    var c = parseFloat($('#txtrate' + id).val());
    $("#txtdiscount" + id).val(isNaN(a) ? 0 : a);
    $('#txtrate' + id).val(isNaN(c) ? 0 : c);
    if (($('#txtquantity' + id).val() == '')) {
        warningshow('Please Enter Quantity', 'txtquantity' + id);
        $('#txtquantity' + id).select();
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
    }
    else if (foc == 0 && ($("#txtamnt" + id).val() == 0)) {
        warningshow('Amount Cant be Zero', 'txtrate' + id);
        $('#txtrate' + id).select();
    }
    //else if ($("#select_tax" + id).val() == 0) {
    //    warningshow('Please Select Tax', 'select_tax' + id);
    //    return false;
    //}
    else {

        $('#row' + id).children('td,th').css('background-color', 'white');
        editflag--;
        var ratenum = parseFloat($("#txtrate" + id).val() || 0);
        $("#txtrate" + id).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#txtdiscount" + id).val() || 0);
        $("#txtdiscount" + id).val(disnum.toFixed(Decimal));

        $('#col14_' + id).hide();
        $('#col13_' + id).show();
        $('#editcancelheader').hide();
        $('#editheader').show();

        $('#txtproduct' + id).prop('disabled', true);
        $('#select_unit' + id).prop('disabled', true);
        $('#txtquantity' + id).prop('disabled', true);
        $('#txtrate' + id).prop('disabled', true);
        $('#txtdiscount' + id).prop('disabled', true);
        $('#select_tax' + id).prop('disabled', true);

        $('#txtproduct0').focus();
        CalcGrandTotal(i);
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = '';
        TaxSplitupdate(splittaxid, splittaxbleat, splittaxat, id);
        splittaxid = "";
        splittaxbleat = "";
        splittaxat = "";
        $('#Warningpopup').fadeOut();
    }

}

//Delete All the rows of Product Grid
function Tbldelete() {
    $('#tblsalesinvoice tr').remove();
    i = 1;
}

//Clear All Values Before Copy Function
function copyrefresh() {
    $('#txtcustomer').val('');
    $('#txtaddress').val('');
    $('#PriceGroupId').val(0);
    $('#select_salesman').val(UserSalesmanId);
    $('#select_place').val(DefaultArea);
    $('#select_crncy').val(BaseCurrency);
    $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
    $('#txtproduct0').val('');
    $('#btnedit,#btnprint').hide();
    $('#btndelete').hide();
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
    $('#disc').val('0.00');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');

    $('#txtsubject').val('');
    $('#txtattention').val('');
    $('#select_locn').val(UserLocationId);
    $('#txtdays').val('');
    $('#txtlpono').val('');
}

//Delete The Selected Row in The Product Grid
function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want to Delete this Record?');
}

//Delete Grid Rows Confirm box
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'delete') {
        rowdeleteconfirm(rowid);
    }
    else if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'copy') {
        QuotationCopy();
    }
    else if (Result == 'true' && status == 'update') {
        saveQuotation(2);
       
    }
    else if (Result == 'true' && status == 'deleteQtn') {
        EditInvoice(1);
    }
    $('#confirm').fadeOut();

}

function UpdateInvoice() {

    if ($('#tblsalesinvoice tr').length == 0) {
        warningshow('No Products Added', 'txtproduct0');
    }
    else {
       
        $('#Confirmflag').val('update'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Update?')
        $('#confirmOk').prop("disabled", false);
        $('#confirm').show();
        $('#confirmOk').focus();
    }
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
}

//If value of CustomerId is empty
function checkcustomerempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 13) {
    }
    else {
        if ($('#txtCustId').val() != 0) {
            $('#txtCustId').val(0);
            $('#txtaddress').val('');
            $('#PriceGroupId').val(0);
            $('#select_salesman').val(UserSalesmanId);
            $('#select_crncy').val(BaseCurrency);
            $('#txtsubject').val('');
            $('#txtattention').val('');
            $('#txtphone').val('');
            $('#txtdocumentno').val('');
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
            for (j = 0; j <= i; j++) {
                amountcalculation(j);
            }
            CalcGrandTotal(i);
            $('#select_place').val(DefaultArea);
        }
    }
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



//------------------------Commn Functions---------------------

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
function Showalerts(Status, QuotationNo) {
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv1').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>Quotation No : ' + QuotationNo + '</b><br> Saved Successfully!<br>Do you want to print this bill?');
        $('#btnok').focus();
    }
    else if (Status == 2) {
         $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>Quotation No : ' + QuotationNo + '</b><br> Updated Successfully!<br>Do you want to print this bill?');
        $('#btnok').focus();
    }
    else if (Status == 3) {
        formrefresh();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
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
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
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
                  { "width": "15%", "targets": 3 },
                   { "width": "7%", "targets": 4 },
                    { "width": "10%", "targets": 5 },
                     { "width": "10%", "targets": 6 },
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