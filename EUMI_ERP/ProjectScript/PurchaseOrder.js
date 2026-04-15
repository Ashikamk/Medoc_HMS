//Global Variable Declaration
var i = 1; var ProductFlag = 0; var CopyFlag = 0; var FlagEdit = 0; var locn = ''; var unit = ''; var quantity = ''; var rate = ''; var disc = ''; var tax = ''; var taxper = ''; var ULocId = UserLocationId;
var Decimal = Decimal; var DepId = ERPDeptId; var UId = ERPUserId; var NextOrderNo = 0; var CurrentCurrency = 0; var PENo = ''; var Z = 0; var jobrowid = ''; var jobrowcode = 0; var PONumber = ''; var boqqty = 0; var boqrate = 0;
var ProdIdArray = [];
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


    if (e.altKey && e.keyCode == 83) {                      //Alt+S     :   Save
        if (CopyFlag == 0) {
            $("#btnsubmit").click();
        }
        else {
            warningshow('Create New Order To Save');
        }
    }
    else if (e.altKey && e.keyCode == 67) {                 //Alt+L     :   Copy
        if (CopyFlag == 0) {
            GetRows();
        }
    }
    else if (e.altKey && e.keyCode == 78) {                 //Alt+C     :   New
        createnew();
    }
    else if (e.keyCode == 27) {                             //ESC       :   Close Popup

        popuprefresh();
        CloseOtherDetails();
        ProductPopuprefresh();
        ClosePurTransPopup();
        CloseEnquiry();
        $('#barcodeprint').hide();
        $('#barcodeprintsection').hide();
        $('#purchaseViewForm').hide();
    }
    else if (e.altKey && e.keyCode == 51) {             //Alt+3     :   Last Purchase details Popup       
        //LastPurchaseTransactions();
    }

    else if (e.altKey && e.keyCode == 49) {             //Alt+1     :   Last Sales details Popup       
        //LastSalesTransactions();
    }
    else if (e.altKey && e.keyCode == 52) {         //Alt+4    :   All Transaction details Popup      
        //lastalltrans();
    }

});







//Popup Refresh for Defaulit Popup

function ProductPopuprefresh() {
    $('#productpdiv').hide();
    $('#prodheader').text('');
    $('#productdiv').hide();
    $("#tblproductdetails tr").remove();
}


//For Close Purchase Transaction Popup

function ClosePurTransPopup() {
    $('#PurchaseTransactionPopup').hide();
    $('#purchasetrans').hide();
    for (var j = 1; j <= Z; j++) {
        $('#pid_' + j).remove();
    }

}

//Product Default Popup

function CustPrdctLoad(result) {


    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "LSP";
        }
        else {
            custstat = "LSP";
        }
        $('#productpdiv,#Infospopup').slideDown();

        //$("#qrt").animate({
        //    left: '50%',
        //    visible: 'show',

        //});

        $('#prodheader').text('Location Stock Details');
        $('#productdiv').show();

        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");

        //var ProdRow ="<tr class='jsgrid-row' id='pdctrow'>" +
        //    "<td style='border:none;font-weight:500'><b>C :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " style='height:30px;background-color:white;border:none'></td>" +
        //    "<td style='border:none;font-weight:500'><b>LP :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " style='background-color:white;height:30px;border:none'></td>" +
        //    "<td style='border:none;font-weight:500'><b>" + custstat + " :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "  style='background-color:white;height:30px;border:none'></td>" +
        //    "<td style='border:none;font-weight:500'><b>Stock :</b> <input type='text' disabled='' class='text-center' value=" + (result[n].Sumtotqty || 0) + " style='background-color:white;height:30px;border:none'></td>" + "</tr>" +
        //    "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";


        var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
           "<td style='border:none;font-weight:500;color:yellow' class='text-left'><b>" + $("#productdesc_0").val() + "</b></td>" +
           "<td style='border:none;font-weight:500' class='text-left'><table width='100%'><tr><td style='border:none;font-weight:500' class='text-left'><b>C : </b>" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>LP : </b>" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>" + custstat + " : </b>" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>Stock : </b>" + (result[n].Sumtotqty || 0) + "</td>" + "</tr></table></td></tr>" +
           "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";



        $('#tblproductdetails').append(ProdRow);
        $('#tbllocqty').attr('border', '1');
        $('#tbllocqty').attr('bordercolor', 'white');

    }

}


//Document Ready Function

$(document).ready(function () {
    if (usermenu1.indexOf("M292") != -1) { $("#URight").val("YES"); } else { $("#URight").val("NO"); }

    if ((usermenu1.indexOf("M224") != -1)) {
        $("#upload").show();
        $("#fileUpload").show();
    }

    //Page Load Functions
    Serialnoload();
    GetCurrency(0);
    GetLocation(0);
    GetUnit();
    GetTax();
    Terms(0);
    //Defaultfocus();
    LoadProduct();
 

    $("#btnokalert").focus(function (e) {
        $("#btnokalert").removeClass("btn btn-outline-primary");
        $("#btnokalert").addClass("btn btn-primary");
    });

    $("#location").change(function (e) {
        $('#locn_0').val($('#location').val());
        var selectedValue = $(this).val();
    });

    $("#currency").change(function () {
        var selectedValue = $(this).val();
        $("#rate").val($(this).find("option:selected").attr("name"))
        CalcAmt();
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
    $("#suppliername").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#supplierId').val() != 0) {
                e.preventDefault();
                $('#location').focus();
            }
            else {
                warningshow('Select Valid Supplier', 'suppliername');
                return false;
            }
        }
      else{
            $('#supplierId').val(0);
            $('#shipadd').val('')
        }

    });
    $('#EnqSupplier').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 08 || key == 46) {
            $('#EnqSupplierId').val(0);
        }
    });
    $('#RecallSupplier').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 08 || key == 46) {
            $('#RecallSupplierId').val(0);
        }
    });
    $("#location").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#jobcode').focus();
        }       
    });

    $("#jobcode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#jobid').val() != 0) {
                e.preventDefault();
                $('#transfer').focus();
            }
            else if ($('#jobid').val() == 0 && $("#jobcode").val() == '') {
                e.preventDefault();
                $('#transfer').focus();
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

    $("#Orderdate,#transfer").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#terms').focus();
        }
    });
    $("#terms").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#expdate').focus();
        }
    });
    $("#expdate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#currency').focus();
        }
    });
    $("#currency").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#rate').focus();
        }
    });
    $("#rate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#docref').focus();
        }
    });
    $("#docref").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#product_0').focus();
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
    $("#ProductPopUp1").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 08 || key == 46) {
            $('#ProductPopUp1Id').val(0);
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
            $('#quantity_0').select();

        }

    });
    $("#quantity_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtrate_0').focus();
            $('#txtrate_0').select();

        }

    });
    $("#txtrate_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#discount_0').focus();
            $('#discount_0').select();

        }

    });
    $("#discount_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#tax_0').focus();

        }

    });
    $("#tax_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();

        }

    });


    $('#LocationCode,#LocationName,#txt_code,#txt_cname,#txt_rate,#txtdesc,#shipvia,#MOTransfer,#POE,#FinalDesti').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });

    $('#LocationDescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnlocnsave").focus();
        }

    });
    $('#txt_remark').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btncrncysave").focus();
        }

    });
    $('#txtterms').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btntermssave").focus();
        }

    });
    $('#Remarks').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnaddotherdetails").focus();
        }

    });

    //Display Item data list based on PE NO in 2nd Popup

    $("#btnview").click(function (e) {
        
        var table = $("#tblEnquirysup").DataTable();
        for (var h = 1; h <= 5; h++) {
            table.column(h).search('').draw();
        }

        PENo = '';
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
            warningshow('Select PE with Same Curency');
        }
        else {

            for (m = 1; m <= row; m++) {
                if ($("#SlNoCheck" + m).is(":checked")) {

                    if (PENo == '') {
                        PENo += $('#EnquiryNo' + m).val();

                    }
                    else {
                        PENo += ',' + $('#EnquiryNo' + m).val();

                    }

                }
            }
            var data = {};
            data.PENumber = PENo;
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseEntryGetProductforPO",
                data: data,
                success: function (result) {
                    if (PENo != 0)
                        ShowItemGet(result.oList);

                }
            });
        }

    });

  //Adding datas in grid in main form from PO list
    $("#btnprdtadd").click(function (e) {

        var table = $("#tblEnquirypsub").DataTable();
        for (var h = 1; h <= 9; h++) {
            table.column(h).search('').draw();

        }
        i = 1;
        var P = [];
        var PO = [];
        var row = $('#RowGet1').val();
        $("#tblPurchase_Order tr").remove();
        GetCurrency(CurrentCurrency)
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckgrid" + m).is(":checked")) {
                var productIdgrid = $('#ProductIdgrid' + m).val();
                var Product = $('#Product' + m).text();
                var Des = $('#Des' + m).text();
                var locnid = $('#locnid' + m).val();
                var unitIdgrid = $('#UnitIdgrid' + m).val();
                var unit = $('#UnitName' + m).text();               
                var qty = parseInt($('#qty_' + m).val()||0);
                var rate = parseFloat($('#rte_' + m).val()||0).toFixed(Decimal);
                var discount = parseFloat( $('#dis_' + m).val()||0).toFixed(Decimal);
                var taxid = $('#taxid' + m).val();
                var taxrate = parseFloat($('#taxrate' + m).val()||0).toFixed(Decimal);
                var taxableamt = parseFloat($('#taxableamt' + m).val()||0).toFixed(Decimal) ;
                var taxamt = parseFloat($('#taxamt_' + m).val()||0).toFixed(Decimal);
                var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
                var Entryid = $('#Enquiryno' + m).val();
                var PESlno = $('#EnquirySub' + m).val();


                var MainJobId = $('#enqmainjobid_' + m).val();
                var MainJobCode = $('#enqmainjobcode_' + m).val();
                var SubJobId = $('#enqsubjobid_' + m).val();
                var SubJobCode = $('#enqsubjobcode_' + m).val();

                $('#jobid').val(MainJobId);
                $('#jobcode').val(MainJobCode);
               

                P[m] = Entryid;
                P.forEach(function (value) {
                    if (PO.indexOf(value) == -1) PO.push(value);
                });

                var no = $('#tblPurchase_Order tr').length + 1;
                var slno = parseInt(i);

                var ProdEditRow = "<tr class='jsgrid-row' id='row_" + slno + "'><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + slno + ")'></td><td id='td_" + slno + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                    + no + "<input type='hidden' id='sl_" + slno + "' value=" + slno + "></td>" +
                    "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='EnquiryId_" + slno + "' value='" + Entryid + "'><input type='hidden' id='EnquirySubId_" + slno + "' value='" + PESlno + "'><input type='hidden' id='productId_" + slno + "' value='"
                    + productIdgrid + "'><input type='text' id='product_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                    + Product + "'></td>" +
                    "<td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' id='productdesc_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                    + Des + "'></td>" +
                    "<td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' >"
                    + LocationSelect + "</select></td>" +
                    "<td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + slno + "' onchange='CheckFOC(" + slno + ",this)' class='form-control' disabled style='height:30px;background-color:white' >"
                    + UnitSelect + "</select><input type='hidden' id='txtunit_" + slno + "' class='form-control' /></td>" +
                    "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                    + qty + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumberInt(event,this)' ></td>" +
                    "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + slno + "' class='form-control CheckRateZero' disabled style='height:30px;background-color:white'  value='"
                    + rate + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + slno + "' class='form-control' value='' ></td>" +
                    "<td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + slno + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
                    + discount + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumber(event,this)'></td>" +
                    "<td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + slno + "' class='form-control' style='height:30px;background-color:white'  value='"
                    + taxableamt + "' disabled></td>" +
                    "<td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + slno + "' onchange='ChangeTax(" + slno + ",this)' >"
                    + TaxSelect + "</select><input type='hidden' id='taxpercentage_" + slno + "' value="
                    + taxrate + "></td>" +
                    "<td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + slno + "' class='form-control' style='height:30px;background-color:white' disabled value='"
                    + taxamt + "'></td>" +
                    "<td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + slno + "' value=''><input type='text' id='amount_" + slno + "' class='form-control' style='height:30px;background-color:white'  disabled value='"
                    + total + "'><input type='hidden' id='baseamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + slno + "' class='form-control'   disabled value=''></td>" +
                    "<td id='col_12' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + slno + "' value='" +
                    SubJobId + "'><input type='text' id='jobcode_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                    SubJobCode + "'></td></tr>";

                $('#tblPurchase_Order').append(ProdEditRow); 
                $('#unit_' + slno).val(unitIdgrid);
                $('#locn_' + slno).val(locnid);
                $('#tax_' + slno).val(taxid);
                i++;                              

            }

        }
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        i = parseInt($('#tblPurchase_Order tr').length) + 1;
        CalcAmt();

        $('#PENo').val(PO)

        CurrentCurrency = 0;
        CloseEnquiry();
    });

});

