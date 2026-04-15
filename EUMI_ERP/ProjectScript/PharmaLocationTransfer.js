$(document).ready(function () {
    SerialNoLoad();
    Defaultfocus();
    LoadDate();
    LocnLoad();

    $("#btnadd").click(function (e) {
        Productadd();
    });
    $("#btnnew").click(function (e) {
        formrefresh();
    });
    $("#btnsubmit").click(function (e) {
        Save();
    });
    $("#btnedit").click(function (e) {
        Edit();
    });
    $("#btnupdate").click(function (e) {
        Update();
    });
    $("#btndelete").click(function (e) {
        Delete();
    });
    $("#btncopy").click(function (e) {
        Copy();
    });
    
    $('#Quantity_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnadd").focus();

        }
    });
    $('.my-in-sm').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if (!$(this).is('button') && $(this).attr('name') != 'NoEnterFlow') {
                e.preventDefault();
                var inputs = $(this).closest('form').find(':input:text:enabled,select:enabled');
                inputs.eq(inputs.index(this) + 1).focus().select();

            }

        }
    });
});

function Defaultfocus(){
    $("#FromLoc").focus();
}

function LoadDate() {
    $('.dedate').daterangepicker({
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    }).val(CurDate);

    CheckEOD();
}

function CheckEOD() {
    if (EODType == 'EOD') {
        $("#Date").prop('disabled', true); //.addClass('bgclrwhite');
        $("#Date").addClass('bg-white');
    }
    else {
        $("#Date").prop('disabled', false) //.removeClass('bgclrwhite');
    }
}

function LocnLoad() {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
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
    $("#FromLoc,#ToLoc").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocnSelect += "<option value='" + result[i].LocationId + "' name='" + result[i].NegativeBillingFlag + "'>" + result[i].LocationCode + "</option>";
    }
    $("#FromLoc,#ToLoc").append(LocnSelect);
    $('#FromLoc').val(UserLocationId);
}

function SerialNoLoad() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            GetSlNo(result.oList);
        }
    });
}

function GetSlNo(result) {
    $('#TransferNo,#CTransferNo').val(result[0].trNo);
}

function formrefresh() {
    if ($("#TblSalesInvoice tr").length > 0) {
        $('#Confirmflag').val('New'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Data will be lost. Continue?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
    else {
        OKformrefresh(0);
    }
}

function OKformrefresh(Flag) {
    $(".modal").modal("hide");
    $(".dezero").val(0);
    $(".detxzero").text(0);
    $(".denull").val('');
    $(".deselect").val($(".deselect option:first").val());
    $(".dedate").val(CurDate);
    $("#TblSalesInvoice tr").remove();
    $(".dedisa").prop("disabled", true);
    $(".cpdisa").prop("disabled", false);
    //When New
    if (Flag == 0) {
        SerialNoLoad();
        $("#FromLoc").val(UserLocationId);
        Defaultfocus();
        $(".dehide").hide();
        $(".deshow").show();
    }
}

function LoadProduct(Id) {
    $("#Product_" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            ClearProductRow(1,Id);
            if (($('#FromLoc').val() || 0) == 0) {
                warningshow('Please Select Location', 'FromLoc');
                $("#Product_" + Id).val('');
                return false;
            }
            else {
                var data = {};
                data.ItemCode = $("#Product_" + Id).val();
                data.SlNumber = 0;
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
                                ColCount: '4',
                                label: item.Description,
                                label1: item.ItemCode,
                                label2: item.Group,
                                label3: item.Category,
                                ProductId: item.ItemId,
                                headers: ["Name", "Code", "Company", "Type"]
                            })
                        }));
                    }

                })
            }
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#ProductId_' + Id).val(ui.item.ProductId);
            GetProdDetails(ui.item.ProductId, ERPDeptId);
            $('#Batch_' + Id).focus().select();
            LoadBatch(Id);
        },
    })
    .on('autocompleteselect  autocompletefocus', function (ev, ui) {
        GetProdDetails(ui.item.ProductId, ERPDeptId);
    }).on('keydown', function (e) {
        if (Id == 0 && e.which == 13 && ($('#ProductId_' + Id).val() > 0)) {
            $('#Batch_' + Id).focus().select();
            LoadBatch(Id);
        }
    });
}

