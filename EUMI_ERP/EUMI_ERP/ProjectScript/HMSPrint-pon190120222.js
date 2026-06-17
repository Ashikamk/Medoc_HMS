//COMMON

var ComapnydivToPrint = document.getElementById("ComapnyImage");

var FontWeightBold = 'font-weight:bold;';
var FontSize = '12px;';
var HeaderHeight = 'height:100px';
var BorderX = 'border-top:0px solid black;border-bottom:0px solid black;';
var BorderY = 'border-left:0px solid black;border-right:0px solid black;';
var Div = '<div style="height:10px;"></div>';

//Function to convert amount into currency format
function addCommas(x) {
    var amt = x || 0;
    var parts = amt.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

function withDecimal(n) {
    var nums = n.toString().split('.')
    var whole = convertNumberToWords(nums[0])
    if (nums.length == 2) {
        var fraction = convertNumberToWords(nums[1])
        return whole + 'and ' + fraction + ' Fils Only';
    } else {
        return whole;
    }
}


function CmnPrintFunction(Form, Rowlen, Type, Flag) {

    

    if (Form == 'TestResult') {
        PrintTestResult(Rowlen);
    }
    else if (Form == 'OPCaseSheet') {
        PrintOPMedDescription(Rowlen, Type, Flag);
    }
    else if (Form == 'CaseSheet') {
        PrintthisDescription(Rowlen, Type, Flag);
    }

}


function PrintTestResult1(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");
    
    //myWindow.document.write('<table width=100%><tr>' +
    //    '<td width=50%><table style="' + FontWeightBold + FontSize + '">' +
    //    '<tr><td colspan=3>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
    //    '<tr><td colspan=3>' + window.CompanySettingsArray.Address + '</td></tr>' +
    //    '<tr><td>Fax</td><td> : </td><td>' + window.CompanySettingsArray.Fax + '</td></tr>' +
    //    '<tr><td>Email</td><td> : </td><td>' + window.CompanySettingsArray.Email + '</td></tr>' +
    //    '<tr><td>Ph No.</td><td> : </td><td>' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
    //    '</table></td>' +
    //    '<td width=50% align=right>' + ComapnydivToPrint.outerHTML + '</td>' +
    //    '</tr>' +
    //    '<tr><td colspan=2 style="' + BorderX + '"></td></tr>' +
    //    '</table>');



    //myWindow.document.write('<table width=100%><tr>' +
    //  '<td width=50%><table style="' + FontWeightBold + FontSize + '">' +
    //  '<tr><td colspan=3>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
    //  '<tr><td colspan=3>' + window.CompanySettingsArray.Address + '</td></tr>' +
    //  '<tr><td>Fax</td><td> : </td><td>' + window.CompanySettingsArray.Fax + '</td></tr>' +
    //  '<tr><td>Email</td><td> : </td><td>' + window.CompanySettingsArray.Email + '</td></tr>' +
    //  '<tr><td>Ph No.</td><td> : </td><td>' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
    //  '</table></td>' +
    //  '<td width=50% align=right>' + ComapnydivToPrint.outerHTML + '</td>' +
    //  '</tr>' +
    //  '<tr><td colspan=2 style="' + BorderX + '"></td></tr>' +
    //  '</table>');
    var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

    $(ComapnydivToPrintLab).css('height', 130); $(ComapnydivToPrintLab).css('width', 700);
    //myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
    //myWindow.document.write('</table>');

    myWindow.document.write('<table width=100%><tr><td height=80px></td></tr></table>');

    myWindow.document.write('<table width=100%><tr><td width=100px></td><td>' + $("#PatientName").val() + '</td><td><td>' + MasterBillNo + '</td></td></tr></table>');
    myWindow.document.write('<table width=100%><tr><td height=10px></td></tr></table>');


    myWindow.document.write('<table width=100%><tr><td width=100px></td><td>' + $("#Age").val() + ' </td><td>    ' + $("#Gender").val() + '  </td><td>   ' + $("#RegNumber").val() + '</td></tr></table>');
    myWindow.document.write('<table width=100%><tr><td height=10px></td></tr></table>');

    myWindow.document.write('<table width=100%><tr><td width=100px></td><td>' + $("#Doctor option:selected").text() + ' </td><td>    ' + $("#BillDate").val() + '</td></tr></table>');

    myWindow.document.write('<table width=100%><tr><td height=50px></td></tr></table>');







    //myWindow.document.write('<table width=100%><tr><td width=60%><table style=' + FontWeightBold + FontSize + '>' +
    //'<tr><td>RegNo#</td><td> : </td><td>' + $("#RegNumber").val() + '</td></tr>' +
    //'<tr><td>Name</td><td> : </td><td>' + $("#PatientName").val() + '</td></tr>' +
    //'<tr><td>Spec_Collected</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
    //'<tr><td>Doctor</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr></table></td>');

    //myWindow.document.write('<td width=40% align="right"><table style=' + FontWeightBold + FontSize + '>' +
    //'<tr><td>OPNo#</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
    //'<tr><td>Age & Sex</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
    //'<tr><td>Spec_Rcvd</td><td> : </td><td>' + $("#ResultDate").val() + '</td></tr>' +
    //'<tr><td>Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr></table></td></tr></table>');

    //myWindow.document.write(Div);
    //myWindow.document.write('<table width=100% style="border-collapse: collapse;page-break-inside: avoid;'  + FontSize + '"><tr>' +
    //    '<td class="p-0" style="width:45%;' + BorderX + '">Test</td>' +
    //    '<td class="p-0" style="width:25%;' + BorderX + '">Observed Value</td>' +
    //    '<td class="p-0" style="width:30%;' + BorderX + '">Reference Range</td><tr>');

    var CurrentDept = 0, CurrentMainTest = 0;
    myWindow.document.write('<table width=100%>');
    for (var i = 1; i <= Rowlen; i++) {

        var Dept = $("#MedDeptId_" + i).val(); var TestHead = $("#TestId_" + i).val(); var SubTestId=$("#SubTestId_" + i).val();

        if (Dept != CurrentDept) {
            CurrentDept = Dept;

            //myWindow.document.write('<tr>' +
            //    '<td colspan=3 class="p-0" height="30" ><u>' + $("#MedDept_" + i).val() + '</u></td><tr>');
        }
        if(TestHead!=0 && SubTestId==0 && TestHead!=CurrentMainTest)
        {
            CurrentMainTest = $("#TestId_" + i).val();
            myWindow.document.write('<tr>' +
                '<td colspan=3 class="p-0" height="20" style="' + BorderX + BorderY + '">' + $("#TestName_" + i).text() + '</td><tr>');
        }
        else if ($.trim($("#Result_" + i).val())!='') {
            myWindow.document.write('<tr>' +
                '<td class="p-0"  style="width=60%">' + $("#TestName_" + i).text() + '</td>' +
                '<td class="p-0"  style="width=20%"><b>' + $("#Result_" + i).val() + ' ' + $("#StdUnit_" + i).text() + '</b></td>' +
                '<td class="p-0"  style="width=20p%">' + $("#NormalValue_" + i).val() +'</td>' +
                '<tr>');
        }


    }

    myWindow.document.write('</table>');


    myWindow.document.write('</table>');

    myWindow.print();

    setTimeout(function () {
        myWindow.close();
    }, 10000);
    myWindow.focus();
}




function PrintTestResult(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");
    
    myWindow.document.write('<table width=100% style="' + FontWeightBold + FontSize + '">' +
        '<tr><td align=center >' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
        '<tr><td align=center>' + window.CompanySettingsArray.Address + '</td></tr>' +
       
        '<tr><td align=center>' + window.CompanySettingsArray.Email + '</td></tr>' +
        '<tr><td align=center>' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
        '<tr><td align=center><hr></td></tr>' +
        '</table>');



    //myWindow.document.write('<table width=100%><tr>' +
    //  '<td width=50%><table style="' + FontWeightBold + FontSize + '">' +
    //  '<tr><td colspan=3>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
    //  '<tr><td colspan=3>' + window.CompanySettingsArray.Address + '</td></tr>' +
    //  '<tr><td>Fax</td><td> : </td><td>' + window.CompanySettingsArray.Fax + '</td></tr>' +
    //  '<tr><td>Email</td><td> : </td><td>' + window.CompanySettingsArray.Email + '</td></tr>' +
    //  '<tr><td>Ph No.</td><td> : </td><td>' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
    //  '</table></td>' +
    //  '<td width=50% align=right>' + ComapnydivToPrint.outerHTML + '</td>' +
    //  '</tr>' +
    //  '<tr><td colspan=2 style="' + BorderX + '"></td></tr>' +
    //  '</table>');
    var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

    $(ComapnydivToPrintLab).css('height', 130); $(ComapnydivToPrintLab).css('width', 700);
   // myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
   // myWindow.document.write('</table>');

    //myWindow.document.write('<table width=100%><tr><td height=100px></td></tr></table>');

    myWindow.document.write('<table width=100%><tr><td width=60%><table style='  + FontSize + '>' +
    '<tr><td>RegNo#</td><td> : </td><td>' + $("#RegNumber").val() + '</td></tr>' +
    '<tr><td>Name</td><td> : </td><td>' + $("#PatientName").val() + '</td></tr>' +
    '<tr><td>Spec_Collected</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
    '<tr><td>Doctor</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr></table></td>');

    myWindow.document.write('<td width=40% align="right"><table style='  + FontSize + '>' +
    '<tr><td>OPNo#</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
    '<tr><td>Age & Sex</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
    '<tr><td>Spec_Rcvd</td><td> : </td><td>' + $("#ResultDate").val() + '</td></tr>' +
    '<tr><td>Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr></table></td></tr></table>');

    myWindow.document.write('<hr>');

    myWindow.document.write(Div);
    myWindow.document.write('<table width=100% style="border-collapse: collapse;page-break-inside: avoid;'  + FontSize + '"><tr>' +
        '<td class="p-0" style="border-bottom:1px solid black; width:45%;' + BorderX + '"><b>Test</b></td>' +
        '<td class="p-0" style="width:25%;border-bottom:1px solid black' + BorderX + '"><b>Observed Value</b></td>' +
        '<td class="p-0" style="width:30%;border-bottom:1px solid black' + BorderX + '"><b>Reference Range</b></td><tr>');

    myWindow.document.write('<tr><td colspan=3><hr></td></tr>');
    var CurrentDept = 0, CurrentMainTest = 0;

    for (var i = 1; i <= Rowlen; i++) {

        var Dept = $("#MedDeptId_" + i).val(); var TestHead = $("#TestId_" + i).val(); var SubTestId=$("#SubTestId_" + i).val();

        if (Dept != CurrentDept) {
            CurrentDept = Dept;

           // myWindow.document.write('<tr>' +
              //  '<td colspan=3 class="p-0" height="30" ><u>' + $("#MedDept_" + i).val() + '</u></td><tr>');
        }
        if(TestHead!=0 && SubTestId==0 && TestHead!=CurrentMainTest)
        {
            CurrentMainTest = $("#TestId_" + i).val();
            myWindow.document.write('<tr>' +
                '<td colspan=3 class="p-0" height="20" style="' + BorderX + BorderY + '"><b>' + $("#TestName_" + i).text() + '<b></td><tr>');
        }
        else if ($.trim($("#Result_" + i).val())!='') {
            myWindow.document.write('<tr>' +
                '<td class="p-0"  style="' + BorderX + BorderY + '">' + $("#TestName_" + i).text() + '</td>' +
                '<td class="p-0"  style="' + BorderX + BorderY + '"><b>' + $("#Result_" + i).val() + ' ' + $("#StdUnit_" + i).text() + '</b></td>' +
                '<td class="p-0"  style="' + BorderX + BorderY + '">' + $("#NormalValue_" + i).val() +'</td>' +
                '<tr>');
        }


    }

    myWindow.document.write('</table>');

    myWindow.document.write('<br><table width=100%><tr><td align=center>*****End*****</td></tr></table>');

    myWindow.document.write('<br><table width=100%><tr><td align=right>Lab tech Signature</td></tr></table>');


    myWindow.document.write('</table>');

    myWindow.print();

    setTimeout(function () {
        myWindow.close();
    }, 10000);
    myWindow.focus();
}

function PrintOPMedDescription(Rowlen, type, Flag) {
    if (type == 'HEADERPRINT') {
        var TotPQty = 0; var Rowcount = 7;
        var MaxCnt = 32;

        var myWindow = window.open("", "", "width=1500,height=1500");

        $(ComapnydivToPrint).css('height', '100%');

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blckbrdr{font-size:18;font-style: italic;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:14}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG3);

        //myWindow.document.write('<table width=100% ><tr ><td width=70% align=left colspan=5 rowspan=2 style=color:#008000;font-weight:bold>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right  width=10% style=font-weight:bold>RegNo&#160; :</td><td colspn=2 width=20% style=font-weight:bold>' + $('#PrintPRegNo').val() + '</td></tr>' +
        //                        '<tr ><td align=right  width=10% >Date &#160;&#160;&#160;&#160; :</td><td colspn=2 width=30% >' + $('#PrintCaseDate').val() + '</td></tr>');
        //myWindow.document.write('</table>');
        
        var hd = document.getElementById('withhead').checked;
        if (hd == true) {
            myWindow.document.write('<table width=100% ><tr ><td>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
            myWindow.document.write('<table class="txbld1" width=100% ><tr><td height="2px"></td></tr>');

        }
        else
        {

            myWindow.document.write('<table width=100% ><tr ><td>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
            myWindow.document.write('<table class="txbld1" width=100% ><tr><td height="2px"></td></tr>');
           // myWindow.document.write('<table width=100% ><tr ><td><b>DR. C. N. NAHAS MBBS, MD, DTCD, FCCP </b> </td> <td align=right><b> Reg No:30945(TCMC).</td></tr> <tr ><td><b>CONSULTANT PULMONOLOGIST </b>  </td> <td align=right><b>  drnahas@rediffmail.com</b> </td></tr>  <tr ><td><b>Allergy, Asthma, TB</b>  </td> <td align=right> <b> Mobile:9447172209</td></tr> <tr ><td><b>Chest Specialist </b> </td> <td align=right><b> Consulting Time: 3 PM to 7 PM</b> </td></tr> <tr ><td><b>Govt. Taluk Hospital </b>  </td> <td align=right></td></tr>  <tr ><td><b>Sasthamkotta.</b>  </td> <td align=right></td></tr> </table>');
           // myWindow.document.write('<div style="border-top: 1px solid black;border-bottom: 1px solid black;"><table width=100% ><tr><td align=center><b>Booking No.  9207904244, 9207914244</b> </td><tr><td align=center><b>Booking Time: 8.30 AM to 1.00 PM  (Sunday Holiday)</b> </td></tr></table></div>');

        }


           
        myWindow.document.write(' <table width=100%>  <tr ><td width=10% align=left >Name &#160;&#160;:</td><td>' + $('#PrintPatientName').val() + '</td><td align=right width=10%>OP &#160;&#160;&#160;&#160;&#160;&#160;&#160;: </td><td  colspan=2>' + $('#PrintPatientOP').val() + '</td><td align=right  width=10% style=font-weight:bold>RegNo&#160; :</td><td colspn=2 width=20% style=font-weight:bold>' + $('#PrintPRegNo').val() + '</td></tr>');

        myWindow.document.write('<tr ><td width=10% align=left >Age/Sex:</td><td>' + ($('#PrintPatientAge').val()).substring(0, 10) + ' / ' + $('#PrintPatientGender').val() + '</td><td align=right width=10%></td><td colspan=2 ></td><td align=right  width=10% >Date &#160;&#160;&#160;&#160; :</td><td colspn=2 width=20% >' + $('#PrintCaseDate').val() + '</td></tr>');
        myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
        myWindow.document.write('</table>');

        if ($('#ipselect').prop('checked') == true) {
            if ($('#Complaint').val() == '')
            {
                Data =""
            }
            else {
                Data = 'Complaints :' + $('#Complaint').val()
            }
           
        }
        else
        {
            Data = 'Diagnosis :'+$('#PrintComplaint').val()
        }

        myWindow.document.write('<table  class="txbld1"  width=100% ><tr><td colspan=8><tr ><td></td></tr>');
        myWindow.document.write('<tr><td colspan=8 class="txbld1"> ' + Data + '</td></tr></table>');

        myWindow.document.write('<table  class="txbld1"  width=100% ><tr ><td colspan=8 ></td></tr><tr><td colspan=8>Rx </td></tr>');

        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#PrintMedicine_' + Id).length && $.trim($('#PrintMedicine_' + Id).val()) != '') {
                Rowcount += 1;
                var medname =Id+".  "+ $('#PrintMedicine_' + Id).val();
                var Dosage = $('#PrintDosage_' + Id).val();
                var Daily = $('#PrintDaily_' + Id).val();
                var Days = $('#PrintDays_' + Id).val();
                var Notes = $('#mednote' + Id).val();
                if (Daily == 0) { Daily = '' } else if (Daily==1) { Daily = Daily + '  Time' } else { Daily = Daily + '  Times' }
                if (Dosage == 0) { Dosage = '' }  else {Dosage=Dosage+' Daily '}
                if (Days == 0) { Days = '' } else if (Days == 1) { Days = '  X ' + Days + ' Day' } else { Days = ' X ' + Days + ' Days' }
                if (Notes == undefined)
                {
                    Notes = '';
                }

                myWindow.document.write('<tr ><td colspan=8 ></td></tr><tr><td class="txbld1" colspan=5 style="padding-left:20px">' + medname + ' ' + Notes + '      ' + Dosage + Daily + Days + ' </td></tr>');

                if (Rowcount % MaxCnt == 0) {
                    myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=115px colspan=8></td></tr>');
                    myWindow.document.write('<tr ><td width=70% align=left colspan=5 rowspan=2 style=color:#008000;font-weight:bold>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right  width=10% style=font-weight:bold>RegNo&#160; :</td><td colspn=2 width=20% style=font-weight:bold>' + $('#PrintPRegNo').val() + '</td></tr>' +
                               '<tr ><td align=right  width=10% >Date &#160;&#160;&#160;&#160; :</td><td colspn=2 width=30% >' + $('#PrintCaseDate').val() + '</td></tr>');
                    myWindow.document.write('<tr ><td width=10% align=left >Patient &#160;&#160;:</td><td colspan=4 align=left width=60%>' + $('#PrintPatientName').val() + '</td><td align=right width=10%>OP &#160;&#160;&#160;&#160;&#160;&#160;&#160;: </td><td  colspan=2 width=20% >' + $('#PrintPatientOP').val() + '</td></tr>');
                    myWindow.document.write('<tr ><td width=10% align=left >Age/Sex : </td><td colspan=4 align=left width=60%>' + $('#PrintPatientAge').val() + ' / ' + $('#PrintPatientGender').val() + '</td><td align=right width=10%>Weight&#160; : </td><td colspan=2 width=20% >' + parseFloat($('#PrintPatientWeight').val()).toFixed(Decimal) + '</td></tr>');
                    myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
                    Rowcount = 4;
                }
            }
        }

        var Cnt = 0; var ccount = Rowcount;
        if (Rowcount >= 26) { Cnt = (MaxCnt - Rowcount) + MaxCnt - 6; }
        else { Cnt = parseInt(MaxCnt) - Rowcount - 6; }

        for (var a = 1; a <= Cnt ; a++) {
            var RoughRow = '';
            RoughRow = '<tr ><td colspan=8>&#160;</td></tr>';

            //myWindow.document.write(RoughRow);
            ccount++;
            if (ccount % MaxCnt == 0) {
                ccount = 0;
               // myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=115px colspan=8></td></tr>');
            }
        }
        myWindow.document.write('</table>');

        if (hd == true) {
            myWindow.document.write('<table width=100%>  <tr style="height:50px"><td></td></tr>  <tr><td align=center  colspan=8>WISHING YOU A SPEEDY RECOVERY </td></tr> <tr><td width=60%   colspan=6> </td><td  align=center colspan=2> - Team ' + window.CompanySettingsArray.CompanyName + '</td></tr></table>');
        }

        var NextDate = '';
        if (($('#NextReview').val() || 0) > 0)
        { NextDate = 'Next Review On ' + $('#NextDate').val(); }

        myWindow.document.write('<table width=100%><tr style="height:20px"><td colspan=8></td></tr> <tr align=center><td colspan=8> ' + NextDate + '</td></tr><tr ><td colspan=8>&#160;</td></tr>');
       // myWindow.document.write('<tr align=left><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
        myWindow.document.write('</table>');

       // if (hd == true) {
           // myWindow.document.write('<table width=100%><tr style="height:50px;font-weight:bold"><td>FLASH - You can now avail Tele  Consultation - For details contact 8281887777,04712224545 .</td></tr></table>');
       // }



        myWindow.print();
        myWindow.close();
    }

}