function SavePO()
{
   
        var RateFlag = 0;
        $(".CheckRateZero").each(function () {
            var a = parseFloat($(this).val()).toFixed(Decimal);
            if (a == 0) {
                RateFlag = 1;
                return false;
            }

        });
        var r = parseFloat($('#rate').val());
        $("#rate").val(isNaN(r) ? 0 : r);

        if ($('#supplierId').val() == 0) {
            warningshow('Please Select Supplier', 'suppliername');
        }
        else if ($('#Orderdate').val() == '') {
            warningshow('Please Select Order Date', 'Orderdate');
        }
        else if ($('#terms').val() == 0) {
            warningshow('Please Select Terms', 'terms');
        }
        else if ($('#expdate').val() == '') {
            warningshow('Please Select Ship Date', 'expdate');
        }
        else if ($.trim($('#rate').val()) == '' || $.trim($('#rate').val()) == 0) {
            $('#rate').select();
            warningshow('Enter Currency Rate', 'rate');
        }
            //else if ($('#location').val() == 0) {
            //    warningshow('Please Select Location', 'location');
            //}
        else if ($('#jobid').val() == 0 && $('#jobcode').val() != '') {
            warningshow('Please Select Valid Job', 'jobcode');
        }
        else if ($('#product_0').val() != '') {
            warningshow('Product is not Added in Grid', 'product_0');
        }
        else if (FlagEdit != 0) {
            warningshow('In Edit Mode-Please Update');
        }
        else if (RateFlag == 1) {
            warningshow('Rate Must Be Greater Than Zero for all Items');
        }
        else if (parseFloat($("#GrandTotal").val() || 0) > parseFloat($("#EstAmount").val() || 0) && $("#EstConfirmFlag").val() != "YES" && $("#jobid").val() != 0) {

            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('EstAmountSave'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Greater Than Estimated Amount!.. Do You Want To Continue?')

        }
        else
        {
            PurchaseSaveorNotPopup();

        }
    }
        function PurchaseSaveorNotPopup() {
            $('#Confirmflag').val('save'), $('#ConfirmRowId').val(0)
            $('#confirmmessage').text('Do you want to Save the Purchase Order?')
            $('#confirm').show();
            $('#confirmOk').focus();
        }

                                                        //ajax code for insert and update to  controller
        function OKPurchaseOrder()
        {
            $('#btnsubmit').prop("disabled", true);
            $('#confirmOk').prop("disabled", true);
            var oArray = new Array();

            for (var k = 1; k < i; k++) {

                var OrderNo = $('#purchaseOrderno').val();
                var OrderDate = $('#Orderdate').val();
                var ExpectedDate = $('#expdate').val();
                var SupplierId = $('#supplierId').val();
                var LocnId = $('#location').val();
                var CurrencyId = $('#currency').val();
                var CurrencyRate = $('#rate').val();
                var Terms = $('#terms').val();
                var JobNo = $('#jobcodeid_' + k).val();
                var DocRef = $('#docref').val();
                var ShipTo = $('#shipadd').val();
                var Remarks = $('#Remarks').val();
                var ShipVia = $('#shipvia').val();
                var ModeOfTransfer = $('#MOTransfer').val();
                var PortOfEntry = $('#POE').val();
                var FinalDestination = $('#FinalDesti').val();
                var TotalDiscount = $('#fcdiscount').val();      //Base Currency          
                var FCDiscount = $('#totdisc').val();            //Foregin Currency
                var TotalTaxable = $('#fctaxable').val();        //Base Currency
                var TotalTax = $('#fctax').val();                //Base Currency               
                var GrandTotal = $('#fcamount').val();           //Base Currency                 
                var FCTaxable = $('#tottaxable').val();          //Foreign Currency
                var FCTax = $('#tottax').val();                  //Foreign Currency
                var FCGrandTotal = $('#GrandTotal').val();       //Foreign Currency
                var DepartmentId = DepId;
                var UserId = UId;
                var DeleteFlag = 1;


                var PurchaseOrderSubId = $('#PurchaseOrderSubId').val();
                var ItemId = $('#productId_' + k).val();
                var ItemCode = $('#product_' + k).val();
                var ItemDescription = $('#productdesc_' + k).val();
                var LocationId = $('#locn_' + k).val();
                var UnitId = $('#unit_' + k).val();
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
                var PENumber = $('#PENo').val();
                var EnquiryNo = $('#EnquiryId_' + k).val();
                var EnquirySubId = $('#EnquirySubId_' + k).val();

                var BillDiscount = 0;
                var BillDisc = 0;

                var MainJobNo = parseInt($("#jobid").val() || 0);
                var Variable1 = '';
                var Variable2 = '';

                if (!(typeof ItemCode == "undefined")) {

                    oArray.push({
                        'OrderNo': OrderNo,
                        'OrderDate': OrderDate,
                        'ExpectedDate': ExpectedDate,
                        'SupplierId': SupplierId,
                        'LocnId': LocnId,
                        'CurrencyId': CurrencyId,
                        'CurrencyRate': CurrencyRate,
                        'Terms': Terms,
                        'JobNo': JobNo,
                        'DocRef': DocRef,
                        'ShipTo': ShipTo,
                        'Remarks': Remarks,
                        'ShipVia': ShipVia,
                        'ModeOfTransfer': ModeOfTransfer,
                        'PortOfEntry': PortOfEntry,
                        'FinalDestination': FinalDestination,
                        'TotalDiscount': TotalDiscount,
                        'FCDiscount': FCDiscount,
                        'TotalTaxable': TotalTaxable,
                        'TotalTax': TotalTax,
                        'GrandTotal': GrandTotal,
                        'FCTaxable': FCTaxable,
                        'FCTax': FCTax,
                        'FCGrandTotal': FCGrandTotal,
                        'DepartmentId': DepartmentId,
                        'UserId': UserId,
                        'DeleteFlag': DeleteFlag,
                        'PurchaseOrderSubId': PurchaseOrderSubId,
                        'ItemId': ItemId,
                        'ItemCode': ItemCode,
                        'ItemDescription': ItemDescription,
                        'LocationId': LocationId,
                        'UnitId': UnitId,
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
                        'PENumber': PENumber,
                        'EnquiryNo': EnquiryNo,
                        'EnquirySubId': EnquirySubId,
                        'BillDiscount': BillDiscount,
                        'BillDisc': BillDisc,
                        'MainJobNo': MainJobNo,
                        'Variable1': Variable1,
                        'Variable2': Variable2
                    })
                }
            }

            if (oArray != "") {
                var data = { 'PurchaseOrder': oArray };
                $.ajax({
                    type: "POST",
                    url: "../Purchase/PurchaseOrderInsertandUpdate",
                    data: data,
                    success: function (result) {
                        for (var i = 0; i <= result.oList.length; i++) {
                            var status = result.oList[i].Status;
                            var no = result.oList[i].OrderNo;
                            $('#btnsubmit').prop("disabled", false);
                            Showalerts(status, no);
                        }
                    }
                });
            }
            else {
                warningshow('No Products Added', 'product_0');
                $('#btnsubmit').prop("disabled", false);
            }

        }

   

function checkproduct() {
    var a = ($('#product_0').val()).length;
    if ($('#ProductLength').val() != a) {
        $('#productId_0').val(0);
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

        $('#purchaseOrderno').val(result[0].PO_OrderNo);
        NextOrderNo = result[0].PO_OrderNo;
}

//Default Focus
function Defaultfocus() {
    $('#suppliername').focus();
}

//On Change of Tax

function ChangeTax(TId, selectObject) {
    var value = selectObject.value;
    $("#taxpercentage_" + TId).val($(selectObject).find("option:selected").attr("name"))
    CalcAmount(TId);

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
        $('#location,#locn_0').val(0);
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
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "'name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
    }
    $("#tax_0").append(TaxSelect);
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
    $("#currency").empty();
    var BaseCurrency = 0;
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
             BaseCurrency = result[i].BaseCurrencyId
        }
        $("#currency").append("<option value='" + result[i].Id + "'name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");
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

    }
}


//Product Add to Grid Function

