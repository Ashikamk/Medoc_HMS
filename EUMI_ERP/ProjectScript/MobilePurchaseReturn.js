//Global Variable Declaration

var i = 1; var x = 1; var TId = "";
var TaxSelect = ""; var UnitSelect = ""; var LocationSelect = ""; var CurrencySelect = "";
var Decimal = Decimal; var DepId = ERPDeptId; var UId = ERPUserId;
var locn = ""; var unit = ""; var quantity = "";
var rate = ""; var disc = ""; var tax = "";
var taxper = ""; var FlagEdit = 0; var Invoice = 0;
var UnitFlag = 0; var UFlag = 0; var ProductFlag = 0;
var Account = ""; var AccType = ""; var CreditAmt = "";
var DebitAmt = ""; var FlagCostEdit = 0;
var CopyFlag = 0; var NextInvoiceNo = 0;
var Z = 0; var CurrentCurrency = 0; var PINumber = '';
var jobrowid = ''; var jobrowcode = 0; var X = 0; var ULocId = UserLocationId;
var DefaultTaxArray = []; var EditSplitTaxable = 0; var EditSplitTax = 0;
//Document.Keydown Function

$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();


    var x = event.keyCode;
    if ((x > 111 && x < 124)) {
        if (x == 118) {                                                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            LastSalesTransactions();
        }
        else if (x == 119) {                                               // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
            LastPurchaseTransactions();
        }
        else if (x == 120) {                                                // F9 :   All Transaction details Popup      
            lastalltrans();
        }

        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }


    if (e.altKey && e.keyCode == 83) {                   //Alt+S     :   Save
        if (CopyFlag == 0) {
            $("#btnsubmit").click();
        }
        else {
            warningshow('Create New Purchase Return To Save');
        }
    }
    else if (e.altKey && e.keyCode == 67) {             //Alt+L     :   Copy
        if (CopyFlag == 0) {
            GetRows();
        }
    }
    else if (e.altKey && e.keyCode == 78) {             //Alt+C     :   New
        createnew();
    }
    else if (e.keyCode == 27) {                         //ESC       :   Popup Close

        popuprefresh();
        ClosePurTransPopup();
        ProductPopuprefresh();
        HidePO();
        $('#OutofStock').hide();
    }
        //Product Secondary Popup
    else if (e.altKey && e.keyCode == 51) {             //Alt+3    :   Last Purchase details Popup       
        //LastPurchaseTransactions();

    }

    else if (e.altKey && e.keyCode == 49) {             //Alt+1     :   Last Sales details Popup       
        //LastSalesTransactions();
    }
    else if (e.altKey && e.keyCode == 52) {         //Alt+4    :   All Transaction details Popup      
        //lastalltrans();
    }


});


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
    
    GetUnit();
    GetTax();
    Terms(0);
    //Defaultfocus();
    LoadProduct();




    $('#purchaseinvdate').val(CurDate);

    $("#location").change(function (e) {
        $('#locn_0').val($('#location').val());
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


    //Focus next element inside the form (text box)

    $('#purchaseinvoiceno1').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#purchasetype").focus();
        }

    });

    $("#purchasetype").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#shipdate').focus();
        }

    });
    $("#transfer").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#terms').focus();
        }

    });
    $("#suppliername").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#supplierId').val() != 0) {
                e.preventDefault();
                $('#purchasetype').focus();
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
            $('#suppliername').focus();
        }

    });
    $("#location").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#currency').focus();
        }

    });
    $("#placeofsupply").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#location').focus();
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
            $("#placeofsupply").focus();
        }

    });
    $('#currency').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#product_0").focus();
        }

    });
    $('#rate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#product_0").focus();
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
                $('#imei_0').focus();
                //$('#quantity_0').select();
            }
            else if ($('#productId_0').val() == 0 && ($.trim($('#product_0').val())).toUpperCase() == 'JOB') {
                Addpopupwindow(5);
            }
        }
        else {
            //$('#productId_0').val(0);
            if (key == 08 || key == 46) {
                $('#ProductLength').val('');
                ClearProductDetails();
                ProductPopuprefresh();
            }
        }

    });
    $("#imei_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#quantity_0').focus();
            $('#quantity_0').select();
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
            $("#tax_0").focus();
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
            $("#imeitype").focus();
        }

    });
    $('#imeitype').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnadd").focus();
        }

    });




    $('#LocationCode,#LocationName,#txtdesc,#txtcode,#txtname,#select_areagroup,#txt_code,#txt_cname,#txt_rate').keydown(function (e) {
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



});


function SavePurchaseReturn() {


    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if ($('#supplierId').val() == 0) {
        warningshow('Please Select Supplier', 'suppliername');
    }
    else if ($('#paytype').val() == 0) {
        warningshow('Please Select Pay Type', 'paytype');
    }
    else if ($('#purchaseinvdate').val() == '') {
        warningshow('Please Select Invoice Date', 'purchaseinvdate');
    }
    else if ($('#duedate').val() == '') {
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
    else if ($('#jobcode').val() != '' && $('#jobid').val() == 0) {
        warningshow('Please Enter Valid Job No', 'jobcode');
    }
    else if ($('#product_0').val() != '') {
        warningshow('Product is not Added in Grid', 'product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('In Edit Mode-Please Update');
    }

    else {
        $('#Confirmflag').val('purchasereturn'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Save the Purchase Return?')
        $('#confirm').show();
        $('#confirmOk').focus();

    }


}

function OKPurchaseReturn() {


    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if ($('#supplierId').val() == 0) {
        warningshow('Please Select Supplier', 'suppliername');
    }
    else if ($('#paytype').val() == 0) {
        warningshow('Please Select Pay Type', 'paytype');
    }
    else if ($('#purchaseinvdate').val() == '') {
        warningshow('Please Select Invoice Date', 'purchaseinvdate');
    }
    else if ($('#duedate').val() == '') {
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
    else if ($('#jobcode').val() != '' && $('#jobid').val() == 0) {
        warningshow('Please Enter Valid Job No', 'jobcode');
    }
    else if ($('#product_0').val() != '') {
        warningshow('Product is not Added in Grid', 'product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('In Edit Mode-Please Update');
    }

    else {                   //ajax code for insert and update to  controller
        $('#confirmOk').prop("disabled", true);
        //$('#btnsubmit').prop("disabled", true);
        var oArray = new Array();
        for (var k = 1; k < i; k++) {
            var PRMainId = $('#PurchaseInvoiceMainId').val();
            var PRNo = $('#purchaseinvoiceno1').val();
            var SupplierId = $('#supplierId').val();
            var PayType = 2;
            var PurchaseType = $('#purchasetype').val();
            var PRDate = $('#purchaseinvdate').val();
            var Terms = $('#terms').val();
            var DueDate = $('#duedate').val();
            var LocnId = $('#location').val();
            var PlaceOfSupply = $('#placeofsupply').val();
            var JobNo = $('#jobcodeid_' + k).val();
            var ShipDate = $('#shipdate').val();
            var CurrencyId = $('#currency').val();
            var CurrencyRate = $('#rate').val();
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
            var SubId = $('#PurchaseInvoiceSubId').val();
            var BatchSlno = 0;
            var Batch = '';
            var PIMainId = $('#OrderId_' + k).val();
            var PISubId = $('#OrderSubId_' + k).val();
            var ItemId = $('#productId_' + k).val();
            var ItemCode = $('#product_' + k).val();
            var ItemDescription = $('#productdesc_' + k).val();
            var LocationId = $('#locn_' + k).val();
            var UnitId = $('#unit_' + k).val();
            var Fraction = 1;
            var Quantity = $('#quantity_' + k).val();
            var Rate = $('#txtrate_' + k).val();
            var BaseRate = $('#baserate_' + k).val();
            var Discount = $('#discount_' + k).val();
            var BaseDiscount = $('#basediscount_' + k).val();
            var TaxId = $('#tax_' + k).val();
            var TaxRate = $('#taxpercentage_' + k).val();
            var TaxableAmount = $('#txttaxable_' + k).val();
            var TaxAmount = $('#txttax_' + k).val();
            var TotalAmount = $('#amount_' + k).val();
            var BaseTaxable = $('#basetaxableamount_' + k).val();
            var BaseTax = $('#basetaxamount_' + k).val();
            var BaseAmount = $('#baseamount_' + k).val();
            var IMEI = $('#imei_' + k).val();
            var Remarks = $('#txtnotes').val();
            var DeleteFlag = 1;
            var PINo = $('#PI').val();

            var TaxId1 = $('#mtaxid1').val();
            var Taxable0 = $('#splittaxable_0').val();

            var TaxId2 = $('#mtaxid2').val();
            var Taxable5 = $('#splittaxable_5').val();
            var Tax5 = $('#splittax_5').val();

            var TaxId3 = $('#mtaxid3').val();
            var Taxable12 = $('#splittaxable_12').val();
            var Tax12 = $('#splittax_12').val();

            var TaxId4 = $('#mtaxid4').val();
            var Taxable18 = $('#splittaxable_18').val();
            var Tax18 = $('#splittax_18').val();

            var TaxId5 = $('#mtaxid5').val();
            var Taxable28 = $('#splittaxable_28').val();
            var Tax28 = $('#splittax_28').val();


            if (!(typeof ItemCode == "undefined")) {
                oArray.push({
                    'PRMainId': PRMainId,
                    'PRNo': PRNo,
                    'SupplierId': SupplierId,
                    'PayType': PayType,
                    'PurchaseType': PurchaseType,
                    'PRDate': PRDate,
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
                    'FCTaxable': FCTaxable,
                    'FCTax': FCTax,
                    'FCGrandTotal': FCGrandTotal,
                    'Remarks': Remarks,
                    'DepartmentId': DepartmentId,
                    'UserId': UserId,
                    'SubId': SubId,
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
                    'PIMainId': PIMainId,
                    'DeleteFlag': DeleteFlag,
                    'PINo': PINo,
                    'PISubId': PISubId,

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
                    'Tax28': Tax28,
                    'IMEI': IMEI
                })
            }
        }

        if (oArray != "") {

            var data = { 'PurchaseReturn': oArray };
            $.ajax({
                type: "POST",
                url: "../Purchase/MobilePurchaseReturnInsertandUpdate",
                data: data,
                success: function (result) {
                    var status = result.oList[0].Status;
                    var no = result.oList[0].PRNo;
                    $('#btnsubmit').prop("disabled", false);

                    if (status != 2) {
                        Showalerts(status, no);
                    }
                    else {
                        OutofStock(result.oList)
                    }
                }
            });
        }
        else {
            warningshow('No Products Added', 'product_0');
            $('#btnsubmit').prop("disabled", false);
        }

    }


}

function OutofStock(result) {
    $('#tblOutOfStock tr').remove();
    var xxx = "";
    xxx = "<thead><tr style='font-weight:500;'>" +
        "<td style='border:1px solid #BABFC7;width:auto;text-align:center'>Product Code</td>" +
        "<td style='border:1px solid #BABFC7;width:auto;text-align:center'>Product Description</td>" +
        "<td style='border:1px solid #BABFC7;width:auto;text-align:center'>Quantity Available</td>" +
        "<td style='border:1px solid #BABFC7;width:auto;text-align:center'>Location</td></tr></thead>";

    for (var c = 0; c < result.length; c++) {
        xxx = xxx + "<tr style='font-weight:400;'>" +
            "<td style='border:1px solid #BABFC7;width:auto;text-align:center'>" + result[c].PRNo + "</td>" +
            "<td style='border:1px solid #BABFC7;width:auto;text-align:center'>" + result[c].ItemDescription + "</td>" +
            "<td style='border:1px solid #BABFC7;width:auto;text-align:center'>" + result[c].Quantity + "</td>" +
            "<td style='border:1px solid #BABFC7;width:auto;text-align:center'>" + result[c].LocationName + "</td></tr>";

    }
    $('#tblOutOfStock').append(xxx);
    $('#OutofStock').show();
}

function checkproduct() {
    var a = ($('#product_0').val()).length;
    if ($('#ProductLength').val() != a) {
        $('#productId_0').val(0);
    }

}

function CheckIMEI() {
    if ($('#imeitype').val() == 0 && $('#defaultimei').val() != $('#imei_0').val()){
        $('#imei_id').val(0);
    } 

}

//On Change of Tax

function ChangeTax(TId, selectObject) {
    var value = selectObject.value;
    $("#taxpercentage_" + TId).val($(selectObject).find("option:selected").attr("name"))
    CalcAmount(TId);

}

//Calculation Of DueDate

function getdate(terms) {
    if ($('#terms').val() != 0) {
        var Days = terms;
        var dateObj = new Date(Date.now() + 86400000 * Days);
        var month = parseInt(1 + dateObj.getUTCMonth());
        var day = dateObj.getUTCDate();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var year = dateObj.getUTCFullYear();
        newdate = day + "/" + month + "/" + year;
        $('#duedate').val(newdate);
    }
    else {
        $('#duedate').val(CurDate);
    }

}

//Serial No Load Function

function Serialnoload() {
    var srlno = {};
    srlno.DeptId = DepId;

    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#confirmff,#keyboardff').show();
            }
            else {
                getslno(result.oList);
                Defaultfocus();
            }

        }
    });

}

function getslno(result) {

    $('#purchaseinvoiceno1').val(result[0].PRNo);
    $('#ImpTax').val(result[0].ImportPurTax);

}

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

//Location Load Function

function GetLocation(id) {
    var data = {};
    data.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList, id);


        }
    });

}

