'use client';

<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { Star, StarHalf, Eye, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


interface ProductImage {
   id: string;
   path: string;
   public_id: string;
}

interface ProductDetail {
   productId: number;
   id: number;
   size: string;
   type: string;
   values: string;
   quantities: number;
   images: ProductImage[];
   isActive: boolean;
}

interface Price {
   id: number;
   base_price: number;
   discount_price: number;
   start_date: string;
   end_date: string;
   product_detail: ProductDetail;
}

interface Product {
   id: number;
   name: string;
   description: string;
   video: string;
   images: ProductImage | ProductImage[];
   details?: ProductDetail[]; // Add the 'details' property as optional
}

interface ProductCardProps {
   title: string;
   description: string;
   price: string;
   discountPrice?: string;
   rating: number;
   imageUrl: string;
   variants?: Array<{
      detailId: number;
      size: string;
      type: string;
      basePrice: string;
      discountPrice?: string;
      inStock: boolean;
   }>;
   onViewDetail?: (productId: number) => void;
   onAddToCart?: (productId: number, detailId?: number) => void;
}

// Update ProductCard component to better handle variants and their prices
const ProductCard = ({
   id,
   title,
   description,
   price,
   discountPrice,
   rating,
   imageUrl,
   variants,
   onViewDetail,
}: ProductCardProps & { id: number }) => {
   const [selectedVariant, setSelectedVariant] = useState(
      variants && variants.length > 0 ? variants[0].detailId : null,
   );
   const [showVariantOptions, setShowVariantOptions] = useState(false);

   // Add this function to use setSelectedVariant
   const handleVariantChange = (variantId: number) => {
      setSelectedVariant(variantId);
      setShowVariantOptions(false);
   };

   const renderVariantOptions = () => {
      if (showVariantOptions && variants) {
         return (
            <div className='mt-1 space-y-1'>
               {variants.map((variant) => (
                  <button
                     key={variant.detailId}
                     className={`text-xs px-2 py-1 border rounded ${selectedVariant === variant.detailId
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300'
                        }`}
                     onClick={() => handleVariantChange(variant.detailId)}
                  >
                     {variant.size} - {variant.type}
                  </button>
               ))}
            </div>
         );
      }
      return null;
   };

   const renderStars = () => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
         stars.push(<Star key={`star-${i}`} className='w-4 h-4 fill-yellow-400 text-yellow-400' />);
      }

      if (hasHalfStar) {
         stars.push(
            <StarHalf key='half-star' className='w-4 h-4 fill-yellow-400 text-yellow-400' />,
         );
      }

      const remainingStars = 5 - Math.ceil(rating);
      for (let i = 0; i < remainingStars; i++) {
         stars.push(<Star key={`empty-star-${i}`} className='w-4 h-4 text-yellow-400' />);
      }

      return stars;
   };

   const formatPrice = (value: string | number) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   };

   // Cập nhật hàm tính giá sau khi áp dụng phần trăm giảm giá
   const calculateDiscountedPrice = (basePrice: string, discountPercent: string) => {
      const basePriceNum = parseFloat(basePrice);
      const discountPercentNum = parseFloat(discountPercent);

      if (isNaN(discountPercentNum) || discountPercentNum <= 0) return basePriceNum;

      // Tính giá sau khi giảm: basePrice * (1 - discount/100)
      const discountedPrice = basePriceNum * (1 - discountPercentNum / 100);
      return discountedPrice;
   };

   // Lấy thông tin giá hiển thị dựa trên product-detail
   const getDisplayPrice = () => {
      // Nếu có variants và đã chọn một variant
      if (variants && variants.length > 0) {
         // Sử dụng variant được chọn nếu có, ngược lại sử dụng variant đầu tiên
         const activeVariant = selectedVariant
            ? variants.find((v) => v.detailId === selectedVariant)
            : variants[0];

         if (activeVariant) {
            const actualDiscountPrice = activeVariant.discountPrice
               ? calculateDiscountedPrice(activeVariant.basePrice, activeVariant.discountPrice)
               : null;

            return {
               basePrice: activeVariant.basePrice,
               discountPrice: actualDiscountPrice,
               discountPercent: activeVariant.discountPrice,
            };
         }
      }

      // Fallback nếu không có variant hoặc không thể tìm thấy variant đã chọn
      const actualDiscountPrice = discountPrice
         ? calculateDiscountedPrice(price, discountPrice)
         : null;

      return {
         basePrice: price,
         discountPrice: actualDiscountPrice,
         discountPercent: discountPrice,
      };
=======
import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const products = [
   {
      id: 1,
      name: 'Nến Thơm Quế',
      description: 'Hương thơm đặc trưng của Quế',
      price: '650,000đ',
      discount: '-5%',
      originalPrice: '685,000đ',
      image: '/images/trending.png',
      isNew: false,
      rating: 4.5,
   },
   {
      id: 2,
      name: 'Nến Thơm Nhiệt Đới',
      description: 'Mùi thơm của mùa hè',
      price: '650,000đ',
      discount: '-10%',
      originalPrice: '722,000đ',
      image: '/images/trending.png',
      isNew: false,
      rating: 4.2,
   },
   {
      id: 3,
      name: 'Nến Thơm Cà Phê',
      description: 'Mùi hương của cà phê',
      price: '650,000đ',
      discount: null,
      originalPrice: null,
      image: '/images/trending.png',
      isNew: false,
      rating: 4.7,
   },
   {
      id: 4,
      name: 'Nến Thơm Thư Giãn',
      description: 'Mùi hương của sự yên bình',
      price: '500,000đ',
      discount: null,
      originalPrice: null,
      image: '/images/trending.png',
      isNew: true,
      rating: 5.0,
   },
   {
      id: 5,
      name: 'Nến Thơm Trà Trắng',
      description: 'Mùi thơm của thiên nhiên',
      price: '200,000đ',
      discount: null,
      originalPrice: null,
      image: '/images/trending.png',
      isNew: true,
      rating: 4.8,
   },
   {
      id: 6,
      name: 'Nến Thơm Hoa Nhài',
      description: 'Hương hoa nhài dịu nhẹ',
      price: '350,000đ',
      discount: '-15%',
      originalPrice: '412,000đ',
      image: '/images/trending.png',
      isNew: false,
      rating: 4.6,
   },
];

export default function GlideSlide() {
   const sliderRef = useRef<HTMLDivElement>(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isHovering, setIsHovering] = useState(false);

   const visibleItems = 4; // Number of items visible at once
   const totalItems = products.length;

   const handleNext = useCallback(() => {
      if (sliderRef.current) {
         const newIndex =
            currentIndex + 1 >= Math.ceil(totalItems - visibleItems + 1) ? 0 : currentIndex + 1;
         setCurrentIndex(newIndex);

         if (newIndex === 0) {
            sliderRef.current.scrollLeft = 0;
         } else {
            const cardWidth = sliderRef.current.querySelector('div')?.clientWidth || 0;
            const gap = 16; // gap-4 = 16px
            sliderRef.current.scrollLeft = newIndex * (cardWidth + gap);
         }
      }
   }, [currentIndex, totalItems, visibleItems]);

   const handlePrev = useCallback(() => {
      if (sliderRef.current) {
         const newIndex = Math.max(currentIndex - 1, 0);
         setCurrentIndex(newIndex);

         const cardWidth = sliderRef.current.querySelector('div')?.clientWidth || 0;
         const gap = 16; // gap-4 = 16px
         sliderRef.current.scrollLeft = newIndex * (cardWidth + gap);
      }
   }, [currentIndex]);

   useEffect(() => {
      if (isHovering) return; // Don't auto-scroll when user is hovering

      const interval = setInterval(() => {
         handleNext();
      }, 4000);
      return () => clearInterval(interval);
   }, [isHovering, handleNext]);

   // Generate star rating UI
   const renderRating = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
         stars.push(
            <svg
               key={`full-${i}`}
               className='w-4 h-4 text-amber-400'
               fill='currentColor'
               viewBox='0 0 20 20'
            >
               <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>,
         );
      }

      if (hasHalfStar) {
         stars.push(
            <svg
               key='half'
               className='w-4 h-4 text-amber-400'
               fill='currentColor'
               viewBox='0 0 20 20'
            >
               <defs>
                  <linearGradient id='halfGradient'>
                     <stop offset='50%' stopColor='currentColor' />
                     <stop offset='50%' stopColor='#D1D5DB' />
                  </linearGradient>
               </defs>
               <path
                  fill='url(#halfGradient)'
                  d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
               ></path>
            </svg>,
         );
      }

      // Add empty stars
      for (let i = stars.length; i < 5; i++) {
         stars.push(
            <svg
               key={`empty-${i}`}
               className='w-4 h-4 text-gray-300'
               fill='currentColor'
               viewBox='0 0 20 20'
            >
               <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>,
         );
      }

      return stars;
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
   };

   // Get the display price values
   const { basePrice, discountPrice: calculatedDiscountPrice, discountPercent } = getDisplayPrice();

   return (
<<<<<<< HEAD
      <div className='rounded-lg bg-white p-3 shadow-lg hover:shadow-md transition-shadow'>
         <div className='relative aspect-square overflow-hidden rounded-lg group'>
            <Image
               src={imageUrl}
               alt={title}
               height={400}
               width={400}
               className='h-full w-full object-cover transition-all duration-300 group-hover:blur-sm'
            />

            {/* Badge giảm giá */}
            {discountPercent && parseInt(discountPercent) > 0 && (
               <div className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium'>
                  -{discountPercent}%
               </div>
            )}

            <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
               <Link href={`/user/products/${id}`}>
                  <button
                     onClick={() => onViewDetail && onViewDetail(id)}
                     className='bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 border border-black'
                  >
                     <Eye className='w-4 h-4' />
                     <span>Xem chi tiết</span>
                  </button>
               </Link>
            </div>
         </div>

         <div className='mt-3'>
            <h3 className='text-sm font-medium text-gray-700 mb-1'>{title}</h3>
            <p className='text-xs text-gray-500 line-clamp-2 mb-1'>{description}</p>
            <div className='flex items-center'>{renderStars()}</div>

            {/* Hiển thị tùy chọn variants */}
            {variants && variants.length > 0 && (
               <div className='mt-2'>
                  {/* Toggle button to show/hide variant options */}
                  <button
                     className='text-xs text-gray-600 hover:text-orange-700 mb-1 flex items-center'
                     onClick={() => setShowVariantOptions(!showVariantOptions)}
                  ></button>
                  {renderVariantOptions()}
               </div>
            )}

            {/* Hiển thị giá */}
            <div className='mt-1.5'>
               {(() => {
                  // Nếu có giảm giá
                  if (
                     discountPercent &&
                     parseInt(discountPercent) > 0 &&
                     calculatedDiscountPrice !== null
                  ) {
                     return (
                        <div className='flex items-center'>
                           <span className='text-red-600 text-sm font-medium'>
                              {formatPrice(calculatedDiscountPrice)}đ
                           </span>
                           <span className='ml-1.5 text-gray-500 text-xs line-through'>
                              {formatPrice(basePrice)}đ
                           </span>
                           <div className='bg-red-600 text-white text-xs px-1.5 py-0.5 rounded ml-1.5'>
                              -{discountPercent}%
                           </div>
                        </div>
                     );
                  }
                  // Không có giảm giá
                  else {
                     return (
                        <span className='text-red-600 text-sm font-medium'>
                           {formatPrice(basePrice)}đ
                        </span>
                     );
                  }
               })()}
            </div>
         </div>
      </div>
   );
};



