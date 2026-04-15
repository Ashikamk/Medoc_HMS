//var Decimal = 3;
var Decimal = Decimal;
$(document).ready(function () {
    $('#newsellprice1').focus();
    PricemanagergetProduct();

    formrefresh();
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });
    $('#newsellprice1').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Npercent1').select();
        }
    });
    $('#Npercent1').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#newsellprice2').select();
        }
    });
    $('#newsellprice2').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Npercent2').select();
        }
    });
    $('#Npercent2').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#newsellprice3').select();
        }
    });
    $('#newsellprice3').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Npercent3').select();
        }
    });

   
    $('#Npercent3').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }
    });



});



    //purchase Invoice copy read from query string

if (getQueryString('SlNo') != null) {
    $('#copypurchaseinvo').val(getQueryString('SlNo'))
    var data = {};
   // data.InvoNo = getQueryString('SlNo');
    data.SlNo = ui.item.SlNo;
    data.DepartmentId = ui.item.ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseInvoiceGetandGets",
        data: data,
        success: function (result) {
            PurchaseGets(result.oList);
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
else {
    Defaultfocus();
    serialnoload();
}


//load item in Main table
function PricemanagergetProduct()
{
    var pricelist = {};
    pricelist.DeptId = ERPDeptId;
    pricelist.Location = UserLocationId;
    $.ajax({
        type: "POST",
        url: "../../inventory/PriceManagerListItem",
        data: pricelist,
        success: function (result) {
            getProduct(result.oList);
        }
    });
}
var View = '<i class="ft-eye"></i>';
function getProduct(result) {
    //var responseText = "<thead><tr style=background-color:#ebebe0> <th>SlNo</th><th>ItemCode</th><th>Group</th><th>Catogory</th><th>Unit</th><th>Description</th><th>Available Qty</th><th>Last Purchase Qty</th></tr></thead><tbody>";
    var responseText = "";
    if (result.length!= 0)
    {
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);
            responseText += '<tr style=background-color:white  id=' + 'row' + slno + '   onclick="GetItem(' + result[l].ItemId + '),fillcolor(' + slno + ') "><td style="width:4.7%;text-align:center;">' + slno + '</td><td style="width:13.7%;">' + result[l].ItemCode + '</td><td style=width:7%;display:none;><input type="text" style="width:95px;" id= ' + 'ItemId' + slno + ' value= ' + result[l].ItemId + '></td><td style="width:9.8%;">' +
                 result[l].GroupName + '</td><td style="width:9.6%;">' + result[l].CatogoryName +
                '</td><td style="width:9.7%;">' + result[l].UnitName + '</td><td style="width:19.6%;">' + result[l].Description + '</td><td style="text-align:center;width:10%;"">' + result[l].totQty +
                '</td><td style="text-align:center;width:9.7%;"">' + result[l].PurchaseQty + '</td></tr>';
        }
        $('#RowGet1').val(result.length);
    }
    else {
        var responseText = '<tr><td style="width:1000px;text-align:center">No Products For Price Updation<td><tr>';
    }
    $('#PriceManagerList').html(responseText + '</tbody>');
    $('#div1').animate({ scrollTop: 0 });

}


    //var i = 1;
    //for (var m = 0; m <= result.length; m++) {
    //    var slno = parseInt(i);
    //    var ProdRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td  id=" + 'row' + slno + " class= jsgrid-cell  style= width:100px;text-align:center >"
    //      + slno +" </td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:380px;text-align:center' display='none;'> <input type='text' class='form-control text-center'  disabled  style='background-color:white;height:30px;border:none;' id='txtdesc" + slno + "' value='"
    //      + result[m].ItemCode + "'> </td><td class= jsgrid-cell jsgrid-align-center  style='width:214px;' text-align-center><input type='text' class='form-control text-center'  disabled  style='background-color:white;height:30px;border:none;' id='txtdesc" + slno + "' value='"
    //      + result[m].UnitName + "'> </td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:173px;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:none;'  id='txtqnty" + slno + "' value='"
    //      + result[m].CatogoryName + "'> </td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:380px;text-align:center' display='none;'> <input type='text' class='form-control text-center'  disabled  style='background-color:white;height:30px;border:none;' id='txtdesc" + slno + "' value='"
    //      + result[m].Description + "'> </td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:179px;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;border:none;'   id='rate" + slno + "' value="
    //      + result[m].totQty + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:185px;' ><input typ='text' class='form-control text-center' disabled=disabled  style='background-color:white;height:30px;background-color:white;border:none;'readonly onkeyup=''   id='tamnt" + slno + "' value="
    //      + result[m].PurchaseQty + "></td></tr>";
    //    $('#PriceManagerList').append(ProdRow);
    //    i++;
    //}

