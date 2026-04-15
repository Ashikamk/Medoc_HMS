var DownloadButtton = '<i class="fa fa-download" style="color:darkorange"></i>';
var ListTableCount = 0;
var rowcount = 2;
$(document).ready(function () {
    refresh1(); desigload(0); deptload(0);
    locload(0); hourload(0); divload(0);
    cmpyload(); IncrementtypeLoad(0);
    IDGet();
    $('#SalAdvance').prop('disabled', false);
    ;
    $('#DesignationId').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Gender').focus();
        }
    });
    $('#Gender').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Bloodgroup').focus();
        }
    });
    $('#Bloodgroup').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#DateofJoin').focus();
        }
    });
    $('#Nationality').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#LCEmail').focus();
        }
    });
    $('#LCEmail').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#DepartmentId').focus();
        }
    }); 
    $('#DepartmentId').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#LocationId').focus();
        }
    });
    $('#LocationId').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#CompanyId').focus();
        }
    });
    $('#CompanyId').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Mobile').focus();
        }
    });
    $('#Manager').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#tab2').click();
        }
    });
    $('#ContractTypeId').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#FileNo').focus();
        }
    }); 
    $("#btnsubmit").click(function (e) {
        //if ($('#LCEmail').val() != "") {
        //    var Email = $('#LCEmail').val();
        //    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        //    if (!re.test(Email)) {
        //        warningshow('Invalid Email ID', 'LCEmail')
        //        return false
        //    }
        //}       
        //if ($('#Email').val() != "") {
        //    var Email = $('#Email').val();
        //    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        //    if (!re.test(Email)) {
        //        warningshow('Invalid Email ID', 'Email')
        //        return false
        //    }
        //}
        SaveAndUpdate(1)
    });
   
    var data = {};
    data.CountryId = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetCountry",
        data: data,
        success: function (result) {
            CountryLoad(result.oList);
        }
    });
    $('#Comments').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtproduct0').focus();
        }
    });
    var data5 = {};
    data5.EmpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/EmployeeGetandGets",
        data5: data5,
        success: function (result) {
            ManagerLoad(result.oList);
        }
    });

    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        readURL(this);
    });

    Defaultfocus();
    //$("#EmpCode").keypress(function (e) {

    //    if (e.which != 8 && (e.which < 48 || e.which > 57)) {
    //        warningshow('Digits Only', 'EmpCode')
    //        return false;
    //    }
    //});
    $("#txt_hour").keypress(function (e) {

        if (e.which != 8 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only', 'txt_hour')
            return false;
        }
    });

    $('#txt_hour').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btndesignationssave').focus();
        }
    });
    $('#SalAccnt').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if (($('#SalAccnt').val() != '') && ($('#hiddensalaccId').val() == 0)) {
                warningshow('Select A Valid Salary Account', 'SalAccnt');
                $('#SalAccnt').select();
                return false;
            }
            else {
                $('#AdvAccnt').focus();
            }
        }
    });
    $('#AdvAccnt').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if (($('#AdvAccnt').val() != '') && ($('#hiddenadvaccId').val() == 0)) {
                warningshow('Select A Valid Salary Account', 'AdvAccnt');
                $('#AdvAccnt').select();
                return false;
            }
            else {
                $('#txtbankaccount').focus();
            }
        }
    });
});
function IDGet() {
    var data1 = {};
    data1.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetIDType",
        data: data1,
        success: function (result) {
            IDLoad(result.oList);
        }
    });
}
function IDLoad(result) {
    $("#type").empty();
    $("#type").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {

        $("#type").append("<option value='" + result[i].Id + "'>" + result[i].IDType + "</option>");
    }
}

function desigload(Id) {
    var data1 = {};
    data1.DesignationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DesignationGetandGets",
        data1: data1,
        success: function (result) {
            DesignationLoad(result.oList, Id);
        }
    });
}

function deptload(Id) {
    var data3 = {};
    data3.DepartmentId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data3: data3,
        success: function (result) {
            DepartmentLoad(result.oList, Id);
        }
    });
}
function locload(Id) {
    var data4 = {};
    data4.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data4: data4,
        success: function (result) {
            LocationLoad(result.oList, Id);
        }
    });
}
function IncrementtypeLoad(Id) {
    var data4 = {};
    data4.IncrementId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/IncrementGetandGets",
        data4: data4,
        success: function (result) {
           IncrementLoad(result.oList, Id);
        }
    });
}


function divload(Id) {
    var data6 = {};
    data6.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/EmployeeDivisionGetandGets",
        data6: data6,
        success: function (result) {
            DivisionLoad(result.oList, Id);
        }
    });
}
function cmpyload() {
    var data6 = {};
    data6.InsuranceCompanyId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/InsuranceCompanyGetandGets",
        data6: data6,
        success: function (result) {
            CompanyLoad(result.oList);
        }
    });
}
function hourload(Id) {
    var data4 = {};
    data4.WorkingHoursId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/WorkingHoursGetandGets",
        data4: data4,
        success: function (result) {
            WorkingHoursLoad(result.oList, Id);
        }
    });
}


//Document Close
function FocusAdd() {
    $('#add1').focus();
}
function FocusTab3() {
    $('#LCAddress1').focus();
}
function FocusTab4() {
    $('#SalAccnt').focus();
}
function FocusTab1() {
    $('#DepartmentId').focus();
}
function EmployeeDelete() {
    var data = {};   //array
    data.EmpId = $('#EmpId').val();
    $.ajax({
        type: "POST",
        url: "../Master/EmployeeInsertandUpdate",
        data: data,
        success: function (result) {
            for (var i = 0; i <= result.oList.length; i++) {
                var status = result.oList[i].Status;
                Showalerts(status);
            }
        }
    });
}
function DocumentEntryShow(Id) {
    $('#documtdiv').show();
    $('#Licenceid,#Labourid,#Divnationalid,#Divvisa,#Divpassport,#Insurancecmpy').hide();
    //passport
    if (Id == 1) {
        $('#modelheader').text('Passport Master');
        $('#Divpassport').show();
        $('#DocNumber1').focus();
    }
        //visa
    else if (Id == 2) {
        $('#modelheader').text('Visa Master');
        $('#Divvisa').show();
        $('#DocNumber2').focus();
    }
        //national id
    else if (Id == 3) {
        $('#modelheader').text('National ID Master');
        $('#Divnationalid').show();
        $('#DocNumber3').focus();
    }//licence no
    else if (Id == 4) {
        $('#modelheader').text('Driving Licence Master');
        $('#Licenceid').show();
        $('#DocNumber4').focus();
    }//labour card no
    else if (Id == 5) {
        $('#modelheader').text('Labour Card Master');
        $('#Labourid').show();
        $('#DocNumber5').focus();
    }
        //insurance company
    else if (Id == 6) {
        $('#modelheader').text('Insurance Company');
        $('#Insurancecmpy').show();
        $('#DocNumber6').focus();
    }
}

