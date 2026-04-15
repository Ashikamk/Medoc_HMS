var BloodGroup = [{ value: "A+", label: "A+", }, { value: "A-", label: "A-", }, { value: "B+", label: "B+", }, { value: "B-", label: "B-", },
                  { value: "O+", label: "O+", }, { value: "O-", label: "O-", }, { value: "AB+", label: "AB+", }, { value: "AB-", label: "AB-", }];
var CountryId = 0; var SearchFlag = 0; var Bl = 0;
var BillFlag = 0;
$(document).ready(function () {
    Defaultfocus();

    LoadDate();
    ShiftLoad();
    OPLoad();
    CountryLoad();
    DoctorLoad();

    $("#PNameSearch").keyup(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        if (key == 13 || key == 32) {

            GetRowsInfo(1);
        }
        else if ((key == 8 || key == 46) && $.trim($("#PNameSearch").val()) == '') {

            GetRowsInfo(1);
        }
    });

    $('.nav-link').click(function (e) {
        var id = $(this).attr('id');
        if (id == 'tab2') {
            window.setTimeout(function () { $('#OtherFee').focus().select(); });
        }
        else if (id == 'tab1')
        { window.setTimeout(function () { $('#State').focus().select(); }); }

    });

    $("#btnsubmit").click(function (e) {
        $('#btnsubmit').hide();
        SaveAndUpdate(1)
    });

   
    $("#btnsavesubmit").click(function (e) {

        BillFlag = 1;
        SaveAndUpdate(1);
    });
   
    $("#TokenNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnsubmit").focus();
        }
    });
    $('.frsdwn:not(.atcmpt)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find('.frsdwn:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        } 
    });
    $('.frsup').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find('.frsup:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('#District').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#State').focus().select();
        }
    });
    $('#ConsultFee').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#TokenNo').focus().select();
        }
    });
    $('#MtOccupation').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#TokenNo').focus().select();
        }
    });
    $('#PDOB').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Age').focus().select();
        }
    });
    $('#Shift').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#TokenNo').focus().select();
        }
    });
    $("#btndelete").click(function (e) {
        $('#confirmmessage').text('Do You Want To Delete This Record?')
        $('#confirm').show();
        $('#confirmOk').focus();
    });

    if (window.File && window.FileList && window.FileReader) {

        $("#selectedImage").on("change", function (e) {
            ScratchImgArray = [];
            var files = e.target.files,
              filesLength = files.length;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i];
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    var file = e.target;
                    ScratchImgArray.push(e.target.result);
                    $('#myImg').attr('src', ScratchImgArray[0]);
                    CurImg = 0;
                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
        alert("Your browser doesn't support to File API")
    }
    GetPatientAge();
});

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function LoadDate()
{
    $('#RegDate').daterangepicker({
       
        maxDate: new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    }).val(CurDate);
    $('#PDOB').daterangepicker({

        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    });
    CheckEOD();
}
function CheckEOD() {
    if (EODType == 'EOD') {
        $("#RegDate").prop('disabled', true).addClass('bgclrwht');
    }
    else {
        $("#RegDate").prop('disabled', false).removeClass('bgclrwht');
    }
}

function ShiftLoad()
{
    var data = {};                                       //dropdownbind
    data.Flag = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_ShiftGetandGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#Shift").empty();
                for (var i = 0; i < result.oList.length; i++) {
                    $("#Shift").append("<option value='" + result.oList[i].Flag + "'>" + result.oList[i].Shift + "</option>");
                }                
            }
        }
    });
}

function TokenLoad() {
    if ($("#Doctor").val() != 0) {
        var data = {};
        data.DoctorId = $("#Doctor").val();
        data.Shift = $("#Shift").val();
        data.RevisitDate = $("#RegDate").val(); 
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_TokenNumberGets",
            data: data,
            success: function (result) {
                if (result.oList.length > 0) {
                    $("#TokenNo").val(result.oList[0].TokenNumber);
                }
            }
        });
    }
    else {
        $("#TokenNo").val(''); 
    }
}

function OPLoad()
{  
  var data = {};
  data.id = 0;
  data.DeptId = ERPDeptId;
  data.BillType = 'OP';
  $.ajax({
      type: "POST",
      url: "../Master/HMS_OPSeriesGetandGets", 
      data: data,
      success: function (result) {
          $("#RegSeries").empty();
          var regFee = 0;
          for (var i = 0; i < result.oList.length; i++) {
              $("#RegSeries").append("<option value='" + result.oList[i].id + "' name='" + result.oList[i].CurrentNo + "'>" + result.oList[i].BillDescription + "</option>");
              regFee = parseFloat(result.oList[i].StartingNo || 0);
              if (i == (result.oList.length - 1))
              { OPNoLoad();}
          }
          DDREGFEE = regFee
          $('#RegFee').val(regFee)
          createQRCode();
          generatebarcode();
      }
  });    
}

function OPNoLoad()
{
    $('#RegNo').val($("#RegSeries").find("option:selected").attr('name'));
    createQRCode();
    generatebarcode();
}

