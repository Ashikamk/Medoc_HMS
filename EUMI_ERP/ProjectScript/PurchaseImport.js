//Global Variable Declaration

var i = 1; var x = 1; var TId = "";

var EDITDATE = ''; var EDITLOADDATE = ''; var EDITBUYER = ''; var EDITYEAR = ''; var EDITTYPE = ''; var EDITMODEL = ''; var EDITCOLOR = ''; var EDITAUCTION = ''; var EDITCITY = ''; var FlagEdit = 0;
var EDITLOTNO = ''; var EDITCHASSIS = ''; var EDITPOLOAD = ''; var EDITPRICE = 0; var EDITCONTAINER = ''; var EDITCUSTOMERNOTES = ''; var EDITOTHERCOST = 0; var EDITADDITIONALSERVICE = 0;

var TaxSelect = ""; var UnitSelect = ""; var LocationSelect = ""; var CurrencySelect = "";
var Decimal = Decimal; var DepId = ERPDeptId; var UId = ERPUserId; var ULocId = UserLocationId;
var locn = ""; var unit = ""; var quantity = ""; var TaxArray = [];
var rate = ""; var disc = ""; var tax = "";
var taxper = ""; var Invoice = 0;
var UnitFlag = 0; var UFlag = 0; var ProductFlag = 0;
var Account = ""; var AccType = ""; var CreditAmt = "";
var DebitAmt = ""; var FlagCostEdit = 0; var OtherCost = [];
var CopyFlag = 0; var ConfirmFlag = 0; var NextInvoiceNo = 0; var OtherCostFlag = 0;
var Z = 0; var CurrentCurrency = 0; var PONumber = '';
var jobrowid = ''; var jobrowcode = 0; var X = 0;
var BillDiscountFlag = 0; var EditSplitTaxable = 0; var EditSplitTaxable = 0;
var DefaultSupplier = 0; var DefaultInvo = ''; var DefaultArea = 0; var DefaultTaxArray = [];

//Document.Keydown Function

$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();

    if (e.altKey && e.keyCode == 83) {                   //Alt+S     :   Save
            $("#btnfinalsave").click();
    }
    else if (e.altKey && e.keyCode == 67) {             //Alt+L     :   Copy
        if (CopyFlag == 0) {
            GetRows();
        }
    }
    else if (e.altKey && e.keyCode == 78) {             //Alt+C     :   New
        createnew();
    }
    else if (e.altKey && e.keyCode == 65) {             //Alt+A     :   Add Product
        $('#ProductAdd,#productadddiv').show(); $('#pbyerno').focus();
    }
    else if (e.altKey && e.keyCode == 79) {             //Alt+O     :   Other Cost Popup
        Addpopupwindow(6);
        ProductPopuprefresh();
    }
    else if (e.keyCode == 27) {                         //ESC       :   Popup Close
        $('#ProductAdd,#productadddiv').hide();
        CloseOtherCost();
        popuprefresh();
        jobpopuprefresh(1);
        ClosePurTransPopup();
        ProductPopuprefresh();
        HidePO(); 
    }
        //Product Secondary Popup
    else if (e.altKey && e.keyCode == 49) {             //Alt+1     :   Last Purchase details Popup       

        for (var j = 1; j <= Z; j++) {
            $('#pid_' + j).remove();
        }
        $('#transid').val(0);
        if ($('#productId_0').val() != 0) {
            var data = {};   //array
            data.ItemId = $('#productId_0').val();
            data.DepartmentId = DepId;

            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseTransactionSearch",
                data: data,
                success: function (result) {

                    Z = $('#transid').val();
                    $('#tblpurchasetrans tr td').remove();

                    for (var p = 0; p < result.length; p++) {
                        Z = p + 1;
                        var a = (result[p].Rate).toFixed(Decimal)

                        var ProdRow = "<tr id='pid_" + Z + "'><td style='width: auto;text-align:left'>" + result[p].SlNo + "-" + result[p].InvoNo + "</td><td style='width: auto;text-align:center'>" + result[p].InvoDate + "</td><td style='width: auto;text-align:left'>" + result[p].SupplierName + "</td><td style='width: auto;text-align:center'>" + result[p].Quantity + "</td><td style='width: auto;text-align:right'>" + a + "</td><td style='width: auto;text-align:center'>" + result[p].CurrencyName + "</td></tr>";

                        $('#tblpurchasetrans').append(ProdRow);


                    }
                    $('#productpdiv').hide();
                    $('#productdiv').hide();
                    $('#salestrans').hide();
                    $("#PurchaseTransactionPopup").css("margin-top", '0px');
                    $('#PurchaseTransactionPopup').show();
                    $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : Last Purchase Transactions');
                    $('#purchasetrans').show();
                    $('#transid').val(Z)
                    ProductPopuprefresh();
                }
            });
        }
    }

    else if (e.altKey && e.keyCode == 50) {             //Alt+2    :   Last Sales details Popup       
        X = $('#salestransid').val();
        for (var j = 1; j <= X; j++) {
            $('#sid_' + j).remove();
        }
        $('#salestransid').val(0);
        if ($('#productId_0').val() != 0) {
            var data = {};   //array
            data.ProductId = $('#productId_0').val();
            data.DeptId = DepId;

            $.ajax({
                type: "POST",
                url: "../SalesInvoice/SalesTransGetandGets",
                data: data,
                success: function (result) {
                    $('#productpdiv').hide();
                    $('#productdiv').hide();
                    $('#purchasetrans').hide();
                    $("#PurchaseTransactionPopup").css("margin-top", '0px');
                    $('#PurchaseTransactionPopup').show();
                    $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : Last Sales Transactions');
                    $('#salestrans').show();
                    SalesTransLoad(result.oList);
                }
            });
        }
    }

})
function SalesTransLoad(result) {
    $('#tblsalestrans tr td').remove();
    $('#salestransid').val(result.length)
    for (var n = 0; n < result.length; n++) {

        var ProdRow = "<tr class='jsgrid-row' id=" + 'sid_' + (n + 1) + ">" +
        "<td style='width: auto;text-align:left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
        "<td style='width: auto;text-align:center'>" + result[n].InvDate + "                                   </td>" +
        "<td style='width: auto;text-align:left'>" + result[n].CustName + "                                   </td>" +
        "<td style='width: auto;text-align:center'>" + result[n].ProdQty + "                                   </td>" +
        "<td style='width: auto;text-align:right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
        "<td style='width: auto;text-align:center'>" + result[n].CurrencyName + "                                   </td>" +

        "</tr>";

        $('#tblsalestrans').append(ProdRow);

    }
}
//Product Default Popup

function CustPrdctLoad(result) {


    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "Last Selling Price";
        }
        else {
            custstat = result[n].custstats;
        }
        $('#productpdiv').show();

        $('#prodheader').text('Location Stock Details');
        $('#productdiv').show();

        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");

        var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
            "<td style='border:none;font-weight:500'><b>Average Cost :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " style='height:30px;background-color:white;border:none'></td>" +
            "<td style='border:none;font-weight:500'><b>Last Purchase Cost :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " style='background-color:white;height:30px;border:none'></td>" +
            "<td style='border:none;font-weight:500'><b>" + custstat + " :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "  style='background-color:white;height:30px;border:none'></td>" +
            "<td style='border:none;font-weight:500'><b>Total Quantity :</b> <input type='text' disabled='' class='text-center' value=" + (result[n].Sumtotqty || 0) + " style='background-color:white;height:30px;border:none'></td>" + "</tr>" +
            "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";

        $('#tblproductdetails').append(ProdRow);

    }

}

