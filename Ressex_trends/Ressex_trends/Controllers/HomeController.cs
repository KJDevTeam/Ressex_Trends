using Newtonsoft.Json;
using Ressex_trends.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace Ressex_trends.Controllers
{
    public class HomeController : Controller
    {
        [Route("Dashboard", Name = "Dashboard")]
        public ActionResult Index()
        {
            return View();
        }
       
        [Route("SearchPartialView", Name = "SearchPartialView")]
        public ActionResult _Searchview()
        {

            return PartialView();
        }

        [Route("Methodology", Name = "Methodology")]
        public ActionResult document()
        {
            return View();
        }

       

    }
}