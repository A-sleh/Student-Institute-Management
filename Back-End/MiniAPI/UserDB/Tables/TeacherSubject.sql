CREATE TABLE TeacherSubject (
Id INT PRIMARY KEY IDENTITY(1,1),
SubjectId INT not null,
TeacherId INT not null,
Salary INT,
CONSTRAINT TeacherSub_Subject_Fk FOREIGN KEY(SubjectId) REFERENCES subject(Id) ON UPDATE CASCADE,
CONSTRAINT TeacherSub_Teacher_Fk FOREIGN KEY(TeacherId) REFERENCES teacher(Id) ON UPDATE CASCADE
);