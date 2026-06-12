editflag = 0;
var hiddenslno = 1;
var z = 1;
var copyflag = 0;
var PFlag = 0; var rno = 1;
var EnterFlag = 0;
$(document).ready(function () {
    $('#Location').focus();
    serialnoload();
    $('#searchGroup').focus();
    var data4 = {};  
    data4.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data4: data4,
        success: function (result) {
            LocationLoad(result.oList);   
        }
    }); 
    $('#txtdate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });   
    $('#Location').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtproduct').focus();
        }
    });

    $('#txtno').keyup(function (e) {
        e.preventDefault();
        $('#tour1').fadeOut();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (entrkey == 8) {
            checkSTAdjtextempty();
        }
    });
    $('#txtproduct').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtadjstock').focus();
        }
    });
    $('#txtadjstock').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();
        }
    }); 
    $('#searchGroup').click(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        $('#searchGroup').select();        
    });  
    $('#searchSubGroup').click(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        $('#searchSubGroup').select();
    });
    $('#txtproduct').click(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        $('#txtproduct').select();
    });
    $('#txtadjstock').click(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        $('#txtadjstock').select();
    });
    $('#searchCat').click(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        $('#searchCat').select();
    });  
    $('#searchSubcat').click(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        $('#searchSubcat').select();
    });  
    $('#searchItemCode').click(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        $('#searchItemCode').select();
    });
    $('#searchGroup').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#hiddengrpno').val() == '0')
            {
                warningshow('Please Enter Valid Group', 'searchGroup');
                $('#searchGroup').select();
            }
            else
            { $('#searchSubGroup').focus(); }           
        }
    });
    $('#searchSubGroup').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#hiddensubgrpno').val() == '0') {
                warningshow('Please Enter Valid Sub Group', 'searchSubGroup');
                $('#searchSubGroup').select();
            }
            else { $('#searchCat').focus(); }
        }
    });
    $('#searchCat').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#hiddencatno').val() == '0') {
                warningshow('Please Enter Valid Catogory', 'searchCat');
                $('#searchCat').select();
            }
            else { $('#searchSubcat').focus(); }
        }
    });
    $('#searchSubcat').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#hiddensubcatno').val() == '0') {
                warningshow('Please Enter Valid Sub Catogory', 'searchSubcat');
                $('#searchSubcat').select();
            }
            else { $('#searchItemCode').focus(); }
        }
    });
    $('#searchItemCode').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            
             $('#btnsearch').focus(); }        
    });
    var b = 1;
    //add to grid multiple items
    $('#btnaddgrid').click(function (e) {
        addtogrid();
    });
    function addtogrid()
    {
        var b = 1;
        var cnt = $('#RowGet').val();
        var Count = $('#tblStockAdjustment tr').length;

        if (Count == 0) {
            hiddenslno = 1;
        }
        for (m = 1; m <= cnt; m++) {
            if ($("#SlNoCheck" + m).is(":checked")) {
                var Item = $('#item' + m).text();
                var des = $('#description' + m).text();
                var CurrentStock = $('#stockqty' + m).text();
                var ItemIdgrid = $('#ItemIdgrid' + m).val();
                $('#iconForm').hide();
                var slno = parseInt(hiddenslno);
                var Showslno = $('#tblStockAdjustment tr').length + 1;
                var ProdRow = "<tr id=" + 'row' + hiddenslno + " class= jsgrid-row ><td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:4%;text-align:center >"
                     + Showslno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td><td class= 'jsgrid-cell jsgrid-align-left' style='width:6%;' ><select id=" + 'select_location' + slno + " class='form-control' disabled=disabled style='background-color:white;height:30px;' >"
                     + LocationSelect + "</select></td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;' id='date_" + slno + "' value='"
                     + $('#txtdate').val() + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:6%;text-align:center' ><input type='hidden' id='ProductId" + slno + "' value='" + ItemIdgrid + "'/> <input typ='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
                     + Item + "'>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:20%;text-align:center' display='none;'><input type='text' class='form-control'  disabled  style='background-color:white;height:30px;' id='desc" + slno + "' value='"
                     + des + "'> </td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:6%;' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'   onkeypress='return isNumber1(event)' id='currentStock" + slno + "' value='"
                     + CurrentStock + "'><input type='hidden' id='hiddenqty" + slno + "' value='" + CurrentStock + "'/> </td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:6%;'><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;' onkeyup='calcdiffgrid(" + slno + ")'  onkeypress='return isNumber1(event,this.id)' id='adjustmentStock" + slno + "' value="
                     + $('#adjstock' + m).val() + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:6%;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;'  onkeypress='return isNumber1(event,this.id)' id='Diffrence" + slno + "' value="
                     + $('#diffr' + m).text() + "></td><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width: 4%;' ><input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' id='Edit' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button'  type= button id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td><td id='Update"
                     + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'></tr>";
                $('#tblStockAdjustment').append(ProdRow);
                $('#select_location' + slno).val($('#Location').val());
                b++;
                hiddenslno++;
                $('#hiddenrow').val(b);
                clear();                
            }
        }
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
    }