function popupsubmit(Id) {

    //passport
    if (Id == 1) {
        if ($.trim($('#DocNumber1').val()) == '') {
            warningshow('Please Enter Number', 'DocNumber1');
            return false;
        }
        else if ($.trim($('#DocCOuntry1').val()) == 0) {
            warningshow('Please Select Country', 'DocCOuntry1');
            return false;
        }
        else {
            $('#PassportId').val($('#DocNumber1').val());
            $('#documtdiv').hide();
        }
        $('#PassportId').val($('#DocNumber1').val());
        $('#documtdiv').hide();      
    }
        //visa
    else if (Id == 2) {
        if ($.trim($('#DocNumber2').val()) == '') {
            warningshow('Please Enter Number', 'DocNumber2');
            return false;
        }
        else if ($.trim($('#DocCOuntry2').val()) == 0) {
            warningshow('Please Select Country', 'DocCOuntry2');
            return false;
        }
        else {
            $('#VISANo').val($('#DocNumber2').val());
            $('#documtdiv').hide();
        }
        $('#VISANo').val($('#DocNumber2').val());
        $('#documtdiv').hide();
    }
        //national id
    else if (Id == 3) {
        if ($.trim($('#DocNumber3').val()) == '') {
            warningshow('Please Enter Number', 'DocNumber3');
            return false;
        }
        else if ($.trim($('#DocCOuntry3').val()) == 0) {
            warningshow('Please Select Country', 'DocCOuntry3');
            return false;
        }
        else {
            $('#NationalId').val($('#DocNumber3').val());
            $('#documtdiv').hide();
        }
        $('#NationalId').val($('#DocNumber3').val());
        $('#documtdiv').hide();
    }//licence no
    else if (Id == 4) {
        if ($.trim($('#DocNumber4').val()) == '') {
            warningshow('Please Enter Number', 'DocNumber4');
            return false;
        }
        else if ($.trim($('#DocCOuntry4').val()) == 0) {
            warningshow('Please Select Country', 'DocCOuntry4');
            return false;
        }
        else {
            $('#DLNo').val($('#DocNumber4').val());
            $('#documtdiv').hide();
        }
        $('#DLNo').val($('#DocNumber4').val());
        $('#documtdiv').hide();

    }//labour card no
    else if (Id == 5) {
        if ($.trim($('#DocNumber5').val()) == '') {
            warningshow('Please Enter Number', 'DocNumber5');
            return false;
        }
        else if ($.trim($('#DocCOuntry5').val()) == 0) {
            warningshow('Please Select Country', 'DocCOuntry5');
            return false;
        }
        else {
            $('#LabourNo').val($('#DocNumber5').val());
            $('#documtdiv').hide();
        }
        $('#LabourNo').val($('#DocNumber5').val());
        $('#documtdiv').hide();
    }
        //Insurance Number
    else if (Id == 6) {
        if ($.trim($('#DocNumber6').val()) == '') {
            warningshow('Please Enter Number', 'DocNumber6');
            return false;
        }
        else if ($.trim($('#DocCmpy6').val()) == 0) {
            warningshow('Please Select Company', 'DocCmpy6');
            return false;
        }
        else {
            $('#InsuranceCompanyId').val($('#DocNumber6').val());
            $('#documtdiv').hide();
        }
        $('#InsuranceCompanyId').val($('#DocNumber6').val());
        $('#documtdiv').hide();
    }
    else if (Id == 7) {
        if ($.trim($('#txtinctype').val()) == 0) {
            warningshow('Please Select Increment Type', 'txtinctype');
            return false;
        }
        else if ($.trim($('#txtincamt').val()) == "") {
            warningshow('Please Enter Amount', 'txtincamt');
            return false;
        }
        else {
            $('#txtIncrement').val($('#txtincamt').val());
            $('#popupdiv').hide();
        }
        
    }
}
//same address
function CopyAdd(cb) {
    var cb = document.getElementById('sameas');
    var a1 = document.getElementById('LCAddress1');
    var al1 = document.getElementById('PCAddress1');
    var v1 = document.getElementById('LCCountry');
    var vl1 = document.getElementById('PCCountry');
    var c1 = document.getElementById('LCMobile');
    var cl1 = document.getElementById('PCMobile');
    if (cb.checked) {
        al1.value = a1.value;
        vl1.value = v1.value;
        cl1.value = c1.value;
    }
    else {
        al1.value = '';
        vl1.value = '0';
        cl1.value = '';

    }   
}



function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img1').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function CountryLoad(result) {
    $("#LCCountry,#PCCountry,#Nationality,#DocCOuntry1,#DocCOuntry2,#DocCOuntry3,#DocCOuntry4,#DocCOuntry5").empty();
    $("#LCCountry,#PCCountry,#Nationality,#DocCOuntry1,#DocCOuntry2,#DocCOuntry3,#DocCOuntry4,#DocCOuntry5").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#LCCountry,#PCCountry,#Nationality,#DocCOuntry1,#DocCOuntry2,#DocCOuntry3,#DocCOuntry4,#DocCOuntry5").append("<option value='" + result[i].CountryId + "'>" + result[i].CountryName + "</option>");
    }
}
function DesignationLoad(result, a) {
    $("#DesignationId").empty();
    $("#DesignationId").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#DesignationId").append("<option value='" + result[i].DesignationId + "'>" + result[i].DesignationCode + "</option>");
    }
    if (a == 0) {
        $('#DesignationId').val(0);
    }
    else {
        $('#DesignationId').val(a);
    }
}
function DepartmentLoad(result, a) {
    $("#DepartmentId").empty();
    $("#DepartmentId").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#DepartmentId").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
    if (a == 0) {
        $('#DepartmentId').val(0);
    }
    else {
        $('#DepartmentId').val(a);
    }
}
function ManagerLoad(result) {
    $("#Manager").empty();
    $("#Manager").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Manager").append("<option value='" + result[i].EmpId + "'>" + result[i].Name + "</option>");
    }
}
function LocationLoad(result, a) {
    $("#LocationId").empty();
    $("#LocationId").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#LocationId").append("<option value='" + result[i].LocationId + "'>" + result[i].LocationName + "</option>");
    }
    if (a == 0) {
        $('#LocationId').val(0);
    }
    else {
        $('#LocationId').val(a);
    }
}
function IncrementLoad(result, a) {
    $("#txtinctype").empty();
    $("#txtinctype").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#txtinctype").append("<option value='" + result[i].IncrementId + "'>" + result[i].IncrementType + "</option>");
    }
    if (a == 0) {
        $('#txtinctype').val(0);
    }
    else {
        $('#txtinctype').val(a);
    }
}
function WorkingHoursLoad(result, a) {
    $("#WorkingHoursId").empty();
    $("#WorkingHoursId").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#WorkingHoursId").append("<option value='" + result[i].WorkingHoursId + "'>" + result[i].WorkingHours + "</option>");
    }
    if (a == 0) {
        $('#WorkingHoursId').val(0);
    }
    else {
        $('#WorkingHoursId').val(a);
    }
}

function DivisionLoad(result, a) {
    $("#CompanyId").empty();
    $("#CompanyId").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {

        $("#CompanyId").append("<option value='" + result[i].EmployeeDivisionId + "'>" + result[i].EmployeeDivisionName + "</option>");
    }
    if (a == 0) {
        $('#CompanyId').val(0);
    }
    else {
        $('#CompanyId').val(a);
    }
}
function CompanyLoad(result) {
    $("#DocCmpy6").empty();
    $("#DocCmpy6").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#DocCmpy6").append("<option value='" + result[i].InsuranceCompanyId + "'>" + result[i].InsuranceCompanyName + "</option>");
    }

}

function Defaultfocus() {
    $('#Name').focus();
}

function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 43 && charCode != 45 && charCode != 40 && charCode != 41 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function warningshow(message, Id) {
    $('#Warningpopup').text(message);
    $('#Warningpopup').fadeIn();
    $('#' + Id).focus();
}


