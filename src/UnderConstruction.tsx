const UnderConstruction = () => {
  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Main Website Title as small label */}
      <div className="absolute top-6 left-0 right-0 flex justify-center">
        <div className="border border-green-400/30 px-3 py-1 rounded-sm bg-black/80">
          <span
            className="text-sm md:text-base text-green-400 tracking-wider animate-blink uppercase"
            style={{ animationDuration: "4s" }}
          >
            disconnect.ro
          </span>
        </div>
      </div>

      {/* Title */}
      <h1
        className="text-2xl md:text-4xl font-bold mb-4"
        data-text="[ SYSTEM STATUS: UNDER CONSTRUCTION ]"
      >
        [ SYSTEM STATUS: UNDER CONSTRUCTION ]
      </h1>

      {/* ASCII Divider */}
      <div className="bg-green-400 h-0.5 w-32 mb-6 animate-pulse" />

      {/* Message */}
      <p className="text-sm md:text-base text-green-300 max-w-md mb-8">
        This area of the system is currently being assembled by our robotic dev
        unit. Come back soon for the finished interface.
      </p>

      {/* Terminal Cursor Messages */}
      <div className="text-green-500 text-xs md:text-sm flex flex-col items-start bg-black/30 p-3 border border-green-400/20 rounded w-full max-w-md font-mono">
        <div className="mb-2">
          <span className="opacity-70">{">"}</span> Initializing components
          <span className="animate-blink" style={{ animationDelay: "0s" }}>.</span>
          <span className="animate-blink" style={{ animationDelay: "0.3s" }}>.</span>
          <span className="animate-blink" style={{ animationDelay: "0.6s" }}>.</span>
        </div>
        <div className="mb-2">
          <span className="opacity-70">{">"}</span> Loading system modules
          <span className="animate-blink" style={{ animationDelay: "0.2s" }}>.</span>
          <span className="animate-blink" style={{ animationDelay: "0.5s" }}>.</span>
          <span className="animate-blink" style={{ animationDelay: "0.8s" }}>.</span>
          <span className="text-green-300 ml-2">OK</span>
        </div>
        <div className="mb-2">
          <span className="opacity-70">{">"}</span> Establishing network connection
          <span className="animate-blink" style={{ animationDelay: "0.1s" }}>.</span>
          <span className="animate-blink" style={{ animationDelay: "0.4s" }}>.</span>
          <span className="animate-blink" style={{ animationDelay: "0.7s" }}>.</span>
        </div>
        <div className="mb-2">
          <span className="opacity-70">{">"}</span> Compiling interface elements
          <span className="animate-blink" style={{ animationDelay: "0s" }}>.</span>
          <span className="animate-blink" style={{ animationDelay: "0.3s" }}>.</span>
          <span className="animate-blink" style={{ animationDelay: "0.6s" }}>.</span>
        </div>
        <div>
          <span className="opacity-70">{">"}</span> <span className="animate-blink">_</span>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
