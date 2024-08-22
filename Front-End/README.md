
This file will contain the progress in build the main interfaces : 

- Navbar section : [X]
    - [X] Add the logo of institute
    - [X] Add Burger menu to switch the sideBar section 
        -- Note : [] The Burger menu needed to link with State to close and open the sidebar section
             
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
            1 - [] add new teacher
            2 - [] link and delete teacher with class 
            3 - [] show and update teacher details
        4 - [x] Bill :
            1 - [] student pays
            2 - [] teacher salaries
            3 - [] in/out external pays
            4 - [] show details
        5 - [x] test :
            1 - [] create ( quiz - exam - final  - revision ) and chose the class And {Or chose report}
            2 - [] create report ( quiz ) + selector ( exam - final - revision )  
            3 - [] show the last ( quiz - exam - final  - revision ) and assign the mark
        6 - [x] class :
            1 - [X] create new class 
            2 - [] manage the class (add - delete - move ) student
            3 - [X] show class details (students - teachers ) sorted by the best class dependent on students level
        7 - [x] subject : 
            1 - [] (Add , delete , update) subject dependent on classification 

-- [] create Redux toolkit to manage the states


-- My Data connection : 

"Data Source=DESKTOP-U4CIS1T;Initial Catalog=test;Integrated Security=True;Connect Timeout=30;Encrypt=True;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"

Tasks : 

Day 1 : 
    - [X] Refcator The Notification 
    - [X] Complete build The Delete Student Logic
    - [X] Restyle The Table In Show Student Details
Day 2 : 
    - [] Maping UpdateSubject to conver to action ( update and create )
    - [] solve class object in create student request 
    - [] solve class object in show student details 
    