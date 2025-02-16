import React from "react";
import { Button } from "@/components/ui/button";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { DotIcon, MessageCircle , Send} from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";

function Home() {
  const [category, setCategory] = React.useState("all");
  const [inputValue, setInputValue]= React.useState("");
  const [isBotRealease, setIsBotRealease]=React.useState(false);


  const handleBotRealease=()=>setIsBotRealease(!isBotRealease);

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleChange=(e)=>{
    setInputValue(e.target.value);
  }

  const handleKeyPress=(event)=>{
    if(event.key=="Enter"){
      console.log(inputValue);
      setInputValue("");

    }
  }

  return (
    <div className="relative mt-20">
      <div className="lg:flex">
        <div className="lg:w-1/2 lg:border-r">
          <div className="p-3 flex items-center gap-4 w-full sticky top-0 z-10">
            <Button
              onClick={() => handleCategory("all")}
              variant={category === "all" ? "default" : "outline"}
              className="rounded-full"
            >
              All
            </Button>

            <Button
              onClick={() => handleCategory("top50")}
              variant={category === "top50" ? "default" : "outline"}
              className="rounded-full"
            >
              Top 50
            </Button>

            <Button
              onClick={() => handleCategory("topGainers")}
              variant={category === "topGainers" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Gainers
            </Button>

            <Button
              onClick={() => handleCategory("topLosers")}
              variant={category === "topLosers" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Losers
            </Button>
          </div>
          <AssetTable />
        </div>

        <div className="hidden lg:block lg:w-[50%] p-5">
          <StockChart />

          <div className="flex gap-5 items-center">
            <div>
              <Avatar>
                <AvatarImage
                  src={
                    "https://assets.coingecko.com/coins/images/279/small/ethereum.png"
                  }
                />
              </Avatar>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p>ETH</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">Ethereum</p>
              </div>

              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">4759</p>
                <p className="text-red-600">
                  <span>-3255995.37332</span>
                  <span>(-0.24599%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

  <section className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 w-[20rem] md:w-[25rem]">
   { isBotRealease && <div className="flex flex-col rounded-md h-[70vh] bg-slate-900 w-full">
    
    {/* Header */}
    <div className="flex justify-between items-center p-4 border-b border-slate-800">
      <p className="text-white font-medium">Chat Bot</p>
      <Button 
      onClick={handleBotRealease}
      variant="ghost" size="icon">
        <Cross1Icon className="h-4 w-4" />
      </Button>
    </div>

    {/* Chat Content */}
    <div className="flex-1 flex flex-col overflow-y-auto p-5 space-y-4">
      
      {/* Bot Message (Left) */}
      <div className="self-start px-5 py-3 rounded-lg bg-slate-800 max-w-[80%]">
        <p className="text-white">Hi, Swapnil Dhamal</p>
        <p className="text-slate-300">You can ask any crypto-related question.</p>
        <p className="text-slate-300">Like price, market cap, etc.</p>
      </div>

      {/* User Prompt (Right) */}
      <div className="self-end px-5 py-3 rounded-lg bg-blue-600 text-white max-w-[80%]">
        <p>Prompt: How are you?</p>
      </div>

      {/* Bot Response (Left) */}
      <div className="self-start px-5 py-3 rounded-lg bg-slate-800 max-w-[80%]">
        <p className="text-slate-300">Ans: I am fine!</p>
      </div>

    </div>


    <div className="p-4 border-t border-slate-800">
  <div className="flex items-center bg-slate-900 rounded-md border border-none">
    <input 
      className="w-full h-10 px-4 bg-transparent text-white outline-none" 
      placeholder="Chat with AI"
      onChange={handleChange}
      value={inputValue}
      onKeyDown={handleKeyPress} 
    />
    <Button 
      variant="ghost"
      size="icon"
      onClick={() => {
        console.log(inputValue);
        setInputValue("");
      }}
    >
<Send className="h-5 w-5 text-white" style={{ transform: "rotate(45deg)" }} />
</Button>
  </div>
</div>


  </div>}

  {/* Chat Toggle Button */}
  <Button 
  onClick={handleBotRealease}
  className="w-50% h-10 gap-2 items-center">
    <MessageCircle
      size={30}
      className="fill-slate-800 -rotate-90 stroke-none group-hover:fill-slate-900"
    />
    <span className="text-xl">Chat</span>
  </Button>
</section>

    </div>
  );
}

export default Home;
