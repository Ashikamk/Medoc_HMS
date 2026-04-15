

///Bill Of quantity-22 aug 2018


var i = 1;
var decimal = 2;
var FlagEdit = 0;
var Flg = 0;

//Show or hide stock popup during stock add,edit,update
function Prodpopshow(flg) {
    if (flg == 1)                       //Job Popup view
    {
        $('#Jobpopup').show();
        $('#JobCodePop').focus().select();
    }
    else if (flg == 2)                       //Job Popup view
    {
        $('#Jobpopup').hide();
        $('#Product_0').focus().select();
    }
    else if (flg == 3)                       //Job Popup view
    {
        JobAdd();
    }
    else if (flg == 5)                       //Job Popup view
    {
        $('.ITMP').val('');
        $('#JobUnit').val(0);
        $('#JobCodePop').focus().select();
    }
}
//Check Product add conditions
function JobAdd() {   //flag:0 - Add 

    if ($.trim($('#JobCodePop').val()) == '') {
        warningshow('Please Enter Job', 'JobCodePop');
        return false;
    }
    else if ($("#JobUnit").val() == 0) {
        warningshow('Please Select Unit', 'JobUnit');
    }
    else if ($("#JobQty").val() == '') {
        warningshow('Please Enter Quantity', 'JobQty');
    }
    else if ($("#JobQty").val() == 0) {
        warningshow('Quantity cannot be zero', 'JobQty');
    }
    else {
        $('#Jobpopup').hide();


        var slno = $('#tblboq tr').length + 1;
        var id = parseInt(i);


        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                "<td id=" + 'col' + id + " class='jsgrid-cell' style='width:30px;text-align:center'>" + slno + "</td>" +
                "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center' ><input type='text' style='display:none'  id='ProductId_" + id + "' value='" + $("#ProductId_0").val() + "'><input type='text' style='height:30px;background-color:white' class='form-control text-center' disabled id='Product_" + id + "' value='" + $('#JobCodePop').val() + "'></td>" +
                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:75px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Description_" + id + "' value='" + $("#JobDesc").val() + "' ></td>" +
                "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Unit_" + id + "' style='height:30px;background-color:white' class='form-control' disabled >" + UnitSelect + "</select></td>" +
                "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id='Quantity_" + id + "' value=" + parseInt($('#JobQty').val()) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id= 'Rate_" + id + "' value=" + parseFloat(isNaN($('#JobRate').val()) ? 0 : ($('#JobRate').val() || 0)).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id= 'Cost_" + id + "' value=" + parseFloat($('#Cost_0').val() || 0).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id= 'Margin_" + id + "' value=" + parseFloat($('#Margin_0').val() || 0).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='TotalAmount_" + id + "' value=" + parseFloat($('#JobAmount').val() || 0).toFixed(Decimal) + "></td>" +
                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' style='display:none'  id='ResourceId_" + id + "' value='" + $("#ResourceId_0").val() + "'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Resource_" + id + "' value='" + $('#Resource_0').val() + "'></td>" +
                "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:70px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Remarks_" + id + "' value='" + $('#Remarks_0').val() + "'></td>" +

                "<td id= 'Edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;width:30px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' style='height:30px' id='btnrowedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' style='height:30px' id='btnrowdel' type='button' onclick='DeleteRow(" + id + ")' title='Delete'></td>" +
                "<td id= 'Update_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;display:none;width:30px'><input  class='jsgrid-button jsgrid-update-button' style='height:30px' id='Update' type='button'  title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' style='height:30px' id='canceledit' type='button' onclick='CancelEdit(" + id + ")'  title='Cancel edit'></td></tr>";

        $('#tblboq').append(ProdRow1);
        $('#Unit_' + id).val($('#JobUnit').val());
        $('#CostCode_' + id).val($('#CostCode_0').val());


        i++;
        clearrow();
        fnGrandTotal(i);
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        fccalculation();
        $('#Product_0').focus().select();
        $('.ITMP').val('');
        $('#JobUnit').val(0);
        $('#Jobpopup').hide();


    }
}
//Manual Focus Button
function Focusbtn(Dst, e, Id) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 39 && (Id == 'btnaddjob')) {
        e.preventDefault();
        $("#btnclrjob").focus();
    }
    else if (key == 37 && (Id == 'btnclrjob')) {
        e.preventDefault();
        $("#btnaddjob").focus();
    }
}



function CustPrdctLoad(result) {

    if ($("#ProductId_0").val() != 0) {

        for (var n = 0; n < result.length; n++) {

            var custstat;
            if (result[n].LastSellingPrice == 0) {
                custstat = "LSP";
            }
            else {
                custstat = "LSP";
            }
            $('#productpdiv,#Infospopup').slideDown();

            $('#prodheader').text('Location Stock Details');
            $('#productdiv').show();

            var strr = result[n].Locationstock;
            var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
            var strr2 = strr1.replace(/#/gi, "&emsp;");

            var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
               "<td style='border:none;font-weight:500;color:yellow' class='text-left'><b>" + $("#Description_0").val() + "</b></td>" +
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
}

//Popup Refresh for Default Popup

function ProductPopuprefresh() {
    $('#productpdiv').hide();
    $('#prodheader').text('');
    $('#productdiv').hide();
    $("#tblproductdetails tr").remove();
}

function CurrencyLoad(result) {

    $("#FC").empty();
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
            var BaseCurrency = result[i].BaseCurrencyId;
        }
    }
    $("#FC").append("<option value='0'>--Select Currency--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#FC").append("<option value='" + result[i].Id + "' name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");
    }
    $('#FC').val(BaseCurrency);
    $('#FCRate').val($('#FC').find("option:selected").attr("name"));

}



function EngineerLoad(result) {
    $("#UserName").empty();
    $("#UserName").append("<option value='0'>--Select Engineer--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#UserName").append("<option value='" + result[i].UserId + "'>" + result[i].UserName + "</option>");
    }
}

function UnitLoad(result) {
    $("#Unit_0,#JobUnit").empty();
    UnitSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "' name='" + result[i].UnitName + "'> " + result[i].UnitName + "</option>";
    }
    $("#Unit_0,#JobUnit").append(UnitSelect);
}


