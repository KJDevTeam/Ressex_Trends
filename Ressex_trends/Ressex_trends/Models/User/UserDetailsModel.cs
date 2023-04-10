using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ressex_trends.Models.User
{
    public class UserDetailsModel
    {
        public Datamodel data { get; set; }
        public tokenModel token { get; set; }

        public string status { get; set; }
        public string message { get; set; }
    }

    public class Datamodel
    {
      public string user_id {get;set;}
        public string user_name { get; set; }
        public string client_id { get; set; }
        public string active_qtr_id { get; set; }
        public string active_qtr { get; set; }
        public string cookie { get; set; }
        public string product_id { get; set; }
       
    }

    public class tokenModel
    {
        public string status { get; set; }
        public string token_type { get; set; }
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        public string expires_in { get; set; }
        public string error { get; set; }
        

    }
}