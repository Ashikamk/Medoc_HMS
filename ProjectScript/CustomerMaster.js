function AccountLoad(result) {    
    $("#select_acnt").empty();
    $("#select_acnt").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_acnt").append("<option value='" + result[i].AcntId + "' name='" + result[i].AcntSlno + "'>" + result[i].AcntDescription + ' - ' + result[i].AcntCode + "</option>");
    }
    if (result.length == 0) {       
        $("#addacnttype").show();
    }
    else
    {
        $("#addacnttype").hide();
        Defaultfocus();
    }   
}

function CurrencyLoad(result) {
    $("#select_crncy").empty();
    $("#select_crncy").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_crncy").append("<option value='" + result[i].Id + "'>" + result[i].CurrencyName + "</option>");
    }
}

function PriceLoad(result) {
    $("#select_price").empty();
    $("#select_price").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_price").append("<option value='" + result[i].MultiPriceId + "'>" + result[i].PriceType + "</option>");
    }
}
function SalesmanLoad(result) {
    $("#select_sales").empty();
    $("#select_sales").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_sales").append("<option value='" + result[i].Id + "'>" + result[i].FirstName + "</option>");
    }
}


function TermsLoad(result) {
    $("#select_terms").empty();
    $("#select_terms").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_terms").append("<option value='" + result[i].TermsId + "' name='" + result[i].Terms + "'>" + result[i].TermsDescription + "</option>");
    }
  
}

function AreaLoad(result) {
    $("#select_place").empty();
    $("#select_place").append("<option value='0'>-Select-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_place").append("<option value='" + result[i].AreaId + "'>" + result[i].AreaName + "</option>");
    }
}

