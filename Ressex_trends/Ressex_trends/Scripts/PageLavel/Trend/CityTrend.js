var RspData;
var result;

var TotalData1 = '';
var Bardatasource = '';
var UserType = '';



var CityTrendsModule = function () {
    var TotalData;
    var graphvariable;
    var CheckboxIDs = [];
    return {
        init: function () {
            
            $("#valTxtCity").text('Just one step away from getting your current property valuation...');
            var QueryStringARR = common.GetQueryString();
            result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {
                $("#CityTrendGraphChanger").remove();
                $('#CityCheckbox').remove();
                $('#CityTrendGraph').hide();
            }
            else {
                $('#CityNologinmask').hide();
                $("#CityCheckboxNoLoginMask").remove();
            }
            var jsonstr = {
                "id": result.Id,
            }
            var Payload = {
                "lookup": "City",
                "json_str": JSON.stringify(jsonstr)
            }
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            RspData = utility.ajaxselect(APIkey, Payload, "Post", false);

            TotalData = RspData;
            console.log(RspData);
            $("#screenNameCity").text(RspData.data[0].screen_name);
            $("#qtrTextCity").text(RspData.data[0].current_qtr_text);
            $("#rateTxtCity").text(RspData.data[0].current_rate_in_txt);
            $("#cagrPctCity").text(RspData.data[0].cagr_last_1yr_pct);
            $("#CAGRDropDownTextCity").text("CAGR 3Y");
            $("#calculatedCAGRCity").text(RspData.data[0].cagr_last_3yr_pct);

            common.dtpicker_cal("#fromDateIDCity");
            CityTrendsModule.Multilinegraph();
            CityTrendsModule.checkboxTrend();


        },
        Multilinegraph: function () {

           /* chartClear();*/
            var label = [];
            var axistxt = [];
            ticks = {
                min: 0,
                max: 6,
                stepSize: 1
            };
            responsive = false;
            var totaldataset = [];
            var CountryLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {
                

                //Country Check
                if (item.country_saleable_rate == 0) {
                    CountryLine.push(null);
                }
                else {
                    CountryLine.push(item.india_saleable_rate);
                }

                //City Check

                if (item.city_saleable_rate == 0) {
                    CityLine.push(null);
                }
                else {
                    CityLine.push(item.city_saleable_rate);
                }

                Graphlabels.push(item.dos_month_year);
            });

            

            var dataFourth = {
                label: TotalData.data[0].country_text,
                labelvalue: TotalData.data[0].country,
                data: CountryLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].country_color
            };
            var dataFifth = {
                label: TotalData.data[0].city_text,
                labelvalue: TotalData.data[0].city_name,
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };

            label = Graphlabels;




            var totaldataset = [];

           
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Quarter', "Y": 'Saleable Rate in ₹/sqft' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlineCity", totaldataset, true, axistxt, label, ticks);


        },
        MultilinegraphIndex: function () {
            /* chartClear();*/
            var label = [];
            var axistxt = [];
            ticks = {
                min: 0,
                max: 6,
                stepSize: 1
            };
            responsive = false;
            var totaldataset = [];
            var CountryLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {


                //Country Check
                if (item.india_price_index == 0) {
                    CountryLine.push(null);
                }
                else {
                    CountryLine.push(item.india_price_index);
                }

                //City Check

                if (item.city_price_index == 0) {
                    CityLine.push(null);
                }
                else {
                    CityLine.push(item.city_price_index);
                }

                Graphlabels.push(item.dos_month_year);
            });



            var dataFourth = {
                label: TotalData.data[0].country_text,
                labelvalue: TotalData.data[0].country,
                data: CountryLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].country_color
            };
            var dataFifth = {
                label: TotalData.data[0].city_text,
                labelvalue: TotalData.data[0].city_name,
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };

            label = Graphlabels;




            var totaldataset = [];


            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Time', "Y": 'Price Index' });

            //  label = OsgroupbyDate;
            graphvariable = utility.bindmultilinedinamic("scanlineCity", totaldataset, true, axistxt, label, ticks);



        },
        getvaluation: function () {
            var jsonstr = {
                "id": result.Id,
                "orig_value_rs": $("#OrgvalueCity").val(),
                "orig_date": $("#fromDateIDCity").val()
            };
            var Payload = {
                "lookup": "city_valuation",
                "json_str": JSON.stringify(jsonstr)
            };

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            var retData = utility.ajaxselect(APIkey, Payload, "Post", false);
            console.log(retData);

            if (retData.status == "OK") {
                $("#currValCity").text(retData.data[0].current_valuation_rs);
                $("#valTxtCity").text(retData.data[0].current_value_text_popup);
            }
            else {
                $("#currValCity").text('');
                $("#valTxtCity").text('');
            }

        },
        CAGRCalculation: function (t) {
            var attributetobeUsed;
            if (TotalData.data[0].city_line_flag  == 1) {
                attributetobeUsed = "city_saleable_rate";
            }
            else if (TotalData.data[0].country_line_flag  == 1) {
                attributetobeUsed = "india_saleable_rate";
            }
            

            var formulaCalulator = common.CAGRFormularCalulation(t, (TotalData.data.length - 1), TotalData.data, attributetobeUsed);
            $("#calculatedCAGRCity").text(formulaCalulator);
        },
        CityCsvExport: function () {
            //////CSV structure//////
            var arr = TotalData.data;
            var item = arr.length > 0 ? arr : [];
            var itemsFormatted = [];
            var blank = {
                col1: "",
                col2: "",
                col3: "",

            };
            var header = {
                col1: "Quarter",
                col2: "city",
                col3: "state",                             
                col4: "city_saleable_rate_psf",
                col5: "city_price_index",
                col6: "city_price_index_tag",
                col7: "india_saleable_rate_psf",
                col8: "india_price_index",
                col9: "india_price_index_tag",

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.dos_month_year,     //.replace(/,/g, "|"),
                    col2: subitem.city,
                    col3: subitem.state,
                    col4: subitem.city_saleable_rate,     //.replace(/,/g, "|"),
                    col5: subitem.city_price_index,
                    col6: subitem.city_price_index_tag,
                    col7: subitem.india_saleable_rate,     //.replace(/,/g, "|"),
                    col8: subitem.india_price_index,
                    col9: subitem.india_price_index_tag,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "City_Trends";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        checkboxTrend: function () {
            const legend = $("#CityCheckbox");
            var st = ''
            st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox">\
                                <input type="checkbox" class="custom-control-input" onchange="cityALLchnage(event)" id="checkCityALL" checked="true">\
                                <label class="custom-control-label pointer" for="checkCityALL">ALL</label>\
                            </div>\
                            <div class="cityNameCol"></div>\
                        </div >';

            graphvariable.data.datasets.forEach((dataset, index) => {
                console.log('dataset' + dataset);
                CheckboxIDs.push("dataset"+index);
               /* onchange = citycheckboxchnage('+ id+')"*/
                st += '<div class="d-flex justify-content-between checkBtmSpace">\
                        <div class="custom-control custom-checkbox light-purple">\
                                <input type="checkbox" class="custom-control-input" onchange="citycheckboxchnage(event)" id="dataset'+ index +'" checked="true">\
                                <label class="custom-control-label pointer" for="dataset'+ index +'">'+dataset.label+'</label>\
                            </div>\
                            <div class="cityNameCol">'+ dataset.labelvalue+'</div>\
                        </div >';
            });

            $("#CityCheckbox").append(st);
        },
        checkboxEffect: function (e,allFlag,allflagValue) {

            if (allFlag && allflagValue) {
                graphvariable.data.datasets.forEach((dataset, index) => {
                    graphvariable.hide(index);
                });
                CheckboxIDs.forEach((item, index) => {
                    var controlID = "#" + item;
                    //$(controlID).removeAttr('checked'); // checks it
                    $(controlID).prop('checked', false); // unchecks it
                    //document.getElementById(controlID).checked = false;
                });

            }
            else if (allFlag && !allflagValue) {
                graphvariable.data.datasets.forEach((dataset, index) => {
                    graphvariable.show(index);
                });
                CheckboxIDs.forEach((item, index) => {
                    var controlID = '#' + item;
                    document.getElementById('dataset0');//.setAttribute('checked', 'checked');
                    //document.getElementById(controlID).checked = true;
                    //$(controlID).removeAttr('checked'); // checks it
                    $(controlID).prop('checked', true); // checks it
                    
                });
            }
            else {

                if (graphvariable.isDatasetVisible(e)) {
                    graphvariable.hide(e);
                }
                else {
                    graphvariable.show(e);
                }
            }
            
        }

    }
}();

