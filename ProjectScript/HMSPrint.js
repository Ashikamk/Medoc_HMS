//COMMON

var ComapnydivToPrint = document.getElementById("ComapnyImage");
var powerdby = document.getElementById("ComapnyImage1");


var FontWeightBold = 'font-weight:bold;';
var FontSize = 'font-size:small;';
var HeaderHeight = 'height:100px';
var BorderX = 'border-top:0.5px solid black;border-bottom:0.5px solid black;';
var BorderY = 'border-left:0.5px solid black;border-right:0.5px solid black;';
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

    debugger;

    if (Form == 'TestResult') {
        PrintTestResult(Rowlen);
    }
    else if (Form == 'OPCaseSheet') {
        PrintOPMedDescription(Rowlen, Type, Flag);
    }
    else if (Form == 'CaseSheet') {
        PrintthisDescription(Rowlen, Type, Flag);
    }
    else if (Form == 'PDF') {
        PrintTestResultPDF(Rowlen, Type, Flag);
    }

    

}


function PrintTestResult(Rowlen) {

   
  
    var SignPrint = document.getElementById("signimg");
    var SignPrintincharge = document.getElementById("signimg1");

    
    var myWindow = window.open("", "", "width=1500,height=1500");
    if ($('#headprint').is(':checked')) {
        var LB = 2;
    }
    else {
        var LB = LabHead

    }
    var powerdby = document.getElementById("ComapnyImage1");
    var powerdby1 = document.getElementById("printqrr");
    
    $(powerdby).css('height', 30); $(powerdby).css('width',280);
   // myWindow.document.write('<span style="font-family: tahoma; font-size:10px;font-weight: bold;position:fixed;bottom:0"><table cellpadding=0 cellspacing=0><tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">Powered by</td></tr> <tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">' + (powerdby.outerHTML) + '</td></tr> </table></span>')

    //myWindow.document.write('<span style="font-family: tahoma; font-size:10px;font-weight: bold;position:fixed;bottom:0"><table cellpadding=0 cellspacing=0><tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;"></td></tr> <tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">' + (powerdby.outerHTML) + '</td></tr> </table></span>')


   // myWindow.document.write('<span style="font-family: tahoma; font-size:10px;font-weight: bold;position:fixed;bottom:0"><table cellpadding=0 cellspacing=0><tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">' + (powerdby.outerHTML) + '</td></tr> <tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">Scan this for more details</td></tr>  </table></span>')


    //myWindow.document.write('<table style="position:fixed;bottom:0;border:1px solid black" width=98% ><tr><td style="font-family: tahoma;text-align: center; font-size:12px;font-weight: bold;">Scan this for more details</td></tr>  </table>')



    if (LB == 1) {
        //myWindow.document.write('<table width=100%><tr>' +
        //    '<td width=50%><table>' +
        //    '<tr><td style="font-size:22;font-weight:bold;" colspan=3>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
        //    '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.Address + '</td></tr>' +
        //    //'<tr><td>Fax</td><td> : </td><td>' + window.CompanySettingsArray.Fax + '</td></tr>' +
        //    '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.Email + '</td></tr>' +
        //    '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
        //    '</table></td>' +
        //    '<td width=50% align=right></td>' +
        //    '</tr>' +
        //    '<tr><td colspan=2 style="' + BorderX + '"></td></tr>' +
        //    '</table>');
        LROW = 90;
        myWindow.document.write('<table width=100%><tr><td height=' + LROW + 'px></td></tr></table>');

    }
    else if (LB == 2) {
        var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

        $(ComapnydivToPrintLab).css('height', 100); $(ComapnydivToPrintLab).css('width', 700);
        myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
        myWindow.document.write('</table>');
    }

    else {

        //blank header row from layout
      myWindow.document.write('<table width=100%><tr><td height='+LROW+'px></td></tr></table>');
    }

   

   // myWindow.document.write('<table  style="" width=100%><tr><td width=60%><table style="font-family: tahoma; font-size:13px;font-weight: bold;">' +
   // '<tr><td>MR-No#</td><td> : </td><td>' + $("#RegNumber").val() + '</td></tr>' +
   // '<tr><td>Name</td><td> : </td><td>' + $("#PatientName").val() + '</td></tr>' +
   // '<tr><td>Doctor</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr>' +
   //// '<tr><td>Spec_Collected</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr></table></td>');
   //  '<tr><td></td><td>  </td><td></td></tr></table></td>');


    //myWindow.document.write('<td  width=40% align="right"><table  style="font-family:tahoma; font-size:13px;font-weight: bold;">' +
    //'<tr><td>Rpt-No#</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
    //'<tr><td>Age & Sex</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
    //    '<tr><td>Spec_Rcvd</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
    //'<tr><td>Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr></table></td></tr></table>');


    myWindow.document.write('<table  style="" width=100%>' +
        '<tr>' +
        '<td width=45%><table style="font-family: tahoma; font-size:11px;">' +
        '<tr><td style="font-weight: bold;">Patient ID</td><td style="font-weight: bold;"> : </td><td style="font-weight: bold;">' + $("#RegNumber").val() + '</td></tr>' +
        '<tr><td style="font-weight: bold;">Patient Name</td><td style="font-weight: bold;"> : </td><td style="font-weight: bold;">' + $("#PatientName").val() + '</td></tr>' +
        '<tr><td>Age/Gender</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
        '<tr><td>Ref. By</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr>' +
        '<tr><td>Contact No</td> <td> : </td><td>' +( $("#Remarksphone").val()).replace('##','').substring(0, 10) + '</td></tr>' +
        '</table></td>');

   
    myWindow.document.write('<td  width=40% align="right"><table  style="font-family:tahoma; font-size:11px;">' +
        '<tr><td>Sample Id</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
        '<tr><td>Collection Date</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
        '<tr><td>Receiving Date</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
        '<tr><td>Reporting Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr>' +
        /*     '<tr><td>' + (barcode2.outerHTML) + '</td></tr>' +*/
        '</table></td>');

   // myWindow.document.write('<td  width=15% align="right"><table  style="font-family:tahoma; font-size:13px;font-weight: bold;">' +
       // '<tr><td style="border:2px solid black">' + (powerdby1.outerHTML) + '</td></tr>' +
    // '</table></td></tr></table>');

    var Maxvalue = 0;
    var Minvalue = 0;
    var Res = ''; var printresult='';


    myWindow.document.write(Div);
    myWindow.document.write('<table width=100% style="border-collapse: collapse;font-family:tahoma;font-size:11px;"><tr>' +
        '<td class="p-0" style="width:37%;font-weight:bold;' + BorderX + '">Test</td>' +
        '<td class="p-0" style="width:18%;font-weight:bold;' + BorderX + '">Result</td>' +
        '<td class="p-0" style="width:15%;font-weight:bold;' + BorderX + '">Unit</td>' +
        '<td class="p-0" style="width:30%;font-weight:bold;' + BorderX + '">Reference Range</td><tr>');
    myWindow.document.write('<tr><td colspan=3 class="p-0" height="10" ></td><tr>');

    var CurrentDept = 0, CurrentMainTest = 0; var finalnotes = "";
    var linecount = 0; var V = 0; var DDh = 0;
    for (var i = 1; i <= Rowlen; i++) {

        Maxvalue = 0;
        Minvalue = 0;
        Res = 0;
        printresult = '';
        if ($("#selprint_" + i).is(":checked")) {

            var Dept = $("#MedDeptId_" + i).val(); var TestHead = $("#TestId_" + i).val(); var SubTestId = $("#SubTestId_" + i).val();

            console.log( 'DE--' +Dept)

            if ($("#Notes_" + i).val() != '') {

                if (finalnotes.indexOf($("#Notes_" + i).val()) == -1) {
                    finalnotes = finalnotes + $("#Notes_" + i).val();
                }
            }

            
            
                if (Dept != CurrentDept) {
                CurrentDept = Dept;
                myWindow.document.write('<tr><td align=center colspan=4 class="p-0" style=" border:1px solid #f2f2f2;background-color:#f2f2f2" height="" ><b>' + $("#MedDept_" + i).val() + '</b></td><tr>');
                linecount += 1;
            }


            if (($("#TestName_" + i).text()).includes("@@")) {
                myWindow.document.write('<tr>' +
                        '<td  align=left colspan=4 style="padding:5px;  border:0px solid black;font-family:tahoma; font-size: 11px;" class="p-0"  ><b>' + ($("#TestName_" + i).text()).replace("@@", "") + '</b></td>' +
                       '<tr>');

            }

            

            if (TestHead != 0 && SubTestId == 0 && TestHead != CurrentMainTest) {
                CurrentMainTest = $("#TestId_" + i).val();
                myWindow.document.write('<tr><td colspan=4 class="p-0" height="20" style=" border:0px solid black;"><b>' + $("#TestName_" + i).text() + '<b></td><tr>');
                linecount += 1;
            }
            else if ($.trim($("#Result_" + i).val()) != '') {
             Maxvalue  =parseFloat( $('#MaxVal_' + i).val()||0);
             Minvalue =parseFloat( $('#MinVal_' + i).val()||0);
             Res = parseFloat(($("#Result_" + i).val()).replace(',', ''));

             if (isNaN($.trim($("#Result_" + i).val().replace(',', ''))))
            {Res=0}

            debugger;
            if (Res > Maxvalue ) {
                 printresult = '<b>' + $("#Result_" + i).val() + '</b>';
            }
            else if (Res < Minvalue) {
                 printresult = '<b>' + $("#Result_" + i).val() + '</b>';
            }
            else {
                 printresult = '' + $("#Result_" + i).val() + '';
             }
             Res = $("#Result_" + i).val();
             if((Res.toLowerCase()).indexOf("rech")!=-1){
             printresult = '<b>' + $("#Result_" + i).val() + '</b>';
             }



            if (($("#TestName_" + i).text()).includes("##")) {
                myWindow.document.write('<tr>' +
                        '<td style="padding:2px;  border:1px solid #f2f2f2;font-family:tahoma; font-size: 11px;" class="p-0"  >&#160;&#160;' + ($("#TestName_" + i).text()).replace("##", "&#160;") + '</td>' +
                        '<td style="padding:2px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + printresult + '</td>' +
                         '<td style="padding:2px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + $("#StdUnit_" + i).text() + '</td>' +
                        '<td style="padding:2px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + ($("#NormalValue_" + i).val()).replace(/##/g, "<br>") + '</td>' +
                        '<tr>');
            }
            else {
                myWindow.document.write('<tr>' +
                    '<td style="padding:2px;  border:1px solid #f2f2f2;font-family:tahoma; font-size: 11px;" class="p-0"  >' + $("#TestName_" + i).text() + '</td>' +
                    '<td style="padding:2px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + printresult + '</td>' +
                     '<td style="padding:2px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + $("#StdUnit_" + i).text() + '</td>' +
                    '<td style="padding:2px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + ($("#NormalValue_" + i).val()).replace(/##/g, "<br>") + '</td>' +
                    '<tr>');
            }



                DDh = 0;
                if (($("#NormalValue_" + i).val() != undefined)) {
                    DDh = ($("#NormalValue_" + i).val()).split("##").length - 1;

                    for (V = 1; V <= DDh; V++) {
                        linecount += 1;
                    }
                      console.log($("#NormalValue_" + i).val())
                      console.log('c'+DDh)
                }
                if (DDh == 0) {
                    linecount += 1;
                }
            }


            console.log($("#TestName_" + i).text());
            console.log('LC'+linecount)

            if (linecount == 28 || linecount == 29 || linecount == 27)//from layout
            {
                var LROW1 = 100;
                myWindow.document.write('<table width=100%><tr><td height=' + LROW1 + 'px></td></tr></table>');
                var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

                $(ComapnydivToPrintLab).css('height', 100); $(ComapnydivToPrintLab).css('width', 700);
                if (LB == 1) {
//                    myWindow.document.write('<table width=100%><tr>' +
//                        '<td width=50%><table>' +
//                        '<tr><td style="font-size:22;font-weight:bold;" colspan=3>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
//                        '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.Address + '</td></tr>' +
//                        //'<tr><td>Fax</td><td> : </td><td>' + window.CompanySettingsArray.Fax + '</td></tr>' +
//                        '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.Email + '</td></tr>' +
//                        '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
//                        '</table></td>' +
//                        '<td width=50% align=right></td>' +
//                        '</tr>' +
//                        '<tr><td colspan=2 style="' + BorderX + '"></td></tr>' +
                    //                        '</table>');
                    var LROW1=120
                    myWindow.document.write('<table width=100%><tr><td height=' + LROW1 + 'px></td></tr></table>');
                }
                else if (LB == 2) {
                    var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

                    $(ComapnydivToPrintLab).css('height', 100); $(ComapnydivToPrintLab).css('width', 700);
                    myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
                    myWindow.document.write('</table>');
                }

                else {

                    //blank header row from layout
                    myWindow.document.write('<table width=100%><tr><td height=' + LROW + 'px></td></tr></table>');
                }


//                myWindow.document.write('<table  style="" width=100%><tr><td width=60%><table style="font-family: tahoma; font-size:11px;font-weight: bold;">' +
//                    '<tr><td>MR-No#</td><td> : </td><td>' + $("#RegNumber").val() + '</td></tr>' +
//                    '<tr><td>Name</td><td> : </td><td>' + $("#PatientName").val() + '</td></tr>' +
//                    '<tr><td>Spec_Collected</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
//                    '<tr><td>Doctor</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr></table></td>');

//                myWindow.document.write('<td  width=40% align="right"><table  style="font-family:tahoma; font-size:11px;font-weight: bold;">' +
//                    '<tr><td>Rpt-No#</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
//                    '<tr><td>Age & Sex</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
//                    '<tr><td>Spec_Rcvd</td><td> : </td><td>' + $("#ResultDate").val() + '</td></tr>' +
//                    '<tr><td>Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr></table></td></tr></table>');



                myWindow.document.write('<table  style="" width=100%>' +
        '<tr>' +
        '<td width=45%><table style="font-family: tahoma; font-size:11px;">' +
        '<tr><td style="font-weight: bold;">Patient ID</td><td style="font-weight: bold;"> : </td><td style="font-weight: bold;">' + $("#RegNumber").val() + '</td></tr>' +
        '<tr><td style="font-weight: bold;">Patient Name</td><td style="font-weight: bold;"> : </td><td style="font-weight: bold;">' + $("#PatientName").val() + '</td></tr>' +
        '<tr><td>Age/Gender</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
        '<tr><td>Ref. By</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr>' +
        '<tr><td>Contact No</td> <td> : </td><td>' + ($("#Remarksphone").val()).replace('##', '').substring(0, 10) + '</td></tr>' +
        '</table></td>');


                myWindow.document.write('<td  width=40% align="right"><table  style="font-family:tahoma; font-size:11px;">' +
        '<tr><td>Sample Id</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
        '<tr><td>Collection Date</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
        '<tr><td>Receiving Date</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
        '<tr><td>Reporting Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr>' +
                /*     '<tr><td>' + (barcode2.outerHTML) + '</td></tr>' +*/
        '</table></td>');




                myWindow.document.write(Div);
                myWindow.document.write('<table width=100% style="border-collapse: collapse;font-family:tahoma;font-size:11px;"><tr>' +
        '<td class="p-0" style="width:38%;font-weight:bold;' + BorderX + '">Test</td>' +
        '<td class="p-0" style="width:14%;font-weight:bold;' + BorderX + '">Result</td>' +
        '<td class="p-0" style="width:15%;font-weight:bold;' + BorderX + '">Unit</td>' +
        '<td class="p-0" style="width:33%;font-weight:bold;' + BorderX + '">Reference Range</td><tr>');
                myWindow.document.write('<tr><td colspan=3 class="p-0" height="15" ></td><tr>');

                var CurrentDept = 0, CurrentMainTest = 0; var finalnotes = "";


                linecount = 0;
            }


        }
    }

    myWindow.document.write('</table>');

    $(SignPrintincharge).css('height', 25); $(SignPrintincharge).css('width', 55);
    
    myWindow.document.write('<table style="font-family:tahoma;font-size: 12px;"  width=100%><tr><td><br><b>' + (finalnotes).replace("undefined", "")+'</b></td></tr></table>');


    //myWindow.document.write('<table style="font-family:tahoma;font-size: 12px;"  width=100%><tr><td height=20px></td></tr><tr><td colspan=3 style="font-family:tahoma;font-size: 12px;" align=center>*****  END OF REPORT  *****</td></tr><tr><td height=20px colspan=3 align=center>&#160;</td></tr><tr><td valign=bottom style="font-family:tahoma;font-size: 12px;" align=left><br>LAB TECHNICIAN </td><td width=400px align=center></td><td style="font-family:tahoma;font-size: 12px;" align=center>&#160;Approved By</td></tr><tr><td align=left></td><td width=400px align=center></td><td align=center>&#160;' + (SignPrint.outerHTML) + ' </td></tr><tr><td align=left></td><td width=400px align=center></td><td style="font-family:tahoma;font-size: 12px;" align=center>&#160;' + $('#UserDetsss').text()+'<br>LAB INCHARGE</td></tr></table>');

    myWindow.document.write('<table style="font-family:tahoma;font-size: 12px;"  width=100%><tr><td height=10px></td></tr><tr><td colspan=3 style="font-family:tahoma;font-size: 12px;" align=center>*****  END OF REPORT  *****</td></tr> </table>');
    myWindow.document.write('<table style="font-family:tahoma;font-size: 12px;"  width=100%>  <tr><td width=150px align=center>&#160; </td><td></td><td width=150px align=center>&#160;' + (SignPrintincharge.outerHTML) + '<br>PREETHA RATHISH </td></tr>                      <tr><td  width=150px align=center>LAB TECHNICIAN</td><td align=center>VERIFIED BY</td><td  width=150px align=center>LAB INCHARGE</td></tr></table>');


    myWindow.print();

    setTimeout(function () {
       // myWindow.close();
    }, 10000);
    myWindow.focus();
}













