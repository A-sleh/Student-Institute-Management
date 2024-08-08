
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
            1 - [X] add new teacher
            2 - [x] link and delete teacher with class 
            3 - [x] show and update teacher details
        4 - [x] Bill :
            1 - [x] student pays
            2 - [x] teacher salaries
            3 - [x] in/out external pays
            4 - [x] show details
        5 - [x] test :
            1 - [x] create ( quiz - exam - final  - revision ) and chose the class And {Or chose report}
            2 - [x] create report ( quiz ) + selector ( exam - final - revision )  
            3 - [x] show the last ( quiz - exam - final  - revision ) and assign the mark
        6 - [x] class :
            1 - [x] create new class 
            2 - [x] manage the class (add - delete - move ) student
            3 - [x] show class details (students - teachers ) sorted by the bets class dependent on students level
        7 - [x] subject : 
            1 - [x] (Add , delete , update) subject dependent on classification 

-- [] create Redux toolkit to manage the states





-- My Data connection : 

"Data Source=DESKTOP-U4CIS1T;Initial Catalog=test;Integrated Security=True;Connect Timeout=30;Encrypt=True;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"