function LocationLoad(result, a) {
    $("#location,#locn_0").empty();
    LocationSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "'locname='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";

    }
    $("#location,#locn_0").append(LocationSelect);
    if (a == 0) {
        $('#location,#locn_0').val(ULocId);
    }
    else {
        $('#location').val(a);
    }
}

//Unit Load Function

function GetUnit() {

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

}

function UnitLoad(result) {
    $("#unit_0").empty();
    UnitSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'unitname='" + result[i].UnitName + "'> " + result[i].UnitName + "</option>";
    }
    $("#unit_0").append(UnitSelect);
}

//Tax Load Function

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
    $("#tax_0").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    var TaxSplit = "";
    var s = 0;
    DefaultTaxArray = [];
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "'name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
        s = i + 1;
        TaxSplit = "<tr class='jsgrid-row' id='" + result[i].TaxId + "'>" +
        "<td class='text-center' style='width:auto;width:30%;border:1px solid #BABFC7;'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + result[i].TaxId + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +
        "<td class='text-center' style='width:auto;width:40%;border:1px solid #BABFC7;'><input type='text' disabled style='background-color:white;border:none;height:30px' class='form-control text-center distxtbox' id='splittaxable_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittaxable_" + result[i].TaxRate + "' value='0.00' /></td>" +
        "<td class='text-center' style='width:auto;width:40%;border:1px solid #BABFC7;'><input type='text' disabled style='background-color:white;border:none;height:30px' class='form-control text-center distxtbox' id='splittax_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittax_" + result[i].TaxRate + "' value='0.00' /></td>" +
        "</tr>";
        DefaultTaxArray.push(result[i].TaxRate);
        $('#tbltaxsplit').append(TaxSplit);
    }
    $("#tax_0").append(TaxSelect);
}


//Place Of Supply Load Function

function GetArea(id) {
    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            AreaLoad(result.oList, id);


        }
    });
}

function AreaLoad(result, a) {
    var DefaultArea = 0;
    $("#placeofsupply").empty();
    $("#placeofsupply").append("<option value='0'>-Place Of Supply-</option>");
    for (var i = 0; i < result.length; i++) {
        if (result[i].DefaultArea != 0) {
            DefaultArea = result[i].DefaultArea
        }
        $("#placeofsupply").append("<option value='" + result[i].AreaId + "'>" + result[i].AreaCode + "</option>");
    }
    if (a == 0) {
        $('#placeofsupply').val(DefaultArea);
    }
    else {
        $('#placeofsupply').val(a);
    }
}
//Area Group Load Function

function GetAreaGroupselect(AreaGrpId) {
    var data = {};
    data.AreaGrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGroupGetandGets",
        data: data,
        success: function (result) {
            AreaGroupLoad(result.oList);

        }
    });

}

function AreaGroupLoad(result) {
    $("#select_areagroup").empty();
    $("#select_areagroup").append("<option value='0'>Select Group</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_areagroup").append("<option value='" + result[i].AreaGrpId + "'>" + result[i].AreaName + "</option>");
    }

}

//Currency Load Function

function GetCurrency(id) {

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

function CurncyLoad(result, a) {
    $("#currency,#CostCurrency").empty();
    var BaseCurrency = 0;

    for (var i = 0; i < result.length; i++) {

        if (result[i].BaseCurrencyId != 0) {
            BaseCurrency = result[i].BaseCurrencyId
        }

        $("#currency").append("<option value='" + result[i].Id + "'name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");

        CurrencySelect += "<option value='" + result[i].Id + "'name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>";
    }
    $('#currency').val(BaseCurrency);
    $("#rate").val($("#currency").find("option:selected").attr("name"));

    if (a != 0) {
        $('#currency').val(a);
        $("#rate").val($("#currency").find("option:selected").attr("name"))
        CalcAmt();
    }
}

//Terms Load Function

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


function TermsLoad(result, a) {
    $("#terms").empty();
    $("#terms").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#terms").append("<option value='" + result[i].TermsId + "' name='" + result[i].Terms + "'>" + result[i].TermsDescription + "</option>");
    }
    if (a == 0) {
        $('#terms').val(0);
    }
    else {
        $('#terms').val(a);
        var terms = $("#terms").find("option:selected").attr("name");
        getdate(terms);
    }
}




//Product Add to Grid Function