//search function
    $('#btnsearch').click(function (e) {
        entr = 0;
        if ($('#hiddengrpno').val() == 0 && ($('#searchGroup').val() != '')) {
            warningshow('Please Enter Valid Group', 'searchGroup');
            $('#searchGroup').select();
            return false;
        }
        else if ($('#hiddensubgrpno').val() == 0 && ($('#searchSubGroup').val() != '')) {
            warningshow('Please Enter Valid Sub Group', 'searchSubGroup');
            $('#searchSubGroup').select();
            return false;
        }
        else if ($('#hiddencatno').val() == 0 && ($('#searchCat').val() != '')) {
            warningshow('Please Enter Valid Catogory', 'searchCat');
            $('#searchCat').select();
            return false;
        }
        else if ($('#hiddensubcatno').val() == 0 && ($('#searchSubcat').val() != '')) {
            warningshow('Please Enter Valid Sub Group', 'searchSubcat');
            $('#searchSubcat').select();
            return false;
        }       
        else {
            var grp = '', subgrp = '', cat = '', subcat = '', item = '', Condition = ''
            var GrpId = $('#hiddengrpno').val();
            var SubGrpId = $('#hiddensubgrpno').val();
            var CatId = $('#hiddencatno').val();
            var SubCatID = $('#hiddensubcatno').val();
            var Item = $('#hiddenitemcode').val();
            var Des = $('#searchItemCode').val();
            var LocId = $('#Location').val();
            var DeptId =  ERPDeptId;
            var flag = 1;
            if (GrpId != '') { Condition += 'GroupId=' + GrpId }
            if (SubGrpId != '') { if (Condition.length == 0) Condition += 'SubGroupId=' + SubGrpId; else Condition += ' and SubGroupId=' + SubGrpId; }
            if (CatId != '') { if (Condition.length == 0) Condition += 'CategoryId=' + CatId; else Condition += ' and CategoryId=' + CatId; }
            if (SubCatID != '') { if (Condition.length == 0) Condition += 'SubCategoryId=' + SubCatID; else Condition += ' and SubCategoryId=' + SubCatID; }
            if (Item != '') { if (Condition.length == 0) Condition += 'itemid=' + Item; else Condition += ' and itemid=' + Item; }
            if (Des != '') { if (Condition.length == 0) Condition += '(Description like  ' + "'" + Des + "%'or ItemCode like  " + "'" + Des + "%')"; else Condition += 'and (Description like  ' + "'" + Des + "%'" + ' or ItemCode like  ' + "'" + Des + "%')" }
            if (GrpId == '' && SubGrpId == '' && CatId == '' && SubCatID == '' && Item == '' & Des == '') { if (Condition.length == 0) Condition += 'Active=' + flag; }
            var data = {};
            data.LocId = LocId;
            data.DeptId = DeptId;
            data.Condition = Condition;
            $.ajax({
                type: "POST",
                url: "../../inventory/ProductSearchStockAdjustmentwithfilter",
                data: data,
                success: function (result) {
                    $("#Stocklist tr").remove();
                    ShowStockList(result);                    
                        $('#adjstock1').focus();                    
                }
            });
        }
    });
    $('#btnsubmit').click(function (e) {
        SaveAndUpdate(1);

    });
    $('#btnclear').click(function (e) {
        clear();
        GetList();
    });
});
function clear()
{
    $('#searchGroup').val('');
    $('#hiddengrpno').val('');
    $('#searchSubGroup').val('');
    $('#hiddensubgrpno').val('');
    $('#searchCat').val('');
    $('#hiddencatno').val('');
    $('#searchSubcat').val('');
    $('#hiddensubcatno').val('');
    $('#searchItemCode').val('');
    $('#hiddenitemcode').val('');
}
function closepopup()
{
    $('#iconForm').hide();
    clear();
}
//clear search row in popup
function ClearSearchRow()
{
    $('#searchGroup').val('');
    $('#hiddengrpno').val(0);
    $('#searchSubGroup').val('');
    $('#hiddensubgrpno').val(0);
    $('#searchCat').val('');
    $('#hiddencatno').val(0);
    $('#searchSubcat').val('');
    $('#hiddensubcatno').val(0);
    $('#searchItemCode').val('');
    $('#hiddenitemcode').val(0);
}

