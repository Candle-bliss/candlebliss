'use client';

import React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
   LogOut,
   Home,
   Package,
   ShoppingBag,
   CreditCard,
   Settings,
   ChevronDown,
   ChevronUp,
   Globe, // Import Globe icon for store/client navigation
} from 'lucide-react';

export default function MenuSideBar() {
   const [showProductSubmenu, setShowProductSubmenu] = useState(false);

   const toggleProductSubmenu = () => {
      setShowProductSubmenu(!showProductSubmenu);
   };

   const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/seller/signin';
   };

   return (
      <div className='min-h-screen  flex'>
         {/* Sidebar */}
         <div className='w-64 bg-[#F1EEE9] shadow-md h-screen flex flex-col'>
            <div className='p-4 border-b'>
               <div className='flex items-center'>
                  <Image
                     src={'/images/logoCoChu.png'}
                     alt='Candle Bliss Logo'
                     height={62}
                     width={253}
                     className='cursor-pointer'
                  />
               </div>
            </div>
            <nav className='mt-4 flex-grow overflow-y-auto'>
               {/* Visit Store Button - Added at the top */}
               <div className='px-4 py-2 mb-2'>
                  <Link
                     href='/user/home'
                     className='flex items-center p-2 text-emerald-600 hover:bg-emerald-50 rounded border border-emerald-200 transition-colors'
                     rel='noopener noreferrer'
                  >
                     <Globe size={18} className='mr-2' />
                     <span>Xem Cửa Hàng</span>
                  </Link>
               </div>

               <div className='px-4 py-2 '>
                  <Link
                     href='/seller/dashboard'
                     className='flex items-center p-2 text-[#442C08] rounded border border-[#442C08] hover:bg-gray-100'
                  >
                     <Home size={18} className='mr-2' />
                     <span>Danh Mục</span>
                  </Link>
               </div>
               <div className='px-4 py-2'>
                  <button
                     onClick={toggleProductSubmenu}
                     className='flex items-center justify-between w-full p-2 text-gray-600 hover:bg-gray-100 rounded '
                  >
                     <div className='flex items-center'>
                        <Package size={18} className='mr-2' />
                        <span>Quản Lý Sản Phẩm</span>
                     </div>
                     {showProductSubmenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {showProductSubmenu && (
                     <div className='ml-6 mt-2 border-l-2 border-gray-200 pl-2'>
                        <Link
                           href='/seller/products'
                           className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                        >
                           <span className='text-sm'>Tất cả sản phẩm</span>
                        </Link>
                        <Link
                           href='/products/gift-sets'
                           className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                        >
                           <span className='text-sm'>Set quà</span>
                        </Link>
                        <Link
                           href='/seller/vouchers'
                           className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                        >
                           <span className='text-sm'>Khuyến Mãi</span>
                        </Link>

                     </div>
                  )}
               </div>
               <div className='px-4 py-2'>
                  <Link
                     href='/seller/orders'
                     className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                  >
                     <Package size={18} className='mr-2' />
                     <span>Quản Lý Đơn Hàng</span>
                  </Link>
               </div>



               <div className='px-4 py-2'>
                  <Link
                     href='/seller/warehouse'
                     className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                  >
                     <Package size={18} className='mr-2' />
                     <span>Quản lý kho </span>
                  </Link>
               </div>
               <div className='px-4 py-2'>
                  <Link
                     href='/seller/exchange'
                     className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                  >
                     <CreditCard size={18} className='mr-2' />
                     <span>Quản Lý Đổi trả</span>
                  </Link>
               </div>
               <div className='px-4 py-2'>
                  <Link
                     href='/seller/finance'
                     className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                  >
                     <CreditCard size={18} className='mr-2' />
                     <span>Quản Lý Tài Chính</span>
                  </Link>
               </div>
               <div className='px-4 py-2'>
                  <Link
                     href='/seller/reviews'
                     className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                  >
                     <ShoppingBag size={18} className='mr-2' />
                     <span>Xem đánh giá sản phẩm</span>
                  </Link>
               </div>

               <div className='px-4 py-2'>
                  <Link
                     href='/settings'
                     className='flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded'
                  >
                     <Settings size={18} className='mr-2' />
                     <span>Cài Đặt</span>
                  </Link>
               </div>
            </nav>
            <div className='p-4 border-t'>
               <button className='flex items-center p-2 text-gray-600 w-full hover:bg-gray-100 rounded'>
                  <LogOut size={18} className='mr-2' />
                  <span onClick={handleLogout}>Đăng Xuất</span>
               </button>
            </div>
         </div>
      </div>
   );
}
