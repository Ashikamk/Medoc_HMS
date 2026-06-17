



    $(document).ready(function () {

        $('#MainItemName').focus();
        $('#MainItemName').select();


        $("#btnnewLink").click(function (e) {
            
            RefreshNew();
            console.log();
        });

        $("#btnsubmitLink").click(function (e) {


            var UId = ERPUserId;
            var DeptId = ERPDeptId;
            rowcount = CountRows();

            if ($('#MainItemName').val() == "") {
                warningshow('Please Select Product To be Linked With', 'MainItemName');
                return false;
            }
            else if (rowcount == 0) {
                warningshow('No Products Linked', '');
                return false;
            }
            else {
           
                $('#btnsubmitLink').prop("disabled", true);

                var MainProdId = $('#MainProdId').val();

                var oArray = new Array();
                DelFlag = 1;


                for (var k = 1; k < $('#rowcount').val() ; k++) {

              
                    var LinkedProdId = $('#dstProdId' + k).val();
                  
                    if (LinkedProdId != undefined) {
                        oArray.push({
                            'MainProdId': MainProdId,
                            'LinkedProdId': LinkedProdId,
                            'UId': UId,
                            'DeptId': DeptId,
                            'DelFlag': DelFlag
                        })
                    }
                }

                console.log(oArray)

                if (oArray != "") {

                    var data = { 'ProductLinkModel': oArray };
                    $.ajax({
                        type: "POST",
                        url: "../../AlternateItemLinking/LinkProductInsert",
                        data: data,
                        success: function (result) {
                            for (var i = 0; i <= result.oList.length; i++) {
                                var status = result.oList[i].Status;
                                $('#btnsubmitLink').prop("disabled", false);
                                if (status != 0) {
                                    swal('SavedSuccessfully', "", "success");
                                    // $('.swal-button swal-button--confirm').focus();
                                    RefreshNew();
                                  
                                 

                                }
                                else {

                                    swal("OOPS");
                                    $('.swal-button swal-button--info').focus();
                                    RefreshNew();
                                   
                                }

                            }
                            $('#MainItemName').focus();
                        }
                    });
                }
            }
        });

    });
 