var LocationSelect
function LocationLoad(result) {
    $("#Location").empty();
     LocationSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "'>" + result[i].LocationName + "</option>";
    }
    $("#Location").append(LocationSelect);   
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
            getslno(result.oList);
        }
    });
}

function getslno(result) {
    $('#txtno').val(result[0].Stock_AdjNo);
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

//product add into grid(single item)
var i=1;

function productadd() {
    var ProductFlag = 0;
    for (p = 1; p <= hiddenslno; p++) {
        if (($('#ProductId' + p).val() == $("#ProductId0").val()) && ($('#select_location' + p).val() == $("#Location").val())){
            ProductFlag = 1;
        }       
    }
    if ($.trim($('#Location').val()) == '0') {
        warningshow('Please Select Location', 'Location');
        return false;
    }
   else if ($.trim($('#txtproduct').val()) == "") {
        warningshow('Please Select Product', 'txtproduct');
        return false;
    }
  else  if ($.trim($('#txtadjstock').val()) == "") {
        warningshow('Please Enter Adjustment Stock', 'txtadjstock');
        return false;
  } 
    else if ($("#ProductId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
        $('#txtstock').val('');
        $('#txtadjstock').val('');
        $('#txtproduct').select();
    }    
    else {
       
        var Count = $('#tblStockAdjustment tr').length;
        if (Count == 0) {
            hiddenslno = 1;
        }
        var slno = parseInt(hiddenslno)
        if (ProductFlag == 1) {
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                ClearProductRow();
                return false;
            }
        }
        var Showslno = $('#tblStockAdjustment tr').length+1;
        var serialNo = Count + 1;
        var dategrid = $('#txtdate').val();
        var ProdRowEdit = "<tr id=" + 'row' + hiddenslno + " class= jsgrid-row ><td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:4%;text-align:center >"
           + Showslno + "<input type='hidden' id='SlNo" + slno + "' value=" + Count + "></td> <td class= 'jsgrid-cell jsgrid-align-left' style='width:6%;' ><select id=" + 'select_location' + slno + " class='form-control' disabled=disabled style='background-color:white;height:30px;' >"
           + LocationSelect + "</select></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;' id='date_" + slno + "' value='"
           + dategrid + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='hidden' id='ProductId" + slno + "' value='" + $('#ProductId0').val() + "'/> <input type='text' class='form-control '  disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
           + $('#txtproduct').val() + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 20%;text-align:center' ><input type='text'  class='form-control '  disabled=disabled  style='background-color:white;height:30px;' id='desc" + slno + "' value='"
           + $('#Description').val() + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='text'  class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;' id='currentStock" + slno + "' value='"
           + $('#txtstock').val() + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;' onkeyup='calcdiffgrid(" + slno + ")' onkeypress='return isNumber1(event,this.id)'  id='adjustmentStock" + slno + "' value='"
           + $('#txtadjstock').val() + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;'  onkeypress='return isNumber1(event,this.id)' id='Diffrence" + slno + "' value="
           + $('#txthiddendiffrence').val() + "></td><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:4%;' ><input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' id='Edit' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button'  type= button id='delete' title= Delete onclick='rowdelete(" + hiddenslno + ")' ></td><td id='Update"
           + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'></tr>";

        $('#tblStockAdjustment').append(ProdRowEdit);
        $('#select_location' + slno).val($('#Location').val());
        ClearProductRow();
        //grandtotal(slno);
        i++;
        hiddenslno++;       
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}
//update row in grid
function Updaterow(RowId) {      
    if ($('#adjustmentStock' + RowId).val() == '') {
        warningshow('Please Enter Stock', 'adjustmentStock' + RowId);
        return false;
    }
    else if ($('#select_location' + RowId).val() == 0) {
        warningshow('Please select Location', 'select_location' + RowId);
        return false;
    }

    else {
        editflag = editflag - 1;
        $('#row' + RowId).children('td,th').css('background-color', 'white');
        $('#Update' + RowId).hide();
        $('#Edit' + RowId).show();
        $('#select_location' + RowId).prop('disabled', true);
        $('#txtqnty' + RowId).prop('disabled', true);
        $('#currentStock' + RowId).prop('disabled', true);
        $('#adjustmentStock' + RowId).prop('disabled', true);
    }
}
//edit row in grid
function Editrow(RowId) {
    editflag = editflag + 1;
    $('#row' + RowId).children('td,th').css('background-color', 'rgb(232,226,226)');
    $('#Edit' + RowId).hide();
    $('#Update' + RowId).show();
    desc = $('#desc' + RowId).val();
    select_loc = $('#select_location' + RowId).val();
    Cstock = $('#currentStock' + RowId).val();
    Astock = $('#adjustmentStock' + RowId).val();
    Dstock = $('#Diffrence' + RowId).val();
    $('#select_location' + RowId).prop('disabled', true);
    $('#adjustmentStock' + RowId).prop('disabled', false);
    $('#currentStock' + RowId).prop('disabled', true);
    $('#adjustmentStock' + RowId).focus();
}
//cancel edit
function CancelEditrow(RowId) {
    editflag = editflag - 1;
    $('#row' + RowId).children('td,th').css('background-color', 'white');
    $('#Update' + RowId).hide();
    $('#Edit' + RowId).show();
    $('#txtdesc' + RowId).val(desc);
    $('#select_location' + RowId).val(select_loc);
    $('#currentStock' + RowId).val(Cstock);
    $('#adjustmentStock' + RowId).val(Astock);
    $('#Diffrence' + RowId).val(Dstock);
    $('#select_location' + RowId).prop('disabled', true);
    $('#txtqnty' + RowId).prop('disabled', true);
    $('#currentStock' + RowId).prop('disabled', true);
    $('#adjustmentStock' + RowId).prop('disabled', true);
}

function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);   
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
function deleterow(RowId) {
    var h = hiddenslno;
    var cnt = 1;
    $('#row' + RowId).remove();
    for (var j = 1; j <= h - 1 ; j++) {
        if ($('#txtprd' + j).val() != undefined) {
            $('#td' + j).text(cnt);
            cnt++;
        }
    }
}

    function enablecopy() {
        copyflag = 1;
        $("#tblStockAdjustment tr").remove();
        $('#btnsubmit').prop('disabled', true);
        $('#btnlist').prop('disabled', true);        
        $('#Location').val(0);
        $('#txtno').prop('disabled', false);
        $('#btnadd').prop('disabled', true);
        $('#moreprod').prop('disabled', true);
        $('#Location').prop('disabled', true);
        $('#txtdate').prop('disabled', true);
        $('#txtproduct').prop('disabled', true);
        $('#txtno').focus();
        $('#txtstock').css("background-color", '#ECEFF1');
        $('#txtadjstock').css("background-color", '#ECEFF1');
        $('#txtno').select();
    }

function  ClearProductRow()
{
    $('#txtstock').val('');
    $('#txtadjstock').val('');
    $('#ProductId0').val('');
    $('#Description').val('');
    $('#txtproduct').val('');
    $('#txtproduct').focus();
}

function isNumber1(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (evt.which != 8 && evt.which != 0 && (evt.which < 48 || evt.which > 57)) {
        warningshow('Digits Only')
        return false;
    }
    else {
        return true;
    }
}

//get more products
function GetList() {
    if ($('#Location').val() == "0") {
        warningshow('Please Select  Location', 'Location');
        return false;
    }
    else if ($('#txtstock').val() != '' && $('#txtadjstock').val() !='') {
        warningshow('Please Insert Item', 'txtadjstock');
        return false;
    }
    else if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }
    else {
        var LocId = $('#Location').val();       
        var data = {};
        data.LocId = LocId;
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: "../../inventory/ProductSearchStockAdjustment",
            data: data,
            success: function (result) {
                ShowStockList(result);
                $('#RowGet').val = '';
                $('#iconForm').show();
                $('#searchGroup').focus();
            }            
        });    
    }
}

