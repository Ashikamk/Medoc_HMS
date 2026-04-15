function AccountLoad(result) {
    $("#select_acnt").empty();
    $("#select_acnt").append("<option value='0'>--Select Account--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_acnt").append("<option value='" + result[i].AcntId + "' name='" + result[i].AcntSlno + "'>" + result[i].AcntDescription + ' - ' + result[i].AcntCode + "</option>");
    }
}







function TermsLoad(result) {
    $("#select_terms").empty();
    $("#select_terms").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_terms").append("<option value='" + result[i].TermsId + "' name='" + result[i].Terms + "'>" + result[i].TermsDescription + "</option>");
    }

}

function AreaLoad(result) {
    $("#select_place").empty();
    $("#select_place").append("<option value='0'>--Select Area--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_place").append("<option value='" + result[i].AreaId + "'>" + result[i].AreaName + "</option>");
    }
}


function CountryLoad(result) {
    $("#Nationality").empty();
    $("#Nationality").append("<option value='0'>----Select Country----</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Nationality").append("<option value='" + result[i].CountryId + "'>" + result[i].CountryName + "</option>");
    }
}

$(document).ready(function () {
    GetAreaGroupselect(0);
    formrefresh();


    Defaultfocus();
    accounttypeload();
    $('#txttemail').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtcn1').focus(); 

        }

    });

    $('#select_place').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();          
            $('#Nationality').focus();
        }

    });

    // $('#tab2').click(function () {
    //     $('#txtcn1').focus();
    //})
    $('#tab3').click(function () {

        document.getElementById("txtpass").focus();
        // alert('')
    })



    var data = {};
    data.AreaId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            AreaLoad(result.oList);
        }
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

    var data = {};
    data.TermsId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TermsGetandGets",
        data: data,
        success: function (result) {
            TermsLoad(result.oList);
        }
    });

    $("#select_acnt").change(function () {

        if ($('#select_acnt').val() == 0) {
            $("#txtacnt").val('');
            $('#txtacnt1').val('');
        }
        else {
            var AccSlno = $(this).find("option:selected").attr("name")
            var Prefix = ["0", "0", "00", "000"];
            var i = 4 - AccSlno.length
            if (i < 4) { Pre = Prefix[i] } else { Pre = ''; }
            $("#txtacnt").val(Pre + AccSlno)
            var Res = $("#select_acnt option:selected").text().substring($("#select_acnt option:selected").text().length - 4, 100)
            $('#txtacnt1').val(Res);
            $('#txtacnt').focus();
            $('#txtacnt').select();
        }

    });














    $("#btnsubmit").click(function (e) {
        //if ($.trim($('#txttemail').val()) != "") {
        //    var Email = $('#txtemail').val();
        //    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        //    if (!re.test(Email)) {
        //        warningshow('Invalid Email ID', 'txttemail')
        //        return false
        //    }
        //}
        //if ($.trim($('#txtemail').val()) != "") {
        //    var Email = $('#txtcustemail').val();
        //    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        //    if (!re.test(Email)) {
        //        warningshow('Invalid Email ID', 'txtemail') 
        //        return false
        //    }
        //}
      
           SaveAndUpdate(1);
       
       
    });






    $(document).keydown(function (e) {
     if (e.keyCode == 27) {                           //esc
         popuprefresh();
        }
    });







});//Document Close

function Defaultfocus() {
    $('#select_acnt').focus();
}






function accounttypeload() {
    var data4 = {};
    data4.AcntId = 0;
    data4.UserType = 'C'
    data4.DeptId = ERPDeptId
    $.ajax({
        type: "POST",
        url: "../Master/AcntGetandGets",
        data: data4,
        success: function (result) {
            AccountLoad(result.oList);
        }
    });

}