function Defaultfocus()
{
    $('#MainItemName').focus();
}
function RefreshNew() {

    var UId = ERPUserId;
    var DeptId = ERPDeptId;

    $('#MainItemName').val('');

    $('#txtS_ItemCode').val('');
    $('#txtS_ItemDesc').val('');

    $('#MainProdId').val('');
        
    $('#SubProdId').val('');
    $('#rowcount').val(1);
    $('#tblProductAdd tr').remove();
    $("#btnsubmitLink").html('SAVE');
     

    $('#MainItemName').focus();
        



}
$(document).ready(function () {

    $('#MainItemName').focus();
    $('#MainItemName').select();


    $("#MainItemName").autocomplete({
        
        delay: 0,
        minLength: 0,
        source: function (request, response) {

              
            var data = {};
            data.ItemCode = $("#MainItemName").val();
            
            $.ajax({
                url: '../Purchase/ProductSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'THREE',
                            label: item.Description,
                            label1: item.ItemCode,
                            label2: item.ItemId,
                              
                            headers: ["Item_Name", "Code"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#MainItemName').val(ui.item.Description);
            $('#MainProdId').val(ui.item.label2);
              
                
            var data = {};
            data.MainProdId = $("#MainProdId").val();
            $.ajax({
                type: "POST",
                url: "../AlternateItemLinking/GetCopyOfLinkedProd",
                data: data,
                success: function (result) {
                    if (result.length != 0) {
                        ShowCopyDetails(result.oList);
                    }
                }
            });
            $('#txtS_ItemCode').focus();
            $('#txtS_ItemCode').select();
        },
    });

    $("#txtS_ItemCode").autocomplete({

        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.ItemCode = $("#txtS_ItemCode").val();

            $.ajax({
                url: '../Purchase/ProductSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'THREE',
                            label: item.Description,
                            label1: item.ItemCode,
                            label2: item.ItemId,

                            headers: ["Item_Name", "Code"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {

            $('#txtS_ItemDesc').val(ui.item.label1);
            $('#txtS_ItemCode').val(ui.item.label);
            $('#SubProdId').val(ui.item.label2);
            $('#txtS_ItemDesc').focus();
            $('#txtS_ItemDesc').select();

        },
    });

    $('#txtS_ItemDesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnaddPro').focus();
            $('#btnaddPro').select();
            Productadd();

        }
    });


    function Productadd() {


        var table = document.getElementById("tblProductAdd");
        var rows = table.getElementsByTagName("tr")
        var i = rows.length;

        var ProductFlag = 0;

        if (i != 0) {

            for (p = 1; p <= i; p++) {
                if ($('#txtprd' + p).val() == $("#txtS_ItemCode").val()) {
                    ProductFlag = 1;
                }
            }

        }


        
        if ($.trim($('#txtS_ItemCode').val()) == "") {
            warningshow('Please Select Product To Be Linked', 'txtS_ItemCode');
            return false;
        }
        else if ($('#txtS_ItemDesc').val() == "") {
            warningshow('Product Not Have Code', 'txtS_ItemDesc');
            return false;
        }
        else {

            if (ProductFlag == 1) {
                var Res = confirm('Product Already Liked! Do You Want to Continue');
                $("#txtS_ItemCode").val('');
                $("#txtS_ItemDesc").val('');
                $("#txtS_ItemCode").focus();
                return false;
            }




            var slno = parseInt($('#rowcount').val());

           
            var serialNo = i + 1;




           



            var ProdRowEdit = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:61px;text-align:center >"
             + serialNo + "</td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:220px;text-align:center' > <input typ='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
             + $("#txtS_ItemCode").val() + "'></td><td  style='display:none;'> <input type='hidden' id='dstProdId" + slno + "' value='"
             + $("#SubProdId").val() + "'></td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:140px;text-align:center' display='none;'> <input type='text' class='form-control'  disabled  style='background-color:white;height:30px;'  onkeypress='isNumbercheck(event,this)' id='txtdesc" + slno + "' value='"
             + $("#txtS_ItemDesc").val() + "'> </td> <td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 95px; ><input class= 'jsgrid-button jsgrid-delete-button'  type= button id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td></tr>";


      

            $('#tblProductAdd').append(ProdRowEdit);

            ClearProductRow();

            slno += 1;

            $('#rowcount').val(parseInt(slno));


            $('#proddiv').animate({ scrollTop: 5000 }, 900);

            $("#txtS_ItemCode").focus();

            $('#txtS_ItemCode').val('');


        }



    }


    function ClearProductRow() {

        $('#txtS_ItemCode').val('');
        $('#txtS_ItemDesc').val('');
        $('#txtS_ItemCode').focus();
    }

    function ShowCopyDetails(result) {


        if (result.length > 0) {
            $('#rowcount').val(parseInt(result.length) + 1);
        }


        var serialNo = 1;
        var slno = 1;
        $('#tblProductAdd tr').remove();

        for (var i = 0; i < result.length; i++) {

            var UId = result[i].UId;
            var DeptId = result[i].DeptId;
            var ProdRowEdit = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td  id=" + 'td' + slno + " class= jsgrid-cell  style= width:75px;text-align:center >"
                         + serialNo + "</td><td class= 'jsgrid-cell jsgrid-align-left'  style='width:275px;text-align:center' > <input type='text' class='form-control' disabled=disabled  style='background-color:white;height:30px;' id='txtprd" + slno + "' value='"
                         + result[i].LinkedProdDescr + "'></td><td  style='display:none;'> <input type='hidden' id='dstProdId" + slno + "' value='"
                         + result[i].LinkedProdId + "'></td> <td class= 'jsgrid-cell jsgrid-align-left'  style='width:275px;text-align:center' display='none;'> <input type='text' class='form-control'  disabled  style='background-color:white;height:30px;'  onkeypress='isNumbercheck(event,this)' id='txtdesc" + slno + "' value='"
                         + result[i].LinkedItemCode + "'> </td> <td id='Edit" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 95px; ><input class= 'jsgrid-button jsgrid-delete-button'  type= button id='delete' title= Delete onclick='rowdelete(" + slno + ")' ></td></tr>";




            console.log(ProdRowEdit);


            $('#tblProductAdd').append(ProdRowEdit);


            console.log(ProdRowEdit);
            serialNo += 1;
            slno += 1;
            $("#txtS_ItemCode").focus();


            //  $("#btnsubmit").html('UPDATE');;
        }

    }

});



function rowdelete(RowId) {

    var sllno = 1;
    var table = document.getElementById("tblProductAdd");
    var rows = table.getElementsByTagName("tr")
    var i = rows.length;

    var rowslno = parseInt(sllno);
    $('#row' + RowId).remove();
    for (var j = 1; j <= i ; j++) {
        if ($('#txtprd' + j).val() != undefined) {
            $('#td' + j).text(sllno);
            sllno++;
        }
    }
    ClearProductRow();
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
function CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblProductAdd");
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++; $('.form-control').pro
        } $('.form-control').pro
    }
    var message = "Total Row Count: " + totalRowCount;
    message += "\nRow Count: " + rowCount;
    return rowCount;
}
