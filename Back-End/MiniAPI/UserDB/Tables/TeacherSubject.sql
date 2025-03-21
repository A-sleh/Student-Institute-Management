﻿CREATE TABLE TeacherSubject (
Id INT PRIMARY KEY IDENTITY(1,1),
SubjectId INT not null,
TeacherId INT not null,
Salary INT,
CONSTRAINT TeacherSub_Subject_Fk FOREIGN KEY(SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE,
CONSTRAINT TeacherSub_Teacher_Fk FOREIGN KEY(TeacherId) REFERENCES Teacher(Id) ON DELETE CASCADE
);