function CountryLoad()
{
    var data = {};
    data.CountryId = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetCountry",
        data: data,
        success: function (result) {           
            $("#Country").empty();
            for (var i = 0; i < result.oList.length; i++) {               
                $("#Country").append("<option value='" + result.oList[i].CountryId + "'>" + result.oList[i].CountryName + "</option>");
                if ((result.oList[i].CountryName).toUpperCase() == 'INDIA')
                { CountryId = result.oList[i].CountryId; }
                if (i == (result.oList.length - 1) && CountryId > 0)
                { $("#Country").val(CountryId) }
           }
        }
    });
}

function DoctorLoad() {
    var data = {};                                       //dropdownbind
    data.DoctorId = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_RevistDoctorGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#Doctor").empty();
                $("#Doctor").append("<option value='0' Fee='0'>Select</option>");
                for (var i = 0; i < result.oList.length; i++) {
                    $("#Doctor").append("<option value='" + result.oList[i].DoctorId + "'  Tokenprefix='" + result.oList[i].Add1 +"'  Fee='" + result.oList[i].ConsultFees + "'>" + result.oList[i].DoctorName + "</option>");
                }
            }
        }
    });
}

var fixedconfee = 0;
function ChangeFee() {
    $("#ConsultFee").val(parseFloat($("#Doctor").find("option:selected").attr("Fee") || 0).toFixed(Decimal));
    DDCONFEE = parseFloat($("#Doctor").find("option:selected").attr("Fee") || 0).toFixed(Decimal)
    amountfillinpopup();
    fixedconfee = parseFloat($("#Doctor").find("option:selected").attr("Fee") || 0).toFixed(Decimal)
    $("#OtherFee").val('');
}

function Defaultfocus() {
    $('#PName').focus();
}

function formrefresh() {
    Defaultfocus();
    SelectPayType();
    $('.form-control,#RegDate,#selectedImage').val(''); $('#MFlag').val(0);
    $('#myImg').attr('src', "../app-assets/img/NoImage.png");
    $('#btnsavesubmit').show();
    $('#btnsubmit').show();
    LoadDate();
    $('#btndelete,#btnprint,#btntoken,#printId').hide();

    $('select').each((i, item) => {
        var $item = $(item);
        $item.val($item.find('option:first').val());
    });
    if (CountryId>0)
    $("#Country").val(CountryId);
    OPLoad();
    PatientSearch(1);
    Bl = 0;

    $('#snapbutton,#snap1,#CamDiv').hide();
    $('#myImg,#selectedImage').show();

    createQRCode();
    generatebarcode();
    CheckEOD();
}

function ClearData(flg)
{
    if (flg == 0)
    {
        $('.form-control:not(.notclr),#RegDate,#selectedImage').val(''); $('#MFlag').val(0);
        $('#myImg').attr('src', "../app-assets/img/NoImage.png");
        $('select').each((i, item) => {
            var $item = $(item);
            $item.val($item.find('option:first').val());
        });
        if (CountryId > 0)
            $("#Country").val(CountryId);

        $('#btnRevisit').hide(); 
    }
   
}

function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'Search') {
        formrefresh();
        PatientSearch(0); 
    }
    else if (Result == 'true' && status == 'MobileDupe') {
        SaveAndUpdate(3); 
    }
    else if (Result == 'true' && status == 'Clear') {
        formrefresh();
    }
    else if (Result == 'true') {
        SaveAndUpdate(0);
    }
    $('#confirm').fadeOut();
}

function ConfirmOperation(flg)
{
    if ((flg == 'Search' || flg == 'Clear') && ($.trim($('#PName').val()) || $.trim($('#MobileNo').val())))
    {
    $('#Confirmflag').val(flg);
    var msg = '';
    msg = 'Data Will be Lost!Do You Want To Continue?';
    $('#confirmmessage').text(msg);
    $('#confirm').show();
    $('#confirmOk').focus();
    }
    else if (flg == 'Search')
    {
        formrefresh();
        PatientSearch(0);
    }
    else if (flg == 'Clear') {
        formrefresh();
    }
}

function PatientSearch(flag)
{
    if(flag==0)           //Search Patient
    {
        $('#Searchcode').show().focus();
        $("#Searcdiv").hide();
        $('#btnsubmit,#btnlist').hide();
    }
    else if (flag == 1) {
        $('#Searchcode').hide();
        $("#Searcdiv").show();
        $('#btnRevisit').hide();
        $('#btnsubmit,#btnlist').show();
    }
}