function LoadBatch(Id) {
    $("#Batch_" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            ClearProductRow(2, Id);
            if (($('#ProductId_' + Id).val() || 0) == 0) {
                return false;
            }
            else {
                var data = {};
                data.ProductId = $("#ProductId_" + Id).val();
                data.HLocation = $("#FromLoc").val();
                data.Batch = '';
                data.Type = 1;
                data.DeptId = ERPDeptId;
                data.UserId = ERPUserId;
                data.Flag = 0;
                $.ajax({
                    url: '../Hospital/HMS_BatchwiseItemDetailsGets',
                    type: "POST",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        if (data.length) {
                            response($.map(data, function (item) {
                                return ({
                                    ColCount: '7',
                                    label: item.Batch,
                                    label1: item.ProductDesc,
                                    label2: item.Companycode,
                                    label3: item.ItemExpiry,
                                    label4: item.Stock,
                                    label5: item.Sellingrate,
                                    label6: item.Mrp,
                                    Company: item.Companycode,
                                    Expiry: item.ItemExpiry,
                                    SellPrice: item.Sellingrate,
                                    PurPrice: item.Purrate,
                                    BatchSlNo: item.BatchSlNo,
                                    Taxpers: item.Taxpers,
                                    Drugschedule: item.Variable1,
                                    Cess: item.Cess,
                                    Mrp: item.Mrp,
                                    HSN: item.Variable3,
                                    Stock:item.Stock,
                                    headers: ["Batch", "Description", "Company", "ItemExpiry", "Stock", "Selling Price", "Mrp"]
                                })
                            }));
                        }
                        else {
                            warningshow('No Stock Available!', 'Product_' + Id);
                        }
                    }
                })
            }
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#Company_' + Id).val(ui.item.Company);
            $('#Expiry_' + Id).val(ui.item.Expiry);
            $('#SellPrice_' + Id).val(ui.item.SellPrice);
            $('#PHSNCode_' + Id).val(ui.item.HSN);
            $('#BatchSlNo_' + Id).val(ui.item.BatchSlNo);
            $('#Quantity_' + Id).val(1).focus().select();
            $('#DrugSchedule_' + Id).val(ui.item.Drugschedule);
            $('#Stock_' + Id).val(ui.item.Stock);
            CalAmount(Id);
        },
    })
    .on('autocompleteselect  autocompletefocus', function (ev, ui) {
    }).bind('focus', function () {
        $(this).keydown();
    }).on('keydown', function (e) {
        if (Id == 0 && e.which == 13 && ($('#BatchSlNo_' + Id).val() > 0)) {
            $('#Quantity_' + Id).focus().select();
        }
    });
}

function GetProdDetails(ItemId, DeptId) {
    var data = {};
    data.ProductId = ItemId;
    data.CustId = 0;
    data.DeptId = DeptId;
    $.ajax({
        type: "POST",
        url: '../SalesInvoice/CustomerProductDetailsSearch',
        data: data,
        success: function (result) {
            CustPrdctLoad(result.oList);
        }
    });
}

function CustPrdctLoad(result) {
    $("#tblproductdetails tr").remove();

    if (!($('.modalProduct').is(':visible'))) {
        $('#productpdiv').modal("show");
        $("#productpdiv").appendTo("body");
        $('.modal-backdrop').removeClass("modal-backdrop");
    }

    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "LSP";
        }
        else {
            custstat = "LSP";
        }

        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");

        var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
           "<td style='border:none;font-weight:500;color:yellow' class='text-left'><b>" + result[n].ProductCode + "</b></td>" +
           "<td class='white font-weight-bold' style='border:none;font-weight:500' class='text-left'>" +
           "<table width='100%'>" +
           "<tr>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>C : </b>" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>LP : </b>" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>" + custstat + " : </b>" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>Stock : </b>" + (result[n].Sumtotqty || 0) + "</td>" +
           "<td style='border:none;font-weight:500'><button type='button' class='btn btn-primary btn-sm m-0' onclick=CloseModal()><i class='fa fa-close'></i></button></td>" +
           "</tr>" +
           "</table>" +
           "</td>" +
           "</tr>" +
           "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";


        $('#tblproductdetails').append(ProdRow);
        $('#tbllocqty').attr('border', '1');
        $('#tbllocqty').attr('bordercolor', 'white');

    }

}

function CloseModal() {
    $(".modal").modal("hide");
}

