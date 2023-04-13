//var token = '';
//token = sessionStorage.getItem("token");

//const date = new Date();

//let day = date.getDate();
//let month = date.getMonth() + 1;
//let year = date.getFullYear();


//// This arrangement can be altered based on how we want the date's format to appear.
//let currentDate = `${day}-${month}-${year}`;



if (typeof (common) === "undefined") {
    common = {};
}

common.SelectedFilter = function () {
    var _filterSelected = localStorage.getItem('filterSelected');
    if (_filterSelected != null) {

    }
    else {

    }
   
};

common.ShortcutMenuFlterBinding = function (PropertyType_ID_1,model_id,From_date,To_date,row_limit,Sort_by) {
    var filterModel = {
        SelectedFname: "",
        SelectedPan: "",
        Selectedpartytype: "0",
        SelectedBuildingNmame: "",
        SelectedPAddress: "",
        SelectedCts: "",
        SelectedddlState: "0",
        SelectedddlDistrict: "0",
        SelectedddlTaluka: "0",
        SelectedddlVillage: "0",
        Selectedproperty_type_1: ""+PropertyType_ID_1+"",
        Selectedproperty_type_2: "0",
        SelectedmodelType: "" + model_id + "",
        SelectedmarketType: "0",
        SelectedfromDateID: "" + From_date + "",
        SelectedtoDateID: "" + To_date + "",
        Selectedlowval: "0",
        Selectedhighval: "9999999999",
        Selectedlowarea: "0",
        Selectedhigharea: "999999",
        Row_Limit: "" + row_limit + "",
        Output_Spec: "" + Sort_by + "",

    }

    localStorage.setItem('filterSelected', JSON.stringify(filterModel));
    
}

common.FilterBindingFromGraph = function (PropertyType_ID_1, model_id, From_date, To_date, row_limit, Sort_by) {
    var filterModel = common.IsFilterSelcted();
    filterModel.Selectedhigharea = "999999";
    filterModel.Selectedlowarea = "800";
    localStorage.setItem('filterSelected', JSON.stringify(filterModel));

}
common.getProjectTypeID = function (projectType) {
      switch (projectType) {
        case "Residential":
            projectType = 1;
            break;
        case "Commercial":
            projectType = 2;
            break;
        case "Retail":
            projectType = 3;
            break;
        default:
            projectType = 1;
            break;

    }

    return projectType;

};

common.CheckIsPaid = function () {
    var userdetails = utility.getCookie('user_details');

    if (userdetails != "") {
        var finaldata = JSON.parse(userdetails);
        var returnData;
        if (finaldata.data.client_id != "-1" && finaldata.data.user_id != "-1") {
            returnData = {
                "UserType": "Paid",
                "user_id": finaldata.data.user_id,
                "client_id": finaldata.data.client_id
            }
        }
        else {
            returnData = {
                "UserType": "UnPaid",
                "user_id": finaldata.data.user_id,
                "client_id": finaldata.data.client_id
            }
        }
        return returnData;

    }
    else {
        //All Cookies Clear
        document.cookie.split(';').forEach(function (c) {
            document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        });
        //Local Storage Clear
        localStorage.clear();
        var loginurl = utility.FrontEndAPIURL('');
        window.location.href = loginurl;

    }
    
}
common.Payload = function (lookup)
{
    /*var xx = utility.getCookie("user_details");*/

    //if (xx!="" || xx != undefined || xx != null) {
    //    var clientid = JSON.parse(xx).data.client_id;
    //    var userid = JSON.parse(xx).data.user_id;
    //var usedcredentials = common.CheckIsPaid();
    //var clientid = usedcredentials.client_id;
    //var userid = usedcredentials.user_id;
        return APIPayload = {
            "lookup": "" + lookup + "",
            "json_str": "{}",
            
        };
    //}
    //else {
    //    //All Cookies Clear
    //    document.cookie.split(';').forEach(function (c) {
    //        document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    //    });
    //    //Local Storage Clear
    //    localStorage.clear();
    //    var loginurl = utility.FrontEndAPIURL('');
    //    window.location.href = loginurl;
        
    //}
};
common.LocationPayload = function (lookup, Id) {
        switch (lookup) {
            case "FETCH_STATE":
                var statePayload =
                {
                    "operation_type": "FETCH_STATE",
                    "state_id": "" + Id + "",
                    "district_id": "0",
                    "taluka_id": "0"
                };
                return statePayload;
            case "FETCH_DISTRICT":
                var DistPayload =
                {
                    "operation_type": "FETCH_DISTRICT",
                    "state_id": "" + Id + "",
                    "district_id": "0",
                    "taluka_id": "0"
                };
                return DistPayload;
            case "FETCH_TALUKA":
                var TalukaPayload =
                {
                    "operation_type": "FETCH_TALUKA",
                    "state_id": "0",
                    "district_id": "" + Id + "",
                    "taluka_id": "0"
                };
                return TalukaPayload;
            case "FETCH_VILLAGE":
                var VillagePayload =
                {
                    "operation_type": "FETCH_VILLAGE",
                    "state_id": "0",
                    "district_id": "0",
                    "taluka_id": "" + Id + ""
                };
                return VillagePayload;
            default:
            // code block
        }
    };
