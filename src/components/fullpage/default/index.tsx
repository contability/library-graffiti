import ReactFullpage from "@fullpage/react-fullpage";

const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const DefaultFullPage = () => {
  return (
    // fullPage 라이브러리에서 제공하는 컨테이너 컴포넌트
    <ReactFullpage
      // 디버깅 모드
      debug
      //
      credits={{}}
      //
      pluginWrapper={() => {}}
      // 네비게이션 버튼
      navigation
      // 각 페이지별로 #firstPage, #secondPage, ... 이런식으로 이름 지정 됨
      anchors={["firstPage", "secondPage", "thirdPage"]}
      // 라이센스 키
      licenseKey="YOUR_KEY_HERE"
      // 섹션 넘어가는데 걸리는 시간
      scrollingSpeed={1000}
      // section 지정 selector
      sectionSelector={SECTION_SEL}
      // 섹션 빠져 나갈 때 실행되는 함수
      onLeave={() => {
        console.log("leave!");
      }}
      // 섹션 별 백그라운드 색상
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
          // fullPage 라이브러리에서 제공하는 섹션 감싸는 랩퍼 컴포넌트
          <ReactFullpage.Wrapper>
            {/* section1 */}
            <section className="custom-section">
              <div className="slide">
                <h3
                  style={{
                    fontSize: "5rem",
                    textAlign: "center",
                    color: "#FFFFFF",
                    fontWeight: "700",
                  }}
                >
                  Section1-1
                </h3>
                <button
                  style={{
                    fontSize: "5rem",
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                  onClick={() => fullpageApi.moveSectionDown()}
                >
                  Click me to move down
                </button>
              </div>
              <div className="slide">
                <h3
                  style={{
                    fontSize: "5rem",
                    textAlign: "center",
                    color: "#FFFFFF",
                    fontWeight: "700",
                  }}
                >
                  Section1-2
                </h3>
              </div>
            </section>
            {/* section2 */}
            <section className="custom-section">
              <div className="slide">
                <h3
                  style={{
                    fontSize: "5rem",
                    textAlign: "center",
                    color: "#FFFFFF",
                    fontWeight: "700",
                  }}
                >
                  Section2-1
                </h3>
              </div>
              <div className="slide">
                <h3
                  style={{
                    fontSize: "5rem",
                    textAlign: "center",
                    color: "#FFFFFF",
                    fontWeight: "700",
                  }}
                >
                  Section2-2
                </h3>
              </div>
            </section>
            {/* section3 */}
            <section className="custom-section">
              <div className="slide">
                <h3
                  style={{
                    fontSize: "5rem",
                    textAlign: "center",
                    color: "#FFFFFF",
                    fontWeight: "700",
                  }}
                >
                  Section3-1
                </h3>
              </div>
              <div className="slide">
                <h3
                  style={{
                    fontSize: "5rem",
                    textAlign: "center",
                    color: "#FFFFFF",
                    fontWeight: "700",
                  }}
                >
                  Section3-2
                </h3>
              </div>
            </section>
            {/* {renderElemenet.map((element) => element)} */}
          </ReactFullpage.Wrapper>
          // <div>
          //   <DefaultFullPageSection1 className="custom-section" />
          //   <DefaultFullPageSection2 className="custom-section" />
          // </div>
        );
      }}
    />
  );
};

export default DefaultFullPage;
