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
        case 'project':
            break;
        case 'pincode':
            break;
        case 'location':
            break;
        case 'city':
            break;
        default:
            break;
    }

    
    return { "TrendsType": trendsType, "Id": queryStringARR[3]}
};




common.dtpicker_cal = function (Controlid) {

    $(Controlid).datepicker({
        singleDatePicker: true,
        showDropdowns: true,
        defaultDate: moment().format('DD/MM/YYYY'),
        dateFormat: 'dd/mm/yy',
        changeYear: true,
        changeMonth: true,
        minDate: new Date(2009, 1 - 1, 1)

    });

   

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

common.CAGRFormularCalulation = function (t, n,keepData,attr) {

    var powervalue = (1 / t);
    var numerator = keepData[n][attr];
    var denomth = (n - (1 + 4 * t))
    var denominator = keepData[denomth][attr];
    if (denominator == 0) {
       
        return "NA";
    }
    else {
        var result = (Math.pow((numerator / denominator), powervalue) - 1) * 100;
        return result.toFixed(2)+ " %";
    }
    
};