function Productadd() {
    var Product = $("#product_0").val()
    var a = parseFloat($('#discount_0').val());
    var b = parseFloat($('#txtsubtotal_0').val());
    var IMEIFlag = 0;
    for (var p = 1; p <= i; p++) {
        if ($('#productId_' + p).val() == $('#productId_0').val()) {
            ProductFlag = 1;
        }
        if ($('#imei_' + p).val() == $('#imei_0').val()) {
            IMEIFlag = 1;
        }
    }
    if ($('#unit_0').find("option:selected").attr("unitname") == 'FOC') {
        UnitFlag = 1;
    }

    if (Product == "") {
        warningshow('Please Select Product', 'product_0');
        return false;
    }
    else if ($('#productId_0').val() == 0) {
        warningshow('Press Enter To Create New Product', 'addproductbtn');
        return false;
    }
    else if ($('#locn_0').val() == 0) {
        warningshow('Please Select Location', 'locn_0');
        return false;
    }
    else if ($('#unit_0').val() == 0) {
        warningshow('Please Select Unit', 'unit_0');
        return false;
    }
    else if ($.trim($('#quantity_0').val()) == '' || $.trim($('#quantity_0').val()) == 0) {
        warningshow('Please Enter Quantity', 'quantity_0');
        return false;
    }
    else if (UnitFlag == 0 && ($.trim($('#txtrate_0').val()) == '' || $.trim($('#txtrate_0').val()) == 0)) {
        warningshow('Please Enter Rate', 'txtrate_0');
        $('#txtrate_0').select();
        return false;
    }
    else if (UnitFlag == 1 && ($.trim($('#txtrate_0').val()) == '' || $('#txtrate_0').val() != 0)) {
        warningshow('Rate Must be 0 for Unit FOC', 'txtrate_0');
        $('#txtrate_0').select();
        return false;
    }

    else if ($('#tax_0').val() == 0) {
        warningshow('Please Select Tax', 'tax_0');
        return false;
    }
    else if (parseFloat($('#amount_0').val()) <= 0 && UnitFlag == 0) {
        warningshow('Amount Must be Greater than Zero', 'txtrate_0');
        $('#txtrate_0').select();
        return false;
    }
    else if ($('#jobcodeid_0').val() == 0 && $('#jobcode_0').val() != '') {
        warningshow('Please Select Valid Job', 'jobcode_0');
        return false;
    }
    else if ($('#imeitype').val() == 0 && $.trim($('#imei_0').val()) == '') {
        warningshow('Please Enter IMEI Number', 'imei_0');
        return false;
    }
    else if ($('#imeitype').val() == 0 && ($('#imei_id').val() == 0 || $('#defaultimei').val() != $('#imei_0').val())) {
        warningshow('Please Select Valid IMEI Number', 'imei_0');
        return false;
    }
    else if ($('#imeitype').val() == 0 && $('#quantity_0').val() !=1) {
        warningshow('Quantity Should Be "1" For IMEI Type', 'quantity_0');
        $('#quantity_0').select();
        return false;
    }
    else if (IMEIFlag == 1) {
        warningshow('This IMEI is Already Added!!', 'imei_0');
        $('#imei_0').select();
        return false;
    }
    else if ($('#imeitype').val() == 1 && $('#imei_0').val() != '') {
        warningshow('IMEI Number Not Needed For Non IMEI', 'imei_0');
        return false;
    }
    else {
        if ($('#imeitype').val() == 1) {
            $('#imei_0').val('');
        }

        if (ProductFlag == 1) {
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                ClearProductRow();
                ProductFlag = 0;
                return false;
            }
        }
        $('#prodappdiv').empty();
        $('#prodappdiv').append("<input type='text' id='product_0' class='form-control' style='height:65%;margin-left:1px' onkeypress='LoadProduct()' ><div class='input-group-append'><button class='btn btn-outline-primary' id='addproductbtn' type='button' style='height:65%' onclick=window.open('../Master/ItemMaster')>+</button></div>");

        var no = $('#tblpurchaseinvoice tr').length + 1;
        var id = parseInt(i)
        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >" +
            no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='OrderId_" + id + "' value='0'><input type='hidden' id='OrderSubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='" +
            $("#productId_0").val() + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            Product + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#productdesc_0").val() + "'></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
            + $("#jobcodeid_0").val() + "'><input type='hidden' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#jobcode_0").val() + "'><input type='text' id='imei_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#imei_0").val() + "'></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
            UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            parseInt($("#quantity_0").val()) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            parseFloat($("#txtrate_0").val()).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='" +
            parseFloat($("#baserate_0").val()).toFixed(Decimal) + "' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            parseFloat($("#discount_0").val() || 0).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
            parseFloat($("#txttaxable_0").val()).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
            TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
            $("#taxpercentage_0").val() + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
            parseFloat($("#txttax_0").val()).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value='" +
            parseFloat($("#txtsubtotal_0").val()).toFixed(Decimal) + "'><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
            parseFloat($("#amount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='" + parseFloat($("#baseamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basetaxableamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basetaxamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basediscount_0").val()).toFixed(Decimal) + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            LocationSelect + "</select></td></tr>";

        $('#tblpurchaseinvoice').append(ProdEditRow);
        $('#tax_' + id).val($('#tax_0').val());
        $('#unit_' + id).val($('#unit_0').val());
        $('#txtunit_' + id).val($('#txtunit_0').val());
        $('#locn_' + id).val($('#locn_0').val());
        $('#proddiv').animate({ scrollTop: 5000 }, 900);

        ClearProductRow();
        ProductPopuprefresh();
        i++;
        CalcGrandTotal(id);
        TaxSplit(id)
        Product = '';
        UnitFlag = 0;
        ProductFlag = 0;

    }
}

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

//Edit Grid Function

function Editrow(RowId) {
    if (FlagEdit == 0) {
        FlagEdit = FlagEdit + 1;
        $('#row_' + RowId).children('td, th').css('background-color', 'rgb(232, 226, 226)');
        locn = $('#locn_' + RowId).val();
        unit = $('#unit_' + RowId).val();
        quantity = $('#quantity_' + RowId).val();
        rate = $('#txtrate_' + RowId).val();
        disc = $('#discount_' + RowId).val();
        tax = $('#tax_' + RowId).val();
        taxper = $('#taxpercentage_' + RowId).val();
        jobrowid = $('#jobcodeid_' + RowId).val();
        jobrowcode = $('#jobcode_' + RowId).val();
        EditSplitTaxable = $('#txttaxable_' + RowId).val();
        EditSplitTax = $('#txttax_' + RowId).val();
        $('#edit_' + RowId).hide();
        $('#update_' + RowId).show();
        $('#locn_' + RowId).prop('disabled', false);
        $('#unit_' + RowId).prop('disabled', false);
        if ($('#imei_' + RowId).val() == '') {
            $('#quantity_' + RowId).prop('disabled', false);
        }
        $('#txtrate_' + RowId).prop('disabled', false);
        $('#discount_' + RowId).prop('disabled', false);
        $('#tax_' + RowId).prop('disabled', false);
        $('#jobcode_' + RowId).prop('disabled', false);
        $('#unit_' + RowId).focus();
        CalcGrandTotal(i);
        Fnaddjobautocomplete(RowId)
    } else {
        warningshow('Update Edit Mode Row First');
    }
}

//Cancel Edit Grid Function

function CancelEdit(RowId) {
    FlagEdit = FlagEdit - 1;
    $('#row_' + RowId).children('td, th').css('background-color', 'white');
    $('#locn_' + RowId).val(locn);
    $('#unit_' + RowId).val(unit);
    $('#quantity_' + RowId).val(quantity);
    $('#txtrate_' + RowId).val(rate);
    $('#discount_' + RowId).val(disc);
    $('#tax_' + RowId).val(tax);
    $('#taxpercentage_' + RowId).val(taxper);
    $('#jobcodeid_' + RowId).val(jobrowid);
    $('#jobcode_' + RowId).val(jobrowcode);
    CalcAmount(RowId);
    CalcGrandTotal(i);
    $('#locn_' + RowId).prop('disabled', true);
    $('#unit_' + RowId).prop('disabled', true);
    $('#quantity_' + RowId).prop('disabled', true);
    $('#txtrate_' + RowId).prop('disabled', true);
    $('#discount_' + RowId).prop('disabled', true);
    $('#tax_' + RowId).prop('disabled', true);
    $('#jobcode_' + RowId).prop('disabled', true);
    $('#update_' + RowId).hide();
    $('#edit_' + RowId).show();
}

//Delete Grid Function

