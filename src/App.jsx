// import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { db } from "../firebase.config";
import "./App.css";
import { Portal } from "./Portal/portal";
import { supabase } from "../supabase.config";
import { Auth } from "./Auth/auth";

function App() {
  const [renderAs, setRenderAs] = useState("");

  const [studentList, setStudentList] = useState("");

  const [csPortalUser, setCsPortalUser] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  const initializeApp = async () => {
    const existingUser = localStorage.getItem("csPortalUser");
    if (!existingUser) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .neq("full_name", "Admin");
      if (error) throw error;
      setStudentList(data);
      setRenderAs("Auth");
    } else {
      setCsPortalUser(existingUser);
      setRenderAs("Portal");
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <>
      {renderAs === "Auth" && (
        <Auth
          setRenderAs={setRenderAs}
          studentList={studentList}
          setCsPortalUser={setCsPortalUser}
        />
      )}
      {renderAs === "Dashboard" && <Auth />}
      {renderAs === "Portal" && (
        <Portal
          setRenderAs={setRenderAs}
          csPortalUser={csPortalUser}
          setAvatarURL={setAvatarURL}
        />
      )}
    </>
  );
}

export default App;
