
This file will contain the progress in build the main interfaces : 

- Navbar section : [X]
    - [X] Add the logo of institute
    - [X] Add Burger menu to switch the sideBar section 
        -- Note : [X] The Burger menu needed to link with State to close and open the sidebar section
             
    -- optional -- [] Put a field to search in current page
- SideBar section : 
    - [X] create all links to mobility between pages
    - [X] Routing between the pages using react-router
    Note : -- Links Like that : 
        1 - [X] statistics : 
        2 - [X] students : 
            1 - [X] add new student And chose the class if available
            2 - [X] show student details ( marks ) 
        3 - [X] Teachers :
            1 - [X] add new teacher
            2 - [X] link and delete teacher with class 
            3 - [X] show and update teacher details
        4 - [x] Bill :
            1 - [X] student pays
            2 - [X] teacher salaries
            3 - [X] in/out external pays
            4 - [] show details
        5 - [x] test :
            1 - [X] create ( quiz - exam - final  - revision ) and chose the class And {Or chose report}
            2 - [X] create report ( quiz ) + selector ( exam - final - revision )  
            3 - [X] show the last ( quiz - exam - final  - revision ) and assign the mark
        6 - [x] class :
            1 - [X] create new class 
            2 - [X] manage the class (add - delete - move ) student
            3 - [X] show class details (students - teachers ) sorted by the best class dependent on students level
        7 - [x] subject : 
            1 - [X] (Add , delete , update) subject dependent on classification 

-- [X] create Redux toolkit to manage the states


-- My Data connection : 

"Data Source=DESKTOP-U4CIS1T;Initial Catalog=test;Integrated Security=True;Connect Timeout=30;Encrypt=True;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"

Tasks : 

Day 1 : 
    - [X] Refactor The Notification 
    - [X] Complete build The Delete Student Logic
    - [X] Restyle The Table In Show Student Details
Day 2 : 
    - [X] Maping UpdateSubject to conver to action ( update and create )
    - [X] solve class object in create student request 
    - [X] solve class object in show student details 
