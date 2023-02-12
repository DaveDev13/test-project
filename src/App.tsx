import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout/LandingLayout";
import { Home } from "./pages/Home/Home";
import { Users } from "./pages/Users/Users";
import { UserId } from "./pages/UserId/UserId";
import { PostId } from "./pages/PostId/PostId";

// api config
import "./data/settings/axios";

function App() {
    useEffect(() => {
        const appHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty('--vh', `${window.innerHeight}px`);
        };

        window.addEventListener('resize', appHeight);

        appHeight();

        return () => {
            window.removeEventListener('resize', appHeight);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route element={ <LandingLayout /> }>
                <Route index element={<Home />} />
                    <Route path={"users"} element={ <Users /> } />
                    <Route path={"users/:id"} element={ <UserId /> } />
                    <Route path={"posts/:id"} element={ <PostId /> } />
            </Route>
        </Routes>
    );
}

export default App;