$("#getValuationCity").click(function () {
    // var SearchName = Cookies.get('SearchName');
    //var SName = utility.getCookie('SearchName');

    CityTrendsModule.getvaluation();
});

$('#CAGRListCity a').on('click', function () {
    var value = $(this).html();
    $("#CAGRDropDownTextCity").text(value);

    var temp_t = value.split('Y')[0];
    var t = Number(temp_t.split(' ')[1]);
    CityTrendsModule.CAGRCalculation(t);
});

$("#CityTrendIndex").click(function () {

    $("#CityTrendIndex").addClass('active');
    $('#CityPriceIndex').removeClass('active');
    CityTrendsModule.MultilinegraphIndex();
});
$("#CityTrendPrice").click(function () {

    $("#CityTrendPrice").addClass('active');
    $('#CityTrendIndex').removeClass('active');
    CityTrendsModule.Multilinegraph();
});

$("#CityCSVDownload").click(function () {

    CityTrendsModule.CityCsvExport();
});

function citycheckboxchnage(event) {

    $('#checkCityALL').prop('checked', false); // Unchecks it
    console.log("change" + event.currentTarget.id);

    var value = event.currentTarget.id;
    var valuetobeSent = value.split('dataset')[1];
    CityTrendsModule.checkboxEffect(valuetobeSent);

}
function cityALLchnage(event) {

    
    if (event.target.checked) {
        CityTrendsModule.checkboxEffect(undefined, true, false);
    }
    else {
        CityTrendsModule.checkboxEffect(undefined,true,true);
    }
}


function goBackCity() {
    window.history.back()
}


