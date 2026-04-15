
var i = 1;
var hiddenno = 1;
var copyflag = 0;

$(document).ready(function () {
    $('#Location').focus();
    serialnoload();
    AccountLoad(2);
    var data4 = {};
    data4.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../../Master/LocationGetandGets",
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
          $('#moreprod').focus();
      }
  });
  $('#txtdate').keydown(function (e) {
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if (key == 13) {
          e.preventDefault();
          $('#Debitaccount').focus();
      }
  });
  $('#Debitaccount').keydown(function (e) {
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if (key == 13) {
          e.preventDefault();
          $('#Creditaccount').focus();
      }
  });

  $('#Creditaccount').keydown(function (e) {
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if (key == 13) {
          e.preventDefault();
          $('#moreprod').focus();
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

  $('#txtno').keyup(function (e) {
      e.preventDefault();
      var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if (entrkey == 8) {
          checkPVTdjtextempty();
      }
  });
//search item according to Location
  $('#moreprod').click(function (e) {
      if ($('#Location').val() == "0") {
          warningshow('Please Select  Location', 'Location');
          return false;
      }
      else {
          var data = {};
          data.Location = $('#Location').val();
          data.Date = $('#txtdate').val();
          data.DeptId = ERPDeptId;
          $.ajax({
              type: "POST",
              url: "../../inventory/PhysicalVariationTransferGetProduct",
              data: data,
              success: function (result) {
                  $("#tblPhysicalVariationTransfer tr").remove();
                  getProduct(result);
              }
          });
      }
  });

  $('#btnsubmit').click(function (e) {
      SaveAndUpdate(1);
  });
});
 

function getProduct(result) {
    var loc = $('#Location option:selected').text();
    if (result.length == 0)
    {
        warningshow('No Products For Location'+"   "+loc );
    }
    else
    {
        var i = 1;
        for (var m = 0; m <= result.length; m++) {
            hiddenno = result.length;
            var slno = parseInt(i);
            var ProdRowEdit = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:4%;text-align:center >"
              + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:6%;text-align:center' ><input type='hidden' id='ProductId" + slno + "' value='" + result[m].ProductId + "'/><input type='hidden' id='StockAdjId" + slno + "' value='" + result[m].StockAdjNo + "'/> <input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;' id='txtprd" + slno + "' value='"
              + result[m].ItemCode + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 20%;' ><input type='text'  class='form-control '  disabled=disabled  style='background-color:white;height:30px;border:0px;' id='desc" + slno + "' value='"
              + result[m].Description + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:6%;text-align:center' ><select id=" + 'select_unit' + slno + " class='form-control' disabled=disabled style='background-color:white;height:30px;display:none' >"
              + UnitSelect + "</select> <input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;' ' value='"
              + result[m].UnitName + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;'   id='Qty" + slno + "' value='"
              + result[m].Diffrence + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;'   id='AvgCost" + slno + "' value='"
              + result[m].AvgCost + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 6%;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;border:0px;'   id='total" + slno + "' value="
              + Math.abs(result[m].Total) + "></td><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 4%;' ><input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' style='display:none;' id='Edit' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button'  type= button id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td><td id='Update"
              + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'></tr>";

            $('#tblPhysicalVariationTransfer').append(ProdRowEdit);
            $('#select_unit' + slno).val(result[m].UnitId);
            i++;
        }
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
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
var UnitSelect
function UnitLoad(result) {
    $("#select_unit0").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "' name=" + result[i].UnitName + ">" + result[i].UnitName + "</option>"
    }
    $("#select_unit0").append(UnitSelect);
}

//default generation of PV No
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
    $('#txtno').val(result[0].PVTNo);
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
            enablecopy();
        }    
    $('#confirm').fadeOut();
}
function deleterow(RowId) {
    var sllno = 1;
    var rowslno = parseInt(sllno);    
        $('#row' + RowId).remove();
        for (var j = 1; j <= hiddenno; j++) {
            if ($('#txtprd' + j).val() != undefined) {
                $('#td' + j).text(sllno);
                sllno++;
            }
        }
    }
