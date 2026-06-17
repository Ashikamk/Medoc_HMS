$(document).ready(function () {
    Defaultfocus();

function UserLoad(result) {
    $("#UserName").empty();
    $("#UserName").append();
    for (var i = 0; i < result.length; i++) {
        $("#UserName").append("<option value='" + result[i].UserId + "'>" + result[i].UserName + "</option>");
    }
}

    var data = {};
    data.UserId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UsersGetandGets",
        data: data,
        success: function (result) {
            UserLoad(result.oList);

        }
    });

  

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });


    $("#UserName").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Date').focus();
        }
    });
    $("#Date").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Time').focus();
        }
    });
    $("#Time").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Subject').focus();
        }
    });
    $("#Subject").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#ReminderMessage').focus();
        }
    });
    $("#ReminderMessage").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }
    });
});//Document Close

function Defaultfocus() {
    $('#UserName').focus();
}



function SaveAndUpdate(Flag) {

    if ($('#UserId').val() == 0) {
        warningshow('Please Select User Name', 'UserId');
    }
    else if ($.trim($('#Date').val()) == "") {
         warningshow('Please Enter Date', 'Date');
     }
    else if ($.trim($('#Time').val()) == "") {
        warningshow('Please Enter Time', 'Time');
     }
    else if ($.trim($('#Subject').val()) == "") {
        warningshow('Please Enter Subject', 'Subject');
     }
    else if ($.trim($('#ReminderMessage').val()) == "") {
        warningshow('Please Enter Message', 'ReminderMessage');
     }
   
    else {
        var data = {};   //array
        data.TRType = "R";
        data.ReminderId = $('#ReminderId').val();      
        data.UserId = $('#UserId').val();
        data.Date = $('#Date').val();
        data.Time = $('#Time').val();
        data.Subject = $('#Subject').val();
        data.ReminderMessage = $('#ReminderMessage').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/ReminderInsertandUpdate",
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
    $('#UserName').val('');
    $('#UserId').val(0);
    $('#Date').val(CurDate);
    $('#Time').val('');
    $('#Subject').val('');
    $('#ReminderMessage').val('');
    $('#UserName').focus();
    $('#ReminderId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}





function ShowReminderGrid(result) {
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);

      


        var Reminder = '<div class="col-md-5"><div class="card"><div class="card-block pt-3"><div class="clearfix"><h5 class="text-bold-500 primary float-left">' + result[i].UserName + '-' + result[i].Subject + '</h5><div class="actions float-right"><i class="ft-edit mr-1 info"></i><i class="ft-trash-2 danger"></i></div></div> <p>' + result[i].ReminderMessage + '</p><img src="../app-assets/img/portrait/small/avatar-s-3.png" class="rounded-circle width-50 mr-2"><span class="primary">' + result[i].Date + '   ' + result[i].Time + '</span></div></div></div>';
        $('#taskboard').append(Reminder)
    }

}



function ShowReminderlist(result) {
    disable_datatable('tblreminder');
    $('#Entry').show();
   // $('#listing').show();
    var responseText = "<thead><tr><th width=15px>Slno</th><th>User Name</th><th>Date</th> <th>Time</th><th>Subject</th><th>Message</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + slno + '</td><td>' + result[i].UserName + '</td><td>' + result[i].Date + '</td><td>' + result[i].Time + '</td> <td>' + result[i].Subject + '</td> <td>' + result[i].ReminderMessage + '</td><td align=center><a onclick="GetRows(' + result[i].ReminderId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblreminder').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th>User Name</th><th>Date</th> <th>Time</th><th>Subject</th><th>Message</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch('tblreminder');
}

function ShowReminderGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#UserId').val(result[i].UserId);
        $('#UserName').val(result[i].UserName);
        $('#Date').val(result[i].Date);
        $('#Time').val(result[i].Time);
        $('#Subject').val(result[i].Subject);
        $('#ReminderMessage').val(result[i].ReminderMessage);
        $('#UserName').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(ReminderId) {
    $('#ReminderId').val(ReminderId)
    var data = {};
    data.ReminderId = ReminderId;
    data.trtypes = 0;
    $.ajax({
        type: "POST",
        url: "../Master/ReminderGetandGets",
        data: data,
        success: function (result) {
            if (ReminderId == 0) {
                ShowReminderlist(result.oList);
                ShowReminderGrid(result.oList);
            }
            else {
                ShowReminderGet(result.oList);
                ShowReminderGrid(result.oList);
            }
        }
    });
  
}