//function warningshow1(message, Id) {
//    $('#Warningpopup').text(message);
//    $('#Warningpopup').fadeIn();
//    $('#tab1').show();
//    $('#tab1' + Id).focus();
//}

function SaveAndUpdate(Flag) {
    var empId = 0;
  
    var lfckv = document.getElementById("IsActive").checked
    if ($.trim($('#Name').val()) == '') {
        warningshow('Please Enter Name', 'Name');
        return false;
    }
    else if ($.trim($('#EmpCode').val()) == "") {
        warningshow('Please Enter Employee Code', 'EmpCode');
        return false;
    }
    else if ($.trim($('#DesignationId').val()) == 0) {
        warningshow('Please Enter Designation', 'DesignationId');
        return false;
    }
    else if ($.trim($('#Gender').val()) == 0) {
        warningshow('Please Select Gender', 'Gender');
        return false;
    }
    else if ($.trim($('#DateofJoin').val()) == "") {
        warningshow('Please Enter Date of Join', 'DateofJoin');
        return false;
    }
    //else if ($.trim($('#Nationality').val()) == 0) {
    //    warningshow('Please Select Nationality', 'Nationality');
    //    return false;
    //}
  
    else if ($.trim($('#txtBasicSalary').val()) == "") {
        warningshow('Please Enter Salary Amount', 'txtBasicSalary');
        $('#txtBasicSalary').focus();
        return false;
    }
    else {
     
            $('#btnsubmit').prop("disabled", true);
            var name = $('#Name').val();
            var code = $('#EmpCode').val();
            var data = {};   //array
            data.EmpId = $('#EmpId').val();
            data.Name = $('#Name').val();
            data.EmpCode = $('#EmpCode').val();
            data.EmployeeUser = $('#EmployeeUserId').val();
            data.CompanyId = $('#CompanyId').val();
            data.DepartmentId = $('#DepartmentId').val();
            data.LocationId = $('#LocationId').val();
            data.DesignationId = $('#DesignationId').val();
            data.DateofJoin = $('#DateofJoin').val();
            data.Email = $('#Email').val();
            data.Manager = $('#Manager').val();
            data.Mobile = $('#Mobile').val();
            data.WorkingHoursId = $('#WorkingHoursId').val();
            data.Others = $('#Bloodgroup').val();
            data.IsActive = lfckv;
            data.Gender = $('#Gender').val();
            data.DOB = $('#DOB').val();
            data.PCAddress1 = $('#PCAddress1').val();
            data.PCAddress2 = 0;
            data.PCAddress3 = 0;
            data.PCCountry = $('#PCCountry').val();
            data.PCEmail = 0;
            data.PCMobile = $('#PCMobile').val();
            data.LCAddress1 = $('#LCAddress1').val();
            data.LCAddress2 = 0;
            data.LCAddress3 = 0;
            data.LCCountry = $('#LCCountry').val();
            data.LCEmail = $('#LCEmail').val();
            data.LCMobile = $('#LCMobile').val();
            data.PassportId = $('#PassportId').val();
            data.NationalId = 1;
            data.LabourNo = $('#LabourNo').val();
            data.InsuranceCompanyId = $('#DocCmpy6').val();
            data.VISANo = $('#VISANo').val();
            data.DLNo = $('#DLNo').val();
            data.ContractTypeId = $('#ContractTypeId').val();
            data.FileNo = $('#FileNo').val();
            data.Nationality = $('#Nationality').val();
            data.DelFlag = Flag;
            var patrolltype;
            if (document.getElementById('yes').checked) {
                patrolltype = document.getElementById('yes').value;
            }
            else if (document.getElementById('no').checked) {
                patrolltype = document.getElementById('no').value;
            }
            data.PayRollType = patrolltype;
            data.SalaryAccount = $('#hiddensalaccId').val();
            data.AdvanceAccount = $('#hiddenadvaccId').val();
            data.BankAccount = $('#txtbankaccount').val();
            data.BankAccountName = $('#txtbankname').val();
            data.BasicSalary = $('#txtBasicSalary').val();
            data.DA = $('#txtDA').val();
            data.TA = $('#txtTA').val();
            data.NightAlowance = $('#txtIncrement').val();
            data.EarningOthers = $('#txtothers1').val();
            data.TotalEarnings = $('#txttotearning').val();
            data.PF = $('#txtPF').val();
            data.Tax = $('#txtTax').val();
            data.HRA = $('#txtHRA').val();
            data.ESI = $('#txtESI').val();
            data.Otherdeductions = $('#txtothers2').val();
            data.TotalDeductions = $('#txttotdeduction').val();
            data.TotalNetSalary = $('#txttotalsal').val();
            data.VisaExpense = $('#txtvisaexpense').val();
            data.SalaryAdvance = $('#SalAdvance').val();
            data.OTRate = $('#txtotrate').val();
            data.OTSRate = $('#txtOtsRate').val();
            data.UId = ERPUserId;
            data.DeptId = ERPDeptId;
            console.log(data)
            $.ajax({
                type: "POST",
                url: "../Master/EmployeeInsertandUpdate",
                data: data,
                success: function (result) {
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var empId = result.oList[i].EmpId;
                        if (status == 1 || status == 2) {
                            FileUploadDBC(0, empId, status);
                            //CreateFolder(empId);
                        }
                        var oArray = new Array();                                                     //Document Save
                        for (var i = 1; i <= 6; i++) {
                            var EmpId = empId;
                            var Name = name;
                            var EmpCode = code;
                            var DocNumber = $('#DocNumber' + i).val();
                            var Country = $('#DocCOuntry' + i).val();
                            var Issuedate = $('#DocIssue' + i).val();
                            var Expirydate = $('#DocExpiry' + i).val();
                            var Description = $('#DocDescription' + i).val();
                            var TypeNumber = $('#TypeNumber' + i).val();
                            var InsuranceCompanyId = $('#DocCmpy' + i).val();
                            DelFlag = 1;
                            var IncrementFrom = $('#txtincdate').val();
                            var IncrementType = $('#txtinctype').val();
                            var IncrementAmount = $('#txtincamt').val();
                            if (DocNumber != "" || IncrementAmount != "") {
                                oArray.push({
                                    'EmpId': EmpId,
                                    'PassportNo': DocNumber,
                                    'Country': Country,
                                    'PassportIssued': Issuedate,
                                    'PassportExpiry': Expirydate,
                                    'Remarks': Description,
                                    'Type': TypeNumber,
                                    'DelFlag': DelFlag,
                                    'Name': Name,
                                    'EmpCode': EmpCode,
                                    'InsuranceCompanyId': InsuranceCompanyId,
                                    'IncrementFrom': IncrementFrom,
                                    'IncrementType': IncrementType,
                                    'IncrementAmount': IncrementAmount
                                })
                            }
                        }
                        if (oArray != "") {
                            var data = { 'PassportModel': oArray };
                            $.ajax(
                            {
                                type: "POST",
                                url: "../Master/EmployeeDocumentInsert",
                                data: data,
                                success: function (result) {
                                }
                            });
                        }
                        refresh1()
                        $('#btnsubmit').prop("disabled", false);
                        Showalerts(status);
                    }
                }
            });
        
        //else  {
        //    warningshow('Please Upload Document', 'files');
        //}
    }
}
function refresh1() {   
        $('#DocNumber1').val('');
        $('#DocCOuntry1').val(0);
        $('#DocIssue1').val(CurDate);
        $('#DocExpiry1').val(CurDate);
        $('#DocDescription1').val('');  
}
function refresh2() {   
        $('#DocNumber2').val('');
        $('#DocCOuntry2').val(0);
        $('#DocIssue2').val(CurDate);
        $('#DocExpiry2').val(CurDate);
        $('#DocDescription2').val('');
    }