function PrintthisDescription(Rowlen,type, Flag) {
    if (type == 'HEADERPRINT') {
        var TotPQty = 0; var Rowcount = 7;
        var MaxCnt = 32;

        var myWindow = window.open("", "", "width=1500,height=1500");

        $(ComapnydivToPrint).css('height', 70);

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blckbrdr{padding:2px;height:50px} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG3);

        myWindow.document.write('<table width=100% ><tr ><td width=70% align=left colspan=5 rowspan=2 style=color:#008000;font-weight:bold>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right  width=10% style=font-weight:bold>RegNo&#160; :</td><td colspn=2 width=20% style=font-weight:bold>' + $('#PRegNo').val() + '</td></tr>' +
                                '<tr ><td align=right  width=10% >Date &#160;&#160;&#160;&#160; :</td><td colspn=2 width=30% >' + $('#CaseDate').val() + '</td></tr>');
        myWindow.document.write('</table>');

        myWindow.document.write('<table width=100% ><tr ><td width=10% align=left >Patient &#160;&#160;:</td><td colspan=4 align=left width=60%>' + $('#PatientName').text() + '</td><td align=right width=10%>OP &#160;&#160;&#160;&#160;&#160;&#160;&#160;: </td><td  colspan=2 width=20% >' + $('#PatientOP').text() + '</td></tr>');
        myWindow.document.write('<tr ><td width=10% align=left >Age/Sex : </td><td colspan=4 align=left width=60%>' + $('#PatientAge').text() + ' / ' + $('#PatientGender').text() + '</td><td align=right width=10%>Weight&#160; : </td><td colspan=2 width=20% >' + parseFloat($('#PatientWeight').text()).toFixed(Decimal) + '</td></tr>');
        myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
        myWindow.document.write('</table>');

        myWindow.document.write('<table width=100% ><tr><td colspan=8><tr ><td height=5px colspan=8></td></tr>');
        myWindow.document.write('Patient Complaints : </td></tr><tr ><td colspan=8 rowspan=2 class="blckbrdr"> ' + ($('#Complaint').val()).substring(0, 130) + '</td></tr></table>');

        myWindow.document.write('<table width=100% ><tr ><td colspan=8 ></td></tr><tr><td colspan=8>Rx </td></tr>');

        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#Medicine' + Id).length && $.trim($('#Medicine' + Id).val()) != '') {
                Rowcount += 1;
                myWindow.document.write('<tr ><td colspan=8 ></td></tr><tr><td colspan=5 style="padding-left:20px">' + $('#Medicine' + Id).val() + ' </td><td colspan=3 align=right> ' + $('#Dosage' + Id).val() + ' Daily , ' + $('#Daily' + Id).val() + ' Times X ' + $('#Days' + Id).val() + '  Days </td></tr>');

                if (Rowcount % MaxCnt == 0) {
                    myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=115px colspan=8></td></tr>');
                    myWindow.document.write('<tr ><td width=70% align=left colspan=5 rowspan=2 style=color:#008000;font-weight:bold>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right  width=10% style=font-weight:bold>RegNo&#160; :</td><td colspn=2 width=20% style=font-weight:bold>' + $('#PRegNo').val() + '</td></tr>' +
                               '<tr ><td align=right  width=10% >Date &#160;&#160;&#160;&#160; :</td><td colspn=2 width=30% >' + $('#CaseDate').val() + '</td></tr>');
                    myWindow.document.write('<tr ><td width=10% align=left >Patient &#160;&#160;:</td><td colspan=4 align=left width=60%>' + $('#PatientName').text() + '</td><td align=right width=10%>OP &#160;&#160;&#160;&#160;&#160;&#160;&#160;: </td><td  colspan=2 width=20% >' + $('#PatientOP').text() + '</td></tr>');
                    myWindow.document.write('<tr ><td width=10% align=left >Age/Sex : </td><td colspan=4 align=left width=60%>' + $('#PatientAge').text() + ' / ' + $('#PatientGender').text() + '</td><td align=right width=10%>Weight&#160; : </td><td colspan=2 width=20% >' + parseFloat($('#PatientWeight').text()).toFixed(Decimal) + '</td></tr>');
                    myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
                    Rowcount = 4;
                }
            }
        }

        var Cnt = 0; var ccount = Rowcount;
        if (Rowcount >= 26) { Cnt = (MaxCnt - Rowcount) + MaxCnt - 6; }
        else { Cnt = parseInt(MaxCnt) - Rowcount - 6; }

        for (var a = 1; a <= Cnt ; a++) {
            var RoughRow = '';
            RoughRow = '<tr ><td colspan=8>&#160;</td></tr>';

            myWindow.document.write(RoughRow);
            ccount++;
            if (ccount % MaxCnt == 0) {
                ccount = 0;
                myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=115px colspan=8></td></tr>');
            }
        }
        myWindow.document.write('</table>');

        var NextDate = '';
        if (($('#NextReview').val() || 0) > 0)
        { NextDate = 'Next Review On ' + $('#NextDate').val(); }

        myWindow.document.write('<table width=100%><tr style="height:15px"><td colspan=8></td></tr> <tr align=center><td colspan=8> ' + NextDate + '</td></tr><tr ><td colspan=8>&#160;</td></tr>');
        myWindow.document.write('<tr align=left><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
        myWindow.document.write('</table>');

        myWindow.print();
    }

}