$(document).ready(function () {

    accounttypeload();


   
    $('#txtcustphone').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtadr1').focus();

        }

    });
    $('#txtcntry').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();

        }

    });
    $('#tab2').click(function () {
        $('#txtcn1').focus();
    })

  
   
    var data = {};
    data.AreaId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            AreaLoad(result.oList);
        }
    });

    var data = {};
    data.TermsId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TermsGetandGets",
        data: data,
        success: function (result) {
            TermsLoad(result.oList);
        }
    });


     
        var data6 = {};
        data6.Id = 0;
        $.ajax({
            type: "POST",
            url: "../Master/SalesmanGetandGets",
            data: data6,
            success: function (result) {
                SalesmanLoad(result.oList);


            }
        });

        $("#select_adrs").change(function () {           
            if ($(this).is(':checked')) {
                $('#txtadr2').attr('readonly', true); 
                $('#txtcity').attr('readonly', true);
                $('#txtstate1').attr('readonly', true);
                $('#txtpin1').attr('readonly', true);
                $('#txtcntry1').attr('readonly', true);
                checkauto();

            } else {
                $('#txtadr2').removeAttr('readonly');
                $('#txtcity').removeAttr('readonly');
                $('#txtstate1').removeAttr('readonly');
                $('#txtpin1').removeAttr('readonly');
                $('#txtcntry1').removeAttr('readonly');

                $('#txtadr2').val('');
                $('#txtcity').val('');
                $('#txtstate1').val('');
                $('#txtpin1').val('');
                $('#txtcntry1').val('');

            }
        });

        $("#select_acnt").change(function () {

            if ($('#select_acnt').val() == 0) {
                $("#txtacnt").val('');
                $('#txtacnt1').val('');
            }
            else {
                var AccSlno = $(this).find("option:selected").attr("name")
                var Prefix = ["", "0", "00", "000"];
                var i = 4 - AccSlno.length
                if (i < 4) { Pre = Prefix[i] } else { Pre = ''; }
                $("#txtacnt").val(Pre + AccSlno)
                var Res = $("#select_acnt option:selected").text().substring($("#select_acnt option:selected").text().length - 4, 100)
                $('#txtacnt1').val(Res);
                $('#txtacnt').focus();
                $('#txtacnt').select();
            }
           
        });
        $("#select_terms").change(function () {
            $('#txtduedays').val($('#select_terms').find("option:selected").attr("name"));
        });

        $("#flip").click(function () {           
            $("#panel").slideToggle("fast");
            $("#panel1").slideToggle("fast");
            $("#panel2").slideToggle("fast");
            $("#panel3").slideToggle("fast");
            $("#panel4").hide();
            $("#panel5").hide();
            $('#txtadr1').focus();           
        });

        $("#flip1").click(function () {           
            $("#panel4").slideToggle("fast");
            $("#panel").hide();
            $("#panel1").hide();
            $("#panel2").hide();
            $("#panel3").hide();
            $("#panel5").hide();
            $('#txtnotes').focus();
        });

        $("#flip2").click(function () {
            $("#panel5").slideToggle("fast");
            $("#panel").hide();
            $("#panel1").hide();
            $("#panel2").hide();
            $("#panel3").hide();
            $("#panel4").hide();           
        });

        var data2 = {};
        data2.Id = 0;
        $.ajax({
            type: "POST",
            url: "../Master/CurrencyGetandGets",
            data: data2,
            success: function (result) {
                CurrencyLoad(result.oList);


            }
        });


        var data1 = {};
        data1.MultiPriceId = 0;
        $.ajax({
            type: "POST",
            url: "../Master/MultiPriceGetandGets",
            data: data1,
            success: function (result) {
                PriceLoad(result.oList);


            }
        });


        
        $("#btnsubmit").click(function (e) {
            if ($('#txtemail').val() != "") {
                var Email = $('#txtemail').val();
                var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
                if (!re.test(Email)) {
                    warningshow('Invalid Email ID', 'txtemail')
                    return false
                }
            }
            if ($('#txtcustemail').val() != "") {
                var Email = $('#txtcustemail').val();
                var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
                if (!re.test(Email)) {
                    warningshow('Invalid Email ID', 'txtcustemail')
                    return false
                }
            }
            
            SaveAndUpdate(1)
        });

      

        $('#select_terms').keypress(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#txtduedays').focus();
                e.preventDefault();
            }
        });

        $('#select_sales').keypress(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#select_price').focus();
                e.preventDefault();
            }
        });

        $('#select_price').keypress(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#select_crncy').focus();
                e.preventDefault();
            }
        });

        $('#select_crncy').keypress(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#btnsubmit').focus();
                e.preventDefault();
            }
        });

        $('#select_acnt').keypress(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#txtacnt').focus();
                e.preventDefault();
            }
        });

});//Document Close

function Defaultfocus() {
    $('#select_acnt').focus();
}


