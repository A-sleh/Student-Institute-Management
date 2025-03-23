CREATE TRIGGER [TeacherDeletionTrigger]
ON [dbo].[Bill]
FOR UPDATE
AS 
BEGIN
	IF(UPDATE(TeacherId) AND (SELECT DISTINCT TeacherId FROM inserted) is null)
	BEGIN
		DECLARE @teacherName NVARCHAR(128) = (SELECT DISTINCT CONCAT(t.Name, N' ', t.LastName) FROM deleted d JOIN Teacher t ON d.TeacherId = t.Id)
		DECLARE @BillNo NVARCHAR(128) = (SELECT CONCAT(COALESCE(BillNo,''), '#D') FROM deleted)
		INSERT INTO Bill(BillNo, Amount, Date, Type, Note) SELECT @BillNo, Amount, Date, Type, CONCAT(Note, N' ', @teacherName) FROM inserted
	END
END
