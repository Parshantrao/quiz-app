import QuizSetting from "@/components/quiz-setting";
import Image from "next/image";

export default function Home() {


  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600`}
    >
      <div className="bg-white rounded-md p-6 min-w-[600px] w-full md:w-4/5 lg:w-2/3">
        <div className="bordered border-b border-gray-600">
          <h1 className="text-center font-semibold text-4xl tracking-wide pb-3 text-blue-400">
            LETS TAKE A QUIZ
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-3">
          <div>
            <Image
              src={"/quiz.jpg"}
              width={400}
              height={400}
              alt="take a quiz"
              priority
              className="object-cover object-center"
            />
          </div>
          <QuizSetting />
        </div>
      </div>
    </div>
  );
}