common.SelectedDropdown = function (controlId, selectedItem) {

    $(controlId).filter(function () {
        return this.value == selectedItem;
    }).attr('selected', true);
};
common.SelectedPersonalFCount = function () {
    ///Personal Details
    Fname = $('#Fname').val();
    Pan = $('#Pan').val();
    partytype = $('#partytype').val();
    var i = 0;
    if (Fname != "") {
        i++;
    }
    if (Pan != "") {
        i++;
    }
    if (partytype != "0") {

        i++;
    }

    return i;
   
}
common.SelectedPropertyFCount = function () {
   ///Property Details
    BuildingNmame = $('#BuildingNmame').val();
    PAddress = $('#PAddress').val();
    Cts = $('#Cts').val();
    var i = 0;
    if (BuildingNmame != "") {
        i++;
    }
    if (PAddress != "") {
        i++;
    }
    if (Cts != "") {

        i++;
    }

    return i;

}
common.SelectedLocationFCount = function () {
    ///Location Details
    ddlState = $('#ddlState').val();
    ddlDistrict = $('#ddlDistrict').val();
    ddlTaluka = $('#ddlTaluka').val();
    ddlVillage = $('#ddlVillage').val();
    var i = 0;
    if (ddlState != "0") {
        i++;
    }
    if (ddlDistrict != "0") {
        i++;
    }
    if (ddlTaluka != "0") {

        i++;
    }
    if (ddlVillage != "0") {

        i++;
    }

    return i;

}
common.SelectedPropertytypeFCount = function () {
    ///PropertyType
    property_type_1 = $('#property_type_1').val();
    property_type_2 = $('#property_type_2').val();
    var i = 0;
    if (property_type_1 != "0") {
        i++;
    }
    if (property_type_2 != "0") {
        i++;
    }
    

    return i;

}
common.SelectedTransactionFCount = function () {
    ///Transaction Type
    modelType = $('#modelType').val();
    marketType = $('#marketType').val();
    var i = 0;
    if (modelType != "0") {
        i++;
    }
    if (marketType != "0") {
        i++;
    }
   

    return i;

}
common.SelectedDateRangeFCount = function () {
    ////Date Range
    fromDateID = $('#fromDateID').val();
    toDateID = $('#toDateID').val();
    var i = 0;
    if (fromDateID !="Min Date" && toDateID =="Max Date") {
        i++;
    }
    if (fromDateID == "Min Date" && toDateID != "Max Date") {
        i++;
    }
    if (fromDateID != "Min Date" && toDateID != "Max Date") {
        i++;
    }

    return i;

}
common.SelectedOtherFCount = function () {
    ///Other Details
    lowval = $('#MinCost').val();
    highval = $('#MaxCost').val();
    lowarea = $('#MinSqft').val();
    higharea = $('#MaxSqft').val();
    var i = 0;

    if (lowval != "0" && highval == "9999999999") {
        i++;
    }
    if (lowval == "0" && highval != "9999999999") {
        i++;
    }
    if (lowval != "0" && highval != "9999999999") {
        i++;
    }
    if (lowarea != "0" && higharea =="999999") {
        i++;
    }
    if (lowarea == "0" && higharea != "999999") {
        i++;
    }
    if (lowarea != "0" && higharea != "999999") {
        i++;
    }

    return i;

}
common.SelectedFilterCount = function () {

    var personalFcount = common.SelectedPersonalFCount();
    if (personalFcount > 0) {
        $('#PersonalFCount').show();
        $('#PersonalFCount').text(""+personalFcount+"");
    }

    var propertyFcount = common.SelectedPropertyFCount();
    if (propertyFcount > 0) {
        $('#PropertyFCount').show();
        $('#PropertyFCount').text("" + propertyFcount + "");
    }

    var locationFcount = common.SelectedLocationFCount();
    if (locationFcount > 0) {
        $('#LocationFCount').show();
        $('#LocationFCount').text("" + locationFcount + "");
    }

    var propertytypeFcount = common.SelectedPropertytypeFCount();
    if (propertytypeFcount > 0) {
        $('#PropertyTypeFCount').show();
        $('#PropertyTypeFCount').text("" + propertytypeFcount + "");
    }

    var transactionFcount = common.SelectedTransactionFCount();
    if (transactionFcount > 0) {
        $('#TransactionFCount').show();
        $('#TransactionFCount').text("" + transactionFcount + "");
    }

    var daterangeFcount = common.SelectedDateRangeFCount();
    if (daterangeFcount > 0) {
        $('#DateRangeFCount').show();
        $('#DateRangeFCount').text("" + daterangeFcount + "");
    }

    var otherFcount = common.SelectedOtherFCount();
    if (otherFcount > 0) {
        $('#OtherFCount').show();
        $('#OtherFCount').text("" + otherFcount + "");
    }

    

   

    

    

   




}