var l = 1;
//show more products in popup
function ShowStockList(result) {
    if (result != 0) {
        var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  disabled  id= 'SlNoHeadCheck'  onchange='selectall()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;</th><th>Product</th><th>Description</th><th>Current Stock</th><th>Adjustment Stock</th><th>Diffrence</th></tr></thead><tbody>";
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);
            responseText += '<tr><td style="width:90px;" ><input type="checkbox"    id= ' + 'SlNoCheck' + slno + ' disabled    "custom-control-input cz-bg-image-display"  style="align:center"  ></td><td style=display:none;><input type="text" style="display:none;" id= ' + 'ItemIdgrid' + slno + ' value= ' + result[l].ItemId + '></td><td  id=' + 'item' + slno + '>' + result[l].ItemCode + '</td><td  id=' + 'description' + slno + '>' + result[l].Description + '</td><td style="text-align:center;" id=' + 'stockqty' + slno + ' >' + result[l].stocktotloseqty + '</td><td id=' + 'adjqty' + slno + ' ><input type=text id= ' + 'adjstock' + slno + '  style="width:180px;text-align:center;height:33px;"   onkeypress="return isNumber(event)"   onkeyup="checkme(' + slno + '),Focusnext(event,' + slno + ')" onblur="popupProductcheck(event,' + slno + ')" class="form-control"></td><td style="text-align:center;width:130px;" id=' + 'diffr' + slno + ' ></td></tr>';
        }       
        $('#RowGet').val(result.length);
    }
    else
    {
        var responseText ='<tr><td style="width:1000px;text-align:center"><b>No Datas Found</b><td><tr>';       
    }
    $('#Stocklist').html(responseText + '</tbody>');
    $('#div1').animate({ scrollTop: 0 });
}