function CurrencyChange(Id) {
    $('#FCRate').val($('#' + Id).find("option:selected").attr("name"));
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

function serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../ProjectandJob/BOQSlNoGetandGets",
        data: srlno,
        success: function (result) {
            getslno(result.oList);

        }
    });

}



function GetRows() {
    if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else {
        $('#BOQNo').prop("disabled", false);
        $('#BOQNo').focus();
        $('#BOQNo').select();

        $('#FCGT').text('FCGT');
        $("#FCGT").css("opacity", '0');
    }
}


var tour;
function gotoreport() {
    window.open('../Purchaseandsalesreports/BOQReport');
}


function Showreport(result) {


    disable_datatable('Tblreport');
    var responseText = "<thead><tr><th>Slno</th><th>BOQ No</th><th>BOQ Date</th><th>Job Code</th><th>Description</th><th>LPO</th><th>EstAmount</th><th>Customer</th><th>FC</th><th>Rate</th><th>Comments</th><th>Engineer</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr onclick=gotobillofqty(' + result[i].BOQSlNo + ')><td>' + slno + '</td><td>' + result[i].BOQSlNo + '</td><td>' + result[i].BOQDate + '</td><td>' + result[i].JobCode + '</td><td>' + result[i].JobDescription + '</td><td>' + result[i].LPO + '</td><td>' + result[i].EstAmount + '</td><td>' + result[i].Customer + '</td><td>' + result[i].FC + '</td><td>' + result[i].CurrencyRate + '</td><td>' + result[i].Comments + '</td><td>' + result[i].UserName + '</td></tr>';
    }
    $('#Tblreport').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th>BOQ No</th><th>BOQ Date</th><th>Job Code</th><th>Description</th><th>LPO</th><th>EstAmount</th><th>Customer</th><th>FC</th><th>Rate</th><th>Comments</th><th>Engineer</th></tr> </tfoot>');
    $('#Tblreportprint').html(responseText + '</tbody>');
    datatableWithsearch('Tblreport');
}


$(document).ready(function () {
    loadlocation();

    var dir = $('body').css('direction');

    if (dir == 'ltr') {
        tour = {
            id: "demo-tour",
            showPrevButton: true,
            steps: [
                {
                    title: " ",
                    content: "Enter BOQNo for getting Details",
                    target: "pixinventLink",
                    placement: "top"
                }
            ]
        };
    }


    $('#btncopy').on('click', function (e) {
        hopscotch.startTour(tour);
    });

    $("#BOQNo").keyup(function (e) {
        $('.hopscotch-bubble').fadeOut();
    });


    $('#BOQDate').val(CurDate);
    $('#ExpDate').val(CurDate);



    $("#Unit_0").change(function () {
        $('#textUnit').val($(this).find("option:selected").attr("name"));
    });

    $("#Rate_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Cost_0').focus();
        }

    });
    $("#Cost_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Margin_0').focus();
        }

    });
    $("#Margin_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Resource_0').focus();
        }

    });
    $("#Resource_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Remarks_0').focus();
        }

    });
    $("#Quantity_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Rate_0').focus();
        }

    });
    $("#Remarks_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();
        }

    });
    $("#Comments").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#UserName').focus();
        }

    });

    $("#JobCode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Comments').focus();
        }

    });

    $("#Product_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && $("#ProductId_0").val() != 0) {
            e.preventDefault();
            $('#Quantity_0').focus();
        }
        else if (key == 13 && $.trim($('#Product_0').val()).toUpperCase() == 'JOB') {
            Prodpopshow(1);
        }

        if (key == 08 || key == 46) {
            $('#ProductLength').val('')
            ProductPopuprefresh();
        }

    });
    $('#FC').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#FCRate').focus();
            e.preventDefault();
        }
    });
    $('#FCRate').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#UserName').focus();
            e.preventDefault();
        }
    });
    $('#UserName').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Product_0').focus();
            e.preventDefault();
        }
    });

    $('#Unit_0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Quantity_0').focus();
            e.preventDefault();
        }
    });
    $("#btnNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnYes").focus();
        }
    });
    $("#btnYes").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnNo").focus();
        }
    });

    $("#btnbackChecking").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnApprove").focus();
        }
    });
    $("#btnApprove").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnbackChecking").focus();
        }
    });

    $("#btnbackChecking").focus(function (e) {
        $("#btnbackChecking").removeClass("btn btn-outline-primary");
        $("#btnbackChecking").addClass("btn btn-primary");
    });
    $("#btnbackChecking").focusout(function (e) {
        $("#btnbackChecking").removeClass("btn btn-primary");
        $("#btnbackChecking").addClass("btn btn-outline-primary");
    });
    $("#btnApprove").focus(function (e) {
        $("#btnApprove").removeClass("btn btn-outline-primary");
        $("#btnApprove").addClass("btn btn-primary");
    });
    $("#btnApprove").focusout(function (e) {
        $("#btnApprove").removeClass("btn btn-primary");
        $("#btnApprove").addClass("btn btn-outline-primary");
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) { //ESC       :   Popup Close
            ProductPopuprefresh();
            $('#BOQViewForm').hide();
        }
    });
    $("#btnNo").focus(function (e) {
        $("#btnNo").removeClass("btn btn-outline-primary");
        $("#btnNo").addClass("btn btn-primary");
    });
    $("#btnNo").focusout(function () {
        $("#btnNo").removeClass("btn btn-primary");
        $("#btnNo").addClass("btn btn-outline-primary");
    });

    $("#btnYes").focus(function (e) {
        $("#btnYes").removeClass("btn btn-outline-primary");
        $("#btnYes").addClass("btn btn-primary");
    });
    $("#btnYes").focusout(function () {
        $("#btnYes").removeClass("btn btn-primary");
        $("#btnYes").addClass("btn btn-outline-primary");
    });


    $("#btnokalert").focus(function (e) {
        $("#btnokalert").removeClass("btn btn-outline-primary");
        $("#btnokalert").addClass("btn btn-primary");
    });



    $("#btnok").focus(function (e) {
        $("#btnok").removeClass("btn btn-outline-primary");
        $("#btnok").addClass("btn btn-primary");
    });
    $("#btnok").focusout(function (e) {
        $("#btnok").removeClass("btn btn-primary");
        $("#btnok").addClass("btn btn-outline-primary");
    });
    $("#btncnclalrt").focus(function (e) {
        $("#btncnclalrt").removeClass("btn btn-outline-primary");
        $("#btncnclalrt").addClass("btn btn-primary");
    });
    $("#btncnclalrt").focusout(function (e) {
        $("#btncnclalrt").removeClass("btn btn-primary");
        $("#btncnclalrt").addClass("btn btn-outline-primary");
    });

    $("#btnok").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclalrt").focus();
        }
    });
    $("#btncnclalrt").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnok").focus();
        }
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
    $('#btnok').click(function () {
        alertpopuprefresh();
        PrintthisBill();
        formrefresh();
    });
    $('#btncnclalrt').click(function () {
        alertpopuprefresh();
        formrefresh();
    });

    $('#FCRate').keyup(function (e) {
        var fc = $("#FCRate").val();
        fccalculation(fc);
    });

    $("#FC").change(function () {
        var selectedValue = $(this).val();
        $("#FCRate").val($(this).find("option:selected").attr("name"));
        var fc = $("#FCRate").val();

        fccalculation(fc);
    });

    $('#btnApprove').click(function () {
        Flg = 1;
        $('#CheckingPopup').hide();
        SUConfirm(Flg)
    });
    $('#btnbackChecking').click(function () {
        Flg = 0;
        $('#CheckingPopup').hide();
        SUConfirm(Flg)
    });


    var data5 = {};
    data5.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data5,
        success: function (result) {
            CurrencyLoad(result.oList);

        }
    });



    var data1 = {};
    data1.UserId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UsersGetandGets",
        data: data1,
        success: function (result) {
            EngineerLoad(result.oList);

        }
    });



    var data2 = {};
    data2.UnitId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UnitGetandGets",
        data: data2,
        success: function (result) {
            UnitLoad(result.oList);


        }
    });


    //bill copy read from query string

    if (getQueryString('boqno') != null) {
        $('#BOQNo').val(getQueryString('boqno'))
        var boq = {};
        boq.BOQSlNo = getQueryString('boqno');

        $.ajax({
            type: "POST",
            url: "../ProjectandJob/BillofQuantityGetandGets",
            data: boq,
            success: function (result) {
                $('#BOQNo').prop("disabled", true);
                $('#btnsubmit').prop("disabled", true);
                $('#btncopy').prop("disabled", false);
                BOQNoGets(result.oList);
            }

        });
    }
    else {
        Defaultfocus();
        serialnoload();
    }

});//Document Close

