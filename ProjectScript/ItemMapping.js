var SubId = 2;
$(document).ready(function () {


    Defaultfocus();
    GetItemGroup(0);
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });


    $("#ItemName").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#ItemGroup').focus();
        }

    });
    $("#ItemGroup").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#SubItems_1').focus();
        }

    });
});

function additems() {

    var RW=parseInt(SubId-1)
    if ($('#SubItems_' + RW).val() == 0) {
        warningshow('Please Enter Sub Item', 'SubItems_' + RW);
    }
    else if ($('#Quantity_' + RW).val() == 0) {
        warningshow('Please Enter Quantity', 'Quantity_' + RW);
    }
    else {
        $('#Itemsdiv').append("</br><div id='Roww_" + SubId + "' id='' style='margin-top:-20px' class='row'><div style='text-align:center' class='col-md-1'><a onclick='removerow(" + SubId + ")'><i class='icon-trash'></i></a></div ><div class='col-md-3'  style='width:20%;'><input type='hidden' class='form-control' id='SubItems_" + SubId + "_Id' value='0' /><input type='text' class='form-control' id='SubItems_" + SubId + "' onkeypress=AccessoriesLoad('SubItems_" + SubId + "','" + SubId + "') onkeyup=CheckID('SubItems_" + SubId + "') /></div> <div  class='col-md-2'><input type='text' class='form-control' id='notes_" + SubId + "'  /></div>   <div style=display:none class='col-md-2'><input type='text' class='form-control' id='txtdaily_" + SubId + "' /></div><div class='col-md-2'><input type='text' onfocus='mednoteload(" + SubId + ")' class='form-control' id='txtdosage_" + SubId + "'  /></div><div class='col-md-1'><input type='text' class='form-control' id='txtdays_" + SubId + "'  /></div>    <div  class='col-md-1'><input type='number' class='form-control' id='Quantity_" + SubId + "'  /></div> ")
        $('#SubItems_' + SubId).focus()
        SubId++;
    }

}
//function AccessoriesLoad(Id)
//{

//}
function Showaccessories(result) {
    if (result.length >= 1) {
        $('#SubItems_1').val(result[0].SubItemName);
        $('#SubItems_1_Id').val(result[0].SubItemId);
        $('#Quantity_1').val(parseInt(result[0].Quantity || 0));
    }
    for (var i = 1; i < result.length; i++) {

        $('#Itemsdiv').append("</br><div class='row'><div class='col-md-3'></div><div class='col-md-4' style='width:20%;'><input type='hidden' class='form-control' id='SubItems_" + SubId + "_Id' value='" + result[i].SubItemId + "' /><input type='text' class='form-control' id='SubItems_" + SubId + "' onkeypress=AccessoriesLoad('SubItems_" + SubId + "','" + SubId + "') onkeyup=CheckID('SubItems_" + SubId + "') value='" + result[i].SubItemName + "' /></div><div class='col-md-1'><input type='text' class='form-control' id='Quantity_" + SubId + "'  value='" + parseInt(result[i].Quantity || 0) + "' /></div><div class='col-md-2'></div></div>")
        SubId++;

    }
}


function CheckID(Id) {
    if ($('#' + Id).val() == '') {
        $('#' + Id + '_Id').val(0);
    }
}

//Load Groups
function Defaultfocus() {
    $('#ItemName').focus();
}
function GetItemGroup(GroupId) {
    var data = {};
    data.GroupId = 0;
    $.ajax({
        type: "POST",
        url: "../ItemMapping/ItemGroupGetandGets",
        data: data,
        success: function (result) {
            Loadgroup(result.oList);
        }
    });
}


function GetItemGroupload() {
    var data = {};
    data.GroupId = $("#Itemgroup1").val()
    $.ajax({
        type: "POST",
        url: "../ItemMapping/ItemGroupGetandGets",
        data: data,
        success: function (result) {
            Loadgrouplist(result.oList);
        }
    });
}





