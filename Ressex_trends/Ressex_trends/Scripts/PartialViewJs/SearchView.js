var searchType = "project";
var SearchModule = function () {
   
    return {
        init: function () {
            $('#selectedSearchType').text('Projects');
            SearchModule.AutocompleteSearch(searchType);

        },
        AutocompleteSearch: function (SearchType) {
            $("#SelectedSearch").autocomplete({
                minLength: 3,
                delay:500,
                source: function (request, response) {
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
                    
                    
                },
                //create: function () {
                //    $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                //        let value = item.value;
                //        let listItem;
                //        if (item.disabled) {
                //            listItem = $('<li class="ui-state-disabled"><div>' + value + '</div></li>')
                //                .appendTo(ul);
                //        } else {
                //            listItem = $("<li>")
                //                .append('<div>' + value + '</div>')
                //                .appendTo(ul);
                //        }
                //        return listItem;
                //    }
                //},
                select: function (event, ui) {

                    if (searchType == "pincode") {
                        var routingurl = utility.FrontEndAPIURL('list/pincode/' + ui.item.id + '/0/0');
                        window.location.href = routingurl;
                    }
                    else if (searchType == "city") {
                        var routingurl = utility.FrontEndAPIURL('list/city/0/0/' + ui.item.id );
                        window.location.href = routingurl;
                    }
                    else if (searchType == "location") {
                        var routingurl = utility.FrontEndAPIURL('list/location/0/' + ui.item.id + '/0');
                        window.location.href = routingurl;
                    }
                    else {
                        var routingurl = utility.FrontEndAPIURL('Trend/Project/' + ui.item.id + '/0');
                        window.location.href = routingurl;
                    }
                   
                    
                },

            });
        }
        
    }
}();

$(".dropdown-menu li a").click(function () {

    $("#options").text($(this).text());
    var value = $(this).text();
    searchType = value;
    var tempSearchType;
    $('#selectedSearchType').text(value);
    if (value == "Pincode") {
        tempSearchType = "pincode";
        searchType = tempSearchType;
    }
    else if (value == "Location") {
        tempSearchType = "location";
        searchType = tempSearchType;
    }
    else if (value == "City") {
        tempSearchType = "city";
        searchType = tempSearchType;
    }
    else {
        tempSearchType = "project";
        searchType = tempSearchType;
    }

    SearchModule.AutocompleteSearch(tempSearchType)
   
});

$('#Search').click(function () {

    if (searchType == "pincode") {
        var routingurl = utility.FrontEndAPIURL('list/pincode/0/0/1');
        window.location.href = routingurl;
    }
    else if (searchType == "city") {
        var routingurl = utility.FrontEndAPIURL('list/city/0/1');
        window.location.href = routingurl;
    }
    else if (searchType == "location") {
        var routingurl = utility.FrontEndAPIURL('list/location/0/1');
        window.location.href = routingurl;
    }
    else {
        var routingurl = utility.FrontEndAPIURL('Trend/Project/0/1');
        window.location.href = routingurl;
    }

   

});