function SUConfirm(Flg) {
    if ($('#SUFlg').val() == 1) {
        BOQSaveConfirm(Flg);
    }
    else if ($('#SUFlg').val() == 2) {
        BOQUpdateConfirm(Flg);
    }
}

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#alertdiv1').hide();
}

function SaveBOQ() {
    if ($('#JobCode').val() == "") {
        warningshow('Please Select Job Code', 'JobCode');
    }
    else if ($('#JobCodeId').val() == 0) {
        warningshow('Please Select a valid Job Code', 'JobCodeId');
        return false;
    }
    else if ($('#Product_0').val() != '') {
        warningshow('Please Select Product', 'Product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else if ($('#EstAmount').val() != $('#GrandTotal').val() && Flg == 0) {
        $('#SUFlg').val(1)
        $('#CheckingPopup').show();
        $('#btnbackChecking').focus();
    }

    else {
        BOQSaveConfirm(Flg);
    }
}

function BOQSaveConfirm(Flg) {
    $('#Confirmflag').val('save'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Save the BOQ?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}


function ConfirmSaveBOQ(Flg) {

    var oArray = new Array();
    for (var k = 1; k <= i ; k++) {
        var BOQSlNo = $('#BOQNoId').val();
        var BOQDate = $('#BOQDate').val();
        var ExpDate = $('#ExpDate').val();
        var JobCodeId = $('#JobCodeId').val();
        var CurrencyId = $('#FC').val();
        var CurrencyRate = $('#FCRate').val();
        var Comments = $('#Comments').val();
        var EngineerId = $('#UserName').val();
        var Location = $('#Location').val();
        var ProductId = $('#ProductId_' + k).val();
        var ProductCode = $('#Product_' + k).val();
        var Description = $('#Description_' + k).val();
        var UnitId = $('#Unit_' + k).val();
        var Quantity = $('#Quantity_' + k).val();
        var Rate = $('#Rate_' + k).val();
        var Cost = $('#Cost_' + k).val();
        var Margin = $('#Margin_' + k).val();
        var TotalAmount = $('#TotalAmount_' + k).val();
        var GrandTotal = $('#GrandTotal').val();
        var Resource = parseInt($('#ResourceId_' + k).val() || 0);
        var Remarks = $('#Remarks_' + k).val();
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = 1;
        var Flag = Flg;


        if (!(typeof Description == "undefined")) {
            oArray.push({
                'BOQSlNo': BOQSlNo,
                'BOQDate': BOQDate,
                'ExpDate': ExpDate,
                'JobCodeId': JobCodeId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'Comments': Comments,
                'EngineerId': EngineerId,
                'Location': Location,
                'DeptId': DeptId,
                'UserId': UserId,
                'ProductId': ProductId,
                'ProductCode': ProductCode,
                'Description': Description,
                'UnitId': UnitId,
                'Quantity': Quantity,
                'Rate': Rate,
                'Cost': Cost,
                'Margin': Margin,
                'TotalAmount': TotalAmount,
                'GrandTotal': GrandTotal,
                'Resource': Resource,
                'Remarks': Remarks,
                'DelFlag': DelFlag,
                'Flag': Flag
            })
        }
    }
    if (oArray != "") {
        var data = { 'BillofQuantityModel': oArray };
        $.ajax(
    {
        type: "POST",
        url: "../ProjectandJob/BillofQuantityInsertandUpdate",
        data: data,
        success: function (result) {
            for (var i = 0; i <= result.oList.length; i++) {
                var status = result.oList[i].Status;
                var boqnum = result.oList[i].BOQSlNo;
                Showalerts(status, boqnum);
            }
        }
    });
    }
    else {
        warningshow('Please Select Product', 'Product_0');
    }

}



function UpdateBOQ() {
    if ($('#JobCode').val() == "") {
        warningshow('Please Select Job Code', 'JobCode');
    }
    else if ($('#JobCodeId').val() == 0) {
        warningshow('Please Select a valid Job Code', 'JobCodeId');
        return false;
    }
    else if ($('#Product_0').val() != '') {
        warningshow('Please Select Product', 'Product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else if ($('#EstAmount').val() != $('#GrandTotal').val() && Flg == 0) {
        $('#SUFlg').val(2)
        $('#CheckingPopup').show();
        $('#btnbackChecking').focus();
    }
    else {
        BOQUpdateConfirm(Flg);
    }
}

function BOQUpdateConfirm(Flg) {
    $('#Confirmflag').val('update'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Update the BOQ?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}


function ConfirmUpdateBOQ(Flg) {

    var oArray = new Array();
    for (var k = 1; k <= i; k++) {
        var BOQSlNo = $('#BOQNo').val();
        var BOQDate = $('#BOQDate').val();
        var ExpDate = $('#ExpDate').val();
        var JobCodeId = $('#JobCodeId').val();
        var CurrencyId = $('#FC').val();
        var CurrencyRate = $('#FCRate').val();
        var Comments = $('#Comments').val();
        var EngineerId = $('#UserName').val();
        var Location = $('#Location').val();
        var ProductId = $('#ProductId_' + k).val();
        var ProductCode = $('#Product_' + k).val();
        var Description = $('#Description_' + k).val();
        var UnitId = $('#Unit_' + k).val();
        var Quantity = $('#Quantity_' + k).val();
        var Rate = $('#Rate_' + k).val();
        var Cost = $('#Cost_' + k).val();
        var Margin = $('#Margin_' + k).val();
        var TotalAmount = $('#TotalAmount_' + k).val();
        var GrandTotal = $('#GrandTotal').val();
        var Resource = parseInt($('#ResourceId_' + k).val() || 0);
        var Remarks = $('#Remarks_' + k).val();
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = 1;
        var Flag = Flg;

        if (!(typeof Description == "undefined")) {
            oArray.push({
                'BOQSlNo': BOQSlNo,
                'BOQDate': BOQDate,
                'ExpDate': ExpDate,
                'JobCodeId': JobCodeId,
                'CurrencyId': CurrencyId,
                'CurrencyRate': CurrencyRate,
                'Comments': Comments,
                'EngineerId': EngineerId,
                'Location': Location,
                'DeptId': DeptId,
                'UserId': UserId,
                'ProductId': ProductId,
                'ProductCode': ProductCode,
                'Description': Description,
                'UnitId': UnitId,
                'Quantity': Quantity,
                'Rate': Rate,
                'Cost': Cost,
                'Margin': Margin,
                'TotalAmount': TotalAmount,
                'GrandTotal': GrandTotal,
                'Resource': Resource,
                'Remarks': Remarks,
                'DelFlag': DelFlag,
                'Flag': Flag
            })
        }
    }
    if (oArray != "") {
        var data = { 'BillofQuantityModel': oArray };
        $.ajax(
    {
        type: "POST",
        url: "../ProjectandJob/BillofQuantityUpdate",
        data: data,
        success: function (result) {
            for (var i = 0; i <= result.oList.length; i++) {
                var status = result.oList[i].Status;
                var boqnum = result.oList[i].BOQSlNo;
                Showalerts(status, boqnum);
            }
        }
    });
    }
    else {
        warningshow('Please Select Product', 'Product_0');
    }

}



//Location load
function loadlocation() {

    var datafd = {};
    datafd.LocationId = 0;
    datafd.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserLocationGetandGets",
        data: datafd,
        success: function (result) {
            LocationLoadUser(result.oList);
        }
    });
}
var LocationSelect = "";
function LocationLoadUser(result) {
    $("#Location,#LocationHide").empty();
    LocnSelect = "<option value=0 disabled>-Select-</option>";
    for (var i = 0; i < result.length; i++) {

        LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";

    }
    $("#Location").append(LocnSelect);
    $("#LocationHide").append(LocnSelect);
    $('#Location').val(UserLocationId);
}


function getslno(result) {
    for (var k = 0; k < result.length; k++) {
        $('#BOQNo').val(result[k].BOQNo);
    }
}
function Defaultfocus() {
    $('#JobCode').focus();

}



function PrintthisBill() {
    if ($('#tblboq tr').length > 0) {
        PrintthisBillWindows('BOQ', i);
    }
    else {
        warningshow('Please select a BOQ No. to print', 'BOQNo');
        $('#BOQNo').select();
    }

}


function formrefresh() {
    if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else {
        $('#BOQNo').prop("disabled", true);
        $('#BOQDate').prop("disabled", false);
        $('#ExpDate').prop("disabled", false);
        $('#JobCode').prop("disabled", false);
        $('#btnjob').prop("disabled", false);
        $('#Description').prop("disabled", false);
        $('#LPO').prop("disabled", false);
        $('#EstAmount').prop("disabled", false);
        $('#CustName').prop("disabled", false);
        $('#FC').prop("disabled", false);
        $('#FCRate').prop("disabled", true);
        $('#UserName').prop("disabled", false);
        $('#Location').prop("disabled", false);
        $('#Comments').prop("disabled", false);
        $('#Product_0').prop("disabled", false);
        $('#btnpdct').prop("disabled", false);
        $('#Unit_0').prop("disabled", false);
        $('#Quantity_0').prop("disabled", false);
        $('#Rate_0').prop("disabled", false);
        $('#Cost_0').prop("disabled", false);
        $('#Margin_0').prop("disabled", false);
        $('#TotalAmount_0').prop("disabled", false);
        $('#Resource_0').prop("disabled", false);
        $('#Remarks_0').prop("disabled", false);
        $('#btnadd').prop("disabled", false);
        $('#GrandTotal').prop("disabled", false);
        $('#btnsubmit').prop("disabled", false);
        $('#btncopy').prop("disabled", false);
        $('#btnlist').prop("disabled", false);


        $('#SUFlg').val('');
        $('#BOQNo').val('');
        $('#BOQDate').val(CurDate);
        $('#ExpDate').val(CurDate);
        $('#JobCode').val('');
        $('#JobCodeId').val(0);
        $('#Description').val('');
        $('#LPO').val('');
        $('#EstAmount').val('');
        $('#CustName').val('');
        $('#FC').val('0');
        $('#FCRate').val('');
        $('#FCRate').css('background-color', 'white');
        $('#Comments').val('');
        $('#UserName').val('0');
        $('#Location').val('0');
        $('#Product_0').val('');
        $('#Unit_0').val('0');
        $('#Quantity_0').val('');
        $('#Rate_0').val('');
        $('#Cost_0').val('');
        $('#Margin_0').val('');
        $('#TotalAmount_0').val('');
        $('#Resource_0').val('');
        $('#ResourceId_0').val(0);
        $('#Remarks_0').val('');
        for (var k = 1; k < i; k++) {
            $('#row' + k).remove();
        }
        i = 1;
        clearrow();
        serialnoload();
        $('#GrandTotal').val('');
        GrandTotal = 0;
        $('#FCGT').text('FCGT');
        $("#FCGT").css("opacity", '0');
        $('#JobCode').focus();
        $('.hopscotch-bubble').fadeOut();

        $('#FC').val(1);
        $('#FCRate').val($('#FC').find("option:selected").attr("name"));
        $('#btnsubmit').show();
        $('#btnlist').show();
        $('#btndelete').hide();
        $('#btnprint').hide();
        $('#btndelete').hide();
        $('#btnedit').hide();
        $('#btnsaveedit').hide();
        loadlocation();
    }
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowBOQlist(result) {
    disable_datatable('tblBOQ');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th>BOQ No</th><th>BOQ Date</th><th>Job Code</th><th>LPO</th><th>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + result[i].BOQId + '</td><td>' + result[i].BOQDate + '</td><td>' + result[i].JobCode + '</td><td>' + result[i].LPO + '</td><td><a onclick="GetRows(' + result[i].BOQId + ')">Edit</a></td></tr>';
    }
    $('#tblBOQ').html(responseText + '</tbody>');
    $('#tblBOQ').DataTable();
}

function ShowBOQGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#BOQNo').val(result[i].BOQId);
        $('#BOQDate').val(result[i].BOQDate);
        $('#JobCode').val(result[i].JobCodeId);
        $('#Description').val(result[i].Description);
        $('#LPO').val(result[i].LPO);
        $('#EstAmount').val(parseFloat(result[i].EstAmount).toFixed(Decimal));
        $('#CustName').val(result[i].CustId);
        $('#FC').val(result[i].Id);
        $('#FCRate').val(result[i].FCRate);
        $('#Comments').val(result[i].Comments);
        $('#UserName').val(result[i].UserId);
        $('#Product_0').val(result[i].ItemId);
        $('#Unit_0').val(result[i].UnitId);
        $('#Quantity').val(result[i].Quantity);
        $('#Rate').val(result[i].Rate);
        $('#TotalAmount_0').val(result[i].TotalAmount);
        $('#Remarks_0').val(result[i].Remarks);
        $('#JobCode').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}


function BOQNoGets(result) {

    for (var n = 0; n < result.length; n++) {
        $('#BOQDate').val(result[n].BOQDate);
        $('#ExpDate').val(result[n].ExpDate);
        $('#JobCodeId').val(result[n].JobCodeId);
        $('#JobCode').val(result[n].JobCode);
        $('#Description').val(result[n].JobDescription);
        $('#LPO').val(result[n].LPO);
        $('#EstAmount').val(parseFloat(result[n].EstAmount).toFixed(Decimal));
        $('#CustName').val(result[n].Customer);
        $('#Comments').val(result[n].Comments);
        $('#FC').val(result[n].CurrencyId);
        $('#FCRate').val(result[n].CurrencyRate);
        $('#UserName').val(result[n].EngineerId);
        $('#Location').val(result[n].Location);

        $('#BOQNo').val(result[n].BOQSlNo);

        var id = parseInt(i);
        var ProdRow = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                       "<td id=" + 'col' + id + " class='jsgrid-cell' style='width:30px;text-align:center'>" + (n + 1) + "</td>" +
                       "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center' ><input type='text' style='display:none'  id='ProductId_" + id + "' value='" + result[n].ProductId + "'><input type='text' style='height:30px;background-color:white' class='form-control text-center' disabled id='Product_" + id + "' value='" + result[n].Product + "'></td>" +
                       "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:75px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Description_" + id + "' value='" + result[n].Description + "' ></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Unit_" + id + "' style='height:30px;background-color:white' class='form-control' disabled value='" + result[n].UnitId + "'>" + UnitSelect + "</select></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id='Quantity_" + id + "' value=" + result[n].Quantity + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id='Rate_" + id + "' value=" + parseFloat(result[n].Rate).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id='Cost_" + id + "' value=" + parseFloat(result[n].Cost).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id='Margin_" + id + "' value=" + result[n].Margin + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                       "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='TotalAmount_" + id + "' value=" + parseFloat(result[n].TotalAmount).toFixed(Decimal) + "></td>" +
                       "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' style='display:none'  id='ResourceId_" + id + "' value='" + result[n].ResourceId + "'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Resource_" + id + "' value='" + result[n].Resource + "'></td>" +
                       "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:70px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Remarks_" + id + "' value='" + result[n].Remarks + "'></td>" +

      "<td id= 'Edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;width:30px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' disabled style='height:30px' id='btnrowedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' style='height:30px' id='btnrowdel' type='button' disabled onclick='DeleteRow(" + id + ")' title='Delete'></td>" +
      "<td id= 'Update_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;display:none;width:30px'><input  class='jsgrid-button jsgrid-update-button' disabled style='height:30px' id='Update' type='button'  title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' style='height:30px' id='canceledit' type='button' onclick='CancelEdit(" + id + ")'  title='Cancel edit'></td></tr>";

        $('#tblboq').append(ProdRow);
        $('#Unit_' + id).val(result[n].UnitId);
        i++;

        $('#BOQDate').prop("disabled", true);
        $('#ExpDate').prop("disabled", true);
        $('#JobCode').prop("disabled", true);
        $('#btnjob').prop("disabled", true);
        $('#Description').prop("disabled", true);
        $('#LPO').prop("disabled", true);
        $('#EstAmount').prop("disabled", true);
        $('#CustName').prop("disabled", true);
        $('#FC').prop("disabled", true);
        $('#FCRate').prop("disabled", true);
        $('#FCRate').css('background-color', '#ECEFF1');
        $('#UserName').prop("disabled", true);
        $('#Location').prop("disabled", true);
        $('#Comments').prop("disabled", true);
        $('#Product_0').prop("disabled", true);
        $('#btnpdct').prop("disabled", true);
        $('#Unit_0').prop("disabled", true);
        $('#Quantity_0').prop("disabled", true);
        $('#Rate_0').prop("disabled", true);
        $('#Cost_0').prop("disabled", true);
        $('#Margin_0').prop("disabled", true);
        $('#TotalAmount_0').prop("disabled", true);
        $('#Resource_0').prop("disabled", true);
        $('#Remarks_0').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#GrandTotal').prop("disabled", true);
        $('#FCGT').prop("disabled", true);
        $('#btnsubmit').prop("disabled", true);
    }
}


function totalamount(RowId) {
    var total = 0;
    var MGT = 0;
    var GT = 0;
    var Qty = parseFloat($("#Quantity_" + RowId).val());
    var rate = parseFloat($('#Rate_' + RowId).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var Cost = parseFloat($('#Cost_' + RowId).val() || 0);
    var Margin = parseFloat($('#Margin_' + RowId).val() || 0);
    MGT = (Cost * Margin) / 100;
    total = (Qty * rate);
    GT = parseFloat(MGT) + parseFloat(total);

    $("#TotalAmount_" + RowId).val((GT || 0).toFixed(Decimal));



    var Quantity = 0; var Rate = 0; var Discnt = 0; var Amount = 0;

    Quantity = $('#JobQty').val() || 0; Quantity = isNaN(Quantity) ? 0 : parseInt(Quantity);
    Price = $('#JobRate').val() || 0; Price = isNaN(Price) ? 0 : parseFloat(Price);
    var Cst = parseFloat($('#Cost_' + RowId).val() || 0);
    var Mrgn = parseFloat($('#Margin_' + RowId).val() || 0);
    MGTotal = (Cst * Mrgn) / 100;
    Amount = (parseInt(Quantity) * parseFloat(Price));
    GTotal = parseFloat(MGTotal) + parseFloat(Amount);
    $('#JobAmount').val(parseFloat(GTotal||0).toFixed(Decimal));

    if (RowId != 0) {
        fnGrandTotal(i);
        fccalculation();
    }

}
var GrandTotal;

function fnGrandTotal(RowId) {
    GrandTotal = 0;
    $('#GrandTotal').val('');

    for (var i = 1; i <= RowId; i++) {
        GrandTotal = GrandTotal + parseFloat($('#TotalAmount_' + i).val() || 0);
    }
    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));

}