function LoadRegNumber()
{
    $("#Searchcode").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            
            ClearData(0);
            
            var data = {};
            data.PatientName = $("#Searchcode").val();
            data.DeptId = ERPDeptId;
            $.ajax({
                url: '../Revisit/HMS_PatientSearchRegistration',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '3RR',
                            label: item.OPSerName+' - '+item.OPNumber,
                            label1: item.PatientName,
                            label2: item.Add1,
                            label3: item.Add2,
                            label4: item.Contact,
                            PatientId: item.PatientId,
                            DOB: item.DOB,
                            Contact: item.Contact,
                            OPNumber: item.OPNumber,
                            PatientName: item.PatientName,
                            headers: ["RegNo", "Patient", "Guardian", "Address", "Mobile"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,

        select: function (event, ui) {
            GetRows(ui.item.PatientId,1);
           
        },

    });
}

function SaveAndUpdate(flag)
{
    var fname = ''; var delfl;
    var fi = document.getElementById('selectedImage');
    
        for (var i = 0; i <= fi.files.length - 1; i++) {
            if (fname == '')
            { fname = fi.files.item(i).name; }
            else { fname = fname + ',' + fi.files.item(i).name; }
        }

        if ((fname == '') && (($('#RegId').val())>0))
        {
            fname = $('#ImgName').val(); 
        }

    if (($('#RegSeries').val()||0) == 0) {
        warningshow('Please Enter the RegNo', 'RegNo');
        $('#btnsubmit').show();
    }
    else if ($.trim($('#RegNo').val()||0) == 0) {
        warningshow('Please Enter the RegNo', 'RegNo');
        $('#btnsubmit').show();
    }

    //else if ($.trim($('#PName').val()).substring(0, 1) != $("#RegSeries option:selected").text()) {
    //    warningshow('Please Select Valid Series(Starting letter Of Name', 'RegSeries');
    //}


    else if ($.trim($('#PName').val()) == "") {
        warningshow('Please Enter the Name', 'PName');
        $('#btnsubmit').show();
    }
    else if (($('#PGender').val() || 0) == 0) {
        warningshow('Please Select the Gender', 'PGender');
        $('#btnsubmit').show();
    }
    else if (($.trim($("#Bloodgroup").val()) != '') && (Bl == 0))
    { warningshow('Please Select a valid Blood Group', 'Bloodgroup'); $('#btnsubmit').removeAttr("disabled"); }
    else if (($('#Age').val() == '') && ($('#Age1').val() == '') && ($('#Age2').val() == '')) {
        warningshow('Please Select the DOB', 'PDOB');
        $('#btnsubmit').show();
    }   
    else if ($.trim($('#MobileNo').val()) == "") {
        warningshow('Please Enter the MobileNo', 'MobileNo');
        $('#btnsubmit').show();
    }
    //else if ($.trim($('#Address1').val()) == '') {
    //    warningshow('Please Enter the Address', 'Address1');
    //    $('#btnsubmit').show();
    //}
    else if (($('#Doctor').val()||0) == 0) {
        warningshow('Please Select the Doctor', 'Doctor');
        $('#btnsubmit').show();
    }
    else if (($('#Shift').val() || 0) == 0 || $.trim($('#Shift').val()) == '' || $('#Shift').val() == undefined) {
        warningshow('Please Select the Shift', 'Shift');
        $('#btnsubmit').show();
    }
    //else if ($.trim($('#AdharNo').val()) == '') {
    //    warningshow('Please Enter AdharNo', 'AdharNo');
    //}
    else if(Validateemail()==false)
    {
        return Validateemail();
        $('#btnsubmit').show();
    }
    else {
        if (flag == 3) { $('#MFlag').val(1); }
        else { $('#MFlag').val(0); }

        if (flag==0) { delfl = 0; }
        else { delfl = 1; }

        var Sts = 0;
        if ($('#select_status').is(':checked'))
        { Sts = 1; }
  

        var data = {};   //array
        data.RegSeries = $('#RegSeries').val();
        data.RegNo = $('#RegNo').val();
        data.PName = $('#PName').val();
        data.PGender = $('#PGender').val();
        data.Age = parseInt($('#Age').val());
        data.PDOB = $('#PDOB').val();
        data.Doctor = $('#Doctor').val();
        data.HealthCardNo = $('#HealthCardNo').val();
        data.MobileNo = $('#MobileNo').val();
        data.PhoneNo = $('#PhoneNo').val();
        data.Address1 = $('#Address1').val();
        data.Address2 = $('#Address2').val();
        data.Address3 = $('#Address3').val();
        data.AdharNo = $('#AdharNo').val();
        data.RegFee = $('#RegFee').val();
        data.ConsultFee = $('#ConsultFee').val();
        data.OtherFee = $('#OtherFee').val();
        data.TokenNo = $('#TokenNo').val();
        data.RegDate = $('#RegDate').val();
        data.Birthweight = $('#BirthWt').val();
        data.Currentweight = $('#CurrentWt').val();
        data.Bloodgroup = $('#Bloodgroup').val();
        data.Height = $('#PHeight').val();
        data.Fathersname = $('#FatherName').val();
        data.Mothersname = $('#MotherName').val();
        data.FatherOccupation = $('#FtOccupation').val();
        data.MotherOccupation = $('#MtOccupation').val();
        data.UserId = ERPUserId;
        data.DeptId = ERPDeptId; 
        data.DelFlag = delfl; 
        data.Status = Sts;
        data.RegId = $('#RegId').val() || 0;       
        data.District = $('#District').val();
        data.State = $('#State').val();
        data.Religion = $('#Religion').val();
        data.Occupation = $('#PayType').val(); //$('#Occupation').val();
        data.EmailId = $('#EmailId').val();
        data.selectedImage = fname;
        data.Country = $('#Country').val();
        data.Shift = $('#Shift').val();
        data.MFlag = $('#MFlag').val() || 0;

        data.Cash = parseFloat($('#regcash').val()||0);
        data.Upi  = parseFloat($('#regupi').val()||0);
        data.Card = parseFloat($('#regcard').val() || 0);

        
        //ajax code for insert and update to master controller
        $.ajax({
            type: "POST",
            url: "../Master/HMS_RegistrationInsertandUpdate",
            data: data,
            success: function (result) {
                $('#btnsubmit').removeAttr("disabled");
                var status = result.oList[0].Status;
                var RegId = result.oList[0].RegId;               
                var RegNo = result.oList[0].RegNo;

                sessionStorage.setItem("BSOP_PI", RegId);
                sessionStorage.setItem("BSOP_IP", 0);
                if (status==0)
                {
                swal('Reg No ' + $('#RegSeries :selected').text() + ' - ' + RegNo + ' Already Exists', "", "warning");
                $('.swal-button swal-button--confirm').focus();
                    $('#btnsubmit').show();
               
                }
                else if (status==6)
                {
                    swal('Same Patient Name and Mobile Number Already Exists', "", "warning");
                    $('.swal-button swal-button--confirm').focus();
                    $('#btnsubmit').show();
                }
                else if (status == 7) {
                    $('#Confirmflag').val('MobileDupe');
                    $('#confirmmessage').text('Same Mobile Number Already Exists!Do you want to continue?');
                    $('#confirm').show();
                    $('#confirmOk').focus();
                    $('.swal-button swal-button--confirm').focus();
                }
                else
                {
                  
                    if (status == 1 || status == 2) {
                        fnImageSave(fname, RegId, status);
                        ShowPrintAlerts(status, RegNo)
                    }
                    else {
                        Showalerts(status, RegNo);
                    }
                }
            }
        });
    }
}

function GetRows(RegId, fl) {

    $('#LoadingSmall').show();
    $('#RegId').val(RegId);
    if (RegId == 0)
    {
        $("#PNameSearch").val('');
        GetRowsInfo(0);
    }
    else {

    var data = {};
    data.RegId = RegId;
    data.RegSeries = $('#RegSeries').val();
    data.RegNo = $('#RegNo').val();
    $.ajax({
        type: "POST",
        url: "../Master/HMS_RegistrationGetandGets",
        data: data,
        success: function (result) {

            ShowRegistrationGet(result, fl);
            $('#LoadingSmall').hide();

        }
    });

    }
}

function GetRowsInfo(Flag) {
    $('#LoadingSmall').show();
    if ($.trim($("#PNameSearch").val()) == '') { Flag = 0; }

    var data = {};
    data.PName = $.trim($("#PNameSearch").val());
    data.DeptId = ERPDeptId
    data.MFlag = Flag;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_RegPatientInfo",
        data: data,
        success: function (result) {

            ShowRegistrationlist(result);

        }
    });
}

