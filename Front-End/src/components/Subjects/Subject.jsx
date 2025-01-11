import { Outlet } from "react-router-dom";
import SubNavBar from "../shared/SubNavBar";
import Title from "../Global/Title";
import { getShortNumberFormat } from "../shared/logic/logic";

const urlList = [
  {
      title: {
        english : 'New Subject' ,  
        arabic : 'إضافة ماده'
      },
      isAdmin: true,
      path: 'NewSubject',
  },
  {
      title: {
        english :  'Show subjects' ,  
        arabic : 'عرض المواد'
      },
      isAdmin: true,
      path : 'ShowSubjects',
  }
]

export default function Subject() {


  return (
    <>
      <Title title={window.location.pathname} />
      <SubNavBar urlList={urlList} />
      <Outlet />
  </>
  );
}
