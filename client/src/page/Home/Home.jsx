import React from 'react'
import { Button } from '@/components/ui/button'

function Home() {
    const [category, setCategory] = React.useState("all");

    const handleCategory = (value) => {
        setCategory(value);
    };

    return (
        <div className="relative mt-8">
            <div className="lg:flex">
                <div className="lg:w-1/2 lg:border-r">
                    <div className="p-3 flex items-center gap-4 absolute left-0 w-full">
                        {["all", "top50", "topGainers", "topLosers"].map((item) => (
                            <Button
                                key={item}
                                onClick={() => handleCategory(item)}
                                variant={category === item ? "default" : "outline"}
                                className="rounded-full"
                            >
                                {item === "all" ? "All" : item.replace(/([A-Z])/g, " $1")}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