function ShowRegistrationlist(result) {
    $('#LoadingSmall').hide();
    $('#Entry').hide();
    $('#listing').show();
    $("#PNameSearch").focus();

    disable_datatable('tblRegister', 'itemListButtonPlace');

    var responseText = "<thead><tr><th align=center>Sl#</th><th >Reg.No</th><th>Date</th><th >Name</th><th >Address</th><th>Gender</th><th>DOB</th><th>MobileNo</th><th>AdharNo</th><th>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        var Gender = '';
        if (result[i].PGender == 1)
            Gender = 'Male';
        else if (result[i].PGender == 2)
            Gender = 'Female';
        else if (result[i].PGender == 3)
            Gender = 'Others';
        responseText += '<tr><td align=center>' + slno
            + '</td><td>' + result[i].OPDescription + ' - ' + result[i].RegNo
            + '</td><td>' + result[i].RegDate
            + '</td><td>' + result[i].PName
            + '</td><td>' + result[i].Address1 + ' ' + result[i].Address2 + ' ' + result[i].Address3
            + '</td><td>' + Gender
            + '</td><td>' + result[i].PDOB
            + '</td><td>' + result[i].MobileNo
            + '</td><td>' + result[i].AdharNo
            + '</td><td onclick="GetRows(' + result[i].RegId + ',0)"  align=center>' + Editbutton
            + '</td></tr>';
    }
    $('#tblRegister').html(responseText + '</tbody><tfoot><tr><th> </th><th>Code</th><th>Date</th><th>Name</th><th>Address</th><th>Gender</th><th>DOB</th><th>MobileNo</th><th>AdharNo</th><th> </th></tr></tfoot>');
    datatableWithsearch('tblRegister', true, 'Registration', 'itemListButtonPlace');



}


