
$(document).ready(function () {
    Defaultfocus();
    $("#btnprint").click(function (e) {
        PrintIPStatement();
    });
    
});//Document Close


Defaultfocus();
function Defaultfocus() {
    $("#RegNo").focus()
}
function GetPatient(Id) {
    var data = {};                                       //dropdownbind
    data.PatientId = Id;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_PatientSearchGet",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                GetPatientData(result.oList, 1);
            }
        }
    });
}

function GetPatientData(result, Flag) {

    if (result.length > 0) {

        var age = AgeCalculation(result[0].DOB);

        var CurrentAge = '';
        if (age.years < 10) {
            if (age.years > 1) yearString = " Years";
            else yearString = " Year";
            if (age.months > 1) monthString = " Months";
            else monthString = " Month";
            if (age.days > 1) dayString = " Days";
            else dayString = " Day";

            if (age.years > 0) { CurrentAge = CurrentAge + age.years + yearString; } if (CurrentAge != '' && (age.months > 0 || age.days > 0)) { CurrentAge = CurrentAge + ', ' }
            if (age.months > 0) { CurrentAge = CurrentAge + age.months + monthString; } if (CurrentAge != '' && age.months > 0 && age.days > 0) { CurrentAge = CurrentAge + ', ' }
            if (age.days > 0) { CurrentAge = CurrentAge + age.days + dayString; }

        }
        else {
            CurrentAge = age.years + ' Years';
        }
        $("#PatAge").text(', ' + CurrentAge);
        $("#PatGender").text(result[0].Gender);
        $("#PatDOB").text(result[0].DOB);
        $("#PatBloodGrp").text(', ' + result[0].BloodGroup);
        $("#PatOccuPation").text(result[0].Occupation);
        $("#PatLastVisit").text(result[0].LastVisit);
        $("#PatDOR").text(result[0].RegDate);
        $("#PatHealthCard").text(result[0].HealthCard);
        $("#PatAadhar").text(result[0].AadharNo);
        $("#PatAdd1").text(result[0].Add1);
        $("#PatAdd2").text(result[0].Add2);
        $("#PatAdd3").text(', ' + result[0].Add3);
        $("#PatNumber").text(result[0].Contact);



        var Ext = (result[0].Status).split('.').pop();
        CheckImgValid('myImg', result[0].PatientId, Ext);
    }
}

function CheckImgValid(Id, RegId, Ext) {
    var d = new Date();
    $.ajax({
        url: "../ProjectImages/PatientImage/" + RegId + "." + Ext + "",
        type: 'HEAD',
        error: function () {
            $('#' + Id).attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
        },
        success: function () {
            $('#' + Id).attr('src', "../ProjectImages/PatientImage/" + RegId + "." + Ext + "?" + d.getSeconds());
        }
    });
}

function GetIPDetails(IPNo, IPYear) {
    $('#LoadingSmall').show();
    var data = {};
    data.IPNumber = IPNo;
    data.IPYear = IPYear;
    data.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IPStatement",
        data: data,
        success: function (result) {
            LoadIPStatement(result)
        }
    });
}


