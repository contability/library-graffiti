import ReactFullpage from "@fullpage/react-fullpage";
import DefaultFullPageSection1 from "./section1";
import DefaultFullPageSection2 from "./section2";
import DefaultFullPageSection3 from "./section3";

const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const CustomWrapperFullPage = () => {
  return (
    <ReactFullpage
      debug
      credits={{}}
      pluginWrapper={() => {}}
      navigation
      anchors={["firstPage", "secondPage", "thirdPage"]}
      licenseKey="YOUR_KEY_HERE"
      scrollingSpeed={1000}
      sectionSelector={SECTION_SEL}
      onLeave={() => {
        console.log("leave!");
      }}
      sectionsColor={[
        "#ff5f45",
        "#0798ec",
        "#fc6c7c",
        "#435b71",
        "orange",
        "blue",
        "purple",
        "yellow",
      ]}
      render={({ state, fullpageApi }) => {
        console.log(state);

        return (
          // ReactFullpage.Wrapper 컴포넌트 사용하지 않고 일반 html 태그로 감싼 후 사용
          <div>
            <DefaultFullPageSection1
              className="custom-section"
              onClick={() => fullpageApi.moveSectionDown()}
            />
            <DefaultFullPageSection2
              className="custom-section"
              onClick={() => fullpageApi.moveSectionDown()}
            />
            <DefaultFullPageSection3
              className="custom-section"
              // 최상단 섹션으로 이동
              onClick={() => fullpageApi.moveTo(1)}
            />
          </div>
        );
      }}
    />
  );
};

export default CustomWrapperFullPage;
