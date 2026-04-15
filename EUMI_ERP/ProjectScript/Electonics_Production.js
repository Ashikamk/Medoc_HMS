var i = 1; var editflag = 0; var copyflag = 0;
var itemflag = 0; var len = 0; var a = "0.00";
$(document).ready(function () {
    serialnoload();
    AccountLoad(2);
    $('#barcode').focus();
    $('#sellingprice').val(a);
    $('#ProNo').prop('disabled', true);   
    $('#ProNo').css('background-color', 'white');
    $('#txtDacnt').prop('disabled', true);
    $('#txtDacnt').css('background-color', 'white'); 
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

    $('#date').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $('#barcode').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtprice').select();
        }
    });
    $('#txtprice').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtQty').select();
        }
    });
    $('#txtquantity').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtrate').select();
        }
    }); 
    $('#txtrate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();
        }
    });

    //$("#barcode,#itemname").keyup(function (event) {
    //    if (event.keyCode == 13) {
    //        var data = {};
    //        data.ProductionItemId = $("#barcode").val();
    //        data.DeptId = ERPDeptId;
    //        data.Location = UserLocationId;
    //        data.fl = 1;
    //        $.ajax({
    //            type: "POST",
    //            url: "../../Production/MainItemDetailsGetandGets",
    //            data: data,
    //            success: function (result) {                   
    //                $('#hiddenitemId').val(result.oList[0].ItemId);
    //                $('#txtslno').val(result.oList[0].productslno);
    //                $('#txtprice').val(result.oList[0].SellingPrice);
    //                $('#sellingprice').val(result.oList[0].SellingPrice);
    //                $('#select_unit').val(result.oList[0].UnitId);
    //                $('#itemname').val(result.oList[0].Description);
    //                $('#barcode').val(result.oList[0].ItemCode);
    //                    var ItemId = $('#hiddenitemId').val();
    //                    var data = {};
    //                    data.ItemId = ItemId;
    //                    data.DeptId = ERPDeptId;
    //                    data.Location = UserLocationId;
    //                    $.ajax({
    //                        type: "POST",
    //                        url: "../../Production/ElectronicsProductionProductSearch",
    //                        data: data,
    //                        success: function (result) {
    //                                ShowItemlist(result.oList);
    //                        }
    //                    });
    //            }
    //        });
    //    }

    //});
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

    //$('#barcode').keyup(function (e) {
    //    e.preventDefault();
    //    var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //    if (entrkey == 8 ) {
    //        checkbarcodeempty(entrkey);
    //    }
    //});
    //$('#itemname').keyup(function (e) {
    //    e.preventDefault();
    //    var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //    if (entrkey == 8) {
    //        checkitemcodeempty(entrkey);
    //    }
    //});
    $('#ProNo').keyup(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (entrkey == 8) {
            checkbarcodeempty(entrkey);
        }
    });
});
    function ShowItemlist(result)
{     
        $("#tblProduction tr").remove();
        if (result.length != 0)
        {
            for (m = 0; m < result.length; m++) {           
                var slno = m + 1;
                var ProdRow = "<tr  id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style='width:102px;text-align:center' >"
              + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:230px;text-align:center' ><input type='hidden' id='ProductId" + slno + "' value='" + result[m].materialId + "'/> <input type='text' class='form-control ' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
              + result[m].ItemCode + "'></td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:331px;text-align:center' display='none;'> <input type='text' class='form-control '  disabled  style='background-color:white;height:30px;' id='txtdesc" + slno + "' value='"
             + result[m].AccessoriesName + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:199px;text-align:center' display='none;'> <input type='text' class='form-control text-right'  disabled  style='background-color:white;height:30px;'onkeypress='isNumbercheck(event, this)' onkeyup='tot_row(" + slno + ")' id='txtrate" + slno + "' value='"
             + result[m].Amount + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:169px;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'   onkeypress='return isNumber1(event)' id='txtqnty" + slno + "' value='"
             + result[m].Quantity + "'><input type='hidden' id='hiddenqty" + slno + "' value='" + result[m].Quantity + "'/><input type='hidden' id='balanceqty" + slno + "' value='" + 0 + "'/> </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:169px;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;' onkeyup='tot_row(" + slno + ")'  onkeypress='isNumbercheck(event,this)'  id='usedqty" + slno + "' value="
             + result[m].Quantity + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:189px;' ><input typ='text' class='form-control text-right' disabled=disabled  style='background-color:white;height:30px;background-color:white' readonly onkeyup=''   id='tamnt" + slno + "' value="
             + result[m].totamount + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:189px;' ><input typ='text' class='form-control text-center' disabled=disabled  style='background-color:white;height:30px;background-color:white' readonly onkeyup=''   id='slnumber" + slno + "' value="
             + result[m].materialslno + "><input type='hidden' id='flag" + slno + "' value='" + 1 + "'/></td>" +
             "<td id='Edit"
             + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:120px'; >&nbsp;<input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' id='Edit" + slno + "' type=button title=Edit >&nbsp;&nbsp;<button type='button' id='delete' title= Remove onclick='rowdelete(" + slno + ")'  class='badge badge-default round  btn-outline-danger' id='delete' style='font-weight:normal;' >Remove</button></td>" +
             "<td id='Update"
             + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title=Update><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'  ></td>" +
             "<td id='Removed"
             + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:120px;display:none;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button'  title= Removed   class='badge badge-default round  btn-warning' id='delete' style='font-weight:normal;color:white;border:none;' disabled >Removed</button></td>";
                $('#tblProduction').append(ProdRow);
            }
            Getgrandtotal(slno);
            len = slno;
        }              
    }

