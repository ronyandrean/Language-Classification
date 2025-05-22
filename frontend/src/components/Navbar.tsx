import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface NavbarProps {
  scrollToMain: () => void;
  scrollToLanguages: () => void;
  scrollToHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  scrollToMain,
  scrollToLanguages,
  scrollToHome,
}) => {


  return (
    <>
      <nav className=" flex justify-between fixed top-0 left-0 w-full bg-white shadow px-10 py-5 mx-auto">
        <div className="flex items-center justify-between">
          <img
            src="./img/Logo.png"
            alt="Logo"
            className="w-10 h-10 mr-4 scale-120"
          />
          <span className="text-2xl font-bold text-gray-800">
            Language Classifier
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-blue-500 !rounded-button whitespace-nowrap cursor-pointer"
            onClick={scrollToHome}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-house-fill mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
            </svg>
            Home
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-blue-500 !rounded-button whitespace-nowrap cursor-pointer"
            onClick={scrollToLanguages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-translate mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
            </svg>
            Languages
            <Badge className="ml-2 bg-blue-100 text-blue-700">21</Badge>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-blue-500 !rounded-button whitespace-nowrap cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-book mr-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                </svg>
                Guide
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl mb-6">How to use the Language Classifier</DialogTitle>
                <DialogDescription className="text-lg mb-2">
                  1. <strong>Write or paste a text:</strong> Type directly or paste any sentence into the input box.<br /> <br />
                  2. <strong>Click the “Classify” button:</strong> Then we will process the input using AI.<br /><br />
                  3. <strong>View the detected language:</strong> You'll see the predicted language and the confidence score.<br />
                  <br />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 !rounded-button whitespace-nowrap cursor-pointer ml-2"
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
            Try Now
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
