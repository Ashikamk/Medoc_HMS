var Result = 0;
var MultiUnitLength = 0;
var Decimal = Decimal;
var flg = 0;
var EditPermission;

var Rowcount = 1;
var DocSelect = '<option value="0">Select</option><option value="1">Exterior</option><option value="2">Interior </option> <option value="3">360</option>';
var DocArray = []; var InteriorArray = []; var ExteriorArray = []; var RotateArray = [];
var count = 0;

var ScratchImgArray = []; var ScrImg = '';

$(document).keydown(function (e) {
    if (e.keyCode == 27) {                           //esc    
        $('#popupdiv1,#QuantityPrintDiv').hide();
    }
});

$(document).ready(function () {

    formrefresh(0);
    Dataload();
         
    if (usermenu1.indexOf("M251") == -1) {
        EditPermission = 1;
    }
    else {
        EditPermission = 0;
    }

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

    $("#btndelete").click(function (e) {
        $('#Confirmflag').val('delete');
        $('#confirmmessage').text('Do You Want To Delete The Item?');
        $('#confirm').show();
        $('#confirmOk').focus();
    });

    $('input:not(.atfcs),select:not(.atfcs)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:not(.btn):enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });  
    $('.nav-link').click(function (e) {
        var id = $(this).attr('id');      
        if (id == 'tab2')
        {
            window.setTimeout(function () { $('#TCNO').focus().select();  });
        }
        else if (id == 'tab3')
        { window.setTimeout(function () { $('#Insurancecompany').focus().select(); }); }

    });

    $("#InsuranceDate").focusout(function (e) {
        $('#InsuranceDate .daterangepicker').hide();
    });
    $("#RegistrationDate").focusout(function (e) {
        $('#RegistrationDate .daterangepicker').hide();
    });
    $("#InsStartDate").focusout(function (e) {
        $('#InsStartDate .daterangepicker').hide(); 
    });


    if (window.File && window.FileList && window.FileReader) {
       
        $("#scrfiles0").on("change", function (e) {
            ScratchImgArray = [];
            var files = e.target.files,
              filesLength = files.length;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i];
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    var file = e.target;                            
                    ScratchImgArray.push(e.target.result);
                    $('#ScratchImg').attr('src', ScratchImgArray[0]);
                    CurImg = 0;
                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
        alert("Your browser doesn't support to File API")
    }
  
});

var CurImg = 0;

function GetNextScratch(flg)
{ 
    if (flg == -1)          //Prev Img
    {
        if (CurImg != 0) {
            CurImg = CurImg - 1;
            $('#ScratchImg').attr('src', ScratchImgArray[CurImg]);
        }
    }
    else if (flg == 1)           //Next Img
    {
        if (CurImg != ScratchImgArray.length-1) {
            CurImg = CurImg + 1;
            if (CurImg < ScratchImgArray.length) {
                $('#ScratchImg').attr('src', ScratchImgArray[CurImg]);
            }        
        }
    }
}

function Dataload()
{
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

    var data = {};
    data.SbgrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SubGroupGetandGets",
        data: data,
        success: function (result) {
                SubgroupGet(result.oList);
        }
    });
}

function SubgroupGet(result) {
    $("#CarClass").empty();
    $("#CarClass").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#CarClass").append("<option value='" + result[i].SbgrpId + "'>" + result[i].SbgrpName + "</option>");
    }
}

function CategoryLoad(result) {
    $("#Category").empty();
    $("#Category").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Category").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
}

function GroupLoad(result) {
    $("#CarMake").empty();
    $("#CarMake").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#CarMake").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }
}

//Delete Grid Rows Confirm box
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'delete') {
        SaveAndUpdate(0);
    }
    if (Result == 'true' && status == 'Filedelete') { 
        OKDeleteDocument(rowid);
    }   
    $('#confirm').fadeOut();
}

function ManualFocus(Id,Dest,event)
{
    var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
    if (key == 13) {
        event.preventDefault();       
        $('#'+Dest).focus().select();
    }
}

function Defaultfocus() {
    if (!$('#ImpDiv').is(':visible'))
    { $('#CarCode').focus().select(); }
}

function thisformrefresh(flg)
{
    formrefresh(flg);
}

function formrefresh(flg)
{
    $('.form-control').val('');
    $('#files0').val('');

    $('.adddelrow').remove();

    $('#tab1').click();

    $('.scrtchs').prop('checked', false);

    $('#ImgType0').val(0);
    $('#CarId').val(0);
    $('#Category').val($('#Category option:first').val());
    $('#CarMake').val($('#CarMake option:first').val());
    $('#CarClass').val($('#CarClass option:first').val());    

    Rowcount = 1; count = 0; CurImg = 0;
    DocArray = []; InteriorArray = []; ExteriorArray = []; RotateArray = []; ScratchImgArray = [];
       
    LoadDate(0);
    ScrImg = '';
   
    $('.hidelm').hide();
    $('#UploadDiv,#btnadd').show();

    $('#btndelete').hide();

    $('#myImg').attr('src', "../app-assets/img/Cars/car1.jpg");
    $('#DocImg,#ScratchImg').attr('src', "/app-assets/img/NoImage.png");

    if (flg == 0)
    { Defaultfocus(); }
}