function UnitLoad(result) {
    $("#select_unit,#select_unitProd").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "' name=" + result[i].UnitName + ">" + result[i].UnitName + "</option>"
    }
    $("#select_unit,#select_unitProd").append(UnitSelect);
}

//default generation of Production Entry No
function serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#confirmff,#keyboardff').show();
            }
            else {
                getslno(result.oList);
            }
        }
    });
}
//find total amount
function tot() {
    var qty = parseFloat($('#txtquantity').val() || 0);
    var rate = parseFloat($('#txtrate').val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var total = parseFloat(qty * rate);
    $('#txttotal').val(total);
}
//check quantity
function checkquantity() {
    if (parseInt($('#txtquantity').val()) > parseInt($('#hiddenquantitycheck').val())) {
        $('#txtquantity').val('');
        warningshow(' Available Stock is:' + $('#hiddenquantitycheck').val() + '');
    }
}
function getslno(result) {
    $('#ProNo').val(result[0].Electronics_productionNo);
}
function AccountLoad(flag) {
    var accno = {};
    accno.DeptId = ERPDeptId;
    accno.flag = flag;
    $.ajax({
        type: "POST",
        url: "../../inventory/AccountNoGetandGets",
        data: accno,
        success: function (result) {
            getacno(result.oList);
        }
    });
}
function getacno(result) {
    for (var k = 0; k < result.length; k++) {
        $('#DebitAccount').val(result[k].AccCode);
        $('#hiddendebit').val(result[k].AccountId);
        $('#CreditAccount').val(result[k].CAccCode);
        $('#hiddencredit').val(result[k].CAccountId);
        $('#txtDacnt').val(result[k].DAccountDescription);
        $('#txtCacnt').val(result[k].AccountDescription);
    }
}
//for product list popup
var custstats = "Last Selling Price";
function CustPrdctLoad(result) {
    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "Last Selling Price";
        }
        else {
            custstat = result[n].custstats;
        }
        $('#productpopupdiv').show();
        $('#prodheader').text('Location Stock Details');
        $('#productdiv').show();
        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");
        var strr3 = strr2.replace(/,/gi, "&nbsp;");
        //var m = strr2.length;      
        var ProdRow =
              "<tr class='jsgrid-row' id='pdctrow'>" +
              "<td style='border:none;'><b>Average Cost :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " style='height:30px;background-color:white;border:none'></td>" +
              "<td style='border:none;'><b>Last Purchase Cost :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " style='background-color:white;height:30px;border:none'></td>" +
              "<td style='border:none;'><b>" + custstat + " :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "  style='background-color:white;height:30px;border:none'></td>" +
              "<td style='border:none;'><b>Total Stock :</b> <input type='text' disabled='' class='text-center' value=" + (result[n].Sumtotqty || 0) + " style='background-color:white;height:30px;border:none'></td>" +
              "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input style='height:30px' class='jsgrid-button jsgrid-update-button' id='Update' type='button' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' style='height:30px' type='button' id='canceledit'  title='Cancel edit'></td></tr>" +
              "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr3 + "</td ></tr>";
        $('#tblproductdetails').append(ProdRow);
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
function productpopuprefresh() {
    $('#productpopupdiv').hide();
    $('#pdctrow').remove();
    $('#pdctrow1').remove();
    $('#custlsp').hide();
}
function isNumber1(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    else {
        return true;
    }
}
function isNumbercheck(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;
}

function productadd() {
    rowcount = $('#tblProduction tr').length;
    var ProductFlag = 0;
    for (p = 1; p <= rowcount; p++) {
        if ($('#ProductId' + p).val() == $("#ProductId0").val() && $('#flag' + p).val() != 2) {
            ProductFlag = 1;
        }
    }
    var slno = parseInt(rowcount+1)
  if ($.trim($('#txtproduct0').val()) == "") {
        warningshow('Please Select Product', 'txtproduct0');
        return false;
  }
    else if ($.trim($('#ProductId0').val() == 0) && (qtyflag == 1)) {
        warningshow('Not Stock!', 'ProductId0');
        return false;
    }
    else if ($("#ProductId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
        $('#txtproduct0').select();
        return false;
    }
    else if ($.trim($('#txtquantity').val()) == "") {
        warningshow('Please Select Quantity', 'txtquantity');
        return false;
    }
    else if ($.trim($('#txtrate').val()) == "") {
        warningshow('Please Select Rate', 'txtrate');
        return false;
    }
    
    else if ($.trim($('#txtrate').val()) == '0') {
        warningshow('Rate Cannot Be Zero', 'txtrate');
        $('#txtrate').select();
        return false;
    }
    else if ($.trim($('#txtquantity').val()) == 0) {
        warningshow('Quantity Cannot be Zero', 'txtquantity');
        $('#txtquantity').select();
        return false;
    }
    else if ($.trim($('#txttotal').val()) == 0) {
        warningshow('Enter Valid Amount', '');
        $('#txtrate').select();
        return false;
    }
    else if ($('#hiddenitemId').val() == $('#ProductId0').val()) {
        warningshow('Production Item and Purchasing Item Cannot be same', 'ProductId0');
        $("#txtproduct0").val('');
        $("#txtquantity").val('');
        $("#txtrate").val('');
        return false;
    }


    else {
        if (rowcount == 0) {
            slno = 1;
        }
        if (ProductFlag == 1) {
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                ClearProductRow();
                return false;
            }
        }       
        var Count = $('#tblProduction tr').length;
        var serialNo = rowcount + 1;
        var qty= parseInt($('#txtquantity').val()) ;
        var ProdRow = "<tr  id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:102px;text-align:center >"
                 + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:230px;' ><input type='hidden' id='ProductId" + slno + "' value='" + $("#ProductId0").val() + "'/> <input type='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
                 + $("#txtproduct0").val() + "'></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:331px;text-align:center' display='none;'> <input type='text' class='form-control '  disabled  style='background-color:white;height:30px;' id='txtdesc" + slno + "' value='"
                 + $("#Description").val() + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:199px;text-align:center' display='none;'> <input type='text' class='form-control text-right'  disabled  style='background-color:white;height:30px;' onkeypress='isNumbercheck(event, this)' onkeyup='tot_row(" + slno + ")' id='txtrate" + slno + "' value='"
                + parseFloat($('#txtrate').val() || 0).toFixed(Decimal) + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:169px;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'  onkeypress='return isNumber1(event)' id='txtqnty" + slno + "' value='"
                + parseInt($('#txtquantity').val()) + "'><input type='hidden' id='hiddenqty" + slno + "' value='" + parseInt($('#hiddenquantitycheck').val()) + "'/><input type='hidden' id='balanceqty" + slno + "' value='" + 0 + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:169px;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;' onkeyup='tot_row(" + slno + ")'  onkeypress='isNumbercheck(event,this)'  id='usedqty" + slno + "' value="
                + parseInt($('#txtquantity').val()) + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:189px;' ><input typ='text' class='form-control text-right' disabled=disabled  style='background-color:white;height:30px;background-color:white'readonly onkeyup=''   id='tamnt" + slno + "' value="
                + parseFloat($('#txttotal').val() || 0).toFixed(Decimal) + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:189px;' ><input typ='text' class='form-control text-center' disabled=disabled  style='background-color:white;height:30px;background-color:white'readonly onkeyup=''   id='slnumber" + slno + "' value="
                + $('#select_slno').val() + "><input type='hidden' id='flag" + slno + "' value='" + 0 + "'/></td><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style= width: 120px; >&nbsp;<input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' id='Edit" + slno + "' type=button title=Edit >&nbsp;&nbsp;<button type='button' id='delete' title= Remove onclick='rowdelete(" + slno + ")'  class='badge badge-default round  btn-outline-danger' id='delete' style='font-weight:normal;' >Remove</button></td><td id='Update"
               + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title=Update style='' ><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'  ></td><td id='Removed"
                  + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:120px;display:none;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button'  title= Removed   class='badge badge-default round  btn-warning' id='delete' style='font-weight:normal;color:white;border:none;' disabled >Removed</button></td>";
        $('#tblProduction').append(ProdRow);
        i++;
        Getgrandtotal(slno);
        var cost = parseFloat($('#totalcost').val()) || 0;
        var amnt = parseFloat($('#tamnt' + slno).val()) || 0;
        var result = parseFloat(cost) + parseFloat(amnt);
        $('#totalcost').val(parseFloat(result).toFixed(Decimal));
        len = slno;
        productpopuprefresh();
        ClearProductRow();
        $('#txtproduct0').focus();    
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}

function Getgrandtotal(slno) {
    console.log(slno+'slon')
    var grandtot = 0;
    var cost = $('#totalcost').val();
    $('#grandtotal').val('');
    for (var i = 1; i <= slno; i++) {
        if ($('#flag' + i).val() != 2)
        {
        grandtot = grandtot + parseFloat($('#tamnt' + i).val() || 0);
        }
    }   
    $('#grandtotal').val(grandtot.toFixed(Decimal));
    var profitpercnt = 0;
    var cost = $('#totalcost').val();
    console.log(cost+'cost')
    if (cost != isNaN || cost !='0' )
    {
        var profit = $('#txtprice').val() - cost;
        console.log(profit)
        profitpercnt = parseFloat(profit / cost * 100);
        $('#Profit').val(profitpercnt.toFixed(Decimal));
    }
    if(cost == 0)
    {
        $('#Profit').val("0.00");
    }
   
}

function ClearProductRow() {
    $('#txtproduct0').val('');
    $('#ProductId0').val('');
    $('#select_slno').val('');
    $('#txtquantity').val('');
    $('#txtrate').val('');
    $('#ProductId').val('');
    $('#txttotal').val('');
    $('#select_unitProd').val('0');
    $('#hiddenquantitycheck').val('0');
}
function Editrow(RowId) {
    editflag = editflag + 1;
    $('#row' + RowId).children('td,th').css('background-color', 'rgb(232,226,226)');  
    $('#Edit' + RowId).hide();
    $('#Removed' + RowId).hide();
    $('#Update' + RowId).show();   
    qty = $('#usedqty' + RowId).val();
    rate = $('#txtrate' + RowId).val();    
    total = $('#tamnt' + RowId).val();
    $('#usedqty' + RowId).prop('disabled', false);
    $('#txtrate' + RowId).prop('disabled', false);
    $('#usedqty' + RowId).select();
    Getgrandtotal(len);
}
//update grid in main form
function Updaterow(RowId) {
    var c = parseFloat($('#rate' + RowId).val());
    $('#rate' + RowId).val(isNaN(c) ? 0 : c);
    if ($('#usedqty' + RowId).val() == '') {
        warningshow('Please Enter Used Quantity', 'txtqnty' + RowId);
        return false;
    }    
    else {
        editflag = editflag - 1;
        $('#row' + RowId).children('td,th').css('background-color', 'white');
        $('#Update' + RowId).hide();
        $('#Edit' + RowId).show();
        Getgrandtotal(len);
        var balqty = (qty - $('#usedqty' + RowId).val());
        $('#balanceqty' + RowId).val(balqty);
        //addsellprice(RowId,qty);
        $('#usedqty' + RowId).prop('disabled', true);
        $('#txtrate' + RowId).prop('disabled', true);
    }
}
//cancel editing gridrow in mainform

function CancelEditrow(RowId) {
    editflag = editflag - 1;
    $('#row' + RowId).children('td,th').css('background-color', 'white');
    $('#Update' + RowId).hide();
    $('#Edit' + RowId).show();   
    $('#usedqty' + RowId).val(qty);
    $('#txtrate' + RowId).val(rate);
    Getgrandtotal(len);
    $('#usedqty' + RowId).prop('disabled', true);
    $('#txtrate' + RowId).prop('disabled', true);
}
//finding total in mainform grid
function tot_row(RowId) {
    if (parseInt($('#usedqty' + RowId).val() || 0) > parseInt($('#hiddenqty' + RowId).val() || 0)) {
        warningshow(' Available Quantity Is' + $('#hiddenqty' + RowId).val(), 'usedqty' + RowId);
        $('#usedqty' + RowId).val($('#hiddenqty' + RowId).val())
        $('#usedqty' + RowId).val().select();
    }
    var qty = parseFloat($('#usedqty' + RowId).val() || 0);
    var rate = parseFloat($('#txtrate' + RowId).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var total = parseFloat(qty * rate).toFixed(Decimal);
  //  total = total.toFixed(Decimal)
    $('#tamnt' + RowId).val(total); 

}
//delete in main form grid
function rowdelete(RowId) {
    if ($('#txtrate' + RowId).val() == 0)
    {
        warningshow(' Cost Price Cannot Be Zero for ' + $('#txtprd' + RowId).val(), '');       
    }
    else {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#confirmmessage').text('Do you want to Remove?')
        $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);
    }
    
}
function ConfirmboxResult(Result, status, rowid) {  
    if (Result == 'true' && status == 'delete') {
        
         deleterow(rowid)      
    }
    else if (Result == 'true' && status == 'createnew') {
        formrefresh();
    } 
    else if (Result == 'true' && status == 'copy') {
        copyflag = 1;
       
            enablecopy();
        
    }
    $('#confirm').fadeOut();
}
function deleterow(RowId)
{
    if ($('#flag' + RowId).val() != 0)
    {
        $('#flag' + RowId).val(2);
        $('#usedqty' + RowId).val(0);        
        $('#row' + RowId).css('color', '#e65c00');
        $('#txtprd' + RowId).css("color", '#e65c00');
        $('#txtdesc' + RowId).css("color", '#e65c00');
        $('#txtrate' + RowId).css("color", '#e65c00');
        $('#txtqnty' + RowId).css("color", '#e65c00');
        $('#txtqnty' + RowId).css("color", '#e65c00');
        $('#usedqty' + RowId).css("color", '#e65c00');
        $('#slnumber' + RowId).css("color", '#e65c00');
        $('#tamnt' + RowId).css("color", '#e65c00');
        $('#confirm').fadeOut();
        calavg(RowId);
        tot_row(RowId);       
        Getgrandtotal(len);
        $('#txtproduct0').focus();
        $('#Edit' + RowId).hide();
        $('#Removed' + RowId).show();        
    }
    if($('#flag' + RowId).val() == 0)
    {
        calavg(RowId);
        $('#row' + RowId).remove();       
    }
}
function calavg(RowId)
{    
    var cost = parseFloat($('#totalcost').val()) || 0;   
    var amnt = parseFloat($('#tamnt' + RowId).val()) || 0;
    var result = parseFloat(cost) - parseFloat(amnt);
    $('#totalcost').val(parseFloat(result).toFixed(Decimal));
}
function checkpdcttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#ProductId0').val(0);
        $('#select_slno').val('');
        $('#txtrate').val('');
        $('#txtquantity').val('');
        $('#txttotal').val('');
        productpopuprefresh();
    }
}


