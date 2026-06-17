var AccId = 2; var SuppId = 2; var Result = 0;  var MultiUnitLength = 0;    var Decimal = Decimal;
$(document).ready(function () {

    UnitpageLoad();
    GroupPageLoad();
    CategoryPageLoad();
    VatPageLoad();
    MultiPriceGet();

    $('#code').focus();
    //generatebarcode();
    $("#vatcode").change(function () {
        var selectedValue = $(this).val();
        $("#vatper").val($(this).find("option:selected").attr("name"))

    });
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)

    });
    $("#btndelete").click(function (e) {
        SaveAndUpdate(0)

    });
});

function UnitpageLoad() {
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



function GroupPageLoad() {
    var data1 = {};
    data1.GrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/GroupGetandGets",
        data: data1,
        success: function (result) {
            GroupLoad(result.oList);
        }
    });
}



function CategoryPageLoad() {
    var data2 = {};
    data2.CategoryId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CategoryGetandGets",
        data: data2,
        success: function (result) {
            CategoryLoad(result.oList);
        }
    });
}



function VatPageLoad() {
    var data3 = {};
    data3.VatId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TaxGetandGets",
        data: data3,
        success: function (result) {
            VatLoad(result.oList);
        }
    });
}

function MultiPriceGet() {
    var data = {};
    data.MultiPriceId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/MultiPriceGetandGets",
        data: data,
        success: function (result) {
            MultiPriceLoad(result.oList);
        }
    });
}



function MultiPriceLoad(result) {
    MultiUnitLength = result.length;
    for (var i = 0; i < result.length; i++) {
        var Id = +i + 1;
        $("#dd").append("<div class=row id=multiprice><div class=col-md-4> <div class=form-group><label>" + result[i].PriceType + "</label><input type=hidden id=" + "MultiPriceId_" + Id + "></div></div><div class=col-md-3><div class=form-group><input class=form-control onkeypress=isNumberInt(event,this)  type=text id=" + "noPices_" + Id + " value=1  placeholder=Qty></div></div><div class=col-md-3><div class=form-group>  <input class=form-control onkeypress=isNumber(event,this) type=text id=" + "Price_" + Id + " placeholder=Rate autocomplete=off></div></div><div class=form-group col-sm-12 col-md-3 text-center mt-2 style=padding-left:20px;><button type=button id=" + "Button_" + Id + " onclick=MultiPricedelete(" + Id + ") class='btn btn-danger'><i class=ft-x></i>Clear</button></div></div>");
        $("#MultiPriceId_" + Id).val(result[i].MultiPriceId);
    }
}

function UnitLoad(result) {
    var data = '<option value=0>Select Unit</option>';
    $("#unit").empty();
    $("#unit").append("<option value='0'>---Select Unit---</option>");
    for (var i = 0; i < result.length; i++) {
        $("#unit").append("<option value='" + result[i].UnitId + "'>" + result[i].UnitName + "</option>");
        data += "<option value='" + result[i].UnitId + "'>" + result[i].UnitName + "</option>"
    }
    for (var i = 1; i <= 5; i++) {
        $("#unit_" + i).empty();
        $("#unit_" + i).append(data);
    }
}



function GroupLoad(result) {
    $("#group").empty();
    $("#group").append("<option value='0'>---Select Group---</option>");
    for (var i = 0; i < result.length; i++) {

        $("#group").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }
    $("#grp").empty();
    $("#grp").append("<option value='0'>----Select Group----</option>");
    for (var i = 0; i < result.length; i++) {

        $("#grp").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }
}



function CategoryLoad(result) {
    $("#category").empty();
    $("#category").append("<option value='0'>---Select Category---</option>");
    for (var i = 0; i < result.length; i++) {

        $("#category").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
    $("#cat").empty();
    $("#cat").append("<option value='0'>---Select Category---</option>");
    for (var i = 0; i < result.length; i++) {

        $("#cat").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
}



function VatLoad(result) {
    $("#vatcode").empty();
    $("#vatcode").append("<option value='0'>Select VAT</option>");
    for (var i = 0; i < result.length; i++) {

        $("#vatcode").append("<option value='" + result[i].TaxId + "' name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>");
    }
}
function SubCategoryGets() {
    var data = {};
    data.CategoryId = $("#category").val();
    data.SubCategoryId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SubCategoryGetforCategory",
        data: data,
        success: function (result) {
            SubCategoryLoad(result.oList);
        }
    });
}

function SubCategoryLoad(result) {
    $("#sbcat").empty();
    $("#sbcat").append("<option value='0'>---Select Sub Category---</option>");
    for (var i = 0; i < result.length; i++) {
        $("#sbcat").append("<option value='" + result[i].SubCategoryId + "'>" + result[i].SubCategoryName + "</option>");
    }
}

