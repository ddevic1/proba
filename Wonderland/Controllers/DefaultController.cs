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
        static int[] friendsId = new int[] { };

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddUser(User user)
        {

            using (WonderlandEntities dc = new WonderlandEntities())
            {
                dc.User.Add(user);
                dc.SaveChanges();

            }
            return Content("Success :)");
        }


        [HttpGet]
        public JsonResult DisplayUsers()
        {
            using (WonderlandEntities dc = new WonderlandEntities())
            {
                var data = dc.User.OrderBy(x => x.Name).ToList();
            
                return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        [HttpPost]
        public ActionResult AddPost(Posts post)
        {

            using (WonderlandEntities dc = new WonderlandEntities())
            {
                dc.Posts.Add(post);
                dc.SaveChanges();

            }
            return Content("Success :)");
        }

        [HttpGet]
        public JsonResult GetFriends(Int64 _id)
        {
            friendsId = new int[] { };
            using (WonderlandEntities dc = new WonderlandEntities())
            {
                dc.Configuration.ProxyCreationEnabled = false;
                var friends = dc.Friends.Where(x => x.UserFK == _id).ToList();
                var data = dc.User.ToList();

                data.Clear();
                foreach (Friends friend in friends)
                {
                    var user = new User();
                    user.BirthDate = friend.User1.BirthDate;
                    user.Email = friend.User1.Email;
                    user.Name = friend.User1.Name;
                    user.Password = friend.User1.Password;
                    user.Surname = friend.User1.Surname;
                    user.UserId = friend.User1.UserId;
                    data.Add(user);
                    friendsId[friendsId.Length] = user.UserId;
                }
                Console.WriteLine(friendsId);
                return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
        }

        [HttpGet]
        public JsonResult GetPosts()
        {
            using (WonderlandEntities dc = new WonderlandEntities())
            {
                dc.Configuration.ProxyCreationEnabled = false;
                var IdList = new int[] { };
                
                var posts = dc.Posts.Join(dc.User,
                      p => p.UserFK,
                      e => e.UserId,
                      (p, e) => new {
                          Name = e.Name,
                          Surname = e.Surname,
                          Sequence = p.Sequence,
                          Location = p.Location,
                          Lat = p.Lat,
                          Lng = p.Lng,
                          Weather = p.Weather,
                          Image = p.ImageURL,
                          Id = e.UserId,
                          PostId = p.PostId
                      }
                      ).OrderByDescending(x => x.PostId).ToList();
                return new JsonResult { Data = posts, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
        }
    }
}
    