function checkauto() {
    if ($('#select_adrs').prop("checked")) {
        $('#txtadr2').val($('#txtadr1').val());
        $('#txtcity').val($('#txtadr3').val());
        $('#txtstate1').val($('#txtstate').val());
        $('#txtcntry1').val($('#txtcntry').val());
        $('#txtpin1').val($('#txtpin').val());
    }
}



  function accounttypeload()
    {
        var data4 = {};
        data4.AcntId = 0;
        data4.UserType = 'C'
        data4.DeptId = ERPDeptId
        $.ajax({
            type: "POST",
            url: "../Master/AcntGetandGets",
            data: data4,
            success: function (result) {
                AccountLoad(result.oList);
            }
        });

    }

  function SaveAndUpdate(Flag) {
  if ($("#select_acnt").val() == 0) {
      warningshow('Please Select Account Type', 'select_acnt');
  }
  else if (($.trim($("#txtacnt").val()) == '') || ($("#txtacnt").val() == 0)) {
      warningshow('Please Enter The Code', 'txtacnt');
      $("#txtacnt").select();
  }
  else if ($.trim($("#txtname").val()) == '') {
  warningshow('Please Enter  Name', 'txtname');
  }
  else if ($("#select_crncy").val() == 0) {
  warningshow('Please Select Currency', 'select_crncy');
  }
  else {
      $('#btnsubmit').prop('disabled', true);
  var s = 0;
  if ($('#select_status').prop("checked"))
  { s = 1; }                                                     
    var data = {};
    data.CustId = $('#CustId').val();
    data.AccountType = $('#select_acnt').val();
    data.CustType = "C";
    data.CustAccount = $('#txtacnt').val();
    data.CustName = $('#txtname').val();
    data.OpenBalance = $('#txtblnc').val();
    data.DueDays = $('#txtduedays').val();
    data.CreditLimit = $('#txtcredit').val();
    data.CustTermsId = $('#select_terms').val();
    data.TRNNumber = $('#txttrn').val();
    data.SalesManId = $('#select_sales').val();
    data.PriceGroupId = $('#select_price').val();
    data.CurrencyId = $('#select_crncy').val(); 
    data.CustStatusId = s;
    data.CustStreet1 = $('#txtadr1').val();
    data.CustStreet2 = $('#txtadr2').val();
    data.CustCity1 = $('#txtadr3').val();
    data.CustCity2 = $('#txtcity').val();
    data.CustState1 = $('#txtstate').val();
    data.CustState2 = $('#txtstate1').val();
    data.CustPin1 = $('#txtpin').val();
    data.CustPin2 = $('#txtpin1').val();
    data.CustCountry1 = $('#txtcntry').val();
    data.CustCountry2 = $('#txtcntry1').val();
    data.CustNotes = $('#txtnotes').val();
    data.CustAddress1 = $('#txtadr1').val();
    data.CustAddress2 = $('#txtadr2').val();
    data.CustAddress3 = $('#txtadr3').val();
    data.CustContactNo = $('#txtcontact').val();
    data.CustEmail = $('#txtemail').val();
    data.CustContactName1 = $('#txtcn1').val();
    data.CustContactNo1 = $('#txtcno1').val();
    data.CustContactName2 = $('#txtcn2').val();
    data.CustContactNo2 = $('#txtcno2').val();
    data.CustContactName3 = $('#txtcn3').val();
    data.CustContactNo3 = $('#txtcno3').val();
    data.DelFlag = Flag;
    data.AreaId = $('#select_place').val();
    data.EmailId = $('#txtemail').val();
    data.CustEmailId = $('#txtcustemail').val(); 
    data.MapId = $('#MapId').val(); 
    data.PhoneNumber = $('#txtcustphone').val();
    data.UserId = ERPUserId;
    data.DeptId = ERPDeptId;
    $.ajax({              
        type: "POST",
        url: "../Master/CustomerInsertandUpdate",
        data: data,
        success: function (result) {
          
                var status = result.oList[0].Status;
                var CustId = result.oList[0].CustId;

                if (status == 1)
                {
                    accounttypeload();

                }
                if (status == 1 || status == 2) {
                    fnImageSave(CustId);
                }
                $('#btnsubmit').prop('disabled', false);
                Showalerts(status);
               
        }
    });

}
}


   

    function formrefresh() {
        $('#txtacnt').prop("disabled", false);
        $('#select_acnt').prop("disabled", false);


        $('#select_status').prop("checked", true);
        $('#select_adrs').prop("checked", true);
        $('#txtemail').val('');
        $('#txtcustemail').val('');
        $('#select_acnt').val('0');
        $('#select_terms').val('0');
        $('#select_sales').val('0');
        $('#select_price').val('0');
        $('#select_place').val('0'); 
        $('#select_crncy').val('0');
        $('#select_status').val('0');
        $('#txtacnt').val('');
        $('#txtnotes').val('');
        $('#txtacnt1').val('');
        $('#txtname').val('');
        $('#txtblnc').val('');
        $('#txtduedays').val('');
        $('#txtcredit').val('');
        $('#txttrn').val('');          
        $('#txtcn1').val('');
        $('#txtcno1').val('');
        $('#txtcn2').val('');
        $('#txtcno2').val('');
        $('#txtcn3').val('');
        $('#txtcno3').val('');
        $('#txtadr1').val('');
        $('#txtadr3').val('');
        $('#txtstate1').val('');
        $('#txtpin1').val('');
        $('#txtcntry1').val('');
        $('#txtadr2').val('');
        $('#txtcity').val('');
        $('#txtstate').val('');
        $('#txtpin').val('');
        $('#txtcntry').val('');
        $('#txtcustphone').val('');
        $('#txtacnt').focus();
        $('#CustId').val(0);
        $('#btndelete').hide();
        $('#myImg').attr('src', "../app-assets/img/portrait/small/avatar-s-12.png");
        $('#selectedImage').val('');
        $('#txtadr2').attr('readonly', true);
        $('#txtcity').attr('readonly', true);
        $('#txtstate1').attr('readonly', true);
        $('#txtpin1').attr('readonly', true);
        $('#txtcntry1').attr('readonly', true);
        $("#tab1").click();
    }

    function closetable(value) {
        $('#Entry').show();
        $('#listing').hide();
        if (value == 1)
            formrefresh();
    }

    function ShowCustomerlist(result) {
        disable_datatable('tblcustomer');
        $('#Entry').hide();
        $('#listing').show();
        var responseText = "<thead><tr><th width=1%>Sl#</th><th width=20%>Customer Name</th><th width=10%>Open Balance</th><th width=10%>Due Days</th><th width=10%>Credit Limit</th><th width=20%>SalesMan</th><th width=5%>Currency</th><th width=3%>Edit</th></tr></thead><tbody>";
        for (var i = 0; i < result.length; i++) {
            var slno = parseInt(i + 1);
            responseText += '<tr><td style=width:50px>' + slno + '</td><td style=width:50px>' + result[i].CustName + '</td><td style=width:50px align=right>' + parseFloat(result[i].OpenBalance).toFixed(Decimal) + '</td><td style=width:50px>' + result[i].DueDays + '</td><td style=width:50px>' +  parseFloat(result[i].CreditLimit).toFixed(Decimal) + '</td><td style=width:50px>' + result[i].SalesMan + '</td><td style=width:50px>' + result[i].CurrencyType + '</td><td align=center><a onclick="GetRows(' + result[i].CustId + ')">' + Editbutton + '</a></td></tr>';
        }
        $('#tblcustomer').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Customer Name</th><th> </th><th> </th><th> </th><th>SalesMan</th><th>Currency</th><th>Edit</th></tr> </tfoot>');
        datatableWithsearch1('tblcustomer');
    }
    function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {
        var a = '#' + tablename + ' tfoot th'
        $(a).each(function () {
            var title = $(this).text();
            if (title != 'Edit' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'Open Balance' && title != ' ')
                $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
            if (title == 'Customer Name'  || title == 'SalesMan' || title == 'Currency' )
                $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        });
        

            // AddColumnSelectionButton(tableButtonContainerId, tablename)

            table = $('#' + tablename).DataTable({
                dom: 'Blfrtip',
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
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: [0, 1, 2, 3,4,5,6] }
                        },
                        {
                            extend: 'pdfHtml5',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: [0, 1, 2, 3,4,5,6] }
                        },
                        {
                            extend: 'print',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: [0, 1, 2, 3,4,5,6] }
                        }
                    ]
                },
               // 'colvis'
                ]
            });
            table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
            $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
        //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
            //    var column = table.column($(this).attr('data-em-col'));
            //    console.log($(this).attr('data-em-col'));
            //    console.log(column);
            //    column.visible($(this).prop("checked"));
            //});
       
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
    }
    function closelist() {
        $('#Entry').show();
        $('#listing').hide();
        formrefresh();
    }

    function ShowCustomerGet(result) {
        $('#txtname').focus();
        $('#txtacnt').prop("disabled", true);
        $('#select_acnt').prop("disabled", true);       
        $('#txtacnt1').val('');        
        for (var i = 0; i < result.length; i++) {
            if (result[i].CustStatusId == 0) {

                $('#select_status').prop("checked", false);
            }
            else {
                $('#select_status').prop("checked", true);
            }
            $('#txtemail').val(result[i].EmailId);
            $('#txtcustemail').val(result[i].CustEmailId);
            $('#select_acnt').val(result[i].AccountType);
            $('#txtacnt').val(result[i].CustAccount);
            $('#txtname').val(result[i].CustName);
            $('#txtblnc').val(result[i].OpenBalance);
            $('#txtduedays').val(result[i].DueDays);
            $('#txtcredit').val(result[i].CreditLimit);
            $('#select_terms').val(result[i].CustTermsId);
            $('#txttrn').val(result[i].TRNNumber);
            $('#select_sales').val(result[i].SalesmanId);
            $('#select_price').val(result[i].PriceGroupId);
            $('#select_place').val(result[i].AreaId);
            $('#select_crncy').val(result[i].CurrencyId);
            $('#select_status').val(result[i].CustStatusId);

            $('#txtadr1').val(result[i].CustStreet1);
            $('#txtadr2').val(result[i].CustStreet2);
            $('#txtadr3').val(result[i].CustCity1);
            $('#txtcity').val(result[i].CustCity2);
            $('#txtstate').val(result[i].CustState1);
            $('#txtstate1').val(result[i].CustState2);
            $('#txtpin').val(result[i].CustPin1);
            $('#txtpin1').val(result[i].CustPin2);
            $('#txtcntry').val(result[i].CustCountry1);
            $('#txtcntry1').val(result[i].CustCountry2);
            $('#txtnotes').val(result[i].CustNotes);

            $('#txtcn1').val(result[i].CustContactName1);
            $('#txtcno1').val(result[i].CustContactNo1);
            $('#txtcn2').val(result[i].CustContactName2);
            $('#txtcno2').val(result[i].CustContactNo2);
            $('#txtcn3').val(result[i].CustContactName3);
            $('#txtcno3').val(result[i].CustContactNo3);
            $('#txtcustphone').val(result[i].PhoneNumber);
      
            $('#myImg').attr('src', "../ProjectImages/Customer/" + result[i].CustId + ".png");
            $('#MapId').val(result[i].MapId);

            $('#txtacnt').focus();
        }
        $('#Entry').show();
        $('#listing').hide();
        $('#btndelete').show();
        $('#txtname').focus();

    }


    function GetRows(CustId) {
        $('#CustId').val(CustId)
        var data = {};
        data.CustId = CustId;
        data.cstyp = 0;
        $.ajax({
            type: "POST",
            url: "../Master/CustomerGetandGets",
            data: data,
            success: function (result) {             
                if (CustId == 0)
                    ShowCustomerlist(result.oList);
                else               
                    ShowCustomerGet(result.oList);                                

            }
        });

    }


    function fnImageSave(imageName) {

        var formData = new FormData();
        var totalFiles = document.getElementById("selectedImage").files.length;
        var browsedFile = document.getElementById("selectedImage").files[0];
        var ImageId = "0";
        if ((imageName != "" && totalFiles != 0)) {

            if (browsedFile.type.match('image.*')) {
                formData.append("FileUpload", browsedFile);
                formData.append("ImageName", imageName);
                formData.append("UniqueId", ImageId);
                $.ajax({
                    type: "POST",
                    url: '/Master/UploadCustomerImage',
                    data: formData,
                    dataType: "html",
                    contentType: false,
                    processData: false,
                    success: function (result) {

                    }
                });
            }
        }
        else {
            return;
        }
    }


    $(function () {
        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });



    function imageIsLoaded(e) {
        $('#myImg').attr('src', e.target.result);
    }