function fccalculation(fc) {
    var fcamount = GrandTotal * fc;
    if (fcamount >= 0) {
        $("#FCGT").css("opacity", '100');
        $("#FCGT").text(fcamount.toFixed(Decimal));
    }
}

function productadd() {
    ProductPopuprefresh();
    var rowcount = CountRows();
    var ProductFlag = 0;
    for (p = 1; p <= i; p++) {
        if ($('#ProductId_' + p).val() == $("#ProductId_0").val()) {
            ProductFlag = 1;
        }
    }
    if (rowcount == 0) {
        i = 1;
    }

    if ($.trim($("#Product_0").val()) == '') {
        warningshow('Please Select Product', 'Product_0');
    }
    else if ($('#ProductId_0').val() == 0) {
        warningshow('Please Enter a Valid Product', 'ProductId_0');
        return false;
    }
    else if ($('#Unit_0').val() == 0) {
        warningshow('Please Select Unit', 'Unit_0');
    }

    else if ($("#Quantity_0").val() == '') {
        warningshow('Please Enter Quantity', 'Quantity_0');
    }
        //else if ($("#Rate_0").val() == '') {
        //    warningshow('Please Enter Rate', 'Rate_0');
        //}
        //else if ($("#Cost_0").val() == '') {
        //    warningshow('Please Enter Cost', 'Cost_0');
        //}
    else if ($("#Quantity_0").val() == 0) {
        warningshow('Quantity cannot be zero', 'Quantity_0');
    }
        //else if ($("#Cost_0").val() == 0) {
        //    warningshow('Cost cannot be zero', 'Cost_0');
        //}
    else {

        var slno = $('#tblboq tr').length + 1;
        var id = parseInt(i);



        var ProdRow = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id=" + 'col' + id + " class='jsgrid-cell' style='width:30px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center' ><input type='text' style='display:none'  id='ProductId_" + id + "' value='" + $("#ProductId_0").val() + "'><input type='text' style='height:30px;background-color:white' class='form-control text-center' disabled id='Product_" + id + "' value='" + $("#Product_0").val() + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:75px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Description_" + id + "' value='" + $("#Description_0").val() + "' ></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Unit_" + id + "' style='height:30px;background-color:white' class='form-control' disabled >" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id='Quantity_" + id + "' value=" + parseInt($('#Quantity_0').val()) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id= 'Rate_" + id + "' value=" + parseFloat($('#Rate_0').val() || 0).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id= 'Cost_" + id + "' value=" + parseFloat($('#Cost_0').val() || 0).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id= 'Margin_" + id + "' value=" + parseFloat($('#Margin_0').val() || 0).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='TotalAmount_" + id + "' value=" + $('#TotalAmount_0').val() + "></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' style='display:none'  id='ResourceId_" + id + "' value='" + $("#ResourceId_0").val() + "'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Resource_" + id + "' value='" + $('#Resource_0').val() + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:70px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Remarks_" + id + "' value='" + $('#Remarks_0').val() + "'></td>" +

       "<td id= 'Edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;width:30px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' style='height:30px' id='btnrowedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' style='height:30px' id='btnrowdel' type='button' onclick='DeleteRow(" + id + ")' title='Delete'></td>" +
       "<td id= 'Update_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;display:none;width:30px'><input  class='jsgrid-button jsgrid-update-button' style='height:30px' id='Update' type='button'  title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' style='height:30px' id='canceledit' type='button' onclick='CancelEdit(" + id + ")'  title='Cancel edit'></td></tr>";

        $('#tblboq').append(ProdRow);
        $('#Unit_' + id).val($('#Unit_0').val());

        i++;
        clearrow();
        fnGrandTotal(i);
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        var a = $("#FCRate").val() || 0;
        fccalculation(a);
        // $('#btnlist').prop("disabled", true);
    }
}

function CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblboq");
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++;
        }
    }
    var message = "Total Row Count: " + totalRowCount;
    message += "\nRow Count: " + rowCount;
    return rowCount;

}

function GetList() {
    var data = {};
    data.FromDate = $('#ViewFromDate').val();
    data.ToDate = $('#ViewToDate').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/BOQList",
        data: data,
        success: function (result) {
            GetListView(result.oList);
        }
    });
}

function GetListView(result) {
    $('#ViewFromDate,#ViewToDate').prop("disabled", false);

    disable_datatable('tbl_ViewList');

    $('#BOQViewForm').show();
    var responseText = "<thead><tr><th>Sl#</th><th>BOQ#</th><th>Date</th><th>Job Code</th><th>Job Description</th><th>Customer</th><th>LPO#</th><th>Est. Amount</th><th>Engineer</th><th>Comments</th></tr>" +
                              "<tr><th> </th><th>BOQ#</th><th>Date</th><th>Job Code</th><th>Job Description</th><th>Customer</th><th>LPO#</th><th>Est. Amount</th><th>Engineer</th><th>Comments</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr ondblclick="GetCopyofThis(' + result[l].BOQSlNo + ')">' +
        '<td style="" align="center">' + slno + '</td>' +
        '<td>' + result[l].BOQSlNo + '</td>' +
        '<td>' + result[l].BOQDate + '</td>' +
        '<td>' + result[l].JobCode + '</td>' +
        '<td>' + result[l].JobDescription + '</td>' +
        '<td>' + result[l].Customer + '</td>' +
        '<td>' + result[l].LPO + '</td>' +
        '<td align=right>' + parseFloat(result[l].EstAmount).toFixed(Decimal) + '</td>' +
        '<td>' + result[l].Engineer + '</td>' +
        '<td>' + result[l].Comments + '</td>' +
        '</tr>';
    }
    $('#tbl_ViewList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_ViewList', 'Multiple');

}

