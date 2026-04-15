var AccId = 2;
$(document).ready(function () {


    Defaultfocus();

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)

    });
});


function addaccessories() {

    $('#Accessdiv').append("<div class='form-group row'> <div class=col-md-2>  <select onchange=rowamoutcalcul(" + AccId + ")   id='accstaus" + AccId + "'  class=form-control ><option value=LAB>LAB TEST</option></select></div><div class='col-md-4'><input type='hidden' class='form-control' id='Accsessories_" + AccId + "_Id' value='0' /><input type='text' class='form-control' id='Accsessories_" + AccId + "' onkeypress=AccessoriesLoad('Accsessories_" + AccId + "') onkeyup=CheckID('Accsessories_" + AccId + "') /></div> <div class='col-md-2'><input type='text' class='form-control' value=1  onkeyup=rowamoutcalcul(" + AccId + ")  id='Accsessoriesqty_" + AccId + "'  onkeypress='isNumberFloatCommon123123(event,this)' /></div><div class=col-md-2><input type=text class=form-control id='Accrate" + AccId + "'  onkeyup=rowamoutcalcul(" + AccId + ") onkeypress=isNumberFloatCommon123(event,this) /></div><div class=col-md-2><input type=text class=form-control  onkeyup=rowamoutcalcul(" + AccId + ")  id='Acctot" + AccId + "' disabled onkeypress=isNumberFloatCommon123(event,this) /></div></div>")
    AccId++;
    rowamoutcalcul(0)
}



function rowamoutcalcul(Id)
{
   
    debugger;
    var IncQty = 0, incamount = 0, SrQty = 0, Sramount = 0, OrQty = 0; Oramount = 0;

    var IQty = parseFloat($('#Accsessoriesqty_' + Id).val() || 0).toFixed(4);
    var IRate = parseFloat($('#Accrate' + Id).val() || 0).toFixed(4);
    var TOTIncamt = parseFloat(IQty * IRate).toFixed(4);   
   

    if ($('#accstaus' + Id).val() == 'OR')
    {
        $("#Acctot" + Id).removeAttr("disabled");
        var At = parseFloat($('#Acctot' + Id).val() || 0)
        var Qt = parseFloat($('#Accsessoriesqty_' + Id).val() || 1)
        $('#Accrate' + Id).val(At / Qt)

    }
    else
    {
        $("#Acctot" + Id).attr("disabled", "disabled");
        $('#Acctot' + Id).val(TOTIncamt);

    }
    //alert(AccId)
    for (var i = 1; i <= AccId; i++) {
        var flag = $('#accstaus' + i).val();
        if(flag=='INC')
        {
            IncQty = (parseFloat(IncQty) + parseFloat($('#Accsessoriesqty_' + i).val() || 0)).toFixed(4);
            incamount = (parseFloat(incamount)+ parseFloat($('#Acctot' + i).val() || 0)).toFixed(4);
           // console.log(incamount)
            console.log(IncQty)
        }
        else if (flag == 'SR') {
            SrQty = (parseFloat(SrQty) + parseFloat($('#Accsessoriesqty_' + i).val() || 0)).toFixed(4);
            Sramount = (parseFloat(Sramount)+  parseFloat($('#Acctot' + i).val() || 0)).toFixed(4);
        }
        else if (flag == 'OR') {
            OrQty = (parseFloat(OrQty) + parseFloat($('#Accsessoriesqty_' + i).val() || 0)).toFixed(4);
            Oramount =( parseFloat(Oramount)+ parseFloat($('#Acctot' + i).val() || 0)).toFixed(4);
        }
    }
    $('#inqty').val(IncQty);
    $('#inamt').val(incamount)
    $('#oamt').val(Oramount);
    $('#oqty').val(OrQty);
    $('#srqty').val(SrQty);
    $('#sramt').val(Sramount)
    setTimeout(function () {
        amountcalcul();
    }, 500);
    
}

