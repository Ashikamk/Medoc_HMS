var SearchFlag = 0;
$(document).ready(function () {

    UnitpageLoad();
    GroupPageLoad();
    CategoryPageLoad();
    SubCategoryGets();
    VatPageLoad();
    Defaultfocus();

    $("#MTaxId").change(function () {
        var selectedValue = $(this).val();
        $("#MTaxPer").val($(this).find("option:selected").attr("name"))

    });

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)

    });
    $("#btndelete").click(function (e) {
        SaveAndUpdate(0)

    });
    $("#btnnew").click(function (e) {
        formrefresh(1)

    });
    $("#btnlist").click(function (e) {
        formrefresh(1);
        GetRows(0)

    });
    $("#btnsearch").click(function (e) {
        if (SearchFlag == 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Search'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Current Data Will be lost !.. Continue?');
        }
        else {
            $("#MCodeSearch").focus().select();
        }

    });

    $('#MCode').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#MName").focus().select();

        }
    });

    $('#BinH').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#btnsubmit").focus();

        }
    });

    $('.enterflow').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:text:enabled,select:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();

        }
    });

    $("#selectedImage").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });

});

function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
}
function PopUprefresh() {
    $('#popupdiv').hide();

    $('#unitname').val(''); $('#unitdesc').val('');
    $('#groupcode').val(''); $('#groupdesc').val(''); $('#groupname').val('');
    $('#grp').val(0); $('#sbgroupname').val(''); $('#sbgroupdesc').val('');
    $('#catcode').val(''); $('#catname').val(''); $('#catdesc').val('');
    $('#cat').val(0); $('#sbcatname').val(''); $('#sbcatdesc').val('');

}

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

function UnitLoad(result) {
    $("#MUnit").empty();
    $("#MUnit").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#MUnit").append("<option value='" + result[i].UnitId + "'>" + result[i].UnitName + "</option>");
    }
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

function GroupLoad(result) {
    $("#MCompany").empty();
    $("#MCompany").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#MCompany").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }

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

function CategoryLoad(result) {
    $("#MType,#cat").empty();
    $("#MType,#cat").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {

        $("#MType,#cat").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
}

function SubCategoryGets() {
    var data = {};
    data.SubCategoryId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SubCategoryGetandGets",
        data: data,
        success: function (result) {
            SubCategoryLoad(result.oList);
        }
    });
}

function SubCategoryLoad(result) {
    $("#MSchedule").empty();
    //$("#MSchedule").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#MSchedule").append("<option value='" + result[i].SubCategoryId + "'>" + result[i].SubCategoryName + "</option>");
    }
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

function VatLoad(result) {

    $("#MTaxId").empty();
    for (var i = 0; i < result.length; i++) {

        $("#MTaxId").append("<option value='" + result[i].TaxId + "' name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>");
    }

    $("#MTaxPer").val($("#MTaxId").find("option:selected").attr("name"));

}

function Defaultfocus() {
    $("#MCode").focus().select();
}
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh(1);
}

function locationwiseqtyupdateclear() {
    $('#MOpenQty').val(0);
    $('.deloc').val(0);
}

function locationwiseqtyupdate() {
    var Qty = 0;
    $('#popupdiv').hide();
    var num = parseInt($('#NoOfLocations').val() - 1);
    for (var i = 0; i <= num; i++) {
        var LocationID = $('#locID' + i).val();
        var LocationQty = parseInt($('#lqty' + LocationID).val() || 0);
        if (LocationQty != 0) {
            Qty += LocationQty;
        }
    }
    $('#MOpenQty').val(Qty);
}

function EditInvoice(Flag) {

    if ((Flag == 1 && $("#MOpenCost").prop("readonly") == true) || Flag == 0) {

        $("#btncnclsave").attr("onclick", "CheckEditInvoce(" + Flag + ")");
        $('#otp,#otpremarks').prop("disabled", false);
        $('#OTPDiv').show();
        $("#otp,#otpremarks").val('');
        $("#otp").focus().select();
    }

}