export default function ProductPage() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [products, setProducts] = useState<
      Array<{
         id: number;
         title: string;
         description: string;
         price: string;
         discountPrice?: string;
         rating: number;
         imageUrl: string;
         variants?: Array<{
            detailId: number;
            size: string;
            type: string;
            basePrice: string;
            discountPrice?: string;
            inStock: boolean;
         }>;
      }>
   >([]);
   const [filteredProducts, setFilteredProducts] = useState<
      Array<{
         id: number;
         title: string;
         description: string;
         price: string;
         discountPrice?: string;
         rating: number;
         imageUrl: string;
         variants?: Array<{
            detailId: number;
            size: string;
            type: string;
            basePrice: string;
            discountPrice?: string;
            inStock: boolean;
         }>;
      }>
   >([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [searchQuery] = useState('');

   // Remove pagination state and add carousel refs and state
   const carouselRef = useRef<HTMLDivElement>(null);
   const [activeSlide, setActiveSlide] = useState(0);
   const slidesToShow = { mobile: 1, tablet: 2, desktop: 4 };

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const productsResponse = await fetch('http://68.183.226.198:3000/api/products');
            if (!productsResponse.ok) {
               throw new Error('Failed to fetch products');
            }
            const productsData: Product[] = await productsResponse.json();

            const normalizedProducts = productsData.map((product) => ({
               ...product,
               images: Array.isArray(product.images) ? product.images : [product.images],
            }));

            try {
               // Lấy dữ liệu giá
               const pricesResponse = await fetch('http://68.183.226.198:3000/api/v1/prices', {
                  headers: {
                     Authorization: 'Bearer ' + localStorage.getItem('token'),
                  },
               });
               if (!pricesResponse.ok) {
                  // Xử lý khi không lấy được giá
                  return;
               }

               const pricesData: Price[] = await pricesResponse.json();
               console.log('Tổng số giá được tìm thấy:', pricesData.length);

               // Lấy thông tin chi tiết sản phẩm (product details) trực tiếp để biết chúng thuộc về sản phẩm nào
               // Nếu API không có sẵn, chúng ta sẽ thử phương pháp khác
               const productDetailMapping: { [key: number]: number } = {};

               // Phương pháp 1: Lấy mapping từ product.details nếu có
               normalizedProducts.forEach((product) => {
                  if (product.details && product.details.length > 0) {
                     product.details.forEach((detail) => {
                        productDetailMapping[detail.id] = product.id;
                     });
                  }
               });

               console.log('Mapped product details:', Object.keys(productDetailMapping).length);

               // Tạo danh sách sản phẩm hiển thị
               const mappedProducts = normalizedProducts.map((product) => {
                  console.log(`Mapping product ${product.id}: ${product.name}`);

                  const imageUrl =
                     product.images && product.images.length > 0 ? product.images[0].path : null;

                  // Tìm tất cả các giá liên quan đến sản phẩm này thông qua product details
                  const relatedPrices = [];

                  // Cách 1: Nếu sản phẩm có danh sách details
                  if (product.details && product.details.length > 0) {
                     const detailIds = product.details.map((detail) => detail.id);

                     // Tìm giá cho từng chi tiết sản phẩm
                     detailIds.forEach((detailId) => {
                        const matchingPrices = pricesData.filter(
                           (price) => price.product_detail && price.product_detail.id === detailId,
                        );
                        relatedPrices.push(...matchingPrices);
                     });
                  }
                  // Cách 2: Nếu không có details, thử nhiều cách khác để tìm liên kết
                  else {
                     // Tạo mảng ID chi tiết sản phẩm có thể thuộc về sản phẩm này
                     // Dùng heuristic: Chi tiết sản phẩm có thể có ID gần với ID sản phẩm
                     const potentialDetailIds = Array.from({ length: 5 }, (_, i) => product.id + i);
                     potentialDetailIds.push(product.id, product.id * 2, product.id * 3); // Thêm một vài phỏng đoán

                     pricesData.forEach((price) => {
                        if (
                           price.product_detail &&
                           potentialDetailIds.includes(price.product_detail.id)
                        ) {
                           relatedPrices.push(price);
                        }
                     });
                  }

                  console.log(`Found ${relatedPrices.length} prices for product ${product.id}`);

                  // Nếu không tìm thấy giá, thử dùng một số heuristic khác
                  if (relatedPrices.length === 0) {
                     // Dùng product_detail đầu tiên trong pricesData nếu không có dữ liệu khác
                     // Đây chỉ là giải pháp tạm thời để hiển thị
                     // Trong thực tế cần cải thiện API để trả về thông tin chính xác hơn
                     if (pricesData.length > 0) {
                        const firstPrice = pricesData[0];
                        relatedPrices.push(firstPrice);
                        console.log(`Using fallback price for product ${product.id}`);
                     }
                  }

                  // Xử lý giá
                  let basePrice = '0';
                  let discountPrice: string | undefined = undefined;

                  if (relatedPrices.length > 0) {
                     // Sắp xếp giá từ thấp đến cao
                     relatedPrices.sort((a, b) => Number(a.base_price) - Number(b.base_price));
                     basePrice = relatedPrices[0].base_price.toString();

                     // Tìm giá khuyến mãi thấp nhất
                     const discountPrices = relatedPrices.filter(
                        (price) => price.discount_price && Number(price.discount_price) > 0,
                     );

                     if (discountPrices.length > 0) {
                        // Lưu ý: discount_price ở đây là phần trăm giảm giá (ví dụ: 50 có nghĩa là giảm 50%)
                        discountPrice = discountPrices[0].discount_price.toString();
                     }
                  }

                  // Tạo danh sách biến thể (variants)
                  const variants = relatedPrices.map((price) => {
                     const detail = price.product_detail;
                     return {
                        detailId: detail.id,
                        size: detail.size || 'Default',
                        type: detail.type || 'Standard',
                        basePrice: price.base_price.toString(),
                        discountPrice: price.discount_price
                           ? price.discount_price.toString()
                           : undefined,
                        inStock: detail.quantities > 0 && detail.isActive,
                     };
                  });

                  return {
                     id: product.id,
                     title: product.name,
                     description: product.description,
                     price: basePrice,
                     discountPrice: discountPrice,
                     rating: 4.5,
                     imageUrl: imageUrl || '/images/placeholder.jpg',
                     variants: variants.length > 0 ? variants : undefined,
                  };
               });

               setProducts(mappedProducts);
               setFilteredProducts(mappedProducts);
            } catch (priceErr) {
               console.error('Error fetching prices:', priceErr);
               // Xử lý fallback khi không lấy được giá
            }
         } catch (err) {
            console.error('Error fetching products:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
         } finally {
            setLoading(false);
         }
      };

      fetchProducts();
   }, []);

   useEffect(() => {
      if (!searchQuery.trim()) {
         setFilteredProducts(products);
         return;
      }

      const filtered = products.filter((product) => {
         const searchLower = searchQuery.toLowerCase();
         return (
            product.title.toLowerCase().includes(searchLower) ||
            (product.description && product.description.toLowerCase().includes(searchLower))
         );
      });

      setFilteredProducts(filtered);
   }, [searchQuery, products]);


   const handleViewDetail = (productId: number) => {
      console.log('View detail clicked for product ID:', productId);
   };

   // Add carousel navigation functions
   const scrollToNext = () => {
      if (carouselRef.current) {
         const scrollAmount = carouselRef.current.clientWidth;
         carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

         const newSlide = Math.min(
            activeSlide + 1,
            Math.ceil(filteredProducts.length / slidesToShow.desktop) - 1
         );
         setActiveSlide(newSlide);
      }
   };



   // Add auto-scroll effect for carousel
   useEffect(() => {
      const autoScrollInterval = setInterval(() => {
         if (filteredProducts.length > slidesToShow.desktop) {
            scrollToNext();
         }
      }, 5000); // Auto-scroll every 5 seconds

      return () => clearInterval(autoScrollInterval);
   }, [activeSlide, filteredProducts.length]);

   // Update the carousel navigation to match the carousel component
   const goToSlide = (index: number) => {
      setActiveSlide(index);
      if (carouselRef.current) {
         const scrollAmount = carouselRef.current.clientWidth * index;
         carouselRef.current.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
         });
      }
   };

   // Auto-scroll effect for carousel (similar to the Carousel component)
   useEffect(() => {
      const autoScrollInterval = setInterval(() => {
         const nextSlide = (activeSlide + 1) % Math.ceil(filteredProducts.length / slidesToShow.desktop);
         goToSlide(nextSlide);
      }, 5000); // Auto-scroll every 5 seconds

      return () => clearInterval(autoScrollInterval);
   }, [activeSlide, filteredProducts.length]);

   return (
      <div className='bg-[#F1EEE9]'>
         <button
            className='lg:hidden fixed top-20 left-4 z-50 bg-white p-2 rounded-full shadow-md'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
         >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
         </button>

         <div className='flex flex-col lg:flex-row max-w-7xl mx-auto'>
            <div className='flex-1 px-4 lg:px-8'>
               {loading && (
                  <div className='flex justify-center items-center h-64'>
                     <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
                  </div>
               )}

               {error && (
                  <div className='bg-red-50 text-red-700 p-4 rounded-md my-4 text-center'>
                     {error}
                  </div>
               )}

               {!loading && !error && filteredProducts.length === 0 && (
                  <div className='text-center py-10'>
                     {searchQuery ? (
                        <div>
                           <p className='text-gray-600 mb-4'>
                              Không tìm thấy sản phẩm phù hợp với &ldquo;{searchQuery}&rdquo;
                           </p>
                           <Link href='/user/products'>
                              <button className='px-6 py-2 bg-amber-100 hover:bg-amber-200 text-[#553C26] rounded-md transition-colors'>
                                 Xem tất cả sản phẩm
                              </button>
                           </Link>
                        </div>
                     ) : (
                        <p className='text-gray-500'>Không có sản phẩm nào</p>
                     )}
                  </div>
               )}

               {/* Replace with a simpler carousel layout like the Carousel component */}
               {!loading && !error && filteredProducts.length > 0 && (
                  <div className="relative w-auto max-w-6xl mx-auto overflow-hidden mt-6 pb-12">
                     <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sản phẩm nổi bật</h2>

                     {/* Main carousel container with transition effect */}
                     <div className="relative overflow-hidden rounded-lg">
                        <div
                           ref={carouselRef}
                           className="flex transition-transform duration-500 ease-out"
                           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                           {filteredProducts.map((product) => (
                              <div
                                 key={product.id}
                                 className="flex-none w-full sm:w-1/2 lg:w-1/4 px-2"
                              >
                                 <ProductCard
                                    id={product.id}
                                    title={product.title}
                                    description={product.description || ''}
                                    price={product.price}
                                    discountPrice={product.discountPrice}
                                    rating={product.rating}
                                    imageUrl={product.imageUrl}
                                    variants={product.variants}
                                    onViewDetail={handleViewDetail}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Carousel indicators similar to the Carousel component */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2 py-4">
                        {Array.from({
                           length: Math.ceil(filteredProducts.length / slidesToShow.desktop)
                        }).map((_, index) => (
                           <button
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all ${activeSlide === index ? 'bg-gray-800 w-6' : 'bg-gray-400'
                                 }`}
                              onClick={() => goToSlide(index)}
                              aria-label={`Go to slide ${index + 1}`}
                           />
                        ))}
                     </div>
                  </div>
               )}
            </div>
=======
      <div className='relative w-full max-w-7xl mx-auto px-4 my-12'>
         {/* Section Header */}
         <div className='flex justify-between items-center mb-8'>
            <div>
               <h2 className='text-3xl font-bold text-gray-800 font-mont'>Sản Phẩm Nổi Bật</h2>
               <div className='h-1 w-24 bg-amber-500 mt-2'></div>
            </div>
            <div className='hidden md:flex space-x-2'>
               <button
                  onClick={handlePrev}
                  className='p-2 rounded-full border border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-colors'
                  aria-label='Previous'
               >
                  <ChevronLeftIcon className='h-5 w-5 text-gray-600' />
               </button>
               <button
                  onClick={handleNext}
                  className='p-2 rounded-full border border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-colors'
                  aria-label='Next'
               >
                  <ChevronRightIcon className='h-5 w-5 text-gray-600' />
               </button>
            </div>
         </div>

         {/* Carousel Container */}
         <div className='relative overflow-hidden'>
            <div
               ref={sliderRef}
               className='flex gap-8 overflow-x-scroll scrollbar-hide scroll-smooth transition-transform duration-500'
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}
            >
               {products.map((product) => (
                  <div
                     key={product.id}
                     className='min-w-[280px] max-w-[280px] group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300'
                  >
                     {/* Product Image Container */}
                     <div className='relative h-60 overflow-hidden bg-[#F9F6F3]'>
                        {product.discount && (
                           <span className='absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
                              {product.discount}
                           </span>
                        )}
                        {product.isNew && (
                           <span className='absolute top-3 left-3 z-10 bg-amber-800 text-white text-xs font-bold px-2 py-1 rounded'>
                              Mới
                           </span>
                        )}

                        {/* Product Image */}
                        <Image
                           src={product.image}
                           alt={product.name}
                           width={280}
                           height={240}
                           className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />

                        {/* Quick action buttons - visible on hover */}
                        <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 to-transparent p-4'>
                           <button className='bg-[#553C26] text-white px-4 py-2 rounded-full flex items-center gap-1 hover:bg-amber-600 transition-colors'>
                              <ShoppingBagIcon className='h-5 w-5' />
                              <span>Thêm vào giỏ</span>
                           </button>
                        </div>
                     </div>

                     {/* Product Details */}
                     <div className='p-4 bg-white'>
                        {/* Rating */}
                        <div className='flex items-center mb-2'>
                           <div className='flex items-center'>{renderRating(product.rating)}</div>
                           <span className='text-xs text-gray-500 ml-2'>({product.rating})</span>
                        </div>

                        {/* Product Name */}
                        <Link href={`/product/${product.id}`}>
                           <h3 className='font-medium text-gray-800 hover:text-amber-600 transition-colors cursor-pointer mb-1 font-mont'>
                              {product.name}
                           </h3>
                        </Link>

                        {/* Description */}
                        <p className='text-sm text-gray-500 mb-3 line-clamp-2'>
                           {product.description}
                        </p>

                        {/* Price */}
                        <div className='flex items-center'>
                           <span className='text-lg font-semibold text-amber-800'>
                              {product.price}
                           </span>
                           {product.originalPrice && (
                              <span className='ml-2 text-sm text-gray-500 line-through'>
                                 {product.originalPrice}
                              </span>
                           )}
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Mobile navigation buttons */}
            <div className='md:hidden flex justify-between w-full absolute top-1/2 transform -translate-y-1/2 px-2 pointer-events-none'>
               <button
                  onClick={handlePrev}
                  className='bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white pointer-events-auto'
               >
                  <ChevronLeftIcon className='h-5 w-5 text-gray-700' />
               </button>
               <button
                  onClick={handleNext}
                  className='bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white pointer-events-auto'
               >
                  <ChevronRightIcon className='h-5 w-5 text-gray-700' />
               </button>
            </div>
         </div>

         {/* Progress Indicators */}
         <div className='flex justify-center mt-6 gap-2'>
            {[...Array(Math.ceil(totalItems / visibleItems))].map((_, index) => (
               <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                     index === currentIndex ? 'bg-amber-500 w-6' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                     setCurrentIndex(index);
                     if (sliderRef.current) {
                        const cardWidth = sliderRef.current.querySelector('div')?.clientWidth || 0;
                        const gap = 16;
                        sliderRef.current.scrollLeft = index * visibleItems * (cardWidth + gap);
                     }
                  }}
               />
            ))}
         </div>

         {/* View All Button */}
         <div className='flex justify-center mt-10'>
            <Link href='/products'>
               <button className='px-8 py-3 bg-[#553C26] text-white rounded-full flex items-center gap-2 hover:bg-amber-600 transition-colors font-mont font-medium'>
                  Xem Tất Cả Sản Phẩm
                  <ChevronRightIcon className='h-5 w-5' />
               </button>
            </Link>
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
         </div>
      </div>
   );
}
