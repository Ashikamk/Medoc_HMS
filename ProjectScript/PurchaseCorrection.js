var EditFlag = 0; var CopyFlag = 0; var ReasonLoad = "";
$(document).ready(function () {
    SerailIDLoad();
    GetLocation();
    GetReason();
    Defaultfocus();
    $('.smallTextbox:not(.favoid)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if (!$(this).is('button') && $(this).attr('id') != 'Product_0' && $(this).attr('id') != 'Batch_0' && $(this).attr('id') != 'Reason_0' && $(this).attr('id') != 'btnadd') {
                e.preventDefault();
                var inputs = $(this).closest('form').find(':input:text:enabled,select:enabled');
                inputs.eq(inputs.index(this) + 1).focus().select();

            }

        }
    });
    //$('.batch').onfocus(function (e) {
    //    $(this).keydown();
    //});


    $('#LQuantity_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#Reason_0").focus();

        }
    });

    $('#Reason_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnadd").focus();

        }
    });


    $('#MRP_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#MRG_0").focus();
            $("#MRG_0").select();

        }
    });

    $('#MRG_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#LQuantity_0").focus();
            $("#LQuantity_0").select();

        }
    });


    $('#Product_0').keyup(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#ProductId_0').val() != 0) {
                e.preventDefault();
                $("#Batch_0").focus().select();
            }
            else {
                //warningshow("Select Product", "Product_0");
            }
        }
    });
    $('#Batch_0').keyup(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#BatchSlNo_0').val() != 0) {
                e.preventDefault();
                $("#Expiry_0").focus().select();
            }
            else {
                //warningshow("Select Batch", "Batch_0");

            }
        }
    });
    $("#btnadd").click(function () {
        ProductAdd();
    });
    $("#btnnew").click(function () {
        CreateNew();
    });
    $("#btnsubmit").click(function () {
        PurchaseCorrectionInsert();
    });
    $("#btnlist").click(function () {
        GetCopy();
    });
    LoadBatch(0);
});


function GetLocation() {
    var data = {};
    data.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList);
        }
    });

}

function LocationLoad(result) {
    $("#Location").empty();
    LocationSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "'locname='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";

    }
    $("#Location").append(LocationSelect);

    $('#Location').val(UserLocationId);
}

function GetReason() {
    var data = {};
    data.ReasonId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/ReasonGetandGets",
        data: data,
        success: function (result) {
            ReasonLoadResult(result.oList);


        }
    });
}


function   RnadomstockCheck()
{
 var data = {};
 data.SlNo = 0;
 data.DeptId = ERPDeptId;
 data.UserId = ERPUserId;
 $.ajax({
    type: "POST",
    url: "../Pharmacy/Random_PurchaseCorrectionGets",
    data: data,
    success: function (result) {

        GetPurchaseCorrection(result);
    }
});
           
}





function ReasonLoadResult(result) {
    $("#Reason_0").empty();
    ReasonLoad = "<option value='0'>--SELECT--</option>";
    for (var i = 0; i < result.length; i++) {
        ReasonLoad+= "<option value='" + result[i].ReasonId + "'>" + result[i].Reasons + "</option>";
       
    }
    $("#Reason_0").append(ReasonLoad);
}

function SerailIDLoad() {
    var data = {};
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMSSerialNoGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#CurPurCorrection").val(result.oList[0].PurCorrection);
                $("#CurPurCorrectiontext").text(result.oList[0].PurCorrection);
            }
            else {
                $('#confirmff,#keyboardff').show();
                $("#Product_Id").blur();
            }
        }
    });
}

function Defaultfocus() {
    $("#Product_0").focus().select();
}

function LoadProduct(Id) {

    $("#Product_" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {

            if (Id == 0)
                ClearProductRow(Id, 0);
            else {
                $("#ProductId_" + Id).val(0);
                $("#BatchSlNo_" + Id).val(0);
            }

            var data = {};
            data.ItemCode = $("#Product_" + Id).val();
            data.DeptId = ERPDeptId;
            data.UserId = ERPUserId;

            $.ajax({
                url: '../Pharmacy/HMS_PurchaseProductSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '4PurchasePro',
                            label: item.Description,
                            label1: item.ItemCode,
                            label2: item.Group,
                            label3: item.Category,
                            ItemId: item.ItemId,
                            ItemCode: item.ItemCode,
                            Description: item.Description,
                            Tax: item.VatId,
                            Taxper: item.VatPer,
                            Rate: (item.AvgCost).toFixed(Decimal),
                            SellingPrice: (item.SellingPrice).toFixed(Decimal),
                            MRP: (item.MRP).toFixed(Decimal),
                            PackQty: item.PackQty,
                            LPCost: (item.LPCost).toFixed(Decimal),
                            Cess: item.Model1,
                            headers: ["Name", "Code", "Company", "Type"]
                        })
                    }));
                }

            })

        },
        autoFocus: true,
        select: function (event, ui) {

            $("#ProductId_" + Id).val(ui.item.ItemId);
            $("#Batch_" + Id).focus().select();
        },
    });

}