function amountcalcul()
{

    var IA = parseFloat($('#inamt').val() || 0);
    var SA = parseFloat($('#sramt').val() || 0);
    var OA = parseFloat($('#oamt').val() || 0);
    var SV = parseFloat($('#srvariance').val() || 0);
    var QA = parseFloat(IA + SA + OA + SV).toFixed(2);
    $('#gamt,#namt').val(QA)

    var IQ= parseFloat( $('#inqty').val()||0);    
    var SQ= parseFloat($('#srqty').val()||0);   
    var OQ = parseFloat($('#oqty').val() || 0);
    var QQ = parseInt(IQ + SQ + OQ);  
    $('#gqty').val(QQ)
    var PL = parseFloat($('#plose').val() || 0)
    var QQ = parseInt((IQ + SQ + OQ) - PL);
    $('#nqty').val(QQ)


    $('#Lorate').val(parseFloat( QA / QQ).toFixed(2));
      
}




function AccessoriesLoad(Id) {
    $("#" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.TestName = $("#" + Id).val();
            data.DeptId = ERPDeptId;

            $.ajax({
                url: '../Revisit/HMS_TestSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'TWOLab',
                            label: item.TestName,
                            label1: item.MedDeptName,
                            TestId: item.TestId,
                            Rate: item.Rate,
                            SpRate: item.SpRate,
                            VSpRate: item.VSpRate,
                            OutsideRate: item.OutsideRate,
                            MedDept: item.MedDept,
                            headers: ["Test", "DeptName"]

                        })
                    }));
                }

            })

        },
        autoFocus: true,
        select: function (event, ui) {            
          
           

            $('#' + Id + '_Id').val(ui.item.TestId);            
            $('#Accsessoriesqty_' + (Id.substring(13, 20))).val(1);
            $('#Accrate' + (Id.substring(13, 20))).val(ui.item.SpRate);
            rowamoutcalcul(Id.substring(13, 20))

            if (Id == 'ItemName') {
                $('#Accsessories_1').focus();
                var dataX = {};
                dataX.ItemId = ui.item.TestId;
                $.ajax({
                    type: "POST",
                    url: "../ProductMstElectroniccs/AccessoriesGetandGets",
                    data: dataX,
                    success: function (result) {
                        AccId = 2;
                        $('#Accsessories_1').val('');
                        $('#Accsessories_1_Id').val(0);
                        $('#Accessdiv').empty();
                        Showaccessories(result.oList);
                    }
                });
                $('#Accsessoriesqty_' + (Id.substring(13, 20))).focus();
                rowamoutcalcul(Id.substring(13, 20))
            }
            else
            {
               
            }
        },
    });
}

function CheckID(Id) {
    if ($('#' + Id).val() == '') {
        $('#' + Id + '_Id').val(0);
    }
}


function SaveAndUpdate(Flag) {
    if ($('#ItemName_Id').val() == 0) {
        warningshow('Please Select Product', 'ItemName');
    }
    else {
        var XArray = new Array();
        

        for (var i = 1; i <= AccId ; i++) {

            var ItemId = $('#ItemName_Id').val();
            var AccessQty = $('#Accrate' + i).val();
            var AccFlag = $('#accstaus' + i).val();
            var AccRate =parseFloat( $('#Accrate' + i).val()||0);
            var Acceamount = parseFloat( $('#Acctot' + i).val()||0);
            var AccessoriesId = $('#Accsessories_' + i + '_Id').val();

            var SRVariance = parseFloat($('#srvariance').val() || 0);
            var Productionloss = parseFloat($('#plose').val() || 0);
            var NetQty = parseFloat($('#nqty').val() || 0);
            var NetAmount = parseFloat($('#namt').val() || 0);

            

            if (AccessoriesId != undefined && AccessoriesId != 0 && AccessoriesId != '') {
                XArray.push({'SRVariance':SRVariance,'Productionloss':Productionloss,'NetQty':NetQty,'NetAmount':NetAmount, 'AccessoriesId': AccessoriesId, 'AccessQty': AccessQty, 'ItemId': ItemId, 'Status': AccFlag, 'UnitPrice': AccRate, 'MRP': Acceamount })
            }
        }

        console.log(XArray)
        if (XArray != "") {
            var data = { 'ProductMstModel': XArray };
            $.ajax(
        {
            type: "POST",
            url: "../ProductMstElectroniccs/AccessoriesUpdate",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                Showalerts(status);
            }
        });
        }
    }
}

