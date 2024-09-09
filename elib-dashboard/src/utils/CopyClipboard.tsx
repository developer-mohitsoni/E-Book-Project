const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Book link copied to clipboard!");
    },
    () => {
      alert("Failed to copy the link.");
    }
  );
};

export default copyToClipboard;