//Popup Refresh for Default Popup

function ProductPopuprefresh() {
    $('#productpdiv').hide();
    $('#prodheader').text('');
    $('#productdiv').hide();
    $("#tblproductdetails tr").remove();
}

//Document Ready Function
$(document).ready(function () {
    //Page Load Functions
    Serialnoload();
    GetCurrency(0);
    GetArea(0);
    GetLocation(0);
    GetAreaGroupselect(0);
    GetUnit();
    GetTax();
    Terms(0);
    Defaultfocus();
    LoadProduct();

    function CalcInvoice() {

        var FCrate = parseFloat($('#rate').val() || 0);
        FCrate = isNaN(FCrate) ? 0 : FCrate;
        var InvoiceAmount = 0;
        InvoiceAmount = parseFloat($('#SupInvoTotal').val() || 0).toFixed(Decimal);
        var GrandTotal = parseFloat($('#GrandTotal').val() || 0);

        var BaseInvoiceamount = InvoiceAmount * FCrate;
        $('#BaseInvoiceamount').val(BaseInvoiceamount.toFixed(Decimal));



        InvDiff = GrandTotal - InvoiceAmount;
        var BaseInvDiff = InvDiff * FCrate;

        $('#invdiff').val(InvDiff.toFixed(Decimal));
        $('#baseinvdiff').val(BaseInvDiff.toFixed(Decimal));
    }

    $("#btnfinalsave").click(function (e) {

            var a = $('#RowLength').val();


            CalcGrandTotal(a);
            CalcInvoice();

            //Submit Button Click Event 
            if ($.trim($('#purchaseinvoiceno1').val()) == '') {
                warningshow('Please Enter Invoice Number', 'purchaseinvoiceno1');
            }
            else if ($('#suppliername').val() == '') {
                warningshow('Please Select   Supplier', 'suppliername');
            }
            else if ($('#supplierId').val() == 0) {
                warningshow('Please Select Valid  Supplier', 'suppliername');
            }
            else if ($('#paytype').val() == 0) {
                warningshow('Please Select Pay Type', 'paytype');
            }
            else if ($('#purchaseinvdate').val() == '') {
                warningshow('Please Select Invoice Date', 'purchaseinvdate');
            }
            else if ($('#duedate').val() == '' || $('#terms').val() == 0) {
                warningshow('Please Select Terms', 'terms');
            }
            else if ($('#location').val() == 0) {
                warningshow('Please Select Location', 'location');
            }
            else if ($('#placeofsupply').val() == 0) {
                warningshow('Please Select Place of Supply', 'placeofsupply');
            }
            else if ($.trim($('#rate').val()) == '' || $.trim($('#rate').val()) == 0) {
                $('#rate').select();
                warningshow('Enter Currency Rate', 'rate');
            }
            else if ($.trim($('#SupInvoTotal').val()) == '' || $('#SupInvoTotal').val() == 0) {
                $('#SupInvoTotal').select();
                warningshow('Enter Invoice Amount', 'SupInvoTotal');
            }
            else if ($('#jobcode').val() != '' && $('#jobid').val() == 0) {
                warningshow('Please Enter Valid Job No', 'jobcode');
            }
            else if ($('#RowLength').val() == '') {

                warningshow('Please Upload Product', '');
            }
            else if ($('#costdiff').val() != 0 || $('#totbasecredit').val() != $('#totbasedebit').val()) {

                warningshow('Credit and Debit of OtherCost is not Tally', '');
            }
            else if ($('#tblpurchaseinvoice tr').length<1) {
                warningshow('Product is Not Added', '');
            }
            else if (FlagEdit != 0) {
                warningshow('Update Edit Mode', '');
            }
            else {
                $('#btnfinalsave').prop("disabled", true);

                var oArray1 = new Array();
                for (var k = 1; k < a; k++) {
                    var EntryDate = $('#Exdate' + k).val();
                    var DateofLoading = $('#Exdateofload' + k).val();
                    var BuyerNo = $.trim($('#Exbuyer' + k).val());
                    var Year = $.trim($('#Exyear' + k).val());
                    var Type = $.trim($('#Extype' + k).val());
                    var Model = $.trim($('#Exmodel' + k).val());
                    var Colour = $.trim($('#ExColour' + k).val());
                    var Auction = $.trim($('#Exauction' + k).val());
                    var City = $.trim($('#Excity' + k).val());
                    var LotNo = $.trim($('#Exlotno' + k).val());
                    var VinNo = $.trim($('#Exvinnr' + k).val());
                    var PointofLoading = $.trim($('#Exloadpoint' + k).val());
                    var Price = $('#Exprice' + k).val();
                    var Delivery = $('#Exdvry' + k).val();
                    var Shipping = $('#Exship' + k).val();
                    var DealerFee = $('#Dealerfee' + k).val();
                    var StorageFee = $('#Exstorfee' + k).val();
                    var LoadingFee = $('#Exloadfee' + k).val();
                    var LateFee = $('#Exlatefee' + k).val();
                    var Insurance = $('#Exinsurance' + k).val();
                    var CurrentBalance = $('#ExCbalance' + k).val();
                    var Payed_Amount = $('#Expayedamt' + k).val();
                    var Balance = $('#Exbalnce' + k).val();
                    var ContainerNo = $('#Excontainer' + k).val();
                    var AdditionalService = parseFloat($('#Exaddservices' + k).val()||0).toFixed(Decimal);
                    var CustomerNotes = $.trim($('#Excustnotes' + k).val());
                    var UId = ERPUserId;
                    var DeptId = ERPDeptId;
                    var LocationId = UserLocationId;
                    var SlNo = $('#purchaseinvoiceno').val();
                    var InvoNo = $('#purchaseinvoiceno1').val();
                    var SupplierId = $('#supplierId').val();
                    var PayType = $('#paytype').val();
                    var PurchaseType = $('#purchasetype').val();
                    var InvoDate = $('#purchaseinvdate').val();
                    var Terms = $('#terms').val();
                    var DueDate = $('#duedate').val();
                    var LocnId = 1;
                    var PlaceOfSupply = $('#placeofsupply').val();
                    var JobNo = $('#jobcode').val();
                    var ShipDate = $('#shipdate').val();
                    var CurrencyId = $('#currency').val();
                    var CurrencyRate = $('#rate').val();
                    var InvoiceTotal = $('#SupInvoTotal').val();
                    var TotalDiscount = $('#totdisc').val();        //Foreign Currency
                    var FCDiscount = $('#fcdiscount').val();        //Base Currency
                    var TotalTaxable = $('#tottaxable').val();      //Foreign Currency
                    var TotalTax = $('#tottax').val();              //Foreign Currency
                    var GrandTotal = $('#GrandTotal').val();        //Foreign Currency
                    var FCGrandTotal = $('#fcamount').val();        //Base Currency
                    var FCTaxable = $('#fctaxable').val();          //Base Currency
                    var FCTax = $('#fctax').val();
                    var LPO = $('#lpo').val();
                    var PONo = $('#PONo').val();
                    var FCRoundOff = $('#invdiff').val();
                    var RoundOff = $('#baseinvdiff').val();
                    var BaseInvoiceamount = $('#gndtotal').text();
                    var JobId = $('#jobid').val();
                    var Othercharges = $('#ExOtherCost' + k).val();
                    var flag = 1;
                    var PurchaseSlNo = $('#purchaseinvoiceno').val();
                    var CopyFlag1 = CopyFlag;
                    var ConfirmFlag1 = ConfirmFlag;
                    var CustomsDuty = $('#ExCustomsDuty' + k).val();
                    var ItemDescription = $.trim($.trim($('#Exmodel' + k).val()) + ' ' + $.trim($('#ExColour' + k).val()) + ' ' + $.trim($('#Exyear' + k).val()));

                    var Username = $('#usename' + k).val();

                    

                    
                    if (VinNo != undefined && VinNo != '') {

                        oArray1.push({
                            'EntryDate': EntryDate,
                            'DateofLoading': DateofLoading,
                            'BuyerNo': BuyerNo,
                            'Year': Year,
                            'Type': Type,
                            'Model': Model,
                            'Auction': Auction,
                            'City': City,
                            'LotNo': LotNo,
                            'VinNo': VinNo,
                            'PointofLoading': PointofLoading,
                            'Price': Price,
                            'Delivery': Delivery,
                            'Shipping': Shipping,
                            'DealerFee': DealerFee,
                            'StorageFee': StorageFee,
                            'LoadingFee': LoadingFee,
                            'LateFee': LateFee,
                            'Insurance': Insurance,
                            'CurrentBalance': CurrentBalance,
                            'Payed_Amount': Payed_Amount,
                            'Balance': Balance,
                            'ContainerNo': ContainerNo,
                            'AdditionalService': AdditionalService,
                            'CustomerNotes': CustomerNotes,
                            'UId': UId,
                            'DeptId': DeptId,
                            'LocationId': LocationId,
                            'SlNo': SlNo,
                            'InvoNo': InvoNo,
                            'SupplierId': SupplierId,
                            'PayType': PayType,
                            'PurchaseType': PurchaseType,
                            'InvoDate': InvoDate,
                            'Terms': Terms,
                            'DueDate': DueDate,
                            'LocnId': LocnId,
                            'PlaceOfSupply': PlaceOfSupply,
                            'JobNo': JobNo,
                            'ShipDate': ShipDate,
                            'CurrencyId': CurrencyId,
                            'CurrencyRate': CurrencyRate,
                            'InvoiceTotal': InvoiceTotal,
                            'TotalDiscount': TotalDiscount,
                            'FCDiscount': FCDiscount,
                            'TotalTaxable': TotalTaxable,
                            'TotalTax': TotalTax,
                            'GrandTotal': GrandTotal,
                            'FCGrandTotal': FCGrandTotal,
                            'FCTaxable': FCTaxable,
                            'FCTax': FCTax,
                            'LPO': LPO,
                            'PONo': PONo,
                            'FCRoundOff': FCRoundOff,
                            'RoundOff': RoundOff,
                            'BaseInvoiceamount': BaseInvoiceamount,
                            'JobId': JobId,
                            'Othercharges': Othercharges,
                            'PurchaseSlNo': PurchaseSlNo,
                            'CopyFlag': CopyFlag1,
                            'ConfirmFlag': ConfirmFlag1,
                            'Colour': Colour,
                            'CustomesDuty': CustomsDuty,
                            'ItemDescription': ItemDescription,
                            'Username': Username
                        })
                    }
                }
                if (oArray1 != "") {


                    $('#LoadingSmall').show();
                    var data = { 'PurchaseImportModel': oArray1 };
                    $.ajax({
                        type: "POST",
                        url: "../../PurchaseImport/PurchaseImportInsertandUpdate",
                        data: data,
                        success: function (result) {

                            var StatusofImport = result.oList[0].Status;

                            if (StatusofImport == 1) {

                                var oArray = new Array();
                                for (var k = 1; k < a; k++) {
                                    var str = '';
                                    var PurchaseInvoiceMainId = $('#purchaseinvoiceno').val();
                                    var SlNo = $('#purchaseinvoiceno').val();
                                    var InvoNo = $('#purchaseinvoiceno1').val();
                                    var SupplierId = $('#supplierId').val();
                                    var PayType = $('#paytype').val();
                                    var PurchaseType = $('#purchasetype').val();
                                    var InvoDate = $('#purchaseinvdate').val();
                                    var Terms = $('#terms').val();
                                    var DueDate = $('#duedate').val();
                                    var LocnId = 1;
                                    var PlaceOfSupply = $('#placeofsupply').val();
                                    var JobNo = $('#jobcode').val();
                                    var ShipDate = $('#shipdate').val();
                                    var CurrencyId = $('#currency').val();
                                    var CurrencyRate = $('#rate').val();
                                    var InvoiceTotal = $('#SupInvoTotal').val();    //Foreign Currency
                                    var TotalDiscount = $('#totdisc').val();        //Foreign Currency
                                    var FCDiscount = $('#fcdiscount').val();        //Base Currency
                                    var TotalTaxable = $('#tottaxable').val();      //Foreign Currency 
                                    var TotalTax = $('#tottax').val();              //Foreign Currency
                                    var GrandTotal = $('#GrandTotal').val();        //Foreign Currency
                                    var FCGrandTotal = $('#fcamount').val();        //Base Currency
                                    var FCTaxable = $('#fctaxable').val();          //Base Currency
                                    var FCTax = $('#fctax').val();                  //Base Currency
                                    var DepartmentId = DepId;
                                    var UserId = UId;
                                    var PurchaseInvoiceSubId = 0;
                                    var BatchSlno = 0;
                                    var Batch = '';
                                    var OrderId = 0;
                                    var OrderSubId = 0;
                                    var ItemId = 0;
                                    str = $('#Exvinnr' + k).val();
                                    //var ItemCode = str.substring(str.length - 6, str.length);
                                    var ItemCode = $.trim($('#Exvinnr' + k).val());
                                    var ItemDescription =  $.trim($.trim($('#Exmodel' + k).val()) + ' ' + $.trim($('#ExColour' + k).val()) + ' ' + $.trim($('#Exyear' + k).val()));
                                    var LocationId = 1;
                                    var UnitId = 1;
                                    var Fraction = 1;
                                    var Quantity = 1;
                                    var Rate = $('#Exprice' + k).val();
                                    var BaseRate = ($('#Exprice' + k).val() * parseFloat($('#rate').val() || 0));
                                    var Discount = 0;
                                    var BaseDiscount = 0;
                                    var TaxId = 1;
                                    var TaxRate = 0;
                                    var TaxableAmount = $('#Exprice' + k).val();
                                    var TaxAmount = 0;
                                    var TotalAmount = $('#Exprice' + k).val();
                                    var BaseTaxable = ($('#Exprice' + k).val() * parseFloat($('#rate').val() || 0));
                                    var BaseTax = 0;
                                    var BaseAmount = ($('#Exprice' + k).val() * parseFloat($('#rate').val() || 0));
                                    var OtherCost = $('#ExOtherCost' + k).val();         //Base Currency
                                    var BillDiscount = 0;                //Foreign Currency
                                    var BillDisc = 0;                //Base Currency
                                    var Remarks = '';
                                    var DeleteFlag = 1;
                                    var LPO = $('#lpo').val();
                                    var PONo = $('#PONo').val();
                                    var FCRoundOff = $('#invdiff').val();
                                    var RoundOff = $('#baseinvdiff').val();
                                    var BaseInvoiceamount = $('#BaseInvoiceamount').val();

                                    var TaxId1 = 1;
                                    var Taxable0 = $('#tottaxable').val();

                                    var TaxId2 = 1;
                                    var Taxable5 = 0;
                                    var Tax5 = 0;

                                    var TaxId3 = 3;
                                    var Taxable12 = 0;
                                    var Tax12 = 0;

                                    var TaxId4 = 4;
                                    var Taxable18 = 0;
                                    var Tax18 = 0;

                                    var TaxId5 = 5;
                                    var Taxable28 = 0;
                                    var Tax28 = 0;



                                    if (ItemCode != undefined && ItemCode != '') {
                                        oArray.push({
                                            'PurchaseInvoiceMainId': PurchaseInvoiceMainId,
                                            'SlNo': SlNo,
                                            'InvoNo': InvoNo,
                                            'SupplierId': SupplierId,
                                            'PayType': PayType,
                                            'PurchaseType': PurchaseType,
                                            'InvoDate': InvoDate,
                                            'Terms': Terms,
                                            'DueDate': DueDate,
                                            'LocnId': LocnId,
                                            'PlaceOfSupply': PlaceOfSupply,
                                            'JobNo': JobNo,
                                            'ShipDate': ShipDate,
                                            'CurrencyId': CurrencyId,
                                            'CurrencyRate': CurrencyRate,
                                            'FCDiscount': FCDiscount,
                                            'TotalDiscount': TotalDiscount,
                                            'TotalTaxable': TotalTaxable,
                                            'TotalTax': TotalTax,
                                            'GrandTotal': GrandTotal,
                                            'InvoiceTotal': InvoiceTotal,
                                            'FCTaxable': FCTaxable,
                                            'FCTax': FCTax,
                                            'FCGrandTotal': FCGrandTotal,
                                            'BillDiscount': BillDiscount,
                                            'BillDisc': BillDisc,
                                            'Remarks': Remarks,
                                            'DepartmentId': DepartmentId,
                                            'UserId': UserId,
                                            'PurchaseInvoiceSubId': PurchaseInvoiceSubId,
                                            'BatchSlno': BatchSlno,
                                            'Batch': Batch,
                                            'ItemId': ItemId,
                                            'ItemDescription': ItemDescription,
                                            'ItemCode': ItemCode,
                                            'LocationId': LocationId,
                                            'UnitId': UnitId,
                                            'Fraction': Fraction,
                                            'Quantity': Quantity,
                                            'Rate': Rate,
                                            'BaseRate': BaseRate,
                                            'Discount': Discount,
                                            'BaseDiscount': BaseDiscount,
                                            'TaxId': TaxId,
                                            'TaxRate': TaxRate,
                                            'TaxableAmount': TaxableAmount,
                                            'TaxAmount': TaxAmount,
                                            'TotalAmount': TotalAmount,
                                            'BaseTaxable': BaseTaxable,
                                            'BaseTax': BaseTax,
                                            'BaseAmount': BaseAmount,
                                            'OtherCost': OtherCost,
                                            'OrderId': OrderId,
                                            'DeleteFlag': DeleteFlag,
                                            'LPO': LPO,
                                            'OrderSubId': OrderSubId,
                                            'PONo': PONo,
                                            'FCRoundOff': FCRoundOff,
                                            'RoundOff': RoundOff,
                                            'BaseInvoiceamount': BaseInvoiceamount,

                                            'TaxId1': TaxId1,
                                            'Taxable0': Taxable0,

                                            'TaxId2': TaxId2,
                                            'Taxable5': Taxable5,
                                            'Tax5': Tax5,

                                            'TaxId3': TaxId3,
                                            'Taxable12': Taxable12,
                                            'Tax12': Tax12,

                                            'TaxId4': TaxId4,
                                            'Taxable18': Taxable18,
                                            'Tax18': Tax18,


                                            'TaxId5': TaxId5,
                                            'Taxable28': Taxable28,
                                            'Tax28': Tax28
                                        })
                                    }
                                }
                                if (CopyFlag == 0) {
                                    if (oArray != "") {

                                        var data1 = { 'PurchaseInvoiceModel': oArray };
                                        $.ajax({
                                            type: "POST",
                                            url: "../Purchase/PurchaseInvoiceInsertandUpdate",
                                            data: data1,
                                            success: function (result) {

                                                //---------------Purchase Import Item Insert 

                                                var pslno = result.oList[0].SlNo;
                                                var statusofpurchase = result.oList[0].Status;
                                                if (statusofpurchase == 1) {

                                                    var data2 = {};
                                                    data2.SlNo = pslno;
                                                    data2.DeptId = DepId;
                                                    data2.PurchaseSlNo = $('#purchaseinvoiceno').val();

                                                    $.ajax({
                                                        type: "POST",
                                                        url: "../../PurchaseImport/PurchaseImportItemInsert",
                                                        data: data2,
                                                        success: function (result) {
                                                            
                                                        }
                                                    });


                                                    //---------------End Purchase Import Item Insert  

                                                    for (var i = 0; i <= result.oList.length; i++) {
                                                        var status = result.oList[i].Status;
                                                        var no = result.oList[i].SlNo;
                                                        var Invodate = result.oList[i].InvoDate;
                                                        var Jobno = result.oList[i].JobNo;
                                                        var CurrencyId = result.oList[i].CurrencyId;
                                                        var CurrencyRate = parseFloat(result.oList[i].CurrencyRate);

                                                        if (statusofpurchase == 1) {

                                                            var bArray = new Array();
                                                            for (var i = 1; i < x; i++) {
                                                                var OCId = 0;
                                                                var SlNo = no;
                                                                var InvoDate = Invodate;

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
                                                                var JobCode = Jobno;
                                                                var UserId = UId;
                                                                var DepartmentId = DepId;
                                                                var DelFlag = 1;

                                                                if (!(typeof AccId == "undefined")) {
                                                                    bArray.push({
                                                                        'OCId': OCId,
                                                                        'SlNo': SlNo,
                                                                        'InvoDate': Invodate,
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

                                                            $('#LoadingSmall').hide();
                                                            Showalerts(statusofpurchase, pslno);
                                                            $('#btnfinalsave').prop("disabled", false);

                                                            if (bArray != "") {
                                                                var data = { 'PurchaseInvoiceModel': bArray };
                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: "../Purchase/OtherCostInsertandUpdate",
                                                                    data: data,
                                                                    success: function (result) {
                                                                                                                                            
                                                                    }
                                                                });
                                                            }
                                                            
                                                        }                                                        

                                                    }
                                                }
                                            }

                                        });
                                    }
                                }
                                else if (CopyFlag == 1) {
                                    if (oArray != "") {

                                        var data = { 'PurchaseInvoiceModel': oArray };
                                        $.ajax({
                                            type: "POST",
                                            url: "../Purchase/PurchaseInvoiceUpdate",
                                            data: data,
                                            success: function (result) {

                                                //---------------Purchase Import Item Insert 

                                                var pslno = result.oList[0].SlNo;
                                                var statusofpurchase = result.oList[0].Status;
                                                if (statusofpurchase == 2) {


                                                    var data2 = {};
                                                    data2.SlNo = pslno;
                                                    data2.DeptId = DepId;
                                                    data2.PurchaseSlNo = $('#purchaseinvoiceno').val();

                                                    $.ajax({
                                                        type: "POST",
                                                        url: "../../PurchaseImport/PurchaseImportItemInsert",
                                                        data: data2,
                                                        success: function (result) {
                                                           
                                                            
                                                        }
                                                    });


                                                    //---------------End Purchase Import Item Insert  

                                                    for (var i = 0; i <= result.oList.length; i++) {
                                                        var status = result.oList[i].Status;
                                                        var no = result.oList[i].SlNo;
                                                        var Invodate = result.oList[i].InvoDate;
                                                        var Jobno = result.oList[i].JobNo;
                                                        var CurrencyId = result.oList[i].CurrencyId;
                                                        var CurrencyRate = parseFloat(result.oList[i].CurrencyRate);

                                                        if (statusofpurchase == 2) {

                                                            var bArray = new Array();
                                                            for (var i = 1; i < x; i++) {
                                                                var OCId = 0;
                                                                var SlNo = no;
                                                                var InvoDate = Invodate;

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
                                                                var JobCode = Jobno;
                                                                var UserId = UId;
                                                                var DepartmentId = DepId;
                                                                var DelFlag = 1;

                                                                if (!(typeof AccId == "undefined")) {
                                                                    bArray.push({
                                                                        'OCId': OCId,
                                                                        'SlNo': SlNo,
                                                                        'InvoDate': Invodate,
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

                                                            $('#LoadingSmall').hide();
                                                            Showalerts(statusofpurchase, pslno);
                                                            $('#btnfinalsave').prop("disabled", false);

                                                            if (bArray != "") {
                                                                var data = { 'PurchaseInvoiceModel': bArray };
                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: "../Purchase/OtherCostInsertandUpdate",
                                                                    data: data,
                                                                    success: function (result) {
                                                                        
                                                                    }
                                                                });
                                                            }
                                                          
                                                        }

                                                    }
                                                }
                                            }

                                        });
                                    }

                                }
                            }
                            else if (StatusofImport == 10) {
                                $('#LoadingSmall').hide();
                                $('#btnfinalsave').prop("disabled", false);
                                $('#cannotsaveflag').val('Purchaseimporteditconfirm'), $('#cannotsaveRowId').val(1)
                                $('#cannotsavemessage').text('Wrong File Uploading!!!')
                                $('#cannotsave').show();
                                $('#btncannotsave').focus();
                            }
                            else {
                                $('#LoadingSmall').hide();
                                Showalerts(StatusofImport);
                                $('#btnfinalsave').prop("disabled", false);
                            }
                        }
                    });
                }
            }
        
    });

  
    //display Item data list based on PO NO in 2nd Popup

    $("#btnview").click(function (e) {

        var table = $("#tbl_POList").DataTable();
        for (var h = 1; h <= 5; h++) {
            table.column(h).search('').draw();
        }

        PONumber = '';
        var row = $('#RowGet').val();
        var CurrencyFlag = 0;


        for (var n = 1; n <= row; n++) {
            if ($("#SlNoCheck" + n).is(":checked")) {
                CurrentCurrency = $('#Curr' + n).val();
                break;
            }
        }


        for (var d = 1; d <= row; d++) {
            if ($("#SlNoCheck" + d).is(":checked")) {
                if ($('#Curr' + d).val() != CurrentCurrency) {
                    CurrencyFlag = 1;
                    break;
                }
                else
                    continue;
            }
        }

        if (CurrencyFlag == 1) {
            warningshow('Select PO with Same Curency');
        }
        else {

            for (m = 1; m <= row; m++) {
                if ($("#SlNoCheck" + m).is(":checked")) {

                    if (PONumber == '') {
                        PONumber += $('#OrderNo' + m).text();
                    }
                    else {
                        PONumber += ',' + $('#OrderNo' + m).text();
                    }

                }
            }
            var data = {};
            data.PONumber = PONumber;
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseOrderGetProduct",
                data: data,
                success: function (result) {
                    // if (PONumber != 0)
                    //  ShowItemGet(result.oList);

                }
            });
        }

    });



    $('#purchaseinvdate').val(CurDate);

    $("#location").change(function (e) {
        $('#locn_0,#locn_job').val($('#location').val());
        var selectedValue = $(this).val();
    });

    $("#currency").change(function () {
        var selectedValue = $(this).val();
        $("#rate").val($(this).find("option:selected").attr("name"))
        CalcAmt();
        CalcGrandTotal(i);
    });
    $("#CostCurrency").change(function () {
        var selectedValue = $(this).val();
        $("#CostCurrRate").val($(this).find("option:selected").attr("name"));
        CalcFCCost();
    });

    $("#unit_0").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit_0").val($(this).find("option:selected").attr("unitname"))
        if ($(this).find("option:selected").attr("unitname") == 'FOC') {
            UnitFlag = 1;
            $('#txtrate_0').val(0);
            $('#discount_0').val(0);
            CalcAmount(0);
        }
        else {
            UnitFlag = 0;
        }
    });

    $("#tax_job").change(function () {
        var selectedValue = $(this).val();
        $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"))
        var x = $('#taxpercentage_job').val();
        CalcJobAmount()
    });

    //Focus next element inside the form (text box)

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

    $('#purchaseinvoiceno1').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#purchasetype").focus();
        }

    });
    $("#purchaseinvoiceno").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 08) {
            formrefresh(1);
            $('#btnfinalsave').prop("disabled", true);
            $('#purchaseinvoiceno').focus();
            //$('#tour1').show();
        }

    });
    $("#purchasetype").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#paytype').focus();
        }

    });
    $("#paytype").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#suppliername').focus();
        }

    });
    $("#suppliername").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#supplierId').val() != 0) {
                e.preventDefault();
                $('#terms').focus();
            }
            else {
                warningshow('Select Valid Supplier', 'suppliername');
                return false;

            }
        }
        else {
            $('#supplierId').val(0);
        }

    });
    $("#purchaseinvdate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#terms').focus();
        }
    });
    $("#terms,#duedate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#placeofsupply').focus();
        }

    });
    $("#location").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#placeofsupply').focus();
        }

    });
    $("#placeofsupply").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#shipdate').focus();
        }

    });
    $("#jobcode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#jobid').val() != 0) {
                e.preventDefault();
                $('#product_0').focus();
            }
            else if ($('#jobid').val() == 0 && $("#jobcode").val() == '') {
                e.preventDefault();
                $('#product_0').focus();
            }
            else if ($("#jobcode").val() != '') {
                warningshow('Select Valid Job', 'jobcode');
                return false;
            }
        }
        else {
            $('#jobid').val(0);
            $('#jobcodeid_0').val(0);
            $('#jobcode_0').val('');
        }

    });
    $("#jobcode_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();
        }
        if (key == 08 || key == 46) {
            $('#jobcodeid_0').val(0);
        }

    });
    $('#shipdate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#SupInvoTotal").focus();
        }

    });
    $('#currency').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#jobcode").focus();
        }

    });
    $('#rate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#jobcode").focus();
        }

    });

    $('#SupInvoTotal').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#currency").focus();
        }

    });

    $("#product_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#productId_0').val() != 0) {
                $('#quantity_0').focus();
                $('#quantity_0').select();
            }
            else if ($('#productId_0').val() == 0 && ($.trim($('#product_0').val())).toUpperCase() == 'JOB') {
                Addpopupwindow(5);
            }
        }
        else {
            //$('#productId_0').val(0);
            if (key == 08 || key == 46) {
                $('#ProductLength').val('')
                ClearProductDetails();
                ProductPopuprefresh();
            }
        }

    });
    $("#locn_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#unit_0').focus();
        }

    });
    $("#unit_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#quantity_0').focus();
        }

    });

    $('#quantity_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtrate_0").focus();
            $("#txtrate_0").select();
        }

    });

    $('#txtrate_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#discount_0").focus();
            $("#discount_0").select();
        }

    });
    $('#discount_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#tax_0").focus();
        }

    });
    $('#tax_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnadd").focus();
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

    $('#acctype').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#account").focus();
        }

    });
    $('#account').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#accountdescription").focus();
        }
        else {
            $('#accid').val(0);
        }

    });

    $('#accountdescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#costamount").focus();
            $("#costamount").select();
        }

    });
    $('#costamount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnaddcost").focus();
        }

    });


    $('#LocationCode,#LocationName,#txtdesc,#txtcode,#txtname,#select_areagroup,#txt_code,#txt_cname,#txt_rate,#PAddDate,#PLDate,#pbyerno,#pyear,#ptype,#pcolour,#pmodel,#pauction,#pcity,#plotno,#pchassisno,#pploading,#pprice,#pcontainerno,#padditionalservice,#pcustomernote').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });

    $('#txtterms').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btntermssave").focus();
        }

    });
    $('#LocationDescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnlocnsave").focus();
        }

    });
    $('#txtdescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnareasave").focus();
        }

    });
    $('#txt_remark').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btncrncysave").focus();
        }

    });


    $("#flip1").click(function () {
        $("#panel1").slideToggle("fast");
        $('#txtnotes').focus();
    });

    $("#terms").change(function () {
        var selectedValue = $(this).val();
        var terms = $(this).find("option:selected").attr("name");
        getdate(terms);
    });




    function checkproduct() {
        var a = ($('#product_0').val()).length;
        if ($('#ProductLength').val() != a) {
            $('#productId_0').val(0);
        }

    }
    

    //On Change of Tax

    function ChangeTax(TId, selectObject) {
        var value = selectObject.value;
        $("#taxpercentage_" + TId).val($(selectObject).find("option:selected").attr("name"))
        CalcAmount(TId);

    }


 

    //Serial No Load Function

   

    function CheckPurchaseType() {
        if ($('#purchasetype').val() == 'Import') {
            $('#tax_0').val($('#ImpTax').val());
            $("#taxpercentage_0").val($('#tax_0').find("option:selected").attr("name"));
            if ($('#productId_0').val() != 0) {
                CalcAmount(0);
            }
        }
        else if ($('#purchasetype').val() == 'Local') {
            $('#tax_0').val(0);
            $("#taxpercentage_0").val('');
            if ($('#productId_0').val() != 0) {
                CalcAmount(0);
            }

        }
    }

  
    //Checking Invoice No of Supplier Function








    function TaxSplit(RowId) {

        var TaxId = $('#taxpercentage_' + RowId).val()
        var splittaxable = parseFloat($('#txttaxable_' + RowId).val());
        var CurrentSplitTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val() || 0);

        var splittax = parseFloat($('#txttax_' + RowId).val());
        var CurrentSplitTax = parseFloat($('#hiddensplittax_' + TaxId).val() || 0);
        CurrentSplitTaxable = parseFloat(CurrentSplitTaxable + splittaxable);
        CurrentSplitTax = parseFloat(CurrentSplitTax + splittax);
        //CurrentSplitTax = parseFloat((CurrentSplitTaxable * TaxId) / 100);

        $('#splittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
        $('#hiddensplittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
        $('#splittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
        $('#hiddensplittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));

    }

    function SplitTaxDelete(TaxId, Taxable, Tax) {

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

    function EditSplitTaxUpdate(PrevtaxId, PrevSplitTaxable, PrevSplitTax, RowId) {


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




    function CalcDiscountSplitTax1() {
        if ($('#tblpurchaseinvoice tr').length > 0) {
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
                $('#Discountpercent').val('0.00');
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
        $('#GrandTotal,#tottaxable,#tottax').val('')
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
            var Amount = $('#txttaxable_' + k).val();
            var GSTPERS = parseFloat($('#taxpercentage_' + k).val() || 0);

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

        var FCrate = parseFloat($('#rate').val() || 0);
        FCrate = isNaN(FCrate) ? 0 : FCrate;
        BillDisc = parseFloat($('#disc').val() || 0);

        $('#fcamount').val('')
        $('#fctaxable').val('')
        $('#fctax').val('');

        FCAmount = GrandTotal * FCrate;
        FCtottaxable = TotalTaxable * FCrate;
        FCtottax = TotalTax * FCrate;
        BillDisc = BillDisc * FCrate;

        $('#basedisc').val(BillDisc.toFixed(Decimal));
        $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
        $('#tottaxable').val(TotalTaxable);
        $('#tottax').val(parseFloat(TotalTax).toFixed(Decimal));
        $('#fcamount').val(FCAmount.toFixed(Decimal));
        $('#fctaxable').val(FCtottaxable.toFixed(Decimal));
        $('#fctax').val(FCtottax.toFixed(Decimal));
        $('#fc').text(FCAmount.toFixed(Decimal));

        if ($('#rate').val() == 1 || $('#fcamount').val() <= 0) {
            $("#fc").css("opacity", '0');
            $('#gndtotal').text(GrandTotal.toFixed(Decimal));
        }
        else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
            $("#fc").css("opacity", '100');
            $('#gndtotal').text('FC : ' + GrandTotal.toFixed(Decimal));
        }



        CalcInvoice();

    }


    // Other Cost FC Calculation

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

        RowCurrRate = parseFloat($('#CostCurrRate_' + RowId).val() || 0)
        RowCurrRate = isNaN(RowCurrRate) ? 0 : RowCurrRate;

        if ($('#acctype_' + RowId).val() == 'C') {

            Fcredit = parseFloat($('#CreditAmount_' + RowId).val() || 0);
            Fcredit = isNaN(Fcredit) ? 0 : Fcredit;
            BCredit = parseFloat(RowCurrRate * Fcredit);

            $('#BaseCredit_' + RowId).val(parseFloat(BCredit).toFixed(Decimal));
        }
        else if ($('#acctype_' + RowId).val() == 'D') {

            FDebit = parseFloat($('#DebitAmount_' + RowId).val() || 0);
            FDebit = isNaN(FDebit) ? 0 : FDebit;
            BDebit = parseFloat(RowCurrRate * FDebit);

            $('#BaseDebit_' + RowId).val(parseFloat(BDebit).toFixed(Decimal));
        }
        CalcCreditandDebit();
    }







    function detl(RowId) {
        var slno = 1;
        var rowslno = parseInt(slno);
        TaxArray = [];
        var splittaxable = parseFloat($('#txttaxable_' + RowId).val());
        var splittax = parseFloat($('#txttax_' + RowId).val());
        var splittaxid = $('#taxpercentage_' + RowId).val()
        $('#row_' + RowId).remove();
        if ($('#tblpurchaseinvoice tr').length == 0) {
            BillDiscountFlag = 0;
        }
        for (var j = 1; j <= i; j++) {
            if ($('#product_' + j).val() != undefined) {
                $('#td_' + j).text(slno);
                slno++;
                if (parseFloat($('#discount_' + j).val()) != 0) {
                    BillDiscountFlag = 1;
                }
                else {
                    BillDiscountFlag = 0;
                }
                var item = $("#taxpercentage_" + j).val();
                if (TaxArray.indexOf(item) == -1) {
                    TaxArray.push(item);
                }
            }
        }

        //if (TaxArray.length <= 1 && BillDiscountFlag == 0) {
        if (BillDiscountFlag == 0) {
            $('#disc').prop("disabled", false);
            //$('#disc').val('0.00');
        }
        $('#product_0').focus();
        CalcGrandTotal(i);
        
        $('#disc,#Discountpercent').val('0.00');
        SplitTaxDelete(splittaxid, splittaxable, splittax)
    }


    //Check FOC When Product Add Function

    function CheckFOC(rowid, selectedvalue) {

        $("#txtunit_" + rowid).val($(selectedvalue).find("option:selected").attr("unitname"))
        if ($(selectedvalue).find("option:selected").attr("unitname") == 'FOC') {
            UFlag = 1;
            $('#txtrate_' + rowid).val(0);
            $('#discount_' + rowid).val(0);
            CalcAmount(rowid);
        }
        else {
            UFlag = 0;
        }

    }

   



    //Default Focus Function

  
    //New Button in Form

    function createnew() {
        var rowCount = document.getElementById('tblpurchaseinvoice').rows.length;
        if (rowCount == 0 || CopyFlag == 1) {
            $('.form-control').prop('disabled', false);
            $('.jsgrid-button').prop('disabled', false);
            formrefresh(0);
            CopyFlag = 0;
        }
        else {
            $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
            $('#confirm').show();
            $('#confirmOk').focus();
        }
    }


    function HidePO() {
        $('#iconForm').hide()
        $('#RowGet').val('');
        $('#RowGet1').val('');
        $('#tbl_POList tr td').remove;
        $('#tbl_PO_ListItem').remove;
        PONumber = '';
        $('#InvoiceFromDate').val(CurDate);
        $('#InvoiceToDate').val(CurDate);
        $('#ProductPopUp1').val('');
        $('#ProductPopUp1Id').val(0);
    }
    //Clear Product Details Except Product Name

    function ClearProductDetails() {
        $('#productId_0').val(0);
        $('#productdesc_0').val('');
        $('#unit_0').val(0);
        $('#txtrate_0').val('');
        if ($('#purchasetype').val() == 'Local') {
            $('#tax_0').val(0);
            $('#taxpercentage_0').val('');
        }
        else if ($('#purchasetype').val() == 'Import') {
            $('#tax_0').val($('#ImpTax').val());
            $("#taxpercentage_0").val($('#tax_0').find("option:selected").attr("name"))
        }
        $('#quantity_0').val('');
        $('#discount_0').val('');
        $('#amount_0').val('');
        $('#baseamount_0').val('');
        $('#basetaxableamount_0').val('');
        $('#basetaxamount_0').val('');
        $('#basediscount_0').val('');
        $('#txttaxable_0').val('');
        $('#txttax_0').val('');
        $('#txtsubtotal_0').val('');
        if ($('#jobid').val() != 0) {
            $('#jobcode_0').val($('#jobcode').val());
            $('#jobcodeid_0').val($('#jobid').val());
        }
        else {
            $('#jobcode_0').val('');
            $('#jobcodeid_0').val(0);
        }


    }
   

  

    //Calculation  Function for Amount Calculation of Job Before Adding to Grid

    function CalcJobAmount() {

        var quantity = parseFloat($('#quantity_job').val() || 0);
        var rate = parseFloat($('#txtrate_job').val() || 0);
        var discount = parseFloat($('#discount_job').val() || 0);
        rate = isNaN(rate) ? 0 : rate;
        discount = isNaN(discount) ? 0 : discount;
        var taxpercentage = parseFloat($("#taxpercentage_job").val() || 0);
        var currencyrate = parseFloat($("#rate").val() || 0);
        var tamount = parseFloat(quantity * rate)
        var taxableamount = parseFloat(tamount - discount)
        var taxamount = parseFloat(taxableamount * (taxpercentage / 100));
        var totalamount = parseFloat(taxableamount + taxamount);

        var atotalamount = totalamount.toFixed(Decimal)
        var baseamount = parseFloat(atotalamount * currencyrate);

        var ataxableamount = taxableamount.toFixed(Decimal)
        var basetaxableamount = parseFloat(ataxableamount * currencyrate);

        var ataxamount = taxamount.toFixed(Decimal)
        var basetaxamount = parseFloat(ataxamount * currencyrate);

        var adiscount = discount.toFixed(Decimal)
        var basediscount = parseFloat(adiscount * currencyrate);

        var arate = rate.toFixed(Decimal)
        var baserate = parseFloat(arate * currencyrate);

        $("#amount_job").val(totalamount.toFixed(Decimal));
        $("#txttaxable_job").val(taxableamount.toFixed(Decimal));
        $("#txttax_job").val(taxamount.toFixed(Decimal));
        $("#txtsubtotal_job").val(tamount.toFixed(Decimal));

        $("#baseamount_job").val(baseamount.toFixed(Decimal));
        $("#basetaxableamount_job").val(basetaxableamount.toFixed(Decimal));
        $("#basetaxamount_job").val(basetaxamount.toFixed(Decimal));
        $("#basediscount_job").val(basediscount.toFixed(Decimal));
        $("#baserate_job").val(baserate.toFixed(Decimal));
    }


 

   
    //For Job Popup Refresh

    function jobpopuprefresh(Id) {
        $('#jobpopupdiv').hide();
        if (Id != 1) {
            $('#product_0').val('');
        }
        $('#productId_job').val(0);
        $('#productjob').val('');
        $('#unit_job').val(0);
        $('#txtrate_job').val('');
        $('#baserate_job').val('');
        $('#tax_job').val(0);
        $('#taxpercentage_job').val('');
        $('#quantity_job').val('');
        $('#discount_job').val('');
        $('#amount_job').val('');
        $('#baseamount_job').val('');
        $('#basetaxableamount_job').val('');
        $('#basetaxamount_job').val('');
        $('#basediscount_job').val('');
        $('#txttaxable_job').val('');
        $('#txttax_job').val('');
        $('#txtsubtotal_job').val('');
        $('#product_0').focus('');

    }

    //For Close Purchase Transaction Popup

    function ClosePurTransPopup() {
        $('#PurchaseTransactionPopup').hide();
        $('#purchasetrans').hide();
        for (var j = 1; j <= Z; j++) {
            $('#pid_' + j).remove();
        }

    }



    //1st Transfer Popup 

    function GetList(Id) {


        if ($('#supplierId').val() == "0") {
            warningshow('Please Select Supplier', 'suppliername');
            return false;
        }
        else if ($('#transfer').val() == "0") {
            warningshow('Please Select Transfer Type', 'transfer');
            return false;
        }
        else {
            if ($('#transfer').val() == 1) {
                var data = {};
                data.SupplierId = $('#supplierId').val();
                data.DepartmentId = DepId;
                $.ajax({
                    type: "POST",
                    url: "../Purchase/PendingPurchaseOrderGets",
                    data: data,
                    success: function (result) {
                        ShowPOList(result.oList);

                    }
                });
            }
        }
    }
    function SearchInvoiceSup(Flag) {
        if (Flag == 1) {
            var data = {};
            data.SupplierId = $('#supplierId').val();
            data.FromDate = $('#InvoiceFromDate').val();
            data.ToDate = $('#InvoiceToDate').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PendingPurchaseOrderGets",
                data: data,
                success: function (result) {
                    ShowPOList(result.oList);

                }
            });
        }
        else if (Flag == 0) {
            $('#InvoiceFromDate').val(CurDate);
            $('#InvoiceToDate').val(CurDate);

            var data = {};
            data.SupplierId = $('#supplierId').val();
            data.FromDate = '';
            data.ToDate = '';
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PendingPurchaseOrderGets",
                data: data,
                success: function (result) {
                    ShowPOList(result.oList);

                }
            });
        }
    }


    function SearchInvoiceSub(Flag) {
        if (Flag == 1) {
            if ($('#ProductPopUp1Id').val() != 0) {


                var data = {};
                data.PONumber = PONumber;
                data.ItemId = $('#ProductPopUp1Id').val();
                data.DepartmentId = DepId;
                $.ajax({
                    type: "POST",
                    url: "../Purchase/PurchaseOrderGetProduct",
                    data: data,
                    success: function (result) {
                        if (PONumber != 0)
                            ShowItemGet(result.oList);

                    }
                });

            }
            else {
                warningshow('Please Select Valid Product', 'ProductPopUp1');
            }
        }
        else if (Flag == 0) {

            $('#ProductPopUp1Id').val(0);
            $('#ProductPopUp1').val('');

            var data = {};
            data.PONumber = PONumber;
            data.ItemId = 0;
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseOrderGetProduct",
                data: data,
                success: function (result) {
                    if (PONumber != 0)
                        ShowItemGet(result.oList);

                }
            });
        }
    }

    function BackInvoice() {
        $('#ProductPopUp1Id').val(0);
        $('#ProductPopUp1').val('');

        $('#myModalLabel17').text('Purchase Orders');
        $('#add').hide();
        $('#View').show();

    }

    function ShowPOList(result) {
        disable_datatable('tbl_POList');
        $('#RowGet').val = '';
        $('#myModalLabel17').text('Purchase Orders');
        $('#add').hide();
        $('#View').show();
        $('#iconForm').show();
        var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheck'  'custom-control-input cz-bg-image-display'  onchange='SelectAllSupp()' >&nbsp;&nbsp;&nbsp;Select</th><th>OrderNo</th><th>Order Date</th><th>Supplier</th><th>Currency</th><th>Document Reference</th></tr>" +
            "<tr><th> </th><th>OrderNo</th><th>Date</th><th>Supplier</th><th>Currency</th><th>Reference</th></tr></thead><tbody>";
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);

            responseText += '<tr><td style="width:90px;" ><input type="checkbox"  checked  id= ' + 'SlNoCheck' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td><td id=' + 'OrderNo' + slno + '>' +
                result[l].OrderNo + '</td><td>' +
                result[l].OrderDate + '</td><td>' +
                result[l].SupplierName + '</td><td><input type="hidden" id="Curr' + slno + '" value=' +
                result[l].CurrencyId + '>' +
                result[l].CurrencyName + '</td><td>' +
                result[l].DocRef + '</td></tr>';
        }
        $('#tbl_POList').html(responseText + '</tbody>');
        datatableWithsearch('tbl_POList', 'Multiple');

        $('#RowGet').val(result.length);
        $('#btnview').focus();

    }

    function SelectAllSupp() {

        var rowCount = $('#RowGet').val();
        var flag = $("#SlNoHeadCheck").is(":checked")

        for (var i = 1; i <= rowCount; i++) {
            if (document.getElementById("SlNoCheck" + i) != null) {
                document.getElementById("SlNoCheck" + i).checked = flag;
            }
        }

    }

});
    


    //selecting checkbox in PO Item List
    function SelectAllItem() {
        var rowCount = $('#RowGet1').val();
        var flag = $("#SlNoHeadCheckItem").is(":checked")
        for (var i = 1; i <= rowCount; i++) {
            if (document.getElementById("SlNoCheckgrid" + i) != null) {
                document.getElementById("SlNoCheckgrid" + i).checked = flag;
            }
        }

    }

    //====================================================COMMON====================================================================


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



    //Show Warnig Popup right top

    function warningshow(message, Id) {
        $('#popupmessage').text(message);
        $('#Warningpopup').show();
        $('#' + Id).focus();
        window.setTimeout(function () {
            $('#Warningpopup').fadeOut();
        }, 3000);
    }

    //conge Lower Case letter to upper CODE and NAME
    function changetoupper(Id) {
        $('#' + Id).val($('#' + Id).val().toUpperCase())
    }



    //Show Window Alert Insert,update delete  Modify
    function Showalerts(Status, no) {

        if (Status == 1) {
            formrefresh(0);
            swal('Purchase No-' + no + ' ', "Saved Successfully", "success");
            $('.swal-button swal-button--confirm').focus();
        }
        else if (Status == 2) {
            formrefresh(0);
            swal('Purchase No-' + no + ' ', "Updated Successfully", "success");
            $('.swal-button swal-button--confirm').focus();

        }
        else if (Status == 3) {
            formrefresh(0);
            swal('Data Deleted', "", "error");
            $('.swal-button swal-button--confirm').focus();
        }
        else if (Status == 4) {
            formrefresh(0);
            swal('Item Saved Successfully', "", "success"); 
            $('.swal-button swal-button--confirm').focus();
        }
        else if (Status == 0) {
            formrefresh(0);
            swal('Item Saved Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();
            //swal('Item Already Exists', "", "error"); 
            //$('.swal-button swal-button--confirm').focus();
        }
        else if (Status == 5) {
            swal('Data Already Exists', "", "warning");
            $('.swal-button swal-button--confirm').focus();
            //swal('Item Already Exists', "", "error"); 
            //$('.swal-button swal-button--confirm').focus();
        }
        else if (Status == 8) {
            swal('Same Chassis Number Found in Same Excel', "", "warning");
            $('.swal-button swal-button--confirm').focus();
        }
        else {
            swal('Same Invoice Number Already Exists For This Supplier', "", "warning");
            $('.swal-button swal-button--confirm').focus();


        }

    }

    //Show Window Alert Insert of Popups

    function Showalertsthis(Status) {
        if (Status == 1) {
            popuprefresh();
            swal('Data Saved Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();
        }
        else if (Status == 2) {
            popuprefresh();
            swal('Data Updated Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();

        }
        else if (Status == 3) {
            popuprefresh();
            swal('Data Deleted', "", "error");
            $('.swal-button swal-button--confirm').focus();
        }
        else {
            swal('Data Already Exists', "", "warning");
            $('.swal-button swal-button--confirm').focus();


        }

    }

    function datatableWithsearch(tablename, Type) {

        var a = '#' + tablename + ' tr:eq(1) th'

        $(a).each(function () {
            var title = $(this).text();
            if (title != ' ')
                if (title == 'Date' || title == 'Currency' || title == 'OrderNo' || title == 'SerialNo' || title == 'InvoiceNo') {
                    $(this).html('<input type="text" class="form-control"  style="width:120px"  placeholder="' + title + '"/>')
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
                //"order": false,
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



    

  
    //For Job Popup Refresh

    function jobpopuprefresh(Id) {
        $('#jobpopupdiv').hide();
        if (Id != 1) {
            $('#product_0').val('');
        }
        $('#productId_job').val(0);
        $('#productjob').val('');
        $('#unit_job').val(0);
        $('#txtrate_job').val('');
        $('#baserate_job').val('');
        $('#tax_job').val(0);
        $('#taxpercentage_job').val('');
        $('#quantity_job').val('');
        $('#discount_job').val('');
        $('#amount_job').val('');
        $('#baseamount_job').val('');
        $('#basetaxableamount_job').val('');
        $('#basetaxamount_job').val('');
        $('#basediscount_job').val('');
        $('#txttaxable_job').val('');
        $('#txttax_job').val('');
        $('#txtsubtotal_job').val('');
        $('#product_0').focus('');

    }

    //For Close Purchase Transaction Popup

    function ClosePurTransPopup() {
        $('#PurchaseTransactionPopup').hide();
        $('#purchasetrans').hide();
        for (var j = 1; j <= Z; j++) {
            $('#pid_' + j).remove();
        }

    }
