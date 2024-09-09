import { Download } from "lucide-react";

const DownloadButton = ({ fileLink }: { fileLink: string }) => {
  const handleDownload = () => {
    window.open(fileLink, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="text-white bg-blue-500 px-4 py-2 rounded-md"
    >
      <div className="flex gap-3">
        <span>Download</span>
        <Download />
      </div>
    </button>
  );
};

export default DownloadButton;