function CheckEditInvoce(Flag) {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'Item : ' + $("#MCode").val() + ' , OP Quantity Edit- OTP';
        else if (Flag == 1)
            Operation = 'Item : ' + $("#MCode").val() + ' , OP Cost Edit- OTP';

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
        $('#OTPDiv').hide();
        if (Flag == 0) {
            Addpopupwindow(5);
        }
        else if (Flag == 1) {
            $("#MOpenCost").prop("readonly", false);
            $("#MOpenCost").focus().select();
        }

    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
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
        $('#myheader').text('Company Master');
        $('#groupdiv').show();
        $('#groupcode').focus();
    }
    else if (Id == 2) {
        $('#myheader').text('Sub Group Master');
        $('#subgroupdiv').show();
        $('#grp').focus();
    }
    else if (Id == 3) {
        $('#myheader').text('Type Master');
        $('#categorydiv').show();
        $('#catcode').focus();
    }
    else if (Id == 4) {
        $('#myheader').text('Schedule Master');
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

function LocationGets() {
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
    if ($("#MedicineId").val() == 0) {
        var responseText = '';
        if ($('#NoOfLocations').val() == 0) {

            for (var i = 0; i < result.length; i++) {
                responseText += '<div class="form-group row" style="border-bottom:1px solid #f2f2f2;height:40px"><label class="col-md-9" for="code">' + result[i].LocationName + '</label><div class="col-md-3" style="margin-top:-10px"><input type=hidden id=' + "locID" + i + ' value=' + result[i].LocationId + '><input class="form-control deloc" type="text" id=' + "lqty" + result[i].LocationId + ' value="0" onkeypress="isNumberInt(event,this)"  autocomplete="off"></div></div>'
            }
            $('#NoOfLocations').val(result.length);
            $('#divopenig').html('')
            $('#divopenig').append(responseText);
        }
    }
}

function SaveAndUpdate(Flag) {
    $("#HSNId").val(1);
    // $('#MHSN').val(0)
    if (Flag == 0) {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(Flag);
        $('#confirmmessage').text('Do you want to Delete this Medicine?');
    }
    else if ($.trim($('#MCode').val()) == "") {
        warningshow('Please Enter Code', 'MCode');
    }
    else if ($.trim($('#MName').val()) == "") {
        warningshow('Please Enter Name', 'MName');
    }
    else if (parseInt($('#MUnit').val() || 0) == 0) {
        warningshow('Please Select Unit', 'MUnit');
    }
    else if (parseInt($('#MCompany').val() || 0) == 0) {
        warningshow('Please Select Company', 'MCompany');
    }
    else if (parseInt($('#MType').val() || 0) == 0) {
        warningshow('Please Select Type', 'MType');
    }
    else if (parseInt($('#MSchedule').val() || 0) == 0) {
        warningshow('Please Select Schedule', 'MSchedule');
    }
    else if (parseInt($('#MTaxId').val() || 0) == 0) {
        warningshow('Please Select Tax', 'MTaxId');
    }
    else if ($.trim($('#MHSN').val()) == '') {
        warningshow('Please Enter HSN', 'MHSN');
    }
    else if (parseInt($("#HSNId").val() || 0) == 0) {
        warningshow('Please Select Valid HSN from list', 'MHSN');
    }
    //else if ($("#HSNId").val() == 0 && $.trim($('#MHSN').val()) != '') {
    //    warningshow('Please Select Valid HSN', 'MHSN');
    //}
    else {                   //ajax code for insert and update to master controller 
        if (parseInt($("#MedicineId").val() || 0) == 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Save'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to Save this Medicine?');
        }
        else {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Update'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to Modify this Medicine?');
        }
    }
}