function ClearProductRow(Flag, Id) {
    //Product AutoComplete time
    if (Flag == 1) {
        $("#Batch_" + Id + ",#Quantity_" + Id + ",#Company_" + Id + ",#Amount_" + Id + ",#DrugSchedule_" + Id + ",#PHSNCode_" + Id + ",#Company_" + Id + ",#Expiry_" + Id + "").val('');
        $("#ProductId_" + Id + ",#BatchSlNo_" + Id + ",#Stock_" + Id + "").val(0);
    }
    //Batch Autocomplete time
    else if (Flag == 2) {
        $("#Quantity_" + Id + ",#Company_" + Id + ",#Amount_" + Id + ",#DrugSchedule_" + Id + ",#PHSNCode_" + Id + ",#Expiry_" + Id + "").val('');
        $("#BatchSlNo_" + Id + ",#Stock_" + Id + "").val(0);
    }
    //Product Add time
    else {
        $("#Product_" + Id + ",#Batch_" + Id + ",#Quantity_" + Id + ",#Company_" + Id + ",#Amount_" + Id + ",#DrugSchedule_" + Id + ",#PHSNCode_" + Id + ",#Expiry_" + Id + "").val('');
        $("#ProductId_" + Id + ",#BatchSlNo_" + Id + ",#Stock_" + Id + "").val(0);
        $("#Product_" + Id + "").focus();
    }
}

function CalAmount(RowId){
    var Qty = parseInt($("#Quantity_" + RowId).val() || 0);
    var Rate = parseFloat($("#SellPrice_" + RowId).val() || 0);
    var Amount = Qty * Rate;

    $("#Amount_" + RowId).val(parseFloat(Amount||0).toFixed(Decimal));
}

var TOTamt = 0;
function CalcAmt() {
    var id = $("#GridLength").val();
    TOTamt = 0;
    var slno = 0; var Qty = 0;
    for (var i = 1; i <= id; i++) {
        if ($("#Product_" + i).val() != undefined) {
            slno++;
            $("#trno_" + i).text(slno);
            CalAmount(i);
            Qty = Qty + parseInt($("#Quantity_" + i).val() || 0);

            TOTamt = TOTamt + parseFloat($("#Amount_" + i).val() || 0)

          
            
            console.log('t-'+TOTamt)

        }
    }
    $("#TotalQty").text(Qty)
    $("#Totalamt").text(TOTamt)
}

function Productadd() {

    var StkCheck = CheckStock(parseInt($("#BatchSlNo_0").val() || 0), parseInt($("#FromLoc").val() || 0), parseInt($("#Stock_0").val() || 0), parseInt($("#Quantity_0").val() || 0),0);


    if (parseInt($("#ProductId_0").val() || 0) == 0) {
        warningshow('Select Product', 'Product_0');
        return false;
    }
    else if (parseInt($("#BatchSlNo_0").val() || 0) == 0) {
        warningshow('Select Batch', 'Batch_0');
        return false;
    }
    else if (parseInt($("#Quantity_0").val() || 0) ==0) {
        warningshow('Enter Quantity', 'Quantity_0');
        return false;
    }
    else if (parseInt($("#Quantity_0").val() || 0) > parseInt($("#Stock_0").val() || 0)) {
        warningshow('Not Enough Stock, Available Stock - ' + parseInt($("#Stock_0").val() || 0), 'Quantity_0');
        return false;
    }
    else if (StkCheck == 1) {
        warningshow('Not Enough Stock, Available Stock - ' + parseInt($("#Stock_0").val() || 0) , 'Quantity_0');
        return false;
    }
    else {
        OKProductadd();
    }
}

