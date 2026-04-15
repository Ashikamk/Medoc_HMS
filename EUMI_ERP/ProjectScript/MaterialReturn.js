
var Decimal = Decimal; var AllLocSelect = ''; var DeptSelect = ''; var ACCArray = []; 
var CopyFlag = 0; var SlNum = 1; var ItemCount = 1; var Updateflag = 0; var EditFlag = 0;
var CostCode = ''; var UnitSelect = ''; var LocationSelect = '';


$(document).ready(function () {

    Defaultfocus();
    CommonLoad(0);
    LoadDate(0);
    CommonProps();
    CalcTotalAmount();
    
    $(".btn-outline-primary").focus(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-outline-primary");
        $('#' + Id).addClass("btn-primary");
    });
    $(".btn-outline-primary").focusout(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-primary");
        $('#' + Id).addClass("btn-outline-primary");
    });

    $(".btn-outline-secondary").focus(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-outline-secondary");
        $('#' + Id).addClass("btn-secondary");
    });
    $(".btn-outline-secondary").focusout(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-secondary");
        $('#' + Id).addClass("btn-outline-secondary");
    });

    $(".btn-outline-warning").focus(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-outline-warning");
        $('#' + Id).addClass("btn-warning");
    });
    $(".btn-outline-warning").focusout(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-warning");
        $('#' + Id).addClass("btn-outline-warning");
    });

    $("#btnotpcancel").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnotpsave").focus();
        }
    });
    $("#btnotpsave").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnotpcancel").focus();
        }
    });

    $("#btncustprnt").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncustprnt1").focus();
        }
    });
    $("#btncustprnt1").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btncustprnt").focus();
        }
    });

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1);
    });

    $("#btnupdate").click(function (e) {
        SaveAndUpdate(2);
    });

    $('input:not(.atfcs),select:not(.atfcs)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });

});

$(document).keydown(function (e) {
    if ((CopyFlag == 0) && (Updateflag == 0) && (!$('.ImpDiv').is(':visible'))) {
        if (e.altKey && e.keyCode == 83) {                        //Alt+S        
            SaveAndUpdate(1);
        }
        else if (e.keyCode == 27) {                           //esc    
            $('#itempopup').hide();
            Prodpopshow(2);
            productpopuprefresh();
          
        }
    }
    if ((e.altKey) && (e.keyCode == 67) && (!$('.ImpDiv').is(':visible'))) {                  //Alt+C
        Clear(0);
    }
});

function LoadDate(flg) {
    if (flg == 0)
    {
        $(function () {
            $('#ReturnDate,#FromDate,#ToDate').daterangepicker({
                minDate: minDate,
                maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()),
                singleDatePicker: true,
                showDropdowns: true,
                locale: { format: 'DD/MM/YYYY' },
            });
        });
    }
    else
    {
        $('#ReturnDate').daterangepicker({
            minDate: minDate,
            maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()),
            singleDatePicker: true,
            showDropdowns: true,
            locale: { format: 'DD/MM/YYYY' },
        });
    }
}

function CommonLoad(flg) {
    
    var srlno = {};                                                           //Get Company cash,bank,pdc received a/c
    srlno.DeptId = 1;
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/MaterialIssueAccountGet", 
        data: srlno,
        success: function (result) {
            $('#CreditAcc').val(result.oList[0].CreditAccount);
            $('#DebitAcc').val(result.oList[0].DebitAccount);
            $('#CreditAccDesc').val(result.oList[0].CreditAccountDesc);
            $('#DebitAccDesc').val(result.oList[0].DebitAccountDesc); 
        }
    });
    
    if (flg == 0)
    {
        Serialnoload();

        var data = {};
        data.DeptId = 0;
        $.ajax({
            type: "POST",
            url: "../Master/DepartmentGetandGets",
            data: data,
            success: function (result) {
                DepartmentLoad(result.oList);
            }
        });

        //var data = {};
        //data.CostCenterId = 0;
        //$.ajax({
        //    type: "POST",
        //    url: "../Master/CostCenterGetandGets",
        //    data: data,
        //    success: function (result) {
        //        CostCenterLoad(result.oList);
        //    }
        //});

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
    
}

function CommonProps() {
    $('.form-control').on("click", function (event) {
        $(this).select();
    });

    //Value fixed to Decimal on blur
    $('.Numericwithdec').on("blur", function (event) {
        var value = parseFloat($(this).val() || 0);
        value = isNaN(value) ? 0 : value;
        $(this).val(parseFloat(value).toFixed(Decimal));
    });
}

function Serialnoload() {
    var data = {};
    data.id = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: data,
        success: function (result) {
            ContNoload(result.oList);
        }
    });
}

function ContNoload(result) {
    $('#ReturnNo,#ReturnNoCopy,#CurrentReturnNo').val(result[0].ProjectMaterialRetNo); 
}

function DepartmentLoad(result) {
    $("#Department").empty();
    DeptSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        DeptSelect += "<option value='" + result[i].DepartmentId + "' >" + result[i].DepartmentCode + "</option>"
    }
    $("#Department").append(DeptSelect);
    $('#Department').val(ERPDeptId);
}

//function CostCenterLoad(result) {
//    CostCode = '';
//    $("#CostCode,#PCostCode0").empty();
//    CostCode += "<option value='0'>-All-</option>"
//    for (var i = 0; i < result.length; i++) {
//        CostCode += "<option value='" + result[i].CostCenterId + "'>" + result[i].CostCenterCode + "</option>";  
//    }
//    $("#CostCode,#PCostCode0").append(CostCode);
//}

function UnitLoad(result) {
    UnitSelect = '';
    $("#PUnit0,#JobUnit").empty();
    UnitSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'unitname='" + result[i].UnitName + "'> " + result[i].UnitName + "</option>";
    }
    $("#PUnit0,#JobUnit").append(UnitSelect);
}

function LocationLoad(result) {
    LocationSelect = '';
    $('#PLoc0').empty();
    LocationSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "'locname='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }
    $('#PLoc0').append(LocationSelect); 
    $('#PLoc0').val(UserLocationId);
}

//Manual Focus Input
function Focusinput(Dst, e, Id) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if ((key == 13) && Id == 'ContPeriod') {
        e.preventDefault();
        if ($("#PaymentTerms").is(':visible')) { $("#PaymentTerms").focus().select(); }
        else if ($("#YearlyTerms").is(':visible')) { $("#YearlyTerms").focus().select(); }
    }
    else if (((Id == 'ToDate') || (Id == 'Department')) && (key == 37)) {
        e.preventDefault();
        if ((Id == 'FromDate')) {
            $('#btnad').focus();
        }
        else if ((Id == 'ToDate'))
        {
            $('#FromDate').focus();
        }
        else if ((Id == 'Department')) {
            $('#ToDate').focus();
        }
    }  
    else if (key == 13) {
        e.preventDefault();
        $('#' + Dst).focus().select();
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
    else if (key == 37 && Id == 'btnad')
    {
        e.preventDefault();
        $("#Department").focus();
    }
}