function PrintTestResultPDF(Rowlen) {

   // alert('PDF');

    var SignPrint = document.getElementById("signimg");
    var SignPrintincharge = document.getElementById("signimg1");


    var myWindow = window.open("", "", "width=1500,height=1500");
    if ($('#headprint').is(':checked')) {
        var LB = 2;
    }
    else {
        var LB = LabHead

    }
    var powerdby = document.getElementById("ComapnyImage1");
    var powerdby1 = document.getElementById("printqrr");

    $(powerdby).css('height', 30); $(powerdby).css('width', 280);
    // myWindow.document.write('<span style="font-family: tahoma; font-size:10px;font-weight: bold;position:fixed;bottom:0"><table cellpadding=0 cellspacing=0><tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">Powered by</td></tr> <tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">' + (powerdby.outerHTML) + '</td></tr> </table></span>')

    myWindow.document.write('<span style="font-family: tahoma; font-size:10px;font-weight: bold;position:fixed;bottom:0"><table cellpadding=0 cellspacing=0><tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;"></td></tr> <tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">' + (powerdby.outerHTML) + '</td></tr> </table></span>')


    // myWindow.document.write('<span style="font-family: tahoma; font-size:10px;font-weight: bold;position:fixed;bottom:0"><table cellpadding=0 cellspacing=0><tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">' + (powerdby.outerHTML) + '</td></tr> <tr><td style="font-family: tahoma; font-size:10px;font-weight: bold;">Scan this for more details</td></tr>  </table></span>')


    //myWindow.document.write('<table style="position:fixed;bottom:0;border:1px solid black" width=98% ><tr><td style="font-family: tahoma;text-align: center; font-size:12px;font-weight: bold;">Scan this for more details</td></tr>  </table>')



    if (LB == 1) {
        //myWindow.document.write('<table width=100%><tr>' +
        //    '<td width=50%><table>' +
        //    '<tr><td style="font-size:22;font-weight:bold;" colspan=3>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
        //    '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.Address + '</td></tr>' +
        //    //'<tr><td>Fax</td><td> : </td><td>' + window.CompanySettingsArray.Fax + '</td></tr>' +
        //    '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.Email + '</td></tr>' +
        //    '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
        //    '</table></td>' +
        //    '<td width=50% align=right></td>' +
        //    '</tr>' +
        //    '<tr><td colspan=2 style="' + BorderX + '"></td></tr>' +
        //    '</table>');
        LROW = 90;
        myWindow.document.write('<table width=100%><tr><td height=' + LROW + 'px></td></tr></table>');

    }
    else if (LB == 2) {
        var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

        $(ComapnydivToPrintLab).css('height', 100); $(ComapnydivToPrintLab).css('width', 700);
        myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
        myWindow.document.write('</table>');
    }

    else {

        //blank header row from layout
        myWindow.document.write('<table width=100%><tr><td height=' + LROW + 'px></td></tr></table>');
    }



    // myWindow.document.write('<table  style="" width=100%><tr><td width=60%><table style="font-family: tahoma; font-size:11px;font-weight: bold;">' +
    // '<tr><td>MR-No#</td><td> : </td><td>' + $("#RegNumber").val() + '</td></tr>' +
    // '<tr><td>Name</td><td> : </td><td>' + $("#PatientName").val() + '</td></tr>' +
    // '<tr><td>Doctor</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr>' +
    //// '<tr><td>Spec_Collected</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr></table></td>');
    //  '<tr><td></td><td>  </td><td></td></tr></table></td>');


    //myWindow.document.write('<td  width=40% align="right"><table  style="font-family:tahoma; font-size:11px;font-weight: bold;">' +
    //'<tr><td>Rpt-No#</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
    //'<tr><td>Age & Sex</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
    //    '<tr><td>Spec_Rcvd</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
    //'<tr><td>Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr></table></td></tr></table>');


    myWindow.document.write('<table  style="" width=100%>' +
        '<tr>' +
        '<td width=45%><table style="font-family: tahoma; font-size:11px;">' +
        '<tr><td style="font-weight: bold;">Patient ID</td><td style="font-weight: bold;"> : </td><td style="font-weight: bold;">' + $("#RegNumber").val() + '</td></tr>' +
        '<tr><td style="font-weight: bold;">Patient Name</td><td style="font-weight: bold;"> : </td><td style="font-weight: bold;">' + $("#PatientName").val() + '</td></tr>' +
        '<tr><td>Age/Gender</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
        '<tr><td>Ref. By</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr>' +
        '<tr><td>Contact No</td> <td> : </td><td>' + ($("#Remarksphone").val()).replace('##', '').substring(0, 10) + '</td></tr>' +
        '</table></td>');


    myWindow.document.write('<td  width=40% align="right"><table  style="font-family:tahoma; font-size:11px;font-weight: bold;">' +
        '<tr><td>Sample Id</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
        '<tr><td>Collection Date</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
        '<tr><td>Receiving Date</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
        '<tr><td>Reporting Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr>' +
    /*     '<tr><td>' + (barcode2.outerHTML) + '</td></tr>' +*/
        '</table></td>');

    // myWindow.document.write('<td  width=15% align="right"><table  style="font-family:tahoma; font-size:11px;font-weight: bold;">' +
    // '<tr><td style="border:2px solid black">' + (powerdby1.outerHTML) + '</td></tr>' +
    // '</table></td></tr></table>');

    var Maxvalue = 0;
    var Minvalue = 0;
    var Res = ''; var printresult = '';


    myWindow.document.write(Div);
    myWindow.document.write('<table width=100% style="border-collapse: collapse;font-family:tahoma;font-size:11px;"><tr>' +
        '<td class="p-0" style="width:38%;font-weight:bold;' + BorderX + '">Test</td>' +
        '<td class="p-0" style="width:14%;font-weight:bold;' + BorderX + '">Result</td>' +
        '<td class="p-0" style="width:15%;font-weight:bold;' + BorderX + '">Unit</td>' +
        '<td class="p-0" style="width:33%;font-weight:bold;' + BorderX + '">Reference Range</td><tr>');
    myWindow.document.write('<tr><td colspan=3 class="p-0" height="10" ></td><tr>');

    var CurrentDept = 0, CurrentMainTest = 0; var finalnotes = "";
    var linecount = 0; var V = 0; var DDh = 0;
    for (var i = 1; i <= Rowlen; i++) {

        Maxvalue = 0;
        Minvalue = 0;
        Res = 0;
        printresult = '';
        if ($("#selprint_" + i).is(":checked")) {

            var Dept = $("#MedDeptId_" + i).val(); var TestHead = $("#TestId_" + i).val(); var SubTestId = $("#SubTestId_" + i).val();

            console.log('DE--' + Dept)

            if ($("#Notes_" + i).val() != '') {

                if (finalnotes.indexOf($("#Notes_" + i).val()) == -1) {
                    finalnotes = finalnotes + $("#Notes_" + i).val();
                }
            }



            if (Dept != CurrentDept) {
                CurrentDept = Dept;
                myWindow.document.write('<tr><td align=center colspan=4 class="p-0" style=" border:1px solid #f2f2f2;background-color:#f2f2f2" height="" ><b>' + $("#MedDept_" + i).val() + '</b></td><tr>');
                linecount += 1;
            }


            if (($("#TestName_" + i).text()).includes("@@")) {
                myWindow.document.write('<tr>' +
                        '<td  align=left colspan=4 style="padding:5px;  border:0px solid black;font-family:tahoma; font-size: 11px;" class="p-0"  ><b>' + ($("#TestName_" + i).text()).replace("@@", "") + '</b></td>' +
                       '<tr>');

            }



            if (TestHead != 0 && SubTestId == 0 && TestHead != CurrentMainTest) {
                CurrentMainTest = $("#TestId_" + i).val();
                myWindow.document.write('<tr><td colspan=4 class="p-0" height="20" style=" border:0px solid black;"><b>' + $("#TestName_" + i).text() + '<b></td><tr>');
                linecount += 1;
            }
            else if ($.trim($("#Result_" + i).val()) != '') {
                Maxvalue = parseFloat($('#MaxVal_' + i).val() || 0);
                Minvalue = parseFloat($('#MinVal_' + i).val() || 0);
                Res = parseFloat(($("#Result_" + i).val()).replace(',', ''));

                if (isNaN($.trim($("#Result_" + i).val().replace(',', ''))))
                { Res = 0 }

                debugger;
                if (Res > Maxvalue) {
                    printresult = '<b>' + $("#Result_" + i).val() + '</b>';
                }
                else if (Res < Minvalue) {
                    printresult = '<b>' + $("#Result_" + i).val() + '</b>';
                }
                else {
                    printresult = '' + $("#Result_" + i).val() + '';
                }
                Res = $("#Result_" + i).val();
                if ((Res.toLowerCase()).indexOf("rech") != -1) {
                    printresult = '<b>' + $("#Result_" + i).val() + '</b>';
                }



                if (($("#TestName_" + i).text()).includes("##")) {
                    myWindow.document.write('<tr>' +
                        '<td style="padding:5px;  border:1px solid #f2f2f2;font-family:tahoma; font-size: 11px;" class="p-0"  >&#160;&#160;' + ($("#TestName_" + i).text()).replace("##", "&#160;") + '</td>' +
                        '<td style="padding:5px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + printresult + '</td>' +
                         '<td style="padding:5px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + $("#StdUnit_" + i).text() + '</td>' +
                        '<td style="padding:5px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + ($("#NormalValue_" + i).val()).replace(/##/g, "<br>") + '</td>' +
                        '<tr>');
                }
                else {
                    myWindow.document.write('<tr>' +
                    '<td style="padding:5px;  border:1px solid #f2f2f2;font-family:tahoma; font-size: 11px;" class="p-0"  >' + $("#TestName_" + i).text() + '</td>' +
                    '<td style="padding:5px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + printresult + '</td>' +
                     '<td style="padding:5px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + $("#StdUnit_" + i).text() + '</td>' +
                    '<td style="padding:5px;font-family:tahoma; border:1px solid #f2f2f2; font-size: 11px;"  class="p-0"  >' + ($("#NormalValue_" + i).val()).replace(/##/g, "<br>") + '</td>' +
                    '<tr>');
                }



                DDh = 0;
                if (($("#NormalValue_" + i).val() != undefined)) {
                    DDh = ($("#NormalValue_" + i).val()).split("##").length - 1;

                    for (V = 1; V <= DDh; V++) {
                        linecount += 1;
                    }
                    console.log($("#NormalValue_" + i).val())
                    console.log('c' + DDh)
                }
                if (DDh == 0) {
                    linecount += 1;
                }
            }


            console.log($("#TestName_" + i).text());
            console.log('LC' + linecount)

            if (linecount == 28 || linecount == 29 || linecount == 27)//from layout
            {
                var LROW1 = 100;
                myWindow.document.write('<table width=100%><tr><td height=' + LROW1 + 'px></td></tr></table>');
                var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

                $(ComapnydivToPrintLab).css('height', 100); $(ComapnydivToPrintLab).css('width', 700);
                if (LB == 1) {
                    //                    myWindow.document.write('<table width=100%><tr>' +
                    //                        '<td width=50%><table>' +
                    //                        '<tr><td style="font-size:22;font-weight:bold;" colspan=3>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
                    //                        '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.Address + '</td></tr>' +
                    //                        //'<tr><td>Fax</td><td> : </td><td>' + window.CompanySettingsArray.Fax + '</td></tr>' +
                    //                        '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.Email + '</td></tr>' +
                    //                        '<tr><td style="font-size:18;font-weight: bold;" colspan=3>' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
                    //                        '</table></td>' +
                    //                        '<td width=50% align=right></td>' +
                    //                        '</tr>' +
                    //                        '<tr><td colspan=2 style="' + BorderX + '"></td></tr>' +
                    //                        '</table>');
                    var LROW1 = 120
                    myWindow.document.write('<table width=100%><tr><td height=' + LROW1 + 'px></td></tr></table>');
                }
                else if (LB == 2) {
                    var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

                    $(ComapnydivToPrintLab).css('height', 100); $(ComapnydivToPrintLab).css('width', 700);
                    myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
                    myWindow.document.write('</table>');
                }

                else {

                    //blank header row from layout
                    myWindow.document.write('<table width=100%><tr><td height=' + LROW + 'px></td></tr></table>');
                }


                //                myWindow.document.write('<table  style="" width=100%><tr><td width=60%><table style="font-family: tahoma; font-size:11px;font-weight: bold;">' +
                //                    '<tr><td>MR-No#</td><td> : </td><td>' + $("#RegNumber").val() + '</td></tr>' +
                //                    '<tr><td>Name</td><td> : </td><td>' + $("#PatientName").val() + '</td></tr>' +
                //                    '<tr><td>Spec_Collected</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
                //                    '<tr><td>Doctor</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr></table></td>');

                //                myWindow.document.write('<td  width=40% align="right"><table  style="font-family:tahoma; font-size:13px;font-weight: bold;">' +
                //                    '<tr><td>Rpt-No#</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
                //                    '<tr><td>Age & Sex</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
                //                    '<tr><td>Spec_Rcvd</td><td> : </td><td>' + $("#ResultDate").val() + '</td></tr>' +
                //                    '<tr><td>Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr></table></td></tr></table>');



                myWindow.document.write('<table  style="" width=100%>' +
        '<tr>' +
        '<td width=45%><table style="font-family: tahoma; font-size:13px;">' +
        '<tr><td style="font-weight: bold;">Patient ID</td><td style="font-weight: bold;"> : </td><td style="font-weight: bold;">' + $("#RegNumber").val() + '</td></tr>' +
        '<tr><td style="font-weight: bold;">Patient Name</td><td style="font-weight: bold;"> : </td><td style="font-weight: bold;">' + $("#PatientName").val() + '</td></tr>' +
        '<tr><td>Age/Gender</td><td> : </td><td>' + $("#Age").val() + ', ' + $("#Gender").val() + '</td></tr>' +
        '<tr><td>Ref. By</td><td> : </td><td>' + $("#Doctor option:selected").text() + '</td></tr>' +
        '<tr><td>Contact No</td> <td> : </td><td>' + ($("#Remarksphone").val()).replace('##', '').substring(0, 10) + '</td></tr>' +
        '</table></td>');


                myWindow.document.write('<td  width=40% align="right"><table  style="font-family:tahoma; font-size:13px;font-weight: bold;">' +
        '<tr><td>Sample Id</td><td> : </td><td>' + $("#OPNumber").val() + '</td></tr>' +
        '<tr><td>Collection Date</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
        '<tr><td>Receiving Date</td><td> : </td><td>' + $("#BillDate").val() + '</td></tr>' +
        '<tr><td>Reporting Date</td><td> : </td><td>' + $("#ResultDate").val() + ' ' + $("#ResultTime").val() + '</td></tr>' +
                /*     '<tr><td>' + (barcode2.outerHTML) + '</td></tr>' +*/
        '</table></td>');




                myWindow.document.write(Div);
                myWindow.document.write('<table width=100% style="border-collapse: collapse;font-family:tahoma;font-size:13px;"><tr>' +
        '<td class="p-0" style="width:38%;font-weight:bold;' + BorderX + '">Test</td>' +
        '<td class="p-0" style="width:14%;font-weight:bold;' + BorderX + '">Result</td>' +
        '<td class="p-0" style="width:15%;font-weight:bold;' + BorderX + '">Unit</td>' +
        '<td class="p-0" style="width:33%;font-weight:bold;' + BorderX + '">Reference Range</td><tr>');
                myWindow.document.write('<tr><td colspan=3 class="p-0" height="15" ></td><tr>');

                var CurrentDept = 0, CurrentMainTest = 0; var finalnotes = "";


                linecount = 0;
            }


        }
    }

    myWindow.document.write('</table>');

    $(SignPrintincharge).css('height', 25); $(SignPrintincharge).css('width', 55);

    myWindow.document.write('<table style="font-family:tahoma;font-size: 12px;"  width=100%><tr><td><br>' + (finalnotes).replace("undefined", "") + '</td></tr></table>');


    //myWindow.document.write('<table style="font-family:tahoma;font-size: 12px;"  width=100%><tr><td height=20px></td></tr><tr><td colspan=3 style="font-family:tahoma;font-size: 12px;" align=center>*****  END OF REPORT  *****</td></tr><tr><td height=20px colspan=3 align=center>&#160;</td></tr><tr><td valign=bottom style="font-family:tahoma;font-size: 12px;" align=left><br>LAB TECHNICIAN </td><td width=400px align=center></td><td style="font-family:tahoma;font-size: 12px;" align=center>&#160;Approved By</td></tr><tr><td align=left></td><td width=400px align=center></td><td align=center>&#160;' + (SignPrint.outerHTML) + ' </td></tr><tr><td align=left></td><td width=400px align=center></td><td style="font-family:tahoma;font-size: 12px;" align=center>&#160;' + $('#UserDetsss').text()+'<br>LAB INCHARGE</td></tr></table>');

    myWindow.document.write('<table style="font-family:tahoma;font-size: 12px;"  width=100%><tr><td height=10px></td></tr><tr><td colspan=3 style="font-family:tahoma;font-size: 12px;" align=center>*****  END OF REPORT  *****</td></tr> </table>');
    myWindow.document.write('<table style="font-family:tahoma;font-size: 12px;"  width=100%>  <tr><td width=150px align=center>&#160; </td><td></td><td width=150px align=center>&#160;' + (SignPrintincharge.outerHTML) + '<br>PREETHA RATHISH </td></tr>                      <tr><td  width=150px align=center>LAB TECHNICIAN</td><td align=center>VERIFIED BY</td><td  width=150px align=center>LAB INCHARGE</td></tr></table>');


    myWindow.print();

    setTimeout(function () {
        // myWindow.close();
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
        var FL = false//document.getElementById('withflash').checked;
        if (hd == true) {
            myWindow.document.write('<table width=100% ><tr ><td>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
            myWindow.document.write('<table class="txbld1" width=100% ><tr><td height="2px"></td></tr>');

        }
        else
        {
            myWindow.document.write('<table style="font-family:tahoma" class="txbld1" width=100% ><tr><td height="45px"></td></tr>');

        }


           
        myWindow.document.write('   <tr style="font-size: 12px;" ><td width=10% align=left >Name &#160;&#160;:</td><td>' + $('#PrintPatientName').val() + '</td><td align=right width=10%>OP &#160;&#160;&#160;&#160;&#160;&#160;&#160;: </td><td  colspan=2>' + $('#PrintPatientOP').val() + '</td><td align=right  width=10% style=font-weight:bold>RegNo&#160; :</td><td colspn=2 width=20% style=font-weight:bold>' + $('#PrintPRegNo').val() + '</td></tr>');

        myWindow.document.write('<tr style="font-size: 12px;" ><td width=10% align=left >Age/Sex:</td><td>' + ($('#PrintPatientAge').val()).substring(0, 10) + ' / ' + $('#PrintPatientGender').val() + '</td><td align=right width=10%>Weight&#160; : </td><td colspan=2 >' + parseFloat($('#PatientWeight').val()).toFixed(Decimal) + 'Kg</td><td align=right  width=10% >Date &#160;&#160;&#160;&#160; :</td><td colspn=2 width=20% >' + $('#PrintCaseDate').val() + '</td></tr>');
        myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
        myWindow.document.write('</table>');
        var Data = ""
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
            //Data = 'Diagnosis :'+$('#PrintComplaint').val()
        }


        myWindow.document.write('<table  class="txbld1"  width=100% ><tr>&#160;<td></td></tr>');
        if (Data != "" || Data!=undefined) {
            myWindow.document.write('<tr><td colspan=8 style="font-size: 11px;" class="txbld1"> ' + Data + '</td></tr></table>');
        }

        myWindow.document.write('<table style="font-family:tahoma"  class="txbld1"  width=100% ><tr ><td colspan=8 ></td></tr><tr><td style="font-size: 12px;" colspan=8>Rx </td></tr>');

        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#PrintMedicine_' + Id).length && $.trim($('#PrintMedicine_' + Id).val()) != '') {
                Rowcount += 1;
                var medname = $('#PrintMedicine_' + Id).val();
                var Dosage = $('#PrintDosage_' + Id).val();
                var Daily = $('#PrintDaily_' + Id).val();
                var Days = $('#PrintDays_' + Id).val();
                var Notes = $('#mednote' + Id).val();
                if (Daily == 0) { Daily = '' } else if (Daily==1) { Daily = Daily + '  Time' } else { Daily = Daily + '  Times' }
               // if (Dosage == 0) { Dosage = '' }  else {Dosage=Dosage+' Daily '}
                if (Dosage == 0) { Dosage = '' } else { Dosage = Dosage }

                if (Days == 0) { Days = '' } else if (Days == 1) { Days = '  X ' + Days + ' Day' } else { Days = ' X ' + Days + ' Days' }
                if (Notes == undefined)
                {
                    Notes = '';
                }
                var generic = $('#Generic' + Id).val();

               // myWindow.document.write('<tr height:10px ><td colspan=8 ></td></tr><tr><td class="txbld1" colspan=5 style="padding-left:20px;font-size:12px;">' + medname + ' ' + Notes + '      ' + Dosage + Daily + Days + ' </td></tr>');
                myWindow.document.write('<tr height:10px ><td colspan=8 ></td></tr><tr><td class="txbld1" colspan=5 style="padding-left:20px;font-size:12px;">' + medname + '    ' + Notes + '      ' + Dosage + '    ' + Days+ ' </td></tr>');

                if (generic != '') {
                   
                   // myWindow.document.write('<tr height:10px ><td colspan=8 ></td></tr><tr><td class="txbld1" colspan=5 style="padding-left:20px;margin-top:-10px;font-size: 8px;">( ' + generic + ' )</td></tr>');
                   
                }

                
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

        myWindow.document.write('<table style="font-family:tahoma;font-size:11px" width=100%><tr style="height:20px"><td colspan=8></td></tr> <tr align=center><td colspan=8> ' + NextDate + '</td></tr><tr ><td colspan=8>&#160;</td></tr>');
       // myWindow.document.write('<tr align=left><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
        myWindow.document.write('</table>');

        if (FL == true) {
            myWindow.document.write('<table style="font-family:tahoma;font-size:11px" width=100%><tr style="height:50px;font-weight:bold"><td>FLASH - You can now avail Tele  Consultation - For details contact 8281887777,04712224545 .</td></tr></table>');
        }



       // myWindow.print();
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