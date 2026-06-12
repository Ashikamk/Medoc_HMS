$(document).ready(function () {
    Defaultfocus();


    $("#JobCode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Description').focus();
        }

    });
    $("#Description").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#CustName').focus();
        }

    });
    $("#CustName").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#EstAmount').focus();
        }

    });
    $("#EstAmount").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#FirstName').focus();
        }

    });
   
    $("#JobNature").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#LPO').focus();
        }

    });
    $("#LPO").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#StartDate').focus();
        }

    });
    $("#StartDate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#EndDate').focus();
        }

    });
    $("#EndDate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#JobGroup').focus();
        }

    });
 
    $("#Address1").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Address2').focus();
        }

    });
    $("#Address2").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Address3').focus();
        }

    });
    $("#Address3").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#JobDetails').focus();
        }

    });

    $('#FirstName').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#JobNature').focus();
            e.preventDefault();

        }

    });
    $('#JobGroup').keypress(function (e) {

        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Address1').focus();
            e.preventDefault();
        }

    });



  
    function SalesmanLoad(result) {
        $("#FirstName").empty();
        $("#FirstName").append("<option value='0'>Select</option>");
        for (var i = 0; i < result.length; i++) {
            $("#FirstName").append("<option value='" + result[i].Id + "'>" + result[i].FirstName + "</option>");
        }
    }

   

    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SalesmanGetandGets",
        data: data,
        success: function (result) {
            SalesmanLoad(result.oList);

        }
    });

 

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

    

});//Document Close



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

function Defaultfocus() {
    $('#JobCode').focus();

}

function SaveAndUpdate(Flag) {
    if ($.trim($('#JobCode').val()) == "") {
        warningshow('Please Enter Code', 'JobCode');
        return false;
    }
    else if ($.trim($('#Description').val()) == "") {
        warningshow('Please Enter Description', 'Description');
        return false;
    }
    else if ($('#CustomerId').val() == 0 && $('#CustName').val() != '') {
        warningshow('Please Select Customer', 'CustName');
        return false;
    }
    else if ($('#JobGroupId').val() == 0 && ($('#JobGroup').val() != '' && $('#JobGroup').val() !=0)) {
        warningshow('Please Select Job Group', 'JobGroup');
        return false;
    }
    else {
      
        var s = "Inactive";
        if ($('#JobStatus').prop("checked"))
        { s = "Active"; }
        var a = "NO";
        if ($('#BOQ').prop("checked"))
        { a = "YES"; }
        var data = {};   //array
        data.ProjectJobId = $('#ProjectJobId').val();;
        data.JobCode = $('#JobCode').val();
        data.Description = $('#Description').val();
        data.CustId = $('#CustomerId').val();
        data.EstAmount = $('#EstAmount').val();
        data.Id = $('#FirstName').val();
        data.JobNature = $('#JobNature').val();
        data.LPO = $('#LPO').val();
        data.StartDate = $('#StartDate').val();
        data.EndDate = $('#EndDate').val();
        data.JobGroup = $('#JobGroup').val();
        data.RetensionAccount = $('#RetensionAccount').val();
        data.Address1 = $('#Address1').val();
        data.Address2 = $('#Address2').val();
        data.Address3 = $('#Address3').val();
        data.Status = $('#Status').val();
        data.BOQ = a;
        data.JobStatus = s;
        data.JobDetails = $('#JobDetails').val();
        data.DelFlag = Flag;
        data.CurrDate = CurDate;
        data.UserId = ERPUserId;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Master/ProjectJobInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                }
            }
        });

    }


}




