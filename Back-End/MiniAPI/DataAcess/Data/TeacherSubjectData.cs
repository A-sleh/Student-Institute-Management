﻿using DataAcess.DBAccess;
using DataAcess.Exceptions;
using DataAcess.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DataAcess.Data
{

    public class TeacherSubjectData : ITeacherSubjectData
    {
        private readonly ISqlDataAccess _db;
        public TeacherSubjectData(ISqlDataAccess _db)
        {
            this._db = _db;
        }
        #region Validation Methods
        private async Task<bool> ValidateTacherSubjectIdExistance(int teacherSubjectId) =>
                 (await _db.LoadData<dynamic,dynamic>("dbo.TeacherSubjectGetById", new { teacherSubjectId })).Any();
        private async Task ValidateLinking(int classId, int teacherSubjectId)
        {
            var Valid = (await _db.LoadData<dynamic, dynamic>("dbo.ClassGetById", new { classId })).Any()
            && (await ValidateTacherSubjectIdExistance(teacherSubjectId));

            if(!Valid)
                throw new InvalidParametersException("Parameters Invalid");
        }
        private async Task ValidateTeacherSubjectIdExistance(int teacherId, int subjectId)
        {
            if(!(await _db.LoadData<dynamic,dynamic>("dbo.TeacherSubjectGetId", new { teacherId, subjectId })).Any())
                throw new InvalidParametersException("Not found, may teacher or subject id is invalid");
        }
        #endregion

        #region Data Request
        public async Task<IEnumerable<TeacherModel>> GetClassTeachers(int classId)
        {
            var dic = new Dictionary<int, TeacherModel>();
            var res = await (_db.LoadData<dynamic, TeacherModel, SubjectModel, TeacherSubjectModel>(
                "dbo.TeacherSubjectGetByClass",
                new { classId },
                x: (Teacher, Subject, TSM) =>
                {
                    TSM.Subject = Subject;
                    if (dic.TryGetValue(Teacher.TeacherId, out var model))
                    {
                        Teacher = model;
                    }
                    else
                    {
                        dic.Add(Teacher.TeacherId, Teacher);
                    }
                    Teacher.TeacherSubjects.Add(TSM);
                    return Teacher;
                },
                splitOn: "SubjectId, TeacherSubjectId"
                ));
            return res.Distinct();
        }
        public async Task<IEnumerable<TeacherSubjectModel>> GetTeacherClasses(int teacherId)
        {
            var dic = new Dictionary<int, TeacherSubjectModel>();
            _ = await _db.LoadData<dynamic, TeacherSubjectModel, SubjectModel, ClassModel>(
                "dbo.TeacherGetClassesAndSubjects",
                parameters:
                new { teacherId },
                (TSM, Subject, Class) =>
                {
                    TSM.Subject = Subject;
                    if (dic.TryGetValue(TSM.TeacherSubjectId, out var existTSM))
                    {
                        TSM = existTSM;
                    }
                    else
                    {
                        dic.Add(TSM.TeacherSubjectId, TSM);
                    }
                    TSM.Classes.Add(Class);
                    return TSM;
                },
                splitOn: "SubjectId, ClassId"
                );
            return dic.Select(x => x.Value);
        }
        #endregion

        #region Actions
        public async Task InsertTeacherSubjects(TeacherSubjectModel model)
        {
            try
            {
                await _db.ExecuteData("dbo.TeacherSubjectInsert", new
                {
                    model.Teacher?.TeacherId,
                    model.Subject?.SubjectId,
                    model.Salary
                });
            }
            catch (Exception)
            {
                throw new InvalidParametersException($"Invalid TeacherId: {model.Teacher?.TeacherId} or SubjectId: {model.Subject?.SubjectId}");
            }
        }

        public async Task LinkTeacherWithClass(int teacherSubjectId, int classId)
        {
            await ValidateLinking(classId, teacherSubjectId);
            await _db.ExecuteData("dbo.TeacherSubjectAddClass", new { teacherSubjectId, classId });
        }
        public async Task UpdateTeacherSubject(int TeacherId, int SubjectId, int Salary)
        {
            await ValidateTeacherSubjectIdExistance (TeacherId, SubjectId);
            await _db.ExecuteData("dbo.TeacherSubjectUpdate", new
            {
                TeacherId,
                SubjectId,
                Salary
            });
        }
        public async Task DeleteSubjectForTeacher(int teacherSubjectId)
        {
            await ValidateTacherSubjectIdExistance(teacherSubjectId);
            await _db.ExecuteData("dbo.TeacherSubjectDelete", new { teacherSubjectId });
        }
        public async Task DeleteTeacherFromClass(int teacherSubjectId, int classId)
        {
            await _db.ExecuteData(
                "dbo.TeacherSubjectDeleteClass",
                new
                {
                    teacherSubjectId,
                    classId
                });
        }
        #endregion
    }
}