function SubGroupGets() {
    var data = {};
    data.GroupId = $("#group").val();
    data.SubGroupId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SubGroupGetforGroup",
        data: data,
        success: function (result) {
            SubGroupLoad(result.oList);
        }
    });
}
function SubGroupLoad(result) {

    $("#sbgroup").empty();
    $("#sbgroup").append("<option value='0'>---Select Sub Group---</option>");
    for (var i = 0; i < result.length; i++) {
        $("#sbgroup").append("<option value='" + result[i].SbgrpId + "'>" + result[i].SbgrpName + "</option>");
    }

}

function Addbtnshow(Flag) {
    $('#btnadd').show();
    var no = $('#slno').val();

    $('#slno').val(+no - 1)
    if (Flag == 1) {
        $('#1').hide();
        $('#unit_2').val(0);
        $('#fraction_2').val('');
        $('#unitpric_2').val('');


    }
    if (Flag == 2) {
        $('#2').hide();
        $('#unit_3').val(0);
        $('#fraction_3').val('');
        $('#unitpric_3').val('');

    }
    if (Flag == 3) {
        $('#3').hide();
        $('#unit_4').val(0);
        $('#fraction_4').val('');
        $('#unitpric_4').val('');

    }
    if (Flag == 4) {
        $('#4').hide();
        $('#unit_5').val(0);
        $('#fraction_5').val('');
        $('#unitpric_5').val('');

    }

}
function addnew() {
    var no = parseInt($('#slno').val()) + 1;

    for (var i = 1; i <= 4; i++) {

        var isVisible = $('#' + i).is(':visible');
        if (isVisible == false) {
            $('#' + i).show("fast");
            $('#slno').val(no)
            if (no == 4) {
                $('#btnadd').hide();
            }
            break;
        }
    }
}

function addaccessories() {

    $('#Accessdiv').append("<div class='form-group row'><div class='col-md-7'><input type='hidden' class='form-control' id='Accsessories_" + AccId + "_Id' value='0' /><input type='text' class='form-control' id='Accsessories_" + AccId + "' onkeypress=AccessoriesLoad('Accsessories_" + AccId + "') onkeyup=CheckID('Accsessories_" + AccId + "') /></div><div class='col-md-3'><input type='text' onkeypress='isNumberInt(event,this)' class='form-control' id='Qty_" + AccId + "' value='1' /></div></div>")
    AccId++;
}

function AddSupplier() {
    $('#SupplierDiv').append("<div class='form-group row'><div class='col-md-7'><input type='text' class='form-control' id='Supplier_" + SuppId + "' onkeypress=LoadSupplier('Supplier_" + SuppId + "') onkeyup=CheckID('Supplier_" + SuppId + "') /><input type='hidden' class='form-control' id='Supplier_" + SuppId + "_Id' value='0' /></div></div>")
    SuppId++;
}

function CheckID(Id) {
    if($('#'+Id).val()==''){
        $('#'+Id+'_Id').val(0);       
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









function confirmOk() {
    $('#confirm').hide();
    SaveAndUpdate(0)
}


function fousnextbutton(e,id)
{
    var x = e.which || e.keyCode;
    if (x == 13) {
        $(id).focus();
    }
}




function Addpopupwindow(Id) {
    $('#groupdiv,#subgroupdiv,#categorydiv,#subcatdiv,#unitdiv,#Multiimage,#openingentry').hide();
    $('#popupdiv').show();

    console.log(Id)

    if (Id == 0) {
        $('#myheader').text('Unit Master');
        $('#unitdiv').show();
        $('#unitname').focus();

    }
    else if (Id == 1) {
        $('#myheader').text('Group Master');
        $('#groupdiv').show();
        $('#groupcode').focus();
    }
    else if (Id == 2) {
        $('#myheader').text('Sub Group Master');
        $('#subgroupdiv').show();
        $('#grp').focus();
    }
    else if (Id == 3) {
        $('#myheader').text('Category Master');
        $('#categorydiv').show();
        $('#catcode').focus();
    }
    else if (Id == 4) {
        $('#myheader').text('Sub Category Master');
        $('#subcatdiv').show();
        $('#cat').focus();
    }
    else if (Id == 5) {       
        $('#myheader').text('Opening Qty Entry');
        $('#openingentry').show();
        LocationGets()
    }

    else if (Id == 6) {
        $('#myheader').text('Add More Images');
        $('#Multiimage').show();
        
    }
    else {
        console.log('Invalid')

    }
}


function LocationGets()
{
    var data = {};
    data.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            ShowLocationlist(result.oList)
        }
    });
}



function ShowLocationlist(result) {
    var responseText = '';
    if ($('#NoOfLocations').val() == 0) {

        for (var i = 0; i < result.length; i++) {
            responseText += '<div class="form-group row" style="border-bottom:1px solid #f2f2f2;height:40px"><label class="col-md-9" for="code">' + result[i].LocationName + '</label><div class="col-md-3" style="margin-top:-10px"><input type=hidden id=' + "locID" + i + ' value=' + result[i].LocationId + '><input class="form-control" type="text" id=' + "lqty" + result[i].LocationId + ' value="0" onkeypress="isNumberInt(event,this)"  autocomplete="off"></div></div>'
        }
        $('#NoOfLocations').val(result.length);
        $('#divopenig').html('')
        $('#divopenig').append(responseText);
    }
  
}