function GetCopyofThis(BOQSlNo) {
    var data = {};
    data.BOQSlNo = BOQSlNo;

    $.ajax({
        type: "POST",
        url: "../ProjectandJob/BillofQuantityGetandGets",
        data: data,
        success: function (result) {
            $('#BOQViewForm').hide();
            $('#tblboq tr').remove();
            BOQNoGets(result.oList);
            $('#BOQNo').prop("disabled", false);
            $('#btnsubmit').hide();
            $('#btnlist').hide();
            $('#btnprint').show();
            $('#btndelete').show();
            $('#btnedit').show();

            fnGrandTotal(i);
            var a = $("#FCRate").val() || 0;
            fccalculation(a);
        }
    });
}
function EditRow(RowId) {
    FlagEdit = FlagEdit + 1;
    $('#row' + RowId).children('td,th').css('background-color', 'rgb(232,226,226)');
    Unit = $('#Unit_' + RowId).val();
    Quantity = $('#Quantity_' + RowId).val();
    Rate = $('#Rate_' + RowId).val();
    $('#Edit_' + RowId).hide();
    $('#Update_' + RowId).show();
    $('#Unit_' + RowId).prop('disabled', false);
    $('#Quantity_' + RowId).prop('disabled', false);
    $('#Rate_' + RowId).prop('disabled', false);
    $('#Cost_' + RowId).prop('disabled', false);
    $('#Margin_' + RowId).prop('disabled', false);
    $('#Resource_' + RowId).prop('disabled', false);
    $('#Remarks_' + RowId).prop('disabled', false);
    $('#Unit_' + RowId).focus();
    fnGrandTotal(i);
    var a = $("#FCRate").val() || 0;
    fccalculation(a);
    ResourceAutocomplete(RowId);
}