function ShowRegistrationGet(result, fl) {

    
    $('#Entry').show();
    $('#listing').hide();

    $('#btnsavesubmit').hide();

    if (result[0].Status == 1)
        $('#select_status').prop('checked', true);
    else
        $('#select_status').prop('checked', false);
 
       $('#RegSeries').val( result[0].RegSeries );                                        
       $('#RegNo').val( result[0].RegNo );        
       $('#PName').val( result[0].PName);         
       $('#PGender').val( result[0].PGender);       
       $('#Age').val(result[0].Age);
       $('#Bloodgroup').val(result[0].Bloodgroup);
       if (result[0].Bloodgroup != '')
       { Bl = 1; }
       else
       { Bl = 0; }
       $('#PDOB').val( result[0].PDOB );       
       $('#Doctor').val( result[0].Doctor );       
       $('#HealthCardNo').val( result[0].HealthCardNo);  
       $('#MobileNo').val( result[0].MobileNo);      
       $('#PhoneNo').val( result[0].PhoneNo );  
       $('#Address1').val( result[0].Address1  );    
       $('#Address2').val( result[0].Address2  );    
       $('#Address3').val( result[0].Address3  );    
       $('#AdharNo').val( result[0].AdharNo );   
       $('#RegFee').val(parseFloat(result[0].RegFee || 0).toFixed(Decimal));
       $('#ConsultFee').val(parseFloat(result[0].ConsultFee || 0).toFixed(Decimal));
       $('#OtherFee').val(parseFloat(result[0].OtherFee || 0).toFixed(Decimal));
       $('#TokenNo').val( result[0].TokenNo );      
       $('#RegDate').val(result[0].RegDate);                                     
       $('#District').val(result[0].District);
       $('#State').val(result[0].State);
       $('#Religion').val(result[0].Religion);
       $('#Occupation').val(result[0].Occupation);
       $('#EmailId').val(result[0].EmailId);
       $('#Country').val(result[0].Country);
       $('#ImgName').val(result[0].selectedImage);
       $('#Shift').val(result[0].Shift);

       $('#BirthWt').val(result[0].Birthweight);
       $('#CurrentWt').val(result[0].Currentweight);
       $('#PHeight').val(result[0].Height);
       $('#FatherName').val(result[0].Fathersname);
       $('#MotherName').val(result[0].Mothersname);
       $('#FtOccupation').val(result[0].FatherOccupation);
       $('#MtOccupation').val(result[0].MotherOccupation);

    DDCONFEE = parseFloat(result[0].ConsultFee || 0)
    DDREGFEE = parseFloat(result[0].RegFee || 0);

    var Am = parseFloat(result[0].RegFee || 0) + parseFloat(result[0].ConsultFee || 0)

    $('#regtotal').val(Am.toFixed(2))

    $('#regcash').val(result[0].Cash);
    $('#regupi').val(result[0].Upi);
    $('#regcard').val(result[0].Card);

    //if (result[0].Cash != 0) {    $('#PayType').val(1)  }
    //else if (result[0].Upi != 0) {$('#PayType').val(3)  }
    //else if (result[0].Card != 0) { $('#PayType').val(4)}
    //else { $('#PayType').val(2) }

    $('#PayType').val(result[0].Occupation)
 

      
       var Ext = (result[0].selectedImage).split('.').pop();
       CheckImgValid('myImg', result[0].RegId, Ext);

       GetPatientAge();

       if (fl == 0)                                  //Details Get
       {
           $('#btndelete,#btntoken,#printId').show();
           $('#btnprint').prop('disabled', false);
           $('#PName').focus();
       }
           
       else if (fl == 1)                            //Revisit
       {
           $('#Searchcode').focus();
           $('#btnRevisit').show();
       }
    $("#btnprint,#btntoken,#printId").show();
       createQRCode();
    generatebarcode();
    /* anu */
    $('#Entry').on('input change', function () {
        if ($(this).val() != '') {
            $('#btnprint').prop('disabled', false);
        }
        else {
            $('#btnprint').prop('disabled', true);
        }
    });
   /*  anu*/
}

function CheckImgValid(Id, RegId, Ext)
{
    var d = new Date();
    $.ajax({
        url: "../ProjectImages/PatientImage/" + RegId + "." + Ext + "",
        type: 'HEAD',
        error: function () {
            $('#' + Id).attr('src', "/app-assets/img/NoImage.png");
        },
        success: function () {
            $('#' + Id).attr('src', "../ProjectImages/PatientImage/" + RegId + "." + Ext + "?"+d.getSeconds());
        }
    });
}

//Age Calculation
function GetPatientAge()
{  
    $('#Age,#Age1,#Age2').val('');
    var yearString = ""; var monthString = ""; var dayString = "";

    var dateString = document.getElementById("PDOB").value;
   
    var age = AgeCalculation(dateString);
  
    if (age.years > 1) yearString = " Years";
    else yearString = " Year";
    if (age.months > 1) monthString = " Months";
    else monthString = " Month";
    if (age.days > 1) dayString = " Days";
    else dayString = " Day";

    if(age.years>0){$('#Age').val(age.years + yearString);}
    if(age.months>0){$('#Age1').val(age.months + monthString);}
    if(age.days>0){$('#Age2').val(age.days + dayString);}
  
    if(dateString==CurDate)
    {
        $('#Age2').val('0 Day');
    }      
}

