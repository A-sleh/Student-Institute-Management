CREATE PROCEDURE [dbo].[TeacherSubjectDeleteClass]
	@TeacherSubjectId int,
	@ClassId int
AS
	DELETE FROM SubTeachClass
	WHERE ClassId = @ClassId AND TeachSubId = @TeacherSubjectId;
RETURN 0