function ProductAdd() {
    var Product = $("#product_0").val()
    var a = parseFloat($('#discount_0').val());
    var b = parseFloat($('#txtsubtotal_0').val());
    var c = parseFloat($('#txtrate_0').val());
    $("#discount_0").val(isNaN(a) ? 0 : a);
    $('#txtrate_0').val(isNaN(c) ? 0 : c);
    
    for (var p = 1; p <= i; p++) {
        if ($('#productId_' + p).val() == $('#productId_0').val()) {
            ProductFlag = 1;
            break;
        }
    }

    if ($.trim($('#product_0').val()) == "") {
        warningshow('Please Select Product', 'product_0');
        return false;
    }
    else if ($('#productId_0').val() == 0) {
        warningshow('Press Enter To Create New Product', 'addproductbtn');
        return false;
    }
        else if ((parseFloat($("#txtrate_0").val() || 0) > parseFloat($("#BOQAmt_0").val() || 0) || parseInt($("#quantity_0").val() || 0) > parseInt($("#boq_0").val() || 0)) && $('#BOQ').val() == 'YES' && $("#BOQConfirmFlag").val() != 'YES' && $("#jobcodeid_0").val() != 0) {
            CheckBOQ(0);
            return false;
        }
    //else if ($('#locn_0').val() == 0) {
    //    warningshow('Please Select Location', 'locn_0');
    //    return false;
    //}
    else if ($('#unit_0').val() == 0) {
        warningshow('Please Select Unit', 'unit_0');
        return false;
    }
    else if ($.trim($('#txtrate_0').val()) == '' || $.trim($('#txtrate_0').val()) == 0) {
        warningshow('Please Enter Rate', 'txtrate_0');
        $('#txtrate_0').select();
        return false;
    }
    else if ($.trim($('#quantity_0').val()) == '' || $.trim($('#quantity_0').val()) == 0) {
        warningshow('Please Enter Quantity', 'quantity_0');
        return false;
    }

    else if ($('#tax_0').val() == 0) {
        warningshow('Please Select Tax', 'tax_0');
        return false;
    }
    //else if ($('#discount_0').val() > 100) {
    //    warningshow('Discount Limit Exceeded', 'discount_0');
    //    $('#discount_0').select();
    //    return false;
    //}
    else if (a > b) {
        warningshow('Amount Cannot be Negative', 'discount_0');
        $('#discount_0').select();
        return false;
    }
    else if(parseFloat($('#amount_0').val())<=0){
        warningshow('Amount Must Be Greater Than Zero', 'txtrate_0');
        $('#txtrate_0').select();
        return false;
    }
    else if ($('#jobcodeid_0').val() == 0 && $('#jobcode_0').val() != '') {
        warningshow('Please Select Valid Job', 'jobcode_0');
    }
    else {
        ProductPopuprefresh();
        if (ProductFlag == 1) {
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                ClearProductRow();
                ProductFlag = 0;
                return false;
            }
        }
        $('#prodappdiv').empty();
        $('#prodappdiv').append("<input type='text' id='product_0' class='form-control editds' style='height:65%;margin-left:1px' onkeypress='LoadProduct()' ><div class='input-group-append'><button class='btn btn-outline-primary' id='addproductbtn' type='button' style='height:65%' onclick=window.open('../Master/ItemMaster')>+</button></div>");

        var no = $('#tblPurchase_Order tr').length + 1;
        var id = parseInt(i)
        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_"
            + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >" + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='EnquiryId_" + id + "' value='0'><input type='hidden' id='EnquirySubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='"
            + $("#productId_0").val() + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + Product + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#productdesc_0").val() + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >"
            + LocationSelect + "</select></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >"
            + UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + parseInt($("#quantity_0").val()) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
            + parseFloat($("#txtrate_0").val() || 0).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='"
            + parseFloat($("#baserate_0").val()).toFixed(Decimal) + "' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
            + parseFloat($("#discount_0").val() || 0).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='"
            + parseFloat($("#txttaxable_0").val()).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >"
            + TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" + $("#taxpercentage_0").val() + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='"
            + parseFloat($("#txttax_0").val()).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value='"
            + parseFloat($("#txtsubtotal_0").val()).toFixed(Decimal) + "'><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='"
            + parseFloat($("#amount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='"
            + parseFloat($("#baseamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value='"
            + parseFloat($("#basetaxableamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value='"
            + parseFloat($("#basetaxamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value='"
            + parseFloat($("#basediscount_0").val()).toFixed(Decimal) + "'></td><td id='col_12' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
            + $("#jobcodeid_0").val() + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#jobcode_0").val() + "'></td>" +
            "<input type='hidden' id='boq_" + id + "' value='" + parseInt($("#boq_0").val() || 0) + "' >" +
            "<input type='hidden' id='BOQAmt_" + id + "' value='" + parseFloat($("#BOQAmt_0").val() || 0).toFixed(Decimal) + "' />" +
            "</tr>";

        $('#tblPurchase_Order').append(ProdEditRow);
        $('#tax_' + id).val($('#tax_0').val());
        $('#unit_' + id).val($('#unit_0').val());
        $('#txtunit_' + id).val($('#txtunit_0').val());
        $('#locn_' + id).val($('#locn_0').val());

        ClearProductRow();
        i++;
        ProductFlag = 0;
        Product = '';
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        CalcGrandTotal(id)
    }
}
function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
}

function CheckBOQ(Row) {
    ProductPopuprefresh();

    var Allow = '';

    if ($("#URight").val() == 'YES') {
        ShowMRConfirm(0);
        var Allow = ' Continue?';
    }
    else {
        ShowMRConfirm(1);

    }

    $('#MRConfirmflag').val('ConfirmBOQ'); $('#MRConfirmRowId').val(Row);
    $('#MRconfirmmessage').text('Quantity or Price Is Greater Than BOQ!..' + Allow);
}

function ShowMRConfirm(Flag) {
    $('#confirm').hide();
    $('#MRconfirm').show();
    if (Flag == 1) {
        $('#MRconfirmOk').hide();
        $('#MRconfirmCancel').show();
        $('#MRconfirmCancel').focus();
    }
    else if (Flag == 2) {
        $('#MRconfirmCancel').hide();
        $('#MRconfirmOk').show();
        $('#MRconfirmOk').focus();
    }
    else {
        $('#MRconfirmCancel').show();
        $('#MRconfirmOk').show();
        $('#MRconfirmOk').focus();
    }


}


function MRConfirmboxResult(Result, status, rowid) {
    $('#confirm').hide();
    if (Result == 'true' && status == 'ConfirmBOQ') {
        CheckBOQConfirm(rowid, Result);
    }
    if (Result == 'false' && status == 'ConfirmBOQ' && rowid == 0) {
        $("#product_0").focus();
    }
    if (Result == 'false' && status == 'ConfirmBOQ' && rowid != 0) {
        CancelEdit(rowid);
    }
    else if (Result == 'true' && status == 'PROAL') {
        $("#produt_0").focus();
    }
    $("#EstConfirmFlag").val("NO");
    $('#MRconfirm').fadeOut();

}
function CheckBOQConfirm(Row) {
    $("#BOQConfirmFlag").val("YES");
    if (Row == 0) {
        ProductAdd();
    }
    else {
        UpdateRow(Row);
    }
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
        boqqty = $('#boq_' + RowId).val();
        boqrate = $('#BOQAmt_' + RowId).val();
        $('#edit_' + RowId).hide();
        $('#update_' + RowId).show();
        $('#locn_' + RowId).prop('disabled', false);
        $('#unit_' + RowId).prop('disabled', false);
        $('#quantity_' + RowId).prop('disabled', false);
        $('#txtrate_' + RowId).prop('disabled', false);
        $('#discount_' + RowId).prop('disabled', false);
        $('#jobcode_' + RowId).prop('disabled', false);
        $('#tax_' + RowId).prop('disabled', false);
        $('#locn_' + RowId).focus();
        CalcGrandTotal(i);
        Fnaddjobautocomplete(RowId)
    }
    else {
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
    $('#boq_' + RowId).val(boqqty);
    $('#BOQAmt_' + RowId).val(boqrate);
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
    $('#confirmmessage').text('Do you want Delete this record?')

}
function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'deletegridrow') {
        detl(rowid);
    }
    else if (Result == 'true' && status == 'save') {

        OKPurchaseOrder();
    }
    else if (Result == 'false' && status == 'save') {
        $("#EstConfirmFlag").val('NO')
    }
    else if (Result == 'true' && status == 'createnew') {
        $('.form-control').prop('disabled', false);
        $('.jsgrid-button').prop('disabled', false);
        formrefresh(0);
       
    }
    else if (Result == 'true' && status == 'copy') {
        NextOrderNo = parseInt($('#purchaseOrderno').val() || 0);
        $('#CopyOrderno').val(NextOrderNo)
        formrefresh(1);
        $('#CopyOrderNoDiv').show();
        $('#OrderNoDiv,#popupdiv,#OtherDetails,#Enquirypopup,#PurchaseTransactionPopup,#productpdiv').hide();

        //$('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#CopyOrderno').prop("disabled", false);
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnlist').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#clearbtn').prop("disabled", true);
        $('.butndis').prop("disabled", true);
        $('#btnsubmit,#btnlist').hide();
        $('#CopyOrderno').focus();
        $('#CopyOrderno').select();
        
    }
    else if (Result == 'false' && status == 'copy') {
        CopyFlag = 0;
    }
    else if (Result == 'true' && status == 'puchaseorderdelete') {
        EditInvoice(1);
    }
    else if (Result == 'true' && status == 'updatepurchaseorder') {
            OKUpdatePurchaseOrder(1);
    }
    else if (Result == 'true' && status == 'EstAmountSave') {
        $("#EstConfirmFlag").val("YES");
        SavePO();
        return;
    }
    else if (Result == 'true' && status == 'EstAmountCopy') {
        $("#EstConfirmFlag").val("YES");
        UpdatePurchaseOrder();
        return;
    }
    $('#confirm').fadeOut();

}
function detl(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    $('#row_' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#product_' + j).val() != undefined) {
            $('#td_' + j).text(slno);
            slno++;
        }
    }
    $('#product_0').focus();
    CalcGrandTotal(i);

}

//Update Grid Function

function UpdateRow(RowId) {

    var a = parseFloat($('#discount_' + RowId).val()).toFixed(Decimal);
    var b = parseFloat($('#txtsubtotal_' + RowId).val()).toFixed(Decimal);
    var c = parseFloat($('#txtrate_' + RowId).val()).toFixed(Decimal);
    $("#discount_" + RowId).val(isNaN(a) ? 0 : a);
    $('#txtrate_' + RowId).val(isNaN(c) ? 0 : c);

    //if ($('#locn_' + RowId).val() == 0) {
    //    warningshow('Press Select Location', '#locn_' + RowId);
    //    return false;
    //}
    //else
    if ($('#unit_' + RowId).val() == 0) {
        warningshow('Please Select Unit', 'unit_' + RowId);
        return false;
    }
    else if ($.trim($('#quantity_' + RowId).val()) == '' || $.trim($('#quantity_' + RowId).val()) == 0) {
        warningshow('Please Select Quantity', 'quantity_' + RowId);
        return false;
    }
    else if ($.trim($('#txtrate_' + RowId).val()) == '' || $.trim($('#txtrate_' + RowId).val()) == 0) {
        warningshow('Please Enter Rate', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
        return false;
    }
    else if ($('#tax_' + RowId).val() == 0) {
        warningshow('Please Select Tax', 'tax_' + RowId);
        return false;
    }
    //else if ($('#discount_' + RowId).val() > 100) {
    //    warningshow('Discount Limit Exceeded', 'discount_' + RowId);
    //    $('#discount_' + RowId).select();
    //    return false;
    //}
    else if (parseFloat(a) > parseFloat(b)) {
        warningshow('Amount Cannot be Negative', 'discount_' + RowId);
        $('#discount_' + RowId).select();
        return false;
    }
    else if (parseFloat($('#amount_'+RowId).val()) <= 0) {
        warningshow('Amount Must Be Greater Than Zero', 'txtrate_' + RowId);
        $('#txtrate_'+RowId).select();
        return false;
    }
    else if ($.trim($('#jobcode_' + RowId).val()) != '' && $('#jobcodeid_' + RowId).val()==0) {
        warningshow('Enter A Valid Job ', 'jobcode_' + RowId);
        return false;
    }
        else if (($('#productId_' + RowId).val() != 0) && (parseFloat($("#txtrate_" + RowId).val() || 0) > parseFloat($("#BOQAmt_" + RowId).val() || 0) || parseFloat($("#quantity_" + RowId).val() || 0) > parseFloat($("#boq_" + RowId).val() || 0)) && $('#BOQ').val() == 'YES' && $("#BOQConfirmFlag").val() != 'YES' && $("#jobcodeid_"+RowId).val() != 0) {
            CheckBOQ(RowId)
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
        var ratenum = parseFloat($("#txtrate_" + RowId).val() || 0);
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

        CalcGrandTotal(i);

        locn = ""; unit = ""; quantity = ""; rate = "";
        disc = ""; tax = ""; taxper = "";
        $("#BOQConfirmFlag").val('NO');
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
    rate = isNaN(rate) ? 0 : rate;
    var discount = parseFloat($('#discount_' + row).val() || 0).toFixed(Decimal);
    discount = isNaN(discount) ? 0 : discount;
    var taxpercentage = parseFloat($("#taxpercentage_" + row).val() || 0);
    var currencyrate = parseFloat($("#rate").val() || 0).toFixed(Decimal);

    var tamount = parseFloat(quantity * rate)
    var taxableamount = parseFloat(tamount - discount)
    var taxamount = parseFloat(taxableamount * (taxpercentage / 100));
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));;

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
    var FCrate = parseFloat($('#rate').val() || 0).toFixed(Decimal);
    FCrate = isNaN(FCrate) ? 0 : FCrate;
    var FCAmount = 0;
    var FCtotdisc = 0;
    var FCtottaxable = 0;
    var FCtottax = 0;
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


    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#totdisc').val(TotalDiscount.toFixed(Decimal));
    $('#tottaxable').val(TotalTaxable.toFixed(Decimal));
    $('#tottax').val(TotalTax.toFixed(Decimal));
    $('#fcamount').val(FCAmount.toFixed(Decimal));
    $('#fctaxable').val(FCtottaxable.toFixed(Decimal));
    $('#fctax').val(FCtottax.toFixed(Decimal));
    $('#fcdiscount').val(FCtotdisc.toFixed(Decimal));
    $('#fc').text(FCAmount.toFixed(Decimal));

    if ($('#rate').val() == 1 || $('#fcamount').val() == 0) {
        $("#fc").css("opacity", '0');
        $('#gndtotal').text(GrandTotal.toFixed(Decimal));
    }
    else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
        $("#fc").css("opacity", '100');
        $('#gndtotal').text('FC : ' + GrandTotal.toFixed(Decimal));
    }
}

//New Button in Form

function createnew() {
    var rowCount = document.getElementById('tblPurchase_Order').rows.length;
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
    $('#EstAmount').val(0);
    $("#BOQ").val('');

    $('#purchaseOrderno').prop("disabled", true);
    $('#taxpercentage_0').prop("disabled", true);
    $('#btnsubmit').prop("disabled", false);
    $('#btnlist').prop("disabled", false);
    $('#btnadd').prop("disabled", false);
    $('#clearbtn').prop("disabled", false);
    ProdIdArray = [];
    $('#amount_0').prop("disabled", true);
    $('#totdisc,#tottaxable,#tottax').prop("disabled", true);
    $('#purchaseOrderno').val('');
    //$('#tour1').hide();
    $('#transfer').val(0);
    $('#supplierId').val(0);
    $('#suppliername').val('');
    $('#jobcodeid_0').val(0);
    $('#jobcode_0').val('');
    $('#jobid').val(0);
    $('#jobcode').val('');
    $('#shipadd').val('');
    $('#Orderdate').val(CurDate);
    $('#expdate').val(CurDate);
    $('#terms').val(0);
    $('#location').val(0);
    $('#fcamount').val('');
    $('#fctaxable').val('');
    $('#fctax').val('');
    $('#fcdiscount').val('');
    $('#rate').val('');
    $('#locn_0').val(0);
    $('#unit').val(0);
    $('#quantity').val('');
    $('#txtrate').val('');
    $('#discount').val('');
    $('#tax').val(0);
    $('#taxpercentage').val('');
    $('#disc').val('');
    $('#basedisc').val('');
    $('#totdisc').val('0.00');
    $('#tottaxable').val('0.00');
    $('#tottax').val('0.00');
    $('#GrandTotal').val('');
    $('#taxamount').val('');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
    for (var k = 1; k < i; k++) {
        $('#row_' + k).remove();
    }
    i = 1;
    $('#product_0').val('');
    $('#ProductLength').val();
    ClearProductRow();
    ClearOtherDetails();
    Defaultfocus();
    PENo = '';
    $('#PENo').val('');

    $('#fileUpload,#upload').prop("disabled", false);
    $('#fileUpload,#upload').show();
    $('#btnprint,#btndelete,#btnedit,#btnsaveedit,#btnprintorder').hide();
    if (RefreshFlag != 1) {
        $('.butndis').prop("disabled", false);
        $('#btnsubmit,#btnlist').show();
        GetCurrency(0)
        Serialnoload();
        $('#CopyOrderNoDiv').hide();
        $('#OrderNoDiv').show();
        CopyFlag = 0;
        if ((usermenu1.indexOf("M224") != -1)) {
            $("#upload,#fileUpload").show();
            $("#upload,#fileUpload").prop("disabled",false);
        }
    }
}

//Clear Product Row Except Product Name

function ClearProductDetails() {

    $('#productId_0').val(0);
    $('#productdesc_0').val('');
    $('#unit_0').val(0);
    $('#txtrate_0').val('');
    $('#tax_0').val(0);
    $('#taxpercentage_0').val('');
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

    $("#BOQConfirmFlag").val("NO");
    $("#MRconfirmOk").show();
    if ($('#jobid').val() != 0) {
        $('#jobcode_0').val($('#jobcode').val());
        $('#jobcodeid_0').val($('#jobid').val());
    }
    else {
        $('#jobcode_0').val('');
        $('#jobcodeid_0').val(0);
    }
    $("#boq_0").val(0);
    $("#BOQAmt_0").val(0);
}
//Clear All Product Details 

function ClearProductRow() {

    $('#productId_0').val(0);
    $('#product_0').val('');
    $('#productdesc_0').val('');
    $('#unit_0').val(0);
    $('#txtrate_0').val('');
    $('#tax_0').val(0);
    $('#taxpercentage_0').val('');
    $('#quantity_0').val('');
    $('#discount_0').val('');
    $('#amount_0').val('');
    $('#baseamount_0').val('');
    $('#basetaxableamount_0').val('');
    $('#basetaxamount_0').val('');
    $('#basediscount_0').val('');
    $('#locn_0').val($('#location').val());
    $('#txttaxable_0').val('');
    $('#txttax_0').val('');
    $('#txtsubtotal_0').val('');
    $('#product_0').focus();
    $("#BOQConfirmFlag").val("NO");
    $("#MRconfirmOk").show();
    if ($('#jobid').val() != 0) {
        $('#jobcode_0').val($('#jobcode').val());
        $('#jobcodeid_0').val($('#jobid').val());
    }
    else {
        $('#jobcode_0').val('');
        $('#jobcodeid_0').val(0);
    }
    $("#boq_0").val(0);
    $("#BOQAmt_0").val(0) ;
}

//Other Details

function OtherDetails() {
    $('#OtherDetails').show();
    $('#OtherDetailsHdr').text('Other Details');
    $('#OtherDetailsdiv').show();
    $('#shipvia').focus();
}

//Close Other Details Popup

function CloseOtherDetails() {
    $('#OtherDetails').hide();
    $('#OtherDetailsHdr').text('');
    $('#OtherDetailsdiv').hide();
}

//Clear Other Details
function ClearOtherDetails() {
    $('#shipvia').val('');
    $('#MOTransfer').val('');
    $('#POE').val('');
    $('#FinalDesti').val('');
    $('#Remarks').val('');
}

//Popup Show Function 

function Addpopupwindow(Id) {
        $("#popupdiv").css("margin-top", '0px');
        $('#currencydiv').hide(); $('#areadiv').hide();
        $('#locationdiv').hide(); $('#salesmandiv').hide();
        $('#termsdiv').hide(); $('#popupdiv').show();
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
    else if (Id == 3) {                                             //For Currency Popup
        $('#myheader').text('Currency');
        $('#currencydiv').show();
        $('#txt_code').focus();

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


    $('#LocationName').val('');
    $('#LocationCode').val('');
    $('#LocationDescription').val('');
    $('#LocationCode').focus();
    $('#LocationId').val(0);

    $('#txtterms').val('');
    $('#txtdesc').val('');
    $('#txtdesc').focus();
    $('#TermsId').val(0);
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
    else if (rate==0) {
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
                }
            }
        });

    }


}



