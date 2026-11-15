export default function Badge({ element, color }: any) {
  if (!element || element.length === 0) {
    return (
      <div className={`flex justify-center items-center w-4 h-4 rounded-full  ${color}`}>

        <span className={`text-xs font-bold whitespace-nowrap `}>
        </span>
      </div>
    );
  }

  return (
    <div className={`flex justify-center items-center w-4 h-4 rounded-full  ${color}`}>

      <span className={`text-xs font-bold whitespace-nowrap `}>
        {element}
      </span>
    </div>
  );
}