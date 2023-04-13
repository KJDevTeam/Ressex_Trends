var searchType = "project";
var SearchModule = function () {
   
    return {
        init: function () {
            $('#selectedSearchType').text('Projects');
            SearchModule.AutocompleteSearch(searchType);

        },
        AutocompleteSearch: function (SearchType) {
            $("#SelectedSearch").autocomplete({
                autoFocus: true,
                source: function (request, response) {
                    if (request.term.length > 3) {
                        var str = 'query=' + request.term + '&type=' + SearchType;
                        var APIkey = utility.ServiceAPIURL("Dashboard/ressex_trend_search?" + str);
                        $.ajax({
                            url: APIkey,
                            type: "GET",
                            dataType: "json",
                            data: {},
                            beforeSend: function (xhr) {
                                var val = utility.checkCookie("access_token");
                                if (val == false) {
                                    var cName = "user_details";
                                    var user_details = utility.getCookie(cName);
                                    console.log(user_details);
                                    if (user_details != "") {
                                        var refresh_token = JSON.parse(user_details).token.refresh_token;
                                    }
                                    else {
                                        window.location.replace(window.location.origin);
                                    }
                                    var APIkey = utility.ServiceAPIURL("Dashboard/token?refresh_token=" + refresh_token);
                                    var rsp = utility.ajaxselectforRefreshToken(APIkey, "", "Get", false);
                                    if (rsp.status != "OK") {
                                        window.location.replace(window.location.origin);
                                    }
                                    console.log(rsp);
                                    utility.setCookie("access_token", rsp.access_token, rsp.expires_in);
                                }
                                xhr.setRequestHeader('Authorization', 'bearer ' + utility.getCookie("access_token"));
                            },
                            success: function (data) {
                                response($.map(data.data.suggestions, function (item) {
                                    return { id: item.id, label: item.name, value: item.name };
                                }))
                            },
                        })
                    }
                    
                },
                select: function (event, ui) {

                    /* document.getElementById("projecID").value = ui.item.id;*/
                    /* var projectType = document.getElementById("projecType").value;*/
                    var projectTypeID = common.getProjectTypeID(projectType);

                    /* var formatterProjectType = projectType.toLowerCase().substring(0, 3);*/
                    var ProjectId = ui.item.id;

                    // localStorage.setItem('filterSelected', JSON.stringify(filterModel));
                    var url = '' + ProjectId + '/' + projectTypeID + '';
                    var routingurl = utility.FrontEndAPIURL(url);
                    window.location.href = routingurl;
                },

            });
        }
        
    }
}();

$(".dropdown-menu li a").click(function () {

    $("#options").text($(this).text());
    var value = $(this).text();
    var tempSearchType;
    $('#selectedSearchType').text(value);
    if (value == "Pincode") {
        tempSearchType = "pincode";
    }
    else if (value == "Location") {
        tempSearchType = "location";
    }
    else if (value == "City") {
        tempSearchType = "city";
    }
    else {
        tempSearchType = "project";
    }

    SearchModule.AutocompleteSearch(tempSearchType)
   
});

$("#Search").click(function () {

    var routingurl = utility.FrontEndAPIURL('Trend/Project/0/1');
    window.location.href = routingurl;

});