function UpdateRow(RowId) {
    var c = parseFloat($('#Rate_' + RowId).val());
    $('#Rate_' + RowId).val(isNaN(c) ? 0 : c);

    if ($("#Quantity_" + RowId).val() == 0) {
        warningshow('Quantity cannot be zero', 'Quantity_' + RowId);
    }
    else if ($("#Unit_" + RowId).val() == 0) {
        warningshow('Please Select Unit', 'Unit_' + RowId);
    }
    else {
        $('#row' + RowId).children('td,th').css('background-color', 'white');
        FlagEdit = FlagEdit - 1;
        $('#Update_' + RowId).hide();
        $('#Edit_' + RowId).show();
        $('#Unit_' + RowId).prop('disabled', true);
        $('#Quantity_' + RowId).prop('disabled', true);
        $('#Rate_' + RowId).prop('disabled', true);
        $('#Cost_' + RowId).prop('disabled', true);
        $('#Margin_' + RowId).prop('disabled', true);
        $('#Resource_' + RowId).prop('disabled', true);
        $('#Remarks_' + RowId).prop('disabled', true);
        $('#Product_0').focus();
        fnGrandTotal(i);
        var a = $("#FCRate").val() || 0;
        fccalculation(a);
    }
}

function CancelEdit(RowId) {
    $('#row' + RowId).children('td,th').css('background-color', 'white');
    FlagEdit = FlagEdit - 1;
    $('#Unit_' + RowId).val(Unit);
    $('#Quantity_' + RowId).val(Quantity);
    $('#Rate_' + RowId).val(Rate);
    $('#Unit_' + RowId).prop('disabled', true);
    $('#Quantity_' + RowId).prop('disabled', true);
    $('#Rate_' + RowId).prop('disabled', true);
    $('#Cost_' + RowId).prop('disabled', true);
    $('#Margin_' + RowId).prop('disabled', true);
    $('#Resource_' + RowId).prop('disabled', true);
    $('#Remarks_' + RowId).prop('disabled', true);
    $('#Update_' + RowId).hide();
    $('#Edit_' + RowId).show();
    totalamount(RowId);
    fnGrandTotal(i);
    var a = $("#FCRate").val() || 0;
    fccalculation(a);
}

