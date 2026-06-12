var AccId = 2;
$(document).ready(function () {

    CategoryPageLoad();
    Defaultfocus();

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)

    });
});
function CategoryPageLoad() {
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
}


function CategoryLoad(result) {
    $("#category").empty();
    $("#category").append("<option value='0'>---Select Category---</option>");
    for (var i = 0; i < result.length; i++) {

        $("#category").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
    $("#cat").empty();
    $("#cat").append("<option value='0'>---Select Category---</option>");
    for (var i = 0; i < result.length; i++) {

        $("#cat").append("<option value='" + result[i].CategoryId + "'>" + result[i].CategoryName + "</option>");
    }
}

function addaccessories() {

    $('#Accessdiv').append("<div class='form-group row'><div class='col-md-3'><input type='hidden' class='form-control' id='Accsessories_" + AccId + "_Id' value='0' /><input type='text' class='form-control' id='Accsessories_" + AccId + "' onkeypress=AccessoriesLoad('Accsessories_" + AccId + "') onkeyup=CheckID('Accsessories_" + AccId + "') /></div></div>")
    AccId++;
}

function AccessoriesLoad(Id) {
    $("#" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            var data = {};
            data.ItemCode = $("#" + Id).val();

            $.ajax({
                url: '../Purchase/ProductSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'TWO',
                            label: item.Description,
                            label1: item.ItemCode,
                            ItemId: item.ItemId,
                            headers: ["Accessories"]
                        })
                    }));
                }

            })

        },
        autoFocus: true,
        select: function (event, ui) {
            $('#' + Id + '_Id').val(ui.item.ItemId);

        },
    });
}

function CheckID(Id) {
    if ($('#' + Id).val() == '') {
        $('#' + Id + '_Id').val(0);
    }
}


function SaveAndUpdate(Flag) {
    if ($('#category').val() == 0) {
        warningshow('Please Select Category', 'category');
    }
    else {
        var XArray = new Array();


        for (var i = 1; i <= AccId ; i++) {

            var CategoryId = $('#category').val();
            var AccessoriesId = $('#Accsessories_' + i + '_Id').val();

            if (AccessoriesId != undefined && AccessoriesId != 0 && AccessoriesId != '') {
                XArray.push({ 'CategoryId': CategoryId, 'AccessoriesId': AccessoriesId })
            }
        }

        if (XArray != "") {
            var data = { 'ProductMstModel': XArray };
            $.ajax(
        {
            type: "POST",
            url: "../ProductMstElectroniccs/CatgeoryAccessoriesSave",
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
    $('#category').val(0);
    $('#Accessdiv').empty();   
    $('#listing').hide();
    $('#Entry').show();
    Defaultfocus();

}
function Defaultfocus() {
    $('#category').focus();
}

function Checkaccessories() {

    var data = {}
    data.CategoryId = $('#category').val();

    $.ajax({
        type: "POST",
        url: "../ProductMstElectroniccs/CatgeoryAccessoriesGet",
        data: data,
        success: function (result) {
            AccId = 2;
            $('#Accsessories_1').val('');
            $('#Accsessories_1_Id').val(0);
            $('#Accessdiv').empty();
            GetAccessories(result.oList);

        }
    });

}

function GetAccessories(result) {
    if (result.length >= 1) {
        $('#Accsessories_1').val(result[0].AccessoriesName);
        $('#Accsessories_1_Id').val(result[0].AccessoriesId);
    }
    for (var i = 1; i < result.length; i++) {
        $('#Accessdiv').append('<div class="form-group row"><div class="col-md-3"><input type="hidden" class="form-control" id="Accsessories_' + AccId + '_Id" value="' + result[i].AccessoriesId + '"/><input type="text" class="form-control" id="Accsessories_' + AccId + '" onkeypress=AccessoriesLoad("Accsessories_' + AccId + '") onkeyup=CheckID("Accsessories_' + AccId + '") value="' + result[i].AccessoriesName + '" /></div></div>')
        AccId++;

    }
}

function GetRows(Flag) {
    if (Flag == 0) {
        formrefresh();
        var data = {}
        $.ajax({
            type: "POST",
            url: "../ProductMstElectroniccs/CategoryAccessoriesMappingList",
            data: data,
            success: function (result) {                
                ShowMappinglist(result.oList);
            }
        });
    }
    else {
        $('#category').val(Flag);
        Checkaccessories();
        $('#listing').hide();
        $('#Entry').show();
        
    }

}

function ShowMappinglist(result) {
    disable_datatable('tblCatproduct');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=15px>Slno</th><th>Category Name</th><th>Item Code</th><th>Description</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + slno + '</td><td>' + result[i].CategoryName + '</td><td>' + result[i].ItemCode + '</td><td>' + result[i].Description + '</td><td align=center><a onclick="GetRows(' + result[i].CategoryId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblCatproduct').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th>Code</th><th>Name</th><th>Description</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch('tblCatproduct');
}