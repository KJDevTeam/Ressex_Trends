﻿var listindex = 1;
var keepPincodeListData = [];
var PincodeListModule = function () {
    return {
        init: function (sortBy, OrderBy) {

            //Local Storage Clear
            //localStorage.clear();
            localStorage.removeItem('ShortcutFilter');

            var QueryStringARR = common.GetQueryString();
            var result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {

            }
            else {



            }
            PincodeListModule.sortingDecider(sortBy, OrderBy);
            var result = PincodeListModule.PincodePayload("pincode", QueryStringARR, sortBy, OrderBy);

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, result.payload, "Post", false);

            TotalData = Data;
            console.log(Data);
            if (Data.status == 'OK') {


                keepPincodeListData = Data.data;

                //Project Heading Decider

                if (result.Category == "AllPincodes") {
                    $('#PincodelistHeading').text(keepPincodeListData[0].pincodes_in_india);
                }
                else if (result.Category == "PincodeinPincode") {
                    $('#PincodelistHeading').text(keepPincodeListData[0].pincode_input);
                }
                else if (result.Category == "PincodesinCity") {
                    $('#PincodelistHeading').text(keepPincodeListData[0].pincodes_in_city);
                }
                else {
                    $('#PincodelistHeading').text(keepPincodeListData[0].pincodes_in_india);
                }


                PincodeListModule.ListLoad(Data.data);
            }
            else {
                $('#PincodeSortandFilter').remove();
                $('#PincodeviewmoreList').hide();
                $("#PincodeList").empty();
                $("#PincodeList").append('<div class="d-flex align-items-center justify-content-center" style="height: 250px;"><h5>No Data found</h5></div>');


            }
        

    },
        ListLoad: function (List_arr) {
            var Listlength = List_arr.length / 10;
            var ListCounter = Math.ceil(Listlength);

            if (listindex <= ListCounter) {
                var arrcount = listindex * 10;

                var arr_toload;
                if (arrcount <= List_arr.length) {
                    arr_toload = List_arr.slice(0, arrcount)
                }
                else {
                    arr_toload = List_arr.slice(0, List_arr.length);
                    $('#PincodeviewmoreList').hide();
                }
                var img = utility.FrontEndAPIURL("images");
                var st = ''
                $("#PincodeList").empty();
                $.each(arr_toload, function (index, items) {
                    st += '<div class="searchResultCard d-flex align-items-center">\
                        <div class="mediaBlk rounded-circle mr-5"><img src="'+ img + '/search-img-1.png" alt="" class="rounded-circle"></div>\
                            <div class="d-flex justify-content-between flex-1">\
                                    <div class="searchCol">\
                                        <label class="name">'+ items.pincode + '</label>\
                                        <div class="location">'+ items.region_city + '</div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>'+ items.current_qtr + '</label>\
                                        <div>'+ items.saleable_rate_psf + '</div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>YoY Change (%)</label>\
                                        <div class="d-flex align-items-center">'+ items.cagr_last_1yr_pct + '<img src="' + img + '/polygon-up.svg" alt="" class="ml-2"></div>\
                                    </div>\
                                    <div class="searchCol">\
                                        <label>CAGR (3Y)</label>\
                                        <div class="d-flex align-items-center">'+ items.cagr_last_3yr_pct + '<img src="' + img + '/polygon-up.svg" alt="" class="ml-2"></div>\
                                    </div>\
                                    <div class="searchCol">\
                                            <label>CAGR (5Y)</label>\
                                            <div>'+ items.cagr_last_5yr_pct + '<img src="' + img + '/polygon-up.svg" alt="" class="ml-2"></div>\
                                    </div>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end ml-5 pl-5">\
                                  <a href="#" onClick="ProjectByPincode('+ items.pincode + ')">View<br>Projects</a>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end ml-5 pl-5">\
                                  <a href="#">View<br>Trends</a>\
                               </div>\
                           </div>';
                });
                var paginateText = 'Showing <b>' + arr_toload.length + '</b> pincodes out of <b>' + keepPincodeListData.length + '</b>';
                $('#PincodePaginationText').empty();
                $('#PincodePaginationText').append(paginateText);
                $("#PincodeList").append(st);
            }

        },
    sortingDecider: function (sortby, orderby) {

        //SortBy
        if (sortby == "name") {
            var Text = PincodeListModule.orderbyDecider("#PincodeNameSortIcon", orderby);
           
            $('#PincodenameSortID').addClass('sortBy');


            //Remove Red From Text
            $('#PincodeCurrRateSortID').removeClass('sortBy');
            $('#PincodeyoySortID').removeClass('sortBy');
            $('#PincodeCAGR3YSortID').removeClass('sortBy');
            $('#PincodeCAGR5YSortID').removeClass('sortBy');

            //Remove Icon
            $('#PincodeCurRateSortIcon').removeClass();
            $('#PincodeYoySortIcon').removeClass();
            $('#Pincodecagr3ySortIcon').removeClass();
            $('#Pincodecagr5ySortIcon').removeClass();





        }
        else if (sortby == "current_rate") {

            var Text = PincodeListModule.orderbyDecider("#PincodeCurRateSortIcon", orderby);
           
            $('#PincodeCurrRateSortID').addClass('sortBy');

            $('#PincodenameSortID').removeClass('sortBy');
            $('#PincodeyoySortID').removeClass('sortBy');
            $('#PincodeCAGR3YSortID').removeClass('sortBy');
            $('#PincodeCAGR5YSortID').removeClass('sortBy');

            //Remove Icon
            $('#PincodeNameSortIcon').removeClass();
            $('#PincodeYoySortIcon').removeClass();
            $('#Pincodecagr3ySortIcon').removeClass();
            $('#Pincodecagr5ySortIcon').removeClass();
        }
        else if (sortby == "cagr_last_1yr") {

            var Text = PincodeListModule.orderbyDecider("#PincodeYoySortIcon", orderby);
           
            $('#PincodeyoySortID').addClass('sortBy');

            //Remove Red from Text
            $('#PincodenameSortID').removeClass('sortBy');
            $('#PincodeCurrRateSortID').removeClass('sortBy');
            $('#PincodeCAGR3YSortID').removeClass('sortBy');
            $('#PincodeCAGR5YSortID').removeClass('sortBy');

            //Remove Icon from Text
            $('#PincodeNameSortIcon').removeClass();
            $('#PincodeCurRateSortIcon').removeClass();
            $('#Pincodecagr3ySortIcon').removeClass();
            $('#Pincodecagr5ySortIcon').removeClass();

        }
        else if (sortby == "cagr_last_3yr") {

            var Text = PincodeListModule.orderbyDecider("#Pincodecagr3ySortIcon", orderby);
          
            $('#PincodeCAGR3YSortID').addClass('sortBy');

            $('#PincodenameSortID').removeClass('sortBy');
            $('#PincodeCurrRateSortID').removeClass('sortBy');
            $('#PincodeyoySortID').removeClass('sortBy');
            $('#PincodeCAGR5YSortID').removeClass('sortBy');


            //Remove Icon from Text
            $('#PincodeNameSortIcon').removeClass();
            $('#PincodeCurRateSortIcon').removeClass();
            $('#PincodeYoySortIcon').removeClass();
            $('#Pincodecagr5ySortIcon').removeClass();
        }
        else if (sortby == "cagr_last_5yr") {

            var Text = PincodeListModule.orderbyDecider("#Pincodecagr5ySortIcon", orderby);
            
            $('#PincodeCAGR5YSortID').addClass('sortBy');

            $('#PincodenameSortID').removeClass('sortBy');
            $('#PincodeCurrRateSortID').removeClass('sortBy');
            $('#PincodeyoySortID').removeClass('sortBy');
            $('#PincodeCAGR3YSortID').removeClass('sortBy');


            //Remove Icon from Text
            $('#PincodeNameSortIcon').removeClass();
            $('#PincodeCurRateSortIcon').removeClass();
            $('#PincodeYoySortIcon').removeClass();
            $('#Pincodecagr3ySortIcon').removeClass();
        }



    },
    orderbyDecider: function (IconID, orderby) {

        //OrderBy



        if (orderby == "desc") {
            $(IconID).addClass("desc");


        }
        else {
            $(IconID).addClass("asc");

        }


    },
    PincodePayload: function (lookup, QueryStringarr, sortBy, OrderBy) {
        var jsonstr = {};
        var Category;
        if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
            Category = "AllPincodes";
            jsonstr = {
                "sort_by": sortBy,
                "order_by": OrderBy
            };

        }
        else if (QueryStringarr[3] != 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
            Category = "PincodeinPincode";
            jsonstr = {
                "pincode": "" + QueryStringarr[3] + "",
                "sort_by": sortBy,
                "order_by": OrderBy
            }
        }

        else if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] != 0) {
            Category = "PincodesinCity";
            jsonstr = {
                "city_id": "" + QueryStringarr[5] + "",
                "sort_by": sortBy,
                "order_by": OrderBy
            }
        }
        else {
            Category = "AllPincodes";
            jsonstr = {
                "sort_by": sortBy,
                "order_by": OrderBy
            }
        }




        APIPayload = {
            "lookup": "" + lookup + "",
            "json_str": JSON.stringify(jsonstr)
        };

        return Results = {
            "Category": "" + Category + "",
            "payload": APIPayload,
        }

    }
}
}();

