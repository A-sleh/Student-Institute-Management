using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class TestData : ITestData
    {
        private readonly ISqlDataAccess _db;
        public TestData(ISqlDataAccess _db)
        {
            this._db = _db;
        }

        public async Task<IEnumerable<ReportModel>> GetTestByReportId(int id)
        {
            var dic = new Dictionary<int, ReportModel>();
            var res = await _db.LoadData<dynamic, ReportModel, TestModel, SubjectModel>(
                "dbo.TestGet",
                parameters: new { ReportId = id },
                x: (Report, Test, Subject) =>
                {
                    Test.Subject = Subject;
                    if(dic.TryGetValue(Report.ReportId, out var rep))
                    {
                        Report = rep;
                    }
                    else
                    {
                        dic.Add(Report.ReportId, Report);
                    }
                    Report.Tests.Add(Test);
                    return Report;
                },
                splitOn: "TestId, SubjectId"
                );
            return res.Distinct();
        }
    }
}
