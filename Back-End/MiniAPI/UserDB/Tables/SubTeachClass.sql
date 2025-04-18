﻿CREATE TABLE SubTeachClass (
Id INT PRIMARY KEY IDENTITY(1,1),
ClassId INT not null,
TeachSubId INT not null,
CONSTRAINT fk_teaching_class FOREIGN KEY(ClassId) REFERENCES Class(id) ON UPDATE CASCADE,
CONSTRAINT fk_teaching_id FOREIGN KEY(TeachSubId) REFERENCES TeacherSubject(Id) ON DELETE CASCADE
);