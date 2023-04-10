var DashboardModule = function () {
    var stateId = 0;
    var DistrictId = 0;
    var TalukId = 0;
    var maindata = [];
    var projectType = "Residential";
    
    return {
        init: function () {
            
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
           var rsp= utility.ajaxselect(APIkey, " ", "Post", false);
            console.log(rsp);
            maindata = rsp.data;

           // FilterViewModule.init(maindata);

          //  $('#selectedProjectType').text('Residential');
          ///*  $('#projecType').val('Residential');*/
          //  var _filterSelected = localStorage.getItem('filterSelected');
          //  //if (_filterSelected != "") {
          //  //    localStorage.removeItem('filterSelected');
          //  //}
          // var APIkey = utility.ServiceAPIURL("/IGR/Filligrdropdown");
          // var rsp= utility.ajaxselect(APIkey, " ", "Get", false);
          //  console.log(rsp);
          //  maindata = rsp.data;
          //  FilterViewModule.init(maindata);
          //  $(".dropdown-menu li a").click(function () {
          //      $("#options").text($(this).text());
          //      // $("#projecType").text($(this).text());
          //      // var x = document.getElementById("options").value;
          //      var value = $(this).text();
          //      projectType = value;
          //      $('#selectedProjectType').text(value);
          //      $('#SelectedProject').text('');
                
          //     /* $('#projecType').val(value);*/
          //      DashboardModule.AutocompleteSearch(projectType);
          //     /* document.getElementById("projecType").value = value;*/
          //  });   
          //  DashboardModule.AutocompleteSearch(projectType);
        },
        AutocompleteSearch: function (projectTypetoLoad) {
           $("#SelectedProject").autocomplete({
               source: function (request, response) {
                    var formatterProjectType = projectTypetoLoad.toLowerCase().substring(0, 3);
                    var str = 't=PROJECT&opt={"PROJECT_TXT":"' + request.term + '","CITY_IDS":0}"&pt="' +formatterProjectType+ '"';
                    var APIkey = utility.ServiceAPIURL("/LFCommunity/Search?" + str);
                    $.ajax({
                        url: APIkey,
                        type: "GET",
                        dataType: "json",
                        data: {},
                        success: function (data) {
                            response($.map(data.data, function (item) {
                                return { id: item.id, label: item.name+item.hint, value: item.name+item.hint };
                            }))
                        },
                    })
                },
                select: function (event, ui) {
                    
                   /* document.getElementById("projecID").value = ui.item.id;*/
                   /* var projectType = document.getElementById("projecType").value;*/
                    var projectTypeID=common.getProjectTypeID(projectType);
                  
                    /* var formatterProjectType = projectType.toLowerCase().substring(0, 3);*/
                    var ProjectId =ui.item.id;
                    
                  // localStorage.setItem('filterSelected', JSON.stringify(filterModel));
                    var url = '' + ProjectId + '/' + projectTypeID + '';
                    var routingurl = utility.FrontEndAPIURL(url);
                    window.location.href = routingurl;
                },
                
            });
        }
    }
}();

function DateFlagChanged(date) {
    common.dtpicker(date, "#fromDateID", "#toDateID");
}
    //$("#SelectedProject").change(function () {
    //    alert("The text has been changed.");
    //});

function RouteToTransaction(id) {
    console.log('Route' + id);
    var url = '' + id + '';
    let formDate = moment().format("DD/MM/YYYY");
    let toDate = moment().format("DD/MM/YYYY");
    switch (id) {

        case "residential-sale-deals":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');
            common.ShortcutMenuFlterBinding(1, 1, formDate, toDate, "100", "Rent_Agreement_Value");

            break;
        case "residential-lease-rental-deals":

            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(1, 2, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        case "residential-land-sale-deals":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(3, 1, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        case "commercial-sale-deals":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(2, 1, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        case "commercial-lease-rental-deals":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(2, 2, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        case "mortgages":
            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(0, 3, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
        default:

            toDate = moment().format("DD/MM/YYYY");
            formDate = moment().subtract(3, 'months').format("DD/MM/YYYY");

            //Clear Existing Filter
            localStorage.removeItem('filterSelected');

            common.ShortcutMenuFlterBinding(0, 0, formDate, toDate, "100", "Rent_Agreement_Value");
            break;
    }

    filterdetails = common.IsFilterSelcted();
    var routingurl = utility.FrontEndAPIURL(url);
    window.location.href = routingurl;
}
//$("#SelectedProject").on("input", function (a) {
//    if ($("#SelectedProject").val().length>3) {
//        /*alert("The text has been changed.");*/
//        DashboardModule.AutocompleteSearch($("#SelectedProject").val());
//    }
//    // Print entered value in a div box
   
//});