function SaveAndUpdate(Flag) {
    if ($.trim($('#code').val()) == "") {
        warningshow('Please Enter Item Code', 'code');
    }
    else if ($('#description').val() == "") {
        warningshow('Please Enter Description', 'description');
    }
    else if ($('#unit').val() == 0) {
        warningshow('Please Select Unit', 'unit');
    }
    else if ($('#group').val() == 0) {
        warningshow('Please Select Group', 'group');
    }
    else if ($('#vatcode').val() == 0) {
        warningshow('Please Select VAT Code', 'vatcode');
    }
    else if (parseInt($('#opqty').val() || 0) > 0 && parseFloat($('#opcost').val() || 0) == 0) {
        warningshow('Please Enter Opening Cost', 'opcost');
        $("#opcost").select();
    }
    else if (parseFloat($('#opcost').val() || 0) > 0 && parseInt($('#opqty').val() || 0) == 0) {
        warningshow('Please Enter Opening Quantity', 'opqty');
    }
    else {                   //ajax code for insert and update to master controller 

        var data = {};       //array

        data.ItemId = $('#ItemId').val();

        if ($('#select_status').prop("checked"))
            var s = 1;
        else
            var s = 0;

        data.Active = s;

        data.ItemCode = $('#code').val();
        data.Description = $('#description').val();
        data.Unit = $('#unit').val();
        data.Group = $('#group').val();
        data.SubGroup = $('#sbgroup').val();
        data.Category = $('#category').val();
        data.SubCategory = $('#sbcat').val();
        data.OpeningQty = $('#opqty').val();
        data.OpeningCost = $('#opcost').val();
        data.VatCode = $('#vatcode').val();
        data.SellingPrice = $('#sprice').val();
        data.SellingPrice_1 = $('#sellingprice1').val();
        data.SellingPrice_2 = $('#sellingprice2').val();
        data.MRP = $('#mrp').val();
        data.Model1 = $.trim($('#serialno').val());
        data.model2 = $('#rackno').val();
        data.LPcost = 0;
        data.AvgCost = 0;
        data.DelFlag = Flag;
        data.Hsncode = $('#hsncode').val();

        //Not used In this Item Master
        data.Model3 = $('#mod3').val();
        data.MaxQty = $('#maxqty').val();
        data.MinQty = $('#minqty').val();
        data.Bin_A = $('#bin_a').val();
        data.Bin_B = $('#bin_b').val();
        data.Bin_C = $('#bin_c').val();
        data.Bin_D = $('#bin_d').val();
        data.Bin_E = $('#bin_e').val();
        data.Bin_F = $('#bin_f').val();
        data.Bin_G = $('#bin_g').val();
        data.Bin_H = $('#bin_h').val();
        data.Size = $('#size').val();
        data.Weight = $('#weight').val();
        data.Length = $('#length').val();
        data.Width = $('#width').val();
        data.Thickness = $('#thickness').val();
        data.Density = $('#density').val();
        data.Specification = $('#spec').val();       
        data.StockIn = 0;
        data.StockOut = 0;
        data.UserId = ERPUserId;
        data.DeptId = ERPDeptId;


        //ajax code

        $.ajax({
            type: "POST",
            url: "../ProductMstElectroniccs/ItemElectronicsInsertandUpdate",
            data: data,
            success: function (result) {
                
                    var status = result.oList[0].Status;
                    var itemid = result.oList[0].ItemId;
                    if (status == 1 || status == 2) {
                        fnImageSave(result.oList[0].ItemId);



                        //Location wise Quantity Insert and Update
                        var QArray = new Array();


                        for (var i = 0; i <= parseInt($('#NoOfLocations').val() - 1) ; i++) {

                            var LocationID = $('#locID' + i).val();
                            var LocationQty = parseInt($('#lqty' + LocationID).val());
                            var ItemId = itemid;
                            if (LocationID != 0) {
                                QArray.push({ 'LocId': LocationID, 'OpeningQty': LocationQty, 'ItemId': ItemId, 'DeptId': ERPDeptId })
                            }
                        }
                      
                        if (QArray != "") {
                            var data = { 'ItemMasterModel': QArray };
                            $.ajax(
                        {
                            type: "POST",
                            url: "../Master/LocationWiseQuantityUpdate",
                            data: data,
                            success: function (result) {
                            }
                        });
                        }

                        // MultiUnit Insert or Update

                        var oArray = new Array();
                        for (var i = 1; i <= 5; i++) {
                            var MultiUnitId = $('#MultiUnitId' + i).val();
                            var ItemId = itemid;
                            var Unit = $('#unit_' + i).val();
                            if ($('#fraction_' + i).val() == 0)
                                var Fraction = 1;
                            else
                                var Fraction = $('#fraction_' + i).val();
                            var UnitPrice = $('#unitprice_' + i).val();
                            DelFlag = 1;

                            if (Unit != 0) {
                                oArray.push({
                                    'MultiUnitId': MultiUnitId,
                                    'ItemId': ItemId,
                                    'Unit': Unit,
                                    'Fraction': Fraction,
                                    'UnitPrice': UnitPrice,
                                    'DelFlag': DelFlag
                                })
                            }
                        }

                        if (oArray != "") {
                            var data = { 'ItemMasterModel': oArray };
                            $.ajax(
                        {
                            type: "POST",
                            url: "../Master/MultiUnitInsertandUpdate",
                            data: data,
                            success: function (result) {
                            }
                        });
                        }

                        // MultiPrice Insert or Update

                        var bArray = new Array();
                        for (var i = 1; i <= MultiUnitLength; i++) {
                            var ProductMultiPriceId = $('#ProductMultiPriceId' + i).val();
                            var ItemId = itemid;
                            var MultiPriceId = $('#MultiPriceId_' + i).val();
                            var NoQuantity  = $('#noPices_' + i).val();
                            var Price = $('#Price_' + i).val();
                            DelFlag = 1;
                            bArray.push({
                                'ProductMultiPriceId': ProductMultiPriceId,
                                'ItemId': ItemId,
                                'MultiPriceId': MultiPriceId,
                                'Price': Price,
                                'DelFlag': DelFlag,
                                'NoQty': NoQuantity
                            })

                        }

                        if (bArray != "") {
                            var data = { 'ItemMasterModel': bArray };
                            $.ajax(
                        {
                            type: "POST",
                            url: "../Master/ProductMultiPriceInsertandUpdate",
                            data: data,
                            success: function (result) {
                            }
                        });
                        }

                        // Accessories Insert and Update


                        var XArray = new Array();


                        for (var i = 1; i <= AccId ; i++) {

                            var AccessoriesId = $('#Accsessories_'+i+'_Id').val();
                            var AccessQty = parseInt($('#Qty_' + i).val());
                            var ItemId = itemid;

                            if (AccessoriesId != undefined && AccessoriesId != 0 && AccessoriesId != '') {
                                XArray.push({ 'AccessoriesId': AccessoriesId, 'AccessQty': AccessQty, 'ItemId': ItemId })
                            }
                        }

                        if (XArray != "") {
                            var data = { 'ProductMstModel': XArray };
                            $.ajax(
                        {
                            type: "POST",
                            url: "../ProductMstElectroniccs/AccessoriesUpdate",
                            data: data,
                            success: function (result) {
                            }
                        });
                        }


                        //Multisupplier Insert and Update


                        var YArray = new Array();


                        for (var i = 1; i <= SuppId ; i++) {

                            var SupplierId = $('#Supplier_' + i + '_Id').val();
                            var ItemId = itemid;

                            if (SupplierId != undefined && SupplierId != 0 && SupplierId != '') {
                                YArray.push({ 'SupplierId': SupplierId, 'ItemId': ItemId })
                            }
                        }

                        if (YArray != "") {
                            var data = { 'ProductMstModel': YArray };
                            $.ajax(
                        {
                            type: "POST",
                            url: "../ProductMstElectroniccs/ItemSupplierUpdate",
                            data: data,
                            success: function (result) {
                            }
                        });
                        }


                    }

                    
                    Showalertsthis(status);
                
            }
        });

    }
}



