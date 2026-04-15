var LoadTime = 0;
$(document).ready(function () {
    LoadTime = 1;
    $("#UserName").focus();
    $.ajax({
        type: "POST",
        url: "../Login/CompanyDetailGet",
        data: data,
        success: function (result) {
            GetComanyDetails(result.QList);
        }
    });

    $('#versionoverlay').hide();
    $(document).ready(function () {
        var vcookie = localStorage.getItem('VersionCookie');

        if (vcookie == null || vcookie == "" || vcookie == undefined) {
            localStorage.setItem('VersionCookie', $('#CurrVersion').text())
        }
        else {

            if (vcookie != $('#CurrVersion').text()) {
                $('#versionoverlay').show();
            }
            else {
                $('#UserName').focus();
                $('#versionoverlay').hide();
            }
        }

    });

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

    $('#UserName').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Password').focus();
        }
        
    });
    $('#Password').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#deptselect').focus();
        }

    });
    $('#deptselect').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnlogin').focus();
        }

    });
    $("#btnlogin").click(function (e) {
        UserLogin();
    });

});


function DepartmentLoad(result) {
    $("#deptselect").empty();
    for (var i = 0; i < result.length; i++) {
        $("#deptselect").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
}


function login() {
    window.location = '../master/';
}



function UserLogin() {
    var flo = (localStorage.getItem('cacaca'));
    if (flo == null) {
        $('.loader').hide();
        toastr.error('Please Contact Admin');
        $('#Activatelink').show();
        localStorage.removeItem('nanana');
        localStorage.removeItem('tttt');

    }
    else {
        $('.loader').show();
        var cat = (localStorage.getItem('nanana'));
        if (cat != null) {
            clearSession();
        }

        var data = {};   //array
        data.UserLoginId = $('#UserLoginId').val();
        data.UserName = $('#UserName').val();
        data.Password = $('#Password').val();
        data.DeptID = $('#deptselect').val();

        $.ajax({
            type: "POST",
            url: "../Login/UserLoginCheck",
            data: data,
            success: function (result) {
                if (result.oList.length > 0) {
                    var Flag = result.oList[0].flag;
                    if (Flag == 1) {


                        GetUserDetails(result.oList);
                    }
                    else if (Flag == 2) {
                        $('.loader').hide();
                        toastr.error('Department Access Denied');
                        $('#deptselect').focus();
                    }
                    else if (Flag == 3) {
                        $('.loader').hide();
                        toastr.error('Access Denied');
                        $('#deptselect').focus();
                    }
                    else if (Flag == 4) {
                        $('.loader').hide();
                        toastr.error('Incorrect UserName/Password');
                        $('#UserName').focus();
                    }
                }
                else {
                    $('.loader').hide();
                    toastr.error('Incorrect UserName/Password');
                    $('#UserName').focus();
                }

            }
        });
    }
}


function GetUserDetails(result) {
    var flo = (localStorage.getItem('cacaca'));
    if (flo == null) {
        $('.loader').hide();
        toastr.error('Please Contact Admin');
        $('#Activatelink').show();
        localStorage.removeItem('nanana');
        localStorage.removeItem('tttt');

    }
    else
    {
    var DivArray = [];
    
    for (var i = 0; i < result.length; i++) {
        DivArray.push(result[i].DivId);
    }
    localStorage.setItem('tttt', DivArray);
        //Neethu Change Start
    var UserDetails = '' + result[0].UserId + ':' + result[0].DeptId + ':' + result[0].LocationID + ':' + result[0].UserName + ':' + result[0].DepartmentName + ':' + result[0].UserMenu + ':' + result[0].EODDate + '';
        //Neethu Change End
     localStorage.setItem('nanana', UserDetails);
    
        var dashboard = result[0].UserMenu.split(",");
        localStorage.setItem('LoginMe', '1');
        
        console.log(dashboard.indexOf("M383"))
        console.log(dashboard.indexOf("M171"))

        //debugger;
       
        //M171
         if (dashboard.indexOf("M383") != -1) {
            window.location = '../Revisit/DashBoard';
            localStorage.setItem('defaultdashboard', '../Revisit/DashBoard');

         }
         else if (dashboard.indexOf("M311") != -1) {

             window.location = '../Revisit/OPWorkSheet_D';
             localStorage.setItem('defaultdashboard', '../Revisit/OPWorkSheet_D');

         }
        else if (dashboard.indexOf("M171") != -1) {

             window.location = '../DashBoard/MyDashBoard';
             localStorage.setItem('defaultdashboard', '../DashBoard/MyDashBoard');

        }
        else {
            window.location = '../DashBoard/DashBoard';
            localStorage.setItem('defaultdashboard', '../DashBoard/DashBoard');
        }
        
    }
    
}

function GetComanyDetails(result) {

    if (result.length > 0) {

        console.log('ddddd'+result[0].PostingAllow)

        var ComanyDetail = '' + result[0].CompanyId + '%' + result[0].CompanyCode + '%' + result[0].CompanyName + '%' + result[0].Address + '%' + result[0].PhoneNo + '%' + result[0].Email + '%' +
            result[0].Fax + '%' + result[0].PeriodFrom + '%' + result[0].PeriodTo + '%' + result[0].ProtectionDate + '%' + result[0].CurrencyId + '%' + result[0].Decimals + '%' + result[0].TRNNo + '%' +
            result[0].DelFlag + '%' + result[0].Area + '%' + result[0].BusinessType + '%' + result[0].CurDate + '%' + result[0].SalesPrint + '%' + result[0].SalesReturnPrint + '%' + result[0].VoucherPrint + '%' +
            result[0].QuotationPrint + '%' + result[0].PrintColor + '%' + result[0].EODType + '%' + result[0].CessType + '%' + result[0].LabBillPrint + '%' + result[0].IPBillPrint + '%' + result[0].TaxType + '%' + result[0].IPTaxZero + '%' + result[0].DischargePrint+ '%' + result[0]. PostingAllow +'';


        localStorage.setItem('cacaca', ComanyDetail);
        $('#CompanyN').text(result[0].CompanyName);
        document.title = result[0].CompanyName;
       
    }
    else if (localStorage.getItem('cacaca') != null) {
        localStorage.removeItem('cacaca');
        
        CompanyDetailsLoadInterval();
    }
    LoadTime = 0;
}

function clearSession() {
    $('.loader').hide();
    var catte = (localStorage.getItem('nanana'));
    var resee = catte.split(":");
    if (catte != null)
    {
        var data = {};   //array                   
        data.UserId = resee[0];

        $.ajax({
            type: "POST",
            url: "../Login/UserLogoutCheck",
            data: data,
            success: function (result) {
                localStorage.removeItem('nanana');
                localStorage.removeItem('tttt');
                //toastr.success("Session Cleared");
            }
        });
    }
    else {
        localStorage.removeItem('nanana');
        localStorage.removeItem('tttt');
        //toastr.success("Session Cleared");
    }
    
    
    
}
function Newuser() {
    $('.loader').hide();
    toastr.warning("Please Contact your Admin");
}


function activate() {
    var data = {};
    $.ajax({
        type: "POST",
        url: "../Login/GetCompanyCode",
        data: data,
        success: function (result) {
            var CC = result.QList[0].CompanyCode;
            var DD = result.QList[0].ValidationKey;
            var EX = result.QList[0].Extended;

            if (parseInt(result.QList[0].Days) > 0) {
                DD = DD +'-'+ result.QList[0].Days+'M'
            }
            else {
                DD = DD +'-'+ result.QList[0].Days + 'E'
            }
            if (EX == '0' || EX == '1') {
                $("#btnextend").show();
            }
            else {
                $("#btnextend").hide();
            }
            $('#Comapnycode').text(CC + '-' + DD);
        }
    });
    $('#ExpiryDiv').modal('show');
    $("#ExpiryDiv").appendTo("body");
    //$('#ExpiryDiv').show();
    $('#expirycode').val('');
    $('#expirycode').focus();
}
function Extend() {
    var data = {};
    $.ajax({
        type: "POST",
        url: "../Login/ExtendExpiry",
        data: data,
        success: function (result) {

            var status = result.QList[0].Status;
            var ex = result.QList[0].Extended
            if (status == 1) {
                $.ajax({
                    type: "POST",
                    url: "../Login/CompanyDetailGet",
                    data: data,
                    success: function (result) {
                        GetComanyDetails(result.QList);
                    }
                });
                //$('#ExpiryDiv').hide();
                $('#ExpiryDiv').modal('hide');
                $('#Activatelink').hide();
                $('.loader').hide();
                toastr.success("License Extended for 15 days (Till " + ex + ")");
            } else {
                $('#expirycode').val('');
                $('#expirycode').focus();
                $('.loader').hide();
                toastr.error('Cannot process License Extension');
            }
        }
    });
}
function CheckExpiry() {

    if ($('#expirycode').val() == '') {
        $('.loader').hide();
        toastr.warning("Please Enter The Activation Code");
        $('#expirycode').focus();
    } else {        
        var data = {};
        data.ActivationCode = $('#expirycode').val();
        $.ajax({
            type: "POST",
            url: "../Login/ComapnyExpiryUpdate",
            data: data,
            success: function (result) {                
                var status = result.QList[0].Status;
                if (status == 1) {
                    $.ajax({
                        type: "POST",
                        url: "../Login/CompanyDetailGet",
                        data: data,
                        success: function (result) {
                            GetComanyDetails(result.QList);
                        }
                    });
                    //$('#ExpiryDiv').hide();
                    $('#ExpiryDiv').modal('hide');
                    $('#Activatelink').hide();
                    $('.loader').hide();
                    toastr.success("License Activated");
                } else {
                    $('#expirycode').val('');
                    $('#expirycode').focus();
                    $('.loader').hide();
                    toastr.error('Invalid Activation Code');
                }

            }
        });
    }
}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function Checklength(evt) {
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 8 && charCode != 13) {
        if (($('#expirycode').val()).length == 4 || ($('#expirycode').val()).length == 9 || ($('#expirycode').val()).length == 14) {
            $('#expirycode').val($('#expirycode').val() + '-')
        }
    }
}