function LoadBatch(Id) {
    $("#Batch_" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {

            if (Id == 0)
                ClearProductRow(Id, 2);
            else
                $("#BatchSlNo_" + Id).val(0);

            var data = {};
            data.ItemId = $("#ProductId_" + Id).val();
            data.Batch = $("#Batch_" + Id).val();
            data.DeptId = ERPDeptId;
            data.UserId = ERPUserId;
            data.LocationId = $("#Location").val();

            $.ajax({
                url: '../Pharmacy/HMS_BatchPurchaseCorrection',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    if (data.length) {
                        response($.map(data, function (item) {
                            var X=''
                            return ({
                                ColCount: '4PurchaseBatch',
                                label: item.Batch,
                                label1: item.SlNo,
                                label2: (item.MRP).toFixed(Decimal),//item.InvoDate,
                                label3: (item.SellingRate).toFixed(Decimal),//(item.Status).split("##")[0],
                                label4: item.Expiry,
                                label5: item.TLQty,
                                Batch: item.Batch,
                                BatchSlNo: item.BatchSlNo,
                                SlNo: item.SlNo,
                                InvoDate: item.InvoDate,
                                Rate: (item.Rate).toFixed(Decimal),
                                SellingRate: (item.SellingRate).toFixed(Decimal),
                                MRP: (item.MRP).toFixed(Decimal),
                                PackQty:item.PackQty,
                                Expiry: item.Expiry,
                                TLQty: item.TLQty,
                                TQty: item.TQty,
                                InvId: item.InvId,
                                TransType: item.Remarks,
                                DQTY: item.DQTY,
                                Marg: (item.Status).split("##")[2],
                                Vatpers: (item.Status).split("##")[1],
                                headers: ["Batch", "Bill#", "MRP", "Sel Rate", "Expiry", "Stock"]
                            })
                        }));
                    }
                    else {
                        warningshow('No Stock Available!', 'Product_' + Id);
                    }
                }

            })

        },
        autoFocus: true,
        select: function (event, ui) {            
            $("#NewBatch_" + Id).val(ui.item.Batch);
            $("#itempackqty").val(ui.item.PackQty);       

            $("#BatchSlNo_" + Id).val(ui.item.BatchSlNo);
            $("#Rate_" + Id).val(ui.item.Rate);
            $("#CStock_" + Id + ",#NStock_" + Id).val(ui.item.TLQty);
            $("#Expiry_" + Id).val(ui.item.Expiry);
            $("#MRP_" + Id).val(ui.item.MRP);
            $("#SR_" + Id).val(ui.item.SellingRate);
            $("#PurSlNo_" + Id).val(ui.item.SlNo);
            $("#InvId_" + Id).val(ui.item.InvId);
            $("#TransType_" + Id).val(ui.item.TransType);
           
            $('#Quantity_0').val(0)
            $('#LQuantity_0').val(parseInt(ui.item.TLQty))
            $('#MRG_0').val(ui.item.Marg)
            $("#NewBatch_" + Id).focus().select();
        },
    }).bind('focus', function () { $(this).autocomplete("search"); });
}

function CalcStock(Id) {


    var Add = 1;
    if (parseInt($("#StockType_" + Id).val() || 0) == 2) { Add = -1; }
    else if (parseInt($("#StockType_" + Id).val() || 0) == 0) { Add = 0; }

    var Stock = $("#CStock_" + Id).val();
    var Qty = Add * ($("#Quantity_" + Id).val()*$('#itempackqty').val());
    var NewStock = Number(Stock) + Number(Qty);

    $("#NStock_" + Id).val(NewStock);

    var Pack = parseInt(NewStock / $('#itempackqty').val()); var Loose = parseInt(NewStock % $('#itempackqty').val())
    if (NewStock < 0) {
        var ptext = ''
    }
    else {
        var ptext = 'P-' + Pack + ' L-' + Loose
    }

    $("#qtyshow").text(ptext);
    

}

