"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { useRouter } from "next/navigation";
import LoginIcon from "@mui/icons-material/Login";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginComponent from "../Login/LoginComponent";
import { CategoryTypes } from "@/types/category";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FeedIcon from "@mui/icons-material/Feed";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

function NavbarHelper({
  isLoginUser,
  category,
}: {
  isLoginUser: any;
  category: CategoryTypes[];
}) {
  const history = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  console.log("user  ", isLoginUser);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("search  ", event);
    const search = event.target.search.value;
    history.push(`/search?search=${search}`);
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(!isOpen);
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: "left") => (
    <Box
      sx={{ width: 320, bgcolor: "#f4f8ff", position: "relative" }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      className="min-h-screen"
    >
      <Grid alignItems={"center"} sx={{ bgcolor: "#023359", p: 1 }} container>
        <Grid xs={8}>
          <Grid xs={12} sm={3} md={2}>
            <Image alt="logo" width={180} height={10} src="/logo.png" />
          </Grid>
        </Grid>
        <Grid
          onClick={toggleDrawer(anchor, false)}
          justifyContent={"end"}
          sx={{ color: "white", textAlign: "end" }}
          xs={4}
        >
          <CloseIcon sx={{ fontSize: 25 }} />
        </Grid>
      </Grid>
      <List>
        {["Home"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon></HomeIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {category?.map((data: CategoryTypes, index) => (
          <ListItem key={data?.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {data?.title === "Vehicles" ? (
                  <DirectionsCarIcon />
                ) : data?.title === "News" ? (
                  <FeedIcon />
                ) : data?.title === "Sports" ? (
                  <SportsSoccerIcon />
                ) : data?.title === "Jobs" ? null : (
                  <PhoneAndroidIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={data?.title === "Jobs" ? null : data?.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Grid sx={{ bottom: 0, position: "absolute", ml: 2 }} container>
        <Grid xs={0} sm={4} md={5} lg={7}></Grid>

        <Grid
          xs={0}
          // sx={{ display: "flex" }}
          // gap={2}
          sm={12}
          // md={7}
          sx={{mb:2}}
          // lg={5}
          container
        >
          <Grid xs={4}>
            <Typography
              gap={2}
              sx={{
                fontSize: 11,
                color: "#023359",
                ":hover": { textDecoration: "underline" },
              }}
            >
              <Link href={"/aboutus"}>About Us</Link>
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              gap={2}
              sx={{
                fontSize: 11,
                color: "#023359",
                ":hover": { textDecoration: "underline" },
              }}
            >
              <Link href={"/contactUs"}>Contact us</Link>
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              gap={2}
              sx={{
                fontSize: 11,
                color: "#023359",
                ":hover": { textDecoration: "underline" },
              }}
            >
              <Link href={"/privacyPolicy"}>Privacy Policy</Link>
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              gap={2}
              sx={{
                fontSize: 11,
                color: "#023359",
                ":hover": { textDecoration: "underline" },
              }}
            >
              <Link href={"/termCondition"}>Terms Condition</Link>
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              gap={2}
              sx={{
                fontSize: 11,
                color: "#023359",
                ":hover": { textDecoration: "underline" },
              }}
            >
              <Link href={"/faq"}>FAQ</Link>
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              gap={2}
              sx={{
                fontSize: 11,
                color: "#023359",
                ":hover": { textDecoration: "underline" },
              }}
            >
              <Link href={"/helpus"}>Tip Us</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
  return (
    <Grid container>
      <Grid sx={{ m: 0, p: 0 }} xs={12}>
        <AppBar sx={{ bgcolor: "#ffffff", m: 0, p: 0 }} position="static">
          <Grid
            sx={{
              bgcolor: "white",
              display: { xs: "none", sm: "flex" },
            }}
            container
            xs={0}
            sm={12}
          >
            <Grid container>
              <Grid xs={0} sm={4} md={5} lg={7}></Grid>

              <Grid
                xs={0}
                sx={{ display: "flex" }}
                gap={2}
                sm={8}
                md={7}
                lg={5}
              >
                <Typography
                  gap={2}
                  sx={{
                    fontSize: 11,
                    color: "#023359",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  <Link href={"/aboutus"}>About Us</Link>
                </Typography>

                <Typography
                  gap={2}
                  sx={{
                    fontSize: 11,
                    color: "#023359",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  <Link href={"/contactUs"}>Contact us</Link>
                </Typography>

                <Typography
                  gap={2}
                  sx={{
                    fontSize: 11,
                    color: "#023359",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  <Link href={"/privacyPolicy"}>Privacy Policy</Link>
                </Typography>

                <Typography
                  gap={2}
                  sx={{
                    fontSize: 11,
                    color: "#023359",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  <Link href={"/termCondition"}>Terms Condition</Link>
                </Typography>

                <Typography
                  gap={2}
                  sx={{
                    fontSize: 11,
                    color: "#023359",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  <Link href={"/faq"}>FAQ</Link>
                </Typography>
                <Typography
                  gap={2}
                  sx={{
                    fontSize: 11,
                    color: "#023359",
                    ":hover": { textDecoration: "underline" },
                  }}
                >
                  <Link href={"/helpus"}>Tip Us</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* phone devices */}
          <Box
            sx={{
              bgcolor: "#023359",
              display: { xs: "flex", sm: "none" },
              py: 2,
            }}
          >
            <Grid container>
              <Grid xs={1}>
                <Button onClick={toggleDrawer("left", true)}>
                  <MenuIcon className=" text-white" />
                </Button>
              </Grid>

              <Grid xs={2.5}> </Grid>
              <Grid xs={8}>
                <Grid xs={12} sm={3} md={2}>
                  <Image alt="logo" width={180} height={10} src="/logo.png" />
                </Grid>
              </Grid>

              <Grid xs={12} container>
                <Grid xs={1}></Grid>
                <Grid xs={10}>
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-center  mt-3 ">
                      <div className="relative w-full ">
                        <input
                          type="text"
                          className="w-full  py-2 pl-10 pr-4 text-gray-700 bg-[#eaf2ff] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Search mobiles, laptops, brands, and more..."
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-3 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.386a1 1 0 01-1.414 1.414l-5.387-5.386zM8 14A6 6 0 108 2a6 6 0 000 12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </form>
                </Grid>
                <Grid xs={1}></Grid>
              </Grid>
            </Grid>

            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </Box>

          <Grid
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <Grid
              sx={{
                m: 2,
              }}
              container
            >
              <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
              <Grid xs={12} sm={3} md={2}>
                <Image alt="logo" width={180} height={10} src="/logo.png" />
              </Grid>
              <Grid xs={0} sm={1}></Grid>
              <Grid sm={5}>
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-center  mt-3 ">
                    <div className="relative w-full ">
                      <input
                        type="text"
                        className="sm:w-[350px] md:w-[450px]  py-2 pl-10 pr-4 text-gray-700 bg-[#eaf2ff] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search mobiles, laptops, brands, and more..."
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-3 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.386a1 1 0 01-1.414 1.414l-5.387-5.386zM8 14A6 6 0 108 2a6 6 0 000 12z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
        <AppBar
          sx={{
            bgcolor: "#023359",
            m: 0,
            p: 0,
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
          position="static"
        >
          <Grid container sx={{ m: 0, p: 0 }} xs={12}>
            <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
            <Grid xs={12} md={10} lg={9.8} xl={7}>
              {/* <Container sx={{ m: 0, p: 0 }} maxWidth="xl"> */}
              <Grid container>
                <Grid alignItems={"left"} container xs={11}>
                  {category?.map((value: CategoryTypes) => {
                    return (
                      <Grid sx={{ p: 1 }} xs={1} key={value.id}>
                        <Typography
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            history.push(`/category/${value.title}`);
                          }}
                        >
                          {value.title}
                        </Typography>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid textAlign={"end"} xs={1}>
                  <>
                    <Popover>
                      <PopoverTrigger>
                        <LoginIcon sx={{ mt: 1 }} />
                      </PopoverTrigger>
                      <PopoverContent className="w-[355px] md:w-[550px]">
                        <LoginComponent />
                      </PopoverContent>
                    </Popover>

                    <GroupAddIcon
                      sx={{ ml: 1.5, mt: 1 }}
                      onClick={() => history.push("/register")}
                    />
                  </>
                </Grid>
                {/* <Grid xs={4}>
                <ListItem
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    mt: 1,
                    color: "#e691c4",
                    fontWeight: 600,
                  }}
                  onClick={() => signOut()}
                >
                  {
                    isLoginUser ? <Typography sx={{ fontWeight: 600 }} textAlign="center">
                    Logout
                  </Typography> : null
                  }
                </ListItem>
              </Grid> */}
                {/* <Grid xs={4}>
                <ListItem
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    mt: 1,
                    color: "#e691c4",
                    fontWeight: 600,
                  }}
                  onClick={() => history.push("/")}
                >
                  <Typography sx={{ fontWeight: 600 }} textAlign="center">
                    Home
                  </Typography>
                </ListItem>
              </Grid>
              <Grid xs={4}>
                <ListItem
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    mt: 1,
                    color: "#e691c4",
                    fontWeight: 600,
                  }}
                  onClick={() => history.push("/news")}
                >
                  <Typography sx={{ fontWeight: 600 }} textAlign="center">
                    News
                  </Typography>
                </ListItem>
              </Grid>
              <Grid xs={4}>
                <ListItem
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    mt: 1,
                    color: "#e691c4",
                    fontWeight: 600,
                  }}
                  onClick={() => history.push("/aboutUs")}
                >
                  <Typography sx={{ fontWeight: 600 }} textAlign="center">
                    About Us
                  </Typography>
                </ListItem>
              </Grid> */}
              </Grid>
              {/* </Container> */}
            </Grid>
            <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
          </Grid>
        </AppBar>
      </Grid>
    </Grid>
  );
}
export default NavbarHelper;