function formrefresh() {
    AccId = 2;
    $('#Accsessories_1').val('');
    $('#Accsessories_1_Id').val(0);
    $('#ItemName_Id').val(0);
    $('#ItemName').val('')
    $('#Accessdiv').empty();
    $('#accstaus1').val('LAB');
    $('#Accsessoriesqty_1').val();
    $('#Accrate1').val(0);
    $('#Acctot1').val(0);
    var IncQty = 0, incamount = 0, SrQty = 0, Sramount = 0, OrQty = 0; Oramount = 0;
    $('#inqty').val(IncQty);
    $('#inamt').val(incamount)
    $('#oamt').val(Oramount);
    $('#oqty').val(OrQty);
    $('#srqty').val(SrQty);
    $('#sramt').val(Sramount)
    $('#srvariance').val(0)
    $('#plose').val(0)
    amountcalcul()

    Defaultfocus();

}
function Defaultfocus() {
    $('#ItemName').focus();
}


function Showaccessories(result) {

    console.log(result)
    if (result.length >= 1) {
        $('#Accsessories_1').val(result[0].AccessoriesName);
        $('#Accsessories_1_Id').val(result[0].AccessoriesId);
        $('#Accsessoriesqty_1').val(1);

        $('#accstaus1').val('LAB');
        $('#Accrate1').val(result[0].AccessQty);
        $('#Acctot1').val(result[0].AccessQty);


       // $('#plose').val(result[0].Productionloss);
        //$('#srvariance').val(result[0].SRVariance);
        




    }
    for (var i = 1; i < result.length; i++) {
         
        $('#Accessdiv').append("<div class='form-group row'><div class=col-md-2>  <select onchange=rowamoutcalcul(" + AccId + ")  id='accstaus" + AccId + "'  class=form-control ><option value=LAB>LAB TEST </option></select></div><div class='col-md-4'><input type='hidden' class='form-control' id='Accsessories_" + AccId + "_Id' value='" + result[i].AccessoriesId + "' />                               <input type='text' class='form-control' id='Accsessories_" + AccId + "' onkeypress=AccessoriesLoad('Accsessories_" + AccId + "') onkeyup=CheckID('Accsessories_" + AccId + "') value='" + result[i].AccessoriesName + "' /></div> <div class='col-md-2'><input type='text' class='form-control'  id='Accsessoriesqty_" + AccId + "'  onkeyup=rowamoutcalcul(" + AccId + ")   onkeypress='isNumberFloatCommon123(event,this)' value='1' /></div> <div class=col-md-2><input type=text class=form-control  onkeyup=rowamoutcalcul(" + AccId + ")   id='Accrate" + AccId + "'   value='" + result[i].AccessQty + "' onkeypress=isNumberFloatCommon123(event,this) /></div><div class=col-md-2><input type=text class=form-control disabled  id='Acctot" + AccId + "' onkeyup=rowamoutcalcul(" + AccId + ")   value='" + result[i].AccessQty + "' onkeypress=isNumberFloatCommon123(event,this) /></div></div>")
        $('#accstaus' + AccId).val('LAB');
        AccId++;
        //ddh

    }
    //console.log(AccId)
    rowamoutcalcul(AccId)
    //AccId = AccId + 1;
}


function isNumberFloatCommon123123(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }

    return true;

}