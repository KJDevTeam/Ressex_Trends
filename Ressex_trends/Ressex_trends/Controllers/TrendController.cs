using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ressex_trends.Controllers
{
    public class TrendController : Controller
    {
        // GET: Trend
        [Route("Trend/Project/{id}/{id1}")]
        public ActionResult Project()
        {
            return View();
        }

        [Route("Trend/Pincode/{id}/{id1}")]
        public ActionResult Pincode()
        {
            return View();
        }


    }
}