function fillcolor(slno)
{
    var prevId = $('#rowid').val();
    $('#row' + prevId).css("background-color", 'white');
    $('#rowid').val(slno);
    $('#row' + slno).css("background-color", '#d4f7f6');
}
function GetItem(ItemId) {
    $('#hiddenItemId').val(ItemId)
    var data = {};
    data.ItemId = ItemId;
    data.DeptId = ERPDeptId;
    data.Location = UserLocationId;
    $.ajax({
        type: "POST",
        url: "../inventory/PriceManagerItemGetandGets",
        data: data,
        success: function (result) {
            if (result.length != 0)
            {
                ShowItemlist(result.oList);
            }
                data.ItemId = ItemId;
                data.DeptId = ERPDeptId;
                data.Location = UserLocationId;
                $.ajax({
                    type: "POST",
                    url: "../inventory/PriceManagerPriceGetandGets",
                    data: data,
                    success: function (result) {
                        ShowPricelist(result.oList);
                    }                    
                });
        }
    });
}
function ShowItemlist(result) {
    var responseText = "<thead><tr> <th style='width:12%;'>PInv No</th> <th style='width:10%;'>Bill No</th><th style='width:11%;'>Date</th><th style='width:20%;'>Account Name</th><th style='width:20%;'>Account No</th><th style='width:11%;'>Qty</th><th style='width:13%;'>Cost</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr onclick=gotoInvoNo(' + result[l].BillNo + ')><td style="width:12%;">' + result[l].InvoiceNo + '</td><td style="width:10%;">' + result[l].BillNo + '</td><td style=width:11%;">' + result[l].InvoiceDate + '</td><td style=display:none;><input type="text" id= ' + 'ItemId' + slno + ' value= ' + result[l].ItemId + '></td><td style="width:20%;">' +
             result[l].CustName + '</td><td style="width:20%;">' + result[l].CustAccount +
            '</td><td style="width:11%;">' + result[l].Quantity + '</td><td style="width:13%;">' + result[l].Rate + '</td></tr>';
    }
    $('#PriceManager').html(responseText + '</tbody>');
    $('#RowGet2').val(result.length)
}

function gotoInvoNo(BillNo) {
    window.open('../inventory/PurchaseInvoice?SlNo=' + BillNo);   
    }
function ShowPricelist(result)
{
    $('#prevcostprice').val(result[0].Prev_LPCost);
    $('#newcostprice').val(result[0].LPCost);    
    $('#prevsellprice1').val(result[0].SellingPrice);
    $('#newsellprice1').val(result[0].SellingPrice);   
    $('#prevsellprice2').val(result[0].SellingPrice_1);
    $('#newsellprice2').val(result[0].SellingPrice_1);
    $('#prevsellprice3').val(result[0].SellingPrice_2);
    $('#newsellprice3').val(result[0].SellingPrice_2);
       // $('#multiprice' + i).val(result[l].MultipriceId);           
    clearpercent();
    pricepercentagePrev();
    percentagenew1();
    percentagenew2(); percentagenew3(); $('#newsellprice1').focus();
}

