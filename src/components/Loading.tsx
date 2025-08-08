import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <PropagateLoader
        color="#ff4e08"
        cssOverride={{}}
        loading
        size={20}
        speedMultiplier={2}
      />
    </div>
  );
};

export default Loading;
