import { useState, useEffect } from "react";
import { ETFComparison } from "./ETFComparison";

interface StreamingResponseProps {
  onComplete?: () => void;
  onStart?: () => void;
}

const fullText = {
  intro:
    " Basierend auf der Analyse der beiden ETFs möchte ich Ihnen folgende Einschätzung geben:",
  etfA: " ETF A (Alpha Global) bietet eine höhere Rendite von 5,2% und investiert weltweit in dynamische Wachstumsbranchen. Die mittlere Risikoklasse ermöglicht attraktive Ertragschancen.",
  etfB: " ETF B (Beta Nachhaltig) fokussiert sich auf nachhaltige europäische Investments mit niedriger Risikoklasse und geringeren Kosten. Die Rendite ist mit 3,1% moderater, dafür aber stabiler.",
  recommendation:
    " Für eine höhere und bessere Diversifikation sollte man 40% in A und 60% in B investieren.",
  conclusion:
    " Diese Aufteilung kombiniert das Wachstumspotenzial von ETF A mit der Stabilität und Nachhaltigkeit von ETF B, während gleichzeitig das Risiko optimal verteilt wird.",
};

export function StreamingResponse({
  onComplete,
  onStart,
}: StreamingResponseProps) {
  const [showTable, setShowTable] = useState(false);
  const [displayedIntro, setDisplayedIntro] = useState("");
  const [displayedEtfA, setDisplayedEtfA] = useState("");
  const [displayedEtfB, setDisplayedEtfB] = useState("");
  const [showRecommendation, setShowRecommendation] =
    useState(false);
  const [displayedRecommendation, setDisplayedRecommendation] =
    useState("");
  const [displayedConclusion, setDisplayedConclusion] =
    useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Call onStart immediately to hide thinking indicator
    if (onStart) {
      onStart();
    }

    // Step 1: Show table immediately
    setShowTable(true);

    // Step 2: Stream intro text
    const introWords = fullText.intro.split(" ");
    let introIndex = 0;

    const streamIntro = () => {
      if (introIndex < introWords.length - 1) {
        setDisplayedIntro(
          (prev) =>
            prev + (prev ? " " : "") + introWords[introIndex],
        );
        introIndex++;
        timeoutId = setTimeout(streamIntro, 50);
      } else {
        // Step 3: Stream ETF A text
        const etfAWords = fullText.etfA.split(" ");
        let etfAIndex = 0;

        const streamEtfA = () => {
          if (etfAIndex < etfAWords.length - 1) {
            setDisplayedEtfA(
              (prev) =>
                prev + (prev ? " " : "") + etfAWords[etfAIndex],
            );
            etfAIndex++;
            timeoutId = setTimeout(streamEtfA, 50);
          } else {
            // Step 4: Stream ETF B text
            const etfBWords = fullText.etfB.split(" ");
            let etfBIndex = 0;

            const streamEtfB = () => {
              if (etfBIndex < etfBWords.length - 1) {
                setDisplayedEtfB(
                  (prev) =>
                    prev +
                    (prev ? " " : "") +
                    etfBWords[etfBIndex],
                );
                etfBIndex++;
                timeoutId = setTimeout(streamEtfB, 50);
              } else {
                // Step 5: Show recommendation box
                setShowRecommendation(true);

                // Step 6: Stream recommendation text
                const recWords =
                  fullText.recommendation.split(" ");
                let recIndex = 0;

                const streamRec = () => {
                  if (recIndex < recWords.length - 1) {
                    setDisplayedRecommendation(
                      (prev) =>
                        prev +
                        (prev ? " " : "") +
                        recWords[recIndex],
                    );
                    recIndex++;
                    timeoutId = setTimeout(streamRec, 50);
                  } else {
                    // Step 7: Stream conclusion text
                    const conclusionWords =
                      fullText.conclusion.split(" ");
                    let conclusionIndex = 0;

                    const streamConclusion = () => {
                      if (
                        conclusionIndex <
                        conclusionWords.length - 1
                      ) {
                        setDisplayedConclusion(
                          (prev) =>
                            prev +
                            (prev ? " " : "") +
                            conclusionWords[conclusionIndex],
                        );
                        conclusionIndex++;
                        timeoutId = setTimeout(
                          streamConclusion,
                          50,
                        );
                      } else {
                        // All done - call onComplete
                        if (onComplete) {
                          onComplete();
                        }
                      }
                    };

                    streamConclusion();
                  }
                };

                streamRec();
              }
            };

            streamEtfB();
          }
        };

        streamEtfA();
      }
    };

    timeoutId = setTimeout(streamIntro, 300);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onComplete, onStart]);

  return (
    <div className="space-y-3">
      {showTable && <ETFComparison />}

      <div className="text-sm leading-relaxed">
        {displayedIntro && (
          <p className="mb-3">{displayedIntro}</p>
        )}

        {displayedEtfA && (
          <p className="mb-3">
            <strong>ETF A (Alpha Global)</strong>{" "}
            {displayedEtfA.replace("ETF A (Alpha Global) ", "")}
          </p>
        )}

        {displayedEtfB && (
          <p className="mb-3">
            <strong>ETF B (Beta Nachhaltig)</strong>{" "}
            {displayedEtfB.replace(
              "ETF B (Beta Nachhaltig) ",
              "",
            )}
          </p>
        )}

        {showRecommendation && (
          <div className="bg-violet-50 border-l-4 border-violet-500 p-3 rounded mt-3">
            <p className="font-semibold text-violet-900 mb-2">
              💡 Meine Empfehlung:
            </p>
            {displayedRecommendation && (
              <p className="text-violet-800">
                {(() => {
                  const parts =
                    displayedRecommendation.split("40%");
                  const beforeForty = parts[0] || "";
                  const afterForty = parts[1] || "";
                  const afterFortyParts =
                    afterForty.split("60%");
                  const betweenFortyAndSixty =
                    afterFortyParts[0] || "";
                  const afterSixty = afterFortyParts[1] || "";

                  return (
                    <>
                      {beforeForty}
                      {displayedRecommendation.includes(
                        "40%",
                      ) && <strong>40% in A</strong>}
                      {betweenFortyAndSixty}
                      {displayedRecommendation.includes(
                        "60%",
                      ) && <strong>60% in B</strong>}
                      {afterSixty}
                    </>
                  );
                })()}
              </p>
            )}
          </div>
        )}

        {displayedConclusion && (
          <p className="mb-6 text-gray-600 mt-3">
            {displayedConclusion}
          </p>
        )}
      </div>
    </div>
  );
}