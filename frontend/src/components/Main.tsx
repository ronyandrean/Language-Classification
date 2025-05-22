import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { forwardRef, RefObject } from "react";
import axios from "axios";
import FadeContent from "./animation/FadeContent";
import AnimatedContent from "./animation/AnimatedContent";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface MainProps {
  languageRef: RefObject<HTMLDivElement | null>;
}

const Main = forwardRef<HTMLDivElement, MainProps>(({ languageRef }, ref) => {
  const [text, setText] = useState("");
  const [selectedLanguageFamily, setSelectedLanguageFamily] = useState("All");
  const [classify, setClassify] = useState("");
  const [percent, setPercent] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const languages = [
    {
      id: 0,
      name: "Arabic",
      native: "العربية",
      family: "Afro-Asiatic",
      characteristics: [
        "Arabic script",
        "Diglossia",
        "Root-and-pattern morphology",
      ],
    },
    {
      id: 1,
      name: "Chinese",
      native: "中文",
      family: "Sino-Tibetan",
      characteristics: [
        "Logographic script",
        "Tonal language",
        "Classifier system",
      ],
    },
    {
      id: 2,
      name: "Dutch",
      native: "Nederlands",
      family: "Indo-European",
      characteristics: [
        "Latin alphabet",
        "Grammatical gender (common/neuter)",
        "V2 word order in main clauses",
      ],
    },
    {
      id: 3,
      name: "English",
      native: "English",
      family: "Indo-European",
      characteristics: [
        "Latin alphabet",
        "Relatively fixed word order",
        "Analytic language",
      ],
    },
    {
      id: 4,
      name: "Estonian",
      native: "eesti",
      family: "Uralic",
      characteristics: [
        "Latin alphabet",
        "Agglutinative language",
        "No grammatical gender",
      ],
    },
    {
      id: 5,
      name: "French",
      native: "français",
      family: "Indo-European",
      characteristics: [
        "Latin alphabet",
        "Grammatical gender (masculine/feminine)",
        "Verb conjugations",
      ],
    },
    {
      id: 6,
      name: "Hindi",
      native: "हिन्दी",
      family: "Indo-European",
      characteristics: [
        "Devanagari script",
        "Agglutinative features",
        "Postpositions",
      ],
    },
    {
      id: 7,
      name: "Indonesian",
      native: "Bahasa Indonesia",
      family: "Austronesian",
      characteristics: [
        "Latin alphabet",
        "Relatively simple grammar",
        "Reduplication",
      ],
    },
    {
      id: 8,
      name: "Japanese",
      native: "日本語",
      family: "Japonic",
      characteristics: [
        "Three writing systems (kanji, hiragana, katakana)",
        "Agglutinative language",
        "Subject-object-verb word order",
      ],
    },
    {
      id: 9,
      name: "Korean",
      native: "한국어",
      family: "Koreanic",
      characteristics: [
        "Hangul script",
        "Agglutinative language",
        "Subject-object-verb word order",
      ],
    },
    {
      id: 10,
      name: "Latin",
      native: "Latina",
      family: "Indo-European",
      characteristics: [
        "Latin alphabet",
        "Highly inflected language",
        "Grammatical cases",
      ],
    },
    {
      id: 11,
      name: "Persian",
      native: "فارسی",
      family: "Indo-European",
      characteristics: [
        "Perso-Arabic script",
        "Analytic tendencies",
        "Postpositions",
      ],
    },
    {
      id: 12,
      name: "Portuguese",
      native: "Português",
      family: "Indo-European",
      characteristics: [
        "Latin alphabet",
        "Verb conjugations",
        "Grammatical gender (masculine/feminine)",
      ],
    },
    {
      id: 13,
      name: "Pashto",
      native: "پښتو",
      family: "Indo-European",
      characteristics: [
        "Perso-Arabic script",
        "Agglutinative features",
        "Complex verb system",
      ],
    },
    {
      id: 14,
      name: "Romanian",
      native: "română",
      family: "Indo-European",
      characteristics: [
        "Latin alphabet",
        "Grammatical gender (masculine/feminine/neuter)",
        "Verb conjugations",
      ],
    },
    {
      id: 15,
      name: "Russian",
      native: "русский язык",
      family: "Indo-European",
      characteristics: [
        "Cyrillic script",
        "Highly inflected language",
        "Grammatical gender (masculine/feminine/neuter)",
      ],
    },
    {
      id: 16,
      name: "Spanish",
      native: "Español",
      family: "Indo-European",
      characteristics: [
        "Latin alphabet",
        "Grammatical gender (masculine/feminine)",
        "Verb conjugations",
      ],
    },
    {
      id: 17,
      name: "Swedish",
      native: "svenska",
      family: "Indo-European",
      characteristics: [
        "Latin alphabet",
        "Grammatical gender (common/neuter)",
        "V2 word order",
      ],
    },
    {
      id: 18,
      name: "Tamil",
      native: "தமிழ்",
      family: "Dravidian",
      characteristics: [
        "Tamil script",
        "Agglutinative language",
        "Complex honorifics",
      ],
    },
    {
      id: 19,
      name: "Thai",
      native: "ไทย",
      family: "Kra-Dai",
      characteristics: [
        "Thai script",
        "Tonal system",
        "No spaces between words",
      ],
    },
    {
      id: 20,
      name: "Turkish",
      native: "Türkçe",
      family: "Turkic",
      characteristics: [
        "Latin alphabet",
        "Agglutinative language",
        "Vowel harmony",
      ],
    },
    {
      id: 21,
      name: "Urdu",
      native: "اردو",
      family: "Indo-European",
      characteristics: [
        "Perso-Arabic script",
        "Agglutinative features",
        "Postpositions",
      ],
    },
  ];

  const languageFamilies = [
    "All",
    ...Array.from(new Set(languages.map((lang) => lang.family))),
  ];

  const getLanguageColor = (family: string) => {
    const colorMap: Record<string, string> = {
      "Indo-European": "bg-blue-100 border-blue-300",
      "Sino-Tibetan": "bg-green-100 border-green-300",
      "Afro-Asiatic": "bg-yellow-100 border-yellow-300",
      Japonic: "bg-purple-100 border-purple-300",
      Koreanic: "bg-pink-100 border-pink-300",
      "Kra-Dai": "bg-orange-100 border-orange-300",
      Uralic: "bg-cyan-100 border-cyan-300",
      Austronesian: "bg-rose-100 border-rose-300",
      Dravidian: "bg-indigo-100 border-indigo-300",
      Turkic: "bg-amber-100 border-amber-300",
    };
    return colorMap[family] || "bg-gray-100 border-gray-300";
  };

  const getLanguageBadgeColor = (family: string) => {
    const colorMap: Record<string, string> = {
      "Indo-European": "bg-blue-500",
      "Sino-Tibetan": "bg-green-500",
      "Afro-Asiatic": "bg-yellow-500",
      Japonic: "bg-purple-500",
      Koreanic: "bg-pink-500",
      "Kra-Dai": "bg-orange-500",
      Uralic: "bg-cyan-500",
      Austronesian: "bg-rose-500",
      Dravidian: "bg-indigo-500",
      Turkic: "bg-amber-500",
    };
    return colorMap[family] || "bg-gray-500";
  };

  const filteredLanguages = languages.filter(
    (lang) =>
      selectedLanguageFamily === "All" || lang.family === selectedLanguageFamily
  );

  const handleSubmit = async () => {
    setLoading(true);
    setClassify("");
    setPercent(null);
    setError("");

    try {
      interface PredictResponse {
        language: string;
        confidence: number;
      }

      const res = await axios.post<PredictResponse>(
        "http://localhost:5000/predict",
        {
          text,
        }
      );

      setClassify(res.data.language);
      setPercent(res.data.confidence);
    } catch (err: any) {
      console.error("Error:", err);
      setError("Error classifying language");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main ref={ref} className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <FadeContent>
            <section className="mb-12">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Language Classification Tool
              </h1>
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Enter Text to Classify
                </h2>
                <div className="space-y-4">
                  <Input
                    type="textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to identify its language..."
                    className="w-full h-32 p-4 rounded-lg border-2 border-blue-200 focus:border-blue-400 focus:outline-none resize-none"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 !rounded-button whitespace-nowrap cursor-pointer"
                        disabled={loading}
                      >
                        {loading ? (
                          "Loading..."
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-search mr-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                            Classify Language
                          </>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px]">
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl mb-6">
                          Classification Result
                        </DialogTitle>
                        <DialogDescription className="text-lg mb-2">
                          <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Language:</span>{" "}
                            {classify}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Confidence:</span>{" "}
                            {(percent! * 100).toFixed(2)}%
                          </p>
                          {error && (
                            <p className="text-red-600 font-medium mt-2">
                              {error}
                            </p>
                          )}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>
          </FadeContent>


          {/* Language List */}

          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1}
            threshold={0.1}
          >
            <section ref={languageRef} className="mb-8">
              <div className="flex flex-col justify-between items-center mb-6">
                <div className="flex mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Language Database
                  </h2>
                </div>

                <div className="flex items-center">
                  <Tabs
                    defaultValue="All"
                    value={selectedLanguageFamily}
                    onValueChange={setSelectedLanguageFamily}
                  >
                    <TabsList className="bg-blue-100 p-1 rounded-full">
                      {languageFamilies.map((family) => (
                        <TabsTrigger
                          key={family}
                          value={family}
                          className="rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-1 whitespace-nowrap cursor-pointer"
                        >
                          {family}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredLanguages.map((language) => (
                  <Card
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${getLanguageColor(
                      language.family
                    )}`}
                  >
                    <CardContent className="p-6 text-start">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {language.name}
                          </h3>
                          <p className="text-gray-600">{language.native}</p>
                        </div>
                        <Badge
                          className={`${getLanguageBadgeColor(
                            language.family
                          )}`}
                        >
                          {language.family}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700">
                          Key Characteristics:
                        </h4>
                        <ul className="list-disc pl-5 text-gray-600 text-sm">
                          {language.characteristics.map((char, index) => (
                            <li key={index}>{char}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </AnimatedContent>
        </div>
      </main>
    </>
  );
});

export default Main;
