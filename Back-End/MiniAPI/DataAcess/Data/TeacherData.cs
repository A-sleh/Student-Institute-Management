﻿using DataAcess.DBAccess;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Runtime.CompilerServices;
using System.Runtime.ExceptionServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{
    public class TeacherData : ITeacherData
    {
        private readonly ISqlDataAccess _db;
        public TeacherData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        #region Data Request
        public async Task<IEnumerable<TeacherSubjectModel>> GetTeacherSubjects(int? gradeId)
        {
            var res = await _db.LoadData<dynamic, TeacherSubjectModel, TeacherModel, SubjectModel>(
                "dbo.TeacherSubjectGetAll", new { gradeId },
                (tsm, teacher, subject) =>
                {
                    tsm.Subject = subject;
                    tsm.Teacher = teacher;
                    return tsm;
                },
                splitOn: "TeacherId, SubjectId");
            return res;
        }

        private void ValidateId(int teacherId)
        {
            if(!_db.LoadData<dynamic,dynamic>("dbo.TeacherGetById", new { teacherId}).Result.Any())
                throw new Exception("Not Found, No Such teacher With That Id");
        }

        public async Task<IEnumerable<TeacherSubjectModel>> GetTeacherSubjectsById(int TeacherId)
        {
            var teacherSubjects = await _db.LoadData<TeacherSubjectModel, dynamic, SubjectModel>("dbo.TeacherGetById",
                parameters: new { TeacherId },
                x:
                (TS, Subject) =>
                {
                    TS.Subject = Subject;
                    return TS;
                },
                splitOn: "SubjectId"
                );
            return teacherSubjects;
        }

        public async Task<IEnumerable<TeacherModel>> GetTeachersBySubject(int subId)
        {
            var teachers =  await _db.LoadData<TeacherModel, dynamic>(
                "dbo.TeachersGetAllBySubId",
                parameters: new { SubjectId = subId }
                );
            return teachers;
        }

        public async Task<IEnumerable<TeacherModel>> GetAllTeachers()
        {
            var teachers = await _db.LoadData<TeacherModel, dynamic>("dbo.TeacherGetAll", parameters: new { });
            return teachers;
        }

        public async Task<TeacherModel?> GetTeacherById(int TeacherId)
        {
            TeacherModel? CurrTeacher = null;
            var res = await (_db.LoadData<dynamic, TeacherModel, TeacherSubjectModel, SubjectModel>("dbo.TeacherGetById",
                parameters: new { TeacherId },
                x: (Teacher, TSM, Subject) =>
                {
                    if (CurrTeacher == null)
                    {
                        CurrTeacher = Teacher;
                    }
                    else
                    {
                        Teacher = CurrTeacher;
                    }

                    if (TSM != null)
                    {
                        TSM.Subject = Subject;
                        Teacher.TeacherSubjects.Add(TSM);
                    }
                    return Teacher;
                },
                splitOn: "TeacherSubjectId, SubjectId"));
            return CurrTeacher;
        }

        public async Task<IEnumerable<dynamic>> GetFilteredTeachers(string content = "")
        {
            List<dynamic> teachersWithInfo = [];
            _ = await _db.LoadData<TeacherModel, dynamic, (int subNO, int classNO)>(
                "dbo.searchTeacher", 
                new { content },
                (teacher, stats) => 
                { 
                    teachersWithInfo.Add(teacher.Details(stats.subNO, stats.classNO));  
                    return teacher; 
                },
                splitOn: "subNO");
            return teachersWithInfo;
        }

        #endregion

        #region Actions
        public async Task UpdateTeacher(TeacherModel model)
        {
            ValidateId(model.TeacherId);
            await _db.ExecuteData("dbo.TeacherUpdate", new
            {
                model.TeacherId,
                model.Name,
                model.LastName,
                model.Phone
            });

        }

        public async Task InsertTeacher(TeacherModel model)
        {
            await _db.ExecuteData("dbo.TeacherInsert", new
            {
                model.TeacherId,
                model.Name,
                model.LastName,
                model.Phone
            });
        }

        public async Task DeleteTeacher(int teacherId)
        {
            ValidateId(teacherId);
            await _db.ExecuteData("dbo.TeacherDelete", new { teacherId });
        }
        #endregion

    }
}