function formrefresh() {
    $('#JobCode').val('');
    $('#Description').val('');
    $('#CustName').val('');
    $('#EstAmount').val('');
    $('#FirstName').val('0');
    $('#JobNature').val('');
    $('#LPO').val('');
    $('#StartDate').val(CurDate);
    $('#EndDate').val(CurDate);
    $('#JobGroup').val('');
    $('#Address1').val('');
    $('#Address2').val('');
    $('#Address3').val('');
    $('#JobStatus').prop("checked", true);
    $('#BOQ').prop("checked", true);
    $('#JobDetails').val('');
    $('#RetensionAccount').val('');
    $('#RetensionAccountId').val(0);
    $('#Status').val('Created');
    $('#JobCode').focus();
    $('#ProjectJobId').val(0);
    $('#CustomerId').val(0);
    $('#JobGroupId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}


function ShowProjectJoblist(result) {
    disable_datatable('tblprojectjob');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%>Sl#</th><th width=2%>Code</th><th width=6%>Description</th><th width=2%>Customer</th><th width=2%>Est.Amount</th><th width=2%>LPO</th><th width=2%>Retension Account</th><th width=2%>Start Date</th><th width=2%>End Date</th><th width=1%>BOQ</th><th width=2%>Status</th><th width=1%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + slno + '</td><td>' + result[i].JobCode + '</td><td>' + result[i].Description + '</td><td>' + result[i].CustName + '</td><td>' + result[i].EstAmount + '</td><td>' + result[i].LPO + '</td><td>' + result[i].RetensionAccount + '</td><td>' + result[i].StartDate + '</td><td>' + result[i].EndDate + '</td><td>' + result[i].BOQ + '</td><td>' + result[i].JobStatus + '</td><td align=center><a onclick="GetRows(' + result[i].ProjectJobId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblprojectjob').html(responseText + '</tbody><tfoot><tr><th> </th><th>Code</th><th>Description</th><th>Customer</th><th> </th><th>LPO</th><th>Retension Account</th><th>Start Date</th><th>End Date</th><th>BOQ</th><th>Status</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblprojectjob');
}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Serial#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Code' || title == 'Description' || title == 'Description' || title == 'Customer' || title == 'Est.Amount' || title == 'LPO' || title == 'Start Date' || title == 'End Date' || title == 'Status' || title == 'BOQ')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
    });
    var table = null;
    if (download) {
        if (!title || !tableButtonContainerId) {
            //console.log("download table need title and button container");
        }

        // AddColumnSelectionButton(tableButtonContainerId, tablename)

        table = $('#' + tablename).DataTable({
            // dom: 'Bfrtip',
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
                className: 'excelexport',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    }
                ]
            },
            'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
        //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
        //    var column = table.column($(this).attr('data-em-col'));
        //    column.visible($(this).prop("checked"));
        //});
    } else {
        table = $('#' + tablename).DataTable();
    }
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


function ShowProjectJobGet(result) {
    for (var i = 0; i < result.length; i++) {
        if (result[i].JobStatus == 'Inactive') {

            $('#JobStatus').prop("checked", false);
        }
        else {
            $('#JobStatus').prop("checked", true);
        }
        if (result[i].BOQ == 'NO') {

            $('#BOQ').prop("checked", false);
        }
        else {
            $('#BOQ').prop("checked", true);
        }
        $('#CustomerId').val(result[i].CustId);
        $('#JobCode').val(result[i].JobCode);
        $('#Description').val(result[i].Description);
        $('#CustName').val(result[i].CustName);
        $('#EstAmount').val(result[i].EstAmount);
        $('#FirstName').val(result[i].Id);
        $('#JobNature').val(result[i].JobNature);
        $('#LPO').val(result[i].LPO);
        $('#StartDate').val(result[i].StartDate);
        $('#EndDate').val(result[i].EndDate);
        $('#JobGroup').val(result[i].JobGroup);
        $('#JobGroupId').val(result[i].JobGroup);
        $('#Address1').val(result[i].Address1);
        $('#Address2').val(result[i].Address2);
        $('#Address3').val(result[i].Address3);
        $('#BOQ').val(result[i].BOQ);
        $('#JobStatus').val(result[i].JobStatus);
        $('#JobDetails').val(result[i].JobDetails);
        $('#RetensionAccount').val(result[i].RetensionAccount);
        $('#Status').val(result[i].Status);
        $('#JobCode').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(ProjectJobId) {
    $('#ProjectJobId').val(ProjectJobId)
    var data = {};
    data.ProjectJobId = ProjectJobId;
    $.ajax({
        type: "POST",
        url: "../Master/ProjectJobGetandGets",
        data: data,
        success: function (result) {
            if (ProjectJobId == 0)
                ShowProjectJoblist(result.oList);
            else
                ShowProjectJobGet(result.oList);

        }
    });

}



function fousnextbutton(e, id) {
    var x = e.which || e.keyCode;
    if (x == 13) {
        $(id).focus();
    }
}


$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();
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

//Remove Datatable If alredy data table Created
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
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}