Day 3 : 
    - [X] fix re-render class details when remove a students from class
    - [X] prevente user from select any students to add them in class when the class is full {
        
        - current class student number (done)
        - clac how many studnets can added them in to class (dnoe)
        - handle the number of selected student form pending studnet  (done)

    }
    - [X] optemize the re-render class setting when do any changes on one of the class (to ignore more re-render we don't needed it)
    - [X] Fix display the insertStudent page
  
Day 4 : 
    - [X] fix re-render classes when delete any of class 
    - [X] ensure re-render the class componenet when update it 

Day 5 : 
    -[X] build concept the Move Studnets To Another Class
Day 6 : 
    -[X] show a error message when delete the subject which has a teacher who use it 
    -[X] fix the bug : when remove student from a class the message of notification are wrong    

Day 7 : 
    - [X] create two section in subject page depending on grade 
Day 8 : 
    - [X] create manage teachers page
    - [X] show and manage teacher subjects 
        - [X] remove delete subject  as an action icon in side subject Tabel
        - [X] update subject salary  as an action icon in side subject Tabel
        - [X] add new subject ==> in new component
Day 9 :  
    - [X] must re-render when delete subject
    - [X] there are bug in update subject salary
    - [X] create component (add new subject to teacher subjects ) 
        - [X] show current teacher informations 
        - [X] show the oldest subjects which taugth it 
        
    - [X] create component (add new class to teacher classes ) 
Day 10 : 
    - [X] Add header to the teacher Subject table and teacher class 
    - [X] make the table which show the teacher class who taught in it paginated
Day 11 : 
    - [X] show all subjects which tought by teacher (with select check box)
    - [X] show all classes we have and we can filter it by ( grade and gender)
     -- https://localhost:7279/Teacher/class/1
Day 12 : 
    - [X] Add teacher total salary in teacher details page and remaining salary <------- needed to fetch bills to subtrackt it from total salary
Day 13 : 
    -[X] create valid input in pay form
    -[X] create in dataservices ( create new student pay ) 
    -[X] write delete bill logic
Day 14 : 
    - [X] crete external pays
        - [X] show external pays 
        - [X] managae external pays
        - [] update bill needed but ( how !!!)
    -[X] add header in show studnet bill  page contain the details of paid and remainig salary of class
    -[X] add teacher bills in teacher information page
    -[X] auto close the nav linke when move to another one
    -[X] display teacher in show class details 
    -[X] in manage teacher should re get teacher remaing salarys
Day 15 :
    -[X] create insert marks to specify classs
Day 16 : 
    -[X] some change on create new test form 
        -[X] text area 
        -[X] show the current classes 
    -[X] show the test details in show all tests page
    -[X] restyle id cell in tables
    -[X] show the correction test and no but!! needed to fix from backe end <-------
    -[X] show worning message when the user click on test and it not correction yet from show all test page
        
Day 17 : 
    -[X] ues the response which returned from create new test rquest 
    -[X] display report 
    -[X] display queiz in one section 
    -[X] display (exam - revesion .. ) in other section 
Day 18 : 
    -[X] link each tests with the current report
    -[X] display report for each class 
Day 19 : 
    -[X] show class title and grade in (likn test with report page) And (report details)
    -[X] Show The current path in the page show student information in the curretn report 
    -[X] Create page contain student mark
    -[X] display report details ( quiz - exam .. )
Day 20 : 
    -[X] display teacher in manage class details
NOTE : 
    - URL/Report/Studnet/{studentId}/Result
        EX :
        [
            {
                reportId : '..',
                reportTitle : '...' ,
                reportDate : '....',
                mark : '...' , 
                totalMark: '...' , 
            },
            {
                reportId : '..',
                reportTitle : '...' ,
                reportDate : '....',
                mark : '...' , 
                totalMark: '...' , 
            },
                        {
                reportId : '..',
                reportTitle : '...' ,
                reportDate : '....',
                mark : '...' , 
                totalMark: '...' , 
            },
        ] 
    
Day 21 : 
    - [X] there are bug in display test in reciving mark page !!!!!!!!!!!!!!!

Day22 : 
    - report title And Month in the right side of the page (static text) 


Optimization nots : 
    components : 

    - Generate a dynamic table to reuse it in ( student (Details,bill) - teacher (Details,bill) - show all report at any class ) {
        make the header and body as a props  ,
        dynamic padding as a props
    }
    - in form {
        make generic input {
            take as a props (type , width , label)
        }
        make row dynamic {
            take as a props ( columns numbers )
        }
    }
    - Search header 

 1 - Bills [X] 100%
 2 - Tests [X] 100% // there are bug in show un correction test
 3 - students [X] 100%
 4 - teachers [X] 100%
 5 - sidebar [X] 100%
 6 - navbar [X] 100%
 7 - classes [X] 100% 
 8 - subject [X] 100%

solve the proble: 
1 - create a parent state to catch the focus input 
2 - when i click on the input field i will change the parent state to be contain the focused field
3 - 


Day 23 : 
    1- fix teachers pagination [X]
    2 - teachers bills hook ( use new endpoint ) [X]
    3 - studnets bills hook ( use new endpoint ) [X]
    4 - statistics : 
        - [] 

-- [X] testing statistcs page
-- [X] testing students page {

}
-- [X] testing side bar page {

}
-- [X] testing teacher page
-- [X] testing bills page
-- [X] testing test page
-- [X] testing classes page
-- [X] testing grade page
-- [X] testing subject page

-- convert to arabic: 
    - [X] side bar 
    - [X] subjects page
    - [X] grades page
    - [X] bills page
    - [X] All was done
-- check style : 
    - [X] subject page
    - [X] Grade page
    - [X] classes page
    - [X] students page
    - [] teacher page
-- some bugs in the code : 
    -[X] In insert new student page ,The student don't show in screen
    -[] In Manage teacher page ,The infinite scrolling need to fix
    -[X] in teachers and students bills doesn't show in the screen

-- Manager access : 
    -- total school balance details ( in bills page And in statistics page )
    -- manage students bills
    -- manage teachers bills 
    -- manage external bills 
    -- manage teacher ( delete and update )

There are some bugs in the code : 
    - [X] linke test with mark ( testmarkid must be char)
    -- [X] in statistics page : the title doesn't displayed in the first render ;
    -- [X] in teacher page : the teachers number doesn't showing ;
    -- [X] in teachers , studentd in more information page ( the table which display bills 
    the total number doesn't showing )
    -- [X]in manage  teacher in add new teacher subject : in add price section need to add a little margin bottom to title ;
    -- [X] in new test page : I will add a placeholder in subjects field to tell the user 
    to select a grade to display the subjects ;
    -- [X] in test class details the header filter need to restyle ;
    -- [X] in report class details : the date of test need to be it in one line

    [X] Date filter in exams details should work from a point and forward, it is taking point and backwards.
    (But it work well , this need to discuse with rabo )

    [] confirm button should rerender tests in report management.

    [X] http://localhost:5173/CreateReport/StudentReportTests/1 This page need [Back] button.

    [] add class filter to studet show page, and change pagination and ordering to be from the request (need to make plan together).

    [X] Change ENDPOINT /Absence to /Student/Absence.


- in statistics page : 
    - change the first state in once chart [X] 
    - remove the doublicate in once chart [X]
    - display tests of report in manage report [X]

- debuggin the code : 
    - setting page [X] 
    - subject page [X]
    - grade page [X]
    - classes page [ْْX] {
        -- in add new students to any class , when i try to display the students who doesn't have a class they didn't come from endpoint (you must check out your join maybe you were using innerjoin inseted of left join )
        TeacherNewClass : this component need to refactor
    }
    - top students request need to be resolved

- [X] hidden teacher's bill page 
- [X] prevent user from entry to teacher information if is not the admin
- [X] reoslve the error in new student form page 


discuse a problem : 
 - all teachers , searching teachers 
 when searching teachers change i will change the data 
 




