CREATE TABLE Bill (
Id INT PRIMARY KEY IDENTITY(1,1),
BillNo varchar(20) UNIQUE null,
StudentId INT null,
TeacherId INT null,
Type VARCHAR(3),
Date DATE,
Amount INT,
Note NCHAR(300),
CONSTRAINT Bill_Student_Fk FOREIGN KEY(StudentId) REFERENCES Student(id) ON DELETE SET NULL,
CONSTRAINT Bill_Teacher_Fk FOREIGN KEY(TeacherId) REFERENCES Teacher(Id) ON DELETE SET NULL,
CONSTRAINT Type_Enum CHECK (Type in ('in', 'out')),
CONSTRAINT Bill_Quick_Validation CHECK((StudentId is null and TeacherId is not null) or
								(StudentId is not null and TeacherId is null) or 
								(StudentId is null and TeacherId is null and Note is not null))
);