function DeleteRow(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('deletegridrow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?');

}
function ConfirmboxResult(Result, status, rowid) {


    if (Result == 'true' && status == 'deletegridrow') {
        detl(rowid)
    }
    else if (Result == 'true' && status == 'createnew') {
        $('.form-control').prop('disabled', false);
        $('.jsgrid-button').prop('disabled', false);
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'copy') {
        NextInvoiceNo = parseInt($('#purchaseinvoiceno1').val() || 0);
        formrefresh(1);
        $('#purchaseinv,#popupdiv,#PurchaseTransactionPopup,#productpdiv,#iconForm').hide();
        $('#copypurchase').show();
        $('#btnprvs').prop("disabled", false);
        $('#btnnxt').prop("disabled", false);

        //  $('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#copypurchaseinvo').prop("disabled", false);
        $('#copypurchaseinvo').val(NextInvoiceNo);
        $('#copypurchaseinvo').select();
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnlist').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#btncrncysave').prop("disabled", true);
        $('#btnaddcost').prop("disabled", true);
        $('.butndis').prop("disabled", true);
        $('#btnsubmit,#btnlist').hide();
        $('#copypurchaseinvo').focus();
        $('#copypurchaseinvo').select();


    }
    else if (Result == 'false' && status == 'copy') {
        CopyFlag = 0;
    }
    else if (Result == 'true' && status == 'purchasereturn') {
        OKPurchaseReturn();
    }
    $('#confirm').fadeOut();

}
function detl(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    var splittaxable = parseFloat($('#txttaxable_' + RowId).val());
    var splittax = parseFloat($('#txttax_' + RowId).val());
    var splittaxid = $('#taxpercentage_' + RowId).val()
    $('#row_' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#product_' + j).val() != undefined) {
            $('#td_' + j).text(slno);
            slno++;
        }
    }
    $('#product_0').focus();
    CalcGrandTotal(i);
    SplitTaxDelete(splittaxid, splittaxable, splittax)

}
//Update Grid Function