function enablecopy() {
    copyflag = 1;
    $("#tblPhysicalVariationTransfer tr").remove();
    $('#btnsubmit').prop('disabled', true);
    $('#btnlist').prop('disabled', true);
    $('#txtno').select();
    $('#Location').val(0);
    $('#txtno').prop('disabled', false);
    $('#moreprod').prop('disabled', true);
    $('#Location').prop('disabled', true);
    $('#txtdate').prop('disabled', true);
    $('#Debitaccount').prop('disabled', true);
    $('#Creditaccount').prop('disabled', true);
    $('#txtno').focus();
    $('#Debitaccount').css("background-color", '#ECEFF1');
    $('#Creditaccount').css("background-color", '#ECEFF1');
}
$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S
        SaveAndUpdate(1)
    }
    else if (e.altKey && e.keyCode == 76) {                 //Alt+L        
        enablenobox()
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        createnew();
    }
    else if (e.keyCode == 27) {                           //esc

    }
});

function createnew() {
        var rowcount = document.getElementById('tblPhysicalVariationTransfer').rows.length;
        if (rowcount > 0 && copyflag == 0) {
            $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will be Lost.Do you want to Continue?')
            $('#confirm').show();
            $('#confirmOk').focus();
        }       
        else
            formrefresh();
}
//save
function SaveAndUpdate(Flag) {
    var rowCount = $('#tblPhysicalVariationTransfer tr').length;
    if (rowCount == 0) {
        warningshow('No Products Added');
        return false;
    }
   else if ($('#Debitaccount').val() == '') {
        warningshow('Please Select  Debit Account', 'Debitaccount');
        return false;
    }  
    else if ($('#Creditaccount').val() == "") {
        warningshow('Please Select A Credit Account', 'Creditaccount');
        return false;
    }
    else if (($('#Debitaccount').val() != '') && ($('#hiddendebit').val() == 0)) {
        warningshow('Please Select A Valid Debit Account', 'Debitaccount');
        $('#Debitaccount').select();
        return false;
    }
    else if (($('#Creditaccount').val() != '') && ($('#hiddencredit').val() == 0)) {
        warningshow('Please Select A Valid Credit Account', 'Creditaccount');
        $('#Creditaccount').select();
        return false;
    }
    else {
        $('#btnsubmit').prop("disabled", true);
        var oArray = new Array();
        for (var k = 1; k <= hiddenno; k++) {
            var PVTNo = $('#txtno').val();
            var ProductId = $('#ProductId' + k).val();
            var Location = $('#Location').val();
            var Date = $('#txtdate').val();
            var DebitAccount = $('#hiddendebit').val();
            var CreditAccount = $('#hiddencredit').val();
            var ItemCode = $('#txtprd' + k).val();
            var Description = $('#desc' + k).val();
            var Unit = $('#select_unit' + k).val();
            var Quantity = $('#Qty' + k).val();
            var AvgCost = $('#AvgCost' + k).val();
            var Total = $('#total' + k).val();            
            var UId = ERPUserId;
            var DeptId = ERPDeptId;
            var StockAdjNo = $('#StockAdjId' + k).val();
            if (Description != undefined) {
                oArray.push({
                    'PVTNo': PVTNo,
                    'ProductId': ProductId,
                    'DebitAccount': DebitAccount,
                    'CreditAccount': CreditAccount,
                    'ItemCode': ItemCode,
                    'Description': Description,
                    'Location': Location,
                    'UnitId': Unit,
                    'Quantity': Quantity,
                    'AvgCost': AvgCost,
                    'Total': Total,
                    'Date': Date,
                    'UId': UId,
                    'DeptId': DeptId,
                    'StockAdjNo': StockAdjNo,
                })
            }
        }
        if (oArray != "") {
            var data = { 'StockAdjustmentModel': oArray };
            $.ajax({
                type: "POST",
                url: "../../inventory/PhysicalVariationTransferInsert",
                data: data,
                success: function (result) {
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var Number = result.oList[i].PVTNo;
                        $('#btnsubmit').prop("disabled", false);
                        Showalerts(status,Number);
                        formrefresh();
                    }
                }
            });
        }
    }
}
//acccount number load
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
        $('#Debitaccount').val(result[k].AccCode);
        $('#hiddendebit').val(result[k].AccountId);
        $('#Creditaccount').val(result[k].CAccCode);
        $('#hiddencredit').val(result[k].CAccountId);
        $('#txtdacnt').val(result[k].DAccountDescription);
        $('#txtcacnt').val(result[k].AccountDescription);

    }
}
function formrefresh()
{
    serialnoload();
    AccountLoad(2);
    $('#Location').focus();
    $("#tblPhysicalVariationTransfer tr").remove();
    $('#Debitaccount').val('');
    $('#Creditaccount').val('');
    $('#btnsubmit').prop('disabled', false);
    $('#btnlist').prop('disabled', false);
    $('#moreprod').prop('disabled', false);
    $('#Location').prop('disabled', false);
    $('#Debitaccount').prop('disabled', false);
    $('#Creditaccount').prop('disabled', false);
    $('#txtno').prop('disabled', true);
    $('#txtdate').val(CurDate);
    $('#Location').val(0);
    $('#txtdate').prop('disabled', false);
    $('#Debitaccount').css("background-color", 'white');
    $('#Creditaccount').css("background-color", 'white');
    copyflag = 0;
}
function Showalerts(Status, Number) {
    if (Status == 1) {
        swal('Stock Adjustment Number :' + Number, " Saved Successfully", "success");
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

//validating account
function checkDebitAccounttextempty(evt) {
  
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13 && charCode != 9) {
        $('#hiddendebit').val(0);
        $('#txtdacnt').val('');
    }
}

function checkCreditAccounttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13 && charCode != 9) {
        $('#hiddencredit').val(0);
        $('#txtcacnt').val('');
    }    
}
//copy
function enablenobox() {
    var rowcount = $('#tblPhysicalVariationTransfer tr').length;       
    if (rowcount > 0) {
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

function ShowPVTGet(result) {
    var i = 1;
    for (var m = 0; m <= result.length; m++) {
        var slno = parseInt(i);
        var ProdRowEdit = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:4%;text-align:center >"
          + slno + "<input type='hidden' id='SlNo" + slno + "' value=" + slno + "></td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:6%;text-align:center' > <input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;' id='txtprd" + slno + "' value='"
          + result[m].ItemCode + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 20%;text-align:center' ><input type='text'  class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;' id='desc" + slno + "' value='"
          + result[m].Description + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:6%;text-align:center' ><input type='text'  class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;' id='desc" + slno + "' value='"
          + result[m].UnitName + "'/>  </td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width:6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;'    value='"
          + result[m].Quantity + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 6%;text-align:center' ><input type='text' class='form-control text-center'  disabled=disabled  style='background-color:white;height:30px;border:0px;'   id='AvgCost" + slno + "' value='"
          + result[m].AvgCost + "'/></td><td class= 'jsgrid-cell jsgrid-align-left'  style= 'width: 6%;' ><input typ='text' class='form-control text-center' disabled=disabled style='background-color:white;height:30px;border:0px;'   id='total" + slno + "' value="
          + Math.abs(result[m].Total) + "></td><td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= 'width: 4%;' ><input class= 'jsgrid-button jsgrid-edit-button' onclick='Editrow(" + slno + ")' style='display:none;' id='Edit' type=button title=Edit ><input class= 'jsgrid-button jsgrid-delete-button'  type= button style='display:none;' id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td><td id='Update"
          + slno + "'  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;display:none;'><input class='jsgrid-button jsgrid-update-button' onclick='Updaterow(" + slno + ")' type=button id='update' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditrow(" + slno + ")' type='button' id='CancelEdit' title='Cancel edit'></tr>";

        $('#tblPhysicalVariationTransfer').append(ProdRowEdit);
        $('#select_unit' + slno).val(result[m].UnitId);
        i++;
    }
}

//selecting another number in number search
function checkPVTdjtextempty() {
    $('#Location').val('0');
    $("#tblPhysicalVariationTransfer tr").remove();
    $('#Debitaccount').val('');
    $('#Creditaccount').val('');
}