function Defaultfocus() {
    if (Result != 0)
        thisformrefresh();
}



function Showalertsthis(Status) {
    Result = Status;
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 2) {

        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();


    }
    else if (Status == 3) {
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();


    }
    else if (Status == 4) {
        swal('Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();


    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}



function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    thisformrefresh();
}



function formrefresh() {
    $('#popupdiv').hide();
    $('#unitname').val(''); $('#unitdesc').val('');
    $('#groupcode').val(''); $('#groupdesc').val(''); $('#groupname').val('');
    $('#grp').val(0); $('#sbgroupname').val(''); $('#sbgroupdesc').val('');
    $('#catcode').val(''); $('#catname').val(''); $('#catdesc').val('');
    $('#cat').val(0); $('#sbcatname').val(''); $('#sbcatdesc').val('');
   
}



function thisformrefresh() {
    AccId = 2;
    SuppId = 2;
    $('#code').focus();
    $('.form-control').val('');
    $('#myImg').attr('src', "../app-assets/img/elements/04.png");
    $('#selectedImage').val('');
    $('#unit').val(0);
    $('#unit_1').val(0);
    $('#unit_2').val(0);
    $('#unit_3').val(0);
    $('#unit_4').val(0);
    $('#unit_5').val(0);
    $('#group').val(0);
    $('#sbgroup').val(0);
    $('#category').val(0);
    $('#sbcat').val(0);
    $('#vatcode').val(0);
    $('#ItemId').val(0);
    $('#Qty_1').val(1);
    $('#1').hide();
    $('#2').hide();
    $('#3').hide();
    $('#4').hide();
    $('#select_status').prop("checked", true);
    $("#tab1").click();
    $('#btndelete').hide();
    $('#Accessdiv').empty();
    $('#SupplierDiv').empty();
    generatebarcode();
    createQRCode();
    $('#btnitemimportsubmit').prop("disabled", false);
    $('#btnsubmit').prop("disabled", false);
    $('#btnsubmit').show();
    $('#searchbutton').removeClass();
    $('#searchbutton').addClass('btn btn-outline-primary');
}

