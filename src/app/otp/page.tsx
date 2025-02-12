'use client';
import React from 'react';
import NavBar from '../components/nav/page';
import Footer from '../components/footer/page';
import Image from 'next/image';

export default function OTPPage() {
   return (
      <div>
         <NavBar />
         <hr className='border-b-2 border-b-[#F1EEE9]' />

         {/* Form đăng ký */}
         <div
            className='h-full w-full bg-local'
            style={{
               backgroundImage: `url("https://i.imgur.com/i3IlpOo.png")`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               height: '800px',
            }}
         >
            <div className='flex justify-end items-center h-full pr-80'>
               <form className='bg-white p-8 rounded-lg shadow-md w-auto'>
                  <h2 className='text-2xl font-bold mb-6 text-center text-[#553C26]'>Đăng Ký</h2>
                  <div className='mb-4'>
                     <label
                        htmlFor='email'
                        className='block text-[#553C26] mb-2 text-base font-medium'
                     >
                        Email
                     </label>
                     <input
                        type='email'
                        id='email'
                        className='w-80 px-3 py-2 border rounded-lg  border-[#553C26]'
                        placeholder='Nhập Email'
                     />
                  </div>

                  <div className='mb-4'>
                     <label
                        htmlFor='email'
                        className='block text-[#553C26] mb-2 text-base font-medium'
                     >
                        Nhập mã xác thực
                     </label>
                     <input
                        type='text'
                        id='otp'
                        className='w-80 px-3 py-2 border rounded-lg  border-[#553C26]'
                        placeholder='Nhập mã xác thực'
                     />
                  </div>
                  <button
                     type='submit'
                     className='w-80 bg-[#553C26] text-white py-2 mb-2 rounded-lg hover:bg-[#3e2b1a]'
                  >
                     Đăng Ký
                  </button>
                  <div className='flex items-center'>
                     <div className='flex-grow border-t border-[#553C26]'></div>
                     <div className='mx-2'>
                        <Image src='/images/logo.png' alt='Candle Bliss Logo' className='h-10' />
                     </div>
                     <div className='flex-grow border-t border-[#553C26]'></div>
                  </div>
                  <p className='flex justify-center font-paci text-lg text-[#553C26]'>
                     Đăng nhập bằng tài khoản khác
                  </p>
                  <div className='flex justify-center items-center'>
                     <div className=' h-10 w-40 flex justify-center items-center  mt-4 border  border-[#553C26] rounded-lg'>
                        <Image src='/images/google.png' alt='' />
                     </div>
                  </div>
               </form>
            </div>
         </div>
         <Footer />
      </div>
   );
}
