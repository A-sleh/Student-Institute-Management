import { Outlet } from "react-router-dom";
import SubNavBar from "../shared/SubNavBar";
import Title from "../Global/Title";

const urlList = [
  {
      title: 'New Subject',
      path: 'NewSubject',
  },
  {
      title: 'Show subjects',
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
