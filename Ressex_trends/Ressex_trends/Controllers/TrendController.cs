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
        [Route("trend/project/{id}/{id1}")]
        public ActionResult project()
        {
            return View();
        }

        [Route("trend/pincode/{id}/{id1}")]
        public ActionResult pincode()
        {
            return View();
        }

        [Route("trend/location/{id}/{id1}")]
        public ActionResult location()
        {
            return View();
        }

        [Route("trend/city/{id}/{id1}")]
        public ActionResult city()
        {
            return View();
        }

    }
}