function SearchItem() {
    AccId = 2;
    SuppId = 2;
    $('.form-control').val('');
    $('#myImg').attr('src', "../app-assets/img/elements/04.png");
    $('#selectedImage').val('');
    $('#unit').val(0);
    $('#unit_1,#unit_2,#unit_3,#unit_4,#unit_5,#group,#sbgroup,#category,#sbcat,#ItemId').val(0);
    $('#vatcode').val(0);
    $("#vatper").val($("#vatcode").find("option:selected").attr("name"));
    $('#1,#2,#3,#4').hide();
    $('#select_status').prop("checked", true);
    $("#tab1").click();
    $('#btndelete').hide();
    $('#Accessdiv').empty();
    $('#SupplierDiv').empty();
    $('#btnitemimportsubmit').prop("disabled", false);

    $('#code').hide();
    $('#searchcode').val('');
    $('#searchcode').show();
    $('#searchcode').focus();
    $('#btnsubmit').prop("disabled", true);
    $('#btnsubmit').hide();

    $('#searchbutton').removeClass();
    $('#searchbutton').addClass('btn btn-warning');
}

function GetPriceRows() {
    var no = $('#divno').val();
    $('#' + no).show("fast");
    $('#divno').val(+no + 1)
    if (no == 8) {
        $('#btnpriceadd').hide();
    }

}



function GetRows(ItemId) {
    thisformrefresh();
  
    if (ItemId == 0)
    {
        $('#Loading').show();
        var dummy = 1;
        $.ajax({
            type: "POST",
            url: "../Master/ItemGetAll",
            data: { dummy: 1 },
        }).then(function (dataResult) {
            ShowItemlist(dataResult);
            $('#Loading').hide();
        });
        return;
    }

}

function GetItem(ItemId, GroupId, CategoryId) {
    $('#Loading').show();

    $("#tab1").click();
    $('#group').val(GroupId);
    $('#category').val(CategoryId);
    SubGroupGets();
    SubCategoryGets();

    setTimeout(function () {  
    $('#ItemId').val(ItemId)
    var data = {};
    data.ItemId = ItemId;
    $.ajax({
        type: "POST",
        url: "../Master/ItemGetandGets",
        data: data,
        success: function (result) {
            if (ItemId == 0) {
                $('#Loading').hide();
                console.log("Wrong section of javascript : Items");
            }
            else {
                ShowItemGet(result);
                $.ajax({
                    type: "POST",
                    url: "../Master/MultiUnitGetandGets",
                    data: data,
                    success: function (result) {
                        ShowMultiUnit(result.oList);

                    }
                });
                $.ajax({
                    type: "POST",
                    url: "../Master/ProductMultiPriceGetandGets",
                    data: data,
                    success: function (result) {
                        ShowMultiPrice(result.oList);
                    }
                });

                $.ajax({
                    type: "POST",
                    url: "../Master/LocationWiseProductQty",
                    data: data,
                    success: function (result) {
                        var responseText = '';
                        result = result.oList;
                        $('#NoOfLocations').val(result.length)
                        for (var i = 0; i < result.length; i++) {
                            responseText += '<div class="form-group row" style="border-bottom:1px solid #f2f2f2;height:40px"><label class="col-md-9" for="code">' + result[i].SbgrpName + '</label><div class="col-md-3" style="margin-top:-10px"><input type=hidden id=' + "locID" + i + ' value=' + result[i].LocId + '><input class="form-control" type="text" id=' + "lqty" + result[i].LocId + ' value=' + result[i].OpeningQty + ' onkeypress="isNumberInt(event,this)"  autocomplete="off"></div></div>'
                        }
                        $('#divopenig').html('')
                        $('#divopenig').append(responseText);
                    }
                });

                $.ajax({
                    type: "POST",
                    url: "../ProductMstElectroniccs/AccessoriesGetandGets",
                    data: data,
                    success: function (result) {
                        Showaccessories(result.oList);
                    }
                }); 


                $.ajax({
                    type: "POST",
                    url: "../ProductMstElectroniccs/ItemSupplierGetandGets",
                    data: data,
                    success: function (result) {
                        ShowSupplier(result.oList);
                    }
                });



            }
        }
    });
    }, 500);
}

