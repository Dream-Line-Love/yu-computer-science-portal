import { Badge, Button, Card, Grid, Modal, Row, Text } from "@nextui-org/react";
import { useState } from "react";

export function PortalHomeCard({
  module,
  setHeaderStyles,
  setHeaderIsStuck,
  setModuleInView,
  useViewController,
  coverURL,
  boldenedTitle,
  fadedTitle,
}) {
  return (
    <Grid xs={6} sm={4} md={3}>
      <Card
        isHoverable
        isPressable
        onPress={() => {
          setModuleInView(module);
          useViewController("Module Home");
          window.scrollTo({
            top: 0,
            left: 0,
          });
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
        }}
        // css={{ h: "15rem" }}
      >
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={coverURL}
            objectFit="cover"
            width="100%"
            // height="100%"
            height={150}
            alt="Module Cover Photo"
          />
        </Card.Body>
        <Card.Footer
          // isBlurred
          css={{ justifyItems: "flex-start" }}
          // css={{
          //   position: "absolute",
          //   bgBlur: "#ffffff66",
          //   borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          //   bottom: 0,
          //   zIndex: 1,
          // }}
        >
          <Row wrap="wrap" justify="space-between" align="center">
            <Text
              b
              size={18}
              css={{
                fontFamily: "monospace",
                textTransform: "uppercase",
                // color: "white",
              }}
            >
              {boldenedTitle}
            </Text>
            <Text
              css={{
                // color: "black",
                color: "$accents7",
                fontWeight: "$semibold",
                fontSize: "$sm",
                // fontSize: "$xs",
                fontFamily: "monospace",
              }}
            >
              {fadedTitle}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}

export function ModuleHome({
  headerIsStuck,
  setHeaderIsStuck,
  headerStyles,
  setHeaderStyles,
  setModuleInView,
  setContentInViewTitle,
  setContentInViewTag,
  useViewController,
  module_number,
  module_name,
  contents,
  moduleHomeFirstGridRef,
  coverURL,
}) {
  const [contentChoice, setContentChoice] = useState("Notes");

  return (
    <div>
      <div
        style={headerStyles.headerDivStyles}
        // style={
        //   headerIsStuck
        //     ? {
        //         width: "100vw",
        //         marginTop: "-0.25rem",
        //         marginLeft: "-8.5vw",
        //         paddingLeft: "7.5vw",
        //         paddingBottom: "0vh",
        //         paddingTop: "0.35rem",
        //         position: "sticky",
        //         top: "0rem",
        //         zIndex: 100,
        //         WebkitBackdropFilter: "saturate(180%) blur(25px)",
        //         backdropFilter: "saturate(180%) blur(25px)",
        //       }
        //     : {
        //         width: "100vw",
        //         marginTop: "-0.25rem",
        //         marginLeft: "-8.5vw",
        //         paddingLeft: "7.5vw",
        //         paddingBottom: "0vh",
        //         paddingTop: "0.35rem",
        //         position: "sticky",
        //         top: "0rem",
        //         zIndex: 100,
        //       }
        // }
      >
        <div
          style={{
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80vw",
            paddingBottom: "0.65em",
          }}
        >
          <Button
            auto
            flat
            shadow
            // light={headerIsStuck ? false : true}
            // flat={headerIsStuck ? true : false}
            // shadow={headerIsStuck ? true : false}
            rounded={headerIsStuck ? true : false}
            icon={
              headerIsStuck ? (
                <img src="/ArrowUpSquare.svg" />
              ) : (
                <img src="/ArrowLeftSquare.svg" />
              )
            }
            onPress={() => {
              if (headerIsStuck) {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, left: 0 });
                setModuleInView("");
                useViewController("Portal Home");
                setHeaderStyles({
                  headerDivStyles: {
                    width: "100vw",
                    marginTop: "9rem",
                    marginLeft: "-8.5vw",
                    paddingLeft: "7.5vw",
                    paddingBottom: "0rem",
                    paddingTop: "0.6rem",
                    position: "sticky",
                    top: "0rem",
                    zIndex: 100,
                  },
                });
              }
            }}
            color={headerIsStuck ? "primary" : "success"}
            css={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
          />
          <Text
            h1
            size={28}
            // color={headerIsStuck ? "black" : "gray"}
            color={headerStyles.moduleHomeHeaderModuleNumberTextColor}
            weight="bold"
            css={{
              display: "inline-flex",
              marginBottom: "-0.25rem",
              fontFamily: "Source Code Pro, monospace",
              textTransform: "uppercase",
              "@sm": {
                fontSize: 36,
              },
            }}
          >
            {module_number}
          </Text>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          marginTop: "12.5vh",
          marginBottom: "15vh",
        }}
      >
        <Card
          // draggable="false"
          css={{ w: "100%", h: "400px", maxWidth: "75rem" }}
        >
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              src={coverURL}
              width="100%"
              height="100%"
              objectFit="cover"
              alt="Module Cover Photo"
            />
          </Card.Body>
          <Card.Footer
            isBlurred
            css={{
              position: "absolute",
              bgBlur: "#ffffff66",
              borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
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
              <Text
                b
                // color="white"
                color="#000"
                size={32}
                css={{
                  fontFamily: "Lucida Console",
                  fontStyle: "italic",
                  //   textTransform: ""
                  // textTransform: "uppercase",
                  "@sm": {
                    fontSize: 36,
                  },
                }}
              >
                {module_name}
              </Text>
              <Button
                auto
                flat
                color="secondary"
                shadow
                rounded
                icon={<img src="/ArrowDownSquare.svg" />}
                css={{
                  marginTop: "0.75vh",
                  marginBottom: "1vh",
                }}
                onPress={() => {
                  moduleHomeFirstGridRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                  });
                }}
              />
            </div>
          </Card.Footer>
        </Card>
      </div>

      <div
        style={{
          maxWidth: "10.5rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: "0.5rem",
          // marginTop: "1rem",
        }}
      >
        <Badge
          size="lg"
          isSquared
          enableShadow
          color={contentChoice === "Notes" ? "primary" : "neutral"}
          onClick={() => {
            setContentChoice("Notes");
          }}
        >
          Notes
        </Badge>
        {/* <Badge
          size="lg"
          isSquared
          enableShadow
          color={contentChoice === "Tutorials" ? "success" : "neutral"}
          onClick={() => {
            setContentChoice("Tutorials");
          }}
        >
          Tutorials
        </Badge> */}
      </div>

      {contentChoice === "Notes" && (
        <Grid.Container
          css={{
            marginTop: "1.5rem",
            // marginTop: "15vh",
            marginBottom: "2.5rem",
            //   background: "red",
          }}
          gap={2.5}
          ref={moduleHomeFirstGridRef}
        >
          {contents.map((content) => (
            <Grid
              key={content.title}
              xs={12}
              sm={6}
              md={4}
              // css={{
              //   //   marginBottom: "-10vh",
              //   width: "100%",
              //   //   background: "red",
              //   px: "0.5rem",
              //   "@sm": {
              //     p: "5rem",
              //     // mx: "2.5rem",
              //   },
              // }}
              css={{
                width: "100%",
                px: "0.5rem",
              }}
            >
              <Card
                isPressable
                isHoverable
                variant="bordered"
                onPress={() => {
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
                  window.scrollTo({
                    top: 0,
                    left: 0,
                  });
                  setContentInViewTag(content.tag);
                  setContentInViewTitle(content.title);
                  useViewController("Content Home");
                  console.log("It reached here!", content.title);
                }}
                //   css={{ mw: "400px" }}
              >
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Text
                        size={13.5}
                        css={{
                          marginBottom: "0rem",
                          // fontFamily: "Merriweather, serif",
                        }}
                      >
                        {content.tag}
                      </Text>
                      <Text
                        b
                        size={15.5}
                        css={{
                          fontFamily: "Source Code Pro, serif",
                        }}
                      >
                        {content.title}
                      </Text>
                    </div>
                    <Button
                      auto
                      light
                      rounded
                      // flat
                      iconRight={<img src="/ArrowRightSquare.svg" />}
                    ></Button>
                  </div>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      )}

      {/* {contentChoice === "Tutorials" &&
        
      } */}
    </div>
  );
}

export function ContentHome({
  headerIsStuck,
  setHeaderIsStuck,
  headerStyles,
  setHeaderStyles,
  setContentInViewTitle,
  setContentInViewTag,
  useViewController,
  tag,
  title,
}) {
  const handleExitContentHome = () => {
    window.scrollTo({ top: 0, left: 0 });
    setContentInViewTag("");
    setContentInViewTitle("");
    useViewController("Module Home");
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
  };
  return (
    <div style={{ height: "200rem" }}>
      <div style={headerStyles.headerDivStyles}>
        <div
          style={{
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "82.5vw",
            paddingBottom: "0.65em",
          }}
        >
          <Button
            auto
            flat
            shadow
            rounded={headerIsStuck ? true : false}
            icon={
              headerIsStuck ? (
                <img src="/ArrowUpSquare.svg" />
              ) : (
                <img src="/ArrowLeftSquare.svg" />
              )
            }
            onPress={() => {
              if (headerIsStuck) {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              } else {
                handleExitContentHome();
              }
            }}
            color={headerIsStuck ? "primary" : "success"}
            css={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // paddingTop: "rem",
            }}
          >
            <Text
              size={13.5}
              css={{
                marginTop: "-0.4rem",
                marginBottom: "0.25rem",
                fontFamily: "monospace",
              }}
            >
              {tag}
            </Text>
            <Text
              size={15.5}
              weight="bold"
              css={{
                marginBottom: "-0.5rem",
                fontFamily: "monospace",
                textAlign: "center",
                marginTop: "-0.35rem",
                lineHeight: "1.15rem",
              }}
            >
              {title}
            </Text>
            {/* <Text
              h1
              size={13.5}
              // color="black"
              // weight="bold"
              css={{
                display: "inline-flex",
                marginBottom: "-0.25rem",
                fontFamily: "Source Code Pro, monospace",
                textTransform: "uppercase",
                // "@sm": {
                //   fontSize: 36,
                // },
              }}
            >
              {tag}
            </Text> */}
            {/* <Text
              h1
              size={14}
              color="black"
              weight="bold"
              css={{
                display: "inline-flex",
                marginBottom: "-0.25rem",
                fontFamily: "Source Code Pro, monospace",
                textTransform: "uppercase",
                "@sm": {
                  fontSize: 36,
                },
              }}
            >
              {title}
            </Text> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// export function LogoutModal({
//   logoutModalIsVisible,
//   handleCloseLogoutModal,
//   logoutFunction,
// }) {
//   return (
//     <Modal
//       blur
//       closeButton
//       aria-labelledby="modal-title"
//       open={logoutModalIsVisible}
//       onClose={handleCloseLogoutModal}
//       css={{ WebkitUserSelect: "none", userSelect: "none" }}
//     >
//       <Modal.Header>
//         <Text
//           b
//           id="modal-title"
//           size={22}
//           color="red"
//           css={{ fontFamily: "monospace", textTransform: "uppercase" }}
//         >
//           Are you sure to log out?
//         </Text>
//       </Modal.Header>
//       <Modal.Footer>
//         <Button
//           auto
//           flat
//           color="success"
//           onPress={handleCloseLogoutModal}
//           icon={<img src="/CloseSquare.svg" />}
//         >
//           Close
//         </Button>
//         <Button
//           auto
//           flat
//           color="error"
//           onPress={logoutFunction}
//           iconRight={<img src="/Logout.svg" />}
//         >
//           Sign in
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

{
  /* <Dropdown>
                    <Dropdown.Button flat color="primary">
                      {selectedTagInModuleHome}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      color="primary"
                      aria-label="Dynamic Actions"
                      selectionMode="single"
                      items={module.tags}
                      defaultSelectedKeys={selectedTagInModuleHome}
                      onSelectionChange={setSelectedTagInModuleHome}
                      disallowEmptySelection
                    >
                      {(item) => (
                        <Dropdown.Item key={item.key}>{item.key}</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown> */
}

{
  /* {module.tags.map((tag) => (
                    <Badge
                      key={tag.key}
                      onClick={() => setSelectedTagInModuleHome(tag.key)}
                    >
                      {tag.key}
                    </Badge>
                  ))} */
}

{
  /* {module.contents.map((content) => (
                    <Grid.Container
                      key={content.title}
                      css={{
                        marginTop: "5vh",
                        marginBottom: "15vh",
                      }}
                      gap={0}
                      ref={moduleHomeFirstGridRef}
                    >
                      {selectedTagInModuleHome === "" && (
                        <Grid
                          xs={12}
                          sm={6}
                          md={4}
                          css={{ marginBottom: "-10vh" }}
                        >
                          <Card
                            isPressable
                            isHoverable
                            variant="bordered"
                            css={{ mw: "400px" }}
                          >
                            <Card.Body>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <Text
                                    size={14.5}
                                    css={{
                                      marginBottom: "0rem",
                                      // fontFamily: "Merriweather, serif",
                                    }}
                                  >
                                    {content.tag}
                                  </Text>
                                  <Text
                                    b
                                    size={16.5}
                                    css={{
                                      fontFamily: "Source Code Pro, serif",
                                    }}
                                  >
                                    {content.title}
                                  </Text>
                                </div>
                                <Button
                                  auto
                                  light
                                  // flat
                                  iconRight={
                                    <img src="/ArrowRightSquare.svg" />
                                  }
                                ></Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Grid>
                      )}
                      {selectedTagInModuleHome !== "" &&
                        selectedTagInModuleHome === content.tag && (
                          <Grid
                            xs={12}
                            sm={6}
                            md={4}
                            css={{ marginBottom: "-10vh" }}
                          >
                            <Card
                              isPressable
                              isHoverable
                              variant="bordered"
                              css={{ mw: "400px" }}
                            >
                              <Card.Body>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div>
                                    <Text
                                      size={14.5}
                                      css={{
                                        marginBottom: "0rem",
                                        // fontFamily: "Merriweather, serif",
                                      }}
                                    >
                                      {content.tag}
                                    </Text>
                                    <Text
                                      b
                                      size={16.5}
                                      css={{
                                        fontFamily: "Source Code Pro, serif",
                                      }}
                                    >
                                      {content.title}
                                    </Text>
                                  </div>
                                  <Button
                                    auto
                                    light
                                    // flat
                                    iconRight={
                                      <img src="/ArrowRightSquare.svg" />
                                    }
                                  >
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Grid>
                        )}
                    </Grid.Container>
                  ))} */
}

{
  /* <Grid xs={6} sm={4}>
              <Card
                isPressable
                onPress={() => {
                  setModuleInView("Myan 1001");
                  useViewController("Module Home");
                  window.scrollTo({
                    top: 0,
                    left: 0,
                  });
                }}
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={"/pathein-umbrella-1.jpg"}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt="Subjects"
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>Myanmar</Text>
                    <Text
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      1001
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid> */
}
{
  /* <Grid xs={6} sm={4}>
              <Card
                isPressable
                onPress={() => {
                  setModuleInView("Eng 1001");
                  useViewController("Module Home");
                  window.scrollTo({
                    top: 0,
                    left: 0,
                  });
                }}
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={"/english-language-1.jpg"}
                    objectFit="fill"
                    width="100%"
                    height={140}
                    alt="Subjects"
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>English</Text>
                    <Text
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      1001
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid> */
}
{
  /* <Grid xs={6} sm={4}>
              <Card
                isPressable
                onPress={() => {
                  setModuleInView("Maths 1001");
                  useViewController("Module Home");
                  window.scrollTo({
                    top: 0,
                    left: 0,
                  });
                }}
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={"/mathematics-2.png"}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt="Subjects"
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>Maths 1001</Text>
                    <Text
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      Mathematics
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid> */
}
{
  /* <Grid xs={6} sm={4}>
              <Card
                isPressable
                onPress={() => {
                  setModuleInView("AM 1001");
                  useViewController("Module Home");
                  window.scrollTo({
                    top: 0,
                    left: 0,
                  });
                }}
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={"/myanmar-independence-1.jpg"}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt="Subjects"
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b css={{ display: "inline-flex" }}>
                      Aspects of Myanmar{" "}
                      <Text
                        css={{
                          color: "$accents7",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                        &nbsp;1001
                      </Text>
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid> */
}
{
  /* <Grid xs={6} sm={4}>
              <Card
                isPressable
                onPress={() => {
                  setModuleInView("CS 1101");
                  useViewController("Module Home");
                  window.scrollTo({
                    top: 0,
                    left: 0,
                  });
                }}
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={"/computing-1.jpg"}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt="Subjects"
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>CS 1101</Text>
                    <Text
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      &nbsp;Computing Fundamentals Part (I)
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid> */
}
{
  /* <Grid xs={6} sm={4}>
              <Card
                isPressable
                onPress={() => {
                  setModuleInView("CS 1102");
                  useViewController("Module Home");
                  window.scrollTo({
                    top: 0,
                    left: 0,
                  });
                }}
              >
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={"/cs-image-1.jpg"}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt="Subjects"
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>CS 1102</Text>
                    <Text
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      Program Development Methodology I
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid> */
}
