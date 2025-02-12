'use client';
import React from 'react';
import NavBar from '../components/nav/page';
import Carousel from '../components/carousel/page';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import TrendingCarousel from '../components/trendingcarousel/page';
import Footer from '../components/footer/page';
import Image from 'next/image';

export default function HomePage() {
   return (
      <>
         {/* Trang Corousel */}
         <div className='bg-[#F1EEE9] mx-auto'>
            <NavBar />
            <div className='flex bg-[#F1EEE9] '>
               <div className='px-32'>
                  <Carousel />
               </div>
               <div className='flex flex-col py-52'>
                  <p className='text-[#553C26] font-mont font-semibold py-4'>What&apos;s new?</p>
                  <p className='text-[#553C26] font-mont font-bold text-4xl py-2'>
                     Hãy cùng khám phá các loại nến thơm
                  </p>
                  <p className='text-[#553C26] font-mont font-bold text-4xl pb-4'>
                     cùng chúng tôi!
                  </p>
                  <p className='text-[#553C26] font-mont  pb-4'>
                     Tìm kiếm sản phẩm yêu thích trong bộ sưu tập nến thơm đặc biệt của chúng tôi!
                  </p>
                  <button className=' font-mont h-8 w-36 bg-[#553C26] text-white rounded-2xl  hover:animate-pulse '>
                     Xem thêm
                     <ChevronRightIcon className='h-4 w-5 inline' />
                  </button>
               </div>
            </div>
            <div className='flex items-center justify-center py-1 pb-5'>
               <div className='flex-grow  '></div>
               <div>
                  <Image src={'/images/logo2.png'} alt='Logo' height={20} width={20} />
               </div>
               <div className='flex-grow border-t border-[#553C26] w-96'></div>
            </div>
            {/* Trang Trending */}
            <div>
               <p className='flex justify-center pb-1 text-[#555659] text-lg font-mont'>
                  T R E N D I N G
               </p>
               <p className='flex justify-center font-mont font-semibold text-3xl pb-4 '>
                  Những sản phẩm bán chạy
               </p>
               <TrendingCarousel />
               {/* Banner Sale-Off */}
               <div className='flex justify-center items-center pb-10'>
                  <Image src={'/images/sale.png'} alt='sale-off' height={380} width={1700} />
               </div>
               <div className='flex items-center justify-center py-1 '>
                  <div className='flex-grow border-t border-[#553C26] w-96 '></div>
                  <div>
                     <Image src={'/images/logo2.png'} alt='' height={20} width={20} />
                  </div>
                  <div className='flex-grow '></div>
               </div>

               {/* About */}

               <div className='bg-[#A5978E] flex justify-center h-96 items-center'>
                  <div className=' flex justify-between p-10 gap-7 w-3/4 '>
                     <div className='w-1/2'>
                        <h1 className='text-2xl font-mont font-semibold text-white pb-2'>
                           Về Chúng tôi
                        </h1>
                        <p className='text-white font-mont text-lg'>
                           Mỗi ngọn nến trong bộ sưu tập của chúng tôi là một kiệt tác của nghệ
                           thuật và tính xác thực. Chúng tôi tự hào tạo ra những ngọn nến không chỉ
                           đẹp về mặt thẩm mỹ mà còn có ý thức bảo vệ môi trường. Cam kết sử dụng
                           vật liệu tự nhiên, bền vững của chúng tôi đảm bảo rằng mỗi ngọn nến bạn
                           thắp đều là sự đón nhận nhẹ nhàng của bản chất thiên nhiên.
                        </p>
                     </div>
                     <div className='w-60 flex flex-col items-center'>
                        <Image
                           src={'/images/trending.png'}
                           alt=''
                           height={290}
                           width={290}
                           className='rounded-t-full '
                        />
                        <p className='text-white font-mont text-lg'>Hương thơm dịu nhẹ</p>
                     </div>
                     <div className='w-60 flex flex-col items-center '>
                        <Image
                           src={'/images/trending.png'}
                           alt=''
                           height={290}
                           width={290}
                           className='rounded-t-full '
                        />
                        <p className='text-white font-mont text-lg'>Hương thơm dịu nhẹ</p>
                     </div>
                     <div className='w-60 flex flex-col  items-center'>
                        <Image
                           src={'/images/trending.png'}
                           alt=''
                           height={290}
                           width={290}
                           className='rounded-t-full '
                        />
                        <p className='text-white font-mont text-lg'>Hương thơm dịu nhẹ</p>
                     </div>
                  </div>
               </div>

               {/* Footer */}
               <div>
                  <Footer />
               </div>
            </div>
         </div>
      </>
   );
}
