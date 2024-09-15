CREATE PROCEDURE [dbo].[TeacherSubjectClassGetId]
	@TeacherSubjectId int,
	@classId int
AS
	SELECT *
	FROM SubTeachClass stc
	WHERE stc.TeachSubId = @TeacherSubjectId AND stc.ClassId = @classId;
RETURN 0