var Ipbilldetailsview = ""; var RW = 0; var R1no = 1;
var Rno = 1; var PRno = 1; var LabTotal = 0; var Pharmatotal = 0; var procTotal = 0;
function LoadIPStatement(result) {

    //console.log(result)
    procTotal = 0;  Pharmatotal=0
    debugger;
    $('#tbl_IPGrid tr').remove();
    $('#tbl_IPGriddetails tr').remove();


    
    $('#tbl_IPGriddetailstest tr').remove();
    $('#tbl_IPGriddetailsmedicine tr').remove();
    $('#customViewproc tr').remove();


    $('#tbl_IPGriddetailsmedicine').append('< tr class="jsgrid - row Billtr TotalBill"  ><td class="jsgrid-cell p-1 GridBRow"  style="width:30px">SL#</td><td class="jsgrid-cell p-1 GridBRow"  style="width:50px;">Date</td><td class="jsgrid-cell p-1 GridBRow"  style="width:45px;">BillNo</td><td class="jsgrid-cell p-1 GridBRow"  style="width:200px;">Medicine Name</td> <td class="jsgrid-cell p-1 GridBRow"  style="width:45px;">Batch</td> <td class="jsgrid-cell p-1 GridBRow"  style="width:45px;">Exp</td><td class="jsgrid-cell p-1 GridBRow"  style="width:45px;">Qty</td><td class="jsgrid-cell p-1 GridBRow"  style="width:45px;">Rate</td><td class="jsgrid-cell p-1 GridBRow"  style="width:45px;">Amount</td></tr >');

    $("#GridLength").val(0);
    var Snnn0 = 1;
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);

        var CashType = '';
        if (result[i].Status == '1') CashType = '<span class="badge badge-danger">Cash</span>';
        else if (result[i].Status == '2') CashType = '<span class="badge badge-success">Credit</span>';

        var BillNo = '';
        if (result[i].BillYear != 0) BillNo = result[i].BillYear;
        if (result[i].BillNo != 0) BillNo = BillNo + '/' + result[i].BillNo;

        ProdEditRow = ''; Ipbilldetailsview = ''; Prodlabdetails = ''; Prodmeddetails = '';
        var id = slno;
        
        //debugger;
        if (result[i].Flag == 5) {

            if (result[i].Department == 'TOTAL') {
                var Ipbilldetailsview = "<tr class='jsgrid-row Billtr TotalBill' id='Brow_" + Snnn0 + "'>" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >"+
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='bd" + Snnn0 + "'  style= 'width:50px;' >" + result[i].Date +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='pr" + Snnn0 + "' style= 'width:245px;' >" + result[i].Department +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='qt" + Snnn0 + "'  style= 'width:45px;' align=center ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='rt" + Snnn0 + "'  style= 'width:45px;' align=right >" + parseFloat(result[i].Amount || 0).toFixed(Decimal) +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='at" + Snnn0 + "'  style= 'width:45px;' align=right >" + parseFloat(result[i].Rate || 0).toFixed(Decimal) +
                    "</td>" +
                    "</tr>";

            }
            else {
                var Ipbilldetailsview = "<tr class='jsgrid-row' id='Brow_" + id + "'>" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1'  style= 'width:30px;text-align:center' >" + Snnn0 +
                    "</td>" +
                    "<td class='jsgrid-cell p-1' id='bd" + Snnn0 + "'  style= 'width:50px;' >" + result[i].Date +
                    "</td>" +
                    "<td class='jsgrid-cell p-1' id='pr" + Snnn0 + "' style= 'width:245px;' >" + result[i].Department +
                    "</td>" +
                    "<td class='jsgrid-cell p-1' id='qt" + Snnn0 + "'  style= 'width:45px;' align=center >" + result[i].Days+"</td>" +
                    "<td class='jsgrid-cell p-1' id='rt" + Snnn0 + "'  style= 'width:45px;' align=right >" + parseFloat(result[i].Amount || 0).toFixed(Decimal) +
                    "</td>" +
                    "<td class='jsgrid-cell p-1' id='at" + Snnn0 + "'  style= 'width:45px;' align=right >" + parseFloat(result[i].Rate || 0).toFixed(Decimal) +
                    "</td>" +
                    "</tr>";


                Snnn0 = Snnn0 + 1;
                RW = Snnn0;
            }
        }


        else if (result[i].Flag == 7) {
            var spstring = (result[i].Department).split('##')
            var Prodlabdetails = "<tr class='jsgrid-row' id='Brow_" + Rno + "'>" +
                "<td id='Ltd_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + Rno + "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow' id='LBillDate_" + Rno + "'  style= 'width:50px;' >" + spstring[1]+ "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow' id='LBillNo_" + Rno + "' style= 'width:45px;' >" + spstring[0] +   "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow' id='Ltest" + Rno + "'  style= 'width:245px;'>" + spstring[3]+"</td>" +
                "<td class='jsgrid-cell p-1 GridBRow' id='Lrate" + Rno + "'  style= 'width:45px;' align=right >" + spstring[5]+ "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow' id='LAmount" + Rno + "'  style= 'width:45px;' align=right >" + spstring[6] + "</td></tr>";
            LabTotal = LabTotal + parseFloat(spstring[6]||0)
            Rno = Rno + 1;
        }

        else if (result[i].Flag == 8) {
            var spstring = (result[i].Department).split('##')

            if (result[i].Department == 'TOTAL') {

                var Prodprocdetails = "<tr class='jsgrid-row Billtr TotalBill' id='Brow_" + R1no + "'>" +
                    "<td id='L1td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1BillDate_" + R1no + "'  style= 'width:50px;' ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1BillNo_" + R1no + "' style= 'width:45px;' ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1test" + R1no + "'  style= 'width:245px;'>TOTAL</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1QTYY" + R1no + "'  style= 'width:45px;' align=right ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1rate" + R1no + "'  style= 'width:45px;' align=right ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1Amount" + R1no + "'  style= 'width:45px;' align=right >" + parseFloat( result[i].Amount).toFixed(2) + "</td></tr>";


            }
            else {


                var Prodprocdetails = "<tr class='jsgrid-row' id='Brow_" + R1no + "'>" +
                    "<td id='L1td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + R1no + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1BillDate_" + R1no + "'  style= 'width:50px;' >" + spstring[1] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1BillNo_" + R1no + "' style= 'width:45px;' >" + spstring[0] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1test" + R1no + "'  style= 'width:245px;'>" + spstring[3] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1QTYY" + R1no + "'  style= 'width:45px;' align=center >" + spstring[4] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1rate" + R1no + "'  style= 'width:45px;' align=right >" + spstring[5] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='L1Amount" + R1no + "'  style= 'width:45px;' align=right >" + spstring[6] + "</td></tr>";
                procTotal = procTotal + parseFloat(spstring[6] || 0)
                
            }
            R1no = R1no + 1;
        }

        else if (result[i].Flag == 6) {

            if (result[i].Department == 'TOTAL') {

                var Prodmeddetails = "<tr class='jsgrid-row Billtr TotalBill' id='Brow_" + Rno + "'>" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + PRno + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PBillDate_" + PRno + "'  style= 'width:50px;' ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PBillNo_" + PRno + "' style= 'width:45px;' ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='Pmedicine" + PRno + "'  style= 'width:200px;' >BILL TOTAL</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PBatch" + PRno + "'  style= 'width:45px;'  ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PExp" + PRno + "'  style= 'width:45px;' ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PLrate" + PRno + "'  style= 'width:45px;' align=right ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PQty" + PRno + "'  style= 'width:45px;' align=right ></td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PAmount" + PRno + "'  style= 'width:45px;' align=right >" + result[i].Amount + "</td></tr>";


            }
            else {
                var spstringmedcine = (result[i].Department).split('##')
                var Prodmeddetails = "<tr class='jsgrid-row' id='Brow_" + Rno + "'>" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + PRno + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PBillDate_" + PRno + "'  style= 'width:48px;' >" + spstringmedcine[1] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PBillNo_" + PRno + "' style= 'width:45px;' >" + spstringmedcine[0] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='Pmedicine" + PRno + "'  style= 'width:194px;' >" + spstringmedcine[3] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PBatch" + PRno + "'  style= 'width:44px;'  >" + spstringmedcine[7] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PExp" + PRno + "'  style= 'width:44px;' >" + spstringmedcine[8] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PQty" + PRno + "'  style= 'width:45px;' align=right >" + spstringmedcine[4] + "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='PLrate" + PRno + "'  style= 'width:45px;' align=right >" + spstringmedcine[5] + "</td>" +
                 
                    "<td class='jsgrid-cell p-1 GridBRow' id='PAmount" + PRno + "'  style= 'width:45px;' align=right >" + spstringmedcine[6] + "</td></tr>";
                Pharmatotal = Pharmatotal + parseFloat(spstringmedcine[6] || 0)
            }
            PRno = PRno + 1;
        }



        else if (result[i].Flag == 4) {
            var ProdEditRow = "<tr class='jsgrid-row Billtr TotalBill' id='Brow_" + id + "'>" +
          "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + id +
          "<input type='hidden' id='Type_" + id + "' value='2' />" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='BillDate_" + id + "'  style= 'width:50px;' >" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='BillNo_" + id + "' style= 'width:15%;' >" + result[i].Department +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='CashType_" + id + "'  style= 'width:50px;' align=center>" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='AmountCTr_" + id + "'  style= 'width:90px;' align=right >" +
          "<input type='text' id='AmountC_" + id + "' class='form-control GridTextBoxTotalBill' disabled value='' />" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='AmountTr_" + id + "'  style= 'width:90px;' align=right >" +
           "<input type='text' id='Amount_" + id + "' class='form-control GridTextBoxTotalBill' disabled value='" + parseFloat(result[i].Amount || 0).toFixed(Decimal) + "' />" +
          "</td>" +
          
          
          "</tr>";
        }
        else if (result[i].Flag == 3) {
            if (parseFloat(result[i].Amount || 0) > 0) {
                var ProdEditRow = "<tr class='jsgrid-row Billtr Total' id='Brow_" + id + "'>" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + id +
                    "<input type='hidden' id='Type_" + id + "' value='1' />" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='BillDate_" + id + "'  style= 'width:50px;' >" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='BillNo_" + id + "' style= 'width:15%;' >" + result[i].Department +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='CashType_" + id + "'  style= 'width:50px;' align=center>" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='AmountCTr_" + id + "'  style= 'width:90px;' align=right >" +
                    "<input type='text' id='AmountC_" + id + "' class='form-control GridTextBoxTotal' disabled value='' />" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='AmountTr_" + id + "'  style= 'width:90px;' align=right >" +
                    "<input type='text' id='Amount_" + id + "' class='form-control GridTextBoxTotal' disabled value='" + parseFloat(result[i].Amount || 0).toFixed(Decimal) + "' />" +
                    "</td>" +
                    "</tr>";
            }
            else {
                var ProdEditRow = "<tr class='jsgrid-row Billtr Total' id='Brow_" + id + "'>" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + id +
                    "<input type='hidden' id='Type_" + id + "' value='1' />" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='BillDate_" + id + "'  style= 'width:50px;' >" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='BillNo_" + id + "' style= 'width:15%;' >" + result[i].Department +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='CashType_" + id + "'  style= 'width:50px;' align=center>" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='AmountCTr_" + id + "'  style= 'width:90px;' align=right >" +
                    "<input type='text' id='AmountC_" + id + "' class='form-control GridTextBoxTotal' disabled value='" + parseFloat(-1*result[i].Amount || 0).toFixed(Decimal) + "' />" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='AmountTr_" + id + "'  style= 'width:90px;' align=right >" +
                    "<input type='text' id='Amount_" + id + "' class='form-control GridTextBoxTotal' disabled  />" +
                    "</td>" +
                    "</tr>";

            }
        }
        else if (result[i].Flag == 1) {
            var ProdEditRow = "<tr class='jsgrid-row Billtr Header' id='Brow_" + id + "'>" +
          "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + id +
          "<input type='hidden' id='Type_" + id + "' value='4' />" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='BillDate_" + id + "'  style= 'width:50px;' >" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='BillNo_" + id + "' style= 'width:15%;' >" + result[i].Department +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='CashType_" + id + "'  style= 'width:50px;' align=center>" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='AmountTr_" + id + "'  style= 'width:90px;' align=right >" +
          "</td>" +
         "<td class='jsgrid-cell p-1 GridBRow' id='AmountCTr_" + id + "'  style= 'width:90px;' align=right >" +
          "</td>" +
          "</tr>";
        }

        else {
            if (parseFloat(result[i].Amount || 0) > 0) { //OTHER BILLS TOP
                var ProdEditRow = "<tr class='jsgrid-row Billtr' id='Brow_" + id + "'>" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + id +
                    "<input type='hidden' id='Type_" + id + "' value='0' />" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='BillDate_" + id + "'  style= 'width:50px;' >" + result[i].Date +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='BillNo_" + id + "' style= 'width:15%;' >" + BillNo +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='CashType_" + id + "'  style= 'width:50px;' align=center>" + CashType +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='AmountCTr_" + id + "'  style= 'width:90px;' align=right >" +
                    "<input type='text' id='AmountC_" + id + "' class='form-control GridTextBox' onkeypress='isNumber(event,this)' onkeyup='CalcAmount(" + id + ")' value='' />" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='AmountTr_" + id + "'  style= 'width:90px;' align=right >" +
                    "<input type='text' id='Amount_" + id + "' class='form-control GridTextBox' onkeypress='isNumber(event,this)' onkeyup='CalcAmount(" + id + ")' value='" + parseFloat(result[i].Amount || 0).toFixed(Decimal) + "' />" +
                    "</td>" +
                    "</tr>";
            }
            else {
                //ADVANCE AMOUNT LINE
                var ProdEditRow = "<tr class='jsgrid-row Billtr' id='Brow_" + id + "'>" +
                    "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + id +
                    "<input type='hidden' id='Type_" + id + "' value='0' />" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='BillDate_" + id + "'  style= 'width:50px;' >" + result[i].Date +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='BillNo_" + id + "' style= 'width:15%;' >" + BillNo +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='CashType_" + id + "'  style= 'width:50px;' align=center>" + CashType +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='AmountCTr_" + id + "'  style= 'width:90px;' align=right >" +
                    "<input type='text' id='AmountC_" + id + "' class='form-control GridTextBox' onkeypress='isNumber(event,this)' onkeyup='CalcAmount(" + id + ")' value='" + parseFloat(-1*result[i].Amount || 0).toFixed(Decimal) + "' />" +
                    "</td>" +
                    "<td class='jsgrid-cell p-1 GridBRow' id='AmountTr_" + id + "'  style= 'width:90px;' align=right >" +
                    "<input type='text' id='Amount_" + id + "' class='form-control GridTextBox' onkeypress='isNumber(event,this)' onkeyup='CalcAmount(" + id + ")'  />" +
                    "</td>" +
                    "</tr>";

            }
        }


       
        $('#tbl_IPGrid').append(ProdEditRow);
        $('#tbl_IPGriddetails').append(Ipbilldetailsview);
        $('#tbl_IPGriddetailstest').append(Prodlabdetails);
        $('#tbl_IPGriddetailsmedicine').append(Prodmeddetails);
        $('#customViewproc').append(Prodprocdetails);

        $('#LoadingSmall').hide();
        
    }

    var Prodlabdetails = "<tr class='jsgrid-row Billtr Header' id='Brow_" + Rno + "'>" +
        "<td id='Ltd_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='LBillDate_" + Rno + "'  style= 'width:50px;' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='LBillNo_" + Rno + "' style= 'width:45px;' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Ltest" + Rno + "'  style= 'width:245px;' align=center>LAB TOTAL</td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Lrate" + Rno + "'  style= 'width:45px;' align=right ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='LAmount" + Rno + "'  style= 'width:45px;' align=right >" + (LabTotal).toFixed(2) + "</td></tr>";
    $('#tbl_IPGriddetailstest').append(Prodlabdetails);


    var Prodprocdetails = "<tr class='jsgrid-row Billtr Header' id='Brow_" + Rno + "'>" +
        "<td id='Ltd_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='LBillDate_" + Rno + "'  style= 'width:50px;' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='LBillNo_" + Rno + "' style= 'width:45px;' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Ltest" + Rno + "'  style= 'width:245px;' align=center>GENERAL/PROCEDURE TOTAL</td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='LQTYY" + Rno + "'  style= 'width:45px;' align=right ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Lrate" + Rno + "'  style= 'width:45px;' align=right ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='LAmount" + Rno + "'  style= 'width:45px;' align=right >" + (procTotal).toFixed(2) + "</td></tr>";
    $('#customViewproc').append(Prodprocdetails);

    var Prodmeddetails = "<tr class='jsgrid-row Billtr Header' id='Brow_" + Rno + "'>" +
        "<td id='Ltd_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='PBillDate_" + Rno + "'  style= 'width:50px;' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='PBillNo_" + Rno + "' style= 'width:45px;' ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Ptest" + Rno + "'  style= 'width:245px;' align=center>PHARMA TOTAL</td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Prate" + Rno + "'  style= 'width:45px;' align=right ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Prate" + Rno + "'  style= 'width:45px;' align=right ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Prate" + Rno + "'  style= 'width:45px;' align=right ></td>" +
        "<td class='jsgrid-cell p-1 GridBRow' id='Prate" + Rno + "'  style= 'width:45px;' align=right ></td>" +

        
        "<td class='jsgrid-cell p-1 GridBRow' id='PAmount" + Rno + "'  style= 'width:45px;' align=right >" + (Pharmatotal).toFixed(2) + "</td></tr>";
    
    $('#tbl_IPGriddetailsmedicine').append(Prodmeddetails);


    


    $("#GridLength").val(id);
    //$('#proddiv').animate({ scrollTop: 5000 }, 900);
}