//Design Change for Copy Function 

function GetRows() {
    CopyFlag = 1;
    var rowCount = document.getElementById('tblPurchase_Order').rows.length;
    if (rowCount == 0) {
        NextOrderNo = parseInt($('#purchaseOrderno').val() || 0);
        $('#CopyOrderno').val(NextOrderNo)
        formrefresh(1);
        $('#CopyOrderNoDiv').show();
        $('#OrderNoDiv,#popupdiv,#OtherDetails,#Enquirypopup,#PurchaseTransactionPopup,#productpdiv').hide();
        
        //$('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#CopyOrderno').prop("disabled", false);
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnlist').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#clearbtn').prop("disabled", true);
        $('.butndis').prop("disabled", true);
        $('#btnsubmit,#btnlist').hide();
        $('#fileUpload,#upload').prop("disabled", true);
        $('#CopyOrderno').focus();
        $('#CopyOrderno').select();
    }
    else {
        $('#Confirmflag').val('copy'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').focus();

    }

}

//Copy Function 

function PurchaseOrderGets(result) {
    closewarning();
    if (result.length > 0) {
        $('#fileUpload,#upload').prop("disabled", true);
        $('#fileUpload,#upload').hide();
        for (var n = 0; n < result.length; n++) {

            $('#BOQ').val(result[n].BOQ);
            $('#EstAmount').val(result[n].EstimateAmount);

            $('#purchaseOrderno').val(result[n].OrderNo);
            $('#CopyOrderno').val(result[n].OrderNo);
            $('#suppliername').val(result[n].SupplierName);
            $('#supplierId').val(result[n].SupplierId);
            $('#Orderdate').val(result[n].OrderDate);
            $('#expdate').val(result[n].ExpectedDate);
            $('#terms').val(result[n].Terms);
            $('#location').val(result[n].LocnId);
            $('#jobid').val(result[n].MainJobNo);
            $('#jobcode').val(result[n].MainJobCode);
            $('#currency').val(result[n].CurrencyId);
            $('#rate').val(result[n].CurrencyRate);
            $('#totdisc').val(result[n].TotalDiscount.toFixed(Decimal));
            $('#tottaxable').val(result[n].TotalTaxable.toFixed(Decimal));
            $('#tottax').val(result[n].TotalTax.toFixed(Decimal));
            $('#GrandTotal').val(result[n].GrandTotal.toFixed(Decimal));
            $('#fcamount').val(result[n].FCGrandTotal.toFixed(Decimal));
            $('#fc').text(result[n].FCGrandTotal.toFixed(Decimal));
            $('#Remarks').val(result[n].Remarks);
            $('#docref').val(result[n].DocRef);
            $('#shipadd').val(result[n].ShipTo);
            $('#shipvia').val(result[n].ShipVia);
            $('#MOTransfer').val(result[n].ModeofTransfer);
            $('#POE').val(result[n].PortofEntry);
            $('#FinalDesti').val(result[n].FinalDestination);
            if ($('#rate').val() == 1 || $('#fcamount').val() <= 0) {
                $("#fc").css("opacity", '0');
                $('#gndtotal').text(result[n].GrandTotal.toFixed(Decimal));
            }
            else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
                $("#fc").css("opacity", '100');
                $('#gndtotal').text('FC : ' + result[n].GrandTotal.toFixed(Decimal));
            }
            var id = parseInt(n + 1)
            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                + id + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_1' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='productId_" + id + "' value='"
                + result[n].ItemId + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                result[n].ItemCode + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                + result[n].ItemDescription + "'></td><td id='col_2' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
                LocationSelect + "</select></td><td id='col_3' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
                UnitSelect + "</select></td><td id='col_4' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                result[n].Quantity + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                result[n].Rate.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'>" +
                "<input type='hidden' id='baserate_" + id + "' class='form-control' value='0' >" +
                "</td><td id='col_6' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                result[n].Discount.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_7' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
                result[n].TaxableAmount.toFixed(Decimal) + "' disabled></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
                TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
                result[n].TaxRate + "></td><td id='col_9' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
                result[n].TaxAmount.toFixed(Decimal) + "'></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                result[n].TotalAmount.toFixed(Decimal) + "'>" +
                "<input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='0'>" +
                "<input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value='0'>" +
                "<input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value='0'>" +
                "<input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value='0'>" +
                "</td><td id='col_12' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='" +
                result[n].JobNo + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                + result[n].JobCode + "'></td>" +
                "<input type='hidden' id='boq_" + id + "' value='" + result[n].BOQQty + "' >" +
                "<input type='hidden' id='BOQAmt_" + id + "' value='" + result[n].BOQAmt + "' />" +
                "</tr>";

            $('#tblPurchase_Order').append(ProdEditRow);
            $('#tax_' + id).val(result[n].TaxId);
            $('#unit_' + id).val(result[n].UnitId);
            $('#locn_' + id).val(result[n].LocationId);
        }
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        i = parseInt(result.length) + 1;

        if (result[0].Approval == 'Approved') {
            $('#btnprintorder').show();
        }
        else {
            $('#btnprintorder').hide();
        }

        $('#btnprint,#btndelete,#btnedit').show();
        CalcAmt();
    }
    else{
        CheckeDeleted();
}
}

