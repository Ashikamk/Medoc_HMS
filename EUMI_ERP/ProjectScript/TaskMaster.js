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

  

    $("#TaskId").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#UserName').focus();
        }
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
            $('#TaskStatus').focus();
        }
    });
    $("#TaskStatus").keydown(function (e) {
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
    $('#TaskId').focus();
}

function btndelete() {
    var Res = confirm("Do You Want Delete this record?")
    if (Res == true)
        SaveAndUpdate(0)
}


function SaveAndUpdate(Flag) {
    if ($.trim($('#TaskId').val()) == "") {
        warningshow('Please Enter Task ID', 'TaskId');
    }
    else if ($('#UserId').val() == 0) {
        warningshow('Please Select User Name', 'UserName');
    }
    else if ($.trim($('#Date').val()) == "") {
        warningshow('Please Enter Date', 'Date');
    }
    else if ($.trim($('#Time').val()) == "") {
        warningshow('Please Enter Time', 'Time');
    }
    else if ($.trim($('#TaskStatus').val()) == 0) {
        warningshow('Please Select Status', 'TaskStatus');
    }
    else if ($.trim($('#ReminderMessage').val()) == "") {
        warningshow('Please Enter Message', 'ReminderMessage');
    }

    else {
        var data = {};   //array  
        data.TRType = "T";
        data.ReminderId = $('#ReminderId').val();
        data.TaskId = $('#TaskId').val();;
        data.UserId = $('#UserId').val();
        data.Date = $('#Date').val();
        data.Time = $('#Time').val();
        data.TaskStatus = $('#TaskStatus').val();
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
    $('#TaskStatus').val('0');
    $('#ReminderMessage').val('');   
    $('#TaskId').focus();
    $('#TaskId').val('');
    $('#ReminderId').val(0);
    $('#btndelete').hide();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
   
}



//<div class="col-xl-3 col-lg-6 col-12">
//			<div class="card">
//				<div class="card-body">
//					<div class="px-3 py-3">
//						<div class="media">
//							<div class="media-body text-left">
//								<h3 class="mb-1 danger">278</h3>
//								<span>New Projects</span>
//							</div>
//							<div class="media-right align-self-center">
//								<i class="icon-rocket danger font-large-2 float-right"></i>
//							</div>
//						</div>
//					</div>
//				</div>
//			</div>
//		</div>



function ShowTaskGrid(result) {
    
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        var Task = '<div class="row"><div class="col-xl-3 col-lg-6 col-12"><div class="card"><div class="card-block pt-3"><div class="clearfix"><h5 class="text-bold-500 primary float-left">' + result[i].TaskId + '-' + result[i].UserName + '</h5><div class="actions float-right"><a onclick="GetRows(' + result[i].ReminderId + ')"><i class="ft-edit mr-1 info"></i></a><a onclick="btndelete()"><i class="ft-trash-2 danger"></i></a></div></div> <p>' + result[i].ReminderMessage + '</p><img src="../app-assets/img/portrait/small/avatar-s-3.png" class="rounded-circle width-50 mr-2"><span class="primary">' + result[i].Date + '   ' + result[i].Time + '</span> <input type="hidden" ' + result[i].TaskStatus + '/></div></div></div></div></td></td>';
        $('#taskboard').append(Task)
    }

}



//function ShowTaskGrid(result) {
    
//    for (var i = 0; i < result.length; i++) {
//        var slno = parseInt(i + 1);
//        Task = '<div class="col-md-3"><div class="card"><div class="card-block pt-3"><div class="clearfix"><h5 class="text-bold-500 primary float-left">' + result[i].TaskId + '-' + result[i].UserName + '</h5><div class="actions float-right"><i class="ft-edit mr-1 info"></i><i class="ft-trash-2 danger"></i></div></div> <p>' + result[i].ReminderMessage + '</p><img src="../app-assets/img/portrait/small/avatar-s-3.png" class="rounded-circle width-50 mr-2"><span class="primary">' + result[i].Date + '   ' + result[i].Time + '</span> <input type="hidden" ' + result[i].TaskStatus + '/></div></div></td></td>';
//        $('#taskboard').append(Task)
//    }
   
//}


//function ShowTaskGrid(result) {

//    for (var i = 0; i < result.length; i++) {
//        var slno = parseInt(i + 1);
//        Task = '<table><tr><div class="col-md-3"><div class="card"><div class="card-block pt-3"><div class="clearfix"><h5 class="text-bold-500 primary float-left">' + result[i].TaskId + '-' + result[i].UserName + '</h5><div class="actions float-right"><i class="ft-edit mr-1 info"></i><i class="ft-trash-2 danger"></i></div></div> <p>' + result[i].ReminderMessage + '</p><img src="../app-assets/img/portrait/small/avatar-s-3.png" class="rounded-circle width-50 mr-2"><span class="primary">' + result[i].Date + '   ' + result[i].Time + '</span> <input type="hidden" ' + result[i].TaskStatus + '/></div></div></td></td></tr></table>';
//        $('#taskboard').append(Task)
//    }

//}


function ShowTasklist(result) {
    disable_datatable('tbltask');
    $('#Entry').show();
  // $('#listing').show();
    var responseText = "<thead><tr><th width=15px>Slno</th><th>Task ID</th><th>User Name</th><th>Date</th> <th>Time</th><th>Status</th><th>Message</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + slno + '</td><td>' + result[i].TaskId + '</td><td>' + result[i].UserName + '</td><td>' + result[i].Date + '</td><td>' + result[i].Time + '</td> <td>' + result[i].TaskStatus + '</td> <td>' + result[i].ReminderMessage + '</td><td align=center><a onclick="GetRows(' + result[i].ReminderId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tbltask').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th>Task ID</th><th>User Name</th><th>Date</th> <th>Time</th><th>Status</th><th>Message</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch('tbltask');
}

function ShowTaskGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#TaskId').val(result[i].TaskId);
        $('#UserId').val(result[i].UserId);
        $('#UserName').val(result[i].UserName);
        $('#Date').val(result[i].Date);
        $('#Time').val(result[i].Time);
        $('#TaskStatus').val(result[i].TaskStatus);
        $('#ReminderMessage').val(result[i].ReminderMessage);
        $('#TaskId').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(ReminderId) {
    $('#ReminderId').val(ReminderId)
    var data = {};
    data.ReminderId = ReminderId;
    data.trtypes = 1;
    $.ajax({
        type: "POST",
        url: "../Master/ReminderGetandGets",
        data: data,
        success: function (result) {
            if (ReminderId == 0) {
                ShowTasklist(result.oList);
                ShowTaskGrid(result.oList);
            }
            else {
                ShowTaskGet(result.oList);
              
            }

        }
    });
  
}