function validate(file) {
    var ext = file.split(".");
    ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = ["jpg", "jpeg", "png", "bmp", "gif", "jfif", "tiff"];

    if (arrayExtensions.lastIndexOf(ext) == -1) {
        warningshow("Wrong extension type.");
        $("#selectedImage").val("");
    }
}

function fnImageSave(imageName, RegId,sts) {
  
    var formData = new FormData();
    var totalFiles = document.getElementById("selectedImage").files.length;
    var browsedFile = document.getElementById("selectedImage").files[0];
    var ImageId = RegId;
    if ((imageName != "" && totalFiles != 0)) {
        var Exten = $("#selectedImage").get(0).files[0].name.split('.').pop();       
        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", RegId);
            formData.append("Exten", Exten);
            formData.append("UniqueId", ImageId);           
            $.ajax({
                type: "POST",
                url: '/Master/UploadPatientImage', 
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {

                }
            });
        }
    }
    else {
        return;
    }

}

function ShowPrintAlerts(Status, RegId) {
    if (Status == 1) {
        window.setTimeout(function () {
            swal({
                title: 'Reg No. ' + $("#RegSeries option:selected").text() + '-' + RegId + ' Saved Successfully !',
                text: "Do you want to Print?",
                icon: 'success',
                buttons: {
                    cancel: "Cancel",
                    defeat: "Print",
                   // Other: "Go to Bill",

                },
            })
                .then((value) => {
                    switch (value) {

                        case "defeat":
                            PrintRegistrationData();
                            window.setTimeout(function () { formrefresh(); }, 300);
                            break;
                        case "Other":
                            window.open('../Revisit/LabBill?flag=reg', '_blank');
                           // window.open('../Revisit/ProcedureBill?flag=reg', '_blank');
                            formrefresh();
                            break;

                        default:
                            formrefresh();
                            break;
                    }
                });
        }, 200);
    }
    else if (Status == 2) {
        window.setTimeout(function () {
            swal({
                title: 'Reg No. ' + RegId + ' Updated Successfully !',
                text: "Do you want to Print?",
                icon: 'success',
                buttons: {
                    cancel: "Cancel",
                    defeat: "Print",
                },
            })
                .then((value) => {
                    switch (value) {

                        case "defeat":
                            PrintRegistrationData();
                            window.setTimeout(function () { formrefresh(); }, 300);
                            break;

                        default:
                            formrefresh();
                            break;
                    }
                });
        }, 200);
    }


    if (BillFlag == 1) {
        window.open('../Revisit/ProcedureBill?flag=reg', '_blank');
        BillFlag = 0;
        $('.swal-button--cancel').click();
    }

}

function PrintRegistrationData() {
    if (TOKENPRINTSTSTUS == 0) {
        TokenPrint()
    }
    else {
        PrintRegistration()
    }
}