function UpdateRow(RowId) {
    if ($('#unit_' + RowId).find("option:selected").attr("unitname") == 'FOC') {
        UFlag = 1;
    }
    var a = parseFloat($('#discount_' + RowId).val()).toFixed(Decimal);
    var b = parseFloat($('#txtsubtotal_' + RowId).val()).toFixed(Decimal);

    if ($('#locn_' + RowId).val() == 0) {
        warningshow('Press Select Location', '#locn_' + RowId);
        return false;
    }
    else if ($('#unit_' + RowId).val() == 0) {
        warningshow('Please Select Unit', 'unit_' + RowId);
        return false;
    }
    else if ($.trim($('#quantity_' + RowId).val()) == '' || $.trim($('#quantity_' + RowId).val()) == 0) {
        warningshow('Please Select Quantity', 'quantity_' + RowId);
        return false;
    }
    else if (UFlag == 0 && ($.trim($('#txtrate_' + RowId).val()) == '' || $.trim($('#txtrate_' + RowId).val()) == 0)) {
        warningshow('Please Enter Rate', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
        return false;
    }
    else if (UFlag == 1 && $('#txtrate_' + RowId).val() != 0) {
        warningshow('Rate Must be 0 for Unit FOC', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
        return false;

    }
    else if ($('#tax_' + RowId).val() == 0) {
        warningshow('Please Select Tax', 'tax_' + RowId);
        return false;
    }
    else if (parseFloat($('#amount_' + RowId).val()) <= 0 && UFlag == 0) {
        warningshow('Amount Must be Greater Than Zero', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
        return false;
    }
    else if ($.trim($('#jobcode_' + RowId).val()) != '' && $('#jobcodeid_' + RowId).val() == 0) {
        warningshow('Enter A Valid Job ', 'jobcode_' + RowId);
        return false;
    }
    else {
        if ($('#locn_' + RowId).val() != locn) {
            var Res = confirm('Location Changed!..Do You Want to Continue?');
            if (Res == false) {
                return false;
            }
        }
        $('#update_' + RowId).hide();
        $('#edit_' + RowId).show();
        FlagEdit = FlagEdit - 1;
        $('#row_' + RowId).children('td, th').css('background-color', 'white');
        var ratenum = parseFloat($("#txtrate_" + RowId).val());
        $("#txtrate_" + RowId).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#discount_" + RowId).val() || 0);
        $("#discount_" + RowId).val(disnum.toFixed(Decimal));

        $('#locn_' + RowId).prop('disabled', true);
        $('#unit_' + RowId).prop('disabled', true);
        $('#quantity_' + RowId).prop('disabled', true);
        $('#txtrate_' + RowId).prop('disabled', true);
        $('#discount_' + RowId).prop('disabled', true);
        $('#tax_' + RowId).prop('disabled', true);
        $('#jobcode_' + RowId).prop('disabled', true);

        EditSplitTaxUpdate(taxper, EditSplitTaxable, EditSplitTax, RowId);


        CalcGrandTotal(i);

        locn = ""; unit = ""; quantity = ""; rate = "";
        disc = ""; tax = ""; taxper = "";
        UFlag = 0;
    }
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

//Clear Product Row Function

function ClearProductRow() {

    $('#imeitype').val(0);
    $('#imei_id').val(0);
    $('#defaultimei').val('');
    $('#imei_0').val('');

    $('#product_0').val('');
    $("#locn_0").val($("#location").val());
    $("#unit_0").val(0);
    $('#quantity_0').val('');
    $('#txtrate_0').val('');
    $('#discount_0').val('');
    if ($('#purchasetype').val() == 'Local') {
        $('#tax_0').val(0);
        $('#taxpercentage_0').val('');
    }
    else if ($('#purchasetype').val() == 'Import') {
        $('#tax_0').val($('#ImpTax').val());
        $("#taxpercentage_0").val($('#tax_0').find("option:selected").attr("name"))
    }
    $('#amount_0').val('');
    $('#baseamount_0').val('');
    $('#basetaxableamount_0').val('');
    $('#basetaxamount_0').val('');
    $('#basediscount_0').val('');
    $('#productId_0').val(0)
    $('#productdesc_0').val('')
    $('#txttaxable_0').val('');
    $('#txttax_0').val('');
    $('#txtsubtotal_0').val('');
    $('#product_0').focus();
    if ($('#jobid').val() != 0) {
        $('#jobcode_0').val($('#jobcode').val());
        $('#jobcodeid_0').val($('#jobid').val());
    }
    else {
        $('#jobcode_0').val('');
        $('#jobcodeid_0').val(0);
    }
}

//Calculation Of Grand Total (Base and FC) Function

function CalcGrandTotal(Id) {
    var GrandTotal = 0;
    $('#GrandTotal').val('')
    var TotalDiscount = 0;
    $('#totdisc').val('')
    var TotalTaxable = 0;
    $('#tottaxable').val('')
    var TotalTax = 0;
    $('#tottax').val('')
    var FCrate = parseFloat($('#rate').val() || 0).toFixed(3);
    var FCAmount = 0;
    var FCtotdisc = 0;
    var FCtottaxable = 0;
    var FCtottax = 0;
    var InvoiceAmount = 0;
    var InvDiff = 0;
    var BillDisc = 0;
    $('#fcamount').val('')
    $('#fctaxable').val('')
    $('#fctax').val('')
    $('#fcdiscount').val('')

    for (var k = 1; k <= Id; k++) {
        var d = isNaN(parseFloat($('#discount_' + k).val() || 0)) ? 0 : parseFloat($('#discount_' + k).val() || 0);

        GrandTotal = GrandTotal + parseFloat($('#amount_' + k).val() || 0);
        TotalDiscount = TotalDiscount + d;
        TotalTaxable = TotalTaxable + parseFloat($('#txttaxable_' + k).val() || 0);
        TotalTax = TotalTax + parseFloat($('#txttax_' + k).val() || 0);
        d = 0;
    }
    FCAmount = GrandTotal * FCrate;
    FCtotdisc = TotalDiscount * FCrate;
    FCtottaxable = TotalTaxable * FCrate;
    FCtottax = TotalTax * FCrate;

    InvoiceAmount = parseFloat($('#SupInvoTotal').val() || 0);
    InvDiff = GrandTotal - InvoiceAmount;
    BillDisc = parseFloat($('#disc').val() || 0);
    BillDisc = BillDisc * FCrate;
    $('#basedisc').val(BillDisc.toFixed(Decimal));
    $('#invdiff').val(InvDiff.toFixed(Decimal));
    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#totdisc').val(TotalDiscount.toFixed(Decimal));
    $('#tottaxable').val(TotalTaxable.toFixed(Decimal));
    $('#tottax').val(TotalTax.toFixed(Decimal));
    $('#fcamount').val(FCAmount.toFixed(Decimal));
    $('#fctaxable').val(FCtottaxable.toFixed(Decimal));
    $('#fctax').val(FCtottax.toFixed(Decimal));
    $('#fcdiscount').val(FCtotdisc.toFixed(Decimal));
    $('#fc').text(FCAmount.toFixed(Decimal));


    if ($('#rate').val() == 1 || $('#fcamount').val() <= 0) {
        $("#fc").css("opacity", '0');
        $('#gndtotal').text(GrandTotal.toFixed(Decimal));
    }
    else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
        $("#fc").css("opacity", '100');
        $('#gndtotal').text('FC : ' + GrandTotal.toFixed(Decimal));
    }
}

//Checking Difference Between GrandTotal And Invoice Total Function

function CalcInvoice() {
    Invoice = 0;
    Invoice = parseFloat($('#SupInvoTotal').val() || 0);
    $('#SupInvoTotal').val(Invoice.toFixed(Decimal));
}

//Default Focus Function

function Defaultfocus() {
    $('#suppliername').focus();
}

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

//Form Refresh

function formrefresh(RefreshFlag) {
    $('#confirmOk').prop("disabled", false);
    $('#imeitype').val(0);
    $('#imei_id').val(0);
    $('#defaultimei').val('');
    $('#imei_0').val('');
    $('#copypurchaseinvo').val('');
    //$('#tour1').hide();
    $('#paytype').val(2);
    $('#purchasetype').val('Local');
    $('#transfer').val(0);
    $('#supplierId').val(0);
    $('#suppliername').val('');
    $('#purchaseinvdate').val(CurDate);
    $('#duedate').val(CurDate);
    $('#shipdate').val(CurDate);
    $('#terms').val(0);
    $('#location').val(ULocId);
    $('#fcamount').val('');
    $('#fctaxable').val('');
    $('#fctax').val('');
    $('#fcdiscount').val('');
    $('#rate').val('');
    $('#jobcode').val('');
    $('#jobid').val(0)
    $('#product_0').val('');
    $('#btndelete').hide();
    $('#locn_0').val(ULocId);
    $('#unit').val(0);
    $('#quantity').val('');
    $('#txtrate').val('');
    $('#discount').val('');
    $('#SupInvoTotal').val('');
    $('#tax').val(0);
    $('#taxpercentage').val('');
    $('#txtnotes').val('');
    $("#panel1").hide();
    $('#disc').val('');
    $('#basedisc').val('');
    $('#totdisc').val('0.00');
    $('#tottaxable').val('0.00');
    $('#tottax').val('0.00');
    $('#GrandTotal').val('');
    $('#invdiff').val('');
    $('#taxamount').val('');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
    for (var k = 1; k < i; k++) {
        $('#row_' + k).remove();
    }
    for (var k = 1; k < x; k++) {
        $('#costrow_' + k).remove();
    }
    $('#otrcost').val('');
    $('#totcredit').val('');
    $('#totdebit').val('');
    $('#costdiff').val('');
    i = 1;
    x = 1;
    ClearProductDetails();
    Defaultfocus();
    $('#ProductLength').val();
    $('#purchaseinvoiceno1').select();
    $('#btnsubmit').prop("disabled", false);
    $('#btnlist').prop("disabled", false);
    $('#btnadd').prop("disabled", false);
    $('#btncrncysave').prop("disabled", false);
    $('#btnaddcost').prop("disabled", false);
    $('#Warningpopup').fadeOut();
    $('#purchaseinvoiceno1').prop("disabled", true);
    $('#invdiff').prop("disabled", true);
    $('#taxpercentage_0').prop("disabled", true);
    $('#amount_0').prop("disabled", true);
    $('#totdisc,#tottaxable,#tottax').prop("disabled", true);
    $('#RowGet').val('');
    $('#RowGet1').val('');
    $('#lpo').val('');
    $('#account').val('');
    $('#accid').val(0);
    $('#costamount').val('0.00')
    $('#CostCurrency').prop("disabled", false);
    $('#CostCurrRate').prop("disabled", false);
    $('.distxtbox').val("0.00");
    $('.distxtbox').prop("disabled", true);
    if (RefreshFlag != 1) {
        $('.butndis').prop("disabled", false);
        $('#btnsubmit,#btnlist').show();
        $('#purchaseinv').show();
        $('#copypurchase').hide();
        Serialnoload();
        GetCurrency(0);
        GetArea(0);
        $('#purchaseinvoiceno1').val('');
        CopyFlag = 0;
    }
    $('#suppliername').focus();
}
//Hide PO details
function HidePO() {
    $('#iconForm').hide()
    $('#RowGet').val('');
    $('#RowGet1').val('');
    $('#tbl_POList tr td').remove;
    $('#tbl_PO_ListItem').remove;
    PONumber = '';

    $('#ProductPopUp1Id').val(0);
    $('#ProductPopUp1').val('');
    $('#InvoiceFromDate').val(CurDate);
    $('#InvoiceToDate').val(CurDate);

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
//Calculation  Function for Both Amount Calculation in Grid and GrandTotal

function CalcAmt() {
    for (var m = 1; m <= i; m++) {
        CalcAmount(m)
    }
    CalcGrandTotal(i)
}

//Calculation  Function for Amount Calculation in Grid

function CalcAmount(row) {

    var quantity = parseFloat($('#quantity_' + row).val() || 0);
    var rate = parseFloat($('#txtrate_' + row).val() || 0).toFixed(Decimal);
    var discount = parseFloat($('#discount_' + row).val() || 0).toFixed(Decimal);
    var taxpercentage = parseFloat($("#taxpercentage_" + row).val() || 0);
    var currencyrate = parseFloat($("#rate").val() || 0).toFixed(Decimal);

    var tamount = parseFloat(quantity * rate)
    var taxableamount = parseFloat(tamount - discount)
    var taxamount = parseFloat(taxableamount * (taxpercentage / 100));
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));

    var atotalamount = totalamount.toFixed(Decimal)
    var baseamount = parseFloat(atotalamount * currencyrate);

    var ataxableamount = taxableamount.toFixed(Decimal)
    var basetaxableamount = parseFloat(ataxableamount * currencyrate);

    var ataxamount = taxamount.toFixed(Decimal)
    var basetaxamount = parseFloat(ataxamount * currencyrate);

    var adiscount = discount
    var basediscount = parseFloat(adiscount * currencyrate);

    var arate = rate
    var baserate = parseFloat(arate * currencyrate);


    $("#amount_" + row).val(totalamount.toFixed(Decimal));
    $("#txttaxable_" + row).val(taxableamount.toFixed(Decimal));
    $("#txttax_" + row).val(taxamount.toFixed(Decimal));
    $("#txtsubtotal_" + row).val(tamount.toFixed(Decimal));

    $("#baseamount_" + row).val(baseamount.toFixed(Decimal));
    $("#basetaxableamount_" + row).val(basetaxableamount.toFixed(Decimal));
    $("#basetaxamount_" + row).val(basetaxamount.toFixed(Decimal));
    $("#basediscount_" + row).val(basediscount.toFixed(Decimal));
    $("#baserate_" + row).val(baserate.toFixed(Decimal));

    if (row != 0) {
        CalcGrandTotal(i)

    }
}



//Design Change for Copy Function 

function GetRows() {
    CopyFlag = 1;
    var rowCount = document.getElementById('tblpurchaseinvoice').rows.length;
    if (rowCount == 0) {
        NextInvoiceNo = parseInt($('#purchaseinvoiceno1').val() || 0);
        formrefresh(1);
        $('#purchaseinv,#popupdiv,#PurchaseTransactionPopup,#productpdiv,#iconForm').hide();
        $('#copypurchase').show();
        $('#btnprvs').prop("disabled", false);
        $('#btnnxt').prop("disabled", false);

        //$('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#copypurchaseinvo').prop("disabled", false);
        $('#copypurchaseinvo').val(NextInvoiceNo);
        $('#copypurchaseinvo').select();
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnlist').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#btncrncysave').prop("disabled", true);
        $('#btnaddcost').prop("disabled", true);
        $('.butndis').prop("disabled", true);
        $('#btnsubmit,#btnlist').hide();
        $('#copypurchaseinvo').focus();
        $('#copypurchaseinvo').select();
    }
    else {
        $('#Confirmflag').val('copy'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').focus();

    }

}

//Copy Function 

function PurchaseReturnGets(result) {
    $('.distxtbox').val("0.00");
    $('.distxtbox').prop("disabled", true);
    for (var n = 0; n < result.length; n++) {
        $('#copypurchaseinvo').val(result[n].PRNo);
        $('#purchasetype').val(result[n].PurchaseType);
        $('#suppliername').val(result[n].SupplierName);
        $('#purchaseinvdate').val(result[n].PRDate);
        $('#terms').val(result[n].Terms);
        $('#duedate').val(result[n].DueDate);
        $('#location').val(result[n].LocnId);
        $('#placeofsupply').val(result[n].PlaceOfSupply);
        $('#shipdate').val(result[n].ShipDate);
        $('#currency').val(result[n].CurrencyId);
        $('#rate').val(result[n].CurrencyRate);
        $('#totdisc').val(result[n].TotalDiscount.toFixed(Decimal));
        $('#tottaxable').val(result[n].TotalTaxable.toFixed(Decimal));
        $('#tottax').val(result[n].TotalTax.toFixed(Decimal));
        $('#GrandTotal').val(result[n].GrandTotal.toFixed(Decimal));
        $('#fcamount').val(result[n].FCGrandTotal.toFixed(Decimal));

        $('#fc').text(result[n].FCGrandTotal.toFixed(Decimal));
        $('#txtnotes').val(result[n].Remarks);
        if (result[n].LPO != 0) {
            $('#lpo').val(result[n].LPO);
        }
        if ($('#txtnotes').val() != '') {
            $('#panel1').show();
        }
        if ($('#rate').val() == 1 || $('#fcamount').val() <= 0) {
            $("#fc").css("opacity", '0');
            $('#gndtotal').text(result[n].GrandTotal.toFixed(Decimal));
        }
        else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
            $("#fc").css("opacity", '100');
            $('#gndtotal').text('FC : ' + result[n].GrandTotal.toFixed(Decimal));
        }

        var id = parseInt(n + 1)
        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >" +
            id + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_1' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='productId_" + id + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            result[n].ItemCode + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].ItemDescription + "'></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
            + result[n].JobNo + "'><input type='hidden' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].JobCode + "'><input type='text' id='imei_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].IMEI + "'><td id='col_3' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
             UnitSelect + "</select></td><td id='col_4' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            result[n].Quantity + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            result[n].Rate.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_6' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            result[n].Discount.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_7' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
            result[n].TaxableAmount.toFixed(Decimal) + "' disabled></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
            TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" + result[n].TaxRate + "></td><td id='col_9' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
            result[n].TaxAmount.toFixed(Decimal) + "'></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
            result[n].TotalAmount.toFixed(Decimal) + "'></td><td id='col_2' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
             LocationSelect + "</select></td></td></tr>";

        $('#tblpurchaseinvoice').append(ProdEditRow);
        $('#tax_' + id).val(result[n].TaxId);
        $('#unit_' + id).val(result[n].UnitId);
        $('#locn_' + id).val(result[n].LocationId);
        TaxSplit(id)
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    i = result.length + 1;

}





//Next and Previous of Current Invoice No Copy Function 

function GetBillPrevousornext(Value) {
    // $('#tour1').fadeOut();
    $('#Warningpopup').fadeOut();
    var PRNo = parseInt($('#purchaseinvoiceno1').val() || 0);

    PRNo = PRNo + Value;
    if ((PRNo <= 0) || (PRNo >= NextInvoiceNo)) {
        warningshow('Return Number Not Valid', 'copypurchaseinvo');
        return false;
    }
    else {
        $('#purchaseinvoiceno1').val(PRNo);
        var data = {};
        data.PRNo = $('#purchaseinvoiceno1').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseReturnGetandGets",
            data: data,
            success: function (result) {
                formrefresh(1);
                PurchaseReturnGets(result.oList);
                $('#btnnew').focus();
                $('.form-control').prop('disabled', true);
                $('#copypurchaseinvo').prop("disabled", false);
                $('.jsgrid-button').prop('disabled', true);
                $('#btnsubmit').prop("disabled", true);
                $('#btnlist').prop("disabled", true);
                $('#btnadd').prop("disabled", true);
                $('#btncrncysave').prop("disabled", true);
                $('#btnaddcost').prop("disabled", true);

            }
        });
    }
}



