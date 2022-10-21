import { useState, useEffect } from "react";

// components
import Page from "../components/general/Page";

const { fetchReadme } = require("@varandas/fetch-readme");

// ----------------------------------------------------------------------

export default function About() {
    const [page, setPage] = useState("eta");

    useEffect(() => {
        fetchReadme({
            username: "leviEyal",
            repository: "Big-Data-Project"
        }).then((readme) => setPage(readme));
    }, []);

    return (
        <Page title="אודות הפרויקט | CallCenter">
            <section>
                <article dangerouslySetInnerHTML={{ __html: page }} />
            </section>
        </Page>
    );
}
