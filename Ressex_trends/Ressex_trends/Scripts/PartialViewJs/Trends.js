var RspData;
var result;
var TotalData = '';
var TotalData1 = '';
var Bardatasource = '';
var UserType = '';

var TrendsModule = function () {
    return {
        init: function () {
            $("#valTxt").text('Just one step away from getting your current property valuation...');
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
                "lookup": "Project",
                "json_str": JSON.stringify(jsonstr)
            }
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            RspData = utility.ajaxselect(APIkey, Payload, "Post", false);
            
            TotalData = RspData;
            console.log(RspData);
            $("#screenName").text(RspData.data[0].screen_name);
            $("#qtrText").text(RspData.data[0].current_qtr_text);
            $("#rateTxt").text(RspData.data[0].current_rate_in_txt);
            $("#cagrPct").text(RspData.data[0].cagr_last_1yr_pct);
            common.dtpicker_cal("#fromDateID");
            TrendsModule.Multilinegraph();
            /*moment().startOf('year');*/
            
            //if (Data.status == "OK") {
            //    TrendsModule.TransuctionBarChat(TotalData);
            //}
            //else {
            //    TrendsModule.TransuctionBarChat();
            //}
            //if (Data1.status == "OK") {
            //    TrendsModule.lineareaChat(TotalData1);
            //}
            //else {
            //    TrendsModule.lineareaChat();
            //}

           //$("#TranBarColoumn").attr("width", $("#TranchartView").width() - 30 + 'px');
            
        },
        TransuctionBarChat: function (TotalData, att) {

            switch (att) {
                case 'TranDaily':
                    var dt = TotalData !=undefined?TotalData.data.daily_transaction_trend:[];

                    var str = '';
                    $("#Trandata").empty();
                    for (i = 0; i < dt.length; i++) {
                        var sln = i + 1;
                        str += '<tr>\
                    <td class="text-center">'+ sln + '</td>\
                    <td>'+ dt[i].registration_date + '</td>\
                    <td class="text-center">'+ dt[i].transaction_count + '</td>\
                </tr>';
                    }
                    $("#Trandata").append(str);

                    break;
                case 'TranMonthly':
                    var dt = TotalData !=undefined?TotalData.data.monthly_transaction_trend:[];

                    var str = '';
                    $("#Trandata").empty();
                    for (i = 0; i < dt.length; i++) {
                        var sln = i + 1;
                        str += '<tr>\
                    <td class="text-center">'+ sln + '</td>\
                    <td>'+ dt[i].registration_month + '</td>\
                    <td class="text-center">'+ dt[i].transaction_count + '</td>\
                </tr>';
                    }
                    $("#Trandata").append(str);
                    break;
                case 'TranQuaterly':
                    var dt = TotalData !=undefined?TotalData.data.quarterly_transaction_trend:[];

                    var str = '';
                    $("#Trandata").empty();
                    for (i = 0; i < dt.length; i++) {
                        var sln = i + 1;
                        str += '<tr>\
                    <td class="text-center">'+ sln + '</td>\
                    <td>'+ dt[i].dos_month_year + '</td>\
                    <td class="text-center">'+ dt[i].transaction_count + '</td>\
                </tr>';
                    }
                    $("#Trandata").append(str);
                    break;
                case 'TranYearly':
                    var dt = TotalData !=undefined?TotalData.data.yearly_transaction_trend:[];

                    var str = '';
                    $("#Trandata").empty();
                    for (i = 0; i < dt.length; i++) {
                        var sln = i + 1;
                        str += '<tr>\
                    <td class="text-center">'+ sln+ '</td>\
                    <td>'+ dt[i].fy_year + '</td>\
                    <td class="text-center">'+ dt[i].transaction_count + '</td>\
                </tr>';
                    }
                    $("#Trandata").append(str);
                    break;
                default:
                    var dt = TotalData !=undefined?TotalData.data.daily_transaction_trend:[];
                    att = 'TranDaily';

                    var str = '';
                    $("#Trandata").empty();
                    for (i = 0; i < dt.length; i++) {
                        var sln = i + 1;
                        str += '<tr>\
                    <td class="text-center">'+ sln + '</td>\
                    <td>'+ dt[i].registration_date + '</td>\
                    <td class="text-center">'+ dt[i].transaction_count + '</td>\
                </tr>';
                    }
                    $("#Trandata").append(str);
            }
            
            if (dt.length > 0 && UserType == "Paid") {
                $("#TransactionNodatamask").hide();
                $("#TransactionGraphTable").show();

                if ($("input[name=TranAlert]:checked").val() == "0") {
                    var param = ["transaction_count"];
                    var Ytext = 'Transaction Count';
                }
                else {
                    var param = ["transacted_value_rs"];
                    var Ytext = 'Transacted Value';
                }
                var Xtext = 'Ragistration Date'
                Bardatasource = utility.bindColoumnchart("TranBarColoumn", param, dt, Ytext, Xtext, att);
               

                var canvas = document.getElementById('TranBarColoumn');
                canvas.onclick = function (evt) {
                    var activePoint = Bardatasource.getElementsAtXAxis(evt)[0];//getElementAtEvent
                    var data = activePoint._chart.data;
                    console.log(data);
                    var datasetIndex = activePoint._datasetIndex;
                    var label = data.datasets[datasetIndex].label;
                    var value = data.datasets[datasetIndex].iddata[activePoint._index];

                };
               // TrendsModule.TranTableLoad(TotalData.data.daily_transaction_trend);
            }
            else {

                if (UserType == "Paid") {

                    $("#TransactionGraphTable").hide();
                    $("#Transactionloginmask").hide();
                    $("#TransactionDownload").hide();
                    $("#TransactionRadio").hide();
                    $("#TransactionNodatamask").show();
                }
                else {
                    $("#TransactionGraphTable").hide();
                    $("#Transactionloginmask").show();
                    $("#TransactionDownload").show();
                    $("#TransactionRadio").hide();
                    $("#TransactionNodatamask").hide();
                }
            }
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
            //data= [0, 59, 75, 20, 20, 55, 40],
            var projectLine = [];
            var PincodeLine = [];
            var SubRegionLine = [];
            var RegionLine = [];
            var CityLine = [];
            var Graphlabels = [];
            TotalData.data.forEach(function (item) {
                projectLine.push(item.project_saleable_rate);
                PincodeLine.push(item.pincode_saleable_rate);
                SubRegionLine.push(item.subregion_or_suburb_saleable_rate);
                RegionLine.push(item.region_saleable_rate);
                CityLine.push(item.city_saleable_rate);

                Graphlabels.push(item.dos_month_year);
                
                
                
                
                
                
                
                
            });

            var dataFirst = {
                label: "Project",
                data: projectLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].project_color
            };

            var dataSecond = {
                label: "Pincode",
                data: PincodeLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].pincode_color
            };
            var dataThird = {
                label: "Sub Region",
                data: SubRegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].region_color
            };

            var dataFourth = {
                label: "Region",
                data: RegionLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].suburb_color
            };
            var dataFifth = {
                label: "City",
                data: CityLine,
                lineTension: 0,
                fill: false,
                borderColor: TotalData.data[0].city_color
            };
           // label.push(item.dos_month_year);
           
            label = Graphlabels;
               
           
            //    TotalData.data.forEach(function (item) {
            //    totaldataset.push({
            //        //"label": "lbl",
            //        "data": item.project_saleable_rate,  //OsgroupbyDate
            //        "fill": false,
            //        "borderColor": item.project_color, //randomcolour(),
            //        "backgroundColor": item.project_color
            //    });
            //        label.push(item.dos_month_year);
            //});
            
            var totaldataset = [];
            totaldataset.push(dataFirst);
            totaldataset.push(dataSecond);
            totaldataset.push(dataThird);
            totaldataset.push(dataFourth);
            totaldataset.push(dataFifth);

                axistxt.push({ "X": 'Quater', "Y": 'Saleable Rate in ₹/sqft' });
          
            //  label = OsgroupbyDate;
            var Linedatasource = utility.bindmultilinedinamic("scanline", totaldataset, true, axistxt, label, ticks);
           
           
        },
        getvaluation: function (SName) {
            switch (SName) {
                case "project":
                    var jsonstr = {
                        "id": result.Id,
                        "pin_input": RspData.data[0].pincode,
                        "orig_value_rs": $("#Orgvalue").val(),
                        "orig_date": $("#fromDateID").val()
                    }
                    var Payload = {
                        "lookup": "project_valuation",
                        "json_str": JSON.stringify(jsonstr)
                    }
                    break;
                    //return Payload;
                case "location":
                    var jsonstr = {
                        "id": result.locationid,
                        "orig_value_rs": $("#Orgvalue").val(),
                        "orig_date": $("#fromDateID").val()
                    }
                    var Payload = {
                        "lookup": "location_valuation",
                        "json_str": JSON.stringify(jsonstr)
                    }
                        break;
                    //return Payload;
                case "pincode":
                    var jsonstr = {
                        "id": result.pincode,
                        "orig_value_rs": $("#Orgvalue").val(),
                        "orig_date": $("#fromDateID").val()
                    }
                    var Payload = {
                        "lookup": "pincode_valuation",
                        "json_str": JSON.stringify(jsonstr)
                    }
                    break;
                    //return Payload;
              
                case "city":
                    var jsonstr = {
                        "id": result.city_id,
                        "orig_value_rs": $("#Orgvalue").val(),
                        "orig_date": $("#fromDateID").val()
                    }
                    var Payload = {
                        "lookup": "city_valuation",
                        "json_str": JSON.stringify(jsonstr)
                    }
                    //return Payload;
                    break;
            }
            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndex");
            var retData = utility.ajaxselect(APIkey, Payload, "Post", false);
            console.log(retData);

            if (retData.status == "OK") {
                $("#currVal").text(retData.data[0].current_valuation_rs);
                $("#valTxt").text(retData.data[0].current_value_text_popup);
            }
            else {
                $("#currVal").text('');
                $("#valTxt").text('');
            }

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

$("#getValuation").click(function () {
   // var SearchName = Cookies.get('SearchName');
    //var SName = utility.getCookie('SearchName');

    TrendsModule.getvaluation('project');
});

