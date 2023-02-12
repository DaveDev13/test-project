import { useEffect, useState } from "react";
import { defaultTheme } from "../layouts/theme";

const useBreakpoint = () => {
    const [breakpoint, setBreakPoint] = useState("");
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();

        if (defaultTheme.breakpoints.values.xs < windowSize.width && windowSize.width < defaultTheme.breakpoints.values.sm) {
            setBreakPoint("xs");
        }
        if (defaultTheme.breakpoints.values.sm < windowSize.width && windowSize.width < defaultTheme.breakpoints.values.md) {
            setBreakPoint("sm");
        }
        if (defaultTheme.breakpoints.values.md < windowSize.width && windowSize.width < defaultTheme.breakpoints.values.lg) {
            setBreakPoint("md");
        }
        if (defaultTheme.breakpoints.values.lg < windowSize.width && windowSize.width < defaultTheme.breakpoints.values.xl) {
            setBreakPoint("lg");
        }
        if (windowSize.width >= defaultTheme.breakpoints.values.xl) {
            setBreakPoint("xl");
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [windowSize.width]);

    return breakpoint;
};

export default useBreakpoint;
