import { useLayoutEffect, useState } from "react";

interface useIsScreenWidthProps{
    minScreenWidth: number;
}

export default function useIsScreenWidth(props: useIsScreenWidthProps){
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useLayoutEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= props.minScreenWidth);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isSmallScreen,
    }
} 