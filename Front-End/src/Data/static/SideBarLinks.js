export const links = [
    {
      title: "Statistics",
      path: 'Statistics',
      iconPath: "fa-solid fa-chart-line fa-fw",
      subLinks: [],
    },
    {
      title: "Students",
      path: 'StudentsDetails',
      iconPath: "bi bi-person-gear",
      subLinks: [
        { title: "Students Details",path: 'StudentsDetails', iconPath: "bi bi-person-video2" },
        { title: "New Student",path: 'NewStudent', iconPath: "bi bi-person-fill-add" },
      ],
    },
    {
      title: "Teachers",
      path: 'TeachersDetails',
      iconPath: "bi bi-person-circle",
      subLinks: [
        { title: "Teachers Details",path: 'TeachersDetails', iconPath: "bi bi-person-video2" },
        { title: "Manage Teacher",path: 'ManageTeacher', iconPath: "bi bi-person-gear" },
        { title: "New Teacher",path: 'NewTeacher', iconPath: "bi bi-person-fill-add" },
      ],
    },
    {
      title: "Bills",
      path: 'StudentsPays',
      iconPath: "bi bi-wallet",
      subLinks: [
        { title: "Students Pays", path: 'StudentsPays',iconPath: "bi bi-person-vcard" },
        { title: "Teachers Salaries",path: 'TeachersSalaries', iconPath: "bi bi-credit-card-2-front" },
        { title: "External Pays",path: 'ExternalPays', iconPath: "bi bi-cash-coin" },
        { title: "All Bill Details",path: 'AllBillDetails', iconPath: "bi bi-bank" },
      ],
    },
    {
      title: "Test",
      path: 'Test',
      iconPath: "bi bi-textarea-t",
      subLinks: [
        { title: "Test",path: 'Test', iconPath: "bi bi-file-text" },
        { title: "Create Report",path: 'CreateReport', iconPath: "bi bi-file-earmark-person" },
      ],
    },
    {
      title: "Classes",
      path: 'ClassesDetails',
      iconPath: "bi bi-building",
      subLinks: [
        { title: "Classes Details",path: 'ClassesDetails', iconPath: "bi bi-person-video2" },
        { title: "Manage Classes",path: 'ManageClasses', iconPath: "bi bi-building-gear" },
        { title: "New Class",path: 'NewClass', iconPath: "bi bi-building-add" },
      ],
    },
    { title: "Grade", path: 'Grade',iconPath: "bi bi-mortarboard", subLinks: [] },
    { title: "Subject", path: 'Subject',iconPath: "bi bi-book-half", subLinks: [] },
  ];