function SaveAndUpdate(Flag) {
    //Submit Button Click Event  
     if ($('#newcostprice').val() == "") {
        warningshow('Please Select Any Product');
        }
        else {
            $('#btnsubmit').prop("disabled", true);
            var ItemId;var Price1;var Price2;var Price3; var multipriceId1;var multipriceId2;var multipriceId3;
                var data = {};   //array
               // data.Id = $('#Id').val();;
                data.ItemId = $('#hiddenItemId').val();                
                data.Price1 = parseFloat($('#newsellprice1').val()).toFixed(Decimal);  //update in item master selling price
                data.Price2 = parseFloat($('#newsellprice2').val()).toFixed(Decimal); //update in multiprice with multipriceId2
                data.Price3 = parseFloat($('#newsellprice3').val()).toFixed(Decimal); //update in multiprice with multipriceId3
              //  data.multipriceId1 = $('#multiprice1').val();               
                data.Oldcostprice = $('#prevcostprice').val();
                data.Newcostprice = $('#newcostprice').val();
                data.Oldsellprice = $('#prevsellprice1').val();                             //selling price item master
                data.oldmultiprice1 = $('#prevsellprice2').val();                           //multiprice 
                data.oldmultiprice2 = $('#prevsellprice3').val();                           //multiprice
                data.Location = UserLocationId;
                data.DeptId = ERPDeptId;
                data.UserId = ERPUserId;
                data.DelFlag = Flag;

                $.ajax({
                    type: "POST",
                    url: "../inventory/PriceManagementInsertandUpdate",
                    data: data,
                    success: function (result) {
                        for (var i = 0; i <= result.oList.length; i++) {
                            var status = result.oList[i].Status;
                            var Description = result.oList[i].Description;
                            $('#btnsubmit').prop("disabled", false);
                            Showalerts(status, Description);
                            //formrefresh();                           
                        }
                    }
                });
            }
        }
    