function OKProductadd() {

    var Pname = $("#Product_0").val();

    $("#lbl0").remove();
    $("#Product_0").remove();

    $('#psearch').append('<label id="lbl0" class="label-control">Product:<span class="danger">&nbsp;*</span></label><input class="form-control denull my-in-sm cpdisa" id="Product_0" onkeypress="LoadProduct(0)" name="NoEnterFlow" />');

    var id = Number($("#GridLength").val()) + 1;
    var TrLength = Number($("#TblSalesInvoice tr").length) + 1;

    var Text = '<tr id="MTR_'+id+'" onfocusout="UpdateRow('+id+')">' +
        '<td style="width:2%" align="center">' +
        '<input class="jsgrid-button jsgrid-delete-button" type="button" onclick="DeleteRow(' + id + ')" title="Delete" autocomplete="off">' +
        '</td>' +
        '<td style="width:3%" align="center" id="trno_'+id+'">' + TrLength + '</td>' +
        '<td style="width:15%">' +
        '<input class="form-control form-control-sm gridcell" id="Product_' + id + '" value="' + Pname + '"  onkeyup="LoadProduct(' + id + ')"  />' +
        '</td>' +
        '<td style="width:5%">' +
        '<input class="form-control form-control-sm gridcell" id="Batch_' + id + '" value="' + $("#Batch_0").val() + '"  onkeyup="LoadBatch(' + id + ')"  />' +
        '</td>' +
        '<td style="width:10%">' +
        '<input class="form-control form-control-sm gridcell dedisa" disabled id="Company_' + id + '" value="' + $("#Company_0").val() + '"  />' +
        '</td>' +
        '<td style="width:5%">' +
        '<input class="form-control form-control-sm gridcell dedisa" disabled id="Expiry_' + id + '" value="' + $("#Expiry_0").val() + '"  />' +
        '</td>' +
        '<td style="width:5%">' +
        '<input class="form-control form-control-sm gridcell text-center" id="Quantity_' + id + '" value="' + $("#Quantity_0").val() + '" onkeyup="CalAmount(' + id + ')"  onkeypress="isNumberInt(event,this)" />' +
        '</td>' +
        '<td style="width:5%">' +
        '<input class="form-control form-control-sm gridcell dedisa text-right" disabled id="SellPrice_' + id + '" value="' + parseFloat($("#SellPrice_0").val() || 0).toFixed(Decimal) + '"  onkeypress="isNumberInt(event,this)"  />' +
        '</td>' +
        '<td style="width:5%">' +
        '<input class="form-control form-control-sm gridcell dedisa text-right" disabled id="Amount_' + id + '" value="' + parseFloat($("#Amount_0").val() || 0).toFixed(Decimal) + '"  onkeypress="isNumberInt(event,this)"  />' +
        '</td>' +
        '<td style="width:5%">' +
        '<input class="form-control form-control-sm gridcell dedisa" disabled id="DrugSchedule_' + id + '" value="' + $("#DrugSchedule_0").val() + '"  />' +
        '</td>' +
        '<td style="display:none">' +
        '<input id="ProductId_' + id + '" value="' + $("#ProductId_0").val() + '"  />' +
        '<input id="BatchSlNo_' + id + '" value="' + $("#BatchSlNo_0").val() + '"  />' +
        '<input id="Stock_' + id + '" value="' + $("#Stock_0").val() + '"  />' +
        '<input id="PHSNCode_' + id + '" value="' + $("#PHSNCode_0").val() + '"  />' +
        '<input id="FromLoc_' + id + '" value="' + $("#FromLoc").val() + '"  />' +
        '<input id="ToLoc_' + id + '" value="' + $("#ToLoc").val() + '"  />' +
        '<input id="OldQty_' + id + '" value="0"  />' +
        '</td>' +
        '</tr>';

    $('#productpdiv').modal("hide");
    $("#GridLength").val(id);
    $("#TblSalesInvoice").append(Text);
    ClearProductRow(0, 0);
    CalcAmt();
}

function CheckStock(Batch, Locn, Stk, Qty,id) {

    var GridLength=$("#GridLength").val();
    var CuQty = 0; var OldQty = 0;

    for (var i = 1; i <= GridLength; i++) {

        if ($("#Product_" + i).val() != undefined) {

            if ($("#BatchSlNo_" + i).val() == Batch && $("#FromLoc_" + i).val() == Locn) {

                //console.log('BatchSlNo ::: ' + $("#BatchSlNo_" + i).val(), Batch);
                //console.log('Locn ::: ' + $("#FromLoc_" + i).val(), Locn);
                //console.log('Stock ::: ' + Stk);

                $("#Stock_" + i).val(Stk);
                CuQty = Number(CuQty) + Number($("#Quantity_" + i).val());
                OldQty = Number(OldQty) + Number($("#OldQty_" + i).val());
            }

        }

    }
    var NQty = Number(CuQty)
    if (id == 0) {
        NQty = Number(CuQty) + Number(Qty);
    }
    //console.log('NQty ::: ' + NQty);
    Stk = Stk + OldQty;
    if (Stk >= NQty) {
        //return true
        return 0;
    }
    else {
        //return false
        return 1;
    }
}

