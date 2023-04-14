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

        [Route("list/pincode/{id}/{id1}")]
        public ActionResult Pincode()
        {
            return View();
        }
    }
}