//checking check box when entering adjustmnt stock and calculate diff in popup
function checkme(Id)
{   
    if ($('#adjstock' + Id).val() != '') {
        document.getElementById("SlNoCheck" + Id).checked = true;
        document.getElementById("SlNoCheck" + Id).disabled = false;
        var adstock = parseInt($('#adjstock' + Id).val()) || 0;
        var currentstock = parseInt($('#stockqty' + Id).text()) || 0;
        var diff = parseInt(adstock - currentstock) || 0;
        $('#diffr' + Id).text(diff);      
    }
    else {        
        document.getElementById("SlNoCheck" + Id).checked = false;
        $('#diffr' + Id).text('');
        document.getElementById("SlNoCheck" + Id).disabled = true;
    }  
}
//diffrence in main part(adjstock-current stock)
function calcdiff()
{
    if ($('#txtadjstock').val() != '') {
        var adstock = parseInt($('#txtadjstock').val()) || 0;
        var currentstock = parseInt($('#txtstock').val()) || 0;
        var diff = parseInt(adstock - currentstock) || 0;
        $('#txthiddendiffrence').val(diff);
    }
    else
    {
        $('#txthiddendiffrence').val('');
    }
}
//diffrence in grid
function calcdiffgrid(Id)
{
    if ($('#adjustmentStock'+Id).val() != '') {
        var adstock = parseInt($('#adjustmentStock'+Id).val()) || 0;
        var currentstock = parseInt($('#currentStock'+Id).val()) || 0;
        var diff = parseInt(adstock - currentstock) || 0;
        $('#Diffrence'+Id).val(diff);
    }
    else
    {
        $('#txthiddendiffrence').val('0.00');
    }
}
function isNumber(e) {
    var charCode = (e.which) ? e.which : e.keyCode
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
}