function DeleteRow(Id) {
    $('#Confirmflag').val('DeleteRow'), $('#ConfirmRowId').val(Id)
    $('#confirmmessage').text('Do you want to delete this row?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}

function OKDeleteRow(RowId) {
    $('#MTR_' + RowId).remove();
    CalcAmt();

}

function UpdateRow(RowId) {
    var StkCheck = CheckStock(parseInt($("#BatchSlNo_" + RowId).val() || 0), parseInt($("#FromLoc").val() || 0), parseInt($("#Stock_" + RowId).val() || 0), parseInt($("#Quantity_" + RowId).val() || 0),RowId);


    if (parseInt($("#ProductId_" + RowId).val() || 0) == 0) {
        warningshow('Select Product', 'Product_' + RowId);
        return false;
    }
    else if (parseInt($("#BatchSlNo_" + RowId).val() || 0) == 0) {
        warningshow('Select Batch', 'Batch_'+RowId);
        return false;
    }
    else if (parseInt($("#Quantity_" + RowId).val() || 0) == 0) {
        warningshow('Enter Quantity', 'Quantity_' + RowId);
        return false;
    }
    else if (parseInt($("#Quantity_" + RowId).val() || 0) > parseInt($("#Stock_" + RowId).val() + $("#OldQty_" + RowId).val() || 0)) {
        warningshow('Not Enough Stock, Available Stock - ' + parseInt($("#Stock_" + RowId).val() || 0), 'Quantity_'+ RowId);
        return false;
    }
    else if (StkCheck == 1) {
        warningshow('Not Enough Stock, Available Stock - ' + parseInt($("#Stock_" + RowId).val() || 0), 'Quantity_' + RowId);
        return false;
    }
    else {
        //ok
        $('#productpdiv').modal("hide");
        CalcAmt();
        return true;
    }
}

function CheckLocation() {
    if ($("#TblSalesInvoice tr").length > 0) {
        $("#TblSalesInvoice tr").remove();
        warningshow('Select locaton before adding product', 'Product_0');
        return false;
    }
    ClearProductRow(0, 0);
}

function Save() {
    if (parseInt($("#TransferNo").val() || 0) == 0) {
        warningshow('Invalid Transfer#', 'TransferNo');
        return false;
    }
    else if ($.trim($("#Date").val()) == '') {
        warningshow('Select Date', 'Date');
        return false;
    }
    else if (parseInt($("#FromLoc").val() || 0) == 0) {
        warningshow('Select From Location', 'FromLoc');
        return false;
    }
    else if (parseInt($("#ToLoc").val() || 0) == 0) {
        warningshow('Select To Location', 'ToLoc');
        return false;
    }
    else if (parseInt($("#FromLoc").val() || 0) == parseInt($("#ToLoc").val() || 0)) {
        warningshow('From and To Location cannot be same', 'ToLoc');
        return false;
    }
    else if ($("#TblSalesInvoice tr").length == 0) {
        warningshow('No Product Added', 'Product_0');
        return false;
    }
    else {
        $('#Confirmflag').val('Save'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Save this Location Transfer?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
}

function OKSave() {
    $('#LoadingSmall').show();
    $('#confirmOk,#btnsubmit').prop("disabled", true);
    var GridLength = $("#GridLength").val();

    var oArray = new Array();

    var slno = 0;
    for (var i = 1; i <= GridLength; i++) {

        if ($('#Product_' + i).val() != undefined) {

            slno++;

            oArray.push({

                'SlNo': slno,
                'TRNo': parseInt($("#TransferNo").val()||0),
                'TRDate': $.trim($("#Date").val()),
                'FromLocation': parseInt($("#FromLoc").val() || 0),
                'ToLocation': parseInt($("#ToLoc").val() || 0),
                'DebitAcc': 0,
                'CreditAcc': 0,
                'Remarks': $.trim($("#Remarks").val()),
                'ItemId': parseInt($("#ProductId_" + i).val() || 0),
                'BatchSlNo': parseInt($("#BatchSlNo_" + i).val() || 0),
                'Batch': $.trim($("#Batch_"+i).val()),
                'ItemCode': $.trim($("#Product_"+i).val()),
                'Quantity': parseInt($("#Quantity_" + i).val() || 0),
                'Price': parseFloat($("#SellPrice_" + i).val() || 0),
                'Total': parseFloat($("#Amount_" + i).val() || 0),
                'CuStock': parseFloat($("#Stock_" + i).val() || 0),
                'Expiry': $.trim($("#Expiry_" + i).val()),
                'Status': '',
                'Variable1': '',
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,

            });
        }
    }

    if (oArray.length > 0) {
        var data = { 'PharmacyModel': oArray };

        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_LocationTransferInsert",
            data: data,
            success: function (result) {
                $('#LoadingSmall').hide();
                $('#confirmOk,#btnsubmit').prop("disabled", false);
                var status = result.oList[0].Status;
                var no = result.oList[0].TRNo;
                Showalerts(status, no);
                if (status == 1) {
                    OKformrefresh(0);
                }
            }
        });
    }
}

function Edit() {
    $('#Confirmflag').val('Edit'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Edit this Location Transfer?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}

function OKEdit() {
    $(".cpdisa").prop("disabled", false);
    $("#btndelete,#btnedit").hide();
    $("#btnupdate").show();
    $("#CTransferNo").hide();
    $("#TransferNo").show();
}

function Update() {
    if (parseInt($("#TransferNo").val() || 0) == 0) {
        warningshow('Invalid Transfer#', 'TransferNo');
        return false;
    }
    else if ($.trim($("#Date").val()) == '') {
        warningshow('Select Date', 'Date');
        return false;
    }
    else if (parseInt($("#FromLoc").val() || 0) == 0) {
        warningshow('Select From Location', 'FromLoc');
        return false;
    }
    else if (parseInt($("#ToLoc").val() || 0) == 0) {
        warningshow('Select To Location', 'ToLoc');
        return false;
    }
    else if (parseInt($("#FromLoc").val() || 0) == parseInt($("#ToLoc").val() || 0)) {
        warningshow('From and To Location cannot be same', 'ToLoc');
        return false;
    }
    else if ($("#TblSalesInvoice tr").length == 0) {
        warningshow('No Product Added', 'Product_0');
        return false;
    }
    else {
        $('#Confirmflag').val('Update'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to update this location transfer?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
}

function OKUpdate() {
    $('#LoadingSmall').show();
    $('#confirmOk,#btnupdate').prop("disabled", true);
    var GridLength = $("#GridLength").val();

    var oArray = new Array();

    var slno = 0;
    for (var i = 1; i <= GridLength; i++) {

        if ($('#Product_' + i).val() != undefined) {

            slno++;

            oArray.push({

                'SlNo': slno,
                'TRNo': parseInt($("#TransferNo").val() || 0),
                'TRDate': $.trim($("#Date").val()),
                'FromLocation': parseInt($("#FromLoc").val() || 0),
                'ToLocation': parseInt($("#ToLoc").val() || 0),
                'DebitAcc': 0,
                'CreditAcc': 0,
                'Remarks': $.trim($("#Remarks").val()),
                'ItemId': parseInt($("#ProductId_" + i).val() || 0),
                'BatchSlNo': parseInt($("#BatchSlNo_" + i).val() || 0),
                'Batch': $.trim($("#Batch_" + i).val()),
                'ItemCode': $.trim($("#Product_" + i).val()),
                'Quantity': parseInt($("#Quantity_" + i).val() || 0),
                'Price': parseFloat($("#SellPrice_" + i).val() || 0),
                'Total': parseFloat($("#Amount_" + i).val() || 0),
                'CuStock': parseFloat($("#Stock_" + i).val() || 0),
                'Expiry': $.trim($("#Expiry_" + i).val()),
                'Status': '',
                'Variable1': '',
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,

            });
        }
    }

    if (oArray.length > 0) {
        var data = { 'PharmacyModel': oArray };

        $.ajax({
            type: "POST",
            url: "../Pharmacy/HMS_LocationTransferUpdate",
            data: data,
            success: function (result) {
                $('#LoadingSmall').hide();
                $('#confirmOk,#btnupdate').prop("disabled", false);
                var status = result.oList[0].Status;
                var no = result.oList[0].TRNo;
                Showalerts(status, no);
                if (status == 2) {
                    OKformrefresh(0);
                }
            }
        });
    }
}

function Delete() {
    $('#Confirmflag').val('Delete'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to delete this location transfer?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus(); 
}

function OKDelete() {
    $('#LoadingSmall').show();
    $('#confirmOk,#btndelete').prop("disabled", true);
    var data = {};
    data.TRNo = parseInt($("#TransferNo").val() || 0);
    data.UserId = ERPUserId;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Pharmacy/HMS_LocationTransferDelete",
        data: data,
        success: function (result) {
            $('#LoadingSmall').hide();
            $('#confirmOk,#btndelete').prop("disabled", false);
            var status = result[0].Status;
            var no = result[0].TRNo;
            Showalerts(status, no);
            if (status == 3) {
                OKformrefresh(0);
            }
        }
    });
}

function Copy() {
    if ($("#TblSalesInvoice tr").length > 0) {
        $('#Confirmflag').val('Copy'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Data will be lost. Continue?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
    else {
        OKCopy();
    }
}

function OKCopy() {
    $("#TransferNo").hide();
    $("#CTransferNo").show();
    OKformrefresh(1);
    $("#CTransferNo").focus();
}

function SearchLocationTransfer() {
    $("#CTransferNo").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {

            var data = {};
            data.Status = $("#CTransferNo").val();
            data.DeptId = ERPDeptId;
            data.UserId = ERPUserId;
            $.ajax({
                url: '../Pharmacy/HMS_LocationTransferSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '4',
                            label: item.TRNo,
                            label1: item.TRDate,
                            label2: item.FLocationName,
                            label3: item.TLocationName,
                            TRNo: item.TRNo,
                            headers: ["Transfer#", "Date", "From Location", "To Location"]
                        })
                    }));
                }

            })

        },
        autoFocus: true,
        select: function (event, ui) {
            
            GetCopyLocationTransfer(ui.item.TRNo);
        },
    });
}

