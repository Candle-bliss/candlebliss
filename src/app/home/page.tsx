'use client';
import React from 'react';
import NavBar from '../components/nav/page';
import Carousel from '../components/carousel/page';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import TrendingCarousel from '../components/trendingcarousel/page';
import Footer from '../components/footer/page';
import AccessoriesCarousel from '../components/accessoriescarousel/page';
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
               <div className='flex items-center justify-center py-1 pb-5'>
                  <div className='flex-grow  '></div>
                  <div>
                     <Image src={'/images/logo2.png'} alt='Logo' height={20} width={20} />
                  </div>
                  <div className='flex-grow border-t border-[#553C26] w-96'></div>
               </div>

               <p className='flex justify-center pb-1 text-[#555659] text-lg font-mont'>Phụ kiện</p>
               <p className='flex justify-center font-mont font-semibold text-3xl pb-4 '>
                  PHỤ KIỆN NẾN
               </p>
               <AccessoriesCarousel />

               <div className='flex items-center justify-center   '>
                  <div className='flex-grow border-t border-[#553C26] w-96 '></div>
                  <div>
                     <Image src={'/images/logo2.png'} alt='' height={20} width={20} />
                  </div>
                  <div className='flex-grow '></div>
               </div>
               <div className='flex justify-center '>
                  <Image src={'/images/TextPage1.png'} alt='' height={1000} width={1715} />
               </div>
               <div className='flex justify-center pt-2 '>
                  <Image src={'/images/Banner.png'} alt='' height={1000} width={1715} />
               </div>
               <div className='grid grid-cols-2 justify-items-center pt-3  gap-4'>
                  <div className='h-auto bg-white justify-items-center w-4/5  '>
                     <p className='text-center py-7 font-mont text-3xl'>
                        Tiết lộ bí mật của thiên nhiên
                     </p>
                     <div className='flex-grow border-t border-[#2C292640] w-3/4'></div>
                     <p className='text-center p-12 pb-8'>
                        Trong thâm tâm, chúng tôi đam mê chế tác nến tỏa ra vẻ đẹp tự nhiên và trân
                        trọng những báu vật của trái đất. Mỗi cây nến của chúng tôi là bản giao
                        hưởng của các thành phần tự nhiên được lựa chọn tỉ mỉ, được chọn để truyền
                        sự mê hoặc vào không gian của bạn.
                     </p>
                     <p className='text-center pb-20 p-12'>
                        Từ sự ôm ấp dịu dàng của cánh đồng hoa oải hương đến hương vị sảng khoái của
                        vườn cây họ cam quýt, hương thơm của chúng tôi có nguồn gốc từ tinh dầu
                        nguyên chất. Sáp của chúng tôi, hỗn hợp từ đậu nành và sáp ong có nguồn gốc
                        bền vững, cháy sạch và trung thực, không chứa độc tố. Mỗi bấc chúng tôi sử
                        dụng đều được chế tác cẩn thận từ cotton, đảm bảo cháy nhẹ nhàng, đều đặn.
                     </p>
                     <button className='bg-[#DDA15E] h-8 w-36 text-white hover:animate-pulse'>
                        Đọc Thêm
                     </button>
                  </div>
                  <Image
                     src={'/images/Pictures.png'}
                     height={791}
                     width={845}
                     className='w-auto relative right-11'
                     alt=''
                  ></Image>
               </div>
               <div>
                  <Image
                     src={'/images/image6.png'}
                     alt=''
                     height={110}
                     width={1650}
                     className='justify-items-center pl-56  p-5  '
                  ></Image>
               </div>
               <div className='flex justify-center items-center bg-scroll'>
                  <div
                     className='w-full'
                     style={{
                        backgroundImage: `url(/images/Shadow.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '500px',
                        width: '1715px',
                     }}
                  >
                     <p className='text-3xl text-center pt-24 text-white font-mont'>
                        Liên hệ ngay với Candle Bliss
                     </p>
                     <p className='text-3xl text-center text-white font-mont pb-24'>
                        {' '}
                        để biết thêm chi tiết
                     </p>

                     <p className='text-center text-white font-mont'>
                        Khám phá sự quyến rũ của nến thơm tại Candle Bliss – nơi những mùi hương mê
                        hoặc và
                     </p>
                     <p className='text-center text-white font-mont'>
                        {' '}
                        thiết kế tinh tế hòa quyện, mang đến sự ấm áp và sang trọng cho mọi không
                        gian.{' '}
                     </p>
                     <p className='text-center text-white font-mont'>
                        Hãy để mỗi ngọn nến trở thành một phần trong câu chuyện của bạn.{' '}
                     </p>
                     <p className='text-center text-white font-mont'>
                        Liên hệ ngay hôm nay để cùng chúng tôi lan tỏa ánh sáng và hương thơm đặc
                        biệt!
                     </p>
                     <div className='flex justify-center items-center pt-12'>
                        <button className='h-10 w-40 bg-[#DDA15E] flex justify-center items-center text-white hover:bg-orange-600   '>
                           Liên Hệ !
                        </button>
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
