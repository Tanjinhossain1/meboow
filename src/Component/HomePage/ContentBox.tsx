"use client";
import { formatForUrl, truncateText } from "@/utils/utils";
import styled from "@mui/system/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Image from "next/image";
import Link from "next/link";

export const SampleBrands = [
  "SAMSUNG",
  "APPLE",
  "HUAWEI",
  "NOKIA",
  "SONY",
  "LG",
  "HTC",
  "MOTOROLA",
  "LENOVO",
  "XIAOMI",
  "GOOGLE",
  "HONOR",
  "OPPO",
  "REALME",
  "ONEPLUS",
  "NOTHING",
  "VIVO",
  "MEIZU",
  "ASUS",
  "ALCATEL",
  "ZTE",
  "MICROSOFT",
  "UMIDIGI",
  "ENERGIZER",
  "CAT",
  "SHARP",
  "MICROMAX",
  "INFINIX",
  "ULEFONE",
  "TECNO",
  "DOOGEE",
  "BLACKVIEW",
  "CUBOT",
  "OUKITEL",
  "ITEL",
  "TCL",
];

const HoverBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  "&:hover .title": {
    transform: "translateY(-280%)",
  },
  "&:hover .bigTitle": {
    transform: "translateY(-660%)",
  },
  "&:hover .description": {
    transform: "translateY(0)",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  padding: theme.spacing(1),
  transition: "transform 0.3s ease-in-out",
  zIndex: 1,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  textOverflow: "ellipsis",
}));

const Description = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  padding: theme.spacing(1),
  paddingTop: "3px",
  transition: "transform 0.3s ease-in-out",
  transform: "translateY(100%)",
  zIndex: 0,
}));

const ContentBox = ({
  image,
  title,
  category,
  description,
  isBig,
  tooSmall,
}: {
  image: string;
  category: string;
  title: string;
  description: string;
  isBig?: boolean;
  tooSmall?: boolean;
}) => (
  <HoverBox>
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: isBig ? "280px" : "135px",
      }}
    >
      <Link
        aria-label="Image Article & Article"
        href={
          category === "Mobiles"
            ? `/review/${formatForUrl(title)}`
            : `/article/${formatForUrl(title)}`
        }
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${image}`}
          alt={title}
          layout="fill"
          objectFit="contain"
          priority={isBig} // Preload only if critical
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Ensure responsive loading
        />
      </Link>
    </Box>
    <Link
      aria-label="Title"
      href={
        category === "Mobiles"
          ? `/review/${formatForUrl(title)}`
          : `/article/${formatForUrl(title)}`
      }
    >
      <Title
        sx={{ fontSize: isBig ? 21 : 20, fontWeight: 600 }}
        className={
          isBig
            ? "bigTitle"
            : "title overflow-hidden text-ellipsis line-clamp-3 text-sm"
        }
      >
        {title}
      </Title>
    </Link>
    <Link
      aria-label="Description"
      href={
        category === "Mobiles"
          ? `/review/${formatForUrl(title)}`
          : `/article/${formatForUrl(title)}`
      }
    >
      <Description sx={{ fontSize: isBig ? 12 : 11 }} className="description">
        {isBig ? description : truncateText(description, tooSmall ? 100 : 190)}
      </Description>
    </Link>
  </HoverBox>
);

export default ContentBox;