//Show or hide stock popup during stock add,edit,update
function Prodpopshow(flg) {
   
    if (flg == 1)                       //Job Popup view
    {
        productpopuprefresh();
        $('#Jobpopup').show();
        $('#JobCodePop').focus().select();
    }
    else if (flg == 2)                       //Job Popup view
    {       
        $('#Jobpopup').hide();
        $('#Product0').focus().select();
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
    else if (flg == 0)                       //Job Popup view
    {
        GetRows();        
        GetReturnNo(0, ERPDeptId);
        $('#itempopup').show();
    }
    else if (flg == 4)                       //Job Popup view
    {
        $('#itempopup').hide();
    }
    
}

//Call Item Details Load
function ItemDetails(ItemId)
{
    var data = {};
    data.ProductId = ItemId; 
    data.CustId = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: '../SalesInvoice/CustomerProductDetailsSearch',
        data: data,
        success: function (result) {
            CustPrdctLoad(result.oList);
        }
    });
}

//Product Details Popup
function CustPrdctLoad(result) {
    $('#tblproductdetails td').remove();      
    for (var n = 0; n < result.length; n++) {
      
        $('#productpdiv,#Infospopup').slideDown();
        $('#prodheader').text('Location Stock Details');
        $('#productdiv').show();

        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");

            var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
     "<td style='border:none;font-weight:500;' class='text-left yellow'><b>" + result[0].ProductCode + "</b></td>" +
     "<td style='border:none;font-weight:500' class='text-left'><table width='100%'><tr><td style='border:none;font-weight:500' class='text-left'><b>C : </b>" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + "</td>" +
     "<td style='border:none;font-weight:500' class='text-left'><b>LP : </b>" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + "</td>" +
     "<td style='border:none;font-weight:500' class='text-left'><b>LSP : </b>" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "</td>" +
     "<td style='border:none;font-weight:500' class='text-left'><b>Stock : </b>" + (result[n].Sumtotqty || 0) + "</td>" + "</tr></table></td></tr>" +
     "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";
                  
        $('#tblproductdetails').append(ProdRow);
        $('#tbllocqty').attr('border', '1');
        $('#tbllocqty').attr('bordercolor', 'white');
    }
}

//Product Popup Refresh
function productpopuprefresh() {
   
    $('.arrow,.tooltip-inner').hide();
    $('#productpdiv').hide();
    $('#prodheader').text('');
    $('#productdiv').hide();
    $("#tblproductdetails tr").remove();
}