//Popup Show Function 

function Addpopupwindow(Id) {
    if (Id != 5 && Id != 6 && Id != 7) {
        $("#popupdiv").css("margin-top", '0px');
        $('#currencydiv').hide(); $('#areadiv').hide();
        $('#locationdiv').hide(); $('#salesmandiv').hide();
        $('#termsdiv').hide(); $('#popupdiv').show();
    }
    if (Id == 1) {                                                  //For Terms Popup
        $('#myheader').text('Terms');
        $('#termsdiv').show();
        $('#txtdesc').focus();
    }
    else if (Id == 2) {                                             //For Location Popup
        $('#myheader').text('Location');
        $('#locationdiv').show();
        $('#LocationCode').focus();
    }
    else if (Id == 3) {                                             //For Area Popup
        GetAreaGroupselect(0);
        $('#myheader').text('Area');
        $('#areadiv').show();
        $('#txtcode').focus();
    }
    else if (Id == 4) {                                             //For Currency Popup
        $('#myheader').text('Currency');
        $('#currencydiv').show();
        $('#txt_code').focus();

    }

}

//For Purchase Transaction Popup

function Addpopupproduct(result) {
    $("#PurchaseTransactionPopup").css("margin-top", '0px');
    $('#PurchaseTransactionPopup').show();
    $('#PurchaseTransactionheader').text('Last Purchase Transactions');
    $('#purchasetransdiv').show();

    for (var p = 0; p < result.length; p++) {

        var ProdRow = "<tr><td >'" + result[p].InvoNo + "'</td><td >'" + result[p].InvoDate + "'</td><td >'" + result[p].SupplierName + "'</td><td >'" + result[p].Quantity + "'</td><td >'" + result[p].Rate + "'</td></tr>";

        $('#tblpurchasetrans').append(ProdRow);

    }

}

//For Save Currency Function

function SaveCurrency(Flag) {
    var rate = parseFloat($('#txt_rate').val()).toFixed(Decimal)
    rate = isNaN(rate) ? 0 : rate;
    if ($('#txt_code').val() == "") {
        warningshow('Please Enter Code', 'txt_code');
    }
    else if ($('#txt_cname').val() == "") {
        warningshow('Please Enter Name', 'txt_cname');
    }
    else if (rate == 0) {
        warningshow('Please Enter Rate', 'txt_rate');
    }
    else {
        var data = {};   //array
        data.Id = $('#CrncyId').val();
        data.CurrencyCode = $('#txt_code').val();
        data.CurrencyName = $('#txt_cname').val();
        data.CurrencyRate = rate;
        data.Remarks = $('#txt_remark').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/CurrencyInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].Id;
                    Showalertsthis(status);
                    GetCurrency(id);
                    $('#rate').val(data.CurrencyRate);
                }
            }

        });

    }
}

//For Save Area Function

function SavePlace(Flag) {
    if ($('#txtcode').val() == "") {
        warningshow('Please Enter Code', 'txtcode');
    }
    else if ($('#txtname').val() == "") {
        warningshow('Please Enter Name', 'txtname');
    }
    else if ($('#select_areagroup').val() == "0") {
        warningshow('Please Select Group', 'select_areagroup');
    }
    else {
        var data = {};   //array
        data.AreaId = $('#AreaId').val();;
        data.AreaName = $('#txtname').val();
        data.AreaGrpId = $('#select_areagroup').val();
        data.AreaCode = $('#txtcode').val();
        data.Description = $('#txtdescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/AreaInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].AreaId;
                    Showalertsthis(status);
                    GetArea(id);
                }
            }
        });

    }


}

//For Save Location Function

function SaveLocation(Flag) {
    if ($('#LocationCode').val() == "") {
        warningshow('Please Enter Code', 'LocationCode');
    }
    else if ($('#LocationName').val() == "") {
        warningshow('Please Enter Name', 'LocationName');
    }
    else {
        var data = {};   //array
        data.LocationId = $('#LocationId').val();;
        data.LocationName = $('#LocationName').val();
        data.LocationCode = $('#LocationCode').val();
        data.LocationDescription = $('#LocationDescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/LocationInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].LocationId;
                    Showalertsthis(status);
                    GetLocation(id);
                }
            }
        });

    }


}

//For Save Terms Function

function SaveTerms(Flag) {
    if ($('#txtdesc').val() == "") {
        warningshow('Please Enter Description', 'txtdesc');
    }
    else if ($('#txtterms').val() == "") {
        warningshow('Please Enter Terms', 'txtterms');
    }
    else {
        var data = {};   //array
        data.TermsId = $('#TermsId').val();;
        data.Terms = $('#txtterms').val();
        data.TermsDescription = $('#txtdesc').val();
        data.DelFlag = Flag;

        $.ajax({
            type: "POST",
            url: "../Master/TermsInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].TermsId;
                    Showalertsthis(status);
                    Terms(id);
                    var tms = data.Terms;
                    getdate(tms);
                }
            }
        });

    }


}

//For Popup Refresh(Add New Popups)

function popuprefresh() {
    $('#popupdiv').hide();
    $('#txt_code').val('');
    $('#txt_cname').val('');
    $('#txt_rate').val('');
    $('#txt_remark').val('');
    $('#txt_code').focus();
    $('#CrncyId').val(0);

    $('#txtname').val('');
    $('#select_areagroup').val('0');
    $('#txtcode').val('');
    $('#txtdescription').val('');
    $('#txtcode').focus();
    $('#AreaId').val(0);

    $('#LocationName').val('');
    $('#LocationCode').val('');
    $('#LocationDescription').val('');
    $('#LocationCode').focus();
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
    $('#txtdesc').focus();
    $('#TermsId').val(0);
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
                url: "../Purchase/PurchaseInvoiceRecall",
                data: data,
                success: function (result) {
                    ShowPISupplierList(result.oList);

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
            url: "../Purchase/PurchaseInvoiceRecall",
            data: data,
            success: function (result) {
                ShowPISupplierList(result.oList);

            }
        });

    } else if (Flag == 0) {

        $('#InvoiceFromDate').val(CurDate);
        $('#InvoiceToDate').val(CurDate);

        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseInvoiceRecall",
            data: data,
            success: function (result) {
                ShowPISupplierList(result.oList);

            }
        });

    }
}