function OKSaveandUpdate(Flag) {

    var totalFiles = document.getElementById("selectedImage").files.length;
    var ImageExt = '';
    if (totalFiles != 0) {
        var browsedFile = document.getElementById("selectedImage").files[0];
        ImageExt = (browsedFile.name).split('.').pop();

    }
    if ($('#select_status').prop("checked")) var s = 1;
    else var s = 0;

    var data = {};       //array

    data.ItemId = $('#MedicineId').val();
    data.Active = s;
    data.ItemCode = $.trim($('#MCode').val());
    data.Description = $.trim($('#MName').val());
    data.Otherdescription = $('#MGName').val();
    data.Specification = $('#MAIOCD').val();
    data.Unit = $('#MUnit').val();
    data.Group = $('#MCompany').val();
    data.SubGroup = 0;
    data.Category = $('#MType').val();
    data.SubCategory = $('#MSchedule').val();
    data.OpeningQty = $('#MOpenQty').val();
    data.OpeningCost = $('#MOpenCost').val();
    data.VatCode = $('#MTaxId').val();
    data.Hsncode = $.trim($('#MHSN').val());
    data.SellingPrice = $('#MSP1').val();
    data.MRP = $('#MMRP').val();
    data.SellingPrice1 = $('#MSP2').val();
    data.SellingPrice2 = $('#MSP3').val();

    data.Model1 = parseInt($('#MCess').val() || 0);
    data.model2 = $('#MQtyBox').val();
    data.Model3 = $('#MPack').val();

    data.MaxQty = $('#MMaxQty').val();
    data.MinQty = $('#MMinQty').val();

    data.Bin_A = $('#BinA').val();
    data.Bin_B = $('#BinB').val();

    data.Bin_C = $('#BinC').val();
    data.Bin_D = $('#BinD').val();
    data.Bin_E = $('#BinE').val();
    data.Bin_F = $('#BinF').val();
    data.Bin_G = $('#BinG').val();
    data.Bin_H = $('#BinH').val();

    data.Size = 0;
    data.Weight = 0;
    data.Length = 0;
    data.Width = 0;
    data.Thickness = 0;
    data.Density = 0;
    data.LPcost = 0;
    data.AvgCost = 0;
    data.StockIn = 0;
    data.StockOut = 0;

    data.modelm1 = $('#MColdStorage').val();
    data.modelm2 = $('#MBanned').val();
    data.modelm3 = '';
    data.modelm4 = '';
    data.modelm5 = '';

    data.DelFlag = Flag;

    if ($('#BelowCostflg').prop("checked")) { var BelowCost = 1; }
    else { var BelowCost = 0; }

    data.MultiPriceId = BelowCost;
    data.UserId = ERPUserId;
    data.DeptId = ERPDeptId;
    data.ImageExt = ImageExt;

    console.log(data)
    $.ajax({
        type: "POST",
        url: "../Master/ItemInsertandUpdate",
        data: data,
        success: function (result) {
            for (var i = 0; i < result.oList.length; i++) {
                var status = result.oList[i].Status;
                var itemid = result.oList[i].ItemId;
                if (status == 1 || status == 2) {
                    fnImageSave(result.oList[i].ItemId);



                    //Location wise Quantity Insert and Update
                    var QArray = new Array();


                    for (var i = 0; i <= parseInt($('#NoOfLocations').val() - 1); i++) {

                        var LocationID = $('#locID' + i).val();
                        var LocationQty = parseInt($('#lqty' + LocationID).val());
                        var ItemId = itemid;
                        if (LocationID != 0) {
                            QArray.push({ 'LocId': LocationID, 'OpeningQty': LocationQty, 'ItemId': ItemId, 'DeptId': ERPDeptId })
                        }
                    }


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


                Showalertsthis(status);

            }
        }
    });


}


function fnImageSave(imageName) {

    var formData = new FormData();
    var ImageId = "0";
    var totalFiles = document.getElementById("selectedImage").files.length;
    if ((imageName != "" && totalFiles != 0)) {


        var browsedFile = document.getElementById("selectedImage").files[0];
        var Ext = (browsedFile.name).split('.').pop();

        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", imageName);
            formData.append("UniqueId", ImageId);
            formData.append("Ext", Ext);
            $.ajax({
                type: "POST",
                url: '/Master/UploadMedicineImage',
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {
                    $("#selectedImage").val('');
                    $('#myImg').attr('src', "../app-assets/img/elements/Pills.png");
                }
            });
        }
    }
    else {

        $("#selectedImage").val('');
        $('#myImg').attr('src', "../app-assets/img/elements/Pills.png");

        return;
    }
}

