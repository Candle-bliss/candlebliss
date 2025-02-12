'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';

import NavBar from '../components/nav/page';
import Footer from '../components/footer/page';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function SignInPage() {
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <>
         <div className='mx-auto'>
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
               <div className='flex justify-end items-center h-full relative right-52'>
                  <form className='bg-white p-8 rounded-lg shadow-md w-auto'>
                     <h2 className='text-2xl font-bold mb-6 text-center text-[#553C26]'>
                        Đăng Nhập
                     </h2>

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
                           className='w-80 px-3 py-2 border rounded-lg border-[#553C26]'
                           placeholder='Nhập Email hoặc số điện thoại'
                        />
                     </div>

                     <div className='mb-2'>
                        <label
                           htmlFor='password'
                           className='block text-[#553C26] mb-2 text-base font-medium'
                        >
                           Mật Khẩu
                        </label>

                        <div className='flex justify-between items-center'>
                           <input
                              type={showPassword ? 'text' : 'password'}
                              id='password'
                              className='w-80 px-3 py-2 border rounded-lg border-[#553C26]'
                              placeholder='Nhập mật khẩu'
                           />
                           <button
                              type='button'
                              onClick={togglePasswordVisibility}
                              className='relative right-8 '
                           >
                              {showPassword ? (
                                 <EyeSlashIcon className='size-4' />
                              ) : (
                                 <EyeIcon className='size-4' />
                              )}
                           </button>
                        </div>
                     </div>
                     <Link href='/forgotPassword'>
                        <p className='flex justify-end mr-4 pb-2 text-[#553C26]'>Quên mật khẩu?</p>
                     </Link>
                     <Link href='/home'>
                        <button
                           type='submit'
                           className='w-80 bg-[#553C26] text-white py-2 mb-2 rounded-lg hover:bg-[#3e2b1a]'
                        >
                           Đăng Nhập
                        </button>
                     </Link>
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
                        <div className=' h-10 w-40 flex justify-center items-center  my-2 border  border-[#553C26] rounded-lg'>
                           <Image src='/images/google.png' alt='' />
                        </div>
                     </div>
                     <Link href='/signup'>
                        <p className='flex justify-center text-lg text-[#553C26] hover:underline'>
                           Chưa có tài khoản? Đăng ký
                        </p>
                     </Link>
                  </form>
               </div>
            </div>
            <Footer />
         </div>
      </>
   );
}