function SearchInvoiceSub(Flag) {
    if (Flag == 1) {
        if ($('#ProductPopUp1Id').val() != 0) {
            var data = {};
            data.PINumber = PINumber;
            data.ItemId = $('#ProductPopUp1Id').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseInvoiceProductRecall",
                data: data,
                success: function (result) {
                    if (PINumber != 0)
                        ShowItemGetInvoice(result.oList);

                }
            });
        }
        else {
            warningshow('Please Enter Valid Product', 'ProductPopUp1');

        }
    } else if (Flag == 0) {

        $('#ProductPopUp1Id').val(0);
        $('#ProductPopUp1').val('');

        var data = {};
        data.PINumber = PINumber;
        data.ItemId = 0;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseInvoiceProductRecall",
            data: data,
            success: function (result) {
                if (PINumber != 0)
                    ShowItemGetInvoice(result.oList);

            }
        });


    }
}


function BackInvoice() {

    $('#ProductPopUp1Id').val(0);
    $('#ProductPopUp1').val('');
    $('#myModalLabel17').text('Purchase Invoice');
    $('#add').hide();
    $('#View').show();
}

function ShowPISupplierList(result) {
    disable_datatable('tbl_POList');
    $('#RowGet').val = '';
    $('#myModalLabel17').text('Purchase Invoice');
    $('#add').hide();
    $('#View').show();
    $('#iconForm').show();

    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' checked id= 'SlNoHeadInvoice' 'custom-control-input cz-bg-image-display' onchange='SelectAllInvoiceSup()'>&nbsp;&nbsp;&nbsp;Select</th><th>Serial No</th><th>Invoice No</th><th>Invoice Date</th><th>Supplier</th><th>Currency</th><th>Purchase Type</th><th>Remarks</th></tr>" +
        "<tr><th> </th><th>SerialNo</th><th>InvoiceNo</th><th>Date</th><th>Supplier</th><th>Currency</th><th>PurchaseType</th><th>Remarks</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {

        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;" ><input type="checkbox"  checked  id=' + 'SlNoInvoiceCheck' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td>' +
           '<td id=' + 'Sl' + slno + '>' + result[l].SlNo + '<input type="hidden" id="SlNo' + slno + '" value= ' + result[l].SlNo + '></td>' +
           '<td>' + result[l].InvoNo + '</td>' +
           '<td>' + result[l].InvoDate + '</td>' +
           '<td>' + result[l].SupplierName + '</td>' +
           '<td>' + result[l].CurrencyName + '<input type="hidden" id="Curr2' + slno + '" value=' + result[l].CurrencyId + '></td>' +
           '<td>' + result[l].PurchaseType + '</td>' +
           '<td>' + result[l].Remarks + '</td>' +
           '</tr>';
    }
    $('#tbl_POList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_POList', 'Multiple');

    $('#RowGet').val(result.length)
    $('#btnview').focus();

}

function SelectAllInvoiceSup() {

    var rowCount = $('#RowGet').val();
    var flag = $("#SlNoHeadInvoice").is(":checked")

    for (var i = 1; i <= rowCount + 1; i++) {
        if (document.getElementById("SlNoInvoiceCheck" + i) != null) {
            document.getElementById("SlNoInvoiceCheck" + i).checked = flag;
        }
    }

}

function ViewInvoiceWithSupplier() {

    var table = $("#tbl_POList").DataTable();
    for (var h = 1; h <= 7; h++) {
        table.column(h).search('').draw();
    }

    PINumber = '';
    var row = $('#RowGet').val();
    var CurrencyFlag = 0;


    for (var n = 1; n <= row; n++) {
        if ($("#SlNoInvoiceCheck" + n).is(":checked")) {
            CurrentCurrency = $('#Curr2' + n).val();
            break;
        }
    }

    for (var d = 1; d <= row; d++) {
        if ($("#SlNoInvoiceCheck" + d).is(":checked")) {
            if ($('#Curr2' + d).val() != CurrentCurrency) {
                CurrencyFlag = 1;
                break;
            }
            else
                continue;
        }
    }

    if (CurrencyFlag == 1) {
        warningshow('Select PI with Same Currency');
    }
    else {
        for (m = 1; m <= row; m++) {
            if ($("#SlNoInvoiceCheck" + m).is(":checked")) {

                if (PINumber == '') {
                    PINumber += $('#SlNo' + m).val();

                }
                else {
                    PINumber += ',' + $('#SlNo' + m).val();
                }

            }
        }
        if (PINumber != '') {
            var data = {};
            data.PINumber = PINumber;
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseInvoiceProductRecall",
                data: data,
                success: function (result) {
                    if (PINumber != 0)
                        ShowItemGetInvoice(result.oList);

                }
            });
        }
    }

}



function ShowItemGetInvoice(result) {
    disable_datatable('tbl_PO_ListItem');
    $('#myModalLabel17').text('Invoice Item List');
    $('#View').hide();
    $('#add').show();
    $('#iconForm').show();

    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadInvoiceItem' onchange='SelectAllInvoiceItem()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;Select</th><th>Serial No.</th><th>Invoice No.</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th><th>Amount</th></tr>" +
        "<tr><th> </th><th>SerialNo</th><th>InvoiceNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr><td style="width:90px;"><input type="checkbox"  checked  id= ' + 'SlNoCheckInvoiceItem' + slno + ' ><td id=' + 'STNoRow' + slno + '>' +
            result[l].SlNo + '</td><td >' +
            result[l].InvoNo + '<input type="hidden" id= ' + 'InvoiceMainId' + slno + ' value= ' +
            result[l].InvoNo + '><input type="hidden" id= ' + 'InvoiceSubId' + slno + ' value= ' +
            result[l].PurchaseInvoiceSubId + '></td><td id=' + 'Product' + slno + '>' +
            result[l].ItemCode + '<input type="hidden" id= ' + 'ProductIdgrid' + slno + ' value= ' +
            result[l].ItemId + '></td><td id=' + 'Des' + slno + '>' +
            result[l].ItemDescription + '<input type="text" style="display:none;" id= ' + 'locnid' + slno + ' value= ' +
            result[l].LocationId + '></td><td id=' + 'UnitName' + slno + '>' +
            result[l].UnitName + '<input type="text" style="display:none;" id= ' + 'UnitIdgrid' + slno + ' value= ' +
            result[l].UnitId + '></td><td id=' + 'qty' + slno + '>' +
            parseInt(result[l].Quantity) + '<input type="hidden" id="qty_' + slno + '" value=' +
            result[l].Quantity + '></td><td id=' + 'rate' + slno + '>' +
            parseFloat(result[l].Rate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' +
            result[l].Rate + '></td><td id=' + 'discount' + slno + '>' +
            parseFloat(result[l].FCDiscount).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' +
            result[l].FCDiscount + '><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' +
            result[l].TaxId + '><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' +
            result[l].TaxRate + '></td></td><td id=' + 'taxamt' + slno + '>' +
            parseFloat(result[l].FCTax).toFixed(Decimal) + '<input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' +
            result[l].FCTaxable + '><input type="hidden" id="taxamt_' + slno + '" value=' +
            result[l].FCTax + '></td><td id=' + 'total' + slno + '>' +
            parseFloat(result[l].TotalAmount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' +
            result[l].TotalAmount + '><input type="hidden" id="Currid1' + slno + '" value=' +
            result[l].CurrencyId + '><input type="hidden" id="curr_rate1' + slno + '" value=' +
            parseFloat(result[l].CurrencyRate) + '><input type="hidden" id="jobrowid' + slno + '" value=' +
            parseInt(result[l].JobNo) + '><input type="hidden" id="jobrowcode' + slno + '" value=' +
            result[l].JobCode + '></td></tr>';
    }
    $('#tbl_PO_ListItem').html(responseText + '</tbody>');
    datatableWithsearch('tbl_PO_ListItem', 'Multiple');

    $('#RowGet1').val(result.length)
    $('#btnaddtogrid').focus();
}



//selecting checkbox in PO Item List
function SelectAllInvoiceItem() {
    var rowCount = $('#RowGet1').val();
    var flag = $("#SlNoHeadInvoiceItem").is(":checked")
    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoCheckInvoiceItem" + i) != null) {
            document.getElementById("SlNoCheckInvoiceItem" + i).checked = flag;
        }
    }

}