function GetRows(ItemId) {
    if (ItemId == 0) {
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

function ShowItemlist(result) {

    console.log(result[0])
    $('#Entry').hide();
    $('#listing').show();

    //debugger;
    disable_datatable('tblItem');
    var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=15%>Code</th><th width=25%>Name</th><th width=20%>Category</th><th width=7%>Unit</th><th width=25%>Group</th><th width=25%>Tax%</th><th width=25%>Rate</th><th width=10%>Status</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].ItemCode + '</td><td>' + result[i].Description + '</td><td>' + result[i].CategoryName + '</td><td>' + result[i].UnitName + '</td><td>' + result[i].GrpName + '</td>   <td>' + result[i].TaxName + '</td>  <td>' + result[i].MrpRate + '</td>  <td>' + result[i].Status + '</td><td align=center><a onclick="GetItem(' + result[i].ItemId + ',' + result[i].GroupId + ',' + result[i].CategoryId + ');">' + Editbutton + '</a></td></tr>';
    }
    $('#tblItem').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Name</th><th>Description</th><th>Unit</th><th>Group</th><th>Tax%</th><th>Rate</th><th>Status</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblItem');

    $('#Loading').hide();

}

Serialnoload()
var CODEPREFIX = 'GW'
function Serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {


            $('#MCode').val(CODEPREFIX + '' + result.oList[0].ContainerImportNO);


        }
    });
}



function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Unit' && title != 'Sl#' && title != 'Status' && title != 'Tax%' && title != 'Rate' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Code' || title == 'Name' || title == 'Description')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
    });

    table = $('#' + tablename).DataTable({
        dom: 'Blfrtip',
        dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-1'i><'col-sm-11'p>>",
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
                        title: title,
                        messageTop: 'MEDOC HMS',

                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',

                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',

                    }
                ]
            },
            // 'colvis'
        ]
    });
    table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
    $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");

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

function GetItem(ItemId, GroupId, CategoryId) {

    $('#Loading').show();

    $('#MCompany').val(GroupId);
    $('#MType').val(CategoryId);

    setTimeout(function () {
        $('#MedicineId').val(ItemId)
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
                    $('#Loading').hide();

                    $.ajax({
                        type: "POST",
                        url: "../Master/LocationWiseProductQty",
                        data: data,
                        success: function (result) {
                            var responseText = '';
                            result = result.oList;
                            $('#NoOfLocations').val(result.length)
                            for (var i = 0; i < result.length; i++) {
                                responseText += '<div class="form-group row" style="border-bottom:1px solid #f2f2f2;height:40px"><label class="col-md-9" for="code">' + result[i].SbgrpName + '</label><div class="col-md-3" style="margin-top:-10px"><input type=hidden id=' + "locID" + i + ' value=' + result[i].LocId + '><input class="form-control deloc" type="text" id=' + "lqty" + result[i].LocId + ' value=' + result[i].OpeningQty + ' onkeypress="isNumberInt(event,this)"  autocomplete="off"></div></div>'
                            }
                            $('#divopenig').html('')
                            $('#divopenig').append(responseText);
                        }
                    });


                }
            }
        });
    }, 500);
}

