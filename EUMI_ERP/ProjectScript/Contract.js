
var Decimal = Decimal; var AllLocSelect = ''; var DeptSelect = ''; var ACCArray = []; var SlNumOt = 1; var ItemCountOt = 1; 
var CopyFlag = 0; var SlNum = 1; var ItemCount = 1; var Updateflag = 0; var EditFlag = 0;
var RentType = '<option value=1> Rent</option><option value=2>SD</option>';
var ContMode = '<option value=0>Cheque</option><option value=1>Cash</option><option value=2>Bank</option>';
var ContType = '<option value="D"> DEBIT</option><option value="C"> CREDIT</option>';
var ContBank = '';
var DocSelect = ''; var rowcount = 2;
var DownloadButtton = '<i class="fa fa-download" style="color:darkorange"></i>';


$(document).ready(function () {

    Defaultfocus();
    CommonLoad(0);
    LoadDate(0);
    CommonProps();
    CalcTotalWeight();
    OtherTranTotCalc(0);
    window.setTimeout(function () {
        TermsType();
        GetAcnt();
    });
    RentLoad(2);
   
    
  
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
            var inputs = $(this).closest('form').find(':input:not(.btn):enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();            
        }
    });
   
    Modechange(0);
});

$(document).keydown(function (e) {
    if ((CopyFlag == 0) && (Updateflag == 0) && (!$('.ImpDiv').is(':visible'))) 
    {
        if (e.altKey && e.keyCode == 83) {                        //Alt+S        
            SaveAndUpdate(1);
        }      
        else if (e.keyCode == 27) {                           //esc
            Prodpopshow(4);
            $('#popupdiv').hide();
        }
    }
    if ((e.altKey) && (e.keyCode == 67) && (!$('.ImpDiv').is(':visible'))) {                  //Alt+C
        Clear(0);
    }
});

function LoadDate(flg)
{
    $(function () {
        if (flg == 0)
        {
            $('#ContDate,#FromPeriod,#ChequeDate0,#Chqdt').daterangepicker({
                minDate: minDate,
                maxDate: new Date(new Date().getFullYear()+20, new Date().getMonth() + 6, new Date().getDate()),
                singleDatePicker: true,
                showDropdowns: true,
                locale: { format: 'DD/MM/YYYY' },
            });
            $('#ToPeriod').daterangepicker({
                minDate: minDate,             
                singleDatePicker: true,
                showDropdowns: true,
                locale: { format: 'DD/MM/YYYY' },
            });
        }
        else if (flg == 1) 
        {
            $('#ChequeDate0').daterangepicker({
                minDate: minDate,
                maxDate: new Date(new Date().getFullYear()+20, new Date().getMonth() + 6, new Date().getDate()),
                singleDatePicker: true,
                showDropdowns: true,
                locale: { format: 'DD/MM/YYYY' },
            });
        }
       
     });
}

function CommonLoad(flg)
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

    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetIDType",
        data: data,
        success: function (result) {
            IDLoad(result.oList);
        }
    });

    var data = {};
    data.BankId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/BankGetandGets",
        data: data,
        success: function (result) {
            BankLoad(result.oList,0);

        }
    });
   

    var srlno = {};                                                           //Get Company cash,bank,pdc received a/c
    srlno.DeptId = 1;
    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {
            ACCArray = [];
            ACCArray.push(result.oList[0].PDCReceived);
            ACCArray.push(result.oList[0].GICash);
            ACCArray.push(result.oList[0].GIBank);
            GetAcnt();
        }
    });
}

function Modechange(flg)
{
    if (flg==0)
    {
        $('.cnmode').on('change', function (e) {
            var val = $(this).val();
            var Id = $(this).attr('id').match(/\d+/)[0];
            console.log(Id);
            if (val == 1) {
                $('#ChequeNo' + Id).val('');
                $('#ContBank' + Id).val(0);
                $('#ContBranch' + Id).val('');
                $('#ChequeNo' + Id + ',#ChequeDate' + Id + ',#ContBank' + Id + ',#ContBranch' + Id).prop('disabled', true);
                //$('#ChequeNo' + Id + ',#ChequeDate' + Id + ',#ContBank' + Id + ',#ContBranch' + Id).css('background-color', 'white');
            }
            else {
                $('#ChequeNo' + Id + ',#ChequeDate' + Id + ',#ContBank' + Id + ',#ContBranch' + Id).prop('disabled', false);
                //$('#ChequeNo' + Id + ',#ChequeDate' + Id + ',#ContBank' + Id + ',#ContBranch' + Id).css('background-color', '');
            }
        });
    }
    else
    {
        document.querySelectorAll('.cnmode').forEach(function (item) {       

            if($(item).val()==1)
            {
                var Id = $(item).attr('id').match(/\d+/)[0];
                $('#ChequeNo' + Id).val('');
                $('#ContBank' + Id).val(0);
                $('#ContBranch' + Id).val('');
                $('#ChequeNo' + Id + ',#ChequeDate' + Id + ',#ContBank' + Id + ',#ContBranch' + Id).prop('disabled', true);
            }
            else {
                var Id = $(item).attr('id').match(/\d+/)[0];
                $('#ChequeNo' + Id + ',#ChequeDate' + Id + ',#ContBank' + Id + ',#ContBranch' + Id).prop('disabled', false);
            }
        });
    }
}

function GetAcnt()
{
    var value = parseInt($('#ContMode0').val()); 
    $('#Account0,#AccountId0').val(ACCArray[value]); 
}

function RentLoad(flg) {
    if (flg == 0)
    {
        var Rent = $('#Rent').val();
        Rent = isNaN(Rent) ? 0 : Rent;
        if ((Rent || 0) == 0)
        { $('#TotalRent').text((0).toFixed(Decimal)); }
        else
        {$('#TotalRent').text(parseFloat(Rent).toFixed(Decimal));}
    }   
    else if (flg == 1)
    {
        var Deposit = $('#Deposit').val();
        Deposit = isNaN(Deposit) ? 0 : Deposit;
        if ((Deposit || 0) == 0)
        { $('#TotalDeposit').text((0).toFixed(Decimal)); }
        else
        { $('#TotalDeposit').text(parseFloat(Deposit).toFixed(Decimal)); }     
    }
    else
    {
        $('#TotalDeposit,#TotalRent').text((0).toFixed(Decimal)); 
    }
}

function CommonProps()
{
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

function Serialnoload()
{
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
    $('#ContractNo,#ContractNoCopy,#CurrentContNo').val(result[0].ContractNo); 
}

function DepartmentLoad(result) {
    $("#Branch").empty();
    DeptSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        DeptSelect += "<option value='" + result[i].DepartmentId + "' >" + result[i].DepartmentCode + "</option>"
    }
    $("#Branch").append(DeptSelect);
    $('#Branch').val(ERPDeptId); 
}

function IDLoad(result) {
    DocSelect = '';
    $("#ContDocument,#UploadDocument1").empty();
    $("#ContDocument,#UploadDocument1").append("<option value='0'>--Select--</option>");
    DocSelect += "<option value='0'>Select</option>";
    for (var i = 0; i < result.length; i++) {
        $("#ContDocument,#UploadDocument1").append("<option value='" + result[i].Id + "'>" + result[i].IDType + "</option>");
        DocSelect += "<option value='" + result[i].Id + "'>" + result[i].IDType + "</option>"
    }
}

function BankLoad(result, id) {
    ContBank = '';
    $("#ContBank0").empty();
    ContBank+="<option value='0'>Select</option>";
    for (var i = 0; i < result.length; i++) {
        ContBank += "<option value='" + result[i].BankId + "' name='" + result[i].Branch + "'>" + result[i].BankName + "</option>" 
    }
    $("#ContBank0").append(ContBank);
    if(id!=0)
    { $("#ContBank0").val(id) } 
}

function GetBranch(Id)
{
    $("#ContBranch" + Id).val($("#ContBank"+Id+' option:selected').attr('name')); 
}

//Manual Focus Input
function Focusinput(Dst, e, Id) {
    
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if ((key == 13) && (Id == 'ContPeriod' || Id == 'ToPeriod'))
    {      
            e.preventDefault();
            if ($("#PaymentTerms").is(':visible')) { $("#PaymentTerms").focus().select(); }
            else if ($("#YearlyTerms").is(':visible')) { $("#YearlyTerms").focus().select(); }       
    }
    else if (key == 13) { 
        e.preventDefault();
        $('#' + Dst).focus().select();
    }  
}

//Manual Focus Button
function Focusbtn(Dst, e, Id) { 
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 39 && (Id == 'AddChequ')) {
     e.preventDefault();
     $("#AutoChequ").focus();
    }
    else if (key == 37 && (Id == 'AutoChequ')) {
        e.preventDefault();
        $("#AddChequ").focus();
    }
}

//Show or hide stock popup during stock add,edit,update
function Prodpopshow(flg) {
    if (flg == 0)                             //Add Product btn click
    {
        $('#itempopup').show();       
        $('#OtherAccount0').focus().select();
    }
    else if (flg == 3)                       //Clear Button click 
    {            
        $('.gld').val('');
       
        $('#itempopup').hide();
        $('#AddPdct').focus();
    }
    else if (flg == 4)                       //Esc click
    {
        var DebitAmt = 0; var CreditAmt = 0;
        for (var k = 1; k < ItemCountOt; k++)
        {
            if (($('#OtherAmount' + k).val() != 'undefined'))
            {
                 if ( ($('#Type' + k).val()=='C')) 
            {              
                CreditAmt = parseFloat(CreditAmt) + parseFloat($('#OtherAmount' + k).val());
            }
            if (($('#Type' + k).val()=='D')) { 
                DebitAmt = parseFloat(DebitAmt) + parseFloat($('#OtherAmount' + k).val());               
            }
            }
        }
       
        if (DebitAmt != CreditAmt)
        { warningshow('Credit and Debit Amount not Tally', 'OtherAccount0'); }
        else
        {
            $('#itempopup').hide();

            if ($('#ChequeNo0').prop('disabled') == false)
            { $('#ChequeNo0').focus(); }
            else { $('#Amount0').focus(); }

            OtherTranTotCalc(0);
        }
    }
}
 