function PrintRegistration() {
    var Rowlen = 0; var Rowcount = 10; var TotalAmount = 0;

    var TotalAmount = parseFloat($("#RegFee").val() || 0) + parseFloat($("#ConsultFee").val() || 0)

    var AmountinWords = convertNumberToWords(TotalAmount);
    var myWindow = window.open("", "", "width=1500,height=1500");



    var Age = $('#Age').val() + '/' + $('#PGender :selected').text();
    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG3);

    $(ComapnydivToPrintLab).css('height', 80); $(ComapnydivToPrintLab).css('width', 300);
    myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
    myWindow.document.write('</table>');

    var TypeText = '';


    myWindow.document.write('<table width=100% ><tr ><td width=10% align=left >MR#&#160;&#160; :</td><td colspan=4 align=left width=60%>' + $('#RegNo').val() + '</td><td align=right width=10%>Date &#160;&#160;&#160;&#160;&#160;&#160;: </td><td  colspn=2 width=20% >' + $('#RegDate').val() + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Patient:</td><td colspan=4 align=left width=60%>' + $('#PName').val() + '</td><td align=right width=10%>Age/Sex : </td><td colspn=2 width=20% >' + Age + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Doctor:</td><td colspan=4 align=left width=60%>' + $('#Doctor :selected').text() + '</td>' + TypeText + '</tr>');
    myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
    myWindow.document.write('</table>');

    var HeaderRow = '<tr class=violetbg style="border-bottom:1px solid grey"><td align=center style="width:5%">Sl#</td><td align=center width=75%>Description</td><td align=right style="width:20%">Amount</td></tr>';


    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey">' + HeaderRow);

    if (parseFloat($("#RegFee").val() || 0) > 0) {
        Rowlen++
        myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + Rowlen + '</td><td style="padding-left:5px">Registration Fees</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas(parseFloat($("#RegFee").val() || 0).toFixed(Decimal)) + '</td></tr>');
    }
    if (parseFloat($("#ConsultFee").val() || 0) > 0) {
        Rowlen++
        myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + Rowlen + '</td><td style="padding-left:5px">Consultation Fees</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas(parseFloat($("#ConsultFee").val() || 0).toFixed(Decimal)) + '</td></tr>');
    }
    //if (parseFloat($("#ConsultFee").val() || 0) > 0) {
    //    Rowlen++
    //    myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + Rowlen + '</td><td style="padding-left:5px">Other Fees</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas(parseFloat($("#OtherFee").val() || 0).toFixed(Decimal)) + '</td></tr>');
    //}

    var RoughRow = '<tr class=brtd2><td style="border-left:1px solid grey;" align=center>&#160;</td><td style="padding-left:5px"></td><td align=right style="border-right:1px solid grey;padding-right:5px"></td></tr>';



    for (var i = 1; i < Rowcount - Rowlen; i++) {
        myWindow.document.write(RoughRow);
    }


    if ($("#OtherFee").val() != 0) {
        myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=2 font-size: 13px;" align=right>Disc %</td><td style="font-family:tahoma; font-size: 13px;"  align=right >' + addCommas(parseFloat($("#OtherFee").val() || 0).toFixed(Decimal)) + '</td></tr>');
        myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=2 font-size: 13px;" align=center style="font-weight:bold">' + AmountinWords + 'Only' + '</td><td style="font-family:tahoma; font-size: 13px;"  align=right ><b>' + addCommas(parseFloat(TotalAmount).toFixed(Decimal)) + '</b></td></tr>');

    }
    else {
        myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=2 font-size: 13px;" align=center style="font-weight:bold">' + AmountinWords + 'Only' + '</td><td style="font-family:tahoma; font-size: 13px;"  align=right ><b>' + addCommas(parseFloat(TotalAmount).toFixed(Decimal)) + '</b></td></tr>');

    }

    myWindow.document.write('</table>');

    myWindow.document.write('<table><tr style="border:none"><td height=15px colspan=8></td></tr></table>');

    myWindow.document.write('<table width=100%>');

    myWindow.document.write('<tr><td>' + window.CompanySettingsArray.CompanyName + '</td><td rowspan="5" align=right style="vertical-align: bottom;">Cashier</td></tr>');
    myWindow.document.write('<tr><td>' + window.CompanySettingsArray.Address + '</td></tr>');
    myWindow.document.write('<tr><td>' + window.CompanySettingsArray.Fax + '</td></tr>');
    myWindow.document.write('<tr><td>' + window.CompanySettingsArray.Email + '</td></tr>');
    myWindow.document.write('<tr><td>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');



    myWindow.document.write('</table>');

    myWindow.print();

}