function ShowItemGet(result) {
    SearchFlag = 0;
    var dd = new Date();
    $('.pip').remove();
    $.ajax({
        url: "../ProjectImages/Products/" + result[0].ItemId + "/" + result[0].ItemId + "." + result[0].ImageExt,
        type: 'HEAD',
        error: function () {
            $('#myImg').attr('src', "../app-assets/img/elements/Pills.png");
        },
        success: function () {
            $('#myImg').attr('src', "../ProjectImages/Products/" + result[0].ItemId + "/" + result[0].ItemId + "." + result[0].ImageExt + "?" + dd.getTime());
        }
    });

    $("#CrntMode").removeClass();
    $("#CrntMode").addClass("badge badge-warning white");
    $("#CrntMode").text('Mode : Modify');

    for (var i = 0; i < result.length; i++) {


        $('#MedicineId').val(result[i].ItemId);
        $('#MCode').val(result[i].ItemCode);
        $('#MName').val(result[i].Description);
        $('#MGName').val(result[i].Otherdescription);
        $('#MUnit').val(result[i].UnitId);
        $('#MCompany').val(result[i].GrpId);
        $('#MType').val(result[i].CategoryId);
        $('#MColdStorage').val(result[i].modelm1);
        $('#MBanned').val(result[i].modelm2);
        $('#MSchedule').val(result[i].SubCategoryId);
        $('#MOpenQty').val(result[i].OpeningQty);
        $('#MOpenCost').val(result[i].OpeningCost.toFixed(Decimal));
        $('#MLPCost').val(result[i].LPCost.toFixed(Decimal));
        $('#MAvgCost').val(result[i].AvgCost.toFixed(Decimal));
        $('#MTaxId').val(result[i].VatId);
        $('#MTaxPer').val(result[i].VatPer);
        $('#MSP1').val(result[i].SellingPrice.toFixed(Decimal));
        $('#MMRP').val(result[i].MRP.toFixed(Decimal));
        $('#MSP2').val(result[i].SellingPrice1.toFixed(Decimal));
        $('#MSP3').val(result[i].SellingPrice2.toFixed(Decimal));
        $('#MCess').val(result[i].Model1);
        $('#MQtyBox').val(result[i].Model2);
        $('#MPack').val(result[i].Model3);
        $('#MMaxQty').val(result[i].MaxQty);
        $('#MMinQty').val(result[i].MinQty);
        $('#BinA').val(result[i].Bin_A);
        $('#BinB').val(result[i].Bin_B);
        $('#BinC').val(result[i].Bin_C);
        $('#BinD').val(result[i].Bin_D);
        $('#BinE').val(result[i].Bin_E);
        $('#BinF').val(result[i].Bin_F);
        $('#BinG').val(result[i].Bin_G);
        $('#BinH').val(result[i].Bin_H);
        $('#MAIOCD').val(result[i].Specification);
        $('#MHSN').val(result[i].Hsncode);
        $('#MStock').val(result[i].StockIn);
        $("#HSNId").val(result[i].DivId)

        if (result[i].Active == 0) {
            $('#select_status').prop("checked", false);
        } else {
            $('#select_status').prop("checked", true);
        }


    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#Loading').hide();
    generatebarcode();
    createQRCode();
    Defaultfocus();
}

function formrefresh(Flag) {
    SearchFlag = 0;
    $('.denull').val('');
    $('.dezero').val(0);
    $('.deone').val($(".deone option:first").val());
    $('.deno').val("NO");
    $("#MTaxPer").val($('#MTaxId').find("option:selected").attr("name"))
    $("#select_status").prop("checked", true);
    $("#btndelete").hide();
    $("#MCodeSearch").hide();
    $("#MCode").show();
    $("#CrntMode,#btnsearch").removeClass();
    $("#CrntMode").addClass("badge badge-primary");
    $('#btnsearch').addClass('btn btn-outline-info');
    $("#CrntMode").text('Mode : Insert');

    $('#btnsubmit').prop("disabled", false);
    $('#btnsubmit').show();


    generatebarcode();
    createQRCode();
    Defaultfocus();
    if (Flag == 1) {
        $("#selectedImage").val('');
        $('#myImg').attr('src', "../app-assets/img/elements/Pills.png");
    }
}

function OKSearch() {
    SearchFlag = 1;
    formrefresh(1);
    $("#MCodeSearch").val('');
    $("#MCodeSearch").show();
    $("#MCode").hide();
    $('#btnsearch').removeClass();
    $('#btnsearch').addClass('btn btn-outline-danger');
    $('#btnsubmit').prop("disabled", true);
    $('#btnsubmit').hide();
    $("#CrntMode").removeClass();
    $("#CrntMode").addClass("badge badge-danger");
    $("#CrntMode").text('Mode : Search');
    $("#MCodeSearch").focus();

}

function Showalertsthis(Status) {

    if (Status == 1) {
        formrefresh(0);
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh(0);
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();


    }
    else if (Status == 3) {
        formrefresh(1);
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

function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'Save') {
        OKSaveandUpdate(rowid);
    }
    else if (Result == 'true' && status == 'Update') {
        OKSaveandUpdate(rowid);
    }
    else if (Result == 'true' && status == 'Delete') {
        OKSaveandUpdate(rowid);
    }
    else if (Result == 'true' && status == 'Search') {
        OKSearch();
    }

    $('#confirm').fadeOut();

}

//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

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


function datatableWithsearch(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Slno' && title != 'Serial#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Key')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
    });
    var table = null;
    if (download) {
        if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }

        // AddColumnSelectionButton(tableButtonContainerId, tablename)

        table = $('#' + tablename).DataTable({
            // dom: 'Bfrtip',
            dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-1'i><'col-sm-11'p>>",
            buttons: []

        });
        new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    className: 'excelexport',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: ":visible" }
                        },
                        {
                            extend: 'pdfHtml5',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: ":visible" }
                        },
                        {
                            extend: 'print',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: ":visible" }
                        }
                    ]
                },
                'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
        //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
        //    var column = table.column($(this).attr('data-em-col'));
        //    console.log($(this).attr('data-em-col'));
        //    console.log(column);
        //    column.visible($(this).prop("checked"));
        //});
    } else {
        table = $('#' + tablename).DataTable();
    }
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
    if (ExcelExport == 0) {
        $('.excelexport').hide();
    }
}



