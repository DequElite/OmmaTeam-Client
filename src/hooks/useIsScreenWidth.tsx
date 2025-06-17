'use client'

import { useEffect, useState } from "react";

interface useIsScreenWidthProps{
    minScreenWidth: number;
}

export default function useIsScreenWidth(props: useIsScreenWidthProps){
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= props.minScreenWidth);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [props.minScreenWidth]);

    return {
        isSmallScreen,
    }
} 