function CheckeDeleted() {
    var datax = {};
    datax.BillNo = 'PO';
    datax.SlNo = $('#CopyOrderno').val();
    datax.DepartmentId = DepId;
    datax.UserId = UId;
    $.ajax({
        type: "POST",
        url: "../Purchase/CheckDeletedPurchase",
        data: datax,
        success: function (result) {
            var status = result.oList[0].Status;
            var slno = result.oList[0].SlNo;
            if (status == 1) {
                //$('#popupmessageInfo').text('Order No: ' + slno + ' Cancelled!!!');
                //$('#Infopopup').show();
                //setTimeout(function () { $('#Infopopup').hide(); }, 3000);
                swal('Order No-' + slno + ' ', "Cancelled!!!", "error");
                $('.swal-button swal-button--confirm').focus();
            }

        }
    });
}
//Next and Previous of Current Invoice No Copy Function 

function GetPurchaseOrderPrevousornext(Value) {
    //$('#tour1').fadeOut();
    $('#Warningpopup').fadeOut();
    var OrderNo = parseInt($('#CopyOrderno').val() || 0);
    OrderNo = OrderNo + Value;
    if ((OrderNo <= 0) || (OrderNo >= NextOrderNo)) {
        warningshow('Order Number Not Valid', 'CopyOrderno');
        return false;
    }
    else {
        $('#CopyOrderno').val(OrderNo);
        var data = {};
        data.OrderNo = OrderNo;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseOrderGetandGets",
            data: data,
            success: function (result) {
                formrefresh(1);
                PurchaseOrderGets(result.oList);
                $('#btnnew').focus();
                $('.form-control').prop('disabled', true);
                $('#CopyOrderno').prop("disabled", false);
                $('.jsgrid-button').prop('disabled', true);
                $('#btnsubmit').prop("disabled", true);
                $('#btnlist').prop("disabled", true);
                $('#btnadd').prop("disabled", true);
                $('#clearbtn').prop("disabled", true);

            }
        });
    }
}


//1st Transfer Popup 

function GetList(Id) {


     if ($('#transfer').val() == 0) {
        warningshow('Please Select Transfer Type', 'transfer');
        return false;
    }
     else {
         $('#Enquirydiv').hide();
         $('#Enquirydivcust').hide();
         $('#Enquirydivsup').hide();
         $('#Recalldiv').hide();

         if ($('#transfer').val() == 1) {
           
             if ($('#supplierId').val() == 0) {
                 var data = {};
                 data.SupplierId = 0;
                 data.DepartmentId = DepId;
                 $.ajax({
                     type: "POST",
                     url: "../Purchase/PurchaseEnquiryGetsforPO",
                     data: data,
                     success: function (result) {
                         CloseEnquiry()
                         $("#Enquirypopup").css("margin-top", '-50px');
                         $('#Enquirypopup').show();
                         $('#Enquiryheader').text('Purchase Enquiry');
                         $('#Enquirydiv').show();
                         ShowPEList(result.oList);

                     }
                 });
             }
             else {
                 var data = {};
                 data.SupplierId = $('#supplierId').val();
                 data.DepartmentId = DepId;
                 $.ajax({
                     type: "POST",
                     url: "../Purchase/PurchaseEnquiryGetsforPO",
                     data: data,
                     success: function (result) {
                         CloseEnquiry()
                         $("#Enquirypopup").css("margin-top", '-50px');
                         $('#Enquirypopup').show();
                         $('#Enquiryheader').text('Purchase Enquiry');
                         $('#Enquirydivsup').show();
                         ShowPESupplierList(result.oList);

                     }
                 });
             }
         }

         else if ($('#transfer').val() == 2) {

             if ($('#supplierId').val() == 0) {
                 var data = {};
                 data.SupplierId = 0;
                 data.DepartmentId = DepId;
                 $.ajax({
                     type: "POST",
                     url: "../Purchase/PurchaseOrderRecall",
                     data: data,
                     success: function (result) {
                         CloseEnquiry()
                         $("#Enquirypopup").css("margin-top", '-50px');
                         $('#Enquirypopup').show();
                         $('#Enquiryheader').text('Recall Purchase Order');
                         $('#Recalldiv').show();

                         PORecallPopup(result.oList);

                     }
                 });
             }
             else {
                 var data = {};
                 data.SupplierId = $('#supplierId').val();
                 data.DepartmentId = DepId;
                 $.ajax({
                     type: "POST",
                     url: "../Purchase/PurchaseOrderRecall",
                     data: data,
                     success: function (result) {
                         CloseEnquiry();
                         $("#Enquirypopup").css("margin-top", '-50px');
                         $('#Enquirypopup').show();
                         $('#Enquiryheader').text('Recall Purchase Order');
                         $('#OrderdivSup').show();
                         ShowPOSupplierList(result.oList);

                     }
                 });
             }
             }
         
    }
}


// Purchase Enquiry Search Functions

function SearchEnq() {

    var data = {};
    data.SupplierId = $('#EnqSupplierId').val();
    data.FromDate = $('#EnqFromDate').val();
    data.ToDate = $('#EnqToDate').val();
    data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseEnquiryGetsforPOSort",
            data: data,
            success: function (result) {
                CloseEnquiry();
                $("#Enquirypopup").css("margin-top", '-50px');
                $('#Enquirypopup').show();
                $('#Enquiryheader').text('Purchase Enquiry');
                $('#Enquirydiv').show();
                if ($('#EnqSupplierId').val() == 0) {
                    $('#EnqSupplier').val('');
                }
                ShowPEList(result.oList);

            }
        });
    
}

function SearchEnqSup() {

    var data = {};
    data.SupplierId = $('#supplierId').val();
    data.FromDate = $('#EnqFromDate1').val();
    data.ToDate = $('#EnqToDate1').val();
    data.DepartmentId = DepId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseEnquiryGetsforPOSort",
        data: data,
        success: function (result) {
            CloseEnquiry()
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Purchase Enquiry');
            $('#Enquirydivsup').show();
            ShowPESupplierList(result.oList);

        }
    });

}

function SearchEnqSub() {
    if ($('#ProductPopUp1Id').val() != 0) {
        var data = {};
        data.PENumber = PENo;
        data.ItemId = $('#ProductPopUp1Id').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseEnquiryGetProductforPOSort",
            data: data,
            success: function (result) {
                ShowItemGet(result.oList);

            }
        });
    }
    else {
        warningshow('Please Enter Valid Product', 'ProductPopUp1');
    }
}

function ClearEnq() {
    $('#EnqSupplierId').val(0);
    $('#EnqSupplier').val('');
    $('#EnqFromDate').val(CurDate);
    $('#EnqToDate').val(CurDate);

    if ($('#supplierId').val() == 0) {
        var data = {};
        data.SupplierId = 0;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseEnquiryGetsforPO",
            data: data,
            success: function (result) {
                $('#tblEnquiry tr td').remove();
                ShowPEList(result.oList);

            }
        });
    }
}

function ClearEnqSup() {
    $('#EnqFromDate1').val(CurDate);
    $('#EnqToDate1').val(CurDate);
    var data = {};
    data.SupplierId = $('#supplierId').val();
    data.DepartmentId = DepId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseEnquiryGetsforPO",
        data: data,
        success: function (result) {
            $('#tblEnquirysup tr td').remove();
            ShowPESupplierList(result.oList);

        }
    });
}

function ClearEnqSub() {
    $('#ProductPopUp1').val('');
    $('#ProductPopUp1Id').val(0);

    var data = {};
    data.PENumber = PENo;
    data.DepartmentId = DepId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseEntryGetProductforPO",
        data: data,
        success: function (result) {
            if (PENo != 0) {
                $('#tblEnquirypsub tr td').remove();
                ShowItemGet(result.oList);
            }

        }
    });

}

