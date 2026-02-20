"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles"
import { serverURL } from "../services/FetchNodeServices";


export default function ProductImageComponent({data,pictures}) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
   //const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;


  const images = [
    `${serverURL}/images/aloosev1.png`,
    `${serverURL}/images/aloosev2.png`,
    `${serverURL}/images/aloosev3.png`,
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const showPictures=()=>{
    return pictures?.picture?.split(",").map((item)=>{
    return       <img
              src={`${serverURL}/images/${item}`}
              alt=""
              style={{ width: 300, height: 300, borderRadius: 25 }}
            />
      

    })
  }
  return (
    <div style={{ marginTop: 30, marginLeft: matches ? "0" : "3%" }}>
      {matches ? (

        // MOBILE: ke liye  !!

        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          <Slider {...settings}>
            {images.map((item) => (
              <div >
                <img
                  src={item}
                  alt=""
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 15,
                    // margin: "0 auto",
                  
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (

        // Original wala !!
        <div>
          <img
            src={`${serverURL}/images/${data?.picture}`}
            alt=""
            style={{
              width: 500,
              height: 450,
              borderRadius: 25,
              marginBottom: 2,
            }}
          />
          <div style={{ display: "flex", gap: 20 }}>
            {showPictures()}
          </div>
        </div>
      )}
    </div>
  );
}