function LoadDate(flg) {
    $(function () {
        if (flg == 0) {
            $('#InsuranceDate,#RegistrationDate,#InsStartDate').daterangepicker({
                minDate: minDate,
                maxDate: new Date(new Date().getFullYear() + 20, new Date().getMonth() + 6, new Date().getDate()),
                singleDatePicker: true,
                showDropdowns: true,
                locale: { format: 'DD/MM/YYYY' },
            });
        }

    });
}

function SaveAndUpdate(Flag)
{
    var fname = '';
    var fi = document.getElementById('scrfiles0');
    if (fi.files.length > 0) {
        for (var i = 0; i <= fi.files.length - 1; i++) {
            if (fname == '')
            { fname = fi.files.item(i).name; }
            else { fname = fname + ','+ fi.files.item(i).name; }
        }
    }
    else if (ScrImg.length > 0) {
        for (var i = 0; i <= ScrImg.length - 1; i++) {
            if (fname == '')
            { fname = ScrImg[i] }
            else { fname = fname + ',' + ScrImg[i] } 
        }
    }

    
    if ($.trim($('#CarCode').val()) == "") {
        warningshow('Please Enter Code', 'CarCode');
    }
    else if ($.trim($('#CarDesc').val()) == "") {
        warningshow('Please Enter Description', 'CarDesc');
    }
    else if ($.trim($('#DailyPrice').val()||0) == 0) {
        warningshow('Please Enter Daily Rent', 'DailyPrice');
    }
    else if ($.trim($('#WeeklyPrice').val() || 0) == 0) {
        warningshow('Please Enter Weekly Rent', 'WeeklyPrice');
    }
    else if ($.trim($('#MonthlyPrice').val() || 0) == 0) {
        warningshow('Please Enter Monthly Rent', 'MonthlyPrice');
    }
    else if ($.trim($('#AnnualPrice').val() || 0) == 0) {
        warningshow('Please Enter Annual Rent', 'AnnualPrice');
    }
    else {

        var OutOfService = 0; var Sparewheel = 0; var Lights = 0; var ToolsJack = 0; var Petrol = 0; var HeaterAC = 0; var Radio = 0;

        if ($('#select_status').is(':checked'))
        { OutOfService = 1; }
        if ($('#myCheckbox1').is(':checked'))
        { Radio = 1; }
        if ($('#myCheckbox2').is(':checked'))
        { HeaterAC = 1; }
        if ($('#myCheckbox3').is(':checked'))
        { Petrol = 1; }
        if ($('#myCheckbox4').is(':checked'))
        { ToolsJack = 1; }
        if ($('#myCheckbox5').is(':checked'))
        { Lights = 1; }
        if ($('#myCheckbox6').is(':checked'))
        { Sparewheel = 1; }

        var data = {};       //array
            
        data.CarId             =   $('#CarId').val();  
        data.CarCode           =   $('#CarCode').val();  
        data.CarDesc           =   $('#CarDesc').val();  
        data.CurrentKM         =   $('#CurrentKM').val();  
        data.NextService       =   $('#NextService').val();  
        data.InsuranceDate     =   $('#InsuranceDate').val();  
        data.RegistrationDate  =   $('#RegistrationDate').val();  
        data.IYear             =   $('#IYear').val();  
        data.PlateName         =   $('#PlateName').val();  
        data.PlateCode         =   $('#PlateCode').val();  
        data.EngineNo          =   $('#EngineNo').val();  
        data.CarFuel           =   $('#CarFuel').val();  
        data.ChassisNo         =   $('#ChassisNo').val();  
        data.PetrolCharge      =   $('#PetrolCharge').val();  
        data.DailyPrice        =   $('#DailyPrice').val();  
        data.WeeklyPrice       =   $('#WeeklyPrice').val();  
        data.MonthlyPrice      =   $('#MonthlyPrice').val();  
        data.AnnualPrice       =   $('#AnnualPrice').val();  
        data.Comments          =   $('#Comments').val();  
        data.TCNO              =   $('#TCNO').val();  
        data.CarColor          =   $('#CarColor').val();  
        data.SubColor          =   $('#SubColor').val();  
        data.Category          =   $('#Category').val();  
        data.CarClass          =   $('#CarClass').val();  
        data.Origin            =   $('#Origin').val();  
        data.PlateSource       =   $('#PlateSource').val();  
        data.PlateCategory     =   $('#PlateCategory').val();  
        data.Shape             =   $('#Shape').val();  
        data.EmptyWt           =   $('#EmptyWt').val();  
        data.GVWt              =   $('#GVWt').val();  
        data.Doors             =   $('#Doors').val();  
        data.Seats             =   $('#Seats').val();  
        data.Cylinders         =   $('#Cylinders').val();  
        data.CarMake           =   $('#CarMake').val();  
        data.PayLoad           =   $('#PayLoad').val();  
        data.MortageBy         =   $('#MortageBy').val();  
        data.MortageNumber     =   $('#MortageNumber').val();  
        data.Insurancecompany  =   $('#Insurancecompany').val();  
        data.InsuranceType     =   $('#InsuranceType').val();  
        data.InsuranceNo       =   $('#InsuranceNo').val();  
        data.InsStartDate      =   $('#InsStartDate').val();  
        data.Radio             =   Radio;  
        data.HeaterAC          =   HeaterAC;  
        data.Petrol            =   Petrol;  
        data.ToolsJack         =   ToolsJack;  
        data.Lights            =   Lights;  
        data.Sparewheel        =   Sparewheel;  
        data.OutOfService      =   OutOfService;  
        data.Flag              =   fname;  
        data.CurrentDate       =   $('#ScratchRemarks').val(); 
        data.ItemUserId        =   ERPUserId;  
        data.BelowCostFlag     =  ERPDeptId;
        data.DelFlag           =   Flag;

        $.ajax({
            type: "POST",
            url: "../RentCar/CarInsertandUpdate", 
            data: data,
            success: function (result) {
                    var status = result.oList[0].Status;
                    var CarId = result.oList[0].CarId;
                    if (status == 1 || status == 2) {
                        fnImageSave(CarId, status);
                    }
                    else { Showalertsthis(status); }
            }
        });

    }
}

