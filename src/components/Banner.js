import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Router from "next/router";
import { Carousel } from "react-responsive-carousel";
import redirect from "nextjs-redirect";

function Banner() {
  const goToBannerLink = (i, link) => {
    const linktosend = link.props.href;
    console.log(linktosend);
    window.location.href = linktosend;
  };

  return (
    <div className="relative">
      <div className="absolute w-full h-5  md:h-64 bg-gradient-to-t from-white to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        emulateTouch={true}
        interval={4000}
        onClickItem={goToBannerLink}
      >
        <a href="https://spacetravel-frontendmentor.netlify.app/">
          <img loading="lazy" src="https://i.imgur.com/N8f4ygS.png" />
        </a>

        <a href={"https://coin-spider-4a6f0.web.app/"}>
          <img loading="lazy" src="https://i.imgur.com/vwCMeus.png" />
        </a>

        <a href="https://konobar-co.web.app/">
          <img loading="lazy" src="https://i.imgur.com/8wSb2Xy.png" />
        </a>
        <a href={"https://stjepan-suton.netlify.app/"}>
          <img loading="lazy" src="https://i.imgur.com/MqkGPsf.jpg" />
        </a>
      </Carousel>
    </div>
  );
}

export default Banner;
