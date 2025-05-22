import "./css/Intro.css";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { forwardRef } from "react";
import BlurText from "./animation/BlurText";
import FadeContent from "./animation/FadeContent";

interface IntroProps {
  scrollToMain: () => void;
}

const Intro = forwardRef<HTMLDivElement, IntroProps>(
  ({ scrollToMain }, homeRef) => {
    return (
      <>
        <section
          ref={homeRef}
          className="relative top-20 mb-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/40"></div>
          <div className="relative py-72 px-20">
            <div className="max-w-2xl">
              <BlurText
                text="Discover the Language Behind Every Text"
                delay={150}
                animateBy="words"
                direction="top"
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              />
              <FadeContent
                blur={true}
                duration={1000}
                easing="ease-out"
                initialOpacity={0}
              >
                <p className="text-xl text-blue-50 mb-8">
                  Our advanced language classification system can identify 22
                  different languages with high accuracy. Simply input your text
                  and let our tool do the magic.
                </p>
                <div className="flex gap-4">
                  <Button
                    className="bg-white text-blue-900 hover:bg-blue-50 !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={scrollToMain}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                    Try It Now
                  </Button>
                </div>
              </FadeContent>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2 px-15 py-6 scale-130">
            {["Arabic", "Chinese", "English", "Spanish", "Japanese"].map(
              (lang) => (
                <Badge key={lang} className="bg-white/20 text-white">
                  {lang}
                </Badge>
              )
            )}
            <Badge className="bg-white/20 text-white">+17 more</Badge>
          </div>
        </section>
      </>
    );
  }
);

export default Intro;
