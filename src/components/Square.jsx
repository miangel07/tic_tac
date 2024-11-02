const Square = ({ children, actualizar, index }) => {
  const handlerClick = () => {
   
    actualizar();
  };

  return (
    <>
      <div
        onClick={handlerClick}
        className="flex justify-center text-white items-center py-3 h-16 w-16 bg-slate-400 cursor-pointer"
      >
        {children}
      </div>
    </>
  );
};

export default Square;
