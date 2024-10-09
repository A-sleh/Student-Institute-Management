export const links = [
    {
      title: "Statistics",
      iconPath: "fa-solid fa-chart-line fa-fw",
      subLinks: [],
    },
    {
      title: "Students",
      path: 'StudentsDetails',
      iconPath: "bi bi-person-gear",
      subLinks: [
        { title: "Students Details", iconPath: "bi bi-person-video2" },
        { title: "New Student", iconPath: "bi bi-person-fill-add" },
      ],
    },
    {
      title: "Teachers",
      path: 'TeachersDetails',
      iconPath: "bi bi-person-circle",
      subLinks: [
        { title: "Teachers Details", iconPath: "bi bi-person-video2" },
        { title: "Manage Teacher", iconPath: "bi bi-person-gear" },
        { title: "New Teacher", iconPath: "bi bi-person-fill-add" },
      ],
    },
    {
      title: "Bills",
      path: 'StudentsPays',
      iconPath: "bi bi-wallet",
      subLinks: [
        { title: "Students Pays", iconPath: "bi bi-person-vcard" },
        { title: "Teachers Salaries", iconPath: "bi bi-credit-card-2-front" },
        { title: "External Pays", iconPath: "bi bi-cash-coin" },
        { title: "All Bill Details", iconPath: "bi bi-bank" },
      ],
    },
    {
      title: "Tests",
      path: 'TestDetails',
      iconPath: "bi bi-textarea-t",
      subLinks: [
        { title: "Test Details", iconPath: "bi bi-inboxes" },
        { title: "Create Report", iconPath: "bi bi-file-earmark-person" },
        { title: "Test", iconPath: "bi bi-file-text" },
      ],
    },
    {
      title: "Classes",
      path: 'ClassesDetails',
      iconPath: "bi bi-building",
      subLinks: [
        { title: "Classes Details", iconPath: "bi bi-person-video2" },
        { title: "Manage Classes", iconPath: "bi bi-building-gear" },
        { title: "New Class", iconPath: "bi bi-building-add" },
      ],
    },
    { title: "Subject", iconPath: "bi bi-book-half", subLinks: [] },
  ];