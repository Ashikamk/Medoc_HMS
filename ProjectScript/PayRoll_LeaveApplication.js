$(document).ready(function () {


    //var a = "30";
    //$('#annualleave').text(a);
    //$('#leavetaken').text("3");

    //  leavestaken();

    //var b = "";
    //$('#leavetaken').val(b);
    //var d = (val(a) - val(b));
    //$('#availableleave').val(d);


    //$("#availableleave").click(function (e) {
    //    leavestaken(1);
    //});



    $("#applybtn").click(function (e) {
        apply(1);
    });


});


//-------------------------------------------&&&&&&&&&&&------------------------------------------------\\



function apply(Flag) {
    if ($('#bname').val() == "") {
        warningshow('Please Enter Code', 'bname');
    }
        //else if ($('#hiddenempid').val() == "") {
        //    warningshow('Please Enter field', 'hiddenempid');
        //}
    else if ($('#leavetype').val() == '0') {
        warningshow('Please Enter Leave Type', 'leavetype');
    }
    else if ($('#leavefrom').val() == "") {
        warningshow('Please Enter Leaves Upto', 'leavefrom');
    }
    else if ($('#leavesupto').val() == "") {
        warningshow('Please Enter Leaves Upto', 'leavesupto');
    }


        ////Submit Code in else part

    else {
        var data = {};   //array
        data.EmpId = $('#hiddencode').val();
        data.LeaveType = $('#leavetype').val();
        data.LeaveFrom = $('#leavefrom').val();
        data.LeavesUpto = $('#leavesupto').val();
        data.TotalDays = $('#txtdays').val();
        data.Date = $('#todaysdate').val();
        data.UId = ERPUserId;
        data.DeptId = ERPDeptId;
        data.DelFlag = 0;
        //ajax code for insert and update to master controller
        $.ajax({
            type: "POST",
            url: "../../PayRoll_LeaveApply/LeaveApplicationInsert",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showstatus(status);
                }
            }
        });
    }
}


//------------------------------------------------------------\\

function Showstatus(Status) {
    if (Status == 1) {
        formrefresh();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 0) {
        formrefresh();
        swal('Data Already Submitted', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
}

function formrefresh() {
    $('#bname').val('');
    $('#DesignationId').val('');
    $('#DepartmentId').val('');
    $('#DateofJoin').val('');
    $('#Mobile').val('');
    $('#Email').val('');
    $('#bname').focus();
    $('#leavetype').val('0');
    $('#leavefrom').val('');
    $('#leavesupto').val('');
    $('#leavetaken').val('');
    $('#annualleave').val('');
    $('#availableleave').val('');
    $('#img1').val('');
    $('#txtdays').val('');
    
}

//-------------------------------------------&&&&&&&&&&&------------------------------------------------\\



//function leavestaken()
//{

//    var a = $('#annualleave').val();
//    var b = $('#leavetaken').val();   
//    var c = a - b;  
//    $('#availableleave').text(c);
//   //  alert(c);
//}



//-------------------------------------------&&&&&&&&&&&------------------------------------------------\\



function DesignationLoad(result, a) {
    $("#DesignationId").empty();
    $("#DesignationId").append("<option value='0'>----Select Designation----</option>");
    for (var i = 0; i < result.length; i++) {
        $("#DesignationId").append("<option value='" + result[i].DesignationId + "'>" + result[i].DesignationCode + "</option>");
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



//-------------------------------------------&&&&&&&&&&&------------------------------------------------\\

//-------------------------------------------&&&&&&&&&&&------------------------------------------------\\


function Addpopupwindow(btndesignation) {
    $("#popupdiv").css("margin-top", '0px');
    $('#designationdiv').hide();
    $('#popupdiv').show();
    if (Id == 1) {
        $('#myheader').text('Designation');
        $('#designationdiv').show();
        $('#txt_code').focus();
    }
}

//---------------------------------------&&&&&&&&&&&------------------------------------------------\\


function DepartmentLoad(result, a) {
    $("#DepartmentId").empty();
    $("#DepartmentId").append("<option value='0'>----Select Department----</option>");
    for (var i = 0; i < result.length; i++) {
        $("#DepartmentId").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
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


//---------------------------------------&&&&&&&&&&&------------------------------------------------\\


//function calcleavedays() {



//}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
//---------------------------------------&&&&&&&&&&&------------------------------------------------\\


function fnImageSave(imageName) {
    var totalFiles = document.getElementById("file").files.length;
    var formData = new FormData();
    var totalFiles = document.getElementById("file").files.length;
    var browsedFile = document.getElementById("file").files[0];
    var ImageId = "0";
    if ((imageName != "") && (totalFiles != 0)) {
        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", imageName);
            formData.append("UniqueId", ImageId);
            $.ajax({
                type: "POST",
                url: '../Master/UploadEmployeeImage',
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {
                    //   $("#btnViewImage").show();
                }
            });
        }
    }
}



//---------------------------------------&&&&&&&&&&&------------------------------------------------\\



//---------------------------------------&&&&&&&&&&&------------------------------------------------\\















