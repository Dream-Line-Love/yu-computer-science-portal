import {
  Modal,
  Input,
  Checkbox,
  Container,
  Text,
  Spacer,
  Card,
  Col,
  Row,
  Button,
  Grid,
  Image,
  User,
  Radio,
  Avatar,
  Loading,
  Collapse,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase.config";

const Password = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill={fill}>
        <path d="M18.75 8v2.1a12.984 12.984 0 00-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2a12.984 12.984 0 00-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8z" />
        <path d="M18.75 10.1a12.984 12.984 0 00-1.5-.1H6.75a12.984 12.984 0 00-1.5.1C2.7 10.41 2 11.66 2 15v2c0 4 1 5 5 5h10c4 0 5-1 5-5v-2c0-3.34-.7-4.59-3.25-4.9zM8.71 16.71A1.052 1.052 0 018 17a1 1 0 01-.38-.08 1.032 1.032 0 01-.33-.21A1.052 1.052 0 017 16a1 1 0 01.08-.38 1.155 1.155 0 01.21-.33 1.032 1.032 0 01.33-.21 1 1 0 011.09.21 1.155 1.155 0 01.21.33A1 1 0 019 16a1.052 1.052 0 01-.29.71zm4.21-.33a1.155 1.155 0 01-.21.33A1.052 1.052 0 0112 17a1.033 1.033 0 01-.71-.29 1.155 1.155 0 01-.21-.33A1 1 0 0111 16a1.033 1.033 0 01.29-.71 1.047 1.047 0 011.42 0A1.033 1.033 0 0113 16a1 1 0 01-.08.38zm3.79.33a1.014 1.014 0 01-1.42 0 1.014 1.014 0 010-1.42 1.047 1.047 0 011.42 0c.04.05.08.1.12.16a.556.556 0 01.09.17.636.636 0 01.06.18 1.5 1.5 0 01.02.2 1.052 1.052 0 01-.29.71z" />
      </g>
    </svg>
  );
};