$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S
        SaveAndUpdate(1);
    }
    else if (e.altKey && e.keyCode == 76) {                 //Alt+L        
        enablenobox();
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        createnew();
    }
    else if (e.keyCode == 27) {                           //esc

        if ($(iconForm).is(":visible") && $(Popup).is(":visible"))
        {
            $('#Popup').hide();
        }
    else if($(iconForm).is(":visible"))
    {
        $('#iconForm').hide();

    }
    else ($(Popup).is(":visible"))
    {
        $('#Popup').hide();
        }

    }
});
//save
function SaveAndUpdate(Flag)
{
    var rowCount = document.getElementById('tblStockAdjustment').rows.length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }   
    else if (rowCount == 0)
    {
        warningshow('No Products Added', 'txtproduct0');
        return false;
    }
    else {
        $('#btnsubmit').prop("disabled", true);
        var oArray = new Array();
        for (var k = 1; k < hiddenslno; k++) {
            var ProductId = $('#ProductId' + k).val();
            var Location = $('#select_location' + k).val();
            var Date = $('#date_' + k).val();
            var CurrentStock = $('#currentStock' + k).val();
            var AdjStock = $('#adjustmentStock' + k).val();
            var StockAdjNo = $('#txtno').val();
            var UId = ERPUserId;
            var DeptId = ERPDeptId;
            if (Date != undefined) {
                oArray.push({
                    'ProductId': ProductId,
                    'StockAdjNo': StockAdjNo,
                    'Location': Location,
                    'Date': Date,
                    'CurrentStock': CurrentStock,
                    'Adj_Stock': AdjStock,
                    'UId': UId,
                    'DeptId': DeptId,
                })
            }
        }
        if (oArray != "") {
            var data = { 'StockAdjustmentModel': oArray };
            $.ajax({
                type: "POST",
                url: "../../inventory/StockAdjustmentInsert",
                data: data,
                success: function (result) {
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var Number = result.oList[i].StockAdjNo;
                        $('#btnsubmit').prop("disabled", false);
                        Showalerts(status,Number);
                        formrefresh();
                    }
                }
            });
        }
    }
}

function Showalerts(Status, Number) {
    if (Status == 1) {
        swal('Stock Adjustment Number :' + Number, " Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
}
function formrefresh()
{
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
    }
    else {
        serialnoload();
        $('#Location').val('0');
        $('#txtproduct').val('');
        $('#txtstock').val('');
        $('#txtstock').val('');
        $('#txtadjstock').val('');
        $('#ProductId0').val('');
        $('#Description').val('');
        $('#txthiddendiffrence').val('');
        $('#txtdate').val(CurDate);             
        $("#tblStockAdjustment tr").remove();
        $('#txtno').prop('disabled', true);
        $('#btnsubmit').prop('disabled', false);
        $('#btnlist').prop('disabled', false);
        $('#btnadd').prop('disabled', false);
        $('#moreprod').prop('disabled', false);
        $('#Location').prop('disabled', false);
        $('#txtproduct').prop('disabled', false);
        $('#txtdate').prop('disabled', false);        
        $('#txtadjstock').prop('disabled', false);
        $('#txtstock').css("background-color", 'white');
        $('#txtadjstock').css("background-color", 'white');
        $('#Location').focus();
        copyflag = 0;

    }
}


//copy
function enablenobox() {
    var rowcount = document.getElementById('tblStockAdjustment').rows.length;
    if (editflag != 0) {
        warningshow('You are in Edit Mode');
        return false;
    }
 else   if (rowcount > 0) {
     $('#Confirmflag').val('copy'), $('#ConfirmRowId').val(1)
     $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
     $('#confirm').show();
     $('#confirmOk').focus();
 }
 else if (rowcount == 0) {
     enablecopy();
 }   
}

//copy into grid

function ShowStockAdjustmentGet(result) {
    var i = 1;
    for (var m = 0; m <= result.length; m++) {
            var slno = parseInt(i);
            var ProdRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:4%;text-align:center >"
                      + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td> <td class= 'jsgrid-cell jsgrid-align-left' style='width:6%;' ><select id=" + 'select_location' + slno + " class='form-control' disabled=disabled style='background-color:white;height:30px;' >"
                      + LocationSelect + "</select></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;' id='date_" + slno + "' value='"
                      + result[m].Date + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' > <input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
                      + result[m].ItemCode + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:20%;text-align:center' ><input type='text'  class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;' id='desc" + slno + "' value='"
                      + result[m].Description + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='text'  class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;' id='currentStock" + slno + "' value='"
                      + result[m].CurrentStock + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;'  id='adjustmentStock" + slno + "' value='"
                      + result[m].Adj_Stock + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;'   id='Diffrence" + slno + "' value="
                      + result[m].Diffrence + "></td><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:4%';  ><input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + hiddenslno + ")' id='Edit' style='display:none;' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button' style='display:none;' type= button id='delete' title= Delete onclick='rowdelete(" + hiddenslno + ")' ></td><td id='Update"
           + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + hiddenslno + ")' type=button id='update' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + hiddenslno + ")' type='button' id='CancelEdit' title='Cancel edit'></tr>";
            $('#tblStockAdjustment').append(ProdRow);
            $('#select_location' + slno).val(result[m].Location);
            i++;
        }
    }
