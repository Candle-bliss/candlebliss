'use client';

<<<<<<< HEAD
import React, { useState, useEffect, Suspense } from 'react';
import { Star, StarHalf, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import NavBar from '@/app/components/user/nav/page';
import Footer from '@/app/components/user/footer/page'; // Fixed: Added missing Footer import
=======
import React, { useState, useEffect } from 'react';
import { Star, StarHalf, Eye, Menu, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/app/components/user/nav/page';
import Footer from '@/app/components/user/footer/page';
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7

interface ProductImage {
   id: string;
   path: string;
   public_id: string;
}

interface ProductDetail {
<<<<<<< HEAD
   productId: number;
=======
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
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

<<<<<<< HEAD
=======
interface Category {
   id: number;
   name: string;
   description: string;
}

>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
interface Product {
   id: number;
   name: string;
   description: string;
   video: string;
   images: ProductImage | ProductImage[];
<<<<<<< HEAD
   details?: ProductDetail[];
   categoryId?: number; // Added categoryId field to filter by category
=======
   category_id?: number;
   categories?: Category[];
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
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

<<<<<<< HEAD
// Add this interface above the existing ones
interface Category {
   id: number;
   name: string;
   description?: string;
}

interface ProductWithPossibleCategories extends Product {
   categoryId?: number;
   category_id?: number;
   category?: Category;
   categories?: Category[];
}

// ProductCard component (same as in products page)
=======
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
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
<<<<<<< HEAD
}: ProductCardProps & { id: number }) => {
   const [selectedVariant, setSelectedVariant] = useState(
      variants && variants.length > 0 ? variants[0].detailId : null,
   );
   const [showVariantOptions, setShowVariantOptions] = useState(false);

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

=======
   onAddToCart,
}: ProductCardProps & { id: number }) => {
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
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

<<<<<<< HEAD
   const formatPrice = (value: string | number) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   };

   const calculateDiscountedPrice = (basePrice: string, discountPercent: string) => {
      const basePriceNum = parseFloat(basePrice);
      const discountPercentNum = parseFloat(discountPercent);

      if (isNaN(discountPercentNum) || discountPercentNum <= 0) return basePriceNum;

      const discountedPrice = basePriceNum * (1 - discountPercentNum / 100);
      return discountedPrice;
   };

   const getDisplayPrice = () => {
      if (variants && variants.length > 0) {
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

      const actualDiscountPrice = discountPrice
         ? calculateDiscountedPrice(price, discountPrice)
         : null;

      return {
         basePrice: price,
         discountPrice: actualDiscountPrice,
         discountPercent: discountPrice,
      };
   };

   const { basePrice, discountPrice: calculatedDiscountPrice, discountPercent } = getDisplayPrice();

=======
   const formatPrice = (value: string) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   };

>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
   return (
      <div className='rounded-lg bg-white p-3 shadow-lg hover:shadow-md transition-shadow'>
         <div className='relative aspect-square overflow-hidden rounded-lg group'>
            <Image
               src={imageUrl}
               alt={title}
               height={400}
               width={400}
               className='h-full w-full object-cover transition-all duration-300 group-hover:blur-sm'
            />
<<<<<<< HEAD

            {discountPercent && parseInt(discountPercent) > 0 && (
               <div className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium'>
                  -{discountPercent}%
               </div>
            )}

=======
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
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
<<<<<<< HEAD
            </div>
         </div>

=======
               <button
                  onClick={() => onAddToCart && onAddToCart(id, variants?.[0]?.detailId)}
                  className='bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 border border-black'
               >
                  <ShoppingCart className='w-4 h-4' />
                  <span>Thêm vào giỏ</span>
               </button>
            </div>
         </div>
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
         <div className='mt-3'>
            <h3 className='text-sm font-medium text-gray-700 mb-1'>{title}</h3>
            <p className='text-xs text-gray-500 line-clamp-2 mb-1'>{description}</p>
            <div className='flex items-center'>{renderStars()}</div>
<<<<<<< HEAD

            {variants && variants.length > 0 && (
               <div className='mt-2'>
                  <button
                     className='text-xs text-gray-600 hover:text-orange-700 mb-1 flex items-center'
                     onClick={() => setShowVariantOptions(!showVariantOptions)}
                  ></button>
                  {renderVariantOptions()}
               </div>
            )}

            <div className='mt-1.5'>
               {(() => {
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
                  } else {
                     return (
                        <span className='text-red-600 text-sm font-medium'>
                           {formatPrice(basePrice)}đ
                        </span>
                     );
                  }
               })()}
=======
            <div className='mt-1'>
               {discountPrice ? (
                  <div className='flex items-center gap-2'>
                     <p className='text-sm font-medium text-red-600'>
                        {formatPrice(discountPrice)}đ
                     </p>
                     <p className='text-xs text-gray-500 line-through'>{formatPrice(price)}đ</p>
                  </div>
               ) : (
                  <p className='text-sm font-medium text-red-600'>{formatPrice(price)}đ</p>
               )}
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
            </div>
         </div>
      </div>
   );
};