function ShowView() {
    if (!($('#LocationView').is(':visible'))) {
        $("#LocationView").modal("show");
        $("#LocationView").appendTo("body");
    }
    $("#ViewFromDate,#ViewToDate").val(CurDate);
    GetLocationTransferList()
}

function GetLocationTransferList() {
    var data = {};
    data.LocationId = 0;
    data.FromDate =$("#ViewFromDate").val();
    data.ToDate=$("#ViewToDate").val();
    data.DeptId=ERPDeptId;
    data.UserId=ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Pharmacy/HMS_LocationTransferView",
        data: data,
        success: function (result) {
            LoadLocationTransferList(result);
        }
    });
}

function LoadLocationTransferList(result) {
    disable_datatable('tbl_LTView');

    var responseText = "<thead><tr><th>Sl#</th><th>Transfer#</th><th>Date</th><th>From Location</th><th>To Location</th><th>Remarks</th></tr>" +
                       "<tr><th> </th><th>Transfer#</th><th>Date</th><th>From Location</th><th>To Location</th><th>Remarks</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);


        responseText += '<tr ondblclick="GetCopyLocationTransfer(' + result[l].TRNo + ')">' +
            '<td style="width:5%" align="center">' + slno + '</td>' +
            '<td style="width:5%;font-weight:bold;" align="center">' + result[l].TRNo + '</td>' +
            '<td style="width:10%" align="left">' + result[l].TRDate + '</td>' +
            '<td style="width:20%" align="left">' + result[l].FLocationName + '</td>' +
            '<td style="with:20%" align="left">' + result[l].TLocationName + '</td>' +
            '<td style="" align="left">' + result[l].Remarks + '</td>' +

            '</tr>';
    }
    $('#tbl_LTView').html(responseText + '</tbody>');
    datatableWithsearch('tbl_LTView', 'Multiple');
}