function GetRows(CarId) {
    formrefresh(1);
    $('#CarId').val(CarId)
    var data = {};
    data.CarId = CarId;
    $.ajax({
        type: "POST",
        url: "../RentCar/CarGetandGets",
        data: data,
        success: function (result) {
            if (CarId == 0)
            { ShowItemList(result) }
            else { ShowItemGet(result) }
        }
    });
}

function ShowItemGet(result) {
  
    $('#CarId').val(result[0].CarId);
    $('#CarCode').val(result[0].CarCode);
    $('#CarDesc').val(result[0].CarDesc);
    $('#CurrentKM').val(result[0].CurrentKM);
    $('#NextService').val(result[0].NextService);
    $('#InsuranceDate').val(result[0].InsuranceDate);
    $('#RegistrationDate').val(result[0].RegistrationDate);
    $('#IYear').val(result[0].IYear);
    $('#PlateName').val(result[0].PlateName);
    $('#PlateCode').val(result[0].PlateCode);
    $('#EngineNo').val(result[0].EngineNo);
    $('#CarFuel').val(result[0].CarFuel);
    $('#ChassisNo').val(result[0].ChassisNo);
    $('#PetrolCharge').val(result[0].PetrolCharge);
    $('#DailyPrice').val(result[0].DailyPrice);
    $('#WeeklyPrice').val(result[0].WeeklyPrice);
    $('#MonthlyPrice').val(result[0].MonthlyPrice);
    $('#AnnualPrice').val(result[0].AnnualPrice);
    $('#Comments').val(result[0].Comments);
    $('#TCNO').val(result[0].TCNO);
    $('#CarColor').val(result[0].CarColor);
    $('#SubColor').val(result[0].SubColor);
    $('#Category').val(result[0].Category);
    $('#CarClass').val(result[0].CarClass);
    $('#Origin').val(result[0].Origin);
    $('#PlateSource').val(result[0].PlateSource);
    $('#PlateCategory').val(result[0].PlateCategory);
    $('#Shape').val(result[0].Shape);
    $('#EmptyWt').val(result[0].EmptyWt);
    $('#GVWt').val(result[0].GVWt);
    $('#Doors').val(result[0].Doors);
    $('#Seats').val(result[0].Seats);
    $('#Cylinders').val(result[0].Cylinders);
    $('#CarMake').val(result[0].CarMake);
    $('#PayLoad').val(result[0].PayLoad);
    $('#MortageBy').val(result[0].MortageBy);
    $('#MortageNumber').val(result[0].MortageNumber);
    $('#Insurancecompany').val(result[0].Insurancecompany);
    $('#InsuranceType').val(result[0].InsuranceType);
    $('#InsuranceNo').val(result[0].InsuranceNo);
    $('#InsStartDate').val(result[0].InsStartDate);
    $('#ScratchRemarks').val(result[0].CurrentDate); 

    if (result[0].OutOfService == 1)
    { $('#select_status').prop('checked', true) }
    else
    { $('#select_status').prop(':checked', false) }

    if (result[0].Radio == 1)
    { $('#myCheckbox1').prop('checked', true) }
    else
    { $('#myCheckbox1').prop('checked', false) }

    if (result[0].HeaterAC == 1)
    { $('#myCheckbox2').prop('checked', true) }
    else
    { $('#myCheckbox2').prop('checked', false) }

    if (result[0].Petrol == 1)
    { $('#myCheckbox3').prop('checked', true) }
    else
    { $('#myCheckbox3').prop('checked', false) }

    if (result[0].ToolsJack == 1)
    { $('#myCheckbox4').prop('checked', true) }
    else
    { $('#myCheckbox4').prop('checked', false) }

    if (result[0].Lights == 1)
    { $('#myCheckbox5').prop('checked', true) }
    else
    { $('#myCheckbox5').prop('checked', false) }

    if (result[0].Sparewheel == 1)
    { $('#myCheckbox6').prop('checked', true) }
    else
    { $('#myCheckbox6').prop('checked', false) }

    ViewSavedFiles(1);
    ViewSavedFiles(2);

    $('#Entry,#btnviedoc').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#CarCode').focus().select();

    ScrImg = (result[0].Flag).split(',');
    if (ScrImg.length > 0)
    {
        for (var j = 0; j < ScrImg.length; j++) {
            ScratchImgArray.push('/ProjectImages/CarScratchImages/' + result[0].CarId + '/' + ScrImg[j])           
        }
        $.ajax({
            url: ScratchImgArray[0],
            type: 'HEAD',
            error: function () {
                $('#ScratchImg').attr('src', "/app-assets/img/NoImage.png")
            },
            success: function () {
                $('#ScratchImg').attr('src', ScratchImgArray[0]);
            }
        });
       
    }

}