// Purchase Order Search Functions

function SearchOrder() {

    var data = {};
    data.SupplierId = $('#RecallSupplierId').val();
    data.FromDate = $('#RecallDateFrom').val();
    data.ToDate = $('#RecallDateTo').val();
    data.DepartmentId = DepId;

    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseOrderRecall",
        data: data,
        success: function (result) {
            CloseEnquiry()
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Recall Purchase Order');
            $('#Recalldiv').show();
            if ($('#RecallSupplierId').val() == 0) {
                $('#RecallSupplier').val('');
            }
            PORecallPopup(result.oList);

        }
    });


}

function SearchOrderSup() {

    var data = {};
    data.SupplierId = $('#supplierId').val();
    data.FromDate = $('#OrderFromDate').val();
    data.ToDate = $('#OrderToDate').val();
    data.DepartmentId = DepId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseOrderRecall",
        data: data,
        success: function (result) {
            CloseEnquiry();
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Recall Purchase Order');
            $('#OrderdivSup').show();
            ShowPOSupplierList(result.oList);

        }
    });

}

function SearchOrderSub() {


    if ($('#ProductPopUp2Id').val() != 0) {
        var data = {};
        data.PONumber = PONumber;
        data.ItemId = $('#ProductPopUp2Id').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseOrderProductRecallSort",
            data: data,
            success: function (result) {

                    ShowItemGetOrder(result.oList);

            }
        });
    }
    else {
        warningshow('Please Enter Valid Product', 'ProductPopUp2');
    }

}


function ClearOrder() {
    $('#RecallSupplierId').val(0);
    $('#RecallSupplier').val('');
    $('#RecallDateTo').val(CurDate);
    $('#RecallDateFrom').val(CurDate);


    if ($('#supplierId').val() == 0) {
        var data = {};
        data.SupplierId = 0;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseOrderRecall",
            data: data,
            success: function (result) {
                $('#tblRecall tr td').remove();
                PORecallPopup(result.oList);

            }
        });
    }
}

function ClearOrderSup() {
    $('#OrderFromDate').val(CurDate);
    $('#OrderToDate').val(CurDate);
    var data = {};
    data.SupplierId = $('#supplierId').val();
    data.DepartmentId = DepId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseOrderRecall",
        data: data,
        success: function (result) {
            CloseEnquiry();
            $("#Enquirypopup").css("margin-top", '-50px');
            $('#Enquirypopup').show();
            $('#Enquiryheader').text('Recall Purchase Order');
            $('#OrderdivSup').show();
            ShowPOSupplierList(result.oList);

        }
    });
}

function ClearOrderSub() {
    $('#ProductPopUp1').val('');
    $('#ProductPopUp1Id').val(0);


    if (PONumber != '') {
        var data = {};
        data.PONumber = PONumber;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseOrderProductRecall",
            data: data,
            success: function (result) {
                if (PONumber != 0) {
                    $('#tblOrderSub tr td').remove();
                    ShowItemGetOrder(result.oList);
                }
            }
        });
    }

}

function BackOrder() {
    $('#OrderdivSub').hide();
    $('#OrderdivSup').show();
    $('#ProductPopUp2Id').val(0);
    $('#ProductPopUp2').val('');
}


//List Recall Order Details Popup
function PORecallPopup(result) {
    disable_datatable('tblRecall');
    var responseText = "<thead><tr><th>Order No</th><th>Supplier</th><th>Shipping Address</th><th>Date</th><th>Document Refrence</th><th>Currency</th><th>Add</th></tr>" +
        "<tr><th>OrderNo</th><th>Supplier</th><th>Address</th><th>Date</th><th>Refrence</th><th>Currency</th><th> </th></tr></thead><tbody>"; // For Search
    for (var l = 0; l < result.length; l++) {

        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
          //  '<td>' + slno + '</td>' +
           '<td>' + result[l].OrderNo + '</td>' +
           '<td>' + result[l].SupplierName + '</td>' +
           '<td>' + result[l].ShipTo + '</td>' +
           '<td>' + result[l].OrderDate + '</td>' +
           '<td>' + result[l].DocRef + '</td>' +
           '<td>' + result[l].CurrencyName + '</td>' +
           '<td style="text-align:center"><a onclick="RecallOrder(' + result[l].OrderNo + ')">' + Addbutton + '</a></td>' +
           '</tr>';

    }
    //$('#tblRecall').html(responseText + '</tbody>');
    $('#tblRecall').html(responseText+'</tbody>');
    datatableWithsearch('tblRecall','Single');

}



//Function Recall PO
function RecallOrder(OrderNo) {
    if (OrderNo != 0) {
        CloseEnquiry();
        var data = {};
        data.OrderNo = OrderNo;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseOrderGetandGets",
            data: data,
            success: function (result) {
                RecallPOGets(result.oList);
            }
        });
    }
}

//Recall Function 

function RecallPOGets(result) {
    i = 1;
    $("#tblPurchase_Order tr").remove();
    for (var n = 0; n < result.length; n++) {
        $('#supplierId').val(result[n].SupplierId);
        $('#suppliername').val(result[n].SupplierName);
        $('#Orderdate').val(CurDate);
        $('#expdate').val(CurDate);
        $('#terms').val(result[n].Terms);
        $('#location').val(result[n].LocnId);
        $('#currency').val(result[n].CurrencyId);
        $('#rate').val(result[n].CurrencyRate);
        $('#jobid').val(result[n].MainJobNo);
        $('#jobcode').val(result[n].MainJobCode);
        $('#totdisc').val(result[n].TotalDiscount.toFixed(Decimal));
        $('#tottaxable').val(result[n].TotalTaxable.toFixed(Decimal));
        $('#tottax').val(result[n].TotalTax.toFixed(Decimal));
        $('#GrandTotal').val(result[n].GrandTotal.toFixed(Decimal));
        $('#fcamount').val(result[n].FCGrandTotal.toFixed(Decimal));
        $('#gndtotal').text('FC : ' + result[n].GrandTotal.toFixed(Decimal));
        $("#fc").css("opacity", '100');
        $('#fc').text(result[n].FCGrandTotal.toFixed(Decimal));
        $('#Remarks').val(result[n].Remarks);
        $('#docref').val(result[n].DocRef);
        $('#shipadd').val(result[n].ShipTo);
        $('#shipvia').val(result[n].ShipVia);
        $('#MOTransfer').val(result[n].ModeofTransfer);
        $('#POE').val(result[n].PortofEntry);
        $('#FinalDesti').val(result[n].FinalDestination);

        var no = $('#tblPurchase_Order tr').length + 1;
        var id = parseInt(n + 1)
        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
            + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='EnquiryId_" + id + "' value='0'><input type='hidden' id='EnquirySubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='" +
	        result[n].ItemId+"'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            result[n].ItemCode + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
           + result[n].ItemDescription + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
             LocationSelect + "</select></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
             UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            result[n].Quantity + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            result[n].Rate.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            result[n].Discount.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
            result[n].TaxableAmount.toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
            TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value='" + result[n].TaxRate + "'></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;'><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
            result[n].TaxAmount.toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
            result[n].TotalAmount.toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td><td id='col_12' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"+
            result[n].JobNo +"'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"+
            result[n].JobCode + "'></td></tr>";


        $('#tblPurchase_Order').append(ProdEditRow);
        $('#tax_' + id).val(result[n].TaxId);
        $('#unit_' + id).val(result[n].UnitId);
        $('#locn_' + id).val(result[n].LocationId);
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    i = parseInt(result.length) + 1;
    CalcAmt();
}

//List Enquiry All Details in Enquiry Popup table
function ShowPEList(result) {
    disable_datatable('tblEnquiry');
    var responseText = "<thead><tr><th>Sl#</th><th>Enquiry No</th><th>Enquiry Date</th><th>Supplier</th><th>Currency</th><th>Remarks</th><th>Amount</th><th>Add</th></tr>" +
        "<tr><th>Sl#</th><th>EnquiryNo</th><th>Date</th><th>Supplier</th><th>Currency</th><th>Remarks</th><th>Amount</th><th> </th></tr></thead><tbody>"; // For Search
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
           '<td style="text-align:center">' + slno + '</td>' +
           '<td>' + result[l].EnquiryNo + '</td>' +
           '<td>' + result[l].EnquiryDate + '</td>' +
           '<td>' + result[l].SupplierName + '</td>' +
           '<td>' + result[l].CurrencyName + '</td>' +
           '<td>' + result[l].Remarks + '</td>' +
            '<td style="text-align:right">' + result[l].FCTotal + '</td>' +
           '<td style="text-align:center"><a onclick="EditEnquiry(' + result[l].EnquiryNo + ')">' + Addbutton + '</a></td>' +
           '</tr>';
    }
    $('#tblEnquiry').html(responseText+'</tbody>');
    datatableWithsearch('tblEnquiry', 'Single');

}


//EnquiryGet Function

function EditEnquiry(EnquiryNo) {
    if (EnquiryNo != 0) {

        CloseEnquiry();
        var data = {};
        data.EnquiryNo = EnquiryNo;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseEnquiryGetandGets",
            data: data,
            success: function (result) {
                PurchaseEnquiryGets(result.oList);
            }
        });
    }

}

//Enquiry Gets

function PurchaseEnquiryGets(result) {
    i = 1;
    $("#tblPurchase_Order tr").remove();
    for (var n = 0; n < result.length; n++) {
        if (parseInt(result[n].Qty)>0){
        $('#PENo').val(result[n].EnquiryNo);
        $('#supplierId').val(result[n].SupplierId);
        $('#suppliername').val(result[n].SupplierName);
        $('#location').val(result[n].LocnId);
        $('#currency').val(result[n].CurrencyId);
        $('#rate').val(result[n].CurrencyRate);
        $('#totdisc').val(result[n].TotalDiscount.toFixed(Decimal));
        $('#tottaxable').val(result[n].TotalTaxable.toFixed(Decimal));
        $('#tottax').val(result[n].TotalTax.toFixed(Decimal));
        $('#GrandTotal').val(result[n].GrandTotal.toFixed(Decimal));
        $('#fcamount').val(result[n].FCGrandTotal.toFixed(Decimal));
        $('#gndtotal').text('FC : ' + result[n].GrandTotal.toFixed(Decimal));
        $("#fc").css("opacity", '100');
        $('#fc').text(result[n].FCGrandTotal.toFixed(Decimal));

        $('#jobid').val(result[n].MainJobNo);
        $('#jobcode').val(result[n].MainJobCode);

        var no = $('#tblPurchase_Order tr').length + 1;
        var id = parseInt(n + 1)

        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
            + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='EnquiryId_" + id + "' value='"
            + result[n].EnquiryNo + "'><input type='hidden' id='EnquirySubId_" + id + "' value='"
            + result[n].PurchaseEnquirySubId + "'><input type='hidden' id='productId_" + id + "' value='"
            + result[n].ItemId + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].ItemCode + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].ItemDescription + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >"
            + LocationSelect + "</select></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >"
            + UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].Qty + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control CheckRateZero' disabled style='height:30px;background-color:white'  value='"
            + result[n].Rate.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
            + result[n].Discount.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='"
            + result[n].TaxableAmount.toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >"
            + TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" + result[n].TaxRate + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='"
            + result[n].TaxAmount.toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='"
            + result[n].TotalAmount.toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td><td id='col_12' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='" +
            result[n].JobNo + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" + result[n].JobCode + "'></td></tr>";

        $('#tblPurchase_Order').append(ProdEditRow); 
        $('#tax_' + id).val(result[n].TaxId);
        $('#unit_' + id).val(result[n].UnitId);
        $('#locn_' + id).val(result[n].LocationId);
    }
    } 
    
    
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    i = parseInt(result.length) + 1;
    CalcAmt();
    
}




