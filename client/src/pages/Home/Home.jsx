import React from 'react'
import { Button } from '@/components/ui/button'
import AssetTable from './AssetTable';

function Home() {
    const [category, setCategory] = React.useState("all");

    const handleCategory = (value) => {
        setCategory(value);
    };

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
            <AssetTable/>
          </div>
        </div>
      </div>
      
    );
}

export default Home;
