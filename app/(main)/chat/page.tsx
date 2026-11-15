
export default function ChatDashboard() {
  return (
      <div className="flex flex-col h-full bg-white font-sans">
          <div className="flex-1 flex bg-[#F9FAFB] min-h-0 min-w-0">
              <img
                  src="/no-conversation.png"
                  alt="No conversation selected"
                  className="w-full h-full object-contain"
              />
          </div>
      </div>

  );
}