function refresh3() {  
        $('#DocNumber3').val('');
        $('#DocCOuntry3').val(0);
        $('#DocIssue3').val(CurDate);
        $('#DocExpiry3').val(CurDate);
        $('#DocDescription3').val('');
    }
function refresh4() {   
        $('#DocNumber4').val('');
        $('#DocCOuntry4').val(0);
        $('#DocIssue4').val(CurDate);
        $('#DocExpiry4').val(CurDate);
        $('#DocDescription4').val('');
    }

function refresh5() {  
        $('#DocNumber5').val('');
        $('#DocCOuntry5').val(0);
        $('#DocIssue5').val(CurDate);
        $('#DocExpiry5').val(CurDate);
        $('#DocDescription5').val('');
    }

function refresh6() {   
        $('#DocNumber6').val('');
        $('#DocCmpy6').val(0);
        $('#DocIssue6').val(CurDate);
        //$('#DocExpiry5').val(CurDate);
        $('#DocDescription6').val('');
    }

function refresh7() {   
        $('#txtinctype').val('');
        $('#txtincamt').val('');
        $('#txtincdate').val(CurDate);
    }
function refresh8() {
    $('#txt_inc').val('');  
}

function closedoc1()
{
    if ($('#DocNumber1').val() != '' || $('#DocCOuntry2').val() != 0)
    {
        $('#DocNumber1').val('');
        $('#DocCOuntry1').val(0);
        $('#DocIssue1').val(CurDate);
        $('#DocExpiry1').val(CurDate);
        $('#DocDescription1').val('');
    }
    else
    {
        $('#documtdiv').hide();
        $('#PassportId').val(''); refresh1();
       
    }
}
function closedoc2() {
    if ($('#DocNumber2').val() != '' || $('#DocCOuntry1').val() != 0) {
        $('#DocNumber2').val('');
        $('#DocCOuntry2').val(0);
        $('#DocIssue2').val(CurDate);
        $('#DocExpiry2').val(CurDate);
        $('#DocDescription2').val('');
    }
    else {
        $('#documtdiv').hide(); $('#VISANo').val(''); refresh2();
       
    }
}
function closedoc3() {
    if ($('#DocNumber3').val() != '' || $('#DocCOuntry3').val() != 0) {
        $('#DocNumber3').val('');
        $('#DocCOuntry3').val(0);
        $('#DocIssue3').val(CurDate);
        $('#DocExpiry3').val(CurDate);
        $('#DocDescription3').val('');
    }
    else {
        $('#documtdiv').hide(); $('#NationalId').val(''); refresh3();
       
    }
}
function closedoc4() {
    if ($('#DocNumber4').val() != '' || $('#DocCOuntry4').val() != 0) {
        $('#DocNumber4').val('');
        $('#DocCOuntry4').val(0);
        $('#DocIssue4').val(CurDate);
        $('#DocExpiry4').val(CurDate);
        $('#DocDescription4').val('');
    }
    else {
        $('#documtdiv').hide(); $('#DLNo').val(''); refresh4();
        
    }
}
function closedoc5() {
    if ($('#DocNumber5').val() != '' || $('#DocCOuntry5').val() != 0) {
        $('#DocNumber5').val('');
        $('#DocCOuntry5').val(0);
        $('#DocIssue5').val(CurDate);
        $('#DocExpiry5').val(CurDate);
        $('#DocDescription5').val('');
    }
    else {
        $('#documtdiv').hide(); $('#LabourNo').val(''); refresh5();
        
    }
}
function closedoc6() {
    if ($('#DocNumber6').val() != '' || $('#DocCmpy6').val() != 0) {
        $('#DocNumber6').val('');
        $('#DocCmpy6').val(0);
        $('#DocIssue6').val(CurDate);
        //$('#DocExpiry5').val(CurDate);
        $('#DocDescription6').val('');
    }
    else {
        $('#documtdiv').hide();$('#InsuranceCompanyId').val(''); refresh6();
        
    }
}
function closedoc7() {
    if ($('#txtinctype').val() != '0' || $('#txtincamt').val() != '') {
        $('#txtinctype').val('0');
        $('#txtincamt').val('');
        $('#txtincdate').val(CurDate);
        //$('#DocExpiry5').val(CurDate);
    }
    else {
        $('#popupdiv').hide();$('#txtIncrement').val(''); refresh7();        
    }
}
function CloseWindow() {
    if ($('#txt_inc').val() != '' ) {
        $('#txt_inc').val('');       
        //$('#DocExpiry5').val(CurDate);
    }
    else {
        $('#popupdiv1').hide(); $('#txtinctype').val('0'); refresh8();
    }
}


function formrefresh() {
    //$('#UploadDocument1').val(0)
    $('#EmployeeDocId').val('');
    $('#type').val('0');
    $('#btnuploaddoc').hide();
    $('#tbldocumentlist tr').remove()
    $("#img1").attr('src', '../app-assets/img/portrait/small/avatar-s-12.png');
    document.getElementById("sameas").checked = false;
    $('#SalAdvance').prop('disabled', false);
    $('#Name').val('');
    $('#Name').focus();
    $('#EmpCode,#EmployeeUser').val('');
    $('#CompanyId').val(0);
    $('#DepartmentId,#EmployeeUserId').val(0);
    $('#LocationId').val(0);
    $('#DesignationId').val(0);
    $('#DateofJoin').val(CurDate);
    $('#DOB').val(CurDate);
    $('#Email').val('');
    $('#EditNamesSave').val('');   
    $('#nationality').val(0);
    $('#Manager').val(0);
    $('#Mobile').val('');
    $('#WorkingHoursId').val('0');
    $('#Phone').val('');
    $('#Bloodgroup').val('0');
    $('#PCAddress1').val('');
    $('#PCAddress2').val('');
    $('#PCAddress3').val('');
    $('#PCCountry').val('0');
    $('#PCEmail').val('');
    $('#PCMobile').val('');
    $('#LCAddress1').val('');
    $('#LCAddress2').val('');
    $('#LCAddress3').val('');
    $('#LCCountry').val(0);
    $('#LCEmail').val('');
    $('#LCMobile').val('');
    $('#PassportId').val('');
    $('#NationalId').val('');
    $('#LabourNo').val('');
    $('#IBanNo').val('');
    $('#InsuranceCompanyId').val('');
    $('#VISANo').val('');
    $('#DLNo').val('');
    $('#ContractTypeId').val(1);
    $('#FileNo').val('');
    //$('#files').val('');
    $('#EmpId').val(0);
    $('#DocNumber1').val('');
    $('#DocCOuntry1').val(0);
    $('#DocIssue1').val(CurDate);
    $('#DocExpiry1').val(CurDate);
    $('#DocDescription1').val('');
    $('#Nationality').val(0);
    $('#Gender').val(0);
    $('#btndelete').hide();
    $("#tab1").click();
    $('#EmpCode').prop('disabled', false);
    $('#SalAccnt').val('');
    $('#AdvAccnt').val('');
    $('#txtbankaccount').val('');
    $('#txtbankname').val('');
    $('#SalAmount').val('');
    $('#txtvisaexpense').val('');
    $('#hiddensalaccId').val('');
    $('#hiddenadvaccId').val('');
    $('#txtBasicSalary').val('');
    $('#txtDA').val('');
    $('#txtTA').val('');
    $('#txtngtalowance').val('');
    $('#txtothers1').val('');
    $('#txttotearning').val('');
    $('#txtPF').val('');
    $('#txtTax').val('');
    $('#txtHRA').val('');
    $('#txtESI').val('');
    $('#txtothers2').val('');
    $('#txttotdeduction').val('');
    $('#txttotalsal').val('');   
    $('#txtinctype').val(0);
    $('#SalAdvance').val(''); $('#txtotrate').val('');
    $('#txtOtsRate').val(''); $('#WorkingHoursId').val(0);
    $('#txtIncrement').val(''); $('#NetSal').val(''); $('#txt_inc').val('');
    refresh1(); refresh2(); refresh3();
    refresh4(); refresh5(); refresh6(); refresh7();
    $('.form-control').prop('disabled', false);
    $('.btnbottom').prop('disabled', false);

    $('#btnsubmit').prop("disabled", false);
    $('#btnlist').prop("disabled", false);
    $('#btnadd').prop("disabled", false);
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
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
                                '<input type="file" id="files' + id + '" class="btn btn-lg gradient-back-to-earth font-small-2 white p-2 mr-2" name="files[]"  multiple accept="image/*,application/pdf,application/vnd.ms-excel"/>' +
                            '</div>' +
                        '</div></div>';

        if (type == 1) {
            $('#MainDivseq').append(newrow);
            rowcount++;
            $('#RowCount').val(parseInt($('#RowCount').val()) + 1);
        }
   
   
}

