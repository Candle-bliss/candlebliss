import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
   return (
      <>
         <footer className='bg-gray-100 py-8'>
            <div className='container mx-auto flex flex-wrap justify-center gap-24'>
               <div>
                  <Image
                     src={'/images/logoCoChu.png'}
                     alt='Candle Bliss Logo'
                     height={62}
                     width={253}
                     className='pb-2 pl-10'
                  />
                  <div className='pl-14'>
                     <p className='text-[#542700] font-semibold font-mont'>
                        Khám phá thế giới nến thơm tinh tế tại Candel Bliss.
                     </p>
                     <p className='text-[#542700] font-semibold font-mont'>
                        Sẽ mang đến các sản phẩm nến
                     </p>
                     <p className='text-[#542700] font-semibold font-mont'>
                        chất lượng cao, an toàn, thân thiện môi trường,
                     </p>
                     <p className='text-[#542700] font-semibold font-mont'>
                        giúp không gian sống của bạn thêm ấm áp và thư giãn.
                     </p>
                     <p className='text-[#542700] font-semibold font-mont'>
                        Giao hàng toàn quốc - Hỗ trợ 24/7.
                     </p>
                  </div>
               </div>
               <div>
                  <h4 className='font-semibold text-base font-mont  text-[#542700]'>Danh Mục</h4>
                  <hr className='w-full border-[#542700]' />
                  <ul className='space-y-2 mt-2 text-[#542700] text-lg font-medium'>
                     <li>
                        <Link href={''}>Trang Chủ</Link>
                     </li>
                     <li>
                        <Link href=''>Sản Phẩm</Link>
                     </li>
                     <li>
                        <Link href=''>Bài Viết</Link>
                     </li>
                     <li>
                        <Link href=''>Liên Hệ</Link>
                     </li>
                  </ul>
               </div>

               <div className='w-48'>
                  <h4 className='font-semibold text-base font-mont  text-[#542700]'>Chính Sách</h4>
                  <hr className='w-full border-[#542700]' />
                  <ul className='space-y-2 mt-2 text-[#542700] text-lg font-medium'>
                     <li>
                        <Link href=''>Điều khoản sử dụng</Link>
                     </li>
                     <li>
                        <Link href='/'> Chính sách bảo mật</Link>
                     </li>
                     <li>
                        <Link href='/'>Hình thức thanh toán</Link>
                     </li>
                     <li>
                        <Link href='/'>Hình thức đổi trả</Link>
                     </li>
                     <li>
                        <Link href='/'>Chính sách vận chuyển</Link>
                     </li>
                  </ul>
               </div>
               <div className='w-72'>
                  <h4 className='font-semibold text-base font-mont  text-[#542700]'>
                     Thông Tin Liên Hệ
                  </h4>
                  <hr className='w-full border-[#542700]' />
                  <p className='space-y-2 mt-2 text-[#542700] text-lg font-medium'>
                     Email: candlebliss@gmail.com
                  </p>
                  <p className='space-y-2 mt-2 text-[#542700] text-lg font-medium'>
                     Số điện thoại: 03338052
                  </p>
                  <p className='space-y-2 mt-2 text-[#542700] text-lg font-medium'>
                     Địa chỉ: 12 Nguyễn Văn Bảo, Phường 04, Quận Gò Vấp , Thành phố Hồ Chí
                     Minh , Việt Nam
                  </p>
               </div>
            </div>
         </footer>
      </>
   );
}
