import { Outlet } from "react-router";
import MobileNav from "./Navbar/MobileNav";
import { useState } from "react";
import AddScreen from "./AddScreen/AddScreen";

const WithMobileNav: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-screen w-screen justify-between">
      <div className="mx-4">
        {showAddModal && <AddScreen setShowAddModal={setShowAddModal} />}
        <Outlet />
      </div>
      <MobileNav setShowAddModal={setShowAddModal} />
    </div>
  );
};

export default WithMobileNav;
