type LogoProps = {
  large?: boolean;
  wordClassName?: string;
};

export default function Logo({ large = false, wordClassName = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 font-black ${large ? "flex-col text-xl" : "text-1xl text-[#075f56]"}`}>
    
      <span className={wordClassName}>MonTrip</span>
    </div>
  );
}