common.SelectedInput = function (controlId, selectedItem) {
    $(controlId).val(selectedItem);
};

common.GetQueryString = function () {
    var GetUrl = window.location.href.split(':');
    if (GetUrl[1] == "//localhost") {
        return window.location.pathname.split('/');

    }
    else {
        var arr = window.location.pathname.split('/');
        let queryStringArr = [];
        for (i=1; i <arr.length; i++) {
            queryStringArr.push(arr[i]);
        }
        return queryStringArr;

    }
};

common.GetTrendsTypePayload = function (queryStringARR) {
    var trendsType = queryStringARR[1];

    switch (trendsType) {
        case 'Project':
            break;
        case 'Pincode':
            break;
        case 'Location':
            break;
        case 'City':
            break;
        default:
            break;
    }

    
    return { "TrendsType": trendsType, "Id": queryStringARR[3]}
};


common.DepartmentDDL = function (Controlid) {
    var urlToHandler = utility.ServiceAPIURL("APIkey");
    var jsonData;
    jsonData = 'iTOKEN=' + Userdata[0].token;
    var totaldata = utility.ajaxselect(urlToHandler, jsonData, "GET", false);
   
};


common.IsFilterSelcted = function () {
    //Default Model

    var filterModel = {
        SelectedFname: "",
        SelectedPan: "",
        Selectedpartytype: "0",
        SelectedBuildingNmame: "",
        SelectedPAddress: "",
        SelectedCts: "",
        SelectedddlState: "0",
        SelectedddlDistrict: "0",
        SelectedddlTaluka: "0",
        SelectedddlVillage: "0",
        Selectedproperty_type_1: "0",
        Selectedproperty_type_2: "0",
        SelectedmodelType: "0",
        SelectedmarketType: "0",
        SelectedfromDateID: "0",
        SelectedtoDateID: "0",
        Selectedlowval: "0",
        Selectedhighval: "9999999999",
        Selectedlowarea: "0",
        Selectedhigharea: "999999"

    }

    var _filterSelected = localStorage.getItem('filterSelected');
    if (_filterSelected != null) {

        var selectedFilter = JSON.parse(_filterSelected);

        //if (selectedFilter.SelectedfromDateID == selectedFilter.SelectedtoDateID) {
        //    selectedFilter.SelectedfromDateID = "0";
        //    selectedFilter.SelectedtoDateID = "0";
        //}
        if (selectedFilter.SelectedfromDateID == "0" && selectedFilter.SelectedtoDateID != "0") {
            selectedFilter.SelectedfromDateID = selectedFilter.SelectedfromDateID != "0" ? selectedFilter.SelectedfromDateID:"0";
            let date = moment(selectedFilter.SelectedtoDateID, "DD/MM/YYYY");

            selectedFilter.SelectedtoDateID = moment(date).format('DD MMM YYYY');
        }
        else if (selectedFilter.SelectedfromDateID != "0" && selectedFilter.SelectedfromDateID == "0") {
            let date = moment(selectedFilter.SelectedfromDateID, "DD/MM/YYYY");

            selectedFilter.SelectedfromDateID = moment(date).format('DD MMM YYYY');
            selectedFilter.SelectedtoDateID = selectedFilter.SelectedtoDateID != "0" ? selectedFilter.SelectedtoDateID : "0";
        }
        else if (selectedFilter.SelectedfromDateID == "0" && selectedFilter.SelectedfromDateID == "0") {
            selectedFilter.SelectedtoDateID = selectedFilter.SelectedtoDateID != "0" ? selectedFilter.SelectedtoDateID : "0";
            selectedFilter.SelectedfromDateID = selectedFilter.SelectedfromDateID != "0" ? selectedFilter.SelectedfromDateID : "0";
        }
        else {
            let date1 = moment(selectedFilter.SelectedfromDateID, "DD/MM/YYYY");
            let date2 = moment(selectedFilter.SelectedtoDateID, "DD/MM/YYYY");
            selectedFilter.SelectedfromDateID = moment(date1).format('DD MMM YYYY');
            selectedFilter.SelectedtoDateID = moment(date2).format('DD MMM YYYY');
        }

        return selectedFilter;
    }
    else {
        
        return filterModel;
    }
};