function InvoiceProductAdd() {
    $('.distxtbox').val("0.00");
    $('.distxtbox').prop("disabled", true);
    var table = $("#tbl_PO_ListItem").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }
    i = 1;
    var row = $('#RowGet1').val();
    $("#tblpurchaseinvoice tr").remove();
    $('#iconForm').hide();
    for (m = 1; m <= row; m++) {
        if ($("#SlNoCheckInvoiceItem" + m).is(":checked")) {

            var productIdgrid = $('#ProductIdgrid' + m).val();
            var Product = $('#Product' + m).text();
            var Des = $('#Des' + m).text();
            var locnid = $('#locnid' + m).val();
            var unitIdgrid = $('#UnitIdgrid' + m).val();
            var unit = $('#UnitName' + m).text();
            var qty = parseInt($('#qty_' + m).val() || 0);
            var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
            var discount = parseFloat(0).toFixed(Decimal);
            var taxid = $('#taxid' + m).val();
            var taxrate = parseFloat($('#taxrate' + m).val() || 0);
            var taxableamt = parseFloat($('#taxableamt' + m).val() || 0).toFixed(Decimal);
            var taxamt = parseFloat($('#taxamt_' + m).val() || 0).toFixed(Decimal);
            var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
            var jobrowid = parseInt($('#jobrowid' + m).val());
            var jobrowcode = $('#jobrowcode' + m).val();

            $('#currency').val($('#Currid1' + m).val());
            $('#rate').val($('#curr_rate1' + m).val());

            var no = $('#tblpurchaseinvoice tr').length + 1;
            var id = parseInt(i);

            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >" +
                    no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='OrderId_" + id + "' value='0'><input type='hidden' id='OrderSubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='" +
                    productIdgrid + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                    Product + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                    + Des + "'></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
                    UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                    parseInt(qty) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                    parseFloat(rate).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                    parseFloat(discount).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
                    parseFloat(taxableamt).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
                    TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
                    taxrate + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
                    parseFloat(taxamt).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                    parseFloat(total).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='" + parseFloat($("#baseamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
                    LocationSelect + "</select></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
                    + jobrowid + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                    + jobrowcode + "'></td></tr>";

            $('#tblpurchaseinvoice').append(ProdEditRow);
            $('#unit_' + id).val(unitIdgrid);
            $('#locn_' + id).val(locnid);
            $('#tax_' + id).val(taxid);

            TaxSplit(id)
            i++;

        }

    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    i = parseInt($('#tblpurchaseinvoice tr').length) + 1;
    $('#PI').val(PINumber)
    CalcAmt();
    CurrentCurrency = 0;
    HidePO();

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
        swal('Purchase Return No-' + no + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh(0);
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh(0);
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();


    }
    else {
        swal('Purchase Return No-' + no + '', "Already Exists", "warning");
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
                { "width": "10%", "targets": 5 },
                { "width": "12%", "targets": 6 },
                { "width": "10%", "targets": 13 },
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


function LastPurchaseTransactions() {

    if ($('#select_status').prop("checked"))
        var s = 1;
    else
        var s = 0;

    $('#transid').val(0);
    if ($('#productId_0').val() != 0) {


        var data = {};   //array
        data.ItemId = $('#productId_0').val();
        data.DepartmentId = DepId;
        data.UserId = UId;
        data.Type = s;

        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseTransactionSearch",
            data: data,
            success: function (result) {

                Z = $('#transid').val();


                disable_datatable('tblpurchasetrans');

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency</th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                      "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency </th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";


                for (var p = 0; p < result.length; p++) {
                    Z = p + 1;
                    var a = (result[p].Rate + result[p].OtherCost).toFixed(Decimal);
                    var lpotr = '';
                    if (result[p].LPO != '0')
                        lpotr = result[p].LPO;

                    if (result[p].PurchaseType == 'Local' || SuppDetailsRight == 'Yes') {
                        ProdRow = ProdRow + "<tr id='pid_" + Z + "'>" +
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
                        ProdRow = ProdRow + "<tr id='pid_" + Z + "'>" +
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



                }
                console.log(ProdRow)
                $('#tblpurchasetrans').html(ProdRow + "</tbody>");

                $('#alltranscheckboxdiv').show();
                $('#alltranscheckboxdivsales,#alltranscheckboxdivPREV').hide();
                $('#productpdiv').hide();
                $('#productdiv').hide();
                $('#salestrans,#alltrans').hide();
                $("#PurchaseTransactionPopup").css("margin-top", '0px');
                $('#PurchaseTransactionPopup').show();
                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : Last Purchase Transactions');
                $('#purchasetrans').show();
                $('#transid').val(Z)
                ProductPopuprefresh();
                datatableWithsearch('tblpurchasetrans', 'MultiplePurchaseT');

            }
        });
    }
}


function LastSalesTransactions() {

    $('#alltranscheckboxdiv,#alltranscheckboxdivPREV').hide();
    $('#alltranscheckboxdivsales').show();

    X = $('#salestransid').val();
    //for (var j = 1; j <= X; j++) {
    //    $('#sid_' + j).remove();
    //}

    if ($('#select_status_sales').prop("checked"))
        var s = 1;
    else
        var s = 0;


    $('#salestransid').val(0);
    if ($('#productId_0').val() != 0) {
        var data = {};   //array
        data.ProductId = $('#productId_0').val();
        data.DeptId = DepId;
        data.UserId = UId;
        data.type = s;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesTransGetandGets",
            data: data,
            success: function (result) {

                $('#productpdiv').hide();
                $('#productdiv').hide();
                $('#purchasetrans,#alltrans').hide();
                $('#salestrans').hide();
                $("#PurchaseTransactionPopup").css("margin-top", '0px');
                $('#PurchaseTransactionPopup').show();
                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : Last Sales Transactions');
                $('#salestrans').show();
                SalesTransLoad(result);
            }
        });
    }

}

function SalesTransLoad(result) {
    //$('#tblsalestrans tr td').remove();

    disable_datatable('tblsalestrans');


    $('#salestransid').val(result.length)

    var ProdRow = "<thead><tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr>" +
                             "<tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr></thead><tbody>";


    for (var n = 0; n < result.length; n++) {

        ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                       "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
                       "<td class='text-left'>" + result[n].InvDate + "                                   </td>" +
                       "<td class='text-left'>" + result[n].CustName + "                                   </td>" +
                       //"<td style='width:15%' class='text-left'>" + result[n].CustAddress + "                                   </td>" +
                       "<td class='text-right'>" + result[n].ProdQty + "                                   </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
                       "<td class='text-left'>" + result[n].Location + " </td>" +
                       "<td class='text-left'>" + result[n].SalesMan + " </td>" +
                       //"<td style='width:15%'>" + result.oList[n].ProductDescr + " </td>" +
                       //"<td class='text-right'>" + parseFloat(result[n].Amount || 0).toFixed(Decimal) + " </td>" +
                       //"<td style='width:7%' class='text-left'>" + result[n].LPONumber + "                                   </td>" +
                       "<td class='text-left'>" + result[n].DepartmentName + "                                   </td>" +
                        "</tr>";



    }
    $('#tblsalestrans').html(ProdRow + "</tbody>");

    datatableWithsearch('tblsalestrans', 'MultipleSalesT');
}




function lastalltrans() {
    if ($('#productId_0').val() != 0) {
        $('#alltranscheckboxdiv,#alltranscheckboxdivsales').hide();
        $('#alltranscheckboxdivPREV').show();

        disable_datatable('tblalltrans');
        $('#tblalltrans tr').remove();
        $('#productpdiv').hide();
        $('#productdiv').hide();
        $('#purchasetrans,#salestrans').hide();
        $("#PurchaseTransactionPopup").css("margin-top", '0px');
        $('#PurchaseTransactionPopup').show();
        $('#alltrans').show();
        ALLTransactionPopup($('#productId_0').val());
    }
}

function ALLTransactionPopup(ItemId) {

    if ($('#select_status_PREV').prop("checked"))
        var s = 1;
    else
        var s = 0;

    var data = {};
    data.ItemId = ItemId;
    data.UserId = UId;
    data.DepartmentId = ERPDeptId;
    data.Type = s;
    $.ajax({
        type: "POST",
        url: "../Purchase/TransactionSearch",
        data: data,
        success: function (result) {
            if (result.length > 0) {
                disable_datatable('tblalltrans');


                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : All Transactions');


                $('#alltransdiv').show();
                var BalQty = parseInt(result[0].OpeningQty);


                var responseText = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr>" +
                              "<tr><th>Bill Number</th><th> Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr></thead><tbody>";


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
                   "<td >" + result[n].TransType + " </td>" +
                   "<td >" + result[n].Salesman + " </td>" +
                   "<td >" + result[n].Status + "  </td>" +
                   "<td >" + result[n].AccountName + " </td>" +
                   "<td >" + result[n].Remarks + "  </td>" +
                   "<td class='text-right'>" + result[n].Quantity + " </td>" +
                   "<td class='text-right'>" + BalQty + "  </td>" +
                   "<td class='text-right'>" + parseFloat(result[n].Cost || 0).toFixed(Decimal) + "   </td>" +
                   "<td class='text-right'>" + parseFloat(result[n].TransPrice || 0).toFixed(Decimal) + " </td>" +
                   "<td >" + result[n].Locnname + " </td>" +
                   "<td >" + result[n].DeptName + "  </td>" +
                   "<td >" + result[n].JobCode + " </td>" + "</tr>";

                }

                $('#tblalltrans').html(responseText + '</tbody>');
                datatableWithsearch('tblalltrans', 'MultipleAllTransaction');

                $('#alltransdiv').scrollTop(0);
            }
            else {
                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : All Transactions');
                disable_datatable('tblalltrans');
                $('#tblalltrans tr').remove();
                var responseText = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr>" +
                                "<tr><th>Bill Number</th><th> Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr></thead><tbody>";
                $('#tblalltrans').html(responseText + '</tbody>');
                datatableWithsearch('tblalltrans', 'Multiple');

            }
        }

    });
}