function OtherTransAdd()
{
    if( $.trim($("#OtherAccount0").val())=='')
    {
        warningshow('Please select Account', 'OtherAccount0');
        return false;
    }
    else if (($("#OtherAccountId0").val() || 0) == 0) {
        warningshow('Please select a valid Account', 'OtherAccount0'); 
        return false;
    }
    else if (($("#OtherAmount0").val() || 0) == 0) {
        warningshow('Please Enter Amount', 'OtherAmount0'); 
        return false;
    }
    else
    {
        SlNumOt = parseInt($('.RemoveRowOt').length) + 1; 
        var Id = parseInt(ItemCountOt);
        var ProdRow1 =
         "<tr class='jsgrid-header-row RemoveRowOt' id=RowOt" + Id + " onfocusout=UpdatePRowOt(" + Id + ")>" +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:2%'> <input class='jsgrid-button jsgrid-delete-button'  type= button onclick='RowdeleteOt(" + Id + ")'  title= Delete > </td>" +      //<i class='icon-trash'></i>
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:3%' id=ottd" + Id + "> " + SlNumOt + " </td>" +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:10%'>  <input type='text' class=form-control   disabled=''       style=height:30px;background-color:white      id='OtherAccount" + Id + "'       value='" + $('#OtherAccount0').val() + "'                                              ></td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:20%'>  <input type='text' class=form-control          style=height:30px;      id='OtherDesc" + Id + "'       value='" + $('#OtherDesc0').val() + "'                                              ></td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:7%'>   <select   class=form-control                   style=height:30px;      id='Type" + Id + "'    >" + ContType + "</select> </td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:19%'>    <input type='text' class='form-control dtld'  style=height:30px;      id='OtherRemarks" + Id + "'     value='" + $('#OtherRemarks0').val() + "'                                         >            </td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:10%'>   <input type='text' class='form-control '      style=height:30px;      id='OtherAmount" + Id + "'     value=" + parseFloat($('#OtherAmount0').val()).toFixed(Decimal) + "  onkeypress=isNumber(event,this)></td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'  style='display:none' >" +
         "<input type='text' class=form-control  id='OtherAccountId" + Id + "'  value=" + $('#OtherAccountId0').val() + " >" +
          "<input type='text' class=form-control  id='OtherAccId" + Id + "'  value=" + $('#OtherAccId0').val() + " >" + 
         "</td></tr>";

        $('#TblOtherTrans').append(ProdRow1); 
        $('#Type' + Id).val($('#Type0').val()); 

        $('.ITMP').val('');

        if ($('#Type' + Id).val() == 'D')
        { $('#Type0').val('C'); }
        else
        { $('#Type0').val('D'); }

        ItemCountOt++;
        $('#OtherAccount0').focus();
        OtherTranTotCalc(1);
    }
}

function UpdatePRowOt(Id)
{
    if(($('#OtherAmount'+Id).val()||0)==0) 
    {
        warningshow('Please Enter Amount', 'OtherAmount' + Id);
        return false;
    }
    else
    {
        $('#OtherAmount' + Id).val(parseFloat($('#OtherAmount' + Id).val()).toFixed(Decimal));
        OtherTranTotCalc(1);
        return true;
    }
}

function RowdeleteOt(RowId)
{    
    SlNumOt = 1; 
    $('#RowOt' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#OtherAccount' + j).val() != undefined) {
            $('#ottd' + j).text(SlNumOt);
            SlNumOt++; 
        }
    }
    $('#OtherAccount0').focus();
    OtherTranTotCalc(1);
}

function OtherTranTotCalc(flg) {    //flg:1-Total Debit,Credit Calculation
    if ($('.RemoveRowOt').length == 0) {
        $('#TotalOtherAmt,#TotDebit,#TotCredit').text((0).toFixed(Decimal));
    }
    else if ($('.RemoveRowOt').length > 0) {
        $('#TotalOtherAmt').text('');
        var TotChqAmt = 0; var DebitAmt = 0; var CreditAmt = 0;

        for (var Id = 1; Id < ItemCountOt; Id++) {
            if ($('#OtherAccount' + Id).val() != undefined) {
                TotChqAmt = parseInt(TotChqAmt) + parseInt($('#OtherAmount' + Id).val() || 0);
                if (($('#Type' + Id).val() == 'C')) {
                    CreditAmt = parseFloat(CreditAmt) + parseFloat($('#OtherAmount' + Id).val());
                }
                if (($('#Type' + Id).val() == 'D')) { 
                    DebitAmt = parseFloat(DebitAmt) + parseFloat($('#OtherAmount' + Id).val());
                }
            }
        }
        $('#TotalOtherAmt').text(TotChqAmt.toFixed(Decimal));
        $('#TotDebit').text(DebitAmt.toFixed(Decimal)); 
        $('#TotCredit').text(CreditAmt.toFixed(Decimal));

    }
}

function OtherTranSGets(ContNo,DeptId) { 
    var data = {};
    data.SlNo = ContNo;
    data.DepartmentId = DeptId; 
    $.ajax({
        type: "POST",
        url: "../Purchase/OtherTransactionGetandGets", 
        data: data,
        success: function (result) {
            ShowOtherCost(result.dList);
        }
    });
}

function ShowOtherCost(result)
{
    for(var j=0;j<result.length;j++)
    {
        SlNumOt = parseInt($('.RemoveRowOt').length) + 1;
        var Id = parseInt(ItemCountOt);
        var ProdRow1 =
         "<tr class='jsgrid-header-row RemoveRowOt' id=RowOt" + Id + " onfocusout=UpdatePRowOt(" + Id + ")>" +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:2%'> <input class='jsgrid-button jsgrid-delete-button'  type= button onclick='RowdeleteOt(" + Id + ")'  title= Delete > </td>" +      //<i class='icon-trash'></i>
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:3%' id=ottd" + Id + "> " + SlNumOt + " </td>" +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:10%'>  <input type='text' class='form-control clrwhit EnbTxt'   disabled=''       style=height:30px;background-color:white      id='OtherAccount" + Id + "'       value='" + result[j].AccountName + "'               ></td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:20%'>  <input type='text' class='form-control clrwhit'  disabled=''        style=height:30px;      id='OtherDesc" + Id + "'       value='" + result[j].AccName + "'                                             ></td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:7%'>   <select   class='form-control clrwhit'            disabled=''       style=height:30px;      id='Type" + Id + "'    >" + ContType + "</select> </td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:19%'>    <input type='text' class='form-control dtld clrwhit'  disabled=''  style=height:30px;      id='OtherRemarks" + Id + "'     value='" + result[j].Description + "'                                         >            </td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'   style='width:10%'>   <input type='text' class='form-control clrwhit'     disabled=''   style=height:30px;      id='OtherAmount" + Id + "'     value=" + parseFloat(result[j].OCAmount).toFixed(Decimal) + "  onkeypress=isNumber(event,this)></td> " +
         "<td class='jsgrid-cell  jsgrid-align-left'  style='display:none' >" +
         "<input type='text' class=form-control  id='OtherAccountId" + Id + "'  value=" + result[j].AccountName + " >" +
          "<input type='text' class=form-control  id='OtherAccId" + Id + "'  value=" + result[j].AccId + " >" + 
         "</td></tr>";

        $('#TblOtherTrans').append(ProdRow1);
        $('#Type' + Id).val(result[j].PayType);
        ItemCountOt++;
    }
    $('.clrwhit').css('background-color', 'white');
    $('#OtherAccount0').focus();
    OtherTranTotCalc(1);
}


//Flat Autocomplete
function LoadFlat()
{
    $("#FlatNo").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            $('#FlatNoId').val(''); 
            var data = {};
            data.FlatNumber = $("#FlatNo").val();
            data.buildingManagementId = $("#PremiseId").val() || 0; 
            $.ajax({
                url: '../Realestate/FlatNumberSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '3con',
                            label: item.FlatNumber,
                            label1: item.NameofBuilding,
                            label2: item.ContractStatus,
                            DEWANO: item.DEWANO,
                            Rent: item.Rent,
                            BuildingId: item.Building,
                            NameofBuilding: item.NameofBuilding,
                            FlatMasterId: item.FlatMasterId,
                            ContractStatus:item.ContractStatus,
                            headers: ["FlatNumber", "Name of Building","Status"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {

            if (ui.item.ContractStatus==1)
            {
                warningshow('Flat NO. ' + ui.item.label + ' is Not Available', 'FlatNo');
                window.setTimeout(function () {
                    $('#FlatNo').val('');
                });
            }
            else
            {
            $('#FlatNoId').val(ui.item.FlatMasterId); 
            $('#DEWANo').val(ui.item.DEWANO);
            $('#Rent').val(parseFloat(ui.item.Rent).toFixed(Decimal)); 
            $('#TotalRent').text(parseFloat(ui.item.Rent).toFixed(Decimal));
            $('#DEWANo').focus().select();
            $('#Premise').val(ui.item.NameofBuilding); 
            $('#PremiseId').val(ui.item.BuildingId);
            }           
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) &&(($('#FlatNo').val() == '') || (($('#FlatNoId').val() || 0) != 0))) {  
            $('#DEWANo').focus().select();
        }
       
    });
}

//Tenant Autocomplete
function LoadTenant() {
    $("#Tenant").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            $('#TenantId').val('');
            var data = {};
            data.TenantAccount = $("#Tenant").val(); 
            $.ajax({
                url: '../Realestate/TenantSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '2',
                            label: item.TenantName,
                            label1: item.TenantAccount, 
                            TenantId: item.TenantId,
                            Rent: item.Rent,
                            headers: ["Name","Account"] 
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) { 
            $('#TenantId').val(ui.item.TenantId);
            $('#ContPeriod').focus();
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#Tenant').val() == '') || (($('#TenantId').val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible')))) {
            $('#ContPeriod').focus();
        }
    });
}

//Building/Premise Autocomplete
function LoadPremise() { 
    $("#Premise").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            $('#PremiseId,#FlatNo,#FlatNoId').val(''); 
            var data = {};
            data.Building = $("#Premise").val();
            $.ajax({
                url: '../Realestate/BuildingNumberSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '2',
                            label: item.NameofBuilding,
                            label1: item.Building, 
                            buildingManagementId: item.buildingManagementId,
                            NameofBuilding: item.NameofBuilding,
                            headers: ["Name","Code"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#PremiseId').val(ui.item.buildingManagementId); 
            $('#Subject').focus().select();
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#Tenant').val() == '') || (($('#Premise').val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible')))) {
            $('#Subject').focus().select();
        }
    });
}