//Account Autocomplete
function LoadAccount(Id) {

        $("#" + Id).autocomplete({
            delay: 0,
            minLength: 0,
            source: function (request, response) {
                $('#' + Id +'Id').val(''); 
                var data = {};
                data.AccountDescription = $("#" + Id).val();
                $.ajax({
                    url: '../Inventory/AccountNumberSearch',
                    type: "POST",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        response($.map(data, function (item) {
                            return ({
                                ColCount: '2',
                                label: item.DebitAccount,
                                label1: item.AccountDescription,
                                DebitAccount: item.DebitAccount,
                                AccountDescription: item.AccountDescription,
                                AccountId: item.AccountId,
                                headers: ["Account Code","Description"]
                            })
                        }));
                    }
                })
            },
            autoFocus: true,
            select: function (event, ui) {
                $('#' + Id + 'Id').val(ui.item.AccountId) 
                $('#' + Id + 'Desc').val(ui.item.AccountDescription) 
                if (Id == 'CreditAcc') { $('#DebitAcc').focus().select(); }
                else if (Id == 'DebitAcc') { $('#Product0').focus().select(); }
            },
        }).on('keydown', function (e) {
            if ((e.which == 13) && (($('#' + Id).val() == '') || (($('#' + Id +'Id').val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible')))) {
                window.setTimeout(function () {
                    if (Id == 'CreditAcc') { $('#DebitAcc').focus().select(); }
                    else if (Id == 'DebitAcc') { $('#Product0').focus().select(); } 
                });
            }
        });
}

//Job Autocomplete
function LoadJob(Id)
{
    $("#JobCode").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            $('#JobCodeId').val('');
            var data = {};
            data.JobCode = $("#JobCode").val();
            $.ajax({
                url: '../SalesInvoice/JobSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '2',
                            label: item.JobCode,
                            label1: item.Description,
                            ProjectJobId: item.ProjectJobId,
                            headers: ["Job Code", "Description"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#JobCodeId').val(ui.item.ProjectJobId);
            $('#CostCode').focus().select();
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#JobCode').val() == '') || (($('#JobCodeId').val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible')))) {
            window.setTimeout(function () {
                $('#CostCode').focus().select(); 
            });
        }
    });
}

//Product Autocomplete 
function LoadProduct(Id,evt) {
  
        $("#" + Id).autocomplete({
            delay: 0,
            minLength: 0,
            source: function (request, response) {
                $('#ProductId0,#PDescr0,#PPrice0').val('');
                $('#PUnit0').val(0);             
                    var data = {};
                    data.ItemCode = $("#" + Id).val();
                    $.ajax({
                        url: '../Purchase/ProductSearch',
                        type: "POST",
                        data: data,
                        dataType: "json",
                        success: function (data) {
                            response($.map(data, function (item) {
                                return ({
                                    ColCount: '4',
                                    label: item.ItemCode,
                                    label1: item.Description,
                                    label2: item.UnitName,
                                    label3: item.SellingPrice.toFixed(Decimal),
                                    label4: '0',
                                    label5: '0',
                                    ItemId: item.ItemId,
                                    ItemCode: item.ItemCode,
                                    Description: item.Description,
                                    Unit: item.UnitId,
                                    UnitName: item.UnitName,
                                    Tax: item.VatId,
                                    Taxper: item.VatPer,
                                    Rate: (item.SellingPrice).toFixed(Decimal),
                                    headers: ["Item Code", "Description", "Unit Name", "Average Cost"]
                                })
                            }));
                        }
                    })                               
            },
            autoFocus: true,
            select: function (event, ui) {
                $('#ProductId0').val(ui.item.ItemId);
                $('#PDescr0').val(ui.item.Description);
                $('#PUnit0').val(ui.item.Unit);
                $('#PPrice0').val(ui.item.Rate);
                $('#PQty0').val(1).focus().select();
                RowAmountCalculation(0, 0);
                ItemDetails(ui.item.ItemId);
            },
        }).on('keydown', function (e) {
           
            if ((($("#" + Id).val()).toUpperCase() == 'JOB') && (e.which == 13)) 
            {
                Prodpopshow(1);
            }
            else if ((e.which == 13) && (($('#' + Id).val() == '') || (($('#ProductId0').val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible')))) {
                window.setTimeout(function () {
                    $('#PQty0').focus().select();
                });
            }
        }).on('autocompleteselect  autocompletefocus', function (ev, ui) {
            ItemDetails(ui.item.ItemId);          
        });
}

//CostCode Autocomplete
function LoadCostCode(Id, No) {
    
    var Element = '';

    if (Id == 'CostCode') 
    { Element=Id; }
    else
    {Element = Id + No; }

    $("#" + Element).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            if (Id == 'CostCode')
            { $('#CostCodeId').val(''); }
            else
            { $('#' + Id + 'Id' + No).val(''); } 
           
            var data = {};
            data.CostCenterName = $("#" + Element).val();
            data.Status = '';
            data.DelFlag = 0;
            $.ajax({
                url: '../ProjectandJob/CostCodeSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '2',
                            label: item.CostCenterCode,
                            label1: item.CostCenterName,
                            CostCenterCode: item.CostCenterCode,
                            CostCenterName: item.CostCenterName,
                            CostCenterId: item.CostCenterId,
                            headers: ["Code","Name"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            if (Id == 'CostCode')
            { $('#CostCodeId').val(ui.item.CostCenterId); $('#PCostCode0').val(ui.item.CostCenterCode); $('#PCostCodeId0').val(ui.item.CostCenterId); }
            else
            { $('#' + Id + 'Id' + No).val(ui.item.CostCenterId); $('#AddChequ').focus(); }            
        },
    }).on('keydown', function (e) {       
        if ((e.which == 13) && (Id == 'CostCode') && (($('#CostCode').val() == '') || (($('#CostCodeId').val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible'))))
        { $('#CreditAcc').focus().select(); }
        else if ((e.which == 13) && (No==0) && (($("#" + Element).val() == '') || (($('#' + Id + 'Id' + No).val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible'))))
        {
         window.setTimeout(function () {$('#AddChequ').focus();});
        }
    });
}

//VocNo Autocomplete
function SearchVocNo() {
    $("#ReturnNoCopy").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            formrefresh(3);
            var data = {}; 
            data.ReturnNo = $("#ReturnNoCopy").val(); 
            data.DeptId = ERPDeptId;
            data.UserId = ERPUserId;
            data.Status = '';
            $.ajax({
                url: '../ProjectandJob/MaterialReturnNoSearch', 
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'sl4',
                            label: item.ReturnNo,
                            label1: item.JobCode,
                            label2: item.DepartmentName,
                            label3: item.ReturnDate,
                            ReturnNo: item.ReturnNo,
                            DeptId: item.DeptId,
                            headers: ["Return No", "JobCode", "Department", "Date"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            GetReturnNo(ui.item.ReturnNo, ui.item.DeptId);
        },
    });
}

//Claculate date after one year (fromdate and todate)
function dateafteroneyear() {
    var x; //Year    
    var Period = $('#ContPeriod').val();
    if (Period == 2)
    { x = 12; $('#YearlyTerms').val(1); }
    else if (Period == 4)
    { x = 6; $('#YearlyTerms').val(2); }
    else if (Period == 5)
    { x = 4; $('#YearlyTerms').val(4); }
    else if (Period == 1)
    { x = 12; }

    var ab = ($('#FromPeriod').val()).split('/');
    var NowDate = (ab[1] < 10 ? '0' : '') + ab[1] + '/' + (ab[0] < 10 ? '0' : '') + ab[0] + '/' + ab[2];
    var newdate = new Date(NowDate);
    newdate.setMonth(newdate.getMonth() + x);
    newdate = new Date(newdate);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();
    var someFormattedDate = (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + y;
    $('#ToPeriod').val(someFormattedDate);
}

//Get Date after particular months (chequedate)
function dateafermonth(tt) {
    var TmType = 1;
    if ($('#PaymentTerms').is(':visible'))
    { TmType = 1; }
    else if ($('#YearlyTerms').is(':visible')) {
        if ($('#ContPeriod').val() == 2)
        { TmType = 1; }
        else if ($('#ContPeriod').val() == 4)
        { TmType = 6; }
        else if ($('#ContPeriod').val() == 5)
        { TmType = 4; }
    }

    var x = TmType;   //Month      
    var ab = tt.split('/')
    var NowDate = (ab[1] < 10 ? '0' : '') + ab[1] + '/' + (ab[0] < 10 ? '0' : '') + ab[0] + '/' + ab[2];
    var newdate = new Date(NowDate);
    newdate.setMonth(newdate.getMonth() + x);
    newdate = new Date(newdate);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();
    var someFormattedDate = (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + y;
    return someFormattedDate;
}


//Check Product add conditions
function Itemaddconfirm(flag) {   //flag:0 - Add 
  
    if ($.trim($('#Product0').val()) == '') {
        warningshow('Please Select Product', 'Product0');
        return false;
    }
    else if (($('#ProductId0').val() || 0) == 0) {
        warningshow('Please Select a valid Product', 'Product0');
        return false;
    }
    else if ($.trim($('#PDescr0').val()) == '') {
        warningshow('Please Enter Description', 'PDescr0');
        return false;
    }
    else if (($('#PUnit0').val() || 0) == 0) {
        warningshow('Please Select Unit', 'PUnit0');
        return false;
    }
    else if (($('#PQty0').val() || 0) == 0) {
            warningshow('Please Enter Quantity', 'PQty0');
        return false;
    }   
    else if (($("#PCostCode0").val() != '') && ($("#PCostCodeId0").val() || 0) == 0) {
        warningshow('Please Select a valid CostCode', 'PCostCode0'); 
    }
    else {
        AddItem(flag); $('#Warningpopupnew').fadeOut();
    }
}

//Add Details to grid
function AddItem(flag) {         //flag:0 - Add 

        if ($('.RemoveRow').length == 0) { ItemCount = 1; }   
        SlNum = parseInt($('.RemoveRow').length) + 1;
        var Id = parseInt(ItemCount);
        var ProdRow1 =
            "<tr class='jsgrid-header-row RemoveRow' id=Row" + Id + " ondblclick=EditPRow(" + Id + ") onfocusout=UpdatePRow(" + Id + ")>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:3%'> <input class='jsgrid-button jsgrid-delete-button'  type= button onclick='Rowdelete(" + Id + ")'  title= Delete > </td>" +      //<i class='icon-trash'></i>
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:3%' id=td" + Id + "> " + SlNum + " </td>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:12%'>  <input type='text' class='form-control dtld' disabled=''  style='height:30px;background-color:white;'      id='Product" + Id + "'     value='" + $('#Product0').val() + "'                                                                                                                ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:25%'>  <input type='text' class=form-control         style=height:30px;      id='PDescr" + Id + "'      value='" + $('#PDescr0').val() + "'                                                                                                                 ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <select   class=form-control                  style=height:30px;      id='PUnit" + Id + "'          >" + UnitSelect + "</select>                                                                                                                      </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>   <select   class=form-control                  style=height:30px;      id='PLoc" + Id + "'           >" + LocationSelect + "</select>                                                                                                                  </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control '      style=height:30px;      id='PQty" + Id + "'        value=" + parseInt($('#PQty0').val()) + "                          onkeypress='isNumberInt(event, this)' onkeyup='RowAmountCalculation(" + Id + ",0)' ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control '      style=height:30px;      id='PPrice" + Id + "'      value=" + parseFloat(isNaN($('#PPrice0').val()) ? 0 : ($('#PPrice0').val() || 0)).toFixed(Decimal) + "     onkeypress='isNumber(event, this)' onkeyup='RowAmountCalculation(" + Id + ",0)'    ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <input type='text' class='form-control '  disabled=''    style='height:30px;background-color:white;'      id='PAmount" + Id + "'     value=" + parseFloat($('#PAmount0').val()).toFixed(Decimal) + "                                                                                     ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'> <input type='text' class=form-control         style=height:30px;      id='PCostCode" + Id + "'  onfocus=LoadCostCode('PCostCode','" + Id + "')    value='" + $('#PCostCode0').val() + "'  >                                                                                                             </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'  style='display:none' >" +
            "<input type='text' class=form-control  id='ProductId" + Id + "'  value=" + $('#ProductId0').val() + " >" +
            "<input type='text' class=form-control  id='PCostCodeId" + Id + "'  value=" + $('#PCostCodeId0').val() + " >" +
            "</td></tr>";

        $('#TblMaterialReturn').append(ProdRow1);
        $('#PUnit' + Id).val($('#PUnit0').val());       
        $('#PLoc' + Id).val($('#PLoc0').val()); 
        SlNum++; ItemCount++; 
       
            $('.Addchk').val('');
            $('.Addchksl:not(#PCostCode0)').each((i, item) => {
                var $item = $(item);
                $item.val($item.find('option:first').val());
            });
            $('#PCostCode0').val($('#CostCode').val());
            $('#PCostCodeId0').val($('#CostCodeId').val()); 
            $('#PLoc0').val(UserLocationId);
            CalcTotalAmount();
            $('#Product0').focus();
            productpopuprefresh();
}

//Edit Grid Details in Popup
function EditPRow(RowId) {
    EditFlag = 1;
}

//Update Seleced row after edit
function UpdatePRow(RowId) {

    if (($('#PUnit' + RowId).val() || 0) == 0) {
        warningshow('Please Select Unit', 'PUnit' + RowId);
        return false;
    }
    else if (($('#PQty' + RowId).val() || 0) == 0) {
        warningshow('Please Enter Quantity', 'PQty' + RowId);
        return false;
    }
    //else if (($('#PPrice' + RowId).val() || 0) == 0) {
    //    warningshow('Please Enter Price', 'PPrice' + RowId);
    //    return false;
    //}
    else if (($('#PCostCode' + RowId).val() != '') && ($('#PCostCodeId' + RowId).val() || 0) == 0) {
        warningshow("Please Select a valid CostCode", 'PCostCode' + RowId); 
        return false;
    }
    else {
        CalcTotalAmount();
        var Amt = $('#PAmount' + RowId).val();
        var Rate = $('#PPrice' + RowId).val() || 0; 
        $('#PAmount' + RowId).val(parseFloat(Amt).toFixed(Decimal));
        $('#PPrice' + RowId).val(parseFloat(Rate).toFixed(Decimal)); 
        $('#Warningpopupnew').fadeOut();
        EditFlag = 0;
        return true;
    }
}

//Delete The Selected Row in The Product Grid
function Rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('DeleteRow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want to Delete this Record?');
}

//Delete rows
function Rowdeleteconfirm(RowId) {
    SlNum = 1;
    $('#Row' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#Product' + j).val() != undefined) { 
            $('#td' + j).text(SlNum);
            SlNum++;
        }
    }
    $('#Product0').focus();
    CalcTotalAmount();
}

//Total Weight Calculation
function CalcTotalAmount() {
    if ($('.RemoveRow').length == 0) {
        $('#TotalAmountLbl,#TotalAmt').text((0).toFixed(Decimal));
        $('#TotalQty').text(0);
    }
    else if ($('.RemoveRow').length > 0) {
        $('#TotalAmountLbl,#TotalAmt,#TotalQty').text(''); 
        var TotAmt = 0;  var TotQty = 0;

        for (var Id = 1; Id < ItemCount; Id++) {
            if ($('#PAmount' + Id).val() != undefined) {
                TotAmt = parseFloat(TotAmt) + parseFloat($('#PAmount' + Id).val() || 0);
                
                TotQty = parseInt(TotQty) + parseInt($('#PQty' + Id).val() || 0);
            }
        }
        $('#TotalAmountLbl,#TotalAmt').text(TotAmt.toFixed(Decimal));       
        $('#TotalQty').text(TotQty); 
    }
}

//RowAmount Calculation
function RowAmountCalculation(Id,flag)
{
    if (flag == 0)
    {
    var Qty = 0; var Rate = 0;  var Amount = 0;

    Qty = $('#PQty' + Id).val() || 0; Qty = isNaN(Qty) ? 0 : parseInt(Qty);
    Rate = $('#PPrice' + Id).val() || 0; Rate = isNaN(Rate) ? 0 : parseFloat(Rate);  

    Amount = Qty * Rate; 

    $('#PAmount' + Id).val(parseFloat(Amount).toFixed(Decimal));
    }
    else if (flag == 1)
    {
        var Qty = 0; var Rate = 0;  var Amount = 0;

        Qty = $('#JobQty').val() || 0; Qty = isNaN(Qty) ? 0 : parseInt(Qty);
        Rate = $('#JobRate').val() || 0; Rate = isNaN(Rate) ? 0 : parseFloat(Rate);       

        Amount = Qty * Rate; 

        $('#JobAmount').val(parseFloat(Amount).toFixed(Decimal)); 
    }
}

//Check Product add conditions
function JobAdd() {   //flag:0 - Add 

    if ($.trim($('#JobCodePop').val()) == '') {
        warningshow('Please Enter Job', 'JobCodePop');
        return false;
    }
    else if (($('#JobQty').val() || 0) == 0) {
        warningshow('Please Enter Qty.', 'JobQty');
        return false;
    }   
    else {       
        $('#Warningpopupnew').fadeOut();

        if ($('.RemoveRow').length == 0) { ItemCount = 1; }
        SlNum = parseInt($('.RemoveRow').length) + 1;
        var Id = parseInt(ItemCount);
        var ProdRow1 =
            "<tr class='jsgrid-header-row RemoveRow' id=Row" + Id + " ondblclick=EditPRow(" + Id + ") onfocusout=UpdatePRow(" + Id + ")>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:3%'> <input class='jsgrid-button jsgrid-delete-button'  type= button onclick='Rowdelete(" + Id + ")'  title= Delete > </td>" +      //<i class='icon-trash'></i>
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:3%' id=td" + Id + "> " + SlNum + " </td>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:12%'>  <input type='text' class='form-control dtld'  style=height:30px;      id='Product" + Id + "'     value='" + $('#JobCodePop').val() + "'                                                                                                                ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:25%'>  <input type='text' class=form-control         style=height:30px;      id='PDescr" + Id + "'      value='" + $('#JobDesc').val() + "'                                                                                                                 ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <select   class=form-control                  style=height:30px;      id='PUnit" + Id + "'          >" + UnitSelect + "</select>                                                                                                                      </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>   <select   class=form-control                  style=height:30px;      id='PLoc" + Id + "'           >" + LocationSelect + "</select>                                                                                                                  </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control '      style=height:30px;      id='PQty" + Id + "'        value=" + parseInt($('#JobQty').val()) + "                          onkeypress='isNumberInt(event, this)' onkeyup='RowAmountCalculation(" + Id + ",1)' ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control '      style=height:30px;      id='PPrice" + Id + "'      value=" + parseFloat(isNaN($('#JobRate').val()) ? 0 : ($('#JobRate').val() || 0)).toFixed(Decimal) + "     onkeypress='isNumber(event, this)' onkeyup='RowAmountCalculation(" + Id + ",1)'    ></td> " +           
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <input type='text' class='form-control '   disabled=''   style='height:30px;background-color:white;'      id='PAmount" + Id + "'     value=" + parseFloat($('#JobAmount').val()).toFixed(Decimal) + "                                                    ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <input type='text' class=form-control         style=height:30px;      id='PCostCode" + Id + "'  onfocus=LoadCostCode('PCostCode','" + Id + "')    value='" + $('#PCostCode0').val() + "'  >                                                              </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'  style='display:none' >" +
            "<input type='text' class=form-control  id='ProductId" + Id + "'  value=0 >" +
            "<input type='text' class=form-control  id='PCostCodeId" + Id + "'  value=" + $('#PCostCodeId0').val() + " >" +
            "</td></tr>";

        $('#TblMaterialReturn').append(ProdRow1);
        $('#PUnit' + Id).val($('#JobUnit').val());       
        if ($('#PLoc0').val() > 0)
        { $('#PLoc' + Id).val($('#PLoc0').val()); }
        else
        {
            $('#PLoc' + Id).val(UserLocationId); 
        }
        SlNum++; ItemCount++;
              
        CalcTotalAmount();      
        $('#Product0').focus().select();
        $('.ITMP').val('');
        $('#JobUnit').val(0);
        $('#Jobpopup').hide();
    }
}

//Check Save Metal Receipt conditions
function SaveAndUpdate(Flag) {

    if (($("#ReturnNo").val() || 0) == 0) {
        warningshow('Please select Return Number', 'ReturnNo');
    }
    else if ($.trim($("#JobCode").val()) == '') {
        warningshow('Please select Job', 'JobCode');
    }
    else if (($("#JobCodeId").val() || 0) == 0) {
        warningshow('Please select a valid Job', 'JobCode');
    }
    else if (($("#CostCode").val()!='')&&($("#CostCodeId").val() || 0) == 0) {
        warningshow('Please Select a valid CostCode', 'CostCode');
    }
    else if (($("#CreditAccId").val()||0) == 0) {
        warningshow('Please select Credit Account', 'CreditAcc');
    }
    else if (($("#DebitAccId").val() || 0) == 0) {
        warningshow('Please select Debit Account', 'DebitAcc');
    }  
    else if ($('.RemoveRow').length == 0) {
        warningshow('Please Add Item Details', 'Product0'); 
    }
    else {
        if (Flag == 1) { $('#Confirmflag').val('Save'); }
        else { $('#Confirmflag').val('Update'); }

        var Msg = 'Do You Want To ' + $('#Confirmflag').val() + '?';

        $('#Warningpopupnew').fadeOut();

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#ConfirmRowId').val(0);
        $('#confirmmessage').text(Msg);

    }
}

//SAVE OR UPDATE MATERIAL RETURN
function SaveandUpdate(flg) {

    $('#Loadingsave').show();
    $('#btnsubmit,#btnupdate,#confirmOk').prop('disabled', true);

    var oArray = new Array();
    for (var k = 1; k < ItemCount; k++) {

        var ReturnNo       =   $('#ReturnNo').val();
        var ReturnDate     =   $('#ReturnDate').val();
        var JobCodeId      =   $('#JobCodeId').val();       
        var CostCode       =   $('#CostCodeId').val();
        var CreditAcc      =   $('#CreditAcc').val();
        var CreditAccDesc  =   $('#CreditAccDesc').val();
        var DebitAcc       =   $('#DebitAcc').val();
        var DebitAccDesc   =   $('#DebitAccDesc').val();
        var Comments       =   $('#Comments').val();
        var ProductId      =   $('#ProductId'+k).val(); 
        var Product        =   $('#Product'+k).val();
        var PDescr         =   $('#PDescr'+k).val();
        var PUnit          =   $('#PUnit'+k).val();
        var PLoc           =   $('#PLoc'+k).val();
        var PQty           =   $('#PQty'+k).val();
        var PPrice         =   $('#PPrice'+k).val();
        var PDisc          =   0;
        var PAmount        =   $('#PAmount'+k).val();
        var PCostCode      =   $('#PCostCodeId'+k).val();
        var TotalAmt       =   $('#TotalAmt').text();
        var TotalDisc      =   0;
        var TotalQty       =   $('#TotalQty ').text();        
        var DeptId         =   ERPDeptId;
        var UserId         =   ERPUserId;
        var Status         =   '';
        var Flag           =   1;
        var DelFlag        =   Flag;

        if (Product != undefined) {
            oArray.push({
               'ReturnNo'        : ReturnNo      ,
               'ReturnDate'      : ReturnDate    ,
               'JobCodeId'       : JobCodeId     ,            
               'CostCode'        : CostCode      ,
               'CreditAcc'       : CreditAcc     ,
               'CreditAccDesc'   : CreditAccDesc ,
               'DebitAcc'        : DebitAcc      ,
               'DebitAccDesc'    : DebitAccDesc  ,
               'Comments'        : Comments      ,
               'ProductId'       : ProductId     ,
               'Product'         : Product       ,
               'PDescr'          : PDescr        ,
               'PUnit'           : PUnit         ,
               'PLoc'            : PLoc          ,
               'PQty'            : PQty          ,
               'PPrice'          : PPrice        ,
               'PDisc'           : PDisc         ,
               'PAmount'         : PAmount       ,
               'PCostCode'       : PCostCode     ,
               'TotalAmt'        : TotalAmt      ,
               'TotalDisc'       : TotalDisc     ,
               'TotalQty'        : TotalQty      ,
               'DeptId'          : DeptId        ,
               'UserId'          : UserId        ,
               'Status'          : Status        ,
               'Flag'            : Flag          ,
               'DelFlag'         : DelFlag       ,
            })
        }
    }
    if (oArray != "") {

        if (flg == 1) {                                             //Save 
            var data = { 'MaterialReturn': oArray };
            $.ajax(
            {
                type: "POST",
                url: "../ProjectandJob/MaterialReturnInsert",
                data: data,
                success: function (result) {
                    $('#btnsubmit,#btnupdate').prop('disabled', false);
                    $('#Loadingsave').hide();
                    var status = result.oList[0].Status;
                    var ReturnNo = result.oList[0].ReturnNo;
                    $('#SavedReturnNo').val(ReturnNo);
                    Showalerts(status, ReturnNo);
                }
            });
        }
        else if (flg == 2)                                            //Update  
        {
            var data = { 'MaterialReturn': oArray };
            $.ajax(
            {
                type: "POST",
                url: "../ProjectandJob/MaterialReturnUpdate",
                data: data,
                success: function (result) {
                    $('#btnsubmit,#btnupdate').prop('disabled', false);
                    $('#Loadingsave').hide();
                    var status = result.oList[0].Status;
                    var ReturnNo = result.oList[0].ReturnNo;
                    $('#SavedReturnNo').val(ReturnNo);
                    Showalerts(status, ReturnNo); 
                }
            });
        }

    }

}

//Copy Function
function GetRows() {
    formrefresh(3);
    CopyFlag = 1;
    $('#ReturnNo,#btnsubmit,#btncopy').hide();
    $('#CopyDiv').show();
    $('.form-control:not(.EnbTxt),.btn-outline-primary:not(#btnnew)').prop('disabled', true);
    $('#ReturnNoCopy').focus().select();
}

//Get Previous or next No for Copy
function GetPrevNextNo(Flag) {
    var curretNo = parseInt($('#CurrentReturnNo').val());
    var ContNo = parseInt($('#ReturnNoCopy').val());
    var NewVocNum = ContNo + Flag;

    formrefresh(3);
    if ($('#ReturnNoCopy').val() != '')
    {
    if (NewVocNum == (curretNo + 1)) {
        $('#ReturnNoCopy').val(curretNo).select();
    }
    else {
        if (NewVocNum == 0) {  $('#ReturnNoCopy').val(1).select(); }
        else { $('#ReturnNoCopy').val(NewVocNum).select(); }
        GetReturnNo($('#ReturnNoCopy').val(), ERPDeptId);
    }
    }
    else
    {        
        if (Flag == -1) { $('#ReturnNoCopy').val(1).select(); }
        if (Flag == 1) { $('#ReturnNoCopy').val(curretNo-1).select(); }
        GetReturnNo($('#ReturnNoCopy').val(), ERPDeptId);
    }
}
 
//Return No Get function call
function GetReturnNo(ReturnNo, DeptId) {
    if (ReturnNo != 0) {
        var data = {};
        data.ReturnNo = ReturnNo;
        data.DeptId = DeptId;
        data.UserId = ERPUserId;
        data.Status = '';
        data.ReturnDate = '';
        $.ajax({
            type: "POST",
            url: "../ProjectandJob/MaterialReturnGetandGets",
            data: data,
            success: function (result) {
                    MaterialReturnGets(result);               
            }
        });
    }
    else if (ReturnNo == 0) 
    {
        var data = {};
        data.ReturnNo = ReturnNo;
        data.DeptId = $('#Department').val(); 
        data.UserId = ERPUserId;
        data.Status = $('#FromDate').val();
        data.ReturnDate = $('#ToDate').val(); 
        $.ajax({
            type: "POST",
            url: "../ProjectandJob/MaterialReturnGetandGets",
            data: data,
            success: function (result) {
                MaterialReturnView(result);              
                $('#Department').focus();
            }
        });
    }
}

//View Data
function MaterialReturnView(result) {
    disable_datatable('TblView');
    $('.Viewrow').remove();
    var ProdRow1 = '<thead><tr class=Viewrow>' +
               '<th  style="width:5%">Return#</th>' +
               '<th  style="width:10%">Department</th>' +
               '<th  style="width:10%">JobCode</th>' +
               '<th  style="width:10%">CostCode</th>' +
               '<th  style="width:7%">Date</th>' +
               '<th  style="width:10%">From</th>' +
               '<th  style="width:10%">To</th>' +
               '<th  style="width:10%">Total Amount</th>' +
               '<th  style="width:20%">Comments</th>' +
               '</tr><tr class=Viewrow><th >Return#</th><th >Department</th><th >JobCode</th><th >CostCode</th><th >Date</th><th >From</th><th >To</th><th >Total Amount</th><th >Comments</th></tr></thead><tbody>';

    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            var Id = parseInt(i+1);          
             ProdRow1 +=
                "<tr class='jsgrid-row Viewrow' style='border:1px solid #e9e9e9;height:40px' ondblclick='Prodpopshow(4);GetReturnNo(" + result[i].ReturnNo + "," + result[i].DeptId + ")'>" +
                "<td style='width:5%;border:1px solid #e9e9e9'  > " + result[i].ReturnNo + "  </td>" +
                "<td style='width:10%;border:1px solid #e9e9e9' > " + result[i].DepartmentName + " </td>" +
                "<td style='width:10%;border:1px solid #e9e9e9' > " + result[i].JobCode + " </td>" +
                "<td style='width:10%;border:1px solid #e9e9e9' > " + result[i].CostCodeName + " </td>" +
                "<td style='width:7%;border:1px solid #e9e9e9'  > " + result[i].ReturnDate + " </td>" +
                "<td style='width:10%;border:1px solid #e9e9e9' > " + result[i].CreditAcc + " </td>" +
                "<td style='width:10%;border:1px solid #e9e9e9' > " + result[i].DebitAcc + " </td>" +
                "<td style='width:10%;border:1px solid #e9e9e9' > " + result[i].TotalAmt + " </td>" + 
                "<td style='width:20%;border:1px solid #e9e9e9' > " + result[i].Comments + " </td>" +
                "</tr>";           
        }
      
       }
    $('#TblView').html(ProdRow1 + '</tbody>');
    datatableWithsearch('TblView', 'Multiple');
    $('#TblView').scrollTop(0);
}

//Copy Data
function MaterialReturnGets(result) {

    if (result.length > 0) {
        $('#btnprint').show();

        if (result[0].DeptId == ERPDeptId)
        { $('#btnedit,#btndelete').show(); }
        else
        { $('#btnedit,#btndelete').hide(); }
        
        $('#ReturnNo,#ReturnNoCopy').val(result[0].ReturnNo);
         $('#ReturnDate').val(result[0].ReturnDate);
         $('#JobCode').val(result[0].JobCode); 
         $('#JobCodeId').val(result[0].JobCodeId);
         $('#CostCode').val(result[0].CostCodeName); 
         $('#CostCodeId').val(result[0].CostCode);
         $('#CreditAcc').val(result[0].CreditAcc);
         $('#CreditAccDesc').val(result[0].CreditAccDesc);
         $('#DebitAcc').val(result[0].DebitAcc);
         $('#DebitAccDesc').val(result[0].DebitAccDesc);
         $('#Comments').val(result[0].Comments);
         $('#TotalAmt').text(result[0].TotalAmt);
         $('#TotalQty ').text(result[0].TotalQty);
             
        for (var i = 0; i < result.length; i++) {
            var Id = parseInt(ItemCount);
            SlNum = Id;
            var ProdRow1 =
            "<tr class='jsgrid-header-row RemoveRow' id=Row" + Id + " ondblclick=EditPRow(" + Id + ") onfocusout=UpdatePRow(" + Id + ")>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:3%'> <input class='jsgrid-button jsgrid-delete-button'  type= button onclick='Rowdelete(" + Id + ")'  title= Delete disabled=''> </td>" +      //<i class='icon-trash'></i>
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:3%' id=td" + Id + "> " + SlNum + " </td>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:12%'>  <input type='text' class='form-control dtld EnbTxt' disabled=''  style='height:30px;background-color:white;'      id='Product" + Id + "'     value='" + result[i].Product + "'                                                                              ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:25%'>  <input type='text' class='form-control clrcs' disabled=''       style=height:30px;;background-color:white;      id='PDescr" + Id + "'      value='" + result[i].PDescr + "'                                                                                                                    ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <select   class='form-control clrcs'            disabled=''      style=height:30px;;background-color:white;      id='PUnit" + Id + "'          >" + UnitSelect + "</select>                                                                                                                      </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>   <select   class='form-control clrcs'           disabled=''       style=height:30px;;background-color:white;      id='PLoc" + Id + "'           >" + LocationSelect + "</select>                                                                                                                  </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control clrcs'  disabled=''    style=height:30px;;background-color:white;      id='PQty" + Id + "'        value=" + parseInt(result[i].PQty) + "                          onkeypress='isNumberInt(event, this)' onkeyup='RowAmountCalculation(" + Id + ",0)' > </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control clrcs'   disabled=''   style=height:30px;;background-color:white;      id='PPrice" + Id + "'      value=" + parseFloat(result[i].PPrice || 0).toFixed(Decimal) + "     onkeypress='isNumber(event, this)' onkeyup='RowAmountCalculation(" + Id + ",0)'></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <input type='text' class='form-control EnbTxt'  disabled=''    style='height:30px;background-color:white;'      id='PAmount" + Id + "'     value=" + parseFloat(result[i].PAmount).toFixed(Decimal) + "                                                     ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <input type='text' class='form-control clrcs'    disabled=''     style=height:30px;;background-color:white;      id='PCostCode" + Id + "'  onfocus=LoadCostCode('PCostCode','" + Id + "')    value='" + result[i].PDCostCodeName + "'  >                                                                                                                          </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'  style='display:none' >" +
            "<input type='text' class=form-control  id='ProductId" + Id + "'  value=" + result[i].ProductId + " >" +
            "<input type='text' class=form-control  id='PCostCodeId" + Id + "'  value=" + result[i].PCostCode + " >" + 
            "</td></tr>";

            $('#TblMaterialReturn').append(ProdRow1);
            $('#PUnit' + Id).val(result[i].PUnit);          
            $('#PLoc' + Id).val(result[i].PLoc);
            SlNum++;
            ItemCount++;
        }
        $("#ReturnNoCopy").focus().select();
        $('.clrwhit').css('background-color', 'white');
     
    }
    else { $('#btnedit,#btndelete,#btnprint').hide(); warningshow('No Data Found', 'ReturnNoCopy') }
    CalcTotalAmount();
}

//Check Edit or Delete Receipt
function CheckEditandDeleteInvoce(Flag)              //Flag=1: Edit and Update Contract  ,Flag=0:Delete Contract   , Flag=2:Close Contract 
{
    if ($.trim($('#txtotp').val()) == '') {
        warningshow('Enter OTP', 'txtotp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 1) { Operation = 'Material Return Update'; }
        else if (Flag == 0) { Operation = 'Material Return Delete'; }
        else { Operation = 'Contract Close'; }
        var data = {};
        data.UserId = ERPUserId;
        data.OTP = $("#txtotp").val();
        data.Remarks = $('#otpremarks').val();
        data.Operation = Operation;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Home/OTPCheckforUser",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                OTPCheck(status, Flag);
            }
        });
    }
}

//Check Otp for Edit and Delete
function OTPCheck(Status, Flag) {          //Flag=1: Edit and Update   ,Flag=0:Delete   

    if (Status == 1) {
        $('#OTPDiv').hide(); $('#txtotp,#otpremarks,#otptype').val('');
        if (Flag == 1) { EditRETURN(); }
        else { DeleteReturn(Flag); } 
    }
    else {
        warningshow('Invalid OTP', 'txtotp');
        $("#txtotp").select();
    }
}

//Edit Contract function
function EditRETURN() { 
    $('.clrcs').css('background-color', ''); 
    Updateflag = 1; CopyFlag = 0;
    $('#ReturnNo').val($('#ReturnNoCopy').val());
    $('#btndelete,#btnedit,#CopyDiv,#btnprint').hide();
    $('#ReturnNo,#btnupdate').show();
    $('.form-control:not(.EnbTxt),.jsgrid-delete-button').prop('disabled', false);
    $('.btn-outline-primary').prop('disabled', false);
    $('#JobCode').focus().select(); 
   
}

//Delete Contract function
function DeleteReturn(Flag) {      //Flag=0:Delete Contract   , Flag=2:Close Contract  

    $('#Loadingsave').show();
    $('#btndelete').prop('disabled', true);
    var data = {};
    data.ReturnNo = $('#ReturnNoCopy').val(); 
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Status = Flag;
    data.ContDate = CurDate;
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/MaterialReturnDelete",
        data: data,
        success: function (result) {
            $('#btndelete').prop('disabled', false);
            $('#Loadingsave').hide();
            var status = result.oList[0].Status;
            var ReturnNo = result.oList[0].ReturnNo;
            $('#SavedReturnNo').val(ReturnNo);
            Showalerts(status, ReturnNo); 
        }
    });
}

//Print
function confirmprint() {
    if ($('#TblMaterialReturn tr').length > 0) {
        PrintthisBillWindows('MaterialReturn', ItemCount, 'MatReturnCopy'); 
    }
    else {
        warningshow('Please select a Contract No. to print', 'ReturnNoCopy');
        $('#ReturnNoCopy').select();
    }
}


function Defaultfocus() {
    if (CopyFlag == 0)
    { $('#JobCode').focus().select(); }
    else if (CopyFlag == 1)
    { $('#ReturnNoCopy').focus().select(); }
}

function datatableWithsearch(tablename, Type) {
    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Select' || title == 'Details') {
                $(this).html('<input type="text" class="form-control"  style="width:30px;display:none"  placeholder="' + title + '"/>')
            }
            else {
                $(this).html('<input type="text" class="form-control"   placeholder="' + title + '"/>')
            }
    });

    var table = null;

    if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            //"order": false,
        });

    }
    else if (Type == 'Multiple') {

        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "order": [],
            "pageLength": -1
        });


    }
    else if (Type == 'MultiplePurchaseT') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "10%", "targets": 0 },
                { "width": "15%", "targets": 2 },
            ],
            orderCellsTop: true,
            "order": [],
            //  "pageLength": -1,
            autoWidth: false
        });

    }
    else if (Type == 'MultipleSalesT') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "8%", "targets": 0 },
                 { "width": "6%", "targets": 1 },
                 { "width": "12%", "targets": 2 },
                  { "width": "22%", "targets": 3 },
                   { "width": "5%", "targets": 4 },
                    { "width": "7%", "targets": 5 },
                     { "width": "8%", "targets": 6 },
                      { "width": "8%", "targets": 7 },
                      { "width": "7%", "targets": 8 },
                       { "width": "8%", "targets": 9 },
            ],
            orderCellsTop: true,
            "order": [],
            // "pageLength": -1
        });


    }

    else if (Type == 'MultipleAllTransaction') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "10%", "targets": 2 },

            ],
            orderCellsTop: true,
            "order": [],
            //"pageLength": -1,
            autoWidth: false
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

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function Clear(Flag) {                                      //Flag:0 - Confirm be4 New  , Flag:1 - Confirm be4 Copy
    if (($('.RemoveRow').length > 0) && (CopyFlag == 0)) {
        $('#confirm').show();
        if (Flag == 0)
        { $('#Confirmflag').val('Clear'); }
        else if (Flag == 1)
        { $('#Confirmflag').val('Copy'); }
        else if (Flag == 2)
        { $('#Confirmflag').val('View'); }
        $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do You Want To Continue?');
        $('#confirmOk').focus();
    }
    else {
        if (Flag == 0)
        { formrefresh(0); }
        else if (Flag == 1)
        { GetRows(); }
        else if (Flag == 2)
        { Prodpopshow(0); }
    }
}

