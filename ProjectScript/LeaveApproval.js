$(document).ready(function () {
});

function approved(slno, no) {


    var DeptId = 0;
    var data = {};
    data.EmpId = $('#hiddencode' + slno).text();
    data.DeptId = ERPDeptId;
    // data.DelFlag = Flag;
    data.Flag = no;
    $.ajax({
        type: "POST",
        url: "../PayRoll_LeaveApply/Approval",
        data: data,
        success: function (result) {


            for (var i = 0; i <= result.oList.length; i++) {
                var Status = result.oList[i].Status;

                var CompanyMail = result.oList[i].CompanyMail;
                var EmployeeMail = result.oList[i].EmployeeMail;
                var PWD = result.oList[i].PWD;

                if (Status == 1 ) {

                    //formrefresh();
               

                    //  var DeptId = 0;
                    var data = {};
                    data.CompanyMail = CompanyMail
                    data.EmployeeMail = EmployeeMail
                    data.PWD = PWD
                    var x = "0";
                    
                    if (CompanyMail == x || EmployeeMail == x) {

                       
                        warningshow('MailId Missing', '');
                     
                    }
                    else
                    {
                        $.ajax({
                            url: "../PayRoll_LeaveApply/email",
                            data: data,
                            success: function () { }
                        });
                   
                    }
                         swal('The Request has been Approved', "", "success");
                    $('.swal-button swal-button--confirm').focus();
               
                    GetList();

                }


                else if (Status == 2) {

                    var data = {};
                    data.CompanyMail = CompanyMail
                    data.EmployeeMail = EmployeeMail
                    data.PWD = PWD
                    var x = "0";

                    if (CompanyMail == x || EmployeeMail == x) {


                        warningshow('MailId Missing', '');

                    }
                    else {
                        $.ajax({
                            url: "../PayRoll_LeaveApply/rejectmail",
                            data: data,
                            success: function () { }
                        });

                    }
                    swal('The Request has been Rejected', "", "success");
                    $('.swal-button swal-button--confirm').focus();

                    GetList();

 
                }
               

                
             
            }
        }
    });
}




//function Showstatus(Status) {
//    if (Status == 1) {
 
//        //formrefresh();
//        swal('The Request has been Approved', "", "success");
//        $('.swal-button swal-button--confirm').focus();

//    //  var DeptId = 0;
//    //var data = {};
//    //data.EmpId = $('#hiddencode' + slno).text();
//    //data.DeptId = ERPDeptId;




//        $.ajax({
//            url: "../PayRoll_LeaveApply/email",

//              success: function () { }
//        });

//    }

//    else if (Status == 2) {

//        //formrefresh();
//        swal('The Request has been Rejected', "", "success");
//        $('.swal-button swal-button--confirm').focus();




//        $.ajax({
//            url: "../PayRoll_LeaveApply/rejectmail",

//            success: function () { }
//        });

//    }
//}



























