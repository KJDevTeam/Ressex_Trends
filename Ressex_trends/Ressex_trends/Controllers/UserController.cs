using Newtonsoft.Json;
using Ressex_trends.Models;
using Ressex_trends.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Ressex_trends.Controllers
{
    public class UserController : Controller
    {
        [Route("")]
        [Route("Home")]
        public ActionResult Login()
        {
            var _loginModel = new LoginModel();
            _loginModel.email_id = "demo@demo.com";
            _loginModel.password = "demo";
            return View(_loginModel);
        }

        [HttpPost]
        [Route("")]
        [Route("Home")]
        public async Task<ActionResult> Login(LoginModel lm)
        {
            HttpClient client = new HttpClient();
            try
            {
                //initializing Token for reuse
                //var _loginModel = new LoginModel();
                var serializedData = JsonConvert.SerializeObject(lm);

                var stringContent = new StringContent(serializedData, UnicodeEncoding.UTF8, "application/json");
                var streamTask1 = await client.PostAsync("https://api.liasesforas.com/LF/api/Dashboard/Login", stringContent);
                if (streamTask1.IsSuccessStatusCode)
                    {
                    var response = streamTask1.Content.ReadAsStringAsync().Result;
                    var user_deatils = JsonConvert.DeserializeObject<UserDetailsModel>(response);
                    if (user_deatils.status == "OK")
                    {

                        // Create a Cookie with a suitable Key.
                        HttpCookie nameCookie = new HttpCookie("access_token");
                        //HttpCookie refresh_token = new HttpCookie("refresh_token");
                        HttpCookie userDetails = new HttpCookie("user_details");
                        var access_token = user_deatils.token.access_token;

                        //Set the Cookie value.
                        nameCookie.Value = access_token;
                        userDetails.Value = response;

                        //nameCookie.Values["access_token1"] = access_token;

                        //Set the Expiry date.
                        nameCookie.Expires = DateTime.Now.AddSeconds(Convert.ToDouble(user_deatils.token.expires_in));
                        userDetails.Expires = DateTime.Now.AddSeconds(Convert.ToDouble(user_deatils.token.expires_in) * 2);

                        //Add the Cookie to Browser.
                        Response.Cookies.Add(nameCookie);
                        Response.Cookies.Add(userDetails);


                        //Session["UserDetails"] = user_deatils;
                        return RedirectToRoute("Dashboard");
                    }
                    else
                    {
                        ViewBag.NotValidUser = user_deatils.message;
                    }
                }
                else
                {
                    ViewBag.NotValidUser = "Login Error";
                }
            }
            catch (Exception e)
            {
                ViewBag.NotValidUser = e.Message;
            }
            return View();
        }

        public ActionResult Logout()
        {
            Session.Clear();
            Session.Abandon();
            return RedirectToAction("Login", "User");
        }
    }
}