function ProductAdd() {

    var BatchFlag=0
    for (var a = 1; a <= $("#GridLength").val() ; a++)
    {

        if ($('#BatchSlNo_0').val() == $('#BatchSlNo_' + a).val()) {
            BatchFlag = 1;
        }
    }

    if ($("#ProductId_0").val() == 0) {
        warningshow("Select Product", "Product_0");
        return false;
    }

    else if (BatchFlag == 1) {
        warningshow("This Batch Item Alredy Added", "Batch_0");
        return false;
    }
    else if ($("#BatchSlNo_0").val() == 0) {
        warningshow("Select Batch", "Batch_0");
        return false;
    }
    else if ($.trim($("#NewBatch_0").val()) == '') {
        warningshow('Enter Batch', 'NewBatch_0');
        return false;
    }
    else if ($.trim($("#Expiry_0").val()) == '' || $.trim($("#Expiry_0").val().length) != 7) {
        warningshow('Enter Expiry', 'Expiry_0');
        return false;
    }
    else if (parseFloat($("#SR_0").val() || 0) == 0) {
        warningshow('Enter Selling Rate', 'SR_0');
        return false;
    }
    //else if (parseFloat($("#SR_0").val() || 0) < parseFloat($("#Rate_0").val() || 0)) {
    //    warningshow('Selling Rate cannot be less than Purchase Rate : ' + parseFloat($("#Rate_0").val() || 0).toFixed(Decimal), 'SR_0');
    //    return false;
    //}
    else if (parseFloat($("#MRP_0").val() || 0) == 0) {
        warningshow('Enter MRP', 'MRP_0');
        return false;
    }
    //else if (parseFloat($("#MRP_0").val() || 0) < parseFloat($("#Rate_0").val() || 0)) {
    //    warningshow('MRP cannot be less than Purchase Rate : ' + parseFloat($("#Rate_0").val() || 0).toFixed(Decimal), 'MRP_0');
    //    return false;
    //}
    //else if (parseInt($("#StockType_0").val() || 0) == 0 && parseInt($("#Quantity_0").val() || 0) != 0) {
    //    warningshow('Select Type', 'StockType_0');
    //    return false;
    //}
    //else if (parseInt($("#StockType_0").val() || 0) != 0 && parseInt($("#Quantity_0").val() || 0) == 0) {
    //    warningshow('Enter Quantity', 'Quantity_0');
    //    return false;
    //}
    else if (parseInt($("#NStock_0").val() || 0) < 0) {
        warningshow('Stock cannot be less than Zero', 'Quantity_0');
        return false;
    }
    else if (parseInt($("#Reason_0").val() || 0) == 0) {
        warningshow('Select Reason', 'Reason_0');
        return false;
    }
    else {
        $('#qtyshow').text('')
        OKProductAdd();
    }
}

