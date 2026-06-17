

var LocnSelect = '';


$(document).ready(function () {
   
    LoadDate(0);

    LoadCurDate();

    $('input:not(.atfcs),select:not(.atfcs)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:not(.btn):enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });

    DataLoad();

    TermsLoad(0);
  
    Defaultfocus();
   

    $(".btn-outline-primary").focus(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-outline-primary");
        $('#' + Id).addClass("btn-primary");
    });
    $(".btn-outline-primary").focusout(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-primary");
        $('#' + Id).addClass("btn-outline-primary");
    });

});

function LoadDate(flg) {
    $(function () {     
        $('#StartDate').daterangepicker({
                minDate: minDate,
                maxDate: new Date(new Date().getFullYear() + 20, new Date().getMonth() + 6, new Date().getDate()),
                singleDatePicker: true,
                showDropdowns: true,
                locale: { format: 'DD/MM/YYYY' },
            });          
    });
}

function DataLoad() {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList);
        }
    });
    var data2 = {};
    data2.CategoryId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CategoryGetandGets",
        data: data2,
        success: function (result) {
            CategoryLoad(result.oList);
        }
    });
   
    var data1 = {};
    data1.GrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/GroupGetandGets",
        data: data1,
        success: function (result) {
            GroupLoad(result.oList);
        }
    });

    var data = {};
    data.SbgrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SubGroupGetandGets",
        data: data,
        success: function (result) {
            SubgroupGet(result.oList);
        }
    });
}

function SubgroupGet(result) {
    $("#Modal").empty();
    $("#Modal").append("<option value='0'>-All-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Modal").append("<option value='" + result[i].SbgrpId + "'>" + result[i].SbgrpName + "</option>");
    }
}

function LocationLoad(result) {
    LocnSelect = '';
    $("#Location").empty();
    LocnSelect = "<option value=0>All</option>";
    for (var i = 0; i < result.length; i++) {
            LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }
    $("#Location").append(LocnSelect);   
}

function CategoryLoad(result) {
    $("#VehicleType").empty();
    $("#VehicleType").append("<option value='0'>ALL</option>");
    for (var i = 0; i < result.length; i++) {
        $("#VehicleType").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }   
}

function TermsLoad(flg)
{
    var data = {};
    data.TermsId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TermsGetandGets",
        data: data,
        success: function (result) {
            IntervalLoad(result.oList,flg);
        }
    });
}

function IntervalLoad(result,flg) {
    var ab = ($('#StartDate').val()).split('/')
   
    var TotDays = daysInMonth(ab[1],ab[2]);
    $("#IntervalDays").empty();
    $("#IntervalDays").append("<option value=0 name='" + TotDays + "'>" + TotDays + " Days</option>");
    for (var i = 0; i < result.length; i++) {
        $("#IntervalDays").append("<option value='" + result[i].TermsId + "' name='" + result[i].Terms + "'>" + result[i].TermsDescription + "</option>");
    }
    GetTable(flg);
}


function GroupLoad(result) {
    $("#Make").empty();
    $("#Make").append("<option value='0'>ALL</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Make").append("<option value='" + result[i].GrpId + "'>" + result[i].GrpName + "</option>");
    }  
}

function Defaultfocus() {
    $('#VehicleType').focus();
}

function SearchInTable() {
    var input, filter, table, tr, td, i, txtValue, td1, txtValue1,td2, txtValue2;
    input = document.getElementById("SearchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("TblMain");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        td1 = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];
        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValue1.toUpperCase().indexOf(filter) > -1) || (txtValue2.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

//Manual Focus Input
function Focusinput(Dst, e, Id) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 13 && Id != 'SearchDet' && Id != 'btnnew') {
        e.preventDefault();
        $('#' + Dst).focus().select();
    }
    else if (key == 39) {
        if (Id == 'SearchDet')
        {
            $('#' + Dst).focus();
        }
    }
    else if (key == 37) {
        if (Id == 'btnnew') {
            $('#' + Dst).focus();
        }
    }
}

function formrefresh(flg)
{
    $('.form-control').val('');
    LoadCurDate();
    Defaultfocus();

    $('#Location').val($('#Location option:first').val());
    $('#IntervalDays').val($('#IntervalDays option:first').val());
    $('#Make').val($('#Make option:first').val());
    $('#VehicleType').val($('#VehicleType option:first').val());
    $('#Modal').val($('#Modal option:first').val());
    
    TermsLoad(0);

    ShowDetails(3, 0);
}

function LoadCurDate()
{
    var ab = (CurDate).split('/')
    var crdate = '01' + '/' + (ab[1] < 10 ? '0' : '') + ab[1] + '/' + ab[2];
    $('#StartDate').val(crdate);
}