function Checkdup(id) {

    for (var i = 1; i < rowcount; i++) {
        var a = parseInt($('#UploadDocument' + i).val());
        var b = parseInt($('#UploadDocument' + id).val());
        if ((id != i) && (a == b) && (a != 0) && (b != 0)) {
            $('#UploadDocument' + id).val(0);
            warningshow('Document already selected', 'UploadDocument' + id);
        }
    }

}


function ShowEmployeelist(result) {
    $('#Entry').hide();
    $('#listing').show();
    $('#btnnew').show();
    disable_datatable('tblemployee');

    var ststs = $('#typee').val();
    var slnos = 0;
    var responseText = "<thead><tr><th width=1%;align=center;>Sl#</th><th width=10%>Emp ID</th><th width=55%>Name</th><th width=7%>Department</th><th width=15%>Designation</th><th width=10%>Date Of Join</th><th width=7%>Gender</th><th width=25%>Email</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {

        if (ststs == 0) {
            var slnos = parseInt(slnos + 1);
            responseText += '<tr><td align=center>' + slnos + '</td><td>' + result[i].EmpCode + '</td><td>' + result[i].Name + '</td><td>' + result[i].DepartmentName + '</td><td>' + result[i].DesignationCode + '</td><td>' + result[i].DateofJoin + '</td><td>' + result[i].Gender + '</td><td>' + result[i].Email + '</td><td align=center><a onclick="GetRows(' + result[i].EmpId + ')">' + Editbutton + '</a></td></tr>';
        }
        else if (ststs == 1) {
            if (result[i].LCAddress1 == '') {
                var slnos = parseInt(slnos + 1);
                responseText += '<tr><td align=center>' + slnos + '</td><td>' + result[i].EmpCode + '</td><td>' + result[i].Name + '</td><td>' + result[i].DepartmentName + '</td><td>' + result[i].DesignationCode + '</td><td>' + result[i].DateofJoin + '</td><td>' + result[i].Gender + '</td><td>' + result[i].Email + '</td><td align=center><a onclick="GetRows(' + result[i].EmpId + ')">' + Editbutton + '</a></td></tr>';
            }
        }
        else {
            if (result[i].LCAddress1 != '') {
                var slnos = parseInt(slnos + 1);
                responseText += '<tr><td align=center>' + slnos + '</td><td>' + result[i].EmpCode + '</td><td>' + result[i].Name + '</td><td>' + result[i].DepartmentName + '</td><td>' + result[i].DesignationCode + '</td><td>' + result[i].DateofJoin + '</td><td>' + result[i].Gender + '</td><td>' + result[i].Email + '</td><td align=center><a onclick="GetRows(' + result[i].EmpId + ')">' + Editbutton + '</a></td></tr>';
            }
        }

        }
    $('#tblemployee').html(responseText + '</tbody><tfoot><th>Sl#</th><th>Emp ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Date Of Join</th><th>Gender</th><th>Email</th><th>Edit</th></tr><tfoot>');
    datatableWithsearch1('tblemployee');
}




