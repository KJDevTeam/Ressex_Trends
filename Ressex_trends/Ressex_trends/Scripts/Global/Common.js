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
common.PincodePayload = function (lookup, QueryStringarr, jsonStrType, jsonStrValue, sortBy, OrderBy)
{
    var jsonstr = {};
    if (QueryStringarr[3] == 0) {
        jsonstr = {
            "sort_by": sortBy,
            "order_by": OrderBy
        }

    }
    else {
        jsonstr = {
            [jsonStrType]: "" + jsonStrValue + "",
            "sort_by": sortBy,
            "order_by": OrderBy
        }
    }

   
        
    return APIPayload = {
        "lookup": "" + lookup + "",
        "json_str": JSON.stringify(jsonstr)
    };
    
};

common.Payload = function (lookup) {
    return APIPayload = {
        "lookup": "" + lookup + "",
        "json_str": "{}",

    };
    
};




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
    var trendsType = queryStringARR[2];

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




common.sortingDecider = function (sortby, orderby) {

    //SortBy
    if (sortby == "name") {
        var Text = common.orderbyDecider("#NameSortIcon", orderby);
        $('#nameSortID').text(Text);
        $('#nameSortID').addClass('text-danger');
        
        
        //Remove Red From Text
        $('#CurrRateSortID').removeClass('text-danger');
        $('#yoySortID').removeClass('text-danger');
        $('#CAGR3YSortID').removeClass('text-danger');
        $('#CAGR5YSortID').removeClass('text-danger');

        //Remove Icon
        $('#CurRateSortIcon').removeClass();
        $('#YoySortIcon').removeClass();
        $('#cagr3ySortIcon').removeClass();
        $('#cagr5ySortIcon').removeClass();
       
        
        


    }
    else if (sortby == "current_rate") {
        
        var Text = common.orderbyDecider("#CurRateSortIcon", orderby);
        $('#CurrRateSortID').text(Text);
        $('#CurrRateSortID').addClass('text-danger');

        $('#nameSortID').removeClass('text-danger');
        $('#yoySortID').removeClass('text-danger');
        $('#CAGR3YSortID').removeClass('text-danger');
        $('#CAGR5YSortID').removeClass('text-danger');

        //Remove Icon
        $('#NameSortIcon').removeClass();
        $('#YoySortIcon').removeClass();
        $('#cagr3ySortIcon').removeClass();
        $('#cagr5ySortIcon').removeClass();
    }
    else if (sortby == "cagr_last_1yr") {
        
        var Text = common.orderbyDecider("#YoySortIcon", orderby);
        $('#YoySortIcon').text(Text);
        $('#yoySortID').addClass('text-danger');

        //Remove Red from Text
        $('#nameSortID').removeClass('text-danger');
        $('#CurrRateSortID').removeClass('text-danger');
        $('#CAGR3YSortID').removeClass('text-danger');
        $('#CAGR5YSortID').removeClass('text-danger');

        //Remove Icon from Text
        $('#NameSortIcon').removeClass();
        $('#CurRateSortIcon').removeClass();
        $('#cagr3ySortIcon').removeClass();
        $('#cagr5ySortIcon').removeClass();

    }
    else if (sortby == "cagr_last_3yr") {
        
        var Text = common.orderbyDecider("#cagr3ySortIcon", orderby);
        $('#CAGR3YSortID').text(Text);
        $('#CAGR3YSortID').addClass('text-danger');

        $('#nameSortID').removeClass('text-danger');
        $('#CurrRateSortID').removeClass('text-danger');
        $('#yoySortID').removeClass('text-danger');
        $('#CAGR5YSortID').removeClass('text-danger');


        //Remove Icon from Text
        $('#NameSortIcon').removeClass();
        $('#CurRateSortIcon').removeClass();
        $('#YoySortIcon').removeClass();
        $('#cagr5ySortIcon').removeClass();
    }
    else if (sortby == "cagr_last_5yr") {
        
        var Text = common.orderbyDecider("#cagr5ySortIcon", orderby);
        $('#CAGR5YSortID').text(Text);
        $('#CAGR5YSortID').addClass('text-danger');

        $('#nameSortID').removeClass('text-danger');
        $('#CurrRateSortID').removeClass('text-danger');
        $('#yoySortID').removeClass('text-danger');
        $('#CAGR3YSortID').removeClass('text-danger');


        //Remove Icon from Text
        $('#NameSortIcon').removeClass();
        $('#CurRateSortIcon').removeClass();
        $('#YoySortIcon').removeClass();
        $('#cagr3ySortIcon').removeClass();
    }

    
    
};

common.orderbyDecider = function (IconID, orderby) {

    //OrderBy

   

    if (orderby == "Desc") {
        $(IconID).addClass("fa fa-arrow-down text-danger");

      
    }
    else {
        $(IconID).addClass("fa fa-arrow-up text-danger");
        
    }
    

}

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
