

(function ($) {
    $(document).ready(function () {
        var oprions = {
            statusClass: "eumi-work-item-status",
            itemsContainer: "eumi-work-item-list",
        }

        var baseUrl = window.BaseUrl;
        var userId = window.LoggedInUser;

        if (!baseUrl || !userId) {
            console.log("Base URL and/or userId missing");
        }

        var eumi_debounce = function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

        //var pingForNew = function () {
        //    console.log("pingng for new workitems");
        //    $.ajax({
        //        url: window.BaseUrl + "WorkItem/PingForNew",
        //        type: "POST",
        //        data: { userid: userId },
        //        success: function (result) {
        //            if (result.success && result.hasNew) {
        //                document.getElementById("idWorkItemStatus").innerHTML = "*";
        //            } else if (result.success) {
        //                document.getElementById("idWorkItemStatus").innerHTML = "";
        //            }
        //            loopForever();
        //        }
        //    });
        //};


        var pingForNew = function () {
            console.log("pingng for new workitems");//in 10 Seconds
            var data = {};
            data.UserId = ERPUserId;
            data.DepartmentId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../WorkItemUser/CheckforNewItem",
                data: data,
                success: function (result) {
                    WorkitemNotify(result.oList);
                    loopForever();
                }
            });
        };

       // pingForNew();

        var loopForever = function () {
            window.setTimeout(pingForNew, 10000);
        };

        function WorkitemNotify(result) {
            
            var ABM = $('#idwicount_1_toyou').text();
            var ATM = $('#idwicount_1_todiv').text();
            var AMD = $('#idwicount_1_byyou').text();
            
            for (var i = 0; i < result.length; i++) {
                var assignbyme = result[i].AssignedByyou;
                var assigntome = result[i].AssignedToYou;
                var assignmydiv = result[i].AssignedToDiv;

            }

            $('#idwicount_1_toyou').text(assigntome);
            $('#idwicount_1_todiv').text(assignmydiv);
            $('#idwicount_1_byyou').text(assignbyme);

            if (ABM != $('#idwicount_1_toyou').text() || ATM != $('#idwicount_1_todiv').text() || AMD != $('#idwicount_1_byyou').text()) {
                //$("#idWorkItemStatusNew").show();
                WorkItemNotifyVar = 1;
            }
            else {
                WorkItemNotifyVar = 0;
            }

        }

        //$("#idWorkItemToggleButton").on("click", eumi_debounce(function () {
        //    $("#idWorkItemList").addClass("eumi-busy-part");
        //    $.ajax({
        //        url: window.BaseUrl + "WorkItem/PingForDetail",
        //        type: "POST",
        //        data: { userid: userId },
        //        success: function (result) {
        //            console.log("Executed Detail");
        //            if (result.success) {
        //                document.getElementById("idwicount_1_toyou").innerHTML = result.toyou;
        //                document.getElementById("idwicount_1_byyou").innerHTML = result.byyou;
        //                document.getElementById("idwicount_1_todiv").innerHTML = result.todiv;
        //                $("#idWorkItemList").removeClass("eumi-busy-part");
        //            }
        //        }
        //    });

        //}, 5000, true));
    });
}(jQuery));