function Loadgrouplist(result) {
    //formrefresh();
    var DD = ''; var AA = parseInt(SubId - 1);
    DD = result[0].GroupName.split("#");
    console.log(DD)
    $('#SubItems_1_Id').val(DD[0]);
    $('#SubItems_1').val(DD[2]);
    $('#Quantity_1').val(DD[7]);
    $('#notes_1').val(DD[6]);
    $('#txtdaily_1').val(DD[3]);
    $('#txtdosage_1').val(DD[4]);
    $('#txtdays_1').val(DD[5]);
    $('#ItemName').val(DD[1]);
    for (var i = 1; i < result.length; i++) {
        DD = result[i].GroupName.split("#");        
      
        $('#Itemsdiv').append("</br><div id='Roww_" + SubId + "' style='margin-top:-20px' class='row'> <div style='text-align:center' class='col-md-1'><a onclick='removerow(" + SubId + ")'><i class='icon-trash'></i></a></div ><div class='col-md-3'  style='width:20%;'><input type='hidden' class='form-control' id='SubItems_" + SubId + "_Id' value='" + DD[0] + "' /><input type='text' class='form-control' id='SubItems_" + SubId + "' onkeypress=AccessoriesLoad('SubItems_" + SubId + "','" + SubId + "') onkeyup=CheckID('SubItems_" + SubId + "'   value='" + DD[2] + "') /></div><div  class='col-md-2'><input type='text' class='form-control' id='notes_" + SubId + "' value='" + DD[6] + "' /></div><div class='col-md-2'><input type='text' onfocus='mednoteload(" + SubId + ")' class='form-control' id='txtdosage_" + SubId + "' value='" + DD[4] + "' /></div><div class='col-md-1'><input type='text' class='form-control' id='txtdays_" + SubId + "' value='" + DD[5] + "'  /></div>  <div style='display: none' class='col-md-2'><input type='text' class='form-control' id='txtdaily_" + SubId + "' value='" + DD[3] + "'/></div>  <div  class='col-md-1'><input type='number' class='form-control' id='Quantity_" + SubId + "' value='" + DD[7] + "' /></div>")
         SubId++;
    }
    $('#btndelete').show()
}

function removerow(ID) {
    $('#Roww_' + ID).remove();
}



function Loadgroup(result) {
    $("#Itemgroup1").empty();
    var group = "<option value=0> -Select- </option>";
    for (var i = 0; i < result.length; i++) {
        group += "<option value='" + result[i].GroupId + "'>" + result[i].GroupName + "</option>";
    }
    $("#Itemgroup1").append(group);
}

function SaveAndUpdate(Flag) {
    if ($('#ItemName').val() == '') {
        warningshow('Please Enter template Group', 'ItemName');
    }
    
    else {
        var XArray = new Array();
        for (var i = 1; i <= SubId ; i++) {
            var ItemId = $('#ItemName_Id').val();
            var GroupId = Flag;
            var SItemsId =parseInt( $('#SubItems_' + i + '_Id').val());
          
            var Quantity = parseInt($('#Quantity_' + i).val()||0);
            var AutomobileItems = $('#ItemName').val() + '#' + $('#SubItems_' + i).val() + '#' + $('#txtdaily_' + i).val() + '#' + $('#txtdosage_' + i).val() + '#' + $('#txtdays_' + i).val() + '#' + $('#notes_' + i).val();
            if (SItemsId!=0) {
            XArray.push({
                'ItemId': ItemId,
                'GroupId': GroupId,
                'SItemsId': SItemsId,
                'Quantity': Quantity,
                'AutomobileItems': AutomobileItems,
            })
            }
        }
       
        if (XArray != "") {
            var data = { 'ItemMappingModel': XArray };
            $.ajax(
        {
            type: "POST",
            url: "../ItemMapping/ItemGroupMappingInsert",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                Showalerts(status);
            }
        });
        }
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



function Showalerts(Status) {
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 2) {
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
}


function formrefresh() {
    SubId = 2;
    $('#ItemName').val('');
    $('#ItemName_Id').val('');
    $('#ItemGroup').val('0');
    $('#Itemsdiv').empty();
    $('#SubItems_1').val('');
    $('#Quantity_1').val('');
    $('#txtdaily_1').val('');
    $('#txtdosage_1').val('');
    $('#txtdays_1').val('');
    $('#notes_1').val('')
    Defaultfocus();
    $('#btndelete').hide();
   // GetItemGroupload()
}