function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}

function QuantityBarcode() {
    $('#PrintQty').val(1);
    $('#QuantityPrintDiv').show();
    $('#PrintQty').focus();
    $('#PrintQty').select();
}


function printbarcode() {

    $('#tblBarcode').html('');

    var Description = $('#MName').val();
    var Code = $('#MCode').val();


    var txt = "<tr><th></th></tr>";
    txt += '<tr><td>CT~~CD,~CC^~CT~</td></tr>';
    txt += '<tr><td>^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR4,4~SD15^JUS^LRN^CI0^XZ</td></tr>';
    txt += '<tr><td>^XA</td></tr>';
    txt += '<tr><td>^MMT</td></tr>';
    txt += '<tr><td>^PW812</td></tr>';
    txt += '<tr><td>^LL0508</td></tr>';
    txt += '<tr><td>^LS0</td></tr>';
    txt += '<tr><td>^FO320,256^GFA,01536,01536,00024,:Z64:</td></tr>';
    txt += '<tr><td>eJxjYBgFo2DgAfsHCM3DDmT/ATIS6o9/qGdg4IeJMzEwMP8AMg7Y9//4D+QLQMRlQOrBrAIWmYMNDDwSH/oMD+48eILtEQcTQ5uaRYMCDwdQXKb477nyj98//2H/LsPGeKz+74EEGZvjQPMfc/SlKbcpW/AlW/D/6Cue0fC//8c/Bgb547L3/D/zf5eQKTbg/9hTLNnwX/4j0F0STByz+j/zf5LgUFbgYexIkmw4IAE0HugOmetn2HnYDGSKC2SYZdKNGQ/IJB5gYLBgsnjcl8SXZsCT/ICDWeKZMUODRTJQvQHzh+/sx9mPf5A/eED+85/jxoz/BYqBvjBgfPCYuYm5eYN0Y4P8xxltSoz/DYxRQorxAPYQ5G/AIU5ulIyCEQAA715fmQ==:419B</td></tr>';
    txt += '<tr><td>^BY2,3,155^FT103,240^BCN,,Y,N</td></tr>';
    txt += '<tr><td>^FD>:' + Code + '^FS</td></tr>';
    txt += '<tr><td>^FT105,72^A0N,25,21^FH\^FD' + Description + '^FS</td></tr>';
    txt += '<tr><td>^PQ1,0,1,Y^XZ</td></tr>';


    $('#tblBarcode').append(txt);
    PrintBarcode();
}