//Account Autocomplete
function LoadAccount(Id)
{
    if (Id!='A')            //Normal A/C
    {
            $("#Account" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            $('#AccountId' + Id).val('');
            var data = {};
            data.AccountDescription = $("#Account" + Id).val();
            $.ajax({
                url: '../Inventory/AccountNumberSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    //console.log(data);
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'ONE',
                            label: item.DebitAccount + "-" + item.AccountDescription,
                            label1: item.AccountDescription,
                            DebitAccount: item.DebitAccount,
                            AccountDescription: item.AccountDescription,
                            AccountId: item.AccountId,
                            headers: ["Account Code - Description"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#AccountId' + Id).val(ui.item.DebitAccount)          
            if (Id == 0)
            { $('#AddChequ').focus(); }
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#Account0').val() == '') || (($('#AccountId0').val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible')))) {
            
            window.setTimeout(function () {
                if (Id == 0)
                { $('#AddChequ').focus(); }
            });
        }
    });
    }
 else if (Id == 'A')       //Other Transaction acc
 {
     $("#OtherAccount0").autocomplete({
     delay: 0,
     minLength: 0,
     source: function (request, response) {
         $('#OtherAccountId0,#OtherAccId0').val('');
         var data = {};
         data.AccountDescription = $("#OtherAccount0").val(); 
         $.ajax({
             url: '../Inventory/AccountNumberSearch',
             type: "POST",
             data: data,
             dataType: "json",
             success: function (data) {
                 //console.log(data);
                 response($.map(data, function (item) {
                     return ({
                         ColCount: 'ONE',
                         label: item.DebitAccount + "-" + item.AccountDescription,
                         label1: item.AccountDescription,
                         DebitAccount: item.DebitAccount,
                         AccountDescription: item.AccountDescription,
                         AccountId: item.AccountId,
                         headers: ["Account Code - Description"]
                     })
                 }));
             }
         })
     },
     autoFocus: true,
     select: function (event, ui) {
         $('#OtherAccountId0').val(ui.item.DebitAccount);
         $('#OtherAccId0').val(ui.item.AccountId); 
         $('#OtherDesc0').val(ui.item.AccountDescription); 
         if (Id == 0)
         { $('#OtherDesc0').focus(); }
     },
 }).on('keydown', function (e) {
     if ((e.which == 13) && (($('#OtherAccount0').val() == '') || (($('#OtherAccount0').val() || 0) != 0) || (!$(this).autocomplete('widget').is(':visible')))) {            
        $('#OtherDesc0').focus();         
     }
 });
}
}

//VocNo Autocomplete
function SearchVocNo() { 
    $("#ContractNoCopy").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            formrefresh(3);
            var data = {};
            data.ContractNo = $("#ContractNoCopy").val();
            data.DeptId = ERPDeptId;
            data.UserId = ERPUserId;
            data.Status = '';
            $.ajax({
                url: '../Realestate/ContractNoSearch', 
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'sl4',
                            label: item.ContractNo,
                            label1: item.TenantName,
                            label2: item.DepartmentName,
                            label3: item.ContDate, 
                            ContractNo: item.ContractNo,
                            DeptId: item.DeptId,
                            headers: ["Contract No", "Tenant Name", "Department", "Date"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {           
            GetContNo(ui.item.ContractNo, ui.item.DeptId); 
        },
    });
}

//Select Terms
function TermsType()
{
   
    $('#PaymentTerms').prop('readonly',false);
    $('#PaymentTerms,#YearlyTerms').val('').hide(); 
   
    if ($('#ContPeriod').val()==1)
    {       
        $('#PaymentTerms').show();
        $('#PaymentTerms').val(12);
        dateafteroneyear();
    }
    else if (($('#ContPeriod').val() == 2)||($('#ContPeriod').val()==4)||($('#ContPeriod').val()==5)) 
    {       
        $('#YearlyTerms').show();
        dateafteroneyear();
    }
    else if ($('#ContPeriod').val() == 3)
    {
        $('#PaymentTerms').show();
        $('#PaymentTerms').prop('readonly', true);
        $('#FromPeriod,#ToPeriod').val(CurDate);
   }
}

//Max Value 12 for monthly terms
function CheckTerms(flg)
{
    if (flg == 1)
    {
        $('#YearlyTerms').val(0);
        if (parseInt($('#PaymentTerms').val()) == 0) {
            warningshow('Terms must be > 0', 'PaymentTerms');
            $('#PaymentTerms').val('');
            return false;
        }
        else if (parseInt($('#PaymentTerms').val() || 0) > 12) {
            warningshow('Terms must be <= 12', 'PaymentTerms');
            $('#PaymentTerms').val('');
            return false;
        }
        else { return true; }
    }
    else if (flg == 2) {
        $('#PaymentTerms').val(0); 
       if (parseInt($('#YearlyTerms').val()) == 0) {
           warningshow('Terms must be > 0', 'YearlyTerms');
           $('#YearlyTerms').val('');
            return false;
        }       
        else { return true; }
    }
   
    
}

//Check Product add conditions
function Chequeaddconfirm(flag) {   //flag:0 - Add , flag:1 - Auto Generate
   
    var Chkno = $('#ChequeNo0').val();

    var Paytype = $('#ContMode0').val();

    if ((($('#Rent').val() || 0) == 0) && (flag==1)) {
        warningshow('Please Enter Rent', 'Rent'); 
        return false;
    }

    else if (($.trim($('#ChequeNo0').val()) == '') && (Paytype ==0)) { 
        warningshow('Please Select ChequeNo', 'ChequeNo0');
        return false;
    }
    else if (((isNaN(Chkno[Chkno.length - 1]) ? 'a' : Chkno[Chkno.length - 1]) == 'a') && (Paytype == 0))
    {
        warningshow('Please Salect a valid Cheque', 'ChequeNo0');
        return false;
    }
    else if ((($('#ContBank0').val() || 0) == 0) && (Paytype == 0)) {
        warningshow('Please Salect Bank', 'ContBank0');
        return false;
    }
    else if (($('#Amount0').val() || 0) == 0) {
        warningshow('Please Enter Amount', 'Amount0');
        return false;
    }
    else if ((parseFloat($('#Amount0').val()) > parseFloat($('#Rent').val())) && (flag == 1)) {
        warningshow('Amount Should be less than ' + $('#Rent').val(), 'Amount0'); 
        return false;
    }
    else if ((($('#Account0').val() == '') || ($('#AccountId0').val() || 0) == 0) && (Paytype == 0)) {
        warningshow('Please select a valid Account', 'Account0'); 
        return false;
    }
    else {
        AddCheque(flag); $('#Warningpopupnew').fadeOut();
    }
}

//Claculate date after one year (fromdate and todate)
function dateafteroneyear()
{
    if ($('#ContPeriod').val() != 3)
    {
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
   
}

//Get Date after particular months (chequedate)
function dateafermonth(tt)
{
    var TmType=1; 
    if ($('#PaymentTerms').is(':visible'))                //monthly
    { TmType = 1;}
    else if ($('#YearlyTerms').is(':visible')) {        
        if ($('#ContPeriod').val() == 2)                  // yearly                         TmType = 1;
        { 
            if ( Number.isInteger(12 / $('#YearlyTerms').val()))
            {
                TmType = (12 / $('#YearlyTerms').val());
            }
            else
            {
                TmType = 1;
            }
        }            
        else if ($('#ContPeriod').val() == 4)            // half year                       TmType = 6;
        {
            if (Number.isInteger(6 / $('#YearlyTerms').val())) {
                TmType = (6 / $('#YearlyTerms').val());
            }
            else {
                TmType = 1;
            }                       
        }
        else if ($('#ContPeriod').val() == 5)          // quarter yr                        TmType = 4;
        {
            if (Number.isInteger(4 / $('#YearlyTerms').val())) { 
                TmType = (4 / $('#YearlyTerms').val()); 
            }
            else {
                TmType = 1;
            }
        }
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

//Add Details to grid
function AddCheque(flag) {         //flag:0 - Add , flag:1 - Auto Generate
   
    var Chkno = $('#ChequeNo0').val(); $('#Chqdt').val($('#ChequeDate0').val());

    var TmType = 1; var Chvar = Chkno[Chkno.length - 1]; var Chinc = ''; var ChequeNumber = $('#ChequeNo0').val(); var vr = 0; var RentAmt = 0;

    if ((parseFloat($('#Amount0').val()) > 0) && (parseFloat($('#Amount0').val()) != parseFloat($('#Rent').val()))) 
    { RentAmt = parseFloat(($('#Amount0').val() || 0)).toFixed(Decimal); }     //parseFloat(($('#Rent').val() || 0) / TmType).toFixed(Decimal)
    else
    { RentAmt = parseFloat(($('#Rent').val() || 0)).toFixed(Decimal);    }

    if ($('.RemoveRow').length == 0) { ItemCount = 1; }

    if ($('#PaymentTerms').is(':visible') && ($('#PaymentTerms').val() || 0 > 0))
        { TmType = $('#PaymentTerms').val() || 0; }
    else if ($('#YearlyTerms').is(':visible') && ($('#YearlyTerms').val() || 0 > 0)) {        
        { TmType = $('#YearlyTerms').val() }      
    }

    if (($('#Amount0').val() == $('#Rent').val()) || (flag==0)) { TmType = 1; }
    
    for (var k = 1; k <= TmType; k++) {
        if (TmType > 1 && ($('#ContMode0').val()||0)==0) { 
            Chinc = Chvar;
            var str = $('#ChequeNo0').val();
            ChequeNumber = str.substring(0, str.length - 1) + Chinc;
        }

        SlNum = parseInt($('.RemoveRow').length) + 1;
        var Id = parseInt(ItemCount);
       
        var ProdRow1 =
            "<tr class='jsgrid-header-row RemoveRow' id=Row" + Id + " ondblclick=EditPRow(" + Id + ") onfocusout=UpdatePRow(" + Id + ")>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:2%'> <input class='jsgrid-button jsgrid-delete-button'  type= button onclick='Rowdelete(" + Id + ")'  title= Delete > </td>" +      //<i class='icon-trash'></i>
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:2%' id=td" + Id + "> " + SlNum + " </td>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <select   class='form-control cnmode'                  style=height:30px;      id='ContMode" + Id + "'      >" + ContMode + "</select>                                                 </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>  <input type='text' class=form-control          style=height:30px;      id='ChequeNo" + Id + "'       value='" + ChequeNumber + "'                                              ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control dtld'  style=height:30px;      id='ChequeDate" + Id + "'     value='" + $('#Chqdt').val() + "'                                         ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <select   class=form-control                   style=height:30px;      id='ContBank" + Id + "'       onchange='GetBranch(" + Id + ")' >" + ContBank + "</select>               </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:7%'>   <input type='text' class='form-control '      style=height:30px;      id='ContBranch" + Id + "'     value='" + $('#ContBranch0').val() + "'                                     ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control '      style=height:30px;      id='Amount" + Id + "'         value=" + RentAmt + "                                                     ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:13%'>   <input type='text' class='form-control '     style=height:30px;      id='Remarks" + Id + "'        value='" + $('#Remarks0').val() + "'                                        ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:5%'> <select   class=form-control                    style=height:30px;      id='RentType" + Id + "'      >" + RentType + "</select>                                                  </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>   <input type='text' class='form-control '      style=height:30px;      id='Account" + Id + "'     onfocus=LoadAccount(" + Id + ")       value=" + $('#AccountId0').val() + "   ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'  style='display:none' >" +
            "<input type='text' class=form-control  id='AccountId" + Id + "'  value=" + $('#AccountId0').val() + " >" +
            "</td></tr>";

        $('#TblContract').append(ProdRow1);
        $('#RentType' + Id).val($('#RentType0').val());
        $('#ContBank' + Id).val($('#ContBank0').val());
        $('#ContMode' + Id).val($('#ContMode0').val());

        var val = $('#ContMode0').val()
        if (val == 1) {           
            $('#ChequeNo' + Id).val('');
            $('#ContBank' + Id).val(0);
            $('#ContBranch' + Id).val('');
            $('#ChequeNo' + Id + ',#ChequeDate' + Id + ',#ContBank' + Id + ',#ContBranch' + Id).prop('disabled', true);
        }

        SlNum++; ItemCount++; Chvar++; vr++;

        var FormattedDate = dateafermonth((document.getElementById('Chqdt').value));
        $('#Chqdt').val(FormattedDate);
        RentAmt = parseFloat((($('#Rent').val() || 0) - ($('#Amount0').val() || 0)) / (TmType-1)).toFixed(Decimal)  
        if (vr == TmType)
        {           
            $('.Addchk').val('');
            $('.Addchksl').each((i, item) => {
                var $item = $(item);
                $item.val($item.find('option:first').val());
            });
            LoadDate(1);
            CalcTotalWeight();

            window.setTimeout(function () {
                if ($('#ChequeNo0').prop('disabled') == false)
                { $('#ChequeNo0').focus(); }
                else { $('#Amount0').focus(); }
            });
            
            GetAcnt();
            Modechange(1);
            Modechange(0);
        }
    }
}

//Edit Grid Details in Popup
function EditPRow(RowId) {
    EditFlag = 1;
}

//Update Seleced row after edit
function UpdatePRow(RowId) {
    try {
        var Chkno = $('#ChequeNo' + RowId).val();

        if (Chkno == "") { Chkno ='a'}

        var Paytype = $('#ContMode' + RowId).val();

        if (($.trim($('#ChequeNo' + RowId).val()) == '') && (Paytype == 0)) {
            warningshow('Please Select ChequeNo', 'ChequeNo' + RowId);
            return false;
        }
        else if (((isNaN(Chkno[Chkno.length - 1]) ? 'a' : Chkno[Chkno.length - 1]) == 'a') && (Paytype == 0)) {
            warningshow('Please Salect a valid Cheque', 'ChequeNo' + RowId);
            return false;
        }
        else if ((($('#ContBank' + RowId).val() || 0) == 0) && (Paytype == 0)) {
            warningshow('Please Salect Bank', 'ContBank' + RowId);
            return false;
        }
        else if (($('#Amount' + RowId).val() || 0) == 0) {
            warningshow('Please Enter Amount', 'Amount' + RowId);
            return false;
        }
        else if ((($('#Account' + RowId).val() == '') || (($('#AccountId' + RowId).val() || 0) == 0)) && (Paytype == 0)) {
            warningshow('Please select a valid Account', 'Account' + RowId);
            return false;
        }
        else if ((moment($("#ChequeDate" + RowId).val(), 'DD/MM/YYYY', true).isValid()) == false) {
            warningshow('Please select a valid Date', 'ChequeDate' + RowId);
        }
        else {
            CalcTotalWeight();
            var Amt = $('#Amount' + RowId).val()
            $('#Amount' + RowId).val(parseFloat(Amt).toFixed(Decimal));
            $('#Warningpopupnew').fadeOut();
            EditFlag = 0;
            return true;
        }
    }
    catch (err) {
        
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
        if ($('#ChequeNo' + j).val() != undefined) {
            $('#td' + j).text(SlNum); 
            SlNum++;
        }
    }
    if ($('#ChequeNo0').prop('disabled') == false)
    { $('#ChequeNo0').focus(); }
    else { $('#Amount0').focus(); }
    CalcTotalWeight();
}


//Total Weight Calculation
function CalcTotalWeight() {
    if ($('.RemoveRow').length == 0)
    {
        $('.botlbl').text('');
        $('#TotalChqAmt').text((0).toFixed(Decimal));
    }    
    else if ($('.RemoveRow').length > 0)
    {
        $('#TotalChqAmt').text('');
        var TotChqAmt = 0; 

        for (var Id = 1; Id < ItemCount; Id++) {
            if ($('#ChequeNo' + Id).val() != undefined) {
                TotChqAmt = parseFloat(TotChqAmt) + parseFloat($('#Amount' + Id).val() || 0);
            }
        }
        $('#TotalChqAmt').text(TotChqAmt.toFixed(Decimal));      
    }    
}


//Check Save conditions
function SaveAndUpdate(Flag) {

    if (($("#ContractNo").val() || 0) == 0) {
        warningshow('Please select Contract Number', 'ContractNo');
    }
    else if ($("#FlatNo").val() =='')  {
        warningshow('Please select Flat', 'FlatNo');
    }
    else if (($("#FlatNoId").val() || 0) == 0) {
        warningshow('Please select a valid Flat', 'FlatNo');
    }
    else if ($("#Premise").val() == '') {
        warningshow('Please select Premise', 'Premise');
    }
    else if (($("#PremiseId").val() || 0) == 0) {
        warningshow('Please select a valid Premise', 'Premise');
    }
    else if ($.trim($("#Subject").val()) == '') { 
        warningshow('Please Enter Subject', 'Subject');
    }
    else if (($("#Rent").val() || 0) == 0) { 
        warningshow('Please Enter Rent', 'Rent');
    }
    else if ($("#Tenant").val() == '') {
        warningshow('Please select Tenant', 'Tenant');
    }
    else if (($("#TenantId").val() || 0) == 0) {
        warningshow('Please select a valid Tenant', 'Tenant');
    }
    else if ((moment($("#FromPeriod").val(), 'DD/MM/YYYY', true).isValid()) == false) { 
        warningshow('Please select a valid Date', 'FromPeriod'); 
    }
    else if ((moment($("#ToPeriod").val(), 'DD/MM/YYYY', true).isValid()) == false) {
        warningshow('Please select a valid Date', 'ToPeriod'); 
    }
    else if ($('.RemoveRow').length == 0)
    {
        warningshow('Please Add Cheque Details', 'ChequeNo0'); 
    }
    else {
        if (Flag == 1) { $('#Confirmflag').val('Save'); }
        else { $('#Confirmflag').val('Update'); }

        var Msg = 'Do You Want To ' + $('#Confirmflag').val() + '?';
        var Rentamt = 0;

        for (var j = 1; j <= ItemCount; j++) 
        {
            if ($("#RentType" + j).val() != undefined)
            {
                if ($("#RentType" + j).val() == 1)
                { Rentamt = parseFloat(Rentamt) + parseFloat($("#Amount" + j).val()); }
            }
            if(j==ItemCount)
            {
            if (parseFloat($("#Rent").val()) != parseFloat(Rentamt).toFixed(Decimal))  
            { Msg = '';Msg += 'Rent and Installment Amt is not equal.Do You Want To ' + $('#Confirmflag').val() + '?'; } 
      
            CheckEditRow(Msg);
            }
        }
        
    }
}

function CheckEditRow(Msg) {
    for (var j = 1; j < ItemCount; j++)
    {
        var sts = 'true';
        if ($('#ContMode'+j).val() != undefined)
        {
         sts = UpdatePRow(j);
        }
        
        if (sts == false)
        {
            return UpdatePRow(j);
            break;
        }      
        if (j ==( ItemCount-1))
        {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#ConfirmRowId').val(0);
            $('#confirmmessage').text(Msg);
        }
    }
}

//Save 
function SaveandUpdateContract(flg) {

    $('#Loadingsave').show(); 
    $('#btnsubmit,#btnupdate').prop('disabled', true);

    var oArray = new Array();
    for (var k = 1; k < ItemCount; k++) {

        var ContractNo = $('#ContractNo').val();
        var ContDate = $('#ContDate').val();
        var FlatNo = $('#FlatNoId').val();
        var DEWANo = $('#DEWANo').val();
        var Premise = $('#PremiseId').val();
        var Subject = $('#Subject').val();
        var Rent = $('#Rent').val();
        var Deposit = $('#Deposit').val();
        var Tenant = $('#TenantId').val();
        var ContPeriod = $('#ContPeriod').val();
        var FromPeriod = $('#FromPeriod').val();
        var ToPeriod = $('#ToPeriod').val();
        
        if ($('#PaymentTerms').is(':visible'))
          var PaymentTerms =   $('#PaymentTerms').val()||0; 
        else if ($('#YearlyTerms').is(':visible'))
          var PaymentTerms = $('#YearlyTerms').val()||0;
         
        var Observations = $('#Observations').val();
        var ContDocument = $('#ContDocument').val();
        var TotalChequeAmt = $('#TotalChqAmt').text();
        var TotalOtherCost = $('#TotalOtherAmt').text(); 
        var ContMode = $('#ContMode' + k).val();
        var ChequeNo = $('#ChequeNo' + k).val();
        var ChequeDate = $('#ChequeDate' + k).val();
        var ContBank = $('#ContBank' + k).val();
        var ContBranch = $('#ContBranch' + k).val();
        var Amount = $('#Amount' + k).val();
        var Remarks = $('#Remarks' + k).val();
        var RentType = $('#RentType' + k).val();
        var Account = $('#AccountId' + k).val();
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var CurrentDate = '';
        var Status = '';
        var Flag = 1;
        var DelFlag = Flag;

        if (ChequeNo != undefined) {
            oArray.push({
                'ContractNo': ContractNo,
                'ContDate': ContDate,
                'FlatNo': FlatNo,
                'DEWANo': DEWANo,
                'Premise': Premise,
                'Subject': Subject,
                'Rent': Rent,
                'Deposit': Deposit,
                'Tenant': Tenant,
                'ContPeriod': ContPeriod,
                'FromPeriod': FromPeriod,
                'ToPeriod': ToPeriod,
                'PaymentTerms': PaymentTerms,
                'Observations': Observations,
                'ContDocument': ContDocument,
                'TotalChequeAmt': TotalChequeAmt,
                'TotalOtherCost': TotalOtherCost,
                'ContMode': ContMode,
                'ChequeNo': ChequeNo,
                'ChequeDate': ChequeDate,
                'ContBank': ContBank,
                'ContBranch': ContBranch,
                'Amount': Amount,
                'Remarks': Remarks,
                'RentType': RentType,
                'Account': Account,
                'DeptId': DeptId,
                'UserId': UserId,
                'CurrentDate': CurrentDate,
                'Status': Status,
                'Flag': Flag,
                'DelFlag': DelFlag,
            })
        }
    }
    for (var m = 1; m <= rowcount - 1; m++) {
        $('#UploadDocumentId' + m).val($('#UploadDocument' + m).val());        
    }
    console.log(oArray)
    if (oArray != "") {

        if (flg == 1) {
            console.log('if')//Save 
            var data = { 'Contract': oArray };
            $.ajax(
            {
                type: "POST",
                url: "../Realestate/ContractEntryInsert",
                data: data,
                success: function (result) {
                    $('#btnsubmit,#btnupdate').prop('disabled', false);
                    $('#Loadingsave').hide();
                    var status = result.oList[0].Status;
                    var ContractNo = result.oList[0].ContractNo;
                    $('#SavedVocno').val(ContractNo);

                    if (status == 1) {
                        DocumentInsertandUpdate(ContractNo, status, flg);
                        if ($(".RemoveRowOt").length > 0) {
                            var bArray = new Array();
                            for (var i = 1; i < ItemCountOt; i++) {
                                var OCId = 0; 
                                var SlNo = ContractNo;
                                var InvoDate = $('#ContDate').val();
                                var PayType = $('#Type' + i).val();
                                var AccId = $('#OtherAccId' + i).val();
                                var Description = $('#OtherRemarks' + i).val() ;
                                var CurrencyId = 1;
                                var CurrencyRate = 1;
                                var OCAmount = parseFloat($('#OtherAmount' + i).val());
                                var OCFCAmount = parseFloat($('#OtherAmount' + i).val());
                                var JobCode = 0;
                                var UserId = ERPUserId;
                                var DepartmentId = ERPDeptId;
                                var DelFlag = 1;

                                if ((AccId != undefined)) {
                                    bArray.push({
                                        'OCId': OCId,
                                        'SlNo': SlNo,
                                        'InvoDate': InvoDate,
                                        'PayType': PayType,
                                        'AccId': AccId,
                                        'Description': Description,
                                        'OCAmount': OCAmount,
                                        'OCFCAmount': OCFCAmount,
                                        'JobCode': JobCode,
                                        'CurrencyId': CurrencyId,
                                        'CurrencyRate': CurrencyRate,
                                        'UserId': UserId,
                                        'DepartmentId': DepartmentId,
                                        'DeleteFlag': DelFlag
                                    })
                                }
                            }
                            console.log(bArray)
                            if (bArray != "") {
                                var data = { 'PurchaseInvoiceModel': bArray };
                                $.ajax({
                                    type: "POST",
                                    url: "../Realestate/OtherTransactionInsertandUpdate",
                                    data: data,
                                    success: function (result) {
                                        Showalerts(status, ContractNo);
                                    }
                                });
                            }
                        }
                        else {
                            Showalerts(status, ContractNo);
                        }
                    }
                    else {
                        Showalerts(status, ContractNo);
                    }
                }
            });
        }
        else if (flg == 2)                                            //Update  
        {
            console.log('else')
            var data = { 'Contract': oArray };
            $.ajax(
            {
                type: "POST",
                url: "../Realestate/ContractEntryUpdate", 
                data: data,
                success: function (result) {
                    $('#btnsubmit,#btnupdate').prop('disabled', false);
                    $('#Loadingsave').hide();
                    var status = result.oList[0].Status;
                    var ContractNo = result.oList[0].ContractNo;
                    $('#SavedVocno').val(ContractNo);

                    if (status == 2) {
                        DocumentInsertandUpdate(ContractNo, status, flg);
                        if ($(".RemoveRowOt").length > 0) {
                            var bArray = new Array();
                            for (var i = 1; i < ItemCountOt; i++) {
                                var OCId = 0;
                                var SlNo = ContractNo;
                                var InvoDate = $('#ContDate').val();
                                var PayType = $('#Type' + i).val();
                                var AccId = $('#OtherAccId' + i).val();
                                var Description = $('#OtherRemarks' + i).val();
                                var CurrencyId = 1;
                                var CurrencyRate = 1;
                                var OCAmount = parseFloat($('#OtherAmount' + i).val());
                                var OCFCAmount = parseFloat($('#OtherAmount' + i).val());
                                var JobCode = 0;
                                var UserId = ERPUserId;
                                var DepartmentId = ERPDeptId;
                                var DelFlag = 1;

                                if ((AccId != undefined)) {
                                    bArray.push({
                                        'OCId': OCId,
                                        'SlNo': SlNo,
                                        'InvoDate': InvoDate,
                                        'PayType': PayType,
                                        'AccId': AccId,
                                        'Description': Description,
                                        'OCAmount': OCAmount,
                                        'OCFCAmount': OCFCAmount,
                                        'JobCode': JobCode,
                                        'CurrencyId': CurrencyId,
                                        'CurrencyRate': CurrencyRate,
                                        'UserId': UserId,
                                        'DepartmentId': DepartmentId,
                                        'DeleteFlag': DelFlag
                                    })
                                }
                            }
                            console.log(bArray)
                            if (bArray != "") {
                                var data = { 'PurchaseInvoiceModel': bArray };
                                $.ajax({
                                    type: "POST",
                                    url: "../Realestate/OtherTransactionInsertandUpdate",
                                    data: data,
                                    success: function (result) {
                                        Showalerts(status, ContractNo);
                                    }
                                });
                            }
                        }
                        else {
                            Showalerts(status, ContractNo);
                        }
                    }
                    else {
                        Showalerts(status, ContractNo);
                    }
                }
            });
        }

    }
   
}

//Copy Function
function GetRows()
{
    formrefresh(3);
    CopyFlag = 1;
    $('#ContractNo,#btnsubmit,#btncopy,#MultipleUpload').hide();
    $('#CopyDiv').show();
    $('.form-control:not(.EnbTxt),.btn-outline-primary:not(#btnnew,#AddPdct)').prop('disabled', true);
    $('#ContractNoCopy').focus().select(); 
}

//Get Previous or next Cont No Copy
function GetPrevNextContNo(Flag)
{    
    var curretNo = parseInt($('#CurrentContNo').val());
    var ContNo = parseInt($('#ContractNoCopy').val());
    var NewVocNum = ContNo + Flag;

    formrefresh(3);
   
    console.log('curretNo' + curretNo) 
    console.log('ContNo' + ContNo)
    console.log('NewVocNum' + NewVocNum)

    if ($('#ContractNoCopy').val() != '')
    {
        if (NewVocNum == (curretNo + 1)) {
            console.log('if')
            $('#ContractNoCopy').val(curretNo).select();
        }
        else {
            console.log('else')
            if (NewVocNum == 0) { console.log('1'); $('#ContractNoCopy').val(1).select(); }
            else { console.log('2'); $('#ContractNoCopy').val(NewVocNum).select(); }
            GetContNo($('#ContractNoCopy').val(), ERPDeptId);
        }
    }
    else
    {
        if (Flag == -1) { $('#ContractNoCopy').val(1); }
        else if (Flag == 1) { $('#ContractNoCopy').val(curretNo-1); } 
        GetContNo($('#ContractNoCopy').val(), ERPDeptId); 
    }
}

//Cont No Get function call
function GetContNo(ContNo, DeptId)
{
    var data = {};
    data.ContractNo = ContNo;
    data.DeptId = DeptId;
    data.UserId = ERPUserId;
    data.Status = '';
    $.ajax({
        type: "POST",
        url: "../Realestate/ContractEntryGetandGets", 
        data: data,
        success: function (result) {           
            ContractGetandGets(result.oList);
        }
    });
}

//Contract Load Data
function ContractGetandGets(result) {

    if (result.length > 0) {
        $('#btnprint').show();

        if (result[0].DeptId == ERPDeptId)
        {
            $('#btnedit,#btndelete,#btnuploaddoc').show();

            if (result[0].Flag == 0) { $('#btnclose').hide(); }
            else { $('#btnclose').show(); }

        }
        else
        { $('#btnedit,#btndelete,#btnclose,#btnuploaddoc').hide(); }

        $('#ContractNoCopy').val(result[0].ContractNo);
        $('#ContDate').val(result[0].ContDate);
        $('#FlatNoId').val(result[0].FlatNo);
        $('#FlatNo').val(result[0].FlatNumber);
        $('#DEWANo').val(result[0].DEWANo);
        $('#PremiseId').val(result[0].Premise);
        $('#Premise').val(result[0].NameofBuilding);
        $('#Subject').val(result[0].Subject);
        $('#Rent').val(parseFloat(result[0].Rent).toFixed(Decimal));
        $('#Deposit').val(parseFloat(result[0].Deposit).toFixed(Decimal));

        $('#TotalDeposit').text(parseFloat(result[0].Deposit).toFixed(Decimal)); 
        $('#TotalRent').text(parseFloat(result[0].Rent).toFixed(Decimal));

        $('#TenantId').val(result[0].Tenant);
        $('#Tenant').val(result[0].TenantName);
        $('#ContPeriod').val(result[0].ContPeriod);
        $('#FromPeriod').val(result[0].FromPeriod);
        $('#ToPeriod').val(result[0].ToPeriod);

        $('#TenantAddress1').val(result[0].TenantAddress1);
        $('#TenantAddress2').val(result[0].TenantAddress2);
        $('#TenantAddress3').val(result[0].TenantAddress3);
        $('#TenantPOBOXNo').val(result[0].TenantPOBOXNo);
        $('#TenantEmail').val(result[0].TenantEmail);
        $('#TenantPhone').val(result[0].TenantPhone);
        $('#TenantEMRID').val(result[0].TenantEMRID);

        if ($('#PaymentTerms').is(':visible'))
            $('#PaymentTerms').val(result[0].PaymentTerms);
        else if ($('#YearlyTerms').is(':visible'))
            $('#YearlyTerms').val(result[0].PaymentTerms); 
        
        $('#Observations').val(result[0].Observations);
        $('#ContDocument').val(result[0].ContDocument);
        $('#TotalChqAmt').text(parseFloat(result[0].TotalChequeAmt).toFixed(Decimal));
        $('#TotalOtherAmt').text(parseFloat(result[0].TotalOtherCost).toFixed(Decimal));

        if (result[0].Flag == 1)
        {
            $('.stdiv').css('background-color', '#009da0'); 
            $('#ConStatus').text('Open');
        }
        else if (result[0].Flag == 0)
        {
            $('.stdiv').css('background-color', '#FF586B');
            $('#ConStatus').text('Closed');
        }
           
        $('.stdiv').show();
       

        for (var i = 0; i < result.length; i++) {
            var Id = parseInt(ItemCount);
            SlNum = Id;

            var PDCStatus = "";

            if ((result[i].PDCStatus).toUpperCase() == 'O') { PDCStatus = 'PDCOPEN' } else if ((result[i].PDCStatus).toUpperCase() == 'C') { PDCStatus = 'PDCCLOSED' } else { PDCStatus = '' }


            var ProdRow1 =
               "<tr class='jsgrid-header-row RemoveRow' id=Row" + Id + " ondblclick=EditPRow(" + Id + ") onfocusout=UpdatePRow(" + Id + ")>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:2%'> <input class='jsgrid-button jsgrid-delete-button' disabled=''  type= button onclick='Rowdelete(" + Id + ")'  title= Delete > </td>" +      //<i class='icon-trash'></i>
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:2%' id=td" + Id + "> " + SlNum + " </td>" +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <select   class='form-control clrwhit cnmode'                   style='height:30px'  disabled=''   id='ContMode" + Id + "'      >" + ContMode + "</select>                                                 </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left " + PDCStatus + "'   style='width:6%'>  <input type='text' class='form-control clrwhit'          style='height:30px'  disabled=''   id='ChequeNo" + Id + "'       value='" + result[i].ChequeNo + "'                                              ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control dtld clrwhit'  style='height:30px;'  disabled=''   id='ChequeDate" + Id + "'     value='" + result[i].ChequeDate + "'                                         ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>  <select   class='form-control clrwhit'                   style='height:30px;'  disabled=''   id='ContBank" + Id + "'       onchange='GetBranch(" + Id + ")' >" + ContBank + "</select>               </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:7%'>   <input type='text' class='form-control clrwhit'      style='height:30px;'  disabled=''   id='ContBranch" + Id + "'     value='" + result[i].ContBranch + "'                                     ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:6%'>   <input type='text' class='form-control clrwhit'      style='height:30px;'  disabled=''   id='Amount" + Id + "'         value=" + parseFloat(result[i].Amount).toFixed(Decimal) + "            ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:13%'>   <input type='text' class='form-control clrwhit'     style='height:30px;'  disabled=''   id='Remarks" + Id + "'        value='" + result[i].Remarks + "'                                        ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:5%'> <select   class='form-control clrwhit'                   style='height:30px;'  disabled=''   id='RentType" + Id + "'      >" + RentType + "</select>                                                  </td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'   style='width:8%'>   <input type='text' class='form-control clrwhit'      style='height:30px;'  disabled=''   id='Account" + Id + "'     onfocus=LoadAccount(" + Id + ")       value=" + result[i].Account + "   ></td> " +
            "<td class='jsgrid-cell  jsgrid-align-left'  style='display:none' >" +
            "<input type='text' class=form-control  id='AccountId" + Id + "'  value=" + result[i].Account + " >" +
            "</td></tr>";
            $('#TblContract').append(ProdRow1);
            $('#RentType' + Id).val(result[i].RentType);
            $('#ContBank' + Id).val(result[i].ContBank);
            $('#ContMode' + Id).val(result[i].ContMode); 
            SlNum++;
            ItemCount++;
        }
        $("#ContractNoCopy").focus().select();
        $('.clrwhit').css('background-color', 'white');

        $('.PDCCLOSED').css('background-color', '#0CC27E');
        $('.PDCOPEN').css('background-color', '#FF8D60');
        //$('.PDCCLOSED').css('color', 'white');
        //$('.PDCOPEN').css('color', 'white');
        
        OtherTranSGets(result[0].ContractNo, result[0].DeptId);
        Modechange(0);
    }
    else { $('#btnedit,#btndelete,#btnprint,#btnclose,#btnuploaddoc').hide(); warningshow('No Data Found', 'ContractNoCopy') }
    CalcTotalWeight();
}

//Check Edit or Delete 
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
        if (Flag == 1) { Operation = 'Contract Update'; }
        else if (Flag == 0) { Operation = 'Contract Delete'; } 
        else { Operation = 'Contract Close'; }   
        var data = {};
        data.UserId    = ERPUserId;
        data.OTP       = $("#txtotp").val();
        data.Remarks   = $('#otpremarks').val();
        data.Operation = Operation;
        data.DeptId    = ERPDeptId;
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
function OTPCheck(Status, Flag) {          //Flag=1: Edit and Update Contract  ,Flag=0:Delete Contract   , Flag=2:Close Contract 
    
    if (Status == 1) {
        $('#OTPDiv').hide(); $('#txtotp,#otpremarks,#otptype').val('');
        if (Flag == 1) { EditContract();   }
        else { DeleteContract(Flag); } 
    }
    else {
        warningshow('Invalid OTP', 'txtotp');
        $("#txtotp").select();
    }
}

//Edit Contract function
function EditContract()
{
    $('.clrwhit').css('background-color', '');
    Updateflag = 1; CopyFlag = 0;
    $('#ContractNo').val($('#ContractNoCopy').val());
    $('#btndelete,#btnedit,#CopyDiv,#btnprint,#btnclose').hide();
    $('#ContractNo,#btnupdate,#AddPdct,#MultipleUpload').show();
    $('.form-control:not(.EnbTxt),.jsgrid-delete-button').prop('disabled', false);
    $('.btn-outline-primary').prop('disabled', false);
    $('#FlatNo').focus().select();
    $('.stdiv').hide();

    Modechange(1);
}

//Delete Contract function
function DeleteContract(Flag) {      //Flag=0:Delete Contract   , Flag=2:Close Contract  

    $('#Loadingsave').show();
    $('#btndelete,#btnclose').prop('disabled', true);
  var data = {};
  data.ContractNo = $('#ContractNoCopy').val(); 
  data.DeptId = ERPDeptId; 
  data.UserId = ERPUserId;
  data.Status = Flag;
  data.ContDate = CurDate; 
  $.ajax({
      type: "POST",
      url: "../Realestate/ContractEntryDelete", 
      data: data,
      success: function (result) {
          $('#btndelete,#btnclose').prop('disabled', false);
          $('#Loadingsave').hide();
          var status = result.oList[0].Status;
          var ContractNo = result.oList[0].ContractNo;  
          $('#SavedVocno').val(ContractNo);
          Showalerts(status, ContractNo);
          if (Flag==2) {
              $('.stdiv').css('background-color', '#FF586B');
              $('#ConStatus').text('Closed');
              $('#btnclose').hide();
          }
      }
      });   
}

//Print
function confirmprint() {
    if ($('#TblContract tr').length > 0) {
        $('#CustomPrint').show();
        $('#btncustprnt').focus();
    }
    else {
        warningshow('Please select a Contract No. to print', 'ContractNoCopy');
        $('#ContractNoCopy').select();
    }
}

function PrintBill(flg) {
    $('#CustomPrint').hide();
    $("#custom1").prop("checked", true);
    if (flg == 1) {
        if (ContractBillType == 'DEFAULT') {
            PrintthisBillWindows('CONTRACT', ItemCount, 'CONTRACTRENTCOPY');
        }
    }
    else if (flg == 2) {
        if (ContractBillType == 'DEFAULT') {
            PrintthisBillWindows('CONTRACT', ItemCount, 'CONTRACTSDCOPY');
        }
    }
}

function AddNewBankDetails(Flag) {
    if ($('#NewBankCode').val() == "") {
        warningshow('Please Enter Code', 'NewBankCode');
    }
    else if ($('#NewBankName').val() == "") {
        warningshow('Please Enter Name', 'NewBankName');
    }
    else {
        var data = {};   //array
        data.BankId = 0;
        data.BankCode = $('#NewBankCode').val();
        data.BankName = $('#NewBankName').val();
        data.ZipCode = "";
        data.Branch = $('#NewBankBranch').val();
        data.Address1 = $('#NewBankAddress').val();
        data.Address2 = "";
        data.Address3 = "";
        data.PhoneNo = "";
        data.Email = "";
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/BankInsertandUpdate",
            data: data,
            success: function (result) {
                    var status = result.oList[0].Status; 
                    var BankId = result.oList[0].BankId;
                    ShowalertsforBank(status,BankId);
            }
        });
    }
}

function ShowalertsforBank(Status,Id) {
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
        $('#popupdiv').hide();
        var data = {};
        data.BankId = 0;
        $.ajax({
            type: "POST",
            url: "../Master/BankGetandGets",
            data: data,
            success: function (result) {
                BankLoad(result.oList, Id); 
            }
        });
        $('.ClearDet').val('');
        $('#NewBankCode').focus()
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }

}


function Defaultfocus() {
    if (CopyFlag == 0)
    { $('#FlatNo').focus().select(); }
    else if (CopyFlag==1)
    { $('#ContractNoCopy').focus().select(); } 
}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function Clear(Flag) {                                      //Flag:0 - Confirm be4 New  , Flag:1 - Confirm be4 Copy
    if (($('.RemoveRow').length > 0) && (CopyFlag==0)) 
    {
        $('#confirm').show();
        if (Flag == 0)
        { $('#Confirmflag').val('Clear'); }
        else if (Flag == 1)
        { $('#Confirmflag').val('Copy'); }
        $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do You Want To Continue?');
        $('#confirmOk').focus();
    }
    else
    {
        if (Flag == 0)
        { formrefresh(0); }
        else if(Flag == 1) 
        { GetRows(); } 
    }
}

function formrefresh(flag) { 

    if ((flag == 0) || (flag == 1))                                            //flag=0 : Normal form refresh  , flag=1 : after save  , flag=3  : Clear before each salesgets     
    {
        CopyFlag = 0; ProdFlag = 0; Updateflag = 0;
        $('.form-control:not(.EnbTxt),.btn-outline-primary').prop("disabled", false);
        Serialnoload();

        $('#ContractNo,#btnsubmit,#btncopy,#AddPdct,#MultipleUpload').show();
        $('#CopyDiv').hide(); 

        if (flag == 0) { Defaultfocus(); }
    }
     
    ItemCount = 1; SlNum = 1; EditFlag = 0; SlNumOt = 1; ItemCountOt = 1; 

    $('.RemoveRow,.RemoveRowOt').remove();
   
    $('.form-control:not(.AvoidClear)').val('');
    RentLoad(2);
    
    $('#RowCount').val(1);
   

    CalcTotalWeight(); OtherTranTotCalc(0);

    $('select').each((i, item) => {
        var $item = $(item);
        $item.val($item.find('option:first').val());
    });
    
    LoadDate(0);

    $('#btnedit,#btndelete,#btnupdate,#btnprint,#btnclose,#btnuploaddoc').hide();

    $('#Warningpopupnew').fadeOut();

    if (flag != 3)
    { Serialnoload(); }
    $('.stdiv').hide();

    TermsType();
    GetAcnt();
   // CommonLoad(1);
}

function ConfirmboxResult(Result, status, Rowid) {
    if (Result == 'true' && status == 'Clear')
    {
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'Copy') {
        GetRows(); 
    }   
    else if (Result == 'true' && status == 'DeleteRow') {
        Rowdeleteconfirm(Rowid);
    }
    else if (Result == 'false' && status == 'DeleteRow') {
        $("#AddPdct").focus(); 
    }
    else if (Result == 'true' && status == 'Save') {
        SaveandUpdateContract(1);
    }
    else if (Result == 'true' && status == 'Update') {
        SaveandUpdateContract(2); 
    }
    else if (Result == 'true' && status == 'Docdelete') {
        $("#RemoveCheck").val('YES');
        EditUplodedImages(0, 0, 0, Rowid, 0, 0);
        
    }
    else if (CopyFlag==0)
    { $('#Customer').focus().select(); }
    else 
    { $('#VoucherNoCopy').focus().select(); }

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

function Showalerts(Status,VocNo) {
    if (Status == 1) {
        formrefresh(1); 
        swal('Contract No - ' + VocNo, " Saved Successfully", "success");               
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 2) {
        formrefresh(1);
        swal('Contract No - ' + VocNo, " Updated Successfully", "success");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 3) {
        swal('Contract No - ' + VocNo, " Deleted!", "error");
        formrefresh(3);
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 4) {
        swal('Contract No - ' + VocNo, " Not Exists!", "error");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 6) {       
        swal('Contract No - ' + VocNo, " already exists", "warning");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 5) {
        swal('Contract No - ' + VocNo, " saving failed.Try again!", "error");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 7) { 
        swal('Contract No - ' + VocNo, " Closed", "error");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 8) {
        swal('File Removed', "", "error");
        $('.swal-button swal-button--confirm').focus();
       // $('#HiddenContractaNo,#HiddenDocId,#HiddenDocuName,#HiddenTableId').val('');

    }
}

function addCommas(x, flg) {
    var amt = x || 0;
    return amt;
}


//------------------------------------File Upload------------------------------------
function checkupload()
{
    var fi = document.getElementById('files1');
    
    if ($('#UploadDocument1').val() == 0) 
    {
        warningshow('Please Select document Type', 'UploadDocument1');
    }
    else if(fi.files.length==0)   
    {
        warningshow('Please Select document', 'files1');
    }   
    else
    {
        swal('Document Uploaded Successfully', '', 'success');
        $('#Uploadpopupdiv').hide();
    }
}

function AddUploadDiv(type, id) {
    var id = parseInt(rowcount);
    var newrow = '<div class="px-3"><div class="row adddelrow" id="' + id + '">' +
                        '<label class="col-md-2" style="font-weight:bold;">Doc Type</label>' +
                        '<div class="col-md-3">' +
                            '<select id="UploadDocument' + id + '" class="form-control slfile" onchange=Checkdup(' + id + ')>' + DocSelect + '</select><input id="UploadDocumentId' + id + '" style="display:none"/>' +
                        '</div>' +
                        '<label class="col-md-2" style="font-weight:bold;">Document</label>' +
                        '<div class="col-md-4">' +
                            '<input type="file" id="files' + id + '" class="btn btn-lg gradient-back-to-earth font-small-2 white p-2 mr-2" name="files[]" multiple accept="image/*,application/pdf,application/vnd.ms-excel"/>' +
                        '</div>' +
                    '</div></div>';

    if (type == 1) {
        $('#MainDivseq').append(newrow);
        rowcount++;
        $('#RowCount').val(parseInt($('#RowCount').val()) + 1);
    }
}

function Checkdup(id)
{
  
        for (var i = 1; i < rowcount; i++) {
            var a = parseInt($('#UploadDocument' + i).val());
            var b = parseInt($('#UploadDocument' + id).val());
            if ((id != i) && (a == b) && (a != 0) && (b!=0)) {
                $('#UploadDocument' + id).val(0);
                warningshow('Document already selected', 'UploadDocument'+id); 
            }
        }
    
}

function ViewMyFiles() {
    var data = {};
    data.ContractNo = $('#ContractNoCopy').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Realestate/ContractDocumentGetandGets",
        data: data,
        success: function (result) {
            DocumentPopupList(result.oList);
        }
    });
}

function DocumentPopupList(result) {
   // disable_datatable('tbldocumentlist');
    var responseText = "";
    var RowDocCount = 0;
    var filenamenews = "";
    var ListTableCount = 0;
    for (var i = 0; i < result.length; i++) {
        for (var d = i + 1; d <= i + 1; d++) {
            $('#UploadDocument' + d).val(result[i].DocTypeId);
        }
        var Typeidval = i + 1;
        var filenamenew = new Array();
        var CurrentDocId = result[i].ContractNo;
        var IdDocTypeId = result[i].DocTypeId;
        $('#UploadDocumentId' + Typeidval).val(result[i].DocTypeId)
        var IdDocType = result[i].IdType;
        var ConDocId = result[i].ConDocID;
        var names = result[i].ContDocument;
        filenamenew = names.split(',');
        var slno = 0;
        var Finalvalue = "";
        var extension = "";
        var finalresult = new Array();
        var slnos = 0;
        var currfinalresult = "";
        for (var j = 0; j < filenamenew.length; j++) {
            if (IdDocTypeId == IdDocTypeId) {
                extension = (filenamenew[j]).split(".").pop().toLowerCase()
                Finalvalue = result[i].FolderName + '.' + extension;
                finalresult.push(Finalvalue);
                currfinalresult = finalresult[j];
                slnos = j + 1;
                if (extension == 'png') {
                    var newrow = '<a style="" )>' + filenamenew[j] + '</a></br>'
                    responseText += '<tr id="' + ListTableCount + '">' +
                        '<td align=center><img src="../ProjectImages/Employee/IconImages/imagepng.jpg" style="width:50px;height:40px" />' +
                        '<input type="hidden" id="NConDocId_' + ListTableCount + '" value="' + ConDocId + '" />' +
                        '<input type="hidden" id="NCurrentDocId_' + ListTableCount + '" value="' + CurrentDocId + '" />' +
                        '<input type="hidden" id="Ncurrfinalresult_' + ListTableCount + '" value="' + currfinalresult + '" />' +
                        '<input type="hidden" id="Nslnos_' + ListTableCount + '" value="' + slnos + '" />' +
                        '<input type="hidden" id="IdDocTypeId_' + ListTableCount + '" value="' + IdDocTypeId + '" />' +
                        '</td>' +
                        '<td id="D' + ListTableCount + '">' + newrow + '</td>' +
                        '<td>' + IdDocType + '</td>' +
                        '<td id="T' + ListTableCount + '" style=display:none>' + IdDocTypeId + '</td>' +
                        '<td align=center><a onclick=ViewDocuments(\'' + CurrentDocId + '\',\'' + currfinalresult + '\')>' + DownloadButtton + '</a></td>' +
                        '<td class="hidtd" align=center><a onclick=EditUplodedImages(\'' + CurrentDocId + '\',\'' + currfinalresult + '\',\'' + slnos + '\',\'' + ListTableCount + '\',\'' + IdDocTypeId + '\',\'0\')>' + DeleteButton + '</a></td>' +
                        '</tr>';
                }
                else if (extension == 'pdf') {
                    var newrow = '<a style="" )>' + filenamenew[j] + '</a></br>'
                    responseText += '<tr id="' + ListTableCount + '">' +
                        '<td  align=center><img src="../ProjectImages/Employee/IconImages/imagepdf.jpg" style="width:50px;height:40px" />' +
                        '<input type="hidden" id="NConDocId_' + ListTableCount + '" value="' + ConDocId + '" />' +
                        '<input type="hidden" id="NCurrentDocId_' + ListTableCount + '" value="' + CurrentDocId + '" />' +
                        '<input type="hidden" id="Ncurrfinalresult_' + ListTableCount + '" value="' + currfinalresult + '" />' +
                        '<input type="hidden" id="Nslnos_' + ListTableCount + '" value="' + slnos + '" />' +
                        '<input type="hidden" id="IdDocTypeId_' + ListTableCount + '" value="' + IdDocTypeId + '" />' +
                        '</td>' +
                        '<td id="D' + ListTableCount + '">' + newrow + '</td>' +
                        '<td>' + IdDocType + '</td>' +
                        '<td id="T' + ListTableCount + '" style=display:none>' + IdDocTypeId + '</td>' +
                        '<td align=center><a onclick=ViewDocuments(\'' + CurrentDocId + '\',\'' + currfinalresult + '\')>' + DownloadButtton + '</a></td>' +
                        '<td class="hidtd" align=center><a onclick=EditUplodedImages(\'' + CurrentDocId + '\',\'' + currfinalresult + '\',\'' + slnos + '\',\'' + ListTableCount + '\',\'' + IdDocTypeId + '\',\'0\')>' + DeleteButton + '</a></td>' +
                        '</tr>';
                }
                else {
                    var newrow = '<a style="" )>' + filenamenew[j] + '</a></br>'
                    responseText += '<tr id="' + ListTableCount + '">' +
                        '<td  align=center><img src="../ProjectImages/Employee/IconImages/imageexcel.png" style="width:50px;height:40px" />' +
                        '<input type="hidden" id="NConDocId_' + ListTableCount + '" value="' + ConDocId + '" />' +
                        '<input type="hidden" id="NCurrentDocId_' + ListTableCount + '" value="' + CurrentDocId + '" />' +
                        '<input type="hidden" id="Ncurrfinalresult_' + ListTableCount + '" value="' + currfinalresult + '" />' +
                        '<input type="hidden" id="Nslnos_' + ListTableCount + '" value="' + slnos + '" />' +
                        '<input type="hidden" id="IdDocTypeId_' + ListTableCount + '" value="' + IdDocTypeId + '" />' +
                        '</td>' +
                        '<td id="D' + ListTableCount + '">' + newrow + '</td>' +
                        '<td>' + IdDocType + '</td><td id="T' + ListTableCount + '" style=display:none>' + IdDocTypeId + '</td>' +
                        '<td align=center><a onclick=ViewDocuments(\'' + CurrentDocId + '\',\'' + currfinalresult + '\')>' + DownloadButtton + '</a></td>' +
                        '<td class="hidtd" align=center><a onclick=EditUplodedImages(\'' + CurrentDocId + '\',\'' + currfinalresult + '\',\'' + slnos + '\',\'' + ListTableCount + '\',\'' + IdDocTypeId + '\',\'0\')>' + DeleteButton + '</a></td>' +
                        '</tr>';
                }
                ListTableCount++;
                slno++;
            }
            else {
                slno = 0;
            }
        }
    }
    $('#tbldocumentlist').html(responseText + '');
    if(CopyFlag==0)
    $('.hidtd').removeClass('hidtd');
}

function ViewDocuments(DocumentId, CntFile) {
    var flname = '../ProjectImages/Contract/' + DocumentId + '/' + CntFile;
    window.open(flname);
}

var Typearray = new Array();
var ArrayiD = new Array();
var Finalarray = new Array();




function EditUplodedImages(empId, DocumentName, slnos, ListTableCount, IdDocTypeId,ContractIds) {


    var ContractId = $("#NConDocId_" + ListTableCount).val();
  
    if ($("#RemoveCheck").val() == 'NO') {
        DeleteUploadFile(ListTableCount);
    }
    else {
        var data = {};
        data.DocumentId = $("#NCurrentDocId_" + ListTableCount).val();
        data.DocumentName = $("#Ncurrfinalresult_" + ListTableCount).val();
        
        $.ajax({
            type: "POST",
            url: "../Realestate/RemoveExistingContractDocument",
            data: data,
            success: function (result) {
                //  $('#HiddenContractaNo,#HiddenDocId,#HiddenDocuName,#HiddenTableId').val('');
                $('#HiddenContractaNo').val(empId);
                $('#HiddenDocId').val($('#T' + slnos).text());
                $('#HiddenDocuName').val($('#D' + slnos).text());
                $('#HiddenTableId').val(ListTableCount);
                FileRemoval(ContractId);
                $("#RemoveCheck").val('NO')
            }
        });
    }


}

function DocumentInsertandUpdate(ContractNo, Status, flg) {
    var FolderContractNo = ContractNo;
    var FolderStatus = Status;
    var DArray = new Array();
    var maxofId = $('#MaxFolderName').val();
    var d = 0;
    for (var k = 1; k <= rowcount - 1; k++) {
        var typeidval = $('#UploadDocumentId' + k).val();
        var fi = document.getElementById('files' + k);

        if ((fi.files.length > 0) && (typeidval!=0)) 
        {
            for (var i = 0; i <= fi.files.length - 1; i++) {
                if ((ContractNo == $('#MaxContractaNo').val()) && (typeidval == $('#MaxDocId').val())) {
                    maxofId++;
                    var fname = fi.files.item(i).name;
                    var SContractNo = ContractNo;
                    var SDocType = typeidval;
                    var SFileUpload = fname;
                    var SUserId = ERPUserId;
                    var SDepartmentId = ERPDeptId;
                    var SDelFlag = 1;
                    var Flag = flg;
                    var FolderName = ContractNo + '-' + typeidval + '-' + maxofId;
                    if (SContractNo != 0) {
                        DArray.push({
                            'SContractNo': SContractNo,
                            'SDocType': SDocType,
                            'SFileUpload': SFileUpload,
                            'SUserId': SUserId,
                            'SDepartmentId': SDepartmentId,
                            'SDeleteFlag': SDelFlag,
                            'Flag': Flag,
                            'FolderName': FolderName,
                        })
                    }
                }
                else {
                    var fname = fi.files.item(i).name;
                    var SContractNo = ContractNo;
                    var SDocType = typeidval;
                    var SFileUpload = fname;
                    var SUserId = ERPUserId;
                    var SDepartmentId = ERPDeptId;
                    var SDelFlag = 1;
                    var Flag = flg;
                    var FolderName = ContractNo + '-' + typeidval + '-' + d;
                    if (SContractNo != 0) {
                        DArray.push({
                            'SContractNo': SContractNo,
                            'SDocType': SDocType,
                            'SFileUpload': SFileUpload,
                            'SUserId': SUserId,
                            'SDepartmentId': SDepartmentId,
                            'SDeleteFlag': SDelFlag,
                            'Flag': Flag,
                            'FolderName': FolderName,
                        })
                    }
                }
                d++; 
            }
        }
        
    }
    console.log(DArray)
    if (DArray != "") {
        var data = { 'PurchaseInvoiceModel': DArray };
        $.ajax({
            type: "POST",
            url: "../Realestate/ContractMultipleDocInsert",
            data: data,
            success: function (result) {
                var NewContractNo = result.oList[0].SContractNo;
                var NewStstus=result.oList[0].Status;
                if (NewContractNo == 0 && NewStstus==1) {
                    var NewMaxId = result.oList[0].FolderName;
                    $('#MaxFolderName').val(parseInt(NewMaxId) + 1);
                    $('#MaxContractaNo').val(result.oList[0].SContractNo);
                    $('#MaxDocId').val(result.oList[0].SDocType);
                    $('#UpdateStatus').val('1');
                    DocumentUpload(FolderContractNo, FolderStatus,NewMaxId);
                }
                else if (NewContractNo != 0 && NewStstus == 2) { 
                    var NewMaxId = result.oList[0].FolderName;
                    $('#UpdateStatus').val('2');
                    DocumentUpload(FolderContractNo, FolderStatus,NewMaxId);
                }
            }
        });
    }

}

function DeleteUploadFile(slnos) {
  
    $('#Confirmflag').val('Docdelete'), $('#ConfirmRowId').val(slnos)
    $('#confirmmessage').text('Do you want to Delete this Document?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}

function DocumentUpload(CurrentDocID, status,NewDocumentNo) {
    if (status == 1) {
        var data = {};
        data.DocumentId = CurrentDocID;
        $.ajax({
            type: "POST",
            url: "../Realestate/RemoveExistingContractDocumentFolder",
            data: data,
            success: function (result) {
                var DocumentId = CurrentDocID;
                var c = 0;
                for (var j = 1; j <= rowcount - 1; j++) {
                    var Documentuploadtype = $('#UploadDocumentId' + j).val();
                    var totalFiles = document.getElementById('files' + j).files.length;
                    if (totalFiles <= 25) {
                        NewDocumentNo++;
                        for (var i = 0; i < totalFiles; i++) {
                            var formData = new FormData();
                            var imageName = DocumentId + '-' + Documentuploadtype + '-' + c;
                            var browsedFile = document.getElementById('files' + j).files[i];
                            var ImageId = DocumentId;
                            var ImageIdDoc = Documentuploadtype;
                            if (browsedFile.type.match('image/*|application/pdf|application/vnd.ms-excel')) {
                                formData.append("FileUpload", browsedFile);
                                formData.append("ImageName", imageName);
                                formData.append("UniqueId", ImageId);
                                formData.append("DocType", ImageIdDoc);
                                $.ajax({
                                    type: "POST",
                                    url: '/Realestate/ContractUploadDocuments',
                                    data: formData,
                                    dataType: "html",
                                    contentType: false,
                                    processData: false,
                                    success: function (result) {
                                      
                                    }
                                });
                            }
                            c++;
                        }
                    }
                    if (j == (rowcount-1))
                    {
                          $('#files1').val('');
                    $('#UploadDocumentId1').text('0');
                    $('.adddelrow').remove();
                    $('#tbldocumentlist tr').remove();
                    rowcount = 2;
                    }
                }
              
            }
        });
    }
    else if (status == 2) {

        var data = {};
        data.DocumentId = CurrentDocID;
        $.ajax({
            type: "POST",
            url: "../Realestate/RemoveExistingContractDocumentFolder",
            data: data,
            success: function (result) {

                var DocumentId = CurrentDocID;

                for (var j = 1; j <= rowcount-1; j++) {
                    var Documentuploadtype = $('#UploadDocumentId' + j).val();
                    var totalFiles = document.getElementById('files' + j).files.length;
                    var maxofId = $('#MaxFolderName').val() - 1;
                    if ((CurrentDocID == $('#MaxContractaNo').val()) && (Documentuploadtype == $('#MaxDocId').val())) {
                        if (totalFiles <= 25) {
                            for (var i = 0; i < totalFiles; i++) {
                                NewDocumentNo++;
                                var formData = new FormData();
                                var imageName = DocumentId + '-' + Documentuploadtype + '-' + NewDocumentNo;
                                var browsedFile = document.getElementById('files' + j).files[i];
                                var ImageId = DocumentId;
                                var ImageIdDoc = Documentuploadtype;
                                if (browsedFile.type.match('image/*|application/pdf|application/vnd.ms-excel')) {
                                    formData.append("FileUpload", browsedFile);
                                    formData.append("ImageName", imageName);
                                    formData.append("UniqueId", ImageId);
                                    formData.append("DocType", ImageIdDoc);
                                    $.ajax({
                                        type: "POST",
                                        url: '/Realestate/ContractUploadDocuments',
                                        data: formData,
                                        dataType: "html",
                                        contentType: false,
                                        processData: false,
                                        success: function (result) {

                                        }
                                    });
                                }
                                maxofId++;
                            }
                        }
                    }
                    else {
                        if (totalFiles <= 25) {
                            for (var i = 0; i < totalFiles; i++) {
                                NewDocumentNo++;
                                var formData = new FormData();
                                var imageName = DocumentId + '-' + Documentuploadtype + '-' + NewDocumentNo; 
                                var browsedFile = document.getElementById('files' + j).files[i];
                                var ImageId = DocumentId;
                                var ImageIdDoc = Documentuploadtype;
                                if (browsedFile.type.match('image/*|application/pdf|application/vnd.ms-excel')) {
                                    formData.append("FileUpload", browsedFile);
                                    formData.append("ImageName", imageName);
                                    formData.append("UniqueId", ImageId);
                                    formData.append("DocType", ImageIdDoc);
                                    $.ajax({
                                        type: "POST",
                                        url: '/Realestate/ContractUploadDocuments',
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
                    }
                    if (j == (rowcount-1))
                    {
                        $('#files1').val('');
                    $('#UploadDocumentId1').text('0');
                    $('.adddelrow').remove();
                    $('#tbldocumentlist tr').remove();
                    $('#MaxFolderName').val('');
                    $('#MaxContractaNo').val('0');
                    $('#MaxDocId').val('0');
                    rowcount = 2;
                    }
                }
            }
        });

        
    }
}

function FileRemoval(ConDocID) {
   

    var data = {};
    data.ContractNo = $('#HiddenContractaNo').val();
    data.DocTypeId = $('#HiddenDocId').val();
    data.ContDocument = $('#HiddenDocuName').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.DelFlag = 0;
    data.ConDocID = ConDocID;
    $.ajax({
        type: "POST",
        url: "../Realestate/ContractMultipleDocDelete",
        data: data,
        success: function (result) {
            var status = result.oList[0].Status;
            if (status == 3) {
                var curTableId = $('#HiddenTableId').val();
                $('#' + curTableId).remove();
                Showalerts(8);
                
            }
        }
    });

}
//------------------------------------End File Upload------------------------------------