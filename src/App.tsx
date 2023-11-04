import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Find from "./pages/Find/Find.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="find" element={<Find/>}/>
                <Route path="*" element="404"/>
            </Routes>
        </QueryClientProvider>
    )
}

export default App
