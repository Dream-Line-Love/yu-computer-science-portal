// import { collection, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
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
  const handleStudentListCounter = useRef(0);

  const handleStudentList = async () => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .neq("full_name", "Admin")
      .eq("semester", "first semester")
      .eq("year", "first year");
    if (error) throw error;
    if (data) {
      setStudentList(data);
      if (handleStudentListCounter.current === 0) {
        handleStudentListCounter.current += 1;
        console.log("Useref value is reached.");
        setRenderAs("Auth");
      } else {
        // console.log("Only returned false yay!!");
        return false;
      }
    }
  };

  const initializeApp = async () => {
    const existingUser = localStorage.getItem("csPortalUser");
    if (!existingUser) {
      // const { data, error } = await supabase
      //   .from("users")
      //   .select()
      //   .neq("full_name", "Admin")
      //   .eq("semester", "first semester")
      //   .eq("year", "first year");
      // if (error) throw error;
      // setStudentList(data);
      handleStudentList();
      // if (handleStudentList === true) {
      //   setRenderAs("Auth");
      // }
      supabase
        .channel("public:users")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "users" },
          (payload) => {
            console.log(payload);
            handleStudentList();
          }
        )
        .subscribe();
    } else {
      setCsPortalUser(existingUser);
      setRenderAs("Portal");
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  window.oncontextmenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  return (
    <div style={{ WebkitTouchCallout: "none" }}>
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
          // avatarURL={avatarURL}
          setAvatarURL={setAvatarURL}
        />
      )}
    </div>
  );
}

export default App;
