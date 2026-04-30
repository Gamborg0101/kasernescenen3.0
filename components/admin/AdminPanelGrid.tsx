'use client';
import PanelElement from '@/components/admin/PanelElement';
export default function AdminPanelGrid() {
  function handleMessage() {
    console.log('DB function');
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="grid grid-cols-2 gap-4">
        <PanelElement
          title="Adminstrer rooms"
          body=""
          btnText="Se rum"
          onClick={handleMessage}
          url="adminpanel/managerooms"
        />
        <PanelElement title="Adminstrer users" body="" btnText="Se brugere" onClick={handleMessage} url="users" />
        <PanelElement title="Adminstrer bookings" body="" btnText="Se bookinger" onClick={handleMessage} url="" />
        <PanelElement
          title="Ryd op i DB"
          body="Sletter gamle bookinger (1år)"
          btnText="Slet ældre bookinger"
          url="/"
          onClick={handleMessage}
        />
      </div>
    </div>
  );
}
