import { Button, Card, Grid, Row, Text } from "@nextui-org/react";

export function PortalHomeCard({
  module,
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
        }}
      >
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={coverURL}
            objectFit="cover"
            width="100%"
            height={140}
            alt="Module Cover Photo"
          />
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>{boldenedTitle}</Text>
            <Text
              css={{
                color: "$accents7",
                fontWeight: "$semibold",
                fontSize: "$sm",
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
  setModuleInView,
  useViewController,
  module_number,
  module_name,
  contents,
  moduleHomeFirstGridRef,
  coverURL,
}) {
  return (
    <div>
      <div
        style={
          headerIsStuck
            ? {
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
              }
            : {
                width: "100vw",
                marginTop: "-0.25rem",
                marginLeft: "-8.5vw",
                paddingLeft: "7.5vw",
                paddingBottom: "0vh",
                paddingTop: "0.35rem",
                position: "sticky",
                top: "0rem",
                zIndex: 100,
              }
        }
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
              }
            }}
            color={headerIsStuck ? "primary" : "success"}
            css={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
          />
          <Text
            h1
            size={28}
            color={headerIsStuck ? "black" : "gray"}
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
        <Card css={{ w: "100%", h: "400px", maxWidth: "75rem" }}>
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
      <Grid.Container
        css={{
          marginTop: "15vh",
          marginBottom: "5vh",
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
    </div>
  );
}

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
