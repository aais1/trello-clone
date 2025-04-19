import SignInButton from "@/components/SignInButton";

export default function Home() {
  return (
    <div className="flex flex-col justify-center w-full items-center bg-gray-100">
      {/* Header */}
      <header className="bg-[#ffffff] p-4 w-full shadow-xl">
        <div className="flex items-center justify-between w-full md:w-[90vw] mx-auto text-white">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Trello Logo" className="w-[75%] h-auto" />
          </div>
          <div className="space-x-4">
            <SignInButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:px-0 px-2  items-center justify-start md:mt-0 mt-8 h-[calc(100vh-96px)]  text-left w-full md:w-[90vw]">
        <div className="">
          <h1 className="text-3xl md:text-5xl font-bold text-[#2d2d2d]">
            Trello helps teams move work forward.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#2d2d2d] max-w-2xl ">
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique -
            accomplish it all with Trello.
          </p>
        </div>
        <div>
          <img
            src="/home-illustration.svg"
            alt="Trello Illustration"
            className="mt-8 w-full  h-auto"
          />
        </div>
      </div>
    </div>
  );
}