function GetTable(flg)
{
    $('#customView').html('');
    var Tablestr = ''; var TablestrFooter = ''; var Interval = 1; var slnum = 1;

    if (parseInt($('#IntervalDays option:selected').attr('name')) == 0) { Interval = 1; }
    else { Interval = parseInt($('#IntervalDays option:selected').attr('name')) - 1; }

    var Date1 = ($('#StartDate').val()).split('/');

    var NowDate = Date1[0];   
    var ab = ($('#StartDate').val()).split('/')
    var NowDate = (ab[1] < 10 ? '0' : '') + ab[1] + '/' + (ab[0] < 10 ? '0' : '') + ab[0] + '/' + ab[2];     //Start date
    var newdate = new Date(NowDate);
    
    newdate.setDate(newdate.getDate() + Interval); newdate = new Date(newdate);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();
    
    var ConvEndDate = (mm < 10 ? '0' : '') + mm + '/' + (dd < 10 ? '0' : '') + dd + '/' + y;                 //End date after interval

    var start = new Date(NowDate);
    var end = new Date(ConvEndDate);
    var newend = end.setDate(end.getDate() + 1);
    var end = new Date(newend);

    Tablestr += '<div class="jsgrid-grid-header jsgrid-header-scrollbar tblad" style="width:100%;">' +
                '<table class="" width=100%  onmouseover=ShowDetails(3,0)>' +
                '<tr class="jsgrid-header-row">'+
                '<th class="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style="width:150px;">Vehicle No</th>' +
                '<th class="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style="width:150px;">License No</th>' +
                '<th class="jsgrid-header-cell jsgrid-align-right jsgrid-header-sortable" style="width:300px;">Vehicle</th>';

          while (start < end ) {
              var Day = start.getDate()
              var NowMonth = (start.getMonth() + 1);
              var NowYear = (start.getFullYear()); 
              Day = (parseInt(Day) <= 9 ? '0' : '') + parseInt(Day);
              NowMonth = (parseInt(NowMonth) <= 9 ? '0' : '') + parseInt(NowMonth);

              Tablestr += '<th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable newtd" style="width:100px;" >' + Day + '/' + NowMonth + ' <input type=text style=display:none id=rentdatecar' + slnum + ' value=' + Day + '/' + NowMonth + '/' + NowYear + '  /></th>';

              var newDate = start.setDate(start.getDate() + 1);
              start = new Date(newDate);
              slnum++;
          }
                    
          TablestrFooter = Tablestr;

          Tablestr += '</tr>'+
                      '</table>'+
                      '</div>'+
                      '<div id="" class="jsgrid-grid-header jsgrid-header-scrollbar tblad" style="width:100%; height:455px;overflow-y:scroll;">' +
                      '<table  id="TblMain" width=100% ></table>' +
                       '</div>';

          TablestrFooter +=
       '</tr></table></div>';

    $('#customView').append(Tablestr);
    $('#customView').append(TablestrFooter);  
    if (Interval > 8 && Interval < 15)
    {
        $('.tblad').css('width','150%'); 
    }
    else if (Interval > 15 && Interval < 26) {
        $('.tblad').css('width', '200%');
    }
    else if (Interval > 26) {
        $('.tblad').css('width', '250%');
    }
    VehicleLoad(flg); 
}

function VehicleLoad(flg)
{
    var Condition = '';
    if (($('#Location').val() || 0) != 0)
    { Condition += ' AND AGR.CheckOutLocation= ' + $('#Location').val(); }
    if (($('#Make').val() || 0) != 0)
    { Condition += ' AND CAR.CarMake= ' + $('#Make').val(); }
    if ((($('#VehicleType').val() || 0) != 0))
    { Condition += ' AND Category= ' + $('#VehicleType').val(); }
    if ((($('#Modal').val() || 0) != 0) && (Condition == ''))
    { Condition += ' AND CAR.CarClass= ' + $('#Modal').val(); }
    if ((($('#CarHidId').val() || 0) > 0) && (Condition == ''))
    { Condition += ' AND CAR.CarId= ' + $('#CarHidId').val(); }

    var data = {};    
    data.CarId = 0;
    data.Flag = '';
    data.Status = Condition; 
    data.DelFlag = flg; 
    $.ajax({
        type: "POST",
        url: "../RentCar/CarGetandGetsDailyPlanner",
        data: data,
        success: function (result) {
           ShowCarGet(result,flg) 
        }
    });
}