function alertpopuprefresh(e) {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
}

function SaveAndUpdate(Flag) {   
    rowcount = $('#tblProduction tr').length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }    
    else if (($('#DebitAccount').val() != '') && ($('#hiddendebit').val() == 0)) {
        warningshow('Please Select A Valid Debit Account', 'DebitAccount');
        return false;
    }
    else if (($('#CreditAccount').val() != '') && ($('#hiddencredit').val() == 0)) {
        warningshow('Please Select A Valid Credit Account', 'CreditAccount');
        return false;
    }
    
    else if ($('#DebitAccount').val() == '') {
        warningshow('Please Select A  Debit Account', 'DebitAccount');
        return false;
    }
    else if ($('#CreditAccount').val() == "") {
        warningshow('Please Select A Credit Account', 'CreditAccount');
        return false;
    }
    
else if ($.trim($('#barcode').val()) == '') {

    warningshow('Please Scan The Item', 'barcode');
        return false;
}
else if ($("#hiddenitemId").val() == 0) {
    warningshow('Please Enter a Valid Code', '');
    $('#barcode').select();
    return false;
}
    else if ($.trim($('#txtQty').val()) == '') {

        warningshow('Please Enter Production  Quantity', 'txtQty');
        return false;
    }
  
    else if ($.trim($('#txtprice').val()) == '') {

        warningshow('Please Enter Selling Price', 'txtprice');
            return false;
        }    
    else if (rowcount == 0) {
        warningshow('No Products Added', 'txtproduct0');
        return false;
    }
  
    else if (parseFloat($('#sellingprice').val() || 0) <= parseFloat($('#totalcost').val() || 0)) {        
        warningshow('Selling Price Must Greater than Cost Price', 'sellingprice');
        return false;
    }
    else {
        $('#btnsubmit').prop("disabled", true);
        var oArray = new Array();
        for (var k = 1; k < rowcount+1; k++) {
            var MaterialId = $('#ProductId' + k).val();
            var MaterialCode = $('#txtprd' + k).val();
            var MaterialName = $('#txtdesc' + k).val();            
            var Quantity = $('#txtqnty' + k).val();
            var UsedQty = $('#usedqty' + k).val();
            var Total = $('#tamnt' + k).val();
            var MaterialSerialNo = $('#slnumber' + k).val();
            var MaterialCostPrice = $('#txtrate' + k).val();
            var ItemId = $('#hiddenitemId').val();
            var ItemCode = $('#barcode').val();
            var ItemName = $('#itemname').val();
            var DebitAccount = $('#hiddendebit').val();
            var CreditAccount = $('#hiddencredit').val();
            var SerialNo = $('#txtslno').val();
            var Unit = $('#select_unit').val();
            var SellPrice = $('#txtprice').val();
            var ProductionQuantity = $('#txtQty').val();
            var Profit = $('#Profit').val();
            var CostPrice = $('#totalcost').val();
            var SellingPrice = $('#sellingprice').val();
            var Date = $('#date').val();
            var UId = ERPUserId;
            var DeptId = ERPDeptId;
            var Location = UserLocationId;           
            var ProductionNo = $('#ProNo').val();           
            var flag = $('#flag' + k).val();
            var BalanceQty = $('#balanceqty' + k).val();
            if (typeof (MaterialName != null)) {
                oArray.push({
                    'MaterialId': MaterialId,
                    'MaterialCode': MaterialCode,
                    'MaterialName': MaterialName,                  
                    'Quantity': Quantity,
                    'UsedQty': UsedQty,
                    'Total': Total,
                    'MaterialSerialNo': MaterialSerialNo,
                    'ItemId': ItemId,
                    'ItemCode': ItemCode,
                    'ItemName': ItemName,
                    'DebitAccount': DebitAccount,
                    'CreditAccount': CreditAccount,
                    'SerialNo': SerialNo,
                    'Unit': Unit,
                    'SellPrice': SellPrice,
                    'ProductionQuantity': ProductionQuantity,
                    'Profit': Profit,
                    'CostPrice': CostPrice,
                    'SellingPrice': SellingPrice,
                    'Date':Date,
                    'UId': UId,
                    'DeptId': DeptId,
                    'Location': Location,
                    'ProductionNo': ProductionNo,
                    'MaterialCostPrice': MaterialCostPrice,
                    'flag': flag,
                    'BalanceQty': BalanceQty
                })
            }
        }
        if (oArray != "") {
            var data = { 'electronicproductionInsertModel': oArray };
            $.ajax({
                type: "POST",
                url: "../../Production/ElectronicProductionInsertandUpdate",
                data: data,
                success: function (result) {
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var Billno = result.oList[i].ProductionNo;
                        $('#btnsubmit').prop("disabled", false);
                        if (status != 0) {
                            Showalerts(status, Billno);
                        }
                        else {
                            $('#tblAlert tr').remove();
                            $('#alertpopup').show();
                            $('#alertdiv').show();
                            var Prod1 = "<tr class='jsgrid-row'><td colspan=4><h2 style='color:#FF586B'>Not enough quantity on Stock!</h2></td></tr>" +
                                 "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</th></tr>";
                            $('#tblAlert').append(Prod1);
                            for (var i = 0; i <= result.oList.length; i++) {
                                var Prod =                                     
                                "<tr class='jsgrid-row'>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ItemCode + "</td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ItemName + "</td>" +
                                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Quantity + "</td></tr>";
                                $('#tblAlert').append(Prod);
                                $('#btntermssave').focus();                              
                            }
                        }
                    }
                }
            });
        }
    }
}

