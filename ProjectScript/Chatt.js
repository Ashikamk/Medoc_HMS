
GetUsersforchat();
function GetUsersforchat() {
    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UsersGetandGetschat",
        data: data,
        success: function (result) {
            ShowUserslistforchat(result.oList);
        }
    });
}

function CreatethisGroup() {
    var GroupName = $('#newgroupname').val();
    var oArray = new Array();
    oArray.push({ 'UserId': ERPUserId, 'GroupName': GroupName, 'DelFlag': 0, })

    for (var i = 0; i <= Userlengh; i++) {
        var UserID = $('#eumiuid' + i).val();
        if ($('#chkuser' + UserID).is(":checked")) {
            oArray.push({ 'UserId': UserID, 'GroupName': GroupName, 'DelFlag': 0, })
        }
    }

    var data = { 'AreaMaster': oArray };
    if (oArray.length > 1) {

        $.ajax(
{
    type: "POST",
    url: "../master/CharGroupCreation",
    data: data,
    success: function (result) {
        alert('Group Created');
        $('#newgroupname').val('');
        showchatusers();
        for (var i = 0; i <= Userlengh; i++) {
            var UserID = $('#eumiuid' + i).val();
            document.getElementById("chkuser" + UserID).checked = false;
        }

    }
});
    }
    else {
        alert('Please select Group Members')
    }


}


function CreateChatGroup() {
    $('#msguse').text('Create Group');
    var Data = '<div style="border-bottom: 2px solid orange;height:40px" class="media mb-1 mediadiv"">&#160;&#160;<input style=margin-top:2px; placeholder="Enter Group Name" type=text id=newgroupname >&#160;<input type=button value=Create  style=margin-top:2px; id=creategroup onclick="CreatethisGroup()"></div>'
    $('#userlistchat').hide();
    $('#GrouUsers').append(Data + GroupUsers + '</br>');
    $('#GrouUsers').show();
}



var GroupUsers = ""; var Userlengh = 0;
function ShowUserslistforchat(result) {
    var Data = ''; GroupUsers = '';
    Data = '<div style="border-bottom: 1px solid #f5f5f0;height:40px" class="media mb-1 mediadiv"  onclick="CreateChatGroup()">&#160;<a><img alt="96x96" class="rounded-circle width-25-per" src="../app-assets/img/portrait/small/avatar-s-12.png"></a><div style="margin-top:10px;margin-left:-60px;font: 15px arial, sans-serif;font-weight: bold;"  class="media-body">NEW GROUP</div> <span  style="text-align:center;color:white;border:1px solid orange;font-weight:bold;height: 25px;  width: 25px;  background-color:orange;border-radius: 50%; display:none;">5</span>&#160;&#160;&#160;  </div>'
    Userlengh = result.length;
    for (var i = 0; i < result.length; i++) {
        if (result[i].UserRole == 'User') {
            if (result[i].UserId != ERPUserId)
                Data += '<div style="border-bottom: 1px solid #f5f5f0;height:40px" class="media mb-1 mediadiv"  onclick="chatthisuser(' + result[i].UserId + ')">&#160;<a><img alt="96x96" class="rounded-circle width-25-per" src="../app-assets/img/portrait/small/avatar-s-12.png"></a><div style="margin-top:10px;margin-left:-60px;font: 15px arial, sans-serif;font-weight: bold;" id="chatuser' + result[i].UserId + '" class="media-body">' + result[i].Name + '</div> <span id="ddnoti' + result[i].UserId + '" style="text-align:center;color:white;border:1px solid green;font-weight:bold;height: 20px;  width: 20px;margin-top:10px;  background-color:green;border-radius: 50%; display:none;"></span>&#160;&#160;&#160;  </div>'
            GroupUsers += '<div style="border-bottom: 1px solid #f5f5f0;height:40px" class="media mb-1 mediadiv"><input style=display:none  type=text id=eumiuid' + i + '  value=' + result[i].UserId + ' > &#160;<a><img alt="96x96" class="rounded-circle width-25-per" src="../app-assets/img/portrait/small/avatar-s-12.png"></a><div style="margin-top:10px;margin-left:-60px;font: 15px arial, sans-serif;font-weight: bold;" id="chatuser' + result[i].UserId + '" class="media-body">' + result[i].Name + '</div> <span id="ddnoti' + result[i].UserId + '" style="height: 25px;margin-top:10px;  width: 25px;"><input type="checkbox"  id="chkuser' + result[i].UserId + '" style="zoom:2"></span>&#160;&#160;&#160;  </div>'
        }
        else {
            Data += '<div style="border-bottom: 1px solid #f5f5f0;height:40px" class="media mb-1 mediadiv"  onclick="chatthisusergroup(' + result[i].UserId + ')">&#160;<a><img alt="96x96" class="rounded-circle width-25-per" src="../app-assets/img/portrait/small/avatar-s-12.png"></a><div style="margin-top:10px;margin-left:-60px;font: 15px arial, sans-serif;font-weight: bold;" id="chatusergrp' + result[i].UserId + '" class="media-body">' + result[i].Name + '</div> <span id="ddnoti' + result[i].UserId + '" style="text-align:center;color:white;border:1px solid green;font-weight:bold;height: 20px;  width: 20px;margin-top:10px;  background-color:green;border-radius: 50%; display:none;"></span>&#160;&#160;&#160;  </div>'
        }
    }

    $('#userlistchat').html('')
    $('#userlistchat').show();
    $('#GrouUsers').hide();
    $('#userlistchat').append(Data + '</br>')
}

