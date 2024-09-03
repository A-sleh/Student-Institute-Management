﻿using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class TeacherSubjectData : ITeacherSubjectData
    {
        private readonly ISqlDataAccess _db;
        public TeacherSubjectData()
        {

        }
        public TeacherSubjectData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        public async Task<IEnumerable<TeacherSubjectModel>> GetTeachersSubjectsWithSalary()
        {
            // NOT COMPLETE
            var dic = new Dictionary<int, TeacherModel>();
            var res = await _db.LoadData<dynamic, TeacherSubjectModel, TeacherModel, SubjectModel>(
                    "dbo.TeacherSubjectGetAll",
                    parameters: new { },
                    x: (TSM, Teacher, Subject) => {

                        return TSM;
                    },
                    splitOn: "TeacherId, SubjectId"
                    );
            return res;
        }
        public async Task DeleteSubjectForTeacher(int teacherSubjectId)
        {
            await _db.SaveData("dbo.TeacherSubjectDelete", new { teacherSubjectId });
        }
        public async Task InsertTeacherSubjects(TeacherSubjectModel model)
        {
            await _db.SaveData("dbo.TeacherSubjectInsert", new
            {
                model.TeacherId,
                model.Subject?.SubjectId,
                model.Salary
            });
        }

        public async Task UpdateTeacherSubject(TeacherSubjectModel model)
        {
            int? TeacherSubjectId =  _db.LoadData<int, dynamic>("dbo.TeacherSubjectGetId",
                new {
                    model.TeacherId,
                    model.Subject?.SubjectId
                }).Result?.FirstOrDefault();
            await _db.SaveData("dbo.TeacherSubjectUpdate", new
            {
                TeacherSubjectId,
                model.Subject?.SubjectId,
                model.Salary
            });
        }

        public async Task DeleteTeacherSubject(int TeacherSubjectId)
        {
            await _db.SaveData("dbo.TeacherSubjectDelete", new { TeacherSubjectId });
        }
    }
}