function formrefresh(flag) {
    $('#confirmOk').prop("disabled", false);
    if ((flag == 0) || (flag == 1))                                            //flag=0 : Normal form refresh  , flag=1 : after save  , flag=3  : Clear before each salesgets     
    {
        CopyFlag = 0; ProdFlag = 0; Updateflag = 0;
        $('.form-control:not(.EnbTxt),.btn-outline-primary').prop("disabled", false);
        Serialnoload();

        $('#ReturnNo,#btnsubmit,#btncopy').show();
        $('#CopyDiv').hide();

        if (flag == 0) { Defaultfocus(); }
    }

    ItemCount = 1; SlNum = 1; EditFlag = 0; 

    $('.RemoveRow').remove();
    if (flag != 3)
    {
        $('.form-control:not(.AvoidClear)').val('');
        $('select').each((i, item) => {
            var $item = $(item);
            $item.val($item.find('option:first').val());
        });
        $('#Department').val(ERPDeptId);
    }
    else
    {
        $('.form-control:not(.AvoidClear,.ITMPS1)').val('');
        $('select:not(.ITMPS1)').each((i, item) => {
            var $item = $(item);
            $item.val($item.find('option:first').val());
        });
    }

    CalcTotalAmount();

   

    $('#PLoc0').val(UserLocationId);
    
    LoadDate(1);

    $('#btnedit,#btndelete,#btnupdate,#btnprint').hide();

    $('#Warningpopupnew').fadeOut();

    if (flag != 3 && flag != 4)
    { Serialnoload(); CommonLoad(1);}   

    productpopuprefresh();
}

