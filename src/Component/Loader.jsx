import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
  <div className='pt-25 h-screen md:pt-40 lg:pt-72 p-24  place-items-center'>
      <StyledWrapper>
      <div>
        <div className="loading-content">
          <div className="liquid" />
          <div className="liquid" />
          <div className="liquid" />
          <div className="liquid" />
        </div>
        <svg className="svg">
          <filter id="gooey">
            <feGaussianBlur stdDeviation={10} in="SourceGraphic" />
            <feColorMatrix values="1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 20 -10" />
          </filter>
        </svg>
      </div>
    </StyledWrapper>
  </div>
  );
}

const StyledWrapper = styled.div`
  .loading-content {
    position: relative;
    width: 180px;
    height: 180px;
    animation: rotate 4s ease-in-out infinite;
    filter: url("#gooey");
  }
  @keyframes rotate {
    0% {
      transform: rotate(360deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  .loading-content .liquid {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(
      90deg,
      rgba(0, 30, 250, 1) 0%,
      rgba(70, 130, 252, 1) 100%
    );
    width: 50px;
    height: 50px;
    border-radius: 50%;
    --ani_dur: 4s;
  }
  .loading-content .liquid:nth-child(1) {
    top: 0;
    animation: animate1 var(--ani_dur) ease-in-out infinite;
  }
  .loading-content .liquid:nth-child(2) {
    left: 0;
    animation: animate2 var(--ani_dur) ease-in-out infinite;
  }
  .loading-content .liquid:nth-child(3) {
    left: 100%;
    animation: animate3 var(--ani_dur) ease-in-out infinite;
  }
  .loading-content .liquid:nth-child(4) {
    top: 100%;
    animation: animate4 var(--ani_dur) ease-in-out infinite;
  }
  @keyframes animate1 {
    0% {
      top: 0;
    }
    50% {
      top: 100%;
    }
    100% {
      top: 100%;
    }
  }
  @keyframes animate2 {
    0% {
      left: 0;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
  @keyframes animate3 {
    0% {
      left: 100%;
    }
    50% {
      left: 0;
    }
    100% {
      left: 0;
    }
  }
  @keyframes animate4 {
    0% {
      top: 100%;
    }
    50% {
      top: 0;
    }
    100% {
      top: 0;
    }
  }
  .svg {
    width: 0;
    height: 0;
  }`;

export default Loader;