function ShowCarGet(result,flg)
{
    $('#TblMain tr').remove();
    var responseText = '';
    var newtd=$('.newtd').length/2;

    for (var i = 0; i < result.length; i++) {
      
        var k=parseInt(i+1);
        responseText +=
             '<tr class="jsgrid-header-row" >' +
             '<td class="jsgrid-cell jsgrid-align-right jsgrid-header-sortable" style="width:150px;" onmouseover=ShowDetails(3,0) > ' + result[i].CarCode + ' </td>' +
             '<td class="jsgrid-cell jsgrid-align-right jsgrid-header-sortable" style="width:150px;" onmouseover=ShowDetails(3,0) >' + result[i].LicenseNo + ' </td>' +
             '<td class="jsgrid-cell jsgrid-align-right jsgrid-header-sortable" style="width:300px;" onmouseover=ShowDetails(3,0) >' + result[i].CarDesc + ' </td>';
        var RentStart = result[i].StartDate; var RentEnd = result[i].EndDate;
        for (var j = 1; j <= newtd; j++)
        {
            var Date = $('#rentdatecar' + j).val();

            var momentA = moment(RentStart, "DD/MM/YYYY");

            var momentB = moment(RentEnd, "DD/MM/YYYY");

            var momentC = moment(Date, "DD/MM/YYYY");

            //if (momentA > momentB) return 1;

            //else if (momentA < momentB) return -1;

            //else return 0;


            if ((momentC >= momentA) && (momentC <= momentB))
            {
                responseText += '<td class="jsgrid-cell jsgrid-align-center jsgrid-header-sortable newtd" id=tdcardet' + j + ' style="width:100px;background-color:hotpink" onmousemove="ShowDetails(0,' + k + j + ')"  onmouseover=ShowDetails(3,0) onmouseout="ShowDetails(1,' + k + j + ')">' +
                  '<div style=display:none>' +
                  '<input type=text  value=' + k + j + ' >' +
                  '<input type=text id=PopAgrNo' + k + j + ' value=' + result[i].AgreementNo + ' >' +
                  '<input type=text id=PopCustName' + k + j + ' value=' + result[i].CustName + ' >' +
                  '<input type=text id=PopPhon'  + k + j +  ' value=' + result[i].PhoneNo + ' >' + 
                  '<input type=text id=PopCheckIn' + k + j + ' value=' + result[i].CheckInDate + ' >' +
                  '</div></td>';
            }
            else
            {
                responseText +=
                  '<td id=carav' + k + j + ' class="jsgrid-cell jsgrid-align-center jsgrid-header-sortable notbookd newtd" style="width:100px;" onmousedown="WhichButton(event,2,' + k + j + ')" onclick=ShowDetails(3,' + i + ')  oncontextmenu="return false">' +   //ondblclick=$(this).addClass("tdhov"),ShowDetails(2,' + k + j + ')
                  '<div style=display:none>' +
                  '<input type=text id=CarNo' + k + j + ' value=' + result[i].CarId + ' >' +
                  '<input type=text id=CarCod' + k + j + ' value="' + result[i].CarCode + '"  >' +
                  '<input type=text id=CarDt' + k + j + ' value="' + Date + '"  >' + 
                  '</div></td>';
            }
        }
        responseText += '</tr>';
    }
    $('#TblMain').append(responseText);
    if(flg==1)
    {
        $('#VehicleType').focus();
    }
}

function WhichButton(event,type,Id)
{
    if(event.button==2)  //Right Click
    {
        ShowDetails(3, 0);
        $('#carav' + Id).addClass("tdhov");
        ShowDetails(type, Id);
    }
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}



$(function () {
    $(document).on('mousemove', function (e) {
        
        $('#divContainer').css('top', e.pageY);
        $('#divContainer').css('left', e.pageX);
    });

    $(document).on('click', function (e) {
        ShowDetails(3, 0);
    });  
    $("#customView").dblclick(function (e) {      
            var o = {
                left: e.pageX,
                top: e.pageY
            };
            $("#divContainerNew").offset(o);              
    });
    $("#customView").on('touchstart mousedown', function (e) {      

        if (e.button==2) {
            var o = {
                left: e.pageX,
                top: e.pageY
            };
            $("#divContainerNew").offset(o);
        }
    });
});

function ShowDetails(flg, Id) {
   
    if (flg == 0) {      
        $('.ppfld').text('');
        $('#PopAgrNo0').text($('#PopAgrNo' + Id).val());
        $('#PopCustName0').text($('#PopCustName' + Id).val());
        $('#PopPhon0').text($('#PopPhon' + Id).val());
        $('#PopCheckIn0').text($('#PopCheckIn' + Id).val());
        $('#divContainerNew').hide();
        $('#divContainer').show();
    }
    else if (flg == 1) {
        $('#divContainer').hide();
    }
    else if (flg == 2) {
        $('#CarNum0,#CarCode0,#CarDate').val('');
        $('#CarNum0').val($('#CarNo' + Id).val());
        $('#CarCode0').val($('#CarCod' + Id).val());
        $('#CarDate').val($('#CarDt' + Id).val());
        $('#divContainerNew').show(); 
    }
    else if (flg == 3) {
        $('#CarNum0,#CarCode0,#CarDate').val('');
        $('#divContainerNew').hide();
        $('.notbookd').removeClass("tdhov");
    }
}