//common.datepick = function () {
//    $('input[name="fromdate"], input[name="tomdate"]').daterangepicker({
//        singleDatePicker: true,
//        showDropdowns: true,
//    });
//}


common.dtpicker_cal = function (Controlid) {
    if (Controlid == "#fromDateID") {
        $(Controlid).datepicker({
            singleDatePicker: true,
            showDropdowns: true,
            defaultDate: moment().format('DD/MM/YYYY'),
            dateFormat: 'dd/mm/yy',
            changeYear: true,
            changeMonth: true,
            onSelect: function (data, instance) {
                console.log('Selected Date' + data);
                var toDateID;
                let date2;
                if ($('#toDateID').val() != 'Max Date') {
                    toDateID = $('#fromDateID').val();
                    date2 = moment(moment(toDateID, "DD/MM/YYYY"), "DD/MM/YYYY");
                    var toDateID = $('#toDateID').val();
                    let date1 = moment(data, "DD/MM/YYYY");

                    if (moment(date2).isAfter(date1) || moment(date1).isSame(date2)) {

                    }
                    else {
                        swal("Oops!", "From date should be earlier than To date, you should choose again!", "error");

                    }
                }
                else {
                    $("#toDateID").datepicker("setDate", moment().format('DD/MM/YYYY'));
                    common.SelectedInput("#toDateID", "Max Date");
                }

                

            }

        });
    }
    else {
        $(Controlid).datepicker({
            singleDatePicker: true,
            showDropdowns: true,
            defaultDate: moment().format('DD/MM/YYYY'),
            dateFormat: 'dd/mm/yy',
            changeYear: true,
            changeMonth: true,
            onSelect: function (data, instance) {
                console.log('Selected Date' + data);
                var fromDateID;
                let date2;
                if ($('#fromDateID').val() != 'Min Date')
                {
                    fromDateID = $('#fromDateID').val();
                    date2 = moment(moment(fromDateID, "DD/MM/YYYY"), "DD/MM/YYYY");
                    let date1 = moment(data, "DD/MM/YYYY");

                    if (moment(date1).isAfter(date2) || moment(date1).isSame(date2)) {

                    }
                    else {
                        swal("Oops!", "From date should be earlier than To date, you should choose again!", "error");

                    }
                }
                else {
                    $("#fromDateID").datepicker("setDate", moment().format('DD/MM/YYYY'));
                 
                    common.SelectedInput("#fromDateID", "Min Date");
                   
                }
                
                                         


            }

        });
    }

};

