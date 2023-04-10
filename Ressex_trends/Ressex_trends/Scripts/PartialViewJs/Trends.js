var TotalData = '';
var TotalData1 = '';
var Bardatasource = '';
var UserType = '';

var TrendsModule = function () {
    return {
        init: function () {
           
            var QueryStringARR = common.GetQueryString();
            var result = common.GetProjectTypeandProjectID(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {

                //Transaction Distribution
                $("#TransactionGraphTable").hide();
                $("#TransactionRadio").hide();
                $("#Transactionloginmask").show();

                //Property Type Distribution
                $("#PropertyTypeDistributionGraphTable").hide();
                $("#PropertyTypeDistributionRadio").hide();
                $("#PropertyTypeDistributionloginmask").show();



            }
            else {

                //Login Mask Hide
                $("#Transactionloginmask").hide();
                $("#PropertyTypeDistributionloginmask").hide();


                //No Data available Mask Hide
                $("#TransactionNodatamask").hide();
                $("#PropertyTypeDistributionNodatamask").hide();

            }




            filterValues = common.IsFilterSelcted();
            var Payload = common.Payload("GET_TRANSACTION_TREND", "0", result.ProjectID, "1", filterValues)
            var APIkey = utility.ServiceAPIURL("/IGR/GetIGR");
            var Data = utility.ajaxselect(APIkey, Payload, "Post", false);
            var Payload1 = common.Payload("GET_CARPET_PRICE_TREND", "0", result.ProjectID, "1", filterValues)
            var Data1 = utility.ajaxselect(APIkey, Payload1, "Post", false);
            TotalData = Data;
            TotalData1 = Data1;
            console.log("TotalData: ")
            console.log(TotalData);
            console.log("TotalData1: ")
            console.log(TotalData1);
            if (Data.status == "OK") {
                TrendsModule.TransuctionBarChat(TotalData);
            }
            else {
                TrendsModule.TransuctionBarChat();
            }
            if (Data1.status == "OK") {
                TrendsModule.lineareaChat(TotalData1);
            }
            else {
                TrendsModule.lineareaChat();
            }

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
        //TranTableLoad: function (dt) {
        //    var st = '';
        //    $("#Trandata").empty();
        //    for (i = 0; i < dt.length; i++) {
        //        var sl = i + 1;
        //        st += '<tr>\
        //            <td class="text-center">'+ sl + '</td>\
        //            <td>'+ dt[i].registration_date + '</td>\
        //            <td class="text-center">'+ dt[i].transaction_count + '</td>\
        //        </tr>';
        //    }
        //    $("#Trandata").append(st);
        //},
        lineareaChat: function (TotalData1, att) {
            var lbl = [];
            var Linedt = [];
            var ticks = [];
            var axistxt = [];
            var hovervals = [];
            var colour = [];


            console.log(LineData);
            switch (att) {
                case 'radioDaily':
                    if ($("input[name=carpetAlert]:checked").val() == "0" &&
                        $("input[name=Property]:checked").val() == "0") {
                        var LineData = TotalData1 != undefined ? TotalData1.data.daily_avg_price_trend : [];
                        $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                       
                        var st = '';
                        $("#Carpetdata").empty();
                        for (i = 0; i < LineData.length; i++)
                        {
                            var sl = i + 1;
                            st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].registration_date + '</td>\
                                   <td>'+ LineData[i].avg_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].transaction_count + '</td>\
                                   </tr>';
                        }
                        $("#Carpetdata").append(st);
                    }
                    else {
                        var LineData = TotalData1.data.daily_median_price_trend;
                        ifmedian = true;
                       /* TrendsModule.CarpetTableLoad(LineData, ifmedian);*/
                        $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                        var st = '';
                        $("#Carpetdata").empty();
                        for (i = 0; i < LineData.length; i++) {
                            var sl = i + 1;
                            st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].registration_date + '</td>\
                                   <td>'+ LineData[i].median_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].transaction_count + '</td>\
                                   </tr>';
                        }
                        $("#Carpetdata").append(st);
                    }
                    $.map(LineData, function (value, index) {
                        lbl.push(value.registration_date);
                        Linedt.push(value.transaction_count);
                        hovervals.push(value.transaction_count);
                    });

                    break;
                case 'radioMonthly':
                    if ($("input[name=carpetAlert]:checked").val() == "0" &&
                        $("input[name=Property]:checked").val() == "1") {
                        var LineData = TotalData1 !=undefined?TotalData1.data.monthly_avg_price_trend:[];
                        $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                        var st = '';
                        $("#Carpetdata").empty();
                        for (i = 0; i < LineData.length; i++) {
                            var sl = i + 1;
                            st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].registration_month + '</td>\
                                   <td>'+ LineData[i].avg_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].transaction_count + '</td>\
                                   </tr>';
                        }
                        $("#Carpetdata").append(st);

                    }
                    else {
                        var LineData = TotalData1.data.monthly_median_price_trend;
                        $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                        var st = '';
                        $("#Carpetdata").empty();
                        for (i = 0; i < LineData.length; i++) {
                            var sl = i + 1;
                            st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].registration_month + '</td>\
                                   <td>'+ LineData[i].median_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].transaction_count + '</td>\
                                   </tr>';
                        }
                        $("#Carpetdata").append(st);
                    }
                    $.map(LineData, function (value, index) {
                        lbl.push(value.registration_month);
                        Linedt.push(value.transaction_count);
                        hovervals.push(value.transaction_count);
                    });
                    break;
                case 'radioQuaterly':
                    if ($("input[name=carpetAlert]:checked").val() == "0" &&
                        $("input[name=Property]:checked").val() == "2") {
                        var LineData = TotalData1 !=undefined?TotalData1.data.quarterly_avg_price_trend:[];
                        $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                        var st = '';
                        $("#Carpetdata").empty();
                        for (i = 0; i < LineData.length; i++) {
                            var sl = i + 1;
                            st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].dos_month_year + '</td>\
                                   <td>'+ LineData[i].avg_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].transaction_count + '</td>\
                                   </tr>';
                        }
                        $("#Carpetdata").append(st);
                    }
                    else {
                        var LineData = TotalData1.data.quarterly_median_price_trend;
                        $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                        var st = '';
                        $("#Carpetdata").empty();
                        for (i = 0; i < LineData.length; i++) {
                            var sl = i + 1;
                            st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].dos_month_year + '</td>\
                                   <td>'+ LineData[i].median_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].transaction_count + '</td>\
                                   </tr>';
                        }
                        $("#Carpetdata").append(st);
                    }
                    $.map(LineData, function (value, index) {
                        lbl.push(value.dos_month_year);
                        Linedt.push(value.transaction_count);
                        hovervals.push(value.transaction_count);
                    });
                    break;
                case 'radioYearly':
                    if ($("input[name=carpetAlert]:checked").val() == "0" &&
                        $("input[name=Property]:checked").val() == "3") {
                        var LineData = TotalData1 !=undefined?TotalData1.data.yearly_avg_price_trend:[];
                        $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                        var st = '';
                        $("#Carpetdata").empty();
                        for (i = 0; i < LineData.length; i++) {
                            var sl = i + 1;
                            st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].fy_year + '</td>\
                                   <td>'+ LineData[i].avg_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].transaction_count + '</td>\
                                   </tr>';
                        }
                        $("#Carpetdata").append(st);
                    }
                    else {
                        var LineData = TotalData1.data.yearly_median_price_trend;
                        $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                        var st = '';
                        $("#Carpetdata").empty();
                        for (i = 0; i < LineData.length; i++) {
                            var sl = i + 1;
                            st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].fy_year + '</td>\
                                   <td>'+ LineData[i].avg_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].median_carpet_price_psf + '</td>\
                                   </tr>';
                        }
                        $("#Carpetdata").append(st);
                    }
                    $.map(LineData, function (value, index) {
                        lbl.push(value.fy_year);
                        Linedt.push(value.transaction_count);
                        hovervals.push(value.transaction_count);
                    });
                    break;
                default:
                    var LineData = TotalData1 !=undefined?TotalData1.data.daily_avg_price_trend:[];
                    $("#PriceRsSqftHeading").text("Price(Rs / Sqft) Trend(Usable Record:" + LineData.length + ")");
                    var st = '';
                    $("#Carpetdata").empty();
                    for (i = 0; i < LineData.length; i++) {
                        var sl = i + 1;
                        st += '<tr>\
                                   <td class="text-center">'+ sl + '</td>\
                                   <td>'+ LineData[i].registration_date + '</td>\
                                   <td>'+ LineData[i].avg_carpet_price_psf + '</td>\
                                   <td class="text-center">'+ LineData[i].transaction_count + '</td>\
                                   </tr>';
                    }
                    $("#Carpetdata").append(st);

                    $.map(LineData, function (value, index) {
                        lbl.push(value.registration_date);
                        Linedt.push(value.transaction_count);
                        hovervals.push(value.transaction_count);
                    });
            }

            if (Linedt.length > 0 && UserType == "Paid") {
                $("#PropertyTypeDistributionGraphTable").show();
                $("#PropertyTypeDistributionNodatamask").hide();
                var hovervals = [];
                varcolour = [];
                ticks = {
                    min: 0,
                    max: 6,
                    stepSize: 1
                };
                colour = 'red'
                axistxt.push({ "X": 'Registration Date', "Y": 'Transaction Count' });
                titletxt = 'Transaction';
                var Linedatasource = utility.bindline("LineAreachart", lbl, Linedt, hovervals, ticks, true, colour, axistxt, titletxt)
                // var resp= utility.arraykeyvalue(TotalData1.data.daily_avg_price_trend)
                //    TrendsModule.CarpetTableLoad(TotalData1.data.daily_avg_price_trend);
            }
            else {
                if (UserType == "Paid") {
                    $("#PropertyTypeDistributionGraphTable").hide();
                    $("#PropertyTypeDistributionloginmask").hide();
                    $("#PropertyTypeDistributionDownload").hide();
                    $("#PropertyTypeDistributionRadio").hide();
                    $("#PropertyTypeDistributionNodatamask").show();
                }
                else {
                    $("#PropertyTypeDistributionGraphTable").hide();
                    $("#PropertyTypeDistributionloginmask").show();
                    $("#PropertyTypeDistributionDownload").show();
                    $("#PropertyTypeDistributionRadio").hide();
                    $("#PropertyTypeDistributionNodatamask").hide();
                }

            }
        },

        //CarpetTableLoad: function (dt) {
        //    var st = '';
        //    $("#Carpetdata").empty();

        //    for (i = 0; i < dt.length; i++) {
        //        var sl = i + 1;
        //        st += '<tr>\
        //            <td class="text-center">'+ sl + '</td>\
        //            <td>'+ dt[i].registration_date + '</td>\
        //            <td>'+ dt[i].avg_carpet_price_psf + '</td>\
        //            <td class="text-center">'+ dt[i].transaction_count + '</td>\
        //        </tr>';
        //    }
        //    $("#Carpetdata").append(st);
        //},

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
        TransactionMonthlyCsvExport: function (TotalData) {
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
                col1: "Registration Month",
                col2: "Transaction Count",
                col3: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.registration_month,     //.replace(/,/g, "|"),
                    col2: subitem.transaction_count,
                    col3: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Transaction Trends Monthly";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        TransactionQuaterlyCsvExport: function (TotalData) {
            //////CSV structure//////
            var arr = TotalData;
            var item = arr.length > 0 ? arr : [];
            var itemsFormatted = [];
            var blank = {
                col1: "",
                col2: "",
                col3: "",
                col4: "",

            };
            var header = {
                col1: "Month Year",
                col2: "Ordering FY Quater",
                col3: "Transaction Count",
                col4: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.dos_month_year,     //.replace(/,/g, "|"),
                    col2: subitem.ordering_fy_qtr,
                    col3: subitem.transaction_count,
                    col4: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Transaction Trends Quaterly";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        TransactionYearlyCsvExport: function (TotalData) {
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
                col1: "FY Year",
                col2: "Transaction Count",
                col3: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.fy_year,     //.replace(/,/g, "|"),
                    col2: subitem.transaction_count,
                    col3: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Transaction Trends Yearly";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        PropertyDailyCsvExport: function (TotalData) {
            //////CSV structure//////
            var arr = TotalData;
            var item = arr.length > 0 ? arr : [];
            var itemsFormatted = [];
            var blank = {
                col1: "",
                col2: "",
                col3: "",
                col4: ""

            };
            var header = {
                col1: "Registration Date",
                col2: "Average Carpet Price",
                col3: "Transaction Count",
                col4: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.registration_date,
                    col2: subitem.avg_carpet_price_psf,
                    col3: subitem.transaction_count,
                    col4: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Property Type Distribution Trends Daily";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        PropertyMonthlyCsvExport: function (TotalData) {
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
                col1: "Registration Month",
                col2: "Average Carpet Price",
                col3: "Transaction Count",
                col4: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.registration_month,
                    col2: subitem.avg_carpet_price_psf,
                    col3: subitem.transaction_count,
                    col4: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Property Type Distribution Trends Monthly";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        PropertyQuaterlyCsvExport: function (TotalData) {
            //////CSV structure//////
            var arr = TotalData;
            var item = arr.length > 0 ? arr : [];
            var itemsFormatted = [];
            var blank = {
                col1: "",
                col2: "",
                col3: "",
                col4: "",

            };
            var header = {
                col1: "Month Year",
                col2: "Ordering FY Quater",
                col3: "Average Carpet Price",
                col4: "Transaction Count",
                col5: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.dos_month_year,     //.replace(/,/g, "|"),
                    col2: subitem.ordering_fy_qtr,
                    col3: subitem.avg_carpet_price_psf,
                    col4: subitem.transaction_count,
                    col5: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Property Type Distribution Trends Quaterly";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        },
        PropertyYearlyCsvExport: function (TotalData) {
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
                col1: "FY Year",
                col2: "Average Carpet Price",
                col3: "Transaction Count",
                col4: "Transacted Value RS"

            };
            var items = arr.length > 0 ? arr : [];

            items.forEach((subitem) => {
                var details = {
                    col1: subitem.fy_year,
                    col2: subitem.avg_carpet_price_psf,
                    col3: subitem.transaction_count,
                    col4: subitem.transacted_value_rs,

                }
                itemsFormatted.push(details);

            });
            var fileTitle = "Property Type Distribution Trends Yearly";

            utility.exportCSVFile(header, itemsFormatted, fileTitle)
        }
    }
}();
$("input[name=carpetAlert]").click(function () {
    if ($("input[name=Property]:checked").val() == "0") {
        TrendsModule.lineareaChat(TotalData1, 'radioDaily');
    } else if ($("input[name=Property]:checked").val() == "1") {
        TrendsModule.lineareaChat(TotalData1, 'radioMonthly');
    }
    else if ($("input[name=Property]:checked").val() == "2") {
        TrendsModule.lineareaChat(TotalData1, 'radioQuaterly');
    }
    else if ($("input[name=Property]:checked").val() == "3") {
        TrendsModule.lineareaChat(TotalData1, 'radioYearly');
    }
});
$('#radioDaily').click(function () {
    TrendsModule.lineareaChat(TotalData1, 'radioDaily');

});
$('#radioMonthly').click(function () {
    TrendsModule.lineareaChat(TotalData1, 'radioMonthly');
});
$('#radioQuaterly').click(function () {
    TrendsModule.lineareaChat(TotalData1, 'radioQuaterly');
});
$('#radioYearly').click(function () {
    TrendsModule.lineareaChat(TotalData1, 'radioYearly');
});
$('#TranDaily').click(function () {
    TrendsModule.TransuctionBarChat(TotalData, 'TranDaily');
});
$('#TranMonthly').click(function () {
    TrendsModule.TransuctionBarChat(TotalData, 'TranMonthly');
});
$('#TranQuaterly').click(function () {
    TrendsModule.TransuctionBarChat(TotalData, 'TranQuaterly');
});
$('#TranYearly').click(function () {
    TrendsModule.TransuctionBarChat(TotalData, 'TranYearly');
});

$("input[name=TranAlert]").click(function () {
    TrendsModule.TransuctionBarChat(TotalData);
});
//$("input[name=carpetAlert]").click(function () {
//    TrendsModule.lineareaChat(TotalData1);
//});
$("#TransactionDownload").click(function () {

    const radioButtons = document.querySelectorAll('input[name="Transuction"]');

    let selectedSize;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.id;
            break;
        }
    }
    switch (selectedSize) {

        case "TranDaily":
            TrendsModule.TransactionDailyCsvExport(TotalData.data.daily_transaction_trend);
            break;
        case "TranMonthly":
            TrendsModule.TransactionMonthlyCsvExport(TotalData.data.monthly_transaction_trend);
            break;
        case "TranQuaterly":
            TrendsModule.TransactionQuaterlyCsvExport(TotalData.data.quarterly_transaction_trend);
            break;
        case "TranYearly":
            TrendsModule.TransactionYearlyCsvExport(TotalData.data.yearly_transaction_trend);
            break;
        default:
            TrendsModule.TransactionDailyCsvExport(TotalData.data.daily_transaction_trend);
            break;



    }


    console.log(selectedSize);


});

$("#PropertyTypeDistributionDownload").click(function () {

    const radioButtons = document.querySelectorAll('input[name="Property"]');

    let selectedSize;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedSize = radioButton.id;
            break;
        }
    }
    switch (selectedSize) {

        case "radioDaily":
            TrendsModule.PropertyDailyCsvExport(TotalData1.data.daily_avg_price_trend);
            break;
        case "radioMonthly":
            TrendsModule.PropertyMonthlyCsvExport(TotalData1.data.monthly_avg_price_trend);
            break;
        case "radioQuaterly":
            TrendsModule.PropertyQuaterlyCsvExport(TotalData1.data.quarterly_avg_price_trend);
            break;
        case "radioYearly":
            TrendsModule.PropertyYearlyCsvExport(TotalData1.data.yearly_avg_price_trend);
            break;
        default:
            TrendsModule.PropertyDailyCsvExport(TotalData1.data.daily_avg_price_trend);
            break;



    }


    console.log(selectedSize);


});

