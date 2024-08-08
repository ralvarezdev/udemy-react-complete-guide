import {useState} from "react"
import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcept/CoreConcept";
import TabButton from "./components/Example/TabButton/TabButton";
import {CORE_CONCEPTS, EXAMPLES} from "./data.js";

function App() {
    const [tabContentActive, setTabContentActive]=useState()
    let tabContent;

    if (tabContentActive===undefined)
        tabContent=(<p>Please select a topic.</p>)
    else
        tabContent= (
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
        <div>
            <Header/>
            <main>
                <section id="core-concepts">
                    <h2>Core Concepts</h2>
                    <ul>
                        {CORE_CONCEPTS.map(
                            (coreConcept, index) => <CoreConcept key={index} {...coreConcept}/>
                        )
                        }
                    </ul>
                </section>

                <section id="examples">
                    <h2>Examples</h2>
                    <menu>
                        {Object.keys(EXAMPLES).map(
                            tabContent=>
                                <TabButton
                                    key={EXAMPLES[tabContent].title}
                                    onClick={()=>tabButtonOnClick(tabContent)}
                                    isActive={tabContent===tabContentActive}>
                                    {EXAMPLES[tabContent].title}
                                </TabButton>
                        )}
                    </menu>
                    {tabContent}
                </section>
            </main>
        </div>
    );
}

export default App;
