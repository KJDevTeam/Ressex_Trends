using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Ressex_trends.Controllers
{
    public class ListController : Controller
    {
        // GET: List
        [Route("list/pincode/{id}/{id1}/{id2}")]
        public ActionResult pincode()
        {
            return View();
        }

        // GET: List
        [Route("list/location/{id}/{id1}/{id2}")]
        public ActionResult location()
        {
            return View();
        }

        // GET: List
        [Route("list/city/{id}/{id1}/{id2}")]
        public ActionResult city()
        {
            return View();
        }

        // GET: List
        [Route("list/city/{id}/{id1}/{id2}")]
        public ActionResult project()
        {
            return View();
        }
    }
}