//List Enquiry Details Against Customer in Enquiry Popup table
function ShowPESupplierList(result) {
    disable_datatable('tblEnquirysup');

    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' checked id= 'SlNoHeadCheck' 'custom-control-input cz-bg-image-display' onchange='SelectAllSupp()'>&nbsp;&nbsp;&nbsp;Select</th><th>Enquiry No</th><th>Enquiry Date</th><th>Supplier</th><th>Currency</th><th>Remarks</th><th>Amount</th></tr>" +
    "<tr><th> </th><th>EnquiryNo</th><th>Date</th><th>Supplier</th><th>Currency</th><th>Remarks</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {

        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;" ><input type="checkbox"  checked  id=' + 'SlNoCheck' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td>' +
           '<td id=' + 'Enquirycol' + slno + '>' + result[l].EnquiryNo + '<input type="hidden" id="EnquiryNo' + slno + '" value= '+ result[l].EnquiryNo +'></td>' +
           '<td>' + result[l].EnquiryDate + '</td>' +
           '<td>' + result[l].SupplierName + '</td>' +
           '<td>' + result[l].CurrencyName + '<input type="hidden" id="Curr' + slno + '" value=' + result[l].CurrencyId + '></td>' +
           '<td>' + result[l].Remarks + '</td>' +
           '<td style="text-align:right">' + result[l].FCTotal + '</td>' +
           '</tr>';
    }
    $('#tblEnquirysup').html(responseText+'</tbody><tfoot><tr><th>select</th><th>EnquiryNo</th><th>EnquiryDate</th><th>Supplier</th><th>Currency</th><th>Remarks</th></tr></tfoot> ');

    $('#tblEnquirysup').html(responseText + '</tbody>');
    datatableWithsearch('tblEnquirysup', 'Multiple');
    $('#RowGet').val(result.length)
    $('#btnview').focus();
}


//Select or Deselect All Purchase Enquiry
function SelectAllSupp() {

    var rowCount =$('#RowGet').val();
    var flag = $("#SlNoHeadCheck").is(":checked")

    for (var i = 1; i <= rowCount + 1; i++) {
        if (document.getElementById("SlNoCheck" + i) != null) {
            document.getElementById("SlNoCheck" + i).checked = flag;
        }
    }

}

//table based on PO Number
function ShowItemGet(result) {

    $('#Enquirydiv').hide();
    $('#Enquirydivsup').hide();
    $('#Enquirydivsub').show();
    disable_datatable('tblEnquirypsub');

    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheckItem' onchange='SelectAllItem()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;Select</th><th>OrderNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amt.</th><th>Amount</th></tr>" +
    "<tr><th> </th><th>OrderNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr><td style="width:90px;"><input type="checkbox"  checked  id= ' + 'SlNoCheckgrid' + slno + ' ></td><td id=' + 'STNoRow' + slno + '>' +
            result[l].EnquiryNo + '<input type="hidden" id="Enquiryno' + slno + '" value=' +
            result[l].EnquiryNo + '><input type="hidden" id= ' + 'EnquirySub' + slno + ' value= ' +
            result[l].PurchaseEnquirySubId + '></td><td id=' + 'Product' + slno + '>' +
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
            result[l].TaxRate + '></td><td id=' + 'taxamt' + slno + '>' +
            parseFloat(result[l].FCTax).toFixed(Decimal) + '</td><td id=' + 'total' + slno + '>' +
            parseFloat(result[l].TotalAmount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' +
            result[l].TotalAmount + '><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' +
            result[l].FCTaxable + '><input type="hidden" id="taxamt_' + slno + '" value=' +
            result[l].FCTax + '><input type="hidden" id="enqmainjobid_' + slno + '" value=' +
            result[l].MainJobNo + '><input type="hidden" id="enqmainjobcode_' + slno + '" value=' +
            result[l].MainJobCode + '><input type="hidden" id="enqsubjobid_' + slno + '" value=' +
            result[l].JobNo + '><input type="hidden" id="enqsubjobcode_' + slno + '" value=' +
            result[l].JobCode + '></td></tr>';
    }
    $('#tblEnquirypsub').html(responseText + '</tbody>');
    datatableWithsearch('tblEnquirypsub', 'Multiple');
    $('#RowGet1').val(result.length)
    $('#btnprdtadd').focus();
}

//Selecting or Deselecting All checkbox in PE Item List

function SelectAllItem() {
    var rowCount = $('#RowGet1').val();
    var flag = $("#SlNoHeadCheckItem").is(":checked")
    for (var i = 1; i <= rowCount + 1; i++) {
        if (document.getElementById("SlNoCheckgrid" + i) != null) {
            document.getElementById("SlNoCheckgrid" + i).checked = flag;
        }
    }

}

//List Purchase Order Details of A Supplier

function ShowPOSupplierList(result) {
    disable_datatable('tblOrderSup');

    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' checked id= 'SlNoHeadOrder' 'custom-control-input cz-bg-image-display' onchange='SelectAllOrderSup()'>&nbsp;&nbsp;&nbsp;Select</th><th>Order No</th><th>Order Date</th><th>Supplier</th><th>Currency</th><th>Doc Ref</th></tr>" +
    "<tr><th> </th><th>OrderNo</th><th>Date</th><th>Supplier</th><th>Currency</th><th>Refrence</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {

        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;" ><input type="checkbox"  checked  id=' + 'SlNoOrderCheck' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td>' +
           '<td id=' + 'Ordercol' + slno + '>' + result[l].OrderNo + '<input type="hidden" id="OrdNo' + slno + '" value= ' + result[l].OrderNo + '></td>' +
           '<td>' + result[l].OrderDate + '</td>' +
           '<td>' + result[l].SupplierName + '</td>' +
           '<td>' + result[l].CurrencyName + '<input type="hidden" id="Curr1' + slno + '" value=' + result[l].CurrencyId + '></td>' +
           '<td>' + result[l].DocRef + '</td>' +
           '</tr>';
    }
    $('#tblOrderSup').html(responseText + '</tbody>');
    datatableWithsearch('tblOrderSup', 'Multiple');
    $('#RowGetOrder').val(result.length)
    $('#btnview').focus();

}


//View Popup of OrderView Button 

function ViewOrderWithSupplier() {

    var table = $("#tblOrderSup").DataTable();
    for (var h = 1; h <= 5; h++) {
        table.column(h).search('').draw();
    }

    PONumber = '';
    var row = $('#RowGetOrder').val();
    var CurrencyFlag = 0;


    for (var n = 1; n <= row; n++) {
        if ($("#SlNoOrderCheck" + n).is(":checked")) {
            CurrentCurrency = $('#Curr1' + n).val();
            break;
        }
    }

    for (var d = 1; d <= row; d++) {
        if ($("#SlNoOrderCheck" + d).is(":checked")) {
            if ($('#Curr1' + d).val() != CurrentCurrency) {
                CurrencyFlag = 1;
                break;
            }
            else
                continue;
        }
    }

    if (CurrencyFlag == 1) {
        warningshow('Select PO with Same Currency');
    }
    else {
        for (m = 1; m <= row; m++) {
            if ($("#SlNoOrderCheck" + m).is(":checked")) {

                if (PONumber == '') {
                    PONumber += $('#OrdNo' + m).val();

                }
                else {
                    PONumber += ',' + $('#OrdNo' + m).val();
                }

            }
        }
        if (PONumber != '') {
            var data = {};
            data.PONumber = PONumber;
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseOrderProductRecall",
                data: data,
                success: function (result) {
                    if (PONumber != 0)
                        ShowItemGetOrder(result.oList);

                }
            });
        }
    }

}

function BackEnquiry() {
    $('#Enquirydivsub').hide();
    $('#Enquirydivsup').show();
    $('#ProductPopUp1').val('');
    $('#ProductPopUp1Id').val(0);
    
}

//table based on PO Number
function ShowItemGetOrder(result) {

    $('#OrderdivSup').hide();
    $('#OrderdivSub').show();
    disable_datatable('tblOrderSub');

    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadOrderItem' onchange='SelectAllOrderItem()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;Select</th><th>OrderNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amount</th><th>Amount</th></tr>"+
    "<tr><th> </th><th>OrderNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amt.</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr><td style="width:90px;"><input type="checkbox"  checked  id= ' + 'SlNoCheckOrderItem' + slno + ' ></td><td id=' + 'STNoRow' + slno + '>' +
            result[l].OrderNo + '<input type="hidden" id="Enquiryno' + slno + '" value=' +
            result[l].OrderNo + '><input type="hidden" id= ' + 'EnquirySub' + slno + ' value= ' +
            result[l].PurchaseEnquirySubId + '></td><td id=' + 'Product' + slno + '>' +
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
            result[l].TaxRate + '><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' +
            result[l].FCTaxable + '></td><td id=' + 'taxamt' + slno + '>' +
            parseFloat(result[l].FCTax).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' +
            result[l].FCTax + '><td id=' + 'total' + slno + '>' +
            parseFloat(result[l].TotalAmount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' +
            result[l].TotalAmount + '><input type="hidden" id="Currid' + slno + '" value=' +
            result[l].CurrencyId + '><input type="hidden" id="currrate' + slno + '" value=' +
            parseFloat(result[l].CurrencyRate) + '><input type="hidden" id="JoId' + slno + '" value=' +
            result[l].JobNo + '><input type="hidden" id="JobC' + slno + '" value=' +
            result[l].JobCode + '><input type="hidden" id="MainOJoId' + slno + '" value=' +
            result[l].MainJobNo + '><input type="hidden" id="MainOJobC' + slno + '" value=' +
            result[l].MainJobCode + '></td></tr>';
    }
    $('#tblOrderSub').html(responseText + '</tbody>');
    datatableWithsearch('tblOrderSub', 'Multiple');
    $('#RowGetOrder1').val(result.length)
    $('#btnPrdctaddPO').focus();
}



