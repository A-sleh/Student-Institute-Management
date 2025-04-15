
export const links = [
    {
      title: {
        'english' :"Statistics" ,
        'arabic' : "الإحصائيات" ,
      },
      path: 'Statistics',
      iconPath: "fa-solid fa-chart-line fa-fw",
      subLinks: [],
    },
    {
      title: {
        'english' :"Students",
        'arabic' : "إدارة الطلاب" ,
      },
      path: 'StudentsDetails',
      iconPath: "bi bi-person-gear",
      subLinks: [
        { 
          title: {
            'english' :"Students Details",
            'arabic': 'تفاصيل الطلاب' ,
          },
          path: 'StudentsDetails', iconPath: "bi bi-person-video2" 
        },
        { 
          title: {
            'english' :"Students MissedDays",
            'arabic': 'أخذ تفقد الطلاب' ,
          } ,path: 'StudentMissedDays', iconPath: "bi bi-calendar2-day" 
        },
        { 
            title: {
            'english' :"New Student",
            'arabic': 'إضافة طالب' ,
          } ,path: 'NewStudent', iconPath: "bi bi-person-fill-add" 
        },
      ],
    },
    {
      title: {
        'english' :"Teachers",
        'arabic': 'إدارة الأساتذة' ,
      },
      path: 'TeachersDetails',
      iconPath: "bi bi-person-circle",
      subLinks: [
        { 
          title: {
            'english' :  "Teachers Details",
            'arabic' : "تفاصيل الأساتذه" ,
          }
          ,path: 'TeachersDetails', iconPath: "bi bi-person-video2" 
        },
        { 
          title: {
            'english' :"Manage Teacher",
            'arabic': 'إدارة الأساتذه' ,
          } ,path: 'ManageTeacher', iconPath: "bi bi-person-gear" ,
          sensitive: true
        },
        { title: {
          'english' :"New Teacher",
          'arabic': 'إضافة إستاذ' ,
        },path: 'NewTeacher', iconPath: "bi bi-person-fill-add" 
      },
      ],
    },
    {
      title: {
        'english' :"Bills",
        'arabic': 'الفواتير' ,
      },
      path: 'StudentsPays',
      iconPath: "bi bi-wallet",
      subLinks: [
        { 
            title: {
            'english' :"Students Pays",
            'arabic': 'فواتير الطلاب' ,
          } , path: 'StudentsPays',iconPath: "bi bi-person-vcard" 
        },
        { 
            title:{
            'english' :"Teachers Salaries",
            'arabic': 'اقصات الاساتذه' ,
          } ,path: 'TeachersSalaries', iconPath: "bi bi-credit-card-2-front" ,
          sensitive: true
        },
        { 
            title: {
            'english' :"External Pays",
            'arabic': 'الفواتير الخارجيه' ,
          } ,path: 'ExternalPays', iconPath: "bi bi-cash-coin" 
        },
        { 
            title: {
            'english' :"All Bill Details",
            'arabic': 'تفاصيل جميع الفواتير' ,
          } ,path: 'AllBillDetails', iconPath: "bi bi-bank" 
        },
      ],
    },
    {
      title: {
        'english' :"Test",
        'arabic': 'الأختبارات' ,
      },
      path: 'Test',
      iconPath: "bi bi-textarea-t",
      subLinks: [
        { 
            title: {
            'english' : "Test",
            'arabic' : "تفاصيل الأختبارات" ,
          },path: 'Test', iconPath: "bi bi-file-text" 
        },
        { 
            title: {
            'english' :"Create Report",
            'arabic': 'إدارة التقارير' ,
          } ,path: 'CreateReport', iconPath: "bi bi-file-earmark-person"
        },
      ],
    },
    {
      title: {
        'english' : "Classes",
        'arabic': 'الشعب' ,
      },
      path: 'ClassesDetails',
      iconPath: "bi bi-building",
      subLinks: [
        { 
            title: {
            'english' :"Classes Details",
            'arabic': 'تفاصيل الشعب' ,
          },path: 'ClassesDetails', iconPath: "bi bi-person-video2" 
        },
        { 
            title: {
            'english' :"Manage Classes",
            'arabic': 'إدارة الشعب' ,
          } ,path: 'ManageClasses', iconPath: "bi bi-building-gear" 
        },
        { 
            title: {
            'english' : "New Class",
            'arabic': 'شعبه جديده' ,
          },path: 'NewClass', iconPath: "bi bi-building-add" 
        },
      ],
    },
    { title: {
      'english' :"Grade",
      'arabic': 'الفئات' ,
    }, path: 'Grade',iconPath: "bi bi-mortarboard", subLinks: [] },
    { title: {
      'english' :"Subject",
      'arabic': 'المواد' ,
    }, path: 'Subject',iconPath: "bi bi-book-half", subLinks: [] },
    {
      title: {
        'english' :"Setting",
        'arabic': 'الإعدادات' ,
      },
      path: 'Setting' ,
      iconPath: 'bi bi-gear' ,
      subLinks: []
    }
  ];