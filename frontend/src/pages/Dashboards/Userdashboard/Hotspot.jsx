import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hotspot = () => {
  const [images, setImages] = useState();
  const [location, setLocation] = useState({
    longitude: "",
    latitude: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      console.log(loc);
    });
  }, []);

  return (
    <div className="flex flex-col items-center p-5">
      <div className="text-3xl font-bold text-slate-900 mb-3 bg-red-800 ">
        Add Hotspot
      </div>
      <div>
        <Carousel>
          <CarouselContent>
            {
                images?.map((image,ind)=>(
                    <CarouselItem  key={ind} >
                        <img src={image} alt="item"/>
                    </CarouselItem>
                ))
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <label
          htmlFor="images"
          className="bg-slate-700 text-white rounded-lg  p-3"
        >
          uplaod images
        </label>
        <Input type="file" id="images" className="hidden" multiple onChange={e=>setImages(e.target.files)} />
      </div>
    </div>
  );
};

export default Hotspot;
