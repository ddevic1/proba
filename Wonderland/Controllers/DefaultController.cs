using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using Wonderland.Models;

namespace Wonderland.Controllers
{
    public class DefaultController : Controller
    {


        /*   [OutputCache(Location = OutputCacheLocation.None)]
           public ActionResult Comments()
           {
               return Json(_comments, JsonRequestBehavior.AllowGet);
           }

           [HttpPost]
           public ActionResult AddComment(CommentModel comment)
           {
               //Create a fake ID for this comment
               comment.Id = _comments.Count + 1;
               _comments.Add(comment);
               return Content("Success :)");


           }*/
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddUser(User user)
        {

            using (WonderlandDBEntities dc = new WonderlandDBEntities())
            {
                dc.User.Add(user);
                dc.SaveChanges();

            }
            return Content("Success :)");
        }

        [HttpGet]
        public JsonResult DisplayUsers()
        {
            using(WonderlandDBEntities dc = new WonderlandDBEntities())
            {
                var data = dc.User.OrderBy(a => a.Name).ToList();
                return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        [HttpGet]
        public JsonResult GetFriends(Int64 _id)
        {
            using (WonderlandDBEntities1 dc = new WonderlandDBEntities1())
            {
                var friends = dc.Friends.Where(x => x.UserFK == _id).ToList();
                
                
                using (WonderlandDBEntities dc1 = new WonderlandDBEntities())
                {
                    var data = dc1.User.ToList();
                    data.Clear();
                    foreach (Friends friend in friends)
                    {
                        data.AddRange(dc1.User.Where(x => x.UserId == friend.FriendFK).ToList());
                        
                    }

                    return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }
               
            }
        }
    }
}