function PrintBarcodesItemMaster(PrintQuantity) {

    $('#tblBarcode').html('');
    var txt = "<tr><th></th></tr>";
    var Code = $('#MCode').val();
    var Description = $('#MName').val();


    for (var j = 0; j < PrintQuantity; j++) {


        txt += '<tr><td>CT~~CD,~CC^~CT~</td></tr>';
        txt += '<tr><td>^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR4,4~SD15^JUS^LRN^CI0^XZ</td></tr>';
        txt += '<tr><td>^XA</td></tr>';
        txt += '<tr><td>^MMT</td></tr>';
        txt += '<tr><td>^PW812</td></tr>';
        txt += '<tr><td>^LL0508</td></tr>';
        txt += '<tr><td>^LS0</td></tr>';
        txt += '<tr><td>^FO320,256^GFA,01536,01536,00024,:Z64:</td></tr>';
        txt += '<tr><td>eJxjYBgFo2DgAfsHCM3DDmT/ATIS6o9/qGdg4IeJMzEwMP8AMg7Y9//4D+QLQMRlQOrBrAIWmYMNDDwSH/oMD+48eILtEQcTQ5uaRYMCDwdQXKb477nyj98//2H/LsPGeKz+74EEGZvjQPMfc/SlKbcpW/AlW/D/6Cue0fC//8c/Bgb547L3/D/zf5eQKTbg/9hTLNnwX/4j0F0STByz+j/zf5LgUFbgYexIkmw4IAE0HugOmetn2HnYDGSKC2SYZdKNGQ/IJB5gYLBgsnjcl8SXZsCT/ICDWeKZMUODRTJQvQHzh+/sx9mPf5A/eED+85/jxoz/BYqBvjBgfPCYuYm5eYN0Y4P8xxltSoz/DYxRQorxAPYQ5G/AIU5ulIyCEQAA715fmQ==:419B</td></tr>';
        txt += '<tr><td>^BY2,3,155^FT103,240^BCN,,Y,N</td></tr>';
        txt += '<tr><td>^FD>:' + Code + '^FS</td></tr>';
        txt += '<tr><td>^FT105,72^A0N,25,21^FH\^FD' + Description + '^FS</td></tr>';
        txt += '<tr><td>^PQ1,0,1,Y^XZ</td></tr>';
        txt += '<tr></tr>'


    }
    $('#tblBarcode').append(txt);
    PrintBarcode();
    $('#QuantityPrintDiv').hide();
}

function PrintBarcode() {
    var titles = [];
    var data = [];
    $('.dataTableA th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableA tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_barcode.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}

function prepCSVRow(arr, columnCount, initial) {
    var row = ''; // this will hold data
    var delimeter = ''; // data slice separator, in excel it's `;`, in usual CSv it's `,`
    var newLine = '\r\n'; // newline separator for CSV row
    function splitArray(_arr, _count) {
        var splitted = [];
        var result = [];
        _arr.forEach(function (item, idx) {
            if ((idx + 1) % _count === 0) {
                splitted.push(item);
                result.push(splitted);
                splitted = [];
            } else {
                splitted.push(item);
            }
        });
        return result;
    }
    var plainArr = splitArray(arr, columnCount);
    plainArr.forEach(function (arrItem) {
        arrItem.forEach(function (item, idx) {
            row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
        });
        row += newLine;
    });
    return initial + row;
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
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    UnitpageLoad();
                    $('#MUnit').focus();
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
        data.GrpName = $('#groupname').val();
        data.GrpCode = $('#groupcode').val();
        data.GrpDescription = $('#groupdesc').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/GroupInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    GroupPageLoad();
                    $('#MCompany').focus();
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
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    SubGroupGets();
                    $('#sbgroup').focus();
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
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    CategoryPageLoad();
                    $('#MType').focus();
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
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    SubCategoryGets();
                    $('#MSchedule').focus();
                }
            }
        });

    }

}

//Show Window Alert Insert,update delete  Modify
function Showalerts(Status) {

    if (Status == 1) {
        PopUprefresh();
        swal('Data Saved Successfully');

    }
    else if (Status == 2) {
        PopUprefresh();
        swal('Data Updated Successfully');
    }
    else if (Status == 3) {
        PopUprefresh();
        swal('Data Deleted');

    }
    else {
        swal('Data Already Exists');

    }

}