function OKProductAdd() {

    if ($("#Tbl_Purchase tr").length == 0) { $("#GridLength").val(0); }
    var Id = parseInt($("#GridLength").val() || 0) + 1;

    var ProductRow = '<tr id="MTr_' + Id + '" onfocusout="UpdateRow(' + Id + ')">' +
       '<td width="2%" align="center"><input class="jsgrid-button jsgrid-delete-button" type="button" onclick="DeleteRow(' + Id + ')" title="Delete" autocomplete="off"></td>' +

       '<td width="3%" align="center" id="MTd_' + Id + '">' + Id + '</td>' +

       '<td width="13%"><input id="Product_' + Id + '" readonly value="' + $.trim($("#Product_0").val()) + '" onkeyup="LoadProduct(' + Id + ')" class="form-control smallTextbox borderno" autocomplete="off" /></td>' +

       '<td width="5%"><input id="Batch_' + Id + '" readonly value="' + $.trim($("#Batch_0").val()) + '" onkeyup="LoadBatch(' + Id + ')" class="form-control smallTextbox borderno batch" autocomplete="off" /></td>' +

       '<td width="5%"><input id="NewBatch_' + Id + '" readonly value="' + $.trim($("#NewBatch_0").val()) + '" class="form-control smallTextbox borderno" onkeydown="FocusNext(event, \'NewBatch_\', \'NewBatch_\', \'Expiry_\', ' + Id + ', \'MTr_\')" /></td>' +

       '<td width="5%"><input id="Expiry_' + Id + '" readonly value="' + $.trim($("#Expiry_0").val()) + '" class="form-control smallTextbox borderno text-center" onkeypress="isNumberDate(event, this)" onkeyup="ExpiryDate(\'Expiry_' + Id + '\')" onkeydown="FocusNext(event, \'NewBatch_\', \'Expiry_\', \'SR_\', ' + Id + ', \'MTr_\')" /></td>' +

       '<td width="5%"><input id="SR_' + Id + '" readonly value="' + parseFloat($("#SR_0").val() || 0).toFixed(Decimal) + '" class="form-control smallTextbox borderno text-right"  onkeypress="isNumber(event,this)" onkeydown="FocusNext(event, \'Expiry_\', \'SR_\', \'MRP_\', ' + Id + ', \'MTr_\')" /></td>' +

       '<td width="5%"><input id="MRP_' + Id + '" readonly value="' + parseFloat($("#MRP_0").val() || 0).toFixed(Decimal) + '" class="form-control smallTextbox borderno text-right"  onkeypress="isNumber(event,this)" onkeydown="FocusNext(event, \'SR_\', \'MRP_\', \'StockType_\', ' + Id + ', \'MTr_\')" /></td>' +

       '<td width="9%"><div class="input-group m-0"><select style=display:none type="text" id="StockType_' + Id + '" class="form-control smallTextbox borderno" autocomplete="off"  onchange="CalcStock(' + Id + ')" readonly onkeydown="FocusNext(event, \'MRP_\', \'StockType_\', \'Quantity_\', ' + Id + ', \'MTr_\')"><option value="0">Select</option><option value="1">Add</option><option value="2">Less</option></select>' +
         '<input type="text" id="Quantity_' + Id + '" readonly  value="' + parseInt($("#Quantity_0").val() || 0) + '" class="form-control smallTextbox denull input-group-append borderno text-center"  onkeypress="isNumberInt(event,this)" readonly  onkeydown="FocusNext(event, \'StockType_\', \'Quantity_\', \'Reason_\', ' + Id + ', \'MTr_\')"  /><input type="text" id="LQuantity_' + Id + '"  value="' + parseInt($("#LQuantity_0").val() || 0) + '" class="form-control smallTextbox denull input-group-append borderno text-center" onkeypress="isNumberInt(event,this)" readonly onkeydown="FocusNext(event, \'StockType_\', \'Quantity_\', \'Reason_\', ' + Id + ', \'MTr_\')"  /></div></td>' +

         

       '<td width="5%"><input id="NStock_' + Id + '" readonly value="' + parseInt($("#NStock_0").val() || 0) + '" class="form-control smallTextbox borderno text-center bg-white" disabled /></td>' +

       '<td width="7%"><select type="text" id="Reason_' + Id + '" readonly class="form-control smallTextbox dezero borderno"  onkeydown="FocusNext(event, \'Quantity_\', \'Reason_\', \'Reason_\', ' + Id + ', \'MTr_\')">' + ReasonLoad + '</select></td>' +

       '<td width="5%" style="display:none;">' +
       '<input id="ProductId_' + Id + '" value="' + $("#ProductId_0").val() + '" />' +
       '<input id="CStock_' + Id + '" value="' + $("#CStock_0").val() + '" />' +
       '<input id="BatchSlNo_' + Id + '" value="' + $("#BatchSlNo_0").val() + '" />' +
       '<input id="PurSlNo_' + Id + '" value="' + $("#PurSlNo_0").val() + '" />' +
       '<input id="InvId_' + Id + '" value="' + $("#InvId_0").val() + '" />' +
       '<input id="TransType_' + Id + '" value="' + $("#TransType_0").val() + '" />' +
       '<input id="Rate_' + Id + '" value="' + $("#Rate_0").val() + '" />' +

       '</td>' +
       '</tr>';

    $("#Tbl_Purchase").append(ProductRow);
    $("#StockType_" + Id).val($("#StockType_0").val());
    $("#Reason_" + Id).val($("#Reason_0").val());


    $("#GridLength").val(Id);

    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    ClearProductRow(0, 1);
}