function Showaccessories(result) {
    if (result.length >= 1) {
        $('#Accsessories_1').val(result[0].AccessoriesName);
        $('#Accsessories_1_Id').val(result[0].AccessoriesId);
        $('#Qty_1').val(result[0].AccessQty);
    }
    for (var i = 1; i < result.length; i++) {

        $('#Accessdiv').append("<div class='form-group row'><div class='col-md-7'><input type='hidden' class='form-control' id='Accsessories_" + AccId + "_Id' value='" + result[i].AccessoriesId + "' /><input type='text' class='form-control' id='Accsessories_" + AccId + "' onkeypress=AccessoriesLoad('Accsessories_" + AccId + "') onkeyup=CheckID('Accsessories_" + AccId + "') value='" + result[i].AccessoriesName + "' /></div><div class='col-md-3'><input type='text' onkeypress='isNumberInt(event,this)' class='form-control' id='Qty_" + AccId + "' value='" + result[i].AccessQty + "' /></div></div>")
        AccId++;

    }
}

function ShowSupplier(result) {
    if (result.length >= 1) {
        $('#Supplier_1').val(result[0].SupplierName);
        $('#Supplier_1_Id').val(result[0].SupplierId);
    }
    for (var i = 1; i < result.length; i++) {

        $('#SupplierDiv').append("<div class='form-group row'><div class='col-md-7'><input type='text' class='form-control' id='Supplier_" + SuppId + "' onkeypress=LoadSupplier('Supplier_" + SuppId + "') onkeyup=CheckID('Supplier_" + SuppId + "') value='" + result[i].SupplierName + "' /><input type='hidden' class='form-control' id='Supplier_" + SuppId + "_Id' value='" + result[i].SupplierId + "' /></div></div>")
        SuppId++;
    }
}

function ShowMultiUnit(result) {

    for (var i = 0; i < result.length; i++) {
        var Id = i + 1;
        $('#' + i).show();
        $('#unit_' + Id).val(result[i].UnitId);
        $('#fraction_' + Id).val(result[i].Fraction);
        $('#unitprice_' + Id).val(result[i].UnitPrice.toFixed(Decimal));

    }

}
function ShowMultiPrice(result) {

    for (var i = 0; i < result.length; i++) {
        var Id = i + 1;      
        $('#Price_' + Id).val(result[i].Price.toFixed(Decimal));
        $('#noPices_' + Id).val(result[i].NoQty);

    }

}




function ShowItemlist(result) {    
    disable_datatable('tblItem'); 
    $('#Entry').hide();
    $('#listing').show();
    
    var table = $("#tblItem").DataTable({
        "data": result,
        "autoWidth": false,
        "columnDefs": [{
            "targets": 8,
            "className": "text-right",
            "render": function (data) {
                return (data || 0).toFixed(Decimal);
            }
        },
            {
                "targets": 9,
                "className": "text-right",
                "render": function (data) {
                    return (data || 0).toFixed(Decimal);
                }
            },
            {
                "targets": 10,
                "className": "text-right",
                "render": function (data) {
                    return (data || 0);
                }
            }],
        "columns": [
            { data: "Slno", title: "Slno" },
            { data: "ItemCode", title: "Item Code" },
            { data: "Description", title: "Description" },
            { data: "UnitName", title: "Unit" },
            { data: "GrpName", title: "Group" },
            { data: "SbgrpName", title: "Sub Group" },
            { data: "CategoryName", title: "Category" },
            { data: "SubCategoryName", title: "Sub Category" },
            { data: "SellingPrice", title: "Price" },
            { data: "AvgCost", title: "Cost" },
            { data: "stock", title: "Stock" },
            { data: "Status", title: "Status" },
            { data: "ItemId",data:"GroupId",data:"CategoryId", title: "Edit", searchable: true }

        ],
        "createdRow": function (row, data, index) {
            row.getElementsByTagName("td")[12].innerHTML = '<a  onclick="GetItem(' + data.ItemId+','+data.GroupId+','+data.CategoryId + ');">'+Editbutton+'</a>';
        },
        //dom: 'Blfrtip',
        dom:"<'row'<'col-sm-6'Bl><'col-sm-6'f>>"+
            "<'row'<'col-sm-12'tr>>"+
            "<'row'<'col-sm-6'i><'col-sm-6'p>>",
        lengthMenu: [
            [10, 25, 50,100, -1],
            ['10', '25', '50','100', 'Show all']
                ],
        buttons: []
    });
    new $.fn.dataTable.Buttons(table, {
        buttons: [
        {
            extend: 'collection',
            text: 'Export',
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: "Product List",
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11] }
                },
                {
                    extend: 'csv',
                    title: "Product List",
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11] }
                },
                {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    title:" Product List",
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
                },
                {
                    extend: 'print',
                    title: " Product List",
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
                }
            ]
        }
        ]
    });
    table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
    $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
    
    var a = '#tblItem tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" style="width:150px" placeholder="Search ' + title + '"  />');
    });

    table.columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
    $('#Loading').hide();
    //datatableWithsearch('tblItem');
}



