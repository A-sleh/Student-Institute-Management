CREATE TRIGGER [TeacherDeletionTrigger]
ON [dbo].[Bill]
FOR UPDATE
AS 
BEGIN
	IF(UPDATE(TeacherId) AND (SELECT DISTINCT TeacherId FROM inserted) is null)
	BEGIN
		INSERT INTO Bill(BillNo, Amount, Date, Type, Note) 
		(SELECT CONCAT(N'#D', i.BillNo), Amount, GETDATE(), Type, CONCAT('(teacher deleted)', i.note) FROM inserted i)
		DELETE FROM Bill WHERE id IN (SELECT Id FROM deleted);
	END
END