function SaveAndUpdate(Flag) {
    if ($("#select_acnt").val() == 0) {
        warningshow('Please Select Account Type', 'select_acnt');
    }

    else if (($.trim($("#txtacnt").val()) == '') || ($("#txtacnt").val() == 0)) {
        warningshow('Please Enter The Reg No', 'txtacnt');
        $("#txtacnt").select();
    }
    else if ($.trim($("#txtname1").val()) == '') {
        warningshow('Please Enter  Name', 'txtname1');
    }
    else if ($("#select_terms").val() == 0) {
        warningshow('Please Select Terms', 'select_terms');
    }
    else if ($("#select_place").val() == 0) {
        warningshow('Please Select Area', 'select_place');
    }
    else if ($("#Nationality").val() == 0) {
        warningshow('Please Select Country', 'Nationality');
    }

    else {
        $('#btnsubmit').prop('disabled', true);
        var s = 0;
        if ($('#select_status').prop("checked"))
        { s = 1; }
        var data = {};
        data.TenantId = $('#TenantId').val();
        data.AccountType = $('#select_acnt').val();
        data.CustType = "C";
        data.CustStatusId = s;
        data.TenantAccount = $('#txtacnt').val();
        data.TenantName = $('#txtname1').val();
        data.TenantTermsId = $('#select_terms').val();

        data.TenantAdr1 = $('#txtadr1').val();
        data.TenantAdr2 = $('#txtadr2').val();
        data.TenantAdr3 = $('#txtadr3').val();
        data.TenantPin1 = $('#txtpin').val();
        data.TenantArea = $('#select_place').val();
        data.TenantCountry = $('#Nationality').val();
        data.TenantPhone = $('#txtphone').val();
        data.TenantEmail = $('#txttemail').val();

        data.TenantContactName1 = $('#txtcn1').val();
        data.TenantContactNo1 = $('#txtcno1').val();
        data.Email = $('#txtemail').val();
        data.TenantContactName2 = $('#txtcn2').val();
        data.TenantContactNo2 = $('#txtcno2').val();
        data.TenantContactName3 = $('#txtcn3').val();
        data.TenantContactNo3 = $('#txtcno3').val();
        data.TenantNotes = $('#txtnotes').val();

        data.TenantPass = $('#txtpass').val();
        data.TenantEmr = $('#txtemi').val();
        data.TenantBank = $('#txtbank').val();
        data.TenantVisa = $('#txtvisa').val();
        data.TenantExp = $('#expon').val();
        data.TenantComent = $('#txtcoment').val();




        data.DelFlag = Flag;

        data.MapId = $('#MapId').val();
        data.Curdate = CurDate;

        data.UserId=ERPUserId;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Realestate/TenantInsertandUpdate",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                var TenantId = result.oList[0].TenantId;

                if (status == 1) {
                    accounttypeload();

                }
                if (status == 1 || status == 2) {
                    fnImageSave(TenantId);
                    fnImageSave1(TenantId,status);
                }
                $('#btnsubmit').prop('disabled', false);
                Showalerts(status);
                //formrefresh();


            }
        });

    }
}