//show alerts
function Showalerts(status, pronum) {
    if (status == 1) {
        swal('Production  Number: ' + pronum, " Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
}
function formrefresh()
{
    $('#tblProduction tr')

    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }
    else {
        copyflag = 0;
        var a = "0.00";
        $('#DebitAccount').val('');
        $('#CreditAccount').val('');
        $('#ProdLocation').val('');
        $('#txtQty').val(1);
        $('#Profit').val(a);
        $('#totalcost').val(a);
        $('#sellingprice').val(a);
        $('#grandtotal').val(a);
        $('#hiddenitemId').val('');
        $('#barcode').val('');
        $('#txtprice').val(''); 
        $('#select_unit').val(0);
        $('#txtslno').val('');
        $('#txtproduct0').val('');
        $('#itemname').val('');
        $('#txtQty').val(1);
        serialnoload();
        AccountLoad(2);
        $("#tblProduction tr").remove();       
        $('#btnsubmit').show();     
        $('#barcode').focus();
        $('#btnprint').hide();
        $('#btnlist').show();
        $('#btnadditem').prop('disabled', false);
        $('#btnadd').prop('disabled', false);
        $('#itemadd').prop('disabled', false);
        $('.form-control').prop("disabled", false);
    }
}

function enablenobox() {
    var rowcount = document.getElementById('tblProduction').rows.length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
        return false;
    }
    else if (rowcount > 0) {
        $('#Confirmflag').val('copy'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').focus();
    }
    else if (rowcount == 0) {
        enablecopy();
    }
}
function enablecopy() {
    copyflag = 1;         
    $('#btnsubmit').hide();
    $('#btnlist').hide();   
    $("#tblProduction tr").remove();
    $('.form-control').prop("disabled", true);
    $('#ProNo').prop('disabled', false);
    $('#btnadditem').prop('disabled', true);
    $('#btnadd').prop('disabled', true);
    $('#txtDacnt').prop('disabled', true);
    $('#txtCacnt').prop('disabled', true);    
    $('#itemadd').prop('disabled', true);  
   // $('#btnprint').show();
    var a = '0.00';
    $('#GrandTotal').val(a);
    $('#ProNo').select();
}
//copy grid
function ProductionEntryGet(result) {
     i = 1;
    for (var a = 0; a < result.length; a++) {
        var slno = parseInt(i);
        if (result[a].UsedQty != 0)
        {
              var ProdRow = "<tr  id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style='width:102px;text-align:center'>"
                + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:230px;' ><input type='hidden' id='ProductId" + slno + "' value='" + 0 + "'/> <input type='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
                + result[a].MaterialCode + "'></td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:331px;text-align:center' display='none;'> <input type='text' class='form-control '  disabled  style='background-color:white;height:30px;' id='txtdesc" + slno + "' value='"
                + result[a].MaterialName + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:199px;text-align:center' display='none;'> <input type='text' class='form-control text-right'  disabled  style='background-color:white;height:30px;' onkeyup='tot_row(" + slno + ")' id='txtrate" + slno + "' value='"
               + (result[a].MaterialCostPrice).toFixed(Decimal) + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:169px;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'  onkeypress='return isNumber1(event)' id='txtqnty" + slno + "' value='"
               + result[a].Quantity + "'><input type='hidden' id='hiddenqty" + slno + "' value='" + 0 + "'/> </td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:169px;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;' onkeyup='tot_row(" + slno + ")'  onkeypress='isNumbercheck(event,this)'  id='usedqty" + slno + "' value="
               + result[a].UsedQty + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:189px;' ><input typ='text' class='form-control text-right' disabled=disabled  style='background-color:white;height:30px;background-color:white'readonly onkeyup=''   id='tamnt" + slno + "' value="
               + (result[a].Total).toFixed(Decimal) + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:189px;' ><input typ='text' class='form-control text-center' disabled=disabled  style='background-color:white;height:30px;background-color:white'readonly onkeyup=''   id='slnumber" + slno + "' value="
               + result[a].MaterialSerialNo + "><input type='hidden' id='flag" + slno + "' value='" + 0 + "'/></td><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left' disabled style='width: 120px;'>&nbsp;<input class= 'jsgrid-button jsgrid-edit-button'  disabled onclick='Editrow(" + slno + ")' id='Edit' type=button  >&nbsp;&nbsp;<button type='button' id='delete'  disabled  onclick='rowdelete(" + slno + ")'  class='badge badge-default round  btn-outline-danger' id='delete' style='font-weight:normal;' >Remove</button></td><td id='Update"
                 + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title=Update  ><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'  ></td>";
        $('#tblProduction').append(ProdRow);      
        i++;
        }
        if(result[a].UsedQty ==0)
        {
            var ProdRow = "<tr  id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style='width:102px;text-align:center;color:#e65c00;' >"
                + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:230px;' ><input type='hidden' id='ProductId" + slno + "' value='" + 0 + "'/> <input type='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;color:#e65c00;' id='txtprd" + slno + "' value='"
                + result[a].MaterialCode + "'></td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:331px;text-align:center' display='none;'> <input type='text' class='form-control '  disabled  style='background-color:white;height:30px;color:#e65c00;' id='txtdesc" + slno + "' value='"
                + result[a].MaterialName + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:199px;text-align:center' display='none;'> <input type='text' class='form-control text-right'  disabled  style='background-color:white;height:30px;color:#e65c00;' onkeyup='tot_row(" + slno + ")' id='txtrate" + slno + "' value='"
               + (result[a].MaterialCostPrice).toFixed(Decimal) + "'> </td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:169px;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;color:#e65c00;'  onkeypress='return isNumber1(event)' id='txtqnty" + slno + "' value='"
               + result[a].Quantity + "'><input type='hidden' id='hiddenqty" + slno + "' value='" + 0 + "'/> </td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:169px;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;color:#e65c00;' onkeyup='tot_row(" + slno + ")'  onkeypress='isNumbercheck(event,this)'  id='usedqty" + slno + "' value="
               + result[a].UsedQty + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:189px;' ><input typ='text' class='form-control text-right' disabled=disabled  style='background-color:white;height:30px;background-color:white;color:#e65c00;'readonly onkeyup=''   id='tamnt" + slno + "' value="
               + (result[a].Total).toFixed(Decimal) + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:189px;' ><input typ='text' class='form-control text-center' disabled=disabled  style='background-color:white;height:30px;background-color:white;color:#e65c00;'readonly onkeyup=''   id='slnumber" + slno + "' value="
               + result[a].MaterialSerialNo + "><input type='hidden' id='flag" + slno + "' value='" + 0 + "'/></td><td id='Removed"
                  + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:120px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button'  title= Removed   class='badge badge-default round  btn-warning' id='delete' style='font-weight:normal;color:white;border:none;' disabled >Removed</button></td></td>";
            $('#tblProduction').append(ProdRow);
            i++;
        }
    }
}

function createnew() {
    if (editflag != 0) {
        warningshow('You Are In Edit Mode');
    }
    else {
        var rowcount = document.getElementById('tblProduction').rows.length;
        if (rowcount > 0 && copyflag == 0) {
            $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
            $('#confirm').show();
            $('#confirmOk').focus();
        }
        else {
            formrefresh();            
        }
    }
}
function checkCredittAccounttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddencredit').val(0);
        $('#txtCacnt').val('');
    }
}
function checkDebitAccounttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#hiddendebit').val(0);
        $('#txtDacnt').val('');
    }
}
function checkbarcodeempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {       
        $('#itemname').val('');
        cleartext();
    }
    else if(charCode == 13)
    {
        if(  $('#hiddenitemId').val()==0)
        {
            warningshow('Press Enter For Creating New Item', 'btnadditem');
        }
    }
}
function checkitemcodeempty(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13) {
        $('#barcode').val('');
        cleartext();
    }
    else if (charCode == 13) {
        if ($('#hiddenitemId').val() == 0) {
            warningshow('Press Enter For Creating New Item', 'btnadditem');
        }
    }
}
function cleartext()
{
    $('#txtQty').val('');
    $('#Profit').val(a);
    $('#totalcost').val(a);
    $('#sellingprice').val(a);
    $('#grandtotal').val(a);
    $('#hiddenitemId').val('');
    $('#txtprice').val('');
    $('#select_unit').val(0);
    $('#txtslno').val('');
    $("#tblProduction tr").remove();
}
$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S
        SaveAndUpdate(1)
    }
    else if (e.altKey && e.keyCode == 76) {                 //Alt+L        
        enablenobox();
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        createnew();
    }
    else if (e.keyCode == 27) {                           //esc
        productpopuprefresh();
    }
});