function ShowEmployeeGet(result) {
    //disable_datatable('tbldocumentlist');
    $('#btnuploaddoc').show();
    var responseText = "";
    for (var i = 0; i < result.length; i++) {
        ViewUploadDoc(result[i].EmpId)
           
           // $('#EditNamesSave').val(result[i].DocumentName);
            $('#type').val(result[i].DocumentType);
            $('#EmpId').val(result[i].EmpId);
            $('#Name').val(result[i].Name);
            $('#EmployeeUserId').val(result[i].EmployeeUser);
            $('#EmployeeUser').val(result[i].EmployeeUserName);
            $('#EmpCode').val(result[i].EmpCode);
            $('#EmpCode').prop('disabled', true);
            $('#CompanyId').val(result[i].CompanyId);
            $('#DepartmentId').val(result[i].DepartmentId);
            $('#LocationId').val(result[i].LocationId);
            $('#DesignationId').val(result[i].DesignationId);
            $('#Nationality').val(result[i].Nationality)
            $('#DateofJoin').val(result[i].DateofJoin);
            $('#Email').val(result[i].Email);
            $('#Manager').val(result[i].Manager);
            $('#Mobile').val(result[i].Mobile);
            $('#WorkingHoursId').val(result[i].WorkingHoursId);
            if ($('#WorkingHoursId').val() == null) {
                $('#WorkingHoursId').val(0);
            }
            $('#IsActive').val(result[i].IsActive);
            $('#Gender').val(result[i].Gender);
            $('#DOB').val(result[i].DOB);
            $('#PCAddress1').val(result[i].PCAddress1);
            $('#PCAddress2').val(result[i].PCAddress2);
            $('#PCAddress3').val(result[i].PCAddress3);
            $('#PCCountry').val(result[i].PCCountry);
            $('#PCEmail').val(result[i].PCEmail);
            $('#PCMobile').val(result[i].PCMobile);
            $('#LCAddress1').val(result[i].LCAddress1);
            $('#LCAddress2').val(result[i].LCAddress2);
            $('#LCAddress3').val(result[i].LCAddress3);
            $('#LCCountry').val(result[i].LCCountry);
            $('#LCEmail').val(result[i].LCEmail);
            $('#LCMobile').val(result[i].LCMobile);
            $('#PassportId').val(result[i].PassportId);
            $('#NationalId').val(result[i].NationalId);
            $('#LabourNo').val(result[i].LabourNo);
            $('#VISANo').val(result[i].VISANo);
            $('#DLNo').val(result[i].DLNo);
            $('#ContractTypeId').val(result[i].ContractTypeId);
            $('#SalAdvance').prop('disabled', false);
            if (result[i].PayRollType == 'normal') {
                document.getElementById('yes').checked = true;
            }
            else if (result[i].PayRollType == 'jobtype') {
                document.getElementById('no').checked = true;
            }
            // $('#ContractTypeId').val(result[i].PayRollType);
            $('#hiddensalaccId').val(result[i].SalaryAccount);
            $('#SalAccnt').val(result[i].SalaryAccountCode);
            if (result[i].SalaryAccountCode == 0) {
                $('#SalAccnt').val('');
                $('#hiddensalaccId').val('');
            }
            $('#hiddenadvaccId').val(result[i].AdvanceAccount);
            $('#AdvAccnt').val(result[i].AdvanceAccountCode);
            if (result[i].AdvanceAccountCode == 0) {
                $('#AdvAccnt').val('');
                $('#hiddenadvaccId').val('');
            }
            $('#txtbankaccount').val(result[i].BankAccount);
            $('#txtbankname').val(result[i].BankAccountName);
            $('#txtBasicSalary').val((result[i].BasicSalary).toFixed(Decimal));
            $('#txtDA').val((result[i].DA).toFixed(Decimal));
            $('#txtTA').val((result[i].TA).toFixed(Decimal));
            $('#txtngtalowance').val((result[i].NightAlowance).toFixed(Decimal));
            $('#txtothers1').val((result[i].EarningOthers).toFixed(Decimal));
            $('#txttotearning').val((result[i].TotalEarnings).toFixed(Decimal));
            $('#txtPF').val((result[i].PF).toFixed(Decimal));
            $('#txtTax').val((result[i].Tax).toFixed(Decimal));
            $('#txtHRA').val((result[i].HRA).toFixed(Decimal));
            $('#txtESI').val((result[i].ESI).toFixed(Decimal));
            $('#txtothers2').val((result[i].Otherdeductions).toFixed(Decimal));
            $('#txttotdeduction').val((result[i].TotalDeductions).toFixed(Decimal));
            $('#txttotalsal').val((result[i].TotalNetSalary).toFixed(Decimal));
            $('#SalAmount').val((result[i].TotalNetSalary).toFixed(Decimal));
            $('#txtvisaexpense').val((result[i].VisaExpense).toFixed(Decimal));
            $('#SalAdvance').val((result[i].SalaryAdvance).toFixed(Decimal));
            $('#txtotrate').val((result[i].OTRate).toFixed(Decimal));
            $('#txtOtsRate').val((result[i].OTSRate).toFixed(Decimal));
            $('#NetSal').val((result[i].TotalNetSalary).toFixed(Decimal));
            $('#txtincdate').val(result[i].IncrementFrom);
            $('#txtinctype').val(result[i].IncrementType);
            if (result[i].IncrementType == null) {
                $('#txtinctype').val(0);
            }
            $('#txtincamt').val((result[i].IncrementAmount).toFixed(Decimal));
            $('#txtIncrement').val((result[i].IncrementAmount).toFixed(Decimal));
            if ($('#ContractTypeId').val() == null) {
                $('#ContractTypeId').val(1);
            }
            $('#Bloodgroup').val(result[i].Others);
            if ($('#Bloodgroup').val() == null) {
                $('#Bloodgroup').val(0);
            }
            $('#FileNo').val(result[i].FileNo);
            var EmpId = result[i].EmpId;
            var data = {};
            data.EmpId = $('#EmpId').val();
            $.ajax({
                type: "POST",
                url: "../Master/EmployeeDocumentGetandGets",
                data: data,
                success: function (result) {
                    for (var i = 0; i < result.oList.length; i++) {
                        var Type = result.oList[i].Type;
                        if (Type == 1) {
                            $('#DocNumber1').val(result.oList[i].PassportNo);
                            $('#DocCOuntry1').val(result.oList[i].Country);
                            $('#DocIssue1').val(result.oList[i].IssuedOn);
                            $('#DocExpiry1').val(result.oList[i].Expiry);
                            $('#DocDescription1').val(result.oList[i].Remarks);
                        }
                        if (Type == 2) {
                            $('#DocNumber2').val(result.oList[i].PassportNo);
                            $('#DocCOuntry2').val(result.oList[i].Country);
                            $('#DocIssue2').val(result.oList[i].IssuedOn);
                            $('#DocExpiry2').val(result.oList[i].Expiry);
                            $('#DocDescription2').val(result.oList[i].Remarks);
                        }
                        if (Type == 3) {
                            $('#DocNumber3').val(result.oList[i].PassportNo);
                            $('#DocCOuntry3').val(result.oList[i].Country);
                            $('#DocIssue3').val(result.oList[i].IssuedOn);
                            $('#DocExpiry3').val(result.oList[i].Expiry);
                            $('#DocDescription3').val(result.oList[i].Remarks);
                        }
                        else if (Type == 4) {
                            $('#DocNumber4').val(result.oList[i].PassportNo);
                            $('#DocCOuntry4').val(result.oList[i].Country);
                            $('#DocIssue4').val(result.oList[i].IssuedOn);
                            $('#DocExpiry4').val(result.oList[i].Expiry);
                            $('#DocDescription4').val(result.oList[i].Remarks);
                        }
                        else if (Type == 5) {
                            $('#DocNumber5').val(result.oList[i].PassportNo);
                            $('#DocCOuntry5').val(result.oList[i].Country);
                            $('#DocIssue5').val(result.oList[i].IssuedOn);
                            $('#DocExpiry5').val(result.oList[i].Expiry);
                            $('#DocDescription5').val(result.oList[i].Remarks);
                        }
                        else if (Type == 6) {
                            $('#DocNumber6').val(result.oList[i].PassportNo);
                            $('#InsuranceCompanyId').val(result.oList[i].PassportNo);
                            $('#DocCmpy6').val(result.oList[i].InsuranceCompanyId);
                            $('#DocIssue6').val(result.oList[i].IssuedOn);
                            $('#DocExpiry6').val(result.oList[i].Expiry);
                            $('#DocDescription6').val(result.oList[i].Remarks);
                        }
                    }
                }
            });

            $('#Name').focus();
        
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#Warningpopup').fadeOut();
    $('#btndelete').show();
}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');       
        if (title == 'Emp ID' || title == 'Name' || title == 'Department' || title == 'Designation' || title == 'Date Of Join' || title == 'Gender' || title == 'Email' )
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
    });
   

        // AddColumnSelectionButton(tableButtonContainerId, tablename)

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
                        exportOptions: { columns: [0, 1, 2,3,4,5,6,7] }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                    }
                ]
            },
            //'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
        $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
    //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
        //    var column = table.column($(this).attr('data-em-col'));
        //    console.log($(this).attr('data-em-col'));
        //    console.log(column);
        //    column.visible($(this).prop("checked"));
        //});
   
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
    formrefresh();
}
function HideUploaddiv() {
    $('#Uploadpopupdiv').hide();
}


function GetRows(EmpId) {
    $('#EmpId').val(EmpId)
    var data = {};
    data.EmpId = EmpId;
    $.ajax({
        type: "POST",
        url: "../Master/EmployeeGetandGets",
        data: data,
        success: function (result) {
            if (EmpId == 0)
                ShowEmployeelist(result.oList);
            else
                ShowEmployeeGet(result.oList);
        }
    });

}

