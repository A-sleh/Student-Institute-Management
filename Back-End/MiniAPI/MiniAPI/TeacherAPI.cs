using DataAcess.Data;
using DataAcess.Models;

namespace MiniAPI
{
    public static class TeacherAPI
    {
        public static void ConfigureTeacherAPI(this WebApplication app)
        {
            // teacher details
            app.MapGet("/Teacher", GetAllTeachers);
            app.MapGet("/Teacher/{TeacherId}", GetTeacherById);
            app.MapGet("/Teacher/Subject/{subjectId}", GetTeachersBySubId);

            // teacher prop
            app.MapGet("/Teacher/{TeacherId}/Subject", GetTeacherSubject);
            app.MapGet("/Teacher/{teacherId}/Class", GetTeacherClasses);

            // class prop
            app.MapGet("/Teacher/class/{classId}", GetClassTeachers);

            app.MapPut("/Teacher", UpdateTeacher);
            app.MapPut("/Teacher/{TeacherId}/Subject/{SubjectId}", UpdateSubjectInTeacher);

            app.MapPost("/Teacher", InsertTeacher);
            app.MapPost("/Teacher/{TeacherId}/Subject", InsertSubjectToTeacher);
            app.MapPost("/Teacher/Subject/{TeacherSubjectId}/class/{classId}", AddTeacherToClass);

            app.MapDelete("/Teacher/{id}", DeleteTeacher);
            app.MapDelete("/Teacher/Subject/{id}", DeleteSubjectFromTeacher);
            app.MapDelete("/Teacher/Subject/{TeacherSubjectId}/class/{classId}", DeleteTeacherFromClass);
        }

        private static async Task<IResult> GetAllTeachers(ITeacherData data)
        {
            try
            {
                var res = await data.GetAllTeachers();
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> GetTeacherById(ITeacherData data, int TeacherId)
        {
            try
            {
                var res = await data.GetTeacherById(TeacherId);
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }
        
        private static async Task<IResult> GetTeachersBySubId(ITeacherData data, int subjectId)
        {
            try
            {
                var res = await data.GetTeachersBySubject(subjectId);
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> UpdateTeacher(ITeacherData data, TeacherModel model)
        {
            try
            {
                await data.UpdateTeacher(model);
                return Results.Ok("Update Success");
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> GetTeacherSubject(ITeacherData data, int TeacherId)
        {
            try
            {
                var res = await data.GetTeacherSubjectsById(TeacherId);
                return Results.Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> InsertTeacher(ITeacherData data, TeacherModel model)
        {
            try
            { 
                await data.InsertTeacher(model);
                return Results.Ok("Insert Success");
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> DeleteTeacher(ITeacherData data, int id)
        {
            try
            {
                await data.DeleteTeacher(id);
                return Results.Ok("Delete Success");
            }
            catch (Exception)
            {

                throw;
            }
        }

        private static async Task<IResult> InsertSubjectToTeacher(ITeacherSubjectData data, TeacherSubjectModel model, int TeacherId)
        {
            try
            {
                model.TeacherId = TeacherId;
                await data.InsertTeacherSubjects(model);
                return Results.Ok("Insert Success");
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static async Task<IResult> UpdateSubjectInTeacher(
            ITeacherSubjectData data,
            int SubjectId,
            int TeacherId,
            int Salary)
        {
            try
            {
                await data.UpdateTeacherSubject(TeacherId, SubjectId, Salary);
                return Results.Ok("Update Success");
            }
            catch (Exception)
            {

                throw;
            }
        }

        private static async Task<IResult> DeleteSubjectFromTeacher(ITeacherSubjectData data, int id)
        {
            try
            {
                await data.DeleteSubjectForTeacher(id);
                return Results.Ok("Delete Success");
            }
            catch (Exception)
            {

                throw;
            }
        }

        private static async Task<IResult> GetTeacherClasses(ITeacherSubjectData data, int teacherId)
        {
            try
            { 
                return Results.Ok(await data.GetTeacherClasses(teacherId));
            }
            catch (Exception)
            {

                throw;
            }
        }

        private static async Task<IResult> GetClassTeachers(ITeacherSubjectData data, int classId)
        {
            try
            {
                return Results.Ok(await data.GetClassTeachers(classId));
            }
            catch (Exception)
            {

                throw;
            }
        }

        private static async Task<IResult> AddTeacherToClass(ITeacherSubjectData data, int TeacherSubjectId, int classId)
        {
            try
            {
                await data.LinkTeacherWithClass(TeacherSubjectId, classId);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }

        private static async Task<IResult> DeleteTeacherFromClass(ITeacherSubjectData data, int TeacherSubjectId, int classId)
        {
            try
            {
                await data.DeleteTeacherFromClass(TeacherSubjectId, classId);
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        }
    }
}
