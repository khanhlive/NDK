using ICB.Business.Models;
using System.Linq;

namespace ICB.Business.Access
{
    public class App_CounterProvider : ApplicationManager<Models.App_Counter, int>
    {
        public void SetCounter()
        {
            using (WebContext db = new WebContext())
            {
                var record = db.App_Counters.FirstOrDefault(p => p.Code == "APP_COUNTER");
                if (record == null)
                {
                    App_Counter app_Counter = new App_Counter { Code = "APP_COUNTER", Counter = 0 };
                    db.App_Counters.Add(app_Counter);
                    db.SaveChanges();
                }
                else
                {
                    record.Counter = record.Counter+1;
                    db.Entry(record).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                }
            }
        }
        public static int GetCounter()
        {
            using (WebContext db = new WebContext())
            {
                var record = db.App_Counters.FirstOrDefault(p => p.Code == "APP_COUNTER");
                if (record != null)
                {
                    return record.Counter;
                }
                else
                {
                    return 0;
                }
            }
        }
    }
}
