var RspData;
var result;

var TotalData1 = '';
var Bardatasource = '';
var UserType = '';

var CityTrendsModule = function () {
    var TotalData;
    return {
        init: function () {
            $("#valTxtCity").text('Just one step away from getting your current property valuation...');
            var QueryStringARR = common.GetQueryString();
            result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {

            }
            else {
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
                    CountryLine.push(item.country_saleable_rate);
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
                label: "Country",
                data: CountryLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].Country_color
            };
            var dataFifth = {
                label: "City",
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };

            label = Graphlabels;




            var totaldataset = [];

           
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

            axistxt.push({ "X": 'Quater', "Y": 'Saleable Rate in ₹/sqft' });

            //  label = OsgroupbyDate;
            var Linedatasource = utility.bindmultilinedinamic("scanlineCity", totaldataset, true, axistxt, label, ticks);


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
        TransactionDailyCsvExport: function (TotalData) {
            //////CSV structure//////
            var arr = TotalData;
            var item = arr.length > 0 ? arr : [];
            var itemsFormatted = [];
            var blank = {
                col1: "",
                col2: "",
                col3: "",

            };
            var header = {
                col1: "Registration Date",
                col2: "Transaction Count",
                col3: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.registration_date,     //.replace(/,/g, "|"),
                    col2: subitem.transaction_count,
                    col3: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Transaction Trends Daily";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },

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

function goBackCity() {
    window.history.back()
}