function GetCopyLocationTransfer(TRNo) {
    OKformrefresh(1);
    var data = {};
    data.TRNo = TRNo;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Pharmacy/HMS_LocationTransferGet",
        data: data,
        success: function (result) {
            LoadCopyLocationTransfer(result);
        }
    });
}

function LoadCopyLocationTransfer(result) {
    $("#LocationView").modal("hide");
    $("#TransferNo,#btnsubmit").hide();
    $("#CTransferNo,#btnedit,#btndelete").show();
    
    if (result.length > 0) {
        $("#TransferNo,#CTransferNo").val(result[0].TRNo);
        $("#Date").val(result[0].TRDate);
        $("#FromLoc").val(result[0].FromLocation);
        $("#ToLoc").val(result[0].ToLocation);
        $("#Remarks").val(result[0].Remarks)
    }

    for (var i = 0; i < result.length; i++) {
        var id = Number(i) + 1;
        var TrLength = Number($("#TblSalesInvoice tr").length) + 1;

        var Text = '<tr id="MTR_' + id + '" onfocusout="UpdateRow(' + id + ')">' +
            '<td style="width:2%" align="center">' +
            '<input class="jsgrid-button jsgrid-delete-button cpdisa" type="button" onclick="DeleteRow(' + id + ')" title="Delete" autocomplete="off">' +
            '</td>' +
            '<td style="width:3%" align="center" id="trno_' + id + '">' + TrLength + '</td>' +
            '<td style="width:15%">' +
            '<input class="form-control form-control-sm gridcell cpdisa" id="Product_' + id + '" value="' + result[i].ItemCode + '"  onkeyup="LoadProduct(' + id + ')"  />' +
            '</td>' +
            '<td style="width:5%">' +
            '<input class="form-control form-control-sm gridcell cpdisa" id="Batch_' + id + '" value="' + result[i].Batch + '"  onkeyup="LoadBatch(' + id + ')"  />' +
            '</td>' +
            '<td style="width:10%">' +
            '<input class="form-control form-control-sm gridcell dedisa" disabled id="Company_' + id + '" value="' + result[i].Company + '"  />' +
            '</td>' +
            '<td style="width:5%">' +
            '<input class="form-control form-control-sm gridcell dedisa" disabled id="Expiry_' + id + '" value="' + result[i].Expiry + '"  />' +
            '</td>' +
            '<td style="width:5%">' +
            '<input class="form-control form-control-sm gridcell text-center cpdisa" id="Quantity_' + id + '" value="' + result[i].Quantity + '" onkeyup="CalAmount(' + id + ')"  onkeypress="isNumberInt(event,this)"  />' +
            '</td>' +
            '<td style="width:5%">' +
            '<input class="form-control form-control-sm gridcell dedisa text-right" disabled id="SellPrice_' + id + '" value="' + parseFloat(result[i].Price || 0).toFixed(Decimal) + '"  onkeypress="isNumberInt(event,this)"  />' +
            '</td>' +
            '<td style="width:5%">' +
            '<input class="form-control form-control-sm gridcell dedisa text-right" disabled id="Amount_' + id + '" value="' + parseFloat(result[i].Total || 0).toFixed(Decimal) + '"  onkeypress="isNumberInt(event,this)"  />' +
            '</td>' +
            '<td style="width:5%">' +
            '<input class="form-control form-control-sm gridcell dedisa" disabled id="DrugSchedule_' + id + '" value="' + result[i].PurchaseType + '"  />' +
            '</td>' +
            '<td style="display:none">' +
            '<input id="ProductId_' + id + '" value="' + result[i].ItemId + '"  />' +
            '<input id="BatchSlNo_' + id + '" value="' + result[i].BatchSlNo + '"  />' +
            '<input id="Stock_' + id + '" value="' + result[i].Stock + '"  />' +
            '<input id="PHSNCode_' + id + '" value="' + result[i].LPO_No + '"  />' +
            '<input id="FromLoc_' + id + '" value="' + result[i].FromLocation + '"  />' +
            '<input id="ToLoc_' + id + '" value="' + result[i].ToLocation + '"  />' +
            '<input id="OldQty_' + id + '" value="' + result[i].Quantity + '"  />' +
            '</td>' +
            '</tr>';


        
        $("#TblSalesInvoice").append(Text);
    }
    $(".cpdisa").prop("disabled", true);
    $("#GridLength").val(result.length);
    CalcAmt();
}


