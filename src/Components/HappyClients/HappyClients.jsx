import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import image from '../../assets/client.png';
const reviews = [
  {
    name: "Sophia Miller",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Adopting from Paws & Tails was the best decision! My new furry friend has brought so much joy into my life. Highly recommended!"
  },
  {
    name: "James Anderson",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "The process was smooth, and the staff was so helpful. Now I have a loving companion who completes my family!"
  },
  {
    name: "Emily Carter",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "I never knew how much love a rescue pet could bring until I adopted Max. Thank you for making this possible!"
  }
];

function HappyClients() {
  return (
    <div className="w-full py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-emerald-600 mb-6">Happy Clients</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // Slide every 3 seconds
          disableOnInteraction: false, // Continue autoplay even after user interacts
        }}
        modules={[Pagination, Autoplay]}
        className="w-full max-w-3xl mx-auto"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="p-6 bg-white rounded-lg shadow-md">
            <img src={review.image} alt={review.name} className="w-20 h-20 mx-auto rounded-full mb-4" />
            <h3 className="text-lg font-semibold text-[var(--secondary-color)]">{review.name}</h3>
            <p className="mt-2 text-gray-900">"{review.text}"</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HappyClients;
