import {EXAMPLES} from "../../data";
import TabButton from "./TabButton/TabButton";
import {useState} from "react";
import Section from "../Section/Section";
import Tabs from "../Tabs/Tabs";

export default function Examples() {
    const [tabContentActive, setTabContentActive] = useState()
    let tabContent;

    if (tabContentActive === undefined)
        tabContent = (<p>Please select a topic.</p>)
    else
        tabContent = (
            <div id="tab-content">
                <h3>{EXAMPLES[tabContentActive].title}</h3>
                <p>{EXAMPLES[tabContentActive].description}</p>
                <pre>
                    <code>
                        {EXAMPLES[tabContentActive].code}
                    </code>
                </pre>
            </div>
        )

    const tabButtonOnClick = tabContent => {
        setTabContentActive(tabContent)
    }

    return (
        <Section id="examples" title="Examples">
            <Tabs
                buttons={
                <>
                    {Object.keys(EXAMPLES).map(
                        tabContent =>
                            <TabButton
                                key={EXAMPLES[tabContent].title}
                                onClick={() => tabButtonOnClick(tabContent)}
                                isActive={tabContent === tabContentActive}>
                                {EXAMPLES[tabContent].title}
                            </TabButton>
                    )}
                </>}>
                {tabContent}
            </Tabs>
        </Section>
    )
}