var listindex = 1;
var keepProjectListData = [];
var ProjectListModule = function () {
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
            ProjectListModule.sortingDecider(sortBy, OrderBy);
            var result = ProjectListModule.ProjectPayload("project", QueryStringARR,sortBy, OrderBy);

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, result.payload, "Post", false);

            TotalData = Data;
            console.log(Data);

            if (Data.status == 'OK') {
                keepProjectListData = Data.data;

                //Project Heading Decider

                if (result.Category == "AllProjects") {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_india);
                }
                else if (result.Category == "ProjectsInPincode") {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_pincode);
                }
                else if (result.Category == "ProjectsInLocation") {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_location);
                }
                else if (result.Category == "ProjectsInCity") {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_city);
                }
                else {
                    $('#ProjectlistHeading').text(keepProjectListData[0].projects_in_india);
                }
                ProjectListModule.ListLoad(Data.data);
            }
            else {
                $('#ProjectSortandFilter').remove();
                $('#ProjectviewmoreList').hide();
                $("#ProjectList").empty();
                $("#ProjectList").append('<div class="d-flex align-items-center justify-content-center" style="height: 250px;"><h5>No Data found</h5></div>');
                
                   
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
                    $('#ProjectviewmoreList').hide();
                }
                var img = utility.FrontEndAPIURL("images");
                var st = ''
                $("#ProjectList").empty();
                $.each(arr_toload, function (index, items) {
                   st+='<div class="searchResultCard d-flex align-items-center">\
                        <div class="mediaBlk rounded-circle mr-5"><img src="'+ img + '/search-img-1.png" alt="" class="rounded-circle"></div>\
                            <div class="d-flex justify-content-between flex-1">\
                                    <div class="searchCol">\
                                        <label class="name">'+ items.name + '</label>\
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
                                    <div class="searchCol">\
                                            <label>Project Status</label>\
                                            <div>'+ items.project_status + '</div>\
                                    </div>\
                               </div>\
                               <div class="d-flex align-items-center justify-content-end ml-5 pl-5">\
                                  <a href="javascript:void(0)" onClick="ProjectTrendsRoute('+ items.project_id + ')">View<br>Trends</a>\
                               </div>\
                           </div>';
                });
                var paginateText = 'Showing <b>' + arr_toload.length + '</b> projects out of <b>' + keepProjectListData.length + '</b>';
                $('#ProjectPaginationText').empty();
                $('#ProjectPaginationText').append(paginateText);
                $("#ProjectList").append(st);
            }

        },
        sortingDecider: function (sortby, orderby) {

            //SortBy
            if (sortby == "name") {
                var Text = ProjectListModule.orderbyDecider("#ProjectNameSortIcon", orderby);
                /*$('#ProjectnameSortID').text(Text);*/
                $('#ProjectnameSortID').addClass('sortBy');


                //Remove Red From Text
                $('#ProjectCurrRateSortID').removeClass('sortBy');
                $('#ProjectyoySortID').removeClass('sortBy');
                $('#ProjectCAGR3YSortID').removeClass('sortBy');
                $('#ProjectCAGR5YSortID').removeClass('sortBy');

                //Remove Icon
                $('#ProjectCurRateSortIcon').removeClass();
                $('#ProjectYoySortIcon').removeClass();
                $('#Projectcagr3ySortIcon').removeClass();
                $('#Projectcagr5ySortIcon').removeClass();





            }
            else if (sortby == "current_rate") {

                var Text = ProjectListModule.orderbyDecider("#ProjectCurRateSortIcon", orderby);
               /* $('#ProjectCurrRateSortID').text(Text);*/
                $('#ProjectCurrRateSortID').addClass('sortBy');

                $('#ProjectnameSortID').removeClass('sortBy');
                $('#ProjectyoySortID').removeClass('sortBy');
                $('#ProjectCAGR3YSortID').removeClass('sortBy');
                $('#ProjectCAGR5YSortID').removeClass('sortBy');

                //Remove Icon
                $('#ProjectNameSortIcon').removeClass();
                $('#ProjectYoySortIcon').removeClass();
                $('#Projectcagr3ySortIcon').removeClass();
                $('#Projectcagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_1yr") {

                var Text = ProjectListModule.orderbyDecider("#ProjectYoySortIcon", orderby);
                $('#ProjectYoySortIcon').text(Text);
                $('#ProjectyoySortID').addClass('sortBy');

                //Remove Red from Text
                $('#ProjectnameSortID').removeClass('sortBy');
                $('#ProjectCurrRateSortID').removeClass('sortBy');
                $('#ProjectCAGR3YSortID').removeClass('sortBy');
                $('#ProjectCAGR5YSortID').removeClass('sortBy');

                //Remove Icon from Text
                $('#ProjectNameSortIcon').removeClass();
                $('#ProjectCurRateSortIcon').removeClass();
                $('#Projectcagr3ySortIcon').removeClass();
                $('#Projectcagr5ySortIcon').removeClass();

            }
            else if (sortby == "cagr_last_3yr") {

                var Text = ProjectListModule.orderbyDecider("#Projectcagr3ySortIcon", orderby);
                $('#ProjectCAGR3YSortID').text(Text);
                $('#ProjectCAGR3YSortID').addClass('sortBy');

                $('#ProjectnameSortID').removeClass('sortBy');
                $('#ProjectCurrRateSortID').removeClass('sortBy');
                $('#ProjectyoySortID').removeClass('sortBy');
                $('#ProjectCAGR5YSortID').removeClass('sortBy');


                //Remove Icon from Text
                $('#ProjectNameSortIcon').removeClass();
                $('#ProjectCurRateSortIcon').removeClass();
                $('#ProjectYoySortIcon').removeClass();
                $('#Projectcagr5ySortIcon').removeClass();
            }
            else if (sortby == "cagr_last_5yr") {

                var Text = ProjectListModule.orderbyDecider("#Projectcagr5ySortIcon", orderby);
                $('#ProjectCAGR5YSortID').text(Text);
                $('#ProjectCAGR5YSortID').addClass('sortBy');

                $('#ProjectnameSortID').removeClass('sortBy');
                $('#ProjectCurrRateSortID').removeClass('sortBy');
                $('#ProjectyoySortID').removeClass('sortBy');
                $('#ProjectCAGR3YSortID').removeClass('sortBy');


                //Remove Icon from Text
                $('#ProjectNameSortIcon').removeClass();
                $('#ProjectCurRateSortIcon').removeClass();
                $('#ProjectYoySortIcon').removeClass();
                $('#Projectcagr3ySortIcon').removeClass();
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
        ProjectPayload: function (lookup, QueryStringarr, sortBy, OrderBy) {
            var jsonstr = {};
            var Category;
            if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                Category = "AllProjects";
                jsonstr = {
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }

            }
            else if (QueryStringarr[3] != 0 && QueryStringarr[4] == 0 && QueryStringarr[5] == 0) {
                Category = "ProjectsInPincode";
                jsonstr = {
                    "pincode": "" + QueryStringarr[3] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }
            else if (QueryStringarr[3] == 0 && QueryStringarr[4] != 0 && QueryStringarr[5] == 0) {
                Category = "ProjectsInLocation";
                jsonstr = {
                    "location_id": "" + QueryStringarr[4] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                };
            }
            else if (QueryStringarr[3] == 0 && QueryStringarr[4] == 0 && QueryStringarr[5] != 0) {
                Category = "ProjectsInCity";
                jsonstr = {
                    "city_id": "" + QueryStringarr[5] + "",
                    "sort_by": sortBy,
                    "order_by": OrderBy
                }
            }
            else {
                Category = "AllProjects";
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
                "Category": "" + Category+"",
                "payload": APIPayload,
            }

        }
    }
}();

function ProjectViewmoreListClick() {
    listindex++;
    $("#ProjectList").empty();
    ProjectListModule.ListLoad(keepProjectListData);

}

function ProjectNameSortclick(event) {

    $('#overlay').fadeIn();
    if ($(ProjectNameSortIcon).hasClass('asc') || $(ProjectNameSortIcon).hasClass('desc')) {

        if ($(ProjectNameSortIcon).hasClass('asc')) {
            ProjectListModule.init("name", "desc");
            $('#ProjectNameSortIcon').removeClass();
            $('#ProjectNameSortIcon').addClass("desc");

        }
        else {
            ProjectListModule.init("name", "asc");
            $('#ProjectNameSortIcon').removeClass();
            $('#ProjectNameSortIcon').addClass("asc");
        }
    }
    else {

        ProjectListModule.init("name", "asc");
    }
    $('#overlay').fadeOut();
}
function ProjectCurRateSortclick(event) {
    $('#overlay').fadeIn();
    if ($(ProjectCurRateSortIcon).hasClass('asc') || $(ProjectCurRateSortIcon).hasClass('desc')) {
      
        if ($(ProjectCurRateSortIcon).hasClass('asc')) {
            ProjectListModule.init("current_rate", "desc");
            $('#ProjectCurRateSortIcon').removeClass();
            $('#ProjectCurRateSortIcon').addClass("desc");

        }
        else {
            ProjectListModule.init("current_rate", "asc");
            $('#ProjectCurRateSortIcon').removeClass();
            $('#ProjectCurRateSortIcon').addClass("asc");
        }
    }
    else {
      
        ProjectListModule.init("current_rate", "asc");       
    }
    $('#overlay').fadeOut();
}    
function ProjectYoySortclick(event) {

    $('#overlay').fadeIn();
    if ($(ProjectYoySortIcon).hasClass('asc') || $(ProjectYoySortIcon).hasClass('desc')) {
       
        if ($(ProjectYoySortIcon).hasClass('asc')) {
            ProjectListModule.init("cagr_last_1yr", "desc");
            $('#ProjectYoySortIcon').removeClass();
            $('#ProjectYoySortIcon').addClass("desc");

        }
        else {
            ProjectListModule.init("cagr_last_1yr", "asc");
            $('#ProjectYoySortIcon').removeClass();
            $('#ProjectYoySortIcon').addClass("asc");
        }
    }
    else {

        ProjectListModule.init("cagr_last_1yr", "asc");
    }
    $('#overlay').fadeOut();

  
}
function Projectcagr3ySortclick(event) {
    $('#overlay').fadeIn();
    if ($(Projectcagr3ySortIcon).hasClass('asc') || $(Projectcagr3ySortIcon).hasClass('desc')) {
      
        if ($(Projectcagr3ySortIcon).hasClass('asc')) {
            ProjectListModule.init("cagr_last_3yr", "desc");
            $('#Projectcagr3ySortIcon').removeClass();
            $('#Projectcagr3ySortIcon').addClass("desc");

        }
        else {
            ProjectListModule.init("cagr_last_3yr", "asc");
            $('#Projectcagr3ySortIcon').removeClass();
            $('#Projectcagr3ySortIcon').addClass("asc");
        }
    }
    else {

        ProjectListModule.init("cagr_last_3yr", "asc");
    }
    $('#overlay').fadeOut();


    
}
function Projectcagr5ySortclick(event) {

    $('#overlay').fadeIn();
    if ($(Projectcagr5ySortIcon).hasClass('asc') || $(Projectcagr5ySortIcon).hasClass('desc')) {
         if ($(Projectcagr5ySortIcon).hasClass('asc')) {
            ProjectListModule.init("cagr_last_5yr", "desc");
            $('#Projectcagr5ySortIcon').removeClass();
            $('#Projectcagr5ySortIcon').addClass("desc");

        }
        else {
            ProjectListModule.init("cagr_last_5yr", "asc");
            $('#Projectcagr3ySortIcon').removeClass();
            $('#Projectcagr5ySortIcon').addClass("asc");
        }
    }
    else {

        ProjectListModule.init("cagr_last_5yr", "asc");
    }
    $('#overlay').fadeOut();    
}

//function ProjectNamesortIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        ProjectListModule.init("name", "desc");
//        $('#ProjectNameSortIcon').removeClass();
//        $('#ProjectNameSortIcon').addClass("desc");
        
//    }
//    else {
//        ProjectListModule.init("name", "asc");
//        $('#ProjectNameSortIcon').removeClass();
//        $('#ProjectNameSortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function ProjectCurRateIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        ProjectListModule.init("current_rate", "desc");
//        $('#ProjectCurRateSortIcon').removeClass();
//        $('#ProjectCurRateSortIcon').addClass("desc");

//    }
//    else {
//        ProjectListModule.init("current_rate", "asc");
//        $('#ProjectCurRateSortIcon').removeClass();
//        $('#ProjectCurRateSortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function ProjectyoyIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        ProjectListModule.init("cagr_last_1yr", "desc");
//        $('#ProjectYoySortIcon').removeClass();
//        $('#ProjectYoySortIcon').addClass("desc");
//    }
//    else {
//        ProjectListModule.init("cagr_last_1yr", "asc");
//        $('#ProjectYoySortIcon').removeClass();
//        $('#ProjectYoySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function Projectcagr3yIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        ProjectListModule.init("cagr_last_3yr", "desc");
//        $('#Projectcagr3ySortIcon').removeClass();
//        $('#Projectcagr3ySortIcon').addClass("desc");

//    }
//    else {
//        ProjectListModule.init("cagr_last_3yr", "asc");
//        $('#Projectcagr3ySortIcon').removeClass();
//        $('#Projectcagr3ySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}
//function Projectcagr5yIconClick(event) {
//    $('#overlay').fadeIn();
//    if (event.currentTarget.className == "asc") {
//        ProjectListModule.init("cagr_last_5yr", "desc");
//        $('#Projectcagr5ySortIcon').removeClass();
//        $('#Projectcagr5ySortIcon').addClass("desc");

//    }
//    else {
//        ProjectListModule.init("cagr_last_5yr", "asc");
//        $('#Projectcagr5ySortIcon').removeClass();
//        $('#Projectcagr5ySortIcon').addClass("asc");
//    }
//    $('#overlay').fadeOut();
//}

$("input[name=projects-search]").click(function () {
    if (this.value == "locations") {
        var resultroutingurl = utility.FrontEndAPIURL('list/location/0/0/' + keepProjectListData[0].region_or_city_id_pi_input);
        window.location.href = resultroutingurl;
    }
    else if (this.value == "pincodes") {
        var resultroutingurl = utility.FrontEndAPIURL('list/pincode/0/0/' + keepProjectListData[0].region_or_city_id_pi_input);
        window.location.href = resultroutingurl;
    }
    else {

    }
});

function ProjectTrendsRoute(id) {
    var resultroutingurl = utility.FrontEndAPIURL('trend/project/' + id + '/projectText');
    window.location.href = resultroutingurl;
}