function ConfirmboxResult(Result, status, Rowid) {
    if (Result == 'true' && status == 'Clear') {
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'Copy') {
        GetRows();
    }
    else if (Result == 'true' && status == 'View') {     
        Prodpopshow(0);
    }    
    else if (Result == 'true' && status == 'DeleteRow') {
        Rowdeleteconfirm(Rowid);
    }
    else if (Result == 'false' && status == 'DeleteRow') {
        $("#Product0").focus();
    }
    else if (Result == 'true' && status == 'Save') {
        SaveandUpdate(1);
    }
    else if (Result == 'true' && status == 'Update') {
        SaveandUpdate(2);
    }
    else if (CopyFlag == 0)
    { $('#Product0').focus().select(); } 
    else
    { $('#ReturnNoCopy').focus().select(); } 

    $('#confirm').fadeOut();
}

//Allow floating values
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

//Allow Integers ONLY
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

function warningshow(message, Id) {
    $('#popupmessagenew').text(message);
    $('#Warningpopupnew').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopupnew').fadeOut();
    }, 3000);
}

function Showalerts(Status, VocNo) {
    if (Status == 1) {
        formrefresh(1);
        swal('Return No - ' + VocNo, " Saved Successfully", "success");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 2) {
        formrefresh(1);
        swal('Return No - ' + VocNo, " Updated Successfully", "success");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 3) {
        swal('Return No - ' + VocNo, " Deleted!", "error");
        formrefresh(3);
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 4) {
        swal('Return No - ' + VocNo, " Not Exists!", "error");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 6) {
        swal('Return No - ' + VocNo, " already exists", "warning");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 5) {
        swal('Return No - ' + VocNo, " saving failed.Try again!", "error");
        $('.swal-button swal-button--info').focus();
    }
}

function addCommas(x, flg) {
    var amt = x || 0;
    return amt;
}