common.dtpicker = function (date, Controlid_1, Controlid_2) {
    var AllFlag = false;
    switch (date) {
        case "6M":
            var dateFrom = moment().subtract(6, 'months').format('DD/MM/YYYY');
            var dateTo = moment().format('DD/MM/YYYY');
            break;
        case "12M":
            var dateFrom = moment().subtract(12, 'months').format('DD/MM/YYYY');
            var dateTo = moment().format('DD/MM/YYYY');
            break;
        case "3Y":
            var dateFrom = moment().subtract(3, 'years').format('DD/MM/YYYY');
            var dateTo = moment().format('DD/MM/YYYY');
            break;
        case "5Y":
            var dateFrom = moment().subtract(5, 'years').format('DD/MM/YYYY');
            var dateTo = moment().format('DD/MM/YYYY');
            break;
        case "All":
           /* AllFlag = true;*/
            var dateFrom = moment('2010-01-01').format('DD/MM/YYYY');
            var dateTo = moment().format('DD/MM/YYYY');
            //common.SelectedInput("#fromDateID", "Min Date");
            //common.SelectedInput("#toDateID", "Max Date");
            //$(Controlid_1).datepicker("refresh");
            //$(Controlid_2).datepicker("refresh");
            
            
            break;
        default:
        // code block
    }
    if (!AllFlag) {
    $(Controlid_1).datepicker("setDate", dateFrom);
    $(Controlid_2).datepicker("setDate", dateTo);
    }
}
common.Minrange = function (Mincontrolid,Maxcontrolid,IscarpetSize) {

    
    var values = [];
    $(Mincontrolid + ' option').each(function () {
       values.push($(this).attr('value'));
    });

    var texts = $(Mincontrolid).children('option').map(function (i, e) {
        return e.innerText;
    }).get();

    var finalData = [];
    $.each(values, function (index, value) {
        console.log(value);
        finalData.push({ "range_upper_limit": value,"range_upper_limit_text": texts[index]});
    });
    /*finalData.shift();*/
    console.log(finalData);
    /*finalData.splice(1, 2);*/
    var tempminvalue=$(Mincontrolid).select2('val');
    var predicate = (x) => x <= parseInt(tempminvalue);
    /*var output = finalData.filter(predicate);*/
    finalData = finalData.filter(x => !predicate(x.range_upper_limit));
    if (IscarpetSize) {
        utility.bindSelect(Maxcontrolid, 'range_upper_limit', 'range_upper_limit_text', finalData, true, 999999, true);
    }
    else {
        utility.bindSelect(Maxcontrolid, 'range_upper_limit', 'range_upper_limit_text', finalData, true, 9999999999, true);
    }
  
    
    //$(Maxcontrolid).children("option").each(function () {
    //    //var opt = $(this),
    //    var opt =element
    //        optVal = parseInt(opt.attr('value'));
    //    if (optVal <= $(Mincontrolid).val()) {
    //        opt.attr('disabled', 'disabled');
    //        opt.attr("hidden", true);
    //    } else {
    //        opt.removeAttr('disabled');
    //        opt.attr("hidden", false);
    //    }
    //});

}
common.Maxrange = function (Mincontrolid, Maxcontrolid, element) {

    //$(Maxcontrolid).on('change', function () {
    //    $(Mincontrolid).children("option").each(function () {
    //        var opt = $(this),
    //            optVal = parseInt(opt.attr('value'));

    //        if (optVal != 0 && optVal >= $(Maxcontrolid).val()) {
    //            opt.attr('disabled', 'disabled');
    //            opt.attr("hidden", true);
    //        } else {
    //            opt.removeAttr('disabled');
    //            opt.attr("hidden", false);
    //        }
    //    });
    //});
}
