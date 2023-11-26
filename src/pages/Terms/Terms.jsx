import UseFetch from "../../hooks/useFetch";
const Terms = () => {
  const { data } = UseFetch(`terms`);

  return (
    <div className=" mt-5 px-24">
      <h3 className="text-[32px] font-bold whitespace-normal text-center">
        Terms & Conditions Policy
      </h3>
      <div className="my-10">
        {data.map((item, i) => (
          <div dangerouslySetInnerHTML={{ __html: item.desc }} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Terms;