function ShowItemList(result) {
    disable_datatable('TblCars');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%>Sl#</th><th width=10%>Code</th><th width=20%>Description</th><th width=6%>Reg. Date</th><th width=6%>Current KM</th><th width=10%>Plate Name</th><th width=10%>EngineNo</th><th width=10%>ChassisNo</th><th width=10%>Ins.company</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td >' + slno + '</td><td >' + result[i].CarCode + '</td><td >' + result[i].CarDesc + '</td><td >' + result[i].RegistrationDate + '</td><td >' + result[i].CurrentKM + '</td><td >' + result[i].PlateName + '</td><td >' + result[i].EngineNo + '</td><td >' + result[i].ChassisNo + '</td><td >' + result[i].Insurancecompany + '</td><td align=center><a onclick="GetRows(' + result[i].CarId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#TblCars').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th> Description</th><th>Reg. Date </th><th>Current KM </th><th>Plate Name </th><th>EngineNo</th><th>ChassisNo</th><th >Ins.company</th><th>Edit</th></tr> </tfoot>');
    datatableWithsearch1('TblCars');
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
        formrefresh(0);
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        swal('Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        swal('Same ItemCode or ItemName Found in Excel', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
}

//-----------------Multiple Image Upload

function Prodpopshow(flg) {
    if (flg == 0) {                            //Show Image Popup by dblclick
        $('#Itempopup').show();
        $('.hidelm').hide(); $('#UploadDiv,#btnadd').show();
        if ($('#CarId').val() > 0)
        { $('#btnviedoc,#btnshowdoc').show(); }
        else { $('#btnviedoc,#btnshowdoc').hide(); }
    }
    else if (flg == 1) {                      //Hide Image Popup by dblclick
        $('#Itempopup').hide();
    }
    else if (flg == 2) {                      //Save Button Click Image Popup by dblclick
        $('#Itempopup').hide();
        var st = 0;

        for (var k = 0; k < Rowcount; k++) {
            if (document.getElementById('files' + k).files.length > 0) {
                st = 1;
                break;
            }
        }
        if (st == 1) {
            swal('File Uploaded Successfully', "", "success");
        }
        else {
            swal('No Files Selected', "", "warning");
        }

    }
    else if (flg == 3) {                      //Show Btn Click
        $('.hidelm').hide(); $('#TypeDocDiv,#btnadddoc').show();
    }
    else if (flg == 4) {                      //View Btn Click
        $('.hidelm').hide(); $('#viewdocdiv,#btnadddoc').show();
    }
    else if (flg == 5) {                      //Add Img Btn Click
        $('.hidelm').hide(); $('#UploadDiv,#btnadd').show();
        $('#btnviedoc,#btnshowdoc').show();
    }
}

function AddUploadDiv(type, id) {
    var id = parseInt(Rowcount);
    var newrow = '<div class="px-3"><div class="row adddelrow" id=Row' + id + '>' +
                        '<label class="col-md-2" style="font-weight:bold;">Image Type</label>' +
                        '<div class="col-md-3">' +
                        '<select id="ImgType' + id + '" class="form-control slfile" onchange=Checkdup(' + id + ')>' + DocSelect + '</select>' +
                        '</div>' +
                        '<label class="col-md-2" style="font-weight:bold;">Image</label>' +
                        '<div class="col-md-4">' +
                        '<input type="file" id="files' + id + '" class="btn btn-lg gradient-back-to-earth font-small-2 white p-2 mr-2" name="files[]" multiple accept="image/*"/>' +
                        '</div>' +
                        '</div></div>';
    $('#MainDivseq').append(newrow);
    Rowcount++;
}

function Checkdup(id) {

    for (var i = 0; i < Rowcount; i++) {
        var a = parseInt($('#ImgType' + i).val());
        var b = parseInt($('#ImgType' + id).val());
        if ((id != i) && (a == b) && (a != 0) && (b != 0)) {
            $('#ImgType' + id).val(0);
            warningshow('Image Type already selected', 'ImgType' + id);
        }
    }
}

function fnImageSave(CarId,status)
{
    var fi = document.getElementById('scrfiles0');
    if (fi.files.length > 0) {
        var data = {};
        data.CarId = CarId;
        $.ajax({
            type: "POST",
            url: "../RentCar/CarScratchFolderCreate",
            data: data,
            success: function (result) {
                UploadScratchImg(CarId);
            }
        });
    }

    var st = 0;
    for (var k = 0; k < Rowcount; k++) {
        if (document.getElementById('files' + k).files.length > 0) {
            st = 1;
            break;
        }
    }
    if (st == 1) {
        CreateFolder(CarId,status);
    }
    else {
        Showalertsthis(status);
    }    
}

function UploadScratchImg(CarId)
{
    var fi = document.getElementById('scrfiles0');
    if (fi.files.length > 0) {
        for (var i = 0; i <= fi.files.length - 1; i++) {
            var formData = new FormData();
            var imageName = fi.files.item(i).name;
            var browsedFile = fi.files[i];
            var Extension = imageName.split('.').pop();
            var CarId = CarId;
          
            formData.append("FileUpload", browsedFile);
            formData.append("FileName", imageName);
            formData.append("CarId", CarId);
            formData.append("Extension", Extension);
            $.ajax({
                type: "POST",
                url: '/RentCar/CarsScratchFileUpload',
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {

                }
            });
            if (i == fi.files.length - 1)
            $('#scrfiles0').val('');
        }
    }
}

function DeleteScratchImg()
{
    //var index = ScrImg.indexOf(ScrImg[CurImg]);
    //if (index > -1) {
    //    var data = {};
    //    data.CarId = $('#CarId').val();
    //    data.FileName = ScrImg[CurImg];
    //    $.ajax({
    //        type: "POST",
    //        url: "../RentCar/CarScratchFileDelete",
    //        data: data,
    //        success: function (result) {                
    //        }
    //    });

    //    ScrImg.splice(index, 1);
    //    ScratchImgArray.splice(index, 1);
    //    if (ScratchImgArray.length > 0)
    //    { $('#ScratchImg').attr('src', ScratchImgArray[0]); CurImg = 0; }
    //    else {
    //        $('#ScratchImg').attr('src', "/app-assets/img/NoImage.png"); CurImg = 0;
    //    }
    //}
}

function CreateFolder(CarId,status) {
    var data = {};
    data.CarId = CarId;
    $.ajax({
        type: "POST",
        url: "../RentCar/CarFolderCreate",
        data: data,
        success: function (result) {
            FileUploadDB(CarId, status);            
        }
    });
}

function FileUploadDB(CarId,status) {
 //DB Save 
    var oArray = new Array();            
    for (var k = 0; k < Rowcount; k++) {
        var ImgType = $('#ImgType' + k).val();
        if (ImgType > 0)
        {
            var fi = document.getElementById('files' + k);
            if (fi.files.length > 0) {
                for (var i = 0; i <= fi.files.length - 1; i++) {

                    var fname = fi.files.item(i).name;
                    var ext = fname.split('.').pop();

                    var SlNo = CarId;
                    var DeptId = ERPDeptId;
                    var FileName = fname;
                    var Extension = ext;
                    var FolderFileName = 0;
                    var UserId = ERPUserId;
                    var DelFlag = 1;
                    var ImgType = ImgType;
                    if (FileName != undefined && ImgType != 0) {
                        oArray.push({
                            'SlNo': SlNo,
                            'DeptId': DeptId,
                            'FileName': FileName,
                            'Extension': Extension,
                            'FolderFileName': FolderFileName,
                            'ItemUserId': UserId,
                            'DelFlag': DelFlag,
                            'ImgType': ImgType,
                        })
                    }
                }
            }
        }       
    }
    if (oArray != "") {
        var data = { 'RentCarModel': oArray };
        $.ajax(
        {
            type: "POST",
            url: "../RentCar/CarMultipleImageInsert", 
            data: data,
            success: function (result) {
                var status1 = result.oList[0].Status;
                if (status1 == 1) {
                    FileUploadFolder(result.oList, status,CarId);
                }
            }
        });
    } 
}

function FileUploadFolder(result, status,CarId) {
    // Folder Save
    var len = 0;
    for (var k = 0; k < Rowcount; k++) {
        var ImgType = $('#ImgType' + k).val();
        if (ImgType > 0) {
            var fi = document.getElementById('files' + k);
            if (fi.files.length > 0) {
                for (var i = 0; i <= fi.files.length - 1; i++) {
                    var formData = new FormData();
                    var imageName = fi.files.item(i).name;
                    var browsedFile = fi.files[i];
                    var Extension = imageName.split('.').pop();
                    var CarId = CarId;
                    var SlNo = result[len].SlNo; 

                    formData.append("FileUpload", browsedFile);
                    formData.append("FileName", imageName);
                    formData.append("CarId", CarId);
                    formData.append("SlNo", SlNo);
                    formData.append("Extension", Extension);
                    $.ajax({
                        type: "POST",
                        url: '/RentCar/CarsFileUpload',
                        data: formData,
                        dataType: "html",
                        contentType: false,
                        processData: false,
                        success: function (result) {                         
                        }
                    });
                    len++;
                }
            }
        }
    }  
    Showalertsthis(status);
}

function ViewSavedFiles(flg) {
    var data = {};
    data.CarId = $("#CarId").val(); 
    data.SlNo = 1;
    data.DelFlag =1;
    $.ajax({
        type: "POST",
        url: "../RentCar/CarsFileGets", 
        data: data,
        success: function (result) {
            if (flg == 0)                                 //Show files in table for delete and list
            { ShowSavedFiles(result.oList); }
            else if (flg == 1)                            //Show files in Main Img and insert to array for view in main img
            {
                if(result.oList.length>0)
                {
                    DocArray = result.oList;
                    ValidImg($("#CarId").val(), result.oList[0].SlNo, result.oList[0].Extension);
                    $("#imgId").val(0);
                }
            }
            else                                          //Show files in Popup Img and insert to array for view in popup
            {
                DocArray = result.oList;
                if (result.oList.length > 0) {
                    InteriorArray = []; ExteriorArray = []; RotateArray = [];
                    for (var c = 0; c < result.oList.length; c++)
                    {
                        if (result.oList[c].ImgType == 1) { ExteriorArray.push(result.oList[c]) }
                        if (result.oList[c].ImgType == 2) { InteriorArray.push(result.oList[c]) }
                        if (result.oList[c].ImgType == 3) { RotateArray.push(result.oList[c]) }
                    }
                    GetImgByType(flg)
                }
            }
        }
    });
}


//---------------------Image Rotate 369

function GetRotateImg() {
    if (RotateArray.length > 0) {
        for (var k = 0; k < RotateArray.length; k++) {
            rotate([
                "../ProjectImages/CarMultiImages/" + $("#CarId").val() + "/" + RotateArray[k].SlNo + "." + RotateArray[k].Extension,

            ]);

        }
    }
}
rotate = function (images) {
    count++;
    $(function () {
        $.each(images, function (i, v) {
            $('.rotatebox .images').append('<img class="img-thumbnail gradient-back-to-earth" src="' + v + '" data-nth="' + count + '" />');

        });
        $('.rotatebox .images img').css('z-index', '1');
        $('.rotatebox .images img').first().css('z-index', '2');

        $('.rotatebox .slider').slider({

            min: 0,
            max: (count * 2) - 1,
            value: 0,
            slide: function (evt, ui) {
                target = ui.value % count;
                $('.rotatebox .images img').css('z-index', '1');
                $('.rotatebox .images img[data-nth=' + target + ']').css('z-index', '2');
            },
        });
    });
};





//------------Popup Img
function GetImgByType(flg)
{
    var Type='';
    if(flg==2) //All
    { if (DocArray.length > 0) { $('.rotatebox').hide(); $('#DocImg').show(); ValidImgDoc($("#CarId").val(), DocArray[0].SlNo, DocArray[0].Extension); $("#DocId").val(0); $("#DocType").val(2); } }
    else
    {
        if (flg == 3) { if (InteriorArray.length > 0) { $('.rotatebox').hide(); $('#DocImg').show(); ValidImgDoc($("#CarId").val(), InteriorArray[0].SlNo, InteriorArray[0].Extension); $("#DocId").val(0); $("#DocType").val(3); } else { $('#DocImg').attr('src', "/app-assets/img/NoImage.png"); $('#DocImg').show(); $('.rotatebox').hide(); } }     //Interior
        else if (flg == 4) { if (ExteriorArray.length > 0) { $('.rotatebox').hide(); $('#DocImg').show(); ValidImgDoc($("#CarId").val(), ExteriorArray[0].SlNo, ExteriorArray[0].Extension); $("#DocId").val(0); $("#DocType").val(4); } else { $('#DocImg').attr('src', "/app-assets/img/NoImage.png"); $('#DocImg').show(); $('.rotatebox').hide(); } }  //Exterior
        else if (flg == 5) { //360
            if (RotateArray.length > 0) {
                // ValidImgDoc($("#CarId").val(), RotateArray[0].SlNo, RotateArray[0].Extension); $("#DocId").val(0); $("#DocType").val(5);
                $('#DocImg').hide();
                $('.rotatebox').show();
            }
            else {
                $('#DocImg').show();
                $('.rotatebox').hide();
                $('#DocImg').attr('src', "/app-assets/img/NoImage.png");
            }

        }       
    }  
}

function ValidImgDoc(Id, Foldname, Ext) {
    $.ajax({
        url: "../ProjectImages/CarMultiImages/" + Id + "/" + Foldname + "." + Ext + "",
        type: 'HEAD',
        error: function () {
            $('#DocImg').attr('src', "/app-assets/img/Cars/car1.jpg");             
        },
        success: function () {
            $('#DocImg').attr('src', "../ProjectImages/CarMultiImages/" + Id + "/" + Foldname + "." + Ext + "");
            //  $('#myImg').attr('src', "../ProjectImages/Products/" + result[0].ItemId + ".png?" + dd.getTime());
        }
    });
}

function PrevNextPopup(id, Flag) {

    var Type = $("#DocType").val();

    if (Type == 2)                                                                  //All
    {
        if (($("#CarId").val() > 0) && DocArray.length > 0) {
        var Id = parseInt($("#DocId").val() || 0);
        if (Flag == 'P')          //Prev Img
        {
            if (Id != 0) {
                Id = Id - 1;
                $("#DocId").val(Id);
                ValidImgDoc($("#CarId").val(), DocArray[Id].SlNo, DocArray[Id].Extension);
            }
        }
        else if (Flag == 'N')          //Next Img
        {
            if (Id != DocArray.length) {
                Id = Id + 1;
                if (Id < DocArray.length) {
                    $("#DocId").val(Id);
                    ValidImgDoc($("#CarId").val(), DocArray[Id].SlNo, DocArray[Id].Extension);
                }
            }
        }
    }
    }
   else if (Type == 3)                                                                  //Interior
    {
       if (($("#CarId").val() > 0) && InteriorArray.length > 0) {
            var Id = parseInt($("#DocId").val() || 0);
            if (Flag == 'P')          //Prev Img
            {
                if (Id != 0) {
                    Id = Id - 1;
                    $("#DocId").val(Id);
                    ValidImgDoc($("#CarId").val(), InteriorArray[Id].SlNo, InteriorArray[Id].Extension);
                }
            }
            else if (Flag == 'N')          //Next Img
            {
                if (Id != InteriorArray.length) {
                    Id = Id + 1;
                    if (Id < InteriorArray.length) {
                        $("#DocId").val(Id);
                        ValidImgDoc($("#CarId").val(), InteriorArray[Id].SlNo, InteriorArray[Id].Extension);
                    }
                }
            }
        }
   }
   else if (Type == 4)                                                                  //Interior
   {
       if (($("#CarId").val() > 0) && ExteriorArray.length > 0) {
           var Id = parseInt($("#DocId").val() || 0);
           if (Flag == 'P')          //Prev Img
           {
               if (Id != 0) {
                   Id = Id - 1;
                   $("#DocId").val(Id);
                   ValidImgDoc($("#CarId").val(), ExteriorArray[Id].SlNo, ExteriorArray[Id].Extension);
               }
           }
           else if (Flag == 'N')          //Next Img
           {
               if (Id != ExteriorArray.length) {
                   Id = Id + 1;
                   if (Id < ExteriorArray.length) {
                       $("#DocId").val(Id);
                       ValidImgDoc($("#CarId").val(), ExteriorArray[Id].SlNo, ExteriorArray[Id].Extension);
                   }
               }
           }
       }
   }
   else if (Type == 5)                                                                  //Interior
   {
       if (($("#CarId").val() > 0) && RotateArray.length > 0) {
           var Id = parseInt($("#DocId").val() || 0);
           if (Flag == 'P')          //Prev Img
           {
               if (Id != 0) {
                   Id = Id - 1;
                   $("#DocId").val(Id);
                   ValidImgDoc($("#CarId").val(), RotateArray[Id].SlNo, RotateArray[Id].Extension);
               }
           }
           else if (Flag == 'N')          //Next Img
           {
               if (Id != RotateArray.length) {
                   Id = Id + 1;
                   if (Id < RotateArray.length) {
                       $("#DocId").val(Id);
                       ValidImgDoc($("#CarId").val(), RotateArray[Id].SlNo, RotateArray[Id].Extension); 
                   }
               }
           }
       }
   }

 
}
//------------End Popup Img

function ShowSavedFiles(result) {

    disable_datatable('tbl_documentlist');
    $('.doctr').remove();
    $("#SalesDocument").show();
    var responseText = "<tbody>";
    if (result.length > 0) {
        responseText += "<tr class='doctr'><th>Image Type</th><th align=center>Image</th><th>Image Name</th><th></th><th></th></tr>";
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);
            var Icon = '<img src="../app-assets/Project_Icons/DOC_ICON.png" style="width:50px;height:40px" />';
            var Extension = (result[l].Extension).toLowerCase();

            var ImgType = '';
            if (result[l].ImgType == 1)
            { ImgType = 'Exterior'; }
            else if (result[l].ImgType == 2)
            { ImgType = 'Interior'; }
            else if (result[l].ImgType == 3)
            { ImgType = '360'; }
                  
           
            responseText += "<tr class='doctr' id='doctr_" + result[l].IYear + "'>" +
                "<td>" + ImgType + "</td>" +
                "<td align='center'><img style='width:80px;height:70px'  src='../ProjectImages/CarMultiImages/" + $("#CarId").val() + "/" + result[l].SlNo + "." + Extension + "' /></td>" +
                "<td>" + result[l].FileName + "</td>" +
                "<td  align='center'>" +
                "<a onclick=\"ViewDocuments(\'" + $("#CarId").val() + "'\,\'" + result[l].SlNo + "'\,\'" + Extension + "'\)\"><i class='ft-eye' style='color:darkorange;font-weight:700'></i><a>" +
                "</td>" +
                "<td align='center' class='hideedit'>" +
                "<a onclick=\"DeleteDocument(\'" + result[l].IYear + "'\)\">" + DeleteButton + "</a>" + 
                "</td>" +
                "</tr>";
        }
    }
    else {
        responseText = "<tr><td style='text-align:center;color:red;font-weight:500'>NO DOCUMENTS</td></tr>"
    }
    $('#tbl_documentlist').html(responseText + '</tbody>');
}