//function createnew() {
//          $('#tour1').fadeOut();
//        formrefresh();    
//}


function createnew() {   
    if (editflag != 0 ) {
        warningshow('You Are In Edit Mode');
    }
    else {
        var rowcount = document.getElementById('tblStockAdjustment').rows.length;
        if (rowcount > 0 && copyflag == 0) {
            $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
            $('#confirm').show();
            $('#confirmOk').focus();
        }
        else 
        {
            formrefresh();
            $('#tour1').fadeOut();

        }               
    }
    }

//selecting another number in number search
function checkSTAdjtextempty() {
    $('#Location').val('0');   
    $("#tblStockAdjustment tr").remove();
}
//onblur product check
function popupProductcheck(evt, ID) {    
    if (EnterFlag != 1) {
        var count = $('#RowGet').val();
        PFlag = 0;
        entr = 0;
        for (p = 1; p <= hiddenslno; p++) {
            if ($('#ProductId' + p).val() == $('#ItemIdgrid' + ID).val()) {
                PFlag = 1;
                break;
            }
        }
        if ($('#adjstock' + ID).val() != '') {
            rno = ID + 1;
            if (PFlag == 1) {
                var Res = confirm('Product Already Added! Do You Want to Continue?');
                if (Res == false) {
                    var nextID = parseInt(ID + 1)
                    $('#adjstock' + ID).val('');
                    $('#diffr' + ID).text('');
                    $('#adjstock' + nextID).focus();
                    PFlag = 0;
                    return false;
                }
                else {
                    if (count == 1) {
                        $('#btnaddgrid').click();
                        PFlag = 0;
                    }
                    else {
                        var nextID = parseInt(ID + 1);
                        $('#adjstock' + nextID).focus();
                        $('#adjstock' + nextID).select();
                        PFlag = 0;
                    }
                }
            }
            else {
                var nextID = parseInt(ID + 1)
                var data = {};
                data.ProductId = $("#ItemIdgrid" + ID).val();
                data.LocationId = $("#Location").val();
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: '../../inventory/StockAdjustmentProductCheck',                          //checking already enterd in adjustment table in popup
                    data: data,
                    success: function (result) {
                        if (result.length > 0 && PFlag != 1) {                            
                            CheckProduct(result);
                            
                        }
                        else {
                            if (count == 1) {
                                $('#btnaddgrid').focus();
                            }
                            else {
                                var nextID = parseInt(ID + 1)
                            }
                        }
                    }
                });
            }
        }
    }
    $('#RowIDGet').val(nextID);
  }