function ShowItemGet(result) {

    $.ajax({
        url: "../ProjectImages/Products/" + result[0].ItemId + ".png",
        type: 'HEAD',
        error: function () {
            $('#myImg').attr('src', "../app-assets/img/elements/04.png");
        },
        success: function () {
            $('#myImg').attr('src', "../ProjectImages/Products/" + result[0].ItemId + ".png");
        }
    });

    for (var i = 0; i < result.length; i++) {
        console.log(result)

        $('#ItemId').val(result[i].ItemId);
        $('#code').val(result[i].ItemCode);
        $('#description').val(result[i].Description);
        $('#unit').val(result[i].UnitId);
        $('#group').val(result[i].GrpId);
        $('#category').val(result[i].CategoryId);


        $('#opqty').val(result[i].OpeningQty);
        $('#opcost').val(result[i].OpeningCost.toFixed(Decimal));
        $('#lpcost').val(result[i].LPCost.toFixed(Decimal));
        $('#avgcost').val(result[i].AvgCost.toFixed(Decimal));
        $('#vatcode').val(result[i].VatId);
        $('#vatper').val(result[i].VatPer);
        $('#sprice').val(result[i].SellingPrice.toFixed(Decimal));
        $('#inhandqty').val(result[i].StockIn);
        $('#serialno').val(result[i].Model1);
        $('#rackno').val(result[i].Model2);                
        $('#hsncode').val(result[i].Hsncode);
        $('#mrp').val(result[i].MRP.toFixed(Decimal));
        $('#sellingprice1').val(result[i].SellingPrice1.toFixed(Decimal));
        $('#sellingprice2').val(result[i].SellingPrice2.toFixed(Decimal))
     

        $('#code').focus();
        if (result[i].Active == 0) {
            $('#select_status').prop("checked", false);
        } else {
            $('#select_status').prop("checked", true);
        }
        $('#sbgroup').val(result[i].SbgrpId);
        $('#sbcat').val(result[i].SubCategoryId);
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#Loading').hide();
    generatebarcode();
    createQRCode();
}



function UnitGets() {
    $('#unit_1').val($('#unit').val());
    $('#fraction_1').val(1);
}



function GetUnitPrice() {
    $('#unitprice_1').val($('#sprice').val());
}



function fnImageSave(imageName) {

    var formData = new FormData();
    var totalFiles = document.getElementById("selectedImage").files.length;
    var browsedFile = document.getElementById("selectedImage").files[0];
    var ImageId = "0";
    if ((imageName != "" && totalFiles != 0)) {

        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", imageName);
            formData.append("UniqueId", ImageId);
            $.ajax({
                type: "POST",
                url: '/Master/UploadProductImage',
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {

                }
            });
        }
    }
    else {
        return;
    }
}




function SaveUnit(Flag) {
    if ($.trim($('#unitname').val()) == "") {
        warningshow('Please Enter Unit Name', 'unitname');
    }
    else {
        var data = {};
        data.UnitId = 0;
        data.UnitName = $('#unitname').val();
        data.UnitDescription = $('#unitdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/UnitInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    UnitpageLoad();
                    $('#unit').focus();
                }
            }
        });     

    }
}



function SaveGroup(Flag) {
    if ($.trim($('#groupcode').val()) == "") {
        warningshow('Please Enter Group Code', 'groupcode');
    }
    else if ($.trim($('#groupname').val()) == "") {
        warningshow('Please Enter Group Name', 'groupname');
    }
    else {
        var data = {};
        data.GrpId = 0;
        data.GrpName = $('#groupcode').val();
        data.GrpCode = $('#groupname').val();
        data.GrpDescription = $('#groupdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/GroupInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    GroupPageLoad();
                    $('#group').focus();
                }
            }
        });
    }
}



function SaveCategory(Flag) {
    if ($('#catcode').val() == "") {
        warningshow('Please Enter Category Code', 'catcode');
    }
    else if ($('#catname').val() == "") {
        warningshow('Please Enter Category Name', 'catname');
    }
    else {
        var data = {};   //array
        data.CategoryId = 0;
        data.CategoryName = $('#catname').val();
        data.CategoryCode = $('#catcode').val();
        data.CategoryDescription = $('#catdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/CategoryInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    CategoryPageLoad();
                    $('#category').focus();
                }
            }
        });

    }
}



function SaveSubGroup(Flag) {
    if ($('#grp').val() == 0) {
        warningshow('Please Select The Group', 'grp');
    }
    else if ($('#sbgroupname').val() == "") {
        warningshow('Please Enter The SubGroup Name', 'sbgroupname');
    }
    else {
        var data = {};   //array
        data.SbgrpId = 0;
        data.GroupId = $('#grp').val();
        data.SbgrpName = $('#sbgroupname').val();
        data.SbgrpDescription = $('#sbgroupdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/SubGroupInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    SubGroupGets();
                    $('#sbgroup').focus();
                }
            }
        });

    }
}



function SaveSubCategory(Flag) {

    if ($('#cat').val() == 0) {
        warningshow('Please Select  Category Name', 'cat');
    }
    else if ($('#sbcatname').val() == "") {
        warningshow('Please Enter SubCategory Name', 'sbcatname');
    }

    else {
        var data = {};   //array
        data.SubCategoryId = 0;
        data.CategoryId = $('#cat').val();
        data.SubCategoryName = $('#sbcatname').val();
        data.SubCategoryDescription = $('#sbcatdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/SubCategoryInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    SubCategoryGets();
                    $('#sbcategory').focus();
                }
            }
        });

    }

}