function formrefresh() {
    $('#txtacnt').prop("disabled", false);
    $('#select_acnt').prop("disabled", false);
   


    $('#select_status').prop("checked", true);
    $('#select_acnt').val('0')
    $('#txtacnt').val('');
    $('#txtacnt1').val('');
    $('#txtname1').val('');
    $('#select_terms').val('0');

    $('#txtadr1').val('');
    $('#txtadr2').val('');
    $('#txtadr3').val('');
    $('#txtpin').val('');
    $('#select_place').val('0');
    $('#Nationality').val('0');
    $('#txtphone').val('');
    $('#txttemail').val('');

    $('#txtcn1').val('');
    $('#txtcno1').val('');
    $('#txtemail').val('');
    $('#txtcn2').val('');
    $('#txtcno2').val('');
    $('#txtcn3').val('');
    $('#txtcno3').val('');
    $('#txtnotes').val('');

    $('#txtpass').val('');
    $('#txtemi').val('');
    $('#txtbank').val('');
    $('#txtvisa').val('');
    $('#expon').val('');
    $('#txtcoment').val('');


    $('#select_status').val('0');
    $('#selectedImage1,#selectedImage').val('');

    $('#txtacnt').focus();
    $('#TenantId').val(0);
    $('#btndelete').hide();

    $('#expon').val(CurDate);
    $("#tab2").click();
    $('#myImg').attr('src', "../app-assets/img/portrait/small/avatar-s-12.png");
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

function ShowCustomerlist(result) {
    disable_datatable('tblcustomer');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=15px>Slno</th><th>Tenant Name</th><th>Terms</th><th>Area</th><th>Country</th><th>Phone</th><th>Email</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td style=width:50px>' + slno + '</td><td style=width:50px>' + result[i].TenantName + '</td><td style=width:50px>' + result[i].Term + '</td><td style=width:50px>' + result[i].Area + '</td><td style=width:50px>' + result[i].Country + '</td><td style=width:50px>' + result[i].TenantPhone + '</td><td style=width:50px>' + result[i].TenantEmail + '</td><td align=center><a onclick="GetRows(' + result[i].TenantId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblcustomer').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th>Tenant Name</th><th>Terms</th><th>Area</th><th>Country</th><th>Phone</th><th>Email</th><th>Edit</th></tr> </tfoot>');
    datatableWithsearch('tblcustomer');
}

function ShowCustomerGet(result) {
    $('#txtname1').focus();
    $('#txtacnt').prop("disabled", true);
    $('#select_acnt').prop("disabled", true);
    $('#txtacnt1').val('');
    for (var i = 0; i < result.length; i++) {
        if (result[i].CustStatusId == 0) {

            $('#select_status').prop("checked", false);
        }
        else {
            $('#select_status').prop("checked", true);
        }
        $('#select_acnt').val(result[i].AccountType);
        $('#txtacnt').val(result[i].TenantAccount);
        $('#txtname1').val(result[i].TenantName);
        $('#select_terms').val(result[i].TenantTermsId);

        $('#txtadr1').val(result[i].TenantAdr1);
        $('#txtadr2').val(result[i].TenantAdr2);
        $('#txtadr3').val(result[i].TenantAdr3);
        $('#txtpin').val(result[i].TenantPin1);
        $('#select_place').val(result[i].TenantArea);
        $('#Nationality').val(result[i].TenantCountry);
        $('#txtphone').val(result[i].TenantPhone);
        $('#txttemail').val(result[i].TenantEmail);

        $('#txtcn1').val(result[i].TenantContactName1);
        $('#txtcno1').val(result[i].TenantContactNo1);
        $('#txtemail').val(result[i].Email);
        $('#txtcn2').val(result[i].TenantContactName2);
        $('#txtcno2').val(result[i].TenantContactNo2);
        $('#txtcn3').val(result[i].TenantContactName3);
        $('#txtcno3').val(result[i].TenantContactNo3);
        $('#txtnotes').val(result[i].TenantNotes);

        $('#txtpass').val(result[i].TenantPass);
        $('#txtemi').val(result[i].TenantEmr);
        $('#txtbank').val(result[i].TenantBank);
        $('#txtvisa').val(result[i].TenantVisa);
        $('#expon').val(result[i].TenantExp);
        $('#txtcoment').val(result[i].TenantComent);


        $('#select_status').val(result[i].CustStatusId);

        $('#myImg').attr('src', "../ProjectImages/Customer/" + result[i].TenantId + ".png");
        $('#MapId').val(result[i].MapId);

        $('#txtacnt').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txtname1').focus();

}


function GetRows(TenantId) {
    $('#TenantId').val(TenantId)
    var data = {};
    data.TenantId = TenantId;
    // data.cstyp = 0;
    $.ajax({
        type: "POST",
        url: "../Realestate/TenantGetandGets",
        data: data,
        success: function (result) {
            if (TenantId == 0)
                ShowCustomerlist(result.oList);
            else
            {
                ShowCustomerGet(result.oList);
                $.ajax({
                    url: "../ProjectImages/Tenant/" + TenantId + ".png", 
                    type: 'HEAD',
                    error: function () {
                        $('#myImg').attr('src', "../app-assets/img/elements/04.png");
                    },
                    success: function () {
                        $('#myImg').attr('src', "../ProjectImages/Tenant/" + TenantId + ".png"); 
                    }
                });
              
            }
               

        }
    });

}
//function GetDoc(TenantId) {
//    $('#TenantId').val(TenantId)
//    var data = {};
//    data.TenantId = TenantId;
//    // data.cstyp = 0;
//    $.ajax({
//        type: "POST",
//        url: "../Realestate/TenantGetandGets",
//        data: data,
//        success: function (result) {
//          var docLocation = '';
//window.open(docLocation,"resizeable,scrollbar"); 

//        }
//    });

//}


function fnImageSave(imageName,status) {
   
    var formData = new FormData();
    var totalFiles = document.getElementById("selectedImage").files.length;
    var browsedFile = document.getElementById("selectedImage").files[0];
    var ImageId = "0";
    if ((imageName != "" && totalFiles != 0)) {

        if (browsedFile.type.match('image.*')) {

            if (status == 1)
            {
                formData.append("FileUpload", browsedFile);
                formData.append("ImageName", imageName);
                formData.append("UniqueId", ImageId);
                $.ajax({
                    type: "POST",
                    url: '/Realestate/UploadTenantImage',
                    data: formData,
                    dataType: "html",
                    contentType: false,
                    processData: false,
                    success: function (result) {

                    }
                });
            }
            else
            {
                var data = {};
                data.TenantId = imageName;
                $.ajax({
                    type: "POST",
                    url: "../Realestate/RemoveExistingTenantDocument",
                    data: data,
                    success: function (result) {
                        formData.append("FileUpload", browsedFile);
                        formData.append("ImageName", imageName);
                        formData.append("UniqueId", ImageId);
                        $.ajax({
                            type: "POST",
                            url: '/Realestate/UploadTenantImage',
                            data: formData,
                            dataType: "html",
                            contentType: false,
                            processData: false,
                            success: function (result) {

                            }
                        });
                    }
                });
            }

        }
    }
    else {
        return;
    }
}

function fnImageSave1(imageName,status) {
    
    var formData = new FormData();
    var totalFiles = document.getElementById("selectedImage1").files.length;
    var browsedFile = document.getElementById("selectedImage1").files[0];
    var ImageId = "0";
   
    if ((imageName != "" && totalFiles != 0)) {
       
        if (browsedFile.type.match('image/*|application/pdf|application/vnd.ms-excel')) {
            if (status == 1)
            {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", imageName);
            formData.append("UniqueId", ImageId);
            $.ajax({
                type: "POST",
                url: '/Realestate/UploadDocImage',
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {

                }
            });
            }
           
        else
            {               
            var data = {};
            data.TenantId = imageName;
            $.ajax({
                type: "POST",
                url: "../Realestate/RemoveExistingTenantDocumentFolder",
                data: data,
                success: function (result) {
                    var DocumentId = imageName;
                    for (var i = 0; i < totalFiles; i++) {
                        formData.append("FileUpload", browsedFile);
                        formData.append("ImageName", imageName);
                        formData.append("UniqueId", ImageId);
                        $.ajax({
                            type: "POST",
                            url: '/Realestate/UploadDocImage',
                            data: formData,
                            dataType: "html",
                            contentType: false,
                            processData: false,
                            success: function (result) {

                            }
                        });
                    }
                }
            });
            }
        }
    }
    else {
        return;
    }
}

$(function () {
    $("selectedImage").change(function () {
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











