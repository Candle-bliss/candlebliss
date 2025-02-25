'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { UserIcon, ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function NavBar() {
   const [showSearchInput, setShowSearchInput] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   return (
      <>
         {/* Top Header - Hidden on mobile */}
         <header className='hidden md:flex bg-[#F1EEE9] py-2 justify-between px-4 lg:px-60'>
            <h4 className='text-[#553C26] text-sm lg:text-base font-normal'>
               Email: candlebliss@gmail.com
            </h4>
            <div className='space-x-2'>
               <Link href='/signup'>
                  <span className='text-[#553C26] hover:underline text-sm lg:text-base'>Đăng Ký |</span>
               </Link>
               <Link href='/signin'>
                  <span className='text-[#553C26] hover:underline text-sm lg:text-base'>Đăng Nhập</span>
               </Link>
            </div>
         </header>
         <hr className='hidden md:block border-t-2 border-t-[#553C26]' />

         {/* Main Navigation */}
         <div className='bg-[#F1EEE9] relative'>
            {/* Desktop Navigation */}
            <div className='flex justify-between items-center px-4 lg:px-60 py-2'>
               {/* Logo */}
               <div className='flex items-center'>
                  <Image
                     src='/images/logoCoChu.png'
                     alt='Candle Bliss Logo'
                     height={62}
                     width={253}
                     className='h-8 w-auto md:h-12 lg:h-16'
                  />
               </div>

               {/* Mobile Menu Button */}
               <button 
                  className='md:hidden text-[#553C26]'
                  onClick={toggleMobileMenu}
               >
                  {isMobileMenuOpen ? (
                     <XMarkIcon className='h-6 w-6' />
                  ) : (
                     <Bars3Icon className='h-6 w-6' />
                  )}
               </button>

               {/* Desktop Menu */}
               <nav className='hidden md:flex space-x-4 lg:space-x-10 text-[#553C26] items-center'>
                  <Link href='/home'>
                     <span className='text-base lg:text-lg hover:text-[#FF9900] focus:font-semibold focus:text-[#FF9900] font-mont hover:font-semibold'>
                        Trang Chủ
                     </span>
                  </Link>

                  {/* Products Dropdown */}
                  <div className='relative group'>
                     <Link href='/product'>
                     <button className='text-base lg:text-lg hover:text-[#FF9900] focus:font-semibold focus:text-[#FF9900] font-mont hover:font-semibold' >
                        Sản Phẩm
                     </button>
                     </Link>
                     <div className='absolute hidden group-hover:block bg-[#F1EEE9] shadow-lg rounded-lg w-36 font-semibold z-50'>
                        {[
                           { href: '/products/candles', text: 'Nến Thơm' },
                           { href: '/products/holders', text: 'Tinh Dầu' },
                           { href: '/products/scents', text: 'Phụ Kiện Nến' },
                           { href: '/products/accessories', text: 'Quà Tặng' }
                        ].map((item, index) => (
                           <React.Fragment key={index}>
                              <Link href={item.href}>
                                 <span className='block px-4 py-2 text-[#553C26] hover:bg-[#E2DED8]'>
                                    {item.text}
                                 </span>
                              </Link>
                              {index < 3 && <hr className='border-[#553C26]' />}
                           </React.Fragment>
                        ))}
                     </div>
                  </div>

                  <button className='text-base lg:text-lg hover:text-[#FF9900] focus:font-semibold focus:text-[#FF9900] font-mont hover:font-semibold'>
                     Về Chúng Tôi
                  </button>
                  <button className='text-base lg:text-lg hover:text-[#FF9900] focus:font-semibold focus:text-[#FF9900] font-mont hover:font-semibold'>
                     Liên Hệ
                  </button>

                  {/* Search and Icons */}
                  <div className='flex items-center space-x-4'>
                     <div className='relative flex items-center'>
                        {showSearchInput && (
                           <input
                              type='text'
                              className='p-2 border border-[#553C26] rounded-lg text-sm'
                              placeholder='Tìm kiếm...'
                           />
                        )}
                        <button 
                           onClick={() => setShowSearchInput(!showSearchInput)}
                           className='ml-2'
                        >
                           <MagnifyingGlassIcon className='h-5 w-5 lg:h-6 lg:w-6' />
                        </button>
                     </div>
                     <Link href='/cart'>
                        <ShoppingBagIcon className='h-5 w-5 lg:h-6 lg:w-6' />
                     </Link>
                     <Link href='/'>
                        <UserIcon className='h-5 w-5 lg:h-6 lg:w-6' />
                     </Link>
                  </div>
               </nav>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
               <div className='md:hidden bg-[#F1EEE9] absolute w-full z-50'>
                  <div className='px-4 pt-2 pb-4 space-y-2'>
                     <Link href='/signin'>
                        <span className='block text-[#553C26] hover:text-[#FF9900] py-2'>
                           Đăng Nhập
                        </span>
                     </Link>
                     <Link href='/signup'>
                        <span className='block text-[#553C26] hover:text-[#FF9900] py-2'>
                           Đăng Ký
                        </span>
                     </Link>
                     <hr className='border-[#553C26]' />
                     <Link href='/home'>
                        <span className='block text-[#553C26] hover:text-[#FF9900] py-2'>
                           Trang Chủ
                        </span>
                     </Link>
                     <div className='space-y-2'>
                        <span className='block text-[#553C26] py-2'>Sản Phẩm:</span>
                        {[
                           { href: '/products/candles', text: 'Nến Thơm' },
                           { href: '/products/holders', text: 'Tinh Dầu' },
                           { href: '/products/scents', text: 'Phụ Kiện Nến' },
                           { href: '/products/accessories', text: 'Quà Tặng' }
                        ].map((item, index) => (
                           <Link key={index} href={item.href}>
                              <span className='block text-[#553C26] hover:text-[#FF9900] py-1 pl-4'>
                                 {item.text}
                              </span>
                           </Link>
                        ))}
                     </div>
                     <button className='block text-[#553C26] hover:text-[#FF9900] py-2 w-full text-left'>
                        Về Chúng Tôi
                     </button>
                     <button className='block text-[#553C26] hover:text-[#FF9900] py-2 w-full text-left'>
                        Liên Hệ
                     </button>
                     
                     {/* Mobile Search */}
                     <div className='relative flex items-center'>
                        <input
                           type='text'
                           className='w-full p-2 border border-[#553C26] rounded-lg'
                           placeholder='Tìm kiếm...'
                        />
                        <MagnifyingGlassIcon className='absolute right-3 h-5 w-5' />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}