<<<<<<< HEAD
// Search component
function ProductSearch({ onSearch }: { onSearch: (query: string) => void }) {
   const searchParams = useSearchParams();
   const searchQuery = searchParams.get('search') || '';

   useEffect(() => {
      onSearch(searchQuery);
   }, [searchParams, onSearch]);

   return null;
}

export default function CandlesPage() {
=======
export default function CandlesPage() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
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
<<<<<<< HEAD
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
   const [searchQuery, setSearchQuery] = useState('');

   const [currentPage, setCurrentPage] = useState(1);
   const productsPerPage = 25;

   const getPaginatedProducts = () => {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      return filteredProducts.slice(startIndex, endIndex);
   };

   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
=======
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [categoryName, setCategoryName] = useState<string>('Nến Thơm');
   const [categoryId, setCategoryId] = useState<number | null>(null);

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await fetch('http://68.183.226.198:3000/api/categories');
            
            let categoriesData;
            
            if (response.status === 302) {
               // Handle 302 redirect - extract data from the response if possible
               const responseText = await response.text();
               
               if (responseText.includes('[') && responseText.includes(']')) {
                  const jsonStart = responseText.indexOf('[');
                  const jsonEnd = responseText.lastIndexOf(']') + 1;
                  const jsonString = responseText.substring(jsonStart, jsonEnd);
                  
                  try {
                     categoriesData = JSON.parse(jsonString);
                     console.log('Extracted categories from 302 response text:', categoriesData);
                  } catch (error) {
                     console.error('Failed to parse categories from 302 response:', error);
                     throw new Error('Không thể xử lý dữ liệu danh mục từ máy chủ');
                  }
               }
            } else if (!response.ok) {
               const errorText = await response.text();
               
               if (errorText.includes('[') && errorText.includes(']')) {
                  const jsonStart = errorText.indexOf('[');
                  const jsonEnd = errorText.lastIndexOf(']') + 1;
                  const jsonString = errorText.substring(jsonStart, jsonEnd);
                  
                  try {
                     categoriesData = JSON.parse(jsonString);
                  } catch (error) {
                     console.error('Failed to parse categories from error response:', error);
                     throw new Error(`Không thể tải danh mục sản phẩm: ${errorText}`);
                  }
               } else {
                  throw new Error(`Không thể tải danh mục sản phẩm: ${response.status}`);
               }
            } else {
               categoriesData = await response.json();
            }
            
            if (Array.isArray(categoriesData)) {
               console.log('All categories:', categoriesData.map(c => c.name).join(', '));
               
               // First, try to find an exact match for "Nến Thơm"
               let candleCategory = categoriesData.find(cat => 
                  cat.name && cat.name.trim().toLowerCase() === 'nến thơm'
               );
               
               // If no exact match, look for categories containing "nến" or "candle"
               if (!candleCategory) {
                  candleCategory = categoriesData.find(cat => 
                     cat.name && (
                        cat.name.toLowerCase().includes('nến') || 
                        cat.name.toLowerCase().includes('candle')
                     )
                  );
               }
               
               if (candleCategory) {
                  console.log('Found candle category:', candleCategory.name, 'with ID:', candleCategory.id);
                  setCategoryId(candleCategory.id);
                  setCategoryName(candleCategory.name);
               } else {
                  console.log('No candle category found, using default name');
                  // Keep the default "Nến Thơm" name
               }
            }
         } catch (error) {
            console.error('Error fetching categories:', error);
            // Continue with default category name
         }
      };
      
      fetchCategories();
   }, []);
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7

   useEffect(() => {
      const fetchProducts = async () => {
         try {
<<<<<<< HEAD
            // 1. Lấy danh sách sản phẩm cơ bản
=======
            // Fetch all products first
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
            const productsResponse = await fetch('http://68.183.226.198:3000/api/products');
            if (!productsResponse.ok) {
               throw new Error('Failed to fetch products');
            }
            const productsData: Product[] = await productsResponse.json();
<<<<<<< HEAD
            console.log('Total products fetched:', productsData.length);

            // 2. Lọc sản phẩm chỉ lấy danh mục Nến thơm (category_id = 4)
            const CANDLES_CATEGORY_ID = 4; // "Nến Thơm" category ID

            // Lọc sản phẩm theo category_id hoặc categoryId
            let candleProducts = productsData.filter((product: ProductWithPossibleCategories) => {
               return (
                  product.categoryId === CANDLES_CATEGORY_ID ||
                  product.category_id === CANDLES_CATEGORY_ID ||
                  product.category?.id === CANDLES_CATEGORY_ID ||
                  product.categories?.some(cat => cat.id === CANDLES_CATEGORY_ID)
               );
            });

            // Nếu không tìm thấy sản phẩm nào theo ID, lọc theo từ khóa liên quan đến nến
            if (candleProducts.length === 0) {
               console.log('Không tìm thấy sản phẩm theo category ID, đang thử lọc theo tên...');
               candleProducts = productsData.filter(product => {
                  const name = product.name?.toLowerCase() || '';
                  const desc = product.description?.toLowerCase() || '';
                  return (
                     name.includes('nến') ||
                     name.includes('candle') ||
                     desc.includes('nến thơm') ||
                     desc.includes('scented candle')
                  );
               });
            }

            console.log(`Tìm thấy ${candleProducts.length} sản phẩm nến thơm`);

            // Chuẩn hóa danh sách sản phẩm nến
            const normalizedProducts = candleProducts.map((product) => ({
=======

            // Normalize product data
            const normalizedProducts = productsData.map((product) => ({
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
               ...product,
               images: Array.isArray(product.images) ? product.images : [product.images],
            }));

<<<<<<< HEAD
            // 3. Lấy chi tiết sản phẩm và giá cho từng sản phẩm nến
            const detailedProducts = await Promise.all(
               normalizedProducts.map(async (product) => {
                  try {
                     // Lấy chi tiết sản phẩm từ API chi tiết
                     const detailResponse = await fetch(`http://68.183.226.198:3000/api/products/${product.id}`);
                     if (detailResponse.ok) {
                        const detailData = await detailResponse.json();
                        // Cập nhật thông tin chi tiết
                        return {
                           ...product,
                           details: detailData.details || [],
                        };
                     }
                     return product;
                  } catch (detailErr) {
                     console.error(`Lỗi khi lấy chi tiết cho sản phẩm ${product.id}:`, detailErr);
                     return product;
                  }
               })
            );

            // 4. Lấy thông tin giá
            try {
               // Fetch prices data
               const pricesResponse = await fetch('http://68.183.226.198:3000/api/v1/prices', {
                  headers: {
                     Authorization: 'Bearer ' + localStorage.getItem('token'),
                  },
               });

               if (!pricesResponse.ok) {
                  throw new Error('Failed to fetch prices');
               }

               const pricesData: Price[] = await pricesResponse.json();
               console.log('Tìm thấy tổng số giá:', pricesData.length);

               // Tạo mapping từ ID chi tiết sản phẩm đến giá
               const detailPricesMap: { [detailId: number]: Price } = {};

               // Map giá theo ID của chi tiết sản phẩm
               pricesData.forEach(price => {
                  if (price.product_detail && price.product_detail.id) {
                     detailPricesMap[price.product_detail.id] = price;
                  }
               });

               console.log('Tạo mapping giá cho', Object.keys(detailPricesMap).length, 'chi tiết sản phẩm');

               // Map sản phẩm với giá chính xác dựa trên chi tiết
               const mappedProducts = detailedProducts.map((product) => {
                  console.log(`Xử lý sản phẩm ${product.id}: ${product.name}`);

                  const imageUrl =
                     product.images && product.images.length > 0 ? product.images[0].path : null;

                  // Giá trị mặc định
                  let basePrice = '0';
                  let discountPrice: string | undefined = undefined;
                  const variants: Array<{
                     detailId: number;
                     size: string;
                     type: string;
                     basePrice: string;
                     discountPrice?: string;
                     inStock: boolean;
                  }> = [];

                  // Xử lý chi tiết nếu có
                  if (product.details && product.details.length > 0) {
                     console.log(`Sản phẩm ${product.id} có ${product.details.length} variant`);

                     // Xử lý từng variant (chi tiết) của sản phẩm
                     product.details.forEach((detail: { id: string | number; size: string; type: string; quantities: number; isActive: boolean; }) => {
                        console.log(`Đang xử lý variant ${detail.id} cho sản phẩm ${product.id}`);

                        // Tìm giá cho variant này dựa trên ID chi tiết
                        const price = detailPricesMap[Number(detail.id)];

                        if (price) {
                           console.log(`Đã tìm thấy giá cho variant ${detail.id}: ${price.base_price}`);
                           variants.push({
                              detailId: Number(detail.id),
                              size: detail.size || 'Default',
                              type: detail.type || 'Standard',
                              basePrice: price.base_price.toString(),
                              discountPrice: price.discount_price ? price.discount_price.toString() : undefined,
                              inStock: detail.quantities > 0 && detail.isActive
                           });
                        } else {
                           console.log(`Cảnh báo: Không tìm thấy giá cho variant ${detail.id} của sản phẩm ${product.id}`);
                        }
                     });
                  } else {
                     console.log(`Sản phẩm ${product.id} không có variants từ chi tiết`);

                     // Tìm giá dựa trên mối quan hệ product_detail.productId = product.id
                     const relevantPrices = pricesData.filter(price =>
                        price.product_detail && price.product_detail.productId === product.id
                     );

                     if (relevantPrices.length > 0) {
                        console.log(`Tìm thấy ${relevantPrices.length} giá cho sản phẩm ${product.id} qua productId`);

                        relevantPrices.forEach(price => {
                           const detail = price.product_detail;
                           variants.push({
                              detailId: detail.id,
                              size: detail.size || 'Default',
                              type: detail.type || 'Standard',
                              basePrice: price.base_price.toString(),
                              discountPrice: price.discount_price ? price.discount_price.toString() : undefined,
                              inStock: detail.quantities > 0 && detail.isActive
                           });
                        });
                     }
                  }

                  // Sắp xếp variant theo giá (thấp đến cao)
                  variants.sort((a, b) => Number(a.basePrice) - Number(b.basePrice));

                  // Sử dụng giá của variant rẻ nhất làm giá mặc định
                  if (variants.length > 0) {
                     basePrice = variants[0].basePrice;
                     discountPrice = variants[0].discountPrice;
                  }
=======
            // Filter products specifically for candles category
            let filteredProducts = normalizedProducts;
            
            if (categoryId) {
               // Filter by exact category ID match (primary filtering)
               filteredProducts = normalizedProducts.filter(product => 
                  product.category_id === categoryId ||
                  product.categories?.some(cat => cat.id === categoryId)
               );
            } else {
               // Fallback filtering by name if no category ID is found
               filteredProducts = normalizedProducts.filter(product => {
                  // Check if product name or description contains keywords related to candles
                  const nameMatches = product.name && 
                     (product.name.toLowerCase().includes('nến') || 
                      product.name.toLowerCase().includes('candle'));
                  
                  // Check if product belongs to a category with candle-related name
                  const categoryMatches = product.categories?.some(cat => 
                     cat.name && (
                        cat.name.toLowerCase().includes('nến') || 
                        cat.name.toLowerCase().includes('candle')
                     )
                  );
                  
                  return nameMatches || categoryMatches;
               });
            }

            console.log(`Found ${filteredProducts.length} candle products in category ${categoryName}`);

            try {
               const pricesResponse = await fetch('http://68.183.226.198:3000/api/v1/prices', {
                  headers: {
                     Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
                  },
               });
               
               if (!pricesResponse.ok) {
                  console.warn('Could not fetch prices, using default values');
                  const mappedProducts = filteredProducts.map((product) => {
                     const imageUrl =
                        product.images && product.images.length > 0 ? product.images[0].path : null;

                     return {
                        id: product.id,
                        title: product.name,
                        description: product.description,
                        price: '0',
                        rating: 4.5,
                        imageUrl: imageUrl || '/images/placeholder.jpg',
                     };
                  });
                  setProducts(mappedProducts);
                  setLoading(false);
                  return;
               }

               const pricesData: Price[] = await pricesResponse.json();

               const mappedProducts = filteredProducts.map((product) => {
                  const imageUrl =
                     product.images && product.images.length > 0 ? product.images[0].path : null;

                  const productPrices = pricesData.filter((price) => {
                     if (!price.product_detail) return false;
                     return price.product_detail && price.product_detail.id;
                  });

                  let basePrice = '0';
                  let discountPrice: string | undefined = undefined;

                  if (productPrices.length > 0) {
                     productPrices.sort((a, b) => Number(a.base_price) - Number(b.base_price));
                     basePrice = productPrices[0].base_price.toString();

                     const discountPrices = productPrices
                        .filter(price => price.discount_price && Number(price.discount_price) > 0)
                        .sort((a, b) => Number(a.discount_price) - Number(b.discount_price));

                     if (discountPrices.length > 0) {
                        discountPrice = discountPrices[0].discount_price.toString();
                     }
                  }

                  const variants = productPrices.map(price => {
                     const detail = price.product_detail;
                     return {
                        detailId: detail.id,
                        size: detail.size,
                        type: detail.type,
                        basePrice: price.base_price.toString(),
                        discountPrice: price.discount_price ? price.discount_price.toString() : undefined,
                        inStock: detail.quantities > 0 && detail.isActive
                     };
                  });
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7

                  return {
                     id: product.id,
                     title: product.name,
                     description: product.description,
                     price: basePrice,
                     discountPrice: discountPrice,
                     rating: 4.5,
                     imageUrl: imageUrl || '/images/placeholder.jpg',
<<<<<<< HEAD
                     variants: variants.length > 0 ? variants : undefined,
=======
                     variants: variants
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                  };
               });

               setProducts(mappedProducts);
<<<<<<< HEAD
               setFilteredProducts(mappedProducts);
            } catch (priceErr) {
               console.error('Lỗi khi lấy thông tin giá:', priceErr);
               // Hiển thị sản phẩm không có giá nếu không lấy được thông tin giá
               const mappedProductsWithoutPrices = normalizedProducts.map(product => ({
=======
            } catch (priceErr) {
               console.warn('Error fetching prices:', priceErr);
               const mappedProducts = filteredProducts.map((product) => ({
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                  id: product.id,
                  title: product.name,
                  description: product.description,
                  price: '0',
                  rating: 4.5,
<<<<<<< HEAD
                  imageUrl: product.images && product.images.length > 0
                     ? product.images[0].path
                     : '/images/placeholder.jpg',
               }));

               setProducts(mappedProductsWithoutPrices);
               setFilteredProducts(mappedProductsWithoutPrices);
            }
         } catch (err) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', err);
=======
                  imageUrl: product.images?.[0]?.path || '/images/placeholder.jpg',
               }));
               setProducts(mappedProducts);
            }
         } catch (err) {
            console.error('Error fetching products:', err);
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
         } finally {
            setLoading(false);
         }
      };

      fetchProducts();
<<<<<<< HEAD
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

   const handleSearch = (query: string) => {
      setSearchQuery(query);
   };
=======
   }, [categoryId, categoryName]);
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7

   const handleViewDetail = (productId: number) => {
      console.log('View detail clicked for product ID:', productId);
   };

<<<<<<< HEAD
   return (
      <div className='bg-[#F1EEE9] min-h-screen'>
         <NavBar />

         <Suspense fallback={<div>Loading search results...</div>}>
            <ProductSearch onSearch={handleSearch} />
         </Suspense>

         <div className='px-4 lg:px-0 py-8'>
            <p className='text-center text-[#555659] text-lg font-mont'>D A N H M Ụ C</p>
            <p className='text-center font-mont font-semibold text-xl lg:text-3xl pb-4'>NẾN THƠM</p>
         </div>

         <div className='flex flex-col lg:flex-row max-w-7xl mx-auto'>
=======
   const handleAddToCart = (productId: number, detailId?: number) => {
      console.log('Add to cart clicked for product ID:', productId, 'Detail ID:', detailId);

      // Find the product in the list
      const product = products.find(p => p.id === productId);
      if (!product) return;

      // Find either the specified variant or use the first one
      const variant = detailId
         ? product.variants?.find(v => v.detailId === detailId)
         : product.variants?.[0];

      if (!variant) {
         // If no variant exists, use main product info
         const cartItem = {
            productId: product.id,
            name: product.title,
            price: product.discountPrice || product.price,
            quantity: 1,
            imageUrl: product.imageUrl
         };

         // Add to localStorage or your cart logic
         const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
         cartItems.push(cartItem);
         localStorage.setItem('cart', JSON.stringify(cartItems));

         alert('Đã thêm sản phẩm vào giỏ hàng!');
      } else {
         // If variant exists
         const cartItem = {
            productId: product.id,
            name: product.title,
            detailId: variant.detailId,
            size: variant.size,
            type: variant.type,
            price: variant.discountPrice || variant.basePrice,
            quantity: 1,
            imageUrl: product.imageUrl
         };

         // Add to localStorage or your cart logic
         const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
         cartItems.push(cartItem);
         localStorage.setItem('cart', JSON.stringify(cartItems));

         alert('Đã thêm sản phẩm vào giỏ hàng!');
      }
   };

   return (
      <div className='bg-[#F1EEE9] min-h-screen'>
         <NavBar />
         <div className='px-4 lg:px-0 py-8'>
            <p className='text-center text-[#555659] text-lg font-mont'>S Ả N P H Ẩ M</p>
            <p className='text-center font-mont font-semibold text-xl lg:text-3xl pb-4'>{categoryName}</p>
         </div>

         {/* Mobile menu button */}
         <button
            className='lg:hidden fixed top-20 left-4 z-50 bg-white p-2 rounded-full shadow-md'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
         >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
         </button>

         <div className='flex flex-col lg:flex-row max-w-7xl mx-auto'>
           

            {/* Main content */}
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
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

<<<<<<< HEAD
               {!loading && !error && filteredProducts.length === 0 && (
                  <div className='text-center py-10'>
                     {searchQuery ? (
                        <div>
                           <p className='text-gray-600 mb-4'>
                              Không tìm thấy sản phẩm nến thơm phù hợp với &ldquo;{searchQuery}
                              &rdquo;
                           </p>
                           <Link href='/user/products/candles'>
                              <button className='px-6 py-2 bg-amber-100 hover:bg-amber-200 text-[#553C26] rounded-md transition-colors'>
                                 Xem tất cả nến thơm
                              </button>
                           </Link>
                        </div>
                     ) : (
                        <p className='text-gray-500'>Hiện không có sản phẩm nến thơm nào</p>
                     )}
                  </div>
               )}

               <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {getPaginatedProducts().map((product) => (
=======
               {!loading && !error && products.length === 0 && (
                  <div className='text-center py-10'>
                     <p className='text-gray-500'>Không tìm thấy sản phẩm nào trong danh mục này</p>
                     <p className='text-sm text-gray-400'>Các sản phẩm mới sẽ sớm được cập nhật</p>
                     
                  </div>
               )} 

               <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {products.map((product) => (
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                     <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description || ''}
                        price={product.price}
                        discountPrice={product.discountPrice}
                        rating={product.rating}
                        imageUrl={product.imageUrl}
                        variants={product.variants}
                        onViewDetail={handleViewDetail}
<<<<<<< HEAD
=======
                        onAddToCart={handleAddToCart}
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                     />
                  ))}
               </div>

<<<<<<< HEAD
               {!loading && !error && filteredProducts.length > productsPerPage && (
                  <div className='flex justify-center items-center gap-2 mt-8 pb-8'>
                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                           key={page}
                           className={`px-3 py-1 ${currentPage === page ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
                              } rounded-md text-gray-700`}
                           onClick={() => setCurrentPage(page)}
                        >
                           {page}
                        </button>
                     ))}
=======
               {!loading && !error && products.length > 0 && (
                  <div className='flex justify-center items-center gap-2 mt-8 pb-8'>
                     <button className='px-3 py-1 bg-gray-200 rounded-md text-gray-700 font-medium'>
                        1
                     </button>
                     <button className='px-3 py-1 hover:bg-gray-100 rounded-md text-gray-700'>
                        2
                     </button>
                     <button className='px-3 py-1 hover:bg-gray-100 rounded-md text-gray-700'>
                        3
                     </button>
                     <button className='px-3 py-1 hover:bg-gray-100 rounded-md text-gray-700'>
                        4
                     </button>
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
                  </div>
               )}
            </div>
         </div>

         <Footer />
      </div>
   );
<<<<<<< HEAD
}
=======
}
>>>>>>> 72c74480cfb4ac3d6b80fd3b31aba280a97a94c7