function ViewDocuments(CarId,Foldername, Extension) {
    var flname = '../ProjectImages/CarMultiImages/' + CarId + '/' + Foldername + '.' + Extension;
    window.open(flname);
}

function DeleteDocument(FileId) {

    $('#Confirmflag').val('Filedelete'), $('#ConfirmRowId').val(FileId)
    $('#confirmmessage').text('Do You Want To Delete This File?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}

function OKDeleteDocument(FileId) {
    var data = {};
    data.CarId = FileId;
    data.DeptId = ERPDeptId; 
    data.SlNo = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../RentCar/CarFileDelete",
        data: data,
        success: function (result) {
            $("#doctr_" + FileId).remove();
            swal('Documents Deleted Successfully', "", "error");
            $('.swal-button swal-button--confirm').focus();
            ViewSavedFiles(1);
            ViewSavedFiles(2);
            ViewSavedFiles(3);
            ViewSavedFiles(4);
            ViewSavedFiles(5);
        }
    });
}

function PrevNext(id, Flag) {
    if (($("#CarId").val() > 0) && DocArray.length>0)
    {
        var Id = parseInt($("#imgId").val()||0);
        if(Flag=='P')          //Prev Img
        {
            if (Id != 0) {
                Id = Id - 1;
                $("#imgId").val(Id);
                ValidImg($("#CarId").val(), DocArray[Id].SlNo, DocArray[Id].Extension); 
            }
        }
        else if (Flag == 'N')          //Next Img
        {
            if (Id != DocArray.length) {
                Id = Id + 1;
                if (Id < DocArray.length)
                {
                    $("#imgId").val(Id);
                    ValidImg($("#CarId").val(), DocArray[Id].SlNo, DocArray[Id].Extension);
                }
            }
        }  
    } 
}

