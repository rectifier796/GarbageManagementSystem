// Hotspot.jsx

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
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({
    longitude: "",
    latitude: "",
  });
  const [formData, setFormData] = useState({
    phone: "",
    description: "",
    wasteType: "",
    address: "",
    regionId: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form fields if needed
    setFormData({
      phone: "",
      description: "",
      wasteType: "",
      address: "",
      regionId: "",
    });
  };

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  return (
    <div className="flex flex-col items-center p-5 space-y-6">
      <div className="text-3xl font-bold text-slate-900 bg-red-800 text-center p-3 rounded-lg">
        Add Hotspot
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full max-w-lg">
        <Carousel>
          <CarouselContent>
            {images.length > 0 ? (
              images.map((image, ind) => (
                <CarouselItem key={ind}>
                  <img src={URL.createObjectURL(image)} alt={`Image ${ind}`} className="w-full h-auto rounded-lg" />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <p className="text-sm text-gray-600">No images uploaded yet.</p>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <label
          htmlFor="images"
          className="bg-slate-700 text-white rounded-lg p-3 cursor-pointer text-center w-full block"
        >
          Upload Images
        </label>
        <Input
          type="file"
          id="images"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-lg font-medium text-gray-800">
              Phone
            </label>
            <Input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-lg font-medium text-gray-800">
              Description
            </label>
            <Input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="wasteType" className="text-lg font-medium text-gray-800">
              Waste Type
            </label>
            <select
              id="wasteType"
              name="wasteType"
              value={formData.wasteType}
              onChange={handleInputChange}
              className="input-style"
              required
            >
              <option value="">Select Waste Type</option>
              <option value="Non-hazardous">Non-hazardous</option>
              <option value="Bulky">Bulky</option>
              <option value="Hazardous">Hazardous</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-lg font-medium text-gray-800">
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="regionId" className="text-lg font-medium text-gray-800">
              Region ID
            </label>
            <Input
              type="text"
              id="regionId"
              name="regionId"
              value={formData.regionId}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Hotspot;
