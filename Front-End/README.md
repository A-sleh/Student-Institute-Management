
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
            1 - [] create ( quiz - exam - final  - revision ) and chose the class And {Or chose report}
            2 - [] create report ( quiz ) + selector ( exam - final - revision )  
            3 - [] show the last ( quiz - exam - final  - revision ) and assign the mark
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
    -[X] display teacher in show class details // endpoint needed to fix
    -[X] in manage teacher should re get teacher remaing salarys
    -[] display teacher in manage class details// endpoint needed to fix
Day 15 : 
    -[] create insert marks to specify classs