function ValidImg(Id,Foldname,Ext)
{
    $.ajax({
        url: "../ProjectImages/CarMultiImages/" + Id + "/" + Foldname + "."+Ext+"", 
        type: 'HEAD',
        error: function () {
            $('#myImg').attr('src', "/app-assets/img/Cars/car1.jpg");
        },
        success: function () {
            $('#myImg').attr('src', "../ProjectImages/CarMultiImages/" + Id + "/" + Foldname + "." + Ext + "");
            //  $('#myImg').attr('src', "../ProjectImages/Products/" + result[0].ItemId + ".png?" + dd.getTime());
        }
    });
}

//-----------------End Multiple Image Upload

//-----------------Common Functions
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'Open Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Code' || title == 'Current KM' || title == 'EngineNo' || title == 'Reg. Date')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:95%" />');
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
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8] }
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

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh(0);
}

function disable_datatable(tablename) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        return;
    }
}

//-----------------End Common Functions

//-------------------------------------------Old Item Master Functions

//Block ' in itemCode and Description

function isSinglqts(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 39) {
        evt.preventDefault();
        //warningshow('Digits Only')
        return false;
    }
    return true;

}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function isNumberthis(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var id = $(selectedvalue).attr('id')
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;
}

function isNumberInt(evt, selectedvalue) {

    var id=$(selectedvalue).attr('id')
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
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

//-------------------------------------------End Old Item Master Functions