function fnImageSave(empId, status) {

    var totalFiles = document.getElementById("files").files.length;
    if (totalFiles <= 25) {
        if (status == 1) {
            var data = {};
            data.DocumentId = empId;
            $.ajax({
                type: "POST",
                url: "../Master/RemoveExistingEmployeeDocumentFolder",
                data: data,
                success: function (result) {
                    var DocumentId = empId;
                    for (var i = 0; i < totalFiles; i++) {
                        var formData = new FormData();
                        var imageName = DocumentId + '-' + i;
                        var browsedFile = document.getElementById("files").files[i];
                        var ImageId = DocumentId;
                        if (browsedFile.type.match('image/*|application/pdf|application/vnd.ms-excel')) {
                            formData.append("FileUpload", browsedFile);
                            formData.append("ImageName", imageName);
                            formData.append("UniqueId", ImageId);
                            console.log('formData--' + formData)
                            $.ajax({
                                type: "POST",
                                url: '/Master/UploadEmployeeImage',
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
            });
        }
        else if (status == 2) {
             var data = {};
            data.DocumentId = empId;
            $.ajax({
                type: "POST",
                url: "../Master/RemoveExistingEmployeeDocumentFolder",
                data: data,
                success: function (result) {
                    var DocumentId = empId;
                    //alert('DocumentId::' + DocumentId)
               var Startvalue = $('#foldercount').val();
              for (var i = 0; i < totalFiles; i++) {
               var formData = new FormData();
               var imageName = DocumentId + '-' + Startvalue;
               var browsedFile = document.getElementById("files").files[i];
               var ImageId = DocumentId;
                Startvalue++;
               if (browsedFile.type.match('image/*|application/pdf|application/vnd.ms-excel')) {
                   formData.append("FileUpload", browsedFile);
                   formData.append("ImageName", imageName);
                   formData.append("UniqueId", ImageId);
                   console.log('formData--' + formData)
                   $.ajax({
                       type: "POST",
                       url: '/Master/UploadEmployeeImage',
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
            });
                }

    }


    else {
        warningshow("Limit Exceeded(Maximum 25 Images)");
    }

}

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});
function imageIsLoaded(e) {
    $('#myImg').attr('src', "../app-assets/img/elements/03.png");
}
function Addpopupwindow(Id) {
    $("#popupdiv").css("margin-top", '0px');
    $('#designationdiv').hide(); $('#deptdiv').hide();
    $('#Locationdiv').hide(); $('#Workinghoursdiv').hide();
    $('#empdiv').hide(); $('#Insurancecmpy').hide(); $('#Incrementdiv').hide();
    $('#popupdiv').show();
    if (Id == 1) {
        $('#myheader').text('Designation');
        $('#designationdiv').show();
        $('#txt_code').focus();
    }
    else if (Id == 2) {
        $('#myheader').text('Department');
        $('#deptdiv').show();
        $('#txt_deptcode').focus();
    }
    else if (Id == 3) {
        $('#myheader').text('Location');
        $('#Locationdiv').show();
        $('#txt_loccode').focus();
    }
    else if (Id == 4) {
        $('#myheader').text('Working Hours');
        $('#Workinghoursdiv').show();
        $('#txt_hour').focus();
    }
    else if (Id == 5) {
        $('#myheader').text('Employee Division');
        $('#empdiv').show();
        $('#txt_divcode').focus();
    }
    else if (Id == 6) {
        $('#myheader').text('Increment Details');
        $('#Incrementdiv').show();
        //$('#txt_divcode').focus();
    }
  
}
function incrementwindow()
{    
    $('#popupdiv1').show();
    $('#myheader1').text('Increment Type');
    $('#addincdiv').show();
}
function Addsalarypopupwindow(Id) {
    $('#salarypopupdiv').show();
    if (Id == 1) {
        $('#salheader').text('Salary Information');
        $('#salarydiv').show();
        $('#txtBasicSalary').focus();
    }
}
//All Popup Refresh
function popuprefresh() {
    $('#popupdiv').hide();
    $('#popupdiv1').hide();
    $('#salarypopupdiv').hide();
    $('#designationdiv').hide();
    $('#salarydiv').hide();
    $('#addincdiv').hide();
    $('#txt_code').val('');
    $('#txt_des').val('');
    $('#txt_name').val('');
    $('#txt_deptcode').val('');
    $('#txt_deptname').val('');
    $('#txt_deptdes').val('');
    $('#txt_loccode').val('');
    $('#txt_locname').val('');
    $('#txt_locdes').val('');
    $('#txt_hour').val('');
    $('#txt_divcode').val('');
    $('#txt_divname').val('');
    $('#txt_divdes').val('');
    $('#DocNumber6').val('');
    $('#txt_divname').val('');
    $('#txt_divdes').val('');
    $('#txt_inc').val('');    
    //$('#AreaId').val(0);
}
function salarypopuprefresh(flag)
{
    if ($('#txtBasicSalary').val() != '' || $('#txtDA').val() != '' || $('#txtTA').val() != '' || $('#txtngtalowance').val() != '' || $('#txtothers1').val() != '' || $('#txtPF').val() != '' || $('#txtTax').val() != '' || $('#txtHRA').val() != '' || $('#txtESI').val() != '' || $('#txtothers2').val() != '') {
        $('#txtBasicSalary').val('');
    }
    else 
    {
    $('#salarypopupdiv').hide();
    $('#salarydiv').hide();
    $('#SalAmount').val('');
    $('#SalAccnt').val('');
    }  
}
function SaveDesignation(Flag) {
    if ($('#txt_code').val() == "") {
        warningshow('Please Enter Code', 'txt_code');
    }
    else {
        var data = {};   //array
        data.DesignationCode = $('#txt_code').val();;
        data.DesignationDescription = $('#txt_des').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/DesignationInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].DesignationId;
                    desigload(id);
                    popupShowalerts(status);
                    popuprefresh();
                    $('#Gender').focus();
                }
            }
        });
    }
}

function SaveDept(Flag) {
    if ($('#txt_deptcode').val() == "") {
        warningshow('Please Enter Code', 'txt_deptcode');
    }
    else if ($('#txt_deptname').val() == "") {
        warningshow('Please Enter Name', 'txt_deptname');
    }
    else {
        var data = {};   //array
        data.DepartmentCode = $('#txt_deptcode').val();;
        data.DepartmentName = $('#txt_deptname').val();
        data.DepartmentDescription = $('#txt_deptdes').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/DepartmentInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].DepartmentId;
                    deptload(id);
                    popupShowalerts(status);
                    popuprefresh();
                    $('#Gender').focus();
                }
            }
        });
    }
}
function SaveLcation(Flag) {
    if ($('#txt_loccode').val() == "") {
        warningshow('Please Enter Code', 'txt_loccode');
    }
    else if ($('#txt_locname').val() == "") {
        warningshow('Please Enter Name', 'txt_locname');
    }
    else {
        var data = {};   //array
        data.LocationCode = $('#txt_loccode').val();;
        data.LocationName = $('#txt_locname').val();
        data.LocationDescription = $('#txt_locdes').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/LocationInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].LocationId;
                    locload(id);
                    popupShowalerts(status);
                    popuprefresh();
                    $('#Gender').focus();
                }
            }
        });
    }
}
function SaveWorkingHours(Flag) {
    if ($('#txt_hour').val() == "") {
        warningshow('Please Enter Hour', 'txt_hour');
    }
    else if ($('#txt_hour').val() == '0') {
        warningshow('Please Enter Valid Hour', 'txt_hour');
        $('#txt_hour').val() == ('');
    }
    else if ($('#txt_hour').val() > 12) {
        warningshow('Hour Should not Exceed 12', 'txt_hour');
        $('#txt_hour').val() == ('');
    }
    else {
        var data = {};   //array
        data.WorkingHours = $('#txt_hour').val();;
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/WorkingHoursInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].WorkingHoursId;
                    hourload(id);
                    popupShowalerts(status);
                    popuprefresh();
                    $('#Gender').focus();
                }
            }
        });
    }
}
function SaveIncrementType(Flag) {
    if ($('#txt_inc').val() == "") {
        warningshow('Please Enter Increment Type', 'txt_inc');
    }
    else if ($('#txt_hour').val() == '0') {
        warningshow('Please Enter Valid Increment Type', 'txt_inc');
        $('#txt_inc').val() == ('');
    }
    
    else {
        var data = {};   //array
        data.IncrementType = $('#txt_inc').val();;
        data.Flag = 1;
        $.ajax({
            type: "POST",
            url: "../Master/IncrementTypeInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].IncrementId;
                    IncrementtypeLoad(id);
                    popupShowalerts(status);
                    $('#addincdiv').hide();
                    $('#popupdiv1').hide();
                    $('#txt_inc').focus();
                }
            }
        });
    }
}
function SaveDivision(Flag) {
    if ($('#txt_divcode').val() == "") {
        warningshow('Please Enter Code', 'txt_divcode');
    }
    else if ($('#txt_divname').val() == "") {
        warningshow('Please Enter Code', 'txt_divname');
    }
    else {
        var data = {};   //array
        data.EmployeeDivisionCode = $('#txt_divcode').val();;
        data.EmployeeDivisionName = $('#txt_divname').val();;
        data.EmployeeDivisionDescription = $('#txt_divdes').val();;
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/EmployeeDivisionInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].EmployeeDivisionId;
                    divload(id);
                    popupShowalerts(status);
                    popuprefresh();
                }
            }
        });
    }
}
function CodeName() {
    $('#txt_deptname').val($('#txt_deptcode').val());
    $('#txt_locname').val($('#txt_loccode').val());
    $('#txt_divname').val($('#txt_divcode').val());
}