//Adding datas in grid in main form from PO list
function OrderProductAdd() {

    var table = $("#tblOrderSub").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }

    i = 1;

    var row = $('#RowGetOrder1').val();
    $("#tblPurchase_Order tr").remove();

    for (m = 1; m <= row; m++) {
        if ($("#SlNoCheckOrderItem" + m).is(":checked")) {

            var productIdgrid = $('#ProductIdgrid' + m).val();
            var Product = $('#Product' + m).text();
            var Des = $('#Des' + m).text();
            var locnid = $('#locnid' + m).val();
            var unitIdgrid = $('#UnitIdgrid' + m).val();
            var unit = $('#UnitName' + m).text();
            var qty = parseInt($('#qty_' + m).val() || 0);
            var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
            var discount = parseFloat($('#dis_' + m).val() || 0).toFixed(Decimal);
            var taxid = $('#taxid' + m).val();
            var taxrate = parseFloat($('#taxrate' + m).val() || 0).toFixed(Decimal);
            var taxableamt = parseFloat($('#taxableamt' + m).val() || 0).toFixed(Decimal);
            var taxamt = parseFloat($('#taxamt_' + m).val() || 0).toFixed(Decimal);
            var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
            var jobid = $('#JoId' + m).val();
            var job = $('#JobC' + m).val();

            var MainOjobid = $('#MainOJoId' + m).val();
            var MainOjob = $('#MainOJobC' + m).val();

            $('#jobid').val(MainOjobid);
            $('#jobcode').val(MainOjob);

            $('#currency').val($('#Currid' + m).val())
            $('#rate').val($('#currrate' + m).val())

            var no = $('#tblPurchase_Order tr').length + 1;
            var id = parseInt(i);

            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='productId_" + id + "' value='"
                + productIdgrid + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                + Product + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                + Des + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >"
                + LocationSelect + "</select></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >"
                + UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                + qty + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
                + rate + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
                + discount + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='"
                + taxableamt + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >"
                + TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value="
                + taxrate + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='"
                + taxamt + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='"
                + total + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td><td id='col_12' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
                + jobid + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                + job + "'></td></tr>";

            $('#tblPurchase_Order').append(ProdEditRow); 
            $('#unit_' + id).val(unitIdgrid);
            $('#locn_' + id).val(locnid);
            $('#tax_' + id).val(taxid);
            i++;
        }
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    i = parseInt($('#tblPurchase_Order tr').length) + 1;
    CalcAmt();
    CurrentCurrency = 0;
    CloseEnquiry();
}

//Close Enquiry PopUP
function CloseEnquiry() {
    $('#Enquirypopup').hide();
    $('#Enquirydiv').hide();
    $('#Enquirydivsub').hide();
    $('#Enquirydivcust').hide();
    $('#Qtndiv').hide();
    $('#OrderdivSup').hide(); $('#OrderdivSub').hide();
    $('#RowGet,#RowGetOrder').val('');
    $('#RowGet1,#RowGetOrder').val('');
    PENo = '';
    PONumber = '';
    $('#tblEnquiry tr td').remove();
    $('#tblEnquirysup tr td').remove(); $('#tblEnquirypsub tr td').remove();
    $('#tblRecall tr td').remove();
    $('#tblOrderSup tr td').remove(); $('#tblOrderSub tr td').remove();
    $('#ProductPopUp1').val('');
    $('#ProductPopUp1Id').val(0);
}
//=================================COMMON=========================================


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
        swal('PO No-' + no + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh(0);
        swal('PO No-' + no + '', "Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        createnew();
        swal('Order No-' + no + ' ', "Deleted", "error");
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

function SelectAllOrderSup() {
    var rowCount = $('#RowGetOrder').val();
    var flag = $("#SlNoHeadOrder").is(":checked")
    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoOrderCheck" + i) != null) {
            document.getElementById("SlNoOrderCheck" + i).checked = flag;
        }
    }
}


function SelectAllOrderItem() {
    var rowCount = $('#RowGetOrder1').val();
    var flag = $("#SlNoHeadOrderItem").is(":checked")
    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoCheckOrderItem" + i) != null) {
            document.getElementById("SlNoCheckOrderItem" + i).checked = flag;
        }
    }
}



function ClearAll() {

    $('#EnqSupplierId,#RecallSupplierId').val(0);
    $('#EnqSupplier,#RecallSupplier').val('');
    $('#EnqFromDate,#RecallDateFrom').val(CurDate);
    $('#EnqToDate,#RecallDateTo').val(CurDate);

    $('#EnqFromDate1').val(CurDate);
    $('#EnqToDate1').val(CurDate);

    $('#OrderFromDate').val(CurDate);
    $('#OrderToDate').val(CurDate);

    $('#ProductPopUp1Id').val(0);
    $('#ProductPopUp1').val('');

    $('#ProductPopUp2Id').val(0);
    $('#ProductPopUp2').val('');

}

function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Date' || title == 'Currency' || title == 'OrderNo' || title == 'Sl#' || title == 'InvoiceNo' || title == 'EnquiryNo' || title == 'Amount') {
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
                             "<tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:27%'>SalesMan</th><th>Department</th></tr></thead><tbody>";


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


function OKUpdatePurchaseOrder() {

        var RateFlag = 0;
        $(".CheckRateZero").each(function () {
            var a = parseFloat($(this).val()).toFixed(Decimal);
            if (a == 0) {
                RateFlag = 1;
                return false;
            }

        });
        var r = parseFloat($('#rate').val());
        $("#rate").val(isNaN(r) ? 0 : r);

        if ($('#supplierId').val() == 0) {
            warningshow('Please Select Supplier', 'suppliername');
        }
        else if ($('#Orderdate').val() == '') {
            warningshow('Please Select Order Date', 'Orderdate');
        }
        else if ($('#terms').val() == 0) {
            warningshow('Please Select Terms', 'terms');
        }
        else if ($('#expdate').val() == '') {
            warningshow('Please Select Ship Date', 'expdate');
        }
        else if ($.trim($('#rate').val()) == '' || $.trim($('#rate').val()) == 0) {
            $('#rate').select();
            warningshow('Enter Currency Rate', 'rate');
        }
            //else if ($('#location').val() == 0) {
            //    warningshow('Please Select Location', 'location');
            //}
        else if ($('#jobid').val() == 0 && $('#jobcode').val() != '') {
            warningshow('Please Select Valid Job', 'jobcode');
        }
        else if ($('#product_0').val() != '') {
            warningshow('Product is not Added in Grid', 'product_0');
        }
        else if (FlagEdit != 0) {
            warningshow('In Edit Mode-Please Update');
        }
        else if (RateFlag == 1) {
            warningshow('Rate Must Be Greater Than Zero for all Items');
        }

        else {                                                  //ajax code for insert and update to  controller

            $('#btnsubmit').prop("disabled", true);
            $('#confirmOk').prop("disabled", true);

            var oArray = new Array();

            for (var k = 1; k < i; k++) {

                var OrderNo = $('#purchaseOrderno').val();
                var OrderDate = $('#Orderdate').val();
                var ExpectedDate = $('#expdate').val();
                var SupplierId = $('#supplierId').val();
                var LocnId = $('#location').val();
                var CurrencyId = $('#currency').val();
                var CurrencyRate = $('#rate').val();
                var Terms = $('#terms').val();
                var JobNo = $('#jobcodeid_' + k).val();
                var DocRef = $('#docref').val();
                var ShipTo = $('#shipadd').val();
                var Remarks = $('#Remarks').val();
                var ShipVia = $('#shipvia').val();
                var ModeOfTransfer = $('#MOTransfer').val();
                var PortOfEntry = $('#POE').val();
                var FinalDestination = $('#FinalDesti').val();
                var TotalDiscount = $('#fcdiscount').val();      //Base Currency          
                var FCDiscount = $('#totdisc').val();            //Foregin Currency
                var TotalTaxable = $('#fctaxable').val();        //Base Currency
                var TotalTax = $('#fctax').val();                //Base Currency               
                var GrandTotal = $('#fcamount').val();           //Base Currency                 
                var FCTaxable = $('#tottaxable').val();          //Foreign Currency
                var FCTax = $('#tottax').val();                  //Foreign Currency
                var FCGrandTotal = $('#GrandTotal').val();       //Foreign Currency
                var DepartmentId = DepId;
                var UserId = UId;
                var DeleteFlag = 1;


                var PurchaseOrderSubId = $('#PurchaseOrderSubId').val();
                var ItemId = $('#productId_' + k).val();
                var ItemCode = $('#product_' + k).val();
                var ItemDescription = $('#productdesc_' + k).val();
                var LocationId = $('#locn_' + k).val();
                var UnitId = $('#unit_' + k).val();
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
                var PENumber = $('#PENo').val();
                var EnquiryNo = $('#EnquiryId_' + k).val();
                var EnquirySubId = $('#EnquirySubId_' + k).val();

                var BillDiscount = 0;
                var BillDisc = 0;

                var MainJobNo = parseInt($("#jobid").val() || 0);
                var Variable1 = '';
                var Variable2 = '';

                if (!(typeof ItemCode == "undefined")) {

                    oArray.push({
                        'OrderNo': OrderNo,
                        'OrderDate': OrderDate,
                        'ExpectedDate': ExpectedDate,
                        'SupplierId': SupplierId,
                        'LocnId': LocnId,
                        'CurrencyId': CurrencyId,
                        'CurrencyRate': CurrencyRate,
                        'Terms': Terms,
                        'JobNo': JobNo,
                        'DocRef': DocRef,
                        'ShipTo': ShipTo,
                        'Remarks': Remarks,
                        'ShipVia': ShipVia,
                        'ModeOfTransfer': ModeOfTransfer,
                        'PortOfEntry': PortOfEntry,
                        'FinalDestination': FinalDestination,
                        'TotalDiscount': TotalDiscount,
                        'FCDiscount': FCDiscount,
                        'TotalTaxable': TotalTaxable,
                        'TotalTax': TotalTax,
                        'GrandTotal': GrandTotal,
                        'FCTaxable': FCTaxable,
                        'FCTax': FCTax,
                        'FCGrandTotal': FCGrandTotal,
                        'DepartmentId': DepartmentId,
                        'UserId': UserId,
                        'DeleteFlag': DeleteFlag,
                        'PurchaseOrderSubId': PurchaseOrderSubId,
                        'ItemId': ItemId,
                        'ItemCode': ItemCode,
                        'ItemDescription': ItemDescription,
                        'LocationId': LocationId,
                        'UnitId': UnitId,
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
                        'PENumber': PENumber,
                        'EnquiryNo': EnquiryNo,
                        'EnquirySubId': EnquirySubId,
                        'BillDiscount': BillDiscount,
                        'BillDisc': BillDisc,

                        'MainJobNo': MainJobNo,
                        'Variable1': Variable1,
                        'Variable2': Variable2

                    })
                }
            }

            if (oArray != "") {
                var data = { 'PurchaseOrder': oArray };
                $.ajax({
                    type: "POST",
                    url: "../Purchase/PurchaseOrderUpdate",
                    data: data,
                    success: function (result) {
                        for (var i = 0; i <= result.oList.length; i++) {
                            var status = result.oList[i].Status;
                            var no = result.oList[i].OrderNo;
                            $('#btnsubmit').prop("disabled", false);
                            Showalerts(status, no);
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