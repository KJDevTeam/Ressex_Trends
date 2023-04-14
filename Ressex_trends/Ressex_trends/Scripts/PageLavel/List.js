var ListModule = function () {
    return {
        init: function () {

            var QueryStringARR = common.GetQueryString();
            var result = common.GetTrendsTypePayload(QueryStringARR);

            var userdetails = common.CheckIsPaid();
            UserType = userdetails.UserType;
            if (UserType != "Paid") {

            }
            else {



            }

            if (result.TrendsType == "pincode") {
                var jsonstr = {
                    "pincode": result.Id,
                }
            }
           

            var Payload = {
                "lookup": "Project",
                "json_str": JSON.stringify(jsonstr)
            }

            var APIkey = utility.ServiceAPIURL("Dashboard/PriceIndexList");
            var Data = utility.ajaxselect(APIkey, Payload, "Post", false);

            TotalData = Data;
            console.log(Data);

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

        }
       
    }
}();