function popupShowalerts(Status) {
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
}
function basicsaltodecimal()
{
    var ratenum = parseFloat($("#txtBasicSalary").val() || 0);
    $("#txtBasicSalary").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtDA").val() || 0);
    $("#txtDA").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtTA").val() || 0);
    $("#txtTA").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtngtalowance").val() || 0);
    $("#txtngtalowance").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtothers1").val() || 0);
    $("#txtothers1").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtothers1").val() || 0);
    $("#txtothers1").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtTax").val() || 0);
    $("#txtTax").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtHRA").val() || 0);
    $("#txtHRA").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtESI").val() || 0);
    $("#txtESI").val(ratenum.toFixed(Decimal));
    var ratenum = parseFloat($("#txtothers2").val() || 0);
    $("#txtothers2").val(ratenum.toFixed(Decimal)); 
    var ratenum = parseFloat($("#txtPF").val() || 0);
    $("#txtPF").val(ratenum.toFixed(Decimal)); 
}

function calctotsalary()
{
    var totearnings = 0;
    var totdeductions = 0;
    totearnings = totearnings + parseFloat($('#txtBasicSalary').val() || 0);
    totearnings = totearnings + parseFloat($('#txtDA').val() || 0);
    totearnings = totearnings + parseFloat($('#txtTA').val() || 0);
    totearnings = totearnings + parseFloat($('#txtngtalowance').val() || 0);
    totearnings = totearnings + parseFloat($('#txtothers1').val() || 0);
    totearnings = totearnings + parseFloat($('#txtHRA').val() || 0);
    totdeductions = totdeductions + parseFloat($('#txtPF').val() || 0);
    totdeductions = totdeductions + parseFloat($('#txtTax').val() || 0);
    totdeductions = totdeductions + parseFloat($('#txtESI').val() || 0);
    totdeductions = totdeductions + parseFloat($('#txtothers2').val() || 0);   
    $('#txttotearning').val(totearnings.toFixed(Decimal));
    $('#txttotdeduction').val(totdeductions.toFixed(Decimal));
    var totsal = $('#txttotearning').val() - $('#txttotdeduction').val();
    $('#txttotalsal').val(totsal.toFixed(Decimal))

}
function checkSalarytAccounttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13 && charCode != 9) {
        $('#hiddensalaccId').val(0);
    }
}
function checkAdvanceAccounttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13 && charCode != 9) {
        $('#hiddenadvaccId').val(0);
    }
}

function SaveSalary(Flag)
{
    if ($('#txtBasicSalary').val() == "") {
        warningshow('Please Enter Basic Salary', 'txtBasicSalary');
    }
    else if (parseFloat($('#txttotearning').val()) < (parseFloat($('#txttotdeduction').val()))) {
        warningshow('Earning Cannot Be less than Deductions', '');
    }
    else
    {
        $('#SalAmount').val($('#txttotalsal').val());
        $('#NetSal').val($('#txttotalsal').val());
        $('#salarypopupdiv').hide();
        $('#salarydiv').hide();
    }
   
}

$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S
        SaveAndUpdate(1);
    }
    else if (e.altKey && e.keyCode == 76) {                 //Alt+L        
        GetRows(0);
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        formrefresh();
    }
    else if (e.keyCode == 27) {                           //esc
        $("#popupdiv").hide();
        $('#designationdiv').hide(); $('#deptdiv').hide();
        $('#Locationdiv').hide(); $('#Workinghoursdiv').hide();
        $('#documtdiv').hide();
    }

});



$(document).keydown(function (e) {
    // $('#Warningpopup').fadeOut();
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




$(document).ready(function () {
    var decimail = 2;
   // Focus next element inside the form (text box)
    $('input').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
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
    //$('select').keydown(function (e) {
    //    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //    if (key == 13) {
    //        e.preventDefault();
    //        var inputs = $(this).closest('form').find(':input:enabled');
    //        inputs.eq(inputs.index(this) + 1).focus();
    //        inputs.eq(inputs.index(this) + 1).select();
    //    }

    //});

    $("#btndelete").click(function (e) {
        $('#confirmmessage').text('Do You Want To Delete This Record?')
        $('#confirm').show();
        $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(RowId);
        $('#confirmOk').focus();
    });



    //Only Allows Numbers With Floating Point

    $('input[name="inputnumberfloat"]').keypress(function (e) {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if (e.which != 8 && e.which != 0 && (e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only')
            return false;
        }

    });

    //Only Allows Numbers Without Floating Point

    $('input[name="inputnumberint"]').keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only')
            return false;
        }

    });


});//End Document.ready
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

//Numeric Only Text Boxes
function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 43 && charCode != 45 && charCode != 40 && charCode != 41 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}



//Remove Datatable If alredy data table Created



function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'Delete') {
        SaveAndUpdate(0)
    }
    else if (Result == 'true' && status == 'Docdelete') {
        EditUplodedImages();
    }
    else if (Result == 'true' && status == 'EmployeeFiles') {
        OKUploadEmployeeFiles();
    }
    $('#confirm').fadeOut();

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
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}



//Show Window Alert Insert,update delete  Modify
function Showalerts(Status) {
    if (Status == 1) {
        formrefresh();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 7) {
        //formrefresh();
        swal('File Removed', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        formrefresh();
        swal('Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        formrefresh();
        swal('Data Cancelled', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh();
        swal('Data Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 8) {
        swal('File Removed', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}