//focus to next textbox inside table 
function Focusnext(e, ID) {
    PFlag = 0; rno = ID + 1;
    for (p = 1; p <= hiddenslno; p++) {
        if ($('#ProductId' + p).val() == $('#ItemIdgrid' + ID).val()) {
            PFlag = 1;
            break;
        }
    }
    var count = $('#RowGet').val();
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 13 && entr != 1) {
        EnterFlag = 1;
        if ($('#adjstock' + ID).val() != '') {
            if (PFlag == 1) {
                var Res = confirm('Product Already Added! Do You Want to Continue?');
                if (Res == false) {                    
                        var nextID = parseInt(ID + 1)
                        $('#adjstock' + ID).val('');
                        $('#diffr' + ID).text('');
                        $('#adjstock' + nextID).focus();
                        PFlag = 0;
                        return false;
                }
                else{
                    if (count == 1) {
                        $('#btnaddgrid').click();
                        PFlag = 0;
                        }
                    else {
                            var nextID = parseInt(ID + 1);
                            $('#adjstock' + nextID).focus();
                            $('#adjstock' + nextID).select();
                            PFlag = 0;
                        }
                }
            }
            else {
                var nextID = parseInt(ID + 1)
                var data = {};
                data.ProductId = $("#ItemIdgrid" + ID).val();
                data.LocationId = $("#Location").val();
                data.DeptId = ERPDeptId;
                $.ajax({
                    type: "POST",
                    url: '../../inventory/StockAdjustmentProductCheck',                          //checking already enterd in adjustment table in popup
                    data: data,
                    success: function (result) {
                        if (result.length > 0 && PFlag != 1) {
                            CheckProduct(result);
                        }
                        else {
                            if (count == 1) {
                                $('#btnaddgrid').click();
                            }
                            else {
                                var nextID = parseInt(ID + 1)
                                $('#adjstock' + nextID).focus();
                            }                           
                        }
                    }
                });
            }            
        }
        else {
            if (count == 1) {
                $('#btnaddgrid').focus();
            }
            else {
                var nextID = parseInt(ID + 1);
                $('#adjstock' + nextID).focus();
                $('#adjstock' + nextID).select();
            }
        }

        }
    else {
        EnterFlag = 0;
        var nextID = parseInt(ID + 1);       
    }        
$('#RowIDGet').val(nextID);
}


//check and validate datas in popup search row
function checkpdcttextempty() {
    $('#ProductId0').val(0);
    $('#txtstock').val('');
}
//clear text box when change location
function checklocationempty() {
    $('#ProductId0').val(0);
    $('#txtproduct').val('')
    $('#txtstock').val('');
    $('#txtadjstock').val('');
}

function checkgrptextempty() {
    if($('#searchGroup').val() == '')
        $('#hiddengrpno').val('');
    else
    {
        $('#hiddengrpno').val(0);
    }
}

function checkSubgrptextempty() {
    if ($('#searchSubGroup').val() == '')
        $('#hiddensubgrpno').val('');
    else {
        $('#hiddensubgrpno').val(0);
    }
}

function checkCategorytextempty() {
    if ($('#searchCat').val() == '')
        $('#hiddencatno').val('');
    else {
        $('#hiddencatno').val(0);
    }
}
function checkSubCategorytextempty() {
    if ($('#searchSubcat').val() == '')
        $('#hiddensubcatno').val('');
    else {
        $('#hiddensubcatno').val(0);
    }
}

function checkItemtextempty() {
  
        $('#hiddenitemcode').val('');        
}
//show popup if product already adjustusted for the same locaion
function GetProduct(result) {
    $('#MyHeader').text('Already Stock Taken');
    var responseText = "<thead><tr style='width:20px;'><th >ItemCode</th><th>Description</th><th style='width:20px;'>Date</th><th style='width:20px;'>Quantity</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);
            responseText += '<tr><td >' + result[l].ItemCode + '</td><td >' + result[l].Description + '</td><td >' + result[l].Date + '</td><td >' + result[l].Adj_Stock + '</td></tr>';
        }       
    $('#Productchecklist').html(responseText + '</tbody>');
    $('#btnY').focus();
    }
function closepopupcheck()
{
    $('#Popup').hide();
    $('#txtproduct').val('');
    $('#txtstock').val('');
    $('#txtproduct').focus();
    var Id = rno;  
    var i = Id - 1;
    entr = 1;
  $('#adjstock' + i).val('');
  $('#diffr' + i).text('');

  $('#adjstock' + Id).focus();
  $('#adjstock' + Id).keydown(function (e) {
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if (key == 13) {
          e.preventDefault();
          entr = 0;
      }
  });
}
var entr = 0;
function addpopup() {    
    $('#Popup').hide();
    var count = $('#RowGet').val();
    entr = 1;
    if (count == 1) {
        $('#btnaddgrid').click();
        entr = 0;
    }
    else {
        $('#txtadjstock').focus();
        var Id = rno;
        $('#adjstock' + Id).focus();
        $('#adjstock' + Id).keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                e.preventDefault();
                entr = 0;
            }
        });
        return false;          
    }
    //alert(entr)
}
