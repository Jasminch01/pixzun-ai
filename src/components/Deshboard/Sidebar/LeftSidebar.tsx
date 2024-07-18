import { Spiner, Spiner2 } from "@/components/loadingComponent";
import { FaWandMagicSparkles } from "react-icons/fa6";
interface LeftSidebarProps {
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loadingResult: boolean;
  inputPrompt: string;
  imageUploaded: boolean;
  countWords: (text: string) => number;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  handleInputChange,
  handleSubmit,
  loadingResult,
  inputPrompt,
  imageUploaded,
  countWords,
}) => {
  return (
    <div>
      <div
        id="left-sidebar"
        className="fixed top-40 left-0 overflow-y-auto custom-scrollbar w-80 border-2 border-l-0 rounded border-gray-400 px-5 pb-5"
      >
        <div className="flex justify-center mt-10">
          <div className="w-[35rem]">
            <textarea
              onChange={handleInputChange}
              rows={4}
              className="rounded-md w-full bg-transparent p-3 border-2 border-primary border-opacity-80 outline-none focus:border-primary focus:shadow-primary-blur text-white placeholder-gray-500"
              placeholder="Type whatever you want to do with AI"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <div className="w-[35rem]">
            <div className="flex gap-5">
              <button
                onClick={handleSubmit}
                disabled={
                  !imageUploaded || !inputPrompt || countWords(inputPrompt) < 5
                }
                className={`text-white w-full gap-2 bg-button-gradient p-3 rounded-full ${
                  (!imageUploaded ||
                    !inputPrompt ||
                    countWords(inputPrompt) < 5) &&
                  "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="text-center flex justify-center items-center gap-3">
                  {loadingResult ? <Spiner2 /> : <p className="flex justify-center items-center gap-3"><FaWandMagicSparkles /> Generate </p>}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