function PincodeViewmoreListClick() {
    listindex++;
    $("#PincodeList").empty();
    PincodeListModule.ListLoad(keepPincodeListData);

}

function PincodeNameSortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("name", "asc");
    $('#overlay').fadeOut();
}
function PincodeCurRateSortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("current_rate", "asc");
    $('#overlay').fadeOut();
}
function PincodeYoySortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("cagr_last_1yr", "asc");
    $('#overlay').fadeOut();
}
function Pincodecagr3ySortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("cagr_last_3yr", "asc");
    $('#overlay').fadeOut();
}
function Pincodecagr5ySortclick() {
    $('#overlay').fadeIn();
    PincodeListModule.init("cagr_last_5yr", "asc");
    $('#overlay').fadeOut();
}

function PincodeNamesortIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "asc") {
        PincodeListModule.init("name", "desc");
        $('#PincodeNameSortIcon').removeClass();
        $('#PincodeNameSortIcon').addClass("desc");
        //$('#').removeClass();
        //$('#CurRateSortIcon').removeClass();
        //$('#YoySortIcon').removeClass();
        //$('#cagr3ySortIcon').removeClass();
    }
    else {
        PincodeListModule.init("name", "asc");
        $('#PincodeNameSortIcon').removeClass();
        $('#PincodeNameSortIcon').addClass("asc");
    }
    $('#overlay').fadeOut();
}
function PincodeCurRateIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "asc") {
        PincodeListModule.init("current_rate", "desc");
        $('#PincodeCurRateSortIcon').removeClass();
        $('#PincodeCurRateSortIcon').addClass("desc");

    }
    else {
        PincodeListModule.init("current_rate", "asc");
        $('#PincodeCurRateSortIcon').removeClass();
        $('#PincodeCurRateSortIcon').addClass("asc");
    }
    $('#overlay').fadeOut();
}
function PincodeyoyIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "asc") {
        PincodeListModule.init("cagr_last_1yr", "desc");
        $('#PincodeYoySortIcon').removeClass();
        $('#PincodeYoySortIcon').addClass("desc");
    }
    else {
        PincodeListModule.init("cagr_last_1yr", "asc");
        $('#PincodeYoySortIcon').removeClass();
        $('#PincodeYoySortIcon').addClass("asc");
    }
    $('#overlay').fadeOut();
}
function Pincodecagr3yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "asc") {
        PincodeListModule.init("cagr_last_3yr", "desc");
        $('#Pincodecagr3ySortIcon').removeClass();
        $('#Pincodecagr3ySortIcon').addClass("desc");

    }
    else {
        PincodeListModule.init("cagr_last_3yr", "asc");
        $('#Pincodecagr3ySortIcon').removeClass();
        $('#Pincodecagr3ySortIcon').addClass("asc");
    }
    $('#overlay').fadeOut();
}
function Pincodecagr5yIconClick(event) {
    $('#overlay').fadeIn();
    if (event.currentTarget.className == "asc") {
        PincodeListModule.init("cagr_last_5yr", "desc");
        $('#Pincodecagr5ySortIcon').removeClass();
        $('#Pincodecagr5ySortIcon').addClass("desc");

    }
    else {
        PincodeListModule.init("cagr_last_5yr", "asc");
        $('#Pincodecagr5ySortIcon').removeClass();
        $('#Pincodecagr5ySortIcon').addClass("asc");
    }
    $('#overlay').fadeOut();
}

function ProjectByPincode(id) {
    var resultroutingurl = utility.FrontEndAPIURL('list/project/' + id + '/0/0');
    window.location.href = resultroutingurl;
}

$("input[name=pincodes-search]").click(function () {
    if (this.value == "locations") {
        var resultroutingurl = utility.FrontEndAPIURL('list/location/0/0/' + keepPincodeListData[0].region_or_city_id_pi_input);
        window.location.href = resultroutingurl;
    }
    else if (this.value == "projects") {
        var resultroutingurl = utility.FrontEndAPIURL('list/project/0/0/' + keepPincodeListData[0].region_or_city_id_pi_input);
        window.location.href = resultroutingurl;
    }
    else {

    }
});