$(function () {
    $("#selectedImage").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });

});


function SavetMultiimages()
{
    var Count = parseInt($('#Imagecount').val())   
    var formData = new FormData();
    for (var i = 1; i < Count; i++) {     
        var totalFiles = document.getElementById("SelmultiImage"+i).files.length;
        var browsedFile = document.getElementById("SelmultiImage" + i).files[0];

        var ImageId =i;
        var imageName = i;
        if (( totalFiles != 0)) {
            alert(totalFiles)
            if (browsedFile.type.match('image.*')) {

                var formData = new FormData();
                formData.append("FileUpload", browsedFile);
                formData.append("ImageName", imageName);
                formData.append("UniqueId", ImageId);
               
                $.ajax({
                    type: "POST",
                    url: '/Master/UploadMultipleProductImage',
                    data: formData,
                    dataType: "html",
                    contentType: false,
                    processData: false,
                    success: function (result) {

                    }
                });



               
            }
        }
    }
   
   
    console.log(formData)


}



function readMultipleimageURL(input, Id) { 
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Mimg' + Id).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}





function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
}


function MultiPricedelete(i)
{
    $("#Price_" + i).val(0);
    $("#noPices_" + i).val(1);
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
function Showalerts(Status) {




    if (Status == 1) {
        formrefresh();
        alert('Data Saved Successfully');


    }
    else if (Status == 2) {
        formrefresh();
        alert('Data Updated Successfully');

    }
    else if (Status == 3) {
        formrefresh();
        alert('Data Deleted');


    }
    else {
        swal('Data Already Exists');


    }

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////




/*=========================================================================================
    File Name: CommonForItem.js
    Description: Common Functions For Item
    ----------------------------------------------------------------------------------------
    Item Name: Eumi-ERP
    Version: 1.0
    Author: Eumi
    Author URL: eumierp.com
    Date       :23-07-2018
==========================================================================================*/





$(document).keydown(function (e) {


   
    $('#Warningpopup').fadeOut();
    if (e.altKey && e.keyCode == 83) {
        SaveAndUpdate(1)
    }
    else if (e.altKey && e.keyCode == 76) {
        GetRows(0)
    }
    else if (e.altKey && e.keyCode == 67) {
        thisformrefresh();
    }
    else if (e.altKey && e.keyCode == 88) {
        closetable();
    }
    else if (e.altKey && e.keyCode == 49) {
        $("#tab1").click();
        $("#mod1").focus();
    }
    else if (e.altKey && e.keyCode == 50) {
        $("#tab2").click();
        $("#size").focus();
    }
    else if (e.altKey && e.keyCode == 51) {
        $("#tab3").click();
        $("#btnadd").focus();
    }
    else if (e.altKey && e.keyCode == 52) {
        $("#tab4").click();
        $("#Price_1").focus();
    }
    else if (e.altKey && e.keyCode == 53) {
        $("#tab5").click();
        $("#Supplier_1").focus();
    }
    else if (e.altKey && e.keyCode == 80) {
        printbarcode();
    }
    else if (e.keyCode == 27) {                             //ESC       :   Close Popup
        formrefresh();
    }

})




$(document).ready(function () {
    var decimail = 2; 

    $('#code,#description,#opqty,#opcost,#mod1,#mod2,#mod3,#maxqty,#minqty,#bin_a,#bin_b,#bin_c,#bin_d,#bin_d,#bin_e,#bin_f,#bin_g,#bin_h,#size,#weight,#length,#width,#thickness,#density,#spec,#groupcode,#groupname,#grp,#sbgroupname,#catcode,#catname,#cat,#sbcatname,#mrp,#sprice,#sellingprice1,#sellingprice2,#unitname').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    }); 
    $("#unitdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnunitsave').focus();
        }

    });
    $("#groupdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btngroupsave').focus();
        }

    });
    $("#sbgroupdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsbgroupsave').focus();
        }

    });
    $("#catdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btncategorysave').focus();
        }

    });
    $("#sbcatdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsbcategorysave').focus();
        }

    });
    $("#unit").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#group').focus();
        }

    });
    $("#group").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#sbgroup').focus();
        }

    });
    $("#sbgroup").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#category').focus();
        }

    });
    $("#category").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#sbcat').focus();
        }

    });
    $("#sbcat").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#opqty').focus();
        }

    });
    $("#vatcode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#mrp').focus();
        }

    });
    $("#hsncode,#bin_h,#spec").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }

    });


});//End Document.ready

function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true') {
        SaveAndUpdate(0)
    }
    $('#confirm').fadeOut();

}



function datatableWithsearch(tablename) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Slno' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Currency')
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });
    var table = $('#' + tablename).DataTable();
    table.columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
}

//Remove Datatable If alredy data table Created
function disable_datatable(tablename) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        return;
    }
}





