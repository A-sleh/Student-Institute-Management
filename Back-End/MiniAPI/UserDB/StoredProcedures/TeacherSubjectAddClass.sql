CREATE PROCEDURE [dbo].[TeacherSubjectAddClass]
	@TeacherSubjectId int,
	@ClassId int
AS
	INSERT INTO SubTeachClass(TeachSubId, ClassId)
	VALUES (@TeacherSubjectId, @ClassId);
RETURN 0