function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'DeleteRow') {
        OKDeleteRow(rowid)
    }
    else if (Result == 'true' && status == 'New') {
        OKformrefresh(0);
    }
    else if (Result == 'true' && status == 'Save') {
        OKSave();
    }
    else if (Result == 'true' && status == 'Copy') {
        OKCopy();
    }
    else if (Result == 'true' && status == 'Edit') {
        OKEdit();
    }
    else if (Result == 'true' && status == 'Update') {
        OKUpdate();
    }
    else if (Result == 'true' && status == 'Delete') {
        OKDelete();
    }
    
    $('#confirm').fadeOut();
}

function Showalerts(Status, TRNo) {
    if (Status == 1) {

        swal('Transfer# - ' + TRNo, " Saved Successfully", "success");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 2) {

        swal('Transfer# - ' + TRNo, " Updated Successfully", "success");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 3) {

        swal('Transfer# - ' + TRNo, " Deleted!", "error");
        $('.swal-button swal-button--info').focus();
    }
    else {
        swal('Transfer# - ' + TRNo, " already exists", "warning");
        $('.swal-button swal-button--info').focus();
    }
   
}

function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" class="form-control smallTextbox"  style="width:100%"  placeholder="' + title + '"/>')

    });


    var table = null;

     if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,

        });

    }
    else {
        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "order": [],
            "pageLength": -1
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

//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
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