function GetIPDetailsRoom(IPNo, IPYear) {
    var data = {};
    data.IPNumber = IPNo;
    data.IPYear = IPYear;
    data.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IPStatementRoom",
        data: data,
        success: function (result) {
            LoadIPStatementRoom(result.oList)
        }
    });
}

function LoadIPStatementRoom(result) {
    $('#tbl_IPGrid_Room tr').remove();
    $("#GridLengthRoom").val(0);

    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);



        var id = slno;

        if (result[i].Flag == 1) {
            var ProdEditRow = "<tr class='jsgrid-row Billtr TotalBill' id='RBrow_" + id + "'>" +
          "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + id +
          "<input type='hidden' id='RType_" + id + "' value='"+result[i].Flag+"' />" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='Room_" + id + "'  style= 'width:15%;' >" + result[i].Date +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='RentTR_" + id + "' style= 'width:100px;' >" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='FromDate_" + id + "'  style= 'width:100px;' align=center>" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='ToDate_" + id + "'  style= 'width:100px;' align=right >" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='Days_" + id + "'  style= 'width:100px;' align=right >" +
          "</td>" +
          "<td class='jsgrid-cell p-1 GridBRow' id='AmountTr_" + id + "'  style= 'width:100px;' align=right >" +
          "<input type='text' id='TotalRent__" + id + "' class='form-control GridTextBoxTotalBill' disabled value='" + parseFloat(result[i].Amount || 0).toFixed(Decimal) + "' />" +
          "</td>" +
          
          "</tr>";
        }

        else {

            var ProdEditRow = "<tr class='jsgrid-row Billtr' id='Brow_" + id + "'>" +
           "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:30px;text-align:center' >" + id +
           "<input type='hidden' id='RType_" + id + "' value='"+result[i].Flag+"' />" +
           "</td>" +
           "<td class='jsgrid-cell p-1 GridBRow' id='Room_" + id + "'  style= 'width:15%;' >" + result[i].Remarks +
           "</td>" +
           "<td class='jsgrid-cell p-1 GridBRow' id='RentTR_" + id + "' style= 'width:100px;' >"  +
           "<input type='text' id='Rent_" + id + "' class='form-control GridTextBox' disabled value='" + parseFloat(result[i].Rate || 0).toFixed(Decimal) + "' />" +

           "</td>" +
           "<td class='jsgrid-cell p-1 GridBRow' id='FromDate_" + id + "'  style= 'width:100px;' align=center>" +result[i].Date+
           "</td>" +
           "<td class='jsgrid-cell p-1 GridBRow' id='ToDate_" + id + "'  style= 'width:100px;' align=right >" +result[i].Status+
           "</td>" +
            "<td class='jsgrid-cell p-1 GridBRow' id='Days_" + id + "'  style= 'width:100px;' align=right >" + result[i].Days + ' Days, ' + result[i].RegSerId + 'Hours'+
          "</td>" +
           "<td class='jsgrid-cell p-1 GridBRow' id='AmountTr_" + id + "'  style= 'width:100px;' align=right >" +
           "<input type='text' id='TotalRent__" + id + "' class='form-control GridTextBox' onkeypress='isNumber(event,this)' onkeyup='CalcAmountRent(" + id + ")' value='" + parseFloat(result[i].Amount || 0).toFixed(Decimal) + "' />" +

           "</td>" +
           "</tr>";
        }
        $('#tbl_IPGrid_Room').append(ProdEditRow);


    }
    $("#GridLengthRoom").val(id);
    $('#proddiv_1').animate({ scrollTop: 5000 }, 900);
}