function CreateNew() {
    if ($("#Tbl_Purchase tr").length > 0 && CopyFlag == 0) {
        $('#Confirmflag').val('CreateNew'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
    else {
        formrefresh(0);
    }
}

function ClearProductRow(Id, Flag) {
    if (Flag == 0) {
        $("#ProductId_" + Id + ",#BatchSlNo_" + Id + ",#CStock_" + Id + ",#Reason_" + Id + ",#StockType_" + Id + ",#PurSlNo_" + Id + ",#Rate_" + Id + ",#InvId_" + Id).val(0);
        $("#Batch_" + Id + ",#Expiry_" + Id + ",#NStock_" + Id + ",#Quantity_" + Id + ",#MRP_" + Id + ",#SR_" + Id + ",#NewBatch_" + Id + ",#TransType_" + Id).val('');
    }
    else if (Flag == 1) {
        $("#Product_" + Id).val('');
        $("#ProductId_" + Id + ",#BatchSlNo_" + Id + ",#CStock_" + Id + ",#Reason_" + Id + ",#StockType_" + Id + ",#PurSlNo_" + Id + ",#Rate_" + Id + ",#InvId_" + Id).val(0);
        $("#Batch_" + Id + ",#Expiry_" + Id + ",#NStock_" + Id + ",#Quantity_" + Id + ",#MRP_" + Id + ",#SR_" + Id + ",#NewBatch_" + Id + ",#TransType_" + Id).val('');
        Defaultfocus();
    }
    else if (Flag == 2) {
        $("#BatchSlNo_" + Id + ",#CStock_" + Id + ",#Reason_" + Id + ",#StockType_" + Id + ",#PurSlNo_" + Id + ",#Rate_" + Id + ",#InvId_" + Id).val(0);
        $("#Expiry_" + Id + ",#NStock_" + Id + ",#Quantity_" + Id + ",#MRP_" + Id + ",#SR_" + Id + ",#NewBatch_" + Id + ",#TransType_" + Id).val('');
    }

    var RC = $('#Tbl_Purchase tr').length;

    if (RC > 0) {
        $('#Location').prop("disabled", true);
    
    }

}

function formrefresh(Flag) {
    $('.dezero').val(0);
    $('.denull').val('');
    $("#Tbl_Purchase tr").remove();
    EditFlag = 0;
    $("#btnprint").hide();
    $('#Date').val(CurDate);
    $('#Location').val(UserLocationId);
    if (Flag == 0) {
        $('.smallTextbox,#txtnotes').prop("disabled", false);
        $('.dedisa').prop("disabled", true);
        $("#Mode").removeClass();
        $("#Mode").addClass('badge badge-primary');
        $("#Mode").text('Mode : New');
        CopyFlag = 0;
        SerailIDLoad();
        $(".CopyShow").hide();
        $(".CopyHide,#btnsubmit").show();
        Defaultfocus();
    }
    else if (Flag == 1) {
        OKCopy();
    }
}

function GetCopy() {
    if ($("#Tbl_Purchase tr").length > 0 && CopyFlag == 0) {
        $('#Confirmflag').val('Copy'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
    else {
        formrefresh(1);
    }
}

function OKCopy() {
    $('.smallTextbox,#txtnotes').prop("disabled", true);
    $('.copytext').prop("disabled", false);
    $("#Mode").removeClass();
    $("#Mode").addClass('badge badge-danger');
    $("#Mode").text('Mode : Copy');
    $(".CopyShow").show();
    $(".CopyHide,#btnsubmit").hide();
    $("#Search_0").focus().select();
}

function GetPurchaseCorrection(result) {
    CopyFlag = 1;
    $("#btnprint").show();
    $("#Tbl_Purchase tr").remove();
    for (var i = 0; i < result.length; i++) {

        var Id = parseInt(i) + 1;

        var ProductRow = '<tr id="MTr_' + Id + '" onfocusout="UpdateRow(' + Id + ')">' +
              '<td width="2%" align="center"><input class="jsgrid-button jsgrid-delete-button" type="button" onclick="DeleteRow(' + Id + ')" title="Delete" autocomplete="off"></td>' +

              '<td width="3%" align="center" id="MTd_' + Id + '">' + Id + '</td>' +

              '<td width="13%"><input id="Product_' + Id + '" value="' + result[i].ItemCode + '" onkeyup="LoadProduct(' + Id + ')" class="form-control smallTextbox borderno" autocomplete="off" /></td>' +

              '<td width="5%"><input id="Batch_' + Id + '" value="' + result[i].Batch + '" onkeyup="LoadBatch(' + Id + ')" class="form-control smallTextbox borderno batch" autocomplete="off" /></td>' +

              '<td width="5%"  data-toggle="tooltip" data-placement="top" data-original-title="Location : ' + result[i].DueDate + '"><input id="NewBatch_' + Id + '" value="' + result[i].ItemDescription + '" class="form-control smallTextbox borderno batch" onkeydown="FocusNext(event, \'NewBatch_\', \'NewBatch_\', \'Expiry_\', ' + Id + ', \'MTr_\')" /></td>' +

              '<td width="5%"  data-toggle="tooltip" data-placement="top" data-original-title="Old Expiry : ' + result[i].Expiry + '"><input id="Expiry_' + Id + '" value="' + result[i].InvoDate + '" class="form-control smallTextbox borderno text-center" onkeypress="isNumberDate(event, this)" onkeyup="ExpiryDate(\'Expiry_' + Id + '\')" onkeydown="FocusNext(event, \'NewBatch_\', \'Expiry_\', \'SR_\', ' + Id + ', \'MTr_\')" /></td>' +

              '<td width="5%" data-toggle="tooltip" data-placement="top" data-original-title="Old Selling Price : ' + result[i].SellingRate + '"><input id="SR_' + Id + '" value="' + parseFloat(result[i].Amount || 0).toFixed(Decimal) + '" class="form-control smallTextbox borderno text-right"  onkeypress="isNumber(event,this)" onkeydown="FocusNext(event, \'Expiry_\', \'SR_\', \'MRP_\', ' + Id + ', \'MTr_\')" /></td>' +

              '<td width="5%" data-toggle="tooltip" data-placement="top" data-original-title="Old MRP : ' + result[i].MRP + '"><input id="MRP_' + Id + '" value="' + parseFloat(result[i].FCAmount || 0).toFixed(Decimal) + '" class="form-control smallTextbox borderno text-right"  onkeypress="isNumber(event,this)" onkeydown="FocusNext(event, \'SR_\', \'MRP_\', \'StockType_\', ' + Id + ', \'MTr_\')" /></td>' +

              '<td width="9%"><div class="input-group m-0"><select style=display:none type="text" id="StockType_' + Id + '" class="form-control smallTextbox borderno" autocomplete="off"  onchange="CalcStock(' + Id + ')"  onkeydown="FocusNext(event, \'MRP_\', \'StockType_\', \'Quantity_\', ' + Id + ', \'MTr_\')"><option value="0">Select</option><option value="1">Add</option><option value="2">Less</option></select>' +
                '<input type="text" id="Quantity_' + Id + '"  value="' +parseInt( parseFloat(result[i].Loose || 0)) + '" class="form-control smallTextbox denull input-group-append borderno text-center"  onkeyup="CalcStock(' + Id + ')"  onkeypress="isNumberInt(event,this)"  onkeydown="FocusNext(event, \'StockType_\', \'Quantity_\', \'Reason_\', ' + Id + ', \'MTr_\')"  />' +

                '<input type="text" id="LQuantity_' + Id + '"  value="' + parseFloat(result[i].Loose || 0) + '" class="form-control smallTextbox denull input-group-append borderno text-center"  onkeyup="CalcStock(' + Id + ')"  onkeypress="isNumberInt(event,this)"  onkeydown="FocusNext(event, \'StockType_\', \'Quantity_\', \'Reason_\', ' + Id + ', \'MTr_\')"  /></div></td>' +


                '<td width="5%"><div class="input-group m-0"><select style=display:none type="text" id="StockType_' + Id + '" class="form-control smallTextbox borderno" autocomplete="off"  onchange="CalcStock(' + Id + ')"  onkeydown="FocusNext(event, \'MRP_\', \'StockType_\', \'Quantity_\', ' + Id + ', \'MTr_\')"><option value="0">Select</option><option value="1">Add</option><option value="2">Less</option></select>' +
                '<input type="text" id="NQuantity_' + Id + '"  value="' + parseInt(parseFloat(result[i].Free || 0)  + '" class="form-control smallTextbox denull input-group-append borderno text-center"  onkeyup="CalcStock(' + Id + ')"  onkeypress="isNumberInt(event,this)"  onkeydown="FocusNext(event, \'StockType_\', \'Quantity_\', \'Reason_\', ' + Id + ', \'MTr_\')"  />' +

                '<input type="text" id="NLQuantity_' + Id + '"  value="' + parseFloat(result[i].Free || 0)) + '" class="form-control smallTextbox denull input-group-append borderno text-center"  onkeyup="CalcStock(' + Id + ')"  onkeypress="isNumberInt(event,this)"  onkeydown="FocusNext(event, \'StockType_\', \'Quantity_\', \'Reason_\', ' + Id + ', \'MTr_\')"  /></div></td>' +


              '<td width="7%"><select type="text" id="Reason_' + Id + '" class="form-control smallTextbox dezero borderno"  onkeydown="FocusNext(event, \'Quantity_\', \'Reason_\', \'Reason_\', ' + Id + ', \'MTr_\')">' + ReasonLoad + '</select></td>' +

              '<td width="5%" style="display:none;">' +
              '<input id="ProductId_' + Id + '" value="' + result[i].ProductId + '" />' +
              '<input id="CStock_' + Id + '" value="' + result[i].Loose + '" />' +
              '<input id="BatchSlNo_' + Id + '" value="' + result[i].BatchSlNo + '" />' +
              '<input id="PurSlNo_' + Id + '" value="' + result[i].InvoNo + '" />' +
              '<input id="InvId_' + Id + '" value="' + result[i].InvId + '" />' +
              '<input id="TransType_' + Id + '" value="' + result[i].Variable1 + '" />' +
              '<input id="Rate_' + Id + '" value="' + result[i].Rate + '" />' +

              '</td>' +
              '</tr>';

        $("#Tbl_Purchase").append(ProductRow);
        $("#StockType_" + Id).val(result[i].Flag);
        $("#Reason_" + Id).val(result[i].Status);
        $("#txtnotes").val(result[i].Remarks);
        $("#CurPurCorrection").val(result[i].SlNo);
        $("#Date").val(result[i].ShipDate);
        $("#CurPurCorrectiontext").text(result[i].SlNo);
    }
    $("#GridLength").val(result.length);

    $('.smallTextbox,.jsgrid-button').prop("disabled", true);
    $('.copytext').prop("disabled", false);

    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    $("#btnnew").focus();
}

function UpdateRow(Id) {

    EditFlag = Id;

    if ($("#ProductId_" + Id).val() == 0) {
        warningshow("Select Product", "Product_" + Id);
        return false;
    }
    else if ($("#BatchSlNo_" + Id).val() == 0) {
        warningshow("Select Batch", "Batch_" + Id);
        return false;
    }
    else if ($.trim($("#NewBatch_" + Id).val()) == '') {
        warningshow('Enter Batch', 'NewBatch_' + Id);
        return false;
    }
    else if ($.trim($("#Expiry_" + Id).val()) == '' || $.trim($("#Expiry_" + Id).val().length) != 7) {
        warningshow('Enter Expiry', 'Expiry_' + Id);
        return false;
    }
    else if (parseFloat($("#SR_" + Id).val() || 0) == 0) {
        warningshow('Enter Selling Rate', 'SR_' + Id);
        return false;
    }
    else if (parseFloat($("#SR_" + Id).val() || 0) < parseFloat($("#Rate_" + Id).val() || 0)) {
        warningshow('Selling Rate cannot be less than Purchase Rate : ' + parseFloat($("#Rate_" + Id).val() || 0).toFixed(Decimal), 'SR_' + Id);
        return false;
    }
    else if (parseFloat($("#MRP_" + Id).val() || 0) == 0) {
        warningshow('Enter MRP', 'MRP_' + Id);
        return false;
    }
    //else if (parseFloat($("#MRP_" + Id).val() || 0) < parseFloat($("#Rate_" + Id).val() || 0)) {
    //    warningshow('MRP cannot be less than Purchase Rate : ' + parseFloat($("#Rate_" + Id).val() || 0).toFixed(Decimal), 'MRP_' + Id);
    //    return false;
    //}
    else if (parseInt($("#StockType_" + Id).val() || 0) == 0 && parseInt($("#Quantity_" + Id).val() || 0) != 0) {
        warningshow('Select Type', 'StockType_' + Id);
        return false;
    }
    else if (parseInt($("#StockType_" + Id).val() || 0) != 0 && parseInt($("#Quantity_" + Id).val() || 0) == 0) {
        warningshow('Enter Quantity', 'Quantity_' + Id);
        return false;
    }
    else if (parseInt($("#NStock_" + Id).val() || 0) < 0) {
        warningshow('Stock cannot be less than Zero', 'Quantity_' + Id);
        return false;
    }
    else if (parseInt($("#Reason_" + Id).val() || 0) == 0) {
        warningshow('Select Reason', 'Reason_' + Id);
        return false;
    }
    else {
        EditFlag = 0;
        $("#SR_" + Id).val(parseFloat($("#SR_" + Id).val() || 0).toFixed(Decimal));
        $("#MRP_" + Id).val(parseFloat($("#MRP_" + Id).val() || 0).toFixed(Decimal));
        $("#Quantity_" + Id).val(parseInt($("#Quantity_" + Id).val() || 0));
        $("#NStock_" + Id).val(parseInt($("#NStock_" + Id).val() || 0));

        return true;
    }
}


function DeleteRow(Id) {
    $('#Confirmflag').val('DeleteRow'), $('#ConfirmRowId').val(Id)
    $('#confirmmessage').text('Do you want to delete this row?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}

function OKDelete(RowId) {
    $('#MTr_' + RowId).remove();
    var slno = 1;

    if ($("#Tbl_Purchase tr").length == 0) {
        $("#GridLength").val(0);
    }
    var GridLength = $("#GridLength").val();
    for (var i = 1; i <= GridLength; i++) {
        if ($('#Product_' + i).val() != undefined) {
            $('#MTd_' + i).text(slno);
            slno++;
        }
    }
}

function PurchaseCorrectionInsert() {
    if ($("#Tbl_Purchase tr").length == 0) {
        warningshow('No Products Added', 'Product_0');
        return false;
    }
    //else if (EditFlag != 0) {
    //    warningshow('Row Details are not Complete', 'NewBatch_' + EditFlag);
    //    return false;
    //}
    else {
        $('#Confirmflag').val('CorrectionInsert'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to save this Purchase Correction?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
}

function OKPurchaseCorrectionInsert() {
    $('#LoadingSmall').show();
    $('#confirmOk,#btnsubmit').prop("disabled", true);
    var GridLength = $("#GridLength").val();

    var oArray = new Array();

    var slno = 0;
    for (var i = 1; i <= GridLength; i++) {

        var CurrencyRate = parseFloat($("#Curr_Rate").val() || 1);

        if ($('#Product_' + i).val() != undefined) {
            slno++;
            oArray.push({

                'PurMainId': slno,
                'SubId': $("#CurPurCorrection").val(),
                'Remarks': $.trim($("#txtnotes").val()),
                'SlNo': $("#PurSlNo_" + i).val(),
                'ItemId': parseFloat($("#ProductId_" + i).val() || 0),
                'BatchSlNo': parseInt($("#BatchSlNo_" + i).val() || 0),
                'Batch': $.trim($("#NewBatch_" + i).val()),
                'Expiry': $.trim($("#Expiry_" + i).val()),
                'SellingRate': parseFloat($("#SR_" + i).val() || 0),
                'MRP': parseFloat($("#MRP_" + i).val() || 0),
                'Flag': $("#StockType_" + i).val(),
                'Quantity': parseFloat($("#Quantity_" + i).val() || 0),
                'Loose': parseFloat($("#LQuantity_" + i).val() || 0),

                'LocationId': $("#Location").val(),

                'TLQty': parseFloat($("#NStock_" + i).val() || 0),
                'ItemCode': $("#Reason_" + i).val(),
                'DelFlag': 1,
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,
                'Variable1': $("#TransType_" + i).val(),
                'UnitId': $("#InvId_" + i).val(),
                'InvoDate': $("#Date").val(),
            });
        }
    }

    if (oArray.length > 0) {


        var data = { 'PharmacyModel': oArray };
        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_PurchaseCorrectionInsert",
            data: data,
            success: function (result) {

                var status = result.oList[0].Status;
                var no = result.oList[0].SlNo;
                Showalerts(status, no);
                $('#confirmOk,#btnsubmit').prop("disabled", false);
                $('#LoadingSmall').hide();
            }
        });
    }
}
function Showalerts(Status, no) {
    if (Status == 1) {
        formrefresh(0);
        swal('Purchase Correction# : ' + no + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}


function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'CreateNew') {
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'Copy') {
        formrefresh(1);
    }
    else if (Result == 'true' && status == 'DeleteRow') {
        OKDelete(rowid)
    }
    else if (Result == 'true' && status == 'CorrectionInsert') {
        OKPurchaseCorrectionInsert();
    }
    $('#confirm').fadeOut();
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

function isNumberDate(evt, selectedvalue) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\./]/g, ''));
    if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}
function ExpiryDate(Id) {

    var Expiry = $("#" + Id).val();
    var NewExpiry = '';
    var Year = '/20';

    if (Expiry.length >= 2) {

        if (Expiry.length < 8) {

            if (parseInt(Expiry.substring(0, 2) || 0) > 12 || parseInt(Expiry.substring(0, 2) || 0) == 0) {
                $("#" + Id).val('');
                console.log('a')
            }
            else if (Expiry.length == 2) {
                NewExpiry = Expiry + Year;
                $("#" + Id).val(NewExpiry);
                console.log('b')
            }

        }
        else {
            NewExpiry = Expiry.substring(0, 7);
            $("#" + Id).val(NewExpiry);
            console.log('c')
        }
    }
    else if (Expiry.length == 1) {
        if (Expiry != '0' && Expiry != '1') {
            NewExpiry = '0' + Expiry + Year;
            $("#" + Id).val(NewExpiry);
        }
        //else if (Expiry == '1') {
        //    NewExpiry = Expiry + '2' + Year;
        //    $("#" + Id).val(NewExpiry);
        //}
    }
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

function FocusNext(e, P_Col, C_Col, N_Col, RowId, TR) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key == 39 && N_Col != '') {              // Right Arrow and Left Arrow
        e.preventDefault();

        $("#" + N_Col + RowId).focus().select();
    }
    else if (key == 37 && P_Col != '') {              // Right Arrow and Left Arrow
        e.preventDefault();

        $("#" + P_Col + RowId).focus().select();
    }

    else if (key == 40 && RowId != 0 && C_Col != '')          // Down Arrow
    {
        e.preventDefault();
        var Rid;

        try { Rid = ($('#' + TR + RowId).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; }
        catch (err) { Rid = RowId; }

        $("#" + C_Col + Rid).focus().select();



    }
    else if (key == 38 && RowId != 0 && C_Col != '') {           // Up Arrow
        e.preventDefault();
        var Rid;

        try { Rid = ($('#' + TR + RowId).closest('tr').prev('tr').attr('id')).match(/\d+/)[0]; }
        catch (err) { Rid = RowId; }

        $("#" + C_Col + Rid).focus().select();

    }
}