function Showalerts(Status, Description) {
    if (Status == 1) {
        swal('Product: ' + Description, " Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
}
function formrefresh() {          
        $('#prevsellprice1').val('');
        $('#prevsellprice2').val('');
        $('#prevsellprice3').val('');
        $('#newsellprice1').val('');
        $('#newsellprice2').val('');
        $('#prevcostprice').val('');
        $('#newcostprice').val('');
        $('#newsellprice3').val('');
        $('#hiddenItemId').val('');       
        $('#newsellprice1').focus();
        PricemanagergetProduct();
        clearpercent();        
        var rowcount = document.getElementById('PriceManager').rows.length;
        if(rowcount>1)
        { $("#PriceManager tbody tr").remove(); }
}
function clearpercent()
{
 $('#Ppercent1').val('');
    $('#Ppercent2').val('');
    $('#Ppercent3').val('');
    $('#Npercent1').val('');
    $('#Npercent2').val('');
    $('#Npercent3').val('');
}
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'createnew') {
        formrefresh();
    }   
    $('#confirm').fadeOut();
}
function createnew() {    
        if ($('#newcostprice').val()!='') {
            $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
            $('#confirm').show();
            $('#confirmOk').focus();
        }
        else {
            formrefresh();
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

//find previos cost percentage
function pricepercentagePrev()
{
    var Pcostprice = parseFloat($('#prevcostprice').val() || 0);
    var psellprice1 = parseFloat($('#prevsellprice1').val() || 0);
    var psellprice2 = parseFloat($('#prevsellprice2').val() || 0);
    var psellprice3 = parseFloat($('#prevsellprice3').val() || 0);
    var a="0.00"
    if (Pcostprice != 0)
    {
        if (psellprice1 != 0) {
            var persent1 = parseFloat((psellprice1 - Pcostprice) * 100) / Pcostprice;
        } else { persent1 = a;}
        if (psellprice2 != 0) {
            var persent2 = parseFloat((psellprice2 - Pcostprice) * 100) / Pcostprice;
        } else { persent2 = a; }
        if (psellprice3 != 0) {
            var persent3 = parseFloat((psellprice3 - Pcostprice) * 100) / Pcostprice;
        } else { persent3 = a; }
        $('#Ppercent1').val(persent1);
        $('#Ppercent2').val(persent2);
        $('#Ppercent3').val(persent3);
    }
    else if(Pcostprice == 0 )
    {
        $('#Ppercent1').val(a);
        $('#Ppercent2').val(a);
        $('#Ppercent3').val(a);
    }
    
}
//selling price1 -new
function sellingpriceNew1() {
    var Ncostprice = parseFloat($('#newcostprice').val() || 0);
    var newpercent1 = parseFloat($('#Npercent1').val());    
    var Price1 = 0;   
     if (newpercent1 != '' && newpercent1 != 0) 
     {
         Price1 = parseFloat((newpercent1 / 100) * Ncostprice) + Ncostprice;
     }
     else if (newpercent1 == '' && newpercent1 == 0)
     {
         Price1 = Ncostprice;
     }
     $("#newsellprice1").val(parseFloat(Price1).toFixed(Decimal));
     if (isNaN(newpercent1)) {
         $('#newsellprice1').val($('#prevsellprice1').val());
     }
}
//selling price2 -new
function sellingpriceNew2() {
    var Ncostprice = parseFloat($('#newcostprice').val() || 0);
    var newpercent2 = parseFloat($('#Npercent2').val());    
    var Price2 = 0;
    if (newpercent2 != '' && newpercent2 != 0) {
        Price2 = parseFloat((newpercent2 / 100) * Ncostprice) + Ncostprice;
    } else if (newpercent2 == 0) {
        Price2 = Ncostprice;
    }
    $("#newsellprice2").val(parseFloat(Price2).toFixed(Decimal));
    if (isNaN(newpercent2)) {
        $('#newsellprice2').val($('#prevsellprice2').val());
    }
    
}
//selling price3 -new
function sellingpriceNew3() {
    var Ncostprice = parseFloat($('#newcostprice').val() || 0);
    var newpercent3 = parseFloat($('#Npercent3').val());
    var Price3 = 0;
    if (newpercent3 != '' && newpercent3 != 0) {     
        Price3 = parseFloat((newpercent3 * Ncostprice) / 100) + Ncostprice;

    } else if (newpercent3 == 0) {

        Price3 = Ncostprice;
    }
    else if(newpercent3 == '' && newpercent3 == 0){ alert('')}
    $("#newsellprice3").val(parseFloat(Price3).toFixed(Decimal));
    if (isNaN(newpercent3)) {
        $('#newsellprice3').val($('#prevsellprice3').val());
    }
}
//percantge1-new
function percentagenew1() {
    var Ncostprice = parseFloat($('#newcostprice').val() || 0);
    var    Nsellprice1 = parseFloat($('#newsellprice1').val() || 0);
    var a = "0.00"
    if (Ncostprice != 0) {
        if (Nsellprice1 != 0) {
            var persent1 = parseFloat((Nsellprice1 - Ncostprice) * 100) / Ncostprice;
        } else { persent1 = a; }
        $('#Npercent1').val(parseFloat(persent1).toFixed(Decimal));
    }
}
//percantge2-new
function percentagenew2() {
    var Ncostprice = parseFloat($('#newcostprice').val() || 0);
    var Nsellprice2 = parseFloat($('#newsellprice2').val() || 0);
    var a = "0.00"
    if (Ncostprice != 0) {
        if (Nsellprice2 != 0) {
            var persent2 = parseFloat((Nsellprice2 - Ncostprice) * 100) / Ncostprice;
        } else { persent2 = a; }
        $('#Npercent2').val(parseFloat(persent2).toFixed(Decimal));
    }
}
//percantge3-new
function percentagenew3() {
    var Ncostprice = parseFloat($('#newcostprice').val() || 0);
    var Nsellprice3 = parseFloat($('#newsellprice3').val() || 0);
    var a = "0.00"
    if (Ncostprice != 0) {
        if (Nsellprice3 != 0) {
            var persent3 = parseFloat((Nsellprice3 - Ncostprice) * 100) / Ncostprice;
        } else { persent3 = a; }
        $('#Npercent3').val(parseFloat(persent3).toFixed(Decimal));
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