var Chattype = 0;

function chatthisusergroup(GID) {
    Chattype = 1;
    $('#ReceiverId').val(GID);
    var UserName = $('#chatusergrp' + GID).text();
    $('#msguse').text(UserName);
    $('#chatuserlist').hide();
    $('#chatwindow').show();
    $('#chat-input').focus();
    $('#chat-logs').html('');
    Getmessage('GroupAll')

}


function chatthisuser(UID) {
    Chattype = 0;
    $('#ReceiverId').val(UID);
    var UserName = $('#chatuser' + UID).text();
    $('#msguse').text(UserName);
    $('#chatuserlist').hide();
    $('#chatwindow').show();
    $('#chat-input').focus();
    $('#chat-logs').html('');
    Getmessage('All')
}

function showchatusers() {
    GetUsersforchat();
    $('#chatuserlist').show();
    $('#chatwindow').hide();
    $('#msguse').text('Users')
}


var Count = 0; var ReceiverId = 0; var Alertno = 0
function Getmessage(Flag) {
    if (Flag == 'All' || Flag == 'GroupAll') {
        $('.chat-logs').html('')
    }
    if (Count == 0) {
        Count = 1
        var data = {};
        data.SenderId = ERPUserId;
        data.ReceiverId = $('#ReceiverId').val();
        data.Viewflag = 0;
        data.DelFlag = 0;
        data.Status = Flag;
        $.ajax({
            type: "POST",
            url: "../Home/Ex_ChatGet",
            data: data,
            success: function (result) {
                result = result.oList;
                var Msgcount = 0;
                for (var i = 0; i < result.length; i++) {
                    $('#ddnoti' + result[i].SenderId).hide();
                    if (result[i].DelFlag == 100) {
                        Msgcount += parseInt(result[i].ChatMessage || 0);
                        $('#ddnoti' + result[i].SenderId).show();
                        $('#ddnoti' + result[i].SenderId).text(result[i].ChatMessage);

                    }

                    else {
                        var Sender = result[i].SenderId
                        if (ERPUserId != Sender) {
                            generate_message(result[i].ChatMessage, 'user')
                        }
                        else {
                            generate_message(result[i].ChatMessage, 'self')
                        }

                    }
                }
                Count = 0

                if (Msgcount != 0) {
                    $('#msgnotifiction').show();
                    $('#msgnotifiction').text(Msgcount);
                    var div = $("#msgnotifiction");
                    div.animate({ opacity: '0.5' }, "slow");
                    div.animate({ opacity: '1' }, "slow");

                    if (Msgcount != Alertno) {
                        var audio = new Audio('/app-assets/css/beep-01a.mp3');
                        audio.play();
                        Alertno = Msgcount;
                    }
                }
                else {
                    $('#msgnotifiction').hide();
                }

            }
        });
    }

}


var INDEX = 0;
function generate_message(msg, type) {

    INDEX++;
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + "\">";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX).hide().fadeIn(300);

    if (type == 'self') {
        $("#chat-input").val('');
    }
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
}



function sendmessage() {

    if (parseInt($('#ReceiverId').val() || 0) == 0) {
        alert('Please try again..')

    }
    else {
        var data = {};
        data.Ex_ChatId = Chattype;
        data.SenderId = ERPUserId;
        data.ReceiverId = $('#ReceiverId').val();
        data.ChatMessage = $('#chat-input').val();
        data.Date = CurDate;
        data.DelFlag = 1;

        $.ajax({
            type: "POST",
            url: "../Home/Ex_ChatInsert",
            data: data,
            success: function (result) {

            }
        });
    }

}

function getOnlineUsers() {
    var data = {};
    data.Date = CurDate;
    $.ajax({
        type: "POST",
        url: "../Home/getOnlineUsers",
        data: data,
        success: function (result) {
            ShowOnlineUsers(result.oList)

        }
    });
}

function ShowOnlineUsers(result) {
    for (var i = 0; i < result.length; i++) {
        var UserID = result[i].UserId;
        var Status = result[i].Status;

        if (Status == 'Offline') {
            $('#ddnoti' + UserID).fadeOut()
        }
        else {
            $('#ddnoti' + UserID).fadeIn()
            $('#ddnoti' + UserID).text('')
        }
    }
}

//setInterval(function () {
//    getOnlineUsers()
//}, 10000);