export function Auth({ setRenderAs, studentList, setCsPortalUser }) {
  // Admin modal
  const [adminModalIsVisible, setAdminModalIsVisible] = useState(false);
  const handleOpenAdminModal = () => {
    setAdminModalIsVisible(true);
  };
  const handleCloseAdminModal = () => {
    setAdminPassword("");
    setShowAdminPasswordHelper(false);
    setAdminModalIsVisible(false);
  };

  // Student modal
  const [studentModalIsVisible, setStudentModalIsVisible] = useState(false);
  const handleOpenStudentModal = () => {
    setStudentModalIsVisible(true);
  };
  const handleCloseStudentModal = () => {
    setStudentModalView(1);
    setSelectedName(null);
    setSelectedFile();
    setProfilePhotoPlaceholder("/User.svg");
    setShowStudentHelper(false);
    setShowStudentPasswordHelper(false);
    setStudentPassword("");
    setShowLoadingForModalEnter(false);
    setShowLoadingForModalNext(false);
    setStudentModalIsVisible(false);
  };
  const [studentModalView, setStudentModalView] = useState(1);

  // Global
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin modal utilities
  const adminPasswordSet = "111111";
  const [showAdminPasswordHelper, setShowAdminPasswordHelper] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const handleAdminAuth = () => {
    if (adminPassword.length === 0) {
      setShowAdminPasswordHelper(true);
    } else {
      if (adminPassword !== adminPasswordSet) {
        setShowAdminPasswordHelper("Wrong");
      } else {
        if (adminPassword === adminPasswordSet) {
          setShowAdminPasswordHelper("Correct");
          setRenderAs("Dashboard");
        }
      }
    }
  };

  // Student modal utilities
  const [selectedName, setSelectedName] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [profilePhotoPlaceholder, setProfilePhotoPlaceholder] =
    useState("/User.svg");
  const [showStudentHelper, setShowStudentHelper] = useState(false);
  const [showLoadingForModalEnter, setShowLoadingForModalEnter] =
    useState(false);
  const [showLoadingForModalNext, setShowLoadingForModalNext] = useState(false);
  const [showStudentPasswordHelper, setShowStudentPasswordHelper] =
    useState(false);
  const [studentPassword, setStudentPassword] = useState("");
  const [studentPasswordSet, setStudentPasswordSet] = useState("");
  const [userHasAlreadySignedUp, setUserHasAlreadySignedUp] = useState(false);
  const handleStudentNext1 = async () => {
    setShowLoadingForModalNext(true);
    if (selectedName === null) {
      setShowLoadingForModalNext(false);
      setShowStudentHelper(true);
    } else {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("full_name", selectedName)
        .single();
      if (error) throw error;
      if (data) {
        // console.log("It reached here!", data.passw);
        if (data.password !== "") {
          setShowStudentHelper(false);
          setUserHasAlreadySignedUp(true);
          setStudentPasswordSet(data.password);
          setStudentModalView(2);
          console.log("Already signed up before!");
          // render already password
        } else {
          setShowStudentHelper(false);
          setUserHasAlreadySignedUp(false);
          setStudentModalView(2);
          console.log("User has not signed up before!");
        }
      }
    }
  };
  const handleStudentNext2 = () => {
    if (studentPassword.length === 0) {
      setShowStudentPasswordHelper(true);
    } else {
      setShowStudentPasswordHelper(false);
      setStudentModalView(3);
    }
  };
  const handleStudentSignIn = () => {
    if (studentPassword.length === 0) {
      setShowStudentPasswordHelper(true);
      setStudentModalView(2);
    } else {
      setStudentModalView(2);
      if (studentPassword !== studentPasswordSet) {
        setShowStudentPasswordHelper("Wrong");
        setStudentModalView(2);
      } else {
        setStudentModalView(2);
        if (studentPassword === studentPasswordSet) {
          setStudentModalView(2);
          setCsPortalUser(selectedName);
          localStorage.setItem("csPortalUser", selectedName);
          handleCloseStudentModal();
          setTimeout(() => {
            window.scrollTo({ top: 0, left: 0 });
            setRenderAs("Portal");
            // supabase.removeChannel("public:users");
          }, 500);
        }
      }
      setStudentModalView(2);
    }
  };
  const handleStudentSubmit = async () => {
    const FileName = selectedName.split(" ").join("");
    // const AvatarFile = event.target.files[0];
    if (!selectedFile) {
      setShowStudentHelper("No File");
      return;
    }

    // Upload password to database
    const handlePasswordUpload = async () => {
      const { data, error } = await supabase
        .from("users")
        .update({ password: studentPassword })
        .eq("full_name", selectedName)
        .select();
      if (error) throw error;
      if (data) {
        console.log("Password set successfully!");
      }
    };
    handlePasswordUpload();

    // Upload profile photo to storage bucket
    const handleAvatarUpload = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`public/${FileName}.jpg`, selectedFile, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) throw error;
      if (data) {
        console.log(data);
        console.log("It reached here though");
        setShowLoadingForModalEnter(true);
        setCsPortalUser(selectedName);
        localStorage.setItem("csPortalUser", selectedName);
        setTimeout(() => {
          handleCloseStudentModal();
        }, 3000);
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0 });
          setRenderAs("Portal");
        }, 4000);
      }
    };
    handleAvatarUpload();
  };

  // Whether to show YU picture or not
  const [showYUPicture, setShowYUPicture] = useState(false);
  useEffect(() => {
    if (window.innerWidth >= 960) {
      setShowYUPicture(true);
    }
  });
  const handleYUPictureOnResize = () => {
    if (window.innerWidth < 960) {
      setShowYUPicture(false);
    } else {
      setShowYUPicture(true);
    }
  };
  addEventListener("resize", handleYUPictureOnResize);

  return (
    <div
      // fluid
      style={{
        padding: "8.5vw",
        paddingTop: "1.5rem",
        paddingBottom: "0vw",
        width: "100vw",
        height: "fit-content",
        background: "linear-gradient(180deg, white, #E0EAFC 25%, black)",
        WebkitUserSelect: "none",
        userSelect: "none",
        // background: "linear-gradient(#E0EAFC, #CFDEF3)",
      }}
    >
      <Grid.Container css={{ marginLeft: "-5.5vw" }}>
        <Grid xs={12} sm={6}>
          <Container>
            <Text
              h1
              size={68}
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
        {}
        {showYUPicture === true && (
          <Grid xs={12} sm={6} css={{ marginTop: "0.5rem" }}>
            <Image src="/uy-1.jpg" />
          </Grid>
        )}
      </Grid.Container>
      {/* <Spacer y={1} /> */}
      {/* <Text
        h1
        size={25}
        // css={{
        //   textGradient: "45deg, $blue600 -20%, $pink600 50%",
        // }}
        color="black"
        weight="bold"
      >
        
      </Text> */}
      <Spacer y={6.5} />

      <Grid.Container
        gap={2}
        justify="center"
        css={{
          "@md": { paddingLeft: "5rem", paddingRight: "5rem" },
          "@lg": {
            paddingLeft: "10rem",
            paddingRight: "10rem",
          },
          "@xl": {
            paddingLeft: "15rem",
            paddingRight: "15rem",
          },
        }}
      >
        <Grid xs={12} sm={6} css={{ marginBottom: "2.5rem" }}>
          <Card
            css={{ w: "100%", h: "400px" }}
            isPressable
            isHoverable
            onPress={handleOpenAdminModal}
          >
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text
                  size={18}
                  weight="bold"
                  transform="uppercase"
                  color="black"
                  css={{
                    fontFamily: "monospace",
                    "@sm": {
                      fontSize: 23,
                      // color: "white",
                    },
                    "@md": {
                      fontSize: 25,
                      // color: "white",
                    },
                    "@xl": {
                      fontSize: 28,
                      // fontSize: 30,
                      color: "white",
                    },
                  }}
                >
                  University Laboratory Building
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src="/ulb-1.png"
                width="100%"
                height="100%"
                objectFit="cover"
                alt="Card example background"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div>
                  <Text
                    color="#000"
                    size={20}
                    css={{
                      fontWeight: "bold",
                      "@sm": {
                        fontSize: 22,
                      },
                      // fontFamily: "monospace",
                    }}
                  >
                    Admin Dashboard
                  </Text>
                  <Text
                    color="#000"
                    size={18}
                    css={{
                      "@sm": {
                        fontSize: 20,
                      },
                      // fontFamily: "monospace",
                    }}
                  >
                    For Faculty and EC's
                  </Text>
                </div>
                <Button
                  flat
                  auto
                  // rounded
                  color="success"
                  onPress={handleOpenAdminModal}
                  icon={<img src="/Login.svg" />}
                >
                  {/* <Text
                    css={{
                      color: "inherit",
                      "@sm": {
                        fontSize: 15,
                      },
                    }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Sign In
                  </Text> */}
                </Button>
              </div>
              {/* <Row>
                <Col>
                  <Text
                    color="#000"
                    size={12}
                    css={{
                      fontWeight: "bold",
                      "@sm": {
                        fontSize: 16,
                      },
                    }}
                  >
                    Admin Dashboard
                  </Text>
                  <Text
                    color="#000"
                    size={12}
                    css={{
                      "@sm": {
                        fontSize: 16,
                      },
                    }}
                  >
                    For Faculty and EC's
                  </Text>
                </Col>
                <Col>
                  <Row justify="flex-end">
                    <Button
                      flat
                      auto
                      rounded
                      color="success"
                      onPress={handleOpenAdminModal}
                    >
                      <Text
                        css={{
                          color: "inherit",
                          "@sm": {
                            fontSize: 15,
                          },
                        }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        Sign In
                      </Text>
                    </Button>
                  </Row>
                </Col>
              </Row> */}
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card
            css={{ w: "100%", h: "400px" }}
            isPressable
            isHoverable
            onPress={handleOpenStudentModal}
          >
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text
                  size={20}
                  weight="bold"
                  transform="uppercase"
                  color="white"
                  css={{
                    "@sm": {
                      fontSize: 24,
                      // color: "white",
                    },
                    // "@md": {
                    //   fontSize: 30,
                    //   // color: "white",
                    // },
                    "@xl": {
                      fontSize: 28,
                      // fontSize: 32,
                      // color: "white",
                    },
                  }}
                >
                  Lecture Notes, Sample Code, Assignments, etc.
                </Text>
              </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src="/cs-image-1.jpg"
                width="100%"
                height="100%"
                objectFit="cover"
                alt="Card example background"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop:
                  "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div>
                  <Text
                    color="cyan"
                    // color="#000"
                    size={20}
                    css={{
                      fontWeight: "bold",
                      "@sm": {
                        fontSize: 23.5,
                      },
                      // textTransform: "uppercase",
                      // fontFamily: "monospace",
                    }}
                  >
                    Computer Science Portal
                  </Text>
                  <Text
                    color="white"
                    // color="#000"
                    size={16}
                    css={{
                      "@sm": {
                        fontSize: 18,
                      },
                      fontFamily: "monospace",
                    }}
                  >
                    For 1Y1S Students
                  </Text>
                </div>
                <Button
                  flat
                  auto
                  // rounded
                  color="secondary"
                  onPress={handleOpenStudentModal}
                  icon={<img src="/Login.svg" />}
                >
                  {/* <Text
                    css={{
                      color: "inherit",
                      "@sm": {
                        fontSize: 15,
                      },
                    }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Enter
                  </Text> */}
                </Button>
              </div>
              {/* <Row>
                <Col>
                  <Text
                    color="#000"
                    size={12}
                    css={{
                      fontWeight: "bold",
                      "@sm": {
                        fontSize: 16,
                      },
                    }}
                  >
                    Computer Science Portal
                  </Text>
                  <Text
                    color="#000"
                    size={12}
                    css={{
                      "@sm": {
                        fontSize: 16,
                      },
                    }}
                  >
                    For 1Y1S Students
                  </Text>
                </Col>
                <Col>
                  <Row justify="flex-end">
                    <Button
                      flat
                      auto
                      rounded
                      color="secondary"
                      onPress={handleOpenStudentModal}
                    >
                      <Text
                        css={{
                          color: "inherit",
                          "@sm": {
                            fontSize: 15,
                          },
                        }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        Enter
                      </Text>
                    </Button>
                  </Row>
                </Col>
              </Row> */}
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>

      {/* <Spacer y={2} /> */}

      {/* <Spacer y={3} /> */}
      <Spacer y={15} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "50rem",
        }}
      >
        <Collapse
          shadow
          bordered
          title="DEVELOPER"
          divider={false}
          // color="white"
          css={{ fontFamily: "monospace" }}
          // onOpen={() => {
          //   window.scrollTo({ bottom: 0, left: 0, behavior: "smooth" });
          // }}
          arrowIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="34"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          }
        >
          <Row>
            <Col>
              <Text color="#000" size={16} css={{ fontFamily: "monospace" }}>
                developed by:
              </Text>
            </Col>
            <Col>
              <Text b color="#000" size={18} css={{ fontFamily: "monospace" }}>
                Zwe Nyan Zaw
              </Text>
              <Text
                color="#000"
                size={11}
                css={{ fontFamily: "monospace", fontStyle: "italic" }}
              >
                (2022 matriculated; first year first semester CS major at
                University of Yangon)
              </Text>
            </Col>
          </Row>
          <Spacer y={1} />
          <a href="https://www.github.com/DreamLineLove" target="_blank">
            <Row>
              <Col>
                <Text color="#000" size={18} css={{ fontFamily: "monospace" }}>
                  GitHub:
                  {/* <img
                  src="/Star.svg"
                  style={{ marginBottom: "-0.35rem", marginLeft: "0.175rem" }}
                />{" "} */}
                </Text>
                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg> */}
                <img src="/Star.svg" style={{ marginTop: "-0.5rem" }} />
              </Col>
              <Col>
                <Text
                  b
                  color="#000"
                  size={18}
                  css={{ fontFamily: "monospace" }}
                >
                  DreamLineLove
                </Text>
              </Col>
            </Row>
          </a>
        </Collapse>
      </div>
      {/* <Row>
        <Col>
          <Text color="#000" size={18} css={{ fontFamily: "monospace" }}>
            developed by:
          </Text>
        </Col>
        <Col>
          <Text b color="#000" size={18} css={{ fontFamily: "monospace" }}>
            Zwe Nyan Zaw
          </Text>
          <Text
            color="#000"
            size={13}
            css={{ fontFamily: "monospace", fontStyle: "italic" }}
          >
            (2022 matriculated, first year first semester CS major @ University
            of Yangon)
          </Text>
        </Col>
      </Row>
      <Spacer y={1} />
      <a href="https://www.github.com/DreamLineLove" target="_blank">
        <Row>
          <Col>
            <Text color="#000" size={18} css={{ fontFamily: "monospace" }}>
              GitHub:{" "}
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Col>
          <Col>
            <Text b color="#000" size={18} css={{ fontFamily: "monospace" }}>
              DreamLineLove
            </Text>
          </Col>
        </Row>
      </a> */}
      {/* <Row>
        <Col>
          <Text color="#000" size={15} css={{ fontFamily: "monospace" }}>
            Tech stack used:
          </Text>
        </Col>
        <Col>
          <Text color="#000" size={15} css={{ fontFamily: "monospace" }}>
            HTML
          </Text>
          <Text color="#000" size={15} css={{ fontFamily: "monospace" }}>
            CSS
          </Text>
          <Text color="#000" size={15} css={{ fontFamily: "monospace" }}>
            Javascript (ReactJS)
          </Text>
          <Text color="#000" size={15} css={{ fontFamily: "monospace" }}>
            Database (PostgresSQL)
          </Text>
        </Col>
      </Row> */}
      {/* <Text color="#000" size={15} css={{ fontFamily: "monospace" }}>
        Tech stack used: <br />
        HTML, CSS, Javascript
      </Text>
      <Spacer y={1} />
      <Text color="#000" size={15} css={{ fontFamily: "monospace" }}>
        javascript librarie: <br />
        HTML, CSS, Javascript
      </Text> */}
      <Spacer y={2} />
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={adminModalIsVisible}
        onClose={handleCloseAdminModal}
        css={{ WebkitUserSelect: "none", userSelect: "none" }}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <br />
            <Text b size={18}>
              1Y1S Dashboard
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="xl"
            placeholder="Enter admin password"
            contentLeft={<Password fill="currentColor" />}
            value={adminPassword}
            // onKeyDown={(e) => {
            //   if (e.code === "Space") return false;
            // }}
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
          />
          <Row justify="space-between">
            <Checkbox
              isSelected={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            >
              <Text size={14}>Remember me</Text>
            </Checkbox>
            {/* <Text size={14}>{password}</Text> */}
            {showAdminPasswordHelper === "Wrong" && (
              <Text size={14} color="red">
                Wrong Password
              </Text>
            )}
            {showAdminPasswordHelper === true && (
              <Text size={14} color="red">
                Please enter password
              </Text>
            )}
            {showAdminPasswordHelper === "Correct" && (
              <Text size={14} color="green">
                Correct Password
              </Text>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={handleCloseAdminModal}
            icon={<img src="/CloseSquare.svg" />}
          >
            Close
          </Button>
          <Button
            auto
            flat
            onPress={handleAdminAuth}
            iconRight={<img src="/Login.svg" />}
          >
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        scroll
        blur
        closeButton
        aria-labelledby="modal-title"
        open={studentModalIsVisible}
        onClose={handleCloseStudentModal}
        css={{ WebkitUserSelect: "none", userSelect: "none" }}
      >
        <Modal.Header>
          <Text
            b
            id="modal-title"
            // size={18}
            size={22}
            css={{ fontFamily: "monospace", textTransform: "uppercase" }}
          >
            {/* Welcome to
            <br />
            <Text b size={18}>
              1Y1S Portal
            </Text> */}
            {studentModalView === 1 &&
              showStudentHelper === false &&
              "Choose your name"}
            {studentModalView === 1 && showStudentHelper === true && (
              <Text b size={18} color="red">
                Please pick your name
              </Text>
            )}
            {studentModalView === 2 &&
              showStudentPasswordHelper === false &&
              userHasAlreadySignedUp === false &&
              "Create new password"}
            {studentModalView === 2 &&
              showStudentPasswordHelper === false &&
              userHasAlreadySignedUp === true &&
              "Welcome back!"}
            {studentModalView === 2 &&
              showStudentPasswordHelper === true &&
              userHasAlreadySignedUp === false && (
                <Text b size={18} color="red">
                  Please create a password
                </Text>
              )}
            {studentModalView === 2 &&
              showStudentPasswordHelper === true &&
              userHasAlreadySignedUp === true && (
                <Text b size={18} color="red">
                  Please enter your password
                </Text>
              )}
            {studentModalView === 2 &&
              showStudentPasswordHelper === "Wrong" &&
              userHasAlreadySignedUp === true && (
                <Text b size={18} color="red">
                  Wrong password!
                </Text>
              )}
            {studentModalView === 3 && (
              <label htmlFor="studentSubmit">
                {showStudentHelper !== "No File" && (
                  <Text b size={22} css={{ textTransform: "uppercase" }}>
                    Upload your profile picture
                  </Text>
                )}
                {showStudentHelper === "No File" && (
                  <Text
                    b
                    size={22}
                    css={{ textTransform: "uppercase" }}
                    color="red"
                  >
                    Please choose a profile picture
                  </Text>
                )}
              </label>
            )}
          </Text>
        </Modal.Header>
        <Modal.Body>
          {studentModalView === 1 && (
            <Radio.Group value={selectedName} onChange={setSelectedName}>
              {studentList.map((option) => (
                <Radio
                  size="sm"
                  key={option.full_name}
                  value={option.full_name}
                >
                  {option.full_name}
                </Radio>
              ))}
            </Radio.Group>
          )}
          {studentModalView === 2 && (
            <>
              <Input
                css={{ paddingTop: "0.5rem" }}
                clearable
                bordered
                fullWidth
                color="primary"
                size="xl"
                placeholder="What is your password?"
                contentLeft={<Password fill="currentColor" />}
                value={studentPassword}
                onChange={(e) => {
                  setStudentPassword(e.target.value);
                }}
              />
            </>
          )}
          {studentModalView === 3 && (
            <form
              style={{ display: "grid", placeItems: "center" }}
              // onSubmit={handleStudentSubmit}
            >
              <Avatar
                src={profilePhotoPlaceholder}
                // src="/User.svg"
                // src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                css={{ size: "$40" }}
                zoomed
                // bordered
                // color="success"
              />
              <Button
                color="secondary"
                auto
                // shadow
                // rounded
                iconRight={<img src="/Plus.svg" />}
                flat
                css={{ fontSize: "$lg", marginTop: "1rem" }}
              >
                {/* <img src="/Plus.svg" /> */}
                Upload
                <input
                  style={{ position: "absolute", opacity: 0 }}
                  type="file"
                  name="studentSubmit"
                  id="studentSubmit"
                  accept="image/png, image/jpeg"
                  onChange={(event) => {
                    setSelectedFile(event.target.files[0]);
                    const reader = new FileReader();

                    reader.onload = function (event) {
                      setProfilePhotoPlaceholder(event.target.result);
                    };

                    if (event.target.files[0]) {
                      reader.readAsDataURL(event.target.files[0]);
                    }
                  }}
                />
              </Button>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {studentModalView === 1 && (
            <>
              <Button
                auto
                flat
                color="error"
                onPress={handleCloseStudentModal}
                icon={<img src="/CloseSquare.svg" />}
                css={{ color: "black" }}
              >
                Close
              </Button>
              <Button
                auto
                flat
                onPress={() => handleStudentNext1()}
                css={{ color: "black" }}
                // iconRight={<img src="/ArrowRightSquare.svg" />}
              >
                {showLoadingForModalNext === false && (
                  <>
                    Next &nbsp;
                    <img src="/ArrowRightSquare.svg" />
                  </>
                )}
                {showLoadingForModalNext === true && (
                  <Loading type="points" color="currentColor" size="sm" />
                )}
              </Button>
            </>
          )}
          {studentModalView === 2 && (
            <>
              <Button
                auto
                flat
                color="error"
                onPress={() => {
                  setStudentModalView(1);
                  setStudentPassword("");
                  setUserHasAlreadySignedUp(false);
                  setShowStudentPasswordHelper(false);
                  setShowLoadingForModalNext(false);
                }}
                icon={<img src="ArrowLeftSquare.svg" />}
                css={{ color: "black" }}
              >
                Back
              </Button>
              {userHasAlreadySignedUp === false && (
                <Button
                  auto
                  flat
                  onPress={() => handleStudentNext2()}
                  iconRight={<img src="/ArrowRightSquare.svg" />}
                  css={{ color: "black" }}
                >
                  Next
                </Button>
              )}
              {userHasAlreadySignedUp === true && (
                <Button
                  auto
                  flat
                  onPress={() => handleStudentSignIn()}
                  iconRight={<img src="/Login.svg" />}
                  css={{ color: "black" }}
                >
                  Sign In
                </Button>
              )}
            </>
          )}
          {studentModalView === 3 && (
            <>
              <Button
                auto
                flat
                color="error"
                onPress={() => {
                  setStudentModalView(2);
                  setSelectedFile();
                  setProfilePhotoPlaceholder("/User.svg");
                  setShowStudentHelper(false);
                  setShowLoadingForModalEnter(false);
                }}
                icon={<img src="ArrowLeftSquare.svg" />}
                css={{ color: "black" }}
              >
                Back
              </Button>
              <Button
                auto
                flat
                onPress={handleStudentSubmit}
                css={{ color: "black" }}
                // iconRight={<img src="/Login.svg" />}
              >
                {showLoadingForModalEnter === false && (
                  <>
                    Enter &nbsp;
                    <img src="/Login.svg" />
                  </>
                )}
                {showLoadingForModalEnter === true && (
                  <Loading type="points" color="currentColor" size="sm" />
                )}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