function DeleteRow(RowId) {
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
    $('#Confirmflag').val('deleterow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?')

}

function DeleteBOQRow(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    $('#row' + RowId).remove();

    for (var j = 1; j <= i - 1; j++) {

        if ($('#Product_' + j).val() != undefined) {
            $('#col' + j).text(slno);
            slno++;
        }
    }
    $('#Product_0').focus();
    fnGrandTotal(i);
    var a = $("#FCRate").val() || 0;
    fccalculation(a);
}

function formrefreshconfirm() {
    $('#confirmmessage').html('');
    var rowcount = CountRows();
    if (rowcount > 0) {
        $('#confirm').show();

        $('#Confirmflag').val('refresh'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').append('Data will be lost.<br>Do you want to Continue?');
        $('#confirmOk').focus();
    }
    else {
        formrefresh();
    }
}


function DeleteBOQ() {
    $('#Confirmflag').val('delete'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Delete?')
    $('#confirm').show();
    $('#confirmOk').focus();
}

function EditBOQ(Flag) {
    $("#btncnclsave").attr("onclick", "CheckEditBOQ(" + Flag + ")");
    $('#otp,#otpremarks').prop("disabled", false);
    $('#OTPDiv').show();
    $("#otp,#otpremarks").val('');
    $("#otp").focus();
}

function CheckEditBOQ(Flag) {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'BOQ Edit- OTP';
        else if (Flag == 1)
            Operation = 'BOQ Delete- OTP';

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
        if (Flag == 0) {
            ConfirmEditBOQ();
        }
        else if (Flag == 1) {
            ConfirmDeleteBOQ();
        }
    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}

function ConfirmEditBOQ() {
    $('#OTPDiv').hide();
    $('#btnedit').hide();
    $('#btndelete').hide();
    $('#btnsaveedit').show();
    $('.editds,#btnadd').prop("disabled", false);
    $('.jsgrid-button').prop('disabled', false);
    $('#FCRate').css('background-color', 'white');
}

function ConfirmDeleteBOQ() {
    $('#OTPDiv').hide();
    var data = {};
    data.BOQSlNo = $('#BOQNo').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/BOQDelete",
        data: data,
        success: function (result) {

            var status = result.oList[0].Status;
            var BOQNo = result.oList[0].BOQSlNo;
            Showalerts(status, BOQNo);
        }
    });

}

// Confirm box
function ConfirmboxResult(Result, status, rowid) {
    $('#confirmOk').prop('disabled', true);
    if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'deleterow') {
        DeleteBOQRow(rowid)
    }

    else if (Result == 'true' && status == 'delete') {
        EditBOQ(1);
    }

    else if (Result == 'true' && status == 'save') {
        $('#confirmOk').prop("disabled", true);
        ConfirmSaveBOQ(Flg);
    }
    else if (Result == 'true' && status == 'update') {
        $('#confirmOk').prop("disabled", true);
        ConfirmUpdateBOQ(Flg);
    }
    $('#confirm').fadeOut();

    window.setTimeout(function () {
        $('#confirmOk').prop('disabled', false);
    }, 2000);
}

function clearrow() {
    $('#Product_0').val('');
    $('#Description_0').val('');
    $('#textUnit').val('');
    $('#Unit_0').val(0);
    $('#Quantity_0').val('');
    $('#Rate_0').val('');
    $('#Cost_0').val('');
    $('#Margin_0').val('');
    $('#Resource_0').val('');
    $('#ResourceId_0').val(0);
    $('#TotalAmount_0').val('');
    $('#Remarks_0').val('');
    $('#ProductId_0').val(0);
    $('#Product_0').focus();
}

function checkpdcttextempty() {
    var a = ($('#Product_0').val()).length;
    if ($('#ProductLength').val() != a) {
        $('#ProductId_0').val(0);
    }
}
function checkjobcodeempty() {
    var b = ($('#JobCode').val()).length;
    if ($('#JobCodeLength').val() != b) {
        $('#JobCodeId').val(0);
    }
}


function fousnextbutton(e, id) {
    var x = e.which || e.keyCode;
    if (x == 13) {
        $(id).focus();
    }
}


$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();
    if (e.altKey && e.keyCode == 83) {
        SaveAndUpdate(1)
    }
    else if (e.altKey && e.keyCode == 76) {
        GetRows(0)
    }
    else if (e.altKey && e.keyCode == 67) {
        formrefresh();
    }
    else if (e.altKey && e.keyCode == 88) {
        closetable();
    }

})

//Remove Datatable If alredy data table Created
function disable_datatable(tablename) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        return;
    }
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


function Showalerts(Status, boqnum) {
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv1').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>BOQ Number : ' + boqnum + '</b><br> Saved Successfully!<br>Do you want to print this BOQ?');
        $('#btnok').focus();
    }
    else if (Status == 2) {
        //formrefresh();
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>BOQ Number : ' + boqnum + '</b><br> Updated Successfully!<br>Do you want to print this BOQ?');
        $('#btnok').focus();
    }

    else if (Status == 3) {
        swal('BOQ Number : ' + boqnum + ' ', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 4) {
        swal('BOQ Number : ' + boqnum, "Cancelled", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }

}


function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" class="form-control" style="width:100%"  placeholder="' + title + '"/>')
    });

    var table = null;

    if (Type == 'Multiple') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            "columnDefs": [
                                { "width": "2%", "targets": 0 },
                                { "width": "5%", "targets": 1 },
                                { "width": "5%", "targets": 2 },
                                { "width": "20%", "targets": 3 },
                                { "width": "40%", "targets": 4 },
                                { "width": "15%", "targets": 5 },
                                { "width": "15%", "targets": 6 },
                                { "width": "20%", "targets": 7 },
                                { "width": "20%", "targets": 8 },
            ],
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