function CalcAmount(Id) {
    var Max = $("#GridLength").val();

    var Amount = 0; TotalAmount = 0; BillTotal = 0;

    for (var i = 1; i <= Max; i++) {

        if ($("#Type_" + i).val() == 0) { //Amount

            Amount = parseFloat($("#Amount_" + i).val() || 0).toFixed(Decimal);
            TotalAmount = Number(TotalAmount) + Number(Amount);
            BillTotal = Number(BillTotal) + Number(Amount);

            //console.log(Amount, TotalAmount, BillTotal)
        }
        else if ($("#Type_" + i).val() == 1) { //Total

            $("#Amount_" + i).val(parseFloat(TotalAmount || 0).toFixed(Decimal))
            TotalAmount = 0;
        }
        else if ($("#Type_" + i).val() == 2) { //BillTotal

            $("#Amount_" + i).val(parseFloat(BillTotal || 0).toFixed(Decimal))
            BillTotal = 0;
        }
    }
}
function CalcAmountRent(Id) {
    var Max = $("#GridLengthRoom").val();

    var Amount = 0; TotalAmount = 0; BillTotal = 0;

    for (var i = 1; i <= Max; i++) {

        if ($("#RType_" + i).val() == 0) { //Amount

            Amount = parseFloat($("#TotalRent__" + i).val() || 0).toFixed(Decimal);
            TotalAmount = Number(TotalAmount) + Number(Amount);

            //console.log(Amount, TotalAmount, BillTotal)
        }
        else if ($("#RType_" + i).val() == 1) { //Total

            $("#TotalRent__" + i).val(parseFloat(TotalAmount || 0).toFixed(Decimal))

        }
    }
}

function formrefresh(Flag) {
    $("#PatientId,#IP_Number,#IP_Year").val(0);
    $("#PName,#SIP_Number,#OPVisitId,#AdmittedDate").val('');
    $('.detextnull').text('');
    $('#myImg').attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
    $('#tbl_IPGrid tr,#tbl_IPGrid_Room tr').remove();
}


function PrintIPStatement() {
    if ($("#PatientId").val() == 0) {
        warningshow('Select IP', 'RegNo');
    }
    else {

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

//Numeric Only Text Boxes with Decimal Point

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