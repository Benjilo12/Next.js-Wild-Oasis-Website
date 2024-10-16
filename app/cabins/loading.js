import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}

export default loading;
