export default function Loader({ fullScreen = false }: { fullScreen?: boolean }) {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-starwars-yellow border-t-transparent rounded-full animate-spin"></div>
      <p className="text-starwars-yellow tracking-widest text-sm uppercase animate-pulse">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="w-full h-48 flex items-center justify-center">
      {loaderContent}
    </div>
  );
}