//Show Window Alert Insert,update delete  Modify
function Showalerts(Status,RegId) {
    if (Status == 1) {
        window.setTimeout(function () {
            formrefresh();
            swal('Reg No. ' + RegId + ' Saved Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();
        }, 200);
    }
    else if (Status == 2) {
        window.setTimeout(function () {
            formrefresh();
            swal('Reg No. ' + RegId + ' Updated Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();
        },200);
    }
    else if (Status == 3) {
        formrefresh();
        swal('Reg No. ' + RegId + ' Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        formrefresh();
        swal('Reg No. ' + RegId + ' Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {

        swal('Token no. Already taken', "Please Enter any token No", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh();
        swal('Data Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
        $('#btnsubmit').show();
    }

}

function datatableWithsearch(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ' )
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');
        
    });


    // AddColumnSelectionButton(tableButtonContainerId, tablename)

    table = $('#' + tablename).DataTable({
        // dom: 'Bfrtip',
        dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-1'i><'col-sm-11'p>>",
        buttons: [],

                  "columnDefs": [
                   { "width": "5%",  "targets": 0  },
                   { "width": "8%",  "targets": 1  },
                   { "width": "20%", "targets": 2  },
                   { "width": "42%", "targets": 3  },
                   { "width": "5%",  "targets": 4  },
                   { "width": "4%",  "targets": 5  },
                   { "width": "8%",  "targets": 6  },
                   { "width": "20%", "targets": 7  },
                   { "width": "8%",  "targets": 8  },
                   //{ "width": "5%",  "targets": 9  },
                   //{ "width": "2%",  "targets": 10 },
                
                
                ],

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
                    messageTop: 'Medoo Hms',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'Medoo Hms',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'Medoo Hms',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                }
            ]
        },
        'colvis'
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

//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
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

function Validateemail() {
    var email = $('#EmailId').val();
    if (email != '')
    {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //var address = document.getElementById[email].value;
    if (reg.test(email) == false) {
        warningshow('Please Enter a valid Email', 'EmailId');
        return (false);
    }
    else
        return true;
    }
    else
        return true;
  
}


//function closePop() {
//    $('#registrationpayment').modal('hide');
//}


function PaymentPop(flg) {
    $('#registrationpayment').modal('show');
    $('#registrationpayment').appendTo('body');
    
}

var DDCONFEE = 0, DDREGFEE = 0;
function paymethodchange() {
    debugger;
   
    var ptype = $('#PayType').val();
    if (ptype == 0) {
        $('#RegFee').val(0)
        $('#ConsultFee').val(0)
    }
    else {     
        $('#ConsultFee').val(DDCONFEE);
        $('#RegFee').val(DDREGFEE)
    }
    amountfillinpopup()
    
}


function amountfillinpopup() {
    var visiting = parseFloat($('#RegFee').val() || 0);
    var Consultation = parseFloat($('#ConsultFee').val() || 0);

    var tot = parseFloat(visiting + Consultation);
    $('#regtotal').val(tot.toFixed(2));

    var Id = $('#PayType').val();
    $('#regcash').val(0.00);
    $('#regupi').val(0.00);
    $('#regcard').val(0.00);

    if (Id == 1) { $('#regcash').val(tot); }
    else if (Id == 3) { $('#regupi').val(tot); }
    else if (Id == 4) { $('#regcard').val(tot); }
    else { $('#regupi').val(0); $('#regupi').val(0); $('#regcard').val(0); }
}


function closePop() {
    var Cash = parseFloat($("#regcash").val() || 0);
    var Upi = parseFloat($("#regupi").val() || 0);
    var Card = parseFloat($("#regcard").val() || 0);
    var Result = parseFloat((Cash + Upi + Card)||0);
    if ($('#PayType').val() == 2) {
        $("#regcash").val(0)
        $("#regupi").val(0)
        $("#regcard").val(0)
        $('#registrationpayment').modal('hide');
    }
    else {
        if (Result != parseFloat($('#regtotal').val()||0)) {
            warningshow('Please Check Payment Amount', 'revcash');
        }
        else {
            /*$('#btnsubmit').click();*/
            $('#registrationpayment').modal('hide');
        }
    }
}

function discountcalculation() {

    if (parseFloat($('#OtherFee').val() || 0) > 100) {
        warningshow('Discount must be less than or equal to 100', 'OtherFee');
        parseFloat($("#OtherFee").val(''));
        parseFloat($("#ConsultFee").val(fixedconfee));
    }
    else {
        var Percentage = parseFloat($("#OtherFee").val() || 0);
        var NewTotal = fixedconfee * Percentage / 100;
        $('#ConsultFee').val(fixedconfee - NewTotal);
        DDCONFEE = (fixedconfee - NewTotal)
        amountfillinpopup()
    }
}




function GetAppointment(AppointmentId) {

    $('#AppointmentId').val(AppointmentId)
    var data = {};
    data.AppointmentId = AppointmentId;
    $.ajax({
        type: "POST",
        url: "../Master/AppointmentGetandGets",
        data: data,
        success: function (result) {

            if (AppointmentId == 0)
                ShowAppointmentlist(result.oList);

            else {
                ShowAppointmentGet(result.oList);
            }
        }
    });
}


function ShowAppointmentlist(result) {

    $("#tblAppointments tbody").empty();
    var EmptyFlag = 0;
    LayouEOD = $('#LayouEOD').text();
    var responseText = "<table width=100%><thead><tr><th align=center>Sl#</th><th>Name</th><th>Doctor</th><th>Date</th><th>Time</th><th>Mob.No</th><th>Edit</th></tr></thead><tbody>";
    var slno = 0;
    for (var i = 0; i < result.length; i++) {
        if (result[i].LastName == '' && result[i].Status1 == 0 && result[i].AppointmentDate == LayouEOD) {
            slno = parseInt(slno + 1);
            EmptyFlag = 1;
            responseText += '<tr><td align=center>' + slno
                + '</td><td>' + result[i].FirstName
                + '</td><td>' + result[i].Doctor
                + '</td><td>' + result[i].AppointmentDate
                + '</td><td>' + result[i].AppointmentTime
                + '</td><td>' + result[i].Contact
                + '</td><td>  <button type="button" style="width:100px"  class="btn btn-primary btn-min-width mr-1 mb-1" onclick="GetAppointment(' + result[i].AppointmentId + ',0)">Apply</button>'
                + '</td></tr>';
        }
    }

    $('#tblAppointments').html(responseText + '</tbody></table>');
    if (EmptyFlag == 0) {
        $('#tblAppointments').html('<table><tbody><tr><td  align=center>NO APPOINMENT DATA</td></tr></tbody></table>');
    }
}



function ShowAppointmentGet(result, fl) {
    $('#Appointmentpp').modal('hide');
    $('#Entry').show();
    $('#listing').hide();
    if (result[0].Status == 1)
        $('#select_status').prop('checked', true);
    else
        $('#select_status').prop('checked', false);

    $('#PName').val(result[0].FirstName);
    $('#PDOB').val(result[0].DOB);
    $('#Age').val(result[0].Age);
    $('#PGender').val(result[0].Gender);
    $('#EmailId').val(result[0].Email);
    $('#MobileNo').val(result[0].Contact);
    $('#Doctor').val(result[0].DoctorId);
}


