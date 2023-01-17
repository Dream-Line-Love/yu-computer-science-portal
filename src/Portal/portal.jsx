import {
  Container,
  Grid,
  Text,
  Spacer,
  Button,
  Modal,
  Avatar,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase.config";
import { ContentHome, ModuleHome, PortalHomeCard } from "./components";

const modules = [
  {
    module_number: "Myan 1001",
    module_name: "Myanmar",
    type: "minor",
    isElective: false,
    coverURL: "/pathein-umbrella-1.jpg",
    contents: [
      { tag: "စကားပြေ", title: "ကျစွာမင်းနှင့်မိထွေးတော်" },
      { tag: "စကားပြေ", title: "ရှင်သာရိပုတ္တရာ၏ဂုဏ်ရည်" },
      { tag: "စကားပြေ", title: "ကျေးဇူးတရား" },
      { tag: "ကဗျာ", title: "တောင်တွင်းရွှေပြည်" },
      { tag: "ကဗျာ", title: "နှမလက်လျှော့နေလေတော့" },
      { tag: "ကဗျာ", title: "ရွှေရုပ်သွင်" },
      { tag: "ကဗျာ", title: "နေဝင်မြင်သည် ဝရွှေပြည်" },
      { tag: "အသုံးချမြန်မာစာ", title: "စာလုံးပေါင်းသတ်ပုံမှန်ကန်မှု" },
      { tag: "အသုံးချမြန်မာစာ", title: "အနှစ်ချုပ်ရေးသားခြင်း" },
    ],
    tags: [{ key: "စကားပြေ" }, { key: "ကဗျာ" }, { key: "အသုံးချမြန်မာစာ" }],
  },
  {
    module_number: "AM 1001",
    module_name: "Aspects of Myanmar",
    type: "minor",
    isElective: false,
    coverURL: "/myanmar-independence-1.jpg",
    contents: [
      { title: "Bagan Art and Architecture" },
      { title: "Konbaung Period" },
    ],
  },
  {
    module_number: "Eng 1001",
    module_name: "English",
    type: "minor",
    isElective: false,
    coverURL: "/english-language-1.jpg",
    contents: [
      { tag: "UNIT 1", title: "People" },
      { tag: "UNIT 2", title: "Posessions" },
      { tag: "UNIT 3", title: "Places" },
    ],
    tags: [{ key: "UNIT 1" }, { key: "UNIT 2" }, { key: "UNIT 3" }],
  },
  {
    module_number: "Maths 1001",
    module_name: "Mathematics",
    type: "minor",
    isElective: true,
    coverURL: "/mathematics-2.png",
    contents: [
      {
        tag: "Modern Algebra and Trigonometry",
        title: "Permutations, Combinations, and the Binomial Theorem",
      },
      {
        tag: "Modern Algebra and Trigonometry",
        title: "Mathematical Induction",
      },
      {
        tag: "Calculus with Analytic Geometry",
        title: "Coordinates, Graphs, Lines",
      },
      {
        tag: "Calculus with Analytic Geometry",
        title: "Topics in Analytic Geometry",
      },
      {
        tag: "Calculus",
        title: "Limits and Continuity",
      },
      {
        tag: "Calculus",
        title: "Transcendental Functions",
      },
    ],
    tags: [
      { key: "Modern Algebra and Trigonometry" },
      { key: "Calculus with Analytic Geometry" },
      { key: "Calculus" },
    ],
  },
  // {
  //   module_number: "Phy 1001",
  //   module_name: "Physics",
  //   type: "minor",
  //   isElective: true,
  //   coverURL: "/pathein-umbrella-1.jpg",
  // },
  {
    module_number: "CS 1101",
    module_name: "Computing Fundamentals I",
    type: "major",
    isElective: false,
    coverURL: "/computing-1.jpg",
    contents: [
      {
        tag: "Chapter 1",
        title: "Introduction",
      },
      {
        tag: "Chapter 2",
        title: "Basic Computer Organization",
      },
      {
        tag: "Chapter 3",
        title: "Number Systems",
      },
      {
        tag: "Chapter 4",
        title: "Computer Codes",
      },
      {
        tag: "Chapter 5",
        title: "Computer Arithmetic",
      },
      {
        tag: "Chapter 7",
        title: "Processor and Memory",
      },
      {
        tag: "Chapter 20",
        title: "Classification of Computers",
      },
    ],
  },
  {
    module_number: "CS 1102",
    module_name: "Program Development Methodology I",
    type: "major",
    isElective: false,
    coverURL: "/cs-image-1.jpg",
    contents: [
      { tag: "Chapter 1", title: "Data Structures" },
      { tag: "Chapter 2", title: "Algorithms" },
    ],
  },
];

const myan_1001_contents = [
  { tag: "စကားပြေ", title: "ကျစွာမင်းနှင့်မိထွေးတော်" },
  { tag: "စကားပြေ", title: "ရှင်သာရိပုတ္တရာ၏ဂုဏ်ရည်" },
  { tag: "စကားပြေ", title: "ကျေးဇူးတရား" },
  { tag: "ကဗျာ", title: "တောင်တွင်းရွှေပြည်" },
  { tag: "ကဗျာ", title: "နှမလက်လျှော့နေလေတော့" },
  { tag: "ကဗျာ", title: "ရွှေရုပ်သွင်" },
  { tag: "ကဗျာ", title: "နေဝင်မြင်သည် ဝရွှေပြည်" },
  { tag: "အသုံးချမြန်မာစာ", title: "စာလုံးပေါင်းသတ်ပုံမှန်ကန်မှု" },
  { tag: "အသုံးချမြန်မာစာ", title: "အနှစ်ချုပ်ရေးသားခြင်း" },
];

const eng_1001_contents = [
  { tag: "UNIT 1", title: "People" },
  { tag: "UNIT 2", title: "Posessions" },
  { tag: "UNIT 3", title: "Places" },
];

const maths_1001_contents = [
  {
    tag: "Modern Algebra and Trigonometry",
    title: "Permutations, Combinations, and the Binomial Theorem",
  },
  {
    tag: "Modern Algebra and Trigonometry",
    title: "Mathematical Induction",
  },
  {
    tag: "Calculus with Analytic Geometry",
    title: "Coordinates, Graphs, Lines",
  },
  {
    tag: "Calculus with Analytic Geometry",
    title: "Topics in Analytic Geometry",
  },
  {
    tag: "Calculus",
    title: "Limits and Continuity",
  },
  {
    tag: "Calculus",
    title: "Transcendental Functions",
  },
];

const am_1001_contents = [
  { title: "Bagan Art and Architecture" },
  { title: "Konbaung Period" },
];

const cs_1101_contents = [
  {
    tag: "Chapter 1",
    title: "Introduction",
  },
  {
    tag: "Chapter 2",
    title: "Basic Computer Organization",
  },
  {
    tag: "Chapter 3",
    title: "Number Systems",
  },
  {
    tag: "Chapter 4",
    title: "Computer Codes",
  },
  {
    tag: "Chapter 5",
    title: "Computer Arithmetic",
  },
  {
    tag: "Chapter 7",
    title: "Processor and Memory",
  },
  {
    tag: "Chapter 20",
    title: "Classification of Computers",
  },
];

const cs_1102_contents = [
  { tag: "Chapter 1", title: "Data Structures" },
  { tag: "Chapter 2", title: "Algorithms" },
];

export function Portal({ setRenderAs, csPortalUser, setAvatarURL }) {
  // Get Avatar URL
  const getAvatarURL = () => {
    const avatarFilePath = csPortalUser.split(" ").join("");
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(`public/${avatarFilePath}.jpg`);
    setAvatarURL(data.publicUrl);
    setAvatarUrl(data.publicUrl);
  };
  useEffect(() => {
    getAvatarURL();
  }, []);

  const [avatarUrl, setAvatarUrl] = useState("");

  // Header Stuck and Unstuck Logic
  const [headerIsStuck, setHeaderIsStuck] = useState(false);
  const [headerStyles, setHeaderStyles] = useState({
    headerDivStyles: {
      width: "100vw",
      marginTop: "8rem",
      marginLeft: "-8.5vw",
      paddingLeft: "7.5vw",
      paddingBottom: "0rem",
      paddingTop: "0.6rem",
      position: "sticky",
      top: "0rem",
      zIndex: 100,
    },
  });
  const handleHeaderStyles = () => {
    const position = window.pageYOffset;
    if (portalView === "Portal Home" && position > 550) {
      setHeaderStyles({
        headerDivStyles: {
          width: "100vw",
          marginTop: "8rem",
          marginLeft: "-8.5vw",
          paddingLeft: "7.5vw",
          paddingBottom: "0rem",
          paddingTop: "0.6rem",
          position: "sticky",
          top: "0rem",
          zIndex: 100,
          // background: "red",
          WebkitBackdropFilter: "saturate(180%) blur(25px)",
          backdropFilter: "saturate(180%) blur(25px)",
        },
      });
      setHeaderIsStuck(true);
    } else {
      if (portalView === "Module Home" && position > 525) {
        setHeaderStyles({
          headerDivStyles: {
            width: "100vw",
            marginTop: "-0.25rem",
            marginLeft: "-8.5vw",
            paddingLeft: "7.5vw",
            paddingBottom: "0vh",
            paddingTop: "0.35rem",
            position: "sticky",
            top: "0rem",
            zIndex: 100,
            WebkitBackdropFilter: "saturate(180%) blur(25px)",
            backdropFilter: "saturate(180%) blur(25px)",
          },
          moduleHomeHeaderModuleNumberTextColor: "black",
        });
        setHeaderIsStuck(true);
      } else {
        if (
          (portalView === "Module Home" || portalView === "Content Home") &&
          position > 100
        ) {
          setHeaderStyles({
            headerDivStyles: {
              width: "100vw",
              marginTop: "-0.25rem",
              marginLeft: "-8.5vw",
              paddingLeft: "7.5vw",
              paddingBottom: "0vh",
              paddingTop: "0.35rem",
              position: "sticky",
              top: "0rem",
              zIndex: 100,
              WebkitBackdropFilter: "saturate(180%) blur(25px)",
              backdropFilter: "saturate(180%) blur(25px)",
            },
            moduleHomeHeaderModuleNumberTextColor: "white",
          });
        } else {
          if (portalView === "Module Home" || portalView === "Content Home") {
            setHeaderStyles({
              headerDivStyles: {
                width: "100vw",
                marginTop: "-0.25rem",
                marginLeft: "-8.5vw",
                paddingLeft: "7.5vw",
                paddingBottom: "0vh",
                paddingTop: "0.35rem",
                position: "sticky",
                top: "0rem",
                zIndex: 100,
              },
              moduleHomeHeaderModuleNumberTextColor: "gray",
            });
            setHeaderIsStuck(false);
          } else {
            if (portalView === "Portal Home") {
              setHeaderStyles({
                headerDivStyles: {
                  width: "100vw",
                  marginTop: "8rem",
                  marginLeft: "-8.5vw",
                  paddingLeft: "7.5vw",
                  paddingBottom: "0rem",
                  paddingTop: "0.6rem",
                  position: "sticky",
                  top: "0rem",
                  zIndex: 100,
                },
                // headerDivStyles: {
                //   width: "100vw",
                //   marginTop: "8rem",
                //   marginLeft: "-8.5vw",
                //   paddingLeft: "7.5vw",
                //   paddingBottom: "0rem",
                //   paddingTop: "0.6rem",
                //   position: "sticky",
                //   top: "0rem",
                //   zIndex: 100,
                // },
              });
              setHeaderIsStuck(false);
            }
          }
        }
      }
    }
  };
  window.addEventListener("scroll", handleHeaderStyles, { passive: true });

  // View Controller Logic
  const [portalView, setPortalView] = useState("Portal Home");
  const [moduleInView, setModuleInView] = useState("");
  const [contentInViewTitle, setContentInViewTitle] = useState("");
  const [contentInViewTag, setContentInViewTag] = useState("");
  const useViewController = (view) => {
    setPortalView(view);
  };

  // Scroll Refs
  const moduleHomeFirstGridRef = useRef(null);

  // Tag Filter Logic for Module Home
  // const [selectedTagInModuleHome, setSelectedTagInModuleHome] = useState("");

  // Logout Modal Ref
  const [logoutModalIsVisible, setLogoutModalIsVisible] = useState(false);
  const handleOpenLogoutModal = () => {
    console.log("It reached here");
    setLogoutModalIsVisible(true);
  };
  const handleCloseLogoutModal = () => {
    setLogoutModalIsVisible(false);
  };
  // const logoutFunction = () => {
  //   window.scrollTo({ top: 0, left: 0 });
  //   localStorage.removeItem("csPortalUser");
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1000);
  // };

  return (
    <div
      style={{
        padding: "8.5vw",
        paddingTop: "1.5rem",
        // paddingTop: "2.5vw",
        paddingBottom: "0vh",
        width: "100vw",
        height: "fit-content",
        background: "linear-gradient(#fff, #0D324D 40%, #7F5A83)",
        WebkitUserSelect: "none",
        userSelect: "none",
        // overflowY: "scroll",
        // overflowX: "hidden",
        // : "5vh",
      }}
    >
      {portalView === "Portal Home" && (
        <>
          <Grid.Container css={{ marginLeft: "-5.5vw" }}>
            <Grid xs={12}>
              <Container>
                <Text
                  h1
                  size={68}
                  // color="white"
                  color="black"
                  css={{
                    // textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    fontFamily: "serif",
                    fontStyle: "italic",
                  }}
                  weight="bold"
                >
                  University
                </Text>
                <Text
                  h1
                  size={68}
                  // color="white"
                  color="black"
                  css={{
                    // textGradient: "45deg, $purple600 -20%, $pink600 100%",
                    fontFamily: "serif",
                    fontStyle: "italic",
                  }}
                  weight="bold"
                >
                  of
                </Text>
                <Text
                  h1
                  size={68}
                  // color="white"
                  color="black"
                  css={{
                    // textGradient: "45deg, $yellow600 -20%, $red600 100%",
                    fontFamily: "serif",
                    fontStyle: "italic",
                  }}
                  weight="bold"
                >
                  Yangon
                </Text>
              </Container>
            </Grid>
          </Grid.Container>
          <div
            style={headerStyles.headerDivStyles}
            // style={
            //   headerIsStuck
            //     ? {
            //         width: "100vw",
            //         marginTop: "11rem",
            //         marginLeft: "-8.5vw",
            //         paddingLeft: "7.5vw",
            //         paddingBottom: "0rem",
            //         paddingTop: "0.6rem",
            //         position: "sticky",
            //         top: "0rem",
            //         zIndex: 100,
            //         // background: "red",
            //         WebkitBackdropFilter: "saturate(180%) blur(25px)",
            //         backdropFilter: "saturate(180%) blur(25px)",
            //       }
            //     : {
            //         width: "100vw",
            //         marginTop: "11rem",
            //         marginLeft: "-8.5vw",
            //         paddingLeft: "7.5vw",
            //         paddingBottom: "0rem",
            //         paddingTop: "0.6rem",
            //         position: "sticky",
            //         top: "0rem",
            //         zIndex: 100,
            //       }
            // }
          >
            <Text
              h1
              // size={28}
              size={22.5}
              // css={{
              //   textGradient: "45deg, $blue600 -20%, $pink600 50%",
              // }}
              color="white"
              //   color={headerIsStuck ? "black" : "white"}
              weight="bold"
              css={{
                display: "inline-flex",
                fontFamily: "monospace",
                textTransform: "uppercase",
              }}
            >
              <Button
                auto
                flat
                //   shadow={headerIsStuck ? false : true}
                //   shadow={headerIsStuck ? true : false}
                shadow
                //   bordered={headerIsStuck ? true : false}
                // rounded={headerIsStuck ? false : true}
                rounded={headerIsStuck ? true : false}
                //   size={headerIsStuck ? "xs" : "sm"}
                //   size="sm"
                //   icon={headerIsStuck ? "" : <img src="/ArrowLeftSquare.svg" />}
                // icon={<img src="/Home.svg" />}
                icon={
                  headerIsStuck ? (
                    <img src="/ArrowUpSquare.svg" />
                  ) : (
                    <img src="/Logout.svg" />
                  )
                }
                onPress={() => {
                  if (headerIsStuck) {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  } else {
                    console.log("it reached here!");
                    handleOpenLogoutModal();
                    // window.scrollTo({ top: 0, left: 0 });
                    // localStorage.removeItem("csPortalUser");
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, 1000);
                  }
                  // localStorage.removeItem("csPortalUser");
                  // window.scrollTo({ top: 0, left: 0 });
                  // window.location.reload();
                  // setRenderAs("Auth");
                }}
                color={headerIsStuck ? "primary" : "success"}
                css={{ marginRight: "0.75rem", marginTop: "0.425rem" }}
                // css={{ marginRight: "1rem" }}
                // css={{ marginRight: "0.5rem" }}
                // color={headerIsStuck ? "secondary" : "primary"}
              >
                {/* Go Home */}
                {/* {headerIsStuck ? "Home" : "Go Home"} */}
              </Button>
              <Text
                h1
                size={18}
                // size={22.5}
                color="white"
                weight="bold"
                css={{ marginTop: "0.85rem" }}
                // css={{ marginTop: "0.575rem" }}
              >
                Computer Science Portal
              </Text>
              <Avatar
                src={avatarUrl}
                // size="lg"
                // squared
                bordered
                color="primary"
                zoomed
                css={{
                  marginLeft: "0.8rem",
                  marginTop: "0.375rem",
                  // marginTop: "0.35rem",
                  size: "$15",
                  // size: "$16",
                }}
              />
            </Text>
          </div>
          <Grid.Container
            css={{ marginTop: "10vh", marginBottom: "5vh" }}
            gap={1.5}
            justify="center"
          >
            <PortalHomeCard
              setHeaderIsStuck={setHeaderIsStuck}
              module="Myan 1001"
              setHeaderStyles={setHeaderStyles}
              setModuleInView={setModuleInView}
              useViewController={useViewController}
              coverURL="/pathein-umbrella-1.jpg"
              boldenedTitle="Myanmar"
              fadedTitle="1001"
            />
            <PortalHomeCard
              setHeaderIsStuck={setHeaderIsStuck}
              module="Eng 1001"
              setHeaderStyles={setHeaderStyles}
              setModuleInView={setModuleInView}
              useViewController={useViewController}
              coverURL="/english-language-1.jpg"
              boldenedTitle="English"
              fadedTitle="1001"
            />
            <PortalHomeCard
              setHeaderIsStuck={setHeaderIsStuck}
              module="Maths 1001"
              setHeaderStyles={setHeaderStyles}
              setModuleInView={setModuleInView}
              useViewController={useViewController}
              coverURL="/mathematics-2.png"
              boldenedTitle="Maths"
              fadedTitle="1001"
              // boldenedTitle="Maths 1001"
              // fadedTitle="Mathematics"
            />
            <PortalHomeCard
              setHeaderIsStuck={setHeaderIsStuck}
              module="AM 1001"
              setHeaderStyles={setHeaderStyles}
              setModuleInView={setModuleInView}
              useViewController={useViewController}
              coverURL="/myanmar-independence-1.jpg"
              boldenedTitle="AM"
              fadedTitle="1001"
              // boldenedTitle="Aspects of"
              // fadedTitle="Myanmar 1001"
              // boldenedTitle="Aspects of Myanmar"
              // fadedTitle="&nbsp;1001"
            />
            <PortalHomeCard
              setHeaderIsStuck={setHeaderIsStuck}
              module="CS 1101"
              setHeaderStyles={setHeaderStyles}
              setModuleInView={setModuleInView}
              useViewController={useViewController}
              coverURL="/computing-1.jpg"
              boldenedTitle="CS"
              fadedTitle="1101"
              // boldenedTitle="CS 1101"
              // fadedTitle="Computing Fundamentals Part (I)"
              // fadedTitle="&nbsp;Computing Fundamentals Part (I)"
            />
            <PortalHomeCard
              setHeaderIsStuck={setHeaderIsStuck}
              module="CS 1102"
              setHeaderStyles={setHeaderStyles}
              setModuleInView={setModuleInView}
              useViewController={useViewController}
              coverURL="/cs-image-1.jpg"
              boldenedTitle="CS"
              fadedTitle="1102"
              // boldenedTitle="CS 1102"
              // fadedTitle="Program Development Methodology I"
            />
          </Grid.Container>
        </>
      )}
      {portalView === "Module Home" && moduleInView === "Myan 1001" && (
        <ModuleHome
          setHeaderIsStuck={setHeaderIsStuck}
          setContentInViewTitle={setContentInViewTitle}
          setContentInViewTag={setContentInViewTag}
          headerIsStuck={headerIsStuck}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
          setModuleInView={setModuleInView}
          useViewController={useViewController}
          module_number="Myan 1001"
          module_name="Myanmar"
          contents={myan_1001_contents}
          moduleHomeFirstGridRef={moduleHomeFirstGridRef}
          coverURL="/pathein-umbrella-1.jpg"
          csPortalUser={csPortalUser}
        />
      )}
      {portalView === "Module Home" && moduleInView === "Eng 1001" && (
        <ModuleHome
          setHeaderIsStuck={setHeaderIsStuck}
          setContentInViewTitle={setContentInViewTitle}
          setContentInViewTag={setContentInViewTag}
          headerIsStuck={headerIsStuck}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
          setModuleInView={setModuleInView}
          useViewController={useViewController}
          module_number="Eng 1001"
          module_name="English"
          contents={eng_1001_contents}
          moduleHomeFirstGridRef={moduleHomeFirstGridRef}
          coverURL="/english-language-1.jpg"
        />
      )}
      {portalView === "Module Home" && moduleInView === "Maths 1001" && (
        <ModuleHome
          setHeaderIsStuck={setHeaderIsStuck}
          setContentInViewTitle={setContentInViewTitle}
          setContentInViewTag={setContentInViewTag}
          headerIsStuck={headerIsStuck}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
          setModuleInView={setModuleInView}
          useViewController={useViewController}
          module_number="Maths 1001"
          module_name="Mathematics"
          contents={maths_1001_contents}
          moduleHomeFirstGridRef={moduleHomeFirstGridRef}
          coverURL="/mathematics-2.png"
        />
      )}
      {portalView === "Module Home" && moduleInView === "AM 1001" && (
        <ModuleHome
          setHeaderIsStuck={setHeaderIsStuck}
          setContentInViewTitle={setContentInViewTitle}
          setContentInViewTag={setContentInViewTag}
          headerIsStuck={headerIsStuck}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
          setModuleInView={setModuleInView}
          useViewController={useViewController}
          module_number="AM 1001"
          module_name="Aspects of Myanmar"
          contents={am_1001_contents}
          moduleHomeFirstGridRef={moduleHomeFirstGridRef}
          coverURL="/myanmar-independence-1.jpg"
        />
      )}
      {portalView === "Module Home" && moduleInView === "CS 1101" && (
        <ModuleHome
          setHeaderIsStuck={setHeaderIsStuck}
          setContentInViewTitle={setContentInViewTitle}
          setContentInViewTag={setContentInViewTag}
          headerIsStuck={headerIsStuck}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
          setModuleInView={setModuleInView}
          useViewController={useViewController}
          module_number="CS 1101"
          module_name="Computing Fundamentals I"
          contents={cs_1101_contents}
          moduleHomeFirstGridRef={moduleHomeFirstGridRef}
          coverURL="/computing-1.jpg"
        />
      )}
      {portalView === "Module Home" && moduleInView === "CS 1102" && (
        <ModuleHome
          setHeaderIsStuck={setHeaderIsStuck}
          setContentInViewTitle={setContentInViewTitle}
          setContentInViewTag={setContentInViewTag}
          headerIsStuck={headerIsStuck}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
          setModuleInView={setModuleInView}
          useViewController={useViewController}
          module_number="CS 1102"
          module_name="Program Development Methodology I"
          contents={cs_1102_contents}
          moduleHomeFirstGridRef={moduleHomeFirstGridRef}
          coverURL="/cs-image-1.jpg"
        />
      )}
      {portalView === "Content Home" && (
        <ContentHome
          headerIsStuck={headerIsStuck}
          setHeaderIsStuck={setHeaderIsStuck}
          headerStyles={headerStyles}
          setHeaderStyles={setHeaderStyles}
          setContentInViewTitle={setContentInViewTitle}
          setContentInViewTag={setContentInViewTag}
          useViewController={useViewController}
          tag={contentInViewTag}
          title={contentInViewTitle}
          csPortalUser={csPortalUser}
          avatarUrl={avatarUrl}
        />
      )}
      <Spacer y={0.5} />
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={logoutModalIsVisible}
        onClose={handleCloseLogoutModal}
        css={{ WebkitUserSelect: "none", userSelect: "none" }}
      >
        <Modal.Header>
          <Text
            b
            id="modal-title"
            size={18}
            color="red"
            css={{ fontFamily: "monospace" }}
          >
            <Text b size={18} color="primary" css={{ fontFamily: "monospace" }}>
              {csPortalUser},{" "}
            </Text>
            <Text b size={18} color="red" css={{ fontFamily: "monospace" }}>
              are you sure you want to sign out?
            </Text>
            {/* <Text b size={18} color="red" css={{ fontFamily: "monospace" }}>
              {" "}
              ?
            </Text> */}
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            icon={<img src="/Logout.svg" />}
            // iconRight={<img src="/Logout.svg" />}
            onPress={() => {
              window.scrollTo({ top: 0, left: 0 });
              localStorage.removeItem("csPortalUser");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
            css={{ color: "black" }}
            // onPress={logoutFunction}
          >
            Yes
          </Button>
          <Button
            auto
            flat
            color="success"
            onPress={handleCloseLogoutModal}
            iconRight={<img src="/CloseSquare.svg" />}
            // icon={<img src="/CloseSquare.